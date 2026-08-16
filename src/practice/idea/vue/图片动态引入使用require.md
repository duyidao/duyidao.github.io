# Vue 图片动态引入使用 require

在<word text="Vue" />项目中，后端返回数组对象，对象中有一个 `cover` 字段作为图片显示。当该字段为空时显示默认图片。使用三元表达式或或运算：

```vue
<img :src="cover ? cover : '../../assets/img/logo.png'" />
```

运行项目发现动态获取的静态图片无效。

网上常见解答：在<word text="Vue" />中动态引入图片需要使用 `require` 编译静态资源路径，否则被当做静态资源处理。

由此产生几个疑问：

- 什么是静态资源、什么是动态资源？
- 为什么静态获取的图片能渲染，动态获取的不行？
- `require` 编译做了什么？

## 静态资源与动态资源

静态资源：客户端发送请求到 web 服务器，web 服务器从内存中取出文件返回给客户端，客户端解析渲染。

动态资源：客户端请求动态资源，先交给 web 容器，web 容器连接数据库，数据库处理数据后将内容交给 web 服务器，web 服务器返回给客户端解析渲染。

在 Vue 项目中，静态资源即放在 `assets` 等文件夹内的图片、视频、iconfont 字体文件等；动态资源是通过接口请求获取到的数据。

## 资源渲染

浏览器只认识 HTML、CSS、JS 文件，不认识 `.vue` 文件。浏览器运行<word text="Vue" />项目实际上是先将<word text="Vue" />项目打包，把每个 `.vue` 文件打包成 CSS、HTML 与 JS 文件，再到浏览器中运行。

动态获取的静态资源不加 `require`，最终打包效果：

```html
<img :src="'../../assets/img/logo.png'" />

<!----------------------------------------->

<img src="../assets/logo.png" alt="logo" />
```

动态添加的 src 最终编译成静态字符串地址。程序运行时按这个地址去项目目录中引入资源，即把该资源当成静态资源。

静态获取同一张图片，打包后效果：

```html
<img src="../../assets/img/logo.png" />

<!----------------------------------------->

<img src="/img/logo.6c137b82.png" />
<!--或者-->
<img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/....."
/>
```

静态地址引入的图片路径和名称已发生变化，编译后的静态地址可以成功引入。因为默认情况下 `src` 目录下所有文件都会被打包，`src` 下的图片也会被打包到新文件夹并生成新文件名。编译后的静态地址引入的是打包后的图片地址。

第二个问题的答案：动态添加的 `src` 编译后的地址与图片资源编译后的地址不一致，导致无法正确引入。

```md
编译过后的 src 地址：../../assets/logo.png
编译过后的图片资源地址：/img/logo.6c137b82.png
```

## require 执行

`require` 是<word text="Node" />方法，用于引入模块、<word text="JSON" />或本地文件。

[资源渲染](/idea/vue/图片动态引入使用require#资源渲染) 中提到，<word text="Webpack" />会将 `require` 引入的资源当成模块，根据配置文件规则打包。最后示例代码中编译后的场景分为两种：`img` 文件夹下的图片路径和 `base64`。

<word text="Vue" />最终通过<word text="Webpack" />打包，在 `webpack.config.js` 配置文件中编写打包规则。<word text="Webpack" />的打包规则针对的是模块，即<word text="Webpack" />只会对模块打包。

使用 `require` 引入图片时，<word text="Webpack" />将图片当成模块，根据配置文件规则打包。`require` 相当于桥梁，使用 `require` 引入的资源会被当成模块并根据配置打包，返回最终打包结果。

`require` 打包执行的操作：

1. 图片小于项目设置的限制大小，返回 `base64` 插入到 `require` 调用处
2. 图片大于限制大小，编译成新图片资源，`require` 返回新图片资源路径及文件名

因此编译后的文件地址和被编译后的资源文件地址不一致，无法正确引入。使用 `require` 返回的是资源文件编译后的地址，从而正确引入。

## 补充说明

1. 静态引入一张图片，没有使用 `require`，为什么返回的依然是编译后的文件地址？

   在<word text="Webpack" />编译 `.vue` 文件时，遇到 src 等属性会默认使用 `require` 引入资源路径。引用 `vue-cli` 官方原话：

   > 当你在 `JavaScript`、`CSS` 或 `*.vue` 文件中使用相对路径 (必须以 . 开头) 引用一个静态资源时，该资源将会被包含进入 `webpack` 的依赖图中。在其编译过程中，所有诸如 `<img src="...">`、`background: url(...)` 和 `CSS @import` 的资源 `URL` 都会被解析为一个模块依赖。
   >
   > 例如，`url(./image.png)` 会被翻译为 `require('./image.png')`，而：
   >
   > ```html
   > <img src="./image.png" />
   > ```
   >
   > 将会被编译为：
   >
   > ```js
   > h('img', { attrs: { src: require('./image.png') } })
   > ```
   >
   > 引入图片时，`src` 后面的属性值实际是一个变量。<word text="Webpack" />会根据 `v-bind` 指令解析 `src` 后面的属性值，并不会通过 `require` 引入资源路径。因此需要手动添加 `require`。

2. 如果是<word text="Vite" />创建的项目，以下几种情况可满足自动转换路径：
   1. CSS 的静态路径
   2. `img` 的 `src`
   3. `import()` 语句
   4. `URL`

## 业务复现

如何实现鼠标切换图片显示（图片放在 `src/assets` 文件夹下）？

直接修改路径无效：

```js
const path = ref('')
const changeImgFn = (e) => {
  path.value = `./assets/${e}.jpg`
}
```

打包后的图片路径与其不符，图片无法渲染。

方法一：使用 `import()` 方法：

```js
const path = ref('')
const changeImgFn = (e) => {
  import(`./assets/${e}.jpg`).then((res) => {
    console.log(res)
    path.value = res.default
  })
}
```

回调参数拿到的数据如下：

![打印结果](https://pic.imgdb.cn/item/652e9cfbc458853aef0d1417.jpg)

缺点：会生成一些 JS 文件。如果不希望生成这些文件，此方法不可用。

![生成的js文件](https://pic.imgdb.cn/item/652e9c60c458853aef0bb8b8.jpg)

方法二：通过 JavaScript 内置对象 URL 生成地址，传入两个参数：图片相对路径和相对对象。

```js
const path = ref('')
const changeImgFn = (e) => {
  const url = new URL(`./assets/${e}.jpg`, import.meta.url)
  console.log(url)
}
```

打印结果如下：

![打印结果](https://pic.imgdb.cn/item/652e9eb2c458853aef10f254.jpg)
