# ref 和 reactive 在使用上的区别

## 区别

常见面试解答：`reactive` 用于定义对象或数组等复杂数据，不能定义基本类型；数字、字符串等基本类型用 `ref`。

这个回答不完全准确，下面从实际场景展开。

社区有一个争议：`ref` 和 `reactive` 都能声明对象和数组，该用哪个？

写一段代码验证：用 `reactive` 声明一个对象，定时器延时一秒后直接赋值。

```vue
<script setup>
const obj = reactive({})
console.log(obj) // Proxy {}

setTimeout(() => {
  obj = { a: 1, b: 2 }
  console.log(obj) // {a: 1, b: 2}
})
</script>

<template>
  <div>{{ obj }}</div>
</template>
```

运行后，一秒后页面没有变化。控制台显示：赋值前打印的是 `Proxy` 空对象，赋值后打印的是普通对象。`reactive` 声明的变量，直接赋值会丢失 `Proxy` 代理。

> [!IMPORTANT] 总结
> 由赋值方式决定。业务中采用直接赋值的方式，用 `ref`；采用修改属性值的方式，用 `reactive`。`ref` 和 `reactive` 的选择不取决于数据类型，而取决于该类型的改变方式是直接赋值替换还是修改属性。

## 一图流了解 Ref 源码

### 图解

