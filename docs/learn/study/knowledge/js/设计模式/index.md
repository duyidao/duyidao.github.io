---
title: 设计模式
isReship: true
author:
  - Sunshine_Lin^blog 面试官问我设计模式？我是这么回答的！^https://juejin.cn/post/7205401322111500344
  - 远方os 发布订阅模式如何触发未来事件？^https://www.douyin.com/video/7444172880142716169
---

# 设计模式

## 意义

设计模式（<SpecialWords text="Design pattern" />）代表了最佳的实践，通常被有经验的面向对象的软件开发人员所采用。设计模式是软件开发人员在软件开发过程中面临的一般问题的解决方案。这些解决方案是众多软件开发人员经过相当长的一段时间的试验和错误总结出来的。

大白话就是，在合适的场景使用合适的设计模式：

- 代码比较稳定
- 代码比较高效
- 代码维护性强
- 代码比较规范

## 模式

### 工厂模式

本质：**更方便地去创建实例**

看下面这个案例：

```js
const http1 = axios.create();
const http2 = axios.create();
const http3 = axios.create();
const http4 = axios.create();
const http5 = axios.create();
```

`axios` 的 `create` 方法实际上就是这种工厂模式，下面粘贴一下伪代码来模拟一下：

```js
class Axios {}
class A {
  create() {
    return new Axios();
  }
}

const axios = new A();

export default axios;
```

可以看到，他每一次使用 `create` 都会调用一次类 A ，每调用一次都会 `return` 一个新的 `Axios` 类，这样每次调用获取到的都是新的 `axios` 类。

### 单例模式

本质：**定义一个类，生成一个实例，并且整个项目仅此这一个实例**

看下面这个案例：

```js
class HttpRequest {
  instance: AxiosInstance;
	constructor(options: CreateAxiosOptions) {
    this.instance = axios.create(options)
  }

  setHeader() {...}
  get {...}
  post{...}
  put {...}
  delete() {...}
}

// 生成实例
const request = new HttpRequest({})

// 全局仅用此一个请求实例
export default request
```

引入一个类，在此类中封装方法，通过 `new` 关键字生成一个实例并全部导出。整个项目中都使用这个实例，不去生成使用其他实例，这个就叫做单例模式。

### 策略模式

本质：**根据不同的策略去做不同的事情**

看下面这个案例：

```js
const doSomething = (age: number) => {
  if(age === 20) {...}
  if(age === 30) {...}
  if(age === 40) {...}
}
```

这种写法在大部分项目中经常出现，当一个功能需要多个条件判断时就会有许多 `if..else if..else` 嵌套，不仅代码可读性、可维护性、可拓展性差，且影响代码运行效率（著名 R 星的 GTA5 因为一堆 `if...else` 拖慢其加载速度而被网友解包群嘲）。如果需要添加新的判断还需要改动原函数添加判断，有潜在的造 BUG 隐患。

更推荐的做法是把每一个条件判断单独抽离出来作为一个函数，存储在 `Map` 对象中，在主函数中调用即可。修改后的方法如下所示：

```typescript
const doMap: Record<number, Function> = {
  20: () => {...},
  30: () => {...},
  40: () => {...},
  50: () => {...},
}

const doSomething = (age: number) => {
  doMap[age]?.()
}
```

### 适配性模式

本质：**将一种格式适配成你所需要的格式**

看下面这个案例：

```js
const data1 = [{ age1: 20, name1: "刀刀" }];
const data2 = [{ age2: 21, name2: "刀刀" }];
const data3 = [{ age3: 22, name3: "刀刀" }];

[
  {
    age: 20,
    name: "刀刀",
  }
];
```

后端返回的数据格式有时候不是我们想要的，这时就需要前端自己去做适配，通过封装方法把参数修改为自己想要的形式，这就叫做适配性。

适配性模式则是通过设置一个类，在类中定义适配方法，接收数据并返回修改后的数据，代码如下：

```js
class Adapter {
  data: { age1: number, name1: number }[];
  constructor(data) {
    this.data = data;
  }
  transform() {
    return this.data.map(({ age1, name1 }) => ({
      age: age1,
      name: name1,
    }));
  }
}

// 其余适配器同理

// 调用
const adapter = new Adapter(data1);
const data = adapter.transform(); // 适配后的结果
```

### 装饰器模式

#### 含义

本质：**定义一个类，在不改这个类的前提下，给这个类拓展功能**

使用：**把原功能看作一个整体，调用原功能，再调用新功能**

看下面这个案例：

