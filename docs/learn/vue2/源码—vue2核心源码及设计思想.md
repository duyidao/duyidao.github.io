# vue2核心源码及设计思想

## 使用Rollup搭建开发环境

新建一个文件夹，打开终端，输入命令行：

```
npm init -y
```

此时能够生成 `package.json` 文件。下载 `rollup` 和 `rollup-plugin-babel` 依赖：

```
npm i rollup rollup-plugin-babel @babel/core @babel/preset-env --save
```

上方命令表示下载 `rollup` 模块的 `babel` 依赖，其中 `@babel/core` 用于编译高级 ES6 语法并转换为 ES5 语法。`@babel/preset-env` 是其中一个插件。下载完依赖后文件夹内会有一个 `node_modules` 文件夹，

同级目录下新建一个 `rollup.config.js` 文件，用于打包（默认找  `rollup.config.js` 文件，也可以自定义，后续指定文件）。然后返回 `package.json` 文件，书写打包编译的命令：

```json
{
  "scripts": {
    "dev":"rollup -cw",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```

上方代码表示使用 `rollup` 来打包，`-c` 指定默认配置文件，`-w` 表示 `watch` ，监控文件。

新建一个 `src` 文件夹，为打包入口，文件夹下新建一个 `index.js` 文件，作为入口文件。随便写点 ES6 语法代码。

```js
export const a = 100
```

在打包的配置文件 `rollup.config.js` 中作打包的配置，代码如下：

```js
// rollup默认可以导出一个对象，作为打包的配置文件
import babel from "rollup-plugin-babel";

export default {
  input: "./src/index.js", // 入口
  output: {
    file: "./dist/vue.js", // 出口
    name: "Vue", // 打包全局挂载Vue实例。打包后会生成一个 golbal.vue
    format: "umd", // 打包格式。常见格式有 esm es6模块 commonjs模块 iife自执行函数 umd(commonjs amd)
    sourcemap: true, // 希望可以调试源代码
  },
  // 插件配置。所有插件都是函数，执行即可
  plugins: [
    // 一般babel都会配置一个babel文件
    babel({
      exclude: "node_modules/**", // 排除node_modules下所有文件
    }),
  ],
};
```

> 题外话
>
> 最开始我把 `input` 错敲成 `imput` ，导致一直报错，提示 `options.input` 没有。

根目录下新建一个 `.babelrc` 文件，用于配置 `babel` 。打包后会找到这个文件。代码如下：

```json
{
  "presets": ["@babel/preset-env"]
}
```

现在配置完成，输入命令行开始打包编译：

```
npm run dev
```

运行成功后可以看到根目录下新建一个 `dist` 文件夹，点击查看 `vue.js` 文件，可以看到其已经编译转换成功：

