# 通过el-日历实现

## 效果

## 回顾

第三方库按需求改造一般方案：

1. 通过 `css` 改造达到视觉效果欺骗
2. 通过 `css` 配合 `js` 操作 `dom` 

## UI改造

### 样式改造

首先引入 `el-calendar` 日历组件，然后修改样式（样式部分不做过多赘述）：

1. 修改整体日历的宽度和外边距，达到居中

2. 修改每个日历格子的高度

   > 注意
   >
   > 如果该模型的样式设置了怪异盒子模型 `box-sizing: border-box` ，则为其设置行高时需要把内边距去掉才能实现垂直居中。
   >
   > 因为怪异盒子模型的高度把内边距和边框都算进去，因此你设置了高度 37px ，内边距 10px ，实际高度只有17px 。

3. 微调，如取消边框，添加背景颜色等

```vue
<template>
  <div id="app">
    <el-calendar v-model="value"></el-calendar>
  </div>
</template>

<style>
#app {
  width: 300px;
  margin: 100px auto;
}

#app .el-calendar-table .el-calendar-day {
  height: 37px;
  line-height: 37px;
  padding: 0;
  text-align: center;
}

#app .el-calendar-table td {
  border: 0;
}

#app .el-calendar-table td.is-today {
  border-radius: 50%;
  background-color: #409EFF;
  color: #fff;
}

#app .el-calendar-table td.is-today:hover {
  background-color: #fff;
  color: #409EFF;
}
</style>
```

效果如下图所示：

[![p9RwnVs.png](https://s1.ax1x.com/2023/05/16/p9RwnVs.png)](https://imgse.com/i/p9RwnVs)

### 插槽改造



[![p9Rw2dA.png](https://s1.ax1x.com/2023/05/16/p9Rw2dA.png)](https://imgse.com/i/p9Rw2dA)



[![p9RwRII.png](https://s1.ax1x.com/2023/05/16/p9RwRII.png)](https://imgse.com/i/p9RwRII)