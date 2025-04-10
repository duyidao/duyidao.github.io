# 读与写的深度思考

上文主要是针对如何监听对象的变化，建立联系，初步实现了读和写的操作。但是还需要深度思考一下，是否有需要优化的点。

## 读

首先看一个代码示例：

```js
const obj = {
  a: 1,
  get b() {
    return this.a + 2
  }
}

const data = reactive(obj)

function fn () {
  console.log(data.b)
}

fn()
```

上方代码中，属性 `b` 用到了属性 `a` 的值，预期应该会收集 `b` 和 `a` 的依赖，运行代码后查看控制台打印，发现只打印了 `b` 的依赖收集。

这是因为 `b` 是一个 `getter`，在获取 `b` 的值时，底层会执行 `getter` 函数，而 `this` 指向的是 `obj` ，而不是 `proxy` 代理对象。所以 `a` 的依赖收集没有生效。

解决方法是使用 `Reflect` 反射机制，将 `getter` 函数中的 `this` 替换为 `proxy` 代理对象。

```js
import { track, trigger } from './effect.js'

const weakmap = new WeakMap() // 存储依赖关系

export function reactive(v) {
  if (!isObject(v)) {
    // 如果传入的不是对象，则包装成对象
  }
  if (weakmap.has(v)) {
    return weakmap.get(v) // 如果已经监听过了，则直接返回
  }
  const proxy = new Proxy(v, {
    get(target, key, receiver) {
      track(target, key) // 读取数据时，执行相关操作
      return target[key] // [!code --]
      return Reflect.get(target, key, receiver) // 使用 Reflect 反射机制，将 this 指向 proxy 代理对象  // [!code ++]
    },
    set(target, key, value) {
      trigger(target, key, value) // 修改数据时，执行相关操作
      return Reflect.set(target, key, value)
    }
  })

  weakmap.set(v, proxy) // 存储依赖关系
  return proxy
}
```

解决了一个问题，再来思考一下是否还有优化点，看一个代码示例：

```js
const obj = {
  a: 1,
  b: {
    c: 2
  }
}

const data = reactive(obj)

function fn () {
  console.log(data.b)
}

fn()
```

上方代码中，`b` 是一个对象，`c` 是 `b` 的属性，预期应该会收集 `c` 和 `b` 的依赖，运行代码后查看控制台打印，发现只打印了 `b` 的依赖收集。这是因为 `b` 是一个对象，这个对象没有被代理，所以 `c` 的依赖收集没有生效。

因此需要做到深度监听，如果该属性是一个对象，则递归代理。

```js
import { track, trigger } from './effect.js'

const weakmap = new WeakMap() // 存储依赖关系

export function reactive(v) {
  if (!isObject(v)) {
    // 如果传入的不是对象，则包装成对象
  }
  if (weakmap.has(v)) {
    return weakmap.get(v) // 如果已经监听过了，则直接返回
  }
  const proxy = new Proxy(v, {
    get(target, key, receiver) {
      track(target, key) // 读取数据时，执行相关操作
      return Reflect.get(target, key, receiver) // 使用 Reflect 反射机制，将 this 指向 proxy 代理对象  // [!code --]
      const result = Reflect.get(target, key, receiver) // 使用 Reflect 反射机制，将 this 指向 proxy 代理对象  // [!code ++]
      if (isObject(result)) {  // [!code ++]
        return reactive(result) // 深度监听  // [!code ++]
      }  // [!code ++]
      return result  // [!code ++]
    },
    set(target, key, value) {
      trigger(target, key, value) // 修改数据时，执行相关操作
      return Reflect.set(target, key, value)
    }
  })

  weakmap.set(v, proxy) // 存储依赖关系
  return proxy
}
```

还有一种操作，虽然看起来不是读取属性点值，但是也是在判断依赖收集关系，示例代码如下：

```js
const obj = {
  a: 1,
  b: {
    c: 2
  }
}

const data = reactive(obj)

function fn () {
  'a' in data
}

fn()
```

上方代码中，`in` 操作符会触发 `has` 拦截器，因此需要在 `has` 拦截器中收集依赖。

```js
import { track, trigger } from './effect.js'

const weakmap = new WeakMap() // 存储依赖关系

export function reactive(v) {
  if (!isObject(v)) {
    // 如果传入的不是对象，则包装成对象
  }
  if (weakmap.has(v)) {
    return weakmap.get(v) // 如果已经监听过了，则直接返回
  }
  const proxy = new Proxy(v, {
    get(target, key, receiver) {
      track(target, key) // 读取数据时，执行相关操作
      const result = Reflect.get(target, key, receiver) // 使用 Reflect 反射机制，将 this 指向 proxy 代理对象
      if (isObject(result)) {
        return reactive(result) // 深度监听
      }
      return result
    },
    set(target, key, value) {
      trigger(target, key, value) // 修改数据时，执行相关操作
      return Reflect.set(target, key, value)
    },
    has(target, key) { // [!code ++]
      return Reflect.has(target, key) // 判断对象是否有对应属性 // [!code ++]
    } // [!code ++]
  })

  weakmap.set(v, proxy) // 存储依赖关系
  return proxy
}
```

目前能思考的点都思考了，暂时可以告一段落，后续如果有需要补充的点，再补充。

## 类型枚举

可以看到，有一些操作，比如 `get`、`set`、`has` 等，这些操作在 `Proxy` 中都可以拦截，但是并不是所有的操作都需要拦截，因此需要枚举一下，哪一些操作需要拦截，哪一些操作又需要做啥处理。

::: code-group
```js [type.js]
export const TrackOpTypes = {
  GET: 'get', // 读取数据时，执行相关操作
  HAS: 'has', // 判断对象是否有对应属性
  ITERATE: 'iterate', // 遍历操作
}

export const TriggerOpTypes = {
  SET: 'set', // 修改数据时，执行相关操作
  ADD: 'add', // 添加数据时，执行相关操作
  DELETE: 'delete', // 删除数据时，执行相关操作
  CLEAR: 'clear', // 清空数据时，执行相关操作
}
```
:::