```js
class Man {
  say() {
    console.log("normal");
  }
}

class SurperMan {
  man: Man;
  constructor(man) {
    this.man = man;
  }
  say() {
    this.man.say();
    console.log("surperman");
  }
}

const man = new Man();
const surperMan = new SurperMan();

man.say(); // normal
surperMan.say(); // normal surperman
```

这里我们在不改变类 Man 原有的方法和变量的基础上，通过把 Man 的实例给过去，使其拓展了功能。

#### 使用场景

大多数是老代码改造，老代码原功能还要，但是要加些新功能新操作。但是老代码不是和熟悉，或者使用面很大，不适合彻底改造。

- 例子一

  现在需要统一对按钮进行点击统计，需要给项目中的按钮点击事件统一加上点击统计。点击后把行为上报到后端。这个时候要注意的是：

  1. 找到每个按钮点击事件的代码写在哪
  2. 不能影响影响原功能

  此时就用到了装饰器模式思想，写一个功能函数，接收被点击的按钮的真实 DOM。然后获取其原本的点击事件，为它绑定新的点击事件。在新的点击事件中，它重新调用原来的点击方法，再执行新的操作。

  ```js
  function decoratorFator(dom) {
    let oldFn = dom.onClick; // 获取原功能
    // 旧功能与新功能一起调用
    dom.onClick = function () {
      oldFn.call(this);
      // 添加新功能
      axios.get("/xxx");
    };
  }

  decoratorFator(indexButton);
  ```

- 例子二

  项目中商品业务组件是独立的一个子组件，多个地方调用，点击跳转不同的位置。现在加了新需求，有新的点击跳转逻辑。如果直接改子组件内的事件，可能会影响其他之前写好的组件的功能

  此时就用到了装饰器模式思想，新增的点击事件方法通过父子传参传给子组件，子组件的点击事件中添加 `if..else` 判断，如果有接收到父组件传进来的点击函数，则直接使用父组件传递的；没有则用回原来的点击逻辑。这样能尽可能的降低源码的改动。

  ```js
  const { data, clickFn } = defineProps(["data", "clickFn"]);

  const jump = () => {
    // 原来的点击事件逻辑
  };

  const btnClick = () => {
    if (clickFn) {
      clickFn(data, jump); // 再把原来的事件和参数返回，避免需要使用
    } else {
      jump();
    }
  };
  ```

- 例子三

  项目中使用了 `element-plus` 的第三方组件库中的组件，如城市级联选择组件，第三方组件 `v-model` 双向绑定的是城市编码，而后端接口需要传参和返回参数都是中文的形式。直接修改组件的代码显然是不可能的，而手动更改虽然可以，但是使用的地方一多，每个地方都要手动更改，代码会变得冗余。

  此时就用到了装饰器模式思想，自己二次封装一个组件，在组件内监听变化，转换数据格式。

  ```vue
  <script setup>
  import {regionData, CodeToText, TextToCode} from 'element-china-area-data'
  let {modelValue} = defineProps(['modelValue'])
  let emit = defineEmit()
  let area = ref([])

  watch(() => {
    let res = modelValue
    let proviceCode = TextToCode[res[0]].code
    let cityCode = TextToCode[res[0]res[1]].code
    let areaCode = TextToCode[res[0]res[1]res[2]].code
    let _codeArr = [
      proviceCode,
      cityCode,
      areaCode
    ]
    area.value = _codeArr
  }, [modelValue])
  </script>

  <template>
    <el-cascader
      :value="area"
      :options="regionData"
      @change="
        (e) => {
          let finnalValue = [
            CodeToText[area.value[0]],
            CodeToText[area.value[1]],
            CodeToText[area.value[2]],
          ];
          emit('update:modelValue', finnalValue);
        }
      "
    />
  </template>
  ```

### 代理模式

本质：**为对象提供一种代理，以便控制对这个对象的访问，不能直接访问目标对象**

es6 的 `Proxy` 就是很典型的代理模式，为对象提供代理，不访问源对象，只访问其代理。代码如下所示：

```js
const handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : 7;
  },
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log("c" in p, p.c); // false, 7
```

### 观察者模式

本质：**定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知**

Vue 中的 watch 等就是观察者模式，当观察对象发生改变后就执行特定的功能。

```js
class Subject {
  count: number;
  observers: any[];
  constructor() {
    this.count = 0;
    this.observers = [];
  }
  getCount() {
    return this.count;
  }
  setCount(count: number) {
    // 设置值之后通知更新
    this.count = count;
    this.notify();
  }
  notify() {
    this.observers.forEach((o) => {
      o.update();
    });
  }
  push(o) {
    this.observers.push(o);
  }
}

class Observer {
  constructor(name: string, sub: Subject) {
    this.name = name;
    this.subject = sub;
    this.subject.push(this);
  }
  update() {
    console.log(`${this.name} 变了 ${this.subject.getCount()}`);
  }
}

const sub = new Subject();
// 观察一号
const observer1 = new Observer("一号", sub);
// 观察二号
const observer2 = new Observer("二号", sub);

sub.setCount(1);
// 一号 变了 1
// 二号 变了 1
```

