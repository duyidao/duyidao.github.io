---
title 海报页
---
海报页提供使用者下载软件的功能，但微信内置浏览器会有一点问题，因此需要添加一个判断，如果当前用户打开的是微信内置浏览器，则显示一个蒙版，阻止用户操作并提示其打开其他浏览器。
`navigator.userAgent`：浏览器用于 `HTTP` 请求的用户代理头的值，通过 `UserAgent` 可以取得浏览器类别、版本，客户端操作系统等信息。

1. 在PC端打开 ，navigator.userAgent 显示如下

`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36`

2. 在手机web端打开 ，navigator.userAgent 显示如下

`Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`

总体代码如下所示：
```javascript
window.addEventListener('load', () => {
  var ua = navigator.userAgent;
  let weixin = document.querySelector('.isWeixin')
  // 判断是否是微信内置的浏览器
  console.log('ua', ua)
  if (ua.indexOf('MicroMessenger') !== -1) {
    // 用户使用的是微信内置浏览器
    weixin.style.display = 'block'
  } else {
    weixin.style.display = 'none'
  }
})
```
