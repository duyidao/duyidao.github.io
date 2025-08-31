---
title: 刀刀小站自动导入
titleTemplate: 刀刀小站自动导入
description: Vue3 刀刀小站 自动导入
head:
  - - meta
    - name: description
      content: 刀刀小站自动导入
  - - meta
    - name: keywords
      content: Vue3 刀刀小站 自动导入
pageClass: project-daodao-auto
---

# 自动导入

项目中 `vue` 的方法（如 `ref` 、`onMounted` 等）多个页面组件都需要使用，频繁 `import` 导入任务繁琐单调，重复没必要的事。通过第三方库实现 `vue` 方法与自主封装的函数自动导入可以让开发事半功倍。

知识点指路：[自动导入](/study/handle/摆脱手动依赖引入，自动引入依赖)

## unplugin-auto-import

::: code-group

```shell [下载依赖]
pnpm i unplugin-auto-import
```

```js [vite.config.js]
import AutoImport from 'unplugin-auto-import/vite'
```

```js [自动导入的函数方法]
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        // auto-import内置vue、vue-router、react这些常见基本库的引入规则
        'vue',
        'vue-router',
      ],
    }),
  ],
  // ...
})
```

:::

保存运行后不再需要每个组件手动引入方法了。

## unplugin-vue-components

::: code-group

```shell [下载依赖]
pnpm i unplugin-vue-components
```

```js [vite.config.js]
import AutoImport from 'unplugin-vue-components/vite'
```

```js [自动导入子组件]
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // ...
    }),
    Components({
      dirs: ['./src/components'],
    }),
  ],
  // ...
})
```

:::

保存运行后不再需要手动引入子组件了。
