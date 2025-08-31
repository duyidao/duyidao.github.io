## Module的加载实现

上一章节着重模块的语法，这一章节重心来到了如何在浏览器和 `Node` 之中加载 ES6 模块。

### 浏览器加载

传统方法是在 HTML 页面中通过 `script` 标签加载 JavaScript 脚本。

```html
<script>
  // some code
</script>
<script src="path/to/myModule.js"></script>
```

浏览器渲染引擎遇到 `script` 会停下等待脚执行完再继续往下，即会以同步方式，下载并执行该模块。如果脚本体积很大，导致浏览器堵塞，用户会感觉到浏览器“卡死”了，用户体验极差。

因此浏览器允许脚本异步加载。

```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

`defer` 和 `async` 的区别是：

- `defer` 是在 HTML 解析完之后，`DOMContentLoaded` 事件触发前执行，多个 `defer` 脚本按顺序执行。
- `async` 是一旦下载完，渲染引擎就中断渲染，执行这个脚本，多个 `async` 脚本不能保证顺序。

浏览器加载 ES6 模块也是一样，使用 `script` 标签，但是要加入 `type="module"` 属性，让浏览器知道他是 ES6 模块。浏览器对于带有 `type="module"` 的 `script`，都是异步加载，不会阻塞浏览器，即默认设置 `defer` 属性，也能改成 `async` 属性。

```html
<script type="module" src="./foo.js"></script>
```

另外，也可以使用 `import` 命令加载模块。

```html
<script type="module">
  import { foo } from './foo.js';
</script>
```

对于外部加载的模块脚本，需要注意以下几点：
- 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
- 模块脚本自动采用严格模式，不管有没有在模块头部加上 `"use strict";`。
- 模块之中，可以使用 `import` 命令加载其他模块（`.js` 后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用 `export` 命令输出对外接口。
- 模块之中，顶层的 `this` 关键字返回 `undefined`，而不是指向 `window` 对象。
- 同一个模块如果加载多次，将只执行一次。

### ES6模块与CommonJS模块的差异

ES6模块与 CommonJS 模块具体两大差异如下：

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
  
  CommonJs 模块输出的是值的复制，也就意味着内部值发生改变，不会影响到已输出的值，模块不会同步更新。ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
  
  这是因为 CommonJs 模块加载的是一个对象，该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

ES6 模块的运行机制与 CommonJS 不一样。 擎对脚本静态分析的时候，遇到模块加载命令 `import` 就会生成 个只读引用。等到脚本真正执行时 ，再根据这个只读引用到被加载的模块中取值。换句话说，ES6 `import` 有点像 Unix 系统的 “符号连接”，原始值变了，`import` 加载的值也会跟着变。因此， ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

::: code-group
```js [CommonJs]
var num = 1
function changeNum() {
  num++
}

module.exports = {
  num,
  changeNum
}

var mod = require('./lib.js')
console.log(mod.num) // 1
mod.changeNum()
console.log(mod.num) // 1
```
```js [ES6]
export let num = 1
export function changeNum() {
  num++
}

import { num, changeNum } from './lib.js'
console.log(num) // 1
changeNum()
console.log(num) // 2
```
:::

需要注意的是，由于 ES6 输入的模块变量只是 个 “符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。

```js
import { a } from './myModule.js'

