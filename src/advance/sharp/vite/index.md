# Vite 的 SPA 模式

## 前言

关于<word text="Vite" />创建的项目，和曾经的项目创建（如<word text="Vue Cli" />等）存在着很多不同之处。

本文档从入口与传统构建工具的不同入手，对比使用<word text="Vite" />创建的项目、使用<word text="Vue3" />创建的项目、使用<word text="Vue Cli" />创建的<word text="Vue2" />项目，有何差异。

最后再来聊聊如何用<word text="Vite" />创建一个<word text="Vue2" />项目。

## 创建 Vue3 项目

### 命令行对比

先来看看最新版的 [Vite 官方文档](https://vitejs.cn/vite6-cn/guide/#scaffolding-your-first-vite-project)，如何新建一个项目。

根据文档的描述，命令行如下：

::: code-group

```sh [npm]
npm create vite@latest
```

```sh [pnpm]
pnpm create vite
```

:::

再来看看最新版的 [Vue.js 官方文档](https://cn.vuejs.org/guide/quick-start.html)，如何新建一个项目。

根据文档的描述，命令行如下：

::: code-group

```sh [npm]
npm create vue@latest
```

```sh [pnpm]
pnpm create vue@latest
```

:::

从命令行的对比上看，二者并没有太大的区别。

### 入口文件对比

新建一个项目后，我们来看看入口文件有何不同。

::: code-group

```html [vite/index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vite-create-app</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

```html [vue/index.html]
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

:::

从入口文件来看，二者并没有多大的差别，都是以 `type` 为 `module` 的 `script` 标签引入加载 `main.js`，运用到的是浏览器的 [ES Module](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules) 特性。

### package.json 对比

下面来对比两个项目的 `package.json` 文件。

::: code-group

```json [vite/package.json]
{
  "name": "vite-create-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.24"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.1",
    "vite": "^7.2.4"
  }
}
```

```json [vue/package.json]
{
  "name": "vue-create-app",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": "^20.19.0 || >=22.12.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.26"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.3",
    "vite": "^7.3.0",
    "vite-plugin-vue-devtools": "^8.0.5"
  }
}
```

:::

查看对比，除了个别版本号不同外，二者并没有太大的差别。

相比于<word text="Vite" />项目，<word text="Vue3" />项目多了一个 `vite-plugin-vue-devtools` 插件，该插件主要用于调试项目。

### vite.config.js 对比

再来看看两个项目的 `vite.config.js` 文件。

::: code-group

```js [vite/vite.config.js]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})
```


```js [vue/vite.config.js]
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
```

:::

从 `vite.config.js` 文件来看，由于<word text="Vue3" />项目多了一个 `vite-plugin-vue-devtools` 插件，因此这里的 `plugins` 多了一个插件注册。

除此之外，<word text="Vue3" />项目还配置了 `resolve.alias`，用于简化路径引用。
