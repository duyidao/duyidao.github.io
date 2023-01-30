module.exports = {
  // 网站标题
  title: '🔪 刀刀博客',
  // 网站描述
  description: '刀刀小站',
  // 打包目录
  dest: './dist',
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { property: "og:title", content: "谢夏戈博客" }],
    ["meta", { property: "og:site_name", content: "谢夏戈博客" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:description", content: "前端教程" }],
    ["meta", { property: "og:url", content: "https://xxggg.github.io/" }],
    [
      "script",
      {
        "data-ad-client": "ca-pub-7650804804345609",
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      },
    ],
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
    lastUpdated: 'Last Updated', // string | boolean
    // 启动页面丝滑滚动
    smoothScroll: true,
    // 头部导航栏配置
    nav: [
      {
        text: "💻 前端知识",
        items: [
          { text: "🟧 HTML", link: "/learn/HTML/" },
          { text: "🟥 CSS", link: "/learn/CSS/" },
          { text: "🟨 JavaScript", link: "/learn/JavaScript/" },
          { text: "🟦 TypeScript", link: "/learn/TypeScript/" },
          { text: "🟩 Vue", link: "/learn/Vue/" }
        ],
      },
      {
        text: "📖 项目总结",
        items: [
          { text: "🎶 音果云音", link: "/project/Music/" },
          { text: "🛒 视频分销", link: "/project/Sale/" },
          {
            text: "🔎 CRM",
            link: "/project/CRM/",
          },
        ],
      },
      {
        text: "🧊 部署",
        items: [{ text: "🌩️ VitePress", link: "../Deploy/VitePress_favicon" }],
      },
      {
        text: "⭐ 关于",
        items: [
          { text: "⭐ 关于我", link: "../About/AboutMe" },
          { text: "🔪 刀刀小站", link: "../About/AboutDuck" },
          { text: "📌 gitee", link: "../About/Tale/RubberDuckDebugging" },
        ],
      }
    ],
    // 左侧导航栏
    sidebar: {
      '/learn': getLearnSidebar(),
      '/project': getProjectSidebar()
    },
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/XXGGG" }
    ],
    //页脚
    footer: {
      copyright: "Copyright © 2023-present 杜一刀",
    },
  }
}

// 获取前端的数组
function getLearnSidebar() {
  return [
    {
      text: 'HTML',
      collapsible: true,
      items: [
        { text: '基础', link: '/learn/HTML/' },
        { text: '进阶', link: '/learn/HTML/advanced' },
      ]
    },
    {
      text: 'CSS',
      collapsible: true,
      items: [
        { text: '基础', link: '/learn/CSS/' },
        { text: '进阶', link: '/learn/CSS/advanced' },
      ]
    },
    {
      text: 'Javascript',
      collapsible: true,
      items: [
        { text: '基础', link: '/learn/Javascript/' },
        { text: '进阶', link: '/learn/Javascript/advanced' },
      ]
    },
    {
      text: 'Vue',
      collapsible: true,
      items: [
        { text: '基础', link: '/learn/Vue/' },
        { text: '进阶', link: '/learn/Vue/advanced' },
      ]
    }
  ]
}

// 获取项目的数组
function getProjectSidebar(params) {
  return [
    {
      text: "🌽 项目笔记",
      collapsible: true,
      items: [
        { text: "🎶 音果云音", link: "/project/Music/" },
        { text: "🛒 视频分销", link: "/project/Sale/" },
        {
          text: "🔎 CRM",
          link: "/project/CRM/",
        },
      ],
    }
  ]
}