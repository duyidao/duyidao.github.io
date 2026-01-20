# 认识渲染器

## 渲染器

先来试一下如何创建一个虚拟节点。

```html
<body>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script type="module">
    const { h, render } = Vue;

    const vmode = h(
      "div",
      {
        id: "app",
      },
      "hello vue",
    );
    console.log(vmode);
  </script>
</body>
```

![创建一个虚拟节点](https://pic1.imgdb.cn/item/696f20f1b931ecccdc5afc55.png)

查看控制台打印，包含了以下属性：

- `__v_isVNode`：判断是否是虚拟节点的标志位。
- `el`：虚拟节点的 DOM 元素。
- `type`：虚拟节点的类型。
- `props`：虚拟节点的属性。
- `children`：虚拟节点的子节点。
- ...

如何把这个虚拟节点渲染到页面上呢？

通过渲染器 `render`，可以将虚拟节点转换为真实<word text="DOM" />，最终渲染到页面上。

```html
<body>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script type="module">
    const { h, render } = Vue;

    const vmode = h(
      "div",
      {
        id: "app",
      },
      "hello vue",
    );

    render(vmode, document.body); // [!code ++]
  </script>
</body>
```

## createRender

`render` 是官方提供的渲染器，我们自己也能手写一个渲染器。官方有导出一个 `createRenderer` 方法，可以创建一个渲染器实例。官方描述如下：

> 创建一个自定义渲染器。通过提供平台特定的节点创建以及更改 API，你可以在非 DOM 环境中也享受到 Vue 核心运行时的特性。

根据 [官方文档](https://cn.vuejs.org/api/custom-renderer.html#createrenderer) ，该方法需要接收以下参数：

- `insert`：用于将虚拟节点插入到真实<word text="DOM" />中。

  接收三个参数，分别为：
  1. `el`：虚拟节点。
  2. `parent`：父节点。
  3. `anchor`：锚点（可选）。不传则默认渲染到父节点的最后面；传了则渲染到指定节点之前。

- `remove`：用于将虚拟节点从真实<word text="DOM" />中移除。

  接收一个参数，为虚拟节点。

- `createElement`：用于创建真实<word text="DOM" />元素。

  接收一个参数 `type`，返回一个真实<word text="DOM" />元素。

  需要 `return` 创建的元素，否则会报错。

- `setElementText`：用于设置真实<word text="DOM" />元素的文本内容。

  接收两个参数，分别为：
  - `el`：虚拟节点。
  - `text`：文本内容。

本质上就是告诉 `render` 要怎么创建一个<word text="DOM" />。

最终返回一个对象，调用其 `render` 方法，挂载虚拟组件。

```html
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script type="module">
    const app = document.getElementById("app");
    const { h, createRenderer } = Vue;

    const vmode = h("div", "hello vue");

    const renderer = createRenderer({
      insert(el, parent, anchor) {
        // insertBefore 如果第二个参数为 null，则相当于 appendChild
        parent.insertBefore(el, anchor || null);
      },
      createElement(type) {
        return document.createElement(type);
      },
      setElementText(el, text) {
        el.textContent = text;
      },
      remove(el) {
        const parent = el.parentNode;
        if (parent) {
          parent.removeChild(el);
        }
      },
    });

    renderer.render(vmode, app);

    // 1.5 秒后，把节点更新为 null（相当于删除节点）
    setTimeout(() => {
      renderer.render(null, app);
    }, 1500);
  </script>
</body>
```

> [!IMPORTANT] 题外话
>
> `parent.insertBefore` 方法会把节点插入到 `anchor` 节点之前。
>
> 如果 `insert` 方法不传 `anchor`，则相当于 `parent.appendChild`，把节点插入到父节点的最后面。

## 其他属性

`createRender` 还有其他操作<word text="DOM" />的属性方法，常见的例如还有：

- `createText`：创建文本节点。

  接收一个 `text`，返回一个 `document.createTextNode(text)`，创建文本节点。

- `setText`：设置文本节点的文本内容。

  接收两个参数，分别为：
  1. `el`：文本节点。
  2. `text`：文本内容。

  返回 `el.nodeValue = text`，设置文本节点的文本内容。

- `parentNode`：获取节点的父节点。

  接收一个参数 `el`，返回 `el.parentNode`，获取节点的父节点。

- `nextSibling`：获取节点的下一个兄弟节点。

  接收一个参数 `el`，返回 `el.nextSibling`，获取节点的下一个兄弟节点。

- `querySelector`：查询节点。

  接收一个参数 `selector`，返回 `document.querySelector(selector)`，查询节点。

```html
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script type="module">
    const app = document.getElementById("app");
    const { h, createRenderer } = Vue;

    const vmode = h("div", "hello vue");

    const renderer = createRenderer({
      // 插入节点
      insert(el, parent, anchor) {
        parent.insertBefore(el, anchor);
      },
      // 创建元素
      createElement(type) {
        return document.createElement(type);
      },
      // 设置元素文本内容
      setElementText(el, text) {
        el.textContent = text;
      },
      // 移除节点
      remove(el) {
        const parent = el.parentNode;
        if (parent) {
          parent.removeChild(el);
        }
      },
      // 设置文本节点的文本内容
      setText(node, text) {
        return (node.textContent = text);
      },
      // 获取节点的父节点
      parentNode(el) {
        return el.parentNode;
      },
      // 获取节点的下一个兄弟节点
      nextSibling(el) {
        return el.nextSibling;
      },
      // 查询节点
      querySelector(selector) {
        return document.querySelector(selector);
      },
    });

    renderer.render(vmode, app);
  </script>
</body>
```

## 新建包

在项目中，新建一个包 `packages/runtime-core`，用于存放运行时的核心代码；再新建一个包 `packages/runtime-dom`，用于存放浏览器运行时的代码。

`runtime-core` 依赖响应式模块 `reactivity`，`runtime-dom` 依赖 `runtime-core`。最终<word text="Vue" />包导出了一个 `runtime-dom`。

打开终端，把 `@vue/reactivity` 和 `@vue/shared` 安装到 `runtime-core` 包中。然后为了方便，把两个包的内容全部导出。

::: code-group

```sh [终端.sh]
pnpm install @vue/reactivity @vue/shared --workspace --filter @vue/runtime-core
```

```ts [runtime-core/src/index.ts]
export * from "@vue/reactivity";
export * from "@vue/shared";
```

:::

再把 `runtime-core` 包安装到 `runtime-dom` 包中。

::: code-group

```sh [终端.sh]
pnpm install @vue/runtime-core --workspace --filter @vue/runtime-dom
```

```ts [runtime-dom/src/index.ts]
export * from "@vue/runtime-core";
```

:::

最后把 `runtime-dom` 包安装到 `vue` 包中。

::: code-group

```sh [终端.sh]
pnpm install @vue/runtime-dom --workspace --filter vue
```

```ts [vue/src/index.ts]
export * from "@vue/runtime-dom";
```

:::

新建一个 `packages/runtime-dom/src/nodeOps.ts` 文件，把 [其他属性](/vue/3/render#其他属性) 的方法导出。

```ts [runtime-dom/src/nodeOps.ts]
/**
 * 封装 DOM 节点操作的 API
 */
export const nodeOps = {
  // 插入节点
  insert(el, parent, anchor) {
    parent.insertBefore(el, anchor);
  },
  // 创建元素
  createElement(type) {
    return document.createElement(type);
  },
  // 设置元素文本内容
  setElementText(el, text) {
    el.textContent = text;
  },
  // 移除节点
  remove(el) {
    const parent = el.parentNode;
    if (parent) {
      parent.removeChild(el);
    }
  },
  // 设置文本节点的文本内容
  setText(node, text) {
    return (node.textContent = text);
  },
  // 获取节点的父节点
  parentNode(el) {
    return el.parentNode;
  },
  // 获取节点的下一个兄弟节点
  nextSibling(el) {
    return el.nextSibling;
  },
  // 查询节点
  querySelector(selector) {
    return document.querySelector(selector);
  },
};
```

新建一个 `packages/runtime-dom/src/renderer.ts` 文件，把 `createRenderer` 方法导出。

```ts [runtime-dom/src/renderer.ts]
export const createRenderer = (options) => {
  console.log(options);
};
```
