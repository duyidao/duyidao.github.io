---
layout: doc
title: 引言
titleTemplate: Vitepress首页
description: VitePress首页
head:
  - - meta
    - name: description
      content: vitepress首页
  - - meta
    - name: keywords
      content: vitepress 引言
pageClass: vitepress-index-class
---

# 关于此模块

刀刀博客从搭建到部署在 `Gitee Pages` 上，前前后后大约花费2个星期左右。其中，花费的时间主要在于 `vitePress` 的使用以及部署的要点上，百度搜索大量的文章。

目前还没有系统的，从0到1的 `vitePress` 搭建教程，因此 “不如总结一下自己的经验以及踩过的坑吧” 想法油然而生。如果这个教程很幸运能够帮助到别人，哪怕只有一小点，也是我的荣幸。

本模块分为三部分：
1. 搭建。目的是能够搭建一个完整的博客框架，`yarn docs:dev` 运行在本地时能跑起来。
2. 打包。此阶段目标是 `yarn docs:build` 命令打包生成 `dist` 文件夹后运行 `yarn docs:serve` 命令能够在本地看到效果。
3. 部署。最后一步了，本阶段目标是部署到 `Gitee Pages` 并且能够正常访问。

我的源码：[刀刀博客源码](https://gitee.com/duyidao/blog)

下面，开始我们的博客搭建之旅吧~