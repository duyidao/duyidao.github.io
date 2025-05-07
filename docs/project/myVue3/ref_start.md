# 响应式 Reactivity 基础实现

## 初步实现

### RefImpl 类

下面先来初步实现响应式原理。<SpecialWords text="Vue3" /> 的响应式原理主要是通过变量的 `get` 、 `set` 和副作用函数 `effect` 来实现的。每当访问变量时，就会触发 `get` ，每当修改变量时，就会触发 `set` ，而 `effect` 则是用于收集依赖和触发副作用函数的，触发变量变更后，会重新执行副作用函数，达到了响应式的效果。

在 `reactivity/src` 文件夹下新建 `reactivity.ts` 和 `effect.ts` 两个文件，分别用于实现响应式原理和副作用函数。

在 `reactivity.ts` 文件中，定义一个 `RefImpl` 的类，用于实现响应式原理。它包含以下几个属性：

1. `_value` ：用于存储变量的值。
2. `__v_isRef` ：用于标识该变量是否是响应式变量。
3. `sub`：用于存储该变量的依赖函数。
4. `get`：用于获取变量的值，并在获取时收集依赖函数。
5. `set`：用于设置变量的值，并在设置时触发依赖函数。

导出一个 `ref` 函数，函数返回一个 `new RefImpl` 的实例。再导出一个 `isRef` 函数，用于判断一个变量是否是响应式变量。

在 `effect.ts` 文件中，定义并导出一个变量 `activeSub` 和一个 `effect` 函数， `activeSub` 是一个依赖收集变量，每当触发 `effect` 副作用函数时，就会为 `activeSub` 赋值，`reactivity.ts` 会导入这个变量为响应数据收集函数依赖；`effect` 函数用于收集依赖函数和触发副作用函数，它接收一个形参 `fn` ，触发 `effect` 函数后，首先将 `activeSub` 设置为 `fn` ，然后执行 `activeSub` ，执行完毕后，将 `activeSub` 设置为 `null` 。

最后在 `index.ts` 文件中统一导入导出。

::: code-group
```ts [reactivity.ts]
import { activeSub } from './effect'

enum ReactiveFlags {
  IS_REF = '__v_isRef',
}

/**
 * ref 响应式类
 * @params {_value}: 响应式值
 * @params {ReactiveFlags.IS_REF}: 标识是否是ref
 * @params {sub}: 订阅者
 * @methods {get}: 获取响应式值
 * @mehtods {set}: 设置响应式值
 */
class RefImpl {
  _value;
  sub;
  [ReactiveFlags.IS_REF] = true;

  constructor(value) {
    this._value = value
  }

  get value() {
    if (activeSub) {
      this.sub = activeSub
    }
    return this._value
  }

  set value(newValue) {
    this._value = newValue
    this.sub?.()
  }
}

/**
 * 创建响应式对象
 * @params {value}: 响应式对象
 * @returns {RefImpl}: 响应式对象
 */
export function ref(value) {
  return new RefImpl(value)
}

/**
 * 判断是否是ref
 * @params {value}: 响应式对象
 * @returns {boolean}: 是否是ref
 */
export function isRef(value) {
  return (!!value && value?.[ReactiveFlags.IS_REF])
}
```
```ts [effect.ts]
export let activeSub;

/**
 * 依赖收集
 * @param {fn}: Function
 */
export const effect = (fn) => {
  activeSub = fn
  activeSub()
  activeSub = null
}
```
```ts [index.ts]
export * from './effect'
export * from './reactivity'
```
:::

回到 `packages/reactivity` 文件夹下，新建一个 `example` 文件夹，后续用于测试。新建一个 `01_ref.html` 文件，内容如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0">
  <title>ref初步设置</title>
</head>

<body>
  <script type="module">
    import {ref, effect} from '../dist/reactivity.esm.js'

    const count = ref(0)

    effect(() => {
      console.log('count', count.value);
    })

    setTimeout(() => {
      count.value += 1
    }, 1000);
  </script>
</body>

