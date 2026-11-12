import nav from './themeConfig/nav'
import sidebar from './themeConfig/sidebar'

const svgIcon = (d: string, style = 'margin-right:6px') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" style="display:inline-block;vertical-align:-0.15em;${style}"><path fill="currentColor" d="${d}"/></svg>`

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
  outlineTitle: '本文目录指引',
  outline: [2, 6], // 目录只获取h2到h6
  smoothScroll: true, // 启动页面丝滑滚动
  nav,
  sidebar,
  docFooter: {
    prev: `${svgIcon('M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11z')}上一页`,
    next: `下一页${svgIcon('M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11z', 'margin-left:6px')}`,
  },
  search: {
    // provider: 'local',
    provider: 'algolia',
    options: {
      appId: 'M6J3D31YSI',
      apiKey: '3f3fdf170c05df053ba1ca38b8ae4d12',
      indexName: 'Duyidao',
      container: '#docsearch',
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
}
