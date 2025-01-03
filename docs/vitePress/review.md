---
layout: doc
title: 评论功能添加
titleTemplate: Vitepress评论功能添加
description: VitePress评论功能添加
head:
  - - meta
    - name: description
      content: vitepress评论功能添加
  - - meta
    - name: keywords
      content: vitepress 评论功能 giscus
pageClass: vitepress-review-class
---

# 评论功能添加

## 前置配置

### 新增仓库

新建一个仓库，专门用于存放用户评论的数据。要求该仓库是公开的。创建完毕后前往 `setting` 模块，下拉勾选 `Discussions` 选项，点击 `install` 按钮，开启 `Discussions` 功能。

![配置](https://pic.imgdb.cn/item/676d187ad0e0a243d4ead8bc.png)

### Github账号下载插件

点击右上角的个人头像，选择`Setting` 设置，左侧导航栏下拉找到 `Applications` 。点击 `New OAuth App` 新建一个应用。搜索 [giscus](https://giscus.app/zh-CN)，选择刚刚新建好的新公开仓库。

![配置](https://pic.imgdb.cn/item/676d17d9d0e0a243d4ead581.png)

### 官网配置

前往 [giscus](https://giscus.app/zh-CN) 官网，复制刚刚新建好的公开仓库地址到输入框内，选择 "Discussion 的标题包含页面的 pathname" 显示评论者的昵称。

![配置](https://pic.imgdb.cn/item/676d190ad0e0a243d4eadba0.png)

讨论分类推荐选择 `announcements` ：

![讨论分类](https://pic.imgdb.cn/item/676d1965d0e0a243d4eadd5c.png)

下面的特性根据自己的需要来自行配置。一切都配置好后往下拉，可以看到已经生成好对应的脚本，复制保存下面要用。

![脚本](https://pic.imgdb.cn/item/676d1991d0e0a243d4eade36.png)

## 功能实现

### 安装插件

::: code-group

```bash [pnpm]
 pnpm add vitepress-plugin-comment-with-giscus
```

```bash [npm]
 npm i vitepress-plugin-comment-with-giscus
```
:::

### 配置插件

前往 `.vitepress/themme/index.js` 文件中配置 [giscus](https://giscus.app/zh-CN) 插件。把前面获取到的脚本代码里的参数一一对应复制上去即可。

```js
import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';

export default {
    ...DefaultTheme,
    enhanceApp() {
        // ...
    },
  setup() {
        // Get frontmatter and route
        const { frontmatter } = useData();
        const route = useRoute();
        
        // Obtain configuration from: https://giscus.app/
        giscusTalk({
            repo: 'your github repository', 
            repoId: 'your repository id',   
            category: 'your category', // default: `General` 
            categoryId: 'your category id', 
            mapping: 'pathname', // default: `pathname`
            inputPosition: 'top', // default: `top`
            lang: 'en', // default: `zh-CN`
            lightTheme: 'light', // default: `light`
            darkTheme: 'transparent_dark', // default: `transparent_dark`
            // ...
        }, {
            frontmatter, route
        },
            // Whether to activate the comment area on all pages.
            // The default is true, which means enabled, this parameter can be ignored;
            // If it is false, it means it is not enabled.
            // You can use `comment: true` preface to enable it separately on the page.
            true
        );
    }
}
```