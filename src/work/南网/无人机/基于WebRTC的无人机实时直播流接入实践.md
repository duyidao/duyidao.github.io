# 基于 WebRTC 的无人机实时直播流接入实践

## 背景

项目需要在浏览器端直接播放无人机摄像头的实时画面，延迟要求尽可能低。最终选型走了 <word text="WebRTC"/> 协议，流媒体服务端用的 <word text="ZLMediaKit"/>。整套链路跑下来踩了不少坑，这里把核心实现和细节整理出来。

## 整体链路

信令交互没有走 <word text="WebSocket"/>，而是用了一次简单的 <word text="HTTP" /> 请求完成 <word text="SDP"/> 交换：



## 核心实现

1. 创建 PeerConnection 并声明媒体需求

    拿到播放地址后，先关掉上一次的连接，再创建新的 <word text="RTCPeerConnection"/> 实例。这里 `iceServers` 传了空数组，因为无人机直播场景下浏览器和流媒体服务器在同一内网，不需要 <word text="STUN"/> / <word text="TURN"/> 做穿透。

    ```ts
    const pc = new RTCPeerConnection({ iceServers: [] })
    livePC = pc

    // 只接收，不发送
    pc.addTransceiver('video', { direction: 'recvonly' })
    pc.addTransceiver('audio', { direction: 'recvonly' })
    ```

    用 `addTransceiver` 而不是 `addTrack`，因为浏览器端是纯接收方，不需要往回推流。`direction: 'recvonly'` 明确告诉对端：我只要收。

2. 监听媒体轨道

    <word text="RTCPeerConnection"/> 的 `ontrack` 回调在 <word text="ICE"/> 协商完成、媒体流到达时触发。这里拿到 `streams[0]` 直接塞给 `<video>` 元素：

      ```ts
      pc.ontrack = (ev: RTCTrackEvent) => {
        if (videoRef.value && ev.streams && ev.streams[0]) {
          videoRef.value.srcObject = ev.streams[0]

          const playPromise = videoRef.value.play()
          if (playPromise !== undefined) {
            playPromise
              .then(() => { liveStatus.value = '直播中' })
              .catch((error) => {
                console.warn('[WebRTC] 自动播放失败:', error)
                liveStatus.value = '播放失败'
              })
          }
        }
      }
      ```

    `play()` 返回 <word text="Promise"/>，浏览器自动播放策略可能拦截，所以必须 `catch`。实际部署时给 `<video>` 加了 `muted` 属性来规避限制。

3. SDP 交换：`Offer → HTTP POST → Answer`

    这是整条链路里最关键的一步。等 <word text="ICE"/> 候选收集完成（或超时 1 秒兜底），把本地 <word text="SDP"/> 通过 <word text="HTTP"/> POST 发给 <word text="ZLMediaKit"/>：

    ```ts
    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .then(() => {
        // 等 ICE 收集完成，超时 1s 兜底
        return new Promise<void>((resolve) => {
          if (pc.iceGatheringState === 'complete') {
            resolve()
          } else {
            pc.onicegatheringstatechange = () => {
              if (pc.iceGatheringState === 'complete') resolve()
            }
            setTimeout(resolve, 1000)
          }
        })
      })
      .then(() => {
        return fetch(playUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/sdp',
            Accept: 'application/sdp',
          },
          body: pc.localDescription?.sdp,
        })
      })
      .then((resp) => {
        if (!resp.ok) throw new Error('HTTP ' + resp.status)
        return resp.text()
      })
      .then((sdp) => {
        const answerDesc = new RTCSessionDescription({ type: 'answer', sdp })
        return pc.setRemoteDescription(answerDesc)
      })
    ```

    几个细节：

      - <word text="ZLMediaKit"/> 的 <word text="WebRTC"/> 播放接口要求 `Content-Type` 为 `application/sdp`，不是 `application/json`。
      - <word text="ICE"/> 收集加了 1 秒超时。内网环境下候选收集通常很快，但偶尔会卡在 `gathering` 状态，不兜底的话整个链路就挂住了。
      - 返回的 `Answer` 是纯文本，直接 `resp.text()` 读取，不需要 `JSON` 解析。

4. 连接状态监听

    `iceConnectionState` 的变化用来驱动 UI 上的状态文案：

    ```ts
    pc.oniceconnectionstatechange = () => {
      if (['disconnected', 'failed', 'closed'].includes(pc.iceConnectionState)) {
        liveStatus.value = '连接断开'
      } else if (['connected', 'completed'].includes(pc.iceConnectionState)) {
        liveStatus.value = '直播中'
      }
    }
    ```

5. 资源清理

    组件卸载时必须关闭 <word text="RTCPeerConnection"/> 并清空 `srcObject`，否则连接会一直占着，浏览器控制台能看到大量 `CLOSED` 状态的残留连接：

    ```ts
    const closeWebRTC = () => {
      if (livePC) {
        livePC.close()
        livePC = null
      }
      if (videoRef.value) {
        videoRef.value.srcObject = null
      }
      liveStatus.value = '未连接'
    }

    onUnmounted(() => {
      closeOldConnect()  // 关 WebSocket
      closeWebRTC()      // 关 WebRTC
    })
    ```

## 模板侧

`<video>` 标签保留了原生 `controls`，音量、全屏这些不用自己写：

```html
<div v-if="playUrl" class="w-40% relative bg-black">
  <video
    ref="videoRef"
    class="w-full h-full object-contain"
    autoplay
    playsinline
    muted
    controls
  ></video>
  <div class="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
    {{ liveStatus }}
  </div>
</div>
```

`v-if="playUrl"` 确保只有拿到播放地址后才渲染视频容器，避免空 <word text="DOM"/> 节点。

## 踩坑记录

| 问题                                    | 原因                                                 | 处理                                                    |
| --------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------- |
| 画面出不来，控制台无报错                | `iceServers` 配了公网 <word text="STUN"/> 但内网不通 | 改为空数组                                              |
| `play()` 被浏览器拦截                   | 自动播放策略要求静音                                 | `<video>` 加 `muted`                                    |
| 切换设备后旧画面残留                    | 没有 `close()` 旧的 PeerConnection                   | 切换前先调 `closeWebRTC()`                              |
| Answer 设置报错 `InvalidStateError`     | Offer 还没 `setLocalDescription` 就发了请求          | 严格按 createOffer → setLocal → POST → setRemote 顺序走 |
| 全屏状态在 <word text="Vue" /> 里不响应 | `document.fullscreenElement` 不是响应式的            | 监听 `fullscreenchange` 事件手动同步                    |