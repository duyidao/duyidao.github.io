/**
 * 公共函数方法，生成侧边栏数据 ************************************************************
 */
function generateSidebarItems(arr) {
  return arr.map(item => ({
    ...item,
    text: item.text,
    ...(item.link ? { link: item.link } : {}),
    ...(item.items ? { items: generateSidebarItems(item.items) } : {}),
  }));
}


/**
 * 学习模块 ************************************************************
 */
// 前端canvas的数组
const CanvasSidebar = [
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
]

// 前端css的数组
const CssSidebar = [
  {
    text: "属性详解",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "-webkit-box-reflect 实现倒影", link: "/CSS/属性详解/-webkit-box-reflect" },
      { text: "border-image 实现边框图片", link: "/CSS/属性详解/border-image" },
      { text: "clip-path 实现裁剪", link: "/CSS/属性详解/clip-path" },
      { text: "filter 实现滤镜", link: "/CSS/属性详解/filter" },
      { text: "backdrop-filter 实现背景滤镜", link: "/CSS/属性详解/backdrop-filter" },
      { text: "渐变", link: "/CSS/属性详解/gradient" },
      { text: "mix-blend-mode 实现文字适配背景", link: "/CSS/属性详解/mix-blend-mode" },
      { text: "scroll-snap 实现吸附", link: "/CSS/属性详解/scroll-snap" },
      { text: "vmin与vmax", link: "/CSS/属性详解/vmin与vmax" },
    ],
  },
  {
    text: "效果提升",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "变量", link: "/CSS/效果提升/变量" },
      { text: "宽度适配内容", link: "/CSS/效果提升/宽度适配内容" },
      { text: "瀑布流", link: "/CSS/效果提升/瀑布流" },
      { text: "巧用伪类", link: "/CSS/效果提升/巧用伪类" },
      { text: "文字立起效果", link: "/CSS/效果提升/文字立起效果" },
      { text: "文字连续光影特效", link: "/CSS/效果提升/文字连续光影特效" },
      { text: "文字适应纹理", link: "/CSS/效果提升/文字适应纹理" },
      { text: "下划线动画", link: "/CSS/效果提升/下划线动画" },
      { text: "svg滤镜", link: "/CSS/效果提升/svg滤镜" },
      { text: "B站banner鼠标移动效果揭秘", link: "/CSS/效果提升/B站banner鼠标移动效果揭秘" },
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
  }
]

// 前端js数组
const JsSidebar = [
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
]

// 前端Vue2、Vue3数组
const VueSidebar = [
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
      { text: "源码", link: "/vue/源码" },
    ],
  },
]

// 前端react数组
const ReactSidebar = [
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
]

// 前端TypeScript数组
const TsSidebar = [
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
]

// 前端工程图谱数组
const UpgradeSidebar = [
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
          { text: "根据Change-id合并部分提交", link: "/Upgrade/Git/实战训练/根据ChangeId合并部分提交" },
          { text: "工作中项目git如何管理，冲突如何解决", link: "/Upgrade/Git/实战训练/工作中项目git如何管理，冲突如何解决" },
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
    items: [
      { text: "浏览器渲染原理", link: "/Upgrade/Browser/" },
    ],
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
]

// 学习数组
const StudySidebar = [
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
            text: "垃圾回收与内存泄漏",
            link: "/study/js/垃圾回收与console.log内存泄漏.md",
          },
          {
            text: "console.log对象时需要注意的坑",
            link: "/study/js/console.log对象时需要注意的坑.md",
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
            text: "设计模式",
            link: "/study/js/设计模式",
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
            text: "Axios二次封装",
            link: "/study/promise/Axios二次封装",
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
            text: "多接口请求",
            link: "/study/promise/多接口请求",
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
            text: "灵活使用冻结对象提升代码效率",
            link: "/study/vue/灵活使用冻结对象提升代码效率",
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
          { text: "HBuilder使用模拟器调试", link: "/study/item/HBuilder使用模拟器调试" },
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
        ]
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
]

/**
 * 项目模块 ************************************************************
 */
// 项目的数组
const ProjectSidebar = [
  {
    text: "项目",
    items: [
      { text: "🧟 灵思", link: "/lingsi/" },
      { text: "⛷️百度外包", link: "/baidu/" },
      { text: "🔪 刀刀博客", link: "/daodao/" },
      { text: "📜 自主学习", link: "/myself/" },
    ],
  },
]

