# 操作内嵌 <word text="Iframe" /> 与传递消息

## 方案一：postMessage 通信

适用场景：可修改 <word text="Iframe" /> 内源码，实现父页面与 <word text="Iframe" /> 之间的双向消息传递。

### 获取元素

通过 `$refs` 获取 <word text="Iframe" /> 的 <word text="DOM" /> 元素后：

- `.contentWindow`：获取 <word text="Iframe" /> 的窗口对象
- `.contentDocument`：获取 <word text="Iframe" /> 的 `document` 对象（操作节点时使用）

### 发送消息与监听消息

通过 `postMessage` 发送消息，接收两个参数：

- 参数一：要传递的消息数据
- 参数二：目标源。可传 `*` 表示任意源，也可指定具体地址如 `localhost:8080`

```js
const iframeDom = this.$refs.iframeDom
const _window = iframeDom.contentWindow
_window.postMessage(e, '*')
```

<word text="Iframe" /> 内部通过 `window` 对象监听消息：

```js
mounted() {
  window.addEventListener("message", (e) => {
    console.log(e);
  });
}
```

事件对象 `e` 包含两个关键属性：

- `data`：传递的数据
- `origin`：来源地址

### 潜在问题

页面渲染完毕后，开发服务器（如 <word text="Webpack" /> DevServer）会自动发送一条 `{ type: 'webpackOk', data: undefined }` 消息。若直接使用 `e.data` 会导致逻辑异常。

**解决方案：** 传递数据时封装为带 `type` 标识的对象，接收时通过 `type` 字段过滤：

```js
// 发送
const iframeDom = this.$refs.iframeDom;
const _window = iframeDom.contentWindow;
_window.postMessage({ type: "insertTo", text: e }, "*");

// 接收
mounted() {
  window.addEventListener("message", (e) => {
    if (e.data.type === "insertTo") {
      this.data = e.data.text;
    }
  });
}
```

### 光标位置插入

表单的 `focus`、`blur`、`input`、`change` 事件中可通过 `.selectionStart` 获取光标位置。插入步骤：

1. 获取光标位置
2. 通过 `slice` 将字符串在光标处分割
3. 拼接新内容

```js
methods: {
  blurText(e) {
    this.position = e.target.selectionStart;
  },
},
mounted() {
  window.addEventListener("message", (e) => {
    if (e.data.type === "insertTo") {
      this.data =
        this.data.slice(0, this.position) +
        e.data.text +
        this.data.slice(this.position);
    }
  });
}
```

### 保存操作

<word text="Iframe" /> 可通过 `.top` 与 `.parent` 访问外部窗口：

- `.top`：始终指向最顶层窗口
- `.parent`：指向上一级窗口

以三层嵌套为例：`window` → `iframe1` → `iframe2` → `iframe3`，对于 `iframe3`：`.top` 指向 `window`，`.parent `指向 `iframe2`。

保存流程：

```js
// Iframe 内点击保存
saveClick() {
  window.parent.postMessage({ type: "saveTo", text: this.data }, "*");
}

// 父组件监听
mounted() {
  window.addEventListener("message", (e) => {
    if (e.data.type === "saveTo") {
      // 调用接口保存
    }
  });
}
```

### 优缺点

| 维度 | 说明                                                               |
| ---- | ------------------------------------------------------------------ |
| 优点 | 代码结构清晰，易维护，支持跨域通信                                 |
| 缺点 | 需修改 <word text="Iframe" /> 内源码，不适用于第三方不可修改的页面 |

## 方案二：直接操作 DOM

适用场景：无法修改 <word text="Iframe" /> 内源码，但需在同源条件下操作其内部 <word text="DOM" />。

### 解决跨域

若页面同源可跳过此步。非同源时可设置相同的 `document.domain`：

```js
document.domain = 'localhost'
```

### 实现思路

1. 在 <word text="Iframe" /> 加载完毕后获取内部元素
2. 通过自定义属性记录光标位置
3. 操作时读取光标位置并替换内容

### 获取元素

在 `onload` 回调中获取 <word text="Iframe" /> 内部元素，通过 `setAttribute` 记录光标位置：

```js
const iframeDom = this.$refs.iframeDom

iframeDom.onload = () => {
  const _document = iframeDom.contentDocument
  const textarea = _document.querySelector('textarea')
  textarea.addEventListener('blur', (e) => {
    textarea.setAttribute('data-pos', e.target.selectionStart)
  })
}
```

### 插入内容

```js
saveTo(item) {
  const iframeDom = this.$refs.iframeDom;
  const _document = iframeDom.contentDocument;
  const textarea = _document.querySelector("textarea");
  const oldVal = textarea.value;
  const position = textarea.getAttribute("data-pos");
  const newVal = oldVal.slice(0, position) + item + oldVal.slice(position);
  textarea.value = newVal;
}
```

### 总结

| 条件         | 方案                                                    |
| ------------ | ------------------------------------------------------- |
| 可修改源码   | 使用 `postMessage` 进行跨窗口通信                       |
| 不可修改源码 | 通过 `contentDocument` 直接操作内部 <word text="DOM" /> |