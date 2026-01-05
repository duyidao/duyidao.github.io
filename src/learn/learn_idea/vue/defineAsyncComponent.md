---
title: Vue 异步组件实现原理
author:
  - 远方os vue异步组件实现原理&https://www.bilibili.com/video/BV12N8qzzE9R
---

# Vue 异步组件实现原理

## 前言

在<word text="Vue"/>中，提供了一个 `defineAsyncComponent` 方法，用于定义异步组件，其作用是按需加载组件，从而减少初始加载时间，提高性能。

使用方法为，传入一个函数，返回一个 `new Promise`，在 `Promise` 中返回组件对象，即可实现异步加载。

```vue
<script setup>
import { defineAsyncComponent, h } from 'vue'
const AsyncComponent = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    const comp = {
      setup() {
        // setup 返回的这个函数就是render函数
        // render 函数返回的就是 vNode
        return () => h('div', '异步组件')
      }
    }
    setTimeout(() => {
      resolve(comp)
    }, 2000)
  })
})
</script>
```

这个功能是怎么实现的呢？

## 初步实现

### 占位符渲染

先来实现一个简单的功能，调用自己写的 `defineAsyncComponent`，不考虑传参，返回一个占用符并能成功渲染在页面上。

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { defineAsyncComponent } from './index'

const AsyncComponent = defineAsyncComponent()
</script>

<template>
  <AsyncComponent />
</template>

<style scoped>

</style>
```

```ts [defineAsyncComponent.ts]
import { h, shallowRef } from 'vue'

export const defineAsyncComponent = () => {
  return {
    setup() {
      // 这是一个函数式组件
      const component = shallowRef(() => h('div', '占位符'))
      return () => {
        return h(component.value)
      }
    }
  }
}
```

:::

### 异步函数加载

接下来接收一个参数，类型为函数，返回一个 `Promise`，在 `Promise` 中返回组件对象。

在 `defineAsyncComponent` 中调用该函数，函数执行完毕，也就是 `.then` 方法中，将返回的组件对象赋值给 `component.value`，从而实现异步加载。

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { h } from 'vue' // [!code ++]
import { defineAsyncComponent } from './index'
 // [!code ++]
const AsyncComponent = defineAsyncComponent(() => {
  const comp = () => h('div', 'hello world') // [!code ++]
  return new Promise((resolve) => { // [!code ++]
   // [!code ++]
    setTimeout(() => {
      resolve(comp) // [!code ++]
    }, 2000) // [!code ++]
  }) // [!code ++]
})
</script>

<template>
  <AsyncComponent />
</template>

<style scoped>

</style>
```

```ts [defineAsyncComponent.ts]
import { h, shallowRef } from 'vue'

export const defineAsyncComponent = (loader) => {
  return {
    setup() {
      // 这是一个函数式组件
      const component = shallowRef(() => h('div', ''))
      // 执行回调函数，获取组件 // [!code ++]
       // [!code ++]
      loader().then((res) => {
        component.value = res // [!code ++]
      }) // [!code ++]
      return () => {
        return h(component.value)
      }
    }
  }
}
```

:::

再把占位符文本删掉，刷新查看效果，能看到页面一开始为空，2s 后出现 `hello world`。

## 需求增加

### 传参适配

下面进一步增加需求，不单单能传递一个函数，还能传递一个对象，对象包含两个属性：

- `loader`：即一开始的函数，返回一个 `Promise`，在 `Promise` 中返回组件对象。
- `loadingComponent`：加载中的组件，用于在异步组件加载过程中渲染。

那么在 `defineAsyncComponent` 中，需要判断传入的参数类型，如果是函数，则把传参修改为对象，原本的回调函数赋值给对象的 `loader` 属性；如果是对象，则直接调用。

后续的使用过程中，只需要把 `loader` 和 `loadingComponent` 解构出来使用即可，无需考虑传参类型，代码无需改动。

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { h } from 'vue'
import { defineAsyncComponent } from './index'

// [!code focus]
const AsyncComponent = defineAsyncComponent({
  // [!code focus]
  loader: () => {
    const comp = () => h('div', 'hello world') // [!code focus]
    // [!code focus]
    return new Promise((resolve) => {
      // [!code focus]
      setTimeout(() => {
        resolve(comp) // [!code focus]
      }, 2000) // [!code focus]
    }) // [!code focus]
  }, // [!code focus]
  loadingComponent: () => h('div', 'loading...'), // [!code focus]
}) // [!code focus]
</script>

