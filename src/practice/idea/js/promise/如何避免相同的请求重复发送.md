---
title: 如何避免相同的请求重复发送
author:
  - 远方os 如何避免相同的请求重复发送&https://www.bilibili.com/video/BV1WRp7ezExP
---

# 如何避免相同的请求重复发送

## 前言

在项目中，可能存在一个路由页面有多个组件，其中几个组件使用了相同的传参接口，展示相同的数据。如果这些组件在页面都发起请求，那么就会导致相同的请求重复发送，浪费资源。

如何优化，实现相同请求只发送一次，其他组件直接复用请求的结果呢？

## 实现

### 函数初步封装

先封装一个函数，用于接收发请求的函数，成功或失败后返回对应的状态和值，先不考虑重复请求的问题。

```ts
async function load() {
  const res = await fetch('/api/data')
  return res.json()
}

function asyncOnce(cb: (...args: any[]) => Promise<any>) {
  return () => {
    return new Promise((resolve, reject) => {
      cb()
        .then((res: any) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }
}

asyncOnce(load)
```

现在就能正常发送请求了，接下来考虑如何实现数据缓存。

### 数据缓存

新建两个变量，`isPending` 用于表明当前是否有请求正在进行，`stack` 用于缓存请求的结果。

在发送接口时，先判断 `isPending` 是否为 `true`，如果为 `true`，说明当前有请求正在进行，直接将当前请求的回调函数加入 `stack` 中，等待请求完成后再执行回调函数。不为 `true` 则正常发请求，把 `isPending` 设置为 `true`。

请求完成后，把 `isPending` 设置为 `false`，并遍历 `stack` 数组，执行对应的成功或失败回调函数。

```ts
function asyncOnce(cb: (...args: any[]) => Promise<any>) {
  const isPending = false // [!code ++]
  const stack: any[] = [] // [!code ++]
  return () => {
    return new Promise((resolve, reject) => {
      // [!code ++]
      if (isPending) {
        stack.push({ resolve, reject }) // [!code ++]
        return // [!code ++]
      } // [!code ++]
      isPending = true // [!code ++]
      cb()
        .then((res: any) => {
          resolve(res)
          stack.forEach(({ resolve }) => resolve(res)) // [!code ++]
        })
        .catch((err: any) => {
          reject(err)
          stack.forEach(({ reject }) => reject(err)) // [!code ++]
        })
    })
  }
}
```

现在再刷新一下页面，调用接口，可以看到控制台只有一条网络请求了。

## 优化

### 代码优化

首先来优化一下代码，成功和失败都要调用一次回调，然后遍历数组。这一步其实可以省略一下，在一开始先把回调放到 `stack` 数组里，然后再判断 `isPending`。后续直接遍历数组即可。

```ts
function asyncOnce(cb: (...args: any[]) => Promise<any>) {
  const isPending = false
  const stack: any[] = []
  return () => {
    return new Promise((resolve, reject) => {
      stack.push({ resolve, reject }) // [!code ++]
      if (isPending) {
        stack.push({ resolve, reject }) // [!code --]
        return
      }
      isPending = true
      cb()
        .then((res: any) => {
          resolve(res) // [!code --]
          stack.forEach(({ resolve }) => resolve(res))
        })
        .catch((err: any) => {
          reject(err) // [!code --]
          stack.forEach(({ reject }) => reject(err))
        })
    })
  }
}
```

### 传参优化

现在我们再来看一下 `asyncOnce` 函数，它接收一个回调函数作为参数，然后返回一个 `Promise`。目前是没有但是这个回调函数并没有传参，如果考虑传参，那么目前的方法不适用，需要适配。

修改一下 `asyncOnce` 的方法，不再直接用 `stack` 数组来缓存回调函数，而是用 `Map` 来缓存数据，`key` 为请求的参数，`value` 为成功请求回调数组 `resolve`、失败请求回调数组 `reject`、请求状态 `isPending`。

```ts
function asyncOnce(cb: (...args: any[]) => Promise<any>) {
  let map = new Map()
  return (...args: any[]) => {
    return new Promise((resolve, reject) => {
      const key = JSON.stringify(args)
      // 如果没有key，则新建一个对象，否则直接取对象
      if (!map.has(key)) {
        map.set(key, { resolve: [], reject: [], isPending: false })
      }
      const state = map.get(key)
      // 把当前的成功和失败回调保存
      state.resolve.push(resolve)
      state.reject.push(reject)
      if (state.isPending) return
      state.isPending = true
      cb()
        .then((res: any) => {
          state.resolve.forEach((resolve: any) => resolve(res))
        })
        .catch((err: any) => {
          state.reject.forEach((reject: any) => reject(err))
        })
        .finally(() => {
          map.set(key, null) // 请求完成，把key对应的值设置为null
        })
    })
  }
}
```

在最后请求完成，遍历数组执行完回调后，把当前 `key` 对应的值设置为 `null`，表示当前请求已经完成，下次再请求时，直接新建一个对象。

## 流程步骤

TODO

## 动手实操

TODO