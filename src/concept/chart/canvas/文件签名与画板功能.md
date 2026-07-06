---
title: 文件签名与画板功能
author:
  - 三十的前端课 前端实现在线签名，在线画板&https://www.bilibili.com/video/BV1nn4y197rh
---

# 文件签名与画板功能

## 代码模块和结构

最终效果如下图所示：

![最终效果](https://pic1.imgdb.cn/item/67a5d57fd0e0a243d4fc8f7d.png)

该功能主要分为三个模块：主画板、签名画板、签名绘制浮层画板。

- 签名画板：用于用户签名，用户可点击清除按钮一键清除之前的签名；点击保存按钮保存签名，保存的签名会显示在签名绘制浮层画板中。
- 签名绘制浮层画板：平时不显示，当用户点击签名画板中的保存按钮时，签名绘制浮层画板显示，并显示用户保存的签名。
- 主画板：包含单子和签名画板、浮层画板三个区域，可以点击导出按钮导出图片文件。

![代码模块和结构](https://pic1.imgdb.cn/item/67a5d50dd0e0a243d4fc8f4e.png)

## 前置工作

先搭建好这个项目的基本结构，即左侧的清单、右侧的画板、底部的按钮以及浮层画板。

::: code-group

```js
let float = null // 浮层画板
let floatCtx = null // 浮层画板的canvas上下文
let sign = null // 签名画板
let signCtx = null // 签名画板的canvas上下文
let main = null // 主画板
let mainCtx = null // 主画板的canvas上下文

// 后端数据
const data = {
  baseUrl: 'xxx.png',
  size: {
    width: 600,
    height: 400,
  },
}

/**
 * 主画板
 */
onMounted(() => {
  // 获取主画板
  main = document.getElementById('main')
  mainCtx = main.getContext('2d')
  const img = new Image()
  img.src = data.baseUrl
  img.onload = () => {
    mainCtx.drawImage(img, 0, 0, data.size.width, data.size.height)
  }
})

/**
 * 浮层画板
 */
onMounted(() => {
  // 获取悬浮板
  float = document.getElementById('float')
  floatCtx = float.getContext('2d')
})

/**
 * 签名画板
 */
onMounted(() => {
  // 获取签名板
  sign = document.getElementById('sign')
  signCtx = sign.getContext('2d')
})
```

```vue
<template>
  <div class="container">
    <div
      class="mainboard"
      :style="{
        width: `${data.size.width}px`,
        height: `${data.size.height}px`,
      }"
    >
      <!-- 主画板 -->
      <canvas
        id="main"
        :width="data.size.width"
        :height="data.size.height"
      ></canvas>
      <!-- 签名画板 -->
      <canvas
        id="sign"
        :width="data.size.width"
        :height="data.size.height"
      ></canvas>
      <!-- 签名绘制浮层画板 -->
      <div
        class="floatboard"
        :style="{ left: `${left}px`, top: `${top}px` }"
        @mounsedown="dragMousedown"
        @mouseup="dragMouseup"
        @mousemove="dragMousemove"
      >
        <canvas id="float" width="200" height="80"></canvas>
      </div>
      <button @click="save">保存</button>
      <button @click="backInit">清除</button>
    </div>
    <!-- 签名画板 -->
    <div class="signboard">
      <canvas id="sign" width="400" height="400"></canvas>
      <button @click="sendSignToFloat">确认</button>
      <button @click="clearSign">清除</button>
    </div>
  </div>
</template>
```

:::

## 签名画板

### 签名

签名画板的主要功能是用户签名，用户点击签名画板时，鼠标移动时，签名画板会跟随鼠标移动，并绘制出一条线段。用户点击清除按钮时，签名画板会清空之前的签名。

<word text="Canvas" />绘制线段相关 API 如下图所示：

![相关 API](https://pic1.imgdb.cn/item/67a6ccf0d0e0a243d4fce6ce.png)

下面测试一下这些 API，尝试绘制一条折线：

```js
/**
 * 签名画板
 */
onMounted(() => {
  // 获取签名板
  sign = document.getElementById('sign')
  signCtx = sign.getContext('2d')
  signCtx.moveTo(10, 10)
  signCtx.lineTo(100, 100)
  signCtx.lineTo(200, 10)
  signCtx.stroke()
})
```

效果能够成功出来，接下来就是考虑怎么实现签名功能了。

- 当用户鼠标按下签名画板时，说明用户要开始签名了，此时获取这个点的坐标作为起点 `moveTo()` 的参数，获取当前点在当前元素的位置，不能用 `clientX` ，而应该使用 `offsetX`
- 用户鼠标在移动时，判断是否执行了前面的步骤，即是否点击了鼠标，点击了才给画线，没点击则不画线。获取当前鼠标的坐标作为 `lineTo()` 的参数
- 用户鼠标松开后，调用 `stroke()` 方法绘制线段
- 用户点击清除按钮时，调用 `clearRect()` 方法清空画板。

::: code-group

```js [签名画板事件.js]
/**
 * 签名画板
 */
onMounted(() => {
  // 获取签名板
  sign = document.getElementById('sign')
  signCtx = sign.getContext('2d')
})

let canSign = false // [!code focus]
// 鼠标点击 // [!code focus]
function mouseDown(event) {
  // [!code focus]
  canSign = true // [!code focus]
  // 获取鼠标在画板上的坐标 // [!code focus]
  const { offsetX, offsetY } = event // [!code focus]
  // 设置起点 // [!code focus]
  signCtx.moveTo(offsetX, offsetY) // [!code focus]
  signCtx.lineWidth = 5 // 线宽设置 // [!code focus]
  signCtx.strokeStyle = '#000' // 线颜色设置 // [!code focus]
} // [!code focus]
// [!code focus]
// 鼠标移动 // [!code focus]
function mouseMove() {
  // [!code focus]
  if (!canSign) return // [!code focus]
  // 获取鼠标在画板上的坐标 // [!code focus]
  const { offsetX, offsetY } = event // [!code focus]
  // 绘制线段 // [!code focus]
  signCtx.lineTo(offsetX, offsetY) // [!code focus]
  signCtx.stroke() // [!code focus]
} // [!code focus]
// [!code focus]
// 鼠标松开 // [!code focus]
function mouseUp() {
  // [!code focus]
  canSign = false // [!code focus]
  // 绘制线段 // [!code focus]
  signCtx.stroke() // [!code focus]
} // [!code focus]
```

```vue [DOM元素.vue]
<template>
  <div class="container">
    <div
      class="mainboard"
      :style="{
        width: `${data.size.width}px`,
        height: `${data.size.height}px`,
      }"
    >
      <!-- 主画板 -->
      <canvas
        id="main"
        :width="data.size.width"
        :height="data.size.height"
      ></canvas>
      <!-- 签名画板 -->
      <canvas
        id="sign"
        :width="data.size.width"
        :height="data.size.height"
      ></canvas>
      <!-- 签名绘制浮层画板 -->
      <div
        class="floatboard"
        :style="{ left: `${left}px`, top: `${top}px` }"
        @mounsedown="dragMousedown"
        @mouseup="dragMouseup"
        @mousemove="dragMousemove"
      >
        <canvas id="float" width="200" height="80"></canvas>
      </div>
      <button @click="save">保存</button>
      <button @click="backInit">清除</button>
    </div>
    <!-- 签名画板 -->
    <div class="signboard">
      <canvas
        id="sign"
        width="400"
        height="400"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      ></canvas>
      <!-- [!code focus] -->
      <button @click="sendSignToFloat">确认</button>
      <button @click="clearSign">清除</button>
    </div>
  </div>
</template>
```

:::

### 清除与确认

清除画板用到了 `clearRect` 方法，该方法会清除指定矩形区域，并让其透明。保存签名板内容到浮层画板上，可以使用 `drawImage` 方法，将签名画板的内容绘制到浮层画板上。

```js
/**
 * 签名画板
 */
onMounted(() => {
  // 获取签名板
  sign = document.getElementById('sign')
  signCtx = sign.getContext('2d')
})

// ...

// 清除 // [!code focus]
function clearSign() {
  // [!code focus]
  signCtx.clearRect(0, 0, 400, 400) // [!code focus]
} // [!code focus]

// 确认 // [!code focus]
function sendSignToFloat() {
  // [!code focus]
  floatCtx.drawImage(sign, 0, 0, 200, 80) // [!code focus]
} // [!code focus]
```

## 主画板

主画板主要有保存和清除两个功能。

保存按钮点击后，将浮层画板上的内容保存到它拖拽的对应位置，然后通过 `base64` 转化为一个图片。

清除按钮点击后可以清除整个画布，然后再绘制空白背景图，这样就能达到清除效果；也能清除签名区域实现清除效果。

```js
/**
 * 主画板
 */
const initImg = () => {
  // [!code focus]
  const img = new Image() // [!code focus]
  img.src = data.baseUrl // [!code focus]
  img.onload = () => {
    // [!code focus]
    mainCtx.drawImage(img, 0, 0, data.size.width, data.size.height) // [!code focus]
  } // [!code focus]
} // [!code focus]
onMounted(() => {
  // 获取主画板
  main = document.getElementById('main')
  mainCtx = main.getContext('2d')
  initImg() // [!code focus]
})

// 保存 // [!code focus]
function save() {
  // [!code focus]
  mainCtx.drawImage(float, left.value, topvalue, 200, 80) // [!code focus]
  let imgData = main.toDataURL('image/png') // [!code focus]
} // [!code focus]

// 清除 // [!code focus]
function backInit() {
  // [!code focus]
  mainCtx.clearRect(0, 0, data.size.width, data.size.height) // [!code focus]
  initImg() // [!code focus]
} // [!code focus]
```

## 浮层画板

浮层画板主要是拖拽功能，通过监听 `mousedown`、`mousemove`、`mouseup` 三个事件实现。

一般情况下浮层画板不展示，只有签名画板签名后点击确认才会展示，所以需要设置一个 `show` 变量来控制浮层画板是否展示。

## 拓展：橡皮擦与笔型号

可以更深入扩展一下，比如在签名画板上添加橡皮擦功能，或者添加不同型号的笔，比如粗细不同、颜色不同等。

修改签字画板的鼠标移动函数事件，判断当前的状态是记号笔还是橡皮擦，如果是记号笔就继续调用 `lintTo()` 和 `stroke()` 方法画线；如果是橡皮擦就调用 `clearRect()` 方法。

::: code-group

```js [签字画板事件.js]
let signType = 'pen' // 笔型号 // [!code focus]
let lineWidth = 5 // 笔大小 // [!code focus]
let strokeStyle = '#000' // 笔颜色 // [!code focus]

function mouseDown(event) {
  canSign = true
  // 获取鼠标在画板上的坐标
  const { offsetX, offsetY } = event
  // 设置起点
  signCtx.moveTo(offsetX, offsetY)
  signCtx.lineWidth = lineWidth // 线宽设置 // [!code focus]
  signCtx.strokeStyle = strokeStyle // 线颜色设置 // [!code focus]
}
// 鼠标移动
function mouseMove() {
  if (!canSign) return
  // 获取鼠标在画板上的坐标
  const { offsetX, offsetY } = event
  if (signType === 'pen') {
    // [!code focus]
    // 绘制线段 // [!code focus]
    signCtx.lineTo(offsetX, offsetY) // [!code focus]
    signCtx.stroke() // [!code focus]
  } // [!code focus]
  else if (signType === 'eraser') {
    // [!code focus]
    // 清除线段 // [!code focus]
    signCtx.clearRect(offsetX, offsetY, 10, 10) // [!code focus]
  } // [!code focus]
}
```

```vue [DOM元素.vue]
<template>
  <div class="container">
    <div class="mainboard" :style="{ width: `${data.size.width}px`, height: `${data.size.height}px` }">
    <!-- ... -->
    <!-- 签名画板 -->
    <div class="signboard">
      <canvas id="sign" width="400" height="400" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></canvas>
      <button @click="sendSignToFloat">确认</button>
      <button @click="clearSign">清除</button>
      <button @click="() => signType = 'pen'">记号笔</button> <!-- [!code focus] -->
      <button @click="() => signType = 'eraser'">橡皮擦</button> <!-- [!code focus] -->
      <button @click="() => strokeStyle = '#000'">黑色记号笔</button> <!-- [!code focus] -->
      <button @click="() => strokeStyle = 'blue'">蓝色记号笔</button> <!-- [!code focus] -->
      <button @click="() => lineWidth = '5'">细记号笔</button> <!-- [!code focus] -->
      <button @click="() => lineWidth = '10'">中记号笔</button> <!-- [!code focus] -->
      <button @click="() => lineWidth = '20'">粗记号笔</button> <!-- [!code focus] -->
    </div>
  </div>
</template>
```

:::

保存代码后查看效果，现在可以切换记号笔和橡皮擦，并且可以调整记号笔的粗细和颜色。不过在切换颜色的时候不难发现，之前画好的线，切换颜色后也会改变其颜色，这是因为对<word text="Canvas" />来说，它们还是属于同一条线段，因此颜色会一起发生改变。这也是一个小坑点。

解决方法也很简单，<word text="Canvas" />有 `beginPath` 和 `closePath` 方法，可以用来重新开始一条新的线段，鼠标点击事件内调用 `beginPath` 方法，鼠标松开事件调用 `closePath` 方法，这样就可以避免之前画好的线段颜色发生改变。

```js [签字画板事件.js]
let signType = 'pen' // 笔型号
let lineWidth = 5 // 笔大小
let strokeStyle = '#000' // 笔颜色

function mouseDown(event) {
  canSign = true
  // 获取鼠标在画板上的坐标
  const { offsetX, offsetY } = event
  // 设置起点
  signCtx.beginPath() // [!code focus]
  signCtx.moveTo(offsetX, offsetY)
  signCtx.lineWidth = lineWidth // 线宽设置
  signCtx.strokeStyle = strokeStyle // 线颜色设置
}
// 鼠标移动
function mouseMove() {
  if (!canSign) return
  // 获取鼠标在画板上的坐标
  const { offsetX, offsetY } = event
  if (signType === 'pen') {
    // 绘制线段
    signCtx.lineTo(offsetX, offsetY)
    signCtx.stroke()
  } else if (signType === 'eraser') {
    // 清除线段
    signCtx.clearRect(offsetX, offsetY, 10, 10)
  }
}
// 鼠标松开
function mouseUp() {
  canSign = false
  // 绘制线段
  signCtx.stroke()
  signCtx.closePath() // [!code focus]
}
```
