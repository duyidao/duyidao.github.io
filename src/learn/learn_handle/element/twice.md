---
title: Vue3 + TS 二次封装组件库组件
tags: 二次封装,$attrs,生命周期
author:
  - 远方os vue组件二次封装-究极版&https://www.bilibili.com/video/BV1bDe1z1Eyr
  - 远方os vue组件二次封装-终极版&https://www.bilibili.com/video/BV1soMtz4ExE
  - 远方os 组件二次封装时不一样的插槽传递方式&https://www.bilibili.com/video/BV1soMtz4ExE
  - 远方os 二次封装组件如何暴漏子组件的方法&https://www.bilibili.com/video/BV1EJstecEbA
  - 远方os h函数的使用&https://www.bilibili.com/video/BV166421Z7nU
  - 远方os h函数的使用场景&https://www.bilibili.com/video/BV1Zm421V7rm
---

# Vue3 + TS 二次封装组件库组件

## 思考

如何更好的封装一个组件库的组件呢？主要从以下三个方面考虑：

- `props` 如何穿透过去
- 插槽 如何穿透过去
- 组件内部的方法如何暴露出去

## props 穿透

`props` 穿透可以写成以下的方式：

::: code-group

```vue [father.vue]
<template>
  <Son></Son>
</template>
```

```vue [son.vue]
<template>
  <el-input v-bind="$attrs"></el-input>
</template>
```

:::

这么做虽然可以穿透事件与方法，但是父组件没有代码提示，只能被迫手敲或者翻阅文档，这样做不利于开发，也失去了<word text="TypeScript" />的意义。因此需要转换思路。

Element Plus 组件库导出提供了相关的组件类型，我们可以借助这个类型来获取代码提示。

```vue [son.vue]
<script lang="ts" setup>// [!code ++]
import { type InputProps } from "element-plus"; // [!code ++]
const props = defineProps<InputProps>(); // [!code ++]
</script><!-- [!code ++] -->

<template>
  <el-input v-bind="$attrs"></el-input> <!-- [!code --] -->
  <el-input v-bind="props"></el-input> <!-- [!code ++] -->
</template>
```

现在父组件使用时能看到相应的提示了，但是出现了<word text="TypeScript" />的报错，提示参数是必传的，需要使用<word text="TypeScript" />的 `Partial` 类型来包裹一下。 

> `Partial` 作用是将类型中的所有属性变为可选。

目前只考虑了属性，还没考虑到事件。事件都在 `$attrs` 中，因此可以用扩展运算符浅拷贝的方式把 `$attrs` 和 `props` 合并一下。

```vue [son.vue]
<script lang="ts" setup>
import { type InputProps } from "element-plus";
const props = defineProps<InputProps>(); // [!code --]
const props = defineProps<Partial<InputProps>>(); // [!code ++]
</script>

<template>
  <el-input v-bind="props"></el-input> <!-- [!code --] -->
  <el-input v-bind="{ ...$attrs, ...props }"></el-input> <!-- [!code ++] -->
</template>
```

> [!WARNING] 注意
> `$attrs` 要写在前面，`...props` 要写在后面，以确保能覆盖掉 `$attrs` 中的属性。

## 插槽穿透

### 方法一：插槽循环

插槽写法可以 `v-for` 循环 `$slots`，循环把插槽挂载到子组件上，代码如下所示：

```vue
<script lang="ts" setup>
import { type InputProps } from "element-plus";
const props = defineProps<Partial<InputProps>>();
</script>

<template>
  <el-input v-bind="{ ...$attrs, ...props }">
    <!-- [!code focus] -->
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
      <!-- [!code focus] -->
      <slot :name="name" v-bind="slotProps"></slot>
    <!-- [!code focus] -->
    </template>
  </el-input>
</template>
```

> [!INFO] 备注
> `#[name]` 写法等价于 `v-slot:[name]`，都是具名插槽。

但是这么做很繁琐。

### 方法二：h&useAttrs&useSlots

`useAttrs` 和 `useSlots` 是<word text="Vue3" />提供的钩子函数，可以获取到 `$attrs` 和 `$slots`。

