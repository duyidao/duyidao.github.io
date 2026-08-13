const idea = [
  {
    text: 'JavaScript',
    collapsed: true,
    items: [
      {
        text: '设计模式',
        collapsed: true,
        items: [
          { text: '设计模式', link: '/idea/design/设计模式' },
          {
            text: '视频列表只允许单个视频播放',
            link: '/idea/design/观察者模式实现视频列表只允许单个视频播放',
          },
          {
            text: '商品卡不同类型代码如何实现',
            link: '/idea/design/组合模式实现商品卡不同类型',
          },
          {
            text: '请求的复用与兼容',
            link: '/idea/design/单例模式实现请求的复用与兼容',
          },
        ],
      },
      {
        text: 'Promise',
        collapsed: true,
        items: [
          {
            text: '手写Promise系列',
            collapsed: true,
            items: [
              { text: '类与.then', link: '/idea/write/手写Promise类与.then' },
              {
                text: 'catch与finally',
                link: '/idea/write/手写Promise方法catch与finally',
              },
              { text: '静态方法', link: '/idea/write/手写Promise静态方法' },
            ],
          },
          { text: '请求取消', link: '/idea/请求取消abort' },
          {
            text: '如何避免相同的请求重复发送',
            link: '/idea/如何避免相同的请求重复发送',
          },
          { text: 'Axios二次封装', link: '/idea/Axios二次封装' },
          { text: '并发请求封装', link: '/idea/并发请求封装' },
          { text: '并发任务控制', link: '/idea/并发任务控制' },
          { text: '消除异步传染性', link: '/idea/消除异步传染性' },
          { text: '高量级任务执行优化', link: '/idea/高量级任务执行优化' },
        ],
      },
      {
        text: '类',
        collapsed: true,
        items: [{ text: '类的多态', link: '/idea/class/类的多态' }],
      },
      {
        text: '算法',
        collapsed: true,
        items: [{ text: 'LRU缓存算法', link: '/idea/algorithm/LRU缓存算法' }],
      },
      {
        text: '如何判断对象是否存在循环引用',
        link: '/idea/js/如何判断对象是否存在循环引用',
      },
      { text: '异步数据竞态取消', link: '/idea/js/异步数据竞态取消' },
      {
        text: 'js执行顺序和异步实战技巧',
        link: '/idea/js/js执行顺序和异步实战技巧',
      },
      { text: '垃圾回收与内存泄漏', link: '/idea/js/垃圾回收与内存泄漏' },
      { text: '判断是否是数组', link: '/idea/js/判断是否是数组' },
      { text: '属性描述符', link: '/idea/js/属性描述符' },
      { text: 'log对象时需要注意的坑', link: '/idea/js/log对象时需要注意的坑' },
      { text: 'js深度克隆', link: '/idea/js/js深度克隆' },
      { text: 'LocalStorage封装', link: '/idea/js/LocalStorage封装' },
      { text: 'Proxy与defineProperty', link: '/idea/js/Proxy与defineProperty' },
      {
        text: 'toFixed因精确度产生bug',
        link: '/idea/js/toFixed因精确度产生bug',
      },
    ],
  },
  {
    text: 'Vue',
    collapsed: true,
    items: [
      { text: '组件内的模板复用', link: '/idea/vue/组件内的模板复用' },
      { text: '组件状态重置', link: '/idea/vue/组件状态重置' },
      {
        text: 'customRef封装全局loading',
        link: '/idea/vue/customRef封装全局loading',
      },
      {
        text: '父组件监听子组件生命周期',
        link: '/idea/vue/父组件监听子组件生命周期',
      },
      {
        text: 'useTemplateRef实现原理',
        link: '/idea/vue/useTemplateRef实现原理',
      },
      { text: '模板自动解包Ref', link: '/idea/vue/模板自动解包Ref' },
      { text: '全局状态管理', link: '/idea/vue/全局状态管理' },
      { text: 'vue异步组件实现原理', link: '/idea/vue/vue异步组件实现原理' },
      {
        text: 'provide和inject的context封装',
        link: '/idea/vue/provide和inject的context封装',
      },
      {
        text: 'ref和reactive在使用上的区别',
        link: '/idea/vue/ref和reactive在使用上的区别',
      },
      { text: 'Vue2 VS Vue3', link: '/idea/vue/Vue2%20VS%20Vue3' },
      { text: '更新机制和优化', link: '/idea/vue/更新机制和优化' },
      {
        text: '项目对render和jsx的妙用',
        link: '/idea/vue/项目对render和jsx的妙用',
      },
      { text: '项目中TS意义与麻烦', link: '/idea/vue/项目中TS意义与麻烦' },
      { text: 'nextTick', link: '/idea/vue/nextTick' },
      {
        text: '图片动态引入使用require',
        link: '/idea/vue/图片动态引入使用require',
      },
      { text: '自定义事件封装', link: '/idea/vue/自定义事件封装' },
    ],
  },
  {
    text: '优化',
    collapsed: true,
    items: [
      { text: '性能优化', link: '/idea/optimize/性能优化' },
      { text: '项目速度优化', link: '/idea/optimize/项目速度优化' },
      { text: '资源加载优化', link: '/idea/optimize/资源加载优化' },
      { text: '页面加载优化', link: '/idea/optimize/页面加载优化' },
      { text: '打包优化', link: '/idea/optimize/打包优化' },
    ],
  },
]

