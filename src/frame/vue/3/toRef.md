# toRef、toRefs、unRef、proxyRefs

## toRef

`toRef` 函数可以将一个响应式对象的属性转换为响应式引用，这样就可以在不直接修改原始对象的情况下，对对象的属性进行操作。

```html
<body>
  <script type="module">
    import { ref, effect, reactive, toRef } from "../dist/reactivity.esm.js";

    const state = reactive({
      count: 0,
      name: "John",
    });

    const countRef = toRef(state, "count");
    console.log("countRef.value", countRef.value);

    effect(() => {
      console.log(state.count); // 1
    });

    setTimeout(() => {
      countRef.value = 1;
    }, 1000);
  </script>
</body>
```

根据上面的示例代码，可以看出来，`toRef` 是一个函数，可以将一个响应式对象的属性转换为响应式引用，返回的是一个对象。

下面来实现一下。

::: code-group

```ts [ref.ts 函数版]
export function toRef(target, key) {
  return {
    get value() {
      return target[key];
    },
    set value(newValue) {
      target[key] = newValue;
    },
  };
}
```

```ts [ref.ts 类版]
class ObjectRefImpl {
  target;
  key;
  [ReactiveFlags.IS_REF] = true;
  constructor(target, key) {
    this.target = target;
    this.key = key;
  }

  get value() {
    return this.target[this.key];
  }

  set value(newValue) {
    this.target[this.key] = newValue;
  }
}

export function toRef(target, key) {
  return new ObjectRefImpl(target, key);
}
```

:::

## toRefs

`toRefs` 函数可以将一个响应式对象的多个属性转换为响应式。

```html
<body>
  <script type="module">
    import {
      ref,
      effect,
      reactive,
      toRef,
      toRefs,
    } from "../dist/reactivity.esm.js";

    const state = reactive({
      count: 0,
      name: "John",
    });

    const { count, name } = toRefs(state);

    effect(() => {
      console.log(state); // 1
    });

    setTimeout(() => {
      countRef.value = 1;
      name.value = "Jane";
    }, 1000);
  </script>
</body>
```

前面已经写过 `toRef` 了，这里实现 `toRefs` 功能就更简单了，只需要遍历对象的属性，将每个属性转换为响应式引用即可。

```ts [ref.ts]
export function toRefs(target, key) {
  const res = {};

  for (const key in target) {
    res[key] = toRef(target, key);
  }

  return res;
}
```

## unRef

`unRef` 函数可以将一个响应式引用转换为普通值。

```ts [ref.ts]
// 如果这个 target 是 ref，返回 target.value，否则返回 target
export function unRef(target) {
  return isRef(target) ? target.value : target;
}
```

## proxyRefs

`proxyRefs` 主要用于简化 `ref` 的 `.value` 操作，使代码更简洁。

```ts [ref.ts]
export function proxyRefs(target, key) {
  return new Proxy(target, {
    get(target, key, receiver) {
      /**
       * 自动解包 ref
       */
      const res = target[key];
      return unRef(res);
    },
    set(target, key, newValue, receiver) {
      const oldValue = target[key];
      /**
       * 浅层的 ref 操作
       */
      if (isRef(target[key]) && !isRef(newValue)) {
        oldValue.value = newValue;
        return true;
      }

      return Reflect.set(target, key, newValue, receiver);
    },
  });
}
```
