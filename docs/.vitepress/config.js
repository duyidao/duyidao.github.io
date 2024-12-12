import nav from "./nav";
import sidebar from "./silber";
import rewrites from "./rewrites";
import boke from './public/boke.txt';
import gitee from './public/gitee.txt';

module.exports = {
  // 网站标题
  title: '🔪 刀刀博客',
  // base: '/blog/',
  // 网站描述
  description: '刀刀博客',
  // 打包目录
  dest: './dist',
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "./favicon.ico" }],
    ["meta", { property: "og:title", content: "刀刀博客" }],
    ["meta", { property: "og:site_name", content: "刀刀博客" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:description", content: "杜一刀技术博客刀刀博客，记录着所学所思所想" }],
    ["meta", { property: "og:keyword", content: "刀刀,杜一刀,技术博客,博客,前端,js,css,html,react,vue,webpack,vite,git,github,码农,程序员,刀刀博客" }],
    ["meta", { property: "og:image", content: "./favicon.ico" }],
    ["meta", { property: "og:url", content: "https://duyidao.github.io/" }],
    ["meta", { property: "keyword", content: "刀刀,杜一刀,技术博客,博客,前端,js,css,html,react,vue,webpack,vite,git,github,码农,程序员,刀刀博客" }],
    ["meta", { httpEquiv: "Cache-Control", content: "no-cache, no-store, must-revalidate" }],
    ["meta", { httpEquiv: "Pragma", content: "no-cache" }],
    ["meta", { httpEquiv: "Expires", content: "0" }],
  ],
  // 使用插件
  plugins: [
    '@vuepress/active-header-links',   // 页面滚动时自动激活侧边栏链接的插件
    '@vuepress/back-to-top',          // 返回顶部插件
    '@vuepress/medium-zoom',          // 图片预览插件
    '@vuepress/nprogress',        //页面顶部进度条
  ],
  // 主题配置
  themeConfig: {
    logo: "/favicon.ico",
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    lastUpdated: 'Last Updated', // string | boolean
    siteTitle: "『 刀刀博客 』",
    outlineTitle: '我是一个目录哦~',
    outline: [0, 6],
    // 启动页面丝滑滚动
    smoothScroll: true,
    search: {
      provider: 'local'
    },
    // 头部导航栏配置
    nav,
    // 左侧导航栏
    sidebar,
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/duyidao" },
      { icon: {
        svg: gitee
      }, link: "https://gitee.com/duyidao"  },
      { icon: {
        svg: boke
      }, link: "https://duyidao.github.io/blogweb/#/" },
    ],
    //页脚
    footer: {
      copyright: "Copyright © 2023-present 杜一刀",
    },
  },
  rewrites,
}