---
title: 数说故事Web端H5预览
titleTemplate: 数说故事Web端H5预览
description: 数说故事 web端 preview postmessage
head:
  - - meta
    - name: description
      content: 数说故事Web端H5预览
  - - meta
    - name: keywords
      content: 数说故事 web端 preview postmessage
pageClass: shushuo-nourse-webpostmessage
tags: web,postmessage,preview
---

# H5预览

## 效果展示

![效果展示](https://pic1.imgdb.cn/item/69251e823203f7be002d6b8f.png)

如上图所示，在编辑信息时，右侧可以实时预览 H5 的效果。

## 实现思路

在需求评审时，前端经过和后端的沟通，最终决定使用 `iframe` 的方式，将 H5 的内容嵌入到编辑页面中。

在用户新增内容时，不给予预览，提示需要先保存后才能预览。用户保存后，调用保存接口，成功后端返回一个 `id` ，前端将 `id` 放到 `iframe` 的 `src` 中，H5 页面通过路由传递的 `id` 调用接口获取数据详情，展示数据。

后续在用户编辑的时候，通过 `watch` 监听页面数据的变化，一旦数据发生变化，调用 `iframe` 的 `contentWindow.postMessage()` 方法，将数据传递给 H5 页面，H5 页面监听 `message` 事件，获取数据，展示数据。

## 实现步骤

### 保存后才能预览

判断变量对象内是否有 `id` ，存在 `id` 才能预览。保存后把后端返回的 `id` 存储到变量对象中。

```html
<div v-if="previewPhoneVisible" class="shrink-0 w-400px h-full flex items-center gap-16 bg-neutral-1 flex flex-col">
  <template v-if="info.id">
    <div class="w-full flex justify-between items-center px-16 py-8">
      <i class="ds-iconf-info-circle-line mr-4" />实时预览，请手动点击保存按钮保存任务配置。
    </div>
    <div class="flex-1">
      <PhoneIframe ref="phoneIframeRef" :visible="visible" class="!w-375 max-h-735 mx-auto" :url="url" :query="query" />
    </div>
  </template>
  <div v-else class="flex-1 w-full flex items-center justify-center text-16 text-neutral-7 bg-neutral-2">
    请先创建任务后再进行预览
  </div>
</div>
```

### 点击预览按钮把 id 等信息传过去

点击预览按钮，把 `id` 、预览模式、取消权限判断等变量传过去。

::: code-group

```js [父组件.js]
function openPreview(id) {
  query.value = { id, preview: true, ignore: true }
  url.value = '/h5/detail'
  visible.value = true
  phoneIframeRef?.value?.reload() // 刷新 iframe
  console.log('previewH5TaskUrl', previewH5TaskUrl.value)
}
```

```vue [子组件.vue]
<template>
  <div class="phone-container">
    <div class="phone-inner-container">
      <iframe v-if="showIframe" ref="iframeRef" :key="queryUrl" :src="queryUrl" style="width: 100%; height: 100%; margin: 0; padding: 0; border: 0;" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  query: {
    type: Object,
    default: () => ({}),
  },
})
const iframeRef = ref()
const showIframe = ref(true) // 用于刷新

const queryUrl = computed(() => {
  const query = new URLSearchParams(props.query)
  return query.toString() ? `${props.url}?${query.toString()}` : props.url
})

function reload() {
  showIframe.value = false
  nextTick(() => {
    showIframe.value = true
  })
}
defineExpose({
  reload,
})
</script>

<style lang="scss">
.phone-container {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/phone.png');
  background-size: 100% 100%;
  padding: 44px 22px 17px 22px;
}

.phone-inner-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px 5px 42px 42px;
  overflow: hidden;
}
</style>
```
:::

### 编辑数据时，postmessage 把数据传过去

在编辑数据时，通过 `watch` 监听页面数据的变化，一旦数据发生变化，调用 `iframe` 的 `contentWindow.postMessage()` 方法，将数据传递给 H5 页面，H5 页面监听 `message` 事件，获取数据，展示数据。

::: code-group
```js [父组件.js]
import { useEventListener, watchDebounced } from '@vueuse/core'

function postMessageToIframe() {
  const data = convertTaskDataToH5TaskData(info.value)
  phoneIframeRef.value.sendMessageToIframe({
    type: 'MY_DATA',
    payload: JSON.stringify(data),
  }, '*')
}

useEventListener(window, 'message', (event: any) => {
  if (event.data.type === 'MY_TYPE') {
    postMessageToIframe()
  }
})

watchDebounced(info, () => {
  if (visible.value) {
    postMessageToIframe()
  }
}, {
  deep: true,
  debounce: 500,
})
```

```js [子组件.js]
function sendMessageToIframe(message: any, targetOrigin: string = '*') {
  if (iframeRef.value) {
    iframeRef.value.contentWindow?.postMessage(message, targetOrigin)
  }
}

defineExpose({
  sendMessageToIframe,
})
```
:::

### H5 页面监听 message 事件，获取数据，展示数据

在 H5 页面中，监听 `message` 事件，获取数据，展示数据。

```js
useEventListener(window, 'message', (event) => {
  if (event.data.type === 'MY_DATA') {
    const payload = JSON.parse(event.data.payload)
    detail.value = payload
  }
})

onMounted(() => {
  if (isPreview.value) {
    // 通知父级页面已加载，用来执行父级页面的一些操作
    window?.parent?.postMessage({ type: 'MY_TYPE' }, '*')
  }
  else {
    // 调接口获取数据
  }
})
```

## 拓展

### iframe postmessage 传参

`postMessage` 方法可以传递任意类型的数据，包括对象、数组、字符串、数字等。

```js
// 父组件
const data = { name: 'John', age: 30 }
iframeRef.value.contentWindow.postMessage(data, '*')

// 子组件
window.addEventListener('message', (event) => {
  const data = event.data
  console.log(data) // { name: 'John', age: 30 }
})
```

但是，如果传递的是对象，需要使用 `JSON.stringify` 方法将对象转换为字符串，在子组件中再使用 `JSON.parse` 方法将字符串转换为对象。

### iframe 传参问题

为了安全起见，应该明确指定 `targetOrigin`，或者至少在同源情况下使用 `'*'` 。

```js
// 父组件
const data = { name: 'John', age: 30 }
iframeRef.value.contentWindow.postMessage(data, 'https://www.example.com')

// 子组件
window.addEventListener('message', (event) => {
  const data = event.data
  console.log(data) // { name: 'John', age: 30 }
})
```

`targetOrigin` 参数可以设置为 `'*'`，表示不限制目标域，但是这样会有安全风险，建议设置为具体的域。

### iframe 接收参数

在 iframe 中，可以通过 `window.addEventListener('message', callback)` 方法监听 `message` 事件，获取父组件传递的数据。

```js
// 子组件
window.addEventListener('message', (event) => {
  const data = event.data
  console.log(data) // { name: 'John', age: 30 }
})
```