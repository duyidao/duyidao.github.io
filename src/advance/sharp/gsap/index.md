---
title: GSAP 学习
author:
  - MiuMiu8802 使用GSAP轻松给页面添加动画效果｜GSAP3入门｜官方英文教程阅读｜GreenSock&https://www.bilibili.com/video/BV1724y1R76e
---

# GSAP

## 引入

想要使用 GSAP，首先需要引入 GSAP 库，可以通过以下方式引入：

- 通过 CDN 引入：

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/gsap.min.js"></script>
  ```

- 通过 npm 安装：

  ```bash
  npm install gsap
  ```

## 创建第一个动画

每一个动画，GSAP 都会创建一个 `Tween` 对象，通过 `gsap.to()` 方法可以创建一个从当前状态到目标状态的动画。

简单实现第一个动画，首先创建一个 `.box` 的盒子，宽高为 100px，背景色为红色，然后使用 GSAP 给这个盒子添加一个动画效果，使其在 2 秒内从左向右移动 200px。

::: code-group

```html [HTML]
<div class="box"></div>
```

```css [CSS]
.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
```

```javascript [JavaScript]
gsap.to('.box', { x: 200, duration: 2 })
```

:::

现在就有一个丝滑的动画效果了。

总结一下，GSAP 的简单使用语法如下：

![简单使用语法](https://pic1.imgdb.cn/item/68d9fce8c5157e1a8842b227.png)

整体命令就是一个方法 `method` ，一个目标 `target` ，一个属性 `vars object` 。其中：

- `method`：方法用于创建一个从当前状态到目标状态的动画。
- `target(s)`：要动画化的元素，可以是选择器、DOM 元素、或者 GSAP 的 `Timeline` 对象。可以是单个元素，也可以是多个元素。
- `variables`：动画的目标状态，可以是一个对象，包含要动画化的属性和目标值。

## Method(s) 常用的方法

首先来看看方法都有哪些，前面用了 `.to()`，它的作用是把目标元素移动到哪。以上方示例代码为例子，`.to()` 方法会把 `.box` 元素从当前位置移动到 `x: 200` 的位置。

除了 `.to()` 方法，GSAP 还提供了其他一些方法，用于创建不同类型的动画效果，比如 `.from()` ，他会把目标元素从目标位置移动到当前位置，以上方例子为例，`.from()` 方法会把 `.box` 元素从 `x: 200` 的位置移动到它原本的位置。

而方法 `.fromTo()` 是 `.to()` 和 `.from()` 的结合体，会把目标元素从当前位置移动到目标位置。

最后是 `.set()` 方法，它会立即设置目标元素的属性值，它会立刻就完成，而不会创建动画效果。

## Target(s)

目标元素可以是选择器、DOM 元素、或者 GSAP 的 `Timeline` 对象、甚至是一个对象。可以是单个元素，也可以是多个元素。`target` 的作用就是告诉 GSAP 我们要对哪个元素进行动画。

```javascript
gsap.to(['.box', '.foo'], { x: 200, duration: 2 })
gsap.to(document.querySelector('.box'), { x: 200, duration: 2 })
gsap.to(document.querySelectorAll('.box'), { x: 200, duration: 2 })
```

## Variables

动画的目标状态，可以是一个对象，包含要动画化的属性和目标值，例如：

- `direction`：动画的持续时间
- `onComplete`：动画完成后的回调函数
- `repeat`：动画重复的次数
- `ratation`：旋转度数
- `delay`：动画延迟的时间
- `yoyo`：动画是否来回运动
- `stagger`：动画的间隔时间
- `ease`：动画的缓动函数

```javascript
gsap.to('.box', {
  x: 200,
  duration: 2,
  repeat: 3,
  onComplete: () => console.log('动画完成'),
})
```

## 什么东西能变成动画

前面的例子都是实现盒子的 `x` 轴平移动画，那么其他的（例如宽高、背景色、边框等等）能否也做成动画呢？

GSAP 官方文档写了，基本所有东西都可以变成动画，包括但不限于<word text="CSS" />属性（如 `border` 、 `opacity` 、 `borderRadius` 、 `padding` 、 `transform` 等等）、自定义对象属性，甚至字符串都可以。

> [!INFO] 题外话
> 尽可能使用 `transform` 变换进行动画，而不是像 `top`、`left` 或 `margin` 这样的布局属性。你会得到更平滑的动画!

虽然这些都能用来做动画，但是官方还是推荐使用 `transform` 和 `opacity` 来做动画，因为这样动画性能更好。

## Transform 简写

在写<word text="CSS" />时，我们经常使用 `transform` 来实现动画效果，比如 `translate`、`rotate`、`scale` 等。而 GSAP 也提供了简写的方式，比如 `x`、`y`、`z`、`rotation`、`scaleX`、`scaleY`、`scaleZ` 等。

```css
transform: rotate(45deg) translateX(10px) translateY(20%);
```

等价于

```js
gsap.to('.box', { rotation: 45, x: 10, yPercent: 20 })
```

同时，GSAP 支持相对位置的动画。还是以第一个例子为例，最开始的例子只是让 `.box` 盒子右移动 200px，如果想它右移动 100px 的位置，再右移动 200px，但又不想直接写 300px，此时可以用相对位置的写法来写。

```js
gsap.to('.box', {
  x: '+=100',
  duration: 2,
  onComplete: () => {
    gsap.to('.box', { x: '+=200', duration: 2 })
  },
})
```

参数写法的不同，代表不同的单位。直接写数字默认的是 `px` 单位；写字符串 `+=` 是相对位置；想要加其他单位如 `40vw` 等，也需要写字符串的格式；还能写一个函数，返回一个计算的结果。

```js
{
  x: 200, // 200px
  x: '+=100', // 相对位置
  x: '40vw', // 40vw
  x: () => window.innerWidth / 2, // 返回值
}
```

## 目标对象

前面在聊 `target(s)` 时，提到了目标可以选择一个对象做动画，此时可以以对象的属性名作为属性名，修改后的值作为属性值，实现动画效果。

```js
const obj = { a: 1 }

gsap.to(obj, { a: 200, duration: 2, onUpdate: () => console.log(obj.a) })
```

这个动画持续时间为 2s，持续把 `obj` 的 `a` 属性值从 1 变为 200。查看控制台可以看到按帧打印的 `obj.a` 的值。

这么做的目的是用于给 `canvas` 做动画，GSAP 无法直接操作 `canvas`，所以需要把 `canvas` 的属性值放到一个中间对象里，然后通过修改这个中间对象做动画。
