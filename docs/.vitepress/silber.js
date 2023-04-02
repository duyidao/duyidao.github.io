export default {
  '/learn': getLearnSidebar(),
  '/learn/Javascript': getLearnJsSidebar(),
  '/learn/TypeScript': getLearnTsSidebar(),
  '/learn/Node': getLearnNodeSidebar(),
  '/knowledgePoint': getKnowledgePointSidebar(),
  '/learn/杂技拾谈': getTalkSidebar(),
  '/project': [
    {
      text: '项目',
      items: [
        {text: '灵思', link: '/project/lingsi/'}
      ]
    }
  ],
  '/project/lingsi': [
    {
      text: '灵思',
      items: [
        {text: '🎶 音果云音', link: '/project/lingsi/music/'},
        {text: '💴 视频分销', link: '/project/lingsi/sale/'},
        {text: '🔍 CRM', link: '/project/lingsi/crm/'},
        {text: '🎲 ELK', link: '/project/lingsi/elk/'}
      ]
    }
  ],
  '/project/lingsi/sale': getSaleSidebar(),
  '/project/lingsi/music': getMusicSidebar(),
  '/project/lingsi/crm': getCRMSidebar(),
  '/project/lingsi/elk': getELKSidebar(),
  '/vitePress': getVitePressSidebar(),
  '/about': getAboutSidebar(),
}

// 获取前端的数组
function getLearnSidebar() {
  return [
    {
      text: "HTML",
      collapsible: true,
      items: [
        { text: "HTML", link: "/learn/HTML/" },
      ],
    },
    {
      text: "CSS",
      collapsible: true,
      items: [
        { text: "CSS", link: "/learn/CSS/" },
      ],
    }
  ]
}

// 获取前端js数组
function getLearnJsSidebar() {
  return [
    {
      text: "Javascript",
      collapsible: true,
      items: [
        { text: "Javascript", link: "/learn/Javascript/" },
        { text: "运算符", link: "/learn/Javascript/sort" },
        { text: "数据类型", link: "/learn/Javascript/type" },
        { text: "数组", link: "/learn/Javascript/array" },
        { text: "函数", link: "/learn/Javascript/function" },
        { text: "对象", link: "/learn/Javascript/object" },
        { text: "作用域与闭包", link: "/learn/Javascript/scope_closure" },
        { text: "原型与原型链", link: "/learn/Javascript/原型与原型链" },
        { text: "类", link: "/learn/Javascript/类" },
        { text: "模块化", link: "/learn/Javascript/模块化" },
        { text: "正则表达式", link: "/learn/Javascript/正则表达式" },
        { text: "Promise", link: "/learn/Javascript/Promise" },
        { text: "任务管理与Promise核心", link: "/learn/Javascript/Promise核心" },
        { text: "Set", link: "/learn/Javascript/set" },
        { text: "Map", link: "/learn/Javascript/map" },
        { text: "Symbol", link: "/learn/Javascript/symbol" },
      ],
    }
  ]
}

// 获取前端ts数组
function getLearnTsSidebar() {
  return [
    {
      text: "TypeScript",
      collapsible: true,
      items: [
        { text: "环境配置", link: "/learn/TypeScript/环境配置" },
        { text: "类型", link: "/learn/TypeScript/类型" },
        { text: "断言与枚举", link: "/learn/TypeScript/断言与枚举" },
        { text: "类与接口", link: "/learn/TypeScript/类与接口" },
        { text: "泛型", link: "/learn/TypeScript/泛型" },
      ],
    }
  ]
}

// 获取前端node数组
function getLearnNodeSidebar() {
  return [
    {
      text: 'node',
      collapsible: true,
      items: [
        { text: "node", link: "/learn/Node/" },
        { text: "fs", link: "/learn/Node/fs" },
        { text: "path", link: "/learn/Node/path" },
        { text: "http", link: "/learn/Node/http" },
        { text: "module", link: "/learn/Node/module" },
        { text: "express", link: "/learn/Node/express" },
        { text: "npm", link: "/learn/Node/npm" },
      ]
    }
  ]
}

