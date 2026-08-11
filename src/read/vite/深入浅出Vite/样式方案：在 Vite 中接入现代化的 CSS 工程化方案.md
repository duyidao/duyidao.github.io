# 样式方案：在 Vite 中接入现代化的 CSS 工程化方案

## 核心主旨

样式工程化是现代前端项目不可或缺的一环。原生 <word text="CSS"/> 存在开发体验欠佳、样式污染、浏览器兼容性差、产物体积过大等四大痛点。本文系统梳理了社区主流的 5 类 <word text="CSS"/> 工程化方案（<word text="CSS"/> 预处理器、<word text="CSS Modules"/>、<word text="PostCSS"/>、<word text="CSS in JS"/>、<word text="CSS"/> 原子化框架），并通过实战演示如何在 <word text="Vite"/> 中零配置或自定义接入这些方案，帮助你根据项目痛点选择合适的样式策略。

## 原生 CSS 的四大痛点与解决方案矩阵

### 原生 CSS 的核心问题

    ```css
    /* 问题1：开发体验欠佳 - 选择器无法嵌套，代码冗余 */
    .container .header .nav .title .text {
      color: blue;
    }
    .container .header .nav .box {
      color: blue;
      border: 1px solid grey;
    }

    /* 问题2：样式污染 - 全局类名冲突 */
    /* a.css */
    .container { color: red; }
    /* b.css */
    .container { color: blue; } /* 可能覆盖 a.css！*/

    /* 问题3：浏览器兼容 - 需手动添加前缀 */
    .element {
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
    }

    /* 问题4：产物体积 - 未使用的样式也被打包 */
    ```

### 五大解决方案对比矩阵

| 方案类型                    | 代表工具                                                      | 核心优势                             | 解决的问题              | 适用场景                            |
| --------------------------- | ------------------------------------------------------------- | ------------------------------------ | ----------------------- | ----------------------------------- |
| <word text="CSS"/> 预处理器 | <word text="Sass"/>/<word text="Less"/>/<word text="Stylus"/> | 变量、嵌套、逻辑控制                 | 开发体验、代码复用      | 传统项目、需要样式复用              |
| <word text="CSS Modules"/>  | 内置支持                                                      | 类名哈希化                           | 样式污染、命名冲突      | 组件化开发、隔离样式                |
| <word text="PostCSS"/>      | <word text="autoprefixer"/>/<word text="pxtorem"/>            | <word text="AST"/> 解析与转换        | 浏览器兼容、单位转换    | 跨浏览器适配、移动端                |
| <word text="CSS in JS"/>    | <word text="styled-components"/>/<word text="emotion"/>       | <word text="JS"/> 中写样式、动态样式 | 开发体验、样式隔离、DCE | <word text="React"/> 项目、动态主题 |
| <word text="CSS"/> 原子化   | <word text="Tailwind CSS"/>/<word text="Windi CSS"/>          | 原子类名、按需生成                   | 开发效率、产物体积      | 快速原型、设计系统                  |

##  CSS 预处理器实战：Sass/Less/Stylus

### Vite 的零配置支持

<word text="Vite"/> 内置对 <word text="CSS"/> 预处理器的支持，只需安装对应库即可使用：

```bash
# 安装 Sass（以 Sass 为例）
pnpm i sass -D
```

### 基础使用示例

```tsx
// src/components/Header/index.tsx
import './index.scss';

export function Header() {
  return <p className="header">This is Header</p>
}

// src/components/Header/index.scss
.header {
  color: red; // 支持嵌套语法
  &:hover {
    color: blue;
  }
}
```

### 全局变量注入配置 🔑

痛点：每次使用全局变量都需手动 `@import`，代码冗余。

解决方案：通过 `vite.config.ts` 的 `css.preprocessorOptions` 自动注入。

