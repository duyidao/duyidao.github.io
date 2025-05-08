# Reactive 实现

前面实现 `ref` 的响应式，我们封装了 `link` 方法收集依赖和 `propagate` 方法触发依赖，因此 `reactive` 的实现可以复用。

在 <SpecialWords text="Vue" /> 官方源码中， `reactive` 都是接收一个对象，通过 `proxy` 代理对象，当访问对象的属性时，触发 `get` 代理，当修改对象的属性时，触发 `set` 代理。

在 `get` 方法调用 `link` 方法收集依赖，并使用 `Reflect.get` 映射返回值；在 `set` 方法中使用 `Reflect.set` 保存新值，调用 `propagate` 方法触发依赖，最后返回新值。

```ts
import { link, propagate } from './system.ts'
import { activeSub } from './effect.ts'

export const reactive = (obj) => {
  return createObjectReactive(obj)
}

export function createObjectReactive(obj) {
  const proxy = new Proxy(obj, {
    get(target, key) {
      console.log('target, key', target, key);
      // 收集依赖
      trackReactive(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      console.log('target, key, value', target, key, value);
      // 触发依赖
      const res = Reflect.set(target, key, value)
      triggerReactive(target, key, res)
      return res
    }
  })
  return proxy
}


function trackReactive(target, key) {
  link(dep, activeSub)
}

function triggerReactive(target, key) {
  propagate()
}
```

而 `link` 方法需要参数 `dep` 和 `sub` ，`sub` 可以引入 `activeSub` ，而 `dep` 是一个包含 `subs` 和 `subsTail` 的类实例对象。现在就是要思考怎么实现。

既然它需要一个包含 `subs` 和 `subsTail` 的类实例对象，那么我们可以创建一个类 `Dep`，并添加 `subs` 和 `subsTail` 两个属性。后续把这个类实例对象传给 `link` 方法生成节点绑定到链表上就好了。现在就是想用什么形式的数据格式保存 `reactive` 对象的属性。

在 <SpecialWords text="Vue" /> 官方源码中， `reactive` 会先创建一个 `WeakMap` 保存所有对象，值是一个对象；每一个对象是通过 `Map` 保存的，每一个属性值则是 `new Dep` 类实例对象。格式如下图所示：

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
  const proxy = new Proxy(obj, {
    get(target, key) {
      console.log('target, key', target, key);
      // 收集依赖
      trackReactive(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      console.log('target, key, value', target, key, value);
      // 触发依赖
      const res = Reflect.set(target, key, value)
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
    if (!depsMap) { // [!code ++]
      depsMap = new Map() // [!code ++]
      trackWeakMap.set(target, depsMap) // [!code ++]
    } // [!code ++]
    let dep = depsMap.get(key) // [!code ++]
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