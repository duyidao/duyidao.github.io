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
    siteTitle: "『 刀刀小站 』",
    outlineTitle: '我是一个目录哦~',
    outline: [2, 4],
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
          { text: "🎶 音果云音", link: "/music/" },
          { text: "💴 视频分销", link: "/sale/" },
          {
            items: [
              {
                text: '项目学习',
                link: '/knowledgePoint/'
              }
            ]
          }
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
      '/music': getMusicSidebar(),
      '/vitePress': getVitePressSidebar(),
      '/about': getAboutSidebar(),
      '/sale': getSaleSidebar(),
      '/knowledgePoint': getKnowledgePointSidebar(),
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

// 获取音果云音的数组
function getMusicSidebar() {
  return [
    {
      text: "🎶 音果云音",
      collapsible: true,
      items: [
        {
          text: "🎶 音果云音",
          // collapsible: true,
          link: "/music/",
          items: [
            {
              text: " APP",
              collapsible: true,
              items: [
                { text: '登录页', link: "/music/APP/login" },
                { text: 'tabbar页', link: "/music/APP/tabbar" },
                { text: '详情页', link: "/music/APP/detail" },
                { text: '分享页', link: "/music/APP/share" },
                { text: '测试页', link: "/music/APP/test" },
                { text: '操作页', link: "/music/APP/do" },
                { text: '支付页', link: "/music/APP/pay" },
              ]
            },
            {
              text: 'H5',
              collapsible: true,
              items: [
                { text: '海报页', link: '/music/H5/'}
              ]
            }
          ],
        }
      ],
    }
  ]
}

// 获取分销的数组
function getSaleSidebar() {
  return [
    {
      text: '💴 视频分销',
      collapsible: true,
      items: [
        { text: '简介', link: '/sale/' },
        { text: '请求封装', link: '/sale/request' },
        { text: 'token刷新', link: '/sale/token' },
        { text: '视频轮播', link: '/sale/video' },
        { text: '图片上传组件封装', link: '/sale/upload' },
      ]
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

// 获取项目学习的数组
function getKnowledgePointSidebar() {
  return [
    {
      text: '0F81A2AF.png 项目学习',
      collapsible: true,
      items: [
        { text: "🌩️ 引言", link: "/knowledgePoint/" },
        { text: "🧩 vue-color的使用", link: "/knowledgePoint/vue_color" },
      ]
    }
  ]
}

// 获取关于的数组
function getAboutSidebar() {
  return [
    {
      text: '⭐ 关于',
      collapsible: true,
      items: [
        { text: '🧑 关于我', link: '/about/' },
        { text: '🔪 关于刀刀小站', link: '/about/blog' }
      ]
    }
  ]
}