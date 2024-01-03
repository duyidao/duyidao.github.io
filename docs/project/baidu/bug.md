---
title BUG


---

# 抓虫记录

## 与JSON有关

### Uncaught (in promise) SyntaxError: Unterminated string in JSON at position 204800 (line 1 column 204801)

- 报错原因：

  这个错误通常表示在解析 JSON 数据时出现了语法错误。在你的情况下，JSON 字符串中存在一个未结束的字符串，在第 1 行第 204801 列（或者附近的位置）。

  在解决这个问题之前，你需要确定你正在处理的是 JSON 格式的数据。如果是，请检查 JSON 字符串是否正确格式化并且所有双引号都有成对出现。

  可以通过以下步骤来查看 JSON 字符串中的错误：

  1. 打开浏览器的开发者工具，并切换到“控制台”选项卡。
  2. 复制出现错误的 JSON 字符串。
  3. 在控制台中输入 `JSON.parse(yourJsonString)`，其中 `yourJsonString` 是你复制的 JSON 字符串。
  4. 如果存在语法错误，你将会看到类似于 "Uncaught SyntaxError: Unterminated string in JSON at position 123" 的错误信息，其中 `123` 表示 JSON 字符串中的错误位置。

  根据错误信息所提供的位置，检查 JSON 字符串中的该位置，并确保所有字符串都被正确地结束。

  注意：如果 JSON 数据太大，可能需要分段检查。

- 排查复现：后端返回的数据是数组转 JSON 格式

- 最终解决：等待后端返回正确的格式数据