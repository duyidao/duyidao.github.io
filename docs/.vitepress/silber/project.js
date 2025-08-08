/**
 * 项目模块 ************************************************************
 */
// 项目的数组
export const ProjectSidebar = [
  {
    text: "项目",
    items: [
      { text: "🧟 灵思", link: "/lingsi/" },
      { text: "⛷️百度外包", link: "/baidu/" },
      { text: "🔢 数说数字化", link: "/shushuo/" },
      { text: "🔪 刀刀博客", link: "/daodao/" },
      { text: "🎵 刀刀音乐", link: "/music/" },
      { text: "📜 自主学习", link: "/myself/" },
    ],
  },
];

// 灵思的数组
export const LingsiSidebar = [
  {
    text: "🧟 灵思",
    items: [
      { text: "🎶 音果云音", link: "/lingsi/music/" },
      { text: "🔧 职技网", link: "/lingsi/职技网/" },
      { text: "💴 视频分销", link: "/lingsi/sale/" },
      { text: "🧫 华润水泥", link: "/lingsi/水泥/" },
      { text: "🔍 CRM", link: "/lingsi/crm/" },
      { text: "🎲 ELK", link: "/lingsi/elk/" },
      { text: "🔙 返回", link: "/project/" },
    ],
  },
];

// 音果云音的数组
export const MusicSidebar = [
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
      { text: "🔙 返回", link: "/lingsi/" },
    ],
  },
];

// 职技网的数组
export const JobSidebar = [
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
      { text: "🔙 返回", link: "/lingsi/" },
    ],
  },
];

// 视频分销的数组
export const SaleSidebar = [
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
      { text: "🔙 返回", link: "/lingsi/" },
    ],
  },
];

// 华润水泥的数组
export const CementSidebar = [
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
      { text: "🔙 返回", link: "/lingsi/" },
    ],
  },
];

// ELK的数组
export const ELKSidebar = [
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
      { text: "🔙 返回", link: "/lingsi/" },
    ],
  },
];

// CRM的数组
export const CRMSidebar = [
  {
    text: "🔍 crm",
    collapsible: true,
    items: [
      { text: "简介", link: "/lingsi/crm/" },
      { text: "拨打电话", link: "/lingsi/crm/call" },
      { text: "navigateBack传参", link: "/lingsi/crm/navigateBack" },
      { text: "域名配置", link: "/lingsi/crm/部署" },
      { text: "微信授权", link: "/lingsi/crm/微信授权" },
      { text: "🔙 返回", link: "/lingsi/" },
    ],
  },
];

// 刀刀博客的数组
export const DaodaoSidebar = [
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
      { text: "⌚️ 多人协同在线表格简易实现", link: "/daodao/tableOnline" },
      { text: "🐛 捉虫记录", link: "/daodao/bug" },
      { text: "🖼️ 优化", link: "/daodao/prod" },
      { text: "🔙 返回", link: "/project/" },
    ],
  },
];

// 刀刀博客的数组
export const DaodaoMusicSidebar = [
  {
    text: "🎵 刀刀音乐",
    collapsible: true,
    items: [
      { text: "🎵 引言", link: "/music/" },
      { text: "🔙 返回", link: "/project/" },
    ],
  },
];

// 百度的数组
export const BaiduSidebar = [
  {
    text: "⛷️ 百度",
    collapsible: true,
    items: [
      { text: "🗺 图层", link: "/baidu/layer/" },
      { text: "🎞️ 佛开", link: "/baidu/fokai/LED/" },
      { text: "🔙 返回", link: "/project/" },
    ],
  },
];

// 图层的数组
export const LayerSidebar = [
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
      { text: "🔙 返回", link: "/baidu/" },
    ],
  },
];

// 佛开的数组
export const FokaiSidebar = [
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
        ],
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
        ],
      },
      { text: "🔙 返回", link: "/baidu/" },
    ],
  },
];

// 数说的数组
export const ShushuoSidebar = [
  {
    text: "🔢 数说数字化",
    collapsible: true,
    items: [
      { text: "🤖 智能报告", link: "/shushuo/ai-report-frontend/cxo/" },
      { text: "🔙 返回", link: "/project/" },
    ],
  },
];

// 智能报告的数组
export const AIReportSidebar = [
  {
    text: "🤖 智能报告",
    collapsible: true,
    items: [
      { text: "✍ 畅写", link: "/shushuo/ai-report-frontend/cxo" },
      { text: "🚧 路由自动化", link: "/shushuo/ai-report-frontend/unplugin-vue-router" },
      { text: "🦿 AI 问答", link: "/shushuo/ai-report-frontend/ai" },
      { text: "🔙 返回", link: "/shushuo/" },
    ],
  },
];

// 自主学习的数组
export const SelfstudySidebar = [
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
      { text: "🔙 返回", link: "/project/" },
    ],
  },
];

// 小兔鲜的数组
export const RabitSidebar = [
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
      { text: "🔙 返回", link: "/myself/" },
    ],
  },
];

// 硅谷甄选的数组
export const SelectSidebar = [
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
      { text: "🔙 返回", link: "/myself/" },
    ],
  },
];

// 尚医通的数组
export const DoctorSidebar = [
  {
    text: "⛑ 尚医通",
    collapsible: true,
    items: [
      { text: "项目初始化", link: "/myself/尚医通/" },
      { text: "🔙 返回", link: "/myself/" },
    ],
  },
];

// react后台的数组
export const BackstageSidebar = [
  {
    text: "🎎 react后台",
    collapsible: true,
    items: [
      { text: "项目初始化", link: "/myself/react后台/" },
      { text: "菜单栏配置", link: "/myself/react后台/menu" },
      { text: "仓库配置", link: "/myself/react后台/redux" },
      { text: "路由守卫", link: "/myself/react后台/守卫" },
      { text: "🔙 返回", link: "/myself/" },
    ],
  },
];

// 知乎日报的数组
export const PaperSidebar = [
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
      { text: "🔙 返回", link: "/myself/" },
    ],
  },
];

// 优医问诊的数组
export const ConsultationSidebar = [
  {
    text: "👨‍⚕️ 优医问诊",
    collapsible: true,
    items: [
      { text: "项目初始化", link: "/myself/优医问诊/" },
      { text: "登录模块", link: "/myself/优医问诊/login" },
      { text: "用户模块", link: "/myself/优医问诊/user" },
      { text: "极速问诊", link: "/myself/优医问诊/consult" },
      { text: "🔙 返回", link: "/myself/" },
    ],
  },
];
