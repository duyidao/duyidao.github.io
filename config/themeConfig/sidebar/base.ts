const css = [
  {
    text: '功能效果',
    collapsed: true,
    items: [
      { text: '倒影', link: '/css/effect/-webkit-box-reflect' },
      { text: '文字连续光影特效', link: '/css/effect/animation-delay' },
      { text: '背景滤镜', link: '/css/effect/backdrop-filter' },
      { text: '图片边框', link: '/css/effect/border-image' },
      { text: '裁剪', link: '/css/effect/clip-path' },
      { text: '下划线动画', link: '/css/effect/downline' },
      { text: '滤镜', link: '/css/effect/filter' },
      { text: '文字立起效果', link: '/css/effect/filter&mask' },
      { text: '宽度适配内容', link: '/css/effect/fit-content' },
      { text: '渐变', link: '/css/effect/gradient' },
      { text: '文字适配背景', link: '/css/effect/mix-blend-mode' },
      { text: '吸附', link: '/css/effect/scroll-snap' },
      { text: '变量', link: '/css/effect/var' },
      { text: '主题过渡动画', link: '/css/effect/view-transition' },
      { text: 'vmin与vmax', link: '/css/effect/vmin&vmax' },
      { text: '瀑布流', link: '/css/effect/waterfall' },
    ],
  },
  {
    text: '理论学习',
    collapsed: true,
    items: [
      { text: 'BEM', link: '/css/expand/bem' },
      { text: '空白节点', link: '/css/expand/blank' },
      { text: '粘性定位', link: '/css/expand/sticky' },
    ],
  },
]

const js = [
  {
    text: '概念学习',
    collapsed: true,
    items: [
      { text: '变量', link: '/javascript/knowledge/' },
      { text: '运算符', link: '/javascript/knowledge/sort' },
      { text: '数据类型', link: '/javascript/knowledge/type' },
      { text: '数组', link: '/javascript/knowledge/array' },
      { text: '函数', link: '/javascript/knowledge/function' },
      { text: '对象', link: '/javascript/knowledge/object' },
      { text: '作用域与闭包', link: '/javascript/knowledge/scope_closure' },
      { text: '原型与原型链', link: '/javascript/knowledge/prototype' },
      { text: '类', link: '/javascript/knowledge/class' },
      { text: '模块化', link: '/javascript/knowledge/module' },
      { text: 'Promise', link: '/javascript/knowledge/promise' },
      {
        text: '任务管理与Promise核心',
        link: '/javascript/knowledge/promise++',
      },
      { text: 'Set', link: '/javascript/knowledge/set' },
      { text: 'Map', link: '/javascript/knowledge/map' },
      { text: 'Symbol', link: '/javascript/knowledge/symbol' },
      { text: '事件循环', link: '/javascript/knowledge/eventloop' },
    ],
  },
  {
    text: '效果封装',
    collapsed: true,
    items: [
      { text: '取色器封装', link: '/javascript/webapi/color' },
      { text: '复制粘贴与内容设置', link: '/javascript/webapi/copy' },
      { text: '网站访问用户文件夹', link: '/javascript/webapi/file' },
      { text: '地图数据展示', link: '/javascript/webapi/map' },
      { text: '网络状态监控', link: '/javascript/webapi/monitor' },
      { text: '数字转中文', link: '/javascript/webapi/number' },
      { text: 'resize函数封装', link: '/javascript/webapi/resize' },
      { text: '页面自动检测更新', link: '/javascript/webapi/upload' },
      { text: '页面可见度', link: '/javascript/webapi/visible' },
    ],
  },
]

export { css, js }
