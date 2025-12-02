---
title: 数说AI问答
titleTemplate: 数说项目AI问答
description: 数说 项目 AI问答
head:
  - - meta
    - name: description
      content: 数说项目AI问答
  - - meta
    - name: keywords
      content: 数说 项目 AI问答
pageClass: shushuo-report-ai
tags: AI,SSE,Ant Design X Vue
---

# AI 问答

## 前言

项目中涉及到 AI 问答模块，主要业务逻辑是 用户发送问题或上传 `excel` 文件，后端解析问题和文件返回答案，前端渲染答案，并允许用户复制。

下面根据功能点来罗列这个模块主要实现了哪些功能。

## SSE 请求

配置基础<word text="URL" />和认证头，通过 `fetch` 发送请求，返回一个<word text="SSE" />流，通过<word text="SSE" />流接收消息，并处理消息。

### 主要技术

主要用到的技术有：

- 原生 `fetch` 请求
- AI 界面第三方库<word text="Ant Design X Vue" />

### 主要思路

#### 初始化请求

使用<word text="Ant Design X Vue" />的 `XRequest` 方法初始化请求。

`XRequest` 方法需要两个参数：

- `baseURL`：请求的基础<word text="URL" />
- `fetch`：可选的自定义 `fetch` 函数，用于发起请求

