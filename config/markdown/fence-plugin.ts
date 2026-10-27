import type MarkdownIt from 'markdown-it'
import { isMermaidFence, isInsideCodeGroup, mermaidDomId } from './utils'

/**
 * 代码块渲染插件
 * 用于自定义 Markdown 代码块的渲染逻辑，支持特殊语法：
 * - ```md:img - 将 Markdown 内容渲染为图片
 * - ```mermaid [标题] - 在代码组中将 mermaid 图表渲染为交互式组件
 */
export function fencePlugin(md: MarkdownIt) {
  // 保存默认的 fence 渲染规则，用于兜底处理普通代码块
  // 如果默认规则不存在，则使用最简实现：直接返回代码内容
  const defaultFence =
    md.renderer.rules.fence?.bind(md.renderer.rules) ??
    ((...args: any[]) => args[0][args[1]].content)

  // 重写 fence 渲染规则，拦截所有代码块的渲染过程
  md.renderer.rules.fence = (
    tokens: Token[], // 所有语法解析令牌
    idx: number, // 当前代码块的索引
    options: any, // Markdown 配置选项
    env: any, // 环境信息（包含文件路径等）
    self: any, // 渲染器实例
  ) => {
    const token = tokens[idx] // 获取当前代码块令牌
    const info = token.info.trim() // 获取代码块的语言标识（如 ```javascript 中的 javascript）

    // 处理 md:img 语法：将 Markdown 内容渲染为 HTML 图片
    // 使用场景：```md:img 可以将一段 Markdown 文本渲染成可视化的图片预览
    if (info.includes('md:img')) {
      return `<div class="rendered-md">${md.render(token.content)}</div>`
    }

    // 处理 mermaid 图表渲染（仅在代码组内生效）
    // 条件：语言标识为 mermaid/mmd 且位于 :::code-group 容器内
    if (isMermaidFence(info) && isInsideCodeGroup(tokens, idx)) {
      // 检查是否标记为 active（默认激活的标签页）
      const active = /(?:^|\s)active(?:\s|$)/.test(info) ? ' active' : ''
      // 生成唯一的 DOM 元素 ID，基于文件路径和索引计算哈希值
      const id = mermaidDomId(env, idx)
      // 对图表内容进行 URL 编码，防止特殊字符破坏 HTML 属性
      const graph = encodeURIComponent(token.content)
      // 返回自定义的 Vue 组件标签，由 codeGroupMermaid.vue 负责渲染图表
      return `<div class="vp-block mermaid-block${active}"><codeGroupMermaid id="${id}" graph="${graph}"></codeGroupMermaid></div>`
    }

    // 其他所有代码块使用默认渲染规则处理
    return defaultFence(tokens, idx, options, env, self)
  }
}
