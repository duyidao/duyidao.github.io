---
name: 'doc-format-fixer'
description: '消除 markdownlint 在 src/ 文档中报出的格式告警：先调配置收敛误报，再自动修复空白类规则，最后人工处理标题结构类规则。当用户提到 markdownlint 告警、文档格式警告、波浪线、MD009/MD032/MD041 等规则时调用。'
---

# 文档格式告警消除

处理 VS Code 中 `davidanson.vscode-markdownlint` 插件在 `src/` 文档上产生的波浪线。只做排版格式修复，不改写正文语义。

## 环境现状（全部实测）

- 插件：`davidanson.vscode-markdownlint-0.62.1`
- 项目配置：[.markdownlint.json](file:///c:/Users/EDY/Desktop/airport/duyidao.github.io/.markdownlint.json)，当前只放行了 `br/span/img/details/myIframe/word`，关闭 MD013/MD036/MD031
- [.vscode/settings.json](file:///c:/Users/EDY/Desktop/airport/duyidao.github.io/.vscode/settings.json) 已设 `editor.formatOnSave: false`，保存不触发格式化
- 项目**未安装** markdownlint 依赖，全部走 `npx`

### 基线：368 个文档，509 条告警，21 种规则

| 规则                 | 条数 | 处理方式               |
| -------------------- | ---- | ---------------------- |
| MD009 行尾空格       | 81   | 自动                   |
| MD024 重复标题       | 70   | 配置收敛（实测降到 3） |
| MD033 内联 HTML      | 56   | 配置放行（实测降到 0） |
| MD041 首行非一级标题 | 54   | 人工                   |
| MD047 末尾缺换行     | 53   | 自动                   |
| MD032 列表前后缺空行 | 51   | 自动                   |
| MD022 标题前后缺空行 | 44   | 自动                   |
| MD030 列表标记后空格 | 29   | 自动                   |
| MD010 硬制表符       | 22   | 自动                   |
| MD012 连续空行       | 16   | 自动                   |
| MD040 代码块缺语言   | 7    | 人工                   |
| MD025 多个一级标题   | 4    | 人工                   |
| MD049 强调风格       | 4    | 自动                   |
| MD028 引用块内空行   | 4    | 人工                   |
| MD007 列表缩进       | 4    | 自动                   |
| MD029 有序列表前缀   | 3    | 人工                   |
| MD001 标题层级跳跃   | 2    | 人工                   |
| MD027 引用块多余空格 | 2    | 自动                   |
| MD026 标题末尾标点   | 1    | 自动                   |
| MD019 标题多余空格   | 1    | 自动                   |
| MD034 裸 URL         | 1    | 自动                   |

### 实测的收敛效果（关键依据）

| 阶段                     | 告警总数 | 说明                  |
| ------------------------ | -------- | --------------------- |
| 基线                     | 509      | 当前配置              |
| 加 `MD024.siblings_only` | 442      | 减 67，仅影响 MD024   |
| 再放行 MD033 元素        | 386      | 减 56，MD033 归零     |
| 再执行 `--fix`           | **77**   | 减 309，13 种规则归零 |

`--fix` 实测可清零的规则：MD007、MD009、MD010、MD012、MD019、MD022、MD026、MD027、MD030、MD032、MD034、MD047、MD049。

`--fix` 实测**不能**处理的规则：MD001、MD024、MD025、MD028、MD029、MD040、MD041。

## 第一步：收敛配置（先做，能消掉 123 条误报）

编辑 [.markdownlint.json](file:///c:/Users/EDY/Desktop/airport/duyidao.github.io/.markdownlint.json)：

```json
{
  "MD033": {
    "allowed_elements": [
      "br",
      "span",
      "img",
      "details",
      "myIframe",
      "word",
      "svg",
      "path",
      "ol",
      "li",
      "a",
      "i",
      "strong"
    ],
    "table_allowed_elements": ["word", "br", "svg", "path"]
  },
  "MD024": { "siblings_only": true },
  "MD013": false,
  "MD036": false,
  "MD031": false
}
```

两处改动的依据：

**MD024 `siblings_only`**：只检查同一父标题下的直接子标题重名。实测 `src/about/pr.md` 的 5 条 MD024 全部归零，全库从 70 降到 3。剩下的 3 条是真正的同层级重名：`concept/sharp/typescript/类型.md:964`（`### TS 函数`）、`practice/handle/combat/不同尺寸自适应.md:162`（`### 百分比`）、`practice/idea/vue/更新机制和优化.md:320`（`#### 代码实现`）。

**MD033 元素放行**：实测告警元素只有 7 种，全部是作者刻意写的，不是误用：

| 元素               | 条数 | 出处                                               | 性质                                  |
| ------------------ | ---- | -------------------------------------------------- | ------------------------------------- |
| `<svg>`            | 20   | `concept/module/network/浏览器通信能力.md:166-169` | 表格里表示"支持/不支持"的绿勾红叉图标 |
| `<path>`           | 20   | 同上                                               | 图标路径                              |
| `<li>` `<a>` `<i>` | 各 4 | `about/blog.md:16-19`                              | 手写的 HTML 待办列表                  |
| `<strong>`         | 3    | `concept/react/ReactRouter6.md:13`                 | 强调文本                              |
| `<ol>`             | 1    | `about/blog.md:15`                                 | 列表容器                              |

注意：**markdownlint 不会把 `<KeepAlive>`、`<Home>` 这类组件名当成内联 HTML 报出来**，因为元素名必须是合法 HTML 标签才会命中 MD033。所以文档里大量反引号包裹的组件名不需要处理。

## 第二步：自动修复空白类

```powershell
npx --yes markdownlint-cli@0.41.0 -c .markdownlint.json --fix "src/**/*.md"
```

用 `markdownlint-cli` 而非 `markdownlint-cli2`：后者只读项目根配置、不认 `--config` 传入规则文件，实测传 `-c` 会被忽略。

**`--fix` 的行为已实测：**

1. MD009 的处理是安全的：3 个行尾空格会被规整为 2 个（保留硬换行语义），1 个空格直接删除
2. 会插入空行，导致**行号整体偏移**（`ArrayBuffer.md` 从 457 行变 460 行）。修复后必须重新扫描，旧行号清单作废
3. 保留原文件行尾符，CRLF 文件修完仍是 CRLF，LF 仍是 LF，不产生混用
4. 文件末尾只补一个换行，不会多加
5. 不修改代码块内部内容，只调整代码围栏前后的空行

修复后立刻复扫，确认归零：

```powershell
npx --yes markdownlint-cli@0.41.0 -c .markdownlint.json "src/**/*.md"
```

## 第三步：人工处理剩余 77 条

### MD041 首行非一级标题（54 条）

已确认分布：`read/javascript/ES6标准入门/` 26 个、`read/vue/Vue.js设计与实现/` 17 个、`read/css/CSS 技术揭秘与实战通关/` 11 个，特征是文件第 1 行就是 `##` 或 `###`。

与 [doc-content-editor](file:///c:/Users/EDY/Desktop/airport/duyidao.github.io/.trae/skills/doc-content-editor/SKILL.md) 的「唯一大标题」完全重叠。本 skill 只做机械提升：

- 首行是 `##` → 改为 `#`，其下所有标题层级上移一级
- 首行是 `###` → 改为 `#`，中间补一层 `##` 避免触发 MD001，或整篇重排
- `src/index.md` 是 `layout: home` 首页，**跳过**
- 提升前先确认文档内是否已有 `#`，有则会触发 MD025，需一并处理

若用户同时要求标题贴合内容、不重复，交 doc-content-editor，不要在此重复改。

### MD040 代码块缺语言（7 条）

已确认位置：

- `concept/sharp/node/fs.md:27`
- `read/javascript/ES6标准入门/Module的加载实现.md:211` 与 `:254`
- `read/javascript/ES6标准入门/Set和Map数据结构.md:276`
- `vitepress/dev.md:337`
- `work/百度/图业融合/MapVThree地图组件.md:13` 与 `:1008`

按内容补标注，**不确定就标 `text`，不要猜**：

| 内容特征                | 标注   |
| ----------------------- | ------ |
| JS 变量、函数、箭头函数 | `js`   |
| Shell 命令              | `sh`   |
| JSON 配置               | `json` |
| 纯文本输出、目录树      | `text` |

### MD025 多个一级标题（4 条）

已确认位置：

- `concept/javascript/knowledge/变量与严格模式.md:435`
- `concept/javascript/knowledge/运算符与流程控制.md:294`
- `concept/sharp/node/express.md:560`
- `concept/sharp/typescript/断言与枚举.md:41`

处理：保留第一个 `#`，后续的降为 `##`。降级后若其下已有 `##`，需同步降为 `###`，否则触发 MD001。

### MD028 引用块内空行（4 条）

已确认位置：

- `practice/handle/business/前端文件上传与相关操作.md:51`
- `read/css/CSS 技术揭秘与实战通关/background的进阶技巧与实战.md:277` 与 `:316`
- `read/css/CSS 技术揭秘与实战通关/clip-path实现不规则图形及溢出场景.md:201`

成因是两个引用块之间夹了空行。处理：给空行补 `>` 保持同一引用块，或拆成两个独立引用块并明确分隔。**先看原文意图再改**，直接删空行会把两段内容粘成一段。

### MD029 有序列表前缀（3 条）

全部在 `read/javascript/ES6标准入门/ArrayBuffer.md` 的 `:420`、`:434`、`:442`，原因是列表被代码块打断后编号从 2 开始递增。

处理：把被打断后的编号改回 `1.`，或给 MD029 配 `"style": "one"` 让全 `1.` 合法。**不要选 `ordered`**，会强制全篇递增编号，改动面过大。

### MD001 标题层级跳跃（2 条）

- `practice/idea/js/design/单例模式实现请求的复用与兼容.md:3`
- `practice/idea/js/design/组合模式实现商品卡不同类型.md:3`

均为 `#` 直接跳到 `###`。处理：在中间补一层 `##`，或把 `###` 提升为 `##`，按原段落语义归属决定。

### MD024 剩余 3 条

同层级真重名，需按 doc-content-editor 的规则改写标题语义，**不在本 skill 处理**：

- `concept/sharp/typescript/类型.md:964`（`### TS 函数`）
- `practice/handle/combat/不同尺寸自适应.md:162`（`### 百分比`）
- `practice/idea/vue/更新机制和优化.md:320`（`#### 代码实现`）

## 执行流程

1. 先跑基线，记录告警总数与规则分布
2. 改 `.markdownlint.json`：加 MD024 `siblings_only`、补 MD033 白名单，复扫确认降到 386 左右
3. 跑 `--fix` 修空白类，复扫确认降到 77 左右
4. 人工处理 MD041、MD040、MD025、MD028、MD029、MD001
5. 剩余 MD024 交内容 skill
6. 输出报告：基线 / 各阶段剩余 / 规则消减明细 / 最终剩余项
7. 清理 `.tmp-lint-*` 临时文件

## 注意事项

- **用 `markdownlint-cli` 加 `-c`**：`markdownlint-cli2` 的 `--config` 是它自己的配置文件格式，不认 markdownlint 规则文件，实测静默失效
- **PowerShell 中文路径乱码**：CLI 输出里的中文文件名会显示成 `ES6鏍囧噯鍏ラ棬`，规则编号正常。要精确定位就按行号在「问题」面板跳转，不要从终端输出里复制路径
- **不要点 VS Code 的「快速修复」批量改**：它对 MD009 会连硬换行的 2 个空格一起删，破坏作者刻意的换行。命令行 `--fix` 的处理是正确的
- **不要动 `<word text="..."/>` 组件**：已在白名单内，其间距由 [word.vue](file:///c:/Users/EDY/Desktop/airport/duyidao.github.io/components/word.vue) 的 `margin: 0 0.15em` 控制，不要在 Markdown 里手补空格
- **`--fix` 后行号已变**，任何后续编辑前都要重新扫描
- **CRLF/LF 保持原样**，不要用工具统一转换
- **`src/index.md` 全程跳过**，frontmatter 的 `hero` 含大量内联 SVG，规则不适用
- 文档中已被反引号包裹的 `<KeepAlive>`、`<Home>` 等组件名不会触发 MD033，无需处理

## 禁止事项

- 不改写正文内容、标题语义、代码逻辑（属 doc-content-editor）
- 不删除文档中任何技术要点
- 不为通过 MD040 而瞎标语言
- 不关闭 MD009 规则来"消除"告警
- 不把 MD033 白名单扩到 `div`、`table` 等通用标签，会掩盖真实问题
- 不提交 `.tmp-lint-*` 临时产物
