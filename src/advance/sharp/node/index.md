# Node

## Node 简介

### 什么是 node

`Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.`

<word text="Node" />是一个基于 `Chrome V8` 引擎的<word text="JavaScript" />运行环境。

各个浏览器厂商会开发解析<word text="JavaScript" />的引擎如 `google chrome` 、`Apple safari`。因为不同厂商的引擎对 `ecmascript` 的解析程序不同，所以有些功能可能在有的浏览器有效，但在其他的浏览器无效。

比较著名的引擎是 `chrome` 的 v8，它是由 `C++` 编写的，而且它有个特点可以内置到其他 `C++` 程序中，这就为<word text="Node" />的实现提供基础。所以可以把<word text="Node" />简单来理解为使用 v8 引擎可以解析<word text="JavaScript" />语法，同时也可以调用 `C++` 功能进行文件操作，网络通信等功能。

**Nodejs vs Browser**

- <word text="Node" />是开源、跨平台的<word text="JavaScript" />运行时环境，它是运行时，不时语言或框架，是在浏览器之外的 Javascript 使用
- <word text="Node" />可以使用<word text="JavaScript" />调用 c++，实现计算底层操作
- <word text="Node" />运行时包含 [v8 引擎 (opens new window)](https://github.com/nodejs/node/tree/main/deps/v8)（解析 javascript）、[libuv (opens new window)](https://github.com/nodejs/node/tree/main/deps/uv)(进行计算机文件、网络等底层操作) 等等。通过查看[Node源码 (opens new window)](https://github.com/nodejs/node/tree/main/src)，我们会知道<word text="Node" />使用 c++进行文件或网络操作
- <word text="Node" />使用 libuv 库，让开发者使用[JavaScript (opens new window)](https://github.com/nodejs/node/tree/main/lib)调用 c++程序
- <word text="Node" />没有基于浏览器的<word text="JavaScript" />的 DOM、BOM 等概念这与但是拥有文件系统操作功能
- <word text="Node" />我们可以随意选择版本，但浏览器的<word text="JavaScript" />运行在众多用户电脑中，所以版本不是由我们决定的

### 运行环境

- v8 引擎
- 内置 API：fs、path、http、js 内置对象、querystring、etc...

> [!WARNING] 注意
>
> 1. 浏览器是<word text="JavaScript" />的前端运行环境
> 2. <word text="Node" />是<word text="JavaScript" />的后端运行环境
> 3. <word text="Node" />无法使用 DOM 和 BOM 等浏览器的内置 API

### 可实现效果

1. 基于 [Express](http://www.expressjs.com.cn/) 框架，可以快速构建 Web 应用
2. 基于 [Electron](https://electronjs.org/) 框架，可以构建跨平台的桌面应用
3. 基于 [restify](http://restify.com/) 框架，可以快速构建 API 接口项目
4. 读写和操作数据库、创建实用的命令行工具辅助前端开发、etc...

## 安装运行

下面我们来安装开发用到的软件，访问 [https://nodejs.org/zh-cn/ (opens new window)](https://nodejs.org/zh-cn/)网站下载 LTS 版本，因为<word text="Node" />是开源的你也可以访问 [github (opens new window)](https://github.com/nodejs/node)了解源码。

![image-20230109014001481](https://doc.houdunren.com/assets/img/image-20230109014001481.1acc938d.png)

安装后执行以下命令，查看安装的<word text="Node" />版本

```sh
node -v
```

下面编写 `index.js` 内容如下

```js
console.log("hello node.js");
```

然后在命令行执行该文件，好可以查看到当前目录的 node.js 执行结果

```sh
node index.js
```

> **拓展：终端快捷键**
>
> 1. ↑：上一次执行的命令
> 2. tab：补全路径
> 3. esc：清空当前已输入的命令
> 4. cls：清空终端

## 类型支持

开发中经常需要使用<word text="TypeScript" />进行开发，所以我们来配置<word text="Node" />的<word text="TypeScript" />开发环境。

### 安装软件

首先安装 Ts 环境需要的软件

- [ts-node (opens new window)](https://github.com/TypeStrong/ts-node#overview) 使您能够直接在<word text="Node" />上执行 TypeScript.js 而无需预编译
- [nodemon (opens new window)](https://github.com/remy/nodemon) 监视源中的任何更改并自动重新启动服务器，非常适合开发。
- [typescript (opens new window)](https://www.tslang.cn/index.html#download-links) 安装<word text="TypeScript" />

执行以下命令进行安装

```bash
pnpm add -g add ts-node nodemon typescript @types/node
```

### 文件结构

最终的项目文件结构如下

```txt
├── package.json
├── pnpm-lock.yaml
└── src
    ├── http.ts
    └── index.ts
```

### package.json

创建 package.json 文件

```txt
pnpm init
```

package.json 文件内容为

- 将主文件修改为 **`index.ts`**
- 因为会自动调用 **`ts-node`** 命令，所以 dev 命令可以简写为 **`dev:nodemon`**

```json
{
  "name": "node",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "dev": "nodemon"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^18.7.8",
    "ts-node": "^10.9.1",
    "typescript": "^4.7.4"
  }
}
```

### tsconfig.json

然后创建 `tsconfig.json` 文件

```bash
tsc --init
```

配置项内容如下

```json
{
  "compilerOptions": {
    //ts编译为的ES的版本
    "target": "ESNext",
    //使用的模块规范
    "module": "NodeNext",
    //兼容common.js模块到ESM
    "esModuleInterop": true,
    //开启严格类型校验
    "strict": true,
    //允许导入扩展名为.json的模块
    "resolveJsonModule": true
  },
  //我们代码位置
  "include": ["./**/*"]
}
```

### 运行测试

下面我们来运行项目，项目的主文件是 **`src/index.ts`**，文件内容如下

```js
import os from 'os'

console.log(os.version())
```

接着执行命令来运行项目

```js
pnpm run dev
```
