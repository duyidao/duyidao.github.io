---
title: 刀刀音乐进度条
titleTemplate: 刀刀音乐进度条
description: 刀刀音乐 进度条
head:
  - - meta
    - name: description
      content: 刀刀音乐进度条
  - - meta
    - name: keywords
      content: 刀刀音乐 进度条
pageClass: project-music-progress
---

# 进度条

## 需求分析

在播放音频时，进度条会随着音频的播放时间而涨动。音频播放完毕后，切换下一首音频，进度条会重置。

但是在测试中发现，如果在音频播放完毕要切换音频的时候，浏览器页面切换到其他页面。等音频切换完毕后再把网页切回来，进度条会继续涨动，而不是重置。

## 解决方案

后续经过排查发现，音频进度条的涨动是通过 `requestAnimationFrame` 实现的，而 `requestAnimationFrame` 是在浏览器页面可见时才会执行，当浏览器页面不可见时，`requestAnimationFrame` 就不会执行。

所以加一个判断，如果当前页面不可见，则取消 `requestAnimationFrame`，改用 `setInterval` 定时器；当页面再次可见时，重新执行 `requestAnimationFrame`，取消定时器。

## 代码实现

页面可见度通过 `document.hidden` 判断，`document.hidden` 是一个布尔值，当页面不可见时，`document.hidden` 为 `true`，当页面可见时，`document.hidden` 为 `false`。

```ts
/**
 * 根据文档隐藏状态设置定时器或动画帧
 *
 * @param backgroundIntervalId 背景定时器ID
 * @param animationFrameId 动画帧ID
 * @param fn 回调函数
 */
// @ts-ignore
export const documentHidden = (
  backgroundIntervalId: number | null,
  animationFrameId: number | null,
  fn: () => void
) => {
  if (document.hidden) {
    backgroundIntervalId = setInterval(fn, 1000) as unknown as number
    animationFrameId = null // 清除之前的 animation frame
  } else {
    const track = () => {
      fn()
      animationFrameId = requestAnimationFrame(track)
    }
    animationFrameId = requestAnimationFrame(track)
    // 清除之前的 interval
    if (backgroundIntervalId) {
      clearInterval(backgroundIntervalId)
      backgroundIntervalId = null
    }
  }

  return { backgroundIntervalId, animationFrameId }
}
```
