---
title: 二次封装 el-dialog 学习 Vue 重复小组件处理经验
author:
  - 三十的前端课 vue项目中的重复小组件处理经验&https://www.bilibili.com/video/BV1RK4118727/?spm_id_from=333.1387.upload.video_card.click
  - 远方os 命令式弹框终极版&https://www.bilibili.com/video/BV1J7NPe1EL7?vd_source=8628f61938375f4995c51e0b8c7d8165
---

# 二次封装 el-dialog 学习 Vue 重复小组件处理经验

## 重复小组件处理经验

### 场景模拟

现有一个项目需求需要使用一个提示弹窗组件，有多个页面组件需要使用。

该弹窗组件在封装时需要注意：

1. 该弹窗显示的时机不一致，可能在 A 页面是一进入就显示，在 B 页面就点击按钮显示
2. 该弹窗同意或拒绝按钮执行的后续不一致，拒绝隐藏弹窗，同意调用接口，后续操作看各自组件需求
3. 该弹窗组件内部的内容不一致

如果直接使用多个组件，则页面上就需要写很多个组件，声明很多个控制显隐的变量，代码冗余且不易维护。

### render 方案

把弹窗封为一个组件，点击行为传给组件，通过 `v-if` 控制显隐

缺点：每次都得写组件显隐控制逻辑，还得引入，注册弹窗组件。

希望能像 Element Plus 的 `ElMessageBox` 方法一样，调用方法就能弹出弹窗。

实现思路如下：

1. 用 `createVnode` 或者 JSX 编写组件结构
2. 用 `render` 方法渲染在一个 `div` 里
3. 用 `appendChild` 方法加入

```js
import { createVNode, render } from 'vue'

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

现在页面上就有一个没有样式的效果了。但是这种方法不推荐，更推荐使用 JSX 。

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

这么写点击按钮后页面能生成对应的<word text="DOM" />，点击不同意按钮也能卸载。但是再次点击按钮后不再生成<word text="DOM" />了，因为 `render` 函数只会执行一次，执行完之后虽然页面的真实<word text="DOM" />被删除了，但是 `render` 认为你已经挂载了，就不再执行。

参考一下 Element UI 的方法修改一下。

```jsx
import { render } from "vue";

export const signProp = (content, handler) => {
  let div = document.createElement("div"); // [!code ++]
  let pop = (
    <div class="dialog-cover">
      <div class="dialog-cover-content">
        <div class="content">{content}</div>
        <div class="btns">
          <button
            onClick={() => {
              document.body.removeChild(div); // 这里需要真实dom，虚拟dom会报错
              handler.cancel && handler.cancel(); // [!code ++]
            }}
          >
            不同意
          </button>
          <button
            onClick={() => {
              // [!code ++]
              document.body.removeChild(div); // 这里需要真实dom，虚拟dom会报错 // [!code ++]
              handler.confirm && handler.confirm(); // [!code ++]
            }} // [!code ++]
          >
            确认签署
          </button>
        </div>
      </div>
    </div>
  );

  // 参数一：要渲染的虚拟dom；参数二，要渲染到那个真实dom上
  render(pop, div); // [!code ++]
  document.body.appendChild(div);
};
```

它是通过原生<word text="DOM" />来加入到 `body` 内，这样他就不会管虚拟<word text="DOM" />是否挂载。

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

这个写法和前面的 JSX 方案类似，只不过不使用标签的方式，而是使用<word text="Vue" />提供的 `h` 和 `createApp` 方式。

首先声明一个函数，接收三个参数，第一个参数是弹窗内部要渲染的组件（这里以 Element Plus 组件的弹窗为例子），第二个参数是内部组件的 `props` ，第三个参数是弹窗组件的 `props`。通过 `h` 创建完虚拟<word text="DOM" />后，再通过 `createApp` 创建一个<word text="Vue" />实例，最后通过 `mount` 方法挂载到 `body` 上。

::: code-group

```ts [signProp.ts]
import { createApp, h } from "vue";
import { ElDialog } from "element-plus";

export function signProp({ component, props, modalProps }) {
  const dialog = h(
    ElDialog,
    { ...modalProps, modelValue: true },
    { default: () => h(component, props) }
  );

  const app = createApp(dialog);

  const div = document.createElement("div");
  document.body.appendChild(div);
  app.mount(div);
}
```

```vue [App.vue]
<script setup>
import signProp from "./signProp.ts";
import LoginForm from "./LoginForm.vue";

