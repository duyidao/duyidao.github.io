# Vue 异步组件实现原理

在<word text="Vue" />中，`defineAsyncComponent` 方法用于定义异步组件，实现按需加载，减少初始加载时间，提高性能。

传入一个返回 `Promise` 的函数，`Promise` 中返回组件对象即可异步加载。

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
      },
    }
    setTimeout(() => {
      resolve(comp)
    }, 2000)
  })
})
</script>
```

## 初步实现

### 占位符渲染

实现一个简单的 `defineAsyncComponent`，不考虑传参，返回占位符并渲染在页面上。

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { defineAsyncComponent } from './index'

const AsyncComponent = defineAsyncComponent()
</script>

<template>
  <AsyncComponent />
</template>

<style scoped></style>
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
    },
  }
}
```

:::

### 异步函数加载

接收一个参数，类型为函数，返回 `Promise`，`Promise` 中返回组件对象。

在 `defineAsyncComponent` 中调用该函数，函数执行完毕后在 `.then` 中将返回的组件对象赋值给 `component.value`，实现异步加载。

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { h } from 'vue' // [!code ++]
import { defineAsyncComponent } from './index'
// [!code ++]
const AsyncComponent = defineAsyncComponent(() => {
  const comp = () => h('div', 'hello world') // [!code ++]
  return new Promise((resolve) => {
    // [!code ++]
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

<style scoped></style>
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
    },
  }
}
```

:::

去掉占位符文本，刷新查看效果：页面一开始为空，2s 后出现 `hello world`。

## 需求增加

### 传参适配

增加需求：不仅能传递函数，还能传递对象，对象包含两个属性：

- `loader`：返回 `Promise` 的函数，`Promise` 中返回组件对象。
- `loadingComponent`：加载中组件，异步加载过程中渲染。

在 `defineAsyncComponent` 中判断参数类型：如果是函数，转换为对象，将回调函数赋值给 `loader` 属性；如果是对象，直接使用。

后续使用只需解构 `loader` 和 `loadingComponent`，无需关心传参类型。

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

<style scoped></style>
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
    },
  }
}
```

:::

还能自定义默认占位符组件，用户未传 `loadingComponent` 时渲染默认占位符。

### 错误处理

当前只处理了加载成功的情况。如果加载失败，页面一直停留在 `loadingComponent` 状态。需要处理加载失败。

传参对象中新增 `errorComponent` 属性，用于加载失败。`defineAsyncComponent` 中加载失败时将 `errorComponent` 赋值给 `component.value`。

和 `loadingComponent` 一样，未传 `errorComponent` 时渲染默认占位符。

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

<style scoped></style>
```

```ts [defineAsyncComponent.ts]
import { h, shallowRef } from 'vue'

export const defineAsyncComponent = (options) => {
  // 不再考虑options的类型做不同的使用，如果它是函数，那么就转换为一个对象
  if (typeof options === 'function') {
    options = { loader: options }
  }
  const defineComponent = () => h('div', '') // 默认占位组件

  const {
    loader,
    loadingComponent = defineComponent,
    errorComponent = defineComponent,
  } = options // [!code focus]

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
    },
  }
}
```

:::

### 超时处理

组件加载时间过长（如 10s），页面一直停留在 `loadingComponent` 状态。需要处理超时。

传参对象中新增 `timeout` 属性。在 `defineAsyncComponent` 中加载超时后将 `errorComponent` 赋值给 `component.value`。

直接在外部写 `setTimeout` 不可行。假设超时 3s，`Promise` 在 4s 执行成功，则无法因超时修改 `Promise` 状态，导致组件从 `errorComponent` 变为 `loader`。

回顾当前代码，`defineAsyncComponent` 本质是根据不同状态渲染不同组件：`pending` → `loadingComponent`；`fulfilled` → `loader` 返回的组件；`rejected` → `errorComponent`。

可以封装一个函数返回 `Promise`，在 `loader` 执行成功后变为 `fulfilled`，失败后变为 `rejected`。这样就能在超时后手动改为 `rejected`。

```ts
import { h, shallowRef } from 'vue'

export const defineAsyncComponent = (options) => {
  // 不再考虑options的类型做不同的使用，如果它是函数，那么就转换为一个对象
  if (typeof options === 'function') {
    options = { loader: options }
  }
  const defineComponent = () => h('div', '') // 默认占位组件

  const {
    loader,
    loadingComponent = defineComponent,
    errorComponent = defineComponent,
    timeout = 1000,
  } = options

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
    },
  }
}
```

### import、props 与 slot

一般用户不会写函数作为 `loader`，而是写 `import` 语句引入组件。因此需要支持 `import` 语句。

如何判断用户传的是 `import` 语句？

![import导入的打印](https://pic1.imgdb.cn/item/695b66eaa728265c64c381ff.png)

打印发现它有一个 `Symbol.toStringTag` 属性，值为 `Module`。可通过判断 `Symbol.toStringTag` 是否为 `Module` 来判断。

如果是 `import` 语句，它的 `default` 才是需要的组件。

`h` 函数还能接收第二个参数 `props` 和第三个参数 `slots`，两者都可在 `setup` 的第二个参数中获取。

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

<style scoped></style>
```

```ts [defineAsyncComponent.ts]
import { h, shallowRef } from 'vue'

export const defineAsyncComponent = (options) => {
  // 不再考虑options的类型做不同的使用，如果它是函数，那么就转换为一个对象
  if (typeof options === 'function') {
    options = { loader: options }
  }
  const defineComponent = () => h('div', '') // 默认占位组件

  const {
    loader,
    loadingComponent = defineComponent,
    errorComponent = defineComponent,
    timeout = 5000,
  } = options

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
          } else {
            component.value = res
          }
        })
        .catch((err) => {
          component.value = errorComponent
        })
      return () => {
        return h(component.value, attrs, slots) // [!code focus]
      }
    },
  }
}
```

```vue [test.vue]
<script setup lang="ts">
interface Props {
  msg?: string
}

withDefaults(defineProps<Props>(), {
  msg: 'Hello World',
})
</script>

<template>
  <div>
    <h1>Child component: Test</h1>
    <p>{{ msg }}</p>
    <slot></slot>
  </div>
</template>

<style scoped></style>
```

:::

## 动手实操

<myIframe url="https://example.duyidao.cn/vue/defineAsyncComponent" />
