# 前端代码规范工具链

## 代码规范的重要性

在工程项目中，代码不仅是给机器执行的，更是给人阅读的。尤其是在多人协作的团队中，代码规范能够：

1. 统一团队代码风格，避免不同风格的代码混杂
2. 提高代码质量和可维护性
3. 提前规避语法错误
4. 提升团队协作效率

而要保证规范的落地，我们需要借助自动化的 Lint 工具链，将代码规范检查交给机器完成。

## JavaScript/TypeScript 规范工具：ESLint

### ESLint 简介

ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，由前端大牛 Nicholas C. Zakas（《JavaScript 高级程序设计》作者）在 2013 年创建。

核心特点：

- 插件化的 JavaScript 代码静态检查工具
- 通过解析代码的 AST（抽象语法树）来分析代码格式
- 检查代码的风格和质量问题
- 已成为前端项目的标配工具

### ESLint 初始化

安装 ESLint：

```bash
pnpm i eslint -D
```

执行初始化命令：

```bash
npx eslint --init
```

初始化过程中会进行命令行交互，选择适合项目的配置选项，最终自动生成 `.eslintrc.js` 配置文件。
手动安装依赖：

```bash
pnpm i eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest -D
```

### 核心配置解读

1. parser - 解析器

    ESLint 默认使用 Espree（基于 Acorn）进行 AST 解析，但 Acorn 不支持 TypeScript，因此需要引入专门的解析器。

    ```javascript
    // .eslintrc.js
    module.exports = {
      parser: '@typescript-eslint/parser', // 专门解析 TypeScript 语法
    }
    ```

    工作原理： `@typescript-eslint/parser` 将 TS 代码转换为 Espree 能够识别的 Estree 格式，然后在 ESLint 下进行格式检查。

2. parserOptions - 解析器选项

    可以对解析器进行能力定制：

    ```javascript
    module.exports = {
      parserOptions: {
        ecmaVersion: 'latest',        // 启用最新的 ES 语法（也可配置为 ES2015、ES6 等）
        sourceType: 'module',         // 使用 ES Module（默认为 'script'）
        ecmaFeatures: {
          jsx: true                   // 开启 JSX 支持
        }
      }
    }
    ```

3. rules - 具体代码规则

    rules 配置用于指定具体的代码规范规则：

    ```javascript
    module.exports = {
      rules: {
        // 规则 ID 配置方式
        "no-cond-assign": ["error", "always"],  // 数组形式：[规则级别, 具体配置]
        "quotes": "error",                       // 字符串形式
        "semi": 2,                               // 数字形式：0=关闭, 1=warn, 2=error
        
        // 自定义规则
        "no-console": "warn",                    // 禁止使用 console（警告级别）
        "prefer-const": "error"                  // 优先使用 const
      }
    }
    ```

    规则级别说明：

    - `"off"` 或 0：关闭规则
    - `"warn"` 或 1：开启规则，违反只抛出 `warning`
    - `"error"` 或 2：开启规则，违反抛出 `error`，程序会退出

4. plugins - 插件

    ESLint 本身没有内置 TypeScript 的代码规则，需要通过插件拓展：

    ```javascript
    module.exports = {
      plugins: [
        '@typescript-eslint',  // 可省略 'eslint-plugin-' 前缀
        'react',               // React 相关规则
        'prettier'             // Prettier 集成
      ]
    }
    ```

    注意： 添加插件后只是拓展了规则集，需要在 rules 中手动开启或调整：

    ```javascript
    module.exports = {
      rules: {
        '@typescript-eslint/ban-ts-comment': 'error',      // 禁止使用 @ts-xxx 注释
        '@typescript-eslint/no-explicit-any': 'warn'       // 禁止使用 any 类型（警告）
      }
    }
    ```

5. extends - 继承配置

    extends 用于继承其他 ESLint 配置，避免手动配置大量规则：

    ```javascript
    module.exports = {
      extends: [
        // 1. 从 ESLint 本身继承
        "eslint:recommended",
        
        // 2. 从 npm 包继承（可省略 'eslint-config-' 前缀）
        "standard",
        "airbnb",
        
        // 3. 从插件继承（格式：plugin:插件名/配置名）
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        
        // 4. Prettier 集成
        "prettier",
        "plugin:prettier/recommended"
      ]
    }
    ```

    推荐配置的便利性：

    ```javascript
    // 只需这一行，自动开启 @typescript-eslint 插件的推荐规则
    extends: ["plugin:@typescript-eslint/recommended"]
    ```

