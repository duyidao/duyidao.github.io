---
layout: doc
title: 百度外包佛开项目大屏打包
titleTemplate: 百度外包佛开项目大屏打包
description: 地图 百度 佛开 大屏端 打包
head:
  - - meta
    - name: description
      content: 百度外包佛开项目大屏打包
  - - meta
    - name: keywords
      content: 地图 百度 佛开 大屏端 打包
pageClass: baidu-fokai-build
---

# 打包

在项目的最后，需要打包项目做部署处理。运维说需要该项目的路由。路由在 `vite.config.js` 文件内处理。通过设置 `base` 定义路由。

为了后续开发和打包方便，把路由定义在 `.env.production` 中。

```txt
VITE_BASE_URL = /output
```

Vue3 项目是用的 `vite` 创建，因此无法直接在 `defineConfig` 中获取到 `import.meta.env` ，还需要 `loadEnv` 获取。

最终代码如下：

```js
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    return {
        base: env.VITE_BASE_URL,
        // ...
    };
});
```

