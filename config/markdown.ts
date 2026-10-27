import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import type MarkdownIt from 'markdown-it'
import { headingPlugin } from './markdown/heading-plugin'
import { fencePlugin } from './markdown/fence-plugin'
import { renderPlugin } from './markdown/render-plugin'

export default {
  image: {
    lazyLoading: true,
  },
  lineNumbers: true,
  config(md: MarkdownIt) {
    md.use(groupIconMdPlugin)
    md.use(headingPlugin)
    md.use(renderPlugin)
    md.use(fencePlugin)
  },
}