</html>
```

现在试运行，可以发现 `count` 变量发生变更后，能够触发 `effect` 函数，打印出 `count` 的值。

> [!IMPORTANT] 备注
> 1. 一般的，如果想要给类设置一个内部私有属性，不会直接使用 `this.xxx`，而是外部设置一个枚举，然后在类内部使用 `枚举[xxx]` 的方式。以上方代码示例为例，`ReactiveFlags` 是一个枚举，`ReactiveFlags.IS_REF` 是枚举中的一个属性，用于标记当前对象是否是 `ref` 对象，返回一个布尔值。
> 2. `set` 函数中，需要先执行赋值操作，再执行副作用函数，先后顺序不能搞错，不然会导致先触发副作用函数，再赋值，这样副作用函数中拿到的值是旧的值。

### 小结

创建一个 `RefImpl` 类，用于实现 `ref` 函数，该类包含一个 `_value` 属性，用于存储 `ref` 函数的参数值，在 `get` 方法中收集副作用函数依赖，`set` 方法中触发副作用函数；同时创建 `effect` 函数，用于存储副作用函数。有一个单线程思想的 `activeSub` 变量，有值代表当前有副作用函数触发。

## 链表

### 单向链表

链表类似于数组，是一种数据结构。它固定有一个头节点，头节点的 `next` 指向下一个节点，下一个节点的 `next` 指向下下个节点，依次类推，直到最后一个节点，最后一个节点的 `next` 指向 `null`。此时整个结构就是一个链表。

与数组相比，链表的优势在于插入和删除操作，时间复杂度都是 `O(1)`，而数组在插入和删除操作时，需要移动元素，时间复杂度最快是 `O(1)`，最慢是 `O(n)`；而数组的优势在于随机访问，因为有索引的概念，可以根据索引查找，时间复杂度是 `O(1)`，而链表在随机访问时，需要从头节点开始，依次 `next` 遍历，时间复杂度是 `O(n)`。

下面画一个图，方便理解一下链表在查询、插入、删除操作时的表现。

![链表查找](https://pic1.imgdb.cn/item/6813187d58cb8da5c8d5e6e2.png)

上图是一个单向链表，假设我需要查找节点3，那么需要从头节点开始，依次 `next` 遍历，直到找到节点3。

![链表增加](https://pic1.imgdb.cn/item/6813190858cb8da5c8d5e711.png)

如果我想要在节点2和节点3之间新增一个节点5，只需要遍历找到节点2，将节点2的 `next` 指向节点5，将节点5的 `next` 指向节点3即可。代码如下：

```js
let current = head;
while (current) {
  if (head.next === node3) {
    head.next = node5;
    node5.next = node3;
    break;
  }
  current = current.next;
}
```

![链表删除](https://pic1.imgdb.cn/item/6813198958cb8da5c8d5e738.png)

如果想要删除节点3，只需要遍历找到节点3，将节点3前一项的 `next` 指向节点4即可。代码如下：

```js
let current = head;
while (current) {
  if (head.next === node3) {
    head.next = node3.next;
    break;
  }
  current = current.next;
}
```

但是可以看到，无论是做增还是做删，都需要先遍历，因为没有索引的概念，单向链表不知道节点3的前一项是谁，而遍历对于链表来说性能消耗较大，那么有没有办法优化一下呢？

### 双向链表

双向链表相对于单向链表，多了一个 `prev` 指针，指向上一个节点。这样在增删操作时，就可以直接通过 `prev` 指针找到前一个节点，不需要再遍历了。下面画图举例。

![双向链表](https://pic1.imgdb.cn/item/68131c2c58cb8da5c8d5edff.png)

可以看到，现在每个节点都有一个 `prev` 指针，如果想要做增加操作，只需要将后一个节点的 `prev` 指向新增的节点，新增的节点的 `next` 指向后一个结点；将新增的节点的 `prev` 指向前一个结点，将前一个节点的 `next` 指向新增的节点即可。代码如下：

```js
node5.next = node3; // 将新增的节点的next指向后一个节点
node5.prev = node2; // 将新增的节点的prev指向前一个节点
node2.next = node5; // 将前一个节点的next指向新增的节点
node3.prev = node5; // 将后一个节点的prev指向新增的节点
```

![双向链表增加](https://pic1.imgdb.cn/item/6813205e58cb8da5c8d5fe67.png)

删除同理，只需要将要删除的节点前一个节点的 `next` 指向要删除的节点后一个节点，将要删除的节点后一个节点的 `prev` 指向要删除的节点前一个节点即可。代码如下：

```js
if (node3.prev) {
  node3.prev.next = node3.next; // 将前一个节点的next指向后面的节点
}
else {
  head = node3.next; // 如果前一个节点为空，说明是头节点，将头节点指向它下一个节点
}
```

![双向链表删除](https://pic1.imgdb.cn/item/6813211158cb8da5c8d5fed1.png)

## 链表应用

前面学习了链表，接下来就把链表运用到响应式系统中。在【初步实现】章节，我们使用 `effect` 函数来收集依赖，触发响应式变量的 `set` 赋值操作后，调用该变量的 `effect` 函数，从而实现响应式。但是有一个问题，就是保存 `activeSub` 是直接赋值操作，因此最多只能保存一个 `effect` 函数，如果想要保存多个 `effect` 函数，则会出现后面的函数覆盖前面的函数。而学习了链表之后，可以利用链表和数组各自的优点，高性能的保存全部的依赖函数。

### 保存依赖

首先在 `RefImpl` 类中把 `sub` 属性修改为 `subs` ，表示会有多个依赖函数；然后定义一个变量 `subsTail` ，表示链表的尾指针。声明一个链表节点的 <SpecialWords text="TypeScript" /> 类型 `Link` ，节点包含当前的依赖 `sub` ，类型是一个函数；上一个节点 `prevSub` ，类型是 `Link` ；下一个节点 `nextSub` ，类型是 `Link` 。

触发 `get` 方法后，创建一个节点对象 `newLink`，`sub` 为当前的 `activeSub` 依赖函数，`nextSub` 和 `prevSub` 暂时赋值 `undefined` 。然后判断当前的尾指针 `subsTail` ，出现以下两种情况：
1. 不为空，说明当前链表有节点了，则将当前链表最后一个节点的 `nextSub` 指向刚刚创建好的节点对象 `newLink`， `newLink` 的 `prevSub` 指向当前链表最后一个节点，最后将尾指针指向当前 `newLink` 。
2. 为空，说明当前链表没有节点，则直接将头指针和尾指针都指向当前节点对象 `newLink` 。

代码如下所示：

```ts
import { activeSub } from './effect'

