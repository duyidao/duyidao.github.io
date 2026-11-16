---
name: doc-component-checker
description: >-
  检查并修复文档里作者手写的自定义组件：word 与术语词汇表匹配、去掉组件旁多余空格、text 与词表键大小写一致、文档元数据.json 覆盖该文档。
  当用户要求检查/修复文档组件格式、word 用法、元数据缺失时使用。
  默认只处理用户点名的文件。
---

# 文档组件格式检查

只处理作者写在 Markdown 里的组件与对应 JSON。不改 `components/` 源码。

## 范围

- **默认**：只处理用户点名的 `.md`，以及为这些文档补的 JSON 条目。未点名先问。
- **跳过**：`src/index.md` 的元数据；代码块里的 `<word>` 示例。

正文里真正会手写的只有：

| 组件 | 用法 |
| --- | --- |
| `word` | `<word text="ES6" />`，查 `src/术语词汇表.json`，键精确匹配、区分大小写 |
| `myIframe` | 外链预览 |

`mdInfo`、`codeGroupMermaid`、`backtotop`、`themeSwitcher`、`dataPanel` 由主题或 markdown 插件注入，**不要在文档里补、也不要当缺失组件去修**。

`::: code-group` 里的 ` ```mermaid [标题] ` 会渲染成图，这是正常业务，与组件检查无关。

## 与其他文档 skill

同一批点名文件，放在最后：标题定稿后再写 `文档元数据.json` 的 `title`。

- 空白/层级：[doc-format-fixer](../doc-format-fixer/SKILL.md)
- 标题语义/正文：[doc-content-editor](../doc-content-editor/SKILL.md)
- **`word` 前后空格由本 skill 统一处理**（组件自带 `margin: 0 0.15em`），format-fixer 不要手补间距

## 检查一：word 与词表

对每个 `<word text="X"/>` 查 `src/术语词汇表.json`：

- 完全匹配 → 通过
- 仅大小写不同 → 改成词表里的键（如 `Javascript` → `JavaScript`，`npm` 作产品名时词表键是 `NPM`）
- 词表没有：
  1. 值得解释的核心术语 → 补条目：`en` / `cn` / `descript` / `tags`，中文客观描述
  2. 普通变量、版本号、语法片段、CSS 单位 → 去掉 `word`，还原为文本或行内代码

不要为 `Vue3.3`、`px`、`@typescript-eslint/parser` 建术语。CLI / 官方小写名（`pnpm`、`esbuild`、`innerHTML`）保持官方写法，先对齐已有键，避免改完反而查不到。

## 检查二：word 旁空格

去掉标签**前、后**的半角/全角空格，让中文直接贴标签。表格对齐、行内代码、代码块除外。去掉后会产生歧义时保留并在回复说明。

```markdown
需要理清<word text="ECMAScript"/>和<word text="JavaScript"/>的关系
```

## 检查三：元数据

键 = 文档相对路径（去 `src/` 与 `.md`，`/` 分隔）。全角 `：` `（）` `？` `+` 必须与文件名完全一致。

- 命中：`title`、`description` 非空，`tags` 为数组；`title` 与文中唯一 `#` 一致
- 未命中：补一条，`description` 40–80 字客观概括，`tags` 小写英文 2–5 个，`authors` 为 `[]`
- JSON 里有、文件没有：核对键名（常见是 `：` 写成 `-`）；确认文档已删才删条目

只为**当前点名文档**补/改条目，不要借机重排整个 JSON。

## 执行流程

1. 在点名文档里扫 `<word>` / `<myIframe>`
2. 修匹配、空格、大小写；必要时补词表
3. 核对该文档的元数据键
4. 报告：每类「发现 / 已修 / 需确认」

## 禁止

- 未点名就全库清空格或批量改 JSON
- 强行把官方小写 CLI 名改成首字母大写
- 改组件 `.vue` 来「修文档」
- 把 mermaid / code-group 当成缺失组件或错误标签
