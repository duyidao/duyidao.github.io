# 响应式 Reactivity 进阶优化

## 分支切换

### Bug复现

先看一个例子：

```html
<body>
  <div id="text"></div>
  <button id="flag">change flag</button>
  <button id="name">change name</button>
  <button id="age">change age</button>
  <script type="module">
    import {ref, effect} from '../dist/reactivity.esm.js'

    const flag = ref(true)
    const age = ref(1)
    const name = ref('刀刀')
    const btnFlag = document.querySelector('#flag')
    const btnAge = document.querySelector('#age')
    const btnName = document.querySelector('#name')
    const text = document.querySelector('#text')

    effect(() => {
      console.count('run effect' + count);
      if(flag.value) {
        text.innerText = name.value
      } else {
        text.innerText = age.value
      }
    })

    btnFlag.addEventListener('click', () => {
      flag.value = !flag.value
    })

    btnAge.addEventListener('click', () => {
      age.value += 1
    })

    btnName.addEventListener('click', () => {
      name.value += '1'
    })
  </script>
</body>
```

上方代码中，我们通过点击按钮，切换 `flag` 的值，从而切换 `text` 的内容。当 `flag` 为 `true` 时，`text` 的内容为 `name` 的值，当 `flag` 为 `false` 时，`text` 的内容为 `age` 的值。这是一个很普通的分支切换，但是有一个小问题，如果点击按钮将 `flag` 切换为 `false`，此时页面展示的是 `age` 的值，与 `name` 值没有关系，点击修改 `name` 的按钮按理来说应该不会调用 `effect` 函数才对，但事实上 `console.count` 有打印，说明触发了 `effect` 函数。

这是为什么呢？下面来依次梳理步骤流程。

首先刚进入页面，创建了三个 `ref` 响应式变量，然后调用 `effect` 函数，此时：
1. 触发 `effect` 函数，保存 `activeSub` ， `depsTail` 置为 `undefined`
2. 运行第一行代码，打印计数
3. 运行第二行代码，获取 `flag.value` 的值，触发其 `RefImpl` 类的 `get` 方法，调用 `link` 方法
4. 获取 `activeSub` 的 `depsTail` （为 `undefined` ）赋值给 `nextDep`
   
    ```ts
    const currentDep = sub.depsTail // undefined
    ```

5. 获取当前 `sub.deps` 副作用函数的 `dep` 依赖项头节点（为 `undefined` ）赋值给 `nextDep`
   
    ```ts
    const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep
    ```

6. 判断 `nextDep` 是否有值且值等于当前的订阅者 `dep`，此时不相等，说明不可复用，跳过 `if` 判断，往下新建一个 `newLink`
    
    ```ts
    if (nextDep && nextDep.dep === dep) {
      sub.depsTail = nextDep
      return
    }

    const newLink: Link = {
      sub,
      nextSub: undefined,
      prevSub: undefined,
      dep,
      nextDep: undefined,
    };
    ```

7. 判断当前的订阅者链表是否有尾节点，如果有，说明当前链表已经有内容了，让当前的尾节点的下一个节点指向当前新节点 `newLink` ， `newLink` 的上一个节点指向尾节点，然后更新尾节点为 `newLink` ；如果不是，直接将 `newLink` 赋值给 `dep.subs` 和 `dep.subsTail` ，此时 `dep.subs` 和 `dep.subsTail` 都指向 `newLink` 。
   
    ```ts
    if (dep.subsTail) {
      // 如果有尾指针，说明当前已经存在链表，让链表最后一个节点的next指向当前节点，当前节点的prev指向最后一个节点。最后再移动尾指针
      dep.subsTail.nextSub = newLink;
      newLink.prevSub = dep.subsTail;
      dep.subsTail = newLink;
    } else {
      // 如果没有尾指针，说明当前链表为空，直接让头指针指向当前节点，尾指针指向当前节点
      dep.subs = newLink;
      dep.subsTail = newLink;
    }
    ```

