---
name: 'doc-component-checker'
description: '检查并修复文档中自定义组件的使用格式：word 组件与术语词汇表匹配、去除组件前空格、统一词内首字母大写、校验文档元数据.json 是否覆盖该文档。当用户要求检查/修复文档组件格式、word 用法、元数据缺失时调用。'
---

# 文档组件格式检查

用于检查并修复 `src/` 下 Markdown 文档中自定义组件的书写规范。项目通过 `components/index.ts` 全局注册 `components/` 目录下所有 `.vue`，文档中可直接使用组件标签。

## 项目现状（已实测，作为判定基线）

### 组件清单

`components/` 下可用的全局组件：

| 组件               | 用途                           |
| ------------------ | ------------------------------ |
| `word`             | 术语高亮，带术语词汇表悬浮解释 |
| `myIframe`         | 外链页面内嵌预览               |
| `icon`             | iconify 图标                   |
| `codeGroupMermaid` | 代码组内嵌 Mermaid             |
| `dataPanel`        | 数据面板                       |
| `mdInfo`           | 文档信息栏                     |
| `backtotop`        | 回到顶部                       |
| `themeSwitcher`    | 主题切换                       |

实际使用量：`word` 约 2413 处（去重 191 个词），`myIframe` 54 处，其余组件在文档正文中未直接出现。

### word 组件结构

`components/word.vue` 接收单个 prop：

```vue
<word text="ES6" />
```

它通过 `import glossaryData from '../src/术语词汇表.json'` 查询 `glossaryData[props.text]`，**键名精确匹配、区分大小写**。命中时渲染悬浮提示，未命中时退化为普通高亮文本（无 tooltip）。

### 术语词汇表现状

`src/术语词汇表.json`：301 个键，结构为：

```json
{
  "Vite": {
    "en": "Vite",
    "cn": "Vite",
    "descript": "下一代前端构建工具，提供快速的开发服务器和优化的生产构建，由 Vue.js 作者开发。",
    "tags": ["build", "tool", "frontend"]
  }
}
```

其中 35 个键首字母是小写，多为 CLI 工具/包名/语法关键字，属于正确写法（`pnpm`、`yarn`、`core-js`、`esbuild`、`jQuery`、`innerHTML`、`getImageData`、`onResolve`、`vxe-table` 等），**不可强行大写**。

### 文档元数据现状

`src/文档元数据.json`：361 个键，键为文档相对路径（去掉 `src/` 前缀与 `.md` 后缀），如 `read/css/CSS 技术揭秘与实战通关/background的8种核心技巧`。值结构为：

```json
{
  "title": "CSS 最强大属性 background 的 8 种核心技巧",
  "description": "系统梳理 CSS background 的 8 种核心技巧……",
  "tags": ["css", "background"],
  "authors": []
}
```

`components/mdInfo.vue` 通过 `route.path` 匹配该 JSON 渲染文档信息栏，并对路径做 `decodeURIComponent` 与 `practice/` 前缀的容错匹配。

## 检查一：word 组件与术语词汇表是否匹配

对文档中每个 `<word text="X"/>`，判定 `X` 是否为 `术语词汇表.json` 的键：

- **完全匹配** → 通过
- **大小写不匹配但存在等价键** → 修正 `text` 值指向词表中的正确键。已实测存在的大小写错误：

  | 文档中写法                  | 词表正确键   |
  | --------------------------- | ------------ |
  | `<word text="npm"/>`        | `NPM`        |
  | `<word text="base64"/>`     | `Base64`     |
  | `<word text="Javascript"/>` | `JavaScript` |
  | `<word text="Typescript"/>` | `TypeScript` |