### 发布订阅模式

#### 基础封装

**发布订阅模式**跟**观察者模式**很像，他们其实都有**发布者**和**订阅者**，但是他们是有区别的

- **观察者模式**的**发布**和**订阅**是互相依赖的
- **发布订阅模式**的**发布**和**订阅**是不互相依赖的，因为有一个**统一调度中心**

为了更好区分这两种设计模式，我举一个现实中的生活例子吧！

**例子一**：A 想转手一部手机，B 想买，于是两个人互加联系方式，B 买了手机后，每次有手机系统更新时，都需要 A 去联系 B 进行升级教学

**例子二**：A 想转手一部手机，所以挂在了某平台转卖，B 在平台看到手机并买下，每次有手机系统更新时，A 只需要跟平台反馈并提供升级教程，平台自然会通知 B 进行升级教学

<SpecialWords text="Vue EventBus"/> 就是用了**发布订阅模式**

```js
class EventEmitter {
  events: { [key: string]: Set<AnyFn> } = {};

  on(event: string, fn: AnyFn) {
    if (!this.events[event]) {
      this.events[event] = new Set();
    }
    this.events[event].add(fn);
  }

  off(event: string, fn: AnyFn) {
    this.events[event]?.delete(fn);
    if (this.events[event]?.size === 0) {
      delete this.events[event];
    }
  }

  emit(event: string, ...args: any) {
    this.events[event]?.forEach(fn => fn(...args));
  }

  once(event: string, cb: AnyFn) {
    function fn(...args) {
      cb(args);
      this.off(event, fn);
    }
    this.on(name, fn);
  }
}

const eventBus = new EventEmitter();
// 组件一
eventBus.on("event", (val) => {
  console.log(val);
});
// 组件二
eventBus.emit("event", "params");
```

#### 未来事件触发

如果一个事件不是及时触发，需要等待一段时间后再触发，这就是未来事件，上方的代码显然无法处理这个未来事件，需要调整一下。

如果是未来事件，那么在 `emit` 方法中，`events[event]` 为空，因此可以声明一个新的变量 `penddingEvents` 用于存储未来事件。`emit` 方法先判断当前 `events` 是否有值，如果没有值，说明是未来事件，则保存到 `penddingEvents` 中。

触发时机则在 `on` 事件中，触发 `on` 事件后判断 `penddingEvents` 内是否有值，有值则循环调用，然后把值删掉。

```js

class EventEmitter {
  events: { [key: string]: Set<AnyFn> } = {};

  on(event: string, fn: AnyFn) {
    if (!this.events[event]) {
      this.events[event] = new Set();
    }
    this.events[event].add(fn);
    // 判断有没有触发过未来事件 // [!code ++]
    if (this.penddingEvents[event]) { // [!code ++]
      this.penddingEvents[event].forEach(args => fn(...args)); // [!code ++]
      delete this.penddingEvents[event]; // [!code ++]
    } // [!code ++]
  }

  off(event: string, fn: AnyFn) {
    this.events[event]?.delete(fn);
    if (this.events[event]?.size === 0) {
      delete this.events[event];
    }
  }

  emit(event: string, ...args: any) {
    this.events[event]?.forEach(fn => fn(...args)); // [!code --]
    if (this.events[event]) { // [!code ++]
      this.events[event].forEach(fn => fn(...args)); // [!code ++]
    } // [!code ++]
    else { // [!code ++]
      // 保存未来事件 // [!code ++]
      if (!this.penddingEvents[event]) { // [!code ++]
        this.penddingEvents[event] = []; // [!code ++]
      } // [!code ++]
      this.penddingEvents[event].push(args); // [!code ++]
    } // [!code ++]
  }

  once(event: string, cb: AnyFn) {
    function fn(...args) {
      cb(args);
      this.off(event, fn);
    }
    this.on(name, fn);
  }
}
```

## 总结

前端要如何学习设计模式？

- 问题一：设计模式本是针对面对对象的服务型语言，很多网上案例对前端很难理解。

  解决方案：通过前端的例子或基于前端的特性做一定的改造。

- 问题二：设计模式是抽象的概念，很多人只能背但无法实践。

  解决方案：把具体例子和设计模式结合捆绑，根据具体的例子扩展到别的例子。
