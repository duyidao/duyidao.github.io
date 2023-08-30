# vue2核心源码及设计思想

## 使用Rollup搭建开发环境

新建一个文件夹，打开终端，输入命令行：

```
npm init -y
```

此时能够生成 `package.json` 文件。下载 `rollup` 和 `rollup-plugin-babel` 依赖：

```
npm i rollup rollup-plugin-babel @babel/core @babel/preset-env --save
```

上方命令表示下载 `rollup` 模块的 `babel` 依赖，其中 `@babel/core` 用于编译高级 ES6 语法并转换为 ES5 语法。`@babel/preset-env` 是其中一个插件。下载完依赖后文件夹内会有一个 `node_modules` 文件夹，

同级目录下新建一个 `rollup.config.js` 文件，用于打包（默认找  `rollup.config.js` 文件，也可以自定义，后续指定文件）。然后返回 `package.json` 文件，书写打包编译的命令：

```json
{
  "scripts": {
    "dev":"rollup -cw",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```

上方代码表示使用 `rollup` 来打包，`-c` 指定默认配置文件，`-w` 表示 `watch` ，监控文件。

新建一个 `src` 文件夹，为打包入口，文件夹下新建一个 `index.js` 文件，作为入口文件。随便写点 ES6 语法代码。

```js
export const a = 100
```

在打包的配置文件 `rollup.config.js` 中作打包的配置，代码如下：

```js
// rollup默认可以导出一个对象，作为打包的配置文件
import babel from "rollup-plugin-babel";

export default {
  input: "./src/index.js", // 入口
  output: {
    file: "./dist/vue.js", // 出口
    name: "Vue", // 打包全局挂载Vue实例。打包后会生成一个 golbal.vue
    format: "umd", // 打包格式。常见格式有 esm es6模块 commonjs模块 iife自执行函数 umd(commonjs amd)
    sourcemap: true, // 希望可以调试源代码
  },
  // 插件配置。所有插件都是函数，执行即可
  plugins: [
    // 一般babel都会配置一个babel文件
    babel({
      exclude: "node_modules/**", // 排除node_modules下所有文件
    }),
  ],
};
```

> 题外话
>
> 最开始我把 `input` 错敲成 `imput` ，导致一直报错，提示 `options.input` 没有。

根目录下新建一个 `.babelrc` 文件，用于配置 `babel` 。打包后会找到这个文件。代码如下：

```json
{
  "presets": ["@babel/preset-env"]
}
```

现在配置完成，输入命令行开始打包编译：

```
npm run dev
```

运行成功后可以看到根目录下新建一个 `dist` 文件夹，点击查看 `vue.js` 文件，可以看到其已经编译转换成功：

![编译](https://pic.imgdb.cn/item/64eeb143661c6c8e54849a16.jpg)

测试一下是否全局有了 `Vue` 实例，`dist` 文件夹下新建一个 `index.html` 文件，引入 `vue.js` 文件，在输出 `Vue` ，代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="./vue.js"></script>
  <script>
    console.log(Vue)
  </script>
</body>
</html>
```

最终打印结果为：

```js
{a: 100, __esModule: true}
```

能够拿到打印结果。且因为事先配置允许调试源码，在 `src/index.js` 文件中添加 `debugger` 可以生成断点，用于调试。

> 题外话
>
> 为什么使用了 `babel` 编译为低级语法了只能支持 IE9 以上？
>
> 因为 Vue2 的 `Object.defineProperty` 语法只支持 IE9 以上，没有低级语法可以代替；而 Vue3 的 Proxy 更是直接剔除 IE 行列。

## Vue响应式原理实现

实现响应式数值变化，数值变化了我们可以监控到数据的变化。

首先初始化数据，在 `index.html` 内创建一个 `Vue` 实例，把所有数据放到 `data` 对象内，代码如下：

```html
<script>
  console.log(Vue)
  const vm = new Vue({
    data: {
      name: 'daodao',
      age: 23
    }
  })
</script>
```

### 初始化函数

接下来需要创建一个。`Vue` 源码并没有创建类 `class` 来设计，因为当方法多了之后，会造成很多方法的耦合。`Vue` 采取的方法是配置构造函数，通过原型的方式把构造函数挂载到 `Vue` 实例上，最终导出 `Vue` 实例。如下：

```js
function Vue() {}

Vue.prototype.xxx = xxx

export default Vue
```

在 `index.html` 文件中 `new Vue` 就是此处导出的 `Vue` 。

现在可以用上面的方法配置初始化函数。新建一个 `src/init.js` 文件，用于数据初始化操作。

在原型上挂载一个 `_init` 函数，接收一个数据参数。为了能让后续调用的函数都能使用接收的数据参数，故把该形参挂载到 `this` 上，后面的函数都能通过 `this` 拿到了。

代码中用 `vm` 代表 `this` ，后续都通过 `vm` 获取方法变量。代码如下：

```js
import { initState } from "./state";

// 给Vue增加init方法
export function initMixin(Vue) {
  // 初始化操作
  Vue.prototype._init = function (options) {
    // 在vue中，vm.$options就是获取用户配置的。使用Vue时，$开头都是Vue自身的方法
    const vm = this;
    vm.$options = options;

    // 初始化状态处理函数（状态初始化章节详讲）
    initState(vm);
  };
}
```

`index.js` 使用原型上的 `_init` 函数，传递数据参数。代码如下：

```js
import { initMixin } from "./init";

// options就是用户的选项
function Vue(options) {
  this._init(options);
}

initMixin(Vue); // 扩展init的方法

export default Vue;
```

当 `index.html` 文件使用 `new Vue()` 创建构造函数后，就会触发 `_init()` 方法，并把 `new Vue()` 括号内的对象参数传递给 `options` 。

### 状态初始化

接下来作状态初始化处理，创建 `state.js` 文件，声明一个 `initState` 函数，用于作状态初始化。

函数主要判断接收获取到的数据，是否有 `prop` 、`data` 等，每个模块做对应处理。本案例先以 `data` 为主。存在 `data` 则判断其类型做相应的处理。

如果是对象，不需要作额外处理；如果是函数，则通过 `call()` 方法修改其 `this` 指向为 `Vue` 上。代码如下所示：

```js
export function initState(vm) {
  // 获取所有选项
  const opts = vm.$options;

  // 如果有data数据，则初始化data数据
  if (opts.data) {
    initData(vm);
  }
}

function initData(vm) {
  // 获取所有data数据
  let data = vm.$options.data;
  debugger;
  // Vue2中data可以是对象也可以是函数（Vue3统一函数），因此需要先判断
  data = typeof data === "function" ? data.call(vm) : data;
  console.log(data);
}
```

最终保存，通过 `debugger` 查看数据。

## 对象属性劫持

## 数组方法劫持

## 模板编译原理，转化ast语法树

## 代码生成虚拟DOM

## 虚拟DOM生成真实DOM