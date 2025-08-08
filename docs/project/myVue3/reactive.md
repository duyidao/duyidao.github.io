# Reactive 实现

## Proxy代理初步实现

前面实现 `ref` 的响应式，我们封装了 `link` 方法收集依赖和 `propagate` 方法触发依赖，因此 `reactive` 的实现可以复用。

在 <SPW text="Vue" /> 官方源码中， `reactive` 都是接收一个对象，通过 `proxy` 代理对象，当访问对象的属性时，触发 `get` 代理，当修改对象的属性时，触发 `set` 代理。

在 `get` 方法调用 `link` 方法收集依赖，并使用 `Reflect.get` 映射返回值；在 `set` 方法中使用 `Reflect.set` 保存新值，调用 `propagate` 方法触发依赖，最后返回新值。

```ts
import { link, propagate } from './system.ts'
import { activeSub } from './effect.ts'
import { isObject } from '@vue/shared'

export const reactive = (obj) => {
  return createObjectReactive(obj)
}

export function createObjectReactive(obj) {
  /**
   * reactive 必须接受一个对象
   */
  if (!isObject(target)) {
    /**
     * target 不是一个对象，哪儿来的回哪儿去
     */
    return target
  }

  const proxy = new Proxy(obj, {
    get(target, key) {
      console.log('target, key', target, key);
      // 收集依赖
      trackReactive(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, newValue) {
      console.log('target, key, newValue', target, key, newValue);
      // 保存新值
      const res = Reflect.set(target, key, newValue)
      // 触发依赖
      triggerReactive(target, key, res)
      return res
    }
  })
  return proxy
}

/**
 * 收集依赖
 * @param target 目标对象
 * @param key 属性名
 */
function trackReactive(target, key) {
  link(dep, activeSub)
}

/**
 * 触发依赖
 * @param target 目标对象
 * @param key 属性名
 */
function triggerReactive(target, key) {
  propagate(target, key)
}
```

而 `link` 方法需要参数 `dep` 和 `sub` ，`sub` 可以引入 `activeSub` ，而 `dep` 是一个包含 `subs` 和 `subsTail` 的类实例对象。现在就是要思考怎么实现。

既然它需要一个包含 `subs` 和 `subsTail` 的类实例对象，那么我们可以创建一个类 `Dep`，并添加 `subs` 和 `subsTail` 两个属性。后续把这个类实例对象传给 `link` 方法生成节点绑定到链表上就好了。现在需要思考用什么形式的数据格式，来关联保存 `reactive` 对象的属性。

在 <SPW text="Vue" /> 官方源码中， `reactive` 会先创建一个 `WeakMap` 保存所有对象，值是一个对象；每一个对象是通过 `Map` 保存的，每一个属性值则是 `new Dep` 类实例对象。格式如下图所示：

```js
const obj = reactive({
  a: 1,
  b: 2,
  c: 3
})

// 转换的格式：
[WeakMap]: {
  [obj]: {
    [a]: new Dep,
    [b]: new Dep,
    [c]: new Dep
  }
}
```

在 `trackReactive` 方法中，我们需要做的操作为：
1. 根据 `target` 获取 `WeakMap` 中保存的对象
   - 如果能拿到对象，说明之前有保存到，直接使用
   - 如果拿不到对象，说明是第一次获取，`new Map` 新建一个 `Map` ， `WeakMap.set()` 保存到 `WeakMap` 中
2. 根据 `key` 获取 `Map` 中保存数据
   - 如果能拿到数据，说明之前有保存到，直接使用
   - 如果拿不到数据，说明是第一次获取，`new Dep` 新建一个 `Dep` 类实例， `Map.set()` 保存到 `Map` 中
3. 调用 `link` 方法，把 `dep` 和 `activeSub` 传入 

