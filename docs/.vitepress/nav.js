export default [
  {
    text: "💻 前端知识",
    items: [
      { text: "HTML & CSS", link: "/learn/HTML/" },
      { text: "JavaScript", link: "/learn/Javascript/" },
      { text: "Vue2", link: "/learn/vue2/指令" },
      { text: "Vue3", link: "/learn/Vue3/vue3项目创建" },
      { text: "TypeScript", link: "/learn/TypeScript/环境配置" },
      { text: "Node", link: "/learn/Node/" },
      {
        items: [
          {text:'杂技拾谈', link: '/learn/杂技拾谈/if-else冗余.md'}
        ]
      }
    ],
  },
  {
    text: "💾 项目",
    items: [
      { text: "📖 项目总结", link: "/project/lingsi/" },
      {
        items: [
          {
            text: '🎒 项目学习',
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
]