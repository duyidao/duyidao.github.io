# ECharts 组件 Tooltip 无法显示问题排查与解决

## 概述

在基于 <word text="Vue3" /> 与 <word text="ECharts" /> 构建的数据可视化大屏项目中，开发者常遇到一个隐蔽的缺陷：通过 `ref` 绑定 <word text="ECharts" /> 实例后，图表的 `tooltip`（提示框）及其他部分交互配置失效，无法正常渲染。本文档深入剖析该问题的根本原因，并提供符合 <word text="Vue3" /> 响应式规范的标准解决方案。

## 问题重现

以下为触发该问题的典型代码结构：

```vue
<template>
  <div ref="chartRef" style="width: 100%; height: 100%;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)

onMounted(() => {
  // 初始化 ECharts 实例
  const chart = echarts.init(chartRef.value)
  
  // 设置配置项（包含 tooltip）
  chart.setOption({
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150], type: 'bar' }]
  })
})
</script>
```

**现象：**图表基础图形可正常渲染，但鼠标悬停时 `tooltip` 无法显示，部分复杂配置项（如 `dataZoom`、`visualMap`）也可能失效。

## 故障排查与原因分析

1. 官方 Issue 追踪

    查阅 <word text="ECharts" /> 官方 GitHub 仓库，存在高度相关的 Issue：Bug: [ECharts Tooltip 不显示问题 - Vue Ref vs 普通变量](https://github.com/apache/echarts/issues/21267?spm=a2ty_o01.29997173.0.0.793e55fbX05NiH)。

2. 根本原因：响应式代理冲突

    在 <word text="Vue3" /> 中，ref 与 reactive 底层依赖 <word text="Proxy" /> 实现深层响应式追踪。当使用 ref 存储 <word text="ECharts" /> 实例时，<word text="Vue3" /> 会将该实例对象代理为响应式对象。

    - <word text="ECharts" /> 内部包含大量复杂的私有属性、闭包引用及原型链方法。
    - <word text="Proxy" /> 的拦截机制破坏了 <word text="ECharts" /> 内部对特定属性的直接访问与 `this` 指向。
    - 深度监听庞大的 <word text="ECharts" /> 实例会引发严重的性能损耗，甚至导致内部状态机紊乱。

## 标准解决方案

为避免 <word text="Vue3" /> 对 <word text="ECharts" /> 实例进行深层代理，必须使用浅层响应式 API。

### 方案一：使用 shallowRef（推荐）

`shallowRef` 仅追踪 `.value` 本身的引用变化，不会对其内部属性进行 <word text="Proxy" /> 代理。

```javascript
import { shallowRef, onMounted } from 'vue'
import * as echarts from 'echarts'

// 使用 shallowRef 替代 ref
const chartRef = shallowRef(null)
const chartInstance = shallowRef(null)

onMounted(() => {
  const chart = echarts.init(chartRef.value)
  chartInstance.value = chart // 实例被浅层保存，免受 Proxy 干扰
  
  chart.setOption({ /* ... */ })
})
```

### 方案二：使用 markRaw 标记

若必须使用 `ref`，可通过 `markRaw` 明确告知 <word text="Vue3" /> 跳过该对象的响应式转换。

```javascript
import { ref, markRaw, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartInstance = ref(null)

onMounted(() => {
  // markRaw 确保对象永远不会被转换为代理
  const chart = markRaw(echarts.init(chartRef.value))
  chartInstance.value = chart
})
```

> 兼容性提示：若项目基于 <word text="Vue2" />，请避免在 `data` 函数中直接返回 <word text="ECharts" /> 实例，或使用 `Object.freeze` 冻结实例对象以阻断响应式劫持。

## 核心知识点总结

| API / 概念   | 作用机制                        | 适用场景                                        |
| ------------ | ------------------------------- | ----------------------------------------------- |
| `ref`        | 深层 <word text="Proxy" /> 代理 | 存储基础数据类型或需要深层监听的普通对象        |
| `shallowRef` | 仅代理 `.value `本身            | 存储第三方库实例、复杂 <word text="DOM" /> 节点 |
| `markRaw`    | 跳过 <word text="Proxy" /> 代理 | 标记对象跳过响应式转换，优化性能                |