---
title: 刀刀音乐音频可视化
titleTemplate: 刀刀音乐音频可视化
description: 刀刀音乐 音频可视化
head:
  - - meta
    - name: description
      content: 刀刀音乐音频可视化
  - - meta
    - name: keywords
      content: 刀刀音乐 音频可视化
pageClass: project-music-visualization
---

# 音频可视化

## 需求分析

在音频播放时，底部会有一个音频可视化效果，用于展示音频的频率变化，让用户能够直观地感受到音频的节奏。整体以柱状体的方式展示，柱状体的高度表示音频的频率大小，并支持修改颜色。

## 实现思路

该效果主要通过 `canvas` 来实现，通过 `AudioContext` 获取音频的频率数据，然后用 `Unit8Array` 来表示频率数据，最后通过 `canvas` 的 `fillRect` 方法来绘制柱状体。

## 代码实现

根据 `AudioContext` 的 `analyser` 方法，可以获取音频的频率数据，通过 `getByteFrequencyData` 方法，可以获取频率数据，该数据是一个 `Uint8Array` 类型的数组，数组的长度为 `analyser.frequencyBinCount`，表示获取到的频率数据的个数。

使用 `requestAnimationFrame` 方法，可以按帧绘制 `canvas`，在每一帧中，先清空画布，然后获取频率数据，然后根据频率数据绘制柱状体。

绘制使用的方法是 `fillRect` ，该方法需要传入四个参数，分别是矩形的左上角 x 坐标、矩形的左上角 y 坐标、矩形的宽度、矩形的高度。举个例子，我要画一个竖立的柱状体，那么矩形的左上角 x 坐标就是当前柱状体的 x 坐标，矩形的左上角 y 坐标就是画布的高度减去柱状体的高度，矩形的宽度就是柱状体的宽度，矩形的高度就是柱状体的高度。

```js
let dataArray: Uint8Array = new Uint8Array(analyser!.frequencyBinCount)
;(function draw() {
  // 动画帧，按帧绘制canvas
  requestAnimationFrame(draw)
  if (!analyser || !canvasRef.value || !dataArray) return
  // 清空画布
  const { width, height } = canvasRef.value
  con.value.clearRect(0, 0, width, height)
  // 让分析器节点分析出数据到数组中
  analyser.getByteFrequencyData(dataArray)
  // 设置canvas上下文绘制的颜色
  con.value.fillStyle = userColor.value
  // len表示获取分析到的音频数据数组长度的
  // 这里除以2.5是剔除不经常出现的高频的部分
  const len = Number((dataArray.length / 1.3).toFixed(0))
  // barWidth表示每个波形矩形的宽度 这里除以2是为了绘制对称的波形图
  const barWidth = width / len / 2
  for (let i = 0; i < len; i++) {
    // data是8位数组的每个数据，因为是一个字节，即data的值都是 <= 255
    const data = dataArray[i]
    // barHeight表示每个波形矩形的高度，值为单位长度乘canvas容器的高
    const barHeight = (data / baseHeight) * height
    // 绘制点y
    const y = height - barHeight
    // 绘制点x1
    const x1 = i * barWidth + width / 2
    // 绘制点x2
    const x2 = width / 2 - (i + 1) * barWidth
    // 绘制右半部分波形图
    con.value.fillRect(x1, y, barWidth - 2, barHeight)
    // 绘制左半部分波形图
    con.value.fillRect(x2, y, barWidth - 2, barHeight)
  }
})()
```
