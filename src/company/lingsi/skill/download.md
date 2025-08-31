---
layout: doc
title: 职技网 下载附件
titleTemplate: 职技网 下载附件
description: 职技网 公众号 下载附件
head:
  - - meta
    - name: description
      content: 职技网 下载附件
  - - meta
    - name: keywords
      content: 职技网 公众号 下载附件
pageClass: lingsi-job-download
tags: window.open,blob
---

# 下载附件

本项目招聘会模块有一个 **下载附件** 的功能，该功能主要是用户点击后下载后台上传的附件，文件格式为 `.jpg` 、`.png` 、`.zip` 、`.doc` 等。

## 接口调用

调用接口，传递参数，下载文件，发现浏览器网络能看到下载的图片，但是报错。

原因是下载的附件后端以二进制 `blob` 的格式返回，需要设置相应的请求头，普通的接口调用会报错。解决方法有以下两点：

1. 通过 `window.open` 跳转新页面下载。原理是利用浏览器的特性，让浏览器帮我们下载，前端不用做任何处理。
2. 通过设置请求头下载 `blob` 格式的文件，也是本项目使用的方法。

## window.open 下载

拼接文件路径让其跳转到浏览器中，凭借浏览器特性来下载，代码如下所示：

```js
window.open(url)
```

## blob 下载

- 设置请求头调用接口下载文件，指定接收类型 `responseType` 为二进制数组 `arraybuffer` 。

  ```js
  axios({
    method: 'get',
    url: BASE_URL + '/upload/down',
    params: {
      path: this.data.attachment,
    },
    responseType: 'arraybuffer',
  })
  ```

- 成功回调中获取 `data` ，通过 `new Blob` 转 `blob` 格式的数据，通过 `window.URL.createObjectURL` 把链接用一个变量保存，执行以下操作：

  1. 创建一个 `a` 标签
  2. 把 `a` 标签隐藏
  3. `a` 标签的点击跳转 `href` 设为保存的链接
  4. 自定义参数添加指定的属性 `download`，并赋值作为其下载后的文件名称
  5. 往页面中添加该 `a` 标签
  6. 触发 `a` 标签的点击事件
  7. 触发完事件后删除该 `a` 标签

  ```js
  axios({
    method: 'get',
    url: BASE_URL + '/upload/down',
    params: {
      path: this.data.attachment,
    },
    responseType: 'arraybuffer',
  }).then((res) => {
    // [!code focus]
    const data = res.data // [!code focus]
    const url = window.URL.createObjectURL(
      // [!code focus]
      new Blob([data], {
        // [!code focus]
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // [!code focus]
      }) // [!code focus]
    ) // [!code focus]
    const link = document.createElement('a') // [!code focus]
    link.style.display = 'none' // [!code focus]
    link.href = url // [!code focus]
    link.setAttribute('download', '附件.' + type) // [!code focus]
    document.body.appendChild(link) // [!code focus]
    link.click() // [!code focus]
    document.body.removeChild(link) // [!code focus]
  }) // [!code focus]
  ```

## 完整代码

```js
// 点击下载附件
handleDownFn() {
  // 获取要下载的附件的文件类型
  let type = this.data.attachment.split('.')[this.data.attachment.split('.').length - 1]

  axios({
    method: "get",
    url: BASE_URL + "/upload/down",
    params: {
      path: this.data.attachment,
    },
    responseType: "arraybuffer",
  }).then((res) => {
    const data = res.data;
    const url = window.URL.createObjectURL(
      new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", "附件." + type);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
},
```
