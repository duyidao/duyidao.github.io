# Computed计算属性 实现

`computed` 计算属性是一个特殊的存在，它既是 `sub` 也是 `dep`。说它是 `dep` 是因为 `effect` 可以访问 `computed` 变量，当 `computed` 发生改变时，通知 `effect` 执行；说它是 `sub` 是因为它会收集依赖项，它接收一个回调函数，收集内部响应式变量的依赖，后续依赖发生变化时，会触发回调函数，类似于 `effect` 函数。

下面来看一个例子：

> [!info] 例子
> ```js
> let count = ref(1)
>
> const c = computed(() => count.value + 1)
> 
> effect(() => {
>   console.log('effect => ', c.value)
> })
>
> setTimeout(() => {
>   count.value++
> }, 1000)
> ```

先来理解它的工作运行流程：
- 创建一个 `ref` 变量 `count`，值为 `1`，没有和谁做关联，继续往下走
- 创建一个 `computed` 变量 `c`，一开始回调不会执行，继续往下走
- 遇到一个 `effect` 函数，执行回调函数，打印了 `c.value` ，此时执行 `computed` 的回调函数，此时 `computed` 会作为一个 `sub` 收集响应式变量的依赖
- `count` 创建一个新节点，头节点和尾节点都指向该节点。节点的 `sub` 指向 `computed`，继续往下走（此时 `computed` 作为 `sub`）
- `c` 创建一个新节点，头节点和尾节点都指向该节点。节点的 `sub` 指向 `effect`，继续往下走（此时 `computed` 作为 `dep`）
- 一秒之后 `count` 发生改变，通过节点的 `sub` 触发 `computed` 的回调函数，然后 `computed` 通过节点的 `sub` 通知 `effect` 执行回调函数，打印 `c.value`