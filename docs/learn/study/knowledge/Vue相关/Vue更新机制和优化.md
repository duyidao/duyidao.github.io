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

setTimeout(() => {
  word = 'world'
}, 3000)

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

以上方代码为例试验一下，延时器 3s 后把 `word` 字段修改为 `world`，控制台没有打印，页面没有发生变化，因为 `word` 不是响应式；而定时器每隔 1s 就让 `time` 字段自减1，可以发现 3s 后 `word` 字段变成了 `world` 。说明它是每个组件都去比对一次查看是否有变化。

## 解决

1. 把倒计时区域提取为组件，数据通过 `props` 传递给组件，这样更新和比对都只会触发组件本身，而不是整个页面。
   
   ::: code-group
   ```vue [timeCounter.vue]
   <script setup>
   const {time} = defineProps(['time'])
   const containerTime = ref(time)

   setInterval(() => {
     containerTime.value--
   }, 1000)
   </script>

   <template>
     <div>{{ containerTime }}</div>
   </template>
   ```
   ```vue [App.vue]
   <script setup>
   import timeCounter from './timeCounter.vue'
   let word = 'hello'
   let time = 1000

   setTimeout(() => {
     word = 'world'
   }, 3000)
   setInterval(() => {
     time-=1
     document.querySelector('.time-container').innerHTML = time
   }, 1000)

   onUpdated(() => {
     console.log('update')
   })
   </script>

   <template>
     <div>{{ word }}</div>
     <div class="time-container">{{ time }}</div>
   </template>
   ```
   :::

   现在触发更新后只会更新 `timeCounter` 组件，而不会触发整个页面的更新，从而减少不必要的性能消耗。

   > [!WARNING] ⚠️ 注意
   > 传递的时候不要传递 `ref`，不然还是会触发整个页面的更新，因为 `ref` 是响应式的，会触发整个页面的更新。

2. 绕开 Vue 体系，用原生 DOM 操作设置 `innerHTML`，这样就不会触发 Vue 的更新机制（简单设置文字内容可以考虑） 
   
   ```vue [App.vue]
   <script setup>
   let word = 'hello'
   let time = 1000

   setTimeout(() => {
     word = 'world'
   }, 3000)

   onUpdated(() => {
     console.log('update')
   })
   </script>

   <template>
     <div>{{ word }}</div>
   </template>
   ```

   这样页面只会触发重绘，不会触发重排。但是这个方法不是特别推荐，除非像案例那样只是简单修改文字内容。

## 原理

1. Vue 的更新是以组件为最小统计的单位的
   
   常说 Vue 的响应式原理是 `get` 和 `set` ，`set` 部分在修改数据时会触发更新，而 `get` 会有一个依赖收集的过程。

   ![过程图](https://pic1.imgdb.cn/item/6793081cd0e0a243d4f768b0.png)

   从图可以看出，触发 `get` 后它会针对变量收集使用到它的组件并存储起来，后续该变量触发更新后，会遍历存储的组件，触发它们的更新。因此 Vue 的更新是以组件为最小统计单位的更新。

   > [!NOTE] 拓展
   > React 页面更新不是通过 `get` 和 `set` ，因此不会有组件依赖收集，触发更新后是整个组件树从头到尾都更新了，因此需要做很多额外的优化。

2. 更新的过程
   
   ![更新的过程](https://pic1.imgdb.cn/item/67930a0cd0e0a243d4f7697a.png)

   所以在更新上 Vue 是根据新老虚拟 DOM 来比对哪里发生了变化，然后用最简单的策略更新，比如修改文字内容，只需要修改 `textContent` 就可以了，而修改样式只需要修改 `style` 就可以了，不需要重新渲染整个 DOM。

## 更新策略的决定

![更新策略的决定](https://pic1.imgdb.cn/item/67930c27d0e0a243d4f76a2c.png)

下面来简单看一下虚拟 DOM 长什么样：

::: code-group
```js [script.js]
let obj = {
  type: 'div',
  attr: [],
  text: '',
  children: [
    {
      type: 'div',
      attr: [],
      text: _ctx.other, // _ctx表示Vue的上下文
      children: []
    }
  ]
}
```
```html [template.vue]
<div>
  <div>{{ other }}</div>
</div>
```
:::

在比对时他会先看 `key` 和类型是否发生改变，如果改变那就必定要删除之前的，`createElement` 方法重新创建一个新 DOM 再加入。

如果类型和 `key` 没有改变，那就看该 DOM 是否写死（即没有使用变量），写死则跳过比对。

后面再看文字内容和属性是否发生改变，文字变化用 `innerHTML` 修改，属性发生变化用 `setAttribute` 修改。

## 总结

1. Vue 的更新是以组件为最小统计单位的。Vue 的更新过程是先比对虚拟 DOM，然后根据变化决定更新策略。
2. 如果有一些更新特别频繁的区域，可以把区域从页面中提取出来作为一个组件，尤其是页面比较庞大的时候。
3. 尽量复用之前的 DOM，避免相似的结构，用 `v-if` 切换显影