enum ReactiveFlags {
  IS_REF = '__v_isRef',
}

interface Link { // [!code ++]
  sub: Function; // [!code ++]
  prevSub: Link; // [!code ++]
  nextSub: Link; // [!code ++]
} // [!code ++]

/**
 * ref 响应式类
 * @params {_value}: 响应式值
 * @params {ReactiveFlags.IS_REF}: 标识是否是ref
 * @params {sub}: 订阅者
 * @methods {get}: 获取响应式值
 * @mehtods {set}: 设置响应式值
 */
class RefImpl {
  _value;
  sub; // [!code --]
  subs: Link; // 当前响应式变量的依赖函数链表 // [!code ++]
  subsTail: Link; // 链表的尾指针 // [!code ++]
  [ReactiveFlags.IS_REF] = true;

  constructor(value) {
    this._value = value
  }

  get value() {
    if (activeSub) {
      this.sub = activeSub // [!code --]
      const newLink: Link = { // [!code ++]
        sub: activeSub, // [!code ++]
        prevSub: undefined, // [!code ++]
        nextSub: undefined, // [!code ++]
      } // [!code ++]
      if (this.subsTail) { // [!code ++]
        this.subsTail.nextSub = newLink // [!code ++]
        newLink.prevSub = this.subsTail // [!code ++]
        this.subsTail = newLink // [!code ++]
      } // [!code ++]
      else { // [!code ++]
        this.subs = this.subsTail = newLink // [!code ++]
      } // [!code ++]
    }
    return this._value
  }

  set value(newValue) {
    this._value = newValue
    this.sub?.()
  }
}
```

### 使用依赖

现在依赖以链表的方式存储在类中，想要使用，只需要遍历即可。但是前面介绍链表的时候有提到过，链表在循环的时候效率较低，所以这里会把它转为数组再做遍历操作。

```ts
import { activeSub } from './effect'

enum ReactiveFlags {
  IS_REF = '__v_isRef',
}

interface Link {
  sub: Function;
  prevSub: Link;
  nextSub: Link;
}

/**
 * ref 响应式类
 * @params {_value}: 响应式值
 * @params {ReactiveFlags.IS_REF}: 标识是否是ref
 * @params {sub}: 订阅者
 * @methods {get}: 获取响应式值
 * @mehtods {set}: 设置响应式值
 */
