---
title: 第三方插件封装组合式函数
author:
  - 远方os 第三方插件封装组合式函数&https://www.bilibili.com/video/BV168tJzrE66
---

# 第三方插件封装组合式函数

## 前言

在项目中引用了拖拽的第三方插件 `sortable`，拖拽时数据并没有发生变化，还是旧的数据。

```vue
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import Sortable from 'sortablejs'

const list = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' },
  { id: 5, name: '钱七' },
])

const containerRef = useTemplateRef('containerRef')

onMounted(() => {
  Sortable.create(containerRef.value, {
    onStart: (evt) => {
      // 给拖拽的元素添加样式类
      evt.item.classList.add('bg-amber')
    },
    onEnd: (evt) => {
      // 移除拖拽样式类
      evt.item.classList.remove('bg-amber')
    },
    onUpdate: (item) => {
      console.log('item', item);
    },
  })
})
</script>

<template>
  <div class="flex gap-20">
    <ul ref="containerRef" class="flex flex-col gap-10 list-none">
      <li v-for="item in list" :key="item.id" class="flex justify-center items-center w-100 h-40 bg-#7553db text-#fff rounded-5 cursor-pointer">{{ item.name }}</li>
    </ul>

    <div class="w-120">{{ JSON.stringify(list, null, 2) }}</div>
  </div>
</template>

<style scoped>
</style>
```

![效果图](https://pic1.imgdb.cn/item/695f4fd83ff7af7e8754bb49.png)

可以看到，`list` 的数据并没有发生变化，还是旧的数据。

## 数据更新

那么，如何让数据更新呢？

`Sortable` 插件提供了 `onUpdate` 回调函数，当拖拽结束后，会触发该回调函数，来查看一下打印出来的内容是什么。

![打印出来的内容](https://pic1.imgdb.cn/item/695f50b13ff7af7e8754bb64.png)

打印出来是一个对象，其中 `oldIndex` 是拖拽前的索引，`newIndex` 是拖拽后的索引。那么可以通过 `splice` 方法来更新数据。

```js
onMounted(() => {
  Sortable.create(containerRef.value, {
    onStart: (evt) => {
      // 给拖拽的元素添加样式类
      evt.item.classList.add('bg-amber')
    },
    onEnd: (evt) => {
      // 移除拖拽样式类
      evt.item.classList.remove('bg-amber')
    },
    onUpdate: (item) => {
      const { oldIndex, newIndex } = item // [!code ++]
      const oldValue = list.value[oldIndex] // [!code ++]
      list.value.splice(oldIndex, 1) // [!code ++]
      list.value.splice(newIndex, 0, oldValue) // [!code ++]
    },
  })
})
```

现在页面的数据已经更新了。

## 组合式函数封装

但是，每次使用第三方插件的时候，都需要写一遍 `onUpdate` 回调函数，这样太麻烦了，我们可以封装一个组合式函数来解决这个问题。

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import { useSortable } from './useSortable'

const list = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' },
  { id: 5, name: '钱七' },
])

const containerRef = useTemplateRef('containerRef')

useSortable(containerRef, list)
</script>

<template>
  <div class="flex gap-20">
    <ul ref="containerRef" class="flex flex-col gap-10 list-none">
      <li v-for="item in list" :key="item.id" class="flex justify-center items-center w-100 h-40 bg-#7553db text-#fff rounded-5 cursor-pointer">{{ item.name }}</li>
    </ul>

    <div class="w-120">{{ JSON.stringify(list, null, 2) }}</div>
  </div>
</template>

<style scoped>
</style>
```

```ts [useSortable.ts]
import Sortable from 'sortablejs'
import { onMounted, onUnmounted } from 'vue'

export const useSortable = (containerRef: any, list: any[], options?: any) => {
  onMounted(() => {
    const instance = Sortable.create(containerRef.value, {
      onStart: (evt) => {
        // 给拖拽的元素添加样式类
        evt.item.classList.add('bg-amber')
      },
      onEnd: (evt) => {
        // 移除拖拽样式类
        evt.item.classList.remove('bg-amber')
      },
      onUpdate: (item) => {
        const { oldIndex, newIndex } = item
        const oldValue = list.value[oldIndex]
        list.value.splice(oldIndex, 1)
        list.value.splice(newIndex, 0, oldValue)
      },
    })

    // 在组件卸载时销毁 sortable 实例
    onUnmounted(() => {
      instance.destroy()
    })
  })
}
```

:::

现在，我们只需要调用 `useSortable` 函数，就可以实现拖拽功能了，而且数据也会更新。

如果说使用者还有其他的方法和属性，可以在 `options` 中传入，这样就可以实现更灵活的配置。例如传入一个 `animation` 属性，来设置拖拽时的动画效果。

如果使用者还传入自己的 `onUpdate` 回调函数，想要实现自己的额外需求，那么就可以在 `onUpdate` 回调函数中调用使用者的回调函数，然后再实现剩余的功能。

::: code-group

```ts [useSortable.ts]
import Sortable from 'sortablejs'
import { onMounted, onUnmounted } from 'vue'

