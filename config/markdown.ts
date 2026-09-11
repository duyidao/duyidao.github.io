import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'

export default {
  image: {
    lazyLoading: true, // 开启图片懒加载
  },
  lineNumbers: true, // 默认禁用；设置为 true 可为所有代码块启用行号。
  config(md) {
    md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
      let htmlResult = slf.renderToken(tokens, idx, options)
      if (tokens[idx].tag === 'h1') htmlResult += `<mdInfo />`
      return htmlResult
    }
    md.use(groupIconMdPlugin)
    // 代码组中添加图片
    md.use((md) => {
      const defaultRender = md.render
      md.render = (...args) => {
        const [content, env] = args
        const currentLang = env?.localeIndex || 'root'
        const isHomePage = env?.path === '/' || env?.relativePath === 'index.md' // 判断是否是首页

        if (isHomePage) {
          return defaultRender.apply(md, args) // 如果是首页，直接渲染内容
        }
        // 调用原始渲染
        let defaultContent = defaultRender.apply(md, args)
        // 替换内容
        if (currentLang === 'root') {
          defaultContent = defaultContent
            .replace(/提醒/g, '提醒')
            .replace(/建议/g, '建议')
            .replace(/重要/g, '重要')
            .replace(/警告/g, '警告')
            .replace(/注意/g, '注意')
        } else if (currentLang === 'ko') {
          // 韩文替换
          defaultContent = defaultContent
            .replace(/提醒/g, '알림')
            .replace(/建议/g, '팁')
            .replace(/重要/g, '중요')
            .replace(/警告/g, '경고')
            .replace(/注意/g, '주의')
        }
        // 返回渲染的内容
        return defaultContent
      }

      // 获取原始的 fence 渲染规则
      const defaultFence =
        md.renderer.rules.fence?.bind(md.renderer.rules) ??
        ((...args) => args[0][args[1]].content)

      // 重写 fence 渲染规则
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const info = token.info.trim()

        // 判断是否为 md:img 类型的代码块
        if (info.includes('md:img')) {
          // 只渲染图片，不再渲染为代码块
          return `<div class="rendered-md">${md.render(token.content)}</div>`
        }

        // 其他代码块按默认规则渲染（如 java, js 等）
        return defaultFence(tokens, idx, options, env, self)
      }
    })
  },
}
