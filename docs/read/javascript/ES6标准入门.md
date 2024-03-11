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

ES6 为字符串扩展了方法对象，本章节主要对这些方法对象做详细地讲述。

### 字符的 Unicode 表示法

JavaScript中可以使用 `\uxxxx` 形式表示一个字符，其中 `xxxx` 代表字符的 Unicode 码点，但是这种表示法只适用于码点在 `\u0000` 到 `\uFFFF` 之间的字符。对于超出这个范围的字符，需要使用双字节的形式来表示，例如 `\uD842\uDFB7` 表示字符 `𠮷`。

在ES6中，可以通过将码点放入大括号来正确解读超出`\uFFFF`范围的字符，例如 `\u{20BB7}` 表示字符 `𠮷`。

```js
'\uD842\uDFB7' === '\u{20BB7}' // true
```

> 大括号表示法与四字节的 UTF-16 编码是等价的。

除了`\uXXXX` 和大括号表示法外，JavaScript还有其他几种表示字符的方法，包括`\z`、`\x7A`、`\u007A`等，它们都可以表示字符`z`。

### codePointAt()

JavaScript 内部以 UTF-16 格式储存字符，每个字符固定为 2 个字节。对于 Unicode 码点大于 `0xFFFF` 的字符，JavaScript 会将它们视为 2 个字符来处理，且 `charAt` 方法无法读取整个字符；`charCodeAt` 方法只能返回前 2个 字节和后 2 个字节。

```js
let s = '𠮷'

s.length // 2
s.chartAt(0) // ''
s.chartAt(1) // ''
s.charCodeAt(0) // '55362'
s.charCodeAt(1) // '57271'
```

ES6 提供了 `codePointAt` 方法来处理 4 字节（即 2 个字节）储存的字符，能够返回正确的码点值。该方法返回的是码点的十进制值，需要使用 `toString` 方法将其转换为十六进制值。

```js
let s = '𠮷a'

// 十进制
s.codePointAt(0) // '134071'
s.codePointAt(1) // '57271'
s.codePointAt(2) // '97'

// 十六进制
s.codePointAt(0).toString(16) // '20bb7'
s.codePointAt(2).toString(16) // '61'
```

`codePointAt` 方法的参数仍不正确，字符 `a` 理应是 1，但是必须传 2。可以使用 for ... of 循环来正确处理 32 位的 UTF-16 字符。

```js
let s = '𠮷a'

for(let str of s) {
  console.log(str.codePointAt(O).toString(16)); 
}
// 20bb7
// 61
```

`codePointAt` 方法也可以判断一个字符是否由 2 个字节还是 4 字节组成。

```js
'a'.codePointAt > 0xFFFF // false
'𠮷'.codePointAt > 0xFFFF // true
```

### String.fromCodePoint()

在 ES5 中，使用 `String.fromCharCode` 方法无法正确识别大于 `0xFFFF` 的码点（即 32 位的 UTF-16 字符）。这会导致高位被舍弃，返回错误的字符。

ES6 引入了 `String.fromCodePoint` 方法，可以正确识别大于 `0xFFFF` 的码点，解决了 `String.fromCharCode` 方法的限制。`String.fromCodePoint` 方法可以接收多个参数，将它们合并成一个字符串返回。

```js
String.fromCodePoint(0x20BB7) // 𠮷
```

> `String.fromCodePoint` 在作用上与 `codePointAt` 相反。
>
> `fromCodePoint` 方法定义在 `String` 对象上，而 `codePointAt` 方法定义在字符串的 实例对象上。

### 字符串的遍历器接口

ES6 为字符串添加遍历接口，使得 `for...of...` 可以遍历字符串。

```js
let str = 'dao'

for(let k of str) {
  console.log(k)
}

// d
// a
// o
```

除此之外，这个遍历器还可以识别 `0xFFFF` 的码点，而传统的 `for` 循环无法识别。

```js
let txt = String.fromCodePoint(0x20BB7)

for(let i = 0; i < txt.length; i++) {
  console.log(txt[i]) // ''。识别失败
}

for(let k of txt) {
  console.log(k) // 𠮷
}
```

### at()

在 ES5 中，字符串对象的 charAt 方法无法正确识别码点大于 0xFFFF 的字符。它只返回 UTF-16 编码中的第一个字节，导致无法显示正确的字符。

目前有一个提案，提出了字符串实例的 at 方法，可以正确识别 Unicode 编号大于 0xFFFF 的字符，并返回正确的字符。该方法可以通过使用垫片库（例如 http://github.com/es-shims/String.prototype.at） 来实现。

### normalize()

Unicode 提供了两种方法来表示欧洲语言中的语调符号和重音符号：直接提供带重音符号的字符和使用合成字符将原始字符与重音符号合并。然而，JavaScript无法识别合成字符，导致两种表示方法在视觉和语义上不等价。

为了解决这个问题，JavaScript的字符串类型提供了normalize方法，可以将具有不同表示方法的字符统一为相同形式，即Unicode正规化。

```js
'\u01D1'.normalize() === '\uoo4F\u030C'.normalize() // true
```

normalize方法接受参数来指定不同的正规化方式，包括NFC（标准等价合成）、NFD（标准等价分解）、NFKC（兼容等价合成）和NFKD（兼容等价分解）。

需要注意的是，normalize方法不能识别由多个字符合成的情况。在这种情况下，仍然需要使用正则表达式或通过Unicode编码区间判断。

总结起来，Unicode提供了两种方法来表示欧洲语言中的语调符号和重音符号，JavaScript提供了normalize方法来实现字符的统一表示，但对于多个字符合成的情况仍需采用其他方法。

### includes()、 startsWith()、endsWith()

在之前 javascript 只能通过 `indexOf` 来判断某字符串内是否包含另一字符串的内容。ES6 提供了三个新的方法。

- `includes()` ：返回布尔值，表示该字符串内是否包含要查找的参数字符串
- `startsWith()` ：返回布尔值，表示该字符串头部是否是参数字符串
- `endsWith()` ：返回布尔值，表示该字符串尾部是否是参数字符串

他们都能接收两个参数：参数一是所要查找的字符串，参数二是开始搜索的位置。

```js
var s = 'Hello world!'; 
s.startsWith('Hello') // true 
s.endsWith('!') // true 
s.includes('o') // true

s.startsWith('world', 6) //true 
s.endsWith('Hello', 5) // true 
s.includes('Hello', 6) // false
```

### repeat()

repeat 方法用于返回一个新字符串，该字符串是原始字符串重复若干次后的结果。

```js
'x'.repeat(3) // xxx
'hello'.repeat(2) // hellohello
```

当参数为小数时，会被取整。

```js
'na'.repeat(2.9) // nana
```

然而，如果参数是负数或者 Infinity，将会报错。

```js
'na'.repeat(Infinity) // RangeError
'na'.repeat(-1) // RangeError
```

但是当参数是-0.9时，由于会先进行取整运算，所以 repeat 视同为'na'.repeat(-0)，返回空字符串 ""。

此外，参数为 NaN 时也等同于空字符串，即'na'.repeat(NaN) 返回 ""。

如果 repeat 的参数是字符串，则会先尝试将其转换成数字。

```js
'na'.repeat('na') // ''
'na'.repeat('3') // nanana
```

总结一句话，repeat 方法用于将原字符串重复指定次数，对参数进行了取整处理，并且能够处理各种类型的参数输入。

### padStart()、padEnd()

在 ES2017 中，引入了字符串补全长度的功能，包括了 padStart 和 padEnd 两个方法。

padStart 方法用于在字符串头部进行补全，而 padEnd 则用于在字符串尾部进行补全。这两个方法接受两个参数：第一个参数用来指定最小长度，第二个参数是用来补全的字符串。

如果原字符串的长度等于或大于指定的最小长度，则返回原字符串，不进行补全。如果补全的字符串与原字符串长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。

```js
'x'.padStart(6, 'dao') // daodax
'x'.padEnd(6, 'dao') // xdaoda

'x'.padEnd(6, 'xiaodao') // xxiaod
'xiaodao'.padEnd(6, 'dao') // xiaodao
```

如果省略第二个参数，则默认使用空格来补全。

```js
'x'.padStart(6) // '.     x'
```

padStart 方法常见的用途是为数值补全指定位数，例如生成固定位数的数值字符串。另外，也可以用于格式化日期字符串等，以提示字符串的格式。

```js
'12'.padStart(5, '0') // 00012

'12'.padStart(10, 'YYYY-MM-DD') // YYYY-MM-12
'09-12'.padStart(10, 'YYYY-MM-DD') // YYYY-09-12
```

总结一句话，padStart 和 padEnd 方法为字符串提供了补全长度的功能，可以用于各种不同类型的字符串格式化需求。

### 模板字符串

模板字符串可以用于创建普通字符串、多行字符串，或者在字符串中嵌入变量。在模板字符串中嵌入变量时，只需要将变量名写在`${}`中，这样就可以很方便地构建动态字符串。

```js
// 普通字符串
`hello world`

// 多行字符串
`this is line 1
this is line 2`

// 嵌入变量
let name = 'daodao', age = 24
`my name is ${name}, I'm ${age} years old`
```

此外，模板字符串还支持调用函数和嵌套。

```js
// 调用函数
function fn() {
  return 123
}
`this number is ${fn()}` // this number is 123