const clickFn = () => {
  signProp({
    component: LoginForm,
    props: {
      msg: "欢迎来到xx系统",
    },
    modalProps: {
      title: "登录",
    },
  });
};
</script>

<template>
  <a-button @click="clickFn"></a-button>
</template>
```

```vue [LoginForm.vue]
<script setup lang="ts">
import { reactive, ref } from "vue";

withDefaults(
  defineProps<{
    msg: string;
  }>(),
  {
    msg: "请登录",
  }
);

const formData = reactive({
  username: "",
  password: "",
});

const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
};

const formRef = ref(null);

const submit = () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        resolve(valid);
      } else {
        reject(valid);
      }
    });
  });
};

defineExpose({
  submit,
});
</script>

<template>
  <el-form ref="formRef" :model="formData" :rules="rules">
    <p class="mb-20">{{ msg }}</p>
    <el-form-item label="账号" prop="username">
      <el-input v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formData.password"></el-input>
    </el-form-item>
  </el-form>
</template>
```

:::

但是执行后发现页面只打开了 `dialog` 弹窗，没有 `form` 表单组件。查看控制台发现有警告说组件找不到。这是因为 `createApp` 创建的实例需要 `use` 方法来注册组件和方法 （如组件库组件、`pinia`、`router`） ，之前 `template` 的写法用的是 `main.ts` 入口文件的 `createApp` 实例，组件和方法都注册了；但是这里是新建了一个 `createApp` 实例，没有注册其他组件库的组件，所以报警告，找不到组件。

解决方法是，在 `signProp` 函数中，通过 `app.use` 方法来注册组件库的组件。可以一个个复制粘贴过来，如果代码量少这样很方便，但是代码量多会很繁琐，且不利于后续维护，更好的方法是写成一个函数，在函数内注册挂载。

::: code-group

```ts [plugin.ts]
import Antd from "ant-design-vue"; // [!code ++]
// [!code ++]
// [!code ++]
export function loadPlugin(app) {
  app.use(Antd); // [!code ++]
} // [!code ++]
```

```ts [signProp.ts]
import { createApp, h } from "vue";
import { ElDialog } from "element-plus";
import { loadPlugin } from "./plugin.ts"; // [!code ++]

export function signProp({ component, props, modalProps }) {
  const dialog = h(
    ElDialog,
    { ...modalProps, modelVAlue: true },
    { default: () => h(component, props) }
  );

  app.createApp(dialog);
  loadPlugin(app); // [!code ++]

  const div = document.createElement("div");
  document.body.appendChild(div);
  app.mount(div);
}
```

:::

现在能正常渲染组件了，但是点击关闭按钮后发现无法生效，这是因为弹框开启的变量 `visible` 设为 `true` ，需要修改为一个响应式变量。修改为响应式变量后，点击关闭按钮发现还是不生效，这是因为响应式变量想要工作，需要作为订阅者 `effect` 函数的依赖项，因此这里需要调整为一个函数的形式。

```ts [signProp.ts]
import { createApp, h } from "vue";
import { ElDialog } from "element-plus";
import { loadPlugin } from "./plugin.ts";

