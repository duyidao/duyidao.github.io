const chart = [
  {
    text: 'SVG',
    collapsed: true,
    items: [
      { text: '文字适应纹理', link: '/chart/svg/文字适应纹理' },
      { text: '图片故障动画', link: '/chart/svg/图片故障动画' },
    ],
  },
  {
    text: 'Canvas',
    collapsed: true,
    items: [
      { text: '图片压缩', link: '/chart/canvas/图片压缩' },
      { text: '文件签名与画板功能', link: '/chart/canvas/文件签名与画板功能' },
      { text: '滤镜', link: '/chart/canvas/滤镜' },
      { text: '色彩提取', link: '/chart/canvas/色彩提取' },
      { text: '页面截图', link: '/chart/canvas/页面截图' },
      { text: '图片裁剪', link: '/chart/canvas/图片裁剪' },
      {
        text: '根据背景图片改变主题色阴影',
        link: '/chart/canvas/根据背景图片改变主题色阴影',
      },
      { text: '视频提取画面帧', link: '/chart/canvas/视频提取画面帧' },
    ],
  },
  {
    text: 'EChart',
    collapsed: true,
    items: [
      {
        text: '柱状图悬停文本自定义',
        link: '/chart/echart/柱状图悬停文本自定义',
      },
      { text: '柱状图封装', link: '/chart/echart/柱状图封装' },
      {
        text: '横向柱状图参数数量设置',
        link: '/chart/echart/横向柱状图参数数量设置',
      },
      { text: '图表菜单项自定义', link: '/chart/echart/图表菜单项自定义' },
      {
        text: '饼图轮播，hover图例后修改中间内容',
        link: '/chart/echart/饼图轮播，hover图例后修改中间内容',
      },
      {
        text: '饼图中部内容自定义，点击图例修改中间内容',
        link: '/chart/echart/饼图中部内容自定义，点击图例修改中间内容',
      },
    ],
  },
]

const sharp = [
  {
    text: 'Node',
    collapsed: true,
    items: [
      { text: 'node', link: '/sharp/node/node' },
      { text: 'fs', link: '/sharp/node/fs' },
      { text: 'path', link: '/sharp/node/path' },
      { text: 'http', link: '/sharp/node/http' },
      { text: 'module', link: '/sharp/node/模块化' },
      { text: 'express', link: '/sharp/node/express' },
      { text: 'npm', link: '/sharp/node/npm' },
    ],
  },
  {
    text: 'TypeScript',
    collapsed: true,
    items: [
      { text: '环境配置', link: '/sharp/typescript/环境配置' },
      { text: '类型', link: '/sharp/typescript/类型' },
      { text: '断言与枚举', link: '/sharp/typescript/断言与枚举' },
      { text: '类与接口', link: '/sharp/typescript/类与接口' },
      { text: '泛型', link: '/sharp/typescript/泛型' },
      { text: '装饰器', link: '/sharp/typescript/装饰器' },
    ],
  },
  {
    text: 'GSAP动画',
    collapsed: true,
    items: [
      { text: '基础', link: '/sharp/gsap/基础' },
      { text: '动画参数', link: '/sharp/gsap/动画参数' },
      { text: '时间轴', link: '/sharp/gsap/时间轴' },
    ],
  },
  {
    text: 'Vite',
    collapsed: true,
    items: [
      { text: '创建项目', link: '/sharp/vite/创建项目' },
      { text: 'TS 和 CSS', link: '/sharp/vite/TS 和 CSS' },
    ],
  },
]