::: code-group
```typescript [vite.config.ts]
// vite.config.ts
import { defineConfig, normalizePath } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// 全局 scss 文件路径（使用 normalizePath 解决 Windows 路径问题）
const variablePath = normalizePath(path.resolve('./src/variable.scss'));

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
  }
})
```
```scss [使用效果.scss]
// src/variable.scss
$theme-color: red;
$font-size-base: 16px;

// 任意 .scss 文件中可直接使用，无需手动 import
.header {
  color: $theme-color;
  font-size: $font-size-base;
}
```
:::

### 预处理器配置项参考

| 预处理器 | 配置文档                                                                                                        | 常用配置项                        |
| -------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| Sass     | [官方文档](https://sass-lang.com/documentation/js-api/modules/?spm=a2ty_o01.29997173.0.0.277455fbWapgGs#render) | additionalData, implementation    |
| Less     | [官方文档](https://lesscss.org/usage/?spm=a2ty_o01.29997173.0.0.277455fbWapgGs#less-options)                    | additionalData, javascriptEnabled |
| Stylus   | [官方文档](https://stylus-lang.com/docs/js.html?spm=a2ty_o01.29997173.0.0.277455fbWapgGs)                       | additionalData, define            |

## CSS Modules：样式隔离的利器

### 开箱即用的使用方式

Vite 对后缀带有 `.module` 的样式文件自动应用 CSS Modules：
::: code-group
```tsx
// src/components/Header/index.tsx
import styles from './index.module.scss'; // 注意：文件名包含 .module

export function Header() {
  return <p className={styles.header}>This is Header</p>
}

// src/components/Header/index.module.scss
.header {
  color: red;
}
```
:::
浏览器渲染结果：
html
12
2. 自定义类名生成策略 🔑
通过 css.modules.generateScopedName 配置开发时的类名格式，提升调试体验：
typescript
12345678910
效果对比：
配置
生成类名示例
适用场景
默认
_header_kcvt0_1
生产环境
自定义
index__header___kcvt0
开发调试（可读性更强）
3. CSS Modules 配置项参考
完整配置项可查阅 postcss-modules 文档：
generateScopedName: 类名生成规则
hashPrefix: 哈希前缀
localsConvention: 类名转换规则（camelCase 等）
五、 PostCSS：CSS 的后处理器引擎
1. 核心能力与插件生态
<word text="PostCSS"/> 通过 <word text="AST"/>（抽象语法树）解析 <word text="CSS"/>，可实现：
自动添加浏览器前缀（<word text="autoprefixer"/>）
<word text="px"/> 转 <word text="rem"/>（<word text="postcss-pxtorem"/>）
支持最新 <word text="CSS"/> 语法（<word text="postcss-preset-env"/>）
代码压缩优化（<word text="cssnano"/>）
2. Autoprefixer 实战配置 🔑
bash
1
typescript
123456789101112131415
编译效果：
css
1234567891011
3. 主流 PostCSS 插件矩阵
插件名称
功能
适用场景
配置示例
<word text="autoprefixer"/>
自动添加浏览器前缀
跨浏览器兼容
overrideBrowserslist
<word text="postcss-pxtorem"/>
<word text="px"/> 转 <word text="rem"/>
移动端适配
rootValue: 16
<word text="postcss-preset-env"/>
支持最新 <word text="CSS"/> 语法
未来语法兼容
stage: 3
<word text="cssnano"/>
智能压缩 <word text="CSS"/>
生产环境优化
preset: 'default'
插件资源：探索更多插件请访问 https://www.postcss.parts/
六、 CSS in JS：在 JavaScript 中写样式
1. 主流方案对比
方案
<word text="Babel"/> 插件
特点
适用框架
<word text="styled-components"/>
<word text="babel-plugin-styled-components"/>
标签模板语法
<word text="React"/>
<word text="emotion"/>
<word text="@emotion/babel-plugin"/>
更轻量、性能优
<word text="React"/>/<word text="Vue"/>
2. Vite 集成配置 🔑
typescript
1234567891011121314151617181920
3. 使用示例
tsx
1234567891011121314151617181920212223242526
4. <word text="CSS in JS"/> 构建侧考量
考量维度
解决方案
选择器命名
<word text="Babel"/> 插件自动生成哈希类名
DCE（死代码消除）
<word text="Babel"/> 插件标记未使用样式
代码压缩
生产环境通过 <word text="Babel"/> 插件优化
<word text="SourceMap"/>
插件支持生成源码映射
<word text="SSR"/> 支持
框架提供服务端渲染 API
七、 CSS 原子化框架：Tailwind CSS vs Windi CSS
1. 方案对比
特性
<word text="Tailwind CSS"/> v2
<word text="Windi CSS"/>
<word text="Tailwind CSS"/> v3
编译速度
慢
快 20-100 倍
快（引入 <word text="JIT"/>）
按需生成
❌ 全量打包
✅ 按需编译
✅ <word text="JIT"/> 模式
高级功能
基础原子类
Attributify/Shortcuts
基础原子类
配置方式
tailwind.config.js
windi.config.ts
tailwind.config.js
2. Windi CSS 接入实战 🔑
安装与配置：
bash
1
typescript
12345678
tsx
12
使用示例：
tsx
12345678910
3. Windi CSS 高级功能
Attributify（属性化模式）
typescript
123456
使用效果：
tsx
123456789101112131415
类型声明（避免 TS 报错）：
typescript
123456
Shortcuts（快捷方式）
typescript
12345678
tsx
123
4. Tailwind CSS 接入流程
安装依赖：
bash
1
配置文件：
javascript
12345678910111213141516171819
入口文件引入：
css
1234
使用示例：
tsx
12345678
5. 原子化框架选型建议
项目特征
推荐方案
理由
追求极致开发速度
Windi CSS
编译快、Attributify 提升效率
需要稳定生态
Tailwind CSS v3
社区庞大、文档完善
已有 <word text="Tailwind CSS"/> v2 项目
升级到 v3
引入 <word text="JIT"/> 解决性能问题
需要高级定制
<word text="Windi CSS"/>
Shortcuts/Attributify 更灵活
八、 样式方案选型决策树
mermaid





Code
Preview
九、 小结与最佳实践
核心收获
<word text="CSS"/> 预处理器：<word text="Vite"/> 零配置支持，通过 additionalData 实现全局变量注入
<word text="CSS Modules"/>：.module 后缀自动启用，通过 generateScopedName 优化调试体验
<word text="PostCSS"/>：通过 <word text="AST"/> 实现浏览器兼容、单位转换等后处理能力
<word text="CSS in JS"/>：需配置 <word text="Babel"/> 插件解决 DCE、压缩、<word text="SSR"/> 等构建问题
<word text="CSS"/> 原子化：<word text="Windi CSS"/> 性能更优且功能丰富，<word text="Tailwind CSS"/> v3 生态更成熟
工程化最佳实践
typescript
123456789101112131415161718192021222324
方案组合推荐
项目类型
推荐组合
说明
企业级中后台
<word text="Sass"/> + <word text="CSS Modules"/> + <word text="PostCSS"/>
样式隔离、可维护性强
<word text="React"/> 组件库
<word text="emotion"/> + <word text="PostCSS"/>
动态样式、<word text="SSR"/> 友好
快速原型/个人项目
<word text="Windi CSS"/>
开发效率极高
移动端 H5
<word text="Less"/> + <word text="postcss-pxtorem"/> + <word text="PostCSS"/>
适配多端屏幕
💡 使用建议：本文档已完整覆盖从"原生 CSS 痛点"到"五大工程化方案"的实战落地路径，关键代码均附带配置说明与效果对比。可直接用于项目样式规范制定、技术选型评审或团队培训材料。如需针对某一方案（如 Windi CSS 的 Attributify 深度应用、PostCSS 自定义插件开发）展开技术拆解，可提供具体方向以便进一步补充。