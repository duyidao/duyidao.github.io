/**
 * 学习模块 ************************************************************
 */
// 前端canvas的数组
export const CanvasSidebar = [
  {
    text: "📈 图表",
    collapsible: true,
    // collapsed: true,
    items: [
      {
        text: "🛹 Canvas",
        collapsible: true,
        collapsed: true,
        items: [
          { text: "图片压缩", link: "/Canvas/operation/compress" },
          { text: "图片滤镜", link: "/Canvas/operation/filter" },
          { text: "调色盘", link: "/Canvas/operation/palette" },
          { text: "页面截图", link: "/Canvas/operation/screenshot" },
          { text: "图片裁剪", link: "/Canvas/operation/tailor" },
          { text: "视频提取画面帧", link: "/Canvas/operation/video" },
          { text: "文件签名与画板功能", link: "/Canvas/operation/drawbed" },
          { text: "根据背景图片改变主题色", link: "/Canvas/operation/theme" },
        ],
      },
      {
        text: "✊ Echart",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "饼图中部内容自定义，点击图例中间内容修改",
            link: "/Canvas/project/饼图中部内容自定义，点击图例中间内容修改",
          },
          {
            text: "横向柱状图参数数量设置",
            link: "/Canvas/project/横向柱状图参数数量设置",
          },
          {
            text: "图表菜单项自定义",
            link: "/Canvas/project/图表菜单项自定义",
          },
          {
            text: "柱状图悬停文本自定义",
            link: "/Canvas/project/柱状图悬停文本自定义",
          },
          {
            text: "柱状图封装",
            link: "/Canvas/project/柱状图封装",
          },
          {
            text: "饼图轮播，hover图例后修改中间内容",
            link: "/Canvas/project/饼图轮播，hover图例后修改中间内容",
          },
        ],
      },
    ],
  },
];

// 前端css的数组
export const CssSidebar = [
  {
    text: "属性详解",
    collapsible: true,
    collapsed: true,
    items: [
      {
        text: "-webkit-box-reflect 实现倒影",
        link: "/CSS/属性详解/-webkit-box-reflect",
      },
      { text: "border-image 实现边框图片", link: "/CSS/属性详解/border-image" },
      { text: "clip-path 实现裁剪", link: "/CSS/属性详解/clip-path" },
      { text: "filter 实现滤镜", link: "/CSS/属性详解/filter" },
      {
        text: "backdrop-filter 实现背景滤镜",
        link: "/CSS/属性详解/backdrop-filter",
      },
      { text: "渐变", link: "/CSS/属性详解/gradient" },
      {
        text: "mix-blend-mode 实现文字适配背景",
        link: "/CSS/属性详解/mix-blend-mode",
      },
      { text: "scroll-snap 实现吸附", link: "/CSS/属性详解/scroll-snap" },
      { text: "vmin与vmax", link: "/CSS/属性详解/vmin与vmax" },
    ],
  },
  {
    text: "效果提升",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "主题过渡动画", link: "/CSS/效果提升/主题过渡动画" },
      { text: "变量", link: "/CSS/效果提升/变量" },
      { text: "宽度适配内容", link: "/CSS/效果提升/宽度适配内容" },
      { text: "瀑布流", link: "/CSS/效果提升/瀑布流" },
      { text: "巧用伪类", link: "/CSS/效果提升/巧用伪类" },
      { text: "文字立起效果", link: "/CSS/效果提升/文字立起效果" },
      { text: "文字连续光影特效", link: "/CSS/效果提升/文字连续光影特效" },
      { text: "文字适应纹理", link: "/CSS/效果提升/文字适应纹理" },
      { text: "下划线动画", link: "/CSS/效果提升/下划线动画" },
      { text: "svg滤镜", link: "/CSS/效果提升/svg滤镜" },
      {
        text: "B站banner鼠标移动效果揭秘",
        link: "/CSS/效果提升/B站banner鼠标移动效果揭秘",
      },
    ],
  },
  {
    text: "知识拓展",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "空白节点", link: "/CSS/知识拓展/空白节点" },
      { text: "粘性定位", link: "/CSS/知识拓展/粘性定位" },
      { text: "BEM", link: "/CSS/知识拓展/BEM" },
    ],
  },
];

