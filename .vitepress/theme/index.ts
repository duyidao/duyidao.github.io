import Theme from 'vitepress/theme'
import 'virtual:group-icons.css'
import install from '../../components/index'
import '../../css/index.less'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import initZoom from '../../utils/zoom.js'
import giscusTalk from '../../utils/giscus.js'
import preloadImages from '../../utils/preload.js'

export default {
  ...Theme,
  enhanceApp({ app }) {
    install(app) // 子组件挂载
    app.use(NolebaseGitChangelogPlugin)
  },
  setup() {
    // 图片预加载
    preloadImages()

    // 图片放大
    initZoom()

    // 评论插件
    giscusTalk()
  },
}
