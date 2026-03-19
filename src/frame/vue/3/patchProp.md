# patchProp

## 创建函数

在 `runtime-dom/src` 文件夹下新建一个 `patchProp.ts` 文件，导出 `patchProp` 函数。修改 `index.ts`，引入对应的函数并统一导出。

::: code-group
```ts [runtime-dom/src/patchProp.ts]
export function patchProp(el, key, prevValue, nextValue) {
  console.log(el, key, prevValue, nextValue);
}
```
```ts [runtime-dom/src/index.ts]
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp"; // [!code ++]

export * from "@vue/runtime-core";

const renderOptions = { patchProp, ...nodeOps } // [!code ++]

export { renderOptions }; // [!code ++]
```
:::

回到 `html` 文件，修改引入的内容。

```html
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script type="module">
    import { renderOptions } from "../dist/vue.esm.js"; // [!code ++]
    
    const app = document.getElementById('app')
    const { h, createRenderer } = Vue

    const vmode = h('div', {class: 'daodao'}, 'hello vue') // [!code ++]

    const renderer = createRenderer(renderOptions) // [!code ++]
    
    renderer.render(vmode, app)
  </script>
</body>
```

查看控制台，能看到打印的节点和其类名等属性。

![打印的节点和其类名等属性](https://pic1.imgdb.cn/item/69ba64b0b96fa53fd04c158c.png)

这四个属性分别为：

- `el`：组件节点
- `key`：属性名
- `prevValue`：旧属性值
- `nextValue`：新属性值

现在要做的就是如何正确的为<word text="DOM" />节点挂载和卸载类名。

## 类名等属性的挂载和卸载

### class

在 `runtime-dom/src` 文件夹下新建一个 `modules` 文件夹，用于存放配置文件。新建一个 `patchClass.ts` 文件，导出一个 `patchClass` 函数，用于处理类名的变更。

判断当前属性是否存在 `class` 值，如果有则 `className` 添加类名；没有则 `removeAttribute` 移除该属性。

::: code-group
```ts [runtime-dom/src/modules/patchClass.ts]
export function patchClass (el, value) {
  if (value) {
    el.className = value;
  }
  else {
    el.removeAttribute("class");
  }
}
```
```ts [runtime-dom/src/patchProp.ts]
import { patchClass } from  './modules/patchClass' // [!code ++]

export function patchProp(el, key, prevValue, nextValue) {
  console.log(el, key, prevValue, nextValue);
  // [!code ++]
  if (key === 'class') {
    patchClass(el, nextValue) // [!code ++]
  } // [!code ++]
}
```
```html
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script type="module">
    import { renderOptions } from "../dist/vue.esm.js";

    const app = document.getElementById('app')
    const { h, createRenderer } = Vue

    const vmode = h('div', {class: 'daodao'}, 'hello vue')
    const vmode2 = h('div', {}, 'hello vue')

    const renderer = createRenderer(renderOptions)
    renderer.render(vmode, app)

    // 一秒后更新类名 // [!code ++]
    // [!code ++]
    setTimeout(() => {
      renderer.render(vmode2, app) // [!code ++]
    }, 1000) // [!code ++]
  </script>
</body>
```
:::

### style

在 `runtime-dom/src/modules` 文件夹下新建一个 `patchStyle.ts` 文件，导出一个 `patchStyle` 函数，用于处理样式的变更。

首先需要思考以下几个情景：

1. 传入了新的 `style`，该怎么处理
2. 之前设置过 `style`，后面删了，该怎么处理

当传入新的样式时，`for...in` 循环遍历 `style` 对象，依次添加到 `el.style` 上。

当新样式没有而旧样式还残留的样式配置（例如旧样式为 `background: skyblue`，新样式没有设置 `background`），则通过判断 `!(key in nextValue)`，符合条件的都清空。

::: code-group
```ts [runtime-dom/src/modules/patchStyle.ts]
export function patchStyle (el, prevValue, nextValue) {
  const style = el.style;
  if (nextValue) {
    /**
     * 新的样式都保存到 style 中
     */
    for (const key in nextValue) {
      style[key] = nextValue[key];
    }
  }

  if (prevValue) {
    for (const key in prevValue) {
      /**
       * 把之前有的，现在没有的，给清掉
       */
      if (!(key in nextValue)) {
        style[key] = null;
      }
    }
  }
}
```
```html
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script type="module">
    import { renderOptions } from "../dist/vue.esm.js";

    const app = document.getElementById('app')
    const { h, createRenderer } = Vue

    const vmode = h('div', {style: {color: 'red'}}, 'hello vue')
    const vmode2 = h('div', {style: {color: 'yellow', background: 'skyblue'}}, 'hello vue') // [!code ++]

    const renderer = createRenderer(renderOptions)
    renderer.render(vmode, app)

    setTimeout(() => {
      renderer.render(vmode2, app)
    }, 1000)
  </script>
</body>
```
:::

### 事件

在 `runtime-dom/src/modules` 文件夹下新建一个 `patchEvent.ts` 文件，导出一个 `patchEvent` 函数，用于处理事件的变更。

事件一般是由 `on` + 事件名的方式，因此可以写一个正则判断是否是事件。该正则由于其他地方也可能用到，因此写到 `shared/src/index.ts` 文件内，再通过命令行 `pnpm install @vue/shared -workspace --filter @vue/runtime-dom` 安装。

在 `patchEvent` 事件中，通过裁剪字符串拿到事件名，然后判断 `prevValue` 是否有值，有值则先卸载旧的事件，再绑定新的事件。

```ts [shared/src/index.ts]
export function patchEvnet (el, key, prevValue, nextValue) {
  const methodName = key.slice(2).toLowerCase()

  if (prevValue) {
    el.removeEventListener(methodName, prevValue)
  }

  el.addEventListener(methodName, nextValue)
}
```

效果虽然实现了，但是每次更新都要解绑事件后，再绑定新事件，性能消耗上会很大。

```ts [示例代码.ts]
const fn1 = () => {}
const fn2 = () => {}
el.addEventListener('click', e => { fn1(e) })
```

修改为以上的形式，事件绑定不变，需要更新时，只需要改变内部调用的方法即可。这样即可减轻性能消耗。

创建一个新的函数 `createInvoker`，接收一个函数 `callback`。声明一个函数 `invoker`，调用 `invoker.value` 函数。然后为 `invoker.value` 赋值为当前接收的函数 `callback`。这样，每次更新事件后，`invoker.value` 都是最新的函数，`invoker` 执行的也是最新的事件。

最后再 `return` 出去。

```ts [runtime-dom/src/modules/patchEvent.ts]
function createInvoker(callback) {
  /**
   * 创建一个事件，内部调用 invoker.value
   * 如果需要更新事件，那后面直接修改 invoker.value
   * @param e
   */
  const invoker = (e) => {
    invoker.value(e)
  }
  invoker.value = callback
  return invoker
}
```

回到 `patchEvent` 方法，先创建一个 `invokers` 对象，用于保存最新的事件方法，然后声明变量 `existingInvoker` 用于拿到之前绑定的 `invoker`，此时分为两种情况：

1. 有新事件，则判断一下之前是否绑定过 `invoker`，如果有，则直接修改 `existingInvoker.value` 为新事件 `nextValue`，无需再绑定事件；没有，则创建一个新的 `invoker`，保存到 `existingInvoker[key]` 里，然后绑定事件。
2. 无新事件，则判断旧事件 `existingInvoker` 是否还存在，若存在，则说明之前绑定过事件，此时解绑事件并把 `existingInvoker.value` 置空。

```ts [runtime-dom/src/modules/patchEvent.ts]
export function patchEvnet (el, key, prevValue, nextValue) {
  const methodName = key.slice(2).toLowerCase()

  const invokers = (el._vei ??= {}) // 简写，实际等于 el._vei = el._vei ?? {} // [!code ++]
  const existingInvoker = invokers[key] // 拿到之前绑定的 invoker // [!code ++]
  // 存在新事件 // [!code ++]
  // [!code ++]
  if (nextValue) {
    // [!code ++]
    if (existingInvoker) {
      // 下一次进来，应该是有值的。有值则说明之前绑定了，直接更新 invoker.value 的值即可 // [!code ++]
      existingInvoker.value = nextValue // [!code ++]
      return // [!code ++]
    } // [!code ++]
    // 创建一个新的 invoker // [!code ++]
    const invoker = createInvoker(nextValue) // [!code ++]
    invokers[key] = invoker // [!code ++]
    el.addEventListener(methodName, invoker) // [!code ++]
  } // [!code ++]
  // [!code ++]
  else {
    // 没有新事件，且还有旧事件，则直接移除 // [!code ++]
    // [!code ++]
    if (existingInvoker) {
      el.removeEventListener(methodName, existingInvoker) // [!code ++]
      invokers[key] = undefined // [!code ++]
    } // [!code ++]
  } // [!code ++]
}

function createInvoker(callback) {
  /**
   * 创建一个事件，内部调用 invoker.value
   * 如果需要更新事件，那后面直接修改 invoker.value
   * @param e
   */
  const invoker = (e) => {
    invoker.value(e)
  }
  invoker.value = callback
  return invoker
}
```

### Attr

其他属性同理，判断它的值是否是 `undefined`，如果是则移除该属性；反之，则添加该属性。

```ts [runtime-dom/src/modules/patchAttr.ts]
export function patchAttr(el, key, nextValue) {
  if (nextValue == undefined) {
    el.removeAttribute(key);
  }
  else {
    el.setAttribute(key, nextValue);
  }
}
```