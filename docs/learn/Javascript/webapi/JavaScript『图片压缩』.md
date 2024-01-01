# JavaScript『图片压缩』

图片压缩像素质量也是前端一个常用技能，下面来模拟学习一下该怎么做。

## 页面创建

首先先创建一个 `html` 页面，里面主要需要三个元素：

- `input` 文件选择框
- 原图片 `img` 标签
- 压缩后的图片 `img` 标签，用于做对比

其次做一下样式微调，图片的宽度与显示隐藏等。

```html
<style>
  .hide {
    display: none;
  }

  .show {
    display: initial;
  }

  .img-preview {
    width: 300px;
  }
</style>

<input type="file"
  name="file"
  id="imgFile"
  value="请选择图片" />
<img id="originImgPreview"
  class="img-preview hide"
  alt="">
<img id="compressedImgPreview"
  class="img-preview hide"
  alt="">
```

## 交互设置

### 思路

首先需要明确一下逻辑步骤，第一步我们需要获取到输入框、两个图片的 DOM 元素。

接着为输入框绑定 `change` 事件，当上传文件时获取文件对象，主要需要其类型与文件内容。

然后利用 `canvas` 的特性把图片放到画布中，通过 `toDataURL` 转为 `base64` 。

最后把转换好的 `base64` 渲染到页面上。

### 获取 元素绑定事件

首先获取三个 DOM 元素，并给输入框绑定 `change` 事件，触发事件后获取其文件。

> 注意
>
> 该案例后续的代码都以拆分成多个函数，每个函数负责各自功能模块的方式书写。

```js
const originImgPreview = document.querySelector('#originImgPreview')
const compressedImgPreview = document.querySelector('#compressedImgPreview')
const imgFile = document.querySelector('#imgFile')

const init = () => {
  bindEvent()
}

const bindEvent = () => {
  imgFile.addEventListener('change', handleImgChangeFn, false)
}
```

### 文件上传

文件上传组件改变事件触发后调用回调，回调函数 `handleImgChangeFn` 主要做以下操作：

- 获取到上传的文件数据，判断其类型
- 如果不属于正确的图片格式，给出提示，并把图片组件隐藏
- 属于正确的图片格式，继续往下执行，显示图片组件

```js
// 图片上传的数据对象
let imgFileObj = null
// 设置一个图片格式字段对象
const IMG_TYPE = {
  "image/jpeg": "image/jpeg",
  "image/png": "image/png",
  "image/jpg": "image/jpg",
}

// 文件上传组件的回调函数
const handleImgChangeFn = (e) => {
  imgFileObj = e.target.files[0] // 获取文件数据

  console.log(imgFileObj);
  // 如果文件不符合要求，返回错误信息，隐藏图片
  if (!imgFileObj || !IMG_TYPE[imgFileObj.type]) {
    setImgFileEmptyFn()
    return alert('请选择正确格式的图片')
  }

  setImgPreview(imgFileObj)
}

// 文件不符合要求时，隐藏图片组件，清空默认保存的文件数据
const setImgFileEmptyFn = () => {
  imgFile.value = ''
  imgFileObj = null

  setPreviewVisible(originImgPreview, false)
  setPreviewVisible(compressedImgPreview, false)
}

/*
* node：图片组件
* visible：状态，true显示，false隐藏。通过动态添加hide和add类名实现该功能
*/
const setPreviewVisible = (node, visible) => {
  switch (visible) {
    case true:
      node.classList.remove('hide')
      node.classList.add('show')
      break;
    case false:
      node.classList.add('hide')
      node.classList.remove('show')
      break;
    default:
      break;
  }
}
```

> 注意
>
> 1. 函数 `setImgFileEmptyFn` 第一第二个代码必须加上，因为 `input` 文件上传输入框默认会把文件保存，即使在函数 `handleImgChangeFn` 通过判断 `return` 也无法阻止其默认事件。因此需要手动 `.value` 清空。
>
> 2. 文件上传所赋值的变量 `imgFileObj` 内容如下所示：
>
>    ```js
>    File {
>    	lastModified: 1684826643519
>    	lastModifiedDate: Tue May 23 2023 15:24:03 GMT+0800 (中国标准时间) {}
>    	name: "man.jpg"
>    	size: 1723
>    	type: "image/jpeg"
>    	webkitRelativePath: ""
>    	[[Prototype]]:File
>    }
>    ```
>
>    本案例中重点需要使用的是其类型 `type` 和大小 `size` 。

