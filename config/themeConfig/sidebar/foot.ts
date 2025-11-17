const vitepress = [
  {
    text: '博客搭建',
    collapsed: true,
    items: [
      { text: '简介', link: '/vitepress/' },
      { text: '搭建', link: '/vitepress/dev' },
      { text: '打包', link: '/vitepress/build' },
      { text: '部署', link: '/vitepress/deploy' },
    ],
  },
  {
    text: '博客优化',
    collapsed: true,
    items: [
      { text: '拓展学习', link: '/vitepress/know' },
      { text: '样式美化', link: '/vitepress/css' },
      { text: '评论功能添加', link: '/vitepress/review' },
      { text: '搜索', link: '/vitepress/algolia' },
    ],
  },
]

const read = [
  {
    text: 'ES6标准入门',
    collapsed: true,
    items: [
      { text: '前言', link: '/read/javascript/ES6标准入门/' },
      { text: 'ECMAScript6简介', link: '/read/javascript/ES6标准入门/1' },
      { text: 'Let 和 const 命令', link: '/read/javascript/ES6标准入门/2' },
      { text: '变量的解构赋值', link: '/read/javascript/ES6标准入门/3' },
      { text: '字符串的扩展', link: '/read/javascript/ES6标准入门/4' },
      { text: '正则的扩展', link: '/read/javascript/ES6标准入门/5' },
      { text: '数值的扩展', link: '/read/javascript/ES6标准入门/6' },
      { text: '函数的扩展', link: '/read/javascript/ES6标准入门/7' },
      { text: '数组的扩展', link: '/read/javascript/ES6标准入门/8' },
      { text: '对象的扩展', link: '/read/javascript/ES6标准入门/9' },
      { text: 'Symbol', link: '/read/javascript/ES6标准入门/10' },
      { text: 'Set和Map数据结构', link: '/read/javascript/ES6标准入门/11' },
      { text: 'Proxy', link: '/read/javascript/ES6标准入门/12' },
      { text: 'Reflect', link: '/read/javascript/ES6标准入门/13' },
      { text: 'Promise对象', link: '/read/javascript/ES6标准入门/14' },
      {
        text: 'Iterator和for...of循环',
        link: '/read/javascript/ES6标准入门/15',
      },
      { text: 'Generator函数的语法', link: '/read/javascript/ES6标准入门/16' },
      {
        text: 'Generator函数的异步应用',
        link: '/read/javascript/ES6标准入门/17',
      },
      { text: 'async函数', link: '/read/javascript/ES6标准入门/18' },
      { text: 'Class的基本语法', link: '/read/javascript/ES6标准入门/19' },
      { text: 'Class的继承', link: '/read/javascript/ES6标准入门/20' },
      { text: '修饰器', link: '/read/javascript/ES6标准入门/21' },
      { text: 'Module的语法', link: '/read/javascript/ES6标准入门/22' },
      { text: 'Module的加载实现', link: '/read/javascript/ES6标准入门/23' },
      { text: '编程风格', link: '/read/javascript/ES6标准入门/24' },
      { text: '读懂ECMAScript规格', link: '/read/javascript/ES6标准入门/25' },
      { text: 'ArrayBuffer', link: '/read/javascript/ES6标准入门/26' },
    ],
  },
  {
    text: 'Vue.js设计与实现',
    collapsed: true,
    items: [
      { text: '前言', link: '/read/vue/Vue.js设计与实现/' },
      { text: '权衡的艺术', link: '/read/vue/Vue.js设计与实现/1' },
      { text: '框架设计的核心要素', link: '/read/vue/Vue.js设计与实现/2' },
      { text: 'Vue.js 3 的设计思路', link: '/read/vue/Vue.js设计与实现/3' },
      { text: '响应系统的作用与实现', link: '/read/vue/Vue.js设计与实现/4' },
      { text: '非原始值的响应式方案', link: '/read/vue/Vue.js设计与实现/5' },
      { text: '原始值的响应式方案', link: '/read/vue/Vue.js设计与实现/6' },
      { text: '渲染器的设计', link: '/read/vue/Vue.js设计与实现/7' },
      { text: '挂载与更新', link: '/read/vue/Vue.js设计与实现/8' },
      { text: '简单 Diff 算法', link: '/read/vue/Vue.js设计与实现/9' },
      { text: '双端 Diff 算法', link: '/read/vue/Vue.js设计与实现/10' },
      { text: '快速 Diff 算法', link: '/read/vue/Vue.js设计与实现/11' },
      { text: '组件的实现原理', link: '/read/vue/Vue.js设计与实现/12' },
      { text: '异步组件与函数式组件', link: '/read/vue/Vue.js设计与实现/13' },
      { text: '内建组件和模块', link: '/read/vue/Vue.js设计与实现/14' },
      { text: '编译器核心技术概览', link: '/read/vue/Vue.js设计与实现/15' },
      { text: '解析器', link: '/read/vue/Vue.js设计与实现/16' },
      { text: '编译优化', link: '/read/vue/Vue.js设计与实现/17' },
      { text: '同构渲染', link: '/read/vue/Vue.js设计与实现/18' },
    ],
  },
  {
    text: 'CSS 技术揭秘与实战通关',
    collapsed: true,
    items: [
      {
        text: 'background的8种核心技巧',
        link: '/read/css/CSS 技术揭秘与实战通关/1',
      },
      {
        text: 'background的进阶技巧与实战',
        link: '/read/css/CSS 技术揭秘与实战通关/2',
      },
      {
        text: '巧用遮罩解决各类视觉难题',
        link: '/read/css/CSS 技术揭秘与实战通关/3',
      },
      {
        text: 'mask实现高阶动画效果',
        link: '/read/css/CSS 技术揭秘与实战通关/4',
      },
      {
        text: 'clip-path实现不规则图形及溢出场景',
        link: '/read/css/CSS 技术揭秘与实战通关/5',
      },
      {
        text: 'clip-path实现形态及区域变化等高级动画效果',
        link: '/read/css/CSS 技术揭秘与实战通关/6',
      },
      {
        text: 'css 阴影',
        link: '/read/css/CSS 技术揭秘与实战通关/7',
      },
      {
        text: 'shadow的高级技巧',
        link: '/read/css/CSS 技术揭秘与实战通关/8',
      },
    ],
  },
]

export { vitepress, read }