```vue
<script lang="ts" setup>
import { type InputProps } from "element-plus"; // [!code --]
import { ElInput, type InputProps } from "element-plus"; // [!code ++]
import { h, useAttrs, useSlots } from "vue"; // [!code ++]
const props = defineProps<Partial<InputProps>>();
const Comp = h(ElInput, useAttrs(), useSlots()); // [!code ++]
</script>

<template>
  <el-input v-bind="{ ...attrs, ...props }">
    <Comp /> <!-- [!code ++] -->
  </el-input>
</template>
```

这样写虽然优雅了，但是还是不够精简。

### 方法三：h 函数精简版

可以转变一下思路，不直接使用 `<el-input></el-input>` 的方式挂载组件，而是通过 `<component :is=""></component>` 的形式挂载组件。`is` 不仅可以给一个子组件，还可以给一个 `h` 函数，因此可以借助 `h` 函数来挂载插槽。

```vue [son.vue]
<script lang="ts" setup>
import { ElInput, type InputProps } from "element-plus";
import { h, useAttrs, useSlots } from "vue"; // [!code --]
import { h } from "vue"; // [!code ++]
const props = defineProps<Partial<InputProps>>();
</script>

<template>
  <el-input v-bind="{ ...attrs, ...props }"> <!-- [!code --] -->
    <Comp /> <!-- [!code --] -->
  </el-input> <!-- [!code --] -->
  <component :is="h(ElInput, { ...$attrs, ...props }, $slots)"></component> <!-- [!code ++] -->
</template>
```

> [!IMPORTANT] component 组件为什么可以传入 h 函数 ？
> `h` 函数用于创建虚拟<word text="DMO" />节点 （`vNode`），`is` 属性接收到一个函数时，也就是 `h(ElInput, $attrs, $slots)` ，会立即执行并返回一个 `vNode`，描述了如何渲染 `ElInput` 组件。

## 组件方法暴露

### Object.assign 暴露

组件方法暴露可以使用 `ref` 来暴露方法，通过 `Object.assign` 合并对象的方式暴露出去。

```vue [son.vue]
<script lang="ts" setup>
import { ElInput, type InputProps } from "element-plus";
import { h, ref } from "vue"; // [!code ++]
const props = defineProps<Partial<InputProps>>();

const inputRef = ref(); // [!code ++]
console.log(inputRef.value); // 可以拿到组件的实例，里面有它的方法 // [!code ++]
const inputInstance = {} // [!code ++]
 // [!code ++]
onMounted(() => {
  Object.assign(inputInstance, inputRef.value); // [!code ++]
}) // [!code ++]
defineExpose({ inputInstance }); // [!code ++]
</script>

<template>
  <component :is="h(ElInput, { ...$attrs, ...props, ref: 'inputRef' }, $slots)"></component><!-- [!code ++] -->
</template>
```

但是这种方法不可取，如果这个组件绑定了 `v-if` ，后续存在可能会变动的情况，这样就拿不到 `inputRef` 的值了。

### Proxy 代理暴露

既然 `defineExpose` 要传一个对象，那么可不可以用 `new Proxy` 来代理呢？外部使用子组件的时候，触发代理的 `get` 方法，把子组件的实例返回出去。

```vue [son.vue]
<script lang="ts" setup>
import { ElInput, type InputProps } from "element-plus";
import { h, ref } from "vue";
const props = defineProps<Partial<InputProps>>();

const inputRef = ref();
console.log(inputRef.value); // 可以拿到组件的实例，里面有它的方法

// [!code ++]
defineExpose(new Proxy(
  {},// [!code ++]
  // [!code ++]
  {
    // [!code ++]
    get(target, key) {
      return inputRef.value?.[key]// [!code ++]
    },// [!code ++]
  }// [!code ++]
));// [!code ++]
</script>

<template>
  <component :is="h(ElInput, { ...$attrs, ...props, ref: 'inputRef' }, $slots)"></component>
</template>
```

但是这样还是不够的，在父组件还是拿不到子组件暴露出去的方法。这是因为<word text="Vue" />在底层封装获取代理对象时，还会判断 `proxy.has()` ，如果 `proxy.has()` 返回 `false`，则不会获取到代理对象。

上方代码需要再修改一下。

