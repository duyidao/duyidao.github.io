# Computed 计算属性 缓存

## 问题复现

还是以上一章节的示例代码为例：

```html
<script type="module">
  import { ref, effect, computed } from "../dist/reactivity.esm.js";

  let count = ref(1);

  const c = computed(() => count.value + 1);

  effect(() => {
    console.log("effect => ", c.value);
  });

  setTimeout(() => {
    count.value++;
    console.count(c.value);
    console.count(c.value);
    console.count(c.value);
    console.count(c.value);
    console.count(c.value);
    console.count(c.value);
    console.count(c.value);
    console.count(c.value);
    console.count(c.value);
    console.count(c.value);
  }, 1000);
</script>
```

重复且多次打印 `c.value`，可以发现即使值没有改变，但是 `update` 方法会被触发多次，这显然很不符合 `computed` 的计算缓存设计。

![重复且多次打印](https://pic1.imgdb.cn/item/696b3a1755fa3078186f4d22.png)

接下来就要思考如何解决这个问题。

## dirty 标志

在 `ComputedImpl` 类中，新增一个属性 `dirty`，用于标记计算属性是否脏数据。

- 当 `dirty` 为 true 时，表示计算属性脏数据，需要重新计算缓存。
- 当 `dirty` 为 false 时，表示计算属性干净，不需要重新计算缓存。

默认该值为 true。

在 `get value()` 方法中，判断 `dirty` 是否为 true，如果是，则调用 `update` 方法，重新计算缓存，并将 `dirty` 设置为 false。反之说明该计算属性干净，不需要重新计算缓存。

```ts [computed.ts]
class ComputedRefImpl implements Dep, Sub {
  // ... 省略代码
  dirty = true; // 是否脏数据，需要重新计算缓存。为 true 时，需要重新计算缓存；为 false 时，不需要重新计算缓存。 // [!code ++]

  /**
   * 构造函数
   * @param {Function} getter 计算属性函数
   * @param {Function} setter 计算属性设置函数
   */
  constructor(public fn, private setter) {}

  get value() {
    // 如果计算属性脏了，需要重新计算缓存 // [!code ++]
    // [!code ++]
    if (this.dirty) {
      this.update();
    } // [!code ++]

    // 作为 dep 依赖项，要收集订阅者 sub
    if (activeSub) {
      link(this, activeSub);
    }
    return this._value;
  }

  // ... 省略代码

  update() {
    /**
     * 作为 sub 订阅者，要收集依赖项 dep
     */
    let prevSub = activeSub;
    // 每次执行都把 fn 放到 activeSub 中，让 reactivity 收集依赖
    setActiveEffect(this);
    startTrack(this);
    try {
      this._value = this.fn();
      this.dirty = false; // [!code ++]
    } finally {
      endTrack(this);
      setActiveEffect(prevSub);
    }
  }
}
```

> [!WARNING] 注意
>
> `dirty = false` 的修改只能写在 `update` 方法中，不能在 `get value()` 方法中。因为触发 `update` 方法有很多种方式，比如 `get value()` 中，或者 `propagateSubs` 方法中。
>
> 只在 `get value()` 方法里修改 `dirty` 为 `false` 会导致在 `propagateSubs` 方法中触发 `update` 方法，重新计算缓存后，数据依旧被判断为脏数据，重复多调用一次 `update` 方法。

## 懒计算

修改一下示例代码：

```html
<script type="module">
  import { ref, effect, computed } from "../dist/reactivity.esm.js";

  let count = ref(1);

  const c = computed(() => count.value + 1);

  // effect(() => {
  //   console.log('effect => ', c.value)
  // })

  console.log("c.value", c.value);
  console.log("c.value", c.value);
  console.log("c.value", c.value);
  console.log("c.value", c.value);
  count.value++;
</script>
```

目前已经把 `effect` 方法注释掉了，此时计算属性 `c` 没有被订阅，它的订阅者链表 `subs` 是空的，此时即使它的依赖项发生了改变，也不应该触发 `update` 方法，只需要把它标记为脏数据即可。

目前的效果还是会触发 `update` 方法，重新计算缓存。

解决方法为，在 `propagate` 方法中，把计算属性的 `dirty` 标志设置为 true（当计算属性的依赖项发生改变时，会触发 `propagate` 方法）表示脏数据。然后在 `propagateSubs` 方法中，判断它的 `subs` 是否为空，不为空，才调用 `update` 方法。

```ts [system.ts]
export const propagate = (subs) => {
  let link = subs;
  let queueEffects = [];
  while (link) {
    let sub = link.sub;
    if (!sub.trackShaking) {
      if ("update" in sub) {
        sub.dirty = true; // 计算属性标记为脏 // [!code ++]
        propagateSubs(sub);
      } else {
        queueEffects.push(link.sub);
      }
    }
    link = link.nextSub;
  }
  queueEffects.forEach((effect) => effect?.notify());
};

export function propagateSubs(sub) {
  // [!code ++]
  if (sub.subs) {
    sub.update();
    propagate(sub.subs);
    // [!code ++]
  }
}
```

## 值没变

下面再修改一下示例代码：

```html
<script type="module">
  import { ref, effect, computed } from "../dist/reactivity.esm.js";

  let count = ref(1);

  const c = computed(() => count.value * 0);

  effect(() => {
    console.log("effect => ", c.value);
  });

  setTimeout(() => {
    count.value += 2;
  }, 1000);

  setTimeout(() => {
    count.value += 2;
  }, 3000);
</script>
```

在数学中，0 乘以任何数都等于 0。因此上面的代码中，计算属性 `c.value` 一直都是 0，不会改变。但是每次依旧会触发 `effect` 订阅者，打印出 0。

![依旧打印](https://pic1.imgdb.cn/item/696b44b555fa3078186f7293.png)

在前面 [ref 和 reactive](/vue/3/reactive#新老属性值一样处理) 中，我们实现了调用 `hasChange` 方法，判断值是否发生改变，如果没改变，则不执行对应的 `trigger` 方法触发订阅者。

因此，这里的解决方法也可以在 `propagateSubs` 方法中，判断计算属性的值在更新后是否和旧值相同，如果相同，则不执行 `propagate` 方法。

> [!TIP] 备注
>
> 这里还是要执行 `update` 方法，重新计算缓存。只有执行后，才能拿到新值和旧值做对比。执行完 `update` 方法后，`activeSub` 会变为 `effect`，后续调用 `propagate` 方法时，才会触发 `effect` 订阅者。

那么，如何知道他们的值是否发生变化呢？在 `propagateSubs` 方法中，无法直接判断，但是在 `update` 方法中，可以拿到旧值 `_value`，和计算后拿到的新值 `_value`，进行对比。那么只需要在 `update` 方法中，通过 `hasChange` 方法判断值是否发生改变，再把结果 `return` 返回出去给 `propagateSubs` 方法使用即可。

::: code-group

```ts [computed.ts]
class ComputedRefImpl implements Dep, Sub {
  // ... 省略代码

  update() {
    /**
     * 作为 sub 订阅者，要收集依赖项 dep
     */
    let prevSub = activeSub;
    const oldValue = this._value; // 记录旧值 // [!code ++]
    // 每次执行都把 fn 放到 activeSub 中，让 reactivity 收集依赖
    setActiveEffect(this);
    startTrack(this);
    try {
      this._value = this.fn();
      this.dirty = false;
    } finally {
      endTrack(this);
      setActiveEffect(prevSub);
      return hasChanged(oldValue, this._value); // 返回值是否发生改变 // [!code ++]
    }
  }
}
```

```ts [system.ts]
export function propagateSubs(sub) {
  /**
   * 1. 订阅者链表不为空
   * 2. 计算属性值发生改变
   */
  // [!code ++]
  if (sub.subs && sub.update()) {
    propagate(sub.subs);
  }
}
```

:::

## effect 优化

这一块不算是 `computed` 的 Bug，先来看一段示例代码：

```html
<script type="module">
  import { ref, effect, computed } from "../dist/reactivity.esm.js";

  let count = ref(1);

  // const c = computed(() => count.value * 0)

  effect(() => {
    // console.log('effect => ', c.value)
    console.count("effect 执行次数");
    console.log("effect => ", count.value);
    count.value;
  });

  setTimeout(() => {
    count.value += 2;
  }, 1000);
</script>
```

![effect 执行次数](https://pic1.imgdb.cn/item/696b4f0a55fa3078186f88aa.png)

可以看到，`effect` 多次调用了 `count.value`，导致多执行了几次。这对性能会有一定的影响。

在源码中，官方采用的是时间换空间的方法，在 `link` 方法中，遍历订阅者链表 `subs`，判断是否有重复的情况。这里修改一下，使用空间换时间的方法。

无论是 `ref` 还是 `reactive`，都在 `propagate` 方法中，判断 `sub.dirty` 是否为 `false`，如果为 `false`，才继续往下执行，把 `sub.dirty` 标志设置为 `true`，表示在执行中，是脏数据。

在方法执行完毕后，都会调用 `endTrack` 方法，因此在这个方法中，把 `sub.dirty` 标志设置为 `false`，表示干净数据。

::: code-group

```ts [system.ts]
export const propagate = (subs) => {
  let link = subs;
  let queueEffects = [];
  while (link) {
    let sub = link.sub;
    // [!code ++]
    if (!sub.trackShaking && !sub.dirty) {
      if ("update" in sub) {
        sub.dirty = true; // 计算属性标记为脏
        propagateSubs(sub);
      } else {
        queueEffects.push(link.sub);
      }
    }
    link = link.nextSub;
  }
  queueEffects.forEach((effect) => effect?.notify());
};

export function endTrack(sub) {
  const depsTail = sub.depsTail;
  sub.trackShaking = false;
  sub.dirty = false; // [!code ++]
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

```ts [computed.ts]
class ComputedRefImpl implements Dep, Sub {
  _value; // 计算属性值，最终返回的值
  subs: Link | undefined; // 订阅者链表头节点
  subsTail: Link | undefined; // 订阅者链表尾节点
  deps: Dep | undefined; // 依赖项链表头节点
  depsTail: Link | undefined; // 依赖项链表尾节点

  [ReactiveFlags.IS_REF] = true; // computed也是ref类型
  tracking = false; // 是否正在计算
  dirty = true; // 是否脏数据，需要重新计算缓存。为 true 时，需要重新计算缓存；为 false 时，不需要重新计算缓存。 // [!code --]
  dirty = false; // 是否脏数据，需要重新计算缓存。为 true 时，需要重新计算缓存；为 false 时，不需要重新计算缓存。 // [!code ++]

  // ... 省略代码

  update() {
    /**
     * 作为 sub 订阅者，要收集依赖项 dep
     */
    let prevSub = activeSub;
    const oldValue = this._value; // 保存旧值
    // 每次执行都把 fn 放到 activeSub 中，让 reactivity 收集依赖
    setActiveEffect(this);
    startTrack(this);
    try {
      this._value = this.fn();
      this.dirty = false; // [!code --]
    } finally {
      endTrack(this);
      setActiveEffect(prevSub);
      return hasChanged(oldValue, this._value); // 返回值是否发生改变
    }
  }
}
```

:::

这里关联关系还是会绑定多次，但是减少了链表遍历的时间。

在 `ComputedImpl` 类中的 `dirty` 属性一开始默认值是 `true`，这里为了适配修改，把默认值设置为 `false`。`update` 方法中的 `this.dirty` 属性修改也可以删了，统一在 `endTrack` 方法中设置为 `false`。

> [!INFO] 题外话
>
> 源码的时间换空间写法，主要是在 `link` 方法里，通过遍历判断 `dep` 和 `sub` 是否绑定过关联关系，来避免是否重复绑定。

## 总结

### 内容总结

1. 引入 `dirty` 标志：

   在 `ComputedImpl` 类中添加 `dirty` 属性，默认为 `true`。

   在 `get value()` 方法中，检查 `dirty`。如果为 `true`，则调用 `update()` 重新计算值并设置 `dirty = false`；否则直接返回缓存的 `_value`。

   在 `update()` 方法中，计算新值后，将 `dirty` 设为 `false`，表示当前值是最新的。

2. 懒计算（Lazy Evaluation）：
   当依赖项发生变化时，`propagate` 方法会将计算属性的 `dirty` 标志设为 `true`，标记为脏数据。

   在 `propagateSubs` 方法中，首先检查 `sub.subs`（即计算属性是否有订阅者）。如果有订阅者（即被 effect 使用），才调用 `sub.update()` 进行计算。

   这样，如果计算属性未被任何 effect 使用（即 `subs` 为空），即使其依赖项改变，也不会触发计算，只是标记为脏。

3. 值变化检测与优化：

   在 `update()` 方法中，保存旧值 oldValue，计算新值 \_value 后，通过 `hasChanged(oldValue, this._value)` 判断值是否真的改变，并将结果返回。

   在 `propagateSubs` 方法中，根据 `update()` 的返回值决定是否继续调用 `propagate(sub.subs)` 通知订阅者。如果值未改变，则不通知订阅者，避免无效的副作用。

   这个机制确保了只有在计算结果真正改变时，才会通知依赖它的 `effect` 重新执行。

4. 性能优化（空间换时间）：

   通过在 `propagate` 方法中增加 `!sub.dirty` 的判断，避免对已在执行中的计算属性再次执行。

   将 `dirty` 的初始值设置为 `false`，并在 `endTrack` 中统一设置为 `false`，确保计算属性在执行完成后处于干净状态，供下次访问时判断是否需要重新计算。

### 时序图

![时序图](https://pic1.imgdb.cn/item/696b38dd55fa3078186f4d0e.png)
