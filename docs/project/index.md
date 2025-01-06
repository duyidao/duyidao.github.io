---
layout: doc
title: 项目或功能模块
titleTemplate: 工作与学习积累的项目经验
description: 项目 自学
head:
  - - meta
    - name: description
      content: 工作与学习积累的项目经验
  - - meta
    - name: keywords
      content: 项目 自学
pageClass: project-class
---

该模块为做过的各种项目模块，包含一些项目重难点以及个人的解决思路与学习心得。

## 真实项目

<BlogLis :items="[
  {
    title: '灵思',
    link: '/project/lingsi/',
    description: `<p>灵思项目多以多端为主，因此技术栈方面多采用 \`UniApp\` 实现多端。由于公司规模较小，因此采取保守策略使用 \`Vue2\` 。</p>`,
  },
  {
    title: '百度外包',
    link: '/project/baidu/',
    description: `<p>百度外包项目多以百度地图为主，主要通过地图展示模型、扎点、线等因素。由于项目需要提供组件给客户使用，因此使用 \`Vue2.7\` 版本，无论客户使用 \`Vue2\` 还是 \`Vue3\` 都能适配。</p><p>业务方面偏大屏，大量采用 \`Echart\` ，也针对配置项做了UI适配处理。</p>`,
  },
]" />

## 刀刀博客小站

<BlogLis :items="[
  {
    title: '刀刀博客小站',
    link: '/project/daodao/',
    description: `<p>刀刀博客效果如何通过代码实现，附带源码展示。</p>`,
  },
]" />

## 网上学习

<BlogLis :items="[
  {
    title: '自主学习',
    link: '/project/myself/',
    description: `<p>网上项目学习，包含多种技术栈。</p>`,
  },
]" />