```ts
const AIRequest = XRequest({
  baseURL: baseURL,
  fetch: async (baseURL, options) => {
    const response = await fetch(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`, // 注入认证token
        ...options.headers,
      },
    })
    return response
  },
})
```

#### 模型调度

使用<word text="Ant Design X Vue" />的 `useXAgent` 方法模型调度。

该方法可以使用预设协议做请求，也可以自定义请求协议，后者需要传入 `request` 方法配置自定义请求，支持流式更新。

```ts
const [agent] = useXAgent<XContentType>({
  request: createAIRequestFn(),
})
```

函数 `createAIRequestFn` 返回了一个函数，根据官方文档 [useXAgent 模型调度](https://antd-design-x-vue.netlify.app/component/use-x-agent.html) 的说明，可接收三个参数：

1. `info`：请求的信息
2. `callbacks`：对象，包含 `onUpdate`、`onSuccess`、`onError`、`onStream` 四个回调函数，分别用于处理请求更新、请求成功、请求失败、流式更新
3. `transformStream`：可选，用于处理流式数据

从 `info` 中解构出 `message` 用户最新的提问；从 `callbacks` 中解构出几个回调函数。

先判断当前用户是否输入了提问，如果没有提问，则直接返回，不发起请求，并提示用户。

然后用前面得到的 `AIRequest` 的 `.create` 方法发起请求，传入两个参数，参数一是用户的提问 `message` 和当前会话 `id`；参数二是一个对象，包含 `onUpdate` 等回调函数，分别处理：

- `onStream`：流式更新，调用 `onStream` 回调函数
- `onUpdate`：请求更新，调用 `parseMessage` 方法解析消息，并调用 `onUpdate` 回调函数
- `onSuccess`：请求成功，更新最后一条消息的状态
- `onError`：请求失败，调用 `handleRequestError` 方法处理错误，并调用 `onError` 回调函数

```ts
function createAIRequestFn(): RequestFn<XContentType> {
  return async (info, callbacks) => {
    const { message: question } = info // 用户最新提问
    const { onUpdate, onSuccess, onError, onStream } = callbacks
    // 验证输入
    if (!question) {
      return message.warning('请输入问题')
    }
    try {
      // 默认情况下，消息是以 { data: "{event:xxx,data:xxx}" } 的格式返回的。
      await AIRequest.create<AIRequestParams, { data: string }>(
        {
          message: question as string,
          chatId: chatId.value,
        },
        {
          onStream: (ctrl: AbortController) => onStream?.(ctrl),
          onUpdate: (data) => parseMessage(data, onUpdate),
          // 更新最后一条消息的 status
          onSuccess: () => onSuccess(lastMessage.value.message),
          onError: (error: Error) => handleRequestError(error, onError),
        }
      )
    } catch (error) {
      handleRequestError(error as Error, onError)
    }
  }
}
const [agent] = useXAgent<XContentType>({
  request: createAIRequestFn(),
})
```

下面来实现其他的函数方法：

- 失败处理函数 `handleRequestError`，根据错误类型，提示用户不同的错误信息。

  - `AbortError`：用户主动停止请求，展示【已生成的内容 + 错误原因】
  - 其他错误：过滤掉出错的消息，或者使用 `requestFallback` 覆盖消息内容。详见官方 Github 源码 [use-x-chat/use-x-chat.ts](https://github.com/wzc520pyfm/ant-design-x-vue/blob/main/src/use-x-chat/use-x-chat.ts#L254)

  ```ts
  function handleRequestError(error: Error, onError: (error: Error) => void) {
    if (error.name === 'AbortError') {
      const lastContent = lastMessage.value.message
      // 更新最后一条消息状态
      if (isObject(lastContent)) {
        lastMessage.value.status = 'error'
      }
      return
    }
    console.error('Request failed:', error)
    onError(error)
  }
  ```

- 流式数据处理函数 `parseMessage`，根据消息类型，解析消息内容，并调用 `onUpdate` 回调函数。

  如果消息类型是 `ping`，则直接返回，不处理；否则，尝试解析消息内容，如果解析失败，则直接返回消息内容，否则，调用 `onUpdate` 回调函数。

  ```ts
  function parseMessage(
    { data }: { data: string },
    onUpdate: (data: any) => void
  ) {
    try {
      if (!data || data === 'ping') return

      const parsedData = JSON.parse(data)
      onUpdate(parsedData)
    } catch (error) {
      console.error('Json parse error:', error, 'Raw data:', data)
      onUpdate(data)
    }
  }
  ```

#### 数据转换

使用<word text="Ant Design X Vue" />的 `useXChat` 数据管理方法，对消息进行转换。方法接收 4 个参数：

- `agent`：模型调度
- `requestPlaceholder`：请求占位符，用于在请求过程中显示加载状态
- `requestFallback`：请求失败时显示的默认消息内容
- `transformMessage`：消息转换函数，用于对消息进行转换，这块后面 【消息转换】 会详细说明

```ts
const { transformMessage, chatId, suggestions } = useMessageTransform()
const { messages, onRequest } = useXChat<XContentType>({
  agent: agent.value,
  requestPlaceholder: () => ({
    typing: true, // loading 占位
  }),
  requestFallback: '请求失败，请稍后重试',
  // SSE 流式消息处理
  transformMessage: (info) => {
    const { currentMessage, originMessage } = info
    return transformMessage(currentMessage, originMessage as Message)
  },
})
```

### 思考：为什么选择 fetch 而不是其他方案？

1. 对比常见请求方案

   |     方案      |             适用场景             |                                       优缺点                                        |
   | :-----------: | :------------------------------: | :---------------------------------------------------------------------------------: |
   |    `fetch`    | 标准 Web API，现代浏览器原生支持 |       ✅ 无需额外依赖，轻量级<br/>❌ 默认不支持取消（需结合 `AbortController`）       |
   |    `axios`    |  复杂请求场景（拦截器、取消等）  |               ✅ 功能全面，支持取消和拦截器<br/>❌ 增加包体积（约 4KB）               |
   |  `WebSocket`  |     双向实时通信（如聊天室）     |                   ✅ 全双工通信<br/>❌ 复杂度高，不适合单向流式场景                   |
   | `EventSource` |   简单<word text="SSE" />场景    | ✅ 原生<word text="SSE" />支持<br/>❌ 功能受限（不能自定义请求头、仅支持 `GET` 请求） |

2. 选择 `fetch` 的核心原因 -<word text="SSE" />兼容性：fetch 可以灵活处理<word text="SSE" />流式响应（`EventSource` 无法自定义 `Authorization` 头）
   - 轻量化：项目若无需 `axios` 的复杂功能，`fetch` 是零依赖方案
   - 现代浏览器支持：所有主流浏览器均已支持 `fetch API`
   - 与 `AbortController` 集成：实现请求取消功能

## 消息转换

<word text="Ant Design X Vue" />的 `useXChat` 方法支持自定义消息转换函数，用于对消息进行转换。声明一个 `useMessageTransform` 函数，用于处理消息转换。

从后端接收的消息分为以下几种情况，要分别处理：

- `init`：工作流初始化，首个消息没有 `message` ，此时只需要判断当前是否有会话 `id`
- `workflow_started`：工作流开始，此时需要设置消息标题和状态
- `node_started`：节点开始，此时需要根据节点类型设置相应的生成状态。例如判断当前的节点是 `SQL` 语句还是 `Echart` 图表内容
- `node_finished`：节点完成，此时需要根据节点类型处理输出数据。例如 `SQL` 语句直接结束，切换状态；图表则整合内容、标题等；`excel` 内容则获取表和维度行列做拼接等
- `message`：消息，如果是 `SQL` 生成阶段，将内容添加到 `query` 字段；如果是普通文字以图表分界，分成两个 `markdown` 区域展示
- `workflow_finished`：工作流完成，结束打字动画效果
- `error`：错误处理，记录错误信息并停止加载状态

```ts
function transformMessage(
  chunk: WorkflowRunningResult,
  message: Message = {}
): Message {
  const { event, data, answer } = chunk
  switch (event) {
    case 'init':
      // 首个消息没有 message
      handleInitEvent(data as WorkflowInitData)
      break
    case 'node_started':
      handleNodeStartedEvent(data as NodeStartedEventData, message)
      break
    case 'node_finished':
      handleNodeFinishedEvent(data as NodeFinishedEventData, message)
      break
    case 'message':
      if (answer) {
        handleMessageEvent(answer, message)
      }
      break
    // ... 其他事件
  }
  return message
}
```

数据结构转换格式如下：

```ts
// 输入：原始工作流数据块
{
  event: 'node_finished',
  data: { node_id: 'display_chart', outputs: { chart: 'Bar', title: '销售趋势' } }
}