// 音果云音的数组
const MyVue3Sidebar = [
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
]

// 灵思的数组
const LingsiSidebar = [
  {
    text: "🧟 灵思",
    items: [
      { text: "🎶 音果云音", link: "/lingsi/music/" },
      { text: "🔧 职技网", link: "/lingsi/职技网/" },
      { text: "💴 视频分销", link: "/lingsi/sale/" },
      { text: "🧫 华润水泥", link: "/lingsi/水泥/" },
      { text: "🔍 CRM", link: "/lingsi/crm/" },
      { text: "🎲 ELK", link: "/lingsi/elk/" },
      { text: "🗑 返回", link: "/project/" },
    ],
  },
]

// 音果云音的数组
const MusicSidebar = [
  { text: "简介", link: "/lingsi/music/" },
  {
    text: "📱 APP",
    collapsible: true,
    items: [
      { text: "登录", link: "/lingsi/music/APP/login" },
      { text: "tabbar", link: "/lingsi/music/APP/tabbar" },
      { text: "详情", link: "/lingsi/music/APP/detail" },
      { text: "分享", link: "/lingsi/music/APP/share" },
      { text: "测试", link: "/lingsi/music/APP/test" },
      { text: "操作", link: "/lingsi/music/APP/do" },
      { text: "商品", link: "/lingsi/music/APP/sku" },
      { text: "支付", link: "/lingsi/music/APP/pay" },
      { text: "更新", link: "/lingsi/music/APP/update" },
      { text: "个人", link: "/lingsi/music/APP/userinfo" },
    ],
  },
  {
    text: "💻 H5",
    collapsible: true,
    items: [
      { text: "海报页", link: "/lingsi/music/H5/" },
      { text: "🗑 返回", link: "/lingsi/" },
    ],
  },
]

// 职技网的数组
const JobSidebar = [
  {
    text: "🔧 职技网",
    collapsible: true,
    items: [
      { text: "介绍", link: "/lingsi/职技网/" },
      { text: "项目创建", link: "/lingsi/职技网/项目创建" },
      {
        text: "vant组件二次封装",
        link: "/lingsi/职技网/vant组件二次封装",
      },
      { text: "微信授权", link: "/lingsi/职技网/微信授权" },
      { text: "下载附件", link: "/lingsi/职技网/下载附件" },
      { text: "🗑 返回", link: "/lingsi/" },
    ],
  },
]

// 视频分销的数组
const SaleSidebar = [
  {
    text: "💴 视频分销",
    collapsible: true,
    items: [
      { text: "简介", link: "/lingsi/sale/" },
      { text: "请求封装", link: "/lingsi/sale/request" },
      { text: "token刷新", link: "/lingsi/sale/token" },
      { text: "微信授权快捷登录", link: "/lingsi/sale/获取手机号" },
      { text: "附件下载", link: "/lingsi/sale/preview" },
      { text: "分享", link: "/lingsi/sale/分享" },
      { text: "商城", link: "/lingsi/sale/商城" },
      { text: "视频轮播", link: "/lingsi/sale/video" },
      { text: "图片上传组件封装", link: "/lingsi/sale/upload" },
      { text: "关注公众号", link: "/lingsi/sale/关注公众号" },
      { text: "🗑 返回", link: "/lingsi/" },
    ],
  },
]

// 华润水泥的数组
const CementSidebar = [
  {
    text: "🧫 华润水泥",
    collapsible: true,
    items: [
      { text: "引言", link: "/lingsi/水泥/" },
      {
        text: "图片对比可拖拽轮子",
        link: "/lingsi/水泥/图片对比可拖拽轮子",
      },
      { text: "vue_color", link: "/lingsi/水泥/vue_color" },
      {
        text: "🎭 jeecg",
        collapsible: true,
        items: [
          {
            text: "表格行选中",
            link: "/lingsi/水泥/jeecg/表格行选中",
          },
          {
            text: "树组件默认展开",
            link: "/lingsi/水泥/jeecg/树组件默认展开",
          },
          {
            text: "j-vxe-table搭配其他组件",
            link: "/lingsi/水泥/jeecg/j-vxe-table搭配其他组件",
          },
        ],
      },
      { text: "🗑 返回", link: "/lingsi/" },
    ],
  },
]