```ts
import { link, propagate } from './system.ts'
import { activeSub } from './effect.ts'

export const reactive = (obj) => {
  return createObjectReactive(obj)
}

export function createObjectReactive(obj) {
  if (!isObject(target)) {
    return target
  }

  const proxy = new Proxy(obj, {
    get(target, key) {
      console.log('target, key', target, key);
      // 收集依赖
      trackReactive(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, newValue) {
      console.log('target, key, newValue', target, key, newValue);
      // 保存新值
      const res = Reflect.set(target, key, newValue)
      // 触发依赖
      triggerReactive(target, key, res)
      return res
    }
  })
  return proxy
}

const trackWeakMap = new WeakMap() // [!code ++]

function trackReactive(target, key) {
  if (activeSub) { // [!code ++]
    let depsMap = trackWeakMap.get(target) // [!code ++]
    /** // [!code ++]
     * 没有depsMap说明之前没有收集过这个对象的key，创建一个新的 // [!code ++]
     */ // [!code ++]
    if (!depsMap) { // [!code ++]
      depsMap = new Map() // [!code ++]
      trackWeakMap.set(target, depsMap) // [!code ++]
    } // [!code ++]
    let dep = depsMap.get(key) // [!code ++]
    /** // [!code ++]
     * 没有dep说明之前没有收集过，创建一个新的 // [!code ++]
     */ // [!code ++]
    if (!dep) { // [!code ++]
      dep = new Dep() // [!code ++]
      depsMap.set(key, dep) // [!code ++]
    } // [!code ++]
    link(dep, activeSub)
  } // [!code ++]
}

class Dep { // [!code ++]
  subs; // [!code ++]
  subsTail; // [!code ++]
  constructor() {} // [!code ++]
} // [!code ++]
```

而 `propagate` 方法需要参数 `subs` 链表，循环链表拿到对应依赖并执行。前面我们已经创建好了 `WeakMap`，并确立了数据结构，因此可以通过代理的对象和键名拿到对应的 `Dep` 对象，再通过 `Dep` 对象拿到 `subs` 链表，传参即可。

在 `triggerReactive` 方法中，我们需要做的操作为：
1. 根据 `target` 获取 `WeakMap` 中保存的对象，拿到对应的 `Map`，如果拿不到，`return` 阻止往下执行
2. 根据 `key` 获取 `Map` 中保存数据，拿到对应的 `Dep`，如果拿不到，`return` 阻止往下执行
3. 调用 `propagate` 方法，把 `dep.subs` 传入 

```ts
function trackReactive(target, key) {
  if (activeSub) {
    let depsMap = trackWeakMap.get(target)
    /**
     * 没有depsMap说明之前没有收集过这个对象的key，创建一个新的
     */
    if (!depsMap) {
      depsMap = new Map()
      trackWeakMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    /**
     * 没有dep说明之前没有收集过，创建一个新的
     */
    if (!dep) {
      dep = new Dep()
      depsMap.set(key, dep)
    }
    link(dep, activeSub)
  }
}

function triggerReactive(target, key, res) { // [!code ++]
  const depsMap = trackWeakMap.get(target) // [!code ++]
  if (!depsMap) return // [!code ++]
  const dep = depsMap.get(key) // [!code ++]
  if (!dep) return // [!code ++]
  propagate(dep.subs) // [!code ++]
} // [!code ++]
```

## this指向代理对象

接下来看一个例子：

> [!info] 例子
> ```js
> import {ref, effect, reactive} from '../dist/reactivity.esm.js'
> let state = reactive({
>   a: 1,
>   get count() {
>     return this.a
>   }
> })
> effect(() => {
>   console.log('state.a', state.count);
> })
> setTimeout(() => {
>   state.a = 2
> }, 1000)
> ```

对象 `state` 中的 `count` 属性是一个 `getter`，当 `state.a` 发生变化时，`state.count` 理应会变化， `state.count` 应该要触发 `effect` 函数。下面来看打印结果：

