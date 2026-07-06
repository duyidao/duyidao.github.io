# Computed 计算属性 实现

## 基础实现

`computed` 计算属性是一个特殊的存在，它既是 `sub` 也是 `dep`。

说它是 `dep`，是因为 `effect` 可以访问 `computed` 变量，当 `computed` 发生改变时，通知 `effect` 执行；说它是 `sub` 是因为它会收集依赖项，它接收一个回调函数，收集内部响应式变量的依赖，后续依赖发生变化时，会触发回调函数，类似于 `effect` 函数。

下面来看一个例子：

> [!info] 例子
>
> ```js
> let count = ref(1);
>
> const c = computed(() => count.value + 1);
>
> effect(() => {
>   console.log("effect => ", c.value);
> });
>
> setTimeout(() => {
>   count.value++;
> }, 1000);
> ```

先来理解它的工作运行流程：

- 创建一个 `ref` 变量 `count`，值为 `1`，没有和谁做关联，继续往下走
- 创建一个 `computed` 变量 `c`，一开始回调不会执行，继续往下走
- 遇到一个 `effect` 函数，执行回调函数，打印了 `c.value` ，此时执行 `computed` 的回调函数，此时 `computed` 会作为一个 `sub` 收集响应式变量的依赖
- `count` 创建一个新节点，头节点和尾节点都指向该节点。节点的 `sub` 指向 `computed`，继续往下走（此时 `computed` 作为 `sub`）
- `c` 创建一个新节点，头节点和尾节点都指向该节点。节点的 `sub` 指向 `effect`，继续往下走（此时 `computed` 作为 `dep`）
- 一秒之后 `count` 发生改变，通过节点的 `sub` 触发 `computed` 的回调函数，然后 `computed` 通过节点的 `sub` 通知 `effect` 执行回调函数，打印 `c.value`