8. 判断当前的依赖项链表是否有尾节点，如果有，说明当前链表已经有内容了，让当前的尾节点的下一个节点指向当前新节点 `newLink` ，然后更新尾节点为 `newLink` ；如果不是，直接将 `newLink` 赋值给 `sub.deps` 和 `sub.depsTail` ，此时 `sub.deps` 和 `sub.depsTail` 都指向 `newLink` 。
   
    ```ts
    if (sub.depsTail) {
      // 如果有尾指针，说明当前已经存在链表，让链表最后一个节点的next指向当前节点，最后再移动尾指针
      sub.depsTail.nextDep = newLink;
      sub.depsTail = newLink;
    } else {
      // 如果没有尾指针，说明当前链表为空，直接让头指针指向当前节点，尾指针指向当前节点
      sub.deps = newLink;
      sub.depsTail = newLink;
    }
    ```

9.  `link` 方法执行完毕，返回 `get` 方法，`return this._value` 把值返回给 `flag.value` ，代码继续往下执行，由于 `flag.value` 为真，分支代码执行 `text.innerText = name.value`
10. 调用 `name.value` 的 `RefImpl` 类的 `get` 方法，触发 `link` 方法
11. 获取 `activeSub` 的 `depsTail` 赋值给 `nextDep`，拿到的是之前 `flag.value` 的 `newLink` 值，如下：
    
    ```ts
    {
      // ReactiveEffect
      sub: {
        deps: {
          // flag.value 的link节点
          subs: {sub: ReactiveEffect, nextSub: undefined, prevSub: undefined, dep: RefImpl, nextDep: {…}},
          subsTail: {sub: ReactiveEffect, nextSub: undefined, prevSub: undefined, dep: RefImpl, nextDep: {…}},
          __v_isRef: true,
          _value: true,
          value: true,
        },
        depsTail: {
          // ... (同subs)
        },
      },
      nextSub: undefined,
      prevSub: undefined,
      // RefImpl
      dep: {
        subs: {},
        subsTail: {},
      },
      nextDep: undefined,
    }
    ```

    因此 `currentDep` 有值，值为 `flag.value` 的 `newLink`。

12. 运行下一行，`currentDep` 有值，三元判断为假，`nextDep` 值为 `currentDep.nextDep`，即 `undefined` （因为这里只绑定了 `flag.value`，它既是头节点，也是尾节点，所以没有下一个节点）
13. 同第六步，没有可复用的，创建新节点
14. 判断当前的 `RefImpl` 类是否有尾节点，此处没有，新建一个链表，头指针和尾指针都指向 `newLink`
15. 判断当前的 `ReactiveEffect` 类是否有尾指针，前面已经添加了 `flag.value` 依赖项到链表内，所以有，让链表最后一个节点的 `next` 指向当前节点，最后再移动尾指针指向当前节点
16. `link` 方法执行完毕，返回 `this._value`，`effect` 函数执行完毕

一图流如下所示：

