const chart = [
  {
    text: 'SVG',
    collapsed: true,
    items: [
      { text: '文字适应纹理', link: '/chart/svg/shadow' },
      { text: '图片故障动画', link: '/chart/svg/turbulence' },
    ],
  },
  {
    text: 'Canvas',
    collapsed: true,
    items: [
      { text: '图片压缩', link: '/chart/canvas/compress' },
      { text: '文件签名与画板功能', link: '/chart/canvas/drawbed' },
      { text: '滤镜', link: '/chart/canvas/filter' },
      { text: '色彩提取', link: '/chart/canvas/palette' },
      { text: '页面截图', link: '/chart/canvas/screenshot' },
      { text: '图片裁剪', link: '/chart/canvas/tailor' },
      { text: '根据背景图片改变主题色阴影', link: '/chart/canvas/theme' },
      { text: '视频提取画面帧', link: '/chart/canvas/video' },
    ],
  },
  {
    text: 'EChart',
    collapsed: true,
    items: [
      { text: '柱状图悬停文本自定义', link: '/chart/echart/bar_formater' },
      { text: '柱状图封装', link: '/chart/echart/bar_package' },
      { text: '横向柱状图参数数量设置', link: '/chart/echart/crosswise_bar' },
      { text: '图表菜单项自定义', link: '/chart/echart/menu_custom' },
      {
        text: '饼图轮播，hover图例后修改中间内容',
        link: '/chart/echart/pie_carousel',
      },
      {
        text: '饼图中部内容自定义，点击图例修改中间内容',
        link: '/chart/echart/pie_center_custom',
      },
    ],
  },
]

const sharp = [
  {
    text: 'Node',
    collapsed: true,
    items: [
      { text: 'node', link: '/sharp/node/' },
      { text: 'fs', link: '/sharp/node/fs' },
      { text: 'path', link: '/sharp/node/path' },
      { text: 'http', link: '/sharp/node/http' },
      { text: 'module', link: '/sharp/node/module' },
      { text: 'express', link: '/sharp/node/express' },
      { text: 'npm', link: '/sharp/node/npm' },
    ],
  },
  {
    text: 'TypeScript',
    collapsed: true,
    items: [
      { text: '环境配置', link: '/sharp/typescript/env' },
      { text: '类型', link: '/sharp/typescript/type' },
      { text: '断言与枚举', link: '/sharp/typescript/as' },
      { text: '类与接口', link: '/sharp/typescript/interface' },
      { text: '泛型', link: '/sharp/typescript/t' },
      { text: '装饰器', link: '/sharp/typescript/decorator' },
    ],
  },
  {
    text: 'GSAP动画',
    collapsed: true,
    items: [
      { text: '基础', link: '/sharp/gsap/' },
      { text: '动画参数', link: '/sharp/gsap/variables' },
      { text: '时间轴', link: '/sharp/gsap/timeline' },
    ],
  },
]

const module = [
  {
    text: '浏览器',
    collapsed: true,
    items: [{ text: '浏览器渲染原理', link: '/module/browser/' }],
  },
  {
    text: 'Git',
    collapsed: true,
    items: [
      {
        text: 'BUG',
        collapsed: true,
        items: [{ text: '大小写规则检测', link: '/module/git/bug_case' }],
      },
      {
        text: '实操',
        collapsed: true,
        items: [
          {
            text: '根据 ChangeId 合并部分提交',
            link: '/module/git/project_changid',
          },
          {
            text: '工作中项目git如何管理，冲突如何解决',
            link: '/module/git/project_conflict',
          },
          {
            text: '多人合作项目变基处理',
            link: '/module/git/project_rebase',
          },
        ],
      },
    ],
  },
  {
    text: '小程序',
    collapsed: true,
    items: [{ text: '两个线程', link: '/module/miniProgram/' }],
  },
  {
    text: '正则',
    collapsed: true,
    items: [
      {
        text: '知识',
        collapsed: true,
        items: [
          { text: '正则表达式', link: '/module/reg/knowledge_index' },
          { text: '元子字符', link: '/module/reg/knowledge_character' },
          { text: '模式修饰', link: '/module/reg/knowledge_mode' },
          { text: '原子', link: '/module/reg/knowledge_atom' },
          { text: '匹配', link: '/module/reg/knowledge_metch' },
          { text: '方法', link: '/module/reg/knowledge_method' },
        ],
      },
      {
        text: '实操',
        collapsed: true,
        items: [
          {
            text: '运用前瞻实现密码强度检测',
            link: '/module/reg/do_password_strength',
          },
        ],
      },
      {
        text: 'BUG',
        collapsed: true,
        items: [
          { text: '正则中的lastIndex', link: '/module/reg/bug_lastIndex' },
        ],
      },
    ],
  },
  {
    text: '网络',
    collapsed: true,
    items: [
      { text: '网络分层模型', link: '/module/network/' },
      { text: '应用协议', link: '/module/network/xieyi' },
      { text: 'xhr与fetch', link: '/module/network/xhr_fetch' },
      { text: '跨域问题及解决方案', link: '/module/network/core' },
    ],
  },
]

export { chart, sharp, module }