```vue [son.vue]
<script lang="ts" setup>
import { ElInput, type InputProps } from "element-plus";
import { h, ref } from "vue";
const props = defineProps<Partial<InputProps>>();

const inputRef = ref();
console.log(inputRef.value); // 可以拿到组件的实例，里面有它的方法

defineExpose(new Proxy(
  {},
  {
    get(target, key) {
      return inputRef.value?.[key]
    },
    // [!code ++]
    has(target, key) {
      return key in inputRef.value // [!code ++]
    }, // [!code ++]
  }
));
</script>

<template>
  <component :is="h(ElInput, { ...$attrs, ...props, ref: 'inputRef' }, $slots)"></component>
</template>
```

### exposed 暴露

`ref` 不仅可以赋值字符串，还能赋值一个函数，函数的形参接收的就是组件实例。

那么怎么抛出去呢？<word text="Vue3" />提供了 `getCurrentInstance()` 方法实例，提供了一个 `exposed` 方法可以暴露组件实例。因此上方代码可以改写为：

::: code-group

```vue [father.vue]
<template>
  <Son model-value="111">
    <template #prefix></template>
  </Son>
</template>
```

```vue [son.vue]
<script lang="ts" setup>
import { ElInput, type InputProps } from "element-plus";
import { h, getCurrentInstance } from "vue"; // [!code ++]
const props = defineProps<Partial<InputProps>>();

const vm = getCurrentInstance(); // [!code ++]
function changeRef(inputInstance) { // [!code ++]
  vm.exposed = vm.exposeProxy = inputInstance || {}; // [!code ++]
} // [!code ++]
</script>

<template>
  <component :is="h(ElInput, { ...$attrs, ...props, ref: changeRef }, $slots)"></component> <!-- [!code ++] -->
</template>
```

:::

> [!IMPORTANT] 注意
> 1. `defineExpose({ a: 1 })` 实际上等价于 `vm = getCurrentInstance(); vm.exposed = { a: 1 }`。
> 2. 父组件拿到的不是直接拿 `exposed`，而是 `exposed` 的 `exposeProxy` 代理对象属性，因此不能只修改 `vm.exposed` ，还需要修改 `vm.exposeProxy` 。

## 类型处理

现在父组件能够正常传递属性方法给子组件，也能拿到子组件暴露的属性和方法。但是在父组件书写属性和方法时，是没有提示的。

解决方法只需要加一行 `defineExpose()` 代码即可。

```vue [son.vue]
<script lang="ts" setup>
import { ElInput, type InputProps } from "element-plus";
import { h, getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue"; // [!code focus]
const props = defineProps<Partial<InputProps>>();

const vm = getCurrentInstance();
function changeRef(inputInstance) {
  vm.exposed = vm.exposeProxy = inputInstance || {};
}

defineExpose({} as ComponentInternalInstance<typeof ElInput>)
</script>

<template>
  <component :is="h(ElInput, { ...$attrs, ...props, ref: changeRef }, $slots)"></component>
</template>
```

无需担心 `defineExpose()` 会覆盖掉 `exposed` ，因为 `exposed` 是 `ref` 创建的响应式对象，等到组件开始创建，才会执行 `changeRef` 方法；而 `defineExpose()` 是在组件创建前执行的，因此等组件创建的时候，`vm.exposed` 会覆盖掉前面默认的 `defineExpose({})`。

而 `defineExpose({}）` 的作用是通过断言 `ComponentInternalInstance` 类型，来约束 `exposed` 的类型，从而在父组件中，能够有提示。

> [!wanring] 注意
> 这个方法有局限性，只能在 VS Code 内使用，而 WebStorm 无法使用。因为这个方法是基于 Vue Language Tool 插件实现的，而 WebStorm 并没有支持这个插件。

## 回顾：h 函数的使用

### 基础使用

`h` 函数是<word text="Vue3" />提供的用于创建虚拟<word text="DMO" />节点（`vNode`）的方法，`vNode` 是一个对象，描述了如何渲染一个组件。

`h` 函数第一个参数是组件，第二个参数是属性，第三个参数是插槽。

```vue
<script lang="ts" setup>
import { h } from "vue";

const Comp = h("div", { class: "test" }, "hello world");
</script>

<template>
  <Comp></Comp>
</template>
```

