# $nextTick

## 执行原理

<word text="Vue" />更新<word text="DOM" />是异步的。侦听到数据变化后，<word text="Vue" />将开启一个任务队列，缓冲同一事件循环中的所有数据变更。同一个 watcher 被多次触发，只会推入队列一次（去重可避免不必要的计算和<word text="DOM" />操作）。

在下一个事件循环 `tick` 中，<word text="Vue" />刷新队列并执行已去重的任务。

`$nextTick` 内部采用宏任务和微任务结合的异步队列技术，保证回调在<word text="DOM" />更新之后执行。执行时间依赖浏览器刷新机制，在下一个浏览器刷新周期之前执行，而非立即执行。

## 宏任务还是微任务

核心代码—— `nextTick` 函数：

```js
export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== "undefined") {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
```

关键分支：

```js
if (!pending) {
  pending = true
  if (useMacroTask) {
    macroTimerFunc()
  } else {
    microTimerFunc()
  }
}
```

`nextTick` 既可以是宏任务，也可以是微任务。

微任务的定义：

```js
// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc
}
```

<word text="Vue" />环境支持<word text="Promise" />时使用<word text="Promise" />，否则 `microTimerFunc` 回退为宏任务 `macroTimerFunc`。

`macroTimerFunc` 的定义：

```js
// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (
  typeof MessageChannel !== 'undefined' &&
  (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]')
) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  /* istanbul ignore next */
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

优先级：`setImmediate`（仅 IE10+） > `MessageChannel` > `setTimeout`。三者均为宏任务。

<word text="HTML5" />规定 `setTimeout` 最小延迟 4ms，即理想环境下异步回调最快也要 4ms 才能触发。<word text="Vue" />使用多种函数模拟异步任务，目的是让回调异步且尽早调用。[MessageChannel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel) 和 [setImmediate](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate) 的延迟明显小于 [setTimeout](https://github.com/PDKSophia/blog.io/blob/master/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%AF%87%20-%20setTimeout%E4%B8%8EsetInterval.md)。

### 宏任务与微任务的选择策略

<word text="Vue 2.4" />之前默认使用微任务，但微任务优先级过高，某些情况下可能比事件冒泡更快。全部使用宏任务又可能出现渲染性能问题。因此新版默认使用微任务，特殊场景（如 `v-on`）使用宏任务。

`v-on` 场景下的源码调试：

![v-on源码调试截图](https://pic1.imgdb.cn/item/689ec95658cb8da5c826c4aa.png)

Chrome 下使用 `MessageChannel` 实现宏任务：

![MessageChannel实现](https://pic1.imgdb.cn/item/689ec96c58cb8da5c826c670.png)

宏任务和微任务执行顺序：

```js
for (macroTask of macroTaskQueue) {
  // 1. Handle current MACRO-TASK
  handleMacroTask()

  // 2. Handle all MICRO-TASK
  for (microTask of microTaskQueue) {
    handleMicroTask(microTask)
  }
}
```
