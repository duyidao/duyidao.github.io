import type MarkdownIt from 'markdown-it'

export function renderPlugin(md: MarkdownIt) {
  const defaultRender = md.render

  md.render = (...args: any[]) => {
    const [content, env] = args
    const currentLang = env?.localeIndex || 'root'
    const isHomePage = env?.path === '/' || env?.relativePath === 'index.md'

    if (isHomePage) {
      return defaultRender.apply(md, args)
    }

    let defaultContent = defaultRender.apply(md, args)
    return defaultContent
  }
}
