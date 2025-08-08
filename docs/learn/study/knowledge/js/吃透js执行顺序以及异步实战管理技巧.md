---
title: 吃透js执行顺序以及异步实战管理技巧
isReship: true
author:
  - 三十的前端课 吃透js执行顺序及异步实战管理技巧经验^https://www.bilibili.com/video/BV1KX4y1o7E7/
---

# 吃透js执行顺序以及异步实战管理技巧

## js执行顺序

### 知识点

![一图流](https://pic1.imgdb.cn/item/67bd2db7d0e0a243d4044106.png)

<SPW text="JS" />执行顺序如上图所示，步骤为：

1. 主线程加载好代码，然后一行行执行代码
2. 如果执行到异步方法，执行该异步代码，加入到异步队列里
   
   ```js
    setTimeout(fn)
   ```
   上方代码中，`setTimeout` 是立即执行的，执行完毕后的 `fn` 才是加入宏任务队列。

   <SPW text="Promise" />同理， `new Promise` 是同步操作，其回调函数是作为参数传入，`new Promise` 创建<span class="special_words terminology">Promise</span>后立即执行，因此也是同步的。

   而 `.then` 和 `.catch` 也是立即执行的，只不过执行完毕后没有把它们加入到异步队列里，因为此时 `new Promise` 还是 `pending` 状态，直到调用 `resolve` 变为 `fullfilled` 状态，才会把 `.then` 回调函数加入到微任务队列里。同理，直到调用 `reject` 变为 `rejected` 状态，才会把 `.catch` 回调函数加入到微任务队列里。

   > [!IMPORTANT] 解惑
   > 1. 异步队列存放的实际上是已经执行完毕的异步方法，等待下一次事件循环去执行
   > 2. `.then` 和 `.catch` 是马上执行的，而不是等到调用 `resolve` 和 `reject` 之后再执行
   > 3. 用一个变量接收 `new Promise` 实际上接收的是 `.then` 或 `.catch` 方法

3. 执行结束，询问异步队列是否有执行完毕的异步方法
4. 异步队列查看微任务队列是否有完成的任务，有就把该方法加入到异步队列中执行；没有去问宏任务队列是否有完成的任务

### 实战演练

#### 初级版本

```js
setTimeout(() => {
  console.log('setTimeout')
})
new Promise((resolve) => {
  console.log('Promise')
  resolve()
}).then(res => {
  console.log('then')
})
console.log(1)
```

先不看它每一个具体的回调函数，先一步步执行下来，执行结果如下：

setTimeout 执行完毕，回调函数放入宏任务队列
new Promise 执行完毕，输出 Promise，`.then` 方法放入到微任务队列
输出 1

此时同步任务执行完毕了，异步队列开始询问微任务有没有执行完毕的异步方法，有一个，于是执行 `.then` 方法输出 then，此时微任务队列清空，异步队列询问宏任务有没有执行完毕的异步方法，有一个，于是执行 `setTimeout` 方法输出 setTimeout，此时宏任务队列清空，同步任务和异步任务都执行完毕了。

因此最终打印顺序为：Promise 1 then setTimeout

#### 高级版本

```js
new Promise(resolve => {
  setTimeout(() => {
    console.log('setTimeout1')
    resolve()
  })
}).then(() => {
  console.log('then1')
})
setTimeout(() => {
  console.log('setTimeout2')
  Promise.resolve().then(() => {
    console.log('then3')
    setTimeout(() => {
      console.log('setTimeout3')
    })
  })
})
setTimeout(() => {
  console.log('setTimeout4')
})
new Promise(resolve => {
  console.log('Promise1')
  resolve()
}).then(() => {
  console.log('then2')
})
```

老样子，先从上到下执行下来，并手写划分一下宏任务和微任务队列数组：

先执行 `new Promise` ，执行里面的 `setTimeout` ，把回调放入到宏任务队列，由于 `resolve()` 方法是放在 `setTimeout` 里，还无法执行，因此 `.then` 不会执行，不会放入微任务队列。

然后执行了两个 `setTimeout` ，依次放入宏任务队列；最后执行 `new Promise` ，输出 Promise1，并把 `.then` 方法放入微任务队列。

此时情况如下：

```
输出：Promise1
微任务队列：【then】
宏任务队列：【setTimeout1,setTimeout2,setTimeout3,】
```

微任务队列有任务，执行，输出 then2，此时微任务队列清空。情况如下：

```
输出：Promise1，then2
微任务队列：【】
宏任务队列：【setTimeout1,setTimeout2,setTimeout3,】
```

开始执行宏任务，拿到第一个宏任务，输出 setTimeout1，执行 `resolve()` ，把 `.then` 方法放入微任务队列。情况如下：

```
输出：Promise1，then2，setTimeout1
微任务队列：【then】
宏任务队列：【setTimeout2,setTimeout3,】
```

此时微任务队列有任务，执行该任务，输出 then1，此时微任务队列清空。情况如下：

```
输出：Promise1，then2，setTimeout1，then1
微任务队列：【】
宏任务队列：【setTimeout2,setTimeout3,】
```

继续执行宏任务，拿到第二个宏任务，输出 setTimeout2，执行 `Promise.resolve()` ，把 `.then` 方法放入微任务队列。情况如下：

```
输出：Promise1，then2，setTimeout1，then1，setTimeout2，
微任务队列：【then】
宏任务队列：【setTimeout3,】
```

此时微任务队列有任务，执行该任务，输出 then2，执行 `setTimeout` ，宏任务队列再加一个任务。此时微任务队列清空。继续执行宏任务，直到宏任务执行完毕

```
输出：Promise1，then2，setTimeout1，then1，setTimeout2，then3，setTimeout4，setTimeout3
微任务队列：【】
宏任务队列：【】
```

## 一些异步组织的建议

1. 先把异步<SPW text="Promise" />化
2. 梳理清楚逻辑上的操作顺序
3. 组织为队列，按顺序执行

以一个案例来巩固一下，有两个方法 `a` 和 `b` ，它们的结果相加得出 `c` ，最后用 `c` 来计算。代码如下：

```js
function a () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}
function b () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2)
    }, 1500)
  })
}
function c () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(val + 3)
    }, 2000)
  })
}
Promise.all([a(), b()]).then(res => {
  c(res[0] + res[1]).then(res => {
    console.log(res)
  })
})
```

上面代码可以整合一下，能够一起执行的异步放到一个函数内一起执行；不能的再一个个执行。

```js
function cell () {
  return Promise.all([a(), b()])
}

function cell2 (val) {
  const _val = val[0] + val[1]
  return c(_val)
}
let arr = [cell, cell2]
async function run () {
  let res
  for (let i = 0; i < arr.length; i++) {
    res = await arr[i](res)
  }
  return res
}

run().then(res => {
  console.log(res)
})
```