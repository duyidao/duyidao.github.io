---
title: Vue 重复小组件处理经验
isReship: true
author:
  - 三十的前端课 https://www.bilibili.com/video/BV1RK4118727/?spm_id_from=333.1387.upload.video_card.click
  - 远方os https://www.bilibili.com/video/BV1J7NPe1EL7?vd_source=8628f61938375f4995c51e0b8c7d8165
---

# Vue 重复小组件处理经验

## 重复小组件处理经验

### 场景模拟

现有一个项目需求需要使用一个提示弹窗组件，有多个页面组件需要使用。

该弹窗组件在封装时需要注意：

1. 该弹窗显示的时机不一致，可能在 A 页面是一进入就显示，在 B 页面就点击按钮显示
2. 该弹窗同意或拒绝按钮执行的后续不一致，拒绝隐藏弹窗，同意调用接口，后续操作看各自组件需求

如果直接使用多个组件，则页面上就需要写很多个组件，声明很多个控制显隐的变量，代码冗余且不易维护。

### render 方案

把弹窗封为一个组件，点击行为传给组件，通过 `v-if` 控制显隐

缺点：每次都得写组件显隐控制逻辑，还得引入，注册弹窗组件。

希望能像 `element-ui` 的 `messagebox` 方法一样，调用方法就能弹出弹窗。

实现思路如下：

1. 用 `createVnode` 或者 `jsx` 编写组件结构
2. 用 `render` 方法渲染在一个 `div` 里
3. 用 `appendChild` 方法加入

```js
import {createVNode, render} from 'vue'

export const signProp = (content) => {
  // 创建虚拟dom，参数一：dom标签；参数二：dom属性，包括class类名、id、style样式等；参数三：内容，可为数字文本，也可为虚拟dom
  let pop = createVNode('div', {
    class: 'divcover'
  }, {
    createVNode('div', {
      class: 'popcontent'
    }, content)
  })

  // 参数一：要渲染的虚拟dom；参数二，要渲染到那个真实dom上
  render(pop, document.body)
}
```

现在页面上就有一个没有样式的效果了。但是这种方法不推荐，更推荐使用 `jsx` 。

### jsx 组件标签方案

```jsx
import { render } from "vue";

export const signProp = (content) => {
  let pop = (
    <div class="cover">
      <div class="covercontent">
        <div>{content}</div>
        <div>
          <button
            onClick={() => {
              document.body.removeChild(pop.el); // 这里需要真实dom，虚拟dom会报错
            }}
          >
            不同意
          </button>
          <button>确认签署</button>
        </div>
      </div>
    </div>
  );

  // 参数一：要渲染的虚拟dom；参数二，要渲染到那个真实dom上
  render(pop, document.body);
};
```

这么写点击按钮后页面能生成对应的 <SpecialWords text="DOM" />，点击不同意按钮也能卸载。但是再次点击按钮后不再生成 <SpecialWords text="DOM" /> 了，因为 `render` 函数只会执行一次，执行完之后虽然页面的真实 <SpecialWords text="DOM" /> 被删除了，但是 `render` 认为你已经挂载了，就不再执行。

参考一下 `element-ui` 的方法修改一下。

```jsx
import { render } from "vue";

export const signProp = (content, handler) => {
  let div = document.createElement("div");
  let pop = (
    <div class="dialog-cover">
      <div class="dialog-cover-content">
        <div class="content">{content}</div>
        <div class="btns">
          <button
            onClick={() => {
              document.body.removeChild(div); // 这里需要真实dom，虚拟dom会报错
              handler.cancel && handler.cancel();
            }}
          >
            不同意
          </button>
          <button
            onClick={() => {
              document.body.removeChild(div); // 这里需要真实dom，虚拟dom会报错
              handler.confirm && handler.confirm();
            }}
          >
            确认签署
          </button>
        </div>
      </div>
    </div>
  );

  // 参数一：要渲染的虚拟dom；参数二，要渲染到那个真实dom上
  render(pop, div);
  document.body.appendChild(div);
};
```

它是通过原生 <SpecialWords text="DOM" /> 来加入到 `body` 内，这样他就不会管虚拟 <SpecialWords text="DOM" /> 是否挂载。

现在可以在各个需要的场景使用该方法了。

```vue
<script setup>
import { signProp } from "./signProp.jsx";
</script>

<template>
  <button
    @click="
      signProp('我是内容文本', {
        confirm: () => {},
        cancel: () => {},
      })
    "
  >
    click me
  </button>
</template>
```

注意的是，有一些场景可能用不到 `cancel` 之类的按钮点击事件，没有传对应的函数方法，需要有良好的代码健壮性意识，添加非空判断，避免代码报错。

### h 与 createApp 方案

这个写法和前面的 `jsx` 方案类似，只不过不使用标签的方式，而是使用 <SpecialWords text="Vue" /> 提供的 `h` 和 `createApp` 方式。

首先声明一个函数，接收三个参数，第一个参数是弹窗内部要渲染的组件（这里以 `antd vue` 组件的弹窗为例子），第二个参数是内部组件的 `props` ，第三个参数是弹窗组件的 `props`。通过 `h` 创建完虚拟 <SpecialWords text="DOM" /> 后，再通过 `createApp` 创建一个 <SpecialWords text="Vue" /> 实例，最后通过 `mount` 方法挂载到 `body` 上。

::: code-group
```ts [signProp.ts]
import { createApp, h } from "vue";
import { Modal } from "ant-design-vue";

export function signProp(component, props, modalProps) {
  const dialog = h(
    Modal,
    modalProps,
    { default: () => h(component, props) }
  );

  const div = document.createElement("div");
  document.body.appendChild(div);
  app.mount(div);
}
```
```vue [App.vue]
<script setup>
import signProp from "./signProp.ts";
import { AButton, AForm, AFormItem, AInput } from "ant-design-vue";

const clickFn = () => {
  signProp(
    AForm,
    {
      msg: "欢迎来到xx系统",
    },
    {
      title: '登录',
    }
  );
}
</script>

<template>
  <a-button @click="clickFn"></a-button>
</template>
```
:::

但是执行后发现页面只打开了 `dialog` 弹窗，没有 `form` 表单组件

## 总体效果

<Iframe url="https://duyidao.github.io/blogweb/#/info/js/repeat" />