// 嵌套
let str = `
<ul>
	${arr.map(item => `
		<li>${item}</li>
	`).join('')}
</ul>
`
```

在模板字符串中使用反引号时，如果需要输出反引号本身，则需要使用反斜杠进行转义。另外，模板字符串内部的空格和换行会被保留在输出中，但可以使用trim()方法去除额外的空格和换行。

```js
// 转义
`my name is \` daodao \`` // `my name is ` daodao `

// 去除空格
`
<div>this is a line</div>
`.trim()
```

### String.now()

ES6引入了String.raw()方法，用于处理模板字符串。String.raw()方法充当模板字符串的处理函数，返回一个反斜线都被转义的字符串，对应于替换变量后的模板字符串。

String.raw()方法的基本使用方式是在模板字符串前面加上String.raw标签，并传入相应的参数。这些参数包括原始字符串和对应的变量值。该方法会将原始字符串中的反斜线进行转义，并将变量值插入到相应的位置。

如果原始字符串中的反斜线已经进行过转义，String.raw()不会对其进行处理。

String.raw()方法的代码实现如下：

```javascript
String.raw = function (strings, ...values) {
  var output = "";
  for (var index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }
  output += strings.raw[index];
  return output;
}
```

String.raw()方法可以作为处理模板字符串的基本方法，它会将所有变量替换，并对反斜线进行转义，方便作为字符串使用。

此外，String.raw()方法也可以作为普通函数使用。这时，它的第一个参数应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。通过这种方式，可以实现与标签模板字符串相同的效果。

总结一句话，String.raw()方法是用于处理模板字符串的工具函数，它可以对模板字符串进行转义处理，并将变量值插入到相应位置。它是ES6中字符串处理的一部分。

### 模板字符串的限制

在标签模板中嵌入其他语言时，由于模板字符串默认会对特殊字符进行转义，导致无法直接嵌入。这种情况在处理类似 LaTeX 语言的场景中尤为突出。

举例来说，当尝试在模板字符串中嵌入 LaTeX 语言时，由于JavaScript引擎会对字符串进行转义，导致一些 LaTeX 中的特殊字符被解释错误，从而报错。例如，`\unicode` 和 `\xerxes` 在 LaTeX 中是合法的命令，但在JavaScript中会被转义解析，导致报错。

为了解决这个问题，有一个提案被提出，即放松对标签模板内字符串转义的限制。根据这个提案，如果遇到不合法的字符串转义，JavaScript引擎会返回undefined而不是报错，并且可以通过raw属性获取原始字符串。

举例来说，通过放宽字符串转义限制后，在处理模板字符串时即使出现类似不合法的转义字符，JavaScript引擎不会报错，而是将其设置为undefined；同时，通过raw属性仍然可以获取到原始字符串，保证对原字符串的正确处理。

```js
function tag(strs) { 
	strs[O] ===undefined 
	strs.raw[O] ==='\\unicode and \\u{55}'; 
}
tag `\ unicode and \u{55}``
```

> 注意
>
> 这种对字符串转义的放松只在标签模板解析字符串时生效，非标签模板的场合依然会报错。

### 总结

这一章节主要介绍了 ES6 对字符串的扩展方法对象，涵盖了以下的方法：

1. Unicode 表示法：ES6 支持使用 `\u{}` 格式表示 Unicode 字符集中的字符。
2. `codePointAt()` 方法：用于获取字符串中指定位置的 Unicode 码点。
3. `String.fromCodePoint()` 方法：用于将一个或多个 Unicode 码点转化为对应的字符。
4. 字符串的遍历器接口：ES6 将字符串也视为类数组对象，支持使用 `for...of` 循环和扩展运算符进行遍历。
5. `at()` 方法：用于获取字符串中指定位置的字符。
6. `normalize()` 方法：用于将含有不同表示方式的 Unicode 字符进行统一标准化处理。
7. `includes()`、`startsWith()`、`endsWith()` 方法：分别用于判断字符串是否包含指定字符/子串、是否以指定字符/子串开头、是否以指定字符/子串结尾。
8. `repeat()` 方法：用于将字符串重复指定次数。
9. `padStart()`、`padEnd()` 方法：分别用于在字符串的开头/结尾添加指定数量的字符，用于补全字符串。
10. 模板字符串：ES6 支持使用反引号 `` 定义多行字符串，并且支持嵌入表达式。
11. `String.raw()` 方法：用于获取模板字符串中的原始字面量。
12. 模板字符串的限制：模板字符串中不能直接使用大括号 `{}` 进行运算，需要使用 `${}` 进行表达式嵌入。

这些方法和特性丰富了 JavaScript 对字符串的处理能力，使得处理 Unicode 字符、字符串补全、模板字符串等操作更加简便和灵活。

## 第五章 正则的扩展

ES6 为正则扩展了很多方法和修饰符，本章节主要对这些方法做详细地讲述。

### RegExp 构造函数

在 ES5 中，RegExp 构造函数有两种情况的参数处理方式：

1. 当参数是字符串时，第一个参数表示正则表达式的模式，第二个参数表示正则表达式的修饰符。例如：

   ```js
   var regex = new RegExp('xyz', 'l');
   // 等价于
   var regex = /xyz/l;
   ```

2. 当参数是一个正则表达式时，会返回一个原有正则表达式的拷贝。例如：

   ```js
   var regex = new RegExp(/xyz/i);
   // 等价于
   var regex = /xyz/i;
   ```

然而，ES5 不允许在第一个参数为正则表达式时，使用第二个参数添加修饰符，否则会报错。例如：

```js
var regex = new RegExp(/xyz/, 'l');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another
```

在 ES6 中，这种行为发生了变化。如果 RegExp 构造函数的第一个参数是一个正则对象，那么可以使用第二个参数来指定修饰符，并且返回的正则表达式会忽略原有正则表达式的修饰符，只使用新指定的修饰符。例如：

```js
new RegExp(/abc/g, 'i');
// 等价于 /abc/i;
```

总结一下，ES6 允许在使用正则对象作为第一个参数时，通过第二个参数来指定新的修饰符，并忽略原有正则对象的修饰符。

### 字符串的正则方法

在 ES6 中，字符串对象的方法 `match()`, `replace()`, `search()` 和 `split()` 全部调用了 RegExp 对象的实例方法，使得所有与正则表达式相关的方法都定义在 RegExp 对象上。具体来说：

- `String.prototype.match` 调用了 `RegExp.prototype[Symbol.match]` 方法。
- `String.prototype.replace` 调用了 `RegExp.prototype[Symbol.replace]` 方法。
- `String.prototype.search` 调用了 `RegExp.prototype[Symbol.search]` 方法。
- `String.prototype.split` 调用了 `RegExp.prototype[Symbol.split]` 方法。

这意味着在 ES6 中，对字符串对象调用这些方法时，实际上是通过调用相应的 RegExp 实例方法来实现的。这种变化使得正则表达式相关的方法统一定义在了 RegExp 对象上，提高了代码的一致性和可读性。

### u 修饰符

在 ES6 中，添加了 "u" 修饰符，代表"Unicode 模式"，用来正确处理大于 `\uFFFF` 的 Unicode 字符，即能正确处理超过两个字节的 UTF-16 编码字符。

举例来说：

```js
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true
```

在上面的代码中，`\uD83D\uDC2A` 是一个超过两个字节的 UTF-16 编码字符，代表一个字符。在 ES5 中不支持超过两个字节的 UTF-16 编码，会将其识别为两个字符，导致第一行代码结果为 true。而在 ES6 中使用了 "u" 修饰符，就会正确识别为一个字符，因此第一行代码结果为 false。

通过添加 "u" 修饰符，可以修改正则表达式的行为，使其能正确处理超过两个字节的 UTF-16 编码字符，确保对 Unicode 字符的处理更加准确和全面。

除此之外，以下的正则表达式行为也会得到修正：

1. 点字符

   点字符 (.) 表示除换行符以外任意单个字符，但是对于码点大于 0xFFFF 的 Unicode 字符无法识别，加上 `u` 修饰符后就可以修正。

   ```js
   let a = '𠮷'
   
   /^.$/.test(a) // false
   /^.$/u.test(a) // true
   ```

2. Unicode 字符表示法

   ES6 新增大括号内使用 Unicode 字符的表示法，如果不使用 `u` 则无法识别大括号。

   ```js
   /\u{61}/.test('a') // false
   /\u{61}/u.test('a') // true
   ```

3. 量词

   修正后，所有量词都能识别大于 0xFFFF 的Unicode 字符。

   ```js
   /a{2}/.test('aa') // true
   /a{2}/u.test('aa') // true
   /𠮷{2}/.test('𠮷𠮷') // false
   /𠮷{2}/u.test('𠮷𠮷') // true
   ```

4. 预定义模式

   同样的，`u` 也能修正预定义模式识别大于 0xFFFF 的 Unicode 字符。

   ```js
   /^\S$/.test('𠮷') // false
   /^\S$/u.test('𠮷') // true
   ```

   由此可以封装一个函数，用于返回包含大于 0xFFFF 字符的字符串长度。

   ```js
   function codePointLength(text) {
     let len = text.match(/[\s\S]/gu)
     return len ? len.length : 0
   }
   ```

5. i 修饰符

   有些字符有多个编码，通过 `u` 可以修正无法识别非规范字符的问题。

   ```js
   /[a-z]/i.test('\u212A') // false
   /[a-z]/iu.test('\u212A') // true
   ```

