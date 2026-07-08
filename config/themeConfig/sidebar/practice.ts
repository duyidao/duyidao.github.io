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
        items: [{ text: 'LRU缓存算法', link: '/idea/algorithm/lru' }],
      },
      { text: '如何判断对象是否存在循环引用', link: '/idea/js/objectLoop' },
      { text: '异步数据竞态取消', link: '/idea/js/race' },
      { text: 'js执行顺序和异步实战技巧', link: '/idea/js/eat' },
      { text: '垃圾回收与内存泄漏', link: '/idea/js/rubbish' },
      { text: '判断是否是数组', link: '/idea/js/isArray' },
      { text: '属性描述符', link: '/idea/js/descriptor' },
      { text: 'log对象时需要注意的坑', link: '/idea/js/console' },
      { text: 'js深度克隆', link: '/idea/js/clonedeep' },
      { text: 'LocalStorage封装', link: '/idea/js/localstorage' },
      { text: 'Proxy与defineProperty', link: '/idea/js/proxy' },
      { text: 'toFixed因精确度产生bug', link: '/idea/js/toFixed' },
    ],
  },
  {
    text: 'Vue',
    collapsed: true,
    items: [
      { text: '组件内的模板复用', link: '/idea/vue/reuse' },
      { text: '组件状态重置', link: '/idea/vue/reset' },
      { text: 'customRef封装全局loading', link: '/idea/vue/customRef' },
      { text: '父组件监听子组件生命周期', link: '/idea/vue/mounted' },
      { text: 'useTemplateRef实现原理', link: '/idea/vue/useTemplateRef' },
      { text: '模板自动解包Ref', link: '/idea/vue/templateRef' },
      { text: '全局状态管理', link: '/idea/vue/pinia' },
      { text: 'vue异步组件实现原理', link: '/idea/vue/defineAsyncComponent' },
      { text: 'provide和inject的context封装', link: '/idea/vue/context' },
      { text: 'ref和reactive在使用上的区别', link: '/idea/vue/ref' },
      { text: 'Vue2 VS Vue3', link: '/idea/vue/different' },
      { text: '更新机制和优化', link: '/idea/vue/update' },
      { text: '项目对render和jsx的妙用', link: '/idea/vue/render' },
      { text: '项目中TS意义与麻烦', link: '/idea/vue/ts' },
      { text: 'nextTick', link: '/idea/vue/nextTick' },
      { text: '图片动态引入使用require', link: '/idea/vue/require' },
      { text: '自定义事件封装', link: '/idea/vue/custom' },
    ],
  },
  {
    text: '优化',
    collapsed: true,
    items: [
      { text: '性能优化', link: '/idea/optimize/' },
      { text: '项目速度优化', link: '/idea/optimize/speed' },
      { text: '资源加载优化', link: '/idea/optimize/resource' },
      { text: '页面加载优化', link: '/idea/optimize/load' },
      { text: '打包优化', link: '/idea/optimize/build' },
    ],
  },
]

const handle = [
  {
    text: '功能业务实现',
    collapsed: true,
    items: [
      { text: '前端操作excel与word', link: '/handle/business/excel' },
      { text: '前端文件上传与相关操作', link: '/handle/business/upload' },
      { text: '前端下载后端传输的文件', link: '/handle/business/download' },
      { text: '元素不定大小溢出隐藏', link: '/handle/business/display' },
      { text: '权限控制', link: '/handle/business/control' },
      { text: '自动引入依赖', link: '/handle/business/auto' },
      { text: '相似样式组件优雅实现', link: '/handle/business/grace' },
      { text: '前端滚动锚点注意事项', link: '/handle/business/point' },
      { text: '富文本编辑器', link: '/handle/business/editor' },
      { text: '内嵌ifrname与传递消息', link: '/handle/business/iframe' },
    ],
  },
  {
    text: '组件封装二开',
    collapsed: true,
    items: [
      { text: '二次封装组件库组件', link: '/handle/element/twice' },
      { text: 'vue动态表单实现原理', link: '/handle/element/form' },
      {
        text: '二次封装el-button实现优雅loading效果',
        link: '/handle/element/button',
      },
      { text: '组合式函数封装', link: '/handle/element/function' },
      {
        text: '第三方插件组合式函数封装',
        link: '/handle/element/functionThird',
      },
      {
        text: '二次封装el-dialog学习重复小组件处理经验',
        link: '/handle/element/repeat',
      },
      { text: '组件库搭建', link: '/handle/element/library' },
      { text: '组件设计技巧', link: '/handle/element/skill' },
      { text: '页码列表组件封装思路', link: '/handle/element/pagenation' },
      { text: '二封el表格组件无限滚动', link: '/handle/element/scroll' },
      { text: '二封el下拉自定义折叠数量', link: '/handle/element/select' },
      { text: '二封el日历组件', link: '/handle/element/calendar' },
    ],
  },
  {
    text: '项目训练实战',
    collapsed: true,
    items: [
      { text: '动图动效方案', link: '/handle/combat/move' },
      { text: '不同尺寸自适应', link: '/handle/combat/rem' },
      { text: '状态思维应对多变页面', link: '/handle/combat/change' },
      { text: '复杂联动表单', link: '/handle/combat/linkage' },
      { text: '动态列表学习数据思维', link: '/handle/combat/list' },
      { text: '有用的TS项目技巧', link: '/handle/combat/ts' },
      { text: '前端工具函数开发', link: '/handle/combat/function' },
      { text: '需求架构设计并优雅实现', link: '/handle/combat/layout' },
      { text: 'websocket实时进度', link: '/handle/combat/ws' },
    ],
  },
  {
    text: '项目配置测试',
    collapsed: true,
    items: [
      { text: '图片预加载插件', link: '/handle/test/preload' },
      { text: '前端环境变量使用和原理', link: '/handle/test/module' },
      { text: '前端部署与缓存管理', link: '/handle/test/develop' },
      { text: '前端代码风格定制', link: '/handle/test/style' },
      { text: '前端自动化测试', link: '/handle/test/auto' },
      { text: '前端Bug调试指南', link: '/handle/test/fix' },
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
          { text: '大模型接口', link: '/ai/a/' },
          { text: '搭建服务器', link: '/ai/a/create' },
          { text: '提示词工程', link: '/ai/a/callword' },
          { text: '上下文的威力', link: '/ai/a/context' },
          { text: 'markdown 语法及渲染', link: '/ai/a/md' },
          { text: 'token 消耗优化', link: '/ai/a/token' },
          { text: '前端界面', link: '/ai/a/ui' },
          { text: '流式传输', link: '/ai/a/flow' },
          { text: 'Function tool', link: '/ai/a/tool' },
        ],
      },
      {
        text: '进阶开发技巧',
        collapsed: true,
        items: [
          { text: 'Function tool', link: '/ai/a/tool' },
          { text: '前端工具卡片', link: '/ai/a/tool' },
        ],
      },
    ],
  },
]

export { idea, handle, ai }
