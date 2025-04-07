# dataUrl与base64的区别

<!-- [](https://www.bilibili.com/video/BV1rGrGYmEog?vd_source=8628f61938375f4995c51e0b8c7d8165) -->

## dataUrl

`dataUrl` 是 `url` 的特殊写法，而 `url` 是资源定位符，最终目的是获取资源数据。`dataUrl` 也是获取资源数据，只不过 `url` 需要请求网络数据，而 `dataUrl` 不需要请求网络数据，直接把数据写到 `url` 地址内。

查看 Wiki 百科，`dataUrl` 的格式如下：

```js
data:content/type;base64;
```

其中 `content/type` 是 `MIME` 类型，如 `text/html` 表示资源是 `html` 格式；`text/plain` 表示资源是纯文本格式；`image/png` 表示资源是 `png` 格式；`application/javascript` 表示资源是 `js` 代码格式。

后面数据是可选的，可以写原始数据，也可以写 `base64` 编码后的数据。

下面来使用 `dataUrl` 给 `script` 标签添加 `src` 属性，并加载 `js` 代码：

```html
<script src="dataUrl:application/javascript;utf8,console.log('hello world')"></script>
```

刷新页面后发现控制出现了打印，这里并不需要执行资源请求操作，很快就能

## base64

`base64` 是一种编码方式，用于将二进制数据编码成文本数据。`base64` 是一种可逆的编码方式，即可以解码还原成原始的二进制数据。

有一个工具方法 `btoa` 可以把接收的数据编码为 `base64` 格式，还有一个工具方法 `atob` 可以把 `base64` 格式的数据解码还原成原始格式。

```js
btoa('alert(1)'); // "YWxlcnQoMSk="
atob('YWxlcnQoMSk='); // "alert(1)
```

## 二者关系

`base64` 和 `dataUrl` 的关系是 `dataUrl` 可以把 `base64` 编码后的数据直接写到 `url` 地址内，如：

```html
<script src="dataUrl:application/javascript;base64,YWxlcnQoMSk="></script>
```

以图片上传显示为例子，用户选择一个图片，调用接口上传到服务器后展示在页面上，实际上做了以下的步骤：

1. 用户选择图片，前端调用接口上传到数据库服务器
2. 后端返回对应的图片 `url` 地址
3. 前端拿到地址，直接为 `img` 标签的 `src` 赋值，`src` 属性接收到 `url` 后发送网络请求
4. 数据库返回图片路径，最终页面渲染成功

![旧方法一图流](https://pic1.imgdb.cn/item/67d28a5588c538a9b5bc7318.png)

可以看到上方的操作繁琐低效，一般情况下用户希望选择了预览图后能够马上看到，因此需要改变模式了，改变后的效果如下：

1. 用户选择图片，本地读取该图片的二进制，读取出来后用 `base64` 转为纯文本数据，生成一个 `datatUrl` ，直接赋值给 `img` 标签的 `src` 属性，页面渲染成功，用户看到预览图
2. 后续再调接口传数据，不影响用户看图片

![新方法一图流](https://pic1.imgdb.cn/item/67d28bd388c538a9b5bc737a.png)

```js
const imgRef = ref(null)

const changeFn = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      imgRef.value.src = e.target.result
    }
}
```