# ES6标准入门 第3版(阮一峰)

《ES6 标准入门 第3版(阮一峰)》这本书主要讲述了 ECMAScript 6（ES6）新的语法特性和功能。以下是这本书涵盖的一些主要内容：

1. **let 和 const**: 介绍了 `let` 和 `const` 关键字用于声明变量的特性，以及它们与 `var` 的区别。
2. **解构赋值**: 讲解了解构赋值语法，可以方便地从数组和对象中提取数据并赋值给变量。
3. **箭头函数**: 引入了箭头函数语法，简化了函数的定义方式，并改变了函数内部 `this` 的指向。
4. **模板字符串**: 介绍了模板字符串，可以方便地拼接字符串和嵌入变量。
5. **扩展运算符和剩余参数**: 讲解了扩展运算符 `...` 和剩余参数的使用，可以方便地操作数组和函数参数。
6. **Promise**: 详细介绍了 Promise 对象，用于处理异步操作，解决了回调地狱的问题。
7. **Generator 函数**: 探讨了 Generator 函数的概念和用法，以及如何通过迭代器控制函数的执行流程。
8. **模块化**: 介绍了 ES6 模块化的语法，包括 `export` 和 `import`，帮助管理和组织代码。
9. **Class**: 讲解了 ES6 中引入的类（class）语法糖，更加直观地实现面向对象编程。
10. **其他新增特性**: 还包括对数组方法、对象属性简写、Symbol、Set 和 Map 等新特性的介绍。

感谢阮一峰老师的著作，下面开始拜读，并且每一个模块都附上总结。

## 第一章 ECMAScript6简介

### 由来

第一章第一节讲述了 ES6 这个名称的由来，首先需要理清 ECMAScript 和 Javascript 的关系。在最开始 Javascript 不叫 Javascript，而是叫 ECMAScript。因此，**ECMAScript 是 Javascript 的规格，Javascript 是 ECMAScript 的一种实现**。

### 含义

2011年， ECMAScript 5.1 版本发布后，6.0 版本开始制定，这个版本改动较大，制定者希望能够6.1、6.2、6.3持续推进，最终决定每年6月更新发布一次标准版本。2016年6月，发布了 ECMAScript 6.0 版本。

> 因此，ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版本以后的 JavaScript 的下一代 标准，涵盖了 ES2015、 ES2016、 ES2017 等，而 ES2015 则是正式名称，特指当年发布的正式 版本的语言标准 。

### 提案批准流程

- Stage 0: Strawman (展示阶段)
- Stage I : Proposal (征求意见阶段)
- Stage 2: Draft (草案阶段)
- Stage 3: Candidate (候选阶段)
- Stage 4: Finished (定案阶段)

### 历史

ES6从开始制定到最后发布用了整整15年。1997年发布的ES1.0是第一个版本，随后连续发布了ES2.0和ES3.0。ES3.0成为通行标准，奠定了JavaScript语言的基本语法。

在2000年，ES4.0开始酝酿，但最后没有通过。ES6制定的起点其实可以追溯到2000年。ES4.0没有通过是因为该版本对ES3.0做了彻底升级，导致标准委员会的一些成员不愿意接受。

2008年，ECMA决定中止ES4.0的开发，并将其中涉及现有功能改善的部分发布为ES3.1，其他激进设想放入以后的版本。

2009年，ES5.0发布，而ES Harmony继续发展成为ES6。2015年，ES6正式通过成为国际标准。整个过程历时15年。

### Babel

`babel.js` 是 ES6 转码器，在浏览器不支持 ES6 语法时转码为 ES5 ，这样就能执行了，下面是一个简单的例子：

- 转码前：

  ```js
  let arr = []
  arr.map(item => item.id + 1)
  ```

- 转码后：

  ```js
  var arr = []
  arr.map(function (item) {
    return item.id + 1
  })
  ```

其中阮一峰老师从以下几个方面介绍讲解起了 `babel` ：

