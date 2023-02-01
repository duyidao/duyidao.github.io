module.exports = {
  // 网站标题
  title: '🔪 刀刀小站',
  base: '/daodao/',
  // 网站描述
  description: '刀刀小站',
  // 打包目录
  dest: './dist',
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { property: "og:title", content: "刀刀博客" }],
    ["meta", { property: "og:site_name", content: "刀刀博客" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:description", content: "前端教程" }],
    ["meta", { property: "og:url", content: "https://duyidao.gitee.io/daodao/" }],
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
          { text: "正在施工中", link: "/learn/" }
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
        items: [{ text: "🌩️ VitePress", link: "/vitePress/" }],
      },
      {
        text: "⭐ 关于",
        items: [
          { text: "⭐ 关于我", link: "/about/" },
          { text: "🔪 关于刀刀小站", link: "/about/blog" }
        ],
      }
    ],
    // 左侧导航栏
    sidebar: {
      '/learn': getLearnSidebar(),
      '/project': getProjectSidebar(),
      '/vitePress': getVitePressSidebar()
    },
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://gitee.com/duyidao" }
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
      text: "💻 前端知识",
      collapsible: true,
      items: [
        { text: "引言", link: "/learn/" },
        {
          text: "HTML",
          collapsible: true,
          items: [
            { text: "HTML", link: "/learn/HTML/" },
          ],
        }
      ],
    }
  ]
}

// 获取项目的数组
function getProjectSidebar() {
  return [
    {
      text: "📖 项目笔记",
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

// 获取vitePress部署的数组
function getVitePressSidebar() {
  return [
    {
      text: '🧊 部署',
      collapsible: true,
      items: [
        { text: "🌩️ 引言", link: "/vitePress/" },
        { text: "🧩 搭建", link: "/vitePress/Dev" },
        { text: "🎁 打包", link: "/vitePress/Build" },
        { text: "⏳ 部署", link: "/vitePress/Deploy" },
      ]
    }
  ]
}