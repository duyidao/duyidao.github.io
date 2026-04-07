---
layout: doc
title: 视频分销分包
titleTemplate: 视频分销分包
description: 视频分销 项目 分包
head:
  - - meta
    - name: description
      content: 视频分销分包
  - - meta
    - name: keywords
      content: 视频分销 项目 分包
pageClass: lingsi-sale-subpackage
tags: subpackage,uni.request
---

# 分包

将小程序的代码和资源拆分成多个包，按需加载，减少主包体积，提升首屏加载速度。

## 分包策略

```md
项目结构：
├── pages/              # 主包（2MB以内）
│   ├── index/         # 首页
│   ├── login/         # 登录页
│   └── common/        # 公共页面
│
├── subpackages/       # 分包
│   ├── audio/         # 音频模块分包（1.5MB）
│   │   ├── pages/
│   │   │   ├── player/
│   │   │   └── playlist/
│   │   └── utils/
│   │
│   ├── payment/       # 支付模块分包（800KB）
│   │   └── pages/
│   │       ├── alipay/
│   │       └── wechat/
│   │
│   └── user/          # 用户中心分包（1.2MB）
│       └── pages/
│           ├── profile/
│           └── orders/
│
└── components/        # 公共组件（放在主包）
```

## 配置

```json
{
  "pages": [
    "pages/index/index",
    "pages/login/login",
    "pages/common/about"
  ],
  
  "subpackages": [
    {
      "root": "subpackages/audio",
      "name": "audio",
      "pages": [
        "pages/player/player",
        "pages/playlist/playlist"
      ],
      "independent": false  // 是否独立分包
    },
    {
      "root": "subpackages/payment",
      "name": "payment",
      "pages": [
        "pages/alipay/alipay",
        "pages/wechat/wechat"
      ]
    },
    {
      "root": "subpackages/user",
      "name": "user",
      "pages": [
        "pages/profile/profile",
        "pages/orders/orders"
      ],
      "independent": false
    }
  ],
  
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["audio", "user"]
    }
  }
}
```

说明：

- `root`: 分包根目录
- `name`: 分包别名（用于 preloadRule）
- `pages`: 分包页面路径
- `independent`: 是否独立分包（独立分包可突破2MB限制）
- `preloadRule`: 预下载规则

## 预下载策略

```json
{
  "preloadRule": {
    // 进入首页时，预下载 audio 和 user 分包
    "pages/index/index": {
      "network": "all",           // all/wifi：在什么网络下预下载
      "packages": ["audio", "user"]
    },
    
    // 进入音频播放页时，预下载 payment 分包
    "subpackages/audio/pages/player/player": {
      "network": "wifi",
      "packages": ["payment"]
    }
  }
}
```

## uni-app 分包配置

::: code-group
```json [manifest.json]
{
  "mp-weixin": {
    "appid": "wx1234567890",
    "setting": {
      "urlCheck": true
    },
    "optimization": {
      "subPackages": true  // 启用分包优化
    }
  }
}
```
```json [pages.json]
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {}
    }
  ],
  
  "subPackages": [
    {
      "root": "subpackages/audio",
      "pages": [
        {
          "path": "pages/player/player",
          "style": {}
        }
      ]
    }
  ]
}
```
:::

## 分包优化

### 按需引入组件

```js
// ❌ 全局注册（占用主包体积）
import AudioPlayer from '@/components/AudioPlayer.vue'
Vue.component('AudioPlayer', AudioPlayer)

// ✅ 按需引入（放在分包内）
export default {
  components: {
    AudioPlayer: () => import('@/components/AudioPlayer.vue')
  }
}
```

### 图片资源拆分

```js
// ❌ 大图放在主包
import logo from '@/static/logo.png'  // 500KB

// ✅ 大图放在分包或 CDN
export default {
  data() {
    return {
      logo: 'https://cdn.example.com/logo.png'
    }
  }
}
```

### 第三方库拆分

```js
// ❌ 主包引入大库
import _ from 'lodash'  // 70KB
import moment from 'moment'  // 200KB

// ✅ 按需引入或使用轻量替代
import debounce from 'lodash/debounce'  // 只引入需要的函数
import dayjs from 'dayjs'  // 使用轻量替代（2KB）
```

### 包体积优化成果

```js
// 优化前
const before = {
  主包: '3.5MB',      // ❌ 超过2MB限制
  分包1: '1.2MB',
  分包2: '800KB',
  总包: '5.5MB',
  首屏加载: '4.5s'
}

// 优化后
const after = {
  主包: '1.8MB',      // ✅ 符合限制
  分包1_audio: '1.5MB',
  分包2_payment: '800KB',
  分包3_user: '1.2MB',
  总包: '5.3MB',
  首屏加载: '1.8s'    // 提升 60%
}

console.log('优化成果:', {
  主包减少: `${((3.5 - 1.8) / 3.5 * 100).toFixed(0)}%`,
  首屏加速: `${((4.5 - 1.8) / 4.5 * 100).toFixed(0)}%`,
  符合限制: after.主包 <= 2 ? '✅' : '❌'
})
```