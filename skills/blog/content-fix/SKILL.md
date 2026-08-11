---
name: content-fix
description: duyidao.github.io 博客 md 文档内容优化规范（术语打标签、词汇表/元数据同步、去AI化改写、frontmatter 迁移、文件名优化与路由链接同步、Windows 终端命令约束、进度落盘与中断接管）。当用户要求"优化/修订/润色博客文档"，或编辑 src/**/*.md 时使用。
---

# 博客文档内容优化 Skill

## 适用范围

- 目标：`src/read/`、`src/concept/`、`src/work/` 下所有 `.md` 文档（其他目录仅在用户明确指定时处理）。
- 联动数据/配置文件（改文档必须同步维护）：
  - 术语词汇表：`src/术语词汇表.json`
  - 文档元数据：`src/文档元数据.json`
  - 侧边栏路由配置：`config/themeConfig/sidebar/` 下各 ts（about/concept/foot/practice/work/nav/sidebar.ts）
  - VitePress 路由映射：`config/vite/rewrites.ts`、导航配置 `config/themeConfig.ts` / `nav.ts`
- 进度文件：`skills/blog/content-fix/PROGRESS.md`（见「进度落盘与中断恢复」）。

## 执行流程（逐篇按序，完成一篇再下一篇）

0. 接管检查：会话开始时先读 `PROGRESS.md` 并运行 `git status`，核对并汇报断点
   （未处理文档、半成品 JSON、未同步改名）；文件不存在则盘点后创建。
1. 读取目标文档与各联动 JSON/配置，**以 JSON 现有字段结构为准**，不得自创新字段。
2. 文件名优化：不符合规范者按「文件名优化规范」改名，并完成四项同步
   （改名/搜索等 shell 操作必须使用 PowerShell 命令，见「终端环境约束」）。
3. 迁移 frontmatter：文档头部若存在 `--- ... ---` 块，将其字段按现有条目结构
   写入 `文档元数据.json`（以文档路径为键，已存在则合并更新），随后从文档中删除该块。
4. 改写正文：遵守「去AI化与表达规范」。
5. 术语打标签：遵守「术语标注规范」，并同步写入词汇表。
6. 补充结构：遵守「结构补充规范」。
7. 对照「禁止事项」「自检清单」逐项检查。
8. 每批结束按「进度落盘与中断恢复」回写 PROGRESS.md，并向用户建议提交。
9. 全部完成后输出变更摘要（文档数 / 改名文档 / 新增术语 / 新增元数据条目），
   并将 PROGRESS.md 标记为已完结。

## 进度落盘与中断恢复

聊天历史不随会话保留，接管唯一依据是 PROGRESS.md 与 git 状态：

1. 每批结束必须更新 `skills/blog/content-fix/PROGRESS.md`，模板：

   ```md
   # content-fix 进度

   ## 最后更新

   <时间>（第 N 批完成）

   ## 已处理

   - [x] src/practice/xxx.md（含改名/同步说明）

   ## 未处理

   - [ ] src/practice/aaa.md

   ## 待办事项

   - [ ] <未完成的同步 / 半成品 JSON / 待修正大写等>

   ## 统计

   词汇表共 N 条（本批新增 M）；元数据共 N 条（本批新增 M）
   ```

2. 新会话必须先执行流程第 0 步，不得重复处理「已处理」文档、不得遗漏「未处理」文档。
3. 用户未禁止 git 时，每批结束建议执行：
   `git add -A && git commit -m "content-fix: 第 N 批完成"`
4. 正常结束会话前，先回写 PROGRESS.md 再结束。

## 文件名优化规范

1. 命名约定：使用简洁的语义化**中文**，原则上与文档一级标题一致（去除标点与特殊符号）；
   不强制英文/拼音；文件名中若含术语，写法须与词汇表一致（首字母大写）。
   禁止：空格、中英文标点、特殊字符、无意义编号（如 `文档1.md`、`新建.md`）。
2. 已符合约定且与主题相符的不改。
3. **改名后强制同步（缺一即视为未完成）**：
   1. `src/文档元数据.json`：同步该条目中的路径/文件名字段；
   2. 侧边栏配置：`config/themeConfig/sidebar/` 对应文件中该条目的 link 路径；
   3. VitePress 路由：`config/vite/rewrites.ts`、nav 等路由配置中涉及旧名的映射；
   4. 全仓其他 md 文档中指向旧文件名的引用链接（`./xxx.md`、`/practice/xxx` 等）；
   5. 完成后必须全仓搜索旧文件名（含带 `.md` 与不带两种形式），确认零残留。

## 术语标注规范

1. 术语范围（仅这些才打标签并入表）：产品、框架、协议、算法、文件格式、行业专有名词
   （如 WebSocket、Kubernetes、VitePress、WebP、SVG、Lottie）。
