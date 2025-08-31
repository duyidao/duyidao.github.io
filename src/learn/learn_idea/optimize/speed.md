---
title: 优化项目速度
author:
  - 三十的前端课 前端如何用时间切片优化项目速度&https://www.bilibili.com/video/BV1F94y1i7iq/
  - 三十的前端课 前端webworker提示性能实战案例&https://www.bilibili.com/video/BV1z2421P7Qm/
---

# 优化项目速度

## RequestAnimation

### 需要原因

如果一个长时间运行的 JS 操作，可能会阻塞浏览器的渲染，这样我们页面就看不到反应，导致长时间白屏，或者页面不展示任何效果。

解决方法为把操作切成一片一片的，先操作一片，操作完后渲染，再操作下一片。

用一副图例来说明如下：

![requestAnimation图例说明](https://pic1.imgdb.cn/item/67ebe93b0ba3d5a1d7e95a5e.png)

例如，我要渲染一个表格，该表格有 50000 条数据，则光是渲染和滑动就有很明显的卡顿现象。代码如下：

```js
const dateArr = reactive([]);

for (let i = 0; i < 50000; i++) {
  dateArr.push({
    id: 1,
    name: "张三",
    status: Math.floor(Math.random() * 3),
    checked: false,
  });
}
```

使用时间切片，把渲染操作分成 500 个小片段，每次渲染 500 条数据，渲染完成后再渲染下一批，这样就不会有卡顿现象。

### 实现

`requestAnimation` 定义的任务，会在浏览器渲染完成后去执行。所以我们只需要把每个切片放到 `requestAnimation` 。它在执行完一个后，会等着浏览器渲染完成再执行下一个。

下面通过代码来实现这一思想，还是以上方案例为例：

```js
const dateArr = reactive([]);

let index = 0;
function sliceRender() {
  requestAnimationFrame(() => {
    let target = index + 500; // 每次渲染500条数据
    for (; index < target; index++) {
      dateArr.push({
        id: 1,
        name: "张三",
        status: Math.floor(Math.random() * 3),
        checked: false,
      });
    }

    if (index < 50000) sliceRender(); // 如果不够5万条数据，继续渲染
  });
}

sliceRender();
```

上方代码利用时间切片的思想，先切出 500 条数据，渲染成功到页面上后再获取后续的数据，此时页面用户在看前 500 条数据，后续的数据在悄悄渲染。这样就不会有卡顿的效果。

选择全部也是这个道理，选择全部的功能是把所有列表的 `id` 添加到所选数组内，而一次性把 50000 条数据都一次性添加到数组中需要一定的时间消耗。因此可以利用切片的思想，切片添加数据。

代码如下所示：

```js
let choseList = [];
// 点击全选复选框
const selectAllFn = (e) => {
  let index = 0;
  function choseAllID() {
    if (e.target.value) {
      requestAnimationFrame(() => {
        for (; index < target; index++) {
          let target = index + 500;
          choseList.push(dateArr[index.id]);
        }
        if (index < dateArr.length) choseAllID();
      });
    }
  }

  choseAllID();
};
```

### 总结

在优化项目时，不只是要追求绝对的速度提升，在无法进一步提升时可以想办法让用户体验更好。

比如时间切片，异步加载，这些操作对整体速度都没有提升，但是通过合理安排顺序，可以让体验更好。

除了这次的表格案例，另一个如多个 `echarts` 表图渲染案例也可以适用。多个图绘制太慢，可以先绘制一个，完成后再绘制一个。

## webworker

众所周知，<word text="JavaScript" />一直被说不擅长计算，因为它是同步的，大规模计算会让主线程堵塞，结果就是界面完全卡死。

### 异步

而异步并不是最终最优的解决方案，异步只是把任务发布出去等待，后面还是会拉到主线程执行，异步不可能再异步队列自己执行。所以是一个耗时很高的操作，无论做不做异步，它始终都会导致页面卡死。

![异步处理耗时运算](https://pic1.imgdb.cn/item/67ebf1c20ba3d5a1d7e95e2a.png)

如果一个耗时任务必须消耗 2s 去计算，主线程永远不可能躲开这 2s 的计算时间，只能通过切片等操作，把这 2s 的切片分为好几个 几十毫秒，一点点计算来解决卡顿问题。

### webworker

![webworker](https://pic1.imgdb.cn/item/67ebf3920ba3d5a1d7e95fce.png)

Webworker 是真正的多线程，开一条支线让它计算，然后把结果返回。需要注意的是，Webworker 不能使用本地的 `js` 文件，只能使用线上的，解决方法为把需要使用的 `js` 文件放到 `public` 文件夹下，发布上线后让后端或运维把它丢到静态资源下即可。

::: code-group

```vue [App.vue]
<script>
let worker = new Worker("http://localhost:3000/worker.js", { type: "module" });
worker.addEventListener("message", (e) => {
  console.log(e.data);
});
</script>

<template>
  <button @click="() => worker.postMessage('你好👋')">click me</button>
</template>
```

```js [worker.js]
let a = 2;
worker.postMessage(a); // 把数据返回给主线程

// 监听主线程传了什么
worker.addEventListener("message", (e) => {
  console.log(e.data); // 主线程传来的数据
  worker.postMessage("收到🫡"); // 把数据返回给主线程
});
```

:::

#### 注意事项

1. Webworker 不能使用本地文件，必须是网络上同源文件
2. Webworker 不能使用 window 上的 DOM 操作，也不能获取 DOM 对象，DOM 相关的东西只有主线程有，Webworker 只能做计算相关的操作
3. 有的东西无法通过主线程传递给子线程，比如说 DOM 节点、对象特殊设置（如 `freeze` 、`getter` 等，<word text="Vue" />响应式对象无法传递）
4. 模块的引入问题

   因为 Webworker 只能使用网络上的文件，所以不能使用 `import` ，只能使用 `importScripts` ，且括号内只能写网络地址，不过该地址可以跨域。

   如果引用的 `js` 文件是 esmodule 规范的话，Webworker 必须要加类型描述说明，否则会报错。

   如果使用了 `type` 为 `module` 那么无需使用 `importScripts` ，直接使用 `import` 即可。

#### 常见应用

1. `webgl` 、`canvas` 等可视化操作，如在线滤镜、在线绘图、web 游戏等耗时计算可以使用 webworker

   ::: code-group

   ```js [普通使用.js]
   function img() {
     const data = ctx.getImageData(0, 0, 1800, 900);
     for (let i = 0; i < data.data.length; i++) {
       for (let j = 0; j < 255; j++) {
         if (data.data[i] !== 255) data.data[i] = Math.min(data[i] + j, 0);
       }
     }

     ctx.putImageData(data, 0, 0); // 耗时2s
   }
   ```

   ```js [worker.js]
   worker.addEventListener("message", (e) => {
     if (e.data.data.length) {
       let data = e.data;
       for (let i = 0; i < data.data.length; i++) {
         for (let j = 0; j < 255; j++) {
           if (data.data[i] !== 255)
             data.data[i] = Math.min(data.data[i] + j, 0);
         }
       }
       worker.postMessage(data); // 耗时0.5s
     }
   });
   ```

   ```vue [app.vue]
   <script>
   let worker = new Worker("http://localhost:3000/worker.js", {
     type: "module",
   });
   worker.addEventListener("message", (e) => {
     console.log(e.data);
     ctx.putImageData(e.data, 0, 0);
   });

   function img() {
     const data = ctx.getImageData(0, 0, 1800, 900);
     worker.postMessage(data);
   }
   </script>
   ```

   :::

2. 一些涉及到大量数据大量计算如 10 万条数据导出 `excel` 表格的电子表单等后台管理系统也会涉及到 Webworker

   前面提到过 Webworker 只能使用线上地址， `import node_module` 的 `xlsx` 库会报错，所以需要寻找 `xlsx` 线上的 CDN 并把 `js` 文件放到 `public` 文件夹下，然后通过 `importScripts` 引入。

   ::: code-group

   ```js [worker.js]
   importScripts("./xlsx");
   let arr = [];
   for (let i = 0; i < 100000; i++) {
     arr.push({
       id: 1,
       name: "张三" + i + "号",
       age: 18 + i,
       sex: i % 2 === 0 ? "男" : "女",
       phone: "1234567890" + i,
     });
   }
   self.addEventListener("message", (e) => {
     const sheet = XLSX.utils.json_to_sheet(arr);
     const workbook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
     self.postMessage(workbook); // 保存文件涉及到 DOM 操作，因此要转移出去
   });
   ```

   ```vue [app.vue]
   <script>
   import { writeFile } from "xlsx";

   let worker = new Worker("http://localhost:3000/worker.js", {
     type: "module",
   });
   worker.postMessage("");
   worker.addEventListener("message", (e) => {
     writeFile(e.data, "test.xlsx");
   });
   </script>
   ```

   :::

#### 总结

Webworker 用于处理前端性能瓶颈问题，只有涉及到大量计算才会使用 Webworker。Webworker 也有很多使用限制，如不能使用 DOM 操作、不能使用本地文件、不能使用 `import` 等。
