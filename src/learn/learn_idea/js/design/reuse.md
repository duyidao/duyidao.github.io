---
title: 优化案例：请求的复用与兼容
author:
  - 三十的前端课 从项目中的前端需求，学两个设计模式&https://www.bilibili.com/video/BV1cf2oYXE59/
---

# 优化案例：请求的复用与兼容

### 案例详情

有一个项目原本是用 `https` 发请求，走 `esmoudle` 模块。

::: code-group

```js [main.js]
import requestHS from "./requestHS";
window.request = requestHS;
```

```js [vue.js]
request({
  url: "/xxx",
  type: "get",
  params: { a: 1 },
});
```

:::

后来页面需要加入到公司的 APP 中混合，不想重新开发直接复用，但因为 APP 的安全限制，APP 用的是 APP 自带的 `requestApp` 方法，并且使用起来有一定的区别。并且在 APP 环境下，不能引入原来的 `requestHS` ，否则报错。

```js [例子.js]
import requestApp from "./requestApp";
window.request = requestApp;

requestApp({
  path: "xxx",
  data: {},
});
```

问题所在：

1. 页面已经写好，如果一个个地方改写，工程量大，难以查找，容易错漏
2. 根据不同的环境，引入不同的请求方法

### 单例模式

```js [优化前.js]
function isApp() {
  return window.screen.width < 700;
}

window.request = function () {
  if (isApp()) {
    import("./requestApp").then((res) => {
      res.requestApp();
    });
  } else {
    import("./requestHS").then((res) => {
      res.requestHS();
    });
  }
};
```

目前已经初步实现需求了，但还是有进一步优化的空间。每次调用这个方法，都需要去调用 `isApp` 方法去判断环境，这样有很大的性能浪费。这里可以用单例模式来优化。

单例模式，保证项目里某一个类型只创建一次。

```js [优化后.js]
function isApp() {
  return window.screen.width < 700;
}

let requestFn = null;

export default async function request() {
  if (!requestFn) {
    // 如果 requestFn 是一个null，代表还没发过请求，第一次发请求就需要判断环境，并决定 requestFn 是啥
    if (isApp()) {
      const res = await import("./requestApp");
      requestFn = res.requestApp;
    } else {
      const res = await import("./requestHS");
      requestFn = res.requestHS;
    }
  }
  requestFn(); // 如果 requestFn 已经有值了，代表已经发过请求了，直接调用 requestFn
}
```