### 响应式变量

同时，它也支持传入变量动态展示内容，整体作为参数用动态组件展示。

```vue
<script lang="ts" setup>
import { h } from "vue"; // [!code --]
import { h, ref } from "vue"; // [!code ++]

const msg = ref("hello world"); // [!code ++]

const Comp = h("div", { class: "test" }, "hello world"); // [!code --]
const Comp = h("div", { class: "test" }, msg.value); // [!code ++]

setTimeout(() => { // [!code ++]
  msg.value = "hello vue3"; // [!code ++]
}, 2000); // [!code ++]
</script>

<template>
  <Comp></Comp> <!-- [!code --] -->
  <component :is="Comp"></component> <!-- [!code ++] -->
</template>
```

但是过了两秒后，发现页面并没有动态更新。这是为什么呢？

这涉及到了<word text="Vue3" />的响应式原理，`ref` 创建的响应式对象，在 `effect` 副作用函数中使用，彼此才能建立依赖关系。`ref` 发生了改变后，会触发 `effect` 副作用函数重新执行，从而更新页面。

在 `template` 模板中使用 `ref` 创建的响应式对象，<word text="Vue3" />底层会帮我们收集依赖建立关系，但是在 `setup` 中手动使用 `h` 函数，不会建立这层依赖，因此不会触发更新。

解决方法为修改 `Comp`，不再单单赋值一个 `h` 函数，而是赋值一个函数，返回值是 `h` 函数。这样 `template` 在挂载 `component` 动态节点时，会调用这个函数，这样就会把这个函数视为副作用函数。

```vue
<script lang="ts" setup>
import { h, ref } from "vue";

const msg = ref("hello world");

const Comp = h("div", { class: "test" }, msg.value); // [!code --]
const Comp = () => h("div", { class: "test" }, msg.value); // [!code ++]

setTimeout(() => {
  msg.value = "hello vue3";
}, 2000);
</script>

<template>
  <!-- 在使用时调用Comp函数，Comp函数就被视作副作用函数 -->
  <component :is="Comp"></component>
</template>
```

> [!TIP] 总结
> 在 `template` 中使用函数会做依赖收集，所以可以更新；在 `setup` 函数里，没有进行依赖收集。

### 传值与插槽

作为一个组件，自然是允许使用者传入属性和插槽的。而 `Comp` 函数实际上可以看作是 `setup` 函数，第一个参数就是传值 `props` ，第二个参数就可以解构出插槽 `{ slots }` 。

而 `ts` 类型，可以通过 <word text="Vue3" /> 官方文档提供的 `FunctionComponent` 类型，来定义 `props` 类型，避免 `ts` 类型报错。

::: code-group

```vue [prop传值.vue]
<script lang="ts" setup>
import { h, ref } from "vue"; // [!code --]
import { h, ref, type FunctionComponent } from "vue"; // [!code ++]

const Comp = ((props, { slots }) => {
  // [!code ++]
  return h("div", { class: "test" }, props.count); // [!code ++]
}) as FunctionComponent<{ count: number }>; // [!code ++]
</script>

<template>
  <!-- 在使用时调用Comp函数，Comp函数就被视作副作用函数 -->
  <component :is="Comp" :count="1">
    <div>111</div>
  </component>
</template>
```

```vue [使用插槽.vue]
<script lang="ts" setup>
import { h, ref } from "vue"; // [!code --]
import { h, ref, type FunctionComponent } from "vue"; // [!code ++]

const Comp = ((props, { slots }) => {
  // [!code ++]
  return h("div", { class: "test" }, slots); // [!code ++]
}) as FunctionComponent<{ count: number }>; // [!code ++]
</script>

<template>
  <!-- 在使用时调用Comp函数，Comp函数就被视作副作用函数 -->
  <component :is="Comp" :count="1">
    <div>111</div>
  </component>
</template>
```

:::

但是目前只考虑到一个默认插槽的情况，如果使用多个具名插槽、作用域插槽，就会出现问题，页面上还是只展示默认插槽的内容。

那么该如何渲染多个插槽呢？前面也拿到了插槽 `slots` ，那么就可以通过 `slots` 来渲染插槽内容。