### y 修饰符

ES6引入的粘连修饰符"y"要求匹配必须从剩余的第一个位置开始，并且遵守lastIndex属性的指定，只有在lastIndex指定的位置发现匹配时才会成功，否则返回null。

粘连修饰符隐含了头部匹配的标志，只有紧跟前面的分隔符才会被识别。单独使用粘连修饰符对match方法只能返回第一个匹配，必须与全局修饰符"g"联用才能返回所有匹配。

粘连修饰符在从字符串中提取词元时很有用。

示例代码：

```javascript
const REGEX = /a/y ; 
// 指定从 号位直开始匹配
REGEX.lastindex = 2 ; 
// 不是粘连， 匹配失败
REGEX.exec('xaya') // null 
// 指定从3号位置开始 匹配
REGEX.lastindex = 3 ; 
// 3号位置是粘连，匹配成功
const match= REGEX.exec('xaxa'); 
match.index // 3 
REGEX.lastindex // 4

// 后续的分隔符只有紧跟前面的分隔符才会被识别
const REGEX = /a/gy;
console.log('aaxa'.replace(REGEX, '-')); // 输出：'--xa'

// 单独 修饰符对 match 方法只能返回第 个匹配，必须与 修饰符联用才能返回所有匹配
const str = 'a1a2a3';
console.log(str.match(/a\d/y)); // 输出：['a1']
console.log(str.match(/a\d/gy)); // 输出：["a1", "a2", "a3"]

// y修饰符确保了匹配之间不会有漏掉的字符
const TOKEN_Y = /\s*(\+\d+)\s*ly;
const TOKEN_G = /\s*(\+\d+)\s*lg;
console.log(tokenize(TOKEN_Y, '3 + 4 ')); // 输出：['3', '+', '4']
console.log(tokenize(TOKEN_G, '3 + 4 ')); // 输出：['3', '+', '4']

function tokenize(TOKEN_REGEX, str) {
    let result = [];
    let match;
    while (match = TOKEN_REGEX.exec(str)) {
        result.push(match[1]);
    }
    return result;
}
```

在示例代码中展示了粘连修饰符"y"的作用，包括替换字符串中的内容、匹配数字等操作，以及在提取词元时的应用。

### sticky 属性

与 `y` 修饰符相匹配，用于表示正则表达式是否设置了 `y` 修饰符，返回一个布尔值。

```js
let reg = /a/y

console.log(reg.sticky) // true
```

### flags 属性

ES5 中正则表达式有 `source` 属性，用于获取正则表达式的正文；ES6 新增了 `flags` 属性，用于获取正则表达式的修饰符。

```js
let reg = /abc/gi

reg.source // 'abc'
reg.flags // 'gi'
```

### s 修饰符：dotAll 模式

ES5 正则表达式 点符号无法识别以下4种 “行终止符”：

- U+000A 换行符 (\n)
- U+000D 回车符 (\r)
- U+2028 行分隔符 (line separator)
- U+2029 段分隔符 (paragraph separator) 

ES6 有一个提案用于解决该问题。通常情况下，点（.）可以匹配任意单个字符，但不包括行终止符。为了解决这个问题，提案引入了 `dotAll` 修饰符（s），使得点（.）可以匹配任何单个字符，包括行终止符。

使用 `dotAll` 模式和 `dotAll` 属性，可以让正则表达式处于 `dotAll` 模式下，使点（.）代表任意单个字符。示例代码如下：

```javascript
const re = /foo.bar/s;
// 或者另一种写法
// const re = new RegExp('foo.bar', 's');

console.log(re.test('foo\nbar')); // 输出 true
console.log(re.dotAll); // 输出 true
console.log(re.flags); // 输出 's'
```

同时，`dotAll` 修饰符（s）和多行修饰符（m）不会有冲突，两者可以同时使用。在这种情况下，“.”将匹配所有字符，而"^"和"$"将匹配每一行的行首和行尾。

### 后行断言

后行断言是 JavaScript 中正则表达式的一种特性，用于匹配字符串中某个位置的左侧内容。它的写法为 `/(?<=y)x/`，其中 `x` 表示要匹配的内容，`y` 表示后行断言的条件。

下面是一些使用后行断言的具体示例代码：

```javascript
// 匹配美元符号后面的数字
const regex = /(?<=\$)\d+/;
const result = regex.exec('The price is $50');
console.log(result); // 输出 ["50"]

// 匹配不在美元符号后面的数字
const regex2 = /(?<!\$)\d+/;
const result2 = regex2.exec('The price is $50');
console.log(result2); // 输出 null

// 使用后行断言进行字符串替换
const text = '$foo foo foo';
const regex3 = /(?<=\$)foo/g;
const replacedText = text.replace(regex3, 'bar');
console.log(replacedText); // 输出 "$bar foo foo"
```

需要注意的是，后行断言的执行顺序与其他正则操作相反。同时，在后行断言中，组匹配和反斜杠引用的使用方式与通常的顺序相反，需要将反斜杠引用放在对应的括号之前。

```js
/(?<=(o)d\1)r/.exec('hodor') // null 表示只有在字母 "o" 后面跟着一个重复的字母 "d" 时才匹配字母 "r"。由于字符串 "hodor" 中没有符合这个条件的位置，所以匹配结果为 null。

/(?<=\1d(o))r/.exec('hodor'）// ['r', 'o'] 表示只有在字母 "o" 前面是一个重复的字母 "d" 时才匹配字母 "r"。在字符串 "hodor" 中，字母 "o" 前面确实是一个重复的字母 "d"，所以匹配结果为 ['r', 'o']，其中第一个元素是匹配到的字符 "r"，第二个元素是后行断言中的子表达式 \1d(o) 匹配到的内容 "o"。
```

### Unicode 属性类

有一个提案 引入了 Unicode 属性类（`\p{...}`）和反向 Unicode 属性类（`\P{...}`）写法，来匹配符合特定 Unicode 属性的字符，以及一些例子来展示不同属性类的用法。

1. 匹配希腊文字母：

   ```js
   const regexGreekSymbol = /\p{Script=Greek}/u;
   console.log(regexGreekSymbol.test('pai')); // true
   ```

2. 匹配所有十进制字符：

   ```js
   const regexDecimalNumber = /<\p{Decimal Number}+/u;
   console.log(regexDecimalNumber.test('12341-$~7890123456')); // true
   ```

3. 匹配所有数字，包括罗马数字：

   ```js
   const regexNumber = /<\p{Number}+/u;
   console.log(regexNumber.test('231')); // true
   console.log(regexNumber.test('I II III IV V VI VII VIII IX')); // true
   ```

4. 匹配各种文字的所有字母：

   ```js
   const regexAlphabetic = /[<\p{Alphabetic}\p{Mark}\p{Decimal Number}.-]\p{Connector_Punctuation}\p{Join_Control}/;
   ```

5. 匹配所有的箭头字符：

   ```js
   const regexArrows = /<\p{Block=Arrows}+$/u;
   console.log(regexArrows.test('⬅️➡️⬆️⬇️')); // true
   ```

> 注意
>
> `\p{...}` 和 `\P{...}` 这两种类只对 Unicode 有效，所以使用的时候一定要加上 修饰符 如果不加 修饰符， 正则表达式使用＼ 和＼ 便会报错， ECMAScript 预留了这两个类。

### 具名组匹配

正则表达式有一个组匹配的功能，使用方法如下：

```js
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; //1999
const month = matchObj[2]; // 12
const day = match0bj[3]; // 31
```

但是有一个缺点，组的匹配含义不容易看出来 而且只能用数字序号引用，要是 **组的顺序** 变了，引用的时候就必须修改序号。

具名组匹配（Named Capture Groups）来为正则表达式中的组匹配添加ID，使得在处理匹配结果时更加清晰和方便。具名组匹配可以让我们使用组的名称而不是数字序号来引用匹配结果。

“具名组匹配” 在圆括号内部，在模式的头部添加 “问号＋尖括号＋组名” 如 `(<year>)` ，然后就可以在 exec 方法返回结果的 groups 属性上引用该组名。同时 字序号 `matchObj[1]` 依然有效。

定义具名组匹配的正则表达式：

```js
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31'); 
const year = matchObj.groups.year; // 1999 
const month = matchObj.groups.month; // 12 
const day = matchObj.groups.day; // 31 
```

通过给组匹配添加名称，我们可以更清晰地描述每个组匹配的含义，并且在处理匹配结果时可以直接通过组名来引用，而不需要关心组的顺序是否改变。

另外，如果具名组没有找到匹配，对应的 groups 对象属性会是 undefined，但是组名仍然会存在于 groups 对象中。

示例代码演示了具名组匹配未找到匹配时的情况：

```js
const RE_OPT_A = /^(?<as>a+)?$/
const matchObj = RE_OPT_A.exec('');
console.log(matchObj.groups.as); // undefined
console.log('as' in matchObj.groups); // true
```

在这个例子中，具名组 `as` 没有找到匹配，因此 `matchObj.groups.as` 的值是 `undefined`，但是 `as` 这个键名仍然存在于 `groups` 对象中。

具名组匹配的优势之一是可以通过解构赋值直接从匹配结果中为变量赋值。下面是一些关于具名组匹配和字符串替换的示例代码：

1. 使用解构赋值从匹配结果中为变量赋值：

   ```js
   let {groups: {one, two}} = /(?<one>foo):(?<two>bar)/.exec('foo:bar');
   console.log(one); // foo
   console.log(two); // bar
   ```