- 配置文件 `.babelrc` 

  这是放置在项目根目录中，用于设置转码规则和插件，其基本格式为：

  ```js
  {
    "presets": [],
    "plugins": []
  }
  ```

  `presets` 用于设定转码规则，通过 `npm` 下载依赖，下载后在 `presets` 数组中添加对应的规则。例子如下：

  ```js
  {
    "presets": [
      "latest",
      "react",
      "stage-2",
    ],
    "plugins": []
  }
  ```

  > 注意
  >
  > 要想使用以下所有 Babel 工具和模块，都必须先写好 .babelrc。

- 命令行转码 `babel-cli` 

  Babel 提供 `babel-cli` 工具，用于命令行转码 。使用方式如下：

  1. 下载依赖

     ```bash
     npm i --save-dev babel-cli
     ```

  2. 改写 `package.json` 文件

     ```json
     {
       // ...
       "devDependencies": {
         "babel-cli": "^6.0.0"
       },
       "scripts": {
         "build": "babel src -d lib"
       }
     }
     ```

  3. 打包转码

     ```bash
     npm run build
     ```

- babel-node

  这是 `babel-cli` 自带的命令，用于提供支持 ES6 的 REPL 环境，直接运行 ES6 代码。

- babel-register

  修改 `require` 命令，后续使用 `require` 加载 `.js` 、`jsx` 、`.es` 和 `.es6` 文件时，会优先使用 `babel` 转码。

  > 注意!
  >
  > `babel-register` 只会对 `require` 命令加载的文件进行转码，而不会对当前文件进行转码 。 另外，由于它是实时转码，所以只适合在开发环境中使用 。

- babel-core

  对需要的某模块代码转码。

  下载依赖：

  ```bash
  npm install babel- core --save
  ```

  使用示例：

  ```js
  var es6Code = 'let x = n => n + 1' 
  var esSCode = require('babel-core').transform (es6Code, { presets: [' latest']}).code;
  ```

- babel-polyfill

  Babel 默认只转换新的 `JavaScript` 句法( `syntax` )，而不转换新的 API，如 `Iterator`、 `Generator`、 `Set`、 `Maps` 、 `Proxy`、 `Reflect`、 `Symbol`、 `Promise` 等全局对象，以及一些 定义在全局对象上的方法(如 `Object.assign` )都不会转码。

  想让上述的方法运行，必须使用 `babel-polyfill` 为当前环境提供一个垫片。

### Traceur

`Traceur` 是Google 公司的转码器 也可 以将 ES6 代码转为 ES5 代码。具体使用此处不做过多描述。

### 总结

第一章整体为我们讲解了 javascript 的历史和发展史，以及 ES6 广义和狭义的含义。在浏览器不支持 ES6 新语法时如何使用 babel 转成 ES5 等。

## 第二章 Let 和 const 命令

第二章分别讲解了 `let` 和 `const` 两个用于声明变量的命令。并介绍了他们与 `var` 之间的异同点。下面来分别依次介绍。

### let 命令

书中从 基础用法、变量提升、暂时性死区、重复声明 四个方面做了讲解。

#### 基础用法

`let` 用于声明变量，与 `var` 相比，`let` 声明的变量只在代码块内有效；`var` 声明的变量在全局范围内都有效。这是一个作用域的概念，这个在后续更详细介绍。

有一个经典的 bug 如下：

```js
for (var i = 0; i < 10; i ++) {
  a[i] = function() {
    console.log(i)
  };
}
a[6]() // 10
console.log(i) // 10。var 声明的，在全局范围内都有效，所以全局只有 一个变量 i。 每一次循环，变量 i 的值都会发生改变，而循环内，被赋给数组 a 的函数内部的 console.log(i)中的 i 指向全局的 i。也就是说，所有数组 a 的成员中的 i 指向的都是同一个 i，导致运行时输出的是最后一轮的 i 值，也就是 10

// ------------------------------------

for (let i = 0; i < 10; i ++) {
  a[i] = function() {
    console.log(i)
  };
}
a[6]() // 5
console.log(i) // i is not defind
```

#### 变量提升

`var` 存在变量提升的现象，即变量可以在声明之前使用，值为 `undefined` 。

`let` 命令改变了语法行为，它所声明的变量一定要在声明后使用，否则便会报错。也就是说，`let` 不允许变量提升行为。

