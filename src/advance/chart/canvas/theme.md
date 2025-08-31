---
title: 根据背景图片改变主题色阴影
author:
  - 三十的前端课 根据背景图片改主题色&https://www.bilibili.com/video/BV1U2wce7EHY
---

# 根据背景图片改变主题色阴影

## 需求效果

前端根据用户上传的背景图主色调，给图片加上不同颜色的内阴影边框。

## 基本原理

1. 任何颜色都可以由 `r` 、`g` 、`b` 、`a` 四个标识。`r` 为红色系最大值为 255；`g` 为绿色系最大值为 255；`b` 为蓝色系最大值为 255；`a` 为透明度，最大值也为 255
2. 可以利用<word text="Canvas" />读取图片节点
3. 利用<word text="Canvas" />的 `getImageData` 获取图片每一个像素点的 `rgba` 值，以一个大数组的格式返回
4. 想要判断图片的主题色可以通过 `rgb` 值算出来平均色

## 代码实现

::: code-group

```vue [App.vue]
<template>
  <div class="imgContainer">
    <img id="imgDom" src="xxx" />
    <div class="shadowDom" :style="styleObj"></div>
  </div>
</template>
```

```css [App.css]
.imgContainer {
  width: 800px;
  height: 600px;
  position: relative;
}

.shadowDom {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
```

```js [App.js]
const styleObj = reactive({
  boxShadow: 'none'
})

onMounted(() => {
  const dom = document.createElement('canvas')
  dom.width = 800
  dom.height = 800
  const canvasContext = dom.getContext('2d')
  // 把图片画在到canvas上
  comst imgDom = document.getElementById('imgDom')
  // 图片dom挂在，但是图片需要加载，要在图片加载好了才能画到canvas
  imgDom.onload = () => {
    canvasContext.drawImage(imgDom, 0, 0, 800, 800) // 画图
    // 画好图片后，获取图片的像素点
    const imgData = canvasContext.getImageData(0, 0, 800, 800)
    const length = imgData.data.length
    let allR = 0, allG = 0, allB = 0, allPx = length / 4
    // 遍历像素点，算出总数
    for (let i = 0; i < length; i += 4) {
      allR += imgData.data[i]
      allG += imgData.data[i + 1]
      allB += imgData.data[i + 2]
    }

    styleObj.boxShadow = `inset 0 0 80px 80px rgba(${Math,floor(allR / allPx)}, ${Math.floor(allG / allPx)}, ${Math.floor(allB / allPx)}, .5)`
  }
})
```

:::
