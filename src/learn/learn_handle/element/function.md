---
title: 组合式函数封装
author:
  - 远方os 如何封装一个组合式函数？&https://www.bilibili.com/video/BV1PEAreXEVs
  - 远方os vue组合式函数封装&https://www.bilibili.com/video/BV1UV2tBgEPK
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

`watch` 方法的第二个函数的第三个形参提供了一个回调函数，该回调函数接收一个函数，当 `watch` 触发或者组件卸载时，会调用这个回调函数，因此可以直接把解绑事件放在这个回调函数中。

```js
import { watch, unref } from "vue";

export function useEvent(el, type, callback, option) {
  // [!code ++]
  watch(
    // [!code ++]
    () => unref(el), // [!code ++]
    // [!code ++]
    (val, _, onCleanup) => {
      if (!val) return; // [!code ++]
      val.addEventListener(type, callback, option); // [!code ++]
      onCleanup(() => val.removeEventListener(type, callback, option)); // 绑定当前el的解绑事件 // [!code ++]
       // [!code ++]
    },
     // [!code ++]
    {
      immediate: true, // [!code ++]
    } // [!code ++]
     // [!code ++]
  );
  // [!code --]
  onMounted(() => {
    unref(el).addEventListener(type, callback, option);// [!code --]
  // [!code --]
  });
  // [!code --]
  onUnmounted(() => {
    unref(el).removeEventListener(type, callback, option);// [!code --]
  // [!code --]
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
import { watch, unref } from "vue";

export function useEvent(...args) {
  let el = typeof args[0] === "string" ? window : args.shift(); // [!code focus]
  watch(
    () => unref(el), // [!code focus]
    (val, _, onCleanup) => {
      if (!val) return;
      val.addEventListener(...argsn); // [!code focus]
      onCleanup(() => val.removeEventListener(...argsn)); // 绑定当前el的解绑事件 // [!code focus]
    },
    {
      immediate: true,
    }
  );
}
```

### 手动选择销毁

有一些场景需要使想要自己决定销毁场景，而 `watch` 返回了一个 `stop` 方法，调用该方法时，也会触发 `onCleanup` 回调函数，因此可以直接返回 `stop`，组件调用 `stop` 方法来手动销毁。

```js
import { watch, unref } from "vue";

export function useEvent(...args) {
  let el = typeof args[0] === "string" ? window : args.shift();
   // [!code focus]
  return watch(
    () => unref(el),
    (val, _, onCleanup) => {
      off(); // 运行函数解绑事件
      if (!val) return;
      val.addEventListener(...argsn);
      onCleanup(() => val.removeEventListener(...argsn)); // 绑定当前el的解绑事件
    },
    {
      immediate: true,
    }
  );
}
```

## 拓展

关于<word text="Vue" />的 `watch` 方法，第二个参数是一个回调函数，它接收三个参数：

1. 监听目标的新值
2. 监听目标的旧值
3. 清理函数，用于清理副作用

其中，清理函数的触发时机为：

1. 当被监听的响应式数据发生变化时，`onCleanup` 会被调用
   
    ```js
    const count = ref(0)
    const name = ref('Alice')

    watch([count, name], (newValues, oldValues, onCleanup) => {
      // 每次 count 或 name 变化时，如果之前注册了 cleanup，
      // 那么旧的 cleanup 会被先调用
      
      const cleanup = () => {
        console.log('清理资源')
      }
      
      // 注册清理函数
      onCleanup(cleanup)
    })
    ```

2. 当 `watch` 实例被取消监听时（比如在组件卸载时），会触发清理函数
   
    ```js
    const stop = watch(count, (newValue, oldValue, onCleanup) => {
      // 注册清理函数
      onCleanup(() => {
        console.log('组件即将销毁，清理资源')
      })
    })

    // 当组件卸载时，停止监听
    // stop() // 调用 stop() 会触发清理函数
    ```