6. `env` 和 `globals`

    `env`（运行环境）： 预设全局变量

    ```javascript
    module.exports = {
      env: {
        browser: true,    // 启用浏览器全局变量（window, document 等）
        node: true,       // 启用 Node.js 全局变量（global, process 等）
        es2021: true      // 启用 ES2021 语法
      }
    }
    ```

    `globals`（全局变量声明）： 声明第三方库引入的全局变量

    ```javascript
    module.exports = {
      globals: {
        "$": "readonly",     // jQuery，不可重写
        "jQuery": "readonly",
        "Promise": "writable" // 可重写
      }
    }
    ```

    配置值说明：

    1. `"writable"` 或 `true`：变量可重写
    2. `"readonly"` 或 `false`：变量不可重写
    3. `"off"`：禁用该全局变量

### 完整的 ESLint 配置示例

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",  // 开启 Prettier 自动修复
    quotes: ["error", "single"],   // 使用单引号
    semi: ["error", "always"],     // 使用分号
    "react/react-in-jsx-scope": "off"  // React 17+ 不需要导入 React
  }
}
```

### ESLint 与 Prettier 强强联合

工具定位：

- `ESLint`：专注于代码风格检查和语法错误提示
- `Prettier`：专注于代码格式化，更加专业

安装 `Prettier`：

```bash
pnpm i prettier -D
```

创建 `.prettierrc.js` 配置文件：

```javascript
// .prettierrc.js
module.exports = {
  printWidth: 80,              // 一行最大字符数，超过换行
  tabWidth: 2,                 // 缩进空格数
  useTabs: false,              // 使用空格而非 tab
  singleQuote: true,           // 使用单引号
  semi: true,                  // 使用分号
  trailingComma: "none",       // 尾逗号设置
  bracketSpacing: true         // 对象大括号内空格：{ a: 1 }
}
```

安装集成工具：

```bash
pnpm i eslint-config-prettier eslint-plugin-prettier -D
```

- `eslint-config-prettier`：覆盖 ESLint 中与 Prettier 冲突的规则
- `eslint-plugin-prettier`：让 Prettier 接管 `eslint --fix` 的修复能力

定义 lint 脚本：

```json
// package.json
{
  "scripts": {
    "lint:script": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./src"
  }
}
```

执行检查：

```bash
pnpm run lint:script
```

VSCode 配置：

安装 ESLint 和 Prettier 插件，开启 `Format On Save`，保存时自动修复。

### 在 Vite 中接入 ESLint

安装 Vite ESLint 插件：

```bash
pnpm i vite-plugin-eslint -D
```

配置 `vite.config.ts`：

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteEslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    vue(),
    viteEslint(),  // 接入 ESLint 插件
  ]
})
```

优势：

- 在开发阶段实时扫描代码
- 在命令行展示规范问题
- 采用独立进程，不影响 Vite 启动速度

## 样式规范工具：Stylelint

### Stylelint 简介

Stylelint 是一个强大的现代化样式 Lint 工具，主要功能：

- 帮助避免 CSS 语法错误
- 统一样式代码风格
- 内置 170+ 个 CSS 书写规则
- 支持 CSS 预处理器（Sass、Less）
- 提供插件化扩展机制
- 被 Google、Github 等大型团队使用

### 安装与配置

安装工具包：

```bash
pnpm i stylelint stylelint-prettier stylelint-config-prettier \
  stylelint-config-recess-order stylelint-config-standard \
  stylelint-config-standard-scss -D
```

创建 `.stylelintrc.js` 配置文件：

```javascript
// .stylelintrc.js
module.exports = {
  plugins: ['stylelint-prettier'],  // 注册 prettier 插件
  extends: [
    'stylelint-config-standard',           // standard 规则集合
    'stylelint-config-standard-scss',     // SCSS 规则集合
    'stylelint-config-recess-order',      // 样式属性顺序规则
    'stylelint-config-prettier',          // Prettier 规则
    'stylelint-prettier/recommended'      // 推荐配置
  ],
  rules: {
    'prettier/prettier': true  // 开启 Prettier 自动格式化
  }
}
```

