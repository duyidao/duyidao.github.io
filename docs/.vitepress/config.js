import nav from "./nav";
import silber from "./silber";

module.exports = {
  // 网站标题
  title: '🔪 刀刀小站',
  // base: '/blog/',
  // 网站描述
  description: '刀刀小站',
  // 打包目录
  dest: './dist',
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "./favicon.ico" }],
    ["meta", { property: "og:title", content: "刀刀小站" }],
    ["meta", { property: "og:site_name", content: "刀刀小站" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:description", content: "杜一刀技术博客刀刀小站，记录着所学所思所想" }],
    ["meta", { property: "og:image", content: "./favicon.ico" }],
    ["meta", { property: "og:url", content: "https://duyidao.github.io/" }],
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
    siteTitle: "『 刀刀小站 』",
    outlineTitle: '我是一个目录哦~',
    outline: [0, 6],
    // 启动页面丝滑滚动
    smoothScroll: true,
    // 头部导航栏配置
    nav: nav,
    // 左侧导航栏
    sidebar: silber,
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/duyidao" },
      { icon: {
        svg: '<svg t="1721045386818" class="icon" viewBox="0 0 1092 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1980" width="200" height="200"><path d="M514.133293 1024c-282.76611 0-512-229.23389-512-512S231.367183 0 514.133293 0 1026.133293 229.23389 1026.133293 512 796.899403 1024 514.133293 1024z m259.157033-568.88941l-290.75924 0.014063c-13.965946 0-25.287203 11.321257-25.287203 25.27314l-0.028125 63.218476c0 13.965946 11.306257 25.287203 25.273141 25.287203h177.024483c13.965946 0 25.287203 11.306257 25.287203 25.272203v12.64407a75.846609 75.846609 0 0 1-75.847547 75.847547H368.739142a25.287203 25.287203 0 0 1-25.287203-25.273141V417.194317a75.846609 75.846609 0 0 1 75.847546-75.846609l353.919591-0.015c13.965946 0 25.27314-11.306257 25.287203-25.27314l0.07125-63.188476c0-13.965946-11.306257-25.287203-25.272203-25.301266l-353.991778 0.014063c-104.718814-0.014063-189.624491 84.891614-189.624491 189.609491v353.963653c0 13.966884 11.320319 25.287203 25.287203 25.287203h372.934915c94.265683 0 170.666354-76.400672 170.666354-170.666354V480.397793c0-13.951884-11.320319-25.27314-25.287203-25.27314z" p-id="1981"></path></svg>'
      }, link: "https://gitee.com/duyidao"  },
    ],
    //页脚
    footer: {
      copyright: "Copyright © 2023-present 杜一刀",
    },
  },
  rewrites: {
    'learn/CSS/(.*)': 'CSS/(.*)',
    'learn/CSS/效果提升/(.*)': 'CSS/效果提升/(.*)',
    'learn/CSS/知识拓展/(.*)': 'CSS/知识拓展/(.*)',
    'learn/Javascript/webapi/(.*)': 'Javascript_webapi/(.*)',
    'learn/Javascript/(.*)': 'Javascript/(.*)',
    'learn/Git/潜在的BUG/(.*)': 'Git/潜在的BUG/(.*)',
    'learn/Reg/knowledge/(.*)': 'Reg/knowledge/(.*)',
    'learn/Reg/do/(.*)': 'Reg/do/(.*)',
    'learn/Reg/BUG/(.*)': 'Reg/BUG/(.*)',
    'learn/vue2/(.*)': 'vue2/(.*)',
    'learn/Vue3/(.*)': 'Vue3/(.*)',
    'learn/React/(.*)': 'React/(.*)',
    'learn/TypeScript/(.*)': 'TypeScript/(.*)',
    'learn/Node/(.*)': 'TypeScript/(.*)',
    'learn/study/(.*)': 'study/(.*)',
    'project/lingsi/(.*)': 'lingsi/(.*)',
    'project/daodao/(.*)': 'daodao/(.*)',
    'project/baidu/(.*)': 'baidu/(.*)',
    'project/myself/(.*)': 'myself/(.*)',
  }
}