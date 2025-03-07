---
layout: doc
title: 打包
titleTemplate: Vitepress打包
description: VitePress打包
head:
  - - meta
    - name: description
      content: vitepress打包
  - - meta
    - name: keywords
      content: vitepress 打包
pageClass: vitepress-build-class
---

# 打包
项目搭建成功后，接下来该打包了。

Vitepress 打包需要做一个前置步骤：在 `config.js` 文件中设置 `base` 打包基准路径，路径填啥取决于部署时仓库的名称是啥。

例如：我的仓库名称为 “daodao” ，则我的 `base` 参数如下：
```js
base: '/daodao/'
```

如果仓库名称为 `github用户名.github.io` 或者 `gitee用户名.gitee.io` ，则视为默认路径，斜杆即可。

```js
base: '/'
```

前置工作做好以后，运行打包命令打包项目。

::: code-group
```sh [yarn]
yarn build
```
```sh [npm]
npm run build
```
```sh [pnpm]
pnpm build
```
:::

一旦打包成功后，就可以通过运行命令来进行本地测试。

::: code-group
```sh [yarn]
yarn preview
```
```sh [npm]
npm run preview
```
```sh [pnpm]
pnpm preview
```
:::

可以看到效果即为成功。