# 模块化和包管理

## 模块化

模块化的思想是分解和聚合。客观世界是没有学科之分的，学科是人为拆分出来的，通过简化的方法，将复杂的问题分解为多个简单的问题。

分解契合的是主观规律，是人对世界的认知理解；聚合契合的是客观规律。

前端中也有这种分解聚合的思想，比如创建一个函数，将一些功能封装起来，这就是分解，当需要使用这些功能时，直接调用这个函数，这就是聚合。

```js
function isPrime(n) {
  // 一些功能判断是否是素数
}

function isEven(n) {
  // 一些功能判断是否是偶数
}

function getSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (isPrime(arr[i]) && isEven(arr[i])) {
      // 一些功能
    }
  }
}
```

### 问题

一个语言不仅要在函数层面上支持模块化，还需要在文件层面上支持模块化。函数和文件其实是一样的，只不过文件是更大尺度的分解和聚合。只不过 JavaScript 语言在文件层面上是有问题的。

- 全局污染

  ::: code-group

  ```js [1.js]
  function sort() {
    // 做升序排序
  }
  ```

  ```js [2.js]
  function sort() {
    // 做降序排序
  }
  ```

  ```html
  <script src="1.js"></script>
  <script src="2.js"></script>
  <!-- 全局污染 -->
  ```

  :::

- 依赖混乱

  在没有模块化的时候，`js` 文件之前如果有依赖关系，就需要 `<script src=""></script>` 的方式来引入，这样会导致依赖混乱。

  且直接引入的话，直接外部看是无法看出他们之间是否存在依赖关系的。

### 标准

- ※ `CommonJS` CJS （社区标准，随着 `Node` 发布一起发布的）

  `CJS` 是运行时的加载，即 `require` 是在运行时才会加载，只有运行过后才知道依赖关系。

  ```js
  if (xxx) {
    const a = require("./a.js"); // 同步
  } else {
    const a = require("./b.js"); // 同步
  }
  ```

- `AMD`（社区标准）
- `CMD`（社区标准）
- `UMD`（社区标准）
- ※ `Ecmascript Module` ESM（官方标准）

  `ESM` 是编译时的加载，即 `import` 是在编译时就会加载，可以不用运行代码就能知道依赖关系。

  ```js
  import a from "./a.js";
  import b from "./b.js";
  ```

### 实现

- 浏览器

  浏览器只支持官方标准的 `ESM`，民间标准的 `CJS` 浏览器是无法支持的。想要支持 `CJS`，开发时需要添加 `type="module"`， 打包时需要使用 `babel` 等工具将 `CJS` 转换为 `ESM`。

  ```html
  <script type="module" src="main.js"></script>
  ```

- Node

  `Node` 支持 `CJS` 和 `ESM`，只不过需要配置来切换。

- 构建工具

  如 `webpack` 、 `rollup` 、 `esbuilder` 等构建工具，前者都支持 `CJS` 和 `ESM`，后两者只支持 `ESM` ，需要下载插件来适配 `CJS` 。

### 包管理

包 `package` 是一系列模块的集合。

包管理主要解决以下几个问题：

- 从哪里下载
- 如何升级
- 如何卸载
- 如何发布
- 如何版本控制

目前主要的包管理方案是 `npm` ，其他的包管理方案如 `yarn` 、 `pnpm` 等都是 `npm` 的衍生工具。

`npm` 主要是定义了一些属性，第一个层面是包的属性，在 `package.json` 文件中定义。

```json
{
  "name": "module", // 包名
  "version": "1.0.0", // 版本号
  "description": "", // 描述
  "main": "index.js" // 入口文件，使用这个包实际上使用的是这个js文件
}
```

第二个层面是定义了 `registry` ，它指的是前端这么多包放在哪里，在哪里下载。

```sh
npm i packageName # 下载
```

第三个层面是 `cli` ，全程是 `command line interface` ，即命令行界面，通过输入命令用于管理包。
