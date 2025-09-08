import Theme from 'vitepress/theme'
import { inBrowser } from 'vitepress'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import 'virtual:group-icons.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '../../css/index.less'
import install from '../../components/index'
import initZoom from '../../utils/zoom.js'
import giscusTalk from '../../utils/giscus.js'
import preloadImages from '../../utils/preload.js'
import MyLayout from '../../components/myLayout.vue'
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
import busuanzi from 'busuanzi.pure.js'

export default {
  ...Theme,
  Layout: MyLayout,
  enhanceApp({ app, router }) {
    install(app) // 子组件挂载
    app.use(NolebaseGitChangelogPlugin)

    // 路由进度条
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
        NProgress.done() // 停止进度条
      }
    }
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
