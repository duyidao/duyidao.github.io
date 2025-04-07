# JS 工具链

工程化涉及到以下三个问题：

- 语言问题：在最开始这个语言是冲着小而美实现的，现在为了大而全，需要做很多处理。

  `HTML` 问题不是很严重；`CSS` 会有 `sass`、`less`、`styuls`等，`css-in-js`、原子化 `tawilent css` 等； `JavaScript`，本文重点对象。

- 工程问题。

- 流程问题：代码写完如何提交，打包后如何发布。

## 语言兼容

任何一个语言，都会面临兼容性、语言缺陷的问题。

兼容性方面，涉及 <SpecialWords text="API" /> 兼容和语法兼容。

下面来看一个 <SpecialWords text="API" /> 兼容问题情况：

::: code-group

```js [node 16.js]
const result = [1, 2].flatMap((x) => [x, x + 2]);
console.log(result); // [1, 2, 3, 4]
```

```js [node 10.js]
const result = [1, 2].flatMap((x) => [x, x + 2]);
console.log(result); // [1,2].flatMap is not a function
```

:::

可以看到，`node 16` 支持 `flatMap`，`node 10` 不支持，这就是 <SpecialWords text="API" /> 兼容问题。

想要解决这个方法，需要用到 `polyfill` 垫片的思想，依靠一个第三方库 `core-js` 或者自己实现所有函数自己实现一遍。

```sh
npm i core-js
```

```js
require("core-js/modules/es.array.flat-map.js");

const result = [1, 2].flatMap((x) => [x, x + 2]);
console.log(result); // [1, 2, 3, 4]
```

可以看到，`node 10` 也支持 `flatMap` 了。

下面来看一个语法兼容问题情况：

```js
async function foo() {
  await Promise.resolve();
}

(async () => {
  const result = await foo();
})();
```

对于语法兼容不能使用 `polyfill`，而是需要 `transformer` 语法转换，在运行时 `runtime` 之前将代码转换成当前环境能理解的代码。

例如想要转换 `async/await`，可以使用 `regenerator` 第三方工具。它提供一个函数，将 `async/await` 转换成 `generator`。

```sh
npm i regenerator
```

```js
const regenerator = require("regenerator");
const fs = require("fs");
const path = require("path");

const sourcePath = path.resolve(__dirname, "./foo.js");

const result = regenerator.compile(sourcePath, {
  includeRuntime: true, // 包含 runtime
});

console.log(result); // { code: '转换后的代码', sourceMap: 'sourceMap' }

const targetPath = path.resolve(__dirname, "./foo.babel.js"); // 保存转换后的代码

fs.writeFileSync(targetPath, result.code, "utf-8"); // 写入文件
```

相似的，语法兼容并不是只能做到语法兼容，修改一下工具转换的代码，也可以语法增强。实际上都是在做代码转换， `tsc` 可以把 `ts` 转换成 `js`。

## babel

因此，用一个东西来把这些代码转换的工具整合起来，就是 `babel` 代码集成转换工具。它的功能并不仅限于语法转换，还可以做代码增强、代码压缩、代码转换等。

先下载依赖：

```sh
npm i -D @babel/core @babel/cli
```

这个命令表示下载了 `@babel/core` 的核心库，`@babel-cli` 表示可以在命令行用命令调用 `@babel/core`。二者的关系是调用关系，对于开发来说，通过 `@babel/cli` 调用 `@babel/core` 是简单粗暴的选择；对于架构来说，可能需要跳过 `@babel/cli`，自己手写代码调用 `@babel/core`。

修改 `package.json`：

```json {2}
"scripts": {
  "compile": "babel source.js -o source.babel.js"
}
```

这个命令行表示，将 `source.js` 文件通过 `babel` 转换，代码输出到 `source.babel.js` 文件。

::: code-group

```js [source.js]
const obj = {};

obj?.foo?.bar?.baz; // undefined
```

```js [source.babel.js]
const obj = {};
obj?.foo?.bar?.baz; // undefined
```

:::

可以看到，`@babel/cli` 可以将 `source.js` 转换成 `source.babel.js`，但是 `source.babel.js` 中的代码并没有做什么转换。

## 插件

因为 `babel` 主要是把代码转为一个抽象语法树，然后再把抽象语法树转为代码。开发者可以通过插件，影响抽象语法树，从而影响代码转换。例如，`@babel/preset-env` 预设插件，可以将 `ES6` 转换成 `ES5`，`@babel/preset-typescript` 预设插件，可以将 `TypeScript` 转换成 `JavaScript`。

下面下载一个可选链插件：

```sh
npm i -D @babel/plugin-transform-optional-chaining
```

下载完后新建一个 `babel.config.js` 文件，告诉 `babel` 要使用啥插件：

```js
module.export = {
  plugins: ["@babel/plugin-transform-optional-chaining"],
};
```

再次运行 `npm run compile`，可以看到 `source.babel.js` 文件中的代码发生了变化：

::: code-group

```js [source.js]
const obj = {};
obj?.foo?.bar?.baz; // undefined
```

```js [source.babel.js]
var _obj$foo;
const obj = {};
obj === null || obj === void 0
  ? void 0
  : (_obj$foo = obj.foo) === null || _obj$foo === void 0
  ? void 0
  : _obj$foo.bar.baz; // undefined
```

:::

## 预设

这只是下载一个插件，如果要用很多插件，这又是一个麻烦事。因此，`babel` 提供了预设 `@babel/preset-env` ，预设就是一组插件的集合。安装预设后就不需要一个个安装插件了。

```sh
npm i -D @babel/preset-env
```

安装完后，在 `babel.config.js` 中配置预设：

```js
module.export = {
  presets: [
    [
      "@babel/preset-env",
      {
        // targets: 表示要兼容的浏览器版本
        targets: {
          edge: "17", // Edge 17 及以上
          node: "current", // Node.js 当前版本
        },
        useBuiltIns: "usage", // 只包含代码里使用到的 polyfill
      },
    ],
  ],
};
```
