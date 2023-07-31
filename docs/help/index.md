---
title 有用的帮助
---
# 有用的帮助
前端开发利器，有了它们能够让我们事半功倍！

## TypeScript

- 在线 JSON 转 TS：[JSON to TypeScript (transform.tools)](https://transform.tools/json-to-typescript)
- 

## 正则

- 在线正则校验：[正则表达式在线测试](https://c.runoob.com/front-end/854/)

## 调试

### H5调试

- vConsole

  这个插件有点像微信小程序的调试插件，不过功能更丰富，可以查看控制台打印、网络请求、本地存储等。

  使用方法如下：

  ```js
  let consoleScript = document.createElement("script");
  consoleScript.src = "https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js";
  consoleScript.onload = function () {
    new VConsole()
  }
  document.head.appendChild(consoleScript);
  ```

  通过 CDN 引入在线模块即可。

  效果如下所示：

  [![pCTqQCd.jpg](https://s1.ax1x.com/2023/07/19/pCTqQCd.jpg)](https://imgse.com/i/pCTqQCd)

- eruda

  在项目的`index.html`文件里加入下面这段代码

  ```html
  <script src="http://eruda.liriliri.io/eruda.min.js"></script>
  <script>
      eruda.init();
  </script>
  ```

  项目启动后，在手机右下角就会出现灰色的控制台。效果如下所示：

  [![pC7kF8x.png](https://s1.ax1x.com/2023/07/19/pC7kF8x.png)](https://imgse.com/i/pC7kF8x)

