# Vue更新机制和优化

## 场景

先看一个倒计时场景，代码如下：

```vue
<script setup>
let word = 'hello'
let time = ref(1000)

setInterval(() => {
  time.value--
}, 1000)

onUpdate(() => {
  console.log('update')
})
</script>

<template>
  <div>{{ word }}</div>
  <div>{{ time }}</div>
</template>
```

这个组件每次修改倒计时变量时，都会触发 Vue 的更新机制，从而触发 `onUpdate` 生命周期钩子。如果组件庞大，会频繁触发 `diff` 算法对比 DOM （更新的时候只需要修改发生变动的部分，性能消耗反而没那么大，主要是虚拟 DOM 对比寻找更新部分消耗更大）