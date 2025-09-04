---
title: 刀刀音乐队列
titleTemplate: 刀刀音乐队列
description: 刀刀音乐 队列
head:
  - - meta
    - name: description
      content: 刀刀音乐队列
  - - meta
    - name: keywords
      content: 刀刀音乐 队列
pageClass: project-music-task
---

# 队列

## 需求介绍

项目是通过 `fetch` 获取存放在 `assets/music/*.mp3` 音频文件，然后创建 `AudioContext` 音频上下文，把前面获取到的音频文件通过 `decodeAudioData` 解码，处理后实现播放。

一开始是用户点击播放按钮后，再去调接口获取音频资源，用户需要等待接口返回后才能播放，体验不好。且没有做缓存，每次听完后再听还需要重新调接口获取资源。

## 解决方案

需要实现一个任务队列，一进入项目，就调接口获取音频资源，并缓存起来。如果用户点击歌曲列表后面的歌曲，则把该歌曲的任务优先级提上来，一起获取资源。

## 效果实现

### 获取全部音频

音频文件统一放在 `assets/music` 目录下，通过 `import.meta.glob` 就能获取所有音频文件。再获取其他的资源，如歌词、封面图等，也是同样的方式。通过歌曲的名称做对应关系。

```ts [data.ts]
import { taskMap } from './task'

// 初始化音乐数据
export const loadMusicData = async () => {
  try {
    const [mp3Modules, jsModules, imgModules] = await Promise.all([
      import.meta.glob('@/assets/music/*.mp3', { as: 'url', eager: true }),
      import.meta.glob('@/assets/music/*.js', { eager: true }),
      import.meta.glob('@/assets/images/music/*.webp', { eager: true }),
    ])
    musicList.value = Object.entries(mp3Modules).map(([mp3Path, mp3Url]) => {
      const baseName = mp3Path.replace(/^.*music\//, '').replace(/\.mp3$/, '')

      let obj: MusicItem = {
        id: baseName,
        title: formatTitle(baseName),
        audioUrl: mp3Url as string,
        lyric:
          (jsModules[`/src/assets/music/${baseName}.js`] as { default: string })
            ?.default || '',
        logo:
          (
            imgModules[`/src/assets/images/music/${baseName}.webp`] as {
              default: string
            }
          )?.default || '',
        type: whileList.includes(baseName) ? 1 : 0,
      }
      return obj
    })
    initMusicTasks()
  } catch (err) {
    console.error('加载音乐数据失败:', err)
  }
}
```

拿到全部的音频文件后，初始化任务队列。

```ts [data.ts]
import { taskMap } from './task' // [!code --]
import { taskMap, pendingQueue } from './task' // [!code ++]
/**
 * 初始化音乐任务
 *
 * 遍历音乐列表，并为每个音乐创建一个任务。如果任务映射（taskMap）中不存在该音乐的任务，则创建一个新任务，并将其添加到待处理队列（pendingQueue）中。
 * 最后，调用processQueue函数处理待处理队列中的任务。
 */
function initMusicTasks() {
  musicList.value.forEach((music) => {
    if (!taskMap.has(music.id)) {
      taskMap.set(music.id, {
        id: music.id,
        status: 'waiting',
        data: null,
      })
      pendingQueue.push(music.id)
    }
    processQueue()
  })
}
```

此时每一条音频的数据的状态都是 `waiting` 待处理状态。

### 处理任务队列

任务队列的每一项任务是一个对象，其基本信息如下所示：

```ts [task.ts]
interface Task {
  id: string
  status: 'waiting' | 'pending' | 'success' | 'error'
  data?: AudioBuffer | null
  error?: Error
}
```

- `id`：歌曲的 `id`，唯一标识。
- `status`：任务状态，有 `waiting`、`pending`、`success`、`error` 四种状态。
- `data`：解码后的音频数据，解码成功后会有值。
- `error`：解码失败后的错误信息。

声明一个常量 `MAX_CONCURRENT` ，表示任务队列一次可以并发处理的任务数量。声明一个 `Map` 类型的变量 `taskMap`，用于存储音频队列。声明一个 `Array` 类型的变量 `pendingQueue`，用于存储待处理的任务。声明一个变量 `activeCount` ，表示当前有几个音频正在处理。

开始处理任务队列：

- 如果 `activeCount` 大于等于 `MAX_CONCURRENT` ，说明当前可并发处理的任务数量已经达到上限，直接返回，不再继续往下执行。
- 如果`pendingQueue` 队列的长度为 0，说明任务队列均处理完毕，直接返回。

从 `pendingQueue` 队列中取出第一个任务，并从队列中删除，当前处理的任务数量 `activeCount` 自增 1，调用 `getMusic` 函数获取音频数据。

```ts [task.ts]
/**
 * 处理队列中的任务
 */
export function processQueue() {
  if (activeCount >= MAX_CONCURRENT || pendingQueue.length === 0) return

  const taskId = pendingQueue.shift()!

  activeCount++

  getMusic(taskId) // 开始获取音乐数据
}
```

### 获取音频数据

获取音频数据时，需要判断任务队列中该任务的状态。

- 如果任务状态是 `waiting`，则说明该任务还没有开始处理，需要调用 `fetch` 函数获取音频数据。
- 如果任务状态是 `pending`，则说明该任务正在处理中，直接返回。
- 如果任务状态是 `success`，则说明该任务已经处理完成，直接返回。
- 如果任务状态是 `error`，则说明该任务处理失败，直接返回（这里可以根据自己的需要做失败重连处理）。

最后的结果无论是成功还是失败，都再去调用 `processQueue` 函数处理下一个任务。

::: code-group

```ts [api.ts]
/**
 * 根据音乐ID获取音乐数据
 *
 * @param musicId 音乐ID
 * @returns 返回一个Promise，解析为解码后的音频数据
 * @throws 如果未找到指定ID的音乐，则抛出错误
 */
export const fetchMusicData = (musicId: string) => {
  const music = musicList.value.find((m) => m.id === musicId)
  if (!music) throw new Error('Music not found')

  return new Promise((resolve) => {
    fetch(music.audioUrl).then((response) => {
      response.arrayBuffer().then((arrayBuffer) => {
        return resolve(audioState.value!.context!.decodeAudioData(arrayBuffer))
      })
    })
  })
}
```

```ts [task.ts]
import { fetchMusicData } from '../apis/api'

const getMusic = (taskId: string) => {
  const task = taskMap.get(taskId)!
  task.status = 'pending'
  fetchMusicData(taskId)
    .then((response) => {
      task.status = 'success'
      // ts-ignore
      task.data = response as AudioBuffer
      if (activeTask && activeTask.id && activeTask.id === taskId) {
        loadAndPlay()
      }
    })
    .catch((err) => {
      task.status = 'error'
      task.error = err as Error
    })
    .finally(() => {
      taskMap.set(taskId, task)
      activeCount--
      processQueue() // 继续处理下一个任务
    })
}
```

:::

最后，当音频数据获取成功后，判断是不是当前要播放的歌曲，如果是则调用 `loadAndPlay` 函数加载并播放音频。