### Stylelint 的 rules 配置

Stylelint 的规则配置与 ESLint 类似，但有以下三种方式：

```javascript
module.exports = {
  rules: {
    // 1. null - 关闭规则
    "color-no-invalid-hex": null,
    
    // 2. 简单值 - 开启规则
    "indentation": 2,                    // 缩进 2 个空格
    "string-quotes": "single",           // 使用单引号
    
    // 3. 数组 - [简单值, 自定义配置]
    "color-hex-length": ["short", {      // 使用短十六进制
      "severity": "warning"              // 自定义严重级别
    }],
    "selector-pseudo-element-no-unknown": [true, {
      "ignorePseudoElements": ["v-deep"] // 忽略伪元素
    }]
  }
}
```

### 定义 lint 脚本

package.json 配置：

```json
{
  "scripts": {
    // 整合所有 lint 命令
    "lint": "npm run lint:script && npm run lint:style",
    
    // Stylelint 命令
    "lint:style": "stylelint --fix \"src/**/*.{css,scss}\""
  }
}
```

执行检查：

```bash
pnpm run lint:style
```

### 在 Vite 中集成 Stylelint

安装 Vite 插件：

```bash
# Vite 2.x
pnpm i @amatlash/vite-plugin-stylelint -D

# Vite 3.x 及以上版本
pnpm i vite-plugin-stylelint -D
```

配置 vite.config.ts：

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import viteStylelint from 'vite-plugin-stylelint'

export default defineConfig({
  plugins: [
    viteStylelint({
      exclude: /node_modules|windicss/  // 排除某些文件
    })
  ]
})
```

VSCode 配置：

安装 Stylelint 插件，实时感知样式代码规范问题。

## Husky + lint-staged 的 Git 提交工作流

### 为什么需要 Git 提交前检查？

问题：

- VSCode 插件和 Vite 插件只能提前暴露问题
- 不能保证开发者一定会修复
- 可能导致不符合规范的代码提交到仓库

解决方案：

在 `git commit` 时进行卡点检查，只有通过 Lint 检查才允许提交。

### Husky 安装与配置

安装 Husky：

```bash
pnpm i husky -D
```

初始化 Husky：

```bash
npx husky install
```

配置 package.json：

```json
{
  "scripts": {
    "prepare": "husky install"  // 在 npm install 后自动执行
  }
}
```

添加 pre-commit 钩子：

```bash
npx husky add .husky/pre-commit "npm run lint"
```

这会创建 `.husky/pre-commit` 文件，在 `git commit` 前执行 `npm run lint`。

> 注意事项：
> - Husky 4.x 及以下版本可在 package.json 中配置
> - Husky 7.x 及以上版本必须使用 husky install 和 husky add 命令

### lint-staged 解决全量扫描问题

问题：

直接在 Husky 中执行 `npm run lint` 会对全量代码进行检查，即使某些文件没有改动。随着项目增大，提交速度会越来越慢。

解决方案：

使用 `lint-staged` 只对暂存区（git add 的文件）进行 Lint 检查。

安装 lint-staged：

```bash
pnpm i -D lint-staged
```

配置 package.json：

```json
{
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "npm run lint:script",
      "git add ."
    ],
    "**/*.{scss,css}": [
      "npm run lint:style",
      "git add ."
    ]
  }
}
```

修改 `.husky/pre-commit`：

```bash
# 将原来的 "npm run lint" 替换为：
npx --no -- lint-staged
```

工作流程：
1. 执行 git commit
2. Husky 触发 pre-commit 钩子
3. lint-staged 扫描暂存区文件
4. 对匹配的文件执行对应的 lint 命令
5. 自动 git add 修复后的文件
6. 通过检查后完成提交

### Commitlint 规范提交信息
为什么需要规范 `commit` 信息？
- 方便团队协作
- 便于问题定位和追溯
- 自动化生成 CHANGELOG

安装工具：

```bash
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D
```

创建 `.commitlintrc.js`：

```javascript
// .commitlintrc.js
module.exports = {
  extends: ["@commitlint/config-conventional"]
}
```

Commit 信息格式：

```
<type>: <subject>
```

常用 type 类型：
- feat：添加新功能
- fix：修复 Bug
- chore：不影响功能的更改（如构建工具、依赖更新）
- docs：文档修改
- perf：性能优化
- refactor：代码重构（既不是新功能也不是 Bug 修复）
- test：添加或修改测试代码
- style：代码格式修改（不影响代码运行）

示例：

```bash
# ✅ 正确的提交信息
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复首页数据加载异常"
git commit -m "docs: 更新 README 文档"

