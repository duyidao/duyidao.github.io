---
title: Vue 组件状态重置
author:
  - 远方os 如何重置vue组件的状态&https://www.douyin.com/user/MS4wLjABAAAAGUvGqSgUb8n2mLUU9SOa5wmdZy-Sj5_FUt-DK5Iu6PpxO1QgrJ1_vXy6ikzz_Q4h?from_tab_name=main&is_search=0&list_name=follow&modal_id=7436373870610795814&nt=0
  - 远方os vue组件状态重置之reactive&https://www.douyin.com/user/MS4wLjABAAAAGUvGqSgUb8n2mLUU9SOa5wmdZy-Sj5_FUt-DK5Iu6PpxO1QgrJ1_vXy6ikzz_Q4h?from_tab_name=main&is_search=0&list_name=follow&modal_id=7436735383968206130&nt=0
---

# Vue 组件状态重置

## 场景

业务中有重置按钮，需要把用户修改的值重置为最开始的默认旧值，之前的写法是这么写的：

```js
const state = ref({
  a: 1,
  b: 2,
  c: [1, 2, 3],
});

const reset = () => {
  state.value = {
    a: 1,
    b: 2,
    c: [1, 2, 3],
  };
};
```

如果属性少可以这么写，但是当属性多的时候，每次重置都要写一遍，很麻烦，且后续维护也需要更多的功夫。所以需要优化一下。

## ref

### 传入函数式

第一个写法可以使用函数式写法，声明一个函数，接收一个回调函数，返回最开始的默认值，后面需要重置的时候，只需要把值重新赋值回去就可以了。

::: code-group

```ts [index.ts]
export function useResettableRefFn<T>(cb: () => T) {
  const state = ref(cb());
  const reset = () => {
    state.value = cb();
  };
  return { state, reset };
}
```

```ts [index.vue]
import { useResettableRefFn } from "./index";

const { state, reset } = useResettableRefFn(() => ({
  a: 1,
  b: 2,
  c: [1, 2, 3],
}));
reset(); // 重置
```

:::

由于传入的是一个函数，重新赋值时是一个新的对象地址，因此不会造成变量内存冲突，每一次都是新值。

但是这个方法缺点是必须传入一个函数，步骤繁琐。如果只想传入对象，则需要重写修改一下。

### 传入对象式

修改为接收一个对象，在内部通过 `JSON.parse` 和 `JSON.stringify` 做深拷贝处理，避免浅拷贝修改旧值后新值也跟着变化。

深拷贝这里用的是 `JSON` 方法，如果使用者对象内有 `Map` 或 `Set` 等，则无法拷贝，而为了一个深拷贝直接下载一个第三方库 `lodash` 显然是不合适的，因此可以修改为一个参数的形式，用户不传就使用 `JSON` 方法，用户需要使用 `cloneDeep` 则自己传。

::: code-group

```ts [index.ts]
function defaultClone(value: any) {
  if (value === null || typeof value !== "object") return value;
  return JSON.parse(JSON.stringify(value));
}

export function useResettableRef<T>(value: T, clone = defaultClone) {
  const initialValue = clone(value);
  const state = ref(value);
  const reset = () => {
    state.value = clone(initialValue);
  };
  return { state, reset };
}
```

```ts [index.vue]
import { useResettableRef } from "./index";
import { cloneDeep } from "load-dash";

const { state, reset } = useResettableRef(
  {
    a: 1,
    b: 2,
    c: [1, 2, 3],
  },
  cloneDeep
);
reset(); // 重置
```

:::

这里需要注意的是 `reset` 方法中赋值也需要深拷贝，如果不深拷贝处理，第一次把 `initialValue` 赋值给 `state` 后，`state` 和 `initialValue` 的引用地址相同，修改 `state` 的值，`initialValue` 的值也会跟着改变，后续重置就会失败。因此需要深拷贝处理。

## reactive

`reactive` 的写法与 `ref` 类似，只不过需要注意 `reactive` 声明的响应式变量在重置时不能直接修改，否则会丢失 `proxy` 代理，丢失响应式。这里可以用 `Object.assign()` 方法合并对象。

但是 `Object.assign()` 方法有一个缺陷，就是对象原本有的属性，新属性没有，则不会做任何处理。例如 `Object.assign(a, b)`，`a` 对象有 `a1` 和 `a2` 属性，`b` 对象只有 `a1` 属性，则会把 `b` 对象的 `a1` 属性覆盖 `a` 对象的 `a1` 属性，`a2` 属性不做任何处理，这样会导致重置功能没有生效。

解决方法是每次在合并前把原对象的属性都删除，这样就不会有遗留的属性了。

::: code-group

```ts [index.ts]
export function useResettableReactive<T extends object>(
  value: T,
  clone = defaultClone
) {
  const state = reactive(clone(value));
  const reset = () => {
    Object.keys(state).forEach((key) => {
      delete state[key];
    });
    Object.assign(state, clone(value));
  };
  return [state, reset] as count;
}
```

```ts [index.vue]
import { useResettableReactive } from "./index";

const [obj, resetObj] = useResettableReactive({
  a: 1,
  b: 2,
  c: [1, 2, 3],
});
```

:::

最后在导出时不导出一个对象，而是一个数组。在使用时通过数组解构使用时可以自定义变量和函数的名称。

## 动手实操

<myIframe url="https://example.duyidao.cn/vue/stateReset" />