// ELK的数组
const ELKSidebar = [
  {
    text: "🎲 ELK",
    collapsible: true,
    items: [
      { text: "简介", link: "/lingsi/elk/" },
      {
        text: "接收后端返回的二进制流文件",
        link: "/lingsi/elk/blob",
      },
      { text: "vue-core的使用", link: "/lingsi/elk/vue_core" },
      { text: "Canvas绘制表格图", link: "/lingsi/elk/canvas_table" },
      { text: "DIV可编辑文本", link: "/lingsi/elk/edit_div" },
      { text: "JSON编辑器", link: "/lingsi/elk/edit_JSON" },
      { text: "导出PDF", link: "/lingsi/elk/pdf" },
      { text: "🗑 返回", link: "/lingsi/" },
    ],
  },
]

// CRM的数组
const CRMSidebar = [
  {
    text: "🔍 crm",
    collapsible: true,
    items: [
      { text: "简介", link: "/lingsi/crm/" },
      { text: "拨打电话", link: "/lingsi/crm/call" },
      { text: "navigateBack传参", link: "/lingsi/crm/navigateBack" },
      { text: "域名配置", link: "/lingsi/crm/部署" },
      { text: "微信授权", link: "/lingsi/crm/微信授权" },
      { text: "🗑 返回", link: "/lingsi/" },
    ],
  },
]

// 刀刀博客的数组
const DaodaoSidebar = [
  {
    text: "🔪 刀刀博客",
    collapsible: true,
    items: [
      { text: "🔪 引言", link: "/daodao/" },
      { text: "🦌 自动路由", link: "/daodao/router" },
      { text: "🌺 自动导入", link: "/daodao/自动导入" },
      { text: "📈 svg封装", link: "/daodao/svg" },
      { text: "🦩 适应性布局", link: "/daodao/适应性布局" },
      { text: "☁️ 天气获取", link: "/daodao/天气获取" },
      { text: "💻 代码编辑器", link: "/daodao/代码编辑器" },
      { text: "🐛 捉虫记录", link: "/daodao/bug" },
      { text: "🖼️ 优化", link: "/daodao/prod" },
      { text: "🗑 返回", link: "/project/" },
    ],
  },
]

// 百度的数组
const BaiduSidebar = [
  {
    text: "⛷️ 百度",
    collapsible: true,
    items: [
      { text: "⛷️ 引言", link: "/baidu/" },
      { text: "🗺 图层", link: "/baidu/layer/" },
      { text: "🎞️ 佛开", link: "/baidu/fokai/LED/" },
      { text: "🗑 返回", link: "/project/" },
    ],
  },
]

// 图层的数组
const LayerSidebar = [
  {
    text: "🗺 图层",
    collapsible: true,
    items: [
      { text: "💡 介绍", link: "/baidu/layer/" },
      { text: "📦 封装", link: "/baidu/layer/封装" },
      { text: "⛑️ 规范", link: "/baidu/layer/规范" },
      { text: "🌊 样式", link: "/baidu/layer/样式" },
      { text: "🗺 MapVThree", link: "/baidu/layer/MapVThree" },
      { text: "🏓 优化", link: "/baidu/layer/优化" },
      { text: "⚙️ 功能", link: "/baidu/layer/功能" },
      { text: "🇺🇳 POC", link: "/baidu/layer/Poc" },
      { text: "🕶️ BUG", link: "/baidu/layer/bug" },
      { text: "🗑 返回", link: "/baidu/" },
    ],
  },
]

// 佛开的数组
const FokaiSidebar = [
  {
    text: "🎞️ 佛开",
    collapsible: true,
    items: [
      {
        text: "🖥 平台",
        collapsible: true,
        items: [
          { text: "💡 介绍", link: "/baidu/fokai/platform/" },
          { text: "👣 组件", link: "/baidu/fokai/platform/component" },
          { text: "⏭️ 3d跳转", link: "/baidu/fokai/platform/3d跳转" },
        ]
      },
      {
        text: "💡 LED大屏",
        collapsible: true,
        items: [
          { text: "💡 介绍", link: "/baidu/fokai/LED/" },
          { text: "🟥 样式", link: "/baidu/fokai/LED/style" },
          { text: "🛑 覆盖物", link: "/baidu/fokai/LED/overlay" },
          { text: "💻 Ws", link: "/baidu/fokai/LED/ws" },
          { text: "📦 打包", link: "/baidu/fokai/LED/build" },
        ]
      },
      { text: "🗑 返回", link: "/baidu/" },
    ],
  },
]

