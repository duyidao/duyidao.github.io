## vue-router4

### 基本使用

1. 安装

   ```sh
   yarn add vue-router
   ```

2. 配置路由

3. 在 `main.js` 中引入

   ```js
   js复制代码import { createApp } from 'vue'
   import App from './App.vue'

   import router from "./router";

   const app = createApp(App)
   app.use(router)
   app.mount('#app')
   ```

4. 使用

   ```vue
   <script setup>
   import { useRoute } from 'vue-router'
   const route = useRoute()

   console.log(route)
   console.log(route.path)
   console.log(route.fullPath)
   console.log(route.query)
   </script>

   <template>
     <div>登录页面</div>
   </template>
   ```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b58da09773e2465c96f4e4d6895a3953~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## Pinia

### 基本介绍

> Pinia 是 Vue.js 的轻量级状态管理库

官方网站：[pinia.vuejs.org/](https://link.juejin.cn?target=https%3A%2F%2Fpinia.vuejs.org%2F)

为什么学习 pinia?

- pinia 和 vuex4 一样，也是<word text="Vue" />官方的状态管理工具（作者是<word text="Vue" />核心团队成员）
- pinia 相比 vuex4，对于 vue3 的兼容性更好
- pinia 相比 vuex4，具备完善的类型推荐
- pinia 同样支持<word text="Vue" />开发者工具,最新的开发者工具对 vuex4 支持不好
- **Pinia** 的 API 设计非常接近 `Vuex 5` 的[提案](https://link.juejin.cn?target=https%3A%2F%2Flink.segmentfault.com%2F%3Fenc%3Dbzgtx6D37f7ZjuOSGfXM2g%3D%3D.Anbb%2BsTaBijhbf0botKHz0NRal7UrociDtXE3qxoLjZTZb9eHUphdj1aeU96KLV8IczFvQ74HSuMxmKZ6I3R5acIrZrKY8I4FBi6G%2Bufe10A%2FkNDziBeRY8hkZ1bnN8x)。

pinia 核心概念

- state: 状态
- actions: 修改状态（包括同步和异步，pinia 中没有 mutations）
- getters: 计算属性

### 基本使用与 state

> 目标：掌握 pinia 的使用步骤

#### 安装

```sh
yarn add pinia
# or
npm i pinia
```

#### 在 main.js 中挂载 pinia

```javascript
import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
```

#### 新建文件 store/counter.js

```javascript
import { defineStore } from 'pinia'
// 创建store,命名规则： useXxxxStore
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
    }
  },
  getters: {},
  actions: {},
})

export default useCounterStore
```

#### 在组件中使用

```vue
<script setup>
import useCounterStore from './store/counter'

const counter = useCounterStore()
</script>

<template>
  <h1>根组件---{{ counter.count }}</h1>
</template>

<style></style>
```

### actions 的使用

> 目标：掌握 pinia 中 actions 的使用

在 pinia 中没有 mutations，只有 actions，不管是同步还是异步的代码，都可以在 actions 中完成。

#### 在 actions 中提供方法并且修改数据

```javascript
import { defineStore } from 'pinia'
// 1. 创建store
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
    }
  },
  actions: {
    increment() {
      this.count++
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    },
  },
})

export default useCounterStore
```

#### 在组件中使用

```vue
<script setup>
import useCounterStore from './store/counter'

const counter = useCounterStore()
</script>

<template>
  <h1>根组件---{{ counter.count }}</h1>
  <button @click="counter.increment">加1</button>
  <button @click="counter.incrementAsync">异步加1</button>
</template>
```

### getters 的使用

> pinia 中的 getters 和 vuex 中的基本是一样的，也带有缓存的功能

#### 在 getters 中提供计算属性

```javascript
import { defineStore } from 'pinia'
// 1. 创建store
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
    }
  },
  getters: {
    double() {
      return this.count * 2
    },
  },
  actions: {
    increment() {
      this.count++
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    },
  },
})

export default useCounterStore
```

#### 在组件中使用

```vue
<h1>根组件---{{ counter.count }}</h1>
<h3>{{ counter.double }}</h3>
```

### pinia 模块化

> 在复杂项目中，不可能吧多个模块的数据都定义到一个 store 中，一般来说会一个模块对应一个 store，最后通过一个根 store 进行整合

#### 新建 store/user.js 文件

```javascript
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      name: 'zs',
      age: 100,
    }
  },
})

export default useUserStore
```

#### 新建 store/index.js

```javascript
import useUserStore from './user'
import useCounterStore from './counter'

// 统一导出useStore方法
export default function useStore() {
  return {
    user: useUserStore(),
    counter: useCounterStore(),
  }
}
```

#### 在组件中使用

```vue
<script setup>
import { storeToRefs } from 'pinia'
import useStore from './store'
const { counter } = useStore()

// 使用storeToRefs可以保证解构出来的数据也是响应式的
const { count, double } = storeToRefs(counter)
</script>
```

### 组合式 API 风格

![p9I9uPx.md.png](https://s1.ax1x.com/2023/05/21/p9I9uPx.md.png)

### storeToRefs 的使用

如果直接从 pinia 中解构数据，会丢失响应式， 使用 storeToRefs 可以保证解构出来的数据也是响应式的。

```vue
<script setup>
import { storeToRefs } from 'pinia'
import useCounterStore from './store/counter'

const counter = useCounterStore()
// 如果直接从pinia中解构数据，会丢失响应式
const { count, double } = counter

// 使用storeToRefs可以保证解构出来的数据也是响应式的
const { count, double } = storeToRefs(counter)
</script>
```

> [!WARNING] 注意
>
> state 和 getter 内的变量才需要通过 `storeToRefs` 中响应式结构，action 内的方法直接解构获取即可。