2. 字符串替换时使用具名组引用：

   ```js
   let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
   console.log('2015-01-02'.replace(re, '$<day>/$<month>/$<year>')); // '02/01/2015'
   ```

   在这个例子中，replace 方法的第二个参数是一个字符串，其中使用了具名组的引用来进行字符串替换。

3. replace 方法的第二个参数也可以是一个函数，该函数的参数序列包括整个匹配、各个捕获组的值以及具名组构成的对象。下面是一个示例代码：

   ```js
   '2015-01-02'.replace(re, (
     matched, capture1, capture2, capture3, position, wholeString, groups
   ) => {
     let {day, month, year} = groups;
     return `${day}/${month}/${year}`;
   });
   ```

   在这个例子中，我们可以直接对传入的 `groups` 对象进行解构赋值，从而方便地获取具名组的值进行处理。

通过具名组匹配和字符串替换，可以做到更加灵活和方便地处理正则表达式的匹配结果和字符串替换操作。

在正则表达式中，可以使用具名组匹配来给子表达式命名，并且可以在正则表达式内部通过 `\k<groupName>` 的方式引用这些具名组匹配。同时，也可以使用传统的数字引用（如`\1`、`\2`）来引用捕获到的子表达式。这些引用语法可以单独或者结合使用，从而实现复杂的匹配逻辑，包括要求字符串以重复的单词结尾或者包含多次重复的单词等。这些灵活的引用方式使得正则表达式能够更加强大和灵活地进行匹配操作。

```js
// 组名写法
const RE_TWICE= /"(?<word>[a-z]+)!\k<word>$/ ; 
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false 

// 数字引用 (\1)
const RE_TWICE = /^(?<word>[a-z]+)!\1$/; 
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false

// 同时使用
RE_TWICE.test('abc!abc!abc') // true 
RE_TWICE.test('abc!abc!ab') // false
```

### 总结

ES6 在正则表达式方面确实做了很多扩展和改进，让正则表达式的使用变得更加方便和强大。主要的改进包括：

1. RegExp 构造函数的参数改进：ES6 允许在使用正则对象作为第一个参数时，通过第二个参数来指定新的修饰符，并忽略原有正则对象的修饰符。
2. 字符串的正则方法改进：ES6 中字符串对象的方法 `match()`, `replace()`, `search()` 和 `split()` 全部调用了 RegExp 对象的实例方法，使得所有与正则表达式相关的方法都定义在 RegExp 对象上，提高了代码的一致性和可读性。
3. 添加 "u" 修饰符：用于正确处理大于 `\uFFFF` 的 Unicode 字符，使得正则表达式能够正确识别超过两个字节的 UTF-16 编码字符。
4. 添加 "y" 修饰符（粘连修饰符）：要求匹配必须从剩余的第一个位置开始，并且遵守 lastIndex 属性的指定，只有在 lastIndex 指定的位置发现匹配时才会成功，否则返回 null。
5. 添加 sticky 属性：用于表示正则表达式是否设置了 "y" 修饰符，返回一个布尔值。
6. 添加 flags 属性：用于获取正则表达式的修饰符。
7. 添加 "s" 修饰符（dotAll 模式）：使得点（.）可以匹配任意单个字符，包括行终止符。
8. 添加后行断言：用于匹配字符串中某个位置的左侧内容，可以更清晰地描述每个组匹配的含义，并且在处理匹配结果时可以直接通过组名来引用。
9. 添加 Unicode 属性类：用于匹配符合特定 Unicode 属性的字符，提高了对 Unicode 字符的处理能力。

以上这些改进和扩展使得 ES6 中的正则表达式更加强大和灵活，可以更好地满足开发者在处理复杂字符串匹配和处理方面的需求。

## 第六章 数值的扩展

本章节阮一峰老师从二进制与八进制、数值实例的方法、Math 对象的扩展、运算符、Integer 数据类型五个方面着手讨论。

### 二进制与八进制表示法

ES6 引入了新的进制表示法，可以使用前缀 "0b" 或 "0B" 表示二进制数值，以及使用前缀 "0o" 或 "0O" 表示八进制数值。例如，"0b111110111" 和 "0o767" 都表示十进制数值 503。

在 ES5 中，在严格模式中已经不再允许使用前缀 `0` 表示八进制数值。而在 ES6 中，对这一点进行了进一步的明确，要使用前缀 `0o` 来表示八进制数值。

在非严格模式下，可以使用前缀表示八进制数值，例如：

```js
(function() {
  console.log(0o11 === 011);
})(); // true
```

而在严格模式下，使用前缀表示八进制数值会导致语法错误，例如：

```js
(function () {
  'use strict';
  console.log(011 === 011); // "Uncaught SyntaxError: Octal literals are not allowed in strict mode."
})();
```

如果要将使用 "0b" 或 "0o" 前缀的字符串数值转为十进制数值，可以使用 `Number` 方法进行转换，例如 `Number('0b111')` 的结果是 7，`Number('0o10')` 的结果是 8。

总结，ES6 提供了更方便的进制表示法，但在严格模式下不再允许直接使用前缀表示八进制数值，需要使用 Number 方法进行转换。

### Number.isFinite()、Number.isNaN()

这两个是 ES6 给 Numer 对象提供的新方法。`Number.isFinite()` 用于判断一个数值是否有限；`Number.isNaN()` 判断一个数值是否是 `NaN` 。

```js
// Number.isFinite()
Number.isFinite(15) // true
Number.isFinite(0.8) // true
Number.isFinite(NaN) // false
Number.isFinite(Infinity) // false
Number.isFinite(-Infinity) // false
Number.isFinite('foo') // false
Number.isFinite('15') // false
Number.isFinite(true) // false

// Number.isNaN()
Number.isNaN(NaN) // true
Number.isNaN(8) // false
Number.isNaN('8') // false
Number.isNaN(true) // false
Number.isNaN('daodao'/'daodao') // true
Number.isNaN(NaN/9) // true
```

手写这两个方法的底层逻辑原理。

```js
// isNaN
(function(global) {
  var global_isNaN = global.isNaN
  
  Object.defineProperty(Number, 'isNaN', {
    value: function isNaN(value) {
      return typeof value === 'number' && global_isNaN(value) // 判断是否是数字，调用方法获取值
    },
    configurable: true, 
		enumerable : false, 
		writable: true
  })
})(this)

// isFinite
(function(global) {
  var global_isFinite = global.isFinite
  
  Object.defineProperty(Number, 'isFinite', {
    value: function isFinite(value) {
      return typeof value === 'number' && global_isFinite(value) // 判断是否是数字，调用方法获取值
    },
    configurable: true, 
		enumerable : false, 
		writable: true
  })
})(this)
```

由上可看出，这两个方法只能判断数值型，非数值型直接返回 `false` 。`isNaN()` 方法在只有 `isNaN` 值才会返回 `true` ，其他值都会返回 `false` 。

### Number.parselnt()、Number.parseFloat()

这两个方法在 ES5 是放在全局 `window` 上；在 ES6  则是放到 Number 上。这么做的好处是逐步减少全局性方法，使得语言逐步模块化。本质没有任何区别。

```js
// ES5
parseInt('32.1') // 32
parseFloat('32.1') // 32.1

// ES6
Number.parseInt('32.1') // 32
Number.parseFloat('32.1') // 32.1
```

### Number.islnteger()

Number.islnteger() 方法用于判断该值是否是整数。在 javascript 中，由于整数和浮点数是同样的存储方式，因此 2 和 2.0 会视为同一个值。

```js
Number.isInteger(3) // true
Number.isInteger(3.0) // true
Number.isInteger('3') // false
Number.isInteger(1.1) // false
Number.isInteger(false) // false
```

手写这个方法的底层逻辑原理。

```js
(function (global) {
  var floor = Math.floor, isFinite = global.isFinite
  
  Object.defineProperty(Number, 'isInteger', {
    value: function(value) {
      return typeof value === 'number' && isFinite(value) && floor(value) === value
    },
    configurable: true, 
		enumerable : false,
		writable: true 
  })
})(this)
```

由上可以看出该方法只能检测数值型，非数值型的值直接返回 `false` ；且只能检测有限的数值，无限数值也会返回 `false` 。其判断原理是该数值向下取整是否等于其本身。

###  Number.EPSILON

ES6 Number 对象上面新增一个极小的常量——Number.EPSILON。

这个常量的作用在于控制误差的可接受范围。众所周知浮点数的计算一直存在误差，如果这个误差小于 Number.EPSILON，则这个误差是可以接受的误差。

```js
Number.EPSILON // 2.220446049250313e-16

0.1 + 0.2 // 0.30000000000000004

0.1 + 0.2 - 0.3 // 5.551115123125783e-17

5.551115123125783e-17 < Number.EPSILON // true
```

### 安全整数和 Number. isSafelnteger()

JavaScript能够精确表示的整数范围在 `-2^53` 到 `2^53` 之间（不含两个端点），超出这个范围就无法精确表示。ES6引入了 `Number.MAX_SAFE_INTEGER` 和 `Number.MIN_SAFE_INTEGER` 两个常量来表示这个范围的上下限。同时，使用 `Number.isSafeInteger()` 函数可以判断一个整数是否落在这个范围之内。

