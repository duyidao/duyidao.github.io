---
title: Axios二次封装
isReship: true
author:
  - 三十的前端课 axios请求二次封装都做些什么?&https://www.bilibili.com/video/BV1fg4y1M7pe/
  - 三十的前端课 提升代码思维，从一个案例看如何提高代码质量&https://www.bilibili.com/video/BV1is4y117ow/
  - 远方os 前端请求应该如何封装&https://www.douyin.com/video/7433832678895422783
  - 三十的前端课 前端的请求错误处理，一节课搞通透&https://www.bilibili.com/video/BV16JQ2YTEoL/
---

# Axios 二次封装

## 基本封装部分

### 基本全局配置

如 `baseURL` ，超时时间等。

```js
let request = axios.create({
  baseURL: "http://192.168.0.18", // 基准路径
  timeout: 9000, // 超时时间
  responseType: "json", // 响应类型
  headers: {
    // 请求头
    "Content-Type": "xxx", // 请求头设置
  },
  widthCredentials: true, // 允许跨域
});
```

### 密钥

`Token` ，密钥等出于权限和安全性考虑的密钥请求头设置。一般设置在请求拦截器上，做额外的处理。

```js
let whileList = ["/a"]; // 不需要验证token的白名单接口

request.intercepetors.request.use(
  (config) => {
    let url = config.url;
    let token = localStorage.getItem("token");

    if (!token) {
      alert("请先登录");
      logout(); // 登出
    }

    /* 不在白名单且有token，则设置请求头token */
    if (!whileList.includes(url) && token) {
      config.headers.token = token;
    }

    // 也可以做其他工作，比如md5加密

    return config;
  },
  (error) => {
    // 请求失败，返回即可
    return Promise.reject(new Error(error));
  }
);
```

### 响应

针对不同的状态码做处理，主要针对错误请求做全局统一处理。在响应拦截器上获取到响应数据，根据状态码做处理。

错误码包括浏览器与服务端的错误，如 404、500 等；还有业务错误码，前后端协商设置的，如 999、10 等。

```js
request.intercepetors.response.use(
  (res) => {
    // 响应成功
    const code = res.data.code || 200;
    const message = res.data.msg || "未知错误";

    switch (code) {
      case 200:
        return res.data.data;
      case 401:
      case 403:
        // 登录过期
        alert("没有权限，重新登录");
        router.push("/login");
        break;
      case 999:
        alert("xxx参数有误");
        break;
      default:
        alert(`错误码${code}，${message}`);
        return Promise.reject(new Error(message));
    }
  },
  (error) => {
    // 响应失败，统一处理
    alert(error); // 一般还是用组件库的提示信息组件，这里简单代替
    return Promise.reject(new Error(error));
  }
);
```

但是如果 `code` 后续如果多新增几个情况，`switch` 需要写很多，代码冗余不好维护，可以修改为策略模式。业务错误代码和浏览器错误码分开处理。还支持函数传参，做特殊提示定制。

最后考虑一些特殊接口如 `blob` 数据的，接口，可以判断当前的类型是不是一个 `blob` 类型，如果是，则直接返回 `res` 即可。

```js
const errorCode = {
  // [!code ++]
  999: (v) => {
    // [!code ++]
    alert("xxx参数有误", v); // [!code ++]
  }, // [!code ++]
}; // [!code ++]
const httpErrorCode = {
  // [!code ++]
  403: (v) => {
    // [!code ++]
    alert("暂无权限"); // [!code ++]
  }, // [!code ++]
}; // [!code ++]
request.intercepetors.response.use(
  (res) => {
    // 响应成功
    const { code = 200, message = "未知错误", data } = res.data; // [!code ++]
    if (res.data instanceof Blob) return res.data; // [!code ++]
    switch (
      code // [!code --]
    ) {
      case 200: // [!code --]
        return res.data.data; // [!code --]
      case 401: // [!code --]
      case 403: // [!code --]
        // 登录过期 // [!code --]
        alert("没有权限，重新登录"); // [!code --]
        router.push("/login"); // [!code --]
        break; // [!code --]
      case 999: // [!code --]
        alert("xxx参数有误"); // [!code --]
        break; // [!code --]
      default: // [!code --]
        alert(`错误码${code}，${message}`); // [!code --]
        return Promise.reject(new Error(message)); // [!code --]
    } // [!code --]
    if (code === 200) {
      // [!code ++]
      return data; // [!code ++]
    } // [!code ++]
    errorCode[code]?.(); // [!code ++]
    httpErrorCode[code]?.(); // [!code ++]
  },
  (error) => {
    // 响应失败，统一处理
    alert(error); // 一般还是用组件库的提示信息组件，这里简单代替
    return Promise.reject(new Error(error));
  }
);
```

