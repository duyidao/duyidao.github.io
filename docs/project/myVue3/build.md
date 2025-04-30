# 打包配置

## 拿到打包命令参数

先安装一个类型提示包：

```bash
pnpm i @types/node -D -w
```

安装完毕后就有类型提示了。

一般情况下，打包命令都允许在后面添加参数，如：

```json
{
  "script": {
    "dev": "node scripts/dev.js --format cjs"
  }
}
```

表示我要打包成 `cjs` 格式。要如何接收参数呢？

通过 `process.argv` 可以获取到参数，效果如下：

![process.argv](https://pic1.imgdb.cn/item/6810e87d58cb8da5c8d4a006.png)

可以看到，`process.argv` 拿到的是一个数组，包含当前执行的文件路径，后面的元素就是参数。但是处理起来可能会很麻烦，所以我们可以借助 <SpecialWords text="Node" /> 自带的 `parseArgs` 方法来处理。

该方法需要传一个 `options` 对象，对象键名是前面命令参数携带的名称。

> [!NOTE] 关于名称
> 上方示例代码中参数名称是 `--format`，因此这里键名是 `format` 。如果前面的命令改为 `node scripts/dev.js ddd cjs`，则这里的键名就要改为 `ddd`。

键值是一个对象，包含以下属性：
- `type`：参数类型，可以是 `string`、`boolean`、`number`、`array`，默认是 `string`。
- `short`：简写，如 `--format` 可以简写为 `-f`。后续命令可以修改为 `node scripts/dev.js -f cjs`。
- `default`：默认值，如果命令中没有携带该参数，则使用默认值。

方法会返回一个对象，从 `values` 属性可以获取到参数值，它包含两个属性值：
- `format`：参数值。
- `positionals`：要打包的地址。

```js
import { parseArgs } from 'node:util';

const args = parseArgs({
  options: {
    format: {
      type: 'string',
      short: 'f',
      default: 'esm',
    },
  },
});

console.log(args); // { values: { format: 'cjs', positionals: [] } }
```

现在还没完成，打包的时候还要能指定打包的地址，也就是打包哪块文件夹，因此需要修改一下打包命令，添加地址参数。

```json
{
  "script": {
    "dev": "node scripts/dev.js reactivity --format cjs"
  }
}
```

对应的，也要在 `packages` 文件夹下新建两个文件夹作为对应的模块。此时项目目录结构如下：

```
|-packages
  |-reactivity
  |-vue
|-package.json
|-pnpm-workspace.yaml
```

此时，`dev` 命令的参数就变成了两个，一个是模块名称，一个是打包格式。执行 `dev` 命令后就会报错，信息如下：

![报错](https://pic1.imgdb.cn/item/6810ee8f58cb8da5c8d4a458.png)

提示我们需要添加地址参数。因此，`parseArgs` 也要修改一下，添加一个 `allowPositionals` 属性，再运行就不报错了。解构中可以通过 `positionals` 获取到地址参数，数据类型是一个数组。

```js
import { parseArgs } from 'node:util';

const {values: {format}} = parseArgs({ // [!code --]
const {values: {format}, positionals} = parseArgs({ // [!code ++]
  allowPositionals: true, // [!code ++]
  options: {
    format: {
      type: 'string',
      short: 'f',
      default: 'esm',
    },
  },
});

console.log(format, positionals); // cjs [ 'reactivity' ]
```

## 获取打包入口地址

接下来获取打包入口地址，也就是 `packages` 文件夹下对应的模块的入口文件地址。打包地址如果在 `A` 模块下是根目录的 `a.ts` 文件，在 `B` 模块下是 `src/b.ts` 文件，这样会很混乱，因此需要约定根据模块名称和获取的对应打包地址。例如统一在模块的根目录下 `src/index.ts` 文件作为入口文件。

在 `dev.js` 文件中，获取打包的模块名称后，通过模板字符串，拼接成对应的打包地址。

```js
const {
  values: { format },
  positionals,
} = parseArgs({
  allowPositionals: true, // 允许位置参数
  options: {
    format: {
      type: "string",
      short: "f",
      default: "esm",
    },
  },
});

const target = positionals.length ? positionals[0] : 'vue'; // 模块名称 // [!code ++]
const entry = path.resolve(__dirname, `../packages/${target}/src/index.ts`); // 打包入口地址 // [!code ++]
```

修改完后运行打包代码，会看到报错，信息如下：

![报错信息](https://pic1.imgdb.cn/item/6810f45458cb8da5c8d4a6c4.png)

因为 `path` 、 `__dirname` 等变量是属于 `commonjs` 语法的，目前运行的是 `esm` 语法，因此需要人为封装一下。

<SpecialWords text="Node" /> 提供了 `resolve` 、`dirname` 、`fileURLToPath` 方法，可以做如下封装：

```js
import { fileURLToPath } from 'node:url'; // [!code ++]
import { dirname, resolve } from 'node:path'; // [!code ++]
import { parseArgs } from 'node:util';

const {
  values: { format },
  positionals,
} = parseArgs({
  allowPositionals: true, // 允许位置参数
  options: {
    format: {
      type: "string",
      short: "f",
      default: "esm",
    },
  },
});


const __filename = fileURLToPath(import.meta.url); // [!code ++]
const __dirname = dirname(__filename); // [!code ++]

const target = positionals.length ? positionals[0] : 'vue'; // 模块名称
const entry = path.resolve(__dirname, `../packages/${target}/src/index.ts`); // 打包入口地址 // [!code --]
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`); // 打包入口地址 // [!code ++]
```

封装完后，运行代码，可以看到打包成功。控制台打印 `entry` 结果如下：
```bash
entry D:\myproject\b\myVue3\packages\reactivity\src\index.ts
```

## 输出打包结果

拿到打包入口地址后，就可以进行打包了。打完包要有一个输出的地址，可以输出到打包模块根目录下的 `dist` 文件夹中，和入口文件一样，通过 `resolve` 和 `__dirname` 模板字符串拼接的方式，得到输出地址。

引入 `esbuild` 模块用于打包，`esbuild` 调用它的 `context` 方法，传入一个对象参数，该参数包含如下属性值：
- `entryPoints`：打包入口文件地址，可以传入一个数组，数组中的每一项都是打包入口文件地址。
- `bundle`：是否打包，默认是 `false`，传入 `true` 即可。
- `outfile`：打包输出文件地址，可以传入一个字符串，也可以传入一个数组，数组中的每一项都是打包输出文件地址。
- `format`：打包输出格式，默认是 `esm`，可传 `cjs` 、`iife` 等。
- `platform`：打包输出平台，默认是 `browser`，可传 `node`。
- `sourcemap`：是否生成 `sourcemap`，默认是 `false`，传入 `true` 即可，方便线上调试。
- `globalName`：打包输出格式为 `iife` 时，需要传入一个全局变量名，用于挂载打包结果。

该方法返回的是一个 `Promise` 对象，通过 `then` 方法拿到打包结果。参数有一个 `watch` 方法，用于监听文件变化，重新打包。

```js
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parseArgs } from "node:util";
import esbuild from "esbuild"; // [!code ++]

const {
  values: { format },
  positionals,
} = parseArgs({
  allowPositionals: true, // 允许位置参数
  options: {
    format: {
      type: "string",
      short: "f",
      default: "esm",
    },
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const target = positionals.length ? positionals[0] : "vue"; // 模块名称
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`); // 打包入口地址

const outfile = resolve( // [!code ++]
  __dirname, // [!code ++]
  `../packages/${target}/dist/${target}.${format}.js` // [!code ++]
); // 打包输出地址 // [!code ++]

esbuild // [!code ++]
  .context({ // [!code ++]
    entryPoints: [entry], // [!code ++]
    bundle: true, // [!code ++]
    platform: format === "cjs" ? "node" : "browser", // [!code ++]
    sourcemap: true, // [!code ++]
    outfile, // [!code ++]
    format, // [!code ++]
  }) // [!code ++]
  .then((ctx) => { // [!code ++]
    ctx.watch(); // [!code ++]
  }) // [!code ++]
  .catch((err) => {}); // [!code ++]
```

此时打包后发现没啥内容，因为 `src/index.ts` 文件中没有代码，所以没有打包内容。在文件中添加一些代码即可。

```ts
export function fn (a, b) {
  return a + b;
}
```

## iife

目前能够满足 `cjs` 和 `esm` 两种模式的打包了，但是无法打包 `iife` 自执行函数格式，需要对外提供一个全局变量。对于 `monorepo` 项目来说，每个项目都能声明一个自己的 `package.json` 文件，新建一个，复制 <SpecialWords text="Vue" /> 的 `package.json` 文件，删改一下配置。

```json
{
  "name": "myvue3",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "dev": "node scripts/dev.js reactivity --format cjs",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^22.15.3",
    "esbuild": "^0.25.3",
    "typescript": "^5.8.3"
  }
}

```

解释一下上面的配置项：
- `version`：版本号，可以自定义。
- `name`：包名，可以自定义。
- `main`：入口文件，默认是 `index.js`，可以自定义。
- `description`：描述，可以自定义。
- `module`：ESM 模式的入口文件，默认是 `index.js`，可以自定义。
- `unpkg`、`jsdelivr`：CDN 地址，用户可以通过 CDN 把包拉入自己的项目中使用，可以自定义。
- `files`：打包后的发包会包含的文件，可以自定义。
- `sideEffects`：`tree-shaking` 用的。
- `buildOptions`：<SpecialWords text="Vue" /> 自己加的打包选项，和 `package.json` 没啥关系。
  - `name`：全局变量名，打包后 `window` 绑定的全局变量名，可以自定义。例如 CDN 导入 <SpecialWords text="Vue" /> 时，会挂载到 `window.Vue` 上。
  - `formats`：生产环境的打包格式，可以自定义。例如 `esm`、`cjs`、`iife` 等。

定义完毕后，返回 `dev.js` 文件，添加上 `iife` 所需要的配置项。

`iife` 需要引入各个模块的 `package.json` 文件，由于是动态引入，因此不能使用 `import` ，而是选择 `require`。但是 `ES module` 中不能使用 `require`，因此需要使用 <SpecialWords text="Node" /> 提供的 `createRequire` 方法，自己封装一个 `require` 方法。

拿到 `package.json` 文件的 `name` 方法后，把值赋值给 `globalName`，这样在打包的时候，会把 `globalName` 赋值给 `window` 对象，这样就可以在全局访问了。

```js
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parseArgs } from "node:util";
import esbuild from "esbuild";
import { createRequire } from "node:module"; // [!code ++]

const {
  values: { format },
  positionals,
} = parseArgs({
  allowPositionals: true, // 允许位置参数
  options: {
    format: {
      type: "string",
      short: "f",
      default: "esm",
    },
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url); // [!code ++]

const target = positionals.length ? positionals[0] : "vue"; // 模块名称
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`); // 打包入口地址

const outfile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`
); // 打包输出地址

const pkg = require(`../packages/${target}/package.json`); // [!code ++]

/**
 * 打印结果如下：
 * pkg {
    name: '@vue/reactivity',
    version: '1.0.0',
    description: '响应式模块',
    main: 'dist/reactivity.cjs.js',
    module: 'dist/reactivity.esm.js',
    files: [ 'index.js', 'dist' ],
    sideEffects: false,
    buildOptions: {
      name: 'VueReactivity',
      formats: [ 'esm-bundler', 'esm-browser', 'cjs', 'global' ]
    }
  }
 */

esbuild
  .context({
    entryPoints: [entry],
    bundle: true,
    platform: format === "cjs" ? "node" : "browser",
    sourcemap: true,
    outfile,
    format,
    globalName: pkg.buildOptions.name, // [!code ++]
  })
  .then((ctx) => {
    ctx.watch();
  })
  .catch((err) => {});
```

## 注意

`parseArgs` 方法是 <SpecialWords text="Node" /> 17.5.0 版本新增的，如果使用的是 `Node` 17.5.0 之前的版本，需要安装 `util` 模块。推荐升级到 18 版本之后。