### 读取文件

文件上传步骤中 `handleImgChangeFn` 函数会判断文件类型是否符合要求，如果不符合要求则走错误路线；如果是正确的类型则调用 `setImgPreview` 函数，读取文件信息。

读取文件信息用到了 `FileReader` 方法，官网指路：[FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 。本篇幅不做过多赘述，更多详细内容放在拓展模块。

通过 `readAsDataURL` 方法读取文件内容，在其 `onload` 加载完毕后获取转换好的 `base64` 路径。

```js
 const setImgPreview = (imgFile) => {
   if (imgFile instanceof File) {
     reader.onload = async () => {
       const originImgSrc = reader.result // 原来的图片base64
       compressedImgSrc = await createCompressedImg({
         imgSrc: originImgSrc,
         quality,
         type: imgFile.type,
       }) // 转换后的图片base64
       originImgPreview.src = originImgSrc
       compressedImgPreview.src = compressedImgSrc
       setPreviewVisible(originImgPreview, true)
       setPreviewVisible(compressedImgPreview, true)
     }
     reader.readAsDataURL(imgFile)
   }
 }
```

### 压缩文件

通过 `createCompressedImg` 函数执行压缩文件功能模块，步骤如下：

1. 创建一个 `canvas` 画布元素，创建一个 `img` 图片元素
2. 把图片放到画布中。宽度和高度可获取图片的原宽高作为设置
3. 画布转 `base64` ，使用到的是 `toDataURL()` 方法，需要两个参数
   - 参数1：转换后的类型，如 `.png` 、`.jpeg` 等
   - 参数2：画质百分比，取值0~1之间，因此需要乘100%
4. 判断其画质是否大于等于原画质，如果大于等于说明压缩程度还不够，继续压缩（使用到了递归的思想
5. 返回压缩后的 `base64` 

```js
/*
1.需要一个画布
2.需要一个图片并转为base64
3.把图片画到canvas中
4.把canvas质量缩小
*/
const createCompressedImg = ({
  imgSrc,
  quality,
  type,
}) => {
  const oCan = document.createElement('canvas')
  const oImg = document.createElement('img')
  const ctx = oCan.getContext('2d')

  oImg.src = imgSrc

  return new Promise((resolve) => {
    oImg.onload = () => {
      const imgWidth = oImg.width
      const imgHeight = oImg.height

      oCan.width = imgWidth
      oCan.height = imgHeight

      ctx.drawImage(oImg, 0, 0, imgWidth, imgHeight)

      doCompress(oCan, imgSrc, type)
      resolve(compressedImgSrc);
    }
  })
}

const doCompress = (canvas, imgSrc, type) => {
  compressedImgSrc = canvas.toDataURL(type, quality / 100)
  if (compressedImgSrc.length >= imgSrc.length && quality >= 10) {
    quality -= 10
    doCompress(canvas, imgSrc, type)
  }
}
```

> 小贴士
>
> 1. 这里通过 `new Promise` 函数调用 `resolve` 返回数据，在读取文件模块中可通过 `.then()` 或者 `async await` 的方式获取数据。
> 2. `base64` 大小对比可通过 `.length` 来获取

## 拓展

### FileReader

**`FileReader`** 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。

重要提示：FileReader 仅用于以安全的方式从用户（远程）系统读取文件内容 它不能用于从文件系统中按路径名简单地读取文件。要在 JavaScript 中按路径名读取文件，应使用标准 Ajax 解决方案进行服务器端文件读取，如果读取跨域，则使用 CORS 权限。

### FileReader.onload

处理[`load`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/load_event)事件。该事件在读取操作完成时触发。

### FileReader.result

只读属性，获取文件的内容。该属性仅在读取操作完成后才有效（在其 `onload` 函数中使用），数据的格式取决于使用哪个方法来启动读取操作。

### FileReader.readAsDataURL()

开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个`data:` URL 格式的 Base64 字符串以表示所读取文件的内容。

## 总结

### 思路总结

本案例主要通过 `canvas` 画布的 `toDataURL()` 转换成 `base64` 后再渲染到页面上，实现图片压缩。 `toDataURL()` 的第二个参数就是压缩的参数，范围为0~1，因此可以从0.9开始逐渐递减，通过递归的方式让其压缩到比原图还小即可。

由于在压缩图片的时候通过创建图片标签 `img` 的形式，因此需要等待其加载完毕才能继续往下执行，需要用到 `onload` 事件。该事件是异步的，但是 `return` 返回值是要同步的，因此用到了 `Promise` 方法，调用 `resolve()` 把状态改变为成功状态，在调用的地方使用 `async await` 转为同步获取值。

通过 `FileReader` 方法读取文件数据并转为 `base64` ，二者比较其长度 `length` 来判断压缩后的图片是否小于原图。

### 代码总结

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible"
    content="IE=edge">
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .hide {
      display: none;
    }

    .show {
      display: initial;
    }

    .img-preview {
      width: 300px;
    }
  </style>
</head>

<body>
  <input type="file"
    name="file"
    id="imgFile"
    value="请选择图片" />
  <img id="originImgPreview"
    class="img-preview hide"
    alt="">
  <img id="compressedImgPreview"
    class="img-preview hide"
    alt="">

  <script>
    const originImgPreview = document.querySelector('#originImgPreview')
    const compressedImgPreview = document.querySelector('#compressedImgPreview')
    const imgFile = document.querySelector('#imgFile')
    const reader = new FileReader()

    const IMG_TYPE = {
      "image/jpeg": "image/jpeg",
      "image/png": "image/png",
      "image/jpg": "image/jpg",
    }

    let imgFileObj = null
    let quality = 90
    let compressedImgSrc = ''

    const init = () => {
      bindEvent()
    }

    const bindEvent = () => {
      imgFile.addEventListener('change', handleImgChangeFn, false)
    }

    const handleImgChangeFn = (e) => {
      imgFileObj = e.target.files[0]

      console.log(imgFileObj);
      if (!imgFileObj || !IMG_TYPE[imgFileObj.type]) {
        setImgFileEmptyFn()
        return alert('请选择正确格式的图片')
      }

      setImgPreview(imgFileObj)
    }

    const setImgFileEmptyFn = () => {
      imgFile.value = ''
      imgFileObj = null

      setPreviewVisible(originImgPreview, false)
      setPreviewVisible(compressedImgPreview, false)
    }

    const setImgPreview = (imgFile) => {
      if (imgFile instanceof File) {
        reader.onload = async () => {
          const originImgSrc = reader.result
          compressedImgSrc = await createCompressedImg({
            imgSrc: originImgSrc,
            quality,
            type: imgFile.type,
          })
          originImgPreview.src = originImgSrc
          compressedImgPreview.src = compressedImgSrc
          setPreviewVisible(originImgPreview, true)
          setPreviewVisible(compressedImgPreview, true)

          console.log(originImgSrc.length, compressedImgSrc.length, quality);

        }

        reader.readAsDataURL(imgFile)
      }
    }

    /*
    1.需要一个画布
    2.需要一个图片并转为base64
    3.把图片画到canvas中
    4.把canvas质量缩小
    */
    const createCompressedImg = ({
      imgSrc,
      quality,
      type,
    }) => {
      const oCan = document.createElement('canvas')
      const oImg = document.createElement('img')
      const ctx = oCan.getContext('2d')

      oImg.src = imgSrc

      return new Promise((resolve) => {
        oImg.onload = () => {
          const imgWidth = oImg.width
          const imgHeight = oImg.height

          oCan.width = imgWidth
          oCan.height = imgHeight

          ctx.drawImage(oImg, 0, 0, imgWidth, imgHeight)

          doCompress(oCan, imgSrc, type)
          resolve(compressedImgSrc);
        }
      })
    }

    const doCompress = (canvas, imgSrc, type) => {
      compressedImgSrc = canvas.toDataURL(type, quality / 100)
      if (compressedImgSrc.length >= imgSrc.length && quality >= 10) {
        quality -= 10
        doCompress(canvas, imgSrc, type)
      }
    }

    const setPreviewVisible = (node, visible) => {
      switch (visible) {
        case true:
          node.classList.remove('hide')
          node.classList.add('show')
          break;
        case false:
          node.classList.add('hide')
          node.classList.remove('show')
          break;
        default:
          break;
      }
    }

    init()
  </script>
</body>

</html>
```

