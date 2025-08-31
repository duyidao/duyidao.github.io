# 跨域问题及解决方案

## 同源策略及跨域问题

同源策略是一套浏览器安全机制，当一个<span style="color: red">源</span>的文档和脚本，与另一个<span style="color: red">源</span>的资源进行通信时，同源策略就会对这个通信做出不同程度的限制。

简单来说，同源策略对 同源资源 **放行**，对异源资源 **限制**。

因此限制造成的开发问题，称之为跨域(异源)问题。

### 同源和异源

源(origin) = 协议 + 域名 + 端口

例如：`https://study.duyiedu.com/api/movie` 的源为 `https://study.duyiedu.com`；`http://localhost:8080/index.html` 的源为 `http://localhost:8080`。

两个 URL 地址地址的源<span style="color: red">完全相同</span>，则称之为<span style="color: red">同源</span>，否则称之为<span style="color: red">异源(跨域)</span>。

| 源 1                       | 源 2                         | 是否同源           |
| -------------------------- | ---------------------------- | ------------------ |
| http\:\/\/localhost:8080/a | http\:\/\/localhost:8080/a/b | 是                 |
| http\:\/\/a.com:8080/a     | https\:\/\/a.com:8080/a      | 协议不同，不是同源 |
| http\:\/\/a.com:8080/a     | http\:\/\/a.com:81/a         | 端口不同，不是同源 |
| http\:\/\/a.com:8080/a     | http\:\/\/b.com:8080/a       | 域名不同，不是同源 |

### 跨域出现的场景

跨域可能出现在三种场景：

- 网络通信

  `a` 元素的跳转；加载 `css`、`js`、图片等；`AJAX` 等等

- JS API

  `window.open`、`window.parent`、`iframe.contentWindow` 等等

- 存储

  `Webstorage`、`IndexedDB` 等等

对于不同的跨域场景，以及每个场景中不同的跨域方式，同源策略都有不同的限制。

### 网络中的跨域

当浏览器运行页面后，会发出很多的网络请求，例如 CSS、JS、图片、AJAX 等等。

请求页面的源称之为页面源，在该页面中发出的请求称之为目标源。当页面源和目标源一致时，则为同源请求，否则为异源请求(跨域请求)。

### 浏览器如何限制异源请求

浏览器出于多方面的考量，制定了非常繁杂的规则来限制各种跨域请求，但总体的原则非常简单:

- 对标签发出的跨域请求轻微限制
- 对 AJAX 发出的跨域请求严厉限制

## 解决方案

### CORS

CORS(Cross-Origin Resource Sharing)是最正统的跨域解决方案，同时也是浏览器推荐的解决方案。