需要注意的是，超出安全整数范围的整数在计算过程中可能会导致不准确的结果，因此在处理整数运算时需要谨慎验证每个参与运算的值是否是安全整数。

```js
// 判断一个整数是否为安全整数
console.log(Number.isSafeInteger(9007199254740993)); // false
console.log(Number.isSafeInteger(990)); // true
console.log(Number.isSafeInteger(9007199254740993 - 990)); // true

// 使用trusty函数验证整数运算结果
function trusty(left, right, result) {
  if (
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result;
  } else {
    throw new RangeError('Operation cannot be trusted!');
  }
}

// 示例使用trusty函数验证整数运算
try {
  console.log(trusty(9007199254740993, 990, 9007199254740993 - 990)); // 抛出 RangeError
} catch (e) {
  console.log(e.message);
}
```

### Math 对象扩展

Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。

#### Math.trunc()

`Math.trunc()` 方法用于获取一个数值的整数部分，去除小数部分。若传入一个非数值型的值，该函数会先转为数值型。若无法转为数值型，则返回 `NaN` 。

```js
Math.trunc(1.1) // 1
Math.trunc(1.9) // 1
Math.trunc(-1.1) // -1
Math.trunc(-1.9) // -1
Math.trunc('1.1') // 1
Math.trunc(true) // NaN
Math.trunc('abc') // NaN
```

下面来对于无该方法的环境部署该方法。

```js
Math.trunc = Math.trunc || function(num) {
  return x < 0 ? Math.ceil(x) : Math.floor(x)
}
```

可以看到，其原理是大于0的正数，向下取整；小于0的负数，向上取整。

#### Math.sign()

`Math.sign()` 用于判断一个数值是正数、负数还是零。对于非数值型的值，会先转为数值。其中会有以下五种情况：

- 正数，返回 +1
- 负数，返回 -1
- 0，返回 0
- -0，返回 -0
- 其他值，返回 NaN

```js
Math.sign(1.1) // +1
Math.sign(-2.9) // -1
Math.sign(-0) // -0
Math.sign(0) // 0
Math.sign('500') // 1
Math.sign('foo') // NaN
Math.sign(NaN) // NaN
```

下面来对于无该方法的环境部署该方法。

```js
Math.sign = Math.sign || function(num) {
  x = +x
  if (x === 0 || isNaN(x)) {
    return x
  }
  return x > 0 ? +1 : -1
}
```

可以看到，其原理是先把值转为数值型，遇到 0 或 `NaN` ，直接返回；再判断数值是否大于0。

#### Math.cbrt()

`Math.cbrt()` 方法用于计算一个数的立方根，在处理非数值参数时会先将其转为数值。

```js
Math.cbrt(1) // 1
Math.cbrt(-1) // -1
Math.cbrt(0) // 0
Math.cbrt('8') // 2
Math.cbrt('foo') // NaN
```

下面来给没有该方法的环境配置该方法。

```js
Math.cbrt = Math.cbrt || function(num) {
  var y = Math.pow(Math.abs(num), 1/3); // 取绝对值后，计算其立方根
  return num < 0 ? -y : y;
}
```

#### Math.clz32()

JavaScript 中的 `Math.clz32` 方法用于返回一个32位无符号整数的二进制表示中前导的零的个数。即从左边开始连续的零的个数。

对于小数，`Math.clz32` 方法只考虑整数部分；对于空值或其他类型的值，会先将它们转为数值再进行计算。此外，还提到了 `Math.clz32` 方法与左移运算符（<<）的直接关联。

```javascript
console.log(Math.clz32(0)); // 32
console.log(Math.clz32(1)); // 31
console.log(Math.clz32(1000)); // 22
console.log(Math.clz32(0b01000000000000000000000000000000)); // 1
console.log(Math.clz32(0b00100000000000000000000000000000)); // 2
console.log(Math.clz32(3.2)); // 30
console.log(Math.clz32(1 << 29)); // 2

console.log(Math.clz32(null)); // 32
console.log(Math.clz32('foo')); // 32
console.log(Math.clz32(NaN)); // 32
console.log(Math.clz32([])); // 32
console.log(Math.clz32({})); // 32
console.log(Math.clz32()); // 32
```

#### Math.imul()

JavaScript 中的 `Math.imul` 方法用于返回两个数以32位带符号整数形式相乘的结果，同样返回一个32位的带符号整数。

`Math.imul` 在数值处于 2的 35次方区间内与 x*y 的值相等，主要用于解决超过53位精度限制的问题，能够正确返回乘法运算的低位数值。

```js
console.log(Math.imul(2, 4)); // 8
console.log(Math.imul(-1, 8)); // -8
console.log(Math.imul(-2, -2)); // 4
console.log(Math.imul(0x7fffffff, 0x7fffffff)); // 1
```

总结起来，`Math.imul` 方法用于执行两个数的32位带符号整数形式的乘法运算，返回结果也是一个32位带符号整数。对于超过53位精度限制的乘法运算，`Math.imul` 方法可以返回正确的低位数值，解决了 JavaScript 精度限制导致的计算错误。

#### Math.fround()

JavaScript 中的 `Math.fround` 方法用于将一个数转换为单精度浮点数形式。对于整数，`Math.fround` 方法的返回结果与原数相同；而对于无法精确表示的小数，`Math.fround` 方法会返回最接近该小数的单精度浮点数。 

```javascript
console.log(Math.fround(0)); // 0
console.log(Math.fround(1)); // 1
console.log(Math.fround(1.337)); // 1.3370000123977661
console.log(Math.fround(1.5)); // 1.5
console.log(Math.fround(NaN)); // NaN

// 模拟实现Math.fround方法
Math.fround = Math.fround || function(x) { return new Float32Array([x])[0]; };
```

下面在没有该方法的环境模拟部署该方法。

```js
Math.fround = Math.fround || function(num) {
  return new Float32Array([x])[0]
}
```

#### Math.hypot()

`Math.hypot` 方法返回所有参数的平方和的平方根。同样的，如果参数不是数值型，则会先转为数值型。若有一个参数无法转为数值型，则返回 `NaN` 。

```js
Math.hypot(3, 4) // 5。根号(3^2 + 4^2) = 根号(9 + 16) = 根号(25) = 5
Math.hypot(3, 4, 5) // 7.0710678118654755
Math.hypot() // 0
Math.hypot(3, '4') // 5
Math.hypot(NaN) // NaN
Math.hypot(3, 4, 'foo') // NaN
```

#### 对数方法

ES6 新增了四个对数方法。

- `Math.expm1()` 

  `Math.expm1(x)` 返回一个 e^x - 1 的结果，相当于 `Math.exp(x) - 1` 。在无该方法的环境中可以部署该方法。

  ```js
  Math.expm1 = Math.expm1 || function(num) {
    return Math.exp(x) - 1
  }
  ```

- `Math.log1p()` 

  `Math.log1p(x)` 方法返回 `ln(x + 1)` ，即 `Math.log(x + 1)` 。若 `x` 小于 -1 则返回 `NaN` 。在无该方法的环境中可以部署该方法。

  ```js
  Math.log1p = Math.log1p || function(num) {
    return Math.log(x + 1)
  }
  ```

- `Math.log10()` 

  `Math.log10(x)` 方法返回以10为底的 `x` 的对数。若 `x` 小于 0 则返回 `NaN` 。在无该方法的环境中可以部署该方法。

  ```js
  Math.log10 = Math.log10 || function(num) {
    return Math.log(x) / Math.LN10
  }
  ```

- `Math.log2()` 

  `Math.log2(x)` 方法返回以2为底的 `x` 的对数。若 `x` 小于 0 则返回 `NaN` 。在无该方法的环境中可以部署该方法。

  ```js
  Math.log2 = Math.log2 || function(num) {
    return Math.log(x) / Math.LN2
  }
  ```

#### 双曲函数方法

ES6 新增了六个双曲线函数方法（了解即可）

- `Math.sinh(x)` 返回 的双曲正弦 (hyperbolic sine)
- `Math cosh(x)` 返回 的双曲余弦 (hyperbolic cosine)  
- `Math tanh(x)` 返回 的双曲正切 (hyperbolic tangent)  
- `Math.asinh(x)` 返回 的反双曲正弦 (inverse hyperbolic sine)
- `Math acosh(x)` 返回 的反双曲余弦 (inverse hyperbolic cosine)
- `Math.atanh(x)` 返回 的反双曲正切 (inverse hyperbolic tangent) 

#### Math.signbit()

`Math.sign` 方法用于判断一个数的正负，但在参数为 -0 时会返回 -0，这种情况下不太有用。由于 JavaScript 内部使用64位浮点数表示数值，IEEE 754标准规定第一位是符号位，表示正数或负数，因此存在+0和-0两种零。

针对这种情况，提案中引入了 `Math.signbit` 方法，用来判断一个数的符号位是否已经设置。该方法的算法如下：

- 如果参数是 `NaN` ，返回 `false` 
- 如果参数是 -0，返回 `true` 
- 如果参数是负值，返回 `true` 
- 其他情况返回 `false` 

```javascript
console.log(Math.signbit(2)); // false
console.log(Math.signbit(-2)); // true
console.log(Math.signbit(0)); // false
console.log(Math.signbit(-0)); // true
```

### 指数运算符

指数运算符可以直接计算幂运算，还可以与等号结合形成新的赋值运算符 `**=` ，用于对变量进行幂运算赋值操作。

