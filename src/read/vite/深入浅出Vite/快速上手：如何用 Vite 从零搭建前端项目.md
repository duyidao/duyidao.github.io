# 快速上手：如何用 Vite 从零搭建前端项目

## 核心主旨
本节聚焦 <word text="Vite"/> 的工程落地实践，完整拆解从环境配置、脚手架初始化到核心运行原理与生产构建的全流程。重点阐释 No-Bundle 架构下的模块按需加载机制、配置体系的设计逻辑，以及开发/生产双环境的工程化差异，帮助开发者建立对现代构建工具链的直观认知与实操能力。

## 开发环境搭建与包管理器选型

现代前端工程对依赖管理工具的性能与安全性要求日益严苛。相较于存在幽灵依赖、磁盘冗余及安装瓶颈的 <word text="npm"/>/<word text="yarn"/>，强烈推荐使用 <word text="pnpm"/>。

```bash
# 1. 全局安装 pnpm（推荐 Node.js ≥ 12.0.0）
npm i -g pnpm

# 2. 切换至国内镜像源，大幅提升依赖下载稳定性与速度
pnpm config set registry https://registry.npmmirror.com/
```

选型逻辑：<word text="pnpm"/> 通过硬链接与符号链接机制，实现跨项目依赖共享，彻底解决传统包管理器的磁盘空间浪费与依赖树扁平化导致的隐式依赖问题，已成为现代前端项目的标配。

## 项目初始化与脚手架体验

通过官方脚手架命令一键生成项目结构，交互流程清晰高效：

```bash
pnpm create vite
```

- 交互路径：输入项目名 → 选择框架（<word text="React"/>/<word text="Vue"/>/<word text="Svelte"/> 等） → 选择语言（<word text="JS"/>/<word text="TS"/>）。
- 性能对比：相较于传统的 <word text="CRA"/>（<word text="create-react-app"/>），<word text="Vite"/> 脚手架在模板下载与依赖安装阶段速度提升近 6 倍，显著降低冷启动等待时间，提供"轻量、快速、简洁"的初体验。

## 核心运行机制：入口加载与 No-Bundle 理念

<word text="Vite"/> 彻底打破传统构建工具"先全量打包，后加载运行"的范式。项目根目录的 index.html 是 Dev Server 的唯一入口。
1. 入口声明与模块解析
   ::: code-group
    ```html
    <!-- index.html -->
    <body>
      <div id="root"></div>
      <!-- 关键声明：告知浏览器以 ESM 规范解析后续脚本 -->
      <script type="module" src="/src/main.tsx"></script>
    </body>
    ```
    ```tsx
    // /src/main.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import './index.css'   // ⚠️ 浏览器原生不支持直接导入 CSS
    import App from './App'
    ReactDOM.render(<App />, document.getElementById('root'))
    ```
    :::
2. 核心机制拆解

    - Dev Server 拦截与实时编译：浏览器识别 type="module" 后发起请求，<word text="Vite"/> Dev Server 拦截该请求，读取源码并在内存中完成 <word text="TSX"/> 剥离、<word text="CSS"/> 处理等操作，最终将标准 <word text="ESM"/> 格式返回给浏览器。
    - import = HTTP Request 范式：在 <word text="Vite"/> 开发环境中，每一个 import 语句都代表一次独立的 HTTP 请求。浏览器解析到新依赖后自动发起请求，<word text="Vite"/> 按需编译返回，形成动态依赖图。
    - No-Bundle 本质：开发阶段完全跳过递归打包过程，将模块加载任务交还给浏览器原生能力。这是 <word text="Vite"/> 实现冷启动提速与毫秒级热更新（<word text="HMR"/>）的根本原因。

## 配置文件解析与自定义能力 🔑

<word text="Vite"/> 支持 .js/.ts/.mjs 配置文件，工程实践中推荐使用 vite.config.ts 以获得完整的类型提示。

1. 默认配置结构
    
    ```typescript
    // vite.config.ts
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
      plugins: [react()] // 注入官方 React 插件，提供 JSX 编译与 HMR 支持
    })
    ```

2. 实战自定义：修改项目根目录

    当业务要求 `index.html` 不位于项目根目录，而是置于 `src/` 下时，可通过 `root` 参数调整扫描基准：

    ```typescript
    // vite.config.ts (自定义 root)
    import path from 'path'
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
      // 手动指定项目根目录位置，Dev Server 将在此路径下查找 index.html
      root: path.join(__dirname, 'src'),
      plugins: [react()]
    })
    ```

    配置解析：修改 `root` 后，访问 `localhost:3000` 时 <word text="Vite"/> 会直接从 `src/` 目录读取入口文件并返回，满足特殊目录结构或微前端基座场景的路由隔离需求。

## 生产环境构建与类型检查联动

澄清误区：<word text="Vite"/> 仅在开发期采用 No-Bundle，生产环境会自动切换至基于 <word text="Rollup"/> 的工业级全量打包模式，通过 <word text="Tree Shaking"/>、代码分割、压缩混淆等手段保障线上产物质量。

1. 构建脚本设计
    
    ```json
    // package.json
    {
      "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",   // ⚠️ 类型检查与构建串联
        "preview": "vite preview"
      }
    }
    ```

2. 类型检查与编译解耦机制

    ```json
    // tsconfig.json 关键配置
    {
      "compilerOptions": {
        "noEmit": true  // 仅执行静态类型校验，不输出任何编译产物
      }
    }
    ```
  
    机制解析：

    1. `tsc` 在此处的核心职责是静态类型校验。<word text="Vite"/> 底层使用 <word text="esbuild"/> 仅剥离类型注解进行极速编译，并未内置完整的 <word text="TypeScript"/> 类型推断系统。
    2. `&&` 串联确保构建流水线安全：仅在 tsc 类型检查全部通过后，才执行 vite build 进行生产打包。若存在类型错误，流程提前中断，保障线上代码健壮性。
    3. 打包完成后，pnpm run preview 启动本地静态服务器，模拟 <word text="CDN"/> 环境验证最终产物的执行效果与路由行为。

## 小结与进阶指引

本节完整跑通了 <word text="Vite"/> 项目从 0 到 1 的落地流程。核心收获在于：

- 理解 No-Bundle 开发范式与 import = HTTP Request 的按需加载逻辑。
- 掌握 vite.config.ts 核心配置项的扩展方式。
- 厘清开发期 <word text="esbuild"/> 极速编译与生产期 <word text="Rollup"/> 工业打包的双引擎架构差异。
- 明确 <word text="TSC"/> 类型检查与 <word text="Vite"/> 构建流程解耦的工程最佳实践。

掌握脚手架基础后，后续需深入配置体系、自定义插件开发、高级构建优化（如拆包策略、<word text="SSR"/> 搭建）及底层源码阅读，以应对复杂业务场景与性能瓶颈。