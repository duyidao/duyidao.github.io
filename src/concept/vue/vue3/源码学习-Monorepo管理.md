# Monorepo

现在在 `monorepo` 中，除了前面的 `reactivity` 和 `vue` 两个包，我们再新增一个 `shared` 包，用于存放一些公共的工具函数，给其他包导入使用。他们配置分别如下：

- `reactivity`
  
  ::: code-group
  ```js [package.json]
  {
    "name": "@vue/reactivity",
    "version": "1.0.0",
    "description": "响应式模块",
    "main": "dist/reactivity.cjs.js",
    "module": "dist/reactivity.esm.js",
    "files": [
      "index.js",
      "dist"
    ],
    "sideEffects": false,
    "buildOptions": {
      "name": "VueReactivity",
      "formats": [
        "esm-bundler",
        "esm-browser",
        "cjs",
        "global"
      ]
    }
  }
  ```
  ```js [src/index.js]
  export function fn (a, b) {
    return a + b;
  }
  ```
  :::

- `vue`
  
  ::: code-group
  ```js [package.json]
  {
    "name": "vue",
    "version": "1.0.0",
    "description": "Vue总包",
    "main": "dist/vue.cjs.js",
    "module": "dist/vue.esm.js",
    "files": [
      "dist"
    ],
    "sideEffects": false,
    "buildOptions": {
      "name": "Vue",
      "formats": [
        "esm-bundler",
        "esm-browser",
        "cjs",
        "global"
      ]
    }
  }
  ```
  ```js [src/index.js]
  export function isObject (value) {
    return value !== null && typeof value === 'object'
  }
  ```
  :::

- `shared`
  
  ::: code-group
  ```js [package.json]
  {
    "name": "myshared",
    "version": "1.0.0",
    "description": "分享模块",
    "main": "dist/shared.cjs.js",
    "module": "dist/shared.esm.js",
    "files": [
      "index.js",
      "dist"
    ],
    "sideEffects": false,
    "buildOptions": {
      "name": "VueShared",
      "formats": [
        "esm-bundler",
        "esm-browser",
        "cjs",
        "global"
      ]
    }
  }
  ```
  ```js [src/index.js]
  export function isObject (value) {
    return value !== null && typeof value === 'object'
  }
  ```
  :::

现在 `reactivity` 模块想要引用 `shared` 模块的方法，除了 `import { isObject } from '../../shared'`，还可以 `import { isObject } from '@vue/shared'`。但是这么导入的话会报错，找不到模块，因为 `@vue/shared` 模块并没有被安装。

如果直接 `pnpm i @vue/shared --filter @vue/reactivity`，会把<word text="Vue" />官方的包也安装进去，这并不是我们想要的。如果想要安装本地的包，需要添加 `--workspace` 标记。

```sh
pnpm i @vue/shared --workspace --filter @vue/reactivity
```

> [!WARNING] 注意
> `--workspace` 标记表示在当前工作区安装包，`--filter` 标记表示在指定的包中安装包。

运行完毕后 `reactivity` 模块下的 `package.json` 文件中会多出以下内容：

```json [package.json]
{
  "dependencies": {
    "@vue/shared": "workspace:^"
  }
}
```

表示 `reactivity` 模块依赖 `@vue/shared` 模块，并且版本是 `workspace:^`，表示在当前工作区中找到 `@vue/shared` 模块。不过会出现<word text="TypeScript" />报错，因为 `@vue/shared` 模块并没有定义类型声明文件，所以需要手动添加类型声明文件。

在 `tsconfig.json` 中添加以下内容：

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ESNext", // 指定 ECMAScript 目标版本
    "module": "ESNext", // 指定模块代码生成规范
    "moduleResolution": "node", // 指定模块解析策略
    "outDir": "dist", // 指定编译输出的目录
    "resolveJsonModule": true, // 允许导入 JSON 文件
    "strict": false, // 关闭严格模式
    "lib": ["ESNext", "DOM"], // 指定要使用的库文件
    "paths": { // [!code ++]
      "@vue/*": ["packages/*/src"] // [!code ++]
    }, // [!code ++]
    "baseUrl": "./" // [!code ++]
  }
}
```

现在就可以在 `reactivity` 模块中使用 `@vue/shared` 模块了。