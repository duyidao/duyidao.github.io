---
layout: doc
title: CRM 小程序域名配置
titleTemplate: CRM 域名配置
description: CRM 小程序 域名配置
head:
  - - meta
    - name: description
      content: CRM 域名配置
  - - meta
    - name: keywords
      content: CRM 小程序 域名配置
pageClass: lingsi-crm-build
tags: 域名配置
---

# 小程序域名配置

登录微信公众平台登录小程序管理账号

## 配置域名

- **点击开发管理**

- **在开发设置页面-下拉找到服务器域名配置**

  **点击开发设置下拉，找到服务器域名，点修改**

  管理员扫码确定，配置 `request` 合法域名即可，然后保存并提交

- **填入域名，微信小程序规定了域名必须是 https 开头的，否则无效**

## 更新配置

我们可以通过修改开发者工具的本地设置，将不校验合法域名勾上就可以在开发者工具上正常运行了。但是如果想在手机上预览，还是需要真机调试才可以正常运行。

点刷新，更新域名，上传。信息一致就表示配置域名成功。