### 代码示例

```js [代码运行]
// 全局基础配置
import axios from "axios";

// 后面的请求都是用该变量来发
let request = axios.create({
  baseURL: "http://192.168.0.18", // 基准路径
  timeout: 9000,
  responseType: "json",
  headers: {
    "Content-Type": "xxx",
  },
});

// 请求拦截器
const whileList = ["/a"]; // 白名单
const secretId = "daodao"; // 密钥假设
request.intercepetors.request.use(
  (config) => {
    // token请求头设置。可设置一个白名单，如果不需要token可放到白名单内
    const token = localStorage.getItem("token");
    const url = config.url;
    if (!whileList.includes(url) && token) {
      config.headers.token = token;
    }

    // 密钥，secretId + 特殊算法，防止仿造请求和攻击。如当前时间戳加secretId，再通md5加密，就能得出最终密钥。后端再解密判断请求即可。
    let secretKey = secretId + new Date().toString();
    config.headers.secretKey = secretKey;
  },
  (error) => {
    // 失败请求，返回即可
    return Promise.reject(new Error(error));
  }
);

// 响应拦截器
request.intercepetors.response.use(
  () => {
    // 响应统一处理
    const status = res.data.code || 200; // 状态码
    const message = res.data.message || "未知错误"; // 错误信息

    switch (status) {
      case 401:
      case 403:
        alert("暂无权限");
        router.push("/login");
        break;
      default:
        break;
    }
  },
  (error) => {
    // 响应失败，真实项目中往往使用的是组件库的消息提示弹出提示。这里用alert代替
    alert(error);
    return Promise.reject(new Error(error));
  }
);
```

## 扩展

1. 防止请求频繁提交
2. 缓存数据

思维导图如下所示：