<template>
  <AsyncComponent />
</template>

<style scoped>

</style>
```

```ts [defineAsyncComponent.ts]
import { h, shallowRef } from 'vue'

// [!code focus]
export const defineAsyncComponent = (options) => {
  // 不再考虑options的类型做不同的使用，如果它是函数，那么就转换为一个对象 // [!code focus]
  // [!code focus]
  if (typeof options === 'function') {
    options = { loader: options } // [!code focus]
  } // [!code focus]
  const defineComponent = () => h('div', '') // 默认占位组件 // [!code focus]

  const { loader, loadingComponent = defineComponent } = options // [!code focus]

  return {
    setup() {
      // 这是一个函数式组件
      const component = shallowRef(loadingComponent) // [!code focus]
      // 执行回调函数，获取组件
      loader().then((res) => {
        component.value = res
      })
      return () => {
        return h(component.value)
      }
    }
  }
}
```

:::

还能自定义一个默认的占位符组件，用户没传 `loadingComponent` 时，渲染默认的占位符组件。

### 错误处理

目前只考虑到组件加载成功的情况，如果加载失败，页面就一直处于 `loadingComponent` 的状态。因此需要处理一下加载失败的情况。

解决方法为传参的对象中再添加一个属性 `errorComponent`，用于处理加载失败的情况。在 `defineAsyncComponent` 中，如果加载失败，则把 `errorComponent` 赋值给 `component.value`。

和 `loadingComponent` 一样，如果没有传 `errorComponent`，则渲染默认的占位符组件。

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { h } from 'vue'
import { defineAsyncComponent } from './index'

const AsyncComponent = defineAsyncComponent({
  loader: () => {
    const comp = () => h('div', 'hello world')
    // [!code focus]
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(comp) // [!code focus]
      }, 2000)
    })
  },
  loadingComponent: () => h('div', 'loading...'),
  errorComponent: () => h('div', 'load error, please retry'), // [!code focus]
})
</script>

<template>
  <AsyncComponent />
</template>

<style scoped>

</style>
```

```ts [defineAsyncComponent.ts]
import { h, shallowRef } from 'vue'

export const defineAsyncComponent = (options) => {
  // 不再考虑options的类型做不同的使用，如果它是函数，那么就转换为一个对象
  if (typeof options === 'function') {
    options = { loader: options }
  }
  const defineComponent = () => h('div', '') // 默认占位组件

  const { loader, loadingComponent = defineComponent, errorComponent = defineComponent } = options // [!code focus]

  return {
    setup() {
      // 这是一个函数式组件
      const component = shallowRef(loadingComponent)
      // 执行回调函数，获取组件
      loader()
        .then((res) => {
          component.value = res
        })
         // [!code focus]
        .catch(() => {
          component.value = errorComponent // [!code focus]
        }) // [!code focus]
      return () => {
        return h(component.value)
      }
    }
  }
}
```

:::

### 超时处理

如果组件加载时间过长，比如 10s，那么页面就会一直处于 `loadingComponent` 的状态。因此需要处理一下超时的情况。

解决方法为传参的对象中再添加一个属性 `timeout`，用于处理加载超时的情况。在 `defineAsyncComponent` 中，如果加载超时，则把 `errorComponent` 赋值给 `component.value`。

但是直接在外部写一个 `setTimeout` 是不行的，假设超时时间设置为 3s，而 `new Promise` 在 4s 执行成功，那么就无法因为超时而修改 `new Promise` 的状态，导致组件从 `errorComponent` 变为 `loader`。

那么，该怎么实现呢？

回顾目前写的代码，`defineAsyncComponent` 无外乎就做了一件事情，根据不同的状态渲染不同的组件。`pending` 状态下，渲染 `loadingComponent`；`fulfilled` 状态下，渲染 `loader` 返回的组件；`rejected` 状态下，渲染 `errorComponent`。

因此，我们可不可以自己写一个函数，返回一个 `new Promise` 呢？这个 `new Promise` 在 `loader` 执行成功后修改为 `fulfilled` 状态，在 `loader` 执行失败后修改为 `rejected` 状态。这样就能在超时后手动修改为 `rejected` 状态。