下面画一个图方便理解：
![流程图](https://pic1.imgdb.cn/item/6821949058cb8da5c8ed395a.png)

新建一个 `computed.ts` 文件，按需导出一个 `computed` 函数，接收一个参数。该参数有可能是一个函数，也有可能是一个包含 `get` 和 `set` 方法的对象，使用示例如下：

::: code-group

```js [function.js]
const c = computed(() => {
  return count.value + 1;
});
```

```js [object.js]
const c = computed({
  get() {
    return count.value + 1;
  },
  set() {
    count.value = value;
  },
});
```

:::

因此需要判断传入的参数类型，根据不同类型做不同处理。如果是一个函数类型，那么把该函数赋值给 `computed` 函数内部的 `getter` 变量，`setter` 变量为 `undefined` ；如果是一个对象类型，那么把 `get` 方法赋值给 `computed` 函数内部的 `getter` 变量，`set` 方法赋值给 `computed` 函数内部的 `setter` 变量。最后 `return` 返回一个 `ComputedImpl` 类实例对象，把 `getter` 和 `setter` 传入 `ComputedImpl` 类实例对象中。

::: code-group

```ts [reactivity/computed.ts]
import { isFunction } from "@vue/shared";

/**
 * 计算属性
 * @param getterOrOptions 计算属性的回调函数或对象。判断依据是是否有 `get` 方法。
 * @returns 计算属性的实例对象
 */
export function computed(getterOrOptions) {
  let getter;
  let setter;

  if (isFunction(getterOrOptions)) {
    // const c = computed(() => {})
    getter = getterOrOptions;
  } else {
    // const c = computed({
    //   get() {},
    //   set() {},
    // })
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  return new ComputedImpl(getter, setter);
}

class ComputedImpl {
  constructor(public getter, private setter) {}
}
```

```ts [shared/index.ts]
// [!code ++]
export function isFunction(value) {
  return typeof value === "function"; // [!code ++]
} // [!code ++]
```

:::

接下来实现 `ComputedImpl` 类，该类需要包含以下的属性和方法：

1. `_value` ：存储计算属性的值，最终返回出去给外部获取使用
2. `__v_isRef` ：计算属性 `computed` 也是 `ref` 类型，因此需要标识一下，前面 `ref.ts` 已经实现该功能，引入即可
3. `tracking` ：标识当前是否正在收集依赖，防止重复收集
4. `subs`、`subsTail` ：由于 `computed` 也是 `dep` ，因此需要包含订阅者链表，用于通知 `effect` 执行回调函数，`system.ts` 已经实现类型，引入即可
5. `deps`、`depsTail` ：由于 `computed` 也是 `sub` ，因此需要包含依赖项链表，用于收集依赖项，`system.ts` 已经实现类型，引入即可
6. `get` ：获取计算属性的值 `_value`
7. `set` ：如果用户传了 `set` 方法，则调用方法设置值，反之说明该值是只读的，不可修改
8. `update` ：当依赖项发生变化时，更新 `_value` 的值

```ts
import { isFunction } from "@vue/shared";
import { ReactiveFlags } from "./ref.ts"; // [!code ++]
import { Sub, Dep, Link } from "./system.ts"; // [!code ++]

export function computed(getterOrOptions) {
  let getter;
  let setter;

  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  return new ComputedImpl(getter, setter);
}

class ComputedImpl {
  _value; // [!code ++]
  [ReactiveFlags.IS_REF] = true; // 计算属性也是 ref 类型 // [!code ++]
  // [!code ++]
  /**
  // [!code ++]
   * 作为依赖项 dep，需要关联subs，等值更新了，需要通知 subs 执行回调函数
  // [!code ++]
   */
  subs: Link | undefined; // 订阅者链表 // [!code ++]
  subsTail: Link | undefined; // 订阅者链表尾节点 // [!code ++]
  // [!code ++]
  /**
  // [!code ++]
   * 作为订阅者 sub，需要知道哪些 dep 被收集了
  // [!code ++]
   */
  deps: Link | undefined; // 依赖项链表 // [!code ++]
  depsTail: Link | undefined; // 依赖项链表尾节点 // [!code ++]
  tracking = false; // 标识当前是否正在收集依赖 // [!code ++]

  constructor(public getter, private setter) {}

  // [!code ++]
  get() {
    this.update(this); // [!code ++]
    return this._value; // [!code ++]
  } // [!code ++]
  // [!code ++]
  set(newValue) {
    // [!code ++]
    if (this.setter) {
      this.setter(newValue); // [!code ++]
    } // [!code ++]
    // [!code ++]
    else {
      console.warn("computed is readonly"); // [!code ++]
    } // [!code ++]
  } // [!code ++]
  // [!code ++]
  update(dep) {
    this._value = this.getter(); // [!code ++]
  } // [!code ++]
}
```

## 关联关系绑定

目前运行代码，可以看到控制台有打印内容，但是这里还是有问题：

目前的 `computed` 并没有用到它的 `subs` 和 `deps` 链表，因为它没有和 `effect` 建立关联关系。目前的 `effect` 实际上是和 `computed` 接收的回调函数 `getter` 函数建立关联关系的，而不是和 `computed` 实例对象建立关联关系的。因此需要修改下代码。

```ts
import { isFunction } from "@vue/shared";
import { ReactiveFlags } from "./ref.ts";
import { Sub, Dep, Link } from "./system.ts";
import { activeSub } from "./effect.ts"; // [!code ++]

export function computed(getterOrOptions) {
  let getter;
  let setter;

  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  return new ComputedImpl(getter, setter);
}

class ComputedImpl {
  _value;
  [ReactiveFlags.IS_REF] = true; // 计算属性也是 ref 类型

  /**
   * 作为依赖项 dep，需要关联subs，等值更新了，需要通知 subs 执行回调函数
   */
  subs: Link | undefined; // 订阅者链表
  subsTail: Link | undefined; // 订阅者链表尾节点

  /**
   * 作为订阅者 sub，需要知道哪些 dep 被收集了
   */
  deps: Link | undefined; // 依赖项链表
  depsTail: Link | undefined; // 依赖项链表尾节点
  tracking = false; // 标识当前是否正在收集依赖

  constructor(public getter, private setter) {}

  get() {
    this.update(this);

    // [!code ++]
    /**
    // [!code ++]
     * 要和 sub 建立关联关系。这里不直接使用 trackRef，是为了避免后续可能还需要修改
    // [!code ++]
     */
    // [!code ++]
    if (activeSub) {
      link(this, activeSub); // [!code ++]
    } // [!code ++]
    return this._value;
  }

  set(newValue) {
    if (this.setter) {
      this.setter(newValue);
    } else {
      console.warn("computed is readonly");
    }
  }

  update(dep) {
    this._value = this.getter();
  }
}
```

作为 `dep`，它和 `effect` 的关联关系已经建立好了。接下来是作为 `sub`，和 `ref` 实例对象建立关联关系。那么，要在哪里建立关联关系呢？

类 `ComputedImpl` 是在 `update` 方法中更新值的，更新值依赖对应的依赖项 `dep`，因此可以在 `update` 方法中拿到回调函数里使用到的响应式数据，从而建立关联关系。

在 3.6 版本之前，`computed` 函数还是复用的 `effect` 函数实现关联关系绑定，后面才拆开来独立实现。因此可以把 `effect` 里的对应代码 `copy` 过来修改。

::: code-group

```ts [computed.ts]
import { isFunction } from "@vue/shared";
import { ReactiveFlags } from "./ref.ts";
import { setActiveEffect, activeSub } from "./effect.ts"; // [!code ++]
import { Link, Dep, Sub, link, startTrack, endTrack } from "./system.ts"; // [!code ++]

export function computed(getterOrOptions) {
  let getter;
  let setter;

  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  return new ComputedImpl(getter, setter);
}

class ComputedImpl {
  _value;
  [ReactiveFlags.IS_REF] = true; // 计算属性也是 ref 类型

  /**
   * 作为依赖项 dep，需要关联subs，等值更新了，需要通知 subs 执行回调函数
   */
  subs: Link | undefined; // 订阅者链表
  subsTail: Link | undefined; // 订阅者链表尾节点

  /**
   * 作为订阅者 sub，需要知道哪些 dep 被收集了
   */
  deps: Link | undefined; // 依赖项链表
  depsTail: Link | undefined; // 依赖项链表尾节点
  tracking = false; // 标识当前是否正在收集依赖

  constructor(public getter, private setter) {}

  get() {
    this.update(this);

    /**
     * 要和 sub 建立关联关系。这里不直接使用 trackRef，是为了避免后续可能还需要修改
     */
    if (activeSub) {
      link(this, activeSub);
    }
    return this._value;
  }

  set(newValue) {
    if (this.setter) {
      this.setter(newValue);
    } else {
      console.warn("computed is readonly");
    }
  }

  update() {
    // [!code ++]
    /**
    // [!code ++]
     * 作为 sub 订阅者，执行回调函数期间，收集执行过程中访问到的响应式数据，收集依赖项 dep，建立 dep 和 sub 之间的关联关系
    // [!code ++]
     */
    // [!code ++]
    let prevSub = activeSub;
    // [!code ++]
    // 每次执行都把回调函数 getter 放到 activeSub 中，让 reactivity 收集依赖
    // [!code ++]
    setActiveEffect(this);
    // [!code ++]
    startTrack(this);
    // [!code ++]
    try {
      // [!code ++]
      this._value = this.getter();
      // [!code ++]
    } finally {
      // [!code ++]
      endTrack(this);
      // [!code ++]
      setActiveEffect(prevSub);
      // [!code ++]
    }
  }
}
```

```ts [effect.ts]
// [!code ++]
/**
      // [!code ++]
 * 修改当前的 activeSub
      // [!code ++]
 */
// [!code ++]
export function setActiveEffect(effect: ReactiveEffect) {
  // [!code ++]
  activeSub = effect;
  // [!code ++]
}
```

:::

修改完之后，运行代码，发现会有报错，提示如下：

![报错提示](https://pic1.imgdb.cn/item/696b28a155fa3078186f13d5.png)

在之前 [Effect 完善 scheduler 调度器](/vue/3/ref_start#scheduler-调度器) 时，`effect` 函数统一使用 `notify` 方法通知订阅者。而 `computed` 实例对象没有对应的属性方法，因此会报错。

这里先添加一个判断，判断当前的 `sub` 是否有 `update` 方法属性，如果有，说明是计算属性 `computed`，需要做额外处理。

```ts [system.ts]
export const propagate = (subs) => {
  let link = subs;
  let queueEffects = [];
  while (link) {
    let sub = link.sub;
    if (!sub.trackShaking) {
      // [!code ++]
      if ("update" in sub) {
        // [!code ++]
        console.log("Todo, 这里是 computed, 要做其他处理");
        // [!code ++]
      } else {
        queueEffects.push(link.sub);
        // [!code ++]
      }
    }
    link = link.nextSub;
  }
  queueEffects.forEach((effect) => effect?.notify());
};
```

## subs 更新

接下来需要实现当 `computed` 作为依赖项 `dep` 时，如何通知订阅者 `subs` 执行。

在 `ComputedImpl` 类中，`subs` 是一个链表，链表中的每一个节点都是 `sub`，也就是 `effect` 实例对象。

当 `computed` 作为依赖项 `dep` 时，执行 `update` 方法，更新 `_value` 的值，然后通知订阅者 `subs` 执行。

在 `system.ts` 中新建一个函数 `propagateSubs`，每次接收当前的 `sub` 实例对象（即 `ComputedRefImpl` 类），执行 `update` 方法，更新 `_value` 的值。

更新完毕后会调用 `setActiveEffect(prevSub);` 把当前的 `activeSub` 恢复到之前的状态，然后再次调用 `propagate`，通知订阅者 `subs` （即 `ReactiveEffect` 类）执行。

```ts [system.ts]
export const propagate = (subs) => {
  let link = subs;
  let queueEffects = [];
  while (link) {
    let sub = link.sub;
    if (!sub.trackShaking) {
      if ("update" in sub) {
        // [!code ++]
        propagateSubs(sub);
      } else {
        queueEffects.push(link.sub);
      }
    }
    link = link.nextSub;
  }
  queueEffects.forEach((effect) => effect?.notify());
};

// [!code ++]
export function propagateSubs(sub) {
  // [!code ++]
  sub.update();
  // [!code ++]
  propagate(sub.subs);
  // [!code ++]
}
```

## 小结

### 步骤流程

### 内容总结

1. 作为 `sub`（订阅者）：当 `computed` 的回调函数中访问了响应式变量（如 `ref`）时，`computed` 会收集这些变量作为依赖项。这是通过在 `update` 方法中执行回调函数并利用 `track` 机制完成的。
2. 作为 `dep`（依赖）：当被 `computed` 依赖的响应式变量发生改变时，由于没有 `notify` 方法，额外做了处理。通过 `propagate` 和 `propagateSubs` 函数调用 `update` 方法，更新 `_value` 的值，然后通知订阅者 `subs` 执行。

### 时序图

![时序图](https://pic1.imgdb.cn/item/696b38dd55fa3078186f4d0e.png)
