# h和createVNode的实现

## render

在 `@vue/runtime-core/src/renderer.ts` 文件，导出一个函数 `createRenderer`，用于创建渲染器。该函数 `return` 返回一个对象，包含 `render` 和 `createApp` 两个方法。

回到 `@vue/runtime-dom/src/index.ts` 文件，导入 `createRenderer` 函数，并调用该函数，将返回的渲染器对象赋值给 `renderer` 变量。

::: code-group

```ts [@vue/runtime-core/src/renderer.ts]
export function createRenderer(options) {
  console.log(options)

  // [!code ++]
  const render = (vnode, container) => {
    // 真正渲染逻辑 // [!code ++]
    console.log(vnode, container) // [!code ++]
  } // [!code ++]

  return {
    render,
  }
}
```

```ts [@vue/runtime-dom/src/index.ts]
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'
import { createRenderer } from '@vue/runtime-core' // 核心包 // [!code ++]

export * from '@vue/runtime-core'

const renderOptions = { patchProp, ...nodeOps }

const renderer = createRenderer(renderOptions) // [!code ++]

// [!code ++]
export function render(vnode, container) {
  renderer.render(vnode, container) // [!code ++]
} // [!code ++]

export { renderOptions }
```

:::

接下来思考一下 `h` 函数应该如何封装。

## h 函数创建

众所周知，`h` 函数有以下几种使用方式：

1. 单纯元素文本
   
   ```ts
   h('div', 'hello world')
   ```

2. 元素内嵌套子元素
      
   ```ts
   h('div', h('span', 'hello world'))
   h('div', [h('span', 'hello'), h('span', 'vue')])
   ```

3. 元素有自定义属性
   
   ```ts
   h('div', { class: 'container' })
   h('div', { class: 'container' }, 'hello world')
   h('div', { class: 'container' }, h('span', 'hello world'))
   h('div', { class: 'container' }, h('span', 'hello'), h('span', 'vue'))
   ```

根据上面的三种情况做分析，可以得出，`h` 函数接收的参数规律：

1. 第一个参数是 `string` 类型，表示标签名
2. 第二个参数有可能是字符串，表示文本内容；也有可能是对象，表示标签的 `props` 属性；还有可能是虚拟节点（数组或单个），表示子元素
3. 第三个参数是可选的，表示文本内容。只有第二个参数为 `props` 属性对象时，第三个参数才有效

接下来实现一下。

新建 `@vue/runtime-core/src/h.ts` 文件，导出一个 `h` 函数，它包含三个参数：

1. `type`：标签名或组件
2. `propsOrChildren`：标签的 `props` 属性对象或文本内容，可选
3. `children`：子元素，可选

```ts [@vue/runtime-core/src/h.ts]
export function h(type, propsOrChildren?, children?) {
}
```

`h` 函数主要作用时对 `createVNode` 做一个参数标准化（归一化），它不创建虚拟<word text="DOM"/>。

## createVNode 函数创建

`createVNode` 函数接收三个参数：

1. `type`：标签名或组件
2. `props`：标签的 `props` 属性对象，可选
3. `children`：子元素，可选

它与 `h` 函数的区别是，`h` 函数第二个参数可以是 `props` 属性对象或文本内容，而 `createVNode` 函数第二个参数只能是 `props` 属性对象。

```ts [@vue/runtime-core/src/h.ts]
export function createVNode(type, props?, children?) {
}
```

## h和createVNode的实现

接下来就是实现这两个函数，首先判断 `h` 函数的形参长度。

如果长度为 2，则需要做以下处理：

1. 判断第二个参数是否是对象。
   
   - 是对象，需要再判断是否是 `vnode` 节点。
  
     - 是 `vnode` 节点，调用并返回 `createVNode` 函数，将第二个参数 `propsOrChildren` 作为 `children` 传入，需要包裹为数组。
     - 不是 `vnode` 节点，调用并返回 `createVNode` 函数，将第二个参数 `propsOrChildren` 作为 `props` 传入。

2. 判断第二个参数是否是数组。调用并返回 `createVNode` 函数，将第二个参数作为 `children` 传入。