```vue
<script lang="ts" setup>
import { h, ref, type FunctionComponent } from "vue";

const Comp = ((props, { slots }) => {
  return h("div", { class: "test" }, [
    slots?.header?.(), // [!code ++]
    "我自己的内容", // [!code ++]
    slots?.default?.(), // [!code ++]
  ]);
}) as FunctionComponent<{ count: number }>;
</script>

<template>
  <!-- 在使用时调用Comp函数，Comp函数就被视作副作用函数 -->
  <component :is="Comp" :count="1">
    <div>111</div>
    <template #header> <!-- [!code ++] -->
      <div>333</div> <!-- [!code ++] -->
    </template> <!-- [!code ++] -->
  </component>
</template>
```

想要实现作用于插槽的功能，即插槽内传值，使用插槽者取值，也可以轻松实现了。

```vue
<script lang="ts" setup>
import { h, ref, type FunctionComponent } from "vue";

const Comp = ((props, { slots }) => {
  const a = ref("a"); // [!code ++]
  return h("div", { class: "test" }, [
    slots?.header?.(), // [!code --]
    slots?.header?.(a.value), // [!code ++]
    "我自己的内容",
    slots?.default?.(),
  ]);
}) as FunctionComponent<{ count: number }>;
</script>

<template>
  <!-- 在使用时调用Comp函数，Comp函数就被视作副作用函数 -->
  <component :is="Comp" :count="1">
    <div>111</div>
    <template #header="{ a }"> <!-- [!code ++] -->
      <div>333 {{ a }}</div> <!-- [!code ++] -->
    </template>
  </component>
</template>
```

### 事件传递

事件传递就简单了，只需要在 `h` 函数里的第二个参数对象中，添加对应的事件即可。

```vue
<script lang="ts" setup>
import { h, ref, type FunctionComponent } from "vue";

const Comp = ((props, { slots }) => {
  const a = ref("a");
  return h(
    "div",
    {
      class: "test",
      onClick: () => { // [!code ++]
        console.log("click"); // [!code ++]
      }, // [!code ++]
    },
    [slots?.header?.(a.value), "我自己的内容", slots?.default?.()]
  );
}) as FunctionComponent<{ count: number }>;
</script>

<template>
  <!-- 在使用时调用Comp函数，Comp函数就被视作副作用函数 -->
  <component :is="Comp" :count="1">
    <div>111</div>
    <template #header="{ a }">
      <div>333 {{ a }}</div>
    </template>
  </component>
</template>
```

### 总结使用

实际上组件就是一个函数，函数的第一个参数可以拿到传值 `props`，第二个参数可以解构出插槽 `slots`。而 `ts` 类型，可以通过<word text="Vue3" />官方文档提供的 `FunctionComponent` 类型，来定义 `props` 类型，避免 `ts` 类型报错。

想要在 `setup` 内使用 `h` 函数，需要把 `h` 函数作为一个函数的返回值，`template` 在挂载组件节点时，会调用这个函数，这样就会把这个函数视为副作用函数，后续变量变更也会触发更新。

下面写一个父组件和一个子组件，来看一下整体代码：

::: code-group

```vue [父组件.vue]
<script lang="ts" setup>
import { ref } from "vue";
const a = ref("hello son");

defineProps(["msg"]);
const emits = defineEmits(["onFoo"]);

setTimeout(() => {
  emits("onFoo", "to father");
}, 2000);
</script>

<template>
  <div>
    {{ msg }}
    <slot>子组件默认内容</slot>

    <slot name="footer" :a="a">子组件默认footer内容</slot>
  </div>
</template>
```

```vue [子组件.vue]
<script lang="ts" setup>
import Son from "./Son.vue";
import { h, ref, type FunctionComponent } from "vue";

const Comp = ((props, { slots }) => {
  return h(
    Son,
    {
      msg: "hello father",
      onFoo: (val: string) => {
        console.log("click foo", val);
      },
    },
    {
      default: slots?.default,
      footer: () => {
        return h("div", null, {
          default: () => h("div", "我是嵌套的defalut"),
          footer: ({ a }) => h("div", "我是嵌套的footer" + a),
        });
      },
    }
  );
}) as FunctionComponent;
</script>

<template>
  <Comp></Comp>
</template>
```

:::
