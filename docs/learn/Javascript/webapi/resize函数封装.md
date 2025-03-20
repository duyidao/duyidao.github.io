---
title: resize函数封装
description: JavaScript 实现resize函数封装
keywords: JavaScript, resize函数封装, resize
---

# resize函数封装

## 前置知识

Resizeobserver 的作用是监测元素的尺寸变化。这是一种强大的WebAPl，允许开发者在元素的尺寸发生改变时 (无论是因为元素内容的变化、窗又大小的调整还是其他原因导致的尺寸改变)，执行一些操作或布局更新。

在过去，开发者通常需要依赖定时器或者传统的 `resize` 事件来间接监测元素尺寸的变化，这种方法不仅不够精确，而且效率低下。Resizeobserver 提供了一种更为直接和高效的方式来响应尺寸变化。

使 用 Resizeobserver 很简单，只需要创建一个 Resizeobserver 实例，并为它提供一个回调函数。在回调函数中，你可以基于元素尺寸的变化来执行相应的操作。然后，使用 observer 方法来指定需要被观察尺寸变化的元素。

```js
// 监测的目桥元素
const targetElement = document.queryselector(".resizable");
// 创建Resizeobserver 实例
const resizeObserver =newResizeobserver((entries) => {
  for (let entry of entries) { // entry. target 是被观察的元素// entry.contentRect 包含了元素的尺寸信息
    console.log("Element size changed:", entry.target);
    console.log({entry.contentRect.width});
    console.log({entry.contentRect.height});
  }
});
// 开始观察目标元素
resizeobserver.observe(targetElement);
```

## 思路

前端有一个交互是用户拖拽父级盒子，其内容会根据盒子宽度的变化而显示不同数量的内容。如下图所示：

![resize](https://pic.imgdb.cn/item/6529402ac458853aef02bd86.gif)

想要实现该功能，可以通过自定义函数搭配容器尺寸变化方法 `ResizeObserve()` 实现。初步代码如下：

```html
<template>
	<div v-size-ob="handleSizeChange" ref="chartRef"></div>
</template>

<script setup>
import { ref } from 'vue'
const chartRef = ref(null)
const width = ref(500)

function handleSizeChange(size) {
  width.value = size.width
}
</script>
```

接下来配置自定义函数，主要需要做的事情只有两个：

- 在真实 DOM 元素渲染完毕后监听其尺寸的变化
- 在真实 DOM 元素卸载后取消监听减少性能浪费

## DOM存在

由于 `ResizeObserve()` 方法可以监听多个 DOM 元素，因此其形参是一个数组的形式，每一项都是一个对象，包含以下的信息：

- target：目标元素
- borderBoxSize：盒子边框尺寸
- contentBoxSize：盒子内容尺寸
- contentRect：内容区域的整个矩形信息，如坐标、宽高等
- devicePixelContentBoxSize：DPR信息

通过 `for...of...` 循环，获取每一项数据对象的 `target` 对应的回调函数。由于方法和自定义函数不在同一个函数内，因此需要 `WeakMap()` 作为映射表，把 DOM元素与其 `handler` 方法一一对应。`WeakMap()` 与对象的区别简单区分可以理解为 `WeakMap()` 是一个可以用对象作为键的对象形式。

这里不使用 `Map()` 的原因是如果在未来真实 DOM 卸载后，它的键不会清除，因此方法还在，会有潜在的 BUG。`WeakMap()` 是一个弱映射，它的键不会被垃圾回收器所考量，只要真实 DOM不存在，对应的方法就会被删除掉。

在方法中获取到对应的处理函数并传递当前元素的宽高。如果宽高变化就会触发自定义的方法。

代码如下：

```js
// 建立映射表
const map = new WeakMap()

// 配置监视盒子内容盒或边框盒或者 SVGElement 边界尺寸的变化函数
const ob = new ResizeObserver((entries) => {
  for(const entry of entries) {
    // 运行 entry.target 对应的回调函数
    // 保存映射表对应的方法
    const handler = map.get(entry.target)
    if(handler) {
      handler({
        width: entry.borderBoxSize[0].inlineSize
        height: entry.borderBoxSize[0].blockSize
      })
    }
  }
})

export default {
  // 监听el元素尺寸变化
  mounted(el, binding) {
    // 保存映射表对应的方法
    map.set(el, binding.value)
    ob.observe(el)
  }
}
```

## DOM卸载

在 DOM 元素卸载后取消元素的监听即可。代码如下：

```js
// ...

export default {
  // 监听el元素尺寸变化
  mounted(el, binding) {
    // ...
  },
  // 取消监听
  unmounted(el) {
    ob.unobserve(el)
  }
}
```

## 总体效果
<Iframe url="https://duyidao.github.io/blogweb/#/detail/js/resize" />