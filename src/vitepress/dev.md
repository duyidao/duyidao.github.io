

# 搭建

|         官网         |                                      链接                                      |
| :------------------: | :----------------------------------------------------------------------------: |
|    VitePress 官网    |                 [VitePress 官网](https://vitepress.vuejs.org/)                 |
| VitePress 中文网文档 | [VitePress 中文网文档](https://vitejs.cn/vitepress/guide/getting-started.html) |

## 项目创建

1. 新建一个文件夹(文件名可以自行取，但不建议叫 `vitepress`)，进入该文件夹并初始化 `package.json` 文件。

   ::: code-group

   ```sh [yarn]
    yarn init
   ```

   ```sh [npm]
    npm init
   ```

   ```sh [pnpm]
    pnpm init
   ```

   :::

2. 本地安装 `vitePress` 。

   ::: code-group

   ```sh [yarn]
    yarn add --dev vitepress
   ```

   ```sh [npm]
    npm install --dev vitepress
   ```

   ```sh [pnpm]
    pnpm i --dev vitepress
   ```

   :::

3. 根目录下新建一个 `docs` 文件夹，进入文件夹，新建一个 `index.md` 文档，输入内容。

   > [!INFO] 提示
   > 也可以不创建 `docs` 文件夹，默认以项目根目录作为根路径。

4. 修改 `package.json` 文件，添加运行脚本。

   ```js
    {
      // ...,
      "scripts": {
        "dev": "vitepress dev docs",
        "build": "vitepress build docs",
        "serve": "vitepress serve docs"
      }
    }
   ```

5. 配置 `.vitepress` 目录。所有 `VitePress` 相关的文件都将会被放在这里。创建配置文件 `.vitepress/config.js`，导出一个<word text="JavaScript" />对象。

   ```js [.vitepress/config.js]
   module.exports = {
     title: 'Hello VitePress',
     description: 'Just playing around.',
   }
   ```

   ::: info 提示
   这部分会在 『配置文件配置』 模块详细介绍。
   :::

6. 运行

   ::: code-group

   ```sh [yarn]
    yarn dev
   ```

   ```sh [npm]
    npm dev
   ```

   ```sh [pnpm]
    pnpm dev
   ```

   :::

现在能够运行成功，打开页面能够看到效果了。但是这远远不够我们的预期，需要做进一步的调整。

## 目录结构

作为新手梳理一遍目录结构还是有必要的，比较心急想要尽快实现效果的话可以 『跳过』 本段，从下一段 『首页配置』 开始。

::: details 点我查看详细结构

```bash
├── docs
│   ├── .vitepress # 存放全局的配置文件
│   │   ├── theme # 存放本地主题
│   │   │   ├── custom.less # 自定义 css 样式
│   │   │   └── index.js # 将自定义 css 样式抛出
│   │   ├── config.js # 配置文件的入口文件，用于设置博客的导航栏、侧边栏等属性，是重点文件
|   ├── public # 静态资源目录
│   └── index.md # 博客首页文件，用户打开博客第一眼看到的是 index.md 的内容
│   ├── learn # learn 文件夹，存放学习笔记
│   │   ├── CSS.md # CSS md 文档
│   ├── project # project 文件夹，存放项目总结
│   │   ├── Music.md # Music md 文档
└── package.json # 项目配置文件
```

:::

## 首页配置

修改 `docs/index.md` 的内容， `layout` 字段设为 `home` 表示首页，通过配置 `hero` 设置按钮组、标题、导航栏，想要先看效果的话可直接复制以下代码。需要根据自己配置的路径配置对应的文件和文件夹。例如示例代码，`/learn/CSS` 需要在 `docs` 文件夹下创建 `learn` 文件夹，再新建一个 `CSS.md` 文档。其他以此类推。

::: details 点我查看代码

```md
---
layout: home

hero:
  name: 刀刀博客
  text: 项目学习经验。不定时更新~
  tagline: 每天都要比昨天更有进步💪
  actions:
    - theme: brand
      text: 前端知识
      link: /learn/
    - theme: alt
      text: 项目总结
      link: /project/Music/

features:
  - icon: 📕
    title: 学习之旅
    details: 自学成果
    link: /learn/CSS
  - icon: ⌛
    title: 项目总结
    details: 项目总结
    link: /project/Music
  - icon: 🎈️
    title: 未完待续
    details: 尽情期待
---
```

:::

`actions` 作为标题下的按钮，有两种风格样式，`theme` 设置为 `brand` 表示主题色，`theme` 设置为 `alt` 表示浅色。

`features` 作为标题下的内容，`icon` 设置图标，`title` 设置标题，`details` 设置描述，`link` 设置跳转链接，鼠标悬浮会有 `hover` 样式。如果不设置 `link` 则是普通的卡片，不会有 `hover` 样式，可以自己修改样式。

## 配置文件配置

修改 `docs/.vitepress/config.js` 的内容。具体的作用和使用可以查看 [VitePress 中文网文档](https://vitejs.cn/vitepress/guide/getting-started.html)。这里只详述 `sidebar` 和 `nav` 的配置。

`sidebar` 主要用于左侧的导航栏，当路由符合条件就显示对应的导航栏。`nav` 主要用于顶部的导航栏。

::: details 点我查看代码
::: code-group

```js [config.js]
module.exports = {
  lang: 'zh-CN', // 语言
  title: '刀刀博客', // 网站标题
  titleTemplate: ':title - 刀刀博客', // 浏览器显示的标题
  description: '刀刀博客', // 网站描述
  dest: './dist', // 打包目录
  // 打包后 html meta文件配置
  head: [
    ['link', { rel: 'icon', href: './favicon.ico' }], // 添加图标
    ['meta', { property: 'og:title', content: '刀刀博客' }],
    ['meta', { property: 'og:site_name', content: '刀刀博客' }],
    ['meta', { property: 'og:type', content: 'website' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '杜一刀技术博客刀刀博客，记录着所学所思所想',
      },
    ],
    [
      'meta',
      {
        property: 'keyword',
        content:
          '刀刀,杜一刀,技术博客,博客,前端,js,css,html,react,vue,webpack,vite,git,github,码农,程序员,刀刀博客',
      },
    ],
  ],
  cleanUrls: true, // 删除 .html 后缀
  /*
   * 使用插件
   */
  plugins: [
    '@vuepress/active-header-links', // 页面滚动时自动激活侧边栏链接的插件
    '@vuepress/back-to-top', // 返回顶部插件
  ],
  /*
   * 主题配置
   */
  themeConfig: {
    logo: '/favicon.ico', // 首页左上角 logo
    lastUpdated: {
      // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
      text: '最近一次更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },
    siteTitle: '『 刀刀博客 』', // 首页左上角标题文本
    outlineTitle: '我是一个目录哦~', // 目录标题文本
    outline: [2, 6], // 目录只获取h2到h6
    smoothScroll: true, // 启动页面丝滑滚动
    // 头部导航栏配置
    nav,
    // 左侧导航栏
    sidebar,
    //社交链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/duyidao' }],
    // 底部页脚配置
    docFooter: {
      prev: '前往上一页',
      next: '去往下一页',
    },
    // 多语言配置
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
    //页脚
    footer: {
      copyright: 'Copyright © 2023-present 杜一刀',
    },
  },
}
```

```js [sidebar.js]
export default sidebar = {
  '/learn/': [
    {
      text: '学习之旅',
      children: [
        {
          text: 'CSS',
          children: [{ text: 'CSS', link: '/learn/CSS' }],
        },
      ],
    },
  ],
  '/project/': [
    {
      text: '项目总结',
      children: [
        {
          text: 'Music',
          children: [{ text: 'CSS', link: '/project/Music' }],
        },
      ],
    },
  ],
}
```

```js [nav.js]
export default [
  { text: '首页', link: '/' },
  { text: '学习之旅', link: '/learn/CSS' },
  { text: '关于我', link: '/project/Music' },
  { text: 'GitHub', link: 'https://github.com/duyidao' },
]
```

:::

## 页面编写

页面编写实际上就是写 `markdown` 语法，这里不做过多赘述，想要了解更多的可去知乎、CSDN 等平台寻找。

这里主要说的一点是 `Front Matter` ，它其实就是对当前 `.md` 的声明。有点类似于 `HTML` 文件中的 `meta` 标签的定位。

书写要求：写在 `---` 内。

```md
---
layout: doc          <!-- 设置当前页面的布局组件 -->
title: HTML 进阶     <!-- 当前页面的标题 -->
lang: en-US         <!-- 当前页面的语言 可多语言，默认英语 -->
description: xxx    <!-- 当前页面的描述 -->
---
```

## 样式设置

默认样式太丑陋？可在 `docs/.vitepress/theme` 文件夹下新建一个 `css` 文件（或者下载 `less` 、`sass` 、`stylus` 等预处理器也可以）设置样式。

样式设置完毕后刷新页面不生效，不要急，步骤还没结束，在同级目录下（也就是 `docs/.vitepress/theme` 文件夹下）新建一个 `index.js` 文件，引入设置好的样式并导出，如下方代码所示。

```js [docs/.vitepress/theme/index.js]
import DefaultTheme from 'vitepress/theme'
import './custom.less' // 自己的样式文件名

export default DefaultTheme
```

::: info 备注
具体样式设置单独开一个模块。
:::

## 知识点拓展

### 路由

在 [Vue](https://cn.vuejs.org/) 中，一个 `.vue` 文件就可以作为一张页面，或者是一个组件。

在 VitePress 中，一个 `.md` 文件就可以作为一张页面。

并且，根据根目录 `docs` ，可自动生成路由。

```
├── docs
│   ├── HTML
│   │   ├── index.md     /HTML/
│   └── └── advanced.md     /HTML/advanced/
└──
```

## 总结

到目前为止，博客初步搭建工作完成了，总结一下做了哪些内容：

1. 在 `docs/index.md` 首页文件中编写博客的首页，包括标题、简介、按钮组设置、专栏等。
2. 在 `docs/.vitepress/config.js` 文件中配置博客的标题、介绍、顶部导航、左侧导航等。
3. 在 `docs/.vitepress/theme` 文件夹中设置博客样式并导出使用。
4. 根据规定的目录，创建对应的 `.md` 文件，并编写内容。