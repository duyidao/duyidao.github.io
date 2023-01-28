module.exports = {
  // 网站标题
  title: '刀刀',
  // 网站描述
  description: '刀刀小站',
  // 打包目录
  dest: './dist',
  head: [
      // 添加图标
      ['link', { rel: 'icon', href: '/favicon.ico' }]
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
  // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
  // lastUpdated: 'Last Updated', // string | boolean
  // 启动页面丝滑滚动
  smoothScroll: true,
  // 头部导航栏配置
  nav:[
      {text: '我的个人网站', link: 'https://www.cooldream.fun/home' },
      {text: '掘金', link: 'https://juejin.cn/user/1855631359481847/posts'},
      {text: 'Github', link: 'https://github.com/Jack-Star-T'}
  ],
  // 左侧导航栏
  sidebar:{
    '/':getSidebar()
  }
}
}

function getSidebar() {
  return [
      {
          text:'HTML',
          items: [
              { text: '基础', link: '/HTML/' },
              { text: '进阶', link: '/HTML/advanced' },
          ]
      },
      {
          text:'CSS',
          items:[
              { text: '基础', link: '/CSS/' },
              { text: '进阶', link: '/CSS/advanced' },
          ]
      },
      {
        text:'Javascript',
        items:[
          { text: '基础', link: '/Javascript/' },
          { text: '进阶', link: '/Javascript/advanced' },
        ]
      },
      {
        text:'Vue',
        items:[
          { text: '基础', link: '/Vue/' },
          { text: '进阶', link: '/Vue/advanced' },
        ]
      }
  ]
}