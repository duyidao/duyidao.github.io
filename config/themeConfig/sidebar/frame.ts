const vue2 = [
  {
    text: "概念学习",
    collapsed: true,
    items: [
      { text: "指令", link: "/vue/2/" },
      { text: "动态绑定", link: "/vue/2/bind" },
      { text: "组件", link: "/vue/2/communicate" },
      { text: "动态组件", link: "/vue/2/component" },
    ],
  },
  {
    text: "源码学习",
    collapsed: true,
    items: [
      { text: "核心源码及设计思想", link: "/vue/2/vue" },
      { text: "手写Router及Vuex", link: "/vue/2/router" },
      { text: "阅读框架源码方法", link: "/vue/2/read" },
    ],
  },
];

const vue3 = [
  {
    text: "概念学习",
    collapsed: true,
    items: [
      { text: "项目初始化", link: "/vue/3/" },
      { text: "指令", link: "/vue/3/use" },
      { text: "组件", link: "/vue/3/component" },
      { text: "插槽", link: "/vue/3/slot" },
      { text: "路由与状态管理", link: "/vue/3/builtin" },
      { text: "3.5增加的特性", link: "/vue/3/3.5" },
    ],
  },
  {
    text: "源码学习",
    collapsed: true,
    items: [
      {
        text: "基建",
        collapsed: true,
        items: [
          { text: "项目搭建", link: "/vue/3/dev" },
          { text: "打包配置", link: "/vue/3/build" },
          { text: "Monorepo", link: "/vue/3/monorepo" },
        ],
      },
      {
        text: "响应式",
        collapsed: true,
        items: [
          { text: "Ref基础实现", link: "/vue/3/ref_start" },
          { text: "Ref进阶优化", link: "/vue/3/ref_advance" },
          { text: "Reactive实现", link: "/vue/3/reactive" },
          { text: "Computed实现", link: "/vue/3/compute_realize" },
          { text: "Computed优化", link: "/vue/3/computed_cache" },
          { text: "Watch实现", link: "/vue/3/watch" },
        ],
      },
    ],
  },
];

const react = [
  {
    text: "概念学习",
    collapsed: true,
    items: [
      { text: "无脚手架项目创建", link: "/react/" },
      { text: "Diff算法", link: "/react/diff" },
      { text: "脚手架项目创建", link: "/react/index_new" },
      { text: "ReactRouter5", link: "/react/router" },
      { text: "Redux", link: "/react/redux" },
      { text: "拓展", link: "/react/extend" },
      { text: "ReactRouter6", link: "/react/router6" },
    ],
  },
];

export { vue2, vue3, react };
