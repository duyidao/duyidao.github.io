---
title: 页面加载与反应慢排查与解决方案
author:
  - 三十的前端课 页面加载和反应慢?实用的排查和解决方案教给你&https://www.bilibili.com/video/BV16j411877x/
---

# 页面加载与反应慢排查与解决方案

## 排查

页面加载的时间构成主要分为以下几点：

- 资源加载（占大头）
- 代码执行（一般执行会很快，如果涉及复杂代码逻辑运算有可能会慢）
- 页面绘制（一般情况很快）

以网易云音乐官网为例，聊聊如何排查页面加载的速度。打开控制台，选择性能（英文是 Performance），想要查看首屏渲染的速度，点击录制后刷新页面，页面绘制完毕后停止即可生成资源加载与代码脚本执行的时间，如下图所示：

![排查](https://pic.imgdb.cn/item/652fc6afc458853aef66f857.gif)

它不仅可以测页面加载所要花费的时间，也可测试点击按钮后做某些事件所需要的时间。如下图所示：

![事件排查](https://pic.imgdb.cn/item/652fc9b8c458853aef70a6c0.gif)

生成出来后就可以看哪些地方会有堵塞，会有如下分支：

1. Network（网络）
2. Frames（页面绘制）红色部分表示有阻塞。在用户在表单内输入或者动画时，页面绘制会堵塞，所以需要减少主线程堵塞。
3. Main（代码执行）

优先查看网络部分，它会显示每个资源渲染需要花费多少时间，如果资源加载时间不是很慢，但是页面加载时间很长，那么有可能是 JS 代码执行时间很长，可以查看下方的「摘要」部分看看每个部分的耗时。

## 解决方法

一般解决思路为：

1. 找到是哪个文件过大导致
2. 如果存在一些文件比较大，又不是马上需要，可以异步加载
3. 利用好 `tree-shaking` ，尽量使用按需引入，升级库到支持按需引入的版本
4. 进行 `gzip` 压缩
5. 利用 `webpack` 、`vite` 对代码进行压缩

### JS 执行时间计算

一般情况下的操作很难导致<word text="JavaScript"/>执行时间过长，通常只有大量的循环会导致。所以需要测量是那段代码导致的进行对应的优化。计算代码时间也有两种方法：

1. `console.time()` 支持性好，但是精度差一些

   代码如下：

   ```html
   <div id="test"></div>

   <script>
     console.time();
     for (let i = 0; i < 10000; i++) {
       let div = document.querySelector("#test");
       div.innerHTML = i;
     }
     console.timeEnd();
   </script>
   ```

   打印多次后结果会有一定的误差，最终输入结果即代码执行所需的时间。如果把盒子文本内容渲染的代码注释掉，时间会更短。

2. `performance.now` 推荐，更加精确，但是可能支持性有问题。

   代码如下：

   ```html
   <div id="test"></div>

   <script>
     let a = performance.now();
     for (let i = 0; i < 10000; i++) {
       let div = document.querySelector("#test");
       div.innerHTML = i;
     }
     let b = performance.now();
     console.lo(b - a);
   </script>
   ```

   不过他只能检测同步任务的代码，异步任务如 `setTimeout` 他无法检测到。

3. `window.performance` 可以在项目的 `index.html` 写入一段脚本，通过 `window.performance` 对象来查看各种数据。属性如下图所示：

   ![属性](https://pic.imgdb.cn/item/652fdc35c458853aefb29721.jpg)

   ```js
   window.onload = () {
    axios({
      method: 'get',
      data: window.performance
    })
   }
   ```

### 现成工具性能测试

可以利用一些现成的工具，如：

- 可视化测评网站性能 - `lighthouse`，具体使用可参考文档 [前端性能测试工具 Lighthouse(灯塔)使用](https://juejin.cn/post/7220230543005253691)
- <word text="JavaScript"/>库测量 - [web-vitals](https://www.npmjs.com/package/web-vitals)，具体使用可参考文档 [web-vitals](https://web.developers.google.cn/articles/vitals?hl=zh-cn)
