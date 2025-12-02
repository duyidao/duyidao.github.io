---
title: 数说Echart组件Tooltip无法显示
titleTemplate: 数说项目Echart组件Tooltip无法显示
description: 数说 echart tooltip ref shallowRef
head:
  - - meta
    - name: description
      content: 数说项目Echart组件Tooltip无法显示
  - - meta
    - name: keywords
      content: 数说 echart tooltip ref shallowRef
pageClass: shushuo-report-echart
tags: echart,tooltip,ref,shallowRef
---

# Echart组件使用Ref绑定实例导致Tooltip无法显示

## 问题描述

在项目中，使用 Echart 组件时，通过 `ref` 绑定实例后，发现 `tooltip` 无法显示。

```vue
<template>
  <div ref="chartRef" style="width: 100%; height: 100%;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);

onMounted(() => {
  const chart = echarts.init(chartRef.value);
})
</script>
```

## 故障排查

在搜索解决方法的时候，发现 Echart 有一个 `issue` ，描述了类似的问题：[[Bug] ECharts Tooltip 不显示问题 - Vue Ref vs 普通变量](https://github.com/apache/echarts/issues/21267)。

![issue截图](https://pic1.imgdb.cn/item/692eb5dc7e390957debbc946.png)

如果使用 `ref` 绑定实例，会导致里面有些 `options` 无效，不会被画出来，或者和预期不一致。目前原因不明确。

## 解决方案

- 如果使用的是<word text="Vue3" />，请使用 `shallowRef` 和 `shallowReactive` 代替 `reactive` 及 `ref` 。
- 如果使用的是<word text="Vue2" />，请避免在 `data` 函数中声明 ECarts 的对象实例或使用 Vue.observable API。

上述均会导致 ECharts 的对象实例被代理成为响应式对象，影响 ECharts 对内部属性的访问，可能会导致图表无法正确显示等系列意外问题，且会由于深度监听而极大地降低图表展示性能。

Echart 官方也有针对这个的改动和 PR ，可以参考：[fix(core): mark echarts instance object as raw in Vue](https://github.com/apache/echarts/pull/21293)。
