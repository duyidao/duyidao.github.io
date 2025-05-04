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



## 依赖清理