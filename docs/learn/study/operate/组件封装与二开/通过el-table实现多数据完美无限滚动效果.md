# 通过el-table实现多数据完美无限滚动效果

有一个场景：表格数据有200多条，用户滚动和操作起来十分卡顿，需要优化。

## 思考

如果直接写在 `.vue` 文件中？缺点是复用难，其他地方需要使用的话不方便复用，有很多冗余代码。

写在 `mixin` 文件中？缺点是只能复用核心逻辑，dom还是要自己获取，不能完全复用。

利用子组件复用？缺点是改变原有父子结构，可能会引起其他功能的问题，并且需要使用者写很多其他的东西。

更推荐使用自定义指令实现，涉及到 DOM 监听，操作相关的复用，自定义指令是非常好的方案。

方向有了，该用什么思路实现呢？

## 实现

### 触底加载

例如有500条数据，截取 0-20 条数据渲染，当滚动到底部时，再截取 20-40 条数据渲染，以此类推，直到滚动到最底部。这是最简单的方案。如何判断滚动到底部呢？

![判断滚到底部](https://pic1.imgdb.cn/item/67dd262288c538a9b5c2dd31.png)

通过上图可以看出，可视区域滚动时，上面被卷去的区域就是已滚动的区域，因此可以监听其被卷去的距离 `scollTop` ，当 `scollTop` 加上可视区域本身的高度 `clientTop` 大于等于表格总高度，说明已经滚动到最底部，此时可以获取新数据。

::: code-group
```vue [table.vue]
<template>
  <div>
    <el-table v-myscroll="20" :data="tableData.slice(start, over)" height="300" style="width: 100%">
      <el-table-column prop="date" label="索引" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  data() {
    return {
      start: 0,
      over: 20,
      tableData: [],
    };
  },
  mounted() {
    setTimeout(() => {
      for (let i = 0; i < 200; i++) {
        this.tableData.push({
          date: i + 1,
          name: "刀刀",
          address: "哈哈哈",
        });
      }
    }, 1000);
  },
  methods: {},
};
</script>
```
```js [directives.js]
Vue.directives('myscroll', {
  bind(el, bind, vnode) {
    const target = el.querySelector('el-table__body-wrapper'); // 获取表格的body
    const self = vnode.context; // 获取当前组件实例 this

    target.addEventListener("scroll", () => {
      // 判断是否滚动到底部
      if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
        if (self.over >= self.list.length) return
        self.over += 20;
      }
    });
  },
})
```
:::

> [!NOTE] 自定义事件参数回顾
> - el：绑定了自定义指令的dom元素
> - bind：等号后面传的参数
> - vnode：父节点数据对象，其中，`context` 是其对应的 `this` 指向

### 固定数量渲染

滚动触底加载方法虽然简单，且一开始就只渲染一点数据，但是如果滚动到底部后，会渲染完全部的数据，此时页面也会因为数据过多渲染了过多的真实 DOM，导致页面卡顿。转变思路，渲染固定数量的 DOM 元素，每次滚动替换渲染的数据，这样就不会卡顿了。

举个例子，刚开始进入页面，渲染的是数组 0-20 的数据，往下滚动的时候，动态计算被卷曲的高度，然后根据被卷曲的高度和表格每列的高度计算出起始位置和结束位置，然后截取数组中对应的数据渲染到页面中。这样，无论数据有多少，页面渲染的 DOM 元素数量都是固定的，不会因为数据量过大导致页面卡顿。

假设每列高度为40，`scrollTop` 被卷去的高度为 200px，那么说明用户已经滚动了 5条数据，因此起始位置为 5，结束位置为 25，截取数组中 5-25 的数据渲染到页面中。

综上所述：

- 起始位置计算方式为：`scrollTop` 除以每列高度，向下取整。
- 结束位置计算方式为：`scrollTop` 加上可见高度除以每列高度，向下取整。

计算完起始和结束位置的索引后，根据前面和后面剩余的没显示的数量，分别计算出对应的 `padding` 值，然后设置到表格的 `padding` 上，这样就可以实现无缝滚动的效果了。如果不设置，就会导致滚动触底和触顶，无法继续滚动展示剩下的数据。

::: code-group
```js [directives.js]
Vue.directives('myscroll', {
  bind(el, bind, vnode) {
    const target = el.querySelector('el-table__body-wrapper'); // 获取表格的body
    const self = vnode.context; // 获取当前组件实例 this

    const table = target.querySelector('table')

    target.addEventListener('scroll', () => {
      setTimeout(() => {
        table.style.paddingTop = self.padding[0] + 'px'
        table.style.paddingBottom = self.padding[1] + 'px'

        self.scrollTop = target.scrollTop
        self.tableHeight = target.clientHeight
      }, 200);
    })
  },
})
```
```js [mixin.js]
Vue.mixin({
  data() {
    return {
      scrollTop: 0, // 被卷曲的高度
      tableHeight: 300, // 表单初始值默认高度
    };
  },
  computed: {
    // 计算起始位置的索引。最大值为0，不能有负数。
    start() {
      return Math.max(this.scrollTop / 40 - 6, 0) // 初始卷曲值为288，288/48=6
    },
    // 计算结束1位置的索引。最小值为数组长度
    over() {
      return Math.min((this.scrollTop + this.tableHeight) / 40, this.tableData.length)
    },
    padding() {
      const paddingTop = this.start * 48
      const paddingBottom = (this.tableData.length - this.over) * 48

      return [paddingTop, paddingBottom]
    },
  },
});
```
:::

> [!NOTE] 题外话
> 这里获取表格高度的代码写在 `scroll` 事件内，虽然会额外多消耗一点性能，但是开发者可以写的更少。如果不在 `scroll` 获取，只能在每个组件通过 `$nectTick` 回调中获取。


## 总结

### 方案一：触底加载（简单版）

- 实现原理：

  - 初始加载前20条数据
  - 监听滚动事件，当 `scrollTop + clientHeight >= scrollHeight` 时加载后续数据
  - 每次滚动到底部追加20条数据

- 优点：

  - 实现简单，代码量少
  - 初始渲染压力小

- 缺点：

  - 滚动到底部后仍会渲染全部数据
  - 数据量超过1000条时会出现明显卡顿
  - 无法实现真正的无限滚动体验

- 适用场景：

  - 数据量较小（<500条）
  - 对性能要求不高的管理后台

### 方案二：固定数量渲染（高性能版）

- 实现原理：

  - 始终只渲染可见区域附近数据（如30条）
  - 通过动态计算 `paddingTop`/`paddingBottom` 模拟完整滚动高度
  - 根据 `scrollTop` 动态计算数据起始位置：
    ```js
    start = Math.floor(scrollTop / 行高)
    end = start + 可见行数
    ```

- 优点：

  - 无论数据量多大，渲染的 DOM 数量恒定
  - 平滑滚动体验，无性能瓶颈
  - 支持快速跳转滚动

- 缺点：

  - 实现复杂度较高
  - 需要精确计算行高
  - 需处理边缘滚动抖动问题

- 适用场景：

  - 万级数据量表格
  - 需要流畅交互体验的C端产品
  - 移动端H5页面

方案选型建议:

|维度|	触底加载|	固定数量渲染|
|-|-|-|
|数据量	|< 500条|	> 1000条|
|实现难度|	简单（1小时）|	复杂（3小时+）|
|用户体验|	滚动到底需等待加载|	丝滑无感滚动|
|内存占用|	线性增长|	恒定占用|
|扩展性|	无法应对大数据场景|	支持任意数据量|