```js
// var的情况
console.log (foo); // 输出 undefined
var foo = 2;

// let的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

#### 暂时性死区

若在块级作用域中存在 `let` 命令，它声明的变量就 “绑定” 这个区域，不再受外部影响。

ES6 规定，若使用 `let` 和 `const` 声明变量，则在变量声明前都不可使用该变量，否则报错。在语法上被称为暂时性死区( temporal dead zone，简称 TDZ)。示例代码如下：

```js
while (true) {
  // TDZ 开始
	tmp = 'abc'; // ReferenceError
  console.log (tmp); // ReferenceError
  
  let tmp; // TDZ结束
  console.log (tmp) ; // undefined
 
  tmp = 123;
  console.log(tmp); // 123
}
```

有一些死区比较隐蔽，如：

```js
function (x = y, y = 2) {
  console.log(x); // ReferenceError。因为x用到了y变量赋值，而y变量在其后面声明，因此是死区
}

let x = x // ReferenceError
```

> 本质
>
> 只要进入当前作用域，所要使用的变量就己经存在，但是 **不可获取**，只有等到声明变量的那 一行代码出现 ，才可以获取和使用该变量。

#### 重复声明

`let` 相比 `var` ，还有一个不同点是不允许重复声明。

```js
var a = 1;
var a = 2;
console.log(a); // 2

let b = 1;
let b = 2; // 报错
```

### 作用域

作用域包含了 作用域作用、ES6的块级作用域、块级作用域与函数声明、do表达式 四个模块进行讲述。

#### 作用域作用

阮一峰老师从 ES5 的作用域 入手，通过对比解释了 ES6 作用域的作用。在 ES5 中，只存在 **全局作用域** 和 **函数作用域** 两种，很多场景都显得很不合理。如：

- 场景一：内部变量覆盖外部变量

  ```js
  var a = 1;
  
  if (true) {
    var a = 2;
  }
  
  console.log(a); // 2
  ```

- 场景二：循环变量全局泄漏

  ```js
  for (var i = 0; i <= 3; i++) {
    // ...
  }
  console.log(i); // 4
  ```

#### ES6 的块级作用域

`let` 为 javascript 提供了块级作用域。外层作用域无法访问内层作用域的变量；内层作用域可以定义外层作用域同名变量且不会覆盖。

```js
let a = 1;

if (true) {
  let a = 2;
  console.log(a); // 2
}
console.log(a); // 1
```

> 拓展
>
> 在 ES6 块级作用域出来前，想要实现上述方案，需要用到立即执行函数（IIFE），代码如下：
>
> ```js
> (function () {
>   var tmp = '...'
>   // ...
> })
> ```
>
> 块级作用域的出现让立即执行函数的写法不再必要。

#### 块级作用域与函数声明

在ES5中，函数只能在顶层作用域和函数作用域中声明，不能在块级作用域中声明。但是由于浏览器的兼容性考虑，在一些旧的浏览器中，函数声明在块级作用域中仍然是有效的。

ES6引入了块级作用域，并明确允许在块级作用域中声明函数。在ES6规定中，块级作用域内声明的函数的行为类似于使用let声明的变量，只在块级作用域内有效，对作用域之外没有影响。

然而，在实际运行中，不同的浏览器对于块级作用域内函数声明的处理方式可能不同。ES6规范允许浏览器的实现可以不遵守块级作用域内函数声明的规定，而有自己的行为方式。具体来说，这些浏览器会将块级作用域内的函数声明提升到全局作用域或函数作用域的头部。

>  总结
>
> - 在ES5中，函数不能在块级作用域中声明，但一些浏览器为了兼容性支持在块级作用域中声明函数。
> - 在ES6中，函数可以在块级作用域中声明，但不同浏览器对此的处理方式可能不同。

为了避免代码的可读性和兼容性问题，应该避免在块级作用域内声明函数。如果确实需要，建议在块级作用域中使用函数表达式或箭头函数来代替函数声明。

```js
{
  let a = 1;
  let f = function () {
    // ...
  }
}
```

在ES6中，块级作用域允许声明函数的规则只在使用大括号的情况下成立。如果没有使用大括号，就会导致语法错误。

具体来说：

- 在使用大括号包裹的块级作用域内声明函数是有效的。
- 在没有使用大括号包裹的情况下声明函数会导致语法错误。

```js
if (true) {
  function f() {} // 不报错
}

