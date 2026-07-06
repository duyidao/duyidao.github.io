---
title: Vite 的 SPA 模式
author:
  - 小猿_Eric 【手把手带你玩转Vite】创建 vue2/3 项目&https://www.bilibili.com/video/BV1whEXzmExw/
  - 小猿_Eric 【手把手带你玩转Vite】创建 react 项目&https://www.bilibili.com/video/BV1M7JizjE4Y/
---

# Vite 的 SPA 模式

## 前言

关于<word text="Vite" />创建的项目，和曾经的项目创建（如<word text="Vue Cli" />等）存在着很多不同之处。

本文档从入口与传统构建工具的不同入手，对比使用<word text="Vite" />创建的项目、使用<word text="Vue3" />创建的项目、使用<word text="Vue Cli" />创建的<word text="Vue2" />项目，有何差异。

最后再来聊聊如何用<word text="Vite" />创建一个<word text="Vue2" />项目。

## Vite 创建 Vue 项目

### Vite 创建 Vue3 项目

#### 命令行对比

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

#### 入口文件对比

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

#### package.json 对比

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

#### vite.config.js 对比

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

### Vue Cli 创建 Vue 项目

接下来用<word text="Vue Cli" />创建一个<word text="Vue3" />项目，看看有何不同。

#### 目录结构

首先查看目录结构，可以发现，<word text="Vue Cli" />创建的项目根目录下没有 `index.html` 做入口文件了，且 `index.html` 被放在了 `public` 目录下。

#### index.html

```html [vue-cli/index.html]
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

现在 `index.html` 充当的不是入口文件，而是在构建时，被用作模板（`template`），<word text="Webpack" />会在这个模板的基础上：

- 自动注入打包后的资源文件（如 `<script src="/js/app.xxxx.js"></script>`）
- 注入 `<link rel="stylesheet" href="/css/app.xxxx.css">`
- 保留你写在模板中的 `<meta>`、`<title>`、`<div id="app"></div>` 等内容

> 简单说：`public/index.html` 是一个挂载点，是“骨架”，构建后会自动“填充”资源引用。

#### package.json

```json [vue-cli/package.json]
{
  "name": "cli-create-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^3.8.3",
    "vue": "^3.2.13"
  },
  "devDependencies": {
    "@babel/core": "^7.12.16",
    "@babel/eslint-parser": "^7.12.16",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/vue3-essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "@babel/eslint-parser"
    },
    "rules": {}
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "not ie 11"
  ]
}
```

`package.json` 文件中，多了很多 `babel` 和 `webpack` 相关的配置，用于处理 `ES6` 语法、`eslint` 语法检查等。

#### vue.config.js

由于不是用<word text="Vite" />创建的项目，因此没有 `vite.config.js` 文件，但 `vue-cli` 提供了 `vue.config.js` 文件。

```js [vue-cli/vue.config.js]
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
```

而语法也不是 `ES6` 的 `import`，而是 `CommonJS` 的 `require` 语法。

### 拓展：用 Vite 创建 Vue2 项目

最后，我们再来看看如何用<word text="Vite" />创建一个<word text="Vue2" />项目。

想要实现这个需求，需要借助 `@vitejs/plugin-vue2` 插件。

```bash
npm init vite@latest vue2-app --template vue2
```

创建完成后，修改 `package.json` 文件，添加 `@vitejs/plugin-vue2` 插件。

```json [vue2/package.json]
{
  "name": "vue2-app",
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
    "vue": "^2.6.14"
  },
  "devDependencies": {
    "@vitejs/plugin-vue2": "^2.0.0",
    "vite": "^4.0.0"
  }
}
```

然后新建一个 `vite.config.js` 文件，添加 `@vitejs/plugin-vue2` 插件。因为本质上还是用<word text="Webpack" />创建的项目，所以项目根目录是没有 `vite.config.js` 文件的。

```js [vue2/vite.config.js]
import { defineConfig } from 'vite'
import { createVuePlugin } from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
})
```

这样就可以用<word text="Vite" />创建一个<word text="Vue2" />项目了。

### 阶段小结

本节我们学习了如何用<word text="Vite" />创建<word text="Vue" />项目，以及不同命令行创建的项目有什么区别。

主要区别在于：入口与传统构建工具的不同。

## Vite 创建 React 项目

在之前，创建一个<word text="React" />项目，需要借助 `Create React App` 工具。

```bash
npx create-react-app react-app
```

但是根据 [官网](https://www.reactjs.cn/blog/2025/02/14/sunsetting-create-react-app) 的提示，`Create React App` 已经弃置了，现在创建<word text="React" />项目，推荐使用<word text="Vite" />。

::: code-group

```sh [npm]
npm create vite@latest
```

```sh [pnpm]
pnpm create vite
```

:::

和创建<word text="Vue" />项目一样，创建<word text="React" />项目时，可以选择模板，比如 `vanilla`、`react-ts`、`vue`、`vue-ts` 等。

```bash
npm create vite@latest react-app --template react
```

创建完成后，进入项目目录，安装依赖。

```bash
cd react-app
npm install
```

### 入口文件

一样的，根目录下的 `index.html` 文件，是入口文件。

```html [react/index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

终端输入 `pnpm dev` 运行项目后，`main.jsx` 文件会被<word text="Vite" />编译为 `main.js` 文件，浏览器无需关注一开始是 `main.jsx`，而是 `main.js`，只需要最终拿到的是 `js` 文件即可。