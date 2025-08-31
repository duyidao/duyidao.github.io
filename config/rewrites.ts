export default {
  'advance/:pkg/:module/(.*)': ':pkg/:module/(.*)', // 学习模块 - 图表模块 （css、js） 路由重写

  'base/:pkg/:module/(.*)': ':pkg/:module/(.*)', // 学习模块 - 基础模块 （css、js） 路由重写

  'company/:pkg/:module/:type/(.*)': ':pkg/:type/(.*)', // 项目模块 - 公司项目 - 项目分块  路由重写
  'company/:pkg/:module/(.*)': ':pkg/:module/(.*)', // 项目模块 - 公司项目  路由重写
  'company/:pkg/(.*)': ':pkg/(.*)', // 项目模块 - 公司项目  路由重写

  'frame/:pkg/(.*)': ':pkg/(.*)', // 学习模块 - 框架模块  路由重写
  'frame/:pkg/:module/(.*)': ':pkg/:module/(.*)', // 学习模块 - 框架模块  路由重写

  'learn/:pkg/:module/(.*)': 'learn/:module/(.*)', // 学习模块 - 自主学习  路由重写

  'interview/:pkg/:module/(.*)': 'interview/:module/(.*)', // 面试模块 - leedcode 路由重写
  'interview/:pkg/:module/:type/(.*)': ':pkg/:type/(.*)', // 面试模块 - leedcode 多重问题 路由重写
  'interview/:pkg/(.*)': ':pkg/(.*)', // 面试模块 - 面试问题 路由重写

  'practice/:pkg/:module/:type/(.*)': ':pkg/:type/(.*)', // 练习模块 - 练习 路由重写
  'practice/:pkg/:module/(.*)': ':pkg/:module/(.*)', // 练习模块 - 练习 路由重写
}
