# 饼图轮播，hover图例后修改中间内容

## 需求梳理

客户那边说内容一直展示一条数据的值不符合他们的期望，要求能够实现内容轮播滚动，且鼠标悬停在图例上时，能够实现中间内容展示对应的数据。

接到需求，自然需要先梳理一下，用什么方式来实现。

首先看看轮播，查阅官方文档，找到 `EChart` 有两个事件方法 [`highlight`](https://echarts.apache.org/zh/api.html#action.highlight) 和 [`downplay`](https://echarts.apache.org/zh/api.html#action.downplay) 。其中：

- `highlight` 用于高亮指定的图形，用法如下：

  ```js
  myChart.value.dispatchAction({
      type: 'highlight',
      seriesIndex: 0, // setOption中series数组内第几索引的对象
      dataIndex: 1, // setOption中series数组对象中data第几项数据
  });
  ```

- `downplay` 用于取消高亮指定的图形，用法如下：

  ```js
  myChart.value.dispatchAction({
      type: 'downplay',
      seriesIndex: 0, // setOption中series数组内第几索引的对象
      dataIndex: 1, // setOption中series数组对象中data第几项数据
  });
  ```


看到这里可以得出结论，实现饼图轮播无外乎就是 `forEach` 循环遍历数据数组，让当前项的索引触发 `highlight` 激活状态，再通过排他思想把其余所有项索引触发 `downplay` 取消高亮。这样就能实现轮播了。

接着看看鼠标 `hover` 后中间内容修改怎么实现。继续翻阅官方文档，发现可以通过 `on()` 为`echart` 组件绑定事件方法。

为 `echart` 绑定 `highlight` 方法后，能够在内容激活后触发该事件。

```js
const myChart = documment.querySelector('.echart');

myChart.on('highlight', (e) => {
  console.log(e);
})
```

## 轮播

## hover