在V8引擎中，指数运算符与`Math.pow` 方法的实现存在细微差异，特别是在处理特别大的运算结果时。举例来说，当使用 `Math.pow(99, 99)` 和 `99 ** 99` 进行运算时，由于计算精度的不同，两者得到的最后一位有效数字可能会有差异。

```javascript
// 使用指数运算符和赋值运算符的示例
let a = 1.5;
a **= 2; // 等同于 a = a * a;
console.log(a); // 输出 2.25

let b = 4;
b **= 3; // 等同于 b = b * b * b;
console.log(b); // 输出 64

// 比较指数运算符和Math.pow在处理大数值时的差异
console.log(Math.pow(99, 99)); // 输出 1.1369729637649726e+197
console.log(99 ** 99); // 输出 1.1369729637649727e+197
```

### Integer 数据类型

JavaScript中数字都以64位浮点数形式保存，导致整数精确度仅限于53位。为了解决这一问题，一个提案引入了新的数据类型Integer（整数），用于精确表示任意位数的整数，不受位数限制。

为了区别于Number类型，Integer类型的数据需要使用后缀 `"n"` 来表示。二进制 八进 、十六进制的表示法都要加上后缀 `"n"` 。

```js
// 使用Integer类型的示例
let a = 1n + 2n; // 3n
console.log(a);

// 不同进制下的Integer表示
console.log(0b11n); // 3n (二进制)
console.log(0o777n); // 511n (八进制)
console.log(0xFFn); // 255n (十六进制)

// 使用Integer对象生成Integer类型的数值
console.log(Integer(123)); // 123n
console.log(Integer('123')); // 123n
console.log(Integer(false)); // 0n
console.log(Integer(true)); // 1n

// 以下用法会报错
// new Integer() // TypeError
// Integer(undefined) // TypeError
// Integer(null) // TypeError
// Integer('123n') // SyntaxError
// Integer('abc') // SyntaxError
```

在数学运算方面，Integer类型的加、减、乘和幂运算符与Number类型的行为相似。但是除法运算符 `/` 将舍去小数部分，返回一个整数。

```js
let a = 9n + 5n; // 14n (加法)
let b = 11n - 6n; // 5n (减法)

// 乘法运算符
let c = 6n * 7n; // 42n

// 指数运算符
let d = 2n ** 3n; // 8n

// 除法运算符
let e = 10n / 3n; // 3n (舍去小数部分)

// 不允许的操作
// let f = 7n >> 1; // 报错，不允许使用右移位运算符
// let g = +9n; // 报错，不允许一元求正运算符

// 不允许Integer类型与Number类型进行混合运算
// let h = 5n + 1; // 报错

// 相等运算符
// let i = 0n == 0; // 报错，不允许混合使用
// let j = 0n === 0; // true (精确相等运算符)
```

### 总结

本章节的内容主要涵盖了ES6中关于数值表示法、Math对象扩展、整数数据类型等方面的知识点。

其中，介绍了二进制与八进制表示法、Number.isFinite()、Number.isNaN()、Number.parseInt()、Number.parseFloat()、Number.isInteger()、Number.EPSILON、安全整数与Number.isSafeInteger()、Math对象扩展方法、指数运算符以及Integer数据类型的使用方法。

整个文本内容较为详细地介绍了这些知识点，并包含了示例和方法的手写实现，能够帮助读者更好地理解和掌握这些内容。

## 第七章 函数的扩展

本章节为函数的相关扩展，包括参数默认值、`rest` 参数、严格模式、`name` 属性、箭头函数、`this` 绑定、尾调用优化等七个方面。

### 函数参数默认值

在ES6之前，为函数参数指定默认值需要采用变通的方法，例如通过判断参数是否赋值来设定默认值。但是这也会有一个问题，如果用户传了 `false` 或 0等 ，则也会短路运算赋值后半部分。而在ES6标准中，允许直接在参数定义的后面设置默认值，使得代码更加简洁和自然。

```js
// ES6之前
function fn(x) {
  x = x || 1
  return x
}
fn() // 1
fn(2) // 2
fn(0) // 1

// ES6之后
function fn(x = 1) {
  return x
}
fn() // 1
fn(2) // 2
fn(0) // 0
```

ES6写法比ES5写法简洁许多，而且非常自然。除了简洁外，ES6写法还有两个好处：

1. 阅读代码的人可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档
2. 有利于将来的代码优化，即使未来的版本彻底拿掉这个参数，也不会导致以前的代码无法运行。

另外，需要注意的是，参数是默认声明的，在函数中无法使用 `let` 或 `const` 再次声明；参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。这意味着每次调用函数时都会重新计算默认值表达式的值，而不是默认值被固定为定义时的值。

```js
// 不可重复声明
function (x, y) {
  let x = 1 // error
  const y = 2 // error
}

// 惰性求值
function lazy(p = x + 1) {
  return p
}
lazy(99) // 100
lazy(1) // 2
```

参数默认值可以与解构赋值的默认值的结合使用。首先，通过对象的解构赋值默认值，可以为函数参数中的对象属性设置默认值。如果函数参数不是一个对象，解构赋值将无法进行，会报错。只有在参数对象没有对应属性时，才会使用默认值。

```js
function fn({x, y = 5}) {
  return [x, y]
}

fn({x: 1, y: 2}) // [1, 2]
fn({x: 1}) // [1, 5]
fn({}) // [undefined, 5]
fn() // TypeError: Cannot read property ’ x ’ of undefined 
```

对比一下下面两种写法：

```js
// 写法1
function fn({x = 0, y = 0} = {}) {
  console.log(x, y)
}
fn() // 0, 0
fn({x: 1}) // 1, 0
fn({x: 1, y: 3}) // 1, 3
fn({}) // 0, 0

// 写法2
function fn({x, y} = {x: 0, y: 0}) {
  console.log(x, y)
}
fn() // 0, 0
fn({x: 1}) // 1, undefined
fn({x: 1, y: 3}) // 1, 3
fn({}) // undefined, undefined
```

写法一将函数参数的默认值设为空对象，并设置了解构赋值的默认值；写法二将函数参数的默认值设为一个具有具体属性的对象，并未设置解构赋值的默认值。

在函数中设置默认值时，通常应该将具有默认值的参数放在函数的尾部。这样做有助于更清楚地识别哪些参数是被省略的。如果非尾部的参数设置了默认值，那么这些参数实际上是无法被省略的。

当传入 `undefined` 时，会触发参数默认值，而传入 `null` 则不会触发默认值。

```js
function fn (x = 1, y) {
  console.log(x, y)
}
fn(2) // 2, undefined
fn(undefined, 2) // 1, 2
fn(null, 2) // null, 2
fn(, 2) // erro
```

总结而言，通过将具有默认值的参数放在函数的尾部可以更清晰地处理参数的省略情况，而非尾部的参数无法被省略，除非显式输入 `undefined` 。

在函数指定了默认值后，函数的 `length` 属性将失真。`length` 属性返回的是函数预期传入的参数个数，而指定了默认值的参数不再计入该个数。

```js
(function fn (a, b, c = 1) {}).length // 2
(function fn (a, b, c) {}).length // 3
(function fn (a = 1) {}).length // 0
```

另外，如果函数使用了剩余参数（`rest parameters`），即使用了 `...args` 语法来接收可变数量的参数，那么 `length` 属性将返回0，因为剩余参数不计入预期传入的参数个数。

```js
(function fn (...args) {}).length // 0
```

最后，如果设置了默认值的参数不是尾参数，那么 `length` 属性也不再计入后面的参数。

```js
(function fn (a = 1, b, c) {}).length // 0
(function fn (a, b = 2, c) {}).length // 1
```

总而言之，指定了默认值后，`length` 属性返回的是函数预期传入的参数个数，而指定了默认值的参数不再计入该个数。剩余参数也不会计入 `length` 属性。

在函数参数设置默认值时，会形成一个单独的作用域（`scope`），函数内部默认值变量指向该作用域的第一个参数，而不是全局变量。如果在该作用域中变量未定义，那么默认值变量将指向外层的全局变量。此外，参数的默认值也可以是一个函数，遵循相同的作用域规则。

总结概括如下：

- 在函数声明初始化时，参数设置默认值会形成一个单独的作用域。
- 默认值变量指向该作用域的第一个参数，而不是全局变量。
- 如果作用域内部未定义变量，则默认值变量指向外层的全局变量。
- 参数的默认值也可以是一个函数，遵循相同的作用域规则。

```js
// 独立作用域，取形参的x
var x = 1;
function f(x, y = x) {
    console.log(y);
}
f(2); // 输出为 2

// 取作用域内最近的x，内部的x无关
let x = 1;
function f(y = x) {
    let x = 2;
    console.log(y);
}
f(); // 输出为 1

// 作用域内无x，报错
function f(y = x) {
    let x = 2;
    console.log(y);
}
f() // ReferenceError: x is not defined

// 参数可以是函数
let foo = 'abc'
function f(y = () => foo) {
  let foo = 'def'
  console.log(y)
}
f() // abc，函数内返回的值根据作用域取到的
```

利用参数默认值来指定某个参数不得省略，如果省略则抛出一个错误。通过在函数定义时使用默认值为参数赋予一个函数，可以在调用函数时实现对参数的必填检查。

总结概括如下：

