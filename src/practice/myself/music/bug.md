---
title: 刀刀音乐Bug修改
titleTemplate: 刀刀音乐Bug修改
description: 刀刀音乐 Bug
head:
  - - meta
    - name: description
      content: 刀刀音乐Bug修改
  - - meta
    - name: keywords
      content: 刀刀音乐 Bug
pageClass: project-music-bug
---

# Bug 修改

## (intermediate value)(intermediate value) is not a function；Vue: This expression is not callable.Type Uint8Array has no call signatures.

这是因为我的代码中上一行调用 `new Unit8Array` 方法想要获取数据，下一行用了立即执行函数 `(funcrion() {})()`，导致 `Uint8Array` 被当作函数调用，所以报错。

解决方法是在立即执行函数前面加一个 `;` ，这样上一行就不会被当作函数调用，从而避免了报错。