![打印结果](https://pic1.imgdb.cn/item/681efc9958cb8da5c8eacbc4.png)

第一行是一开始执行 `effect` 回调函数运行到 `stat.count` 这行代码时，触发了 `get` 收集依赖.然后执行回调函数 `console.log` 打印 `state.count` 的值，此时 `state.count` 的值是 `1`。过了一秒后修改了 `state.a` 的值，触发了 `set` 。

触发 `set` 后理应重新执行依赖项 `effect` 回调函数，但是并没有，我们来看看 `WeakMap` 中有没有收集到它的依赖项。回到 `trackReactive` 函数，打印 `target` 和 `key` 看看：

![打印](https://pic1.imgdb.cn/item/681efe3e58cb8da5c8eacc33.png)

可以看到 `target` 是 `{a: 1}` 的对象， `key` 是 `count`，因此 `this` 指向有问题，`this` 指向的是 `{a: 1}` 而不是代理对象，也就收集不到依赖了。

解决方法很简单，`Proxy` 的 `get` 方法第三个参数 `recevier` 指向的是代理对象，因此我们可以通过 `receiver` 来获取代理对象：

```ts
export function createObjectReactive(obj) {
  if (!isObject(target)) {
    return target
  }

  const proxy = new Proxy(obj, {
    get(target, key) { // [!code --]
    get(target, key, recevier) { // [!code ++]
      console.log('target, key', target, key);
      // 收集依赖
      trackReactive(target, key)
      // 保证访问器里的对象指向代理对象
      return Reflect.get(target, key) // [!code --]
      return Reflect.get(target, key, recevier) // [!code ++]
    },
    set(target, key, newValue, recevier) {
      console.log('target, key, newValue', target, key, newValue);
      // 触发依赖
      const res = Reflect.set(target, key, newValue, recevier)
      triggerReactive(target, key, res)
      return res
    }
  })
  return proxy
}
```

现在访问器里的对象也能正常更新了：

![正常更新](https://pic1.imgdb.cn/item/681effe058cb8da5c8eacc97.png)

## 重复代理处理

再看一个例子：

> [!info] 例子
> ```js
> let obj = {
>   a: 1
> }
> let state1 = reactive(obj)
> let state2 = reactive(obj)
> 
> console.log('state1 === state2', state1 === state2);
> ```

一个对象重复做代理，<SPW text="Vue" /> 官方打印结果是相等的，为 `true` ，我们本地还没做处理，每次接收对象都直接 `new Proxy` 创建一个新的代理，因此 `state1` 和 `state2` 是不相等的，为 `false` 。

解决方法很简单，我们创建一个新的 `WeakMap` 变量来存储代理对象，每次创建代理对象的时候，先去这个 `WeakMap` 里查找，如果找到了，直接返回，如果没找到，再创建新的代理对象，并存储到 `WeakMap` 里。

```ts
let reactiveMap = new WeakMap() // 复用同一个对象的代理 // [!code ++]
export function createObjectReactive(obj) {
  if (!isObject(target)) {
    return target
  }

  let projectProxy = reactiveMap.get(obj) // [!code ++]
  // 如果已经代理过，直接返回 // [!code ++]
  if (projectProxy) return projectProxy // [!code ++]
  const proxy = new Proxy(obj, {
    get(target, key, recevier) {
      // 收集依赖
      trackReactive(target, key)
      // 保证访问器里的对象指向代理对象
      return Reflect.get(target, key, recevier)
    },
    set(target, key, newValue, recevier) {
      // 触发依赖
      const res = Reflect.set(target, key, newValue, recevier)
      triggerReactive(target, key, res)
      return res
    }
  })
  reactiveMap.set(obj, proxy) // 没代理过的对象，保存 // [!code ++]
  return proxy
}
```

不过不要小瞧用户的需求，他们可能还会把 `reactive` 代理过的对象作为参数，示例代码如下：

```js
let obj = {
  a: 1
}
let state1 = reactive(obj)
let state2 = reactive(state1)

console.log('state1 === state2', state1 === state2);
```

解决方法为新建一个变量 `WeakSet` ，每次代理对象的时候，都会 `add` 添加进去。下次再要创建代理对象的时候，先 `has` 判断d在不在 `WeakSet` 里，如果有说明之前已经代理过了，是一个响应式对象，直接拿出来复用，没有再 `new Proxy` 新建一个代理。

```js
let reactiveMap = new WeakMap() // 复用同一个对象的代理
let reactiveSet = new WeakSet() // 保存已经代理过的对象 // [!code ++]

export function createObjectReactive(obj) {
  if (!isObject(target)) {
    return target
  }

  if (isReactive(obj)) return obj // [!code ++]
  let projectProxy = reactiveMap.get(obj)
  // 如果已经代理过，直接返回
  if (projectProxy) return projectProxy
  const proxy = new Proxy(obj, {
    get(target, key, recevier) {
      // 收集依赖
      trackReactive(target, key)
      // 保证访问器里的对象指向代理对象
      return Reflect.get(target, key, recevier)
    },
    set(target, key, newValue, recevier) {
      // 触发依赖
      const res = Reflect.set(target, key, newValue, recevier)
      triggerReactive(target, key, res)
      return res
    }
  })
  reactiveMap.set(obj, proxy)
  reactiveSet.add(proxy) // [!code ++]
  return proxy
}

/** // [!code ++] 
 * 判断是否收集过依赖 // [!code ++]
 * @param obj 对象 // [!code ++]
 */ // [!code ++]
export function isReactive(obj) { // [!code ++]
  return reactiveSet.has(obj) // [!code ++]
} // [!code ++]
```

> [!WARNING] 注意
> 这里 `add` 添加的是 `proxy`，而不是 `obj`，因为 `obj` 是原始对象，原始对象没有响应式，只有代理对象才有响应式。

## Ref方法复用

之前在实现 `ref` 的功能时，我们创建了一个 `RefImpl` 类，在构造器中当时是直接把值保存到 `this._value` 上，现在实现了 `reactive` 方法后，可以判断 `ref` 接收的是不是一个对象，如果是，直接调用 `reactive` 方法实现响应式即可。

```ts
import { isObject } from '@vue/shared'; // [!code ++]
import { reactive } from './reactive'; // [!code ++]

class RefImpl {
  _value;
  subs: Link;
  subsTail: Link;
  [ReactiveFlags.IS_REF] = true;

  constructor(value) {
    this._value = value; // [!code --]
    this._value = isObject(value) ? reactive(value) : value; // [!code ++]
  }

  get value() {
    if (activeSub) {
      trackRef(this);
    }
    return this._value;
  }

  set value(newValue) {
    this._value = newValue; // [!code --]
    this._value = isObject(newValue) ? reactive(newValue) : newValue; // [!code ++]
    triggerRef(this);
  }
}
```

## 优化 Proxy 对象参数反复创建

每次执行 `new Proxy` 时都要重新创建一个对象作为第二个参数，这里可以修改一个，把该对象提取出来，这样就可以复用这个对象了。

```ts
const mutableHandlers = { // [!code focus]
  get(target, key, recevier) { // [!code focus]
    // 收集依赖 // [!code focus]
    trackReactive(target, key) // [!code focus]
    // 保证访问器里的对象指向代理对象 // [!code focus]
    return Reflect.get(target, key, recevier) // [!code focus]
  }, // [!code focus]
  set(target, key, newValue, recevier) { // [!code focus]
    // 触发依赖 // [!code focus]
    const res = Reflect.set(target, key, newValue, recevier) // [!code focus]
    triggerReactive(target, key, res) // [!code focus]
    return res // [!code focus]
  } // [!code focus]
} // [!code focus]

export function createObjectReactive(obj) {
  if (!isObject(obj)) {
    return obj
  }

  // 判断是不是reactive代理过的对象
  if (isReactive(obj)) return obj

  // 判断是不是同一个对象重复代理
  let projectProxy = reactiveMap.get(obj)
  // 如果已经代理过，直接返回
  if (projectProxy) return projectProxy

  const proxy = new Proxy(obj, mutableHandlers) // [!code focus]
  reactiveMap.set(obj, proxy)
  reactiveSet.add(proxy)
  return proxy
}
```

## 新老属性值一样处理

下面再来看一个例子：

> [!info] 例子
> ```js
> let obj = {
>   a: 1
> }
> let state1 = reactive(obj)
> 
> effect(() => {
>   console.count('effect' + state1.a)
> })
> setTimeout(() => {
>   state1.a = 1
> }, 1000);
> ```

这个例子中，`state1.a` 被赋值为 1，一秒钟之后，`state1.a` 再次被赋值为 1，前后两个值没有发生变化，按理来说应该不需要触发 `effect` 函数，但实际上却触发了 `effect` 函数，这是不合理的。

为了解决这个问题，我们需要在 `set` 函数中判断新值和旧值是否相等，如果相等，则不触发 `effect` 函数。步骤如下：

1. 到 `share/src/index.ts` 下，写一个公共方法 `hasChanged`，接收两个值，新值和旧值，通过 `Object.is` 方法判断两个值是否相等，如果相等，则返回 `false`，否则返回 `true`。
2. 在 `reactivity/src/reactive.ts` 下，引入方法，在 `set` 方法中判断新旧两值是否相等，如果不等，才调用 `trigger` 方法触发依赖。
3. `RefImpl` 类的 `set` 方法也如法炮制修改。

::: code-group
```ts [shared/src/index.ts]
export function isObject (value) {
  return value !== null && typeof value === 'object'
}

export function hasChanged (newValue, oldValue) { // [!code ++]
  return !Object.is(newValue, oldValue) // [!code ++]
} // [!code ++]
```
```ts [reactivity/src/reactive.ts]
import { isObject, hasChanged } from '@vue/shared' // [!code ++]

// ...

const mutableHandlers = {
  get(target, key, recevier) {
    // 收集依赖
    trackReactive(target, key)
    // 保证访问器里的对象指向代理对象
    return Reflect.get(target, key, recevier)
  },
  set(target, key, newValue, recevier) {
    const oldValue = target[key]
    // 触发依赖
    const res = Reflect.set(target, key, newValue, recevier)
    triggerReactive(target, key, res) // [!code --]
    // 新旧两值不同，才触发更新 // [!code ++]
    if (hasChanged(newValue, oldValue)) triggerReactive(target, key, res) // [!code ++]
    return res
  }
}
```
```ts [reactivity/src/ref.ts]
import { isObject } from '@vue/shared'; // [!code --]
import { isObject, hasChanged } from '@vue/shared'; // [!code ++]

// ...

class RefImpl {
  _value;
  subs: Link;
  subsTail: Link;
  [ReactiveFlags.IS_REF] = true;

  constructor(value) {
    this._value = isObject(value) ? reactive(value) : value;
  }

  get value() {
    if (activeSub) {
      trackRef(this);
    }
    return this._value;
  }

  set value(newValue) {
    // 如果新值和旧值相等，则不进行更新 // [!code ++]
    if (!hasChanged(newValue, this._value)) return; // [!code ++]
    
    this._value = isObject(newValue) ? reactive(newValue) : newValue;
    if (hasChanged(newValue)) triggerRef(this);
  }
}
```
:::

## Reactive内使用Ref

下面来看一个例子：

> [!info] 例子
> ```js
> const a = ref(1)
> let state1 = reactive({
>   a
> })
> 
> effect(() => {
>   console.count('effect' + state1.a)
> })
> ```

如果在 `reactive` 对象内使用了 `ref` 创建的属性，<SPW text="Vue" /> 官方内部会帮我们自动拿到 `.value` 的值，我们使用时无需 `state1.a.value`，而是直接 `state1.a` 即可。

想要实现这个功能，可以借助前面实现 `RefImpl` 时，创建的 `isRef` 方法，只要是 `ref` 变量，他都有一个 `__v_isRef` 属性，因此我们可以借助这个方法很轻松就能判断当前的值是不是 `ref` ，如果是返回 `.value` ，不是返回自身。

在 `Proxy` 的 `get` 方法内做判断，因为获取值都会触发 `get` 方法，`get` 方法返回啥值，获取到的值就是啥。

```ts
import { isRef } from './ref.ts' // [!code ++]

// ...

const mutableHandlers = {
  get(target, key, recevier) {
    // 收集依赖
    trackReactive(target, key)
    // 保证访问器里的对象指向代理对象
    return Reflect.get(target, key, recevier) // [!code --]
    const res = Reflect.get(target, key, recevier) // [!code ++]
    // 如果访问的是ref对象，则返回.value，否则返回本身 // [!code ++]
    return isRef(res) ? res.value : res // [!code ++]
  },
  set(target, key, newValue, recevier) {
    const oldValue = target[key]
    // 触发依赖
    const res = Reflect.set(target, key, newValue, recevier)
    if (hasChanged(newValue, oldValue)) triggerReactive(target, key, res)
    return res
  }
}
```

如果不使用 `.value` 修改 `reactive` 内的 `ref` 的值，也应该同步修改 `ref` 的值，示例代码如下：

> [!info] 例子
> ```js
> const a = ref(1)
> let state1 = reactive({
>   a
> })
> 
> effect(() => {
>   console.count('effect' + state1.a)
> })
> 
> setTimeout(() => {
>   state1.a = 2
> }, 1000)
> ```

返回 `Proxy` 的 `set` 方法，判断 `oldValue` 是不是一个 `ref` 对象，如果是，且新值 `newValue` 不是一个 `ref` ，则同步修改。

```ts
const mutableHandlers = {
  get(target, key, recevier) {
    // 收集依赖
    trackReactive(target, key)
    // 保证访问器里的对象指向代理对象
    const res = Reflect.get(target, key, recevier)
    // 如果访问的是ref对象，则返回.value，否则返回本身
    return isRef(res) ? res.value : res
  },
  set(target, key, newValue, recevier) {
    const oldValue = target[key]
    // 如果新值是ref对象，则直接赋值 // [!code ++]
    if (isRef(oldValue) && !isRef(newValue)) { // [!code ++]
      oldValue.value = newValue // [!code ++]
      // 如果值是ref，更新后会自动触发sub的更新，所以不需要执行后续代码 // [!code ++]
      return res // [!code ++]
    } // [!code ++]
    // 触发依赖
    const res = Reflect.set(target, key, newValue, recevier)
    if (hasChanged(newValue, oldValue)) triggerReactive(target, key, res)
    return res
  }
}
```

## 代码转移

`reactive.ts` 内部抽离出公共方法或者属性，比如 `trackWeakMap`、`trackReactive`、`triggerReactive`、`Dep` 等，放到同级目录新建的 `dep.ts` 中；提取出来的 `mutableHandlers` 对象放到同级目录新建的 `baseHandlers.ts` 中，保证模块的高内聚低耦合。

::: code-group
```ts [reactive.ts]
import { isObject, hasChanged } from '@vue/shared'
import { mutableHandlers } from './baseHandlers.ts'

export const reactive = (obj) => {
  return createObjectReactive(obj)
}

let reactiveMap = new WeakMap() // 复用同一个对象的代理
let reactiveSet = new WeakSet()


export function createObjectReactive(obj) {
  /**
   * reactive 必须接受一个对象
   */
  if (!isObject(obj)) {
    /**
     * obj 不是一个对象，哪儿来的回哪儿去
     */
    return obj
  }

  // 判断是不是reactive代理过的对象
  if (isReactive(obj)) return obj

  // 判断是不是同一个对象重复代理
  let projectProxy = reactiveMap.get(obj)
  // 如果已经代理过，直接返回
  if (projectProxy) return projectProxy

  const proxy = new Proxy(obj, mutableHandlers)
  reactiveMap.set(obj, proxy)
  reactiveSet.add(proxy)
  return proxy
}

/**
 * 判断是否收集过依赖
 * @param obj 对象
 */
export function isReactive(obj) {
  return reactiveSet.has(obj)
}
```
```ts [dep.ts]
import { activeSub } from "./effect.ts";
import { link, propagate } from "./system.ts";

const trackWeakMap = new WeakMap();

export function trackReactive(target, key) {
  if (activeSub) {
    let depsMap = trackWeakMap.get(target);
    /**
     * 没有depsMap说明之前没有收集过这个对象的key，创建一个新的
     */
    if (!depsMap) {
      depsMap = new Map();
      trackWeakMap.set(target, depsMap);
    }

    let dep = depsMap.get(key);

    /**
     * 没有dep说明之前没有收集过，创建一个新的
     */
    if (!dep) {
      dep = new Dep();
      depsMap.set(key, dep);
    }

    link(dep, activeSub);
  }
}

export function triggerReactive(target, key, res) {
  const depsMap = trackWeakMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (!dep) return;

  propagate(dep.subs);
}

class Dep {
  subs;
  subsTail;

  constructor() {}
}

```
```ts [baseHandlers.ts]
import { trackReactive, triggerReactive } from './dep.ts'
import { isRef } from './ref.ts'

export const mutableHandlers = {
  get(target, key, recevier) {
    // 收集依赖
    trackReactive(target, key);
    // 保证访问器里的对象指向代理对象
    const res = Reflect.get(target, key, recevier);
    // 如果访问的是ref对象，则返回.value，否则返回本身
    return isRef(res) ? res.value : res;
  },
  set(target, key, newValue, recevier) {
    const oldValue = target[key];
    // 如果新值是ref对象，则直接赋值
    if (isRef(oldValue) && !isRef(newValue)) {
      oldValue.value = newValue;
      // 如果值是ref，更新后会自动触发sub的更新，所以不需要执行后续代码
      return res;
    }
    // 触发依赖
    const res = Reflect.set(target, key, newValue, recevier);
    // 如果新值和旧值不同，则触发更新
    if (hasChanged(newValue, oldValue)) triggerReactive(target, key, res);
    return res;
  },
};
```
:::

## 对象嵌套不更新

下面来看一个例子：

> [!info] 例子
> ```js
> let state1 = reactive({
>   a: {
>     b: 1
>   }
> })
> 
> effect(() => {
>   console.count('effect' + state1.a.b)
> })
> setTimeout(() => {
>   state1.a.b = 2
> }, 1000);
> ```

如果是对象嵌套的情况，修改对象内的对象的属性，不会触发更新，因为嵌套的对象没有收集依赖。

可能会有这样的疑问，为什么嵌套的对象没有收集依赖呢？不是被 `Proxy` 代理了么？这是因为 `Proxy` 代理的是最外层的对象，不包含嵌套的对象。可以打一个断点查看情况。

1. 运行了 `effect` 回调函数后，触发 `get` 方法
2. 调用 `trackReactive` 方法，收集依赖
3. 映射该对象
4. 判断它是不是 `ref` ，不是，返回原值，即一个普通的 `object` 对象

由上可以看出，解决方法是不要给它返回普通对象，而是做一个判断，如果是对象，那么就用 `reactive` 包裹一下，这样嵌套的对象也会被代理，从而收集依赖。

```ts
import { isObject } from '@vue/shared'; // [!code ++]
import { trackReactive, triggerReactive } from './dep.ts'
import { isRef } from './ref.ts'
import { reactive } from './reactive.ts' // [!code ++]

export const mutableHandlers = {
  get(target, key, recevier) {
    // 收集依赖
    trackReactive(target, key);
    // 保证访问器里的对象指向代理对象
    const res = Reflect.get(target, key, recevier);
    // 如果访问的是ref对象，则返回.value，否则返回本身
    if (isRef(res)) { // [!code ++]
      return res.value; // [!code ++]
    } // [!code ++]
    // 如果是对象，则返回代理对象 // [!code ++]
    if (isObject(res)) { // [!code ++]
      return reactive(res) // [!code ++]
    } // [!code ++]
    return res; // [!code ++]
  },
  set(target, key, newValue, recevier) {
    const oldValue = target[key];
    // 如果新值是ref对象，则直接赋值
    if (isRef(oldValue) && !isRef(newValue)) {
      oldValue.value = newValue;
      // 如果值是ref，更新后会自动触发sub的更新，所以不需要执行后续代码
      return res;
    }
    // 触发依赖
    const res = Reflect.set(target, key, newValue, recevier);
    // 如果新值和旧值不同，则触发更新
    if (hasChanged(newValue, oldValue)) triggerReactive(target, key, res);
    return res;
  },
};
```

## 总结

### 内容总结

1. `Proxy` 代理与依赖管理
  
  `reactive` 通过 `Proxy` 代理对象，在 `get` 中调用 `trackReactive` 收集依赖，在 `set` 中调用 `triggerReactive` 触发更新。依赖关系通过` WeakMap`（`对象→Map`）和 `Map`（`属性→Dep` 实例）的嵌套结构管理，每个 `Dep` 实例维护一个订阅者链表。

2. `this` 指向与递归代理
  
  使用 `Reflect.get/set` 的 `receiver` 参数确保访问器中的 `this` 指向代理对象。对于嵌套对象，在 `get` 中递归调用 `reactive` 实现深层代理，保证嵌套属性的响应性。

3. 重复代理与缓存机制
  
  通过 `WeakMap` 缓存原始对象到代理对象的映射，避免重复代理。`WeakSet` 标记已代理对象，防止代理对象再次被处理。

4. `Ref` 与 `Reactive` 集成
  
  `ref` 的值若为对象，自动用 `reactive` 包装。在 `Proxy` 的 `get` 中自动解包 ref 的 `.value`，`set` 中处理对 `ref` 属性的赋值，确保同步更新。

5. 性能优化
  
  `hasChanged` 函数通过 `Object.is` 比较新旧值，避免无变化时的冗余更新。`mutableHandlers` 抽离复用，提升代码结构清晰度。

### 时序图

![时序图](https://pic1.imgdb.cn/item/681f413c58cb8da5c8eb7432.png)