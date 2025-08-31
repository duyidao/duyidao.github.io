# Computed计算属性 实现

`computed` 计算属性是一个特殊的存在，它既是 `sub` 也是 `dep`。说它是 `dep` 是因为 `effect` 可以访问 `computed` 变量，当 `computed` 发生改变时，通知 `effect` 执行；说它是 `sub` 是因为它会收集依赖项，它接收一个回调函数，收集内部响应式变量的依赖，后续依赖发生变化时，会触发回调函数，类似于 `effect` 函数。

下面来看一个例子：

> [!info] 例子
> ```js
> let count = ref(1)
>
> const c = computed(() => count.value + 1)
> 
> effect(() => {
>   console.log('effect => ', c.value)
> })
>
> setTimeout(() => {
>   count.value++
> }, 1000)
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
  return count.value + 1
})
```
```js [object.js]
const c = computed({
  get() {
    return count.value + 1
  },
  set() {
    count.value = value
  }
})
```
:::

因此需要判断传入的参数类型，根据不同类型做不同处理。如果是一个函数类型，那么把该函数赋值给 `computed` 函数内部的 `getter` 变量，`setter` 变量为 `undefined` ；如果是一个对象类型，那么把 `get` 方法赋值给 `computed` 函数内部的 `getter` 变量，`set` 方法赋值给 `computed` 函数内部的 `setter` 变量。最后 `return` 返回一个 `ComputedImpl` 类实例对象，把 `getter` 和 `setter` 传入 `ComputedImpl` 类实例对象中。

::: code-group
```ts [reactivity/computed.ts]
import { isFunction } from '@vue/shared'

export function computed(getterOrOptions) {
  let getter
  let setter

  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  return new ComputedImpl(getter, setter)
}

class ComputedImpl {
  constructor(public getter, private setter) {}
}
```
```ts [shared/index.ts]
export function isFunction (value) { // [!code ++]
  return typeof value === 'function' // [!code ++]
} // [!code ++]
```
:::

接下来实现 `ComputedImpl` 类，该类需要包含以下的属性和方法：

1. `_value` ：存储计算属性的值，最终返回出去给外部获取使用
2. `__v_isRef` ：计算属性 `computed` 也是 `ref` 类型，因此需要标识一下，前面 `ref.ts` 已经实现该功能，引入即可
3. `tracking` ：标识当前是否正在收集依赖，防止重复收集
4. `subs`、`subsTail` ：由于 `computed` 也是 `dep` ，因此需要包含订阅者链表，用于通知 `effect` 执行回调函数，`system.ts` 已经实现类型，引入即可
5. `deps`、`depsTail` ：由于 `computed` 也是 `sub` ，因此需要包含依赖链表，用于收集依赖项，`system.ts` 已经实现类型，引入即可
6. `get` ：获取计算属性的值 `_value`
7. `set` ：如果用户传了 `set` 方法，则调用方法设置值，反之说明该值是只读的，不可修改
8. `update` ：当依赖项发生变化时，更新 `_value` 的值

```ts
import { isFunction } from '@vue/shared'
import { ReactiveFlags } from './ref.ts' // [!code ++]
import { Sub, Dep, Link } from './system.ts' // [!code ++]

export function computed(getterOrOptions) {
  let getter
  let setter

  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  return new ComputedImpl(getter, setter)
}

class ComputedImpl {
  _value; // [!code ++]
  [ReactiveFlags.IS_REF] = true // [!code ++]
  subs: Link | undefined; // [!code ++]
  subsTail: Link | undefined; // [!code ++]
  deps: Link | undefined; // [!code ++]
  depsTail: Link | undefined; // [!code ++]
  tracking = false; // [!code ++]

  constructor(public getter, private setter) {}

  get () { // [!code ++]
    this.update(this) // [!code ++]
    return this._value // [!code ++]
  } // [!code ++]
  set (newValue) { // [!code ++]
    if (this.setter) { // [!code ++]
      this.setter(newValue) // [!code ++]
    } // [!code ++]
    else { // [!code ++]
      console.warn('computed is readonly') // [!code ++]
    } // [!code ++]
  } // [!code ++]
  update (dep) { // [!code ++]
    this._value = this.getter() // [!code ++]
  } // [!code ++]
}
```