// 输出：结构化消息
{
  title: '销售趋势',
  data: {
    chart: 'Bar',
    axis: { measure: '销售额', dimension: '月份' },
    datasets: [...],
    columns: [...]
  }
}
```

## 页面滚动

在用户发送问题返回答案后，当前页面若处于页面底部，则自动滚动展示最新的文字；若当前页面不处于页面底部，或者当前页面正在向上滑动，则表明用户正在阅览上面的内容，则不自动滚动。

### 主要技术

主要用到的技术有：

- 第三方库<word text="VueUse" />的 `useScroll` 方法
- 原生的 `scrollTo` 方法

### 主要思路

#### 获取滚动元素

通过 `ref` 获取<word text="AI" />问答的<word text="DOM" />元素。

```ts
const containerRef = ref<{ $el: HTMLElement }>()
const scrollEl = computed(() => containerRef.value?.$el)
```

#### 获取滚动状态

调用<word text="VueUse" />的 `useScroll` 方法。

- 把前面获取到的 `scrollEl` 作为第一个参数传入，表示要监听滚动的元素
- 第二个参数传入一个对象，属性名是 `offset` ，属性值是一个对象，包含属性 `bottom` ，值为 20，表示当滚动条距离底部 `20px` 时，视为到达底部
- 返回值是一个对象，解构出 `arrivedState` 和 `directions`，前者表示是否到达底部，后者表示滚动方向

```ts
const { arrivedState, directions } = useScroll(scrollEl, {
  offset: { bottom: 20 },
})
```

#### 监听滚动方向

监听滚动方向，如果用户向上滚动，则停止自动滚动；如果用户滚动到底部，则恢复自动滚动。

```ts
// 监听滚动方向，自动控制是否启用自动滚动
// 当用户向上滚动时停止自动滚动，当用户滚动到底部时恢复自动滚动
watchEffect(() => {
  if (directions.top) {
    shouldAutoScroll.value = false
  } else if (arrivedState.bottom) {
    shouldAutoScroll.value = true
  }
})
```

#### 封装滚动函数

封装一个持续向下滚动的函数，在每次用户发送问题返回答案后调用。这个函数会判断当前页面是否处于底部，如果是，则调用 `scrollTo` 方法，把滚动条滚动到页面底部；否则不调用。

```ts
// 滚动到底部
function scrollToBottom(smooth = false) {
  if (!scrollEl.value || !shouldAutoScroll.value) return

  scrollEl.value?.scrollTo({
    top: scrollEl.value?.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto',
  })
}
```

> [!TIP] 使用 <code>scrollTo</code> 的好处是：
>
> 1. 支持平滑滚动（`behavior: 'smooth'`）
> 2. 更兼容某些浏览器边缘情况
> 3. 与 `useScroll` 的坐标系统保持一致

## 结果复制

最后展示在页面上的结果（包括 `SQL` 语句、`Echart` 图表、`Excel` 表格等）都允许一键复制粘贴在右侧的文档中。每个模块都有自己对应的处理结果。

### 前置工作

首先创建一个 `htmlContent` 变量，类型为字符串，用于存储要复制的内容。

然后 `document.createElement` 创建一个隐藏的容器 `hiddenContainer` ，样式设置为 `position: fixed` 固定在视窗外（避免布局抖动），不透明度设置为 0。

### 前文后文

如果涉及到图表表格，就会出现前文（在表格和图表前面的文本）和后文（在表格和图表后面的文本），需要分别处理。

拿到对应的<word text="DOM" />元素，通过 `querySelectorAll` 获取全部符合条件的元素，然后判断当前需要拿的是前文还是后文。如果是前文，则获取第一个元素；如果是后文，则获取最后一个元素。

这里为了代码的健壮性，可以判断一下是否能获取到元素，如果获取不到元素，则返回空字符串。

```ts
function getMarkdownPreviewHtml(
  messageElement?: HTMLElement,
  section?: 'before' | 'after'
): string | null {
  if (!messageElement) {
    return null
  }

  try {
    // 查找MarkdownItPreview组件的DOM元素
    const markdownElements = messageElement.querySelectorAll(
      '.github-markdown-body'
    )

    // 如果有多个markdown元素，根据section参数选择
    let targetElement: Element
    if (section === 'before' && markdownElements.length > 0) {
      targetElement = markdownElements[0] // 第一个是before
    } else if (section === 'after' && markdownElements.length > 1) {
      targetElement = markdownElements[markdownElements.length - 1] // 最后一个是after
    } else if (markdownElements.length === 1) {
      targetElement = markdownElements[0] // 只有一个元素
    } else {
      return null
    }

    return targetElement.innerHTML
  } catch (error) {
    console.warn('获取MarkdownPreview HTML失败:', error)
    return null
  }
}
```

拿到文本内容后直接 `<div>${content}</div>` 添加到 `htmlContent` 中。

### Echart 图表

拿到对应的<word text="DOM" />元素，通过 `querySelectorAll` 获取全部的 `canvas` 图表元素。

遍历优先使用<word text="Echart" />的 `getInstanceByDom` 方法，获取到图表实例；如果获取不到，则使用 `parentElement` 尝试从父元素中获取。如果还是获取不到，则返回报错信息。

```ts
async function getEChartsInstance(
  messageElement?: HTMLElement
): Promise<EChartsType | null> {
  // console.log('开始获取ECharts实例，消息元素:', messageElement)

  const rootElement = messageElement ?? document.body
  const echartElements = rootElement.querySelectorAll(
    'canvas[_echarts_instance_], div[_echarts_instance_]'
  )

  // 遍历canvas元素，使用官方API获取echarts实例
  for (let i = echartElements.length - 1; i >= 0; i--) {
    const echart = echartElements[i] as HTMLDivElement

    try {
      const instance = echarts.getInstanceByDom(echart)
      if (instance) return instance

      // 如果官方API没有获取到，尝试从父元素获取
      const parent = echart.parentElement
      if (parent) {
        const parentInstance = echarts.getInstanceByDom(parent)
        if (parentInstance) return parentInstance
      }
    } catch (error) {
      console.warn('echarts.getInstanceByDom获取失败:', error)
    }
  }

  console.warn('未能获取到ECharts实例')
  return null
}
```

拿到图表实例后，使用 `getDataURL` 方法获取图表的 `DataURL` 图片数据，如果需要压缩，还能通过 `canvas` 压缩图片，再把图片数据返回回去。

拿到图片数据后放入到 `<img />` 标签内，添加到 `htmlContent` 中；如果获取图表失败了，则使用 `h3` 标题提示错误信息，添加到 `htmlContent` 中。

### Sheet 表格

遇到表格，则新建一个 `html` 变量，用于保存表格的内容。

首先提取出该 `Sheet` 表的标题，放到 `h3` 中，作为表格的标题。然后创建 `<table><thead><tr>` 标签，作为表头，遍历 `Sheet` 表的 `columns` 属性，把每一列的标题放到 `<th>` 标签中，最后闭环 `</tr></thead>` 标签。

接着处理表格体，创建 `<tbody>` 标签，每一次循环，都新建一个 `<tr>` 标签，遍历 `datasets` 属性，把每一列的数据放到 `<td>` 标签中，循环一次闭环一次 `</tr>` 标签。最后闭环 `</tbody></table>` 标签。

最后把这整个 `html` 添加到 `htmlContent` 中即可。

### SQL 语句（可选）

`SQL` 语句是可选的，如果包含 `SQL` 语句且需要复制展示，则在 `htmlContent` 变量中添加一个 `div` ，包含 `h4` 标题和 `code` 标签，`code` 标签中包含 `SQL` 语句内容。

### 内容复制

前面的内容经过转换后都保存到了 `htmlContent` 中，通过 `hiddenContainer.innerHTML` 把值赋值给隐藏容器。

复制流程主要分为以下几步：

1. 创建一个新的 `Range` 对象（表示文档中的一个连续范围），就像用鼠标在页面上拖选一段内容，Range 就是这段选中区域的抽象表示
   ```ts
   const range = document.createRange()
   ```
2. 将 `Range` 的范围设置为包裹整个 `hiddenContainer` 元素（包括其所有子节点），相当于用鼠标全选了隐藏容器内的所有内容（文本、图片、表格等）
   ```ts
   range.selectNode(hiddenContainer)
   ```
3. 获取当前文档的 Selection 对象（表示用户选择的文本范围或光标位置）

   ```ts
   const selection = window.getSelection()
   ```

   > [!WARNING] 注意
   > `selection` 可能是 `null`（极少数场景），所以后续用可选链 `?.`。

4. 清除当前所有选区（避免已有选区干扰），确保后续操作是基于干净的选区状态
   ```ts
   selection?.removeAllRanges()
   ```
5. 将之前定义的 `Range`（即全选 `hiddenContainer` 的范围）添加到当前选区，此时隐藏容器中的内容会被“虚拟选中”（虽然用户看不见）
   ```ts
   selection?.addRange(range)
   ```
6. 复制内容。优先使用现代<word text="API" />`navigator.clipboard.write` ，如果浏览器不支持，降级使用 `document.execCommand('copy')` 作为备选方案。如果两者都失败，则返回 `false` 表示复制失败

   ```ts
   const textToCopy = hiddenContainer.textContent || ''
   // 尝试使用现代API
   if (navigator.clipboard && window.ClipboardItem) {
     try {
       const htmlBlob = new Blob([htmlContent], { type: 'text/html' })
       const textBlob = new Blob([textToCopy], { type: 'text/plain' })

       await navigator.clipboard.write([
         new ClipboardItem({
           'text/html': htmlBlob,
           'text/plain': textBlob,
         }),
       ])
     } catch {
       // 降级到execCommand
       document.execCommand('copy')
     }
   } else {
     // 降级到execCommand
     document.execCommand('copy')
   }
   ```

7. 清除选区，清理用于复制的不可见<word text="DOM" />元素，避免影响用户后续手动选择
   ```ts
   selection?.removeAllRanges()
   document.body.removeChild(hiddenContainer)
   ```

> [!TIP] 代码亮点
>
> 1. 复制富文本的前提：浏览器复制操作（如 `document.execCommand('copy')`）依赖当前选区内容。需要先“选中”内容，才能触发复制。
> 2. 隐藏容器不可见但可操作：虽然 `hiddenContainer` 被固定在视窗外（`top: -9999px`），但其<word text="DOM" />仍存在于文档中，可以被脚本选中。
> 3. 兼容性：这是旧版 `execCommand` 复制方案的必备步骤（现代 `navigator.clipboard`<word text="API" />不需要此操作）。代码中实际优先使用了 `navigator.clipboard.write()` ，`execCommand` 复制方案是降级方案的备选路径。
> 4. 清理选区：复制完成后会调用 `selection?.removeAllRanges()` 避免影响用户后续手动选择。
