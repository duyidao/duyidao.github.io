import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { headingPlugin } from './markdown/heading-plugin'
import { fencePlugin } from './markdown/fence-plugin'
import { renderPlugin } from './markdown/render-plugin'

export default {
  image: {
    lazyLoading: true,
  },
  lineNumbers: true,
  config(md: any) {
    md.use(groupIconMdPlugin)
    md.use(headingPlugin)
    md.use(renderPlugin)
    md.use(fencePlugin)
  },
}
