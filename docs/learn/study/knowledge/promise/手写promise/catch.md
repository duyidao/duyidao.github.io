---
title: .catch与.finally
isReship: true
author:
  - 远方os https://www.douyin.com/user/MS4wLjABAAAAGUvGqSgUb8n2mLUU9SOa5wmdZy-Sj5_FUt-DK5Iu6PpxO1QgrJ1_vXy6ikzz_Q4h?modal_id=7426379475899665705
---

# .catch与.finally

<SPW text="Promise A+" /> 的标准只包含了 `.then`，并没有包含其余的方法，这些方法都是 ES6 标准中新增的，因此 A+ 规范的文档没有这些事件的描述。推荐去 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) 查看。

## 回顾

先来回顾一下之前做了啥，看一下完整的代码：

```js
// 常量
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function runMicrotasks(fn) {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(fn);
  }
  else if (typeof process === 'object' && typeof process.nextTick === 'function') {
    process.nextTick(fn);
  }
  else if (typeof MutationObserver === 'function') {
    const observer = new MutationObserver(fn);
    const textNode = document.createTextNode(String(Math.random()));
    observer.observe(textNode, { characterData: true });
    // 当节点的内容发生变化，就会异步执行前面的fn函数
    textNode.data = String(Math.random());
  }
  else {
    setTimeout(fn, 0);
  }
}

function isPromiseLike (obj) { 
  return typeof obj?.then === 'function'; 
} 

class MyPromise {
  #state = PENDING; // 修改为内部私有
  #value;
  #handlers = []; // 保存onFulfilled和onRejected函数
  constructor(executor) {
    const resolve = (val) => {
      this.#setState(FULFILLED, val);
    }

    const reject = (reason) => {
      this.#setState(REJECTED, reason);
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // 修改状态和值
  #setState (state, value) {
    if (this.#state !== PENDING) return;
    this.#value = value;
    this.#state = state;
    this.#runTask();
  }

  #runTask () {
    runMicrotasks(() => {
      if (this.#state !== PENDING) {
        this.#handlers().forEach((cb) => cb());
        this.#handlers = [];
      }
    })
  }

  then (onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push(() => {
        try {
          const cb = this.#state === FULFILLED ? onFulfilled : onRejected;
          const res = typeof cb === 'function' ? cb(this.#value) : this.#value;
          if (isPromiseLike(res)) { 
            resolve(res.then(resolve, reject)); 
          } 
          else { 
            resolve(res);
          } 
        } catch (err) {
          reject(err);
        }
      })
      this.#runTask();
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve(1);
});

p.then(res => {
  console.log('p1', res)
})

console.log('end')
```

`MyPromise` 接收一个回调函数，由于它是同步任务，因此会立即执行这个函数。执行完毕后，会调用 `resolve` 或 `reject` 来改变状态。状态只会改变一次，发生改变后不再会改变。如果函数内部抛出了错误，最终状态也会变为 `reject`，因此用了 `try...catch` 来捕获错误。

需要注意的是，只能捕获同步的错误，异步的错误无法捕获。

`.then` 方法返回的是一个新的 `MmyPromise`，这里不能用旧的是因为旧的 `MyPromise` 状态已经发生改变了，无法再改变。因此需要返回一个新的 `MyPromise`，并且根据上一个 `MyPromise` 的状态来决定下一个 `MyPromise` 的状态，即链式调用。

`.then` 的方法是等待状态改变后再执行，因此先用一个数组保存起来，并判断结果是不是一个 `Promise`，如果是则返回其 `.then` 后的结果，否则直接返回结果。最后在状态改变后，执行保存的函数。由于 `.then` 内是微任务，不能同步执行，这里的处理方式是判断当前的环境可用的异步方法，然后调用它。如果都不适用，则采用定时器。

## .catch

`.catch` 方法是 `.then` 的语法糖，它只接收一个参数，即回调函数 `onRejected`，之前实现 `.then` 方法时接收两个参数，参数一函数 `onFulfilled` 是成功状态执行的；参数二函数 `onRejected` 是失败状态执行的。因此 `.catch` 方法可以理解为 `.then(null, onRejected)`。

```js
class MyPromise {
  // ...

  catch(onRejected) { // [!code ++]
    return this.then(null, onRejected); // [!code ++]
  } // [!code ++]
}
```

## .finally

`.finally` 方法也是 `.then` 的语法糖，它接收一个参数，即回调函数 `onFinally`，无论状态是成功还是失败，都会执行这个函数。但是在执行该回调函数时，是不会接收参数的，它只会把参数传递下去。

```js
class MyPromise {
  // ...

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) { // [!code ++]
    return this.then( // [!code ++]
      (res) => { // [!code ++]
        onFinally() // [!code ++]
        return res // [!code ++]
      }, // [!code ++]
      (err) => { // [!code ++]
        onFinally() // [!code ++]
        throw err // [!code ++]
      } // [!code ++]
    ) // [!code ++]
  } // [!code ++]
}
```