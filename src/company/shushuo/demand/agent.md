---
title: 数说故事代理配置
titleTemplate: 数说故事项目代理配置
description: 数说故事 项目 代理配置
head:
  - - meta
    - name: description
      content: 数说故事项目代理配置
  - - meta
    - name: keywords
      content: 数说故事 项目 代理配置
pageClass: shushuo-report-ngnix
tags: 代理,whistle,switch omega
---

# 代理配置

## 前言

该项目是一套代码两个环境，本公司环境和客户的环境。公司环境为 `xxx.datastory.com` ，客户环境为 `yyy.changan.com` 。为了本地跑项目方便，遂做代理配置，实现访问两个地址都能代理到本地 `127.0.0.1` 上。

## whistle

想要实现这个功能，需要安装 `whistle` 。使用方法为：

1. 安装 `whistle` ，使用 `npm i -g whistle` 命令安装。
2. 启动 `whistle` ，使用 `whistle start` 命令启动。

   启动成功后，会出现如下提示：
   ![启动提示](https://pic1.imgdb.cn/item/68a6b2f358cb8da5c8409ab7.png)

3. 访问 `http://127.0.0.1:8899` 即可看到 `whistle` 的界面。

在 `whistle` 的界面中，可以配置代理规则，实现访问 `xxx.datastory.com` 代理到 `127.0.0.1` ，访问 `yyy.changan.com` 代理到 `127.0.0.1` 。

点击左侧菜单栏的<word text="Rules" />，配置路由代理规则，输入要代理的地址，然后 `ctrl + s` 保存即可。本地的项目端口是 8080，如果项目的端口是其他比如 5173 则需要做更改。

![配置路由代理规则](https://pic1.imgdb.cn/item/68a6c1b758cb8da5c840acb7.png)

## switch omega

`switch omega` 是一个代理工具，可以方便地切换代理地址。使用方法为：

1. 安装 `switch omega` ，前往 [Edge 浏览器应用商店](https://microsoftedge.microsoft.com/addons/detail/proxy-switchyomega-mv3/fnbemgdobbciiofjfaoaajboakejkdbo) 安装插件。
2. 点击下载好的插件，然后点击【选项】按钮。

   ![选项](https://pic1.imgdb.cn/item/68a6c26f58cb8da5c840ad89.png)

3. 点击左侧的【新增情景模式按钮】，默认选择【代理服务器】，输入名称（这里以 `127.0.0.1` 为例子）点击【确认】按钮。

   ![新增情景模式按钮](https://pic1.imgdb.cn/item/68a6c29e58cb8da5c840adb2.png)

4. 选择前面创建的情景模式，【代理协议】选择 `http` ，【代理服务器】输入 `127.0.0.1` ，【代理端口】输入 `8899` ，点击左侧的【应用选项】按钮。

   ![应用选项](https://pic1.imgdb.cn/item/68a6c78a58cb8da5c840b4e2.png)

5. 选择【`auto switch`】，点击【添加条件】按钮，【条件类型】选择域名通配符，【条件设置】输入要代理的地址（本文是 `xxx.datastory.com` 和 `yyy.changan.com` ），【情景模式】选择前面创建的情景模式，点击左侧的【应用选项】按钮。

   ![情景模式](https://pic1.imgdb.cn/item/68a6c89058cb8da5c840b5f5.png)

## 测试成功性

回到 `whistle` 的界面，点击左侧菜单栏的<word text="Network" />，可以看到访问 `xxx.datastory.com` 和 `yyy.changan.com` 的请求都代理到了 `127.0.0.1` 上。

![测试成功性](https://pic1.imgdb.cn/item/68a6c91d58cb8da5c840b804.png)
