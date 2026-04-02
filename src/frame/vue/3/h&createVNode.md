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
- `type`：表示虚拟节点的类型，可以是字符串、对象、函数等。
- `props`：表示虚拟节点的属性，可以是对象、数组等。
- `children`：表示虚拟节点的子节点，可以是字符串、数组、虚拟节点等。
- `key`：表示虚拟节点的 `key`，用于 `diff` 算法。
- `el`：表示虚拟节点对应的真实 DOM 元素。
- `shapeFlag`：表示虚拟节点的类型，用于优化渲染。

### shapeFlag是什么

如果没有加上 `shapeFlag`，则页面无效果，会报警告。这个 `shapeFlag` 有什么作用呢？

`shapeFlag` 涉及到一些二进制的位运算。