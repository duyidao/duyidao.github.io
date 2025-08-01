---
title: console.log 对象时需要注意的坑
isReship: true
author:
  - 三十的前端课 console.log对象时，一定要注意的坑^https://www.bilibili.com/video/BV1XdxxeQE3s/
---

# console.log 对象时需要注意的坑

## 坑点

在打印对象或数组时，控制台看到的是它的最终状态，而不是打印时的状态。

解决方案是在打印时，最好 `JSON.stringify()` 打印，或者打印里面具体的值。

## 例子

```js
const obj = {};

setTimeout(() => {
  console.log("执行setTimeout");
  obj.a = 1;
  obj.b = 2;
});
console.log(obj); // { a: 1, b: 2 }
```

## 原理

1. `console.log` 输出的是内存地址上的东西
2. 引用类型是按照内存地址改值的

对象数组赋值存储引用类型的步骤如下：

1. 创建一个对象，存储到内存某个地址中
2. 把这个地址给到 `obj` 变量存储
3. `obj` 赋值给 `obj2`，`obj` 存储的其实是 1001 这个地址，所以把内存地址赋值给了 `obj2`
4. 修改 `obj2`，等同于修改了 1001 这个地址的对象
5. `obj` 存储到也是 1001 这个地址，和 `obj2` 拿的其实是同一个对象
