---
title: 百度外包图层项目功能
titleTemplate: 百度外包图层项目功能
description: 地图 百度 图层 功能
head:
  - - meta
    - name: description
      content: 百度外包图层项目功能
  - - meta
    - name: keywords
      content: 地图 百度 图层 功能
pageClass: baidu-layout-function
tags: transition,
---

# 功能

## 数组对象去重

在某个模块中，前端需要拿到后端返回的数组对象，根据数组对象的 `name` 属性坐去重处理，保留每一项数据的第一项。

我的写法如下：

```js
const result = Object.values(
  arr.reduce((obj, item) => {
    if (!obj[item.name]) {
      obj[item.name] = item
    }
    return obj
  }, {})
)
```

这段代码用到了两个知识点：

- `arr.reduce((obj, item) => {...}, {})`：`reduce()` 方法对数组 `arr` 进行迭代。参数中的 `obj` 表示我们用来存储不同 `name` 数据的对象，`item`表示当前迭代的数组元素，`{}` 表示初始的空对象。

  `if (!obj[item.name]) {...}`：判断当前元素的 `name` 属性是否已经在 `obj` 对象中存在。如果不存在，则将该 `name` 属性作为 `obj` 对象的新属性，并且将当前元素加入到结果数组中。

  `return obj;`：在每次迭代结束后，返回更新后的 `obj` 对象，以便下一次迭代使用。

- `Object.values()`：最终通过 `Object.values()` 方法将 `obj` 对象转换为一个数组，该数组包含了所有不同 `name` 数据在数组中第一次出现的位置。

  ```js
  let obj = { a: 1, b: 2, c: 3 }

  console.log(Object.values(obj)) // [1, 2, 3]
  ```

## 展开与缩放

页面中左右两侧的组件可以通过点击按钮实现展开与缩放的效果。该功能的实现主要通过<word text="Vue3" />提供的组件 `transition` 实现。其主要原理是内部包裹的组件因 `v-if` 卸载后可以触发相应的动画效果。动画在组件挂载时调用 `enter-active-class` 类名，卸载时调用 `leave-active-class`

动画方面为了优化用户体验，这里使用的是 `animate` 动画库，代码如下所示：

```vue
<transition
  enter-active-class="animate__animated animate__fadeInLeft"
  leave-active-class="animate__animated animate__fadeOutLeft"
>
	<div v-if="show">123</div>
</transition>
```
