# 前端Bug调试指南

## 取值调用报错

### Cannot read properties of undefined (reading 'xxx')

试图从一个 `undefined` 里读取某个属性，常见于从用取值的时候。

```js
const obj = {}

obj.a // undefined
obj.a.b // Cannot read properties of undefined (reading 'b')
```

解决方法：看这个报错马上根据报错上的 读 `xxx` 全局搜索，找到用到 `xxx` 的地方，此时已经可以断定此处有一个 `undefined` ，找出来为什么是 `undefined` 。通过判断获取 `?` 可选链等方式解决。

### xxx is not a function

常见于调用方法的时候，这个报错意味着 `xxx` 不是一个函数，而是一个 `undefined` 、字符串、数组、对象等，却被当成方法来调用。

```js
import { fn } from 'xxx';

fn() // fn is not a function
```

解决方法：直接按照提示搜索 `xxx` ，排查它为什么不是方法。

## 解析错误

### Expected xxx in JSON at position 1

只见于 `JSON.parse` 解析 JSON 字符串时，`JSON` 字符串格式有问题，一般后端返回的数据，前端 `axios` 会自动试图解析，不一定是前端主动使用 `JSON.parse` 。

解决方法：检查解析的数据是否有问题，是否标准的 `JSON` 数据，可以用 `JSON` 解析工具去校验。

## 资源引入错误

### Failed to resolve xxx

某资源的引入失败，通常见于 `import` 引入了一个不存在的模块，一般是由构建工具提示，不会在控制台上输出。

```js
import { xx } from './a.js' // Failed to resolve './a.js'
```

解决方法：检查提示的错误 `import` 地址。

### the server responded with a status of 404/400

一般见于 `html` 文件的打开项目（项目最终在浏览器跑起来本质上是打开一个 `html` ，加载前端的 `js` 文件），意思是 `script` 标签加载的 `js` 文件，或者 `link` 标签加载 `css` 文件，或者 `img` 标签加载的图片文件地址不存在或者无法访问。

```html
<script src="xxx.js"></script> <!-- the server responded with a status of 404 (Not found) -->
```

解决方法：通过网络面板，看看是哪个资源错误了，检查下资源的路径。

### xxx does not provide an export named 'default/xxx'

一般只见于 `import` 引入模块的时候，引入的东西不存在于目标文件。

```js
import a from 'xxx.js' // xxx does not provide an export named 'default';
```

解决方法：检查拼写，以及引入来源有没有 `export` 引入的东西有没有拼写错；或者排查一下有没有 `export` 和 `export default` 混淆使用。

## 低级错误

### Uncaught SyntaxError

语法错误，低级的错误。

解决方法：按提示检查语法。

### MMaximun call stack size exceeded

栈溢出，一般就是死循环。

```js
function a () {
  a()
}

a()

while (true) {
  // do something
}
```

解决方法：常见于递归，或者 `react` 中会常见组件导致的无限递归更新，或者写了一个无穷大的循环函数。

### Identifer 'xxx' has already been declared

重复变量定义。

```js
const a = 1

const a = () => {} // Identifer 'a' has already been declared
```

解决方法：检查下哪个变量重复定义换个名字就好。

### xxx is not defined

变量未定义。

```js
console.log(a) // a is not defined
```

解决方法：检查下变量是否定义，或者是否拼写错误。

### Cannot access 'xxx' before initialization

变量提升导致的问题。

```js
console.log(a) // Uncaught ReferenceError: Cannot access 'a' before initialization

let a = 1
```

解决方法：检查下变量是否提前使用，或者是否拼写错误。

## 请求错误类

### 请求码错误

记住几个规律：
1. 500类错误：八成是服务器问题，也可能是参数不对导致的错误
2. 400、403、404：基本上是前端的问题，404是地址有误；403是无请求权限；400是请求发的不符合后端要求
3. 100基本看不到；200、300基本上没问题

### Access to XMLHttpRequest at 'xxx' from origin 'xxx' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

跨域问题，一般见于 `axios` 请求，`fetch` 请求，`html` 文件请求，`script` 标签请求等。跨域问题一般由后端解决，前端可以尝试使用 `cors-anywhere` 代理。

## 排查BUG核心思想

最重要的是不断缩小范围，找出 BUG 所在的具体代码块。

### 步骤推测法

大多数的需求是线性的，基本上都可以分析出步骤，当发现效果和预期不一样，那么分析步骤、排查步骤、逐步缩小范围，最终确定问题。

### 删除代码法

有时步骤很复杂，或者完全找不到头绪，可以先删除其他代码，然后看是否正常，可以确定错误在这块，然后在进去这块，继续删除某一个部分，直到缩小到具体代码。

这个方法适用于某些无法看到错误，完全不明确错误在哪时使用。

### console

`console` 是最常用的，当有怀疑对象时，可以配合 `console` 打印数据来验证数据是否符合预期，打印语句验证代码块是否执行。

### debugger

代码吗执行过程是非简单线性，有很多异步操作，想着某一时刻状态时，可以用 `debugger` 来暂停代码，然后查看当前状态。