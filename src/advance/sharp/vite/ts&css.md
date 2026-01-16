---
title: ts css 相关问题
author:
  - 小猿_Eric 【手把手带你玩转Vite】ts css 相关问题&https://www.bilibili.com/video/BV1V8jEzYEGA/
---

# TS CSS 相关问题

## TS

如果是一个新建的项目，那么在选择是否需要使用<word text="TypeScript" />的时候，可以选择使用<word text="TypeScript" />，这样项目就能支持<word text="TypeScript" />。

而如果之前已经创建了一个使用<word text="JavaScript" />的项目，那么就需要在项目中 `pnpm i typescript` 引入<word text="TypeScript" />，并在根目录新建一个 `tsconfig.json`，`init` 获取网上复制一个即可。

## CSS

官方推荐开发使用变量来减少重复的代码，比如颜色、字体大小等。在根目录下新建一个 `postcss.config.cjs` 文件，内容如下：

```js
module.exports = {
  plugins: [
    require('tailwindcss'),
  ]
}
```

这样就能