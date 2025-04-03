import nav from "./nav";
import sidebar from "./silber";
import rewrites from "./rewrites";
import boke from "./public/boke.txt";
import gitee from "./public/gitee.txt";

module.exports = {
  lang: "zh-CN",
  // 网站标题
  title: "🔪 刀刀博客",
  titleTemplate: ":title - 刀刀博客", // 网站描述
  // 网站描述
  description: "刀刀博客",
  // 打包目录
  dest: "./dist",
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "./favicon.ico" }],
    ["meta", { property: "og:title", content: "刀刀博客" }],
    ["meta", { property: "og:site_name", content: "刀刀博客" }],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      {
        property: "og:description",
        content: "杜一刀技术博客刀刀博客，记录着所学所思所想",
      },
    ],
    [
      "meta",
      {
        property: "og:keyword",
        content:
          "刀刀,杜一刀,技术博客,博客,前端,js,css,html,react,vue,webpack,vite,git,github,码农,程序员,刀刀博客",
      },
    ],
    ["meta", { property: "og:image", content: "./favicon.ico" }],
    ["meta", { property: "og:url", content: "https://duyidao.github.io/" }],
    [
      "meta",
      {
        property: "keyword",
        content:
          "刀刀,杜一刀,技术博客,博客,前端,js,css,html,react,vue,webpack,vite,git,github,码农,程序员,刀刀博客",
      },
    ],
    [
      "meta",
      {
        httpEquiv: "Cache-Control",
        content: "no-cache, no-store, must-revalidate",
      },
    ],
    ["meta", { httpEquiv: "Pragma", content: "no-cache" }],
    ["meta", { httpEquiv: "Expires", content: "0" }],
    // [
    //   'script',
    //   { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=TAG_ID' }
    // ],
    // [
    //   'script',
    //   {},
    //   `window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', 'TAG_ID');`
    // ]
  ],
  cleanUrls: true, // 删除 .html 后缀

  //markdown配置
  markdown: {
    // 开启图片懒加载
    image: {
      lazyLoading: true,
    },
    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      };
    },
  },
  // 主题配置
  themeConfig: {
    logo: "/favicon.ico",
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    lastUpdated: {
      text: "最近一次更新于",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    siteTitle: "『 刀刀博客 』",
    outlineTitle: "我是一个目录哦~",
    outline: [2, 6], // 目录只获取h2到h6
    // 启动页面丝滑滚动
    smoothScroll: true,
    // algolia搜索 官网： https://dashboard.algolia.com/apps/86R5OLPTQ1/dashboard
    search: {
      provider: "algolia",
      options: {
        appId: "7NYO59ARBT",
        apiKey: "813532e3a1d5053e5d9a4ff14ae0f2cf",
        indexName: "duyidaoio",
      },
    },
    // 头部导航栏配置
    nav,
    // 左侧导航栏
    sidebar,
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/duyidao" },
      {
        icon: {
          svg: gitee,
        },
        link: "https://gitee.com/duyidao",
      },
      {
        icon: {
          svg: boke,
        },
        link: "https://duyidao.github.io/blogweb/#/",
      },
    ],
    docFooter: {
      prev: "前往上一页",
      next: "去往下一页",
    },
    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    skipToContentLabel: "跳转到内容",
    //页脚
    footer: {
      copyright: "Copyright © 2023-present 杜一刀",
    },
  },
  rewrites,
};