const handle = [
  {
    text: '功能业务实现',
    collapsed: true,
    items: [
      {
        text: '前端操作excel与word',
        link: '/handle/business/前端操作excel与word',
      },
      {
        text: '前端文件上传与相关操作',
        link: '/handle/business/前端文件上传与相关操作',
      },
      {
        text: '前端下载后端传输的文件',
        link: '/handle/business/前端下载后端传输的文件',
      },
      {
        text: '元素不定大小溢出隐藏',
        link: '/handle/business/元素不定大小溢出隐藏',
      },
      { text: '权限控制', link: '/handle/business/权限控制' },
      { text: '自动引入依赖', link: '/handle/business/自动引入依赖' },
      {
        text: '相似样式组件优雅实现',
        link: '/handle/business/相似样式组件优雅实现',
      },
      {
        text: '前端滚动锚点注意事项',
        link: '/handle/business/前端滚动锚点注意事项',
      },
      { text: '富文本编辑器', link: '/handle/business/富文本编辑器' },
      {
        text: '内嵌iframe与传递消息',
        link: '/handle/business/内嵌iframe与传递消息',
      },
    ],
  },
  {
    text: '组件封装二开',
    collapsed: true,
    items: [
      {
        text: '二次封装组件库组件',
        link: '/handle/element/二次封装组件库组件',
      },
      {
        text: 'vue动态表单实现原理',
        link: '/handle/element/vue动态表单实现原理',
      },
      {
        text: '二次封装el-button实现优雅loading效果',
        link: '/handle/element/二次封装el-button实现优雅loading效果',
      },
      { text: '组合式函数封装', link: '/handle/element/组合式函数封装' },
      {
        text: '第三方插件组合式函数封装',
        link: '/handle/element/第三方插件组合式函数封装',
      },
      {
        text: '二次封装el-dialog学习重复小组件处理经验',
        link: '/handle/element/二次封装el-dialog学习重复小组件处理经验',
      },
      { text: '组件库搭建', link: '/handle/element/组件库搭建' },
      { text: '组件设计技巧', link: '/handle/element/组件设计技巧' },
      {
        text: '页码列表组件封装思路',
        link: '/handle/element/页码列表组件封装思路',
      },
      {
        text: '二封el表格组件无限滚动',
        link: '/handle/element/二封el表格组件无限滚动',
      },
      {
        text: '二封el下拉自定义折叠数量',
        link: '/handle/element/二封el下拉自定义折叠数量',
      },
      { text: '二封el日历组件', link: '/handle/element/二封el日历组件' },
    ],
  },
  {
    text: '项目训练实战',
    collapsed: true,
    items: [
      { text: '动图动效方案', link: '/handle/combat/动图动效方案' },
      { text: '不同尺寸自适应', link: '/handle/combat/不同尺寸自适应' },
      {
        text: '状态思维应对多变页面',
        link: '/handle/combat/状态思维应对多变页面',
      },
      { text: '复杂联动表单', link: '/handle/combat/复杂联动表单' },
      {
        text: '动态列表学习数据思维',
        link: '/handle/combat/动态列表学习数据思维',
      },
      { text: '有用的TS项目技巧', link: '/handle/combat/有用的TS项目技巧' },
      { text: '前端工具函数开发', link: '/handle/combat/前端工具函数开发' },
      {
        text: '需求架构设计并优雅实现',
        link: '/handle/combat/需求架构设计并优雅实现',
      },
      { text: 'websocket实时进度', link: '/handle/combat/websocket实时进度' },
    ],
  },
  {
    text: '项目配置测试',
    collapsed: true,
    items: [
      { text: '图片预加载插件', link: '/handle/test/图片预加载插件' },
      {
        text: '前端环境变量使用和原理',
        link: '/handle/test/前端环境变量使用和原理',
      },
      { text: '前端部署与缓存管理', link: '/handle/test/前端部署与缓存管理' },
      { text: '前端代码风格定制', link: '/handle/test/前端代码风格定制' },
      { text: '前端自动化测试', link: '/handle/test/前端自动化测试' },
      { text: '前端Bug调试指南', link: '/handle/test/前端Bug调试指南' },
    ],
  },
]

const ai = [
  {
    text: 'AI 应用开发实战',
    collapsed: true,
    items: [
      {
        text: '基础 AI 对话搭建',
        collapsed: true,
        items: [
          { text: '大模型接口', link: '/ai/a/大模型接口' },
          { text: '搭建服务器', link: '/ai/a/搭建服务器' },
          { text: '提示词工程', link: '/ai/a/提示词工程' },
          { text: '上下文的威力', link: '/ai/a/上下文的威力' },
          { text: 'Markdown 语法及渲染', link: '/ai/a/Markdown%20语法及渲染' },
          { text: 'Token 消耗优化', link: '/ai/a/Token%20消耗优化' },
          { text: '前端界面', link: '/ai/a/前端界面' },
          { text: '流式传输', link: '/ai/a/流式传输' },
          { text: 'Function Tool', link: '/ai/a/Function%20Tool' },
        ],
      },
      {
        text: '进阶开发技巧',
        collapsed: true,
        items: [
          { text: 'Function tool', link: '/ai/a/tool' },
          { text: '前端工具卡片', link: '/ai/a/前端工具卡片' },
        ],
      },
    ],
  },
]

export { idea, handle, ai }
