# 页面截图

## CAnvas截图

前端实现截图需要使⽤HTML5的Canvas和相关API，具体步骤如下：

1. ⾸先在⻚⾯中创建⼀个Canvas元素，并设置其宽⾼和样式。
2. 使⽤CanvasAPI在Canvas上绘制需要截图的内容，⽐如⻚⾯的某个区域、某个元素、图⽚等。
3. 调⽤CanvasAPI中的
toDataURL() 
⽅法将Canvas转化为base64编码的图⽚数据。
4. 将base64编码的图⽚数据传递给后端进⾏处理或者直接在前端进⾏显示

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('btn');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
btn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(document.documentElement, 0, 0);
  const imgData =  canvas.toDataURL();
  console.log(imgData);
});
```

通过 `ctx.drawImage(dom)` 绘制图片，再用 `ctx.toBlob()` 方法可以对以下 DOM 元素做截图处理：

- img
- canvas
- video

但是如果想对 `div` 、`document.body` 等元素做截图操作，上述方法将不再适用。需要用到 `html2canvas` 第三方库。

## 页面截图

[html2canvas](https://www.npmjs.com/package/html2canvas) 是一个 JavaScript 库，用于将 HTML 元素转换为 `<canvas>` 元素。它可以捕捉指定的 HTML 元素（或整个页面）的视觉呈现，并生成一个跨域的 `canvas` 对象，可以用于在网页中展示、下载或上传。

以下是使用 `html2canvas` 的基本步骤：

1. 引入 `html2canvas` 库。你可以通过下载该库的源码文件，或者使用类似 npm 的包管理器进行安装。
2. 使用 `html2canvas()` 函数捕捉 HTML 元素，并生成 `<canvas>` 对象。这个函数接受一个参数，即要捕捉的 HTML 元素。你可以通过 CSS 选择器、DOM 节点或直接使用 `document.body` 来选择元素。
3. 在回调函数中处理生成的 `<canvas>` 对象，例如将其插入到页面中、保存为图片或上传到服务器等。


此外，`html2canvas` 还提供了一系列配置选项，可以用于调整转换的行为，如指定要忽略的元素、设置背景色、跨域处理等。你可以查阅官方文档以获取更多关于配置选项的详细信息。

> [!WARNING] ⚠ 注意
> `html2canvas` 在处理复杂页面和一些特殊元素时可能存在一些限制和局限性，例如不支持播放音视频、某些 CSS 属性可能无法正确应用等。在使用之前，最好先检查库的文档和示例，以了解其支持的功能和适用的场景。

::: code-group
```vue [div元素截图.vue]
<script setup>
  import html2canvas from 'html2canvas'
  import { ref } from 'vue'
  import { saveAs } from 'file-saver'
  
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
```html [整个页面截图.html]
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
:::

## 总体效果
<Iframe url="https://duyidao.github.io/blogweb/#/info/canvas/screenshot" />