![思路图](https://pic1.imgdb.cn/item/689ef5ce58cb8da5c82763ad.png)

### 防止请求频繁提交

1. 通过闭包的特性声明一个数组，发送请求后往该数据内塞该请求的值
2. 下次发请求时判断数组内是否有该值，有值则不发请求
3. 请求发送成功后把该值删掉

```js
let myRequest = (function () {
  let hasRequest = [];
  return function (config) {
    if (hasRequest.inculdes(config.url)) {
      return Promise.reject("请求已提交");
    }

    hasRequest.push(config.url);

    return request({
      ...config,
    }).then(() => {
      hasRequest = hasRequest.filter((item) => {
        if (item !== config.url) {
          return item;
        }
      });
      return res.data;
    });
  };
})();
```

### 缓存

把数据保存在一个对象中（ `Map` 对象更合适），判断该对象有没有对应值，有对应值则说明有缓存，直接返回缓存即可。没有再调接口。

```js
let myRequest = (function () {
  let men = {}; // [!code focus]
  let hasRequest = [];
  return function (config) {
    if (men[url]) {
      // [!code focus]
      return Promise.resolve(men[url]); // [!code focus]
    } // [!code focus]
    else {
      if (hasRequest.inculdes(config.url)) {
        return Promise.reject("请求已提交");
      }

      hasRequest.push(config.url);

      return request({
        ...config,
      }).then(() => {
        // 把url地址从hasRequest数组中去掉，因为请求已经响应
        hasRequest = hasRequest.filter((item) => {
          if (item !== config.url) {
            return item;
          }
        });
        men[url] = res.data; // [!code focus]
        return res.data;
      });
    }
  };
})();
```

### 优化代码

如果后面再加功能，就要再加 `if...else if` ，代码冗余且低效，因此需要优化。

优化思路：使用职责链模式，组织成一个个独立函数模块，然后循环按照顺序执行这些模块。执行一个去掉一个，直到全部执行完毕。

根据上方思路，先走缓存模块，接着走到防止重复提交模块，然后走到请求模块，接着走到接口调用次数模块，最后走到请求处理模块。代码框架调整如下所示：

但是请求一般都是异步，因此无法保证执行的顺序，需要使用 `Promise` 的 `resolve` 状态返回最后的成功处理结果，执行完毕后会返回一个新的 `Promise` ，保存这个新的 `Promise` 后再往下执行，这样就能保证执行顺序。

```js
let myRequest = (function () {
  let men = {};
  let hasRequest = [];
  return function (config) {
    // 缓存模块
    function cache() {
      // ...
    }

    // 防止重复提交模块
    function noRequest() {
      // ...
    }

    // 最终请求
    function finalRequest() {
      // ...
    }

    // 最终处理模块
    function finalHandle() {
      // ...
    }

    let _handleArr = [cache, noRequest, finalRequest, finalHandle];
    while (_handleArr.length) {
      promise = promise.then(_handleArr.shift());
    }
  };
})();
```

每执行完一个步骤，返回一个对象，对象中包含：

- `go` ：是否继续执行
- `data` ：下一步要执行的数据
- `then` ：当前执行的步骤是成功还是失败

每一步（每一个函数）一开始都先判断一下，如果 `go` 为 `true` ，说明要继续执行，则执行该函数的代码；反之不需要继续执行，则 `resolve` 跳过执行该步骤函数直接返回结果。

```js
let myRequest = (function () {
  let men = {};
  let hasRequest = [];
  return function (config) {
    let promise = Promise.resolve(); // 每次新请求都要有一个自己的promise // [!code ++]
    // 缓存模块
    function cache(result = { go: true }) {
      // [!code ++]
      if (!result.go) {
        // [!code ++]
        return Promise.resolve(result); // [!code ++]
      } // [!code ++]
      const { url } = config; // [!code ++]
      if (men[url]) {
        // [!code ++]
        return Promise.resolve({ go: false, type: "then", data: men[url] }); // [!code ++]
      } else {
        // [!code ++]
        return Promise.resolve({ go: true, type: "then" }); // [!code ++]
      } // [!code ++]
    }

    // 防止重复提交模块
    function noRequest(result = { go: true }) {
      // [!code ++]
      if (!result.go) {
        // [!code ++]
        return Promise.resolve(result); // [!code ++]
      } // [!code ++]
      if (hasRequest.inculdes(config.url)) {
        // [!code ++]
        return Promise.reject({ go: false, data: "请求已提交", type: "catch" }); // [!code ++]
      } else {
        // [!code ++]
        hasRequest.push(url); // [!code ++]
        return Promise.resolve({ go: true, type: "then" }); // [!code ++]
      }
    }

    // 最终请求
    async function finalRequest(result = { go: true }) {
      // [!code ++]
      if (!result.go) {
        // [!code ++]
        return Promise.resolve(result); // [!code ++]
      } // [!code ++]
      let resData = await request({ ...config }); // [!code ++]
      return Promise.resolve({ go: true, type: "then", data: resData }); // [!code ++]
    }

    // 最终处理模块
    function finalHandle(result = { go: true }) {
      // [!code ++]
      if (!result.go) {
        // [!code ++]
        return Promise.resolve(result); // [!code ++]
      } // [!code ++]
      if (result.type === "catch") {
        // [!code ++]
        return Promise.reject(result.data); // [!code ++]
      } // [!code ++]
      men[config.url] === result.data; // [!code ++]
    }

    let _handleArr = [cache, noRequest, finalRequest, finalHandle];
    while (_handleArr.length) {
      promise = promise.then(_handleArr.shift());
    }
  };
})();
```

通过这个方法，一环扣一环的形式，不仅代码可阅读性强，可拓展性强，还能够快速定位到对应的方法中。

查看代码，发现每一个函数内都有一个 `result.go` 的 `if` 判断，这种重复性的代码可以考虑提取出来优化一下。代码如下：

```js
let myRequest = (function () {
  let men = {};
  let hasRequest = [];
  return function (config) {
    let promise = Promise.resolve(); // 每次新请求都要有一个自己的promise
    // 缓存模块
    function cache(result = { go: true }) {
      if (!result.go) {
        // [!code --]
        return Promise.resolve(result); // [!code --]
      } // [!code --]
      const { url } = config;
      if (men[url]) {
        return Promise.resolve({ go: false, type: "then", data: men[url] });
      } else {
        return Promise.resolve({ go: true, type: "then" });
      }
    }

    // 防止重复提交模块
    function noRequest(result = { go: true }) {
      if (!result.go) {
        // [!code --]
        return Promise.resolve(result); // [!code --]
      } // [!code --]
      if (hasRequest.inculdes(config.url)) {
        return Promise.reject({ go: false, data: "请求已提交", type: "catch" });
      } else {
        hasRequest.push(url);
        return Promise.resolve({ go: true, type: "then" });
      }
    }

    // 最终请求
    async function finalRequest(result = { go: true }) {
      if (!result.go) {
        // [!code --]
        return Promise.resolve(result); // [!code --]
      } // [!code --]
      let resData = await request({ ...config });
      return Promise.resolve({ go: true, type: "then", data: resData });
    }

    // 最终处理模块
    function finalHandle(result = { go: true }) {
      if (!result.go) {
        // [!code --]
        return Promise.resolve(result); // [!code --]
      } // [!code --]
      if (result.type === "catch") {
        return Promise.reject(result.data);
      }
      men[config.url] === result.data;
    }

    let _handleArr = [cache, noRequest, finalRequest, finalHandle];
    while (_handleArr.length) {
      let _fn = _handleArr.shift(); // [!code ++]
      function _final(result = { go: true }) {
        // [!code ++]
        if (!result.go) {
          // [!code ++]
          return Promise.resolve(result); // [!code ++]
        } // [!code ++]
        return _fn.call(this, result); // [!code ++]
      } // [!code ++]
      promise = promise.then(_handleArr.shift());
    }
  };
})();
```

### 最终代码

```js [代码运行]
let myRequest = (function () {
  let men = {};
  let hasRequest = [];
  return function (config) {
    let promise = Promise.resolve(); // 每次新请求都要有一个自己的promise
    // 缓存模块
    function cache(result = { go: true }) {
      const { url } = config;
      if (men[url]) {
        return Promise.resolve({ go: false, type: "then", data: men[url] });
      } else {
        return Promise.resolve({ go: true, type: "then" });
      }
    }

    // 防止重复提交模块
    function noRequest(result = { go: true }) {
      if (hasRequest.inculdes(config.url)) {
        return Promise.reject({ go: false, data: "请求已提交", type: "catch" });
      } else {
        hasRequest.push(url);
        return Promise.resolve({ go: true, type: "then" });
      }
    }

    // 最终请求
    async function finalRequest(result = { go: true }) {
      let resData = await request({ ...config });
      return Promise.resolve({ go: true, type: "then", data: resData });
    }

    // 最终处理模块
    function finalHandle(result = { go: true }) {
      if (result.type === "catch") {
        return Promise.reject(result.data);
      }
      men[config.url] === result.data;
    }

    let _handleArr = [cache, noRequest, finalRequest, finalHandle];
    while (_handleArr.length) {
      let _fn = _handleArr.shift();
      function _final(result = { go: true }) {
        if (!result.go) {
          return Promise.resolve(result);
        }
        return _fn.call(this, result);
      }
      promise = promise.then(_handleArr.shift());
    }
  };
})();
```
