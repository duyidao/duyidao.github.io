---
title: GSAP 时间轴
author:
  - MiuMiu8802 使用GSAP轻松给页面添加动画效果｜GSAP3入门｜官方英文教程阅读｜GreenSock&https://www.bilibili.com/video/BV1724y1R76e
---

# GSAP 时间轴

## To 第三个参数

设置了时间轴后，可以通过第三个参数配置它什么时候开始执行。如：

```js
let tl = gsap.timeline()

tl.to('.box', { x: 100, duration: 1 }, 1)
```

上面的代码表示，在时间轴开始后的 1 秒，`.box`元素开始移动。

```js
let tl = gsap.timeline()

tl.to('.box', { x: 100, duration: 1 }, 1)
tl.to('.box', { x: 100, duration: 1 }, '<') // [!code ++]
```

小于号的意思是，当前动画在上一动画开始后立即开始；以此类推，大于号的意思是，当前动画在上一动画结束后立即开始。

```js
let tl = gsap.timeline()

tl.to('.box', { x: 100, duration: 1 }, 1)
tl.to('.box', { x: 100, duration: 1 }, '<')
tl.to('.box', { x: 100, duration: 1 }, '+=1') // [!code ++]
```

还能设置相对时间，比如上面的代码表示，当前动画在上一动画结束后的 1 秒后开始。

更强大的是，这些参数还能组合在一起使用，比如 `<1`，表示在上一动画开始后的 1 秒后开始；`>1` 表示在上一动画结束后 1 秒后开始。

## Timeline 传参

`timeline()` 是一个函数方法，也能接收一个对象作为参数，例如：

```js
let tl = gsap.timeline({ repeat: -1, yoyo: true })

tl.to('.box', { x: 100, duration: 1, stagger: 0.5 })
tl.to('.box', { x: 100, duration: 1, stagger: 0.5 })
```

上面的代码表示，时间轴会无限循环，并且每次循环都会反转动画。

## Defaults

`timeline()` 方法接收的对象中，有一个 `defaults` 属性，可以设置时间轴的默认参数，例如：

```js
let tl = gsap.timeline({ defaults: { duration: 1 } })

tl.to('.box', { x: 100 })
tl.to('.box', { x: 100 })
```

上面的代码表示，时间轴中的所有动画都会持续 1 秒，这样就能少写很多重复的代码了。

## Timeline 的方法

`timeline()` 方法返回一个时间轴对象，这个对象有很多方法，可以用来控制时间轴的播放、暂停、反转等，例如：

```js
let tl = gsap.timeline()

tl.to('.box', { x: 100, duration: 1 })
tl.to('.box', { x: 100, duration: 1 })

tl.play() // 播放时间轴
tl.pause() // 暂停时间轴
tl.reverse() // 反转时间轴
tl.restart() // 重新开始时间轴
tl.seek(1) // 跳转到时间轴的第 1 秒
tl.timeScale(2) // 设置时间轴的播放速度为 2 倍
```
