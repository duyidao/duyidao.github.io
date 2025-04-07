import nav from "./nav";
import sidebar from "./silber";
import boke from "../public/boke.txt";
import gitee from "../public/gitee.txt";

export default {
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
};
