---
layout: doc
title: 小兔鲜小程序打包
titleTemplate: 小兔鲜小程序打包
description: UniApp 小兔鲜 打包
head:
  - - meta
    - name: description
      content: 小兔鲜小程序打包
  - - meta
    - name: keywords
      content: UniApp 小兔鲜 打包
pageClass: myself-rabit-build
---

# 打包

## 微信小程序打包

微信小程序打包流程如下：

1. 命令行输入打包命令

   ```shell
   pnpm build:mp-weixin
   ```

2. 微信开发工具导入打包好的文件，打包好的文件在 `dist/build/mp-weixin` 文件夹内

3. 上传到微信开发平台中，提交审核即可

## 网页打包

网页 H5 打包流程如下：

1. 命令行输入打包命令

   ```shell
   pnpm build:h5
   ```

2. 打包好后的文件在 `dist/build/h5` 文件夹下，放到服务器中即可

> [!WARNING] ⚠ 注意
> 在之前实现登录功能时使用到手机号快捷登录，可在 H5 网页端无法使用该功能。解决方法为通过条件编译，让不同的端项目使用不同的方法。
> ::: code-group
> ```vue [template]
> <!-- ifdef H5 -->
> <!-- enddef -->
> ```
> ```js [script]
> // ifdef H5
> // enddef
> ```
> ```css [style]
> /* #ifdef H5 */
> /* #endif */
> ```
> :::
