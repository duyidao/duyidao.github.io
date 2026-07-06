---
title: GSAP 动画参数
author:
  - MiuMiu8802 使用GSAP轻松给页面添加动画效果｜GSAP3入门｜官方英文教程阅读｜GreenSock&https://www.bilibili.com/video/BV1724y1R76e
---

# GSAP 动画参数

上一章节简单介绍了 GSAP 的基本使用，这一章节稍微详细介绍一下 GSAP 的动画参数。

## Repeats 与 alternating repeats

`repeat` 就是用来重复播放动画，动画播放完毕后会从头开始播放，一般配合 `yoyo` 一起使用，可以实现无缝衔接动画播放。

如果想要一直无限循环，给 `repeat` 设置为 -1 即可。

## Delays

`delay` 是运行之前的延迟时间，单位是秒。如果想要控制循环执行时的延迟，可以使用 `repeatDelay`。

`repeatDelay` 控制的是每次动画循环开始前的延迟时间，执行的时机是在 `repeat` 和 `delay` 之间。

## Easing

`ease` 是用来控制动画的缓动效果的，GSAP 提供了非常多的缓动效果，可以参考 [GSAP Easing](https://greensock.com/docs/v3/Easing)。

例如，设置了 `linear` 缓动效果，动画会以匀速播放；设置了 `bounce` 缓动效果，动画会以弹跳的形式播放。

`ease` 的本质就是一些数学公式的计算，包含 `in` 、`out`、`inOut` 三种形式，分别表示动画开始、结束、中间的缓动效果。

如果实在是不知道使用哪种哪种缓动效果，可以使用 `power1.out` ，这个缓动效果是 GSAP 默认的缓动效果。

更多效果可查看 [GSAP Easing](https://gsap.com/resources/getting-started/Easing)。

## Staggers

`stagger` 是用于控制动画的延迟播放，可以理解为动画的延迟播放时间。如果有多个目标，希望它们按顺序依次播放，可以使用 `stagger`。

```html
<body>
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
  <div class="box4"></div>
  <div class="box5"></div>
</body>

<script>
  gsap.to(['.box1', '.box2', '.box3', '.box4', '.box5'], {
    x: 100,
    stagger: 0.2,
  })
</script>
```

现在，`.box1` 会先播放，然后间隔了 0.2s 后是 `.box2`，以此类推。

## Sequencing animations

如果想让一个 `animation` 分步骤执行，如第一步向右移动，第二步向左上移动，第三步向左移动，也就说明它是有一定延迟在内，开发想要控制的就是它的顺序和时间。

第一种做法是用 `delay`，让后面的动画延迟执行。

```js
gsap.to('.box', {
  x: 100,
  duration: 1,
})

gsap.to('.box', {
  y: 200,
  duration: 1,
  delay: 1,
})
```

但是缺点也很明显，首先是如果有多个动画，就要写多个方法；其次如果第一个动画的 `duration` 修改了，后面所有的 `delay` 也要跟着改。

第二种做法是使用 `gsap.timeline`，它是一个时间轴，可以控制动画的顺序和时间。

```js
gsap
  .timeline()
  .to('.box', { x: 100, duration: 1 })
  .to('.box', { y: 200, duration: 1 }, '+=1')
```

`gsap.timeline` 的使用方法很简单，就是将多个动画方法依次传入，它会按照顺序依次执行。