// 自主学习的数组
const SelfstudySidebar = [
  {
    text: "📕 自主学习",
    collapsible: true,
    items: [
      { text: "📕 引言", link: "/myself/" },
      { text: "🐇 小兔鲜", link: "/myself/小兔鲜/inweb/all" },
      { text: "🐂 硅谷甄选", link: "/myself/硅谷甄选/" },
      { text: "⛑ 尚医通", link: "/myself/尚医通/" },
      { text: "🎎 react后台", link: "/myself/react后台/" },
      { text: "📰 知乎日报", link: "/myself/知乎日报/react版/" },
      { text: "👨‍⚕️ 优医问诊", link: "/myself/优医问诊/" },
      { text: "🗑 返回", link: "/project/" },
    ],
  },
]

// 小兔鲜的数组
const RabitSidebar = [
  {
    text: "🐇 小兔鲜",
    collapsible: true,
    items: [
      {
        text: "💻 Web 端",
        collapsible: true,
        collapsed: true,
        items: [
          { text: "项目介绍", link: "/myself/小兔鲜/inweb/all" },
          { text: "项目创建", link: "/myself/小兔鲜/inweb/" },
          { text: "Layout", link: "/myself/小兔鲜/inweb/layout" },
          { text: "Home", link: "/myself/小兔鲜/inweb/home" },
          { text: "分类", link: "/myself/小兔鲜/inweb/一级分类" },
          { text: "详情", link: "/myself/小兔鲜/inweb/detail" },
          { text: "登录", link: "/myself/小兔鲜/inweb/login" },
          { text: "购物车", link: "/myself/小兔鲜/inweb/购物车" },
          { text: "Sku思路", link: "/myself/小兔鲜/inweb/sku" },
        ],
      },
      {
        text: "📱 uniapp 跨端",
        collapsible: true,
        collapsed: true,
        items: [
          { text: "项目初始化", link: "/myself/小兔鲜/inuni/" },
          { text: "首页", link: "/myself/小兔鲜/inuni/home" },
          { text: "猜你喜欢", link: "/myself/小兔鲜/inuni/guess" },
          { text: "登录", link: "/myself/小兔鲜/inuni/login" },
          { text: "分包", link: "/myself/小兔鲜/inuni/pagesmember" },
          { text: "订单详情", link: "/myself/小兔鲜/inuni/detail" },
          { text: "打包", link: "/myself/小兔鲜/inuni/build" },
        ],
      },
      { text: "🗑 返回", link: "/myself/" },
    ],
  },
]

// 硅谷甄选的数组
const SelectSidebar = [
  {
    text: "🐂 硅谷甄选",
    collapsible: true,
    items: [
      { text: "项目初始化", link: "/myself/硅谷甄选/" },
      { text: "路由模块", link: "/myself/硅谷甄选/路由" },
      { text: "状态管理", link: "/myself/硅谷甄选/状态管理" },
      { text: "属性管理", link: "/myself/硅谷甄选/属性管理" },
      { text: "SPU管理", link: "/myself/硅谷甄选/SPU管理" },
      { text: "设置", link: "/myself/硅谷甄选/设置" },
      { text: "数据大屏", link: "/myself/硅谷甄选/数据大屏" },
      { text: "🗑 返回", link: "/myself/" },
    ],
  },
]

// 尚医通的数组
const DoctorSidebar = [
  {
    text: "⛑ 尚医通",
    collapsible: true,
    items: [
      { text: "项目初始化", link: "/myself/尚医通/" },
      { text: "🗑 返回", link: "/myself/" },
    ],
  },
]

// react后台的数组
const BackstageSidebar = [
  {
    text: "🎎 react后台",
    collapsible: true,
    items: [
      { text: "项目初始化", link: "/myself/react后台/" },
      { text: "菜单栏配置", link: "/myself/react后台/menu" },
      { text: "仓库配置", link: "/myself/react后台/redux" },
      { text: "路由守卫", link: "/myself/react后台/守卫" },
      { text: "🗑 返回", link: "/myself/" },
    ],
  },
]

