# useTemplateRef 实现原理

`useTemplateRef` 是<word text="Vue 3.5" />新增的 API，用于获取模板中的 DOM 元素或组件实例。

在 3.5 之前，获取模板中的<word text="DOM" />元素或组件实例通过 `ref` 属性和 `ref` 方法实现。但这种方式需要在模板中添加额外的 `ref` 属性，且要求二者名字一致。

```vue
<script setup>
import { ref } from 'vue'
const elRef = ref(null)
</script>

<template>
  <div ref="elRef">Hello World</div>
</template>
```

`useTemplateRef` 避免了这个问题，允许模板中使用任意名字的 `ref` 属性，在组件中通过 `useTemplateRef` 函数获取对应的<word text="DOM" />元素或组件实例。

```vue
<script setup>
import { useTemplateRef } from 'vue'
const containerRef = useTemplateRef('elRef')
</script>

<template>
  <div ref="elRef">Hello World</div>
</template>
```

用法类似 `document.querySelector`。

![ref和useTemplateRef](https://pic1.imgdb.cn/item/6948b221a7234ce61d8e892e.png)

## 实现

### 思路

搭建一个空函数，接收字符串 `key`，返回 `ref` 对象。

```js
export function useTemplateRef(key) {
  const container = shallowRef()

  return container
}
```

如何获取 `key` 对应的 `ref` 对象？

在<word text="Vue2" />中，获取 `ref` 组件实例通过 `this.$refs.xx`。<word text="Vue3" />没有 `this`，但可以通过 `getCurrentInstance()` 获取当前组件实例。

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

用 `Object.defineProperty` 劫持 `vm` 的 `refs` 对象，当访问 `refs` 时返回自定义的 `ref` 对象。

```js
export function useTemplateRef(key) {
  const container = shallowRef()

  const vm = getCurrentInstance() // [!code ++]
  // [!code ++]
  Object.defineProperty(vm.refs, key, {
    get() {}, // [!code ++]
    set(value) {
      // [!code ++]
      console.log('vm set =>', value) // [!code ++]
    }, // [!code ++]
  }) // [!code ++]

  return container
}
```

### 报错

控制台报错：

![报错截图](https://pic1.imgdb.cn/item/6948b53ea7234ce61d8ea6d9.png)

提示 `refs` 属性无法被拓展。查看<word text="Vue3" />源码，`refs` 属性被 `Object.freeze` 冻结了。

原因：性能考虑。一个项目中，10 个组件可能只有 5、6 个需要绑定 `ref` 获取实例，但如果每个组件实例 `vm` 都绑定一个 `refs` 对象，即使只是空对象，项目变大后性能开销也会很大。

<word text="Vue" />团队的处理方式：先创建一个冻结对象 `Object.freeze({})`，新建组件实例时都使用这个默认冻结对象。如果组件内需要声明 `ref` 获取组件实例，再替换成对应的 `ref` 对象。

### 源码借鉴

[useTemplateRef](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/helpers/useTemplateRef.ts) 的官方源码，关键部分：

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
        set: (val) => (r.value = val),
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

仿照源码，获取 `vm` 实例后手动把 `vm.refs` 替换为新对象，即可拓展 `vm.refs`。（这里不用源码的判断，因为框架底层没有导出 `EMPTY_OBJ` 对象）

在 `set` 中把值赋值给 `shallowRef` 对象；在 `get` 中返回 `shallowRef` 对象。这样访问 `vm.refs[key]` 时，返回的就是自定义的 `ref` 对象。

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
    },
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

使用两个 `useTemplateRef` 函数，观察结果。

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
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

<style scoped></style>
```

![使用两个 useTemplateRef 结果](https://pic1.imgdb.cn/item/6948c131dd2050f8d341ff30.png)

可以看到，前一个 `useTemplateRef` 声明的变量变成了 `undefined`。因为每次调用 `useTemplateRef` 都会把 `vm.refs` 赋值为空对象，前一个 `useTemplateRef` 声明的 `ref` 对象被覆盖了。

解决这个 Bug：在函数外部声明一个 `WeakMap`，每次调用 `useTemplateRef` 时先判断 `WeakMap` 中是否存在 `vm` 实例。存在则直接复用；不存在则存入 `WeakMap` 并继续后续操作。

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
    },
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
    },
  })

  return container
}
```

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
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

<style scoped></style>
```

:::

## 动手实操

<myIframe url="https://example.duyidao.cn/vue/useTemplateRef" />
