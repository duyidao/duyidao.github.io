---
title: 刀刀音乐播放
titleTemplate: 刀刀音乐播放
description: 刀刀音乐 播放
head:
  - - meta
    - name: description
      content: 刀刀音乐播放
  - - meta
    - name: keywords
      content: 刀刀音乐 播放
pageClass: project-music-play
---

# 播放

## 需求介绍

在播放音乐时，出现了一个 BUG ：用户快速点击下一首按钮切换要播放的音频，会出现多个音频播放的问题。

经过排查，发现是上一首音频还没加载完毕，切换后卸载音频上下文也没用，下一首音频已经开始加载，导致最后多个音频同时播放。

## 解决方案

通过单一状态管理的设计模式，搭配竞态取消的思想，解决上述问题。

## 功能实现

### 单一状态管理

声明一个变量 `activeTask` ，用于存储当前播放的音频上下文。因为全局一次只能播放一首音频，因此它是全局唯一，有值说明有音频在播放，切换值则是切换音频。

```ts [task.ts]
let activeTask: any = null
export function changeActiveTask(e: any) {
  activeTask = e
}
```

### 竞态取消

竞态取消的核心思想是，一个函数返回一个对象，对象中包含两个方法 `cancel` 和 `run` ，其中 `run` 方法接收一个回调函数，返回 `new Promise` ，在 `run` 方法中执行回调函数，在回调函数执行完毕把 `Promise` 状态改为 `resolve` ，外部通过 `.then` 就能继续执行后续的方法。

而 `cancel` 方法则是把 `new Promise` 方法的 `resolve` 改为空函数，这样 `new Promise` 状态永远都是 `padding` ，不会变更，那后续也不会执行 `.then` 里面的函数方法。上一个方法执行完毕后也不会再有后续了。

代码实现如下：

::: code-group

```ts [task.ts]
/**
 * 创建一个可取消的任务
 *
 * @param fn 任务函数，返回一个Promise
 * @returns 一个包含取消和执行任务方法的对象
 */
export const createCancelableTask = (fn: any) => {
  const NOOP = () => {}
  let cancel = NOOP

  return {
    cancel: () => cancel(),
    run: (...args: unknown[]) => {
      return new Promise((resolve, reject) => {
        cancel()
        cancel = () => (resolve = reject = NOOP)

        fn(...args)
          .then((res: any) => resolve(res))
          .catch((err: any) => reject(err))
      })
    },
  }
}
```

```ts [contorl.ts]
let cancelFn = () => {}

// 加载并播放当前歌曲
export async function loadAndPlay() {
  const { run, cancel } = createCancelableTask(() =>
    loadAudio(musicList.value[playIndex.value])
  )
  cancelFn = cancel
  run().then((res) => {
    console.log('res--------------playAudio', res)
    if (res) playAudio()
  })
}
```

:::

后续点击下一首等切换歌曲的按钮，只需要调用 `cancel` 方法即可。如果之前没点过，则 `cancel` 方法是空函数，不会影响后续的代码执行；如果之前点过了，则 `cancel` 方法会取消掉之前加载音频的 `Promise` 状态改变，他就无法继续执行了。

同时还能搭配防抖的思想，防止用户频繁点击切换歌曲，提高一定的用户体验。

```ts [contorl.ts]
const debounceLoadAndPlay = debounce(loadAndPlay, 500)

// 播放顺序处理
export const nextSong = {
  SEQUENCE: () => {
    playIndex.value = (playIndex.value + 1) % musicList.value.length
    debounceLoadAndPlay()
  },
  RANDOM: () => {
    playIndex.value = getRandomIndex(musicList.value.length, playIndex.value)
    debounceLoadAndPlay()
  },
  SINGLE: () => {
    debounceLoadAndPlay()
  },
}
```