export const useSortable = (containerRef: any, list: any[], options?: any = {}) => {
  onMounted(() => {
    const instance = Sortable.create(containerRef.value, {
      ...options, // [!code focus]
      onStart: (evt) => {
        // 给拖拽的元素添加样式类
        evt.item.classList.add('bg-amber')
      },
      onEnd: (evt) => {
        // 移除拖拽样式类
        evt.item.classList.remove('bg-amber')
      },
      onUpdate: (item) => {
        options?.onUpdate?.(item) // [!code focus]
        const { oldIndex, newIndex } = item
        const oldValue = list.value[oldIndex]
        list.value.splice(oldIndex, 1)
        list.value.splice(newIndex, 0, oldValue)
      },
    })

    // 在组件卸载时销毁 sortable 实例
    onUnmounted(() => {
      instance.destroy()
    })
  })
}
```

```vue [index.vue]
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
// [!code focus]
import { useSortable } from './useSortable'

const list = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' },
  { id: 5, name: '钱七' },
])

const containerRef = useTemplateRef('containerRef')

// [!code focus]
useSortable(containerRef, list, {
// [!code focus]
  animation: 150,
// [!code focus]
  onUpdate: (e) => {
// [!code focus]
    console.log('我自己的需求', e);
// [!code focus]
  }
// [!code focus]
})
</script>

<template>
  <div class="flex gap-20">
    <ul ref="containerRef" class="flex flex-col gap-10 list-none">
      <li v-for="item in list" :key="item.id" class="flex justify-center items-center w-100 h-40 bg-#7553db text-#fff rounded-5 cursor-pointer">{{ item.name }}</li>
    </ul>

    <div class="w-120">{{ JSON.stringify(list, null, 2) }}</div>
  </div>
</template>

<style scoped>
</style>
```

:::

## 实例获取

有时候，使用者想要获取到 `instance` 的实例，以便做自己的操作。例如手动调用 `destroy` 方法，销毁实例。

```vue [index.vue]
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import { useSortable } from './useSortable'

const list = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' },
  { id: 5, name: '钱七' },
])

const containerRef = useTemplateRef('containerRef')

// [!code ++]
const instance = useSortable(containerRef, list, {
  animation: 150,
  onUpdate: (e) => {
    console.log('我自己的需求', e);
  }
})

// [!code ++]
const handleDestroy = () => {
// [!code ++]
  instance.destroy()
// [!code ++]
}
</script>

<template>
  <div>
    <div class="flex gap-20">
      <ul ref="containerRef" class="flex flex-col gap-10 list-none">
        <li v-for="item in list" :key="item.id" class="flex justify-center items-center w-100 h-40 bg-#7553db text-#fff rounded-5 cursor-pointer">{{ item.name }}</li>
      </ul>

      <div class="w-120">{{ JSON.stringify(list, null, 2) }}</div>
    </div>
    <!-- [!code ++] -->
    <el-button @click="handleDestroy">手动销毁实例</el-button>
  </div>
</template>

<style scoped>
</style>
```

有人说那简单，直接在 `useSortable` 函数中返回 `instance` 就行了。代码如下：

```ts [useSortable.ts]
import Sortable from 'sortablejs'
import { onMounted, onUnmounted } from 'vue'

export const useSortable = (containerRef: any, list: any[], options?: any = {}) => {
  let instance: any = null // [!code ++]
  onMounted(() => {
     // [!code ++]
    instance = Sortable.create(containerRef.value, {
      ...options,
      onStart: (evt) => {
        // 给拖拽的元素添加样式类
        evt.item.classList.add('bg-amber')
      },
      onEnd: (evt) => {
        // 移除拖拽样式类
        evt.item.classList.remove('bg-amber')
      },
      onUpdate: (item) => {
        options?.onUpdate?.(item)
        const { oldIndex, newIndex } = item
        const oldValue = list.value[oldIndex]
        list.value.splice(oldIndex, 1)
        list.value.splice(newIndex, 0, oldValue)
      },
    })

    // 在组件卸载时销毁 sortable 实例
    onUnmounted(() => {
      instance.destroy()
    })
  })

  return instance // [!code ++]
}
```

理想很丰满，但是一运行代码，点击后报错：

```js
Uncaught TypeError: Cannot read properties of null (reading 'destroy')
    at handleDestroy
```

这是为什么呢？因为<word text="JavaScript"/>代码执行顺序问题。`onMounted` 是一个回调函数，还没执行就 `return` 了，因此外部拿到的还是 `null`。那怎么办呢？最简单的方法是用 `ref` 来保存 `instance`，这样就可以在 `onMounted` 之前使用 `instance` 了。

```ts [useSortable.ts]
import Sortable from 'sortablejs'
import { ref, onMounted, onUnmounted } from 'vue'

export const useSortable = (containerRef: any, list: any[], options?: any = {}) => {
  let instance: any = ref(null) // [!code focus]
  onMounted(() => {
     // [!code focus]
    instance.value = Sortable.create(containerRef.value, {
      ...options,
      onStart: (evt) => {
        // 给拖拽的元素添加样式类
        evt.item.classList.add('bg-amber')
      },
      onEnd: (evt) => {
        // 移除拖拽样式类
        evt.item.classList.remove('bg-amber')
      },
      onUpdate: (item) => {
        options?.onUpdate?.(item)
        const { oldIndex, newIndex } = item
        const oldValue = list.value[oldIndex]
        list.value.splice(oldIndex, 1)
        list.value.splice(newIndex, 0, oldValue)
      },
    })

    // 在组件卸载时销毁 sortable 实例
    onUnmounted(() => {
      instance.value.destroy() // [!code focus]
    })
  })

  return instance
}
```

## 动手实操

<myIframe url="https://example.duyidao.cn/reDevelop/sortable" />