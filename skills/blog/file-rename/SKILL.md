---
name: file-rename
description: duyidao.github.io 博客文档按内容优化文件名规范（文件名与内容主题契合度判断、编辑器改名+四项同步、不可改时落 fallback 映射 JSON）。当用户要求"按内容改文件名""优化文件名"时使用。
---

# 博客文档文件名优化 Skill

## 适用范围与联动

- 递归枚举 `src/read/`、`src/concept/`、`src/work/`、`src/practice/` 下全部 `.md`。
- 联动文件：`src/文档元数据.json`、`config/themeConfig/sidebar/` 各 ts、
  `config/vite/rewrites.ts`、`config/themeConfig.ts`/`nav.ts`、全仓 md 内链。
- 进度文件：`skills/blog/file-rename/PROGRESS_FILE_RENAME.md`；
- fallback 映射：`skills/blog/file-rename/RENAME_SUGGESTIONS.json`。

## 判断标准

1. 读文档一级标题 + 首段 + 各小节标题，归纳主题；
2. 文件名与主题不契合（文不对题、过于宽泛、无意义编号、英中混拼等）→ 进入改名流程；
3. 命名约定：简洁语义化中文，原则上与一级标题一致（去标点）；术语写法与词汇表一致；
   禁止空格/标点/特殊字符/无意义编号。已契合的不改。

## 执行流程

1. 用编辑器重命名/文件工具改名（**禁止终端命令**）；
2. 四项同步（缺一即视为未完成）：
   1. `src/文档元数据.json` 的 path/文件名字段；
   2. `config/themeConfig/sidebar/` 对应文件该条目 link；
   3. `config/vite/rewrites.ts`、nav 等涉及旧名的映射；
   4. 全仓其他 md 指向旧名的引用链接；
3. 全仓搜旧名（带 `.md` 与不带两种形式）确认零残留；
4. **无法改名**（引用依赖过复杂、存在冲突、无把握）→ 不得硬改，
   写入 `RENAME_SUGGESTIONS.json`：
   `{ "src/xxx/旧名.md": "新名.md", ... }`，并在 PROGRESS 注明原因。

## 禁止事项

- 不得移动目录；不得执行终端命令；
- 本技能只改名与同步，**不改文档内容**。

## 自检清单

- [ ] 已改名文档四项同步完成、旧名零残留
- [ ] 未改名的不契合文档全部进入 RENAME_SUGGESTIONS.json 且附原因
- [ ] 本会话未执行终端命令，PROGRESS 已回写并给出建议 commit
