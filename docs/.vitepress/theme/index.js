import DefaultTheme from 'vitepress/theme'
import '../css/index.less'
import install from '../components/index.js'; // 引入自定义Vue组件
import initZoom from '../utils/zoom.js'
import preloadImages from '../utils/preload.js'
import giscusTalk from '../utils/giscus.js'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 子组件挂载
    install(app);
  },
  setup() {
    // 图片预加载
    preloadImages();
    
    // 图片放大
    initZoom();
    
    // 评论插件
    giscusTalk();
  }
}