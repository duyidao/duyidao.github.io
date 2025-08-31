import nav from './themeConfig/nav'
import sidebar from './themeConfig/sidebar'

export default {
  // https://vitepress.dev/reference/default-theme-config
  logo: '/favicon.ico',
  // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
  lastUpdated: {
    text: '最近一次更新于',
    formatOptions: {
      dateStyle: 'full',
      timeStyle: 'medium',
    },
  },
  siteTitle: '『刀刀博客』',
  outlineTitle: '📇 本文目录指引',
  outline: [2, 6], // 目录只获取h2到h6
  smoothScroll: true, // 启动页面丝滑滚动
  nav,
  sidebar,
  docFooter: {
    prev: '⏮️ 上一页',
    next: '下一页 ⏭️',
  },
  search: {
    provider: 'algolia',
    options: {
      appId: '7NYO59ARBT',
      apiKey: '813532e3a1d5053e5d9a4ff14ae0f2cf',
      indexName: 'duyidaoio',
    },
  },
  returnToTopLabel: '回到顶部',
  sidebarMenuLabel: '菜单',
  darkModeSwitchLabel: '主题',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',
  skipToContentLabel: '跳转到内容',
  //社交链接
  socialLinks: [{ icon: 'github', link: 'https://github.com/duyidao' }],
  //页脚
  footer: {
    copyright: 'Copyright © 2023-present 杜一刀',
  },
}