![一图流](https://pic1.imgdb.cn/item/681793f558cb8da5c8dc69eb.png)

看看击了修改 `flag` 按钮后发生了什么，执行步骤如下：

1. 修改 `flag.value` 的值，触发 `RefImpl` 类的 `set` 方法，调用链表，依次调用 `ReactiveEffect` 类的 `run` 方法触发 `effect` 函数
2. 保存 `activeSub` ， `depsTail` 置为 `undefined`，然后执行里面的 `fn` 函数
3. 运行第一行，打印计数
4. 运行第二行，获取 `flag.value` 的值，触发 `RefImpl` 类的 `get` 方法，调用 `link` 方法
5. 获取 `activeSub` 的 `depsTail` 值，前面已经置为 `undefined`，所以为 `undefined`
6. 三元判断为真，获取 `activeSub` 的 `deps` 值，为 `flag.value` 的 `newLink` 节点
7. 判断，`nextDep.dep` 是 `flag.value` 的 `RefImpl` 类，`dep` 也是 `RefImpl` 类，判断为真，可以复用，把 `nextDep` 赋值给 `activeSub` 的 `depsTail` ，然后 `return` 代码不继续往下执行，不创建新节点
8. `link` 执行完毕，返回 `this._value`，`effect` 函数继续往下执行，此时 `flag.value` 的值为假，切换分支代码执行 `text.innerText = age.value`
9. `age.value` 获取值，触发 `RefImpl` 类的 `get` 方法，调用 `link` 方法，获取 `activeSub` 的 `depsTail` 值，前面在复用 `flag.value` 的 `newLink` 节点时，已经把 `activeSub` 的 `depsTail` 赋值为 `flag.value` 的 `newLink` 节点，所以此时 `currentDep` 的值为 `flag.value` 的 `newLink` 节点
10. 三元判断为假，`nextDep` 的值为 `flag.value` 的 `newLink` 节点的下一个节点，即 `name.value` 的 `newLink` 节点
    
     ```ts
     const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep
     ```
     
11. 判断，`nextDep.dep` 是 `name.value` 的，`dep` 指向 `age` ，不相同，不可复用，往下创建新节点
12. 判断 `dep` 是否有尾节点，没有，头节点和尾节点都指向当前的 `newLink` 节点
13. 判断 `sub` 是否有尾节点，有，尾节点指向 `flag` 的 `link`，然后 `sub.depsTail.nextDep` 指向 `newLink` 节点，`sub.depsTail` 也指向 `newLink` 节点
14. `link` 执行完毕，返回 `this._value`，`effect` 函数执行完毕

一图流如下所示：
![一图流](https://pic1.imgdb.cn/item/681794d558cb8da5c8dc6a3d.png)

从图中不难看出，此时 `effect` 的 `deps` 订阅者链表只包括 `flag` 和 `age` ，已经不包括 `name` 了。但是 `name` 的 `sub` 还指向了 `effect` ，导致点击修改 `name` 的值时，`effect` 依然会执行。解决方法是切换分支后清理 `name` 的 `sub` 中的 `effect` 节点。

如何实现呢？

### 方法实现

以上方的示例代码为例，解决思路是把 `age` 的 `nextDep` 指向 `name` 的 `newLink` 节点，此时 `depsTail` 尾指针指向的是 `age` ，而 `age` 的下一个节点 `nextDep` 还有值，在运行完 `fn` 后就把 `depsTail` 后面的节点都清掉，这样 `name` 的 `sub` 就没有 `effect` 了。

一图流如下所示：
![一图流](https://pic1.imgdb.cn/item/681856c858cb8da5c8dce082.png)

修改原来的 `newLink` 写法，原本是直接给 `nextDep` 赋值为 `undefined`，现在则要赋值 `activeSub` 的尾节点 `depsTail` 的 `nextDep` 节点。

如果 `depsTail` 存在且还有 `nextDep`，则判断以下情况：
- `depsTail.nextDep` 是否有 `prevSub`，如果没有说明它是 `subs` 的头节点，修改头节点 `subs` 指向 `nextSub` 节点；如果有，说明它不是第一个节点，则让它前一个节点的下一个节点指向 `nextSub` 节点，然后清掉自身的 `nextSub`。
- `depsTail.nextDep` 是否有 `nextSub`，如果没有说明它是 `subs` 的尾节点，修改尾节点 `subsTail` 指向 `prevSub` 节点；如果有，说明它不是最后一个节点，则让它后一个节点的前一个节点指向 `prevSub` 节点，然后清掉自身的 `prevSub`。
- 清掉 `depsTail.nextDep` 的 `sub` 和 `dep` 、 `nextDep`，然后继续循环，直到清掉后面所有的节点。

代码改动如下：
::: code-group
```ts [effect.ts]
class ReactiveEffect {
  deps: Link | undefined;
  depsTail: Link | undefined;

  constructor(public fn) {}

  run() {
    // 把当前的 effect 保存，后面执行完 fn 函数后再获取
    let prevSub = activeSub;
    // 每次执行都把 fn 放到 activeSub 中，让 reactivity 收集依赖
    activeSub = this;
    this.depsTail = undefined; // [!code --]
    startTrack(this); // [!code ++]
    try {
      return this.fn();
    } finally {
      endTrack(this); // [!code ++]
      activeSub = prevSub;
    }
  }

  // ..,
}
```
```ts [system.ts]
export const link = (dep, sub) => {
  const currentDep = sub.depsTail
  const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep
  if (nextDep && nextDep.dep === dep) {
    sub.depsTail = nextDep
    return
  }

  const newLink: Link = {
    sub,
    nextSub: undefined,
    prevSub: undefined,
    dep,
    nextDep: undefined, // [!code --]
    nextDep, // [!code ++]
  };

  // ...
};

export function startTrack(sub) { // [!code ++]
  sub.depsTail = undefined; // [!code ++]
} // [!code ++]

export function endTrack (sub) { // [!code ++]
  const depsTail = sub.depsTail; // [!code ++]
  if (depsTail) { // [!code ++]
    if (depsTail.nextDep) { // [!code ++]
      clearTracking(depsTail.nextDep); // [!code ++]
      depsTail.nextDep = undefined // [!code ++]
    } // [!code ++]
  } // [!code ++]
} // [!code ++]

export function clearTracking (link: Link) { // [!code ++]
  while (link) { // [!code ++]
    const { nextDep, prevSub, dep, nextSub } = link; // [!code ++]
    if (prevSub) { // [!code ++]
      prevSub.nextSub = nextSub; // [!code ++]
      link.nextSub = undefined; // [!code ++]
    } // [!code ++]
    else { // [!code ++]
      dep.subs = nextSub; // [!code ++]
    } // [!code ++]
    if (nextSub) { // [!code ++]
      nextSub.prevSub = prevSub; // [!code ++]
      link.prevSub = undefined; // [!code ++]
    } // [!code ++]
    else { // [!code ++]
      dep.subsTail = prevSub; // [!code ++]
    } // [!code ++]
    link.dep = link.sub = undefined // [!code ++]
    link.nextDep = undefined // [!code ++]
    link = nextDep // [!code ++]
  } // [!code ++]
} // [!code ++]
```
:::

## 依赖清理

目前还有一个问题，还是以上方的示例代码为例，添加一点判断条件，代码如下：

```html
<body>
  <div id="text"></div>
  <button id="flag">change flag</button>
  <button id="name">change name</button>
  <button id="age">change age</button>
  <script type="module">
    import {ref, effect} from '../dist/reactivity.esm.js'

    const flag = ref(true)
    const age = ref(1)
    const name = ref('刀刀')
    const btnFlag = document.querySelector('#flag')
    const btnAge = document.querySelector('#age')
    const btnName = document.querySelector('#name')
    const text = document.querySelector('#text')

    let count = 0 // [!code ++]
    effect(() => {
      console.count('run effect' + count);
      if (count > 1) return // [!code ++]
      count++ // [!code ++]
      if(flag.value) {
        text.innerText = name.value
      } else {
        text.innerText = age.value
      }
    })

    btnFlag.addEventListener('click', () => {
      flag.value = !flag.value
    })

    btnAge.addEventListener('click', () => {
      age.value += 1
    })

    btnName.addEventListener('click', () => {
      name.value += '1'
    })
  </script>
</body>
```

改动很简单，我们添加了一个 `count` 变量，用于记录 `effect` 函数执行的次数。在 `effect` 函数中，我们添加了一个判断，如果 `count` 大于 1，则直接返回，不再执行后续的代码。

一进入页面，执行了一次 `effect` 函数，打印了一次 `console` ，`count` 自增1，此时值为1。点击 `flag` 或者 `name` 按钮，执行 `effect` 函数，打印了一次 `console` ，`count` 自增1，此时值为2。再次点击按钮时，判断条件成立，`return` 返回不继续往下执行，按理来说应该触发不了 `RefImpl` 类收集不了依赖，但是没有清掉依赖，导致依赖还是触发了。

下面来梳理一下流程，第二次点击按钮后，修改 `flag.value` 的值，触发 `effect.run()` 方法，`depsTail` 值为 `undefined`，保存当前 `activeSub`，然后运行 `fn`。此时 `count` 值为2，`return` 返回，`effect` 函数执行完毕。

解决方法是在 `endTrack` 函数中，判断当前 `depsTail` 值是否为 `undefined`，因为它没有继续往下执行，没法收集到依赖，也就不会有 `depsTail` 值，所以可以依靠这个作为判断条件，如果 `depsTail` 值是 `undefined` ，说明没有依赖收集，如果 `deps` 链表有节点，就清掉 `deps` 所有的节点，避免依赖触发。

```ts
export function endTrack (sub) {
  const depsTail = sub.depsTail;
  if (depsTail) {
    if (depsTail.nextDep) {
      clearTracking(depsTail.nextDep);
      depsTail.nextDep = undefined
    }
  }
  else if (sub.deps) { // [!code ++]
    clearTracking(sub.deps); // [!code ++]
    sub.deps = undefined; // [!code ++]
  } // [!code ++]
}
```

## 小结

本次在创建节点时复用了之前获取到的 `nextDep`，如果是第一次运行 `effect` 函数，则 `nextDep` 值为 `undefined`；如果是后续运行 `effect` 函数，会出现分支切换的情况，此时 `nextDep` 值旧分支，以上方示例代码为例，切换了 `flag.value` 后新分支是 `age.value`，旧分支是 `name.value`，因此 `age.value` 节点的 `nextDep` 值为 `name.value` 节点。

运行完 `fn` 函数后，清掉不需要的依赖，避免依赖触发。判断条件为如果有尾节点 `depsTail`，且尾节点还有下一个节点 `nextDep`，则循环清掉尾节点后面所有节点。

清理方式为判断它们在 `subs` 链表中是否是头节点，如果是则把头节点设置为下一个节点；如果不是则把当前节点的上一个节点的 `nextSub` 设置为下一个节点；如果是尾节点，则尾节点设置为上一个节点；如果不是，则把上一个节点的 `nextSub` 指向下一个节点。

最后清掉当前节点的 `dep` 和 `sub` 和 `nextDep`，继续循环。

如果 `activeSub` 没有 `depsTail` 尾节点，则判断当前是否有链表 `deps` ，如果有说明没有依赖收集，直接循环清掉 `deps` 链表，避免依赖触发。

## 节点复用

目前每次清掉节点依赖，需要用时创建新的节点，性能会有一定的消耗。如果每次清掉节点依赖后，把节点保存起来，下次复用，性能会有所提升。

新建一个 `linkPool` 变量，用于保存旧节点，默认为 `undefined`，在 `cleaTracking` 函数中，把旧节点保存起来。

在 `link` 函数中，判断当前 `linkPool` 是否有值，如果有值，复用 `linkPool`，修改 `nextDep` 、`sub` 和 `dep` 的值。


```ts [system.ts]
export const link = (dep, sub) => {
  // 获取订阅者链表尾节点
  const currentDep = sub.depsTail
  // 如果没有尾节点，则从头节点拿取；如果有尾节点，则拿尾节点的下一个节点做复用
  const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep
  if (nextDep && nextDep.dep === dep) {
    sub.depsTail = nextDep
    return
  }

  const newLink = { // [!code --]
    sub, // [!code --]
    nextSub: undefined, // [!code --]
    prevSub: undefined, // [!code --]
    dep, // [!code --]
    nextDep, // [!code --]
  }; // [!code --]

  let newLink: Link // [!code ++]
  
  if (linkPool) { // [!code ++]
    // 从对象池中拿取 // [!code ++]
    newLink = linkPool // [!code ++]
    linkPool = linkPool.nextDep // [!code ++]
    newLink.nextDep = nextDep // [!code ++]
    newLink.dep = dep // [!code ++]
    newLink.sub = sub // [!code ++]
  } // [!code ++]
  else { // [!code ++]
    newLink = { // [!code ++]
      sub, // [!code ++]
      nextSub: undefined, // [!code ++]
      prevSub: undefined, // [!code ++]
      dep, // [!code ++]
      nextDep, // [!code ++]
    }; // [!code ++]
  } // [!code ++]

  // ...
};

let linkPool: link | undefined = undefined // [!code ++]

export function clearTracking (link: Link) {
  while (link) {
    const { nextDep, prevSub, dep, nextSub } = link;

    // ...

    // 将当前节点从依赖项链表中移除，并将其放入linkPool中，以便下次使用
    link.dep = link.sub = undefined
    link.nextDep = linkPool // [!code ++]
    linkPool = link // [!code ++]
    link = nextDep
  }
}
```

## 避免递归

下面先来看一个例子：

```js
import {ref, effect} from '../dist/reactivity.esm.js'

let count = ref(0)
effect(() => {
  console.log('count.value++', count.value++);
})
```

运行这段代码会出现死循环的情况，因为 `effect` 函数中会调用 `count.value++`，而 `count.value++` 会触发 `count` 的 `set` 方法实现赋值，`set` 方法会调用 `run` 方法，又再次调用 `effect` 函数，导致递归调用。

解决方法是添加一个 `trackShaking` 属性，用来标记当前是否正在收集依赖，默认值为 `false`，如果是，则不进行递归调用。

在 `propagate` 函数中，之前是直接把 `link.sub` 添加到数组中，现在改为先判断 `trackShaking` 是否为 `false`，如果是才把 `link.sub` 添加到数组中。

```ts
export const propagate = (subs) => {
  let link = subs;
  let queueEffects = [];
  while (link) {
    let sub = link.sub // [!code ++]
    if (!sub.trackShaking) queueEffects.push(link.sub); // [!code ++]
    queueEffects.push(link.sub); // [!code --]
    link = link.nextSub;
  }
  queueEffects.forEach((effect) => effect?.notify());
};


export function startTrack(sub) {
  sub.depsTail = undefined;
  sub.trackShaking = true; // [!code ++]
}

export function endTrack (sub) {
  const depsTail = sub.depsTail;
  sub.trackShaking = false; // [!code ++]
  if (depsTail) {
    if (depsTail.nextDep) {
      clearTracking(depsTail.nextDep);
      depsTail.nextDep = undefined
    }
  }
  else if (sub.deps) {
    clearTracking(sub.deps);
    sub.deps = undefined;
  }
}
```

## 总结

上一章实现了基础的 `ref` 功能，实现了依赖收集、链表存储、依赖更新等功能。本章节重点修改完善了部分功能和 `Bug` 。

### 分支切换

如果在 `effect` 回调函数内有一个 `if` 判断，点击修改按钮让判断走 `else` 部分，修改 `if` 为 `true` 部分的响应式变量，发现还是触发了 `effect`，这是因为该响应式变量的 `RefImpl` 类的 `subs` 链表节点上还存在该 `effect` 的依赖项。

为了解决这个问题，之前在新建 `newLink` 时直接把 `nextDep` 设置为 `undefined`，现在要把 `nextDep` 设置为当前的 `nextDep` 变量，在切换分支后旧分支的响应式变量节点 `link` 就会作为 `newLink` 的 `nextDep`。

这么做的好处是，后续执行完 `fn` 回调函数后，可以在 `finally` 代码块，清除链表内无用的依赖项。清除判断依据是当前链表是否有尾节点，如果有，尾节点是否还有 `nextDep`，如果有，说明该节点还有旧依赖项，清除后面的依赖项。

清除依赖项的方式为：
- 当前节点是否有上一个节点，如果没有说明是头节点，把头节点指针指向下一个；如果有，则把上一个节点的 `nextSub` 指向下一个节点。
- 当前节点是否有下一个节点，如果没有说明是尾节点，把尾节点指针指向上一个；如果有，则把下一个节点的 `prevSub` 指向上一个节点。
- 清除 `dep` 和 `sub` 和 `nextDep`
- 继续循环下一个节点

### 依赖清理

如果在 `effect` 回调函数内有一个变量判断如 `if(a > 2) return`，此时会出现前面此时不会往下执行了，本来依赖是不会收集了，但是之前的依赖节点还在链表内，修改了响应式变量后还是会触发 `effect` 回调函数。

前面已经实现了依赖清除，不过只是在尾节点 `depsTail` 存在且 `nextDep` 不为 `undefined` 时才会清除，因此可以再添加一个判断，如果尾节点不存在，那么就判断它是否有头节点，如果尾节点不存在但有头节点，那么说明 `effect` 回调函数执行过程被 `return` 阻止继续执行，此时需要清除链表内所有依赖。

### 节点复用

每次清掉节点依赖，需要用时创建新的节点，性能会有一定的消耗。如果每次清掉节点依赖后，把节点保存起来，下次复用，性能会有所提升。

新建一个 `linkPool` 变量，用于保存旧节点，默认为 `undefined`，在清除依赖函数中，把旧节点保存起来。在 `link` 函数中，判断当前 `linkPool` 是否有值，如果有值，创建新节点 `newLink` 时可以复用 `linkPool` 的 `nextSub` 和 `prevSub` 。

### 避免递归

为了避免递归调用 `effect` 函数，会给 `activeSub` 添加一个 `trackShaking` 属性，默认值为 `false`，触发 `effect` 后设置为 `true` ，执行完毕后才设为 `false` 。在 `propagate` 函数中，判断 `trackShaking` 是否为 `false`，如果是才把 `link.sub` 添加到数组中。

### 时序图

![时序图](https://pic1.imgdb.cn/item/681d7cf058cb8da5c8e7bfeb.png)