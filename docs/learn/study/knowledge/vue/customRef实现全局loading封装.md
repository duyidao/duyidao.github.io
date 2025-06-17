---
title: customRef 实现全局loading封装
isReship: true
author:
  - 远方os https://www.bilibili.com/video/BV1J7NPe1EL7?vd_source=8628f61938375f4995c51e0b8c7d8165
---

# customRef 实现全局loading封装

## 前言

在实现全局 `loading` 效果时，一般情况下会通过 `v-loading` 指令来实现，在请求接口时 `loading` 设置为 `true` ，请求完毕后设置为 `false` 。

```js
export async function request(url: string, params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  loading.value = true;
  return await fetch(`${url}?${query}`).finally(() => {
    loading.value = false;
  });
}
```

但是这么做有一个问题，如果两个请求并发，第一个请求返回了，`loading` 就变为了 `false`；但是第二个请求还没返回，此时全局 `loading` 状态已经消失了，这显然是不符合预期的。

## 解决方案

可以转变一下思路，不单纯直接设置 `loading` 的值，而是设置 `loadingCount` 的值表示当前正在请求多少个接口，每调用了一个接口，就让数值 +1，请求完毕后让数值 -1，当数值为 0 时，表示没有接口在请求，此时 `loading` 为 `false`；只要数值不为 0，`loading` 就为 `true`。

怎么实现呢？可以借助 `customRef` 来实现。 `customRef` 接收一个函数，这个函数接收两个参数 `track` 和 `trigger` ，分别用于通知 Vue 追踪和触发更新。需要 `return` 一个对象，这个对象需要包含 `get` 和 `set` 方法。其中，`get` 方法在 `ref` 被读取时调用，`set` 方法在 `ref` 被修改时调用。

```js
export function loading = customRef(() => {
  let loadingCount = 0;

  return {
    get() {
      track();
      return loadingCount > 0;
    },
    set(value) {
      if (value) {
        loadingCount++;
      } else {
        loadingCount--;
      }
      loadingCount = Math.max(loadingCount, 0);
      trigger();
    }
  };
})
```

使用时，将 `loading` 替换为 `useLoading()` 返回的 `ref` 即可。

```js
import { useLoading } from './loading';

const loading = useLoading();

export async function request(url: string, params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  loading.value = true;
  return await fetch(`${url}?${query}`).finally(() => {
    loading.value = false;
}