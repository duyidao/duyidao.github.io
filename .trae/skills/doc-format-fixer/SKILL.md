---
name: doc-format-fixer
description: >-
  消除 src/ 下 Markdown 的 markdownlint 格式告警（空白、标题层级机械调整、代码围栏语言）。
  当用户提到 markdownlint、文档格式警告、波浪线、MD009/MD032/MD041 等规则时使用。
  默认只处理用户点名的文件；未明确要求全库时禁止 --fix src/**/*.md、禁止改 .markdownlint.json。
---

# 文档格式告警消除

只做排版格式修复，不改写正文语义、不改组件标签、不改代码块内部。

## 范围（必须先判定）

- **默认**：只处理用户点名的 `.md`。未点名则先问，不要扫全库。
- **全库**：仅当用户明确说「全库 / 全部文档 / 清掉所有波浪线」时，才对 `src/**/*.md` 跑命令。
- **跳过**：`src/index.md`（`layout: home`）。
- **配置**：`.markdownlint.json` 已含 MD024 `siblings_only` 与 MD033 白名单。不要为消告警再改配置，除非用户要求。

## 与其他文档 skill

按顺序串行，且都只作用于同一批点名文件：

1. 本 skill：空白类 `--fix` + 标题层级机械调整 + 代码围栏语言
2. [doc-content-editor](../doc-content-editor/SKILL.md)：标题语义、去口语、纠错
3. [doc-component-checker](../doc-component-checker/SKILL.md)：`word` / 元数据

MD041 / MD025 / MD001 的**机械升降级**由本 skill 完成。标题「写什么」交给 content-editor，本 skill 不重写标题用词。

## 站点约定：code-group 里的 mermaid 是正常业务

下列写法会渲染成图，**不是格式错误，不要改成普通代码块、不要删、不要包一层 HTML**：

````md
::: code-group
```ts [index.ts]
```

```mermaid [泳道图]
sequenceDiagram
```
:::
````

- 围栏语言 `mermaid` / `mmd` 合法，不当 MD040。
- `[泳道图]` 等方括号是 tab 标题，会匹配 `public/svg/` 文件名或 `config/vite/index.ts` 里 `customIcon` 的 key（如 `泳道图`、`时序图`、`流程图`、`less`）。不要改这些标题去「消告警」。
- 页面单独的 ` ```mermaid ` 同样是图，保持原样。

## 命令

用 `markdownlint-cli`（不要用 `markdownlint-cli2`，`-c` 会被忽略）：

```powershell
npx --yes markdownlint-cli@0.41.0 -c .markdownlint.json --fix "<点名文件>"
npx --yes markdownlint-cli@0.41.0 -c .markdownlint.json "<点名文件>"
```

全库时把路径换成 `src/**/*.md`。

注意：

- `--fix` 会插空行，**旧行号作废**，修完必须复扫。
- 保留原文件 CRLF/LF，不要统一换行符。
- PowerShell 终端里中文路径可能乱码，按行号在编辑器问题面板跳转。
- 不要用 VS Code「快速修复」批量清 MD009，会删掉刻意的两个空格硬换行。命令行 `--fix` 对 MD009 是：3 个尾空格收成 2 个，1 个删除。

`--fix` 可清：MD007、MD009、MD010、MD012、MD019、MD022、MD026、MD027、MD030、MD032、MD034、MD047、MD049。

`--fix` 不清、需人工：MD001、MD024、MD025、MD028、MD029、MD040、MD041。其中 MD024 同级真重名交给 content-editor。

## 人工规则

### MD041 首行不是一级标题

首行是 `##` / `###` 时，把原最高层提到 `#`，其余标题整体上移，避免 MD001 跳跃。文中已有 `#` 时按 MD025 处理。首页跳过。

### MD025 多个一级标题

保留第一个 `#`，后续 `#` 降为 `##`；其下已有 `##` 的同步降一级。合并用词、是否改成一篇主题名，交给 content-editor。

### MD001 层级跳跃

`#` 直接到 `###`：按段落归属补 `##`，或把 `###` 提成 `##`。

### MD040 代码块缺语言

按内容补：`js` / `ts` / `sh` / `json` / `text`。不确定标 `text`，不要猜。`mermaid`、`mmd`、`vue`、`html` 已有则不动。

### MD028 引用块内空行

先看是两段独立引用还是同一引用被空行切断。补 `>` 或明确拆开，不要直接删空行把两段粘在一起。

### MD029 有序列表被代码块打断

打断后的编号改回 `1.`。不要给 MD029 配 `ordered` 去强制全篇递增。

## 执行流程

1. 确认文件名单（默认 = 用户点名）
2. 对该名单 `--fix`，再无 `--fix` 复扫
3. 人工处理 MD041 / MD025 / MD001 / MD040 / MD028 / MD029
4. 同级重名 MD024 列入「交 content-editor」，本 skill 不改标题用词
5. 报告：处理文件、规则消减、剩余项、是否需要下一个 skill

## 禁止

- 未点名就 `--fix` 全库，或改 `.markdownlint.json` 来「消掉」告警
- 关闭 MD009；把 MD033 白名单扩到 `div` / `table`
- 改正文语义、`<word>`、代码逻辑
- 把 code-group 里的 mermaid 改成截图、普通代码或 HTML
- 提交 `.tmp-lint-*`
