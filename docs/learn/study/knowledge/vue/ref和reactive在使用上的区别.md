# ref和reactive在使用上的区别

## 区别

在面试题八股文上关于这个问题的解答，大部分都是在说 `reactive` 一般用来定义对象或者数组这类复杂数据变量，不能定义基本类型。定义数字，字符串这些基本类型一般用 `ref` 。

这么回答，对也不对，下面采用一个话题来展开讨论。

目前网上有一个吵得沸沸扬扬的话题：`ref` 和 `reactive` 都可以声明对象和数组，那么是使用 `ref` 还是使用 `reactive` ？

在项目中试验一下，用 `reactive` 声明一个对象，定时器延时一秒后直接赋值。

```vue
<script setup>
const obj = reactive({})
console.log(obj) // Proxy {}

setTimeout(() => {
  obj = {a: 1, b: 2}
  console.log(obj) // {a: 1, b: 2}
})
</script>

<template>
  <div>{{ obj }}</div>
</template>
```

运行这段代码，一秒后页面没有发生改变。查看控制台，发现有打印了，只不过在赋值前打印是一个 `Proxy` 的空对象，赋值后打印的是一个有值的普通对象。对于 `reactive` 声明的变量，直接赋值会让它失去 `Proxy` 代理。

> [!NOTE] 💡 总结
> 由赋值方式来决定。如果在业务中是直接赋值的方式，采用 `ref` 来声明变量；如果是修改值的方式，则采用 `reactive` 。使用 `ref` 和 `reactive` 并不是取决于声明什么数据类型，而是该类型的改变方式是直接赋值替换还是修改属性。

## 一图流了解Ref源码

### 图解

![原理](https://pic.imgdb.cn/item/6629d2c90ea9cb1403aa50b7.png)

从图中不难看出，`ref` 的主要原理是：

1. 调用 `ref` 方法声明对象时，会调用一个 `RefImpl` 类，`new` 这个类创建一个实例对象

2. 判断当前参数是否是复杂数据类型（如数组、对象）。如果是，它会调用 `reactive` 方法把对象包装为 `Proxy` 对象，如果是数组还会把数组包装为类数组，再给到 `._value` ；如果是简单数据类型（如数字、字符串等）则直接给到 `._value` 

    > [!WARNING] ⚠ 注意
    > 1. 类数组是通过包装后把数组如 `[0, 1, 2]` 变成一个对象 `{0: 1, 1: 2, 2: 3}`，以索引为键名，值为键值
    > 2. `shallowRef` 不会把复杂数据类型包裹到 `Proxy` 对象内，直接放到 `._value` 下。因此通过 `shallowRef` 声明的对象，修改值不会触发更新，直接赋值才会，这样在特殊场景下会有一定的性能优化。

3. 通过 ES6 中 `class` 的写法，通过 `get` 和 `set` 给对象一个 `value` 属性，当访问 `value` 属性时，会触发 `get` ，返回 `this._value` ，当给 `value` 赋值时，会触发 `set` ，修改 `this._value` 的值，并触发依赖更新

    > [!NOTE] 🔔 提示
    > 1. 通过打印也可以看到，`._value` 是高亮的，`.value` 是灰的。因为前者是实打实的赋值，后者没有赋值，而是通过 `get` 收集依赖，返回 `this._value` ，触发 `set` 后更新依赖。
    >
    > 2. 如果替换整个 `ref` 对象，是触发整个 `ref` 对象其本身的 `set` ；如果修改对象属性，本质上触发的是 `Proxy` 的 `get` 和 `set` 。

### 源码

下面通过阅读源码的方式看一下他做了什么处理。打开项目的 `node_modules` 文件夹，找到 `vue` 依赖的 `dist` 文件夹下的 `vue.global.js` 文件，在 1440 行左右有这么段代码：

```js
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
```

可以看到 `shallowRef` 和 `ref` 都调用了 `createRef` 这个方法，区别是第二个参数传了不一样的布尔值。

在 `createRef` 函数中首先判断该数据是否是 `ref` 了，如果是则不做处理，直接原样返回参数；不是 `ref` ，则 `new` 一个 `RefImpl` ，传入两个参数：变量和是否 `shallowRef` 。

然后看看 `RefImpl` 类，代码如下：

```js
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value); // 赋值 ._value
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal); // 后续赋值的对象也会包装为 reactive
      triggerRefValue(this, 4, newVal);
    }
  }
}
```

重点的几个代码处理如下：

1. 保存接收的 `isShallowRef` 参数保存到 `this` 内
2. 判断是否是通过 `shallowRef` 声明的变量，如果是直接把 `value` 赋值给 `this._value` ，否则调用 `toReactive` 方法
3. 没有直接给 `.value` 赋值。而是通过 `get` 部分收集依赖，返回 `this._value` ； `set` 部分判断新赋值的键是否是对象，如果是对象就包装为 `Proxy` ，不是直接赋值。然后更新依赖

### 总结

1. `ref` 得到变量必须 `.value` 赋值，不然等于把 `ref` 变成了普通的数据，失去响应式
2. `ref` 的值如果是对象，里面的对象可以是响应式的，因为引用类型会先包装成 `Proxy` 再赋值。所以 `ref` 的值如果是对象，可以修改其中的属性而引发响应式
3. 如果是浅拷贝则对象不会被包装成 `Proxy` 

## 一图了解Reactive原理

![reactive原理](https://pic.imgdb.cn/item/662a1bed0ea9cb1403593253.png)

下面直接从源码入手搭配看看。还是 `vue.global.js` 文件，第 1245 行左右，代码如下：
::: code-group
```js [vue.global.js]
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
```
```js [createReactiveObject.js]
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0 /* INVALID */) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
```
```js [BaseReactiveHandler.js]
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
```
:::
它首先判断参数对象是否只读，如果只读没法设置 `get` 和 `set` ，原样返回。不是则调用 `createReactiveObject` 方法。

在 `createReactiveObject` 方法它首先判断是不是对象 `Object` ，不是就抛出警告；是对象属性，就 `new` 一个 `Proxy` 对象，最后在 `BaseReactiveHandler` 类里面设置 `get` 和 `set` 。`get` 主要收集依赖，`set` 主要修改值然后更新依赖。

## 特殊场景

下面来看两个特殊场景：

1. 给 `ref` 赋值一个 `reactive`

   和直接 `ref` 一样 (但是注意此时 `shallowRef` 无效)

2. 给 `reactive` 赋值 `ref`

   一样的逻辑，对应的属性的值就是 `ref` 对象，可以利用这个给 `reactive` 赋值字符串，数字等

   ```js
   const obj = reactive(ref('add'));
   console.log(obj.value); // add

   const obj = reactive({a: ref('add'), b: 2});
   obj.a = 'update';
   console.log(obj.value); // {a: 'update', b: 2}
   ```