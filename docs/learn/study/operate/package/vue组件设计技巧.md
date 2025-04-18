---
title: Vue 组件设计技巧
isReship: true
author:
  - 三十的前端课 https://www.bilibili.com/video/BV1de411X73e/?spm_id_from=333.1387.upload.video_card.click
---

# Vue 组件设计技巧

设计一个组件需要从以下四个方面来思考：

1. 样式

   样式应该写哪些？需要注意什么？

2. `template`

   通过插槽传递还是直接写在子组件内？

3. 行为

   某逻辑是由父组件处理还是子组件处理？

4. `props`

   哪些东西放在子组件内？哪些数据通过父组件传参？

## 样式的思考

### 容器、内部内容的基本样式

以搜索栏为例：搜索栏一般都是有不同的输入框，和搜索重置两个按钮。一般情况下，两个按钮是固定的，样式由子组件设置。

而输入框子组件只提供最基础的样式，如宽高，边框等。

> [!TIP] 总结
> 子组件中只定义其容器样式，即整体盒子样式，如宽度，阴影，内边距，字体样式等。

### 尽量使用低权值

比起使用类名设置样式，更推荐使用标签来设置样式，例如设置输入框的样式采取标签设置，如下：

```css
input {
  width: 200px;
}
```

这样的好处是父组件使用想要修改覆盖其宽度样式时可以直接通过添加类名的方式覆盖样式，如下：

```css
.father_use_input {
  width: 200px;
}
```

否则使用者使用时还要添加 `!important` ，显得不够优雅。

> [!TIP] 总结
> 子组件设置样式时尽可能让权值变低，父组件在修改时可以很方便的覆盖。

### 预留调控类

预留部分可能需要的调控类名，如输入错误显示红色，正确显示绿色等，这样使用者在需要使用时可直接添加类名，实现效果。如下：

::: code-group

```vue [child.vue]
<template>
  <div>
    <slot></slot>
    <button></button>
  </div>
</template>

<style scoped>
.input_error {
  color: red;
  border-color: red;
}

.input_success {
  color: green;
  border-color: green;
}
</style>
```

```vue [father.vue]
<template>
  <MyInput>
    <input class="input_success" />
  </MyInput>
</template>
```

:::

## 组件的思考

### 组件分割

对子组件进行分割，如果是固定内容就直接写死，不确定的部分、可能会变更的部分用 `slot` 部分传入，此外考虑数据传递的问题。可以使用平衡写法：

1. 有 `slot` 用 `slot` ，无 `slot` 使用插槽默认内容。
2. 具名插槽接收特定情况下父组件传入的结构

具体可以以下方三个例子说明：

- 例如：搜索栏。搜索按钮是固定的，输入框可以采取插槽设置默认值的形式。
- 例如：弹窗。确定取消按钮是固定的，叉叉是固定的，标题是传入的。
- 例如：表格。表头是固定的，内容 `td` 是传入的。

```vue
<template>
  <div>
    <slot #input></slot>
    <slot #default>
      <input name="搜索" />
    </slot>
  </div>
</template>
```

### 数据操作

如果数据在子组件内，子组件操作数据后还需要传递给父组件，过程繁琐。可以采用父组件通过插槽传递组件，数据变量也设置在父组件，这样父组件可以直接操作使用，无需子组件与父组件的通信。

::: code-group

```vue [child.vue]
<template>
  <div>
    <slot #default>
      <input :value="name" @change="changeFn" name="搜索" />
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
  methods: {
    changeFn(e) {
      this.$emit("update:name", e.target.value);
      this.$emit("change", e.target.value);
    },
  },
};
</script>
```

```vue [father.vue]
<template>
  <div>
    <ChildComponent :name="name" @change="changeFn"></ChildComponent>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "daodao",
    };
  },
  methods: {
    changeFn(value) {
      // ...
    },
  },
};
</script>
```

:::

## 行为的思考

### 行为类型拆分

把某一行为分为基本部分和业务部分，建议每一个行为都留给父组件监听。

例如弹窗组件，其拥有确定按钮和关闭按钮。其中：

- 关闭事件，就是关闭弹窗，此行为属于逻辑行为，这个放在子组件内即可。最后通过 `emit` 提供父组件做其他额外操作
- 确定事件，此行为属于业务行为，直接 `emit` 留给父组件实现不同操作。

::: code-group

```vue [child.vue]
<template>
  <div v-if="show">
    <button @click="close">close</button>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  methods: {
    close() {
      this.$emit("update:show", false);
      this.$emit("close");
    },
  },
};
</script>
```

```vue [father.vue]

```

:::

### 行为周期拆分

更有甚者可以把行为细分拆分，如确定按钮点击可以拆分为点击确定前，确定点击触发后等。类似于划分周期。

业务行为是由父组件自己处理，从开始到结束都是由父组件处理，此时无需考虑行为周期，父组件可以自主操控。

如果以上方案例关闭弹窗为例，父组件需要做到关闭前做特定处理，关闭后做特点处理，此时需要子组件传递自定义事件时拆分周期分别传递。如：

```js
const close = () => {
  emit("beforeColse");
  show.value = false;
  emit("afterClose");
};
```

## props 的思考

### 数据定义

组件相关行为需要的数据内部定义，业务相关数据父组件传入。

例如，控制组件显隐状态可以写在子组件 `data` 中，而内容数据则通过 `props` 传递获取。

> React 官方建议，子组件尽可能不要在 `data` 内数值数据，尽量通过父组件 `props` 传递获取。这对 Vue 也适用。

### 组件扩展

`props` 可以对传参做数据的定制，可以为使用者去掉某些功能或开启某些功能，比如是否能让使用者使用某些组件（如搜索的重置按钮、弹窗的取消按钮）等。

```vue
<template>
  <button v-if="reset">重置</button>
</template>

<script>
export default {
  props: {
    reset: Boolean,
  },
};
</script>
```

## 总结

最关键的点就在于扩展性和便捷性之间的权衡，如果封装的多了，很多东西都需要父组件 `prop` 传入，则扩展性提高，便捷性降低；反之父组件虽然不需要传太多参数，便捷性提高，但是很多东西都无法自定义，扩展性降低。要考虑子组件封装的便捷性与复用性。