// 前端js数组
export const JsSidebar = [
  {
    text: "🖇 Javascript 基础知识",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "Javascript", link: "/Javascript/markdown/" },
      { text: "运算符", link: "/Javascript/markdown/sort" },
      { text: "数据类型", link: "/Javascript/markdown/type" },
      { text: "数组", link: "/Javascript/markdown/array" },
      { text: "函数", link: "/Javascript/markdown/function" },
      { text: "对象", link: "/Javascript/markdown/object" },
      { text: "作用域与闭包", link: "/Javascript/markdown/scope_closure" },
      { text: "原型与原型链", link: "/Javascript/markdown/原型与原型链" },
      { text: "类", link: "/Javascript/markdown/类" },
      { text: "模块化", link: "/Javascript/markdown/模块化" },
      { text: "Promise", link: "/Javascript/markdown/Promise" },
      {
        text: "任务管理与Promise核心",
        link: "/Javascript/markdown/Promise核心",
      },
      { text: "Set", link: "/Javascript/markdown/set" },
      { text: "Map", link: "/Javascript/markdown/map" },
      { text: "Symbol", link: "/Javascript/markdown/symbol" },
      { text: "事件循环", link: "/Javascript/markdown/eventloop" },
    ],
  },
  {
    text: "⚙ Web API",
    collapsible: true,
    collapsed: true,
    items: [
      {
        text: "JavaScript『图片压缩』",
        link: "/Javascript_webapi/JavaScript『图片压缩』",
      },
      {
        text: "取色器封装 EyeDropper",
        link: "/Javascript_webapi/取色器封装",
      },
      {
        text: "网站访问用户文件夹 ShowDirectoryPicker",
        link: "/Javascript_webapi/网站访问用户文件夹",
      },
      {
        text: "迅雷下载触发",
        link: "/Javascript_webapi/迅雷下载触发",
      },
      {
        text: "resize函数封装 ResizeObserve",
        link: "/Javascript_webapi/resize函数封装",
      },
      {
        text: "声音的分析和处理 Audio",
        link: "/Javascript_webapi/声音的分析和处理",
      },
      {
        text: "网络状态监控 Navigator.connection",
        link: "/Javascript_webapi/网络状态监控",
      },
      {
        text: "复制粘贴与内容设置 Clipboard",
        link: "/Javascript_webapi/复制粘贴与内容设置",
      },
      {
        text: "页面自动检测更新",
        link: "/Javascript_webapi/页面自动检测更新",
      },
      {
        text: "数字转中文",
        link: "/Javascript_webapi/数字转中文",
      },
      {
        text: "拼音标注",
        link: "/Javascript_webapi/拼音标注",
      },
      {
        text: "文字转语音播放",
        link: "/Javascript_webapi/文字转语音播放",
      },
      {
        text: "地图数据展示",
        link: "/Javascript_webapi/地图数据展示",
      },
    ],
  },
];

// 前端Vue2、Vue3数组
export const VueSidebar = [
  {
    text: "Vue2",
    collapsible: true,
    items: [
      { text: "指令", link: "/vue/指令" },
      {
        text: "动态样式、计算属性、过滤器与侦听器",
        link: "/vue/动态样式、计算属性、过滤器与侦听器",
      },
      { text: "组件通信", link: "/vue/组件通信" },
      {
        text: "动态组件、插槽与自定义指令",
        link: "/vue/动态组件、插槽与自定义指令",
      },
      {
        text: "vue2核心源码及设计思想",
        link: "/vue/源码—vue2核心源码及设计思想",
      },
      {
        text: "从零手写VueRouter及Vuex",
        link: "/vue/源码—从零手写VueRouter及Vuex",
      },
      {
        text: "阅读框架源码方法",
        link: "/vue/源码—阅读框架源码方法",
      },
    ],
  },
  {
    text: "Vue3",
    collapsible: true,
    items: [
      { text: "vue3项目创建", link: "/vue/vue3项目创建" },
      { text: "vue3的使用", link: "/vue/vue3的使用" },
      { text: "组件", link: "/vue/组件" },
      { text: "插槽", link: "/vue/插槽" },
      { text: "自定义指令", link: "/vue/自定义指令" },
      { text: "内置组件", link: "/vue/内置组件" },
      { text: "pinia", link: "/vue/pinia" },
      { text: "Vue3新特性", link: "/vue/Vue3新特性" },
      {
        text: "源码",
        collapsible: true,
        items: [
          { text: "💴 前言", link: "/myVue3/" },
          {
            text: "🤺 基建",
            collapsible: true,
            items: [
              { text: "基础搭建", link: "/myVue3/dev" },
              { text: "打包配置", link: "/myVue3/build" },
              { text: "Monorepo扩展", link: "/myVue3/monorepo" },
            ],
          },
          {
            text: "⏰ 响应式",
            collapsible: true,
            items: [
              { text: "Ref 基础实现", link: "/myVue3/ref_start" },
              { text: "Ref 进阶实现", link: "/myVue3/ref_advance" },
              { text: "Reactive 进阶实现", link: "/myVue3/reactive" },
              { text: "Computed 实现", link: "/myVue3/compute_realize" },
            ],
          },
        ],
      },
    ],
  },
];

