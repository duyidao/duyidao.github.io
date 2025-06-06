---
layout: doc
title: 硅谷甄选项目简介
titleTemplate: 硅谷甄选项目简介
description: Vue3 TS 硅谷甄选 简介
head:
  - - meta
    - name: description
      content: 硅谷甄选项目简介
  - - meta
    - name: keywords
      content: Vue3 TS 硅谷甄选 简介
pageClass: myself-guigu-index
---

# 项目初始化

项目在线地址：[甄选](http://duyidao.gitee.io/selection/#/login?redirect=/home) 。

## 项目创建

本项目通过 `pnpm` 创建项目

::: code-group
```shell [安装pnpm]
npm i -g pnpm
```
```shell [项目初始化]
pnpm create vite
```
:::

创建完毕后会需要输入项目名称、项目框架、项目语言 `typescript` ，完毕后安装依赖即可运行。

运行项目的时候希望他能自动在浏览器开启新页面，修改一下命令：

```json
"dev": "vite --open",
```

## 检测工具

### eslint配置

**eslint中文官网:http://eslint.cn/**

ESLint最初是由[Nicholas C. Zakas](http://nczonline.net/) 于2013年6月创建的开源项目。它的目标是提供一个插件化的**javascript代码检测工具**

::: code-group
```shell [安装eslint]
pnpm i eslint -D
```
```shell [生成配置文件:.eslint.cjs]
npx eslint --init
```
```js [.eslint.cjs配置文件]
module.exports = {
   //运行环境
    "env": { 
      "browser": true,//浏览器端
      "es2021": true,//es2021
    },
    //规则继承
    "extends": [ 
      //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档
      //比如:函数不能重名、对象不能出现重复key
      "eslint:recommended",
      //vue3语法规则
      "plugin:vue/vue3-essential",
      //ts语法规则
      "plugin:@typescript-eslint/recommended"
    ],
    //要为特定类型的文件指定处理器
    "overrides": [
    ],
    //指定解析器:解析器
    //Esprima 默认解析器
    //Babel-ESLint babel解析器
    //@typescript-eslint/parser ts解析器
    "parser": "@typescript-eslint/parser",
    //指定解析器选项
    "parserOptions": {
      "ecmaVersion": "latest",//校验ECMA最新版本
      "sourceType": "module"//设置为"script"（默认），或者"module"代码在ECMAScript模块中
    },
    //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它
    //该eslint-plugin-前缀可以从插件名称被省略
    "plugins": [
      "vue",
      "@typescript-eslint"
    ],
    //eslint规则
    "rules": {
    }
}
```
:::

#### vue3环境代码校验插件

```json
# 让所有与prettier规则存在冲突的Eslint rules失效，并使用prettier进行代码检查
"eslint-config-prettier": "^8.6.0",
"eslint-plugin-import": "^2.27.5",
"eslint-plugin-node": "^11.1.0",
# 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低
"eslint-plugin-prettier": "^4.2.1",
# vue.js的Eslint插件（查找vue语法错误，发现错误指令，查找违规风格指南
"eslint-plugin-vue": "^9.9.0",
# 该解析器允许使用Eslint校验所有babel code
"@babel/eslint-parser": "^7.19.1",
```

安装指令

```shell
pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser
```

#### 修改.eslintrc.cjs配置文件

::: details .eslintrc.cjs配置文件
```js
// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /* 指定如何解析语法 */
  parser: 'vue-eslint-parser',
  /** 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* 继承已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', '@typescript-eslint'],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/semi': 'off',

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
    'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
  },
}
```
:::

#### .eslintignore忽略文件

```
dist
node_modules
```

#### 运行脚本

package.json新增两个运行脚本

```json
"scripts": {
  "lint": "eslint src",
  "fix": "eslint src --fix",
}
```

### 配置**prettier**

有了 `eslint`，为什么还要有 `prettier`？`eslint` 针对的是 JavaScript，他是一个检测工具，包含js语法以及少部分格式问题，在 `eslint` 看来，语法对了就能保证代码正常运行，格式问题属于其次；

而 `prettier` 属于格式化工具，它看不惯格式不统一，所以它就把 `eslint` 没干好的事接着干，另外，`prettier` 支持包含js在内的多种语言。总结起来，**eslint和prettier这俩兄弟一个保证js代码质量，一个保证代码美观。**

#### 安装依赖包

```shell
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
```

#### .prettierrc.json添加规则

```json
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

#### .prettierignore忽略文件

```
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```

**通过pnpm run lint去检测语法，如果出现不规范格式,通过pnpm run fix 修改**

### 配置stylelint

[stylelint](https://stylelint.io/)为css的lint工具。可格式化css代码，检查css语法错误与不合理的写法，指定css书写顺序等。

我们的项目中使用scss作为预处理器，安装以下依赖：

```shell
pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
```

#### .stylelintrc.cjs配置文件

**官网:https://stylelint.bootcss.com/**

```js
// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```

#### .stylelintignore忽略文件

```
/node_modules/*
/dist/*
/html/*
/public/*
```

#### 运行脚本

```json
"scripts": {
	"lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
}
```

最后配置统一的prettier来格式化我们的js和css，html代码

```
 "scripts": {
    "dev": "vite --open",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "fix": "eslint src --fix",
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
    "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
  },
```

**当我们运行`pnpm run format`的时候，会把代码直接格式化**

### 配置husky

在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。

要做到这件事情，就需要利用husky在代码提交之前触发git hook(git在客户端的钩子)，然后执行`pnpm run format`来自动的格式化我们的代码。

::: code-group
```shell [安装 husky]
pnpm install -D husky
```
```shell [执行]
npx husky-init
```
:::

会在根目录下生成个一个 `.husky` 目录，在这个目录下面会有一个 `pre-commit` 文件，这个文件里面的命令在我们执行 `commit` 的时候就会执行

在`.husky/pre-commit`文件添加如下命令：

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm run format
```

当我们对代码进行 `commit` 操作的时候，就会执行命令，对代码进行格式化，然后再提交。

### 配置commitlint

对于我们的commit信息，也是有统一规范的，不能随便写,要让每个人都按照统一的标准来执行，我们可以利用**commitlint**来实现。

::: code-group
```shell [安装包]
pnpm add @commitlint/config-conventional @commitlint/cli -D
```
```js [添加配置文件commitlint.config.cjs]
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
```
```json [package.json配置scripts命令]
# 在scrips中添加下面的代码
{
"scripts": {
    "commitlint": "commitlint --config commitlint.config.cjs -e -V"
  },
}
```
```shell 【配置husky
npx husky add .husky/commit-msg 
```
``` [commit-msg]
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm commitlint
```
:::

配置结束，现在当我们填写 `commit` 信息的时候，前面就需要带着下面的 `subject` 。当我们 commit 提交信息时，就不能再随意写了，必须是 `git commit -m 'fix: xxx'` 符合类型的才可以，**需要注意的是类型的后面需要用英文的 :，并且冒号后面是需要空一格的，这个是不能省略的**

```
'feat',//新特性、新功能
'fix',//修改bug
'docs',//文档修改
'style',//代码格式修改, 注意不是 css 修改
'refactor',//代码重构
'perf',//优化相关，比如提升性能、体验
'test',//测试用例修改
'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
'revert',//回滚到上一个版本
'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动
```

## 项目集成

### 集成element-plus

官网地址: https://element-plus.gitee.io/zh-CN/

```shell
pnpm install element-plus @element-plus/icons-vue
```

**入口文件main.ts全局安装element-plus,element-plus默认支持语言英语设置为中文**

```js
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
app.use(ElementPlus, {
    locale: zhCn
})
```

**图标引入**

```shell
pnpm install @element-plus/icons-vue
```

全局注册组件后，现在能够直接在项目里使用。

**Element Plus全局组件类型声明**

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

配置完毕可以测试element-plus组件与图标的使用.

### src别名的配置

在开发项目的时候文件与文件关系可能很复杂，因此我们需要给src文件夹配置一个别名！！！

::: code-group
```js [vite.config.ts]
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
            "@api": path.resolve("./src/api"),
      		"@comp": path.resolve("./src/components"),
      		"@v": path.resolve("./src/views")
        }
    }
})
```
```json [tsconfig.json]
{
  "compilerOptions": {
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { //路径映射，相对于baseUrl
      "@/*": ["src/*"],
      "@/*": ["src/*"],
      "@api/*": ["src/api/*"],
      "@comp/*": ["src/components/*"],
      "@v/*": ["src/views/*"]
    }
  }
}
```
:::

### 环境变量的配置

**项目开发过程中，至少会经历开发环境、测试环境和生产环境(即正式环境)三个阶段。不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。**

- 开发环境（development）
  顾名思义，开发使用的环境，每位开发人员在自己的dev分支上干活，开发到一定程度，同事会合并代码，进行联调。
- 测试环境（testing）
  测试同事干活的环境啦，一般会由测试同事自己来部署，然后在此环境进行测试
- 生产环境（production）
  生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(正式提供给客户使用的环境。)

> [!WARNING] ⚠ 注意
> 一般情况下，一个环境对应一台服务器,也有的公司开发与测试环境是一台服务器！！！

项目根目录分别添加 开发、生产和测试环境的文件!

```
::: code-group
``` [.env.development]
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = '刀刀甄选'
VITE_APP_BASE_API = '/dev-api'
```
``` [.env.production]
NODE_ENV = 'production'
VITE_APP_TITLE = '刀刀甄选'
VITE_APP_BASE_API = '/prod-api'
```
``` [.env.test]
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'test'
VITE_APP_TITLE = '刀刀甄选'
VITE_APP_BASE_API = '/test-api'
```
:::