// 知乎日报的数组
const PaperSidebar = [
  {
    text: "📰 知乎日报",
    collapsible: true,
    items: [
      {
        text: "React版",
        collapsible: true,
        collapsed: true,
        items: [
          { text: "项目初始化", link: "/myself/知乎日报/react版/" },
          {
            text: "路由配置",
            link: "/myself/知乎日报/react版/router",
          },
          {
            text: "仓库配置",
            link: "/myself/知乎日报/react版/redux",
          },
          { text: "接口配置", link: "/myself/知乎日报/react版/api" },
          { text: "组件配置", link: "/myself/知乎日报/react版/组件" },
        ],
      },
      {
        text: "Vue3+TS版",
        collapsible: true,
        collapsed: true,
        items: [],
      },
      { text: "🗑 返回", link: "/myself/" },
    ],
  },
]

// 优医问诊的数组
const ConsultationSidebar = [
  {
    text: "👨‍⚕️ 优医问诊",
    collapsible: true,
    items: [
      { text: "项目初始化", link: "/myself/优医问诊/" },
      { text: "登录模块", link: "/myself/优医问诊/login" },
      { text: "用户模块", link: "/myself/优医问诊/user" },
      { text: "极速问诊", link: "/myself/优医问诊/consult" },
      { text: "🗑 返回", link: "/myself/" },
    ],
  },
]


/**
 * 阅读模块 ************************************************************
 */
// 阅读数组
const ReadSidebar = [
  {
    text: "📖 阅读",
    collapsible: true,
    items: [
      { text: "✨ 索引", link: "/read/" },
      {
        text: "Javascript",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "ES6标准入门",
            collapsible: true,
            collapsed: true,
            items: [
              { text: "索引", link: "/read/javascript/ES6标准入门/" },
              { text: "第一章 ECMAScript6简介", link: "/read/javascript/ES6标准入门/1" },
              { text: "第二章 Let 和 const 命令", link: "/read/javascript/ES6标准入门/2" },
              { text: "第三章 变量的解构赋值", link: "/read/javascript/ES6标准入门/3" },
              { text: "第四章 字符串的扩展", link: "/read/javascript/ES6标准入门/4" },
              { text: "第五章 正则的扩展", link: "/read/javascript/ES6标准入门/5" },
              { text: "第六章 数值的扩展", link: "/read/javascript/ES6标准入门/6" },
              { text: "第七章 函数的扩展", link: "/read/javascript/ES6标准入门/7" },
              { text: "第八章 数组的扩展", link: "/read/javascript/ES6标准入门/8" },
              { text: "第九章 对象的扩展", link: "/read/javascript/ES6标准入门/9" },
              { text: "第十章 Symbol的扩展", link: "/read/javascript/ES6标准入门/10" },
              { text: "第十一章 Set和Map数据结构", link: "/read/javascript/ES6标准入门/11" },
              { text: "第十二章 Proxy", link: "/read/javascript/ES6标准入门/12" },
              { text: "第十三章 Reflect", link: "/read/javascript/ES6标准入门/13" },
              { text: "第十四章 Promise对象", link: "/read/javascript/ES6标准入门/14" },
              { text: "第十五章 Iterator和for...of循环", link: "/read/javascript/ES6标准入门/15" },
              { text: "第十六章 Generator函数的语法", link: "/read/javascript/ES6标准入门/16" },
              { text: "第十七章 Generator函数的异步应用", link: "/read/javascript/ES6标准入门/17" },
              { text: "第十八章 async函数", link: "/read/javascript/ES6标准入门/18" },
              { text: "第十九章 Class的基本语法", link: "/read/javascript/ES6标准入门/19" },
              { text: "第二十章 Class的继承", link: "/read/javascript/ES6标准入门/20" },
              { text: "第二十一章 修饰器", link: "/read/javascript/ES6标准入门/21" },
              { text: "第二十二章 Module的语法", link: "/read/javascript/ES6标准入门/22" },
              { text: "第二十三章 Module的加载实现", link: "/read/javascript/ES6标准入门/23" },
              { text: "第二十四章 编程风格", link: "/read/javascript/ES6标准入门/24" },
              { text: "第二十五章 读懂ECMAScript规格", link: "/read/javascript/ES6标准入门/25" },
              { text: "第二十六章 ArrayBuffer", link: "/read/javascript/ES6标准入门/26" },
            ],
          },
        ],
      },
      {
        text: "Vue",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "Vue.js设计与实现",
            collapsible: true,
            collapsed: true,
            items: [
              { text: "索引", link: "/read/Vue/Vue.js设计与实现/" },
              { text: "1", link: "/read/Vue/Vue.js设计与实现/1" },
              { text: "2", link: "/read/Vue/Vue.js设计与实现/2" },
              { text: "3", link: "/read/Vue/Vue.js设计与实现/3" },
              { text: "4", link: "/read/Vue/Vue.js设计与实现/4" },
              { text: "5", link: "/read/Vue/Vue.js设计与实现/5" },
              { text: "6", link: "/read/Vue/Vue.js设计与实现/6" },
              { text: "7", link: "/read/Vue/Vue.js设计与实现/7" },
              { text: "8", link: "/read/Vue/Vue.js设计与实现/8" },
              { text: "9", link: "/read/Vue/Vue.js设计与实现/9" },
              { text: "10", link: "/read/Vue/Vue.js设计与实现/10" },
              { text: "11", link: "/read/Vue/Vue.js设计与实现/11" },
              { text: "12", link: "/read/Vue/Vue.js设计与实现/12" },
              { text: "13", link: "/read/Vue/Vue.js设计与实现/13" },
              { text: "14", link: "/read/Vue/Vue.js设计与实现/14" },
              { text: "15", link: "/read/Vue/Vue.js设计与实现/15" },
              { text: "16", link: "/read/Vue/Vue.js设计与实现/16" },
              { text: "17", link: "/read/Vue/Vue.js设计与实现/17" },
              { text: "18", link: "/read/Vue/Vue.js设计与实现/18" },
            ]
          },
        ],
      },
    ],
  },
]

