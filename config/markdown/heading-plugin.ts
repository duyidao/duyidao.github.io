import type MarkdownIt from 'markdown-it'

export function headingPlugin(md: MarkdownIt) {
  md.renderer.rules.heading_close = (
    tokens: Token[],
    idx: number,
    options: any,
    env: any,
    slf: any,
  ) => {
    let htmlResult = slf.renderToken(tokens, idx, options)
    if (tokens[idx].tag === 'h1') htmlResult += `<mdInfo />`
    return htmlResult
  }
}
