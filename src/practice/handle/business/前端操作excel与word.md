# 前端操作 Excel 与 Word

## Excel

| 场景         | 通用   | <word text="Vue" /> | <word text="React" /> |
| ------------ | ------ | ------------------- | --------------------- |
| 解析内容操作 | `xlsx` | `xlsx`              | `xlsx`                |
| 预览         | `xlsx` | `@vue-office/excel` | `react-file-viewer`   |

### 前端解析 Excel 文件

通过 `arrayBuffer` 方法将 <word text="Blob" /> 转为二进制数据，使用 `xlsx` 库的 `read` 方法读取数据对象。

核心数据结构：

- `SheetNames`：所有工作表名称组成的数组
- `Sheets`：各工作表数据的对象集合

使用 `utils` 提供的方法进行格式转换：

- `sheet_to_json`：将工作表数据转为 <word text="JSON" /> 数组
- `sheet_to_html`：将工作表数据转为 <word text="HTML" /> 字符串

```vue
<template>
  <div id="app">
    <div class="excel-content" v-html="excelHTML"></div>
  </div>
</template>
<script>
import { read, utils } from 'xlsx'

export default {
  data() {
    return {
      excelHTML: '',
    }
  },
  methods: {
    change(e) {
      const file = e.target.files[0]
      file.arrayBuffer().then((res) => {
        const wb = read(res)
        const sheet1 = wb.Sheets.Sheet1
        const data = utils.sheet_to_json(sheet1)
        const html = utils.sheet_to_html(sheet1)
        this.excelHTML = html
      })
    },
  },
}
</script>
```

> [!WARNING] 注意
> 通过接口请求获取的 <word text="Blob" /> 格式数据同样适用此方法。

### 前端生成 Excel 文件

使用 `utils` 提供的方法将数据转为工作表对象：

- 数组数据使用 `json_to_sheet`
- <word text="DOM" /> 中的 `table` 元素使用 `table_to_sheet`

生成流程：

1. 通过 `xx_to_sheet()` 转为 Sheet 对象
2. 通过 `book_new()` 创建工作簿
3. 通过 `book_append_sheet()` 添加工作表
4. 通过 `writeFile()` 写入文件

```vue
<template>
  <div id="app">
    <div class="excel-content" v-html="excelHTML"></div>
  </div>
</template>

<script>
import { writeFile, utils } from 'xlsx'

export default {
  data() {
    return {
      excelHTML: '',
    }
  },
  methods: {
    createExcel() {
      // 数组数据转 Excel
      const data = [
        { name: 'daodao', age: 18 },
        { name: 'xiaodao', age: 20 },
        { name: 'duyidao', age: 23 },
      ]
      const ws = utils.json_to_sheet(data)
      const wb = utils.book_new()
      utils.book_append_sheet(wb, ws, 'sheet1')
      writeFile(wb, 'test.xlsx')

      // table DOM 转 Excel
      const tableDom = this.$refs.table
      const tableWs = utils.table_to_sheet(tableDom)
      const wb2 = utils.book_new()
      utils.book_append_sheet(wb2, tableWs, 'sheet1')
      writeFile(wb2, 'tableTest.xlsx')
    },
  },
}
</script>
```

### 第三方库实现在线预览

::: code-group

```bash [安装]
npm i @vue-office/excel
```

```vue [使用]
import vueofficeExcel from "@vue-office/excel";
```

:::

为组件的 src 属性赋值，支持以下三种数据源：

1. 接口返回的文件地址

   ```vue
   <script setup>
   const excelSrc = ref('')
   axios.get('/api/excel').then((res) => {
     excelSrc.value = res.data.file
   })
   </script>

   <vueofficeExcel :src="excelSrc" />
   ```

2. `FileReader` 转为 `DataURL`

   ```js
   const file = res.data.file
   const fr = new FileReader()
   fr.readAsDataURL(file)
   fr.onload = (e) => {
     this.excelSrc = e.target.result
   }
   ```

3. 直接导入静态资源

   ```vue
   <script setup>
   import excelSrc from '@/assets/excel/test.xlsx'
   </script>

   <vueofficeExcel :src="excelSrc" />
   ```

### 总结

无论是 `Word` 还是 `Excel`，预览的数据源要么是线上地址，要么是 `DataURL`。若后端返回地址则直接使用；若返回 <word text="Blob" />，则通过 `readAsDataURL` 方法转为 `Base64` 格式。

### 拓展

<word text="React" /> 的第三方库 `fileviews` 支持多种文件格式预览，接收两个参数：

- `filePath`：文件地址
- `fileType`：文件类型

## Word

| 场景         | 通用                       | <word text="Vue" /> | <word text="React" /> |
| ------------ | -------------------------- | ------------------- | --------------------- |
| 解析内容操作 | `docxtemplater`            | `docxtemplater`     | `docxtemplater`       |
| 预览         | `mammoth` / `docx-preview` | `@vue-office/docx`  | `react-file-viewer    |

## 组件预览

::: code-group

```bash [安装]
npm i @vue-office/docx
```

```js [使用.js]
import vueofficedocx from '@vue-office/docx'
```

```vue [示例.vue]
<template>
  <vueofficedocx :src="wordSrc" />
</template>

<script>
export default {
  methods: {
    changeFn(e) {
      const file = e.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.wordSrc = e.target.result
      }
    },
  },
}
</script>
```

:::

## docx-preview 预览

::: code-group

```bash
npm i docx-preview
```

```js
import { renderAsync } from 'docx-preview'

export default {
  methods: {
    change(e) {
      const file = e.target.files[0]
      renderAsync(file, this.$refs.docxPreview)
    },
  },
}
```

:::

## docxtemplater 模板填充

处理流程：

1. 获取文件二进制流
2. 转为 `ArrayBuffer`
3. 通过 `PizZip` 解析压缩包
4. 使用 `Docxtemplater` 填充数据并渲染
5. 生成 <word text="Blob" /> 并保存

```js
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export default {
  methods: {
    change(e) {
      const file = e.target.files[0];
      file.arrayBuffer().then((res) => {
        const zip = new PizZip(res);
        const doc = new Docxtemplater(zip);
        doc.setData(data);
        doc.render();
        const output = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(output, "test.docx");
      });
    },
  },
};
```