// 前端react数组
export const ReactSidebar = [
  {
    text: "React",
    collapsible: true,
    items: [
      { text: "无脚手架项目创建", link: "/React/" },
      { text: "Diff算法", link: "/React/react的diff算法" },
      { text: "脚手架项目创建", link: "/React/index_new" },
      { text: "ReactRouter5", link: "/React/react路由" },
      { text: "redux", link: "/React/redux" },
      { text: "react拓展", link: "/React/react拓展" },
      { text: "ReactRouter6", link: "/React/ReactRouter6" },
    ],
  },
];

// 前端TypeScript数组
export const TsSidebar = [
  {
    text: "TypeScript",
    collapsible: true,
    items: [
      { text: "环境配置", link: "/TypeScript/环境配置" },
      { text: "类型", link: "/TypeScript/类型" },
      { text: "断言与枚举", link: "/TypeScript/断言与枚举" },
      { text: "类与接口", link: "/TypeScript/类与接口" },
      { text: "泛型", link: "/TypeScript/泛型" },
      { text: "装饰器", link: "/TypeScript/装饰器" },
    ],
  },
];

// 前端工程图谱数组
export const UpgradeSidebar = [
  {
    text: "📸 Git",
    collapsible: true,
    collapsed: true,
    items: [
      {
        text: "🏋️ 实战训练",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "根据Change-id合并部分提交",
            link: "/Upgrade/Git/实战训练/根据ChangeId合并部分提交",
          },
          {
            text: "工作中项目git如何管理，冲突如何解决",
            link: "/Upgrade/Git/实战训练/工作中项目git如何管理，冲突如何解决",
          },
        ],
      },
      {
        text: "🚢 潜在的BUG",
        collapsible: true,
        collapsed: true,
        items: [
          { text: "大小写规则检测", link: "/Upgrade/Git/潜在的BUG/大小写规则" },
        ],
      },
    ],
  },
  {
    text: "🗄 正则",
    collapsible: true,
    collapsed: true,
    items: [
      {
        text: "📖 知识点",
        collapsible: true,
        collapsed: true,
        items: [
          { text: "正则表达式", link: "/Upgrade/Reg/" },
          { text: "元子字符", link: "/Upgrade/Reg/元子字符" },
          { text: "模式修饰", link: "/Upgrade/Reg/模式修饰" },
          { text: "原子", link: "/Upgrade/Reg/原子" },
          { text: "匹配", link: "/Upgrade/Reg/匹配" },
          { text: "方法", link: "/Upgrade/Reg/方法" },
        ],
      },
      {
        text: "🏋️ 实操演练",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "运用前瞻实现密码强度检测",
            link: "/Upgrade/Reg/do/运用前瞻实现密码强度检测",
          },
        ],
      },
      {
        text: "🚢 潜在BUG",
        collapsible: true,
        collapsed: true,
        items: [
          { text: "正则中的lastIndex", link: "/Upgrade/Reg/BUG/lastIndex" },
        ],
      },
    ],
  },
  {
    text: "💬 Node",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "node", link: "/Upgrade/Upgrade/Node/" },
      { text: "fs", link: "/Upgrade/Upgrade/Node/fs" },
      { text: "path", link: "/Upgrade/Upgrade/Node/path" },
      { text: "http", link: "/Upgrade/Upgrade/Node/http" },
      { text: "module", link: "/Upgrade/Upgrade/Node/module" },
      { text: "express", link: "/Upgrade/Upgrade/Node/express" },
      { text: "npm", link: "/Upgrade/Upgrade/Node/npm" },
    ],
  },
  {
    text: "〰 MiniProgram",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "两个线程", link: "/Upgrade/MiniProgram/" },
      // {
      //   text: "🏋️ 实战训练",
      //   collapsible: true,
      //   collapsed: true,
      //   items: [
      //   ],
      // },
    ],
  },
  {
    text: "🌐 网络",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "网络分层模型", link: "/Upgrade/Network/" },
      { text: "应用协议", link: "/Upgrade/Network/xieyi" },
      { text: "xhr与fetch", link: "/Upgrade/Network/xhr_fetch" },
      { text: "跨域问题及解决方案", link: "/Upgrade/Network/core" },
    ],
  },
  {
    text: "💻 浏览器",
    collapsible: true,
    collapsed: true,
    items: [{ text: "浏览器渲染原理", link: "/Upgrade/Browser/" }],
  },
  {
    text: "🚧 工程化",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "前端工程化的意义", link: "/Upgrade/Engineer/" },
      { text: "模块化和包管理", link: "/Upgrade/Engineer/module" },
      { text: "JS 工具链", link: "/Upgrade/Engineer/js" },
      { text: "CSS 工具链", link: "/Upgrade/Engineer/css" },
      { text: "构建工具和脚手架", link: "/Upgrade/Engineer/engineer" },
    ],
  },
  {
    text: "🗜️ 架构",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "前端工程化的意义", link: "/Upgrade/Framework/" },
      { text: "读与写的深度思考", link: "/Upgrade/Framework/getAndSet" },
    ],
  },
];

