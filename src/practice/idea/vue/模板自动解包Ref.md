---
title: 模板自动解包 Ref
author:
  - 远方os vue模板自动解包Ref&https://www.bilibili.com/video/BV1WABuBdEn2
---

# 模板自动解包 Ref

## 前言

在<word text="Vue" />中，用 `ref` 声明的响应式变量，在 `script` 中使用时，需要通过 `.value` 来访问其值；而在模板 `template` 中，却可以直接访问其值。这是因为在模板中，<word text="Vue" />会自动解包 `ref`，使其可以直接访问其值。

那么，在模板中，是如何实现自动解包 `ref` 呢？

## 思路

查看源码，可以看到底层逻辑调用了一个 `proxyRefs` 函数，该函数的作用就是将 `ref` 自动解包。

下面查看一下它的源码。

::: code-group

```ts [packages/reactivity/src/constants.ts]
export enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw',
  IS_REF = '__v_isRef',
}
```

```ts [packages/reactivity/src/refs.ts]
import { ReactiveFlags } from './constants'

const shallowUnwrapHandlers: ProxyHandler<any> = {
  get: (target, key, receiver) =>
    key === ReactiveFlags.RAW
      ? target
      : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key]
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value
      return true
    } else {
      return Reflect.set(target, key, value, receiver)
    }
  },
}

export function proxyRefs<T extends object>(
  objectWithRefs: T,
): ShallowUnwrapRef<T> {
  return isReactive(objectWithRefs)
    ? (objectWithRefs as ShallowUnwrapRef<T>)
    : new Proxy(objectWithRefs, shallowUnwrapHandlers)
}
```

:::

可以看到，`proxyRefs` 函数接收一个对象，并返回一个新的对象。这个新的对象是一个代理对象，它的 `get` 和 `set` 方法都被重写了。

在 `get` 方法中，如果访问的属性是 `ReactiveFlags.RAW`，则直接返回原对象；否则，调用 `unref` 函数，将 `ref` 自动解包，并返回其值。

## 亮点

源码着重做了几处判断：

1. `isReactive(objectWithRefs)`：判断传入的对象是否是由 `reactive` 声明的响应式对象。
   
   如果是，则直接返回原对象，不进行代理。因为 `reactive` 声明的响应式对象，其属性已经是响应式的，且不需要做 `.value` 的解包处理。

   反之，通过 `new Proxy` 创建一个代理对象，并重写其 `get` 和 `set` 方法。让 `template` 中访问的属性也能保持响应式。

2. `get` 获取值时，`key === ReactiveFlags.RAW`：判断访问的属性是否是 `ReactiveFlags.RAW`。
   
   如果是，说明用户已经用 `toRaw` 函数将响应式对象转为了普通对象，此时不需要做 `.value` 的解包处理。

   反之，用 `unref` 函数将 `ref` 自动解包，并返回其值。

3. `set` 设置值时，`isRef(oldValue) && !isRef(value)`：判断旧值是否是 `ref`，且新值不是 `ref`。
   
   如果是，说明用户试图将一个非 `ref` 的值赋给一个 `ref`，此时需要将新值赋给 `ref.value`，而不是直接赋给 `ref`。

   反之，直接将新值赋给 `ref`。

## 使用

模拟一下 `proxyRefs` 函数的使用。

```ts [component.ts]
const HelloWorld = {
  setup() {
    const msg = ref('Hello World')
    console.log(msg.value)
    return {
      msg
    }
  }
}

const setupState = HelloWorld.setup()
console.log(setupState.msg) // RefImpl { value: 'Hello World' }

const proxy = proxyRefs(setupState)
console.log(proxy.msg) // 'Hello World'
```

## 总结

模板自动解包 Ref 通过 `proxyRefs` 函数实现。

该函数创建代理对象，拦截属性访问和设置。在模板中访问 `ref` 时，`get` 方法自动调用 `unref` 解包返回值，无需手动添加 `.value`。只有当属性是 `ReactiveFlags.RAW` 时才返回原始对象。

设置值时，若旧值为 `ref` 而新值非 `ref`，则更新 `ref.value`。此机制避免了重复代理，保持了响应式特性，使模板中使用 `ref` 更加便捷自然。