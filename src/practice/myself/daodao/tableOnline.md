---
title: 多人协同在线表格简易实现
isReship: true
author:
  - 三十的前端课 https://www.bilibili.com/video/BV16u411w7Bt?vd_source=8628f61938375f4995c51e0b8c7d8165
---

# 多人协同在线表格简易实现

## 项目搭建与第三方库引入

多人协同在线表格项目使用到的技术栈是：Vue3 + NodeJS + luckysheet。

首先引入 `luckysheet`，注意这里不能直接 `import` 导入使用，而是要找到它在 `node_modules` 内的 `dist` 资源，复制粘贴到 `public` 文件夹内，然后在 `index.html` 中引入。如果不知道引入哪些资源，可以查看其 [官方文档](https://dream-num.github.io/LuckysheetDocs/guide/#steps-for-usage)。

```html
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/plugins.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/css/luckysheet.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/assets/iconfont/iconfont.css' />
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/js/plugin.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js"></script>
```

引入成功后现在可以在 `.vue` 文件中使用了。

## luckysheet使用

### 基础实现

在 `.vue` 组件中，首先需要创建一个 `div` 容器，设置对应的 `id` 名称，用于存放 `luckysheet` 表格。

在 `onMounted` 生命周期中，使用 `luckysheet.create` 方法创建 `luckysheet` 表格，并传入对应的配置项。具体有哪些配置项可以查看 [官方文档](https://dream-num.github.io/LuckysheetDocs/guide/config.html#configuration-item)。这里简单列几个本案例需要使用的。

```vue
<script setup>
onounted(() => {
  luckysheet.create({
    container: "onlineTable", // 容器id
    title: "多人协同在线表格", // 表格名称
    lang: "zh", // 语言设置为中文
    showinfobar: false, // 隐藏头部信息栏
    row: 10, // 初始化行数
    // 鼠标右键点击菜单项配置
    cellRightClickConfig: {
      copy: false, // 禁止右键复制
      copyAs: false, // 禁止右键复制为
      paste: false, // 禁止右键粘贴
    }
  })
})
</script>

<template>
  <div style="height: 100%;" id="onlineTable"></div>
</template>
```

> [!INPORTANT] 标注
> 需要给这个 `div` 绑定高度样式，不然会缩成一坨。

### 单元格操作

`luckysheet` 提供了 `getAllSheets` 方法获取整个表格的数据信息，先来看看数据格式长啥样。

```js
[
  {
    celldata: [{...}],
    ch_width: 4560,
    color: '',
    config: {},
    data: [],
    index: 0,
    jfgrid_select_save: [],
    luckysheet_selection_range: [],
    namme: 'Sheet1',
    order: '0',
    rh_height: 200,
    scrollLeft: 0,
    status: 0,
    visibledatacolumn: [],
    visibledatarow: [],
    zoomRatio: 1
  }
  // ...
]
```

可以看出，它是一个数组的格式，每一个 `Sheet` 表是一个对象数据，重点看它的 `data` ，存放了当前表的数据。当前表有几行，就有多少项，如果有10行，就有10项数据。每一项数据是一个对象，是当前行对应的单元格。单元格对象每一个属性的含义可查看 [官方文档单元格属性表](https://dream-num.github.io/LuckysheetDocs/guide/cell.html#cell-attributes-table)。

## Node实现后端
### load接口获取数据

这就是整个文件的数据结构，了解数据结构后就知道如何和后端联调了。和后端联调的主要思路是通过 `loadUrl` 字段，赋值一个后端链接地址，`luckysheet` 会自动请求这个链接，获取数据并渲染到表格中。如果有文件，后端会读取文件，返回给前端；没有文件，则创建一个新的 `json` 文件，并以前端说的文件名命名。

```js
const filename = 'test' // 文件名 // [!code ++]

onounted(() => {
  luckysheet.create({
    container: "onlineTable", // 容器id
    title: "多人协同在线表格", // 表格名称
    lang: "zh", // 语言设置为中文
    showinfobar: false, // 隐藏头部信息栏
    row: 10, // 初始化行数
    gridKey: filename, // 后端要的文件名 // [!code ++]
    loadUrl: 'http://127.0.0.1:8000/load', // 后端数据地址 // [!code ++]
    // 鼠标右键点击菜单项配置
    cellRightClickConfig: {
      copy: false, // 禁止右键复制
      copyAs: false, // 禁止右键复制为
      paste: false, // 禁止右键粘贴
    }
  })
})
```

下面来模拟写一个后端接口，用于获取文件。

```js
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 8000
app.use(cors())
app.use(express.json())
app.post('/load', (req, res) => {
  const filename = req.body.gridKey; // 获取文件名
  const _path = path.json(__dirname, '/' + filename + '.json') // 拼接文件路径
  const _isExist = fs.existsSync(_path) // 判断文件是否存在
  if (_isExist) {
    let data = fs.readFileSync(_path)
    res.send(data) // 返回文件数据
  }
  else {
    const demopath = path.join(__dirname, './empty.json')
    const data = fs.readFileSync(demopath)
    fs.writeFileSync(path.join(__dirname, '/' + filename + '.json'), data)
    res.send(data) // 返回文件数据
  }
})
```

### save接口保存数据

主要思路如下：
- 前端获取数据，发送给后端，并附带文件名称
- 删除原文件
- 以前端新数据重写为文件

前端点击了保存按钮后，调用前面提到的 `getAllSheets` 方法获取整个表格的数据，然后调用接口，发送给后端。

```js
function sendExcel() {
  let excelObj = luckysheet.getAllSheets()
  axios({
    url: 'http://127.0.0.1:8000/save',
    method: 'post',
    data: {
      exceldata: excelObj,
      filename
    }
  })
}
```

## 多人协同实现

`luckysheet` 提供了 `cellUpdated` 钩子函数，在线表格触发更新之后，会调用这个钩子函数，函数有四个参数：
- `row`：当前编辑的是第几行，索引从0开始
- `col`：当前编辑的是第几列，索引从0开始
- `before`：当前单元格编辑前的值
- `after`：当前单元格编辑后的值

触发更新后调用 `websocket` 发送数据，后端接收到数据后，再广播给其他用户。

```js
const nowSheet = 'Sheet1' // 当前编辑的表格 // [!code ++]
const filename = 'test' // 文件名

onounted(() => {
  const ws = new WebSocket('ws://127.0.0.1:8000/ws?filename=' + filename) // [!code ++]
  luckysheet.create({
    container: "onlineTable", // 容器id
    title: "多人协同在线表格", // 表格名称
    lang: "zh", // 语言设置为中文
    showinfobar: false, // 隐藏头部信息栏
    row: 10, // 初始化行数
    gridKey: fileName, // 后端要的文件名
    loadUrl: 'http://127.0.0.1:8000/load', // 后端数据地址
    // 鼠标右键点击菜单项配置
    cellRightClickConfig: {
      copy: false, // 禁止右键复制
      copyAs: false, // 禁止右键复制为
      paste: false, // 禁止右键粘贴
    },
    hook: { // [!code ++]
      // 当前激活的表格被修改时触发 // [!code ++]
      sheetActive() { // [!code ++]
        nowSheet = luckysheet.getSheetIndex() // [!code ++]
      }, // [!code ++]
      // 单元格被修改时触发 // [!code ++]
      cellUpdated(row, rol, before, after) { // [!code ++]
        ws.send(JSON.stringify({ row, rol, after, sheet: nowSheet, filename })) // [!code ++]
      } // [!code ++]
    } // [!code ++]
  })
})
```

后端那边主要做的操作如下：
- 根据文件名，读取文件
- 找到文件里对应的 `Sheet` 对象
- 修改对应 `Sheet` 的单元格数据
- 删除原文件，把修改后的文件写为新数据
- 遍历 `ws` 连接池
- 给所有当前在编辑文件的用户推送新数据

这里用 <SPW text="NodeJS" /> 实现后端的逻辑。

```js
const cors = require('cors')
const path = require('path')
const qs = require('qs')
const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8000 })
let sockets = []; // 连接池，存放所有连接的用户

server.on('connection', (ws, req) => {
  const queryStr = req.url.split('?')[1] // 获取url参数
  const query = qs.parse(queryStr) // 解析url参数

  // 存储用户信息到连接池
  ws.push({
    socket: ws,
    filename: query.f
  })
  // 监听消息
  ws.on('message', (message) => {
    const data = JSON.parse(message.toString()) // 用户发过来的信息
    const _path = path.join(__dirname, '/' + filename + '.json') // 取出要修改的文件
    let { row, rol, after, sheet, filename } = data // 解析用户发过来的信息字段
    let res = JSON.parse(fs.readFileSync(_path)) // 读取文件

    let sheetArr = res.find(item => {
      // 找到当前用户编辑的表格
      if (itemm.name === sheetName) {
        return item
      }
    })
    sheetArr.data[row][rol] = after // 修改对应单元格的数据

    fs.unlinkSync(_path) // 删除原文件
    fs.writeFileSync(_path, JSON.stringify(res)) // 写入新数据

    // 遍历连接池，给所有当前在编辑文件的用户推送新数据
    sockets.forEach(user => {
      if (user.filename === filename) {
        user.socket.send(JSON.stringify(res))
      }
    })
  })
  ws.on('close', () => {
    sockets = sockets.filter(user => user.socket !== ws) // 关闭连接后，从连接池中移除
  })
})
```

前端这边监听 `ws`，有消息时可以拿到被修改的单元格是哪个 `sheet` 表格、哪一行、哪一列、最新的值是啥，然后调用 `luckysheet.setCellValue` 方法，把数据更新到表格里。

```js
onounted(() => {
  const ws = new WebSocket('ws://127.0.0.1:8000/ws?filename=' + filename)
  ws.onmessage = (message) => { // [!code ++]
    const data = JSON.parse(message.data) // [!code ++]
    luckysheet.setCellValue(data.sheet, data.row, data.rol, data.after.v, { // [!code ++]
      isRefresh: true, // 是否刷新单元格 // [!code ++]
    }) // [!code ++]
  } // [!code ++]
  luckysheet.create({
    container: "onlineTable", // 容器id
    title: "多人协同在线表格", // 表格名称
    lang: "zh", // 语言设置为中文
    showinfobar: false, // 隐藏头部信息栏
    row: 10, // 初始化行数
    gridKey: fileName, // 后端要的文件名
    loadUrl: 'http://127.0.0.1:8000/load', // 后端数据地址
    // 鼠标右键点击菜单项配置
    cellRightClickConfig: {
      copy: false, // 禁止右键复制
      copyAs: false, // 禁止右键复制为
      paste: false, // 禁止右键粘贴
    },
    hook: {
      // 当前激活的表格被修改时触发
      sheetActive() {
        nowSheet = luckysheet.getSheetIndex()
      },
      // 单元格被修改时触发
      cellUpdated(row, rol, before, after) {
        ws.send(JSON.stringify({ row, rol, after, sheet: nowSheet, filename }))
      }
    }
  })
})
```

## BUG修改

目前还剩下一个 `bug` 需要修改。就是当用户在编辑表格时，会发现一直在调用 `cellUpdated` 方法，这是因为 `luckysheet` 在编辑单元格时，会触发 `cellUpdated` 方法，调用 `ws` 发送数据，后端接收到数据后，再广播给其他用户，其他用户接收到数据后，会调用 `cellUpdated` 方法，这样就形成了死循环。

解决方法是，`luckysheet` 有一个 `cellUpdateBefore` 方法，在单元格被修改前触发，我们可以在这个方法里判断当前数据是否有没有被修改，没有的话返回 `false`，阻止 `cellUpdated` 方法的调用。

```js
onounted(() => {
  const ws = new WebSocket('ws://127.0.0.1:8000/ws?filename=' + filename)
  ws.onmessage = (message) => {
    const data = JSON.parse(message.data)
    luckysheet.setCellValue(data.sheet, data.row, data.rol, data.after.v, {
      isRefresh: true, // 是否刷新单元格
    })
  }
  luckysheet.create({
    container: "onlineTable", // 容器id
    title: "多人协同在线表格", // 表格名称
    lang: "zh", // 语言设置为中文
    showinfobar: false, // 隐藏头部信息栏
    row: 10, // 初始化行数
    gridKey: fileName, // 后端要的文件名
    loadUrl: 'http://127.0.0.1:8000/load', // 后端数据地址
    // 鼠标右键点击菜单项配置
    cellRightClickConfig: {
      copy: false, // 禁止右键复制
      copyAs: false, // 禁止右键复制为
      paste: false, // 禁止右键粘贴
    },
    hook: {
      // 当前激活的表格被修改时触发
      sheetActive() {
        nowSheet = luckysheet.getSheetIndex()
      },
      // 单元格被修改前触发
      cellUpdateBefore(row, rol, data) { // [!code ++]
        if (luckysheet.getCellValue(row, rol) === data) return false; // [!code ++]
      }, // [!code ++]
      // 单元格被修改时触发
      cellUpdated(row, rol, before, after) {
        ws.send(JSON.stringify({ row, rol, after, sheet: nowSheet, filename }))
      }
    }
  })
})
```

## 完整代码

::: code-group
```vue [app.vue]
<script setup>
const nowSheet = 'Sheet1' // 当前编辑的表格
const filename = 'test' // 文件名

onounted(() => {
  const ws = new WebSocket('ws://127.0.0.1:8000/ws?filename=' + filename)
  ws.onmessage = (message) => {
    const data = JSON.parse(message.data)
    luckysheet.setCellValue(data.sheet, data.row, data.rol, data.after.v, {
      isRefresh: true, // 是否刷新单元格
    })
  }
  luckysheet.create({
    container: "onlineTable", // 容器id
    title: "多人协同在线表格", // 表格名称
    lang: "zh", // 语言设置为中文
    showinfobar: false, // 隐藏头部信息栏
    row: 10, // 初始化行数
    gridKey: fileName, // 后端要的文件名
    loadUrl: 'http://127.0.0.1:8000/load', // 后端数据地址
    // 鼠标右键点击菜单项配置
    cellRightClickConfig: {
      copy: false, // 禁止右键复制
      copyAs: false, // 禁止右键复制为
      paste: false, // 禁止右键粘贴
    },
    hook: {
      // 当前激活的表格被修改时触发
      sheetActive() {
        nowSheet = luckysheet.getSheetIndex()
      },
      // 单元格被修改前触发
      cellUpdateBefore(row, rol, data) {
        if (luckysheet.getCellValue(row, rol) === data) return false;
      },
      // 单元格被修改时触发
      cellUpdated(row, rol, before, after) {
        ws.send(JSON.stringify({ row, rol, after, sheet: nowSheet, filename }))
      }
    }
  })
})

function sendExcel() {
  let excelObj = luckysheet.getAllSheets()
  axios({
    url: 'http://127.0.0.1:8000/save',
    method: 'post',
    data: {
      exceldata: excelObj,
      filename
    }
  })
}
</script>

<template>
  <div style="height: 100%;" id="onlineTable"></div>
</template>
```
```js [server.js]
const cors = require('cors')
const path = require('path')
const qs = require('qs')
const WebSocket = require('ws')
const fs = require('fs')

const app = express()
const port = 8000
app.use(cors())
app.use(express.json())

const server = new WebSocket.Server({ port: 8000 })
let sockets = []; // 连接池，存放所有连接的用户

app.post('/load', (req, res) => {
  const filename = req.body.gridKey; // 获取文件名
  const _path = path.json(__dirname, '/' + filename + '.json') // 拼接文件路径
  const _isExist = fs.existsSync(_path) // 判断文件是否存在
  if (_isExist) {
    let data = fs.readFileSync(_path)
    res.send(data) // 返回文件数据
  }
  else {
    const demopath = path.join(__dirname, './empty.json')
    const data = fs.readFileSync(demopath)
    fs.writeFileSync(path.join(__dirname, '/' + filename + '.json'), data)
    res.send(data) // 返回文件数据
  }
})
server.on('connection', (ws, req) => {
  const queryStr = req.url.split('?')[1] // 获取url参数
  const query = qs.parse(queryStr) // 解析url参数

  // 存储用户信息到连接池
  ws.push({
    socket: ws,
    filename: query.f
  })
  // 监听消息
  ws.on('message', (message) => {
    const data = JSON.parse(message.toString()) // 用户发过来的信息
    const _path = path.join(__dirname, '/' + filename + '.json') // 取出要修改的文件
    let { row, rol, after, sheet, filename } = data // 解析用户发过来的信息字段
    let res = JSON.parse(fs.readFileSync(_path)) // 读取文件

    let sheetArr = res.find(item => {
      // 找到当前用户编辑的表格
      if (itemm.name === sheetName) {
        return item
      }
    })
    sheetArr.data[row][rol] = after // 修改对应单元格的数据

    fs.unlinkSync(_path) // 删除原文件
    fs.writeFileSync(_path, JSON.stringify(res)) // 写入新数据

    // 遍历连接池，给所有当前在编辑文件的用户推送新数据
    sockets.forEach(user => {
      if (user.filename === filename) {
        user.socket.send(JSON.stringify(res))
      }
    })
  })
  ws.on('close', () => {
    sockets = sockets.filter(user => user.socket !== ws) // 关闭连接后，从连接池中移除
  })
})
```
:::