class RefImpl {
  _value;
  sub;
  subs: Link; // 当前响应式变量的依赖函数链表
  subsTail: Link; // 链表的尾指针
  [ReactiveFlags.IS_REF] = true;

  constructor(value) {
    this._value = value
  }

  get value() {
    if (activeSub) {
      this.sub = activeSub
      const newLink: Link = {
        sub: activeSub,
        prevSub: undefined,
        nextSub: undefined,
      }
      if (this.subsTail) {
        this.subsTail.nextSub = newLink
        newLink.prevSub = this.subsTail
        this.subsTail = newLink
      }
      else {
        this.subs = this.subsTail = newLink
      }
    }
    return this._value
  }

  set value(newValue) {
    this._value = newValue
    let link = this.subs // [!code ++]
    let queueEffects = [] // [!code ++]
    while (link) { // [!code ++]
      queueEffects.push(link.sub) // [!code ++]
      link = link.nextSub // [!code ++]
    } // [!code ++]
    queueEffects.forEach(effect => effect()) // [!code ++]
  }
}
```

### 代码提取

这部分响应式依赖收集和运行代码后续实现 `reactive` 时也需要用，因此提取出来作为公共函数，放在 `system.ts` 中，代码如下：

::: code-group
```ts [system.ts]
export interface Link {
  sub: Function,
  nextSub: Link | undefined, // 下一个订阅者
  prevSub: Link | undefined // 上一个订阅者
}

/**
 * 订阅当前副作用函数，添加到订阅者链表中
 */
export const link = (dep, sub) => {
  const newLink: Link = {
    sub,
    nextSub: undefined,
    prevSub: undefined
  }

  if (dep.subsTail) {
    // 如果有尾指针，说明当前已经存在链表，让链表最后一个节点的next指向当前节点，当前节点的prev指向最后一个节点。最后再移动尾指针
    dep.subsTail.nextSub = link
    link.prevSub = dep.subsTail
    dep.subsTail = link
  }
  else {
    // 如果没有尾指针，说明当前链表为空，直接让头指针指向当前节点，尾指针指向当前节点
    dep.subs = link
    dep.subsTail = link
  }
}

export const propagate = (subs) => {
  let link = subs
  let queueEffects = []
  while (link) {
    queueEffects.push(link.sub)
    link = link.nextSub
  }
  queueEffects.forEach(effect => effect())
}
```
```ts [reactivity.ts]
import { activeSub } from './effect'
import { link, propagate, type Link } from './system' // [!code focus]

enum ReactiveFlags {
  IS_REF = '__v_isRef',
}

/**
 * ref 响应式类
 * @params {_value}: 响应式值
 * @params {ReactiveFlags.IS_REF}: 标识是否是ref
 * @params {sub}: 订阅者
 * @methods {get}: 获取响应式值
 * @mehtods {set}: 设置响应式值
 */
class RefImpl {
  _value;
  subs: Link; // [!code focus]
  subsTail: Link; // [!code focus]
  [ReactiveFlags.IS_REF] = true;

  constructor(value) {
    this._value = value
  }

  get value() { // [!code focus]
    if (activeSub) { // [!code focus]
      trackRef(this) // [!code focus]
    } // [!code focus]
    return this._value // [!code focus]
  } // [!code focus]

  set value(newValue) { // [!code focus]
    this._value = newValue // [!code focus]
    triggerRef(this) // [!code focus]
  } // [!code focus]
}

/**
 * 创建响应式对象
 * @params {value}: 响应式对象
 * @returns {RefImpl}: 响应式对象
 */
export function ref(value) {
  return new RefImpl(value)
}

/**
 * 判断是否是ref
 * @params {value}: 响应式对象
 * @returns {boolean}: 是否是ref
 */
export function isRef(value) {
  return (!!value && value?.[ReactiveFlags.IS_REF])
}

export function trackRef (dep) { // [!code focus]
  link(dep, activeSub) // [!code focus]
} // [!code focus]