const module = [
  {
    text: '浏览器',
    collapsed: true,
    items: [
      { text: '浏览器渲染原理', link: '/module/browser/浏览器渲染原理' },
      { text: '浏览器长截图', link: '/module/browser/浏览器长截图' },
    ],
  },
  {
    text: 'Git',
    collapsed: true,
    items: [
      {
        text: 'BUG',
        collapsed: true,
        items: [{ text: '大小写规则检测', link: '/module/git/大小写规则检测' }],
      },
      {
        text: '实操',
        collapsed: true,
        items: [
          {
            text: '根据 ChangeId 合并部分提交',
            link: '/module/git/根据 ChangeId 合并部分提交',
          },
          {
            text: '工作中项目git如何管理，冲突如何解决',
            link: '/module/git/工作中项目git如何管理，冲突如何解决',
          },
          {
            text: '多人合作项目变基处理',
            link: '/module/git/多人合作项目变基处理',
          },
        ],
      },
    ],
  },
  {
    text: '小程序',
    collapsed: true,
    items: [{ text: '两个线程', link: '/module/miniProgram/两个线程' }],
  },
  {
    text: '正则',
    collapsed: true,
    items: [
      {
        text: '知识',
        collapsed: true,
        items: [
          { text: '正则表达式', link: '/module/reg/正则表达式' },
          { text: '元子字符', link: '/module/reg/元子字符' },
          { text: '模式修饰', link: '/module/reg/模式修饰' },
          { text: '原子', link: '/module/reg/原子' },
          { text: '匹配', link: '/module/reg/匹配' },
          { text: '方法', link: '/module/reg/方法' },
        ],
      },
      {
        text: '实操',
        collapsed: true,
        items: [
          {
            text: '运用前瞻实现密码强度检测',
            link: '/module/reg/运用前瞻实现密码强度检测',
          },
        ],
      },
      {
        text: 'BUG',
        collapsed: true,
        items: [
          { text: '正则中的lastIndex', link: '/module/reg/正则中的lastIndex' },
        ],
      },
    ],
  },
  {
    text: '网络',
    collapsed: true,
    items: [
      { text: '网络分层模型', link: '/module/network/网络分层模型' },
      { text: '应用协议', link: '/module/network/应用协议' },
      { text: 'xhr与fetch', link: '/module/network/xhr与fetch' },
      {
        text: '跨域问题及解决方案',
        link: '/module/network/跨域问题及解决方案',
      },
    ],
  },
]

const css = [
  {
    text: '功能效果',
    collapsed: true,
    items: [
      { text: '倒影', link: '/css/effect/-webkit-box-reflect实现倒影' },
      {
        text: '文字连续光影特效',
        link: '/css/effect/animation-delay实现文字连续光影特效',
      },
      { text: '背景滤镜', link: '/css/effect/backdrop-filter实现背景滤镜' },
      { text: '图片边框', link: '/css/effect/border-image实现图片边框' },
      { text: '裁剪', link: '/css/effect/clip-path实现裁剪' },
      { text: '下划线动画', link: '/css/effect/下划线动画' },
      { text: '滤镜', link: '/css/effect/filter实现滤镜' },
      { text: '文字立起效果', link: '/css/effect/文字立起效果' },
      { text: '宽度适配内容', link: '/css/effect/fit-content实现宽度适配内容' },
      { text: '渐变', link: '/css/effect/gradient渐变' },
      {
        text: '文字适配背景',
        link: '/css/effect/mix-blend-mode实现文字适配背景',
      },
      { text: '吸附', link: '/css/effect/scroll-snap实现吸附' },
      { text: '变量', link: '/css/effect/var变量' },
      { text: '主题过渡动画', link: '/css/effect/主题过渡动画' },
      { text: 'vmin与vmax', link: '/css/effect/vmin与vmax' },
      { text: '瀑布流', link: '/css/effect/瀑布流' },
    ],
  },
  {
    text: '理论学习',
    collapsed: true,
    items: [
      { text: 'BEM', link: '/css/expand/BEM' },
      { text: '空白节点', link: '/css/expand/空白节点' },
      { text: '粘性定位', link: '/css/expand/粘性定位' },
    ],
  },
]

const js = [
  {
    text: '概念学习',
    collapsed: true,
    items: [
      { text: '变量与严格模式', link: '/javascript/knowledge/变量与严格模式' },
      { text: '运算符', link: '/javascript/knowledge/运算符与流程控制' },
      { text: '数据类型', link: '/javascript/knowledge/数据类型' },
      { text: '数组', link: '/javascript/knowledge/数组' },
      { text: '函数', link: '/javascript/knowledge/函数' },
      { text: '对象', link: '/javascript/knowledge/对象' },
      { text: '作用域与闭包', link: '/javascript/knowledge/作用域与闭包' },
      { text: '原型与原型链', link: '/javascript/knowledge/原型与原型链' },
      { text: '类', link: '/javascript/knowledge/类' },
      { text: '模块化', link: '/javascript/knowledge/模块化' },
      { text: 'Promise', link: '/javascript/knowledge/Promise' },
      {
        text: '任务管理与Promise核心',
        link: '/javascript/knowledge/任务管理与Promise核心',
      },
      { text: 'Set', link: '/javascript/knowledge/Set' },
      { text: 'Map', link: '/javascript/knowledge/Map' },
      { text: 'Symbol', link: '/javascript/knowledge/Symbol' },
      { text: '事件循环', link: '/javascript/knowledge/事件循环' },
    ],
  },
  {
    text: '效果封装',
    collapsed: true,
    items: [
      { text: '取色器封装', link: '/javascript/webapi/取色器封装' },
      {
        text: '复制粘贴与内容设置',
        link: '/javascript/webapi/复制粘贴与内容设置',
      },
      {
        text: '网站访问用户文件夹',
        link: '/javascript/webapi/网站访问用户文件夹',
      },
      { text: '地图数据展示', link: '/javascript/webapi/地图数据展示' },
      { text: '网络状态监控', link: '/javascript/webapi/网络状态监控' },
      { text: '数字转中文', link: '/javascript/webapi/数字转中文' },
      { text: 'resize函数封装', link: '/javascript/webapi/resize函数封装' },
      { text: '页面自动检测更新', link: '/javascript/webapi/页面自动检测更新' },
      { text: '页面可见度', link: '/javascript/webapi/页面可见度' },
    ],
  },
]

