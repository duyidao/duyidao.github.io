const shushuo = [
  {
    text: '🔢 数说数字化',
    items: [
      { text: '🔉 前言', link: '/shushuo/' },
      {
        text: '智能报告',
        collapsed: true,
        items: [
          { text: 'AI问答', link: '/shushuo/ai-report/ai' },
          {
            text: '路由自动化',
            link: '/shushuo/ai-report/unplugin-vue-router',
          },
          { text: '畅写', link: '/shushuo/ai-report/cxo' },
        ],
      },
      {
        text: '需求洞察',
        collapsed: true,
        items: [{ text: '代理配置', link: '/shushuo/demand/agent' }],
      },
      {
        text: 'N次方',
        collapsed: true,
        items: [
          {
            text: '移动端',
            collapsed: true,
            items: [
              { text: '本地存储拿不到', link: '/shushuo/mobile/localstorage' },
              { text: 'Token丢失', link: '/shushuo/mobile/token' },
              { text: 'Vant 数字键盘组件', link: '/shushuo/mobile/vant-number' },
            ],
          },
          {
            text: 'web端',
            collapsed: true,
            items: [{ text: '子模块导入', link: '/shushuo/web/submodule' }],
          },
        ],
      },
    ],
  },
]

const lingsi = [
  {
    text: '🔌 灵思',
    items: [
      { text: '🔉 前言', link: '/lingsi/' },
      {
        text: '音果云音',
        collapsed: true,
        items: [
          { text: '简介', link: '/lingsi/music/' },
          {
            text: 'APP',
            collapsed: true,
            items: [
              { text: '登录', link: '/lingsi/APP/login' },
              { text: 'Tabbar', link: '/lingsi/APP/tabbar' },
              { text: '详情', link: '/lingsi/APP/detail' },
              { text: '分享', link: '/lingsi/APP/share' },
              { text: '测试', link: '/lingsi/APP/test' },
              { text: '操作', link: '/lingsi/APP/do' },
              { text: '商品', link: '/lingsi/APP/sku' },
              { text: '支付', link: '/lingsi/APP/pay' },
              { text: '更新', link: '/lingsi/APP/update' },
              { text: '个人', link: '/lingsi/APP/userinfo' },
            ],
          },
          {
            text: 'H5',
            collapsed: true,
            items: [{ text: '海报页', link: '/lingsi/H5/' }],
          },
        ],
      },
      {
        text: '职技网',
        collapsed: true,
        items: [
          { text: '简介', link: '/lingsi/skill/' },
          { text: '项目创建', link: '/lingsi/skill/create' },
          { text: 'Vant组件二次封装', link: '/lingsi/skill/vant_package' },
          { text: '微信授权', link: '/lingsi/skill/wechat_impower' },
          { text: '下载附件', link: '/lingsi/skill/download' },
        ],
      },
      {
        text: '视频分销',
        collapsed: true,
        items: [
          { text: '简介', link: '/lingsi/sale/' },
          { text: '请求封装', link: '/lingsi/sale/request' },
          { text: 'token刷新', link: '/lingsi/sale/token' },
          { text: '微信授权快捷登录', link: '/lingsi/sale/phone' },
          { text: '附件下载', link: '/lingsi/sale/preview' },
          { text: '分享', link: '/lingsi/sale/share' },
          { text: '商城', link: '/lingsi/sale/shop' },
          { text: '视频轮播', link: '/lingsi/sale/video' },
          { text: '图片上传组件封装', link: '/lingsi/sale/upload' },
          { text: '关注公众号', link: '/lingsi/sale/official' },
        ],
      },
      {
        text: '华润水泥',
        collapsed: true,
        items: [
          { text: '简介', link: '/lingsi/cement/' },
          { text: '图片对比可拖拽封装', link: '/lingsi/cement/comparison' },
          { text: 'Vue Color', link: '/lingsi/cement/vue_color' },
          {
            text: 'Jeecg',
            collapsed: true,
            items: [
              { text: '表格行选中', link: '/lingsi/jeecg/table_select' },
              { text: '树组件默认展开', link: '/lingsi/jeecg/tree_open' },
              {
                text: 'vxe-table搭配其他组件',
                link: '/lingsi/jeecg/j-vxe-table',
              },
            ],
          },
        ],
      },
      {
        text: 'CRM',
        collapsed: true,
        items: [
          { text: '简介', link: '/lingsi/crm/' },
          { text: '拨打电话', link: '/lingsi/crm/call' },
          { text: 'navigateBack传参', link: '/lingsi/crm/navigateBack' },
          { text: '域名配置', link: '/lingsi/crm/build' },
          { text: '微信授权', link: '/lingsi/crm/wechat' },
        ],
      },
      {
        text: 'ELK',
        collapsed: true,
        items: [
          { text: '简介', link: '/lingsi/elk/' },
          { text: '接收后端的二进制流文件', link: '/lingsi/elk/blob' },
          { text: 'Vue-core的使用', link: '/lingsi/elk/vue_core' },
          { text: 'Canvas绘制表格图', link: '/lingsi/elk/canvas_table' },
          { text: 'DIV可编辑文本', link: '/lingsi/elk/edit_div' },
          { text: 'JSON编辑器', link: '/lingsi/elk/edit_JSON' },
          { text: '导出PDF', link: '/lingsi/elk/pdf' },
        ],
      },
    ],
  },
]

const baidu = [
  {
    text: '🔢 数说数字化',
    items: [
      { text: '🔉 前言', link: '/baidu/' },
      {
        text: '图业',
        collapsed: true,
        items: [
          { text: '简介', link: '/baidu/layer/' },
          { text: '封装', link: '/baidu/layer/package' },
          { text: '规范', link: '/baidu/layer/standard' },
          { text: '样式', link: '/baidu/layer/style' },
          { text: 'MapVThree', link: '/baidu/layer/mapVThree' },
          { text: '优化', link: '/baidu/layer/optimize' },
          { text: '功能', link: '/baidu/layer/function' },
          { text: 'POC', link: '/baidu/layer/poc' },
          { text: 'BUG', link: '/baidu/layer/bug' },
        ],
      },
      {
        text: '佛开',
        collapsed: true,
        items: [
          {
            text: '平台',
            collapsed: true,
            items: [
              { text: '简介', link: '/baidu/platform/' },
              { text: '组件', link: '/baidu/platform/component' },
              { text: '3d跳转', link: '/baidu/platform/3d' },
            ],
          },
          {
            text: 'LED大屏',
            collapsed: true,
            items: [
              { text: '简介', link: '/baidu/LED/' },
              { text: '样式', link: '/baidu/LED/style' },
              { text: '覆盖物', link: '/baidu/LED/overlay' },
              { text: 'Ws', link: '/baidu/LED/ws' },
              { text: '打包', link: '/baidu/LED/build' },
            ],
          },
        ],
      },
    ],
  },
]

export { shushuo, lingsi, baidu }
