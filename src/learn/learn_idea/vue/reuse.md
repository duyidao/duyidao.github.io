---
title: Vue 组件内的模板复用
author:
  - 远方os vue组件内的模板复用&https://www.douyin.com/user/MS4wLjABAAAAGUvGqSgUb8n2mLUU9SOa5wmdZy-Sj5_FUt-DK5Iu6PpxO1QgrJ1_vXy6ikzz_Q4h?modal_id=7517630905150737727
---

# Vue 组件内的模板复用

## 场景复现

下面有一个场景：一个模块会有多个地方复用，代码如下：

```vue
<template>
  <div class="container">
    <div class="title">标题</div>
    <div class="content">内容</div>
  </div>
  <div>111</div>
  <div class="container">
    <div class="title">标题</div>
    <div class="content">内容</div>
  </div>
  <p>2222</p>
  <div>333</div>
  <div class="container">
    <div class="title">标题</div>
    <div class="content">内容</div>
  </div>
</template>
```

如上方代码所示，`.container` 内容是重复的，如何在不把他们独立封装为一个子组件的情况下实现模块内复用呢？

## 解决方案

### 组件即函数

在<word text="Vue" />中，组件即函数，我们写的 `<template></template>` 后续会被转化为一个函数，所以我们可以通过函数的参数来实现复用。

创建一个对象，里面有一个 `setup` 函数，即生命周期的 `setup`，接收两个参数，第二个参数可以解构出 `slots` 插槽，然后通过 `slots.default()` 获取插槽内容。故可如下实现：

::: code-group

```js [index.js]
let render;
const DefineTemplate = {
  setup(_, { slots }) {
    return () => {
      render = slots.default;
      return render();
    };
  },
};

const UseTemplate = () => render();
```

```vue [index.vue]
<template>
  <DefineTemplate>
    <div class="container">
      <div class="title">标题</div>
      <div class="content">内容</div>
    </div>
  </DefineTemplate>
  <div>111</div>
  <UseTemplate></UseTemplate>
  <p>2222</p>
  <div>333</div>
  <UseTemplate></UseTemplate>
</template>
```

:::

这个写法实际上就是利用了插槽的特性，从 `DefineTemplate` 对象的 `setup` 生命周期中，从插槽获取相同的模块并保存到 `render` 中，然后通过调用 `render()` 函数来复用，这样就能实现模块内复用相同的组件。

可以打印一下 `slot.default()` 的内容，如下：

![打印slot.default()的内容](https://pic1.imgdb.cn/item/69392b416166b81101362ae4.png)

由此可见，<word text="Vue" />中，虚拟组件就是一个个函数，存储着一些必要的信息，如类型 `type` 、内容 `children` 等，通过虚拟组件的 `render` 函数，可以渲染出真实组件。

### 抽离封装复用

这样只是在一个 `.vue` 文件内可以使用，不妨抽离出来，封装成一个公共的函数，这样每个需要的 `.vue` 文件都能使用。

::: code-group

```js [utils.js]
export const createReusableTemplate() { // [!code ++]
  let render;
  const DefineTemplate = {
    setup(_, { slots }) {
      return () => {
        render = slots.default;
        return render(); // [!code --]
      }
    }
  }

  const UseTemplate = () => render()
  return [DefineTemplate, UseTemplate] // [!code ++]
} // [!code ++]
```

```vue [index.vue]
<script setup>
import { createReusableTemplate } from "./utils.js"; // [!code ++]
const [DefineTemplate, UseTemplate] = createReusableTemplate(); // [!code ++]
</script>

<template>
  <DefineTemplate>
    <div class="container">
      <div class="title">标题</div>
      <div class="content">内容</div>
    </div>
  </DefineTemplate>
  <UseTemplate></UseTemplate> <!-- [!code ++] -->
  <div>111</div>
  <UseTemplate></UseTemplate>
  <p>2222</p>
  <div>333</div>
  <UseTemplate></UseTemplate>
</template>
```

:::

抽离出来放到一个函数中，明确 `DefineTemplate` 函数和 `UseTemplate` 函数的职责，前者负责保存插槽内的组件，后者负责渲染。最后 `return` 一个数组，外部使用时通过数组解构还可以自定义命名，这样就能实现模块内复用相同的组件。

> [!WARNING] 注意
> `DefineTemplate` 对象的 `setup` 方法这里去掉了副作用，不再 `return` 返回默认插槽的内容，而是单纯的保存到 `render` 变量中。

### 支持传参数

基础需求实现了，接下来要开始细化，比如如果在使用时想要传参数，这该如何解决呢？例如：

```vue
<script setup>
import { createReusableTemplate } from "./utils.js";
const [DefineTemplate, UseTemplate] = createReusableTemplate();
</script>

<template>
  <DefineTemplate>
    <div class="container">
      <div class="title">标题</div>
      <div class="content">内容</div>
    </div>
  </DefineTemplate>
  <!-- [!code focus] -->
  <UseTemplate title="header" @foo="console.log"></UseTemplate>
  <div>111</div>
  <!-- [!code focus] -->
  <UseTemplate title="main"></UseTemplate>
  <p>2222</p>
  <div>333</div>
  <!-- [!code focus] -->
  <UseTemplate title="footer"></UseTemplate>
</template>
```

前面也说了，组件 `UseTemplate` 实际上就是 `UseTemplate` 函数，传的变量和事件都可以在 `UseTemplate` 函数形参接收。

```js
export const createReusableTemplate() {
  let render;
  const DefineTemplate = {
    setup(_, { slots }) {
      return () => {
        render = slots.default();
      }
    }
  }

  const UseTemplate = (props) => { // [!code focus]
    console.log(props) // { title: 'header', foo: ƒ } // [!code focus]
    return render() // [!code focus]
  } // [!code focus]
  return [DefineTemplate, UseTemplate]
}
```

得知这一点后，就知道该怎么实现传参了，步骤如下：

1. 函数 `UseTemplate` 接收到参数后，传给 `render` 方法
2. `render` 接收到参数，相当于默认插槽 `slots.default` 接收到参数
3. 组件 `DefineTemplate` 通过 `v-slot="data"` 的方式从默认插槽中获取到数据
4. 使用

代码最终可以修改为如下形式：

::: code-group

```js [utils.js]
export const createReusableTemplate() {
  let render;
  const DefineTemplate = {
    setup(_, { slots }) {
      return () => {
        render = slots.default();
      }
    }
  }

  const UseTemplate = (props) => render(props) // [!code focus]
  return [DefineTemplate, UseTemplate]
}
```

```vue
<script setup>
import { createReusableTemplate } from "./utils.js";
const [DefineTemplate, UseTemplate] = createReusableTemplate();
</script>

<template>
  <DefineTemplate>
    <!-- [!code focus] -->
    <div class="container" v-slot="{ title, onFoo }">
      <!-- [!code focus] -->
      <div class="title">{{ title }}</div>
      <!-- [!code focus] -->
      <div class="content" @click="onFoo(111)">内容</div>
    <!-- [!code focus] -->
    </div>
  </DefineTemplate>
  <!-- [!code focus] -->
  <UseTemplate title="header" @foo="console.log"></UseTemplate>
  <div>111</div>
  <!-- [!code focus] -->
  <UseTemplate title="main"></UseTemplate>
  <p>2222</p>
  <div>333</div>
  <!-- [!code focus] -->
  <UseTemplate title="footer"></UseTemplate>
</template>
```

:::

> [!WARNING] 注意
> 方法内部会被转化为 `on` + 首字母大写的形式。