![CORS原理](https://pic1.imgdb.cn/item/67e213280ba3d5a1d7e2d361.png)

CORS 是一套规则，用于帮助浏览器判断是否校验通过。

CORS 的基本理念是:

- 只要服务器明确表示**允许**，则校验**通过**
- 服务器明确拒绝或没有表示，则校验不通过

所以，使用 CORS 解决跨域，必须要保证服务器是「自己人」。

#### 请求分类

CORS 将请求分为两类：简单请求和预检请求。

对不同种类的请求它的规则有所区别。

所以要理解 CORS，首先要理解它是如何划分请求的。

- 简单请求(Simple Request)

  简单来说，只要全部满足下列条件，就是简单请求：

  - 请求方法是 GET、POST、HEAD 之一
  - 头部字段满足 CORS 安全规范

    > 浏览器默认自带的头部字段都是满足安全规范的，只要开发者不改动和新增头部，就不会打破此条规则

  - 如果有 `Content-Type`，必须是下列值中的一个
    - `text/plain`
    - `multipart/form-data`
    - `application/x-www-form-urlencoded`

- 预检请求(Preflight Request)

  只要不是简单请求，均为预检请求。

小练习：

```js
// 1.
fetch('https://douyin.com')

// 2.
fetch('https://douyin.com', {
  headers: {
    'a': '1'
  }
})

// 3.
fetch('https://douyin.com'， {
  method: 'POST',
  body: JSON.stringify({a: 1})
})

// 4.
fetch('https://douyin.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({a: 1})
})
```

练习答案分别为：1. 简单请求 2. 预检请求 3. 简单请求 4. 预检请求

#### 请求验证

对简单请求，浏览器会把请求发到服务器，并且头部添加一个 `Origin` 字段，告知服务器请求来自哪个源。

服务器根据这个值，决定是否同意这次请求。

如果服务器同意请求，则会在所有的响应头中添加一个 `Access-Control-Allow-Origin` 字段，表示该源可以访问资源。如果服务器不同意请求，则不添加该字段，浏览器会报跨域错。

对于预检请求，浏览器会先发一个 `OPTIONS` 请求，询问服务器是否同意实际请求。服务器响应头会携带 `Access-Control-Allow-Origin` 字段，告知浏览器是否同意实际请求。

![预检请求](https://pic1.imgdb.cn/item/67e219b40ba3d5a1d7e2e205.png)

预检通过后，浏览器才会发送实际请求（和简单请求一致）。

#### 关于 cookie

默认情况下，`ajax` 的跨域请求并不会附带 `cookie`，这样一来，某些需要权限的操作就无法进行。不过可以通过简单的配置就可以实现附带 `cookie`。

```js
// xhr
var xhr = new XMLHttpRequest()
xhr.withCredentials = true
// ffetch api
fetch(url, {
  credentials: 'include',
})
```

这样一来，该跨域的 ajax 请求就是一个附带身份凭证的请求。当一个请求需要附带 cookie 时，无论它是简单请求，还是预检请求，都会在请求头中添加 cookie 字段，而服务器响应时，需要明确告知客户端:服务器允许这样的凭据。

告知的方式也非常的简单，只需要在响应头中添加：`Access-Control-Allow-Credentials:true` 即可。

对于一个附带身份凭证的请求，若服务器没有明确告知，浏览器仍然视为跨域被拒绝。

另外要特别注意的是：对于附带身份凭证的请求，服务器不得设置 `Access-Control-Allow-0rigin` 的值为 `*`。这就是为什么不推荐使用 `*` 的原因。

#### 关于跨域获取响应头

在跨域访问时，JS 只能拿到一些最基本的响应头，如：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`，如果要访问其他头，则需要服务器设置本响应头。

`Access-Control-Expose-Headers` 头让服务器把允许浏览器访问的头放入白名单，例如：

```
Access-Control-Expose-Headers: authorization,a,b
```

这样 JS 就能够访问指定的响应头了。

### JSONP

JSONP 是一种非官方跨域数据交换协议，它利用了 `<script>` 标签没有跨域限制的特性，通过动态创建 `<script>` 标签，向跨域服务器请求带有回调函数的 js 脚本，然后服务器返回一段调用回调函数的 js 代码，其中包含了跨域请求的数据，最后客户端执行该段 js 代码，从而实现了跨域数据交换。

::: code-group

```html [index.html]
<script>
  function request(url) {
    return new Promise((resolve, reject) => {
      const name = 'callback'
      window[name] = function (data) {
        delete window[name]
        script.remove()
        resolve(data)
      }

      // 手动创建script标签
      const script = document.createElement('script')
      script.src = url + '?callback=' + name
      document.body.appendChild(script)
    })
  }

  request('http://localhost:3000/jsonp').then((data) => {
    console.log(data)
  })
</script>
<!-- <script src="http://localhost:3000/jsonp"></script> -->
```

```js [server.js]
const express = require('express')
const app = express()
app.get('/jsonp', (req, res) => {
  const name = req.query.callback || 'callback'
  const data = {
    msg: 'Hello World',
  }
  res.send(`content-type`, 'application/json')
  res.end(`${name}(${JSON.stringify(data)})`)
})
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
```

:::

虽然可以解决问题，但 `JSONP` 有着明显的缺陷：

- 仅能使用 `GET` 请求
- 容易产生安全隐患
  > 恶意攻击者可能利用 `callback=` 恶意函数的方式实现 XSS 攻击
- 容易被非法站点恶意调用

因此，除非是某些特殊的原因，否则永远不应该使用 `JSONP`。

### 代理

`CORS` 和 `JSONP` 均要求服务器是「自己人」，那如果不是呢？

那就找一个中间人，让它来充当服务器，让它代为转发请求，浏览器请求代理服务器，代理服务器转发请求，目标服务器响应后代理服务器再转发响应结果给浏览器，从而解决跨域问题。

### 如何选择

最重要的，是要保持生产环境和开发环境一致。

![如何选择](https://pic1.imgdb.cn/item/67e2233f0ba3d5a1d7e2f934.png)
