---
title: useTemplateRef 实现原理
author:
  - 远方os useTemplateRef 实现原理&https://www.bilibili.com/video/BV16mJHzbEB8
---

# useTemplateRef 实现原理

## 前言

`useTemplateRef` 是<word text="Vue 3.5" />新出的一个 API，用于获取模板中的 DOM 元素或组件实例。

在 3.5 之前，组件获取模板中的<word text="DOM" />元素或组件实例，通常是通过 `ref` 属性和 `ref` 方法来实现的。但是，这种方式需要在模板中添加额外的 `ref` 属性，而且要求二者的名字一样。

```vue
<script setup>
import { ref } from 'vue'
const elRef = ref(null)
</script>

<template>
  <div ref="elRef">Hello World</div>
</template>
```

而 `useTemplateRef` 则可以避免这个问题，它允许我们在模板中使用任意名字的 `ref` 属性，然后在组件中通过 `useTemplateRef` 函数来获取对应的<word text="DOM" />元素或组件实例。

```vue
<script setup>
import { useTemplateRef } from 'vue'
const containerRef = useTemplateRef('elRef')
</script>

<template>
  <div ref="elRef">Hello World</div>
</template>
```

这样就很符合使用直觉，就像 `document.querySelector` 一样。

![ref和useTemplateRef](https://pic1.imgdb.cn/item/6948b221a7234ce61d8e892e.png)

## 实现

### 思路

那么，自己如何实现一个类似的功能方法呢？

首先先搭建一个空的方法函数，接收一个字符串 `key`，返回一个 `ref` 对象。

```js
export function useTemplateRef(key) {
  const container = shallowRef()

  return container
}
```

那么，该如何获取到 `key` 对应的 `ref` 对象呢？

在<word text="Vue2" />中，想要获取到 `ref` 组件实例，是通过 `this.$refs.xx` 来获取的。虽然<word text="Vue3" />没有 `this`，但是可以通过 `getCurrentInstance()` 来获取当前组件实例。

```vue
<script setup>
import { getCurrentInstance } from 'vue'
// const elRef = ref(null) 注意，这里不能声明 ref，否则 vm 的 refs 对象不会再有 elRef
const vm = getCurrentInstance()

console.log(vm)
</script>

<template>
  <div ref="elRef">Hello World</div>
</template>
```

![vm数据截图](https://pic1.imgdb.cn/item/6948b2f1a7234ce61d8e912e.png)

既然如此，何不尝试用 `Object.defineProperty` 来劫持 `vm` 的 `refs` 对象，当访问 `refs` 对象时，返回我们自定义的 `ref` 对象呢？

```js
export function useTemplateRef(key) {
  const container = shallowRef()

  const vm = getCurrentInstance() // [!code ++]
  // [!code ++]
  Object.defineProperty(vm.refs, key, {
    get() {},// [!code ++]
    set(value) {// [!code ++]
      console.log('vm set =>', value) // [!code ++]
    } // [!code ++]
  }) // [!code ++]

  return container
}
```

### 报错

查看控制台，发现报错了！

![报错截图](https://pic1.imgdb.cn/item/6948b53ea7234ce61d8ea6d9.png)

错误提示该对象的 `refs` 属性没办法被拓展。查看<word text="Vue3" />的源码，发现 `refs` 属性是被 `Object.freeze` 冻结了，所以无法被拓展。

为什么要这么做呢？

这一切都是出于节约性能考虑的。一个项目中，10 个组件可能就 5、6 个需要用到组件绑定 `ref` 获取实例，但是如果每一个组件实例 `vm` 都绑定一个 `refs` 对象，即使它只是一个空对象，当项目变大时，性能开销也会很大。

因此，<word text="Vue" />团队想了一个方法，他们先创建一个冻结对象 `Object.freeze({})`，每当新建一个组件实例时，都是使用这个默认冻结对象。如果组件内需要声明 `ref` 获取组件实例，再替换成对应的 `ref` 对象。这样极大的提高了性能。

### 源码借鉴

来看看 [useTemplateRef](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/helpers/useTemplateRef.ts) 的官方源码，挑几处重点代码讲讲。

```ts
export function useTemplateRef<T = unknown, Keys extends string = string>(
  key: Keys,
): TemplateRef<T> {
  const i = getCurrentInstance() // 获取当前组件实例 // [!code focus]
  const r = shallowRef(null)
  if (i) {
    const refs = i.refs === EMPTY_OBJ ? (i.refs = {}) : i.refs // 如果当前的组件实例是默认的冻结对象，则声明一个新的对象代替；否则继续复用 // [!code focus]
    let desc: PropertyDescriptor | undefined
    if (
      __DEV__ &&
      (desc = Object.getOwnPropertyDescriptor(refs, key)) &&
      !desc.configurable
    ) {
      warn(`useTemplateRef('${key}') already exists.`)
    } else {
      Object.defineProperty(refs, key, {
        enumerable: true,
        get: () => r.value,
        set: val => (r.value = val),
      })
    }
  } else if (__DEV__) {
    warn(
      `useTemplateRef() is called when there is no active component ` +
        `instance to be associated with.`,
    )
  }
  const ret = __DEV__ ? readonly(r) : r
  if (__DEV__) {
    knownTemplateRefs.add(ret)
  }
  return ret
}
```

### 解决方案

仿照源码的写法，在获取到 `vm` 实例时，手动把 `vm.refs` 对象替换成一个新的对象，这样就可以拓展 `vm.refs` 对象了。（这里不用源码的判断是因为框架底层并没有导出 `EMPTY_OBJ` 对象）

在 `set` 方法中，把值赋值给 `shallowRef` 对象；在 `get` 方法中，返回 `shallowRef` 对象。这样，当访问 `vm.refs[key]` 时，返回的就是我们自定义的 `ref` 对象了。

::: code-group
```js
export function useTemplateRef(key) {
  const container = shallowRef()

  const vm = getCurrentInstance()
  vm.refs = {} // 转为普通的空对象 // [!code ++]
  Object.defineProperty(vm.refs, key, {
    get() {
      return container.value // 返回自定义的 ref 对象 // [!code ++]
    },
    set(value) {
      container.value = value // 把值赋值给 shallowRef 响应式变量 // [!code ++]
    }
  })

  return container
}
```
```vue
<script setup>
import { useTemplateRef } from './hook'

const containerRef = useTemplateRef('elRef')

onMounted(() => {
  console.log(containerRef.value)
})
</script>

<template>
  <div ref="elRef">Hello World</div>
</template>
```
:::

### 优化与 Bug 解决

目前还未完全结束，修改一下代码，使用两个 `useTemplateRef` 函数，看看会发生什么？

```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { useTemplateRef } from './hook'

const containerRef = useTemplateRef('elRef')
const containerRef1 = useTemplateRef('aRef')
onMounted(() => {
  console.log(containerRef.value)
  console.log(containerRef1.value)
})
</script>

<template>
  <div ref="elRef">{{ containerRef }}</div>
  <p ref="aRef">{{ containerRef1 }}</p>
</template>

<style scoped>

</style>
```

![使用两个 useTemplateRef 结果](https://pic1.imgdb.cn/item/6948c131dd2050f8d341ff30.png)

可以看到，前一个 `useTemplateRef` 声明的变量变成了 `undefined`。这是因为在代码中，每一次调用 `useTemplateRef` 函数，都会把 `vm.refs` 赋值为空对象，因此，前一个 `useTemplateRef` 函数声明的 `ref` 对象被覆盖了。

想要解决这个 Bug，需要绕一下，在函数外部声明一个 `WeakMap`，每次调用 `useTemplateRef` 函数时，先判断一下 `WeakMap` 中是否存在 `vm` 实例，如果存在，说明之前已经有内容了，直接复用；如果不存在，则把 `vm` 实例存入 `WeakMap` 中，再进行后续操作。

```js
const vmMap = new WeakMap() // [!code ++]

export function useTemplateRef(key) {
  const container = shallowRef()

  const vm = getCurrentInstance()
  // [!code ++]
  if (!vmMap.has(vm)) {
    vm.refs = {} // 转为普通的空对象
    vmMap.set(vm, vm.refs) // [!code ++]
  } // [!code ++]
  Object.defineProperty(vm.refs, key, {
    get() {
      return container.value // 返回自定义的 ref 对象
    },
    set(value) {
      container.value = value // 把值赋值给 shallowRef 响应式变量
    }
  })

  return container
}
```

## 完整代码

::: code-group
```js [hook.js]
import { shallowRef, getCurrentInstance } from 'vue'

const wmMap = new WeakMap()

export function useTemplateRef(key) {
  const container = shallowRef()

  const vm = getCurrentInstance()
  // 判断是否有vm，有的话就不重新赋值，避免覆盖旧值
  if (!wmMap.has(vm)) {
    vm.refs = {}
    wmMap.set(vm, {})
  }
  Object.defineProperty(vm.refs, key, {
    get() {
      return container.value
    },
    set(value) {
      container.value = value
    }
  })

  return container
}
```
```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { useTemplateRef } from './hook'

const containerRef = useTemplateRef('elRef')
const containerRef1 = useTemplateRef('aRef')
onMounted(() => {
  console.log(containerRef.value)
  console.log(containerRef1.value)
})
</script>

<template>
  <div ref="elRef">{{ containerRef }}</div>
  <p ref="aRef">{{ containerRef1 }}</p>
</template>

<style scoped>

</style>
```
:::