a = 123 // Syntax Error : 'a' is read-only
```

最后， `export` 通过接口输出的是同 个值。不同的脚本加载这个接口得到的都是同样的实例。

### Node.js的模块加载

#### 概述

`Node.js` 有自己的 CommonJS 模块规范，与 ES6 模块是不兼容的。目前解决方案是二者分开，采取各自的加载方案。

在静态分析阶段，一个模块脚本只要有一行 `import` 或者 `export` ，`Node.js` 就会认为该脚本为 ES6 模块，否则为 CommonJS 模块。如果不想输出任何语句，但是希望被 `Node.js` 将其视为 ES6 模块，可以在脚本中添加一行 `export {}` 。

如果不加后缀，Node 加载 ES6 模块会和 `reqiure` 一样按照以下顺序寻找脚本：
- `import './foo'`
  - `./foo.js`
  - `./foo/package.json`
  - `./foo/index.js`
- `import 'bar'`
  - `./mode_modules/bar.js`
  - `./mode_modules/bar/package.json`
  - `./mode_modules/bar/index.js`
  - 继续网上级查找

ES6 模块之中，顶层的 `this` 指向 `undefined`, CommonJS 模块的顶层 `this` 指向当前模块，这是两者的 个重大差异。

#### import命令加载CommonJS模块

CommonJS 模块的输出都定义在 `module.exports` 这个属性上面。`Node` 的 `import` 命令加载 CommonJS 模块，Node 会自动将 `module.exports` 属性，当作模块的默认输出，即等同于 `export default` 。

::: code-group
```js [foo.js]
module.exports = function () {
  console.log('hello world')
}
```
```js [main.js]
import foo from './foo.js'
foo() // hello world
```
:::

由于 ES6 模块是编译时确定输出接口，CommonJS 模块是运行时确定输出接口，所以采用 `import` 命令加载 CommonJS 模块时，不允许采用下面的写法。

```js
// 报错
import { readFile } from 'fs'
```

#### require命令加载ES6模块

采用 `require` 命令加载 ES6 模块，ES6 模块的所有输出接口都会成为输入对象的属性。

::: code-group
```js [es.mjs]
let foo = { bar: 'my-default' }
export default foo
export let baz = 'my-baz'
export function f() {
  console.log('my-f')
}
```
```js [cjs.mjs]
const es_namespace = require('./es')
console.log(es_namespace.default) // { bar:'my-default' }
console.log(es_namespace.baz) // 'my-baz'
es_namespace.f() // 'my-f'
```
:::

由于 ES6 模块的 `this` 指向 `undefined` ，所以采用 `require` 命令加载 ES6 模块时，不能将 `this` 变量指向 `this` 模块，即不能使用 `this` 变量。

### 循环加载

循环加载指的是 a 脚本依赖 b 脚本，吧、脚本的执行又依赖 a 脚本。通常情况下循环加载存在较强的耦合性。如果处理不好会导致递归加载，使得程序陷入死循环。但实际上该情况很难避免，尤其大型项目很容易出现这种情况。

目前最常见的两种模块 CommonJs 和 ES6 在处理方法也是不同的，返回的值也不一样。

#### CommonJS模块的循环加载

首先看看 CommonJs 模块格式的加载原理，一个模块就是一个脚本，`require` 命令第一次加载该脚本时就会执行整个脚本，然后在内存中生成一个对象。也就是说， CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载时就返回第 次运行的结果，除非手动清除系统缓存。

CommonJS 模块的重要特性是加载时执行，即脚本代码在 `require` 的时候就会全部执行。一旦出现某个模块被“循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。

::: code-group
```js [a.js]
exports.done = false
var b = require('.b.js')
console.log('a', b.done)
exports.done = true
console.log('a.js执行完毕')
```
```js [b.js]
exports.done = false
var a = require('./a.js')
console.log('b', a.done)
exports.done = true
console.log('b.js执行完毕')
```
```js [main.js]
var a = require('./a.js')
var b = require('./b.js')
console.log('a、b都执行完毕', a.done, b.done)
```
:::

上方代码首先执行 a脚本，执行了一行之后要执行 b 脚本，执行了一行后又要加载 a脚本，此时就发生循环加载，系统会去 a 脚本对应对象的 `exports` 中取值，由于a脚本只执行了一行，还没有执行到 `exports.done = true`，因此从 `exports` 中取到的值是 `false`。然后继续执行b脚本，b脚本执行完毕后，a 脚本继续执行，最后输出a脚本执行完毕。

最后执行完打印如下：
```
b false
b.js执行完毕
a true
a.js执行完毕
a、b都执行完毕 true true
```

另外，由于 CommonJs 模块遇到循环加载时返回的是当前已经执行的部分的值，而不是代码全部执行后的值，导致循环加载时，取到的值是不完整的，所以 输入变量时要很小心。

```js
var a = require('a') // safe
var b = require('b').b // unsafe

exports.good = function(arg) {
  return a.foo('good', arg) // 使用a的最新值
}
exports.bad = function(arg) {
  return foo('good', arg) // 使用部分加载时的值
}
```

#### ES6模块的循环加载

ES6 模块是动态引用，如果使用 `import` 命令加载一个变量，这个变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

::: code-group
```js [a.js]
import {bar} from './b.js'
console.log('a.js')
console.log(bar)
export let foo = 'foo'
```
```js [b.js]
import {foo} from './a.js'
console.log('b.js')
console.log(foo)
export let bar = 'bar'
```
:::

上方代码首先执行 `a.js` ，然后依赖 `b.js` ，开始执行 `b.js` ，`b.js` 第一行要执行 `a.js`，由于 `a.js` 已经开始执行了，所以不会重复执行，继续执行 `b.js`。执行打印结果如下：

```
b.js
undefined
a.js
bar
```

### ES6模块的转码

早期 ES6 模块浏览器还不支持，为了实现快速使用，可以通过 `babel` 转码器将 ES6 模块转为 ES5 的写法。

### 总结

在浏览器中，ES6 模块可以通过 `<script type="module">` 标签加载，支持异步加载且不会阻塞渲染，改善了传统 `<script>` 标签同步加载导致的性能问题。模块内的代码运行在模块作用域，顶层 `this` 返回 `undefined`，模块自动采用严格模式。与 CommonJS 模块不同，ES6 模块输出的是值的引用，且在编译时确定输出接口，而 CommonJS 模块输出的是值的拷贝，且在运行时确定输出接口。

`Node.js` 中，ES6 模块和 CommonJS 模块不兼容，`Node.js` 通过文件扩展名和`package.json`的`"type"`字段来确定模块类型。`Node.js` 支持 `import` 命令加载 CommonJS 模块，将 `module.exports` 作为默认输出。而 `require` 命令加载 ES6 模块时，所有导出的接口都会成为输入对象的属性。

循环加载是模块系统中的一个常见问题，CommonJS 和 ES6 模块处理循环加载的方式不同。CommonJS 模块在第一次加载时执行，后续加载返回第一次执行的结果；ES6 模块则动态引用被加载模块的值，需要确保取值时变量已初始化。