if (true) function f() {} // 报错
```

因此，需要注意在ES6中声明函数时，确保在块级作用域内使用大括号来包裹函数声明，以避免出现语法错误。

#### do表达式

在ES6中，块级作用域引入了let和const关键字，使得在代码块中声明的变量可以在该代码块外部使用。但是，由于块级作用域没有返回值，当我们需要在代码块外部获取代码块中计算结果时，就需要将变量定义在全局作用域中。

为了解决这个问题，提案(do expressions)提出了一种新的语法形式：do表达式。使用do表达式可以将一段代码块封装成一个表达式，并且可以在该表达式后直接返回一个值。因此，我们可以使用do表达式来获得代码块中的计算结果，并将其赋值给变量。

例如，假设我们需要计算一个数的平方并加上另一个数，我们可以使用如下的代码：

```javascript
let t = 2;
let l = 3;
let r = do {
  let x = t * t;
  x + l;
}
console.log(r); // 输出 7
```

以上代码中，我们使用do表达式将两个操作封装在一起，并将计算结果赋值给变量r。最终，我们可以在代码块外部获取变量r的值。

### const 命令

书中从 基本用法、本质、声明变量的6种方法 三个方向做了详细介绍，其中：

#### 基本用法

1. `const` 声明的是一个只读的常量，声明后该变量不可改变
2. `const` 声明常量不可改变，因此在声明时就必须立即初始化，否则报错
3. `const` 声明的变量不存在变量提升，同时也存在暂时性死区

```js
const a = 1;
a = 2; // TypeError: Assignment to constant variable

const foo; // SyntaxError: Missing initializer in const declaration

console.log(tmp); // ReferenceError
const tmp = 123;
```

#### 本质

const关键字实际上保证的是变量指向的内存地址不得改动，对于简单类型的数据（如数值、字符串、布尔值），其值保存在变量指向的内存地址中，因此等同于常量。

但是对于复合类型的数据（主要是对象和数组），变量指向的内存地址保存的只是一个指针，因此 `const` 只能保证这个指针是固定的，至于它指向的数据结构是否可变，这完全不能控制。

因此，当将一个对象声明为常量时必须非常小心。例如：

```javascript
const foo = {};
// 为foo添加一个属性，可以成功
foo.prop = 123;
console.log(foo.prop); // 输出 123

// 将foo指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

上面的代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

另外，如果真的想将对象冻结，应该使用 `Object.freeze` 方法。例如：

```javascript
const foo = Object.freeze({});
// 在严格模式下，下面一行会报错
foo.prop = 123;
```

除了将对象本身冻结，对象的属性也应该冻结。以下是一个将对象彻底冻结的函数：

```javascript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key]);
    }
  });
};
```

这样，通过调用constantize函数，可以彻底冻结一个对象及其所有属性。

#### ES6 声明变量的6种方法

ES5中只有两种声明变量的方法：使用 `var` 命令和 `function` 命令。而 ES6 除了添加了 `let` 和 `const` 命令之外，还引入了 `import` 命令和 `class` 命令用于声明变量。

因此，ES6一共有6种声明变量的方法：var、function、let、const、import和class。

### 顶层对象属性

在ES5中，顶层对象的属性与全局变量是等价的，即顶层对象的属性赋值与全局变量的赋值是同一件事。这种设计被认为是JavaScript语言中最大的设计败笔之一，因为会导致无法在编译时提示未声明变量、容易不知不觉地创建全局变量以及不利于模块化编程。

为了改变这一点，ES6做出了规定：`var` 命令和 `function` 命令声明的全局变量依旧是顶层对象的属性，但 `let` 命令、`const` 命令、`class` 命令声明的全局变量不再是顶层对象的属性。从ES6开始，全局变量逐渐与顶层对象的属性隔离。

