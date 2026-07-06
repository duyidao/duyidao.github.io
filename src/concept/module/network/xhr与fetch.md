# 浏览器通信能力

## 用户代理

浏览器可以代替用户完成 `http` 请求，代替用户解析响应结果，并呈现给用户。因此被称为 【用户代理 user agent】。

在网络层面，对于前端开发者，必须要知道浏览器拥有的两大核心能力：

- 自动发出请求的能力
- 自动解析响应的能力

### 自动发出请求的能力

当一些事情发生的时候，浏览器会代替用户自动发出 `http` 请求，常见的包括：

1. 用户在地址栏输入了一个 `url` 地址，并按下了回车

   浏览器会自动解析 URL,并发出一个 `GET` 请求,同时抛弃当前页面。

2. 当用户点击了页面中的 `a` 元素

   浏览器会拿到 `a` 元素的 `href` 地址，并发出一个 `GET` 请求，同时抛弃当前页面。

3. 当用户点击了提交按钮 `<button type="submit">...</button>`，浏览器会获取按钮所在的 `<form>` 元素，拿到它的 `action` 属性地址，同时拿到它 `method` 属性值，然后把表单中的数据组织到请求体中，发出指定方法的请求，同时抛弃当前页面。

   ```html
   <form action="https://study.duyiedu.com/api/user/login" method="post">
     <p>
       账号：
       <input type="text" name="loginId" value="" />
     </p>
     <p>
       密码：
       <input type="text" name="loginIPwd" value="" />
     </p>
     <button type="submit">提交</button>
   </form>
   ```

   现在站点很少用这种方式了，都采取 JS 的 `axios` 来实现，有些开发者会把 `form` 标签改为 `div` ，但是如果用户希望不仅点击按钮能够发请求，还希望在输入框输入后按回车键、Fn+回车键、Ctrl+回车键等操作都能实现登录，这是 `form` 元素天生自带的能力，如果改为 `div` 则需要开发者额外做很多操作。

   因此为了语义化，也为了方便开发者，`form` 标签依然保留，但是会 `e.preventDefault()` 禁用它的默认事件。

   ```js
   const form = document.querySelector('form')
   form.addEventListener('submit', (e) => {
     e.preventDefault()
     // 发请求
   })
   ```

4. 当解析 HTML 时遇到了 `<link>`、 `<img>`、 `<script>`、 `<video>`、 `<audio>` 等元素

   浏览器会拿到对应的地址，发出 `GET` 请求

5. 当用户点击了刷新

   浏览器会拿到当前页面的地址，以及当前页面的 一次请求，同时抛弃当前页面。

> [!TIP] 拓展
> 开发者为了方便开发和维护，书写的省略地址不完全等同于发请求的地址，书写的地址会经过转换，变为完整的地址。浏览器发请求必须要拿到完整的 `URL` 地址。
>
> ```html
> <a href="./index.html">...</a>
> ```
>
> 浏览器会自动把 `./index.html` 转换为 `http://localhost:8080/index.html`
>
> 书写的地址分为绝对路径和相对路径两种，二者的区别为：
>
> - 绝对路径：在转换成完整的 `url` 地址过程中，和当前路径的 `path` 部分没有任何关系。在书写绝对路径时，可以省略协议名，浏览器会自动补充当前的协议名；甚至可以把域名和端口部分省略，直接从路径开始写，浏览器会自动补充当前的域名和端口。
>
>   ```html
>   <!-- 当前地址：https://www.baidu.com/b/f/1.html -->
>   <a href="//www.sina.com/a.html">...</a>
>   <!-- 最终转换url地址：https://www.sina.com/a.html -->
>   <a href="/a.html">...</a>
>   <!-- 最终转换url地址：https://www.baidu.com/a.html -->
>   ```
>
> - 相对路径：书写 `url` 地址过程中，相对当前页面的 `path` 部分有关系。`./` 表示当前文件夹下，`../` 表示上一级文件夹下。
>
>   ```html
>   <!-- 当前地址：https://www.baidu.com/b/f/1.html -->
>   <a href="./a.html">...</a>
>   <!-- 最终转换url地址：https://www.baidu.com/b/f/a.html -->
>   <a href="../a.html">...</a>
>   <!-- 最终转换url地址：https://www.baidu.com/b/a.html -->
>   ```
>
> 开发过程中选择哪种路径方式要根据当前需求来决定，如果所请求的资源和当前页面的变化而变化，则使用相对路径；如果所请求的资源是固定的，则使用绝对路径。

