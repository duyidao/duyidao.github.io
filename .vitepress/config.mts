import { withMermaid } from 'vitepress-plugin-mermaid'
import themeConfig from '../config/themeConfig'
import markdown from '../config/markdown'
import vite from '../config/vite'
import config from '../config/index'
import rewrites from '../config/rewrites'
import head from '../config/head'

export default withMermaid({
  ...config,
  head,
  themeConfig,
  markdown,
  vite,
  rewrites,
})