// 获取杂技拾谈数组
function getTalkSidebar() {
  return [
    {
      text: '杂技拾谈',
      collapsible: true,
      items: [
        {text:'if-else代码冗余优化', link:'/learn/杂技拾谈/if-else冗余'},
        {text:'vue3双向绑定proxy原理', link:'/learn/杂技拾谈/vue3双向绑定proxy原理'},
        {text:'数组对象遍历', link:'/learn/杂技拾谈/数组对象遍历'}
      ]
    }
  ]
}

// 获取音果云音的数组
function getMusicSidebar() {
  return [
    {
      text: "🎶 音果云音",
      collapsible: true,
      items: [
        {
          text: "🎶 音果云音",
          // collapsible: true,
          link: "/project/lingsi/music/",
          items: [
            {
              text: " APP",
              collapsible: true,
              items: [
                { text: '登录页', link: "/project/lingsi/music/APP/login" },
                { text: 'tabbar页', link: "/project/lingsi/music/APP/tabbar" },
                { text: '详情页', link: "/project/lingsi/music/APP/detail" },
                { text: '分享页', link: "/project/lingsi/music/APP/share" },
                { text: '测试页', link: "/project/lingsi/music/APP/test" },
                { text: '操作页', link: "/project/lingsi/music/APP/do" },
                { text: '支付页', link: "/project/lingsi/music/APP/pay" },
              ]
            },
            {
              text: 'H5',
              collapsible: true,
              items: [
                { text: '海报页', link: '/project/lingsi/music/H5/'}
              ]
            }
          ],
        }
      ],
    }
  ]
}

// 获取分销的数组
function getSaleSidebar() {
  return [
    {
      text: '💴 视频分销',
      collapsible: true,
      items: [
        { text: '简介', link: '/project/lingsi/sale/' },
        { text: '请求封装', link: '/project/lingsi/sale/request' },
        { text: 'token刷新', link: '/project/lingsi/sale/token' },
        { text: '视频轮播', link: '/project/lingsi/sale/video' },
        { text: '图片上传组件封装', link: '/project/lingsi/sale/upload' },
      ]
    }
  ]
}

// 获取elk的数组
function getELKSidebar() {
  return [
    {
      text: '🎲 ELK',
      collapsible: true,
      items: [
        { text: '简介', link: '/project/lingsi/elk/' },
        { text: '接收后端返回的二进制流文件', link: '/project/lingsi/elk/blob' },
        { text: 'vue-core的使用', link: '/project/lingsi/elk/vue_core' },
        { text: 'Canvas绘制表格图', link: '/project/lingsi/elk/canvas_table' },
        { text: 'DIV可编辑文本', link: '/project/lingsi/elk/edit_div' },
        { text: 'JSON编辑器', link: '/project/lingsi/elk/edit_JSON' },
        { text: '导出PDF', link: '/project/lingsi/elk/pdf' },
      ]
    }
  ]
}

// 获取crm的数组
function getCRMSidebar() {
  return [
    {
      text: '🔍 crm',
      collapsible: true,
      items: [
        { text: '简介', link: '/project/lingsi/crm/' },
        { text: '拨打电话', link: '/project/lingsi/crm/call' },
        { text: 'navigateBack传参', link: '/project/lingsi/crm/navigateBack' }
      ]
    }
  ]
}

// 获取vitePress部署的数组
function getVitePressSidebar() {
  return [
    {
      text: '🧊 部署',
      collapsible: true,
      items: [
        { text: "🌩️ 引言", link: "/vitePress/" },
        { text: "🧩 搭建", link: "/vitePress/Dev" },
        { text: "🎁 打包", link: "/vitePress/Build" },
        { text: "⏳ 部署", link: "/vitePress/Deploy" },
        { text: "✨ 拓展", link: "/vitePress/Know" },
      ]
    }
  ]
}

// 获取项目学习的数组
function getKnowledgePointSidebar() {
  return [
    {
      text: '🎒 项目学习',
      collapsible: true,
      items: [
        { text: "🌩️ 引言", link: "/knowledgePoint/" },
        { text: "🧩 vue-color的使用", link: "/knowledgePoint/vue_color" },
      ]
    }
  ]
}

// 获取关于的数组
function getAboutSidebar() {
  return [
    {
      text: '⭐ 关于',
      collapsible: true,
      items: [
        { text: '🧑 关于我', link: '/about/' },
        { text: '🔪 关于刀刀小站', link: '/about/blog' }
      ]
    }
  ]
}