/**
 * 部署模块 ************************************************************
 */
// 部署数组
const VitePressSidebar = [
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
        ]
      },
    ],
  },
]


/**
 * 帮助模块 ************************************************************
 */
// 帮助数组
const HelpSidebar = [
  {
    text: "📴 有用的帮助",
    collapsible: true,
    items: [
      { text: "🎃 开发帮助", link: "/help/" },
      { text: "📕 官方文档", link: "/help/官方文档" },
    ],
  },
]


/**
 * 关于模块 ************************************************************
 */
// 关于数组
const AboutSidebar = [
  {
    text: "⭐ 关于",
    collapsible: true,
    items: [
      { text: "🧑 关于我", link: "/about/" },
      { text: "🔪 关于刀刀博客", link: "/about/blog" },
      { text: "📑 关于学习准则", link: "/about/furtrue" },
      { text: "🧟 关于灵思", link: "/about/lingsi" },
      { text: "⛷️ 关于百度", link: "/about/baidu" },
    ],
  },
]


/**
 * 面试模块 ************************************************************
 */
// 面试典数组
const InterviewSidebar = [
  {
    text: "📔 面试题典",
    collapsible: true,
    items: [
      {
        text: "Javascript",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "(a==1&&a==2&&a==3)",
            link: "/interview/js/(a==1&&a==2&&a==3)",
          },
          {
            text: "数组方法手写原理",
            link: "/interview/js/数组方法手写原理",
          },
          {
            text: "关于forEach使用break跳出循环",
            link: "/interview/js/关于forEach使用break跳出循环",
          },
          { text: "手写封装AJAX", link: "/interview/js/手写封装AJAX" },
          { text: "数组去重", link: "/interview/js/数组去重" },
          { text: "js执行顺序", link: "/interview/js/js执行顺序" },
        ]
      },
      {
        text: "项目",
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: "前端面试项目亮点和难点",
            link: "/interview/project/前端面试项目亮点和难点",
          },
          {
            text: "前端经验与水平体现",
            link: "/interview/project/前端经验与水平体现",
          },
          {
            text: "代码评审的18条军规",
            link: "/interview/project/代码评审的18条军规",
          },
        ]
      },
    ],
  },
  {
    text: "👨‍⚖️ 面试问答",
    collapsible: true,
    items: [
      {
        text: "面试历程",
        link: "/interview/",
      },
      {
        text: "印萌",
        link: "/interview/印萌",
      },
      {
        text: "百度",
        link: "/interview/百度",
      },
      {
        text: "穗腾科技",
        link: "/interview/穗腾科技",
      },
    ],
  },
  {
    text: "🧮 面试算法",
    collapsible: true,
    items: [
      {
        text: "简单题",
        collapsible: true,
        collapsed: true,
        items: [
          { text: "罗马转数字", link: "/interview/easy/罗马转数字.md" },
          { text: "合并两个有序数组", link: "/interview/easy/合并两个有序数组.md" },
          { text: "最长公共前缀", link: "/interview/easy/最长公共前缀.md" },
          { text: "移除元素", link: "/interview/easy/移除元素.md" },
          { text: "删除有序数组中的重复项", link: "/interview/easy/删除有序数组中的重复项.md" },
          { text: "多数元素", link: "/interview/easy/多数元素.md" },
        ],
      },
      {
        text: "中等题",
        collapsible: true,
        collapsed: true,
        items: [
          { text: "轮转数组", link: "/interview/medium/轮转数组.md" },
        ],
      },
      {
        text: "系列题",
        collapsible: true,
        items: [
          {
            text: "买卖股票的最佳时机",
            collapsible: true,
            collapsed: true,
            items: [
              { text: "买卖股票的最佳时机", link: "/interview/series/buySellStock/买卖股票的最佳时机.md" },
              { text: "买卖股票的最佳时机 II", link: "/interview/series/buySellStock/买卖股票的最佳时机 II.md" },
            ],
          },
          {
            text: "删除有序数组中的重复项",
            collapsible: true,
            collapsed: true,
            items: [
              { text: "删除有序数组中的重复项", link: "/interview/series/removeRepeat/删除有序数组中的重复项.md" },
              { text: "删除有序数组中的重复项 II", link: "/interview/series/removeRepeat/删除有序数组中的重复项 II.md" },
            ],
          },
        ],
      },
    ],
  },
]