- **词表中完全不存在该词** → 分两种情况：
  1. 该词是本项目核心术语、值得解释 → 在 `术语词汇表.json` 中补充条目，字段 `en`/`cn`/`descript`/`tags` 与现有条目风格一致，`descript` 用中文、客观陈述、不加句末口语
  2. 该词只是普通变量名或无需解释 → 移除 `word` 标签，还原为普通文本或行内代码

  已实测的 21 个未命中词，供参考：

  | 词                          | 处理建议                           |
  | --------------------------- | ---------------------------------- |
  | `GitHub`                    | 补词表条目                         |
  | `Node`                      | 补词表条目                         |
  | `Angular`                   | 补词表条目                         |
  | `React Native`              | 补词表条目                         |
  | `ES Module`                 | 补词表条目                         |
  | `Render`                    | 补词表条目或还原文本               |
  | `file-saver`                | 补词表条目                         |
  | `NodeJS`                    | 建议改写为 `Node.js` 后补词表      |
  | `Vue-cli`                   | 建议改写为 `Vue CLI` 后补词表      |
  | `Vue-router`                | 建议改写为 `Vue Router` 后补词表   |
  | `Vue EventBus`              | 补词表条目                         |
  | `React Fiber`               | 补词表条目                         |
  | `React15.5`                 | 还原为文本，版本号不适合作为术语键 |
  | `Vue3.3`                    | 还原为文本，版本号不适合作为术语键 |
  | `@typescript-eslint/parser` | 还原为行内代码                     |
  | `px` / `rem`                | 还原为行内代码                     |
  | `Javascript`                | 见大小写修正表                     |

  补充条目时保持 JSON 缩进与键顺序风格，中文描述结尾不加句号之外的语气词。

## 检查二：word 组件前的空格

`word.vue` 的 `.special_words` 自带 `margin: 0 0.15em`，中文排版不需要额外空格。因此：

- 移除 `<word>` 标签**前面**的半角空格与全角空格（`U+3000`）
- 实测现状：166 个文件共 1356 处 `<word>` 前有空格，需全部清理
- 典型写法：

  ```markdown
  <!-- 修改前 -->

  需要理清 <word text="ECMAScript"/> 和 <word text="JavaScript"/> 的关系

  <!-- 修改后 -->

  需要理清<word text="ECMAScript"/>和<word text="JavaScript"/>的关系
  ```

- **只处理标签前面的空格**，标签后面的空格按同样原则处理（`/>` 之后紧跟的空格也去掉），实测 1386 处
- 不处理代码块、行内代码、表格对齐所需的空格
- 若去掉空格会导致中文与英文粘连歧义，保留原有间距并在回复中说明
- 间距统一交给组件内 `margin` 处理，**不要在 Markdown 里用空格或 `<br/>` 手动补间距**

## 检查三：word 组件内单词首字母大写

规则：`<word text="X"/>` 中的英文词统一首字母大写，其余字母按官方规范书写。

**必须大写的**（普通英文词、产品名、技术名词）：

- `javascript` → `JavaScript`（注意官方写法是 `JavaScript`，不是 `Javascript`）
- `typescript` → `TypeScript`
- `npm` → 指代 npm 这个包管理器时官方写作 `npm`（全小写）；词表键为 `NPM` 时以词表为准
- `github` → `GitHub`
- `nodejs` → `Node.js`
- `webpack` → `Webpack`
- `vue` → `Vue`
- `react` → `React`

**保持原样的**（官方写法就是小写，强行大写属错误）：

- CLI 命令与包名：`pnpm`、`yarn`、`npm`（命令语境）、`esbuild`、`core-js`、`autoprefixer`、`postcss-pxtorem`、`lint-staged`、`create-react-app`、`vite-plugin-svgr`、`imagemin`、`cssnano`、`pxtorem`
- 语法关键字与原生 API：`instanceof`、`innerHTML`、`getImageData`、`onResolve`、`onLoad`
- 第三方库的官方小写写法：`jQuery`（注意首字母 J 大写、后接小写 Q）、`html2canvas`、`vxe-table`、`uView`、`natapp`、`vue-color`、`styled-components`、`emotion`
- CSS 单位：`px`、`rem`、`em`、`vh`、`vw`

判定原则：**先查该词的官方文档写法，以官方为准；官方无明确写法时按「首字母大写、其余按词形」处理。**

实测需修正的首字母小写用法（26 个词中需处理的部分）：`file-saver`、`getImageData`、`base64`、`html2canvas`、`npm`、`jQuery`、`lint-staged`、`core-js`、`yarn`、`pnpm`、`create-react-app`、`esbuild`、`autoprefixer`、`pxtorem`、`styled-components`、`emotion`、`px`、`rem`、`postcss-pxtorem`、`postcss-preset-env`。

其中 `base64` → `Base64`、`npm` → `NPM`（与词表对齐）需要改；其余属官方小写写法，保留。修改前先对照词表已有键名，避免改了 `text` 反而导致查不到词汇表。