- 可以利用参数默认值来指定某个参数不得省略，如果省略就抛出一个错误。
- 在函数定义时，将参数的默认值设置为一个函数，当调用函数且未提供该参数时，函数会执行默认值函数从而抛出错误。
- 参数的默认值是在运行时执行的，如果参数已经被传递，则默认值中的函数不会执行。
- 参数的默认值也可以设为 undefined，表示这个参数是可省略的。

以下是附带代码说明：

```js
// 如果不传参数则报错
function throwIfMissing() {
    throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
    return mustBeProvided;
}

try {
    foo(); // 调用时没有提供参数，会触发错误
} catch (error) {
    console.error(error); // 输出 Error: Missing parameter
}

// 可以将参数的默认值设为 undefined，表示参数是可省略的
function bar(optional = undefined) {
    console.log(optional);
}

bar(); // 不提供参数，optional 的值为 undefined
```

### rest参数

ES6 中引入了 `rest` 参数，它用于获取函数的多余参数，取代了之前使用 `arguments` 对象的方式。`rest` 参数的形式是 `"…变量名"` ，它会将多余的参数放入一个数组中。

可以使用 `rest` 参数来传入任意数目的参数，进行处理。`rest` 参数的写法更自然、简洁，并且可以直接使用数组的方法。可以利用 `rest` 参数改写一些原本需要使用 `arguments` 对象的函数。

> 注意
>
> `rest` 参数必须是最后一个参数，不能在其后再有其他参数，否则会报错。

函数的 `length` 属性不包括 `rest` 参数。

```js
// 使用rest参数实现求和函数
function add(...values) {
  let sum = 0;
  for (let val of values) {
    sum += val;
  }
  return sum;
}

console.log(add(2, 5, 3)); // 输出 10

// 使用rest参数代替arguments变量
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// 使用rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

// 利用rest参数改写数组push方法
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3);

// 注意rest参数必须是最后一个参数
// 下面的写法会报错
function f(a, ...b, c) {
  // ...
}

// 函数的length属性不包括rest参数
(function(a) {}).length; // 输出 1
(function(...a) {}).length; // 输出 0
(function(a, ...b) {}).length; // 输出 1
```

> 总结
>
> 使用rest参数能够获取函数的多余参数，可配合循环实现求和、排序以及改写数组 `push` 方法等。但也需注意 `rest` 参数的限制和函数的 `length` 属性不包括 `rest` 参数。

### 严格模式

在ES5中，函数内部可以设定为严格模式。但是，从ES2016开始，规定只要函数参数使用了默认值、解构赋值或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

函数内部的严格模式同时适用于函数体和函数参数，但是函数执行时先执行函数参数，再执行函数体，导致参数是否应该以严格模式执行不确定。

JavaScript引擎会先成功执行带有默认值的参数，然后在函数体内部发现需要严格模式执行时才会报错。为了避免这种限制，可以全局性设定严格模式或将函数包裹在一个无参数的立即执行函数中。

```js
// 报错示例：函数参数使用默认值但内部显式设定严格模式
function doSomething(a, b = a) { 
  'use strict'; 
  // code
}

// 报错示例：函数参数使用解构赋值但内部显式设定严格模式
const doSomething = function ({a, b}) { 
  'use strict'; 
  // code
}

// 报错示例：箭头函数参数使用扩展运算符但内部显式设定严格模式
const doSomething = (...a) => { 
  'use strict'; 
  // code
}

// 报错示例：对象方法参数使用默认值但内部显式设定严格模式
const obj = {
  doSomething({a, b}) { 
    'use strict'; 
    // code
  }
}

// 参数使用默认值但会在严格模式下报错的示例
function doSomething(value = 070) { 
  'use strict'; 
  return value; 
}

// 解决方法1：全局性设定严格模式
'use strict';
function doSomething(a, b = a) { 
  // code
}

// 解决方法2：将函数包裹在无参数的立即执行函数里面
const doSomething = (function () { 
  'use strict'; 
  return function (value = 42) { 
    return value; 
  };
})();
```

### name属性

在 ES5 中，将匿名函数赋值给变量时，`name` 属性会返回空字符串；而在 ES6 中，`name` 属性会返回实际的函数名。

如果将具名函数赋值给一个变量，无论是在 ES5 还是 ES6 中，`name` 属性都会返回这个具名函数的原本名字。

使用 Function 构造函数创建的函数实例，name 属性的值为 `"anonymous"`。

使用 `bind` 方法创建的函数，`name` 属性的值会加上 `"bound"` 前缀。

```js
// ES5 vs ES6 示例
var f = function () {}; 
// ES5
console.log(f.name); // 输出：空字符串
// ES6
console.log(f.name); // 输出：f

// 具名函数示例
const bar = function baz() {}; 
// ES5 & ES6
console.log(bar.name); // 输出：baz

// 函数构造函数示例
console.log((new Function).name); // 输出：anonymous

// 使用 bind 方法示例
function foo() {};
console.log(foo.bind({}).name); // 输出：bound foo

// 更复杂的 bind 示例
console.log((function() {}).bind({}).name); // 输出：bound
```

### 箭头函数

箭头函数使用简洁的语法定义函数，可以省略 `function` 关键字和大括号。当箭头函数不需要参数或需要多个参数时，使用圆括号表示参数部分。

如果箭头函数包含多于一条语句的代码块，需要使用大括号并显式地使用 `return` 返回结果。在箭头函数直接返回对象时，需要在对象外面加上括号以避免解析错误。

箭头函数可以与变量解构结合使用，使代码更加简洁。且特别适合简化回调函数的书写，可以用更紧凑的语法表达同样的功能。

```js
// 示例1：箭头函数简化函数定义
var f = v => v;
// 相当于
var f = function(v) {
  return v;
};

// 示例2：箭头函数与变量解构结合使用
const full = ({ first, last }) => first + ' ' + last;
// 相当于
function full(person) {
  return person.first + ' ' + person.last;
}

// 示例3：箭头函数简化回调函数
// 正常函数写法
[1, 2, 3].map(function(x) {
  return x * x;
});
// 箭头函数写法
[1, 2, 3].map(x => x * x);

// 示例4：箭头函数简化排序函数
// 正常函数写法
var result = values.sort(function(a, b) {
  return a - b;
});
// 箭头函数写法
var result = values.sort((a, b) => a - b);

// 示例5：箭头函数与 rest 参数结合
const numbers = (...nums) => nums;
numbers(1, 2, 3, 4, 5); // 输出：[1, 2, 3, 4, 5]

const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1, 2, 3, 4, 5); // 输出：[1, [2, 3, 4, 5]]
```

箭头函数有以下几个使用注意事项：

1. 箭头函数的 `this` 对象是固定的，它继承自外层函数的 `this`，而不是根据使用时所在的对象决定。
2. 箭头函数不能被当作构造函数使用，即不能使用 `new` 命令创建实例，否则会抛出错误。
3. 箭头函数内部不存在 `arguments` 对象，如果需要使用参数，可以使用 `rest` 参数代替。
4. 箭头函数不能被用作 `generator` 函数，即不能使用 `yield` 命令。

箭头函数的固定化的 `this` 指向特性非常有利于封装回调函数。例如，在 `DOM` 事件的回调函数中，可以使用箭头函数来确保 `this` 指向定义时的对象。

代码说明：

```js
// 示例1：箭头函数的 this 绑定定义时所在的作用域
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
  var id = 21;
  foo.call({ id: 42 });
}
foo() // 输出: id: 42

// 示例2：箭头函数和普通函数在定时器中的对比
function Timer() {
  this.sl = 0;
  this.s2 = 0;
  
  // 箭头函数
  setInterval(() => this.sl++, 1000);
  
  // 普通函数
  setInterval(function() {
    this.s2++;
  }, 1000);
}
var timer = new Timer();
setTimeout(() => console.log('sl:', timer.sl), 3100); // 输出: sl: 3
setTimeout(() => console.log('s2:', timer.s2), 3100); // 输出: s2: 0

// 示例3：箭头函数内部没有自己的 this，只有外层函数的 this
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}
var f = foo.call({ id: 1 });
var t1 = f.call({ id: 2 })(); // 输出: id: 1
var t2 = f().call({ id: 3 })(); // 输出: id: 1
var t3 = f()().call({ id: 4 })(); // 输出: id: 1
```

箭头函数可以嵌套使用，提供了简洁的函数定义方式。下面是一些使用箭头函数的示例代码：

1. 多重嵌套函数的箭头函数写法:

   ```js
   function insert(value) { 
     return {into: function(array) { 
       return {after: function(afterValue) { 
         array.splice(array.indexOf(afterValue) + 1, 0, value); 
         return array; 
       }};
     }};
   }
   
   // 箭头函数写法
   let insert = (value) => ({into: (array) => ({after: (afterValue) => { 
     array.splice(array.indexOf(afterValue) + 1, 0, value); 
     return array; 
   }})});
   ```

2. 部署管道机制的箭头函数写法：

   ```js
   const pipeline = (...funcs) => (val) => funcs.reduce((a, b) => b(a), val);
   const plus1 = a => a + 1;
   const mult2 = a => a * 2;
   const addThenMult = pipeline(plus1, mult2);
   addThenMult(5); // 输出: 12
   ```

3. 箭头函数改写演算：

   ```js
   // 演算的写法
   fix λf.(λx.f(λv.x(x)(v))) (λx.f(λv.x(x)(v)))
   
   // ES6 的写法
   var fix = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)));
   
   // 这两种写法几乎是一一对应的
   ```