const vue = [
  {
    text: 'Vue2',
    collapsed: true,
    items: [
      {
        text: '概念学习',
        collapsed: true,
        items: [
          { text: '指令', link: '/vue/vue2/基本概念与Vue指令' },
          { text: '动态绑定', link: '/vue/vue2/动态绑定' },
          { text: '组件', link: '/vue/vue2/组件' },
          { text: '动态组件', link: '/vue/vue2/动态组件' },
        ],
      },
      {
        text: '源码学习',
        collapsed: true,
        items: [
          { text: '核心源码及设计思想', link: '/vue/vue2/核心源码及设计思想' },
          { text: '手写Router及Vuex', link: '/vue/vue2/手写Router及Vuex' },
          { text: '阅读框架源码方法', link: '/vue/vue2/阅读框架源码方法' },
        ],
      },
    ],
  },
  {
    text: 'Vue3',
    collapsed: true,
    items: [
      {
        text: '概念学习',
        collapsed: true,
        items: [
          { text: '项目初始化', link: '/vue/vue3/项目初始化' },
          { text: '指令', link: '/vue/vue3/指令' },
          { text: '组件', link: '/vue/vue3/组件' },
          { text: '插槽', link: '/vue/vue3/插槽' },
          { text: '路由与状态管理', link: '/vue/vue3/路由与状态管理' },
          { text: '3.5增加的特性', link: '/vue/vue3/3.5增加的特性' },
        ],
      },
      {
        text: '源码学习',
        collapsed: true,
        items: [
          {
            text: '基建',
            collapsed: true,
            items: [
              { text: '项目搭建', link: '/vue/vue3/源码学习-项目搭建' },
              { text: '打包配置', link: '/vue/vue3/源码学习-打包配置' },
              { text: 'Monorepo', link: '/vue/vue3/源码学习-Monorepo管理' },
            ],
          },
          {
            text: '响应式',
            collapsed: true,
            items: [
              { text: 'Ref基础实现', link: '/vue/vue3/源码学习-Ref基础实现' },
              { text: 'Ref进阶优化', link: '/vue/vue3/源码学习-Ref进阶优化' },
              { text: 'Reactive实现', link: '/vue/vue3/源码学习-Reactive实现' },
              { text: 'Computed实现', link: '/vue/vue3/源码学习-Computed实现' },
              { text: 'Computed优化', link: '/vue/vue3/源码学习-Computed优化' },
              { text: 'Watch实现', link: '/vue/vue3/源码学习-Watch实现' },
              { text: '数组响应式', link: '/vue/vue3/源码学习-数组响应式' },
              {
                text: 'toRef、unRef、proxyRef',
                link: '/vue/vue3/源码学习-toRef、unRef、proxyRef',
              },
            ],
          },
          {
            text: '浏览器运行时',
            collapsed: true,
            items: [
              { text: '认识渲染器', link: '/vue/vue3/源码学习-认识渲染器' },
              { text: 'patchProp', link: '/vue/vue3/源码学习-patchProp' },
            ],
          },
          {
            text: '核心运行时',
            collapsed: true,
            items: [
              {
                text: 'h和createVNode的实现',
                link: '/vue/vue3/源码学习-h和createVNode的实现',
              },
            ],
          },
        ],
      },
    ],
  },
]

const react = [
  {
    text: '概念学习',
    collapsed: true,
    items: [
      { text: '无脚手架项目创建', link: '/react/无脚手架项目创建' },
      { text: 'Diff算法', link: '/react/Diff算法' },
      { text: '脚手架项目创建', link: '/react/脚手架项目创建' },
      { text: 'ReactRouter5', link: '/react/ReactRouter5' },
      { text: 'Redux', link: '/react/Redux' },
      { text: '拓展', link: '/react/拓展' },
      { text: 'ReactRouter6', link: '/react/ReactRouter6' },
    ],
  },
]

export { chart, sharp, module, css, js, vue, react }
