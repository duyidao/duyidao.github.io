export default [
  {
    text: "💻 前端知识",
    items: [
      { text: "HTML", link: "/learn/HTML/" },
      { text: "CSS", link: "/learn/CSS/" },
      { text: "JavaScript", link: "/learn/Javascript/" },
      { text: "Vue2", link: "/learn/vue2/指令" },
      { text: "Vue3", link: "/learn/Vue3/vue3项目创建" },
      { text: "TypeScript", link: "/learn/TypeScript/环境配置" },
      { text: "Node", link: "/learn/Node/" },
      {
        items: [
          {text:'杂技拾谈', link: '/learn/杂技拾谈/vue3双向绑定proxy原理.md'}
        ]
      },
      {
        items: [
          {text:'学而时习之', link: '/learn/学而时习之/操作内嵌ifrname与传递消息.md'}
        ]
      }
    ],
  },
  {
    text: "💾 项目",
    items: [
      { text: "灵思", link: "/project/lingsi/" },
      {
        items: [
          {text:'自主学习', link: '/project/myself/'}
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
]