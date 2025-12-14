---
title: 组合式函数封装
author:
  - 远方os 如何封装一个组合式函数？&https://www.bilibili.com/video/BV1PEAreXEVs
---

# 组合式函数封装

## 前言

给一个组件绑定事件，如挂载时绑定鼠标移动事件，卸载时解绑鼠标移动事件，如果直接在组件内写，那么每次组件更新都会重新绑定事件，卸载时也会重新解绑，这样代码量会很多。

```vue
<script>
const move = () => {
  console.count("移动");
};

onMounted(() => {
  addEventListener("mousemove", move);
});

onUnmounted(() => {
  removeEventListener("mousemove", move);
});
</script>

<template>
  <div>123</div>
</template>
```

因此封装一个组合式函数，将绑定和解绑事件放在组合式函数中，这样就能减少很多的代码量了。

## 思考

现在来思考，封装这么一个函数，需要考虑哪些问题？

1. 谁要绑定和解绑事件？

   能用到事件绑定的，除了直接 `document.querySelector` 获取的元素，还有 `ref` 获取的元素，因此需要考虑两种情况。

2. 绑定的是什么类型的事件？

   事件有很多，`click`、`mousemove`、`keydown` 等等，因此需要使用者传递。

3. 绑定的回调函数？

   同样使用者传递。

## 实现

现在先来写一个简易版的函数，接收四个参数，分别是 `el`、`type`、`callback`、`option`，分别表示元素、事件类型、回调函数、是否冒泡等。

函数中使用 `onMounted` 和 `onUnMounted` 两个生命周期函数，在 `onMounted` 中绑定事件，在 `onUnMounted` 中解绑事件。

由于前面思考考虑到 `el` 传过来的有可能是 `ref` ，也有可能不是，因此直接 `el.value.addEventListener` 会报错，因此需要用 `unref` 包裹一下，这样无论是不是 `ref` ，都不需要考虑 `.value` 的问题了。

::: code-group

```js [useEvent.js]
import { onMounted, onUnmounted, unref } from "vue";

export function useEvent(el, type, callback, option) {
  onMounted(() => {
    unref(el).addEventListener(type, callback, option);
  });

  onUnmounted(() => {
    unref(el).removeEventListener(type, callback, option);
  });
}
```

```vue [App.vue]
<script setup>
import { useEvent } from "./useEvent.js";

const divRef = ref();

useEvent(divRef.value, "mousemove", () => {
  console.count("移动");
});
</script>

<template>
  <div ref="divRef">123</div>
</template>
```

:::

写完后运行，可以看到效果出来了，现在开始思考一下边界问题。

### v-if 挂载销毁组件节点

目前的方法只能在组件卸载之后，触发 `onUnMounted`，解绑事件，但是如果一个 `div` 标签通过 `v-if` 卸载和挂载，组件此时并无销毁，因此无法触发生命周期函数，需要修改一下写法。

既然无法监听生命周期，那么就通过 `watch` 监听这个 `el` 组件，每次触发更新，都先卸载一遍事件，然后再判断 `el` 是否有值，有的话再绑定事件。

```js
import { onMounted, onUnmounted, unref } from "vue"; // [!code --]
import { watch, onUnmounted, unref } from "vue"; // [!code ++]

export function useEvent(el, type, callback, option) {
  let off = () => {}; // 用于解绑事件的函数，一开始是空，不需要解绑 // [!code ++]
  watch(
    // [!code ++]
    () => unref(el), // [!code ++]
    (val) => {
      // [!code ++]
      off(); // 运行函数解绑事件 // [!code ++]
      if (!val) return; // [!code ++]
      val.addEventListener(type, callback, option); // [!code ++]
      off = () => val.removeEventListener(type, callback, option); // 绑定当前el的解绑事件 // [!code ++]
    }, // [!code ++]
    {
      // [!code ++]
      immediate: true, // [!code ++]
    } // [!code ++]
  ); // [!code ++]

  onUnmounted(() => {
    unref(el).removeEventListener(type, callback, option); // [!code --]
    off(); // [!code ++]
  });
}
```

### window 省略

使用者想要默认 `window` 时不需要传，例如：

- 为 `window` 绑定：

  ```js
  useEvent("click", fn);
  ```

- 为组件绑定：

  ```js
  useEvent(divRef.value, "click", fn);
  ```

此时可以判断形参第一个是否是字符串，如果不是字符串，说明是一个 `el` 的 `ref` 对象，否则是一个事件字符串，默认 `window` 。

```js
import { watch, onUnmounted, unref } from "vue";

export function useEvent(...args) {
  let el = typeof args[0] === "string" ? window : args.shift(); // [!code ++]
  let off = () => {}; // 用于解绑事件的函数，一开始是空，不需要解绑
  watch(
    () => unref(el),
    (val) => {
      off(); // 运行函数解绑事件
      if (!val) return;
      val.addEventListener(...argsn);
      off = () => val.removeEventListener(...argsn); // 绑定当前el的解绑事件
    },
    {
      immediate: true,
    }
  );

  onUnmounted(() => {
    off();
  });
}
```

### 手动选择销毁

有一些场景需要使想要自己决定销毁场景，这里需要 `return` 返回一个函数，把 `off` 方法返回出去，使用者自己决定啥时候手动销毁。

```js
import { onMounted, onUnmounted, unref } from "vue"; // [!code --]
import { watch, onUnmounted, unref } from "vue"; // [!code ++]

export function useEvent(...args) {
  let el = typeof args[0] === "string" ? window : args.shift(); // [!code ++]
  let off = () => {}; // 用于解绑事件的函数，一开始是空，不需要解绑
  const stop = watch(
    () => unref(el),
    (val) => {
      off(); // 运行函数解绑事件
      if (!val) return;
      val.addEventListener(...argsn);
      off = () => val.removeEventListener(...argsn); // 绑定当前el的解绑事件
    },
    {
      immediate: true,
    }
  );

  onUnmounted(() => {
    off();
  });

  return () => {
    // [!code ++]
    off(); // [!code ++]
    stop(); // [!code ++]
  }; // [!code ++]
}
```

最后销毁完后 `watch` 还会触发一次，这里用 `watch` 返回的 `stop` 方法取消监听，提升一点性能。

> [!IMPORTANT] 注意
> 这里不能直接返回 `off` 函数，而是要用一个函数包裹返回，是因为 `off` 函数是 `watch` 内部定义的，如果直接返回，外部无法访问到 `off` 函数。

### 不局限于组件内

`onUnmounted` 只能局限于组件内卸载，有一些使用场景不只局限于组件内，因此需要把 `onUnmounted` 改成 `onScopeDispose` 。

```ts
import { watch, onUnmounted, unref } from 'vue' // [!code --]
import { watch, onScopeDispose, unref } from 'vue' // [!code ++]

export function useEvent(...args) {
  let el = typeof args[0] === 'string' ? window : args.shift() // [!code ++]
  let off = () => {} // 用于解绑事件的函数，一开始是空，不需要解绑
  const stop = watch(
    () => unref(el),
    (val) => {
      off() // 运行函数解绑事件
      if (!val) return
      val.addEventListener(...argsn)
      off = () => val.removeEventListener(...argsn) // 绑定当前el的解绑事件
    },
    {
      immediate: true,
    }
  )

  onUnmounted(() => { // [!code --]
  onScopeDispose(() => { // [!code ++]
    off()
  })

  return () => {
    off()
    stop()
  }
}
```