export function triggerRef (dep) { // [!code focus]
  propagate(dep.subs) // [!code focus]
} // [!code focus]
```
:::

### 小结

副作用函数的收集不再是直接保存一个函数，而是以链表的方式收集多个副作用函数，第一次触发副作用函数时把它保存到头部，后续的副作用函数依次保存为下一个节点。并且当触发 `trigger` 时，会遍历链表，生成一个数组，依次执行每个副作用函数。

## Effect完善

### effect嵌套

现在要完善一下 `effect` 函数，目前的 `effect` 函数只是简单的赋值操作，应该要修改为类式的写法，构造器接收一个 `fn` 函数，并且要有一个 `run` 方法，当执行 `run` 方法时，不再是单纯保存 `fn` 函数，而是把当前的类赋值给 `activeSub`，然后 `return` 返回 `fn` 函数的执行结果，执行完毕后再把 `activeSub` 实例变为 `undefined`。

> [!NOTE] 备注
> 由于 `return` 后面的代码不会再执行，但是又需要执行完 `return` 后再清掉 `activeSub`，所以这里使用了 `try...finally` 语句，执行完 `try` 内的代码后再执行 `finally` 内的代码。

而对应的，`system` 中也要做相应的修改，数组 `queueEffect` 遍历后不再是直接调用函数，而是调用 `effect` 实例的 `run` 方法。

::: code-group
```ts [effect.ts]
export let activeSub;

class ReactiveEffect { // [!code focus]
  constructor(public fn) {} // [!code focus]

  run() { // [!code focus]
    // 每次执行都把 fn 放到 activeSub 中，让 reactivity 收集依赖 // [!code focus]
    activeSub = this // [!code focus]
    try { // [!code focus]
      return this.fn() // [!code focus]
    } finally { // [!code focus]
      activeSub = undefined // [!code focus]
    } // [!code focus]
  } // [!code focus]
} // [!code focus]

/**
 * 依赖收集
 * @param {fn}: Function
 */
export const effect = (fn) => {
  const effect = new ReactiveEffect(fn) // [!code focus]
  effect.run() // [!code focus]
}
```
```ts [system.ts]
import { ReactiveEffect } from 'vue' // [!code ++]

export interface Link {
  sub: Function, // [!code --]
  sub: ReactiveEffect, // [!code ++]
  nextSub: Link | undefined, // 下一个订阅者
  prevSub: Link | undefined // 上一个订阅者
}

/**
 * 订阅当前副作用函数，添加到订阅者链表中
 */
export const link = (subs, activeSub) => {
  const link: Link = {
    sub: activeSub,
    nextSub: undefined,
    prevSub: undefined
  }

  if (subs.subsTail) {
    // 如果有尾指针，说明当前已经存在链表，让链表最后一个节点的next指向当前节点，当前节点的prev指向最后一个节点。最后再移动尾指针
    subs.subsTail.nextSub = link
    link.prevSub = subs.subsTail
    subs.subsTail = link
  }
  else {
    // 如果没有尾指针，说明当前链表为空，直接让头指针指向当前节点，尾指针指向当前节点
    subs.subs = link
    subs.subsTail = link
  }
}

export const propagate = (subs) => {
  let link = subs.subs
  let queueEffects = []
  while (link) {
    queueEffects.push(link.sub)
    link = link.nextSub
  }
  queueEffects.forEach(effect => effect()) // [!code --]
  queueEffects.forEach(effect => effect.run()) // [!code ++]
}
```
:::

目前看起来好像可以正常工作了，但是还是存在一点问题，先看一段代码：

```js
effect(() => {
  effect(() => {
    console.log('count+++++2', count.value);
  })
  console.log('count----1', count.value);
})
```

预想中他应该分别打印两次，但是实际上运行后，发现只打印一次 `count----1`， 打印两次 `count+++++2`，这是为什么呢？

打一个 `debugger` ，调试一下 `effect` 的运行情况，可以发现：
1. 它先执行了 `activeSub = this` 把当前的类实例赋值给 `activeSub`，此时的 `activeSub` 等于最外层的 `effect` 函数的类实例。
2. 然后执行 `return this.fn()` 运行这个函数，运行函数第一行又遇到 `effect` 副作用函数，注意此时最外层的 `effect` 副作用函数还没执行完，又创建了一个新的 `effect` 类实例，此时 `activeSub` 等于新的 `effect` 类实例。
3. 然后执行 `return this.fn()` 运行这个函数，运行函数第一行是 `console.log('count+++++2', count.value);` ，触发了 `get` ， `if (activeSub)` 判断为真，收集依赖，打印
4. 内部的 `effect` 执行完毕，`activeSub` 等于 `undefined`，然后继续执行外部的 `effect` 副作用函数，执行到 `console.log('count----1', count.value);`，触发了 `get` ，由于此时 `activeSub` 已经变为 `undefined` 了， `if (activeSub)` 判断为假，依赖收集失败，跳过了，因此无法打印了。

因此最后不能只是简单的把 `activeSub` 清空，而是在一开始新建一个 `prevSub` 变量，`activeSub` 赋值保存给 `prevSub` ，后面执行完代码后，再把 `prevSub` 赋值给 `activeSub` ，恢复之前的副作用函数。

```ts
class ReactiveEffect {
  constructor(public fn) {}

