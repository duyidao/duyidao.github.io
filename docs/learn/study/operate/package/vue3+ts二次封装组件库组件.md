# Vue3 + TS 二次封装组件库组件

## 思考

如何更好的封装一个组件库的组件呢？主要从以下三个方面考虑：
- `props` 如何穿透过去
- 插槽 如何穿透过去
- 组件内部的方法如何暴露出去

## props穿透

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

这么做虽然可以穿透事件与方法，但是父组件没有代码提示，只能被迫手敲或者翻阅文档，这样做不利于开发。因此需要转换思路。

<SpecialWords text="Element Plus" /> 组件库导出提供了相关的组件类型，我们可以借助这个类型来获取代码提示。

```vue [son.vue]
<script lang="ts" setup> // [!code ++]
import { type InputProps } from 'element-plus' // [!code ++]
const props = defineProps<InputProps>() // [!code ++]
</script> <!-- [!code ++] -->

<template>
  <el-input v-bind="$attrs"></el-input> <!-- [!code --] -->
  <el-input v-bind="props"></el-input> <!-- [!code ++] -->
</template>
```

现在父组件使用时能看到相应的提示了，但是出现了 <SpecialWords text="TypeScript" /> 的报错，提示参数是必传的，需要使用 <SpecialWords text="TypeScript" /> 的 `Partial` 类型来包裹一下。 `Partial` 作用是将类型中的所有属性变为可选。

目前只考虑了属性，还没考虑到事件。事件都在 `$attrs` 中，因此可以用浅拷贝的方式把 `$attrs` 和 `props` 合并一下。

```vue [son.vue]
<script lang="ts" setup>
import { type InputProps } from 'element-plus'
const props = defineProps<InputProps>() // [!code --]
const props = defineProps<Partial<InputProps>>() // [!code ++]
</script>

<template>
  <el-input v-bind="props"></el-input> <!-- [!code --] -->
  <el-input v-bind="{ ...$attrs, ...props }"></el-input> <!-- [!code ++] -->
</template>
```

## 插槽穿透

插槽写法可以 `v-for` 循环 `$slots` ，循环把插槽挂载到子组件上，但是这么做很繁琐。

可以转变一下思路，不直接使用 `<el-input></el-input>` 的方式挂载组件，而是通过 `<component :is=""></component>` 的形式挂载组件。`is` 不仅可以给一个子组件，还可以给一个 `h` 函数，因此可以借助 `h` 函数来挂载插槽。

`h` 函数第一个参数是组件，第二个参数是属性，第三个参数是插槽。

```vue [son.vue]
<script lang="ts" setup>
import { ElInput, type InputProps } from 'element-plus' // [!code ++]
import { h } from 'vue' // [!code ++]
const props = defineProps<Partial<InputProps>>()
</script>

<template>
  <el-input v-bind="{ ...$attrs, ...props }"></el-input> <!-- [!code --] -->
  <component :is="h(ElInput, { ...$attrs, ...props }, $slots)"></component> <!-- [!code ++] -->
</template>
```

## 组件方法暴露

组件方法暴露可以使用 `ref` 来暴露方法。

```vue [son.vue]
<script lang="ts" setup>
import { ElInput, type InputProps } from 'element-plus'
import { h, ref } from 'vue' // [!code ++]
const props = defineProps<Partial<InputProps>>()

const inputRef = ref() // [!code ++]
console.log(inputRef.value) // [!code ++]
</script>

<template>
  <component :is="h(ElInput, { ...$attrs, ...props, ref: 'inputRef' }, $slots)"></component> <!-- [!code ++] -->
</template>
```

但是这种方法不可取，如果这个组件绑定了 `v-if` ，后续存在可能会变动的情况，这样就拿不到 `inputRef` 的值了。`ref` 不仅可以赋值字符串，但是还能赋值一个函数，函数的形参接收的就是组件实例。

那么怎么抛出去呢？<SpecialWords text="Vue3" /> 提供了 `getCurrentInstance()` 方法实例，提供了一个 `exposed` 方法可以暴露组件实例。因此上方代码可以改写为：

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
import { ElInput, type InputProps } from 'element-plus'
import { h, getCurrentInstance } from 'vue' // [!code ++]
const props = defineProps<Partial<InputProps>>()

const vm = getCurrentInstance() // [!code ++]
function changeRef(inputInstance) { // [!code ++]
  vm.exposed = vm.exposeProxy = inputInstance || {} // [!code ++]
} // [!code ++]
</script>

<template>
  <component :is="h(ElInput, { ...$attrs, ...props, ref: changeRef }, $slots)"></component> <!-- [!code ++] -->
</template>
```
:::