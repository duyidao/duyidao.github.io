# 数组的响应式

## 场景复现

先来看一段示例代码：

```html
<body>
  <script type="module">
    import { ref, effect, reactive } from "../dist/reactivity.esm.js";

    let data = reactive([1, 2, 3, 4, 5]);

    effect(() => {
      console.log("effect", data[3]);
    });

    setTimeout(() => {
      data.length = 2;
    }, 1000);
  </script>
</body>
```

在 `effect` 中访问了数组的第4个元素，当数组的长度改变时，数组只有前两个元素了，按理来说 `effect` 应该要重新执行。查看控制台，发现它并没有重新执行。

如何解决这个问题呢？

## 长度修改触发 effect

查看 `mutableHandlers` 中的 `set` 方法，当值发生改变时，会触发 `triggerReactive` 方法，从而触发 `effect` 的更新。

再看 `triggerReactive` 方法：

```ts
export function triggerReactive(target, key, res) {
  const depsMap = trackWeakMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (!dep) return;

  propagate(dep.subs);
}
```

它会对 `trackWeakMap` 中的 `depsMap` 进行遍历，此时我们就可以对 `depsMap` 做判断了。如果它的类型是 `Array` 数组类型，则获取到它的长度。

接着遍历 `depsMap` 中的 `dep` （即数组的每一项索引），调用 `propagate` 方法，从而触发 `effect` 的更新。

```ts [dep.ts]
export function triggerReactive(target, key, res) {
  const depsMap = trackWeakMap.get(target);
  if (!depsMap) return;

  // 如果是数组且更新了length，判断是否修改到它的length // [!code ++]
  // [!code ++]
  if (Array.isArray(target) && key === "length") {
    const length = target.length; // [!code ++]
    // [!code ++]
    depsMap.forEach((dep, depKey) => {
      // [!code ++]
      /**
        // [!code ++]
       * 通知访问了当前索引大于等于length的effect；和访问了数组的length的effect更新
       // [!code ++]
      // [!code ++]
       */
      // [!code ++]
      if (depKey >= length || depKey === "length") {
        propagate(dep.subs); // [!code ++]
      } // [!code ++]
    }); // [!code ++]
  } // [!code ++]
  // 修改的不是数组，或者没修改数组的length，走旧逻辑 // [!code ++]
  // [!code ++]
  else {
    const dep = depsMap.get(key);
    if (!dep) return;
    propagate(dep.subs);
  } // [!code ++]
}
```

## 隐式更新length

一般的，用户更多会使用 `push`、`pop`、`shift`、`unshift` 等方法来修改数组，这些也会修改数组的长度。但是目前的代码并不会通知 `effect` 更新。

```html
<body>
  <script type="module">
    import { ref, effect, reactive } from "../dist/reactivity.esm.js";

    let data = reactive([1, 2, 3, 4, 5]);

    effect(() => {
      console.log("data.length", data.length);
    });

    setTimeout(() => {
      // data.length = 2
      data.push(6);
    }, 1000);
  </script>
</body>
```

那么，要怎么知道它触发了隐式更新呢？

不管用户对数组做了什么操作，都先拿一下数组的长度，等待数组数据更新后，再拿一下数组最新的长度，如果长度不同，说明数组数据更新了，从而触发 `effect` 的更新。

从哪里获取旧值和新值呢？

`mutableHandlers` 对象中的 `set` 方法，在 `triggerReactive` 之前，获取到了旧值 `oldValue`；`triggerReactive` 后的 `target`，就是新值。然后二者做长度判断即可。

```ts [baseHandlers.ts]
export const mutableHandlers = {
  get(target, key, recevier) {
    // 收集依赖
    trackReactive(target, key);
    // 保证访问器里的对象指向代理对象
    const res = Reflect.get(target, key, recevier);
    // 如果访问的是ref对象，则返回.value，否则返回本身
    if (isRef(res)) {
      return res.value;
    }

    // 如果是对象，则返回代理对象
    if (isObject(res)) {
      return reactive(res);
    }

    return res;
  },
  set(target, key, newValue, recevier) {
    const oldValue = target[key];
    // 判断是不是数组 // [!code ++]
    const targeyIsArray = Array.isArray(target); // [!code ++]
    // 获取到数组长度旧值，不是数组直接默认0 // [!code ++]
    const oldLength = targeyIsArray ? target.length : 0; // [!code ++]
    // 如果新值是ref对象，则直接赋值
    if (isRef(oldValue) && !isRef(newValue)) {
      oldValue.value = newValue;
      // 如果值是ref，更新后会自动触发sub的更新，所以不需要执行后续代码
      return newValue;
    }
    // 触发依赖
    const res = Reflect.set(target, key, newValue, recevier);
    // 如果新值和旧值不同，则触发更新
    if (hasChanged(newValue, oldValue)) triggerReactive(target, key, res);
    // 获取到数组长度新值，不是数组直接默认0 // [!code ++]
    const newLength = targeyIsArray ? target.length : 0; // [!code ++]
    // 如果数组长度更新了，说明数组数据更新了，从而触发 effect 的更新。 // [!code ++]
    // [!code ++]
    if (targeyIsArray && newLength !== oldLength && key !== "length") {
      triggerReactive(target, "length", newLength); // [!code ++]
    } // [!code ++]
    return res;
  },
};
```

> [!WARNING]
>
> 这里的 `key` 不能等于 `length`，否则会触发无限递归。这里处理的只是隐式更新 `length` 的情况。

## 其他情况

下面没有其他的改动了，看看代码，走走流程。

如果 `target[key]` 是一个 `ref` 类型，则直接赋值，在 `get` 方法中直接返回值。后续代码不需要执行，因此也无需考虑这种情况。

## 总结

当数组长度发生变化时（如 `data.length = 2`），原本依赖于数组元素的 `effect` 不会正确更新，导致响应式失效。

解决方案

1. 长度修改触发 `effect`

   在 `triggerReactive` 方法中增加对数组长度修改的特殊处理

   当 `key` 为 `"length"` 时，遍历所有依赖项，通知索引大于等于新长度的依赖更新

2. 隐式更新 `length` 处理

   在 `set` 方法中记录修改前后的数组长度

   当通过 `push`、`pop` 等方法隐式修改数组长度时，主动触发 `length` 的依赖更新

   注意避免 `key === "length"` 时的无限递归