  run() {
    // 把当前的 effect 保存，后面执行完 fn 函数后再获取 // [!code ++]
    let prevSub = activeSub // [!code ++]
    // 每次执行都把 fn 放到 activeSub 中，让 reactivity 收集依赖
    activeSub = this
    try {
      return this.fn()
    } finally {
      activeSub = undefined // [!code --]
      activeSub = prevSub // [!code ++]
    }
  }
}
```

> [!NOTE] 备注
> 如果是第一个 `effect` 函数，则 `activeSub` 为 `undefined` ，所以 `prevSub = activeSub` 保存到的是 `undefined` ，执行完毕后 `activeSub = prevSub` 实际上还是赋值 `undefined` ，不会影响。

### scheduler调度器

`scheduler` 是一个调度器，作为 `effect` 的第二个参数对象中的一个属性，作用是如果传了 `scheduler` ，则 `effect` 的执行会由 `scheduler` 控制，而不是直接执行 `effect` 的 `fn` 函数。

```ts
effect(() => {
  console.log('count----1', count.value);
}, {
  scheduler: () => {
    console.log('scheduler----');
  }
})
```

上方代码最终执行结果为：`scheduler----`。因此 `effect` 函数要接收第二个参数 `options` 对象，使用 `Object.assign` 方法合并原来的类实例和 `options` 对象属性。`ReactiveEffect` 类中增加 `scheduler` 属性，默认执行 `run` 方法；如果传了 `scheduler` ，则执行 `scheduler`。再新增一个 `notify` 方法，用于执行 `scheduler` 函数。`notify` 方法作为最终外部调用方法，内部无论如何变化，外部只需要调用 `notify` 方法即可。

::: code-group
```ts [system.ts]
export const propagate = (subs) => {
  let link = subs.subs
  let queueEffects = []
  while (link) {
    queueEffects.push(link.sub)
    link = link.nextSub
  }
  queueEffects.forEach(effect => effect.run()) // [!code --]
  queueEffects.forEach(effect => effect.notify()) // [!code ++]
}
```
```ts [effect.ts]
class ReactiveEffect {
  constructor(public fn) {}

  run() {
    // 把当前的 effect 保存，后面执行完 fn 函数后再获取
    let prevSub = activeSub;
    // 每次执行都把 fn 放到 activeSub 中，让 reactivity 收集依赖
    activeSub = this;
    try {
      return this.fn();
    } finally {
      activeSub = prevSub;
    }
  }

  notify() { // [!code ++]
    this.scheduler(); // [!code ++]
  } // [!code ++]

  scheduler() { // [!code ++]
    this.run(); // [!code ++]
  } // [!code ++]
}

/**
 * 依赖收集
 * @param {fn}: Function
 */
export const effect = (fn, options) => {
  const e = new ReactiveEffect(fn);
  Object.assign(e, options); // [!code ++]
  e.run(); // [!code ++]

  const runner = e.run.bind(e); // [!code ++]
  runner.effect = e; // [!code ++]
  return runner // [!code ++]
};
```
:::

### 小结

`effect` 不再是普通的函数，而是一个类实例，并扩展了 `run`、`scheduler` 方法，`run` 方法执行并返回 `fn` 函数的结果，并收集依赖，`scheduler` 方法执行 `run` 方法，如果使用时第二个参数传入包含 `scheduler` 方法的对象，则实例方法会覆盖类方法。`reactivity` 类中只需要执行 `notify` 方法即可，无需理会内部的逻辑。`effect` 最后通过修改 `this` 指向，返回一个函数，并在函数内添加一个 `effect` 属性，指向当前实例，方便后续操作。

## dep与sub双向关联与复用

### 问题复现

下面来看一段代码：

```html
<body>
  <button>click me</button>
  <script type="module">
    import {ref, effect} from '../dist/reactivity.esm.js'

    const flag = ref(true)
    const btn = document.querySelector('button')

    effect(() => {
      flag.value
      console.count('run effect, flag');
    })

    btn.addEventListener('click', () => {
      flag.value = !flag.value
    })
  </script>