![编译](https://pic.imgdb.cn/item/64eeb143661c6c8e54849a16.jpg)

测试一下是否全局有了 `Vue` 实例，`dist` 文件夹下新建一个 `index.html` 文件，引入 `vue.js` 文件，在输出 `Vue` ，代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="./vue.js"></script>
  <script>
    console.log(Vue)
  </script>
</body>
</html>
```

最终打印结果为：

```js
{a: 100, __esModule: true}
```

能够拿到打印结果。且因为事先配置允许调试源码，在 `src/index.js` 文件中添加 `debugger` 可以生成断点，用于调试。

> 题外话
>
> 为什么使用了 `babel` 编译为低级语法了只能支持 IE9 以上？
>
> 因为 Vue2 的 `Object.defineProperty` 语法只支持 IE9 以上，没有低级语法可以代替；而 Vue3 的 Proxy 更是直接剔除 IE 行列。

## Vue响应式原理实现

实现响应式数值变化，数值变化了我们可以监控到数据的变化。

首先初始化数据，在 `index.html` 内创建一个 `Vue` 实例，把所有数据放到 `data` 对象内，代码如下：

```html
<script>
  console.log(Vue)
  const vm = new Vue({
    data: {
      name: 'daodao',
      age: 23
    }
  })
</script>
```

### 初始化函数

接下来需要创建一个。`Vue` 源码并没有创建类 `class` 来设计，因为当方法多了之后，会造成很多方法的耦合。`Vue` 采取的方法是配置构造函数，通过原型的方式把构造函数挂载到 `Vue` 实例上，最终导出 `Vue` 实例。如下：

```js
function Vue() {}

Vue.prototype.xxx = xxx

export default Vue
```

在 `index.html` 文件中 `new Vue` 就是此处导出的 `Vue` 。

现在可以用上面的方法配置初始化函数。新建一个 `src/init.js` 文件，用于数据初始化操作。

在原型上挂载一个 `_init` 函数，接收一个数据参数。为了能让后续调用的函数都能使用接收的数据参数，故把该形参挂载到 `this` 上，后面的函数都能通过 `this` 拿到了。

代码中用 `vm` 代表 `this` ，后续都通过 `vm` 获取方法变量。代码如下：

```js
import { initState } from "./state";

// 给Vue增加init方法
export function initMixin(Vue) {
  // 初始化操作
  Vue.prototype._init = function (options) {
    // 在vue中，vm.$options就是获取用户配置的。使用Vue时，$开头都是Vue自身的方法
    const vm = this;
    vm.$options = options;

    // 初始化状态处理函数（状态初始化章节详讲）
    initState(vm);
  };
}
```

`index.js` 使用原型上的 `_init` 函数，传递数据参数。代码如下：

```js
import { initMixin } from "./init";

// options就是用户的选项
function Vue(options) {
  this._init(options);
}

initMixin(Vue); // 扩展init的方法

export default Vue;
```

当 `index.html` 文件使用 `new Vue()` 创建构造函数后，就会触发 `_init()` 方法，并把 `new Vue()` 括号内的对象参数传递给 `options` 。

### 状态初始化

接下来作状态初始化处理，创建 `state.js` 文件，声明一个 `initState` 函数，用于作状态初始化。

函数主要判断接收获取到的数据，是否有 `prop` 、`data` 等，每个模块做对应处理。本案例先以 `data` 为主。存在 `data` 则判断其类型做相应的处理。

如果是对象，不需要作额外处理；如果是函数，则通过 `call()` 方法修改其 `this` 指向为 `Vue` 上。代码如下所示：

```js
export function initState(vm) {
  // 获取所有选项
  const opts = vm.$options;

  // 如果有data数据，则初始化data数据
  if (opts.data) {
    initData(vm);
  }
}

function initData(vm) {
  // 获取所有data数据
  let data = vm.$options.data;
  debugger;
  // Vue2中data可以是对象也可以是函数（Vue3统一函数），因此需要先判断
  data = typeof data === "function" ? data.call(vm) : data;
  console.log(data);
}
```

最终保存，通过 `debugger` 查看数据。

## 对象属性劫持

### 数据劫持

劫持数据，在 `src` 文件夹下新建一个 `observe/index.js` 文件，声明一个 `observe` 函数，用于劫持数据。`state.js` 中引入， `initData` 调用该函数。代码如下：

```js
export function initState(vm) {
  // 获取所有选项
  const opts = vm.$options;

  // 如果有data数据，则初始化data数据
  if (opts.data) {
    initData(vm);
  }
}

function initData(vm) {
  // 获取所有data数据
  let data = vm.$options.data;

  // Vue2中data可以是对象也可以是函数（Vue3统一函数），因此需要先判断
  data = typeof data === "function" ? data.call(vm) : data;
  
  // 劫持数据 defindProperty
  observe(data);
}
```

`observe/index.js` 内声明一个 `observe` 函数并按需导出供外部使用，该函数需要先判断数据类型是否为对象，对象才能劫持。然后添加一个类实例，用来判断该对象是否被劫持过，劫持过则不需要再劫持了。代码如下：

```js
export function observe(data) {
  // 判断是否为对象，是则劫持该对象数据
  if (typeof data !== "object" || data == null) {
    return; // 只能对对象进行劫持
  }

  // 如果对象被劫持过了，那就不需要再被劫持了（要判断一个对象是否被劫持过，可以添加一个实例，用实例来判断是否被劫持过）
  // todo...
  
  return new Observe(data);
}
```

定义一个类方法 `Observe` ，构造器中获取传参，并在 `walk` 方法中 **重新定义** 对象的属性。这也是为什么 Vue2 性能比 Vue3 差的原因。

循环遍历对象，调用 `defineReactive` 函数，传递三个参数：整个 `data` 数据对象、键名、键值。代码如下：

```js
class Observe {
  constructor(data) {
    // Object.defineProperty只能劫持已经存在的属性（vue里会为此单独写一些api，如$set、$delete)
    this.walk(data);
  }

  // 循环对象 对属性依次劫持
  walk(data) {
    // “重新定义” 属性（性能比vue3差的原因）
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]));
  }
}
```

`defineReactive()` 函数主要运用 `Object.defineProperty` 方法定义劫持属性。在劫持之前，重新调用 `observe` 方法，对值判断，看值是否为对象。代码如下：

```js
export function defineReactive(target, key, value) {
  // 递归思想，如果value值的类型不是对象，则return；如果是对象，则继续劫持
  observe(value);

  // 此处value存放在闭包中，不会销毁
  Object.defineProperty(target, key, {
    // 取值执行get
    get() {
      return value;
    },
    // 修改值执行set
    set(newValue) {
      if (newValue === value) return;
      value = newValue;
    },
  });
}
```

### 数据获取

劫持成功后的数据对象并没有在全局 `vm` 变量上，因此我们要返回 `state.js` 文件，把劫持后的数据挂载到 `vm` 上。代码如下：

```js
// ...