2. **排除清单（不打标签、不入词汇表）**：
   - Vue 指令与语法：`v-model`、`v-for`、`v-if`、`v-else`、`v-show` 等；
   - Vue/JS API、hooks、组件语法：`ref`、`reactive`、`computed`、`watch`、`watchEffect`、
     `onMounted`、`props`、`slot`、`emit`、`defineExpose`、`defineProps`、`render`、`h` 等；
   - Web 平台方法/API 标识符：`requestAnimationFrame` 等函数名；
   - 通用编程词汇与普通英文单词。
3. **首字母大写规则**：所有术语统一首字母大写（lottie→Lottie、canvas→Canvas、
   base64→Base64）；官方写法本身首字母大写且含固定大小写的（WebP、TypeScript）保持官方写法。
   正文中的术语写法必须与词汇表条目完全一致（同一字符串）。
4. 标签写法：先全局搜索仓库中 `<word` 的既有用法，属性与闭合风格与其保持完全一致；
   若仓库无既有用法，统一使用 `<word text="术语" />`。
5. **标题豁免：任意层级标题（`#` ~ `######`）中的术语一律不打标签**，标题保持纯文本。
6. 每个术语同步写入 `src/术语词汇表.json`：按术语去重，已存在则跳过，不存在才追加。
7. 其他不打标签的位置：代码块内、链接文本内；同一段落同一术语只打一次；
   已打过标签的术语保持原样，但首字母不符合第 3 条时须修正写法并同步词汇表。

## 去AI化与表达规范

1. 删除套话与口语：「让我们」「你可以」「众所周知」「总之」「值得一提的是」、emoji、感叹号堆叠。
2. 结论先行：段首一句结论，再给理由；多用陈述句、祈使句，句子缩短。
3. 同一概念全文只用词汇表登记的唯一术语，禁止同义替换。
4. 只改表达不改事实：代码、命令、链接、数值一律保持原样
   （术语大写规则只作用于自然语言文本，代码与标识符不改）。

## 结构补充规范

1. 代码：统一带语言标签的围栏代码块（ts / bash / vue 等），代码必须完整可运行。
2. 表格：三项以上的对比（方案对比、参数说明、优劣）必须用表格。
3. 流程图：统一 Mermaid 语法（仅 flowchart / sequenceDiagram）；
   若站点未集成 Mermaid，则改为编号步骤的文字描述。
4. 标题层级最深到 `###`，不跳级。

## 终端环境约束（Windows PowerShell）

当前开发机终端为 **Windows PowerShell**，一切需要执行 shell 的操作（改名、搜索、删除等）
只允许使用 PowerShell 语法：

1. 重命名：`Rename-Item -LiteralPath '旧路径' -NewName '新文件名.md'`
   （或 `Move-Item -LiteralPath '旧路径' -Destination '新路径'`）；
2. 全仓查引用：`Select-String -Path 'src','config' -Pattern '旧名' -Recurse`，
   或改用编辑器内置全仓搜索，优先后者；
3. 中文文件名一律加引号；路径分隔符不得混用；
4. **禁止** Linux/bash 专属命令与路径：`mv`、`cat`、`export`、`grep`、`ln`、
   `~/.Trash`、`~/.bash_history` 等；
5. 提交：`git add -A && git commit -m "信息"`；
6. 对命令是否为 PowerShell 语法没有把握时，**先向用户确认再执行**，不得擅自运行。

## 禁止事项

- 不得移动文档所在目录（目录调整须用户确认）；文件名允许优化但必须完成同步流程。
- 不处理 `src/practice/` 之外的 md（除非用户指定）。
- 不臆造 JSON 字段、不删除 JSON 既有条目。
- 不得将排除清单中的标识符写入词汇表。
- 不得在标题中插入 `<word` 标签。
- 不得在终端执行 Linux/bash 专属命令（见「终端环境约束」）。
- 正常结束会话前不得跳过 PROGRESS.md 回写。
- 不确定的技术事实保留原文，不得编造。

## 自检清单

- [ ] 会话开始已执行接管检查（PROGRESS.md + git status）
- [ ] 文件名为语义化中文且与主题一致；若改名，元数据、sidebar、rewrites/nav、文内链接四处已同步且旧名全仓零残留
- [ ] 头部无残留 `---` frontmatter 块
- [ ] 词汇表无 `v-*` / `ref` / `computed` / `requestAnimationFrame` 等排除清单标识符
- [ ] 术语全部首字母大写，正文与词汇表写法完全一致，无重复条目
- [ ] 所有标题中均无 `<word` 标签
- [ ] 无去AI化黑名单词残留
- [ ] 代码块语言标签齐全
- [ ] `文档元数据.json` 中本文档条目存在且路径正确
- [ ] 本次执行的所有终端命令均为 PowerShell 语法，无 bash 专属命令
- [ ] 批次结束已回写 PROGRESS.md，内容与 git 状态一致
