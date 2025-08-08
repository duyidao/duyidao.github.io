# Vue3 + TS 项目使用 unplugin-vue-router

## 前言

今天新入职了数说公司，接手了第一个项目，一个 Vue3 + TS 的项目，项目里使用了 unplugin-vue-router，之前没有接触过这个插件，所以今天来记录一下。

`unplugin-vue-router` 是一个用于 Vue3 的插件，它允许在 Vue 组件中直接使用路由，而不需要手动导入路由。

## 安装

::: code-group
```bash [npm]
npm install unplugin-vue-router vue-router @vitejs/plugin-vue
```
```bash [yarn]
yarn add unplugin-vue-router vue-router @vitejs/plugin-vue
```
```bash [pnpm]
pnpm install unplugin-vue-router vue-router @vitejs/plugin-vue
```
:::

## 配置

在 `main.ts` 中引入 `unplugin-vue-router`：

```ts
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      VueRouter({
        extensions: ['.vue', '.md'], // 文件扩展名
        dts: 'src/typed-router.d.ts', // 类型声明文件生成路径
      }),
      // 确保 Vue 插件在 VueRouter 之后
      Vue({
        include: [/\.vue$/, /\.md$/],
      }),
      AutoImport({
        imports: [
          'vue',
          VueRouterAutoImports,
          {
            'vue-router/auto': ['createWebHistory', 'createRouter'],
          },
        ],
        dts: 'src/auto-imports.d.ts',
      }),
    ],
  }
})
```

## 结构

接下来，创建一个 `src/pages` 文件夹，根据项目规范生成路由文件，例如：

```
src/pages/
  |-index.vue        → 对应路由 `/`
  |-users/
    |-index.vue     → 对应路由 `/users`
    |-[id].vue      → 动态路由 `/users/:id`
    |-edit-[id].vue  → 动态路由 `/users/edit-:id`
  |-about.vue        → 对应路由 `/about`
```

文件路径会自动转换为路由路径（支持动态参数 `[param]`）。开发者只需维护这些 `.vue` 文件，无需手动编写路由配置。

## 路由类型
首次启动开发服务器或构建 `pnpm dev` 时、文件变动时（动态更新），插件会自动生成路由类型声明文件（如 `src/typed-router.d.ts`），包含完整的路由类型定义，例如：

```ts
declare module 'vue-router/auto-routes' {
  import type { RouteRecordInfo } from 'unplugin-vue-router/types'
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/users/[id]': RouteRecordInfo<'/users/[id]', '/users/:id', { id: string }, { id?: string }>,
  }
}
```

其定义了一个 路由名称到路由信息的映射，每个路由包含：

- 路径（如 `'/'`、`'/ai-report/edit/[id]'`）。

- `RouteRecordInfo`，包含：

  1. 路由名称（用于编程式导航，如 `router.push({ name: '/ai-report/edit/[id]' })`）。

  2. 实际路径（可能包含动态参数，如 `:id`）。

  3. 必填参数的类型（如 `{ id: ParamValue<true> }` 表示 `id` 是必填的）。

  4. 可选参数的类型（如 `{ id: ParamValue<false> }` 表示 `id` 是可选的）。

> [!WARNING] 警告
> 不要手动修改此文件！它会在文件变动时重新生成。

## 其余类型

前面在 `vite.config.ts` 中配置了 `auto-import` ，项目会生成一个 `src/auto-imports.d.ts` 声明全局类型声明文件，为项目提供 自动导入（`Auto Import`） 和 全局类型支持，无需手动导入 `Vue Router` ，直接在代码中使用它们而不会触发 <SPW text="TypeScript" /> 报错。

与前面的路由类型一样，生成的时机也是在首次启动开发服务器或构建时 `pnpm dev`、代码中新增自动导入的 API 时、依赖变更时，会自动重新生成。

```ts
// 全局声明变量和类型
declare global {
  const createRouter: typeof import('vue-router/auto')['createRouter']
  const createWebHistory: typeof import('vue-router/auto')['createWebHistory']
  const useRoute: typeof import('vue-router/auto')['useRoute']
  const useRouter: typeof import('vue-router/auto')['useRouter']
}
// 类型再导出（Type Re-export）
declare global {
  // @ts-ignore
  export type { Component, ComponentPublicInstance, ComputedRef, ExtractDefaultPropTypes, ExtractPropTypes, ExtractPublicPropTypes, InjectionKey, PropType, Ref, VNode, WritableComputedRef } from 'vue'
  import('vue')
}
// 为 Vue 模板提供类型支持
import { UnwrapRef } from 'vue'
declare module 'vue' {
  interface GlobalComponents {}
  interface ComponentCustomProperties {
    readonly createRouter: UnwrapRef<typeof import('vue-router/auto')['createRouter']>
    readonly createWebHistory: UnwrapRef<typeof import('vue-router/auto')['createWebHistory']>
    readonly useRoute: UnwrapRef<typeof import('vue-router/auto')['useRoute']>
    readonly useRouter: UnwrapRef<typeof import('vue-router/auto')['useRouter']>
  }
}
```

1. 全局声明变量和类型
    
    - 作用：声明全局可用的变量（如 `ref`, `computed`, `useRouter`），让它们在所有文件中直接可用，无需手动导入。
    - 原理：通过 `typeof import('module')['name']` 动态获取类型，确保类型安全。
    - 示例：
      ```ts
      // 无需手动导入，直接使用
      const count = ref(0) // 自动识别为来自 'vue'
      const router = useRouter() // 自动识别为来自 'vue-router'
      ```
2. 类型再导出（Type Re-export）
   - 作用：将常用类型（如 `Ref<T>`, `ComputedRef<T>`）全局导出，方便直接使用。
   - 示例：
      ```ts
      // 无需手动导入类型
      const count: Ref<number> = ref(0)
      ```
3. 为 <SPW text="Vue" /> 模板提供类型支持
    - 作用：让 <SPW text="Vue" /> 单文件组件（`SFC`）的模板也能识别这些全局变量。
    - 示例：
      ```vue
      <template>
        <button @click="count++">{{ count }}</button>
        <!-- 直接使用 ref，无需导入 -->
      </template>
      <script setup>
      const count = ref(0) // 自动识别
      </script>
      ```

优点
1. 提升开发速度：少写大量 `import` 语句。

2. 减少依赖耦合：如果需要替换库（如从 <SPW text="VueUse" /> 切换到 <SPW text="Lodash" />），只需修改声明文件。

3. 类型安全：即使不显式导入，也能享受 <SPW text="TypeScript" /> 提示。