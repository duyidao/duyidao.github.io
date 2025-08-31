---
title: 数说故事CXO畅写
titleTemplate: 数说故事项目CXO畅写
description: 数说故事 项目 CXO畅写
head:
  - - meta
    - name: description
      content: 数说故事项目CXO畅写
  - - meta
    - name: keywords
      content: 数说故事 项目 CXO畅写
pageClass: shushuo-report-cxo
tags: CXO,WPS,iframe
---

# 畅写 CXO

## 自动处理异常情况（文档冲突、版本过旧、强制下线）

在 `init` 方法中，给编辑器实例注册多个回调事件，包括错误处理等。

```js
const inst = window.CXO_API.CXEditor(config.id, {
  width: '100%',
  height: '100%',
  type: 'desktop',
  ...omit(config, 'id'),
  events: {
    onDocumentReady: () => {
      console.log('📒 ~ changxie ~ 文档加载完成')
      // ...
    },
    onError: (error: any) => {
      console.log('📒 ~ changxie ~ 错误: ', error)
      // ...
    },
    onDownloadAs: (content: any) => {
      console.log('📒 ~ changxie ~ 文档保存: ', content)
      // ...
    },
    onWarning: (warning: any) => {
      console.log('📒 ~ changxie ~ 警告: ', warning)
      // ...
    },
    onOutdatedVersion: () => {
      // ...
    },
  },
})
```

其中，如果触发错误回调函数，会判断当前的错误码和错误类型，如果 CXO 检测到当前版本过旧（如后台强制升级），立即刷新页面以加载最新版本。

```js
if (code === -100 && description.includes('下线')) {
  Modal.warning({
    title: '警告',
    content: '文档已被修改，即将刷新页面',
    centered: true,
    style: {
      top: '30px',
    },
    zIndex: 10000,
    onOk: () => {
      location.reload()
    },
  })
}
```

## 按需加载 CXO 的脚本和字体

仅在 `init()` 初始化时检查 `window.CXO_API` 是否存在，如果不存在，才动态插入 `<script>` 标签加载：

```js
if (!window.CXO_API) {
  await loadCXOApi() // 动态加载脚本
}
```

方法 `loadCXOApi()` 的实现如下：

```js
function loadCXOApi() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = '/changxieoffice/.../api.js'
    script.onload = () => resolve(true) // 加载成功
    script.onerror = (e) => reject(e) // 加载失败
    document.body.appendChild(script) // 插入 DOM
  })
}
```

> [!INFO] 特点
>
> - 使用 Promise 确保脚本加载完成后再初始化编辑器。
> - 避免重复加载（通过 window.CXO_API 判断）。

有一些字体需要提前加载，比起在 `index.html` 中直接引入，通过 `async` 或 `defer` 关键字来实现预加载，这里采用 `<iframe></iframe>` 标签来加载。

```js
function loadCXOFont() {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = '/changxieoffice/.../index.html?delay=2&concurrency=4'
  document.body.appendChild(iframe)
}
```

隐藏的 `iframe` 可以 **异步加载字体资源**，而不会阻塞主页面渲染，原因如下：

1. `iframe` 是独立的渲染上下文

   - 浏览器为每个 `iframe` 分配独立的 渲染进程 和 资源加载队列。

   - 即使主页面正在渲染，`iframe` 中的资源加载和解析不会直接影响主线程。

2. 隐藏的 `iframe` 不参与布局和绘制

   设置 `display: none` 或 `visibility: hidden` 的 `iframe` 不会触发视觉渲染（`Layout` & `Paint`）。

   但浏览器仍会 加载其内部资源（如字体、JS、CSS），只是不显示内容。

3. 字体预加载机制

   CXO 的字体加载页面（`.../index.html`）可能包含类似以下的逻辑：

   ```html
   <!-- 在隐藏的 iframe 中提前加载字体文件 -->
   <link rel="preload" href="font.woff2" as="font" crossorigin />
   ```

   字体文件会被缓存，后续主页面使用时直接命中缓存，无需重新下载。

> [!IMPORTANT] 拓展：为什么隐藏 iframe 不影响主页面渲染？
>
> 1. 无布局计算（Layout Thrashing）
>
>    隐藏的 `iframe` 不参与 DOM 布局计算，不会导致主页面回流（Reflow）或重绘（Repaint）。
>
>    而如果直接在主页面加载字体，可能触发 `@font-face` 的渲染阻塞（FOIT/FOUT）。
>
> 2. 资源加载优先级可控
>
>    浏览器对隐藏 `iframe` 的资源加载优先级较低（通常为 `Low` 或 `Idle`），不会抢占主页面的关键资源（如 `JS`、`CSS`、图片）。
>
>    主页面渲染完成后，字体加载才逐步完成。
>
> 3. 并行加载，不阻塞主线程
>
>    `iframe` 中的字体加载是 并行 的（取决于 `concurrency=4` 参数），且不会阻塞主页面的 `JS` 执行。
>
> |    方案    |      隐藏 iframe 预加载字体      |      直接主页面加载字体       |
> | :--------: | :------------------------------: | :---------------------------: |
> |  渲染影响  |         完全不阻塞主页面         | 可能阻塞文本渲染（FOIT/FOUT） |
> | 加载优先级 |         低优先级（Idle）         |     高优先级（阻塞渲染）      |
> |  并行控制  |   可限制并发（concurrency=4）    |      依赖浏览器默认策略       |
> | 缓存利用率 | 字体预加载后缓存，主页面直接使用 |       需重新加载或等待        |

## 自动化清理（避免内存泄漏）

使用 `vueuse` 库的 `tryOnBeforeUnmount` 方法，在组件销毁前清理编辑器实例：

```js
tryOnBeforeUnmount(() => {
  actions.destroy() // 清理编辑器实例
})
```

> [!INFO] 特点
>
> - 释放 CXO 编辑器占用的内存。
> - 移除事件监听，避免残留回调。

还实现了监听页面隐藏时自动保存，使用了 `vueuse` 库的 `useDocumentVisibility` 方法，触发方法后调用保存方法：

```js
const visibility = useDocumentVisibility()
watch(visibility, () => {
  if (visibility.value === 'hidden') {
    actions.save() // 页面切后台时强制保存
  }
})
```

用户切换标签页或最小化浏览器时，自动保存文档，避免数据丢失。
