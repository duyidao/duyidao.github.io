# markdown 语法及渲染

## 语法

### 标题

```md
# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题
```

### 无序列表

```md
- 1

* 2

- 3
  - 3.1（缩进两个空格）
  * 3.2
```

### 有序列表

```md
1. 1
2. 2
3. 3
4. 3.1（缩进三个空格）
5. 3.2
```

### 任务

```md
- [x] 1
- [ ] 2
- [ ] 3
```

### 代码

````md
```语言
具体代码
```
````

### 字体

```md
_斜体文本_ _斜体文本_
**粗体文本** **粗体文本**
**_粗斜体文本_** **_粗斜体文本_**
```

### 分割线

```md
---
---
```

### 段落

```md
\n或者直接写的是否敲回车
```

### 表格

```md
| 1   | 2   | 3   |
| --- | --- | --- |
| 4   | 5   | 6   |
```

### 引用

```md
> 引用内容
```

### 链接

```md
[链接名称](链接地址 '可选标题')
```

### 图片

```md
![图片描述](图片地址 '图片alt属性')
```

## 展示优化

大模型接口返回 <word text="Markdown" /> 格式文本，若直接以字符串展示，缺少换行、段落与代码高亮，难以阅读。

前端已有成熟的 <word text="Markdown" /> 展示组件与库，可直接用于渲染 AI 回答。

## 推荐

- Vue 前端：
  - `@crazydos/vue-markdown`：基出展示 markdown
  - `remark-gfm-GFM`：拓展，让 markdown 组件能支持渲染链接，table 等

  ```vue [App.vue]
  <script setup>
  import { VueMarkdown } from '@crazydos/vue-markdown'
  import remarkGfm from 'remark-gfm'
  const markdown = `
  # 一级标题
  
  ## 二级标题
  
  ### 三级标题
  
  #### 四级标题
  
  ##### 五级标题
  
  ###### 六级标题
  
  - 1
  
  * 2
  
  - 3
    - 3.1（缩进两个空格）
    * 3.2
  
  1. 1
  `
  </script>

  <template>
    <VueMarkdown :remarkPlugins="[remarkGfm]" :markdown="markdown" />
  </template>
  ```

- React 前端：
  - `react-markdown`：基础展示 markdown
  - `remark-gfm-GFM`：拓展，让 markdown 组件能支持渲染链接，table 等

## 代码高亮与自定义 UI

代码高亮插件：

- `rehype-highlight`：代码高亮插件，可以嵌入到 markdown 组件中
- `highlight.js`：高亮样式

自定义 UI 可通过组件的 `custom-attrs` 属性配置，配置后相关 DOM 节点就能添加上对应的类名。

::: code-group

```js [main.js]
import 'highlight.js/styles/github.css'
```

```vue [App.vue]
<script setup>
import { VueMarkdown } from '@crazydos/vue-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight' // [!code ++]
const markdown = `
  # 一级标题

  ## 二级标题

  ### 三级标题

  #### 四级标题

  ##### 五级标题

  ###### 六级标题

  - 1

  * 2

  - 3
    - 3.1（缩进两个空格）
    * 3.2

  1. 1
  `
</script>

<template>
  <!-- [!code ++] -->
  <VueMarkdown
    :custom-attrs="{
      a: { class: 'text-blue-500' },
      code: { class: 'rounded-md' }
    }"
    :remarkPlugins="[remarkGfm]"
    :rehype-plugins="[rehypeHighlight]"
    :markdown="markdown"
  />
</template>

<style>
.text-blue-500 {
  color: #3b82f6;
}
</style>
```

:::

## 插槽

通过插槽可以对渲染出来的<word text="DOM" />进行自定义。

```vue
<template>
  <!-- [!code ++] -->
  <VueMarkdown
    :custom-attrs="{
      a: { class: 'text-blue-500' },
      code: { class: 'rounded-md' }
    }"
    :remarkPlugins="[remarkGfm]"
    :rehype-plugins="[rehypeHighlight]"
    :markdown="markdown"
  >
    <template #input="{ ...props }">
      <textarea v-bind="props" />
    </template>
  </VueMarkdown>
</template>
```

## 总结

<word text="Markdown" /> 格式渲染是 AI 应用开发中前端的关键环节。默认 <word text="Markdown" /> 插件渲染效果通常不够理想，需要投入时间调整至符合公司 UI 规范的样式。建议基于 <word text="Markdown" /> 渲染插件二次封装组件，按公司要求预定义各类渲染效果。