举例来说，使用var声明的全局变量会成为顶层对象的属性，而使用let声明的全局变量则不会成为顶层对象的属性，返回undefined。这样的设计改变了全局变量与顶层对象属性之间的关系，使得代码更加清晰和可靠。

```js
var a = 1;
window.a // 1。如果是在 node 环境中，可写成 global.a 或 this.a

let b = 2;
window.b // undefined
```

### global 对象

ES5 顶层对象也有不统一的问题，其中：

- 在浏览器中，顶层对象是 `window` 和 `self` 
- 在 Web Worker 中，顶层对象是 `self` 
- 在 Node 中，顶层对象是 `global` 

目前为了能在各种环境中获取顶层对象，通用方法是使用 `this` 变量，但是这也有缺点：

- 在全局环境中，this会返回顶层对象，但在Node模块和ES6模块中，this会返回当前模块
- 对于函数中的this，如果函数不是作为对象的方法运行，则this会指向顶层对象，但在严格模式下会返回undefined。
- new Function('return this')()无论在何种模式下都会返回全局对象。

然而，在各种情况下找到一个通用的方法来获取顶层对象是很困难的。目前有一个提案在语言标准中引入 `global` 作为顶层对象，可以在所有环境下拿到顶层对象。同时，垫片库`system.global` 可以模拟这个提案，保证在各种环境下 `global` 对象都是存在的。

### 总结

第二章从 ES6 推出的 `let` 和 `const` 着手，讲解了他们和 `var` 之间的区别，如不存在变量提升、暂时性死区、不可重复声明、作用域等。

其中作用域阮一峰老师也展开讲解，ES6 与 ES5 相比多了一个块级作用域，其作用是为了解决 **内部变量覆盖外部变量** 和 **循环变量全局泄漏** 。

最后聊到了 顶层变量 ，在浏览器、Web Worker 和 Node 中，他们各自的顶层变量都不相同，为了解决这一现象，有人提出了引入 `global` 垫片方案。

## 第三章 变量的解构赋值

这一章节阮一峰老师主要讲解 **解构** 的知识点，分别从 数组、对象、字符串、数值和布尔值、函数参数 等方向着手，讲解它们的使用方式。最后还谈了解构的问题与用途。

### 数组的解构赋值

书中从 基本用法、默认值 两个方面谈数组的解构。

#### 基本用法

ES6 允许从数组和对象中按照一定模式获取值并赋值给变量，这一行为被称为解构赋值，其写法如下：

```js
let [a, b, c] = [1, 2, 3]
console.log(a,b,c) // 1,2,3
```

本质上是遵循 “模式匹配” 原则，只要等式两边模式相等，就可以对应赋值。如：

```js
let [a, [[b], c]] = [1, [[2], 3]]
console.log(a,b,c) // 1,2,3
```

若解构不成功或者对应位置没有值，则变量的值会等于 `undefined` ；若解构不完全（即等式右边的值比左侧多），则会正常解构赋值。示例代码如下：

```js
// 解构不成功
let [a, b] = [1]
console.log(a,b) // 1,undefined

// 解构不完全
let [a, [[b], c]] = [1, [[2,3], 4]]
console.log(a,b,c) // 1,2,4
```

如果等式右侧是不允许遍历的解构，则会直接报错。

```js
// 不可以解构，会报错
let [tmp] = 1
let [tmp] = false
let [tmp] = NaN
let [tmp] = undefined
let [tmp] = null
let [tmp] = {}

// Set 允许解构，本质是可以遍历的
let [tmp, foo] = new Set(['1', '2'])
console.log(tmp, foo) // '1', '2'
```

#### 默认值

解构赋值允许设置默认值。ES6 内部严格使用相等运算符判断该位置是否有值，只有 `=== undefined` 才会把默认值赋值给变量。示例代码如下：

```js
let [a, b, c] = [1, , null]
console.log(a,b,c) // 1,undefined,null
```

若使用表达式作为默认值，则该表达式是惰性的，在需要使用时才会执行。

