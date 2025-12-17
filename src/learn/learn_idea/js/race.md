---
title: 异步数据竞态取消
author:
  - 远方os 异步数据竞态问题如何解决&https://www.douyin.com/video/7480970814741843227
---

# 异步数据竞态取消

## 前言

在项目中，难免会遇到一些 `tab` 栏切换操作，例如订单状态、优惠券等，这些 `tab` 栏切换时，需要从服务器获取数据，如果切换的频率很高，就会导致频繁的请求，有可能会造成新的数据接口请求回来了，旧的数据接口才在后面请求回来，覆盖了新的数据，导致数据不准确，这就是异步数据竞态问题。

## 思路

每一次请求新的接口时，抛弃上一次的旧接口，这样就可以保证每次请求的数据都是最新的。

## 实现

写一个函数方法 `createCancelTask`，接收一个<word text="Promise" />回调函数。

声明一个空函数 `cancel`，用于取消上一次的请求。

返回一个函数，参数是接口函数获取到的参数；该函数再返回 `new Promise`，用于执行完回调函数后，返回 `resolve` 数据。

```js
function createCancelTask(task) {
  let cancel = () => {};
  return (...args) => {
    return new Promise((resolve, reject) => {
      cancel()
      task(...args).then(res => resolve(res)).catch(err => reject(err));
    });
  }
}
```

接下来就是实现功能，在 `new Promise` 函数中，执行完 `cancel` 函数后，为 `cancel` 函数赋值一个新的值，用于把 `resolve` 和 `reject` 置空。这样，当新的接口请求回来时，旧的接口请求 `Promise` 状态永远是 `padding`，数据就不会覆盖了。

```js
function createCancelTask(task) {
  let cancel = () => {};
  return (...args) => {
    return new Promise((resolve, reject) => {
      cancel()
      cancel = () => { // [!code ++]
        resolve = reject = () => {} // [!code ++]
      } // [!code ++]
      task(...args).then(res => resolve(res)).catch(err => reject(err));
    });
  }
}
```

在使用的时候，把 `createCancelTask` 函数作为接口函数的包装函数。

```js
const init = createCancelTask(async (id) => {
  const res = await fetch(`https://api.xxx.com/order/${id}`);
  return res.json();
})

init(1)

init(2)
```

它的执行流程是：

1. 调用 `init(1)`，`cancel` 函数为空函数，执行后无任何副作用。修改 `cancel` 函数为把它当前的 `resolve` 和 `reject` 置空。执行 `task` 函数
2. 调用 `init(1)`，`cancel` 函数是置空 `init(1)` 的 `resolve` 和 `reject` 回调，执行后 `init(1)` 的 `Promise` 状态永远是 `padding`。修改 `cancel` 函数为把它当前的 `resolve` 和 `reject` 置空。执行 `task` 函数
3. `init(1)` 的 `Promise` 状态永远是 `padding`，`init(2)` 执行完毕后 `resolve()` 返回数据