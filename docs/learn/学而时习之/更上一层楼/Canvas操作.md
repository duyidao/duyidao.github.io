# Canvas操作

## 图片压缩

### 前置知识

#### 第三方库

`file-save` ，其 `saveAs` 方法用于获取并保存 `blob` 等格式的图片。

#### Canvas

使用 `drawImage` 绘制图片，语法如下：

```js
context.drawImage(image, dx, dy);
context.drawImage(image, dx, dy, dWidth, dHeight);
context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

参数解释：

| 参数            | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| image           | 要绘制的图像，可以是 `<img>` 元素、`<canvas>` 元素或 `Image` 对象。 |
| sx（可选）      | 图像剪裁的起始点 x 坐标。                                    |
| sy（可选）      | 图像剪裁的起始点 y 坐标。                                    |
| sWidth（可选）  | 图像剪裁的宽度。                                             |
| sHeight（可选） | 图像剪裁的高度。                                             |
| dx              | 绘制图像的起始点 x 坐标。                                    |
| dy              | 绘制图像的起始点 y 坐标。                                    |
| dWidth（可选）  | 绘制图像的宽度。                                             |
| dHeight（可选） | 绘制图像的高度。                                             |

下面是几个示例，展示了如何使用 `drawImage` 方法：

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 例子1: 在画布上绘制一个图像
const image = new Image();
image.src = 'image.png';
image.onload = function() {
  ctx.drawImage(image, 0, 0);
};

// 例子2: 绘制图像的一部分，并指定目标宽度和高度
ctx.drawImage(image, 10, 10, 50, 50, 100, 100, 50, 50);

// 例子3: 使用剪裁区域绘制图像
ctx.drawImage(image, 20, 20, 100, 100, 0, 0, 50, 50);
```

> 注意
>
> 如果图像还没有加载完成，绘制操作可能不会生效，因此你需要使用 `onload` 事件或其他方式确保图像加载完成后再进行绘制。

`toBlob()` 是 `<canvas>` 元素上的一个方法，用于将当前画布内容转换为一个 Blob 对象， Blob 对象可以用于各种用途，例如上传到服务器或保存为本地文件。

通过 `canvas` 中的 `toBlob()` 转换为一个 Blob 对象，基本语法如下所示：

```js
canvas.toBlob(callback, type, quality);
```

参数解释：

| 参数            | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| callback        | 转换完成后的回调函数，用来接收生成的 Blob 对象作为参数。     |
| type（可选）    | 指定生成的 Blob 对象的 MIME 类型，默认为 `image/png`。       |
| quality（可选） | 指定生成的 Blob 对象的质量参数，仅针对 `image/jpeg` 和 `image/webp` 类型的图片有效，范围为 0 到 1，默认为 0.92。 |

以下是一个示例，展示了如何使用 `toBlob()` 方法将 `<canvas>` 元素的内容转换为 Blob 对象：

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制画布内容
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 100, 100);

// 将画布内容转换为 Blob 对象
canvas.toBlob(function(blob) {
  // 在回调函数中处理生成的 Blob 对象
  // 可以将它上传到服务器或进行其他操作
}, 'image/png');
```

在示例中，首先获取到 `<canvas>` 元素的上下文对象 `ctx`，接着使用绘图方法绘制画布内容（这里绘制一个红色的矩形）。然后，使用 `toBlob()` 方法将画布内容转换为 Blob 对象，并在回调函数中进行处理。

> 注意
>
> `toBlob()` 方法是HTML5新增的方法，不是所有的浏览器都支持它。在使用之前，最好检查一下浏览器的兼容性。

### 获取图片

首先先获取用户选择上传的图片，前端文件上传与相关操作方法复习可点击 [前端文件上传与相关操作]() 。代码如下所示：

```vue
<script setup>
    import { ref } from 'vue'
    
    const imgUrl = ref('')
    const onChangeFn = e => {
        // 获取用户上传的文件
        const file = e.target.files[0]
        
        // 预览文件
        let fr = new FileReader()
        fr.readAsDataURL(file)
        
        // 获取图片读完的图片结果（非同步，需要在onload获取）
        fr.onload = () => {
            imgUrl.value = fr.result
        }
    }
</script>

<template>
	<input type="file" @change="onChangeFn" />
	<img :src="imgUrl" />
</template>
```

### 压缩实现

保存运行后，选择图片可以成功渲染到页面上。现在利用 `canvas` 转 `blob` 或 `DataURL` 格式时实现图片压缩。步骤如下：

1. 创建一个 `canvas` 真实 DOM，并获取到图片 DOM 的宽高
2. 通过 `canvas` 的 `getContext('2d')` 方法法创建获取 2D  渲染上下文
3. 通过 `drawImage()` 在 `<canvas>` 元素上绘制图像
4. 使用 `toBlob()` 方法把 `canvas` DOM 节点转换为一个 Blob 对象
5. 把转换好的 blob 对象通过第三方库 `file-save` 的 `saveAs` 方法转为图片格式
6. 做其他业务处理（如发请求）

```js
import { saveAs } from 'file-save'