```ts
import { h, shallowRef } from 'vue'

export const defineAsyncComponent = (options) => {
  // 不再考虑options的类型做不同的使用，如果它是函数，那么就转换为一个对象
  if (typeof options === 'function') {
    options = { loader: options }
  }
  const defineComponent = () => h('div', '') // 默认占位组件

  const { loader, loadingComponent = defineComponent, errorComponent = defineComponent, timeout = 1000 } = options

  // 再写一个函数，返回一个new Promise。这样就能手动修改new Promise的状态 // [!code focus]
   // [!code focus]
  const loaderComponent = () => {
     // [!code focus]
    return new Promise((resolve, reject) => {
       // [!code focus]
      setTimeout(() => {
        reject('加载超时') // [!code focus]
      }, timeout) // [!code focus]
      loader().then(resolve, reject) // [!code focus]
    }) // [!code focus]
  } // [!code focus]

  return {
    setup() {
      // 这是一个函数式组件
      const component = shallowRef(loadingComponent)
      // 执行回调函数，获取组件
      loaderComponent() // [!code focus]
        .then((res) => {
          component.value = res
        })
        .catch(() => {
          component.value = errorComponent
        })
      return () => {
        return h(component.value)
      }
    }
  }
}
```

### import、props 与 slot

一般情况下，用户不会写一个函数作为 `loader`，而是会写一个 `import` 语句，引入自己写好的组件。因此，需要支持 `import` 语句，不然会报错。

那么，要怎么判断用户传的是不是一个 `import` 语句呢？

![import导入的打印](https://pic1.imgdb.cn/item/695b66eaa728265c64c381ff.png)

打印一下，发现它有一个 `Symbol.toStringTag` 属性，值为 `Module`。因此，可以通过判断 `Symbol.toStringTag` 是否为 `Module` 来判断用户传的是不是一个 `import` 语句。

如果是一个 `import` 语句，那么它的 `default` 才是我们需要的组件。

`h` 函数还能接收两个参数，第二个参数是 `props`，第三个参数是 `slots`。而这两个都可以在 `setup` 函数的第二个函数中获取到。

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { h } from 'vue'
import { defineAsyncComponent } from './index'

const AsyncComponent = defineAsyncComponent({
  loader: () => import('./test.vue'), // [!code focus]
  loadingComponent: () => h('div', 'loading...'),
  errorComponent: () => h('div', 'load error, please retry'),
})
</script>

<template>
  <!-- [!code focus] -->
  <AsyncComponent msg="父组件传递的信息">
     <!-- [!code focus] -->
    <div>父组件传递的插槽</div>
  <!-- [!code focus] -->
  </AsyncComponent>
</template>

<style scoped>

</style>
```

```ts [defineAsyncComponent.ts]
import { h, shallowRef } from 'vue'

export const defineAsyncComponent = (options) => {
  // 不再考虑options的类型做不同的使用，如果它是函数，那么就转换为一个对象
  if (typeof options === 'function') {
    options = { loader: options }
  }
  const defineComponent = () => h('div', '') // 默认占位组件

  const { loader, loadingComponent = defineComponent, errorComponent = defineComponent, timeout = 5000 } = options

  // 再写一个函数，返回一个new Promise。这样就能手动修改new Promise的状态
  const loaderComponent = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('加载超时')
      }, timeout)
      loader().then(resolve, reject)
    })
  }

  return {
    // 获取到 slots 和 attrs参数 // [!code focus]
    // [!code focus]
    setup(_, { slots, attrs }) {
      // 这是一个函数式组件
      const component = shallowRef(loadingComponent)
      // 执行回调函数，获取组件
      loaderComponent()
        .then((res) => {
          if (res && res[Symbol.toStringTag] === 'Module') {
            component.value = res.default
          }
          else {
            component.value = res
          }
        })
        .catch((err) => {
          component.value = errorComponent
        })
      return () => {
        return h(component.value, attrs, slots) // [!code focus]
      }
    }
  }
}
```

```vue [test.vue]
<script setup lang="ts">
interface Props {
  msg?: string;
}

withDefaults(defineProps<Props>(), {
  msg: 'Hello World'
})
</script>

<template>
  <div>
    <h1>Child component: Test</h1>
    <p>{{ msg }}</p>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>
```

:::

## 动手实操

<myIframe url="https://example.duyidao.cn/vue/defineAsyncComponent" />