function initData(vm) {
  // 获取所有data数据
  let data = vm.$options.data;

  // Vue2中data可以是对象也可以是函数（Vue3统一函数），因此需要先判断。这里的data是用户的数据
  data = typeof data === "function" ? data.call(vm) : data;

  // 此时vm只有用户的数据，没有我们劫持后的数据。把劫持后的数据放到原型上供用户使用。这里的_data是劫持后的对象
  vm._data = data;

  // 劫持数据 defindProperty
  observe(data);
}
```

此时控制台输出能看到数据，通过 `vm._data.xxx` 可以获取到数据。但是想要的效果是通过 `vm.xxx` 就能获取到数据，解决方案为把 `vm._data` 用 `vm` 代理即可。代码如下：

```js
// ...

// 代理。这里的target就是_data，key是每个对象的键
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]; // vm._data.xxx
    },
    set(newValue) {
      vm[target][key] = newValue;
    },
  });
}

function initData(vm) {
  // 获取所有data数据
  let data = vm.$options.data;

  // Vue2中data可以是对象也可以是函数（Vue3统一函数），因此需要先判断。这里的data是用户的数据
  data = typeof data === "function" ? data.call(vm) : data;

  // 此时vm只有用户的数据，没有我们劫持后的数据。把劫持后的数据放到原型上供用户使用。这里的_data是劫持后的对象
  vm._data = data;

  // 劫持数据 defindProperty
  observe(data);

  // 此时用户想要获取或者修改数据，必须通过 vm._data.xxx 的写法，不够人性化。把 vm._data 用 vm 来代理
  for (const key in data) {
    proxy(vm, "_data", key);
  }
}
```

现在对象数据能够没劫持到了。

## 数组方法劫持

接下来劫持数组的数据，此时不能直接调用 `walk` 方法，而是需要先判断数据的格式，对象格式的数据才走 `walk` 方法。如果是数组格式的数据，则走新的方法 `observeArray` 。

该方法遍历数组后，每一项数据都调用一次 `observe` 方法劫持数据。代码如下所示：

```js
import { newArrayProto } from "./array";

