---
title: 手写 Promise
isReship: true
author:
  - 远方os https://www.douyin.com/user/MS4wLjABAAAAGUvGqSgUb8n2mLUU9SOa5wmdZy-Sj5_FUt-DK5Iu6PpxO1QgrJ1_vXy6ikzz_Q4h?from_tab_name=main&is_search=0&list_name=follow&modal_id=7425599022020300086&nt=0
---

# 手写 Promise

## Promise 标准

具体 <SpecialWords text="Promise A+" /> 标准可查看 [Promise A+](https://promisesaplus.com.cn/) ，这里只拿几个点做简要提及：

1. 要求
   - ”promise” 是一个拥有 then 方法的对象或函数，其行为符合本规范；
   - “thenable”是一个定义了 then 方法的对象或函数，文中译作“拥有then 方法”；
   - “value”指任何 JavaScript 的合法值（包括undefined, thenable 和 promise）；
   - “exception”是使用 throw语句抛出的一个值。
   - “reason”表示一个 promise 的拒绝原因。
2. 状态
   - 处于等待态时，promise 需满足以下条件：可以迁移至完成态或拒绝态
   - 处于完成态时，promise 需满足以下条件：不能迁移至其他任何状态；必须拥有一个不可变的终值
   - 处于拒绝态时，promise 需满足以下条件：不能迁移至其他任何状态；必须拥有一个不可变的拒绝原因

## 基础实现

### 类的搭建

在使用时都是通过 `new Promise` 来创建一个 `Promise`，因此需要创建一个类 `MyPromise` 。

允许一个函数作为参数，注意，原生的 `Promise` 回调函数内的代码是同步的，因此这里直接调用。

```js
class MyPromise {
  constructor(executor) {
    executor();
  }
}

const p = new MyPromise((resolve, reject) => {
});
```

### 状态

根据标准，Promise 有三种状态：`pending`、`fulfilled`、`rejected`，并且状态只能从 `pending` 到 `fulfilled` 或 `rejected`，之后不能再改变。

修改状态是通过参数 `resolve` 和 `reject` 来实现的，这两个方法都支持接收一个参数。综上所述类新增功能如下：
- 新增状态属性 `status`，初始值为 `pending`
- 新增值 `value`，初始值为 `undefined`
- 新增方法 `resolve`，接收一个参数，当状态为 `pending` 时，将状态改为 `fulfilled`，并将参数赋值给 `value`；如果不是 `pending` 状态，则不做任何操作
- 新增方法 `reject`，接收一个参数，当状态为 `pending` 时，将状态改为 `rejected`，并将参数赋值给 `value`；如果不是 `pending` 状态，则不做任何操作

```js
class MyPromise {
  state = 'pending'; // [!code ++]
  value; // [!code ++]
  constructor(executor) {
    const resolve = (val) => { // [!code ++]
      if (this.state !== 'pending') return; // [!code ++]
      this.value = val; // [!code ++]
      this.state = 'fulfilled'; // [!code ++]
    } // [!code ++]

    const reject = (reason) => { // [!code ++]
      if (this.state !== 'pending') return; // [!code ++]
      this.value = reason; // [!code ++]
      this.state = 'rejected'; // [!code ++]
    } // [!code ++]

    executor(); // [!code --]
    executor(resolve, reject); // [!code ++]
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve(1); // [!code ++]
});
```

### 优化

初步实现了 `Promise` 的状态管理，不过需要考虑以下几点：
1. 如果 `new MyPromise` 时传入的 `executor` 抛出异常，则 `MyPromise` 状态应设置为 `rejected`，并且 `value` 为抛出的异常。查看原生 `Promise` 也是如此的操作
   
   ![原生 `Promise` 操作](https://pic1.imgdb.cn/item/685bb9ef58cb8da5c87000fa.png)

2. 状态 `state` 应该是内部变量，不应该让外部直接拿到使用修改，因此需要修改为内部私有变量
3. `resolve` 和 `reject` 内部相同的代码较多，可以抽离封装成一个公共函数
4. 状态如果直接写，后续可能会修改，维护起来很麻烦，最好做成一个常量

根据上方的考虑，修改代码如下：

```js
// 常量
const PENDING = 'pending'; // [!code ++]
const FULFILLED = 'fulfilled'; // [!code ++]
const REJECTED = 'rejected'; // [!code ++]

class MyPromise {
  state = 'pending'; // [!code --]
  #state = PENDING; // 修改为内部私有 // [!code ++]
  #value;
  constructor(executor) {
    const resolve = (val) => {
      if (this.state !== 'pending') return; // [!code --]
      this.value = val; // [!code --]
      this.state = 'fulfilled'; // [!code --]
      this.#setState(FULFILLED, val); // [!code ++]
    }

    const reject = (reason) => {
      if (this.state !== 'pending') return; // [!code --]
      this.value = reason; // [!code --]
      this.state = 'rejected'; // [!code --]
      this.#setState(REJECTED, reason); // [!code ++]
    }

    try { // [!code ++]
      executor(resolve, reject);
    } catch (err) { // [!code ++]
      reject(err); // [!code ++]
    } // [!code ++]
  }

  // 修改状态和值 // [!code ++]
  #setState (state, value) { // [!code ++]
    if (this.#state !== PENDING) return; // [!code ++]
    this.#value = value; // [!code ++]
    this.#state = state; // [!code ++]
  } // [!code ++]
}

const p = new MyPromise((resolve, reject) => {
  resolve(1);
});

console.log(p.#state) // 报错，不可访问私有属性
```

现在能够解决上述罗列的几个优化点了。不过要注意的是，`try...catch` 是无法捕获异步的报错，这个原生 `Promise` 也是如此。

![原生 `Promise` 报错](https://pic1.imgdb.cn/item/685bcf6d58cb8da5c8706e81.png)

## then 方法

### 基本实现

实现 `then` 方法，主要功能是接收两个函数参数，当 `Promise` 状态为 `fulfilled` 时，执行第一个函数，并传入 `value`；当 `Promise` 状态为 `rejected` 时，执行第二个函数，并传入 `reason`。

新增一个 `then` 方法，接收两个参数 `onFulfilled` 和 `onRejected`，判断当前的状态 `#state`，为 `fulfilled` 时，执行 `onFulfilled`，并传入 `value`；为 `rejected` 时，执行 `onRejected`，并传入 `reason`。

```js
// 常量
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  #state = PENDING; // 修改为内部私有
  #value;
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
  }

  then (onFulfilled, onRejected) { // [!code ++]
    if (this.#state === FULFILLED) { // [!code ++]
      onFulfilled(this.#value); // [!code ++]
    } // [!code ++]
    else if (this.#state === REJECTED) { // [!code ++]
      onRejected(this.#value); // [!code ++]
    } // [!code ++]
  } // [!code ++]
}

const p = new MyPromise((resolve, reject) => {
  resolve(1);
});

p.then(res => {
  console.log(res) // 1
})
```

### 考虑异步

```js
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 20)
});
```

基本实现版本，只能处理同步代码，如果 `Promise` 是异步的，则无法处理，这是因为前面写的判断只判断了 `fulfilled` 和 `rejected` 两种状态，并没有处理 `pending` 状态。而异步代码执行时，`Promise` 的状态是 `pending`，因此需要处理 `pending` 状态。

如果是 `pending` 状态，则将 `onFulfilled` 和 `onRejected` 函数保存起来，等到状态变为 `fulfilled` 或 `rejected` 时，再执行。