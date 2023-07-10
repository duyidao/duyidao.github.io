# Vue3新特性

Vue3 新特性官方指路：[新特性](https://blog.vuejs.org/posts/vue-3-3#script-setup-typescript-dx-improvements) 。

## defineProps

### 更好的TS提示

在 Vue3 中，defineProps 能够更好的支持 TypeScript  类型提示，父组件引用子组件时能够有更好的 TypeScript 类型提示。代码示例如下：

1. 设置一个 ts 类型 `type.ts`

   ```ts
   export interface type {
       msg: string
   }
   ```

2. 子组件引入类型

   ```vue
   <script setup ts>
   import type { type } from './type.ts'
   
   defineProps<type>()
   </script>
   ```

3. 父组件使用子组件

   ```vue
   <div class="App">
       <h1>App</h1>
       <Hi />
   </div>
   ```

运行后鼠标悬停在子组件上，可以看到其 defineProps 的类型提示。如果没有设置 msg，他还会报警告提示。

![VBoOcq.png](https://i.imgloc.com/2023/07/10/VBoOcq.png)

还可以进行一个扩展，代码如下：

```vue
<script setup lang="ts">
import type { Props } from './foo'

// imported + intersection type
defineProps<Props & { age: number }>()
</script>
```

现在多了一个 age 变量的类型支持。

> 注意
>
> 该功能需要 vscode 下载 1.7.0 版本以上的 Vue Language Features (Volar) 插件搭配使用。
>
> ![VBoPEN.png](https://i.imgloc.com/2023/07/10/VBoPEN.png)

### 更好的泛型支持

现在能够支持泛型设置，通过 `generic` 关键字来设置。步骤代码如下所示：

1. 子组件通过 `generic` 关键字设置泛型

   ```vue
   <script setup lang="ts" generic="T">
   defineProps<{
     items: T[]
     selected: T
   }>()
   </script>
   ```

   如果设置 T ，则该属性会根据父组件的传入自动推导 ts 类型。

   也可以直接声明其类型，如下：

   ```vue
   <script setup lang="ts" generic="T extends string | number">
   defineProps<{
     items: T[]
     selected: T
   }>()
   </script>
   ```

   此时 `items` 是数字或字符串组合的数组， `selected` 是单个数组或字符串。

2. 父组件使用子组件

   ```vue
   <div class="App">
       <h1>App</h1>
       <Hi :selected="true" />
   </div>
   ```

   子组件设置泛型后父组件为 `selected` 传递一个布尔值，不符合条件，ts 校验会报相应的错误。

以上步骤是关于 `setup` 语法糖的设置方法，它同时也支持 defineComponents 的方法，方法步骤如下：

1. 定义并导出一个 defineComponents 的泛型

   ```jsx
   import { defineComponents } from 'vue'
   
   export default defineComponents (<T,> (props: {msg}) => {
               return () => <div>{ props.msg }</div>
   })
   ```

   > 注意
   >
   > 泛型 T 后面的逗号可能是开发者留下来的小 BUG，不然会报错。等待其后续的修复

2. 父组件引入

   ```vue
   <GenericT></GenericT>
   
   <script setup>
   import GenericT from './component/GenericT'
   </script>
   ```

   此时子组件也能拥有 ts 类型提示。

## defineEmits

子组件通过 defineEmit 设置自定义事件现在也可以设置 ts 类型了，设置完类型后子组件如果没有传对应类型的参数会有报错；父组件没有接收对应类型的自定义事件也会报错。

代码如下所示：

1. 子组件定义 defineEmits 及其传参的类型

   ```js
   const emit = defineEmits<{
     foo: [id: number]
     bar: [name: string]
   }>()
   ```

2. 使用自定义事件时需要传对应的类型参数

   自定义方法 `foo` 需要传一个参数，类型为数值型。

   自定义方法 `bar` 需要传一个参数，类型为字符串型。

   ```vue
   <button @click="handleClickFn">
       点我
   </button>
   
   <script setup lang="ts">
   const handleClickFn = () => {
       emit('foo', 1)
   }
   </script>
   ```

3. 父组件使用

   ```vue
   <Hi @bar="bar" @foo="foo" />
   ```

> 注意
>
> 也可以换一种写法，代码如下：
>
> ```js
> const emit = defineEmits<{
>   (e: 'foo', id: number): void
>   (e: 'bar', name: string): void
> }>()
> ```
>
> 写法可根据自己的项目选择。

## defineSlot

纯粹的 ts 支持，专门用于设置类型。写法如下：

1. 定义插槽需要的数据类型

   ```js
   defineSlot<{
       default: (props: {msg: string}) => any;
       foo: (props: {bar: number}) => any
   }>()
   ```

2. 子组件设置插槽

   ```vue
   <template>
   	<div>
           <slot msg="nnnn"></slot>
           <slot name="daodao" :bar="1"></slot>
       </div>
   </template>
   ```

3. 父组件使用插槽

   ```vue
   <Sloter>
   	<template v-slot="{msg}">
       	{{ msg }}
       </template>
       <template v-slot:foo="{bar, name}">
       	{{ bar, name }}
       </template>
   </Sloter>
   ```