3. 都不是，调用并返回 `createVNode` 函数，将第二个参数 `propsOrChildren` 作为 `children` 传入，不需要包裹为数组。

如果长度不为 2，则需要做如下处理：

1. 判断长度是否大于 3。大于 3 则用 `slice` 截取参数，把截取到的参数用数组包裹。
   
   ```ts
   h('div', { class: 'container' }, h('div', 'hello world'), h('div', 'hello vue'))
   /**
    * 转换为
    */
   h('div', { class: 'container' }, [h('div', 'hello world'), h('div', 'hello vue')])
   ```

2. 不大于 3，判断它是否是 `vnode` 节点，是则把 `children` 参数包裹为数组。
   
   ```ts
   h('div', { class: 'container' }, h('div', 'hello world'))
   ```

3. 最后返回 `createVNode` 函数，将参数依顺序传入。

::: code-group

```ts [@vue/runtime-core/src/h.ts]
export function h(type, propsOrChildren?, children?) {
  let l = arguments.length

  // 长度为2
  if (l === 2) {
    // 如果是数组，直接调用createVNode
    if (isArray(propsOrChildren)) {
      return createVNode(type, null, propsOrChildren)
    }

    // 如果是对象，判断是prop还是虚拟节点
    if (isObject(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren])
      }
      return createVNode(type, propsOrChildren, children)
    }

    // 不是数组不是对象，是文本内容，直接调用createVNode
    return createVNode(type, null, propsOrChildren)
  } else {
    if (l > 3) {
      children = [...arguments].slice(2)
    } else if (isVNode(children)) {
      children = [children]
    }
    return createVNode(type, propsOrChildren, children)
  }
}
```

```ts [share/index.ts]
export const isArray = Array.isArray // 判断是否是数组 // [!code ++]

// 判断是否是字符串 // [!code ++]
// [!code ++]
export function isString(value) {
  return typeof value === 'string' // [!code ++]
} // [!code ++]
```

:::

## isVNode的实现

`isVNode` 函数的实现比较简单，只需要判断 `type` 是否是对象，并且是否包含 `__v_isVNode` 属性即可。

```ts
export function isVNode(value: any) {
  return value ? value.__v_isVNode : false
}
```

> [!important] 总结
> 综上而言，`h` 函数并不参与虚拟节点的创建，它只是将参数整理成 `createVNode` 函数所需要的格式，然后调用 `createVNode` 函数。

## createVNode的实现

`createVNode` 函数首先要先声明一个变量 `vnode`，类型为一个对象，包含以下几种属性：

- `__v_isVNode`：表示这是一个虚拟节点。
- `type`：表示虚拟节点的类型，如 `div`、 `span` 等，可以是字符串、对象、函数等。
- `props`：表示虚拟节点的属性，可以是对象、数组等。
- `children`：表示虚拟节点的子节点，可以是字符串、数组、虚拟节点等。
- `key`：表示虚拟节点的 `key`，用于 `diff` 算法。
- `el`：表示虚拟节点对应的真实 DOM 元素。
- `shapeFlag`：表示虚拟节点的类型，用于优化渲染。

### shapeFlag是什么

如果没有加上 `shapeFlag`，则页面无效果，会报警告。这个 `shapeFlag` 有什么作用呢？

`shapeFlag` 涉及到一些二进制的位运算。如果 `shapeFlag` 为 9，表示 `type` 是一个<word text="DOM"/>元素，且它的 `children` 是一个字符串。

类比于现实世界的身份证，身份证前6位是地区码，后6位是出生日期码，最后一位是校验码。`shapeFlag` 就是虚拟节点的身份证，它记录了虚拟节点的类型和属性。

官方的 `shapeFlag` 定义如下：

