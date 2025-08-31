---
title: 全局状态管理
author:
  - 远方os vue实现全局状态管理&https://www.bilibili.com/video/BV1jBKbzrEZd/
---

# 全局状态管理

一些小项目，或者对代码体积有一定要求的项目，可能不希望引入 `pinia` 、`vuex` 等这些全局状态管理的库，而是自己实现一个简单的全局状态管理。

下面来看一下如何简单实现一个全局状态管理的功能。

主要的核心思想是通过闭包，将状态存储在闭包中，在使用时拿到之前存储的值。

```js
export const useCounter = defineStore(() => {
  const count = ref(1);
  const addFn = () => {
    count.value++;
  };
  const scope = getCurrentScope();
  return {
    count,
    scope,
    addFn,
  };
});

function defineStore(fn) {
  let state;
  return () => {
    if (state) return state;
    const scope = effectScope(true);
    return (state = scope.run(fn()));
  };
}
```

上方代码主要是通过 `effectScope` 来创建一个闭包，将状态存储在闭包中，然后通过 `defineStore` 函数来返回一个函数，这个函数在第一次调用时，会执行 `effectScope` 中的函数，将状态存储在闭包中，然后返回这个状态。在第二次调用时，会直接返回之前存储的状态。