总而言之，箭头函数提供了更简洁的函数声明方式，并且可以嵌套使用。

### this绑定

ES7提出了“函数绑定”（ `function bind` ）运算符，用双冒号 `(::)` 来取代显式绑定（`call`、`apply`、`bind`）的调用方式。这个语法虽然是ES7的提案，但 `Babel` 转码器已经支持。

函数绑定运算符的语法为：`foo :: bar;`，它会自动将左边的对象作为上下文环境（即 `this` 对象）绑定到右边的函数上，相当于 `bar.bind(foo);`。

```js
const hasOwnProperty = Object.prototype.hasOwnProperty;

// 使用函数绑定运算符来简化方法调用
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}

foo::bar -> foo.bind(foo)
foo::bar(...arguments) -> foo.apply(foo, arguments)

// 如果双冒号左边为空，右边是一个对象的方法，则等同于将该方法绑定在该对象上
var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;

// 链式写法示例
import { map, takeWhile, forEach } from 'iterlib';

getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));

// 链式写法示例二
let { find, html } = jake;

document.querySelectorAll("div.myClass")
::find("p")
::html("hahaha");
```

### 尾调用优化

尾调用是函数式编程中的重要概念，它指的是某个函数的最后一步是调用另一个函数。

以下情况不属于尾调用：

1. 最后一步调用函数之前还有其他操作；
2. 最后一步调用函数的返回值还经过了其他操作；
3. 最后一步调用函数后并无返回值或返回了 `undefined` 。

尾调用可以出现在函数的尾部，只要是最后一步操作即可。

```js
// 尾调用的示例（最后一句代码）
function f(x) {
  return g(x);
}

// 非尾调用的情况一
function f(x) {
  let y = g(x);
  return y;
}

// 非尾调用的情况二
function f(x) {
  return g(x) + 1;
}

// 非尾调用的情况三
function f(x) {
  g(x);
  // 执行其他操作
}

// 尾调用的示例（非最后一句代码）
function f(x) {
  if (x > 0) {
    return m(x);
  }
  return n(x);
}
```

尾调用在函数调用过程中具有特殊的调用位置，它不需要保留外层函数的调用帧，因为在最后一步操作完成后，外层函数的调用帧可以被内层函数的调用帧直接取代，从而节省内存空间。

尾调用优化（Tail Call Optimization）指的是只保留内层函数的调用帧，如果所有函数都是尾调用，就可以做到每次执行时调用帧只有一项，大大节省内存。但要注意，只有当不再需要外层函数的内部变量时，内层函数的调用帧才能取代外层函数的调用帧，否则无法进行尾调用优化。

```js
// 尾调用优化的示例
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f(); // 等同于直接调用 g(3);

// 尾调用优化的示例
function addOne(a) {
  var one = 1;
  function inner(b) {
    return b + one;
  }
  return inner(a);
}
// 上面的函数不会进行尾调用优化，因为内层函数 inner 使用了外层函数 addOne 的内部变量 one。
```

递归是指函数调用自身的过程，而尾递归是指尾调用自身的递归形式。尾递归优化是一种编译器或解释器的优化技术，通过只保留一个调用帧，避免保存大量的调用记录，从而提高递归函数的性能并防止栈溢出错误。

尾递归的特点是，递归调用发生在函数的最后一条语句，并且递归调用的返回值直接作为当前函数的返回值，不再进行其他操作。这样可以避免每次递归调用都需要保存调用帧的开销。

```javascript
// 阶乘函数的尾递归实现
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5); // 120

// Fibonacci 数列的尾递归实现
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) return ac2;
  return Fibonacci2(n - 1, ac2, ac1 + ac2);
}
Fibonacci2(10); // 89
```

将递归调用放在函数的最后一条语句，并直接返回递归调用的结果，可以减少调用帧的开销，提高性能并避免栈溢出错误。在ES6规范中，尾调用优化被明确要求部署，使得使用尾递归的函数不会发生栈溢出错误，并节省内存空间。

在尾递归中，将所有用到的内部变量改写成函数的参数，以确保最后一步只调用自身。为了让代码更直观和易读，提出了两种解决方案：

1. 提供一个正常形式的函数来调用尾递归函数，使代码结构更清晰：

   ```js
   function tailFactorial(n, total) {
     if (n === 1) return total;
     return tailFactorial(n - 1, n * total);
   }
   
   function factorial(n) {
     return tailFactorial(n, 1);
   }
   
   factorial(5); // 120
   ```

2. 使用柯里化（currying）将多参数的函数转换成单参数形式，使代码更简洁：

   ```js
   function currying(fn, n) {
     return function(m) {
       return fn.call(this, m, n);
     };
   }
   
   function tailFactorial(n, total) {
     if (n === 1) return total;
     return tailFactorial(n - 1, n * total);
   }
   
   const factorial = currying(tailFactorial, 1);
   factorial(5); // 120
   ```

另外，ES6 的函数默认值也是一种简洁的解决方案，可以避免在调用时提供额外的参数：

```javascript
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5); // 120
```

ES6的尾调用优化只在严格模式下开启的原因。在正常模式下，函数内部的两个变量 `func.arguments` 和 `func.caller` 可以追踪函数的调用栈，但是当尾调用优化发生时，函数的调用栈会被改写，导致这两个变量失效。因此，为了保证尾调用优化的有效性，ES6规定尾调用优化仅在严格模式下生效。

```javascript
function restricted() {
  'use strict';
  restricted.caller; // 报错
  restricted.arguments; // 报错
  restricted();
}
```

在上面的代码中，`restricted.caller`和`restricted.arguments`在严格模式下会导致报错，因为严格模式禁用了这两个变量，这样可以确保在尾调用优化发生时不会出现调用栈跟踪失真的情况，从而保证尾调用优化的有效性。

在不能依赖JavaScript引擎进行尾调用优化的情况下，通过自己实现尾递归优化来避免调用栈溢出的方法。具体来说，通过使用"蹦床函数"（trampoline function）或者"尾调用优化"（Tail Call Optimization，TCO）来将递归执行转换为循环执行，从而避免调用栈溢出的问题。

1. **蹦床函数方法**：

   - 创建一个蹦床函数，接受一个函数作为参数。
   - 在蹦床函数内部，循环执行传入的函数，直到最终返回一个非函数值为止，从而避免递归调用造成的调用栈溢出。
   - 通过每一步返回一个新的函数，来避免递归执行，实现了递归转换为循环执行的效果。

   ```js
   function trampoline(f) {
       while (f && f instanceof Function) {
           f = f();
       }
       return f;
   }
   
   function sum(x, y) {
       if (y > 0) {
           return function() {
               return sum(x + 1, y - 1);
           };
       } else {
           return x;
       }
   }
   
   console.log(trampoline(() => sum(1, 100000))); // 输出：100001
   ```

2. **尾调用优化方法**：

   - 创建一个尾调用优化函数（tco），内部使用状态变量来模拟递归执行过程。
   - 在函数内部，通过判断是否处于激活状态来控制递归执行，同时使用一个数组来存储每次函数执行的参数。
   - 每次函数执行都返回undefined，避免真正的递归执行，同时通过循环将参数替换实现了类似于递归的效果，但是调用栈只有一层。

   ```js
   function tco(f) {
       let value;
       let active = false;
       let accumulated = [];
   
       function accumulator() {
           accumulated.push(arguments);
           if (!active) {
               active = true;
               while (accumulated.length) {
                   value = f.apply(this, accumulated.shift());
               }
               active = false;
               return value;
           }
       }
   
       return accumulator;
   }
   
   const sum = tco(function(x, y) {
       if (y > 0) {
           return sum(x + 1, y - 1);
       } else {
           return x;
       }
   });
   
   console.log(sum(1, 100000)); // 输出：100001
   ```

> 总结
>
> 1. 尾调用只要满足最后一步是调用另一个函数的条件即可，不一定要出现在函数的尾部。
> 2. 只有当不再需要外层函数的内部变量时，才能实现尾调用优化，从而节省内存空间。
> 3. 递归本质上是一种循环操作，在纯函数式编程语言中循环都通过递归实现。尾递归对于这些语言非常重要，因为它能够避免栈溢出并提高性能。对于支持“尾调用优化”的语言，推荐使用尾递归。

### 总结

在本章中，阮一峰老师带领我们深入探讨了函数的扩展特性。首先介绍了参数默认值的概念，它允许在定义函数时为参数指定默认值，简化了函数调用时的语法，同时也提高了代码的可读性。

接着讨论了 `rest` 参数的作用，它可以将一个不定数量的参数表示为一个数组，使得函数能够处理不固定长度的参数列表，这对于编写灵活的函数非常有用。

还提及了严格模式，它是在 ES6 中引入的一种模式，可以确保代码更加健壮和安全，避免一些常见的错误。

另外介绍了函数的 `name` 属性，它可以获取函数的名称，这对于调试和日志记录非常有帮助。

再然后讨论了箭头函数的特点，它是一种更简洁的函数定义方式，尤其适合于简单的函数和回调函数的书写，同时固定了函数内部的this指向，避免了传统函数中this指向不确定的问题。

最后介绍了尾调用优化，这是一种优化技术，可以使得尾调用时不会新增额外的调用帧，从而提高递归函数的性能并减少内存占用。

这些函数的扩展特性丰富了 JavaScript 的函数语法和功能，使得编程变得更加便利、高效和安全。

## 数组的扩展