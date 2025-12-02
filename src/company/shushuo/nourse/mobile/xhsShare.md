---
title: 数说移动端小红书分享
titleTemplate: 数说移动端小红书分享
description: 数说 移动端 小红书 分享
head:
  - - meta
    - name: description
      content: 数说移动端小红书分享
  - - meta
    - name: keywords
      content: 数说 移动端 小红书 分享
pageClass: shushuo-nourse-mobile小红书
tags: mobile,bug,分享
---

# 小红书分享

## 需求背景

在任务页面详情页模块，现在需要加一个按钮，用户点击后，携带任务详情的数据，跳转到小红书的创作编辑页面，让用户编辑内容发布到小红书。

## 效果展示

![效果展示](https://pic1.imgdb.cn/item/69256ac83203f7be00311e83.jpg)

## 实现思路

小红书有提供官方的 JS SDK，可以参考[官方文档](https://agora.xiaohongshu.com/doc/js)进行接入。

根据文档的描述，开发者需要获取对应的 `appId` ，通过 `script` 导入 SDK，然后调用 SDK 提供的 `share` 方法。

方法包含以下三种属性：

- `shareInfo` ：分享内容
  
  | 属性名  | 类型   | 必填 | 描述                                                       |
  | ------- | ------ | ---- | ---------------------------------------------------------- |
  | type    | string | 是   | 笔记类型 `normal` 或 `video`                               |
  | title   | string | 否   | 笔记标题                                                   |
  | images  | array  | 否   | 笔记类型为图文时必传 必须是服务器地址，暂时不支持本地文件  |
  | content | string | 否   | 笔记文字内容                                               |
  | video   | string | 否   | 笔记类型为视频时必传，必须是服务器地址，暂时不支持本地文件 |
  | cover   | string | 否   | 视频笔记的封面图， 必须是服务器地址，暂时不支持本地文件    |

- `verifyConfig` ：签名配置
  
  | 属性名    | 类型   | 必填 | 描述           |
  | --------- | ------ | ---- | -------------- |
  | appKey    | string | 是   | 应用的唯一标识 |
  | nonce     | string | 是   | 随机字符串     |
  | timestamp | string | 是   | 时间戳         |
  | signature | string | 是   | 签名           |

- `fail` ：失败回调

```js
xhs.share({
  shareInfo: {
    type: ' ', // 必填，笔记类型 'video' | 'normal'
    title: ' ', // 笔记标题
    content: ' ', // 笔记正文
    images:  [], //图文类型必填，笔记图片，必须是服务器地址，暂时不支持本地文件
    video: ' ', // 视频类型必填，必须是服务器地址
    cover: ' ' // 视频封面图，必须是服务器地址，暂时不支持本地文件
  },
  verifyConfig: {
    appKey: ' ', //必填，应用的唯一标识,
    nonce: ' ', // 必填，服务端生成签名的随机字符串
    timestamp: ' ', // 必填，服务端生成签名的时间戳
    signature: ' ', // 必填，服务端生成的签名
  },
  fail: (e) => {
   // 调用失败时执行的回调函数
  },
})
```