</body>
```

每次点击都会修改 `flag` 的值，触发 `effect` 函数，点击 4 次后，预想情况是执行 4 次，但是最终结果为执行了8 次！

![执行了8次](https://pic1.imgdb.cn/item/681468b658cb8da5c8d68851.png)

之所以会出现这种情况，是因为每次执行点击事件，触发 `effect` 函数，而 `effect` 函数内部又调用了 `flag.value`，导致又创建一个 `effect` 实例，并收集依赖，保存到链表中，导致依赖重复收集，最终导致执行了 8 次。

如果还是不理解，下面依次拆解一下代码执行逻辑顺序：
- 刚进入页面，执行了一次 `effect` 函数，运行了 `flag.value`，添加一个 `newLink` 到链表中，此时 `flag` 的 `dep` 链表中保存了一个 `effect` 实例。
  
  此时链表内保存了一个节点： `effect`

- 点击按钮，修改了 `flag` 的值，链表内的依赖函数触发，调用保存的 `effect` 函数，运行 `flag.value`，添加一个 `newLink` 到链表中，此时 `flag` 的 `dep` 链表中保存了两个 `effect` 实例。
  
  此时链表内保存了两个节点： `effect -> effect`

- 再次点击按钮，修改了 `flag` 的值，链表内的依赖函数触发，调用保存的 `effect` 函数，一共两个，分别都运行一次 `flag.value`，添加两个 `newLink` 到链表中，此时 `flag` 的 `dep` 链表中保存了四个 `effect` 实例。
  
  此时链表内保存了四个节点： `effect -> effect -> effect -> effect`

以此类推，每次触发点击事件，都会修改 `flag` 的值，触发链表内的依赖函数，执行了 `flag.value` 语句后，添加新的 `newLink` 到链表中，导致链表内保存了更多的 `effect` 实例，最终导致执行了 8 次。

为了解决这个问题，我们需要给 `effect` 类实例添加一个链表，头节点指针 `deps` 和尾节点指针 `depsTail` 指向对应的节点 `link` ，节点 `link` 的 `dep` 指向对应的响应式变量。每次指向 `effect` 方法时，都先将它的尾节点指针 `depsTail` 指向 `undefined`，然后判断，如果有头节点指针 `deps`，且尾节点指针 `depsTail` 为 `undefined`，则说明该次是相同的依赖，方法可以复用，就不需要多创建节点了。

### 双向关联依赖项收集

根据上面的解决方法，我们需要为 `effect` 生成对应的链表，指向对应的节点 `link`，节点 `link` 的 `dep` 指向对应的响应式变量。画一个图，方便理解：

![依赖项收集](https://pic1.imgdb.cn/item/6814762858cb8da5c8d68ba8.png)

在 `effect.ts` 中，我们为类新增两个属性：`deps` 和 `depsTail`，分别指向依赖项头节点指针和依赖项尾节点指针。

在 `system.ts` 中，我们修改一下 <SpecialWords text="TypeScript" /> 类型，新增 `Dep` 和 `Sub` 类型，分别有头尾指针，类型为 `Link`，然后修改 `Link` 类型，新增 `dep` 和 `nextDep` 属性，分别指向对应的响应式变量和下一个节点。

::: code-group
```ts [effect.ts]
import { link } from "./system"; // [!code ++]

export let activeSub;

/**
 * ref 响应式类
 * @params {deps}: 依赖项链表头节点
 * @params {depsTail}: 依赖项链表尾节点
 * @methods {run}: 执行响应式函数
 * @mehtods {scheduler}: 调度函数
 * @mehtods {notify}: 最终调度函数
 */
class ReactiveEffect {
  deps: Link | undefined; // [!code ++]
  depsTail: Link | undefined; // [!code ++]

  constructor(public fn) {}
}
```
```ts [system.ts]
/**
 * 订阅者
 */