# ❌ 错误的提交信息（会被拦截）
git commit -m "更新了代码"
git commit -m "fix bug"
```

添加 `commit-msg` 钩子：

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```

这会创建 `.husky/commit-msg` 文件，在提交时检查 `commit` 信息格式。

## 完整的工具链集成总结

### 工具链概览

| 工具        | 作用           | 检查内容                     |
| ----------- | -------------- | ---------------------------- |
| ESLint      | JS/TS 代码规范 | 语法错误、代码风格、最佳实践 |
| Prettier    | 代码格式化     | 缩进、引号、分号等格式统一   |
| Stylelint   | 样式代码规范   | CSS/SCSS 语法和风格检查      |
| Husky       | Git 钩子管理   | 在 commit 前执行检查脚本     |
| lint-staged | 增量检查       | 只对暂存区文件进行检查       |
| Commitlint  | 提交信息规范   | 检查 commit message 格式     |

### 完整的工作流程
```
开发者编写代码
    ↓
VSCode 插件实时检查（ESLint + Prettier + Stylelint）
    ↓
保存时自动格式化（Format On Save）
    ↓
执行 git add 添加文件到暂存区
    ↓
执行 git commit
    ↓
Husky 触发 pre-commit 钩子
    ↓
lint-staged 扫描暂存区文件
    ↓
对 JS/TS 文件执行 ESLint + Prettier
对 CSS/SCSS 文件执行 Stylelint
    ↓
Husky 触发 commit-msg 钩子
    ↓
Commitlint 检查提交信息格式
    ↓
所有检查通过 → 完成提交
    ↓
检查失败 → 中断提交，显示错误信息
```

### 完整的 package.json 示例

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    
    // 代码检查
    "lint:script": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./src",
    "lint:style": "stylelint --fix \"src/**/*.{css,scss}\"",
    "lint": "npm run lint:script && npm run lint:style",
    
    // 启动前安装 Husky
    "prepare": "husky install"
  },
  
  // lint-staged 配置
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "npm run lint:script",
      "git add ."
    ],
    "**/*.{scss,css}": [
      "npm run lint:style",
      "git add ."
    ]
  }
}
```

### VSCode 推荐配置
`.vscode/settings.json`：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### 推荐安装的 VSCode 插件

1. ESLint - 实时 ESLint 检查
2. Prettier - Code formatter - 代码格式化
3. Stylelint - 样式代码检查
4. Commitlint - 提交信息提示（可选）

## 常见问题与解决方案

### ESLint 与 Prettier 冲突

问题： ESLint 和 Prettier 的规则可能冲突（如引号、分号）。

解决方案：

```javascript
// .eslintrc.js
{
  "extends": [
    "eslint:recommended",
    "prettier",  // 放在最后，覆盖冲突规则
    "plugin:prettier/recommended"
  ]
}
```

### TypeScript 类型错误

问题： ESLint 报告 TypeScript 类型错误。

解决方案：

```javascript
// .eslintrc.js
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["plugin:@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",  // 放宽 any 限制
    "@typescript-eslint/ban-ts-comment": "off"     // 允许 ts-ignore
  }
}
```

### Husky 钩子不生效

问题： 执行 git commit 时没有触发检查。

解决方案：

1. 确认已执行 `npx husky install`
2. 检查 `.husky` 目录是否存在
3. 确认 `package.json` 中有 `"prepare": "husky install"`
4. 检查 `.husky/pre-commit` 文件权限（需可执行）

### lint-staged 检查过慢
问题： 即使使用 lint-staged，检查仍然很慢。

解决方案：

```json
{
  "lint-staged": {
    "**/*.{js,ts}": [
      "eslint --fix --quiet",  // 只修复，不输出警告
      "git add ."
    ]
  }
}
```