class Observe {
  constructor(data) {
    // Object.defineProperty只能劫持已经存在的属性（vue里会为此单独写一些api，如$set、$delete)
    if (Array.isArray(data)) {
      // 重写数组7个变异方法方法，但也要保留数组原有的特性
      data.__proto__ = newArrayProto;

      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }

  walk(data) {
    // ...
  }

  observeArray(data) {
    // 如果数组中放了对象，对象可以被监控到
    data.forEach((item) => observe(item));
  }
}

// ...
```

在 `src/observe` 文件夹下新建一个 `array.js` 文件，用于重写数组部分方法。步骤如下：

1. 获取数组的原型
2. 把数组原型赋值给新的变量，后续修改新变量即可，不会影响旧的数组原型
3. 找到数组变异方法 API 数组
4. 遍历变异方法 API 数组，先调用旧原型的方法，在获取新增的数据（新增的数组通过方法获取必定是数组格式）。新增的数据调用上面 `observeArray` 劫持。

代码如下：

```js
// 重写数组部分方法

// 获取数组原型
let oldArrayProto = Array.prototype;

// 先拷贝一份，不影响之前的。newArrayProto.__proto__ = oldArrayProto
export let newArrayProto = Object.create(oldArrayProto);

// 找到数组变异方法
let methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"]; // concat、slice都不会改变原数组

methods.forEach((method) => {
  newArrayProto[method] = function (...args) {
    // 内部调用原来的方法，函数的劫持，切片编程
    // 这里的this谁调用指向谁。如一个数组arr.push()，则this指向arr
    const result = oldArrayProto[method].call(this, ...args);

    // 新增的数据也需要劫持
    let inserted;
    let ob = this.__ob__;

    switch (method) {
      case "push":
      case "unshift":
        // 新增数据，获取全部新增的数据
        inserted = args;
        break;
      case "splice":
        // 数据替换，splice第三个参数（索引为2）为新增的数据
        inserted = args.slice(2);
        break;
      default:
        break;
    }

    if (inserted) {
      // 对新增的内容再次观测
      ob.observeArray(inserted);
    }

    return result;
  };
});
```

由于需要调用 `observeArray` 方法，而该方法在同级目录下的 `index.js` 中。因此需要把它当前的 `this` 指向挂载到数据 `__ob__` 上，该文件通过 `this.__ob__` 获取。

而数据上存在 `__ob__` 时，说明该数据被劫持过了，不需再劫持了，刚好可以用于做判断处理。

函数 `defineReactive` 则需要对 `set` 方法做处理，新增的值也需要再次调用 `observe` 方法，让其做数据劫持。

`index.js` 代码如下：

```js
class Observe {
  constructor(data) {
    data.__ob__ = this;

    // ...
}
  
export function defineReactive(target, key, value) {
  // 递归思想，如果value值的类型不是对象，则return；如果是对象，则继续劫持
  observe(value);

  // 此处value存放在闭包中，不会销毁
  Object.defineProperty(target, key, {
    // 取值执行get
    get() {
      return value;
    },
    // 修改值执行set
    set(newValue) {
      if (newValue === value) return;
      observe(newValue);
      value = newValue;
    },
  });
}
  
export function observe(data) {
  // ...

  if (data.__ob__ instanceof Observe) {
    // 已经被劫持过了
    return data.__ob__;
  }

  // 如果对象被劫持过了，那就不需要再被劫持了（要判断一个对象是否被劫持过，可以添加一个实例，用实例来判断是否被劫持过）
  return new Observe(data);
}
```

但是这么写会有一个 BUG，我们可以看到上方代码中，类 `Observe` 会接收一个对象格式的数据，然后为该对象添加一个 `__ob__` 的 `this` 指向的属性，接着对该属性做判断，符合对象的要求，没有 `__ob__` ，就在其身上绑定一个 `__ob__` 。接着在遍历 `__ob__` 内的 `__ob__` ......直到造成死循环。

解决方法为把 `__ob__` 这个属性设置为不可枚举的。代码如下：

```js
class Observe {
  constructor(data) {
    // 把this放到data对象中。如果数据对象上有__ob__，说明他被观测过了
    Object.defineProperty(data, "__ob__", {
      value: this,
      enumerable: false, // 把__ob__ 变得不可枚举，无法监测
    });
    // data.__ob__ = this;

    // ...
  }
  // ...
}
```

现在可以对数组进行劫持。

## 模板编译原理，转化ast语法树

### 解析模板参数

### 模板转ast语法树

## 代码生成虚拟DOM

## 虚拟DOM生成真实DOM