配置运行命令：`package.json`

```json
 "scripts": {
    "dev": "vite --open",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pro": "vue-tsc && vite build --mode production",
    "preview": "vite preview"
  },
```

通过 `import.meta.env` 获取环境变量

```js
console.log(import.meta.env);

// 打印：
{
  BASE_URL: "/"
	DEV: true
	MODE: "development"
	PROD: false
	SSR: false
	VITE_APP_BASE_API: "/dev-api"
	VITE_APP_TITLE: "硅谷甄选运营平台"
	VITE_USER_NODE_ENV: "development"
}
```

### SVG图标配置

在开发项目的时候经常会用到 SVG 矢量图,而且我们使用 SVG 以后，页面上加载的不再是图片资源,

这对页面性能来说是个很大的提升，而且我们 SVG 文件比 img 要小的很多，放在项目中几乎不占用资源。

::: code-group
```shell [安装SVG依赖插件]
pnpm install vite-plugin-svg-icons -D
```
```js [vite.config.ts]
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
export default () => {
  return {
    plugins: [
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  }
}
```
```js [main.ts]
import 'virtual:svg-icons-register'
```
:::

#### svg封装为全局组件

因为项目很多模块需要使用图标,因此把它封装为全局组件！！！

::: code-group
```vue [src/components/SvgIcon/index.vue]
<template>
  <div>
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  //svg矢量图的名字
  name: String,
  //svg图标的颜色
  color: {
    type: String,
    default: ""
  },
  //svg宽度
  width: {
    type: String,
    default: '16px'
  },
  //svg高度
  height: {
    type: String,
    default: '16px'
  }
})
</script>
<style scoped></style>
```
```js [src/index.ts]
import SvgIcon from './SvgIcon/index.vue';
import type { App, Component } from 'vue';
const components: { [name: string]: Component } = { SvgIcon };
export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
    }
}
```
```js [main.ts]
import gloablComponent from './components/index';
app.use(gloablComponent);
```
:::