```ts
// packages/shared/src/shapeFlags.ts
export enum ShapeFlags {
  // 表示 DOM 元素
  ELEMENT = 1,
  // 表示函数组件
  FUNCTIONAL_COMPONENT = 1 << 1,
  // 表示有状态组件（带有状态、生命周期等）
  STATEFUL_COMPONENT = 1 << 2,
  // 表示该节点的子节点是纯文本
  TEXT_CHILDREN = 1 << 3,
  // 表示该节点的子节点是数组形式（多个子节点）
  ARRAY_CHILDREN = 1 << 4,
  // 表示该节点的子节点是通过插槽（slots）传入的
  SLOTS_CHILDREN = 1 << 5,
  // 表示 Teleport 组件，用于将子节点传送到其他位置
  TELEPORT = 1 << 6,
  // 表示 Suspense 组件，用于处理异步加载组件时显示备用内容
  SUSPENSE = 1 << 7,
  // 表示该组件应当被 keep-alive（缓存）
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  // 表示该组件已经被 keep-alive（已缓存）
  COMPONENT_KEPT_ALIVE = 1 << 9,
  // 表示组件类型，有状态组件与无状态函数组件的组合
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
```

下面是进行判断某一个虚拟节点的类型：

```ts
let shapeFlag = 0

const vnode = {
  __v_isVNode: true,
  type: 'div',
  children: 'hello world',
  shapeFlag
}

if (typeof vnode.type === 'string') {
  shapeFlag = ShapeFlags.ELEMENT // 1
}

if (typeof vnode.children === 'string') {
  /**
   * 或运算
   * 0001
   * 1000
   * 1001
   */
  shapeFlag = shapeFlag | ShapeFlags.TEXT_CHILDREN // 1001
}

vnode.shapeFlag = shapeFlag

if (vnode.shapeFlag & ShapeFlags.ELEMENT) {
  /**
   * 与运算
   * 1001
   * 0001
   * 0001
   */
  console.log('是一个 dom 元素')
}

if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
  /**
   * 与运算 两个相同的位置，都是1，就是1
   * 1001
   * 1000
   * 1000
   */
  console.log('子元素是一个纯文本节点')
}

if (vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
  /**
   * 与运算
   * 01001
   * 10000
   * 00000
   */
  console.log('子元素是一个数组')
}
```

### shapeFlag 实现

接下来，需要实现一下 `shapeFlag`，新建 `packages/runtime-core/src/vnode.ts` 文件，把之前写好的 `isVNode` 和 `createVNode` 两个函数放到这个文件中：

```ts [packages/runtime-core/src/vnode.ts]
// 判断是否是vnode
export function isVNode(value) {
  return value ? value.__v_isVNode : false
}

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    key: props?.key, // 做diff用的
    __v_isVNode: true,
    el: null, // 虚拟节点要挂载的元素
    shapeFlag,
  }
}
```

判断一下当前的 `type` 是否是字符串，如果是字符串，说明是一个普通的 `dom` 元素；然后判断一下 `children`，如果 `children` 是字符串，说明是纯文本节点；如果 `children` 是数组，说明是多个子节点：

```ts [packages/runtime-core/src/vnode.ts]
import { isString, ShapeFlags } from '@vue/shared' // [!code ++]

// 判断是否是vnode
export function isVNode(value) {
  return value ? value.__v_isVNode : false
}

export function createVNode(type, props?, children?) {
  let shapeFlag // [!code ++]

  // 如果是字符串，说明是普通标签 // [!code ++]
   // [!code ++]
  if (isString(type)) {
    shapeFlag = ShapeFlags.ELEMENT // [!code ++]
  } // [!code ++]

  // 子元素是字符串，说明是文本 // [!code ++]
   // [!code ++]
  if (isString(children)) {
    shapeFlag |= ShapeFlags.TEXT_CHILDREN // [!code ++]
  }  // [!code ++]
  // 子元素是数组，说明是组件 // [!code ++]
   // [!code ++]
  else if (Array.isArray(children)) {
    shapeFlag |= ShapeFlags.ARRAY_CHILDREN // [!code ++]
  } // [!code ++]
  const vnode = {
    type,
    props,
    children,
    key: props?.key, // 做diff用的
    __v_isVNode: true,
    el: null, // 虚拟节点要挂载的元素
    shapeFlag,
  }
}
```