/**
 * 最终导出 ************************************************************
 */
export default {
  "/Canvas": generateSidebarItems(CanvasSidebar),
  "/CSS": generateSidebarItems(CssSidebar),
  "/Javascript": generateSidebarItems(JsSidebar),
  "/vue": generateSidebarItems(VueSidebar),
  "/React": generateSidebarItems(ReactSidebar),
  "/TypeScript": generateSidebarItems(TsSidebar),
  "/Upgrade": generateSidebarItems(UpgradeSidebar),
  "/study": generateSidebarItems(StudySidebar),
  "/interview": generateSidebarItems(InterviewSidebar),
  "/project": generateSidebarItems(ProjectSidebar),
  "/myVue3": generateSidebarItems(MyVue3Sidebar),
  "/lingsi": generateSidebarItems(LingsiSidebar),
  "/lingsi/sale": generateSidebarItems(SaleSidebar),
  "/lingsi/职技网": generateSidebarItems(JobSidebar),
  "/lingsi/水泥": generateSidebarItems(CementSidebar),
  "/lingsi/music": generateSidebarItems(MusicSidebar),
  "/lingsi/elk": generateSidebarItems(ELKSidebar),
  "/lingsi/crm": generateSidebarItems(CRMSidebar),
  "/daodao/": generateSidebarItems(DaodaoSidebar),
  "/baidu/": generateSidebarItems(BaiduSidebar),
  "/baidu/layer/": generateSidebarItems(LayerSidebar),
  "/baidu/fokai/": generateSidebarItems(FokaiSidebar),
  "/myself": generateSidebarItems(SelfstudySidebar),
  "/myself/小兔鲜": generateSidebarItems(RabitSidebar),
  "/myself/硅谷甄选": generateSidebarItems(SelectSidebar),
  "/myself/尚医通": generateSidebarItems(DoctorSidebar),
  "/myself/react后台": generateSidebarItems(BackstageSidebar),
  "/myself/知乎日报": generateSidebarItems(PaperSidebar),
  "/myself/优医问诊": generateSidebarItems(ConsultationSidebar),
  "/vitePress": generateSidebarItems(VitePressSidebar),
  "/help": generateSidebarItems(HelpSidebar),
  "/about": generateSidebarItems(AboutSidebar),
  "/read": generateSidebarItems(ReadSidebar),
};