重点来了，从古至今，服务器和浏览器都有一个约定：

**当发送 GET 请求时，不会附带请求体**

这个约定深刻的影响着后续的前后端各种应用，现在，几乎所有人都在潜意识中认同了这一点，无论是前端开发人员还是后端开发人员。

由于前后端程序的默认行为，逐步造成了 `GET` 和 `POST` 的各种差异：

1. 浏览器在发送 `GET` 请求时，不会附带请求体

   ::: code-group

   ```js [GET.js]
   GET /api/user/login?loginId=admin&loginPwd=123456 HTTP/1.1
   Host: study.duyiedu.com
   Content-Type: application/json
   ```

   ```js [POST.js]
   POST /api/user/login HTTP/1.1
   Host: study.duyiedu.com
   Content-Type: application/json

   {
      "loginId":"admin",
      "loginPwd":"123456"
   }
   ```

   :::

2. `GET` 请求的传递信息量有限，适合传递少量数据；`POST` 请求的传递信息量是没有限制的，适合传输大量数据
3. `GET` 请求只能传递 `ASCI` 数据，遇到非 `ASCII` 数据需要进行编码；`POST` 请求没有限制
4. 大部分 `GET` 请求传递的数据都附带在 `path` 参数中，能够通过分享地址完整的重现页面，但同时也暴露了数据，若有敏感数据传递，不应该使用 `GET` 请求，至少不应该放到 `path` 中
5. `POST` 不会被保存到浏览器的历史记录中
6. 刷新页面时，若当前的页面是通过 `POST` 请求得到的，则浏览器会提示用户是否重新提交。若是 `GET` 请求得到的页面则没有提示

### 自动解析响应的能力

浏览器不仅能发送请求，还能够针对服务器的各种响应结果做出不同的自动处理。常见的处理有:

1. 识别响应码

浏览器能够自动识别响应码，当出现一些特殊的响应码时浏览器会自动完成处理，比如 301、302 根据响应结果做不同的处理

2. 根据响应结果做不同的处理

   浏览器能够自动分析响应头中的 `Content-Type`，根据不同的值进行不同处理，比如：

- `text/plain`：普通的纯文本,浏览器通常会将响应体原封不动的显示到页面上
- `text/html`：`html` 文档,浏览器通常会将响应体作为页面进行渲染
- `text/javascript` 或 `application/javascript`：`js` 代码，浏览器通常会使用 JS 执行引擎将它解析执行
- `text/css`：`css` 代码，浏览器会将它视为样式
- `image/jpeg`：浏览器会将它视为 `jpg` 图片
- `application/octet-stream`：二进制数据，会触发浏览器下载功能
- `attachment`：附件，会触发下载功能该值和其他值不同，应放到 `Content-Disposit`

### 基本流程

浏览器补全 `url` 地址，对地址的非 `ASCII` 字符会自动完成 `url` 编码，然后发送请求。服务器接收到请求后，根据 `Content-Type` 响应内容。

浏览器丢弃旧页面，开始解析 HTML 文档，发现 `link` 元素，请求 `link` 元素中的 `href` 地址，服务器返回 `css` 代码。

浏览器解析并应用 CSS 样式，继续解析 HTML 文档，发现 `img` 元素，请求 `img` 元素中的 `src` 地址，继续解析 HTML 文档。服务器返回图片内容，浏览器将图片应用到布局，继续解析 HTML 文档，再发现 `script` 元素，发请求。服务器返回 `js` 代码，浏览器执行 `js` 代码，继续解析 HTML 文档直到解析完成。

## AJAX