#### 拓展

1. SVG 的使用方式步骤如下：
   1. 外层使用 `svg` 图标容器节点
   2. 内部需要与 `use` 标签结合使用
   3. `xlink:href` 执行用哪一个图标，属性值务必为 #icon-图标名字
   4. `use` 标签 `fill` 属性可以设置图标颜色
   5. `svg` 中的 `style` 可以设置样式

   代码如下所示：

   ```vue
   <!-- svg：图标外层容器节点；内部需要与use标签结合使用 -->
   <svg style="width: 30px; height: 30px;">
     <!-- xlink:href执行用哪一个图标，属性值务必为 #icon-图标名字 -->
     <!-- use标签 fill 属性可以设置图标颜色 -->
     <use xlink:href="#icon-wechat" fill="skyblue"></use>
   </svg>
   ```

2. 全局组件自定义插件使用本质

   导出一个自定义插件，代码如下所示：

   ```js
   export default {
       install() {}
   }
   ```

   > [!WARNING] ⚠ 注意
   > 自定义插件内一定要使用 `install` 

   其 `install` 有一个形参，打印后内容如下所示：

   ![pCmf5Gt.png](https://s1.ax1x.com/2023/06/13/pCmf5Gt.png)

   因此可以通过 `component` 注册组件。注册完毕后入口文件导入自定义插件，通过 `app.use()` 注册插件即可。

### 集成sass

我们目前在组件内部已经可以使用scss样式,因为在配置styleLint工具的时候，项目当中已经安装过sass sass-loader,因此我们再组件内可以使用scss语法！！！需要加上lang="scss"

```vue
<style scoped lang="scss"></style>
```

接下来我们为项目添加一些全局的样式

在 `src/styles` 目录下创建一个 `index.scss` 文件，当然项目中需要用到清除默认样式，因此在 `index.scss` 引入 `reset.scss` 。

```scss
@import './reset.scss';
```

在入口文件引入

```js
import '@/styles/index.scss';
```

但是你会发现在 `src/styles/index.scss` 全局样式文件中没有办法使用$变量。因此需要给项目中引入全局变量$.

在 `styles` 文件夹下创建一个 `variable.scss` 文件！

在 `vite.config.ts` 文件配置如下:

```js
export default defineConfig((config) => {
	css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
	}
}
```

**`@import "./src/styles/variable.less";`后面的`;`不要忘记，不然会报错**!

配置完毕你会发现 `scss` 提供这些全局变量可以在组件样式中使用了！！！

### mock数据

安装依赖:https://www.npmjs.com/package/vite-plugin-mock

```shell
pnpm install -D vite-plugin-mock@2.9.6 mockjs
```

在 `vite.config.js` 配置文件启用插件。

```js
import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
export default ({ command })=> {
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
  }
}
```

在根目录创建mock文件夹:去创建我们需要mock数据与接口！！！在mock文件夹内部创建一个 `user.ts` 文件。

::: details  查看代码
```js
//用户信息数据
function createUserList() {
    return [
        {
            userId: 1,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}

export default [
    // 用户登录接口
    {
        url: '/api/user/login',//请求地址
        method: 'post',//请求方式
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码
            const { username, password } = body;
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
            )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            //如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: {checkUser} }
        },
    },
]
```
:::

**安装axios**

```shell
pnpm install axios
```

最后通过axios测试接口！！！

### axios二次封装

在开发项目的时候避免不了与后端进行交互,因此我们需要使用 `axios` 插件实现发送网络请求。在开发项目的时候我们经常会把 `axios` 进行二次封装。

目的:

1. 使用请求拦截器，可以在请求拦截器中处理一些业务(开始进度条、请求头携带公共参数)
2. 使用响应拦截器，可以在响应拦截器中处理一些业务(进度条结束、简化服务器返回的数据、处理http网络错误)

在根目录下创建 `utils/request.ts`

```js
import axios from "axios";
import { ElMessage } from "element-plus";
//创建axios实例
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use(config => {
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    //处理网络错误
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;
```

### API接口统一管理

在开发项目的时候,接口可能很多需要统一管理。在src目录下去创建api文件夹去统一管理项目的接口；

比如:下面方式

```js
// 统一管理用户相关接口
import http from '@/utils/request'

// 引入ts类型
import type { loginForm, loginResponseData, userResponseData } from './type'

// 通过枚举统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

// 暴露函数

// 登录
export const loginAPI = (data: loginForm) => http.post<any, loginResponseData>(API.LOGIN_URL, data)

// 获取用户信息
export const userinfoAPI = (data: any) => http.get<any, userResponseData>(API.USERINFO_URL)
```

定义一个 `type.ts` 文件定义类型，如下：

```ts
// 登录接口携带ts参数类型
export interface loginForm = {
  username: string,
  password: string
}

// 登录接口返回的数据类型
interface loginDataType {
  token: string
}
export interface loginResponseData = {
  code: number,
  data: loginDataType
}

// 定义服务器返回用户信息相关的数据类型
interface userinfoType {
  userId: number,
  avatar: string,
  username: string,
  password: string,
  desc: string,
  roles: string[],
  buttons: string[],
  routes: string[],
  token: string
}
interface userDataType {
  checkUser: userinfoType
}
export interface userResponseData {
  code: number,
  data: userDataType
}
```

## 项目的资源地址

服务器域名：http://sph-api.atguigu.cn

swagger文档:

- http://139.198.104.58:8209/swagger-ui.html
- http://139.198.104.58:8212/swagger-ui.html#/

echarts：国内镜像网站

- https://www.isqqw.com/echarts-doc/zh/option.html#title
- http://datav.aliyun.com/portal/school/atlas/area_selector