![Ref原理](https://pic1.imgdb.cn/item/689d903a58cb8da5c824324c.png)

`ref` 的主要原理：

1. 调用 `ref` 方法时，会 `new` 一个 `RefImpl` 类创建实例对象

2. 判断参数是否是复杂数据类型（数组、对象）。如果是，调用 `reactive` 方法把对象包装为 `Proxy` 对象；数组还会包装为类数组，再给到 `._value`；简单数据类型（数字、字符串）直接给到 `._value`

   > [!WARNING] 注意
   >
   > 1. 类数组是把数组如 `[0, 1, 2]` 变成 `{0: 1, 1: 2, 2: 3}`，以索引为键名，值为键值
   > 2. `shallowRef` 不会把复杂数据类型包裹到 `Proxy` 对象内，直接放到 `._value` 下。因此通过 `shallowRef` 声明的对象，修改值不会触发更新，直接赋值才会，特定场景下有一定性能优化。

3. 通过 ES6 `class` 的 `get` 和 `set` 给对象一个 `value` 属性。访问 `value` 触发 `get`，返回 `this._value`；给 `value` 赋值触发 `set`，修改 `this._value` 并触发依赖更新

   > [!INFO] 提示
   >
   > 1. 打印对象时 `._value` 是高亮的，`.value` 是灰的。前者是实打实的赋值，后者通过 `get` 收集依赖、返回 `this._value`，触发 `set` 后更新依赖。
   > 2. 替换整个 `ref` 对象触发的是 `ref` 对象本身的 `set`；修改对象属性触发的是 `Proxy` 的 `get` 和 `set`。

### 源码

打开项目 `node_modules` 中 `vue` 依赖的 `dist/vue.global.js`，约 1440 行：

```js
function isRef(r) {
  return !!(r && r.__v_isRef === true)
}
function ref(value) {
  return createRef(value, false)
}
function shallowRef(value) {
  return createRef(value, true)
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}
```

`shallowRef` 和 `ref` 都调用了 `createRef`，区别是第二个参数传了不同的布尔值。

`createRef` 中先判断数据是否已是 `ref`，是则原样返回；否则 `new` 一个 `RefImpl`，传入变量和 `shallow` 标志。

`RefImpl` 类：

```js
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow
    this.dep = void 0
    this.__v_isRef = true
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value) // 赋值 ._value
  }
  get value() {
    trackRefValue(this)
    return this._value
  }
  set value(newVal) {
    const useDirectValue =
      this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal) // 后续赋值的对象也会包装为 reactive
      triggerRefValue(this, 4, newVal)
    }
  }
}
```

关键逻辑：

1. 保存 `shallow` 标志到 `this`
2. 判断是否 `shallowRef`：是则直接把 `value` 赋值给 `this._value`，否则调用 `toReactive` 方法
3. 没有直接给 `.value` 赋值。通过 `get` 收集依赖、返回 `this._value`；`set` 判断新值是否是对象，是则包装为 `Proxy`，不是则直接赋值，然后更新依赖

### 总结

1. `ref` 变量必须 `.value` 赋值，否则等于把 `ref` 变成普通数据，失去响应式
2. `ref` 的值如果是对象，内部对象可以响应式，因为引用类型会先包装成 `Proxy` 再赋值。所以 `ref` 的值如果是对象，可以修改其属性而引发响应式
3. 浅拷贝则对象不会被包装成 `Proxy`

## 一图了解 Reactive 原理

![Reactive原理](https://pic1.imgdb.cn/item/689d92a158cb8da5c824369c.png)

从源码入手。`vue.global.js` 约 1245 行：

::: code-group

```js [vue.global.js]
function reactive(target) {
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap,
  )
}
```

```js [createReactiveObject.js]
function createReactiveObject(
  target,
  isReadonly2,
  baseHandlers,
  collectionHandlers,
  proxyMap,
) {
  if (!isObject(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  if (target['__v_raw'] && !(isReadonly2 && target['__v_isReactive'])) {
    return target
  }
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  const targetType = getTargetType(target)
  if (targetType === 0 /* INVALID */) {
    return target
  }
  const proxy = new Proxy(
    target,
    targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers,
  )
  proxyMap.set(target, proxy)
  return proxy
}
```

```js [BaseReactiveHandler.js]
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly
    this._isShallow = _isShallow
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly,
      isShallow2 = this._isShallow
    if (key === '__v_isReactive') {
      return !isReadonly2
    } else if (key === '__v_isReadonly') {
      return isReadonly2
    } else if (key === '__v_isShallow') {
      return isShallow2
    } else if (key === '__v_raw') {
      if (
        receiver ===
          (isReadonly2
            ? isShallow2
              ? shallowReadonlyMap
              : readonlyMap
            : isShallow2
              ? shallowReactiveMap
              : reactiveMap
          ).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the reciever is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)
      ) {
        return target
      }
      return
    }
    const targetIsArray = isArray(target)
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver)
      }
      if (key === 'hasOwnProperty') {
        return hasOwnProperty
      }
    }
    const res = Reflect.get(target, key, receiver)
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res
    }
    if (!isReadonly2) {
      track(target, 'get', key)
    }
    if (isShallow2) {
      return res
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res)
    }
    return res
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2)
  }
  set(target, key, value, receiver) {
    let oldValue = target[key]
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue)
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue)
        value = toRaw(value)
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false
        } else {
          oldValue.value = value
          return true
        }
      }
    }
    const hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key)
    const result = Reflect.set(target, key, value, receiver)
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, 'add', key, value)
      } else if (hasChanged(value, oldValue)) {
        trigger(target, 'set', key, value, oldValue)
      }
    }
    return result
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key)
    const oldValue = target[key]
    const result = Reflect.deleteProperty(target, key)
    if (result && hadKey) {
      trigger(target, 'delete', key, void 0, oldValue)
    }
    return result
  }
  has(target, key) {
    const result = Reflect.has(target, key)
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, 'has', key)
    }
    return result
  }
  ownKeys(target) {
    track(target, 'iterate', isArray(target) ? 'length' : ITERATE_KEY)
    return Reflect.ownKeys(target)
  }
}
```

:::
它首先判断参数对象是否只读，如果只读没法设置 `get` 和 `set` ，原样返回。不是则调用 `createReactiveObject` 方法。

在 `createReactiveObject` 方法它首先判断是不是对象 `Object` ，不是就抛出警告；是对象属性，就 `new` 一个 `Proxy` 对象，最后在 `BaseReactiveHandler` 类里面设置 `get` 和 `set` 。`get` 主要收集依赖，`set` 主要修改值然后更新依赖。

## 使用区别总结

1. `ref` 用来处理基础类型
2. 对象的引用地址会改变，也需要用 `ref` 来处理

## 特殊场景

下面来看两个特殊场景：

1. 给 `ref` 赋值一个 `reactive`

   和直接 `ref` 一样 (但是注意此时 `shallowRef` 无效)

2. 给 `reactive` 赋值 `ref`

   一样的逻辑，对应的属性的值就是 `ref` 对象，可以利用这个给 `reactive` 赋值字符串，数字等

   ```js
   const obj = reactive(ref('add'))
   console.log(obj.value) // add

   const obj = reactive({ a: ref('add'), b: 2 })
   obj.a = 'update'
   console.log(obj.value) // {a: 'update', b: 2}
   ```
