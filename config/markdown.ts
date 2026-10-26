import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'

function fenceLang(info: string) {
  return (
    info
      .replace(/\[.*?\]/g, ' ')
      .replace(/\bactive\b/g, ' ')
      .trim()
      .split(/\s+/)[0] || ''
  )
}

function isMermaidFence(info: string) {
  const lang = fenceLang(info)
  return lang === 'mermaid' || lang === 'mmd'
}

function isInsideCodeGroup(tokens: { type: string }[], idx: number) {
  let depth = 0
  for (let i = idx - 1; i >= 0; i--) {
    const type = tokens[i].type
    if (type === 'container_code-group_close') depth++
    else if (type === 'container_code-group_open') {
      if (depth === 0) return true
      depth--
    }
  }
  return false
}

function mermaidDomId(env: { relativePath?: string; path?: string }, idx: number) {
  const path = String(env?.relativePath || env?.path || 'md')
  let hash = 0
  for (let i = 0; i < path.length; i++) {
    hash = (Math.imul(31, hash) + path.charCodeAt(i)) | 0
  }
  return `cg-mermaid-${(hash >>> 0).toString(36)}-${idx}`
}

export default {
  image: {
    lazyLoading: true, // 开启图片懒加载
  },
  lineNumbers: true, // 默认禁用；设置为 true 可为所有代码块启用行号。
  config(md: MarkdownIt) {
    md.renderer.rules.heading_close = (tokens: Token[], idx: number, options: any, env: any, slf: any) => {
      let htmlResult = slf.renderToken(tokens, idx, options)
      if (tokens[idx].tag === 'h1') htmlResult += `<mdInfo />`
      return htmlResult
    }
    md.use(groupIconMdPlugin)
    // 代码组中添加图片
    md.use((md: MarkdownIt) => {
      const defaultRender = md.render
      md.render = (...args: any[]) => {
        const [content, env] = args
        const currentLang = env?.localeIndex || 'root'
        const isHomePage = env?.path === '/' || env?.relativePath === 'index.md' // 判断是否是首页

        if (isHomePage) {
          return defaultRender.apply(md, args) // 如果是首页，直接渲染内容
        }
        // 调用原始渲染
        let defaultContent = defaultRender.apply(md, args)
        return defaultContent
      }

      // 获取原始的 fence 渲染规则
      const defaultFence =
        md.renderer.rules.fence?.bind(md.renderer.rules) ??
        ((...args) => args[0][args[1]].content)

      // 重写 fence 渲染规则
      md.renderer.rules.fence = (tokens: Token[], idx: number, options: any, env: any, self: any) => {
        const token = tokens[idx]
        const info = token.info.trim()

        // 判断是否为 md:img 类型的代码块
        if (info.includes('md:img')) {
          // 只渲染图片，不再渲染为代码块
          return `<div class="rendered-md">${md.render(token.content)}</div>`
        }

        // code-group 里的 ```mermaid / ```mermaid [标题] 渲染成图，而不是代码块
        if (isMermaidFence(info) && isInsideCodeGroup(tokens, idx)) {
          const active = /(?:^|\s)active(?:\s|$)/.test(info) ? ' active' : ''
          const id = mermaidDomId(env, idx)
          const graph = encodeURIComponent(token.content)
          return `<div class="vp-block mermaid-block${active}"><codeGroupMermaid id="${id}" graph="${graph}"></codeGroupMermaid></div>`
        }

        // 其他代码块按默认规则渲染（如 java, js 等）
        return defaultFence(tokens, idx, options, env, self)
      }
    })
  },
}
