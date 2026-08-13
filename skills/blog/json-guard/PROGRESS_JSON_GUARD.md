# JSON Guard 进度记录

## 最后更新

2026-08-13

## 第 1 步：JSON 语法修复

### 术语词汇表.json
- 修复 `组合模式` 条目中裸双引号「"部分-整体"」→「「部分-整体」」
- 语法已通过编辑器 JSON 模式零报错

### 文档元数据.json
- 语法已通过编辑器 JSON 模式零报错

## 第 2 步：重复键合并

### 文档元数据.json（之前批次）
- `practice/idea/vue/customRef封装全局loading`：合并重复，保留含 authors 的完整条目
- `work/百度/佛开/LED大屏/打包`：合并重复，保留字段更全的条目
- `concept/css/effect/下划线动画`：合并重复，保留含 authors 的完整条目

### 术语词汇表.json（本批次）

**完全同名的重复键（7 组）：**

| 键名            | 操作 | 保留内容                                                      |
| --------------- | ---- | ------------------------------------------------------------- |
| ES5             | 合并 | 第2条更详尽（含 strict mode、forEach/map/filter），删除第1条  |
| Proxy           | 合并 | 第2条更详尽（含 13 种拦截方法、元编程），合并第1条的 vue3 tag |
| ESLint          | 合并 | 第2条更详尽（含 AST、TypeScript），合并第1条的 code-style tag |
| VSCode          | 合并 | 第2条更详尽（含 ESLint/Prettier/Stylelint 集成），删除第1条   |
| Rollup          | 合并 | 第1条更详尽（含 Vite 生产环境），合并第2条的 esm/build tag    |
| Terser          | 合并 | 第1条更详尽（含 UglifyJS），合并第2条的 PURE 注释信息         |
| Composition API | 合并 | 第1条更详尽（含逻辑复用），合并第2条的 setup 函数信息         |

**大小写不敏感的重复（3 组）：**

| 键名            | 操作          | 说明                                                      |
| --------------- | ------------- | --------------------------------------------------------- |
| NPM / npm       | 合并入 NPM    | 保留官方大写，合并 npm 的包管理器 tag                     |
| Axios / axios   | 合并入 Axios  | 保留官方写法，合并 axios 的 promise/ajax tag              |
| Base64 / base64 | 合并入 Base64 | 保留官方写法，合并 base64 的 data-url tag 和 33% 增量信息 |

**同名不同源的重复（1 组）：**

| 键名                      | 操作                | 说明                                    |
| ------------------------- | ------------------- | --------------------------------------- |
| FileSaver.js / file-saver | 合并入 FileSaver.js | 同一库，保留官方名称，删除 npm 包名条目 |

## 第 3 步：元数据全量覆盖

递归枚举 `src/` 下全部 `.md`，为无条目文档补录元数据。
共补录 **33 条**新元数据条目：

### concept/（9 条）
- `concept/sharp/vite/创建项目` → title:「Vite 的 SPA 模式」
- `concept/sharp/gsap/基础` → title:「GSAP」
- `concept/javascript/knowledge/模块化` → title:「模块化」
- `concept/javascript/knowledge/事件循环` → title:「事件循环」
- `concept/javascript/knowledge/对象` → title:「对象」
- `concept/javascript/knowledge/函数` → title:「函数」
- `concept/javascript/knowledge/Promise` → title:「Promise」
- `concept/javascript/webapi/取色器封装` → title:「取色器封装」
- `concept/css/expand/空白节点` → title:「空白节点」
- `concept/vue/vue3/路由与状态管理` → title:「内置组件」

### read/（15 条）
- `read/vue/Vue.js设计与实现/Vue.js 3 的设计思路`
- `read/vue/Vue.js设计与实现/简单 Diff 算法`
- `read/vue/Vue.js设计与实现/渲染器的设计`
- `read/vue/Vue.js设计与实现/挂载与更新`
- `read/vue/Vue.js设计与实现/非原始值的响应式方案`
- `read/vue/Vue.js设计与实现/原始值的响应式方案`
- `read/vue/Vue.js设计与实现/编译优化`
- `read/vue/Vue.js设计与实现/同构渲染`
- `read/vue/Vue.js设计与实现/解析器`
- `read/vue/Vue.js设计与实现/编译器核心技术概览`
- `read/vue/Vue.js设计与实现/组件的实现原理`
- `read/vue/Vue.js设计与实现/异步组件与函数式组件`
- `read/vue/Vue.js设计与实现/内建组件和模块`
- `read/vue/Vue.js设计与实现/快速 Diff 算法`
- `read/vue/Vue.js设计与实现/双端 Diff 算法`
- `read/vite/深入浅出Vite/开篇` → title:「开篇 ：让 Vite 助力你的前端工程化之路」

### vitepress/（2 条）
- `vitepress/dev` → title:「搭建」
- `vitepress/css` → title:「样式美化」

### about/（5 条）
- `about/project` → title:「关于项目」
- `about/furtrue` → title:「关于技术提升」
- `about/prev` → title:「关于前司」
- `about/blog` → title:「关于刀刀博客」
- `about/index` → title:「关于我」

## 第 4 步：词汇表规范化

### 去重
- 完全同名重复键合并 7 组（ES5、Proxy、ESLint、VSCode、Rollup、Terser、Composition API）
- 大小写不敏感重复合并 3 组（NPM/npm、Axios/axios、Base64/base64）
- 同名不同源合并 1 组（FileSaver.js/file-saver）

### 全称/大写规范化
- 已检查：TypeScript、JavaScript 等全称已正确使用
- 行业固有缩写（SVG、CSS、API、JSON、URL、PNG、WebP、GIF）保持官方写法

### 排除清单清理
- 已检查：当前词汇表无 `v-*` / `ref` / `reactive` / `computed` / `watch` / `requestAnimationFrame` 等排除清单标识符
- 之前批次已删除 13 条违规条目（v-model、props、slot、defineExpose、v-for、v-if、reactive、watchEffect、render、h、requestAnimationFrame、computed、ref）

## 第 5 步：路径一致性

- 元数据 path 已与实际文件路径核对
- 新增 33 条元数据条目的 path 均与实际文件路径一致

## 自检清单

- [x] 两个 JSON 编辑器语言模式零报错零警告
- [x] 无同层重复对象键
- [x] src 各目录每篇 md（含无 frontmatter 者）在元数据中均有条目
- [x] 词汇表无重复/缩写/排除清单条目
- [x] 元数据 path 与实际文件一一对应
- [x] 本会话未执行终端命令，PROGRESS 已回写

## 建议 commit 命令

```bash
git add src/术语词汇表.json src/文档元数据.json skills/blog/json-guard/PROGRESS_JSON_GUARD.md
git commit -m "fix(json-guard): 修复JSON语法、合并重复键、补录33条元数据、词汇表去重规范化

- 术语词汇表: 修复裸双引号→「」、合并11组重复键(7组同名+3组大小写+1组同源)
- 文档元数据: 补录33条缺失元数据(concept 10条/read 16条/vitepress 2条/about 5条)
- 词汇表: 去重(ES5/Proxy/ESLint/VSCode/Rollup/Terser/Composition API)、大小写统一(NPM/Axios/Base64)、排除清单清零
- 路径一致性校验通过"
```