export interface Dep { // [!code ++]
  subs: Link | undefined; // 订阅者头节点 // [!code ++]
  subsTail: Link | undefined; // 订阅者尾节点 // [!code ++]
} // [!code ++]

/**
 * 依赖项
 */
export interface Sub { // [!code ++]
  deps: Link | undefined; // 订阅者头节点 // [!code ++]
  depsTail: Link | undefined; // 订阅者尾节点 // [!code ++]
} // [!code ++]

export interface Link {
  sub: Sub; // [!code ++]
  nextSub: Link | undefined; // 下一个订阅者节点
  prevSub: Link | undefined; // 上一个订阅者节点
  dep: Dep; // [!code ++]
  nextDep: Link | undefined; // 下一个依赖项节点 // [!code ++]
}

/**
 * 订阅当前副作用函数，添加到订阅者链表中
 */
export const link = (dep, sub) => {
  const newLink: Link = {
    sub,
    nextSub: undefined,
    prevSub: undefined,
    dep, // [!code ++]
    nextDep: undefined, // [!code ++]
  };

  // region 订阅者链表与 dep 建立关联关系
  if (dep.subsTail) {
    // 如果有尾指针，说明当前已经存在链表，让链表最后一个节点的next指向当前节点，当前节点的prev指向最后一个节点。最后再移动尾指针
    dep.subsTail.nextSub = newLink;
    newLink.prevSub = dep.subsTail;
    dep.subsTail = newLink;
  } else {
    // 如果没有尾指针，说明当前链表为空，直接让头指针指向当前节点，尾指针指向当前节点
    dep.subs = newLink;
    dep.subsTail = newLink;
  }
  // endregion

  // region 依赖项链表与 sub 建立关联关系 // [!code ++]
  if (sub.depsTail) { // [!code ++]
    // 如果有尾指针，说明当前已经存在链表，让链表最后一个节点的next指向当前节点，最后再移动尾指针 // [!code ++]
    sub.depsTail.nextDep = newLink; // [!code ++]
    sub.depsTail = newLink; // [!code ++]
  } else { // [!code ++]
    // 如果没有尾指针，说明当前链表为空，直接让头指针指向当前节点，尾指针指向当前节点 // [!code ++]
    sub.deps = newLink; // [!code ++]
    sub.depsTail = newLink; // [!code ++]
  } // [!code ++]
  // endregion // [!code ++]
};
```
:::

### 节点复用

根据之前的思想，每次调用 `effect` 方法时，先把当前的尾指针 `depsTail` 置为 `undefined`，每次要创建新的 `newLink` 前，先判断当前的依赖项 `sub` 的 `deps` 是否存在，如果存在且 `depsTail` 为空，则直接复用 `sub.deps`，否则获取下一个节点。

![节点复用](https://pic1.imgdb.cn/item/68147c8458cb8da5c8d6a64d.png)

::: code-group
```ts [effect.ts]
run() {
  this.depsTail = undefined; // [!code ++]
  // 把当前的 effect 保存，后面执行完 fn 函数后再获取
  let prevSub = activeSub;
  // 每次执行都把 fn 放到 activeSub 中，让 reactivity 收集依赖
  activeSub = this;
  try {
    return this.fn();
  } finally {
    activeSub = prevSub;
  }
}
```
```ts [system.ts]
export const link = (dep, sub) => {
  const currentDep = sub.depsTail // [!code ++]
  const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep // [!code ++]
  if (nextDep && nextDep.dep === dep) { // [!code ++]
    sub.depsTail = nextDep // [!code ++]
    return // [!code ++]
  } // [!code ++]

  const newLink: Link = {
    sub,
    nextSub: undefined,
    prevSub: undefined,
    dep,
    nextDep: undefined,
  };
};
```
:::

## 总结

本章主要实现 `ref` 基础实现。

先新建一个 `ref.ts` 文件，创建一个 `RefImpl` 类，构造器接收一个值，赋值给 `_value`。当获取值时，触发 `get` 方法，返回 `this._value` ；当设置赋值时，触发 `set` 方法，把新值赋值给 `this._value`。

创建并导出一个 `ref` 函数，接收一个值，返回一个 `new RefImpl` 实例。因此用 `ref` 实际上获取的是 `RefImpl` 类的 `_value` 属性。

再创建一个 `effect.ts` 文件，创建一个 `EffectReactive` 类，构造器接收一个函数 `fn` ，