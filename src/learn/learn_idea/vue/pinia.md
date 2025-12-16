---
title: 全局状态管理
author:
  - 远方os vue实现全局状态管理&https://www.bilibili.com/video/BV1jBKbzrEZd/
---

# 全局状态管理

## 前言

一些小项目，或者对代码体积有一定要求的项目，可能不希望引入 Pinia、Vuex 等这些全局状态管理的库，而是自己实现一个简单的全局状态管理。

## 实现

下面来看一下如何简单实现一个全局状态管理的功能。

主要的核心思想是通过闭包，将状态存储在闭包中，在使用时拿到之前存储的值。第一次调用时无数据存储，因此触发一次回调函数；后续再调用时，直接返回之前存储的返回值。

::: code-group
```js
import { ref } from "vue";

export const useCounter = defineStore(() => {
  const count = ref(1);
  const addFn = () => {
    count.value++;
  };
  return {
    count,
    addFn,
  };
});

function defineStore(fn) {
  let state;
  return () => {
    if (state) return state;
    return (state = fn());
  };
}
```
```vue [App.vue]
<script setup>
import { useCounter } from "./store/counter.js";
import Father from "./components/Father.vue";
import Son from "./components/Son.vue";

const { count } = useCounter();
</script>

<template>
  <h1>{{ count }}</h1>
  <Father />
  <Son />
</template>
```
```vue [Father.vue]
<script setup>
import { useCounter } from "./store/counter.js";

const { count, addFn } = useCounter();
</script>

<template>
  <h3>Father: {{ count }}</h3>
  <button @click="addFn">add</button>
</template>
```
```vue [Son.vue]
<script setup>
import { useCounter } from "./store/counter.js";

const { count } = useCounter();
</script>

<template>
  <div>Son: {{ count }}</div>
</template>
```
:::

## 细化

```js
import { ref, getCurrentScope, effectScope } from "vue"; // [!code focus]

export const useCounter = defineStore(() => {
  const count = ref(1);
  const addFn = () => {
    count.value++;
  };
  const scope = getCurrentScope(); // [!code focus]
  return {
    count,
    scope, // [!code focus]
    addFn,
  };
});

function defineStore(fn) {
  let state;
  return () => {
    if (state) return state;
    const scope = effectScope(true); // [!code focus]
    return (state = scope.run(fn)); // [!code focus]
  };
}
```

上方代码主要是通过 `effectScope` 来创建一个闭包，将状态存储在闭包中，然后通过 `defineStore` 函数来返回一个函数，这个函数在第一次调用时，会执行 `effectScope` 中的函数，将状态存储在闭包中，然后返回这个状态。在第二次调用时，会直接返回之前存储的状态。

`effectScope` 的作用是创建一个作用域，在这个作用域中的变量和函数，在作用域销毁后，会被自动清理。它用于分组和管理多个响应式 `effect`，它主要解决了在复杂场景下组织和清理 `effect` 的问题。