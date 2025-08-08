# 架构思考

做一个架构，最主要的还是思考清楚，这个架构要解决什么问题，要达到什么目标。对于开发者来说，希望用一个函数来创建页面，能够通过数据来更新视图，即数据正常展示在页面上，数据更新后，页面视图自动更新。

**综上所述，架构的目标是：函数和数据建立联系。**

但是再细细思考，这句话并不完全对。下面有一个代码示例：

```js
let data1 = 1
let data2 = 2
let data3 = 3

function fn() {
  return data1 + data2
}
```

这个函数 `fn` 使用了 `data1` 和 `data2` ，但是并没有用到 `data3` 。因此也不需要建立联系。

**综上所述，架构的目标应修改为：函数和函数中用到的数据建立联系。**

但是再细细思考，函数中用到的函数都能建立联系么？下面有一个函数：

```js
let data1 = true
let data2 = 2
let data3 = 3

function fn() {
  if (data1) { // [!code ++]
    return data2 // [!code ++]
  } // [!code ++]
  else { // [!code ++]
    return data3 // [!code ++]
  } // [!code ++]
}
```

表面上是用到了 `data1` 、`data2` 、`data3` 这几个数据，但是如果 `data1` 为 `true` ，那这个 `if` 判断就永远只用到 `data2` ，用不到 `data3` 。因此并不是所有用到的数据都要建立联系，而是函数运行过程中用到的数据进行关联。

**综上所述，架构的目标应修改为：函数和函数运行过程中用到的数据建立联系。**

但是再细细思考，函数运行过程中用到的函数都能建立联系么？是否需要关联的选择权应该交给用户，下面有一个函数：

```js
let data1 = true
let data2 = 2
let data3 = 3
tag(data2) // 假设 tag 是一个函数，用于标记数据，标记后，数据会和函数建立联系 // [!code ++]

function fn() {
  if (data1) {
    return data2
  }
  else {
    return data3
  }
}
```

如果 `tag` 函数标记了 `data2` ，那么 `data2` 和 `fn` 函数建立了联系，如果 `tag` 函数没有标记 `data2` ，那么 `data2` 和 `fn` 函数没有建立联系。

**综上所述，架构的目标应修改为：函数和函数运行过程中用到的标记了响应式数据建立对应联系。**

目标已经明确，接下来就是实现。如何建立对应的联系呢？主要要思考两个问题：
1. 监听数据的读取和修改
2. 如何知晓数据对应的函数

## 监听数据的读取和修改

对于前端 <SPW text="JavaScript" /> 来说，监听数据的读取和修改，可以通过 `Object.defineProperty` 或者 `Proxy` 来实现。 `Object.defineProperty` 方法只能通过属性描述符监听已有的属性读取和赋值，但是优点是兼容性更好； `Proxy` 可以监听很多对象操作，包括新增属性，监听范围更广，但是兼容性较差，只能兼容 `ES6` 的浏览器上使用。这里以 `Proxy` 为例子。

既然确定了 `Proxy` ，那么目标中的「数据」就要修改了，`Proxy` 只能监听对象，不能直接监听原始数据类型，因此需要把原始数据类型包装成对象。

**综上所述，架构的目标应修改为：函数和函数运行过程中用到的标记了响应式对象建立对应联系。**

::: code-group
```js [index.js]
import { reactive } from './reactive.js'

let data = reactive({ value: true })

function fn() {
  data.value = false
}

fn()
```
```js [reactive.js]
import { track, trigger } from './effect.js'

export function reactive(v) {
  return new Proxy(v, {
    get(target, key) {
      track(target, key) // 读取数据时，执行相关操作
      return target[key]
    },
    set(target, key, value) {
      trigger(target, key, value) // 修改数据时，执行相关操作
      return Reflect.set(target, key, value)
    }
  })
}
```
```js [effect.js]
// 依赖收集
export function track(target, key) {
  console.log('track:', target, key)
}

// 派发更新
export function trigger(target, key, value) {
  console.log('trigger:', target, key, value)
}
```
:::

> [!WARNING] ⚠️ 注意
> `set` 函数中，不仅要实现赋值，还要 `return` 返回赋值结果是否成功，可以用 `try...catch` 捕获异常，或者使用 `Reflect` 反射。 `Reflect` 返回的就是一个布尔值，表示赋值是否成功。

控制台打印结果为：

```
track: { value: true } value
trigger: { value: true } value false
```

后面还有一些小细节处理，例如判断用户传入的是否是对象，如果是原始数据类型，需要包装成对象；判断当前的变量是否有监听到了，避免重复监听等。

```js
// reactive.js
import { track, trigger } from './effect.js'

const weakmap = new WeakMap() // 存储依赖关系

export function reactive(v) {
  if (!isObject(v)) { // [!code ++]
    // 如果传入的不是对象，则包装成对象 // [!code ++]
  } // [!code ++]
  if (weakmap.has(v)) { // [!code ++]
    return weakmap.get(v) // 如果已经监听过了，则直接返回 // [!code ++]
  } // [!code ++]
  const proxy = new Proxy(v, { // [!code ++]
    get(target, key) {
      track(target, key) // 读取数据时，执行相关操作
      return target[key]
    },
    set(target, key, value) {
      trigger(target, key, value) // 修改数据时，执行相关操作
      return Reflect.set(target, key, value)
    }
  })

  weakmap.set(v, proxy) // 存储依赖关系 // [!code ++]
  return proxy // [!code ++]
}
```