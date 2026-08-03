# 移动端集成小红书 JS SDK 实现笔记分享

## 概述

为满足移动端任务详情页的内容分发需求，需集成小红书官方 <word text="SDK" />，实现携带任务数据一键跳转至小红书创作编辑页并发布笔记的功能。本文档梳理 <word text="SDK" /> 的接入流程与核心参数配置。

## 核心实现流程

![核心实现流程](../../../../images/work/数说/移动端集成小红书JS%20SDK实现笔记分享-核心实现流程.png)

## SDK 接入与参数配置

通过 `script` 标签引入官方 `JS SDK` 后，调用 `xhs.share` 方法。核心参数分为三部分：

1. 分享内容 (`shareInfo`)

    |  属性名   |   类型   |   必填   |                      描述                       |
    | :-------: | :------: | :------: | :---------------------------------------------: |
    |  `type`   | `String` |    是    |  笔记类型：`normal`（图文）或 `video`（视频）   |
    |  `title`  | `String` |    否    |                    笔记标题                     |
    | `content` | `String` |    否    |                  笔记正文内容                   |
    | `images`  | `Array`  | 条件必填 | 图文类型必传。图片 `URL` 数组，必须为服务器地址 |
    |  `video`  | `String` | 条件必填 |   视频类型必传。视频 `URL`，必须为服务器地址    |
    |  `cover`  | `String` |    否    |       视频封面图 `URL`，必须为服务器地址        |

2. 签名验证 (`verifyConfig`)

    |   属性名    |   类型   | 必填  |                       描述                        |
    | :---------: | :------: | :---: | :-----------------------------------------------: |
    |  `appKey`   | `String` |  是   |      应用的唯一标识（由小红书开放平台分配）       |
    |   `nonce`   | `String` |  是   |            随机字符串，用于防重放攻击             |
    | `timestamp` | `String` |  是   |                      时间戳                       |
    | `signature` | `String` |  是   | 签名值（需由后端根据 `appSecret` 等参数计算生成） |

3. 异常回调 (`fail`)

    ```javascript
    xhs.share({
      shareInfo: {
        type: 'normal',
        title: '数据洞察报告',
        content: '今日行业数据分析...',
        images: ['https://cdn.example.com/img1.jpg'],
      },
      verifyConfig: {
        appKey: 'your_app_key',
        nonce: 'random_string',
        timestamp: '1690000000000',
        signature: 'generated_signature',
      },
      fail: (error) => {
        console.error('小红书分享调用失败:', error)
        // 降级处理：提示用户手动复制内容
      },
    })
    ```

> 注意事项：`images`、`video`、`cover` 等媒体资源不支持本地文件路径（如 `blob:` 或 `file://`），必须为可公开访问的 HTTPS 服务器地址。