export default {
  'concept/:pkg/:module/:type/(.*)': ':pkg/:type/(.*)', // 学习模块 - 概念模块 - 概念分块  路由重写
  'concept/:pkg/:module/(.*)': ':pkg/:module/(.*)', // 学习模块 - 概念模块  路由重写
  'concept/:pkg/(.*)': ':pkg/(.*)', // 学习模块 - 概念模块  路由重写

  'work/:pkg/:module/:type/(.*)': ':pkg/:type/(.*)', // 项目模块 - 公司项目 - 项目分块  路由重写
  'work/:pkg/:module/(.*)': ':pkg/:module/(.*)', // 项目模块 - 公司项目  路由重写
  'work/:pkg/(.*)': ':pkg/(.*)', // 项目模块 - 公司项目  路由重写

  'read/:pkg/:module/(.*)': 'read/:module/(.*)', // 学习模块 - 自主学习  路由重写

  'practice/:pkg/:module/:type/:info/(.*)': ':pkg/:info/(.*)', // 练习模块 - 练习 路由重写
  'practice/:pkg/:module/:type/(.*)': ':pkg/:type/(.*)', // 练习模块 - 练习 路由重写
  'practice/:pkg/:module/(.*)': ':pkg/:module/(.*)', // 练习模块 - 练习 路由重写
}