> 浏览器本身就具备网络通信的能力，但在早期，浏览器并没有把这个能力开放给 JS。
>
> 最早是微款在 IE 浏览器中把这一能力向 JS 开放，让 JS 可以在代码中实现发送请求，并不会刷新页面，这项技术在 2005 年被正式命名为 AJAX (Asynchronous Javascript And XML)

AJAX 就是指在 web 应用程序中异步向服务器发送请求。它的实现方式有两种，XMLHttpRequest 简称 XHR 和 Fetch。以下是两者的对比：

| 功能点                    | XHR      | Fetch    |
| ------------------------- | -------- | -------- |
| 基本的请求能力            | ✅       | ✅       |
| 基本的获取响应能力        | ✅       | ✅       |
| 监控请求进度              | ✅       | ❌       |
| 监控响应进度              | ✅       | ✅       |
| Service Worker 中是否可用 | ✅       | ✅       |
| 控制 cookie 的携带        | ✅       | ✅       |
| 控制重定向                | ❌       | ✅       |
| 请求取消                  | ❌       | ✅       |
| 自定义 referrer           | ❌       | ✅       |
| 流                        | ✅       | ✅       |
| API 风格                  | Event    | Promise  |
| 活跃度                    | 停止更新 | 不断更新 |

而 `axios` 是 `xhr` 的库，`xhr` 能做的 `axios` 就能做；`xhr` 不能做的 `axios` 也不能做。

`XHR` 可以通过封装把 `API` 风格封装为 `Fetch` ：

```js
function delay(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
```

## 实战

### 请求并获取响应数据

通过 `fetch` 调用接口获取数据：

```js
async function loadHeroes() {
  const resp = await fetch('https://study.duyiedu.com/api/herolist')
  console.log(resp.body) // 此时无法拿到响应体
  const data = await resp.json()
  console.log(data) // 此时可以拿到响应体
}

loadHeroes()
```

请求在能拿到响应头后就表示响应成功，因此一开始如果直接打印 `resp.body` 无法拿到响应体，需要调用 `text()` 方法或者 `json()` 方法或者 `blob()` 方法或者 `arrayBuffer()` 方法来获取响应体。这些方法只有转换完成后的数据格式的差异。

这么设计的好处是如果响应体数据有几个 G，那么需要很久才能等待响应完毕，在急切需要知道响应结果是否成功做后续操作的情况下，这么设计是合理的。

### 上传文件

上传文件中保存到 `formData` 内实际操作是设置请求头和请求体，`formData` 内部封装了请求头和请求体。

```js
POST /upload/single HTTP/1.1
Host: myserver.com:9527
Content-Type: multipart/form-data; boundary=aaa

--aaa
Content-Disposition: form-data; name="avatar"; filename="1.jpg"
Content-Type: image/jpeg
--aaa---
```

### ChatGPT

下面是一个通过调用 ChatGPT API 发送消息并接收响应的示例代码：

```js
const textArea = document.querySelector('textarea')
const submit = document.querySelector('button')

submit.addEventListener('click', async () => {
  const content = textArea.value
  createUserContent('D')
  const robot = createRobotContent()
  const res = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
    }),
  })
  const body = await res.text()
  robot.append(body)
  robot.over()
})
```

但是这么写需要等待响应内容全部返回，然后一次性渲染上去。需要改为流式读取响应内容，并实时渲染。响应体就是一个流，调用 `getReader()` 方法调用读取器，然后通过 `read()` 方法读取流中的数据。该方法也是异步方法，需要等待。

```js
const textArea = document.querySelector('textarea')
const submit = document.querySelector('button')

submit.addEventListener('click', async () => {
  const content = textArea.value
  createUserContent('D')
  const robot = createRobotContent()
  const res = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
    }),
  })
  const body = await res.text()
  robot.append(body) // [!code --]
  robot.over() // [!code --]
  const reader = res.body.getReader() // [!code ++]
  const decoder = new TextDecoder() // [!code ++]
  while (1) {
    // [!code ++]
    const { done, value } = await reader.read() // [!code ++]
    if (done) break // [!code ++]
    const txt = decoder.decode(value) // [!code ++]
    robot.append(txt) // [!code ++]
  } // [!code ++]
  robot.over() // [!code ++]
})
```