```js
function f() {
  return 1
}

let [x = f()] = [2]

// 上方代码可以等价替换为如下形式

let x
if ([2][0] === undefined) {
  x = f()
} else {
  x = [2][0]
}
```

默认值也可以设置为其他变量，前提是该变量必须已经声明，否则会报错。

```js
let [x = 1, y = x] = [2] // x=2,y=2
let [x = 1, y = x] = [1, 2] // x=1,y=2
let [x = y, y = 2] = [2] // 2,2 这里没用到y，所以没报错
let [x = y, y = 2] = [] // 报错
```

### 对象的解构赋值

与数组一样，对象也可以使用解构。

数组解构需要讲究顺序一一对应，对象解构没有顺序要求，有名称要求，需要名称一一对应。

同样的，如果解构没有对应的值，则会赋值 `undefined` 。

```js
let {a, b, c} = {a: 1, b: 3}
console.log(a,b,c) // 1,3,undefined
```

对象解构同样允许多层数组对象嵌套解构，示例代码如下：

```js
let {a, b, b: [, {c}]} = {a: 1, b: [2, {c: 3}]}
console.log(a,b,c) // 1, [2,{c:3}], 3
```

上方代码中， `b: [...]` 的写法表示的是在 `b` 是匹配模式，冒号后面才是真正要赋值的变量。

对象解构也可以赋值默认值，与数组解构相同的，可以赋值变量，但是必须是已声明的变量。

```js
let {a = 1, b = a} = {b: 3}
console.log(a,b) // 1,3
```

解构赋值可以给一个已存在的变量赋值。

```js
let obj = {}

let {foo: obj.props} = {foo: {num:1, type: 2}}
console.log(obj) // {props: {num: 1, type: 2}}
```

如果要将已经声明的变量用于解构赋值，需要小心避免将大括号写在行首，以避免被 JavaScript 引擎误解为代码块而导致语法错误。正确的做法是将整个解构赋值语句放在圆括号里面。

```js
let str
{str} = {str: 'daodao'} //  SyntaxError: syntax error 

// 正确写法
let str
({str} = {str: 'daodao'})
```

由于数组本质是特殊的对象 因此可以对数组进行对象属性的解构。

```js
 let arr = [l, 2 , 3]
 let {0: first, [arr.length - l]: last} = arr;  first // 1
 last // 3
```

上面的代码对数组进行对象解构 数组 `arr` 键对应的值是 1, `[arr.length - 1]` 对应的值是 3。 

### 字符串的解构赋值

字符串可以转换成类似数组的对象，因此可以对其解构。

```js
const [a,b,c,d,e] = 'daodao'
console.log(a,b,c,d,e) // d,a,o,d,a
```

同样的，类似数组的对象也有 `length` 属性，因此也可以对该属性解构。

```js
const {length: len} = 'daodao'
console.log(len) // 6
```

### 数值和布尔值的解构赋值

解构赋值时，如果等号右侧是数值型或布尔值型，会先转为对象。

```js
let {toString: a} = 123
a === Number.prototype.toString // true

let {toString: a} = false
a === Boolean.prototype.toString // true
```

> 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于 `undefined` 、 `null` 无法转为对象，所以对它们进行解构赋值时都会报错。

### 函数参数的解构赋值

对于函数的参数，可以使用解构赋值的方式来提取数组或对象中的值。通过解构赋值，可以更方便地获取传入参数的值并在函数体内使用。

```js
[[1,2], [3,4]].map(([x, y]) => x + y) // [3, 7]
```

函数参数解构赋值中可以设置默认值。通过在解构赋值语法中设置默认值，可以确保在未传入参数或传入 `undefined` 时，变量能够取到默认值。

```js
function fn({x = 0, y = 0} = {}) {
  return [x, y]
}

fn({x: 3, y:8}) // [3, 8]
fn({x: 3}) // [3, 0]
fn({}) // [0, 0]
fn() // [0, 0]
```

若修改写法，则是给整个函数设置默认值，结果也会不一样。

```js
function fn({x, y} = {x = 0, y = 0}) {
  return [x, y]
}

fn({x: 3, y:8}) // [3, 8]
fn({x: 3}) // [3, undefined]
fn({}) // [undefined, undefined]
fn() // [0, 0]
```

