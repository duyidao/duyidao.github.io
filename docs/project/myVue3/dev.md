# 项目搭建

## 初始化

搭建一个新的项目，新建一个文件夹，初始化项目。

```sh
pnpm init
```

此时就新建好了一个初始项目。如果想要使用 `monorepo` 管理，需要在根目录下新建一个 `pnpm-workspace.yaml` 文件，创建完后就能变成一个 `monorepo` 管理的项目。

接着在 `pnpm-workspace.yaml` 文件写配置项：

```yaml
packages:
  - "packages/*"
```

这个配置项表示他会管理根目录下的 `packages` 文件夹内的全部文件。此时项目文件目录如下所示：

```
|-packages
|-package.json
|-pnpm-workspace.yaml
```

## 依赖下载

配置完毕后，如果想要下载依赖，用之前在根目录的终端下载依赖，会出现如下错误：

```bash
Running this command will add the dependency to the workspace root, which might not be what you want - if you really meant it, make it explicit by running this 
command again with the -w flag (or --workspace-root). If you don't want to see this warning anymore, you may set the ignore-workspace-root-check setting to true.
```

主要大意是如果想要往根路径安装依赖，则需要加一个 `-w` 的标记。

```sh
pnpm i typescript -D -w
```

## 配置esbuild

安装完 <SpecialWords text="TypeScript" /> 后输入命令 `npx tsc --init` 初始化，初始化完毕后能看到 `tsconfig.json` 文件，修改文件配置：

```json
{
  "compilerOptions": {
    "target": "ESNext", // 指定 ECMAScript 目标版本
    "module": "ESNext", // 指定模块代码生成规范
    "moduleResolution": "node", // 指定模块解析策略
    "outDir": "dist", // 指定编译输出的目录
    "resolveJsonModule": true, // 允许导入 JSON 文件
    "strict": false, // 关闭严格模式
    "lib": ["ESNext", "DOM"], // 指定要使用的库文件
    "paths": {
      "@vue/*": ["packages/*/src"]
    },
    "baseUrl": "./"
  }
}
```

接着安装 `esbuild` 依赖用于项目打包。

```sh
pnpm i esbuild -D -w
```

此时可以自己写打包配置，在 `package.json` 修改 `scripts` ，新增一个 `dev` 命令，配置打包命令。

```json
{
  "name": "myVue3",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "node scripts/dev.js", // [!code ++]
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "esbuild": "^0.25.3",
    "typescript": "^5.8.3"
  }
}
```

这条命令表示执行 `pnpm dev` 命令时，会运行 `scripts/dev.js` 文件代码。测试一下，对应目录下新建一个 `dev.js` 文件。

```js
// 打包开发环境
console.log('运行了dev.js')
```

运行结果如下所示：

![运行结果](https://pic1.imgdb.cn/item/6810dbf658cb8da5c8d47093.png)