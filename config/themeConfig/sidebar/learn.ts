const idea = [
  {
    text: 'JavaScript',
    collapsed: true,
    items: [
      {
        text: '设计模式',
        collapsed: true,
        items: [
          { text: '设计模式', link: '/learn/js/design/' },
          { text: '视频列表只允许单个视频播放', link: '/learn/js/design/oneVideo' },
          { text: '商品卡不同类型代码如何实现', link: '/learn/js/design/differentShop' },
          { text: '请求的复用与兼容', link: '/learn/js/design/reuse' },
        ]
      },
      { text: '如何判断对象是否存在循环引用', link: '/learn/js/objectLoop' },
      { text: 'js执行顺序和异步实战技巧', link: '/learn/js/eat' },
      { text: '垃圾回收与内存泄漏', link: '/learn/js/rubbish' },
      { text: '类的多态', link: '/learn/js/polymorphism' },
      { text: '判断是否是数组', link: '/learn/js/isArray' },
      { text: '属性描述符', link: '/learn/js/descriptor' },
      { text: 'log对象时需要注意的坑', link: '/learn/js/console' },
      { text: 'js深度克隆', link: '/learn/js/clonedeep' },
      { text: 'LocalStorage封装', link: '/learn/js/localstorage' },
      { text: 'Proxy与defineProperty', link: '/learn/js/proxy' },
      { text: 'toFixed因精确度产生bug', link: '/learn/js/toFixed' },
    ]
  },
  {
    text: 'Vue',
    collapsed: true,
    items: [
      { text: '组件内的模板复用', link: '/learn/vue/reuse' },
      { text: '组件状态重置', link: '/learn/vue/reset' },
      { text: 'customRef封装全局loading', link: '/learn/vue/customRef' },
      { text: '父组件监听子组件生命周期', link: '/learn/vue/mounted' },
      { text: '全局状态管理', link: '/learn/vue/pinia' },
      { text: 'provide和inject的context封装', link: '/learn/vue/context' },
      { text: 'ref和reactive在使用上的区别', link: '/learn/vue/ref' },
      { text: 'Vue2 VS Vue3', link: '/learn/vue/different' },
      { text: '更新机制和优化', link: '/learn/vue/update' },
      { text: '项目对render和jsx的妙用', link: '/learn/vue/render' },
      { text: '项目中TS意义与麻烦', link: '/learn/vue/ts' },
      { text: 'nextTick', link: '/learn/vue/nextTick' },
      { text: '图片动态引入使用require', link: '/learn/vue/require' },
      { text: '自定义事件封装', link: '/learn/vue/custom' },
    ]
  },
  {
    text: 'Promise',
    collapsed: true,
    items: [
      {
        text: '手写Promise系列',
        collapsed: true,
        items: [
          { text: '类与.then', link: '/learn/promise/write/' },
          { text: 'catch与finally', link: '/learn/promise/write/catch' },
          { text: '静态方法', link: '/learn/promise/write/status' },
        ]
      },
      { text: '请求取消', link: '/learn/promise/abort' },
      { text: 'Axios二次封装', link: '/learn/promise/twice' },
      { text: '并发请求封装', link: '/learn/promise/concurrency' },
      { text: '并发任务控制', link: '/learn/promise/control' },
      { text: '消除异步传染性', link: '/learn/promise/infect' },
      { text: '高量级任务执行优化', link: '/learn/promise/task' },
    ]
  },
  {
    text: '优化',
    collapsed: true,
    items: [
      { text: '性能优化', link: '/learn/optimize/' },
      { text: '项目速度优化', link: '/learn/optimize/speed' },
      { text: '资源加载优化', link: '/learn/optimize/resource' },
      { text: '页面加载优化', link: '/learn/optimize/load' },
      { text: '打包优化', link: '/learn/optimize/build' },
    ]
  },
]

const handle = [
  {
    text: '功能业务实现',
    collapsed: true,
    items: [
      { text: '前端操作excel与word', link: '/learn/business/excel' },
      { text: '前端文件上传与相关操作', link: '/learn/business/upload' },
      { text: '前端下载后端传输的文件', link: '/learn/business/download' },
      { text: '元素不定大小溢出隐藏', link: '/learn/business/display' },
      { text: '权限控制', link: '/learn/business/control' },
      { text: '自动引入依赖', link: '/learn/business/auto' },
      { text: '相似样式组件优雅实现', link: '/learn/business/grace' },
      { text: '前端滚动锚点注意事项', link: '/learn/business/point' },
      { text: '富文本编辑器', link: '/learn/business/editor' },
      { text: '内嵌ifrname与传递消息', link: '/learn/business/iframe' },
    ]
  },
  {
    text: '组件封装二开',
    collapsed: true,
    items: [
      { text: '二次封装组件库组件', link: '/learn/element/twice' },
      { text: '二次封装el-button实现优雅loading效果', link: '/learn/element/button' },
      { text: '组合式函数封装', link: '/learn/element/function' },
      { text: '重复小组件处理经验', link: '/learn/element/repeat' },
      { text: '组件库搭建', link: '/learn/element/library' },
      { text: '组件设计技巧', link: '/learn/element/skill' },
      { text: '页码列表组件封装思路', link: '/learn/element/pagenation' },
      { text: '二封el表格组件无限滚动', link: '/learn/element/scroll' },
      { text: '二封el下拉自定义折叠数量', link: '/learn/element/select' },
      { text: '二封el日历组件', link: '/learn/element/calendar' },
      { text: '对话框弹窗组件封装', link: '/learn/element/dialog' },
    ]
  },
  {
    text: '项目训练实战',
    collapsed: true,
    items: [
      { text: '动图动效方案', link: '/learn/combat/move' },
      { text: '不同尺寸自适应', link: '/learn/combat/rem' },
      { text: '状态思维应对多变页面', link: '/learn/combat/change' },
      { text: '复杂联动表单', link: '/learn/combat/linkage' },
      { text: '动态列表学习数据思维', link: '/learn/combat/list' },
      { text: '有用的TS项目技巧', link: '/learn/combat/ts' },
      { text: '前端工具函数开发', link: '/learn/combat/function' },
      { text: '需求架构设计并优雅实现', link: '/learn/combat/layout' },
      { text: 'websocket实时进度', link: '/learn/combat/ws' },
    ]
  },
  {
    text: '项目配置测试',
    collapsed: true,
    items: [
      { text: '前端环境变量使用和原理', link: '/learn/test/module' },
      { text: '前端部署与缓存管理', link: '/learn/test/develop' },
      { text: '前端代码风格定制', link: '/learn/test/style' },
      { text: '前端自动化测试', link: '/learn/test/auto' },
      { text: '前端Bug调试指南', link: '/learn/test/fix' },
    ]
  },
]

export { idea, handle }