const onChangeFn = e => {
    const imgRef = ref(null) // img DOM 节点
    // ...
    fr.onload = () => {
        imgUrl.value = fr.result
        
        // 创建canvas真实dom元素
        let canvas = document.createElement('canvas')
        canvas.height = imgRef.value.height
        canvas.width = imgRef.value.width
        
        // 创建2d上下文
        let ctx = canvas.getContext('2d')
        ctx.drawImage(imgRef.value, 0, 0, imgRef.value.width, imgRef.value.height)
        
        // 把canvas转为blob格式
        canvas.toBlob((blob) => {
            // saveAs(blob, 'img.jpeg')
            let form = new FormData()
            form.append('file', blob)
            axios.post('xxx', form)
        }, 'image/jpeg', 0.4)
    }
}
```

## 页面截图

### 前置知识

通过 `ctx.drawImage(dom)` 绘制图片，再用 `ctx.toBlob()` 方法可以对以下 DOM 元素做截图处理：

- img
- canvas
- video

但是如果想对 `div` 、`document.body` 等元素做截图操作，上述方法将不再适用。需要用到 `html2canvas` 第三方库。

[html2canvas]([www.npmjs.com](https://www.npmjs.com/package/html2canvas)) 是一个 JavaScript 库，用于将 HTML 元素转换为 `<canvas>` 元素。它可以捕捉指定的 HTML 元素（或整个页面）的视觉呈现，并生成一个跨域的 `canvas` 对象，可以用于在网页中展示、下载或上传。

以下是使用 `html2canvas` 的基本步骤：

1. 引入 `html2canvas` 库。你可以通过下载该库的源码文件，或者使用类似 npm 的包管理器进行安装。
2. 使用 `html2canvas()` 函数捕捉 HTML 元素，并生成 `<canvas>` 对象。这个函数接受一个参数，即要捕捉的 HTML 元素。你可以通过 CSS 选择器、DOM 节点或直接使用 `document.body` 来选择元素。
3. 在回调函数中处理生成的 `<canvas>` 对象，例如将其插入到页面中、保存为图片或上传到服务器等。

下面是一个示例，展示了如何使用 `html2canvas` 将整个页面转换为 `<canvas>` 元素：

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 引入 html2canvas 库 -->
  <script src="html2canvas.js"></script>
</head>
<body>
  <div>Hello, world!</div>

  <script>
    // 使用 html2canvas 捕捉整个页面
    html2canvas(document.body).then(function(canvas) {
      // 在回调函数中处理生成的 canvas 对象
      document.body.appendChild(canvas);
    });
  </script>
</body>
</html>
```

在上面的示例中，我们首先在 `<head>` 部分引入了 `html2canvas` 库的脚本文件。然后，在 JavaScript 代码部分，使用 `html2canvas()` 函数捕捉整个页面，并在回调函数中将生成的 `<canvas>` 元素添加到页面中。

此外，`html2canvas` 还提供了一系列配置选项，可以用于调整转换的行为，如指定要忽略的元素、设置背景色、跨域处理等。你可以查阅官方文档以获取更多关于配置选项的详细信息。

> 注意
>
> `html2canvas` 在处理复杂页面和一些特殊元素时可能存在一些限制和局限性，例如不支持播放音视频、某些 CSS 属性可能无法正确应用等。在使用之前，最好先检查库的文档和示例，以了解其支持的功能和适用的场景。

### 截图实现

```vue
<script setup>
    import html2canvas from 'html2canvas'
    import { ref } from 'vue'
    import { saveAs } from 'file-save'
    
    let div1 = ref(null)
    
    const saveScreen = () => {
        html2canvas(div1.value).then(res => {
            res.toBlob((blob) => {
                saveAs(blob, 'screen.png')
            })
        })
    }
</script>
```

## 滤镜

### 获取图片

先获取用户选择上传的图片：

```vue
<script setup>
    import { ref } from 'vue'
    
    const imgUrl = ref('')
    const onChangeFn = e => {
        // 获取用户上传的文件
        const file = e.target.files[0]
        
        // 预览文件
        let fr = new FileReader()
        fr.readAsDataURL(file)
        
        // 获取图片读完的图片结果（非同步，需要在onload获取）
        fr.onload = () => {
            imgUrl.value = fr.result
        }
    }
    
    const addFn = () => {}
</script>

<template>
	<input type="file" @change="onChangeFn" />
	<img :src="imgUrl" />
	<button @click="addFn">
        点我添加滤镜
    </button>
</template>
```

### 滤镜实现

## 图片裁剪