export function signProp(component, props, modalProps) {
  const visible = ref(true); // [!code ++]
  // [!code ++]
  const dialog = () =>
    h(
      ElDialog,
      {
        ...modalProps,
        modelValue: visible.value, // [!code ++]
      },
      {
        default: () => h(component, props),
        // [!code ++]
        footer: () =>
          h("div", {}, [
            // [!code ++]
            h(
              ElButton, // [!code ++]
              {
                // [!code ++]
                onClick() {
                  // [!code ++]
                  unmount(); // [!code ++]
                }, // [!code ++]
              }, // [!code ++]
              { default: () => "取消" } // [!code ++]
            ), // [!code ++]
            h(
              // [!code ++]
              ElButton, // [!code ++]
              {
                // [!code ++]
                type: "primary", // [!code ++]
                onClick() {
                  // [!code ++]
                }, // [!code ++]
              }, // [!code ++]
              { default: () => "确认" } // [!code ++]
            ), // [!code ++]
          ]), // [!code ++]
      }
    );

  app.createApp(dialog);
  loadPlugin(app);

  const div = document.createElement("div");
  document.body.appendChild(div);
  app.mount(div);

  // [!code ++]
  function unmount() {
    visible.value = false; // [!code ++]
    // [!code ++]
    setTimeout(() => {
      // 组件关闭后再卸载组件，保留弹框的关闭动画 // [!code ++]
      app.unmount(); // [!code ++]
      document.body.removeChild(div); // [!code ++]
    }, 300); // [!code ++]
  } // [!code ++]
}
```

现在关闭功能实现了，该来实现点击确定按钮的功能了，对于表单而言，点击确定按钮后，需要实现表单校验、调用接口等功能，这些功能是组件 `compoennt` 内部就封装好了的，需要考虑的是如何调用该组件的方法。

声明一个变量，在 `h` 函数第三个参数中的 `h` 函数的第二个参数添加一个 `ref`，后续可以通过这个变量拿到组件内部的方法。

```ts [signProp.ts]
import { createApp, h } from "vue";
import { ElDialog } from "element-plus";
import { loadPlugin } from "./plugin.ts";

export function signProp{( component, props, modalProps }) {
  const visible = ref(true);
  const instanceRef = ref(); // [!code ++]
  const dialog = () =>
    h(
      ElDialog,
      modelValue: visible.value,
      {
        ...modalProps,
      },
      {
        default: () => h(component, props), // [!code --]
        default: () => h(component, { ref: instanceRef, ...props }), // [!code ++]
        footer: () => h('div', {}, [
          h(
            ElButton,
            {
              onClick() {
                unmount()
              }
            },
            { default: () => '取消' }
          ),
          h(
            ElButton,
            {
              type: 'primary',
              async onClick() {
                try { // [!code ++]
                  await instanceRef.value.submit() // [!code ++]
                  unmount() // [!code ++]
                } // [!code ++]
                catch (error) { // [!code ++]
                  console.log(error) // [!code ++]
                } // [!code ++]
              }
            },
            { default: () => '确认' }
          ),
        ])
      }
    );

  app.createApp(dialog);
  loadPlugin(app);

  const div = document.createElement("div");
  document.body.appendChild(div);
  app.mount(div);


  function unmount() {
    visible.value = false;
    setTimeout(() => {
      // 组件关闭后再卸载组件，保留弹框的关闭动画
      app.unmount();
      document.body.removeChild(div);
    }, 300);
  }
}
```

最后，可以添加按钮 `loading` 效果等优化。如果想要暴露出去让父组件也能使用内部的变量和方法，可以 `return` 出去。

```ts [signProp.ts]
import { createApp, h } from "vue";
import { ElDialog } from "element-plus";
import { loadPlugin } from "./plugin.ts";

export function signProp(( component, props, modalProps, onComfirm = () => {} )) { // [!code ++]
  const visible = ref(true);
  const instanceRef = ref();
  const loading = ref(false); // [!code ++]
  const dialog = () =>
    h(
      ElDialog,
      {
        ...modalProps,
        modelValue: visible.value,
      },
      {
        default: () => h(component, { ref: instanceRef, ...props }),
        footer: () => h('div', {}, [
          h(
            ElButton,
            {
              onClick() {
                unmount()
              }
            },
            { default: () => '取消' }
          ),
          h(
            ElButton,
            {
              type: 'primary',
              loading: loading.value, // [!code ++]
              async onClick() {
                loading.value = true // [!code ++]
                try {
                  await instanceRef.value.submit()
                  await onComfirm() // 通过表单校验后做其他操作 // [!code ++]
                  unmount()
                }
                catch (error) {
                  console.log(error)
                }
                finally { // [!code ++]
                  loading.value = false // [!code ++]
                } // [!code ++]
              }
            },
            { default: () => '确认' }
          ),
        ])
      }
    );

  app.createApp(dialog);
  loadPlugin(app);

  const div = document.createElement("div");
  document.body.appendChild(div);
  app.mount(div);

  function unmount() {
    visible.value = false;
    setTimeout(() => {
      // 组件关闭后再卸载组件，保留弹框的关闭动画
      app.unmount();
      document.body.removeChild(div);
    }, 300);
  }

  return { instanceRef, unmount }; // [!code ++]
}
```

## 动手实操

<myIframe url="https://example.duyidao.cn/package/el-dialog" />