// 学习数组
export const StudySidebar = [
  {
    text: "📑 学无止境",
    collapsible: true,
    items: [
      {
        text: "🔏 JS相关",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "设计模式",
            collapsible: true,
            collapsed: true,
            items: [
              {
                text: "设计模式概念",
                link: "/study/js/设计模式/",
              },
              {
                text: "优化案例：商品卡不同类型代码如何实现",
                link: "/study/js/设计模式/优化案例：商品卡不同类型代码如何实现",
              },
              {
                text: "优化案例：请求的复用与兼容",
                link: "/study/js/设计模式/优化案例：请求的复用与兼容",
              },
              {
                text: "优化案例：视频列表只允许单个视频播放",
                link: "/study/js/设计模式/优化案例：视频列表只允许单个视频播放",
              },
            ],
          },
          {
            text: "类的多态",
            link: "/study/js/类的多态",
          },
          {
            text: "垃圾回收与内存泄漏",
            link: "/study/js/垃圾回收与console.log内存泄漏",
          },
          {
            text: "console.log对象时需要注意的坑",
            link: "/study/js/console.log对象时需要注意的坑",
          },
          {
            text: "windoe.onstorage标签页通信",
            link: "/study/js/windoe.onstorage标签页通信",
          },
          {
            text: "toFixed结果因精确度产生bug",
            link: "/study/js/toFixed结果因精确度产生bug",
          },
          {
            text: "Proxy与defineProperty",
            link: "/study/js/Proxy与defineProperty",
          },
          {
            text: "LocalStorage封装",
            link: "/study/js/LocalStorage封装",
          },
          {
            text: "判断是否是数组",
            link: "/study/js/判断是否是数组",
          },
          {
            text: "js深度克隆",
            link: "/study/js/js深度克隆",
          },
          {
            text: "吃透js执行顺序以及异步实战管理技巧",
            link: "/study/js/吃透js执行顺序以及异步实战管理技巧",
          },
          {
            text: "属性描述符",
            link: "/study/js/属性描述符",
          },
          {
            text: "Performance API",
            link: "/study/js/Performance",
          },
        ],
      },
      {
        text: "🎡 Promise相关",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "手写 Promise",
            collapsible: true,
            collapsed: true,
            items: [
              {
                text: "类与.then",
                link: "/study/promise/手写promise/类与.then",
              },
              {
                text: ".catch与.finally",
                link: "/study/promise/手写promise/catch",
              },
              {
                text: "静态方法",
                link: "/study/promise/手写promise/静态方法",
              },
            ],
          },
          {
            text: "Axios二次封装",
            link: "/study/promise/Axios二次封装",
          },
          {
            text: "请求取消",
            link: "/study/promise/请求取消",
          },
          {
            text: "并发请求封装",
            link: "/study/promise/并发请求封装",
          },
          {
            text: "并发任务控制",
            link: "/study/promise/并发任务控制",
          },
          {
            text: "高量级任务执行优化",
            link: "/study/promise/高量级任务执行优化",
          },
          {
            text: "消除异步传染性",
            link: "/study/promise/消除异步传染性",
          },
        ],
      },
      {
        text: "☸️ Vue相关",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "Vue组件内的模板复用",
            link: "/study/vue/Vue组件内的模板复用",
          },
          {
            text: "Vue组件状态重置",
            link: "/study/vue/Vue组件状态重置",
          },
          {
            text: "全局状态管理",
            link: "/study/vue/全局状态管理",
          },
          {
            text: "父组件监听子组件生命周期",
            link: "/study/vue/父组件监听子组件生命周期",
          },
          {
            text: "$nexttick",
            link: "/study/vue/$nexttick",
          },
          {
            text: "customRef实现全局loading封装",
            link: "/study/vue/customRef实现全局loading封装",
          },
          {
            text: "ref和reactive在使用上的区别",
            link: "/study/vue/ref和reactive在使用上的区别",
          },
          {
            text: "Vue2 VS Vue3",
            link: "/study/vue/Vue2 VS Vue3",
          },
          {
            text: "v-model双向绑定",
            link: "/study/vue/v-model双向绑定",
          },
          {
            text: "Vue图片动态引入使用require",
            link: "/study/vue/vue图片动态引入使用require",
          },
          {
            text: "Vue项目打包后首页白屏总结",
            link: "/study/vue/vue项目打包后首页白屏总结",
          },
          {
            text: "Vue项目对render和jsx的妙用",
            link: "/study/vue/Vue项目对render和jsx的妙用",
          },
          {
            text: "Vue项目中TS意义与麻烦",
            link: "/study/vue/Vue项目中TS意义与麻烦",
          },
          {
            text: "Vue更新机制和优化",
            link: "/study/vue/Vue的更新",
          },
          {
            text: "Vue常见优化手段",
            link: "/study/vue/Vue常见优化手段",
          },
        ],
      },
      {
        text: "📈 项目相关",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "HBuilder使用模拟器调试",
            link: "/study/item/HBuilder使用模拟器调试",
          },
          {
            text: "BFF层架构",
            link: "/study/item/BFF层架构",
          },
          {
            text: "import引入库引入的什么",
            link: "/study/item/import引入库引入的什么",
          },
          {
            text: "sass加css变量实现现代前端换肤",
            link: "/study/item/sass加css变量实现现代前端换肤",
          },
          {
            text: "绝对路径与相对路径",
            link: "/study/item/绝对路径与相对路径",
          },
          {
            text: "资源提示符",
            link: "/study/item/资源提示符",
          },
          {
            text: "dataUrl与base64的区别",
            link: "/study/item/dataUrl与base64的区别",
          },
        ],
      },
      {
        text: "🚢 优化相关",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "优化项目速度",
            link: "/study/optimize/优化项目速度",
          },
          {
            text: "初步性能优化",
            link: "/study/optimize/性能优化",
          },
          {
            text: "性能优化评估",
            link: "/study/optimize/中级性能优化",
          },
          {
            text: "资源加载优化",
            link: "/study/optimize/资源加载优化",
          },
          {
            text: "页面加载慢排查与解决方案",
            link: "/study/optimize/页面加载慢排查与解决方案",
          },
          {
            text: "打包优化",
            link: "/study/optimize/打包优化",
          },
        ],
      },
    ],
  },
  {
    text: "🚴 实操训练",
    collapsible: true,
    items: [
      {
        text: "⚙ 功能操作与实现",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "Vue项目权限控制",
            link: "/study/handle/Vue项目权限控制",
          },
          {
            text: "摆脱手动依赖引入，自动引入依赖",
            link: "/study/handle/摆脱手动依赖引入，自动引入依赖",
          },
          {
            text: "操作内嵌ifrname与传递消息",
            link: "/study/handle/操作内嵌ifrname与传递消息",
          },
          {
            text: "从一个需求出发如何更优雅写代码",
            link: "/study/handle/从一个需求出发如何更优雅写代码",
          },
          {
            text: "富文本编辑器",
            link: "/study/handle/富文本编辑器",
          },
          {
            text: "前端操作excel与word",
            link: "/study/handle/前端操作excel与word",
          },
          {
            text: "前端文件上传与相关操作",
            link: "/study/handle/前端文件上传与相关操作",
          },
          {
            text: "前端下载后端传输的文件",
            link: "/study/handle/前端下载后端传输的文件",
          },
          {
            text: "移动端大屏端布局适配",
            link: "/study/handle/移动端大屏端布局适配",
          },
          {
            text: "元素不定大小隐藏做溢出隐藏",
            link: "/study/handle/元素不定大小隐藏做溢出隐藏",
          },
          {
            text: "前端滚动锚点注意事项",
            link: "/study/handle/前端滚动锚点注意事项",
          },
        ],
      },
      {
        text: "🎁 组件封装与二开",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "Vue3 + TS 二次封装组件库组件",
            link: "/study/package/vue3+ts二次封装组件库组件",
          },
          {
            text: "组合式函数封装",
            link: "/study/package/组合式函数封装",
          },
          {
            text: "Vue重复小组件处理经验",
            link: "/study/package/vue重复小组件处理经验",
          },
          {
            text: "Vue组件设计技巧",
            link: "/study/package/vue组件设计技巧",
          },
          {
            text: "对话框弹窗组件",
            link: "/study/package/对话框弹窗组件",
          },
          {
            text: "输入框组件封装",
            link: "/study/package/输入框组件封装",
          },
          {
            text: "通过el-calendar实现业务",
            link: "/study/package/通过el-calendar实现业务",
          },
          {
            text: "通过el-select实现多个省略学习如何改造第三方组件满足自己的要求",
            link: "/study/package/通过el-select实现多个省略学习如何改造第三方组件满足自己的要求",
          },
          {
            text: "通过el-table实现多数据完美无限滚动效果",
            link: "/study/package/通过el-table实现多数据完美无限滚动效果",
          },
          {
            text: "elememntui日历二次修改",
            link: "/study/package/elememntui日历二次修改",
          },
          {
            text: "页码列表组件封装思路",
            link: "/study/package/页码列表组件封装思路",
          },
          {
            text: "组件库搭建",
            link: "/study/package/组件库搭建",
          },
        ],
      },
      {
        text: "🏋️ 项目实战与训练",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "通过状态思维应对多变页面",
            link: "/study/train/通过状态思维应对多变页面",
          },
          {
            text: "Vue复杂联动表单",
            link: "/study/train/Vue复杂联动表单",
          },
          {
            text: "通过动态列表学习数据思维",
            link: "/study/train/通过动态列表学习数据思维",
          },
          {
            text: "实战中有用的TypeScript项目技巧",
            link: "/study/train/实战中有用的ts项目技巧",
          },
          {
            text: "前端不同屏幕尺寸自适应与大屏移动端开发",
            link: "/study/train/前端不同屏幕尺寸自适应与大屏移动端开发",
          },
          {
            text: "前端工具函数开发",
            link: "/study/train/前端工具函数开发",
          },
          {
            text: "需求架构设计并优雅实现",
            link: "/study/train/需求架构设计并优雅实现",
          },
        ],
      },
      {
        text: "🐍 项目配置与测试",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "前端代码风格定制",
            link: "/study/test/前端代码风格定制",
          },
          {
            text: "前端自动化测试",
            link: "/study/test/前端自动化测试",
          },
          {
            text: "前端环境变量使用和原理",
            link: "/study/test/前端环境变量使用和原理",
          },
          {
            text: "前端部署与缓存管理",
            link: "/study/test/前端部署与缓存管理",
          },
          {
            text: "前端Bug调试指南",
            link: "/study/test/前端Bug调试指南",
          },
        ],
      },
    ],
  },
];
