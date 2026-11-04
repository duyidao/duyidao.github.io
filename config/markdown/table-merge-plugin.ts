import type { MarkdownRenderer } from 'vitepress'

const MERGE_MAX_COLUMNS = 1
const MERGE_MARKER = /table-merge\s*:\s*(on|off)/

interface CellRange {
  start: number
  end: number
  key: string
  colspan: number
}

interface MergeAnchor {
  index: number
  rowspan: number
}

/**
 * 从指定位置向后查找第一个指定类型的 token
 * 用于在表格 token 流中定位 tbody、tr 等结构边界
 * @param tokens 当前文档解析出的完整 token 列表
 * @param from 起始查找下标（包含该位置）
 * @param type 目标 token 类型，如 'tbody_open'、'tr_close'
 * @returns 命中 token 的下标；未找到时返回 -1
 */
function findToken(tokens: any[], from: number, type: string): number {
  for (let i = from; i < tokens.length; i++) {
    if (tokens[i].type === type) return i
  }
  return -1
}

/**
 * 收集一段 token 范围内所有单元格的信息
 * 每个单元格记录其 token 下标区间、用于比对的文本内容、以及跨列数
 * @param tokens 当前文档解析出的完整 token 列表
 * @param start 扫描起始下标（包含该位置），通常为 tr_open 之后
 * @param end 扫描结束下标（不包含该位置），通常为 tr_close
 * @returns 按出现顺序排列的单元格信息列表
 */
function collectCells(tokens: any[], start: number, end: number): CellRange[] {
  const cells: CellRange[] = []
  let i = start
  while (i < end) {
    const token = tokens[i]
    if (token.type !== 'td_open' && token.type !== 'th_open') {
      i++
      continue
    }
    const closeType = token.type === 'td_open' ? 'td_close' : 'th_close'
    let content = ''
    let j = i + 1
    while (j < end && tokens[j].type !== closeType) {
      if (tokens[j].type === 'inline') content += tokens[j].content
      j++
    }
    cells.push({
      start: i,
      end: j + 1,
      key: content.trim(),
      colspan: Number(token.attrGet('colspan') || 1),
    })
    i = j + 1
  }
  return cells
}

/**
 * 读取表格前置的合并开关标记
 * 从表格起始位置向前回溯，查找形如 `<!-- table-merge: on/off -->` 的注释
 * 遇到其他块级结构（如上一个表格的结束）时停止，避免误读到别的表格的标记
 * @param tokens 当前文档解析出的完整 token 列表
 * @param index 表格 table_open 所在的下标
 * @returns true 表示显式开启；false 表示显式关闭；null 表示未书写标记（按默认开启处理）
 */
function readMarker(tokens: any[], index: number): boolean | null {
  for (let i = index - 1; i >= 0; i--) {
    const token = tokens[i]
    if (token.type === 'html_block' || token.type === 'html_inline') {
      const matched = MERGE_MARKER.exec(token.content)
      if (matched) return matched[1] === 'on'
      continue
    }
    if (token.type === 'table_close') break
    if (token.type.endsWith('_open') || token.type === 'inline') break
  }
  return null
}

/**
 * 表格合并插件
 * 将 tbody 中第一列连续相同的单元格纵向合并为一个（rowspan）
 * - 空单元格不参与合并
 * - 表头（thead）不参与合并
 * - 表格前书写 <!-- table-merge: off --> 可关闭该表格的合并
 */
export function tableMergePlugin(md: MarkdownRenderer) {
  md.core.ruler.after('inline', 'table-merge', (state: any) => {
    const tokens = state.tokens as any[]
    const removals: Array<{ start: number; end: number }> = []
    const anchors: MergeAnchor[] = []

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (token.type !== 'table_open') continue

      if (readMarker(tokens, i) === false) continue

      const tbodyStart = findToken(tokens, i, 'tbody_open')
      const tbodyEnd = findToken(tokens, i, 'tbody_close')
      if (tbodyStart === -1 || tbodyEnd === -1) continue

      const rows: CellRange[][] = []
      let cursor = tbodyStart + 1
      while (cursor < tbodyEnd) {
        if (tokens[cursor].type === 'tr_open') {
          const rowEnd = findToken(tokens, cursor, 'tr_close')
          rows.push(collectCells(tokens, cursor, rowEnd))
          cursor = rowEnd + 1
          continue
        }
        cursor++
      }

      const columnState = new Map<
        number,
        { key: string; rowspan: number; index: number }
      >()

      const flush = (column: number) => {
        const entry = columnState.get(column)
        if (entry && entry.rowspan > 1) {
          anchors.push({ index: entry.index, rowspan: entry.rowspan })
        }
        columnState.delete(column)
      }

      for (const row of rows) {
        let column = 0
        for (const cell of row) {
          const mergeable = column < MERGE_MAX_COLUMNS && cell.key !== ''
          const previous = columnState.get(column)

          if (!mergeable) {
            flush(column)
          } else if (previous && previous.key === cell.key) {
            previous.rowspan += 1
            removals.push({ start: cell.start, end: cell.end })
          } else {
            flush(column)
            columnState.set(column, {
              key: cell.key,
              rowspan: 1,
              index: cell.start,
            })
          }

          column += cell.colspan
        }
      }

      ;[...columnState.keys()].forEach(flush)
    }

    for (const anchor of anchors) {
      tokens[anchor.index].attrSet('rowspan', String(anchor.rowspan))
    }

    removals
      .sort((a, b) => b.start - a.start)
      .forEach((item) => {
        tokens.splice(item.start, item.end - item.start)
      })
  })
}
