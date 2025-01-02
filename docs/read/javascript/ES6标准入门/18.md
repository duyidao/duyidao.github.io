## async函数

### 含义

ES7 引入了 `async` 函数，使得异步操作变得更加方便。`async` 可以看作 `Generator` 函数的语法糖，将 `Generator` 函数的星号（*）替换成 `async`，将 `yield` 替换成 `await`，仅此而已。

具体改进体现在以下4点：
1. 内置执行器
   
   `Generator` 函数的执行必须靠执行器，而 `async` 函数自带执行器。也就是说，`async` 函数的执行，与普通函数一模一样，只要一行。

2. 更好的语义
   
   `async` 和 `await`，比起星号和 `yield`，语义更清楚了。`async` 表示函数里有异步操作，`await` 表示紧跟在后面的表达式需要等待结果。

3. 更广的适用性
   
   `await` 后面可以是 `Promise` 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

4. 返回值是 `Promise`
   
   `async` 函数的返回值是 `Promise` 对象，这比 `Generator` 函数的返回值是 `Iterator` 对象方便多了。你可以用 `then` 方法指定下一步的操作。

### 用法

`async` 函数返回一个 `Promise` 对象，可以使用 `then` 方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

```javascript
async function getStockPriceByName(name) {
  let symbol = await getStockSymbol(name);
  let stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
});
```

### 语法

#### 返回 Promise 对象

`async` 函数 `return` 返回的值，会成为 `then` 方法回调函数的参数；`throw` 抛出的错误，能够变成 `reject` 状态，被 `catch` 方法回调函数接收到。

```js
async fn1 = () => {
  return 'hello world';
}

fn1().then(v => console.log(v)); // hello world

async function fn2 () {
  throw new Error('出错了');
}

fn2().then(
  v => console.log(v),
  e => console.log(e)
) // Error: 出错了
```

#### Promise 对象的状态变化

`async` 函数返回的 `Promise` 对象，必须等到内部所有 `await` 命令后面的 `Promise` 对象执行完，才会发生状态改变，除非遇到 `return` 语句或者抛出错误。

```js
async function fn(url) {
  const res = await axios.get(url)
  const txt = await res.text()
  return txt
}
```

#### await 命令

`await` 命令后面是一个 `Promise` 对象，返回该对象的结果。如果不是 `Promise` 对象，会被转成一个立即 resolve 的 `Promise` 对象。

`await` 命令后面的 `Promise` 对象如果变为 `reject` 状态，则 `reject` 的参数会被 `catch` 方法的回调函数接收到，整个 `async` 函数都会中断执行，前面的 `return` 可以省略。

```js
async function fn() {
  return await 123;
}

async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

如果想要前一个异步失败也不会影响到后续的异步操作，可以用 `try...catch` 包裹第一个 `await` ，这样不管它是否成功，都不会影响后续的执行。

```js
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}
```

或者在 `await` 后面加上 `catch` 方法，这样不管前面的 `await` 是否成功，都会执行 `catch` 方法。

```js
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}
```

#### 错误处理

前面提到过，如果 `await` 后面的异步操作出错，那么等同于 `async` 函数返回的 `Promise` 对象被 `reject`，可以被 `catch` 捕获。

防止出错的方法是将其放在 `try...catch` 代码块之中。如果有多个 `await` ，也可以统一放在 `try...catch` 中。

```js
async function f() {
  try {
    await f1()
    await f2()
    await f3()
  } catch(e) {
    console.log(e);
  }
}
```

可以使用 `try...catch` 结构实现多次重复尝试。如果异步操作成功，`break` 终止循环，否则继续循环，直到达到最大尝试次数。

```js
async function fn() {
  let i = 0, MAX_MUN = 3;
  for (i = 0; i < MAX_MUN; ++i) {
    try {
      await something();
      break;
    } catch(e) {
    }
  }
}
```

#### 使用注意点

1. `await` 命令后面的 `Promise` 对象，运行结果可能是 `rejected`，所以最好把 `await` 命令放在 `try...catch` 代码块中。
2. 多个 `await` 命令后面的异步操作，如果不存在继发关系，最好使用 `Promise.all` 让它们同时触发。
3. `await` 命令只能用在 `async` 函数之中，如果用在普通函数，就会报错。

### async函数实现原理

`async` 函数的实现原理，就是将 `Generator` 函数和自动执行器，包装在一个函数里。

```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

所有的 `async` 函数都可以写成上面的第二种形式，其中的 `spawn` 函数就是自动执行器。

```js
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        v => step(gen.next.bind(gen, v)),
        e => step(gen.throw.bind(gen, e))
      );
    }
    step(gen.next.bind(gen));
  });
}
```

### 与其他异步处理方法的比较

`Promise` 方法虽然解决了回调地狱，但是异步操作如果多的话整个代码都是 `then` 、`catch` 等，可读性非常差。

`Generator` 函数可以暂停函数的执行，将多个需要等待的操作放在一个函数里，然后一个一个地执行，但是 `Generator` 函数的执行需要手动控制，即调用 `next` 方法。且必须有一个任务器自动执行 `Generator` 函数。

`async` 函数实现更简洁、符合语义，没有与语义不相关的代码，不暴露出执行器，是真正的异步。

### 异步遍历器

Iterator 接口是数据遍历协议，调用 `next` 方法就能获取指针指向的遍历器对象 `value` 和 `done` ，但是这个方法是要同步的，调用必须立即拿到值。因此对于异步操作来说，这样不太合适了。

目前有一个提案为异步操作提供原生遍历器接口，即异步遍历器 `Async Iterator` 。

### 总结

ES7 引入的 `async` 函数是 JavaScript 异步编程的重大进步，它简化了异步操作的写法，让异步代码看起来像同步代码一样直观。`async` 函数是基于 `Promise` 的语法糖，它内置执行器，无需像 `Generator` 函数那样需要外部执行器来控制执行流程。使用 `async` 函数时，只需在函数前加上 `async` 关键字，函数内部的异步操作前加上 `await` 关键字即可。`await` 后面可以跟 `Promise` 对象，也可以跟原始类型的值，它会暂停函数执行直到 `Promise` 完成，然后返回 `Promise` 的结果。如果 `await` 后面的 `Promise` 被 reject，它会抛出错误，这可以通过 `try...catch` 语句捕获。`async` 函数返回的总是 `Promise` 对象，可以用 `then` 和 `catch` 方法处理异步操作的结果和错误。

`async` 函数的实现原理是将 `Generator` 函数和自动执行器封装在一起。它通过创建一个 `Promise` 对象，然后在内部使用一个递归函数来处理 `yield` 表达式的结果，从而实现异步操作的自动执行。这种设计使得 `async` 函数的执行流程更加清晰，也避免了手动编写复杂的执行器代码。

与传统的回调函数、Promise 链式调用以及 `Generator` 函数相比，`async` 函数提供了更简洁、更易读的异步编程方式，且不需要额外的库或工具来实现。它使得异步编程的语义更加明确，代码组织更加合理，是目前 JavaScript 异步编程的首选方式。此外，随着语言的发展，异步遍历器 `Async Iterator` 也被提出，它允许在异步操作中使用 `for await...of` 语句进行遍历，进一步扩展了 `async` 函数的应用场景。