## 检查四：文档是否在文档元数据.json 中有对应数据

对每个 `src/**/*.md`，用相对路径（去 `src/` 前缀与 `.md` 后缀、统一用 `/` 分隔）在 `src/文档元数据.json` 中查找键。

- 命中 → 通过，同时校验 `title`、`description` 非空，`tags` 为数组
- 未命中 → 补齐条目，字段与现有条目一致：

  ```json
  "相对路径/文档名": {
    "title": "与文档一级标题一致的完整标题",
    "description": "一句话概括该文档解决什么问题、覆盖哪些要点，40-80 字，客观陈述",
    "tags": ["主技术栈", "具体知识点", "具体知识点"],
    "authors": []
  }
  ```

- `title` 必须与文档内 `#` 一级标题一致，不能是文件名直译
- `tags` 用小写英文，与现有条目风格一致，2-5 个

实测缺失元数据的 14 个文档：

| 文档相对路径                                                                  | 说明                              |
| ----------------------------------------------------------------------------- | --------------------------------- |
| `index`                                                                       | 首页 `layout: home`，**跳过不补** |
| `practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/LangChain框架`  | 需补                              |
| `practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/LLM是什么`      | 需补                              |
| `practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/前言`           | 需补                              |
| `practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/提示词工程`     | 需补                              |
| `practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/调试大模型 API` | 需补                              |
| `practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/项目搭建`       | 需补                              |
| `read/vite/深入浅出Vite/代码规范：如何利用 Lint 工具链来保证代码风格和质量？` | 需补                              |
| `read/vite/深入浅出Vite/双引擎架构：Vite 是如何站在巨人的肩膀上实现的？`      | 需补                              |
| `read/vite/深入浅出Vite/开篇：让 Vite 助力你的前端工程化之路`                 | 需补                              |
| `work/南网/无人机/Cesium室外实景模型渲染设计与实践`                           | 需补                              |
| `work/南网/无人机/企业级定时任务Cron表达式的前端优雅封装与实战`               | 需补                              |
| `work/南网/无人机/点云2D地图模块设计与实践`                                   | 需补                              |
| `work/南网/无人机/点云3D可视化与标注模块`                                     | 需补                              |

实测孤儿元数据键 7 个（JSON 里有、文档不存在或键名不匹配），需修正键名或删除：

| 元数据键                                                                     | 问题                                                |
| ---------------------------------------------------------------------------- | --------------------------------------------------- |
| `read/vite/深入浅出Vite/代码规范-如何利用 Lint 工具链来保证代码风格和质量？` | 实际文件名用全角冒号 `：`，键名用了半角 `-`         |
| `read/vite/深入浅出Vite/开篇`                                                | 实际文件名是 `开篇：让 Vite 助力你的前端工程化之路` |
| `concept/sharp/node/NPM`                                                     | 文档实际路径不匹配，需核对                          |
| `work/百度/图业融合/BUG修改与记录`                                           | 需核对实际路径                                      |
| `work/数说/需求洞察/Tooltip无法显示`                                         | 需核对实际路径                                      |
| `work/南网/无人机/公共视频播放组件的封装与拓展`                              | 需核对实际路径                                      |
| `practice/ai/企业级AI应用开发实战(js版)/markdown 语法及渲染`                 | 需核对实际路径                                      |

键名不匹配是高频问题，注意文件名中的全角符号（`：`、`（）`、`？`、`+`）必须与 JSON 键完全一致，`decodeURIComponent` 只能还原编码，不能修正字符差异。

## 执行流程

1. 先跑一遍全量扫描，产出四类问题清单（词表不匹配 / 空格 / 大小写 / 元数据）
2. 逐项修复，每修一类后复核，避免改 `text` 值导致词表命中率下降
3. 补充 `术语词汇表.json` 条目时保持 JSON 合法性（无尾逗号、双引号）
4. 补充 `文档元数据.json` 条目时保持键的字母序或原有分组顺序
5. 输出报告：每类问题「发现数 / 已修数 / 需人工确认数」

## 禁止事项

- 不改动代码块内的 `<word>` 示例
- 不把官方小写的 CLI 工具名强行大写
- 不为版本号、变量名、语法片段创建术语条目
- 不删除已有元数据条目，除非确认对应文档已不存在
- 不改动 `components/` 下的组件源码，组件样式问题不在本 skill 范围
