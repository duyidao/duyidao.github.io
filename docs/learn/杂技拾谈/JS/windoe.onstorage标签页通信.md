# windoe.onstorage标签页通信

标签页通信的常见方案有如下几点：

- BroadCast Channel
- Service Worker
- LocalStorage 通过 windoe.onstorage 监听
- Shared Worker 定时器轮询（setInterval）
- IndexedDB 定时器轮询（setInterval）
- cookie定时器轮询（setInterval）
- window.open、window.postMessage
- Websocket

这里重点放在如何使用 `windoe.onstorage()` 本地存储监听实现标签页通信。全局对象 `window` 有一个事件 `storage` ，代码如下：

```js
window.addEventListener('storage', (e) => {
    console.log(e)
})
```

该方法在其他标签页改变了本地存储的内容后触发，其形参可以获取到一个对象，其中包含了以下有用的信息：

- 变化的键名 key
- 变化后的新值 newValue
- 变化前的旧值 oldValue

封装两个函数