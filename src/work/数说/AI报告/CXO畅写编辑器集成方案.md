# CXO 畅写编辑器集成方案

## 概述

在数说项目的文档编辑模块中，集成了 CXO（畅写）编辑器以实现富文本的在线协同与排版。由于编辑器体积庞大且依赖复杂的字体与脚本资源，直接同步加载会导致首屏渲染阻塞。本文档详细阐述 CXO 编辑器的异常处理、资源按需加载及内存自动化清理机制。

## 异常处理与状态同步

在初始化编辑器实例时，需注册全局回调事件以捕获文档冲突、版本过旧等异常状态。

```typescript
const inst = window.CXO_API.CXEditor(config.id, {
  width: '100%',
  height: '100%',
  type: 'desktop',
  events: {
    onDocumentReady: () => { /* 文档加载完成 */ },
    onError: (error: any) => {
      // 拦截版本过旧或强制下线错误
      if (error.code === -100 && error.description.includes('下线')) {
        Modal.warning({
          title: '警告',
          content: '文档版本过旧或已被修改，即将刷新页面',
          onOk: () => location.reload(),
        })
      }
    },
    onOutdatedVersion: () => location.reload(),
  },
})
```

## 资源按需加载与字体预加载

### 脚本动态注入

为避免主包体积膨胀，CXO 的核心脚本仅在 `init` 阶段进行懒加载。通过判断 `window.CXO_API` 是否存在，决定是否动态创建 <word text="HTML" /> 的 `script` 标签。

```typescript
function loadCXOApi() {
  return new <word text="Promise" />((resolve, reject) => {
    if (window.CXO_API) return resolve(true)
    const script = document.createElement('script')
    script.src = '/changxieoffice/api.js'
    script.onload = () => resolve(true)
    script.onerror = (e) => reject(e)
    document.body.appendChild(script)
  })
}
```

### 隐藏 iframe 字体预加载

CXO 依赖大量自定义字体，若在主线程同步加载，极易引发 <word text="FOIT" />（Flash of Invisible Text）或 <word text="FOUT" />（Flash of Unstyled Text）现象。本项目采用隐藏 `iframe` 的方案进行字体预加载。

```typescript
function loadCXOFont() {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = '/changxieoffice/font-preload.html?delay=2&concurrency=4'
  document.body.appendChild(iframe)
}
```

### 预加载原理剖析

|           渲染阶段            |               主页面直接加载                |                隐藏 `iframe` 预加载                 |
| :---------------------------: | :-----------------------------------------: | :-------------------------------------------------: |
| <word text="Layout" /> (布局) | 触发主页面 <word text="Reflow" />，阻塞渲染 | 独立渲染上下文，不参与主页面 <word text="Reflow" /> |
| <word text="Paint" /> (绘制)  |  字体未就绪时触发 <word text="Repaint" />   |  隐藏节点不触发 <word text="Paint" />，无视觉闪烁   |
|          资源优先级           |         高优先级，阻塞关键渲染路径          |       低优先级（Idle），并行加载不抢占主线程        |
|           缓存命中            |               需等待网络请求                |       预加载后写入浏览器缓存，主页面直接命中        |

## 生命周期与自动化清理

### 内存泄漏防范

编辑器实例包含大量的事件监听与 <word text="DOM" /> 引用，必须在组件卸载时予以销毁。借助 <word text="VueUse" /> 的 `tryOnBeforeUnmount` 钩子实现安全清理。

```typescript
import { tryOnBeforeUnmount } from '@vueuse/core'

tryOnBeforeUnmount(() => {
  actions.destroy() // 释放编辑器实例，移除事件监听
})
```

### 页面可见性监听

为防止用户切换标签页导致数据丢失，利用 `useDocumentVisibility` 监听页面可见性状态，在页面切入后台时触发强制保存。

```typescript
import { useDocumentVisibility } from '@vueuse/core'

const visibility = useDocumentVisibility()
watch(visibility, () => {
  if (visibility.value === 'hidden') {
    actions.save() // 页面切后台时强制保存
  }
})
```