当传入参数中出现 `undefined` 时触发函数参数默认值。

```js
[1, , 3].map((x = 'undefined') => x) // [1, 'undefined', 3]
```

### 圆括号问题

圆括号有可能会导致解构赋值产生歧义，因此 ES6 作了规定：赋值语句允许添加括号，声明语句不允许添加括号。

```js
// 赋值语句
[(b)] = {3}
({p: (d)} = {})
[(obj.prop)] = [3]

// 声明语句
let [(a)]= [1]; 
let {x: (c)} = {} ; 
let ({x: c}) = {}; 
let {(x: c)} = {); 
let {(x): c} = {}; 
let {o: ({p: p })} = { o: { p: 2 J } ; 
```

### 用途

解构赋值在现实生产环境中有很多实用的用途，阮一峰老师在书中罗列了几点：

1. 交换值

   在之前交换值需要使用到中间变量，其实通过解构赋值也能做到。

   ```js
   let x = 1
   let y = 2
   [x, y] = [y, x]
   ```

2. 函数返回多个值

   函数 `return` 只能返回一个值，若有多个值需要通过数组或对象的形式返回。解构可以获取到需要的值。

   ```js
   function fn1() {
     return [1,2,3,4]
   }
   const [a, , c] = fn1()
   
   function fn2() {
     return {
       bar: 1,
       foo: 2
     }
   }
   const {bar} = fn2()
   ```

3. 函数参数定义

   解构赋值可以方便地将一组参数与变量名对应起来。

   ```js
   // 有序
   function fn([x, y, z]) {
     // ...
   }
   fn([1, 2, 3])
   
   // 无序
   function fn({x, y, z}) {
     // ...
   }
   fn({x: 4, y: 5, z: 6})
   ```

4. 提取 JSON 数据

   可以通过解构快速提取 JSON 格式的数据。

   ```js
   let data = {
     id: 1,
     name: 'dd',
     num: [113, 24]
   }
   
   let {id, name, num} = data
   ```

5. 函数参数默认值

   函数参数可以通过解构设置默认值，不再需要额外赋值操作。

   ```js
   function fn({
     url: 'xxxxxxx',
     method: 'post'
   }) {}
   ```

6. 遍历 Map 结构

   Map 可以使用 `for...of...` 循环遍历，配合解构获取键名和键值就很方便。

   ```js
   let map = new Map([
     ['first', '1'],
     ['second', '2'],
   ])
   
   for(let [key, value] of map) {
     console.log('key:' + key, 'value:' + value)
   }
   ```

7. 模块指定方法

   加载模块时，往往需要指定输入的方法。解构赋值使得输入语句非常清晰

   ```js
   const { SourceMapConsumer, SourceNode } = require('source-map');
   ```

### 总结

阮一峰老师在这一章节主要讲解了解构赋值的知识点，包括对数组、对象、字符串、数值和布尔值、函数参数等进行解构赋值的使用方式，并说明了解构赋值的问题和用途。

- 在数组的解构赋值中，可以利用模式匹配原则对数组进行赋值，同时也可以设置默认值，并且可以给已存在的变量赋值。
- 对象的解构赋值不需要考虑顺序，只需保证名称对应即可，同样可以设置默认值，并可以将已存在的变量用于解构赋值。
- 字符串也可以通过解构赋值的方式进行赋值。
- 数值和布尔值在解构赋值时会先转为对象。
- 函数参数的解构赋值可以方便地获取传入参数的值，并可以设置默认值。
- 圆括号有可能会导致解构赋值产生歧义，在赋值语句中可以添加括号，但在声明语句中不允许添加括号。

此外，解构赋值在实际生产环境中有很多实用的用途，包括交换值、函数返回多个值、函数参数定义、提取 JSON 数据、函数参数默认值、遍历 Map 结构、以及模块指定方法等。

## 第四章 字符串的扩展

### 字符的 Unicode 表示法

### codePointAt()

### String.fromCodePoint()

### 字符串的遍历器接口

### at()

### normalize()

### includes()、 startsWith()、endsWith()