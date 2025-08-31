---
title: 前端下载后端传输的文件
author:
  - 三十的前端课 前端如何下载后端传输的文件？全方位指南&https://www.bilibili.com/video/BV1Ua4y1M7Xj/
---

# 前端下载后端传输的文件

前端下载后端传输等文件方案分为以下几种：

1. 直接打开下载地址

   无法命名，只适用于 `get` 直接返回 `blob` 的接口。如果下载接口需要携带 `token` 则无法实现。

2. 利用 `a` 标签的 `download` 属性

   比较合适的方案

3. 第三方库 `file-saver`

## 直接打开

通过 `window.open()` 直接打开下载。

```js
downloadFn() {
  window.open('http://xxx')
}
```

缺点：

1. 无法更改名称
2. 没有走接口，而是通过浏览器下载，无法做 `token` 权限校验

## a 标签下载

### 前置知识

#### createObjectURL

`createObjectURL` 是一个用于创建指定对象的 `URL` 的方法。它可以将 `Blob、File` 或 `MediaSource` 对象转换为一个可供使用的 `URL`。

```js
const fileInput = document.getElementById("fileInput");
const imageElement = document.getElementById("imageElement");

fileInput.addEventListener("change", (event) => {
  const selectedFile = event.target.files[0];

  // 创建 URL
  const fileURL = URL.createObjectURL(selectedFile);

  // 将 URL 赋值给图片元素的 src 属性
  imageElement.src = fileURL;
});
```

> [!WARNING] 注意
>
> `createObjectURL` 创建的 `URL` 是临时的，在浏览器会话结束或使用 `revokeObjectURL` 方法释放之前，这个 `URL` 是有效的。为了避免资源浪费，建议在使用完 `URL` 后调用 `revokeObjectURL` 方法来释放与之相关的内存资源。例如：
>
> ```js
> URL.revokeObjectURL(fileURL);
> ```
>
> 这样可以确保及时释放资源，避免内存泄漏。

总而言之，`createObjectURL` 是一个方便的方法，可以将 `Blob`、`File` 或 `MediaSource` 对象转换为可供使用的 `URL`。它在一些场景中非常有用，例如预览图像、播放音频/视频等。

#### msSaveBlob

`msSaveBlob` 是用于将 `Blob` 对象保存为文件的<word text="Microsoft" />特定方法。它可用于<word text="Internet Explorer" />和<word text="Microsoft Edge" />浏览器中，并提供文件保存功能。

以下是使用 `msSaveBlob` 方法保存 `Blob` 对象的示例：

```js
const blob = new Blob(["Hello, World!"], { type: "text/plain" });

if (typeof navigator.msSaveBlob === "function") {
  navigator.msSaveBlob(blob, "example.txt");
} else {
  console.log("This browser does not support msSaveBlob.");
}
```

在这个例子中，我们首先创建了一个包含文本数据的 `Blob` 对象。然后，我们通过检查 `navigator.msSaveBlob` 函数是否存在来确保当前浏览器是支持这个方法的。

如果当前浏览器支持 `msSaveBlob`，我们可以使用它来保存 `Blob`。`msSaveBlob` 方法接受两个参数：要保存的 `Blob` 对象和保存的文件名。在这个示例中，我们将 `Blob` 对象保存为名为 “example.txt” 的文本文件。

如果浏览器不支持 `msSaveBlob` 方法，我们只是向控制台输出一条提示信息。

> [!WARNING] 注意
>
> `msSaveBlob` 是微软特定的方法，仅适用于<word text="Internet Explorer" />和<word text="Microsoft Edge" />浏览器。对于其他现代浏览器，通常可以使用更通用的方法，如使用 <word text="FileSaver.js" /> 库或通过创建链接来触发文件下载。

综上所述，通过 `msSaveBlob` 方法可以在<word text="Internet Explorer" />和<word text="Microsoft Edge" />浏览器中将 `Blob` 对象保存为文件。但要注意它的局限性和该方法在其他浏览器中的不兼容性。

#### download

`download` 是一个 `HTML5` 属性，用于指定一个链接（通常是 `<a>` 元素）的目标资源应该被下载而不是在浏览器中打开。

使用 `download` 属性，可以将链接的目标资源（如文件）提供给用户下载，而不会自动打开或在浏览器中显示。当用户点击链接时，浏览器将提供下载选项，用户可以选择保存文件到本地。

以下是一个使用 `download` 属性的示例：

```html
<a href="path/to/file.pdf" download>Download PDF</a>
```

在这个例子中，我们创建了一个指向 “`path/to/file.pdf`” 的链接，并将 `download` 属性添加到 `<a>` 元素中。这表示资源应该被下载而不是打开。

当用户点击该链接时，浏览器将弹出一个文件保存对话框，用户可以选择保存文件到本地。

你还可以通过将 `download` 属性值设置为指定的文件名，来指定下载文件的名称，而不是使用默认的文件名。例如：

```html
<a href="path/to/file.pdf" download="myFile.pdf">Download PDF</a>
```

在这个示例中，用户保存的文件将命名为 “`myFile.pdf`”。

> [!WARNING] 注意
>
> 1. `download` 属性对于所有浏览器并非都有完全的支持。但绝大多数现代浏览器都支持这个属性。
> 2. 目标资源必须是同源的（即位于相同域名和协议下），否则 `download` 属性可能无效。

综上所述，`download` 属性是用于在<word text="HTML" />中提供文件下载的简单且常用的方式。它可以使用户方便地下载特定资源，并提供自定义的文件名选项。

### 流程梳理

首先按 `blob` 格式请求接口接收二进制文件，然后判断是否有 `msSaveBlob` 。

有 `msSaveBlob`：用 `msSaveBlob` 下载。

无 `msSaveBlob`，按照以下步骤实现：

- `createObjectURL` 创建文件本地 `url`
- 创建 `a` 标签
- 创建的 `url` 给到 `a` 标签的 `href`
- 设置 `download` （即文件名）
- 模拟点击下载
- 下载完毕，销毁 `a` 标签

![流程梳理图](https://pic1.imgdb.cn/item/67e972440ba3d5a1d7e6eaf1.png)

### 代码实操

```js
// 按blob请求接口
axios.get("http://xxx", { responseType: "blob" }).then((res) => {
  if (window.navigator.msSaveBlob) {
    // IE浏览器
    window.navigator.msSaveBlob(
      res.data,
      {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      },
      "download.ppt"
    );
  } else {
    // 非IE
    const blobURL = URL.createObjectURL(res.data); // 创建blob本地url
    const link = document.createElement("a"); // 创建标签
    link.href = blobURL; // 设置href
    link.download = "download.ppt"; // 设置下载的文件名
    link.style.display = "none"; // 把他隐藏
    link.click();
    link.remove();
    URL.revokeObjectURL(blobURL); // 销毁临时地址
  }
});
```

## file-saver

::: code-group

```sh [pnpm下载]
pnpm i file-saver
```

```js [引入.js]
import { saveAs } from "file-saver";
```

```js [使用.js]
axios.get("http://xxx", { responseType: "blob" }).then((res) => {
  saveAs(res.data, "download.ppt"); // 路径，名称
});
```

:::

## 拓展：如何预览

下载完文件后想要展示预览该如何实现？

预览无论是图片，还是 `excel`、`word` ，都需要一个地址 `url` ，后端返回的在线地址可以使用。

`url` 除了线上地址，还能使用 `base64` 地址。因此接收到 `blob` 地址后把它转为 `base64` 即可。

转换方法可以用到 `fileReader` 方法转换成任意我们想要的格式。
