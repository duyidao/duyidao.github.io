# watch

## 知识点回顾

先来回顾一个之前提到的知识点。先看一下示例代码：

```html
<script type="module">
  import { ref, effect, computed } from "../dist/reactivity.esm.js";

  let count = ref(1);

  effect(
    () => {
      console.log("我就执行了一次");
      count.value;
    },
    {
      scheduler: () => {
        console.log("scheduler 执行了");
      },
    },
  );

  setTimeout(() => {
    count.value += 2;
  }, 1000);
</script>
```

在 [前面的章节](/vue/3/ref_start#scheduler-调度器) 中，讲到 `effect` 可以接收第二个参数 `options`，其中包含 `scheduler` 函数。如果传了这个函数，那么 `effect` 会在 `scheduler` 函数中执行，不再执行第一个回调函数，该函数仅仅起一个收集依赖调度的作用。

打印结果如下：

![打印结果](https://pic1.imgdb.cn/item/696c789fcc965d6157f6cc39.png)

而 `watch` 的用法和这一致，在源码中，`watch` 就是基于 `effect` 实现的。

## watch 基本实现

`watch` 是一个函数，接收三个参数：`source`、`callback`、`options`。其中：

- `source` 是要监听的响应式数据，可以是 `ref`、`computed` 等，也可以是一个函数。
- `callback` 是回调函数，当 `source` 发生变化时调用。可以接收两个参数，分别是新值 `newValue` 和旧值 `oldValue`。
- `options` 是可选参数，是一个对象。

由于第一个参数 `source` 有两种类型，所以需要通过 `isRef` 函数来判断一下，如果是 `ref` 类型，则新建一个函数 `getter`，返回 `source.value`。

函数 `getter` 作为 `new ReactiveEffect()` 的参数，用于执行响应式函数。

运行 `effect.run()`，获取 `source` 的当前值作为旧值 `oldValue`。

然后定义一个函数 `job`，用于执行 `effect.run()`，获取新值 `newValue`，并调用回调函数 `callback`，将新值和旧值作为参数传入。此时的新值赋值给 `oldValue`，作为下一次的旧值。

最后，将 `job` 赋值给 `effect.scheduler`，这样当 `source` 发生变化时，就会执行 `job` 函数，从而触发回调函数 `callback`。

基于上面的描述，先来搭建一个简单的 `watch` 函数。
完整代码如下：

```ts
import { isRef } from "./ref";
import { ReactiveEffect } from "./effect";
export const watch = (source, callback, options) => {
  let getter;

  if (isRef(source)) {
    getter = () => source.value;
  }

  const effect = new ReactiveEffect(getter);
  let oldValue = effect.run();

  function job() {
    // 执行 effect.run()，获取 getter 的返回值。这里不能直接执行 getter，否则无法收集依赖。
    const newValue = effect.run();
    // 执行回调函数，将新值和旧值作为参数传入。
    callback(newValue, oldValue);
    // 将新值赋值给旧值，作为下一次的旧值。
    oldValue = newValue;
  }

  effect.scheduler = job;

  return () => {};
};
```

## watch 的返回值

`watch` 函数返回一个函数，用于停止监听 `source` 的变化。

目前的 `effect` 还未实现 `stop` 方法，因此需要加上。

如何实现停止监听 `source` 的变化呢？

我们来回顾一下 [startTrack 和 endTrack](/vue/3/ref_advance#方法实现) 函数。

```ts [system.ts]
export function startTrack(sub) {
  sub.depsTail = undefined;
  sub.trackShaking = true;
}

export function endTrack(sub) {
  const depsTail = sub.depsTail;
  sub.trackShaking = false;
  sub.dirty = false;
  if (depsTail) {
    if (depsTail.nextDep) {
      clearTracking(depsTail.nextDep);
      depsTail.nextDep = undefined;
    }
  } else if (sub.deps) {
    clearTracking(sub.deps);
    sub.deps = undefined;
  }
}
```

它的作用是判断当前的依赖项链表是否还有数据。如果先调用 `startTrack` 函数，然后直接调用 `endTrack` 函数，此时有头节点，没有尾节点，则会调用 `clearTracking` 函数，清除全部的依赖。

因此，`new ReactiveEffect()` 需要添加一个 `active` 参数，用于判断是否激活。再添加一个方法 `stop`，用于停止收集依赖。

::: code-group

```ts [effect.ts]
export class ReactiveEffect {
  deps: Link | undefined;
  depsTail: Link | undefined;
  active = true; // [!code ++]

  constructor(public fn) {}

  run() {
    // [!code ++]
    if (!this.active) {
      // [!code ++]
      return this.fn(); // 如果已经停止了，则不再收集依赖，直接执行函数
      // [!code ++]
    }

    // 把当前的 effect 保存，后面执行完 fn 函数后再获取
    let prevSub = activeSub;
    // 每次执行都把 fn 放到 activeSub 中，让 reactivity 收集依赖
    setActiveEffect(this);
    startTrack(this);
    try {
      return this.fn();
    } finally {
      endTrack(this);
      setActiveEffect(prevSub);
    }
  }

  // ... 省略代码

  // [!code ++]
  stop() {
    // [!code ++]
    // 停止收集依赖
    // [!code ++]
    if (this.active) {
      // [!code ++]
      startTrack(this);
      // [!code ++]
      endTrack(this);
      // [!code ++]
      this.active = false;
      // [!code ++]
    }
    // [!code ++]
  }
}
```

```ts [watch.ts]
import { isRef } from "./ref";
import { ReactiveEffect } from "./effect";

export const watch = (source, callback, options) => {
  let getter;

  if (isRef(source)) {
    getter = () => source.value;
  }

  const effect = new ReactiveEffect(getter);
  let oldValue = effect.run();

  function job() {
    // 执行 effect.run()，获取 getter 的返回值。这里不能直接执行 getter，否则无法收集依赖。
    const newValue = effect.run();
    // 执行回调函数，将新值和旧值作为参数传入。
    callback(newValue, oldValue);
    // 将新值赋值给旧值，作为下一次的旧值。
    oldValue = newValue;
  }

  effect.scheduler = job;

  // 移除 effect 依赖 // [!code ++]
  // [!code ++]
  function stop() {
    effect.stop(); // [!code ++]
  } // [!code ++]

  return () => {
    stop(); // [!code ++]
  };
};
```

:::

当依赖不处于激活状态时，`run` 方法不再收集依赖，直接当作普通函数执行。

## watch 的选项

`watch` 函数的第三个参数 `options` 是一个对象，先考虑三个常用的属性：

- `immediate`：是否立即执行回调函数。默认为 `false`。如果为 `true`，则在 `watch` 函数执行时，立即执行一次回调函数。
- `deep`：是否深度监听。默认为 `false`。如果为 `true`，则监听对象内部的变化。
- `once`：是否只执行一次。默认为 `false`。如果为 `true`，则在 `watch` 函数执行时，只执行一次回调函数。

### immediate 选项

首先看看 `immediate` 选项。该参数为 `true` 时，立即执行一次回调函数。

前面我们已经写了一个 `job` 函数，用于拿到 `source` 的当前值作为新值 `newValue`，并调用回调函数 `callback`，将新值和旧值作为参数传入。还声明了一个变量 `oldValue`，用于保存旧值。

因此，当 `immediate` 选项为 `true` 时，则立即执行一次 `job` 方法即可。为 `false` 时才为 `oldValue` 赋值。

```ts [watch.ts]
export const watch = (source, callback, options) => {
  const { immediate, deep, once } = options || {}; // [!code ++]
  let getter;
  let oldValue; // [!code ++]

  if (isRef(source)) {
    getter = () => source.value;
  }

  const effect = new ReactiveEffect(getter);
  // [!code ++]
  if (immediate) {
    job(); // [!code ++]
    // [!code ++]
  } else {
    oldValue = effect.run(); // [!code ++]
  } // [!code ++]

  function job() {
    // 执行 effect.run()，获取 getter 的返回值。这里不能直接执行 getter，否则无法收集依赖。
    const newValue = effect.run();
    // 执行回调函数，将新值和旧值作为参数传入。
    callback(newValue, oldValue);
    // 将新值赋值给旧值，作为下一次的旧值。
    oldValue = newValue;
  }

  effect.scheduler = job;

  // 移除 effect 依赖
  function stop() {
    effect.stop();
  }

  return () => {
    stop();
  };
};
```

### once 选项

`once` 选项为 `true` 时，则只执行一次 `job` 方法，并调用 `stop` 方法停止监听。

如何实现呢？

新建一个 `_cb` 函数，默认等于 `callback`。修改 `callback` 回调，先执行 `_cb` 函数，再执行 `stop` 方法，清空依赖停止监听。

```ts [watch.ts]
export const watch = (source, callback, options) => {
  const { immediate, deep, once } = options || {};
  let getter;
  let oldValue;

  // [!code ++]
  if (once) {
    // 只需要调用一次，先保存callback函数，调用_callback函数，再调用stop方法，清空依赖停止监听 // [!code ++]
    const _cb = callback; // [!code ++]
    // [!code ++]
    callback = (...args) => {
      _cb(...args); // [!code ++]
      stop(); // [!code ++]
    }; // [!code ++]
  } // [!code ++]

  if (isRef(source)) {
    getter = () => source.value;
  }

  const effect = new ReactiveEffect(getter);
  if (immediate) {
    job();
  } else {
    oldValue = effect.run();
  }

  function job() {
    // 执行 effect.run()，获取 getter 的返回值。这里不能直接执行 getter，否则无法收集依赖。
    const newValue = effect.run();
    // 执行回调函数，将新值和旧值作为参数传入。
    callback(newValue, oldValue);
    // 将新值赋值给旧值，作为下一次的旧值。
    oldValue = newValue;
  }

  effect.scheduler = job;

  // 移除 effect 依赖
  function stop() {
    effect.stop();
  }

  return () => {
    stop();
  };
};
```

### deep 选项

`deep` 选项为 `true` 时，则监听对象内部的变化。

想要深度监听，则需要递归遍历对象，为对象的每一个属性都添加一个 `watch` 监听。

#### 递归遍历对象

如何实现呢？

创建一个函数 `traverse`，用于递归遍历对象。如果传入的参数不是对象，则直接返回。如果传入的参数是对象，则遍历对象的每一个属性，递归调用 `traverse` 函数。

判断 `deep` 的值，如果为 `true`，拷贝一份 `getter`，再调用 `traverse` 函数，遍历对象的每一个属性，将返回值赋值给 `getter`。

```ts [watch.ts]
import { isObject } from "@vue/shared"; // [!code ++]

export const watch = (source, callback, options) => {
  const { immediate, deep, once } = options || {};
  let getter;
  let oldValue;

  if (once) {
    // 只需要调用一次，先保存callback函数，调用_callback函数，再调用stop方法，清空依赖停止监听
    const _cb = callback;
    callback = (...args) => {
      _cb(...args);
      stop();
    };
  }

  if (isRef(source)) {
    getter = () => source.value;
  }

  // [!code ++]
  if (deep) {
    const baseGetter = getter; // [!code ++]
    getter = () => traverse(baseGetter()); // [!code ++]
  } // [!code ++]

  const effect = new ReactiveEffect(getter);
  if (immediate) {
    job();
  } else {
    oldValue = effect.run();
  }

  function job() {
    // 执行 effect.run()，获取 getter 的返回值。这里不能直接执行 getter，否则无法收集依赖。
    const newValue = effect.run();
    // 执行回调函数，将新值和旧值作为参数传入。
    callback(newValue, oldValue);
    // 将新值赋值给旧值，作为下一次的旧值。
    oldValue = newValue;
  }

  effect.scheduler = job;

  // 移除 effect 依赖
  function stop() {
    effect.stop();
  }

  return () => {
    stop();
  };
};

// [!code ++]
function traverse(value) {
  // [!code ++]
  if (!isObject(value)) {
    return; // [!code ++]
  } // [!code ++]
  // [!code ++]
  for (const key in value) {
    traverse(value[key]); // [!code ++]
  } // [!code ++]
  return value; // [!code ++]
}
```

#### 对象循环引用

当对象存在循环引用时，就会触发 BUG，如下所示：

```js
let state = ref({
  a: {
    b: 1,
  },
});
state.value.c = state.value;

const stop = watch(
  state,
  (newValue, oldValue) => {
    console.log(newValue, oldValue);
  },
  {
    deep: true,
  },
);
```

![报错信息](https://pic1.imgdb.cn/item/696c9104e8f4cc17ae65a7ca.png)

提示栈溢出。

而如何解决对象循环引用问题，可以参考文档 [如何判断对象是否存在循环引用](/learn/js/objectLoop) ，这里不做赘述，直接修改 `traverse` 函数。

```ts [watch.ts]
// [!code ++]
function traverse(value, seen = new Set()) {
  if (!isObject(value)) {
    return;
  }
  // [!code ++]
  // 如果当前对象有存储到集合内，说明有循环引用
  // [!code ++]
  if (seen.has(value)) return value;
  // [!code ++]
  seen.add(value);
  for (const key in value) {
    // [!code ++]
    traverse(value[key], seen);
  }
  return value;
}
```

#### deep 层级监听

假设我有一个对象，层级特别深。

```js
let state = ref({
  a: {
    e: 1,
    b: {
      c: {
        d: 2,
      },
    },
  },
});
```

我只想要它监听至多 2 层，后续层级我不需要监听，节约性能。如何实现呢？

判断 `deep` 的值，如果为 `true`，则需要递归遍历对象的每一个属性，把无穷大赋值给 `depth` 变量；如果不是 `true`，说明需要监听至多 `deep` 层。

修改 `traverse` 函数，添加一个参数 `depth`，用于控制递归的深度。

```ts [watch.ts]
export const watch = (source, callback, options) => {
  // ...  省略代码

  if (deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep; // 拿到需要监听的层级，为 true 则监听无穷大层 // [!code ++]
    getter = () => traverse(baseGetter(), depth);
  }

  // ...  省略代码
};

// [!code ++]
function traverse(value, depth = Infinity, seen = new Set()) {
  // [!code ++]
  if (!isObject(value) || depth <= 0) {
    return;
  }
  // 如果当前对象有存储到集合内，说明有循环引用
  if (seen.has(value)) return value;
  seen.add(value);
  // [!code ++]
  depth--;
  for (const key in value) {
    // [!code ++]
    traverse(value[key], depth, seen);
  }
  return value;
}
```

## watch 监听 reactive

目前监听的都是 `ref` 类型的响应式数据，而 `reactive` 类型的响应式数据，需要特殊处理。现在修改变量 `state` 为 `reactive` 类型，看看效果。

```html
<script type="module">
  import {
    ref,
    reactive,
    effect,
    computed,
    watch,
  } from "../dist/reactivity.esm.js";

  let state = reactive({
    a: {
      g: 1,
      b: {
        e: 1,
        c: {
          d: 2,
        },
      },
    },
  });

  const stop = watch(
    state,
    (newValue, oldValue) => {
      console.log(newValue, oldValue);
    },
    {
      // deep: 2,
    },
  );

  setTimeout(() => {
    state.a.b.e += 2;
  }, 1000);
</script>
```

![打印结果](https://pic1.imgdb.cn/item/696c9632e8f4cc17ae65d620.png)

再看看官方的 `watch`，它监听 `reactive` 类型的数据，直接默认深度监听。如果用户传了 `deep`，则以用户传的层级监听为主。

回到代码，在 `if(isRef(source))` 判断之后，再添加一个 `else if (isReactiveObject(source))` 的判断，如果 `source` 是 `reactive` 类型的响应式数据，则直接返回 `source`，并判断用户是否传 `deep`，没传则默认为 `true`；传了则不修改。

```ts [watch.ts]
import { isReactive } from "./reactive"; // [!code ++]

export const watch = (source, callback, options) => {
  // ...  省略代码

  if (isRef(source)) {
    // 如果是 ref，访问 ref.value 收集依赖
    getter = () => source.value;
    // [!code ++]
  } else if (isReactive(source)) {
    getter = () => source; // [!code ++]
    // 如果是 reactive，用户没传deep，默认为true // [!code ++]
    // [!code ++]
    if (!deep) {
      deep = true; // [!code ++]
    } // [!code ++]
    // [!code ++]
  } else if (isFunction(source)) {
    getter = source; // [!code ++]
  } // [!code ++]

  // ...  省略代码
};
```

## watch 清理操作

看一段示例代码：

```html
<body>
  <div id="app"></div>
  <div id="dv"></div>
  <button id="btn">点击我</button>
  <script type="module">
    import { ref, watch } from "../dist/reactivity.esm.js";

    const app = document.getElementById("app");
    const dv = document.getElementById("dv");
    const btn = document.getElementById("btn");
    const flag = ref(true);

    watch(
      () => flag.value,
      (newValue, oldValue, onClearup) => {
        console.log("newValue", newValue);
        if (newValue) {
          app.addEventListener("click", () => {
            console.log("app了");
          });
        } else {
          dv.addEventListener("click", () => {
            console.log("dv了");
          });
        }
      },
    );

    btn.addEventListener("click", () => {
      flag.value = !flag.value;
    });
  </script>
</body>
```

点击按钮，`flag` 的值会改变，从而触发 `watch` 的回调函数，在回调函数中，我们分别给 `app` 和 `dv` 添加了点击事件。两个 `div` 会根据 `flag` 的值来判断是 `app` 还是 `dv` 而绑定点击事件。

但是目前有一个 BUG，点击按钮后，`app` 依旧会保留点击事件，并没有清除。

官方的 `watch` 是如何解决这个问题的呢？`watch` 第二个参数的回调参数可以接收第三个参数 `onClearup`，接收一个回调，用于清除上一次的 `callback` 监听。

```html
<body>
  <div id="app"></div>
  <div id="dv"></div>
  <button id="btn">点击我</button>
  <script type="module">
    import { ref, watch } from "../dist/reactivity.esm.js";

    const app = document.getElementById("app");
    const dv = document.getElementById("dv");
    const btn = document.getElementById("btn");
    const flag = ref(true);

    watch(
      () => flag.value,
      (newValue, oldValue, onClearup) => {
        const dom = newValue ? app : dv;
        const clickFn = () => {
          console.log(dom + "了");
        };
        dom.addEventListener("click", clickFn);
        onClearup(() => {
          dom.removeEventListener("click", clickFn);
        });
      },
    );

    btn.addEventListener("click", () => {
      flag.value = !flag.value;
    });
  </script>
</body>
```

接下来实现该功能。

首先声明一个 `clearup` 变量，用于清除上一次的监听回调，默认为 `null`。

接着声明一个函数 `onClearup`，用于清除上一次的监听回调，将回调函数赋值给 `clearup`。

`onClearup` 函数的时机时机则在 `job` 函数中，在执行 `callback` 之前做判断，如果 `clearup` 不为 `null`，则调用 `clearup` 函数，清除上一次的监听回调，再把 `clearup` 赋值为 `null`。

```ts [watch.ts]
export const watch = (source, callback, options) => {
  // ...  省略代码

  const effect = new ReactiveEffect(getter);

  let clearup = null; // [!code ++]

  // 立即执行一次
  if (immediate) {
    job();
  } else {
    oldValue = effect.run();
  }

  // [!code ++]
  function onClearup(fn) {
    clearup = fn; // [!code ++]
  } // [!code ++]

  function job() {
    // 清空上一次的依赖 // [!code ++]
    // [!code ++]
    if (clearup) {
      clearup(); // [!code ++]
      clearup = null; // 重置依赖函数  // [!code ++]
    } // [!code ++]
    // 执行 effect.run()，获取 getter 的返回值。这里不能直接执行 getter，否则无法收集依赖。
    const newValue = effect.run();
    // 执行回调函数，将新值和旧值作为参数传入。
    callback(newValue, oldValue, onClearup);
    // 将新值赋值给旧值，作为下一次的旧值。
    oldValue = newValue;
  }

  // ...  省略代码
};
```

## 总结

### 内容总结

如果传了 `once`，则先保存 `callback` 函数赋值为 `_cb`，调用 `_cb` 函数后，再调用 `stop` 方法，清空依赖停止监听。

判断 `source` 的类型。

- 为 `ref`，访问 `ref.value` 收集依赖。
- 为 `reactive`，直接返回 `source`，并判断用户是否传 `deep`，没传则默认为 `true`；传了则不修改。
- 为 `function`，直接返回 `source`。

如果传了 `immediate`，则立即执行一次 `callback` 函数。反之调用 `effect.run()`，获取旧值 `oldValue`。

如果传了 `deep`，则先保存 `getter` 的值为 `baseGetter`，然后递归遍历对象的每一个属性，将返回值赋值给 `getter`。

声明一个函数 `job`，判断 `clearup` 是否为 `null`，如果为 `null`，则调用 `clearup` 函数，清除上一次的监听回调，再把 `clearup` 赋值为 `null`。

调用 `effect.run()`，获取新值 `newValue`，再调用回调函数 `callback`，将新值和旧值作为参数传入。将新值赋值给 `oldValue`，作为下一次的旧值。

将 `job` 赋值给 `effect.scheduler`，这样当 `source` 发生变化时，就会执行 `job` 函数，从而触发回调函数 `callback`。

最后，返回一个函数 `stop`，用于停止监听 `source` 的变化。

### 时序图

![时序图](https://pic1.imgdb.cn/item/696cad3ee8f4cc17ae660550.png)
