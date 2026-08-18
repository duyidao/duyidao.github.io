# content-fix 进度

## 最后更新

2026-08-18（第 2 批完成：AI 实战系列 2 篇）

## 已处理（全仓覆盖）

### 第 2 批：AI 实战系列

| 文件                                                                               | 改动类型                                    | 改动说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `practice/ai/企业级AI应用开发实战(js版)/Function Tool.md`（原 `Function tool.md`） | 标题优化 + 文件名优化 + 去AI化 + 术语打标签 | H1 `Function tool`→`Function Tool`；H2/H3/H4 全部语义化改写（是什么→机制概述、问题思考→大模型操作局限、上下文方案解决→上下文方案、缺陷→上下文方案缺陷、function tool 解决→Function Tool 机制、定义 function tool→定义 Function Tool、代码→Function Tool 实现、加上流式→流式传输、执行 Function tool→执行 Function Tool、流程图→执行流程、代码→执行代码实现、过滤→前端消息过滤）；正文去AI化（一开始→首次、后续的...会拆成片段一点一点返回出去→拆成片段逐次返回）；文件名 `Function tool.md`→`Function Tool.md` 与 H1 一致 |
| `practice/ai/企业级AI应用开发实战(js版)/Token 消耗优化.md`                         | 标题优化 + 去AI化 + 术语打标签              | H2 `钱`→`Token 消耗机制`、`token 优化`→`Token 优化策略`、`其他优化`→`其他优化方式`；正文 `token`→`<word text="Token" />`、`RAG`→`<word text="RAG" />`                                                                                                                                                                                                                                                                                                                                                                     |

### 改名四项同步（Function tool → Function Tool）

- ✅ `src/文档元数据.json` 的 path 已为 `Function Tool`（无需修改）
- ✅ `config/themeConfig/sidebar/practice.ts` 两处引用均已注释，链接格式正确
- ✅ `config/rewrites.ts` 使用 glob 模式，无需修改
- ✅ 全仓搜旧名 `Function tool` 零残留

### 错别字修复（8 处）

| 文件                                  | 修复                             |
| ------------------------------------- | -------------------------------- |
| about/index.md                        | 远吗 → 源码                      |
| about/blog.md                         | 搜素 → 搜索                      |
| about/furtrue.md                      | 贩毒案 → 但后端，头像是 → 头像时 |
| about/project.md                      | tree-shinking → tree-shaking     |
| concept/react/Diff算法.md             | 及其重要 → 极其重要              |
| concept/sharp/typescript/类型.md      | 是是 → 是，包扩 → 包括           |
| concept/vue/vue2/基本概念与Vue指令.md | 找不不同 → 找不同                |
| work/灵思/音果云音/APP/详情.md        | 是是否 → 是否                    |

### 术语打标签（2 处）

| 文件             | 标签  |
| ---------------- | ----- |
| about/index.md   | Nginx |
| about/project.md | Gzip  |

### 元数据补齐（1 条）

新增 `about/pr` 条目。

### 词汇表新增（1 条）

新增 `Gzip`。

## 全仓校验结果

- frontmatter 残留：无（全仓扫描通过）
- 元数据覆盖率：全部目录均有对应条目（concept 131, practice 96, work 56, read 61, vitepress 7, about 7）
- 术语标签：大部分文档已打好标签，少数新增

## 统计

- 词汇表：133 条（本阶段新增 1：Gzip）
- 元数据：约 350+ 条（本阶段新增 1：about/pr）
- 已处理文档：全仓 200+ 篇（本批新增 2 篇 AI 实战系列）
- 错别字修复：8 处
- 术语打标签：2 处
- 标题优化：2 篇（共优化 20+ 个标题）
- 文件名优化：1 处（Function tool → Function Tool）

## 建议 commit

```
git add src/practice/ai/企业级AI应用开发实战\(js版\)/Function\ Tool.md
git rm src/practice/ai/企业级AI应用开发实战\(js版\)/Function\ tool.md
git add src/practice/ai/企业级AI应用开发实战\(js版\)/Token\ 消耗优化.md
git add skills/blog/content-fix/PROGRESS.md
git commit -m "fix(content): 优化 AI 实战系列文档标题、术语标签与表达规范"
```
