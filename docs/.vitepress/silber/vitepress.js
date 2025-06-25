/**
 * 部署模块 ************************************************************
 */
// 部署数组
export const VitePressSidebar = [
  {
    text: "🧊 部署",
    collapsible: true,
    items: [
      { text: "🌩️ 引言", link: "/vitePress/" },
      { text: "🧩 搭建", link: "/vitePress/Dev" },
      { text: "🎁 打包", link: "/vitePress/Build" },
      { text: "⏳ 部署", link: "/vitePress/Deploy" },
      {
        text: "✨ 拓展",
        collapsible: true,
        collapsed: true,
        items: [
          { text: "内部拓展", link: "/vitePress/Know" },
          { text: "评论功能拓展", link: "/vitePress/review" },
          { text: "搜索", link: "/vitePress/algolia" },
        ],
      },
    ],
  },
];
