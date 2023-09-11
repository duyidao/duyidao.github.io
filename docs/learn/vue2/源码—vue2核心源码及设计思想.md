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

修改数组很少用索引来操作数组，因为[9999]数据要被劫持很多次，有很大的性能浪费。

但是数组内有对象时，索引点语法也应该被劫持。如 `arr[0].a` 是允许修改的

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

将数据解析到el元素上，有以下方式：

1. 模板引擎，性能差，需要正则匹配替换，Vue1.0 版本没有引入虚拟 DOM
2. 虚拟 DOM，数据变化后比较虚拟 DOM 的差异，最后更新需要更新的地方
3. 核心是需要将模板变成 JS 语法，通过 JS 语法生成虚拟 DOM

转换为语法树需要重新组装代码为新语法，将 `template` 语法转换为 `render()` 函数。

修改 `init.js` 文件解析模板参数，步骤如下：

1. 判断传递的参数是否有 `render()` 函数返回 JSX，如果有该函数，无需做任何处理
2. 没有 `render()` 函数则需要判断是否有 `template` 模板标签，有的话通过函数转化为ast树
3. 没有 `template` 模板，则把获取到的 el 的外部标签赋值给 `template` 变量

代码如下：

```js
import { compileToFunction } from "./compiler/index";
import { initState } from "./state";

// 给Vue增加init方法
export function initMixin(Vue) {
  // 初始化操作
  Vue.prototype._init = function (options) {
    // ...

    if (options.el) {
      vm.$mount(options.el);
    }
  };

  // 由于把$mount方法挂载到原型上，因此除了传el外，可直接new Vue().$mount也可以
  Vue.prototype.$mount = function (el) {
    const vm = this;
    el = document.querySelector(el);
    let ops = vm.$options;

    // 查看是否写render函数
    if (ops.render) {
      ops.render;
    } else {
      // 没有render看一下是否写template，没写采用外部的template
      let template;
      // 如果没有写模板但是写了el
      if (!ops.template && el) {
        template = el.outerHTML;
      } else {
        if (el) {
          // 如果有el，采用模板的内容
          template = ops.template;
        }
      }

      // 写了template，就采用写了的template
      if (template) {
        const render = compileToFunction(template);
        ops.render = render;
      }
    }
  };
}
```

> 注意
>
> `script` 标签引用的是 `vue.glogal.js` 这个编译过程是在浏览器中运行的。
>
> `runtime` 是不包括模板编译的，整个编译是打包的时候通过 loader来编译 `.vue` 文件的，用 `runtime` 不可使用 `template` .

### 模板转ast语法树

HTML 主要解析标签、文本、属性、表达式，首先在 `src` 文件夹下新建一个 `compiler/index.js` 文件，用于解析语法转为 ast 树。

接着创建正则，通过正则匹配开始标签、属性、闭合标签和表达式或文本内容，代码如下：

```js
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;

// 匹配到的是<xxx 或 <div:xxx 自定义标签名 即匹配到开始标签
const startTagOpen = new RegExp(`^<${qnameCapture}`);

// 匹配的是 </xxx> 即匹配到结束标签
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

// 匹配的是属性，如 xxx = "xxx" 或 xxx = 'xxx'
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;

// 匹配的是开始闭合标签，如<div> 或 <br />
const startTagClose = /^\s*(\/?)>/;

// 匹配到是表达式变量，如{{name}}
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
```

然后声明 `compileToFunction` 函数并导出供上方 解析模板参数 步骤代码时使用，该函数主要做以下两个操作：

1. 将template转为ast语法树
2. 生成render方法（render方法执行后返回的结果就是虚拟 DOM）

代码如下：

```js
export const compileToFunction = (template) => {
  // 1.将template转为ast语法树
  const ast = parseHTML(template);

  // 2.生成render方法（render方法执行后返回的结果就是虚拟 DOM）
};
```

紧接着创建 `parseHTML` 函数，用于通过正则 `.match()` 方法解析 html，文本解析规则如下：

1. 先匹配开始标签，如 `<div`
2. 然后匹配属性，如 `id="xxx" class="xxx"`
3. 接着匹配文本内容
4. 最后匹配结束标签，如 `</div>`
5. 由于标签层层嵌套，因此通过 `while` 循环，循环到一个则通过 `continue` 中止当前循环，减少后续代码执行的性能消耗
6. 解析匹配完后获取到相对应的索引下标，截取字符串的形式截取匹配过的内容。这样匹配完后也截取完了， `while` 循环自动终止

代码如下：

```js
// 解析html
function parseHTML(html) {
  // 处理开始标签
  function start(tag, attrs) {
    console.log(tag, attrs, "开始");
  }
  // 处理文本内容标签
  function chars(text) {
    console.log(text, "文本");
  }
  // 处理结束标签
  function end(tag) {
    console.log(tag, "结束");
  }

  // 裁剪html
  function advance(n) {
    html = html.substring(n);
  }

  // 寻找开启标签
  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1], // 标签名
        attrs: [], // 属性数组对象，保存id、class等
      };
      // 先把 <div 开始标签截取掉
      advance(start[0].length);

      // 如果不是开始标签的结束，则一直匹配
      let attr, end;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        // 此时 id="xxx" class="xxx" 都被删除，只剩 >
        advance(attr[0].length);
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
      }
      // 此时把 > 删除
      if (end) {
        advance(end[0].length);
      }
      return match;
    }

    // 不是开始标签，返回假
    return false;
  }

  // 每解析一段，就删除一段，直到最后解析完毕。因此可以写一个while循环
  while (html) {
    // html最开始肯定是一个 < (vue2要求单个根目录的原因)
    let textEnd = html.indexOf("<");

    // 如果索引是0，则说明是个开始标签；不为0则说明是结束标签
    if (textEnd === 0) {
      const startTagMatch = parseStartTag();

      if (startTagMatch) {
        // startTagMatch :{
        //   attrs: [{name: 'id', value: 'app'}]
        //   tagName: "div"
        // }
        // 解析到开始标签
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      let endTagMatch = html.match(endTag);
      if (endTagMatch) {
        end(endTagMatch[0]);
        advance(endTagMatch[0].length);
        continue;
      }
    }

    // 截取文本内容
    if (textEnd > 0) {
      let text = html.substring(0, textEnd);
      if (text) {
        // 解析到文本
        chars(text);
        advance(text.length);
      }
    }
  }
}
```

打印如下所示：

![打印](https://pic.imgdb.cn/item/64f6fcf8661c6c8e54ac3ded.jpg)

匹配解析完毕之后，需要根据解析好的数据构建 ast树对象，而如何得知标签与标签之间的嵌套关系呢？

通过栈的方式，依次往里面放入节点，直到匹配到结束标签，才把该节点从栈中剔除。

AST 树结构为一个对象，包含以下属性：

```js
{
  tag,
  type: 1,
  children: [],
  attrs,
  parent: null,
}
```

其中：

- tag 为标签名，在开始标签匹配时能获取
- type 为标签类型，是标签节点函数文本内容节点
- children 为子节点数组
- attes 为当前标签的属性，在开始标签匹配时能获取
- parent 为当前节点的父节点判断父节点通过栈来获取，栈最后一个即其父节点

分析结束，贴上代码。代码如下：

```js
// 解析html
function parseHTML(html) {
  const ELEMENT_TYPE = 1;
  const TEXT_TYPE = 3;
  const stack = []; // 存放元素的数组
  let currentParent; // 指向栈中的最后一个
  let root; // 是否是根节点

  // 转为抽象语法树
  function createASTElement(tag, attrs) {
    return {
      tag,
      type: ELEMENT_TYPE,
      children: [],
      attrs,
      parent: null,
    };
  }

  // 处理开始标签
  function start(tag, attrs) {
    let node = createASTElement(tag, attrs); // 创建一个ast树节点
    // 判断是否是空树
    if (!root) {
      root = node; // 空树则是当前树的根节点
    }
    // 如果栈中最后一个有内容，则把当前节点的父亲节点赋值为栈的最后一个
    if (currentParent) {
      node.parent = currentParent; // 子节点记住了父节点
      currentParent.children.push(node); // 父节点的子节点数组也需要保存值
    }
    // currentParent为栈中最后一个
    stack.push(node);
    currentParent = node;
  }
  // 处理文本内容标签
  function chars(text) {
    // 去除空
    text = text.replace(/\s/g, "");
    // 文本直接放到当前指向节点中
    text &&
      currentParent.children.push({
        type: TEXT_TYPE,
        text,
        parent: currentParent,
      });
  }
  // 处理结束标签
  function end(tag) {
    // 弹出最后一个节点，该节点已结束，不能作为父节点的判断
    let node = stack.pop();
    currentParent = stack[stack.length - 1];
  }

  // ...

  console.log("currentParent", currentParent);
  console.log("rot", root);
}
```

### 图解

如果还是无法理解接下来用图解的方式来说明，先看一段 HTML 代码：

```html
<div id="app">
  <div>
    hello
  </div>
  <span>{{name}}</span>
</div>
```

初始化栈 `stack` ，此时栈还是空的。

此时开始循环匹配，匹配第一个是 `<div id="app"` 开始标签，往栈中追加该 `div` ，创建 AST 树，并把它设为根节点 `root` 。然后截取掉该 `div` ，HTML 代码变为了：

```html
>
  <div>
    hello
  </div>
  <span>{{name}}</span>
</div>
```

而栈为：

```
[div#app]
```

然后继续循环，匹配到开始标签 `<div` ，其父节点则为栈中最后一项，即根节点的 `div#app` ，再往内追加标签，生成 AST 树，最后截取 HTML，代码更新如下：

```html
	>
    hello
  </div>
  <span>{{name}}</span>
</div>
```

而栈更新为：

```
[div#app div]
```

AST 树图解如下：

![AST 树图解](https://pic.imgdb.cn/item/64f712c8661c6c8e54b293ab.jpg)

接着继续循环，匹配到文本内容，赋值给当前节点的 `text` 属性，即当前栈最后一项。然后再截取 HTML。更新后的代码如下：

```html
	</div>
  <span>{{name}}</span>
</div>
```

此时栈不变，而 AST 树更新如下：

![AST 树更新](https://pic.imgdb.cn/item/64f713a1661c6c8e54b2af08.jpg)

继续匹配，匹配到结束标签，则把 `div` 剔除，此时该 `div` 标签的 AST 树生成完毕，栈更新为：

```
[div#app]
```

接着循环，此时匹配到 `span` 标签，获取栈最后一项，是根节点 `div#app` ，则其为 `span` 标签的父节点，再往栈中追加 `span` 标签。代码更新为：

```html
	>{{name}}</span>
</div>
```

栈更新为：

```
[div#app span]
```

此时 AST 更新为：

![AST 更新](https://pic.imgdb.cn/item/64f714f8661c6c8e54b2e82f.jpg)

然后继续匹配，匹配到了文本内容，赋值给当前节点也就是栈最后一项 `span` ，更新 AST 树：

![更新](https://pic.imgdb.cn/item/64f715a1661c6c8e54b3083e.jpg)

截取去除相应 HTML 代码后接着循环，匹配到结束标签，剔除 `span` ，最后匹配到 `div#app` 的结束标签，把该节点也从栈中剔除，最后 AST 树创建完毕。

## 代码生成虚拟DOM

接下来转为虚拟 DOM 元素，虚拟 DOM 包含三个方法：

- `_v` ：创建文本
- `_c` ：创建元素
- `_s` ：创建变量

最终生成的虚拟 DOM 如下所示：

```html
_v(_s(name)+'hello'+_s(age))

# 对应以下的 HTML 标签节点：

<div id="app">
      <div>{{name}} hello {{age}}</div>
</div>
```

处理 `gen` 函数中为文本的判断逻辑，首先创建一个数组 `tokens` ，创建好一个虚拟 DOM 后追加到数组内，后续数组转字符串拼接的形式输出出去。

接着循环文本内容，通过前面写的正则匹配到模板字符串 `{{xxx}}` 的形式，`.match()` 方法匹配到后用 `_s()` 拼接起来。由于不确定其前后是否会有空格，最好用 `.trim()` 方法去除前后空格。

然后开始做判断，总共有以下几种情况：

1. 该标签只有模板字符串，没有其他内容，正常循环完毕即可，无需做额外处理

2. 文本内容在模板字符串前，如下方代码所示：

   ```html
   <span>hello {{name}}</span>
   ```

   因此在循环前先做判断，判断正则匹配到的内容索引是否在当前文本索引后面，如果在后面，说明前面有文本内容，需要先截取这段内容放到 `tokens` 数组内

3. 文本内容在模板字符串后，如下方代码所示：

   ```html
   <span>{{name}} hello</span>
   ```

   此时当前匹配的模板字符串索引比整体文本内容小，需要把后面的内容截取追加到 `tokens` 数组内。

最后通过 `.join()` 方法把数组转为字符串的形式返回出去。代码如下所示：

```js
function gen(child) {
  if (child.type === 1) {
    // 节点
    return codegen(child);
  } else {
    // 文本
    let text = child.text;
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`;
    } else {
      // c创建元素
      // v创建文本
      // s创建变量
      // _v(_s(name)+'hello+_s(name))
      let tokens = [];
      let match;
      let lastIndex = 0;
      defaultTagRE.lastIndex = 0; // 每次捕获后先把索引重置
      while ((match = defaultTagRE.exec(text))) {
        let index = match.index;

        // 不能单纯放 {{xxx}} 的结果，也要放文本。如{{name}} hello {{age}}，第一次匹配到{{name}}，第二次匹配到{{age}}。则hello的索引位置是最后一次匹配到的内容长度（即{{age}}）加上其索引，即为整个文本长度
        // 注意要添加 JSON.stringify 转为字符串的形式
        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }
        tokens.push(`_s(${match[1].trim()})`);
        lastIndex = index + match[0].length;
      }

      // 如果匹配结束索引比整体长度要小，说明模板字符串在前内容在后，如{{name}} hello，此时把后面所有文本放进去即可
      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }
      return `_v(${tokens.join("+")})`;
    }
  }
}
```

> 注意
>
> `index` 是当前匹配到哪个位置的索引，初始为0，匹配完毕之后把当前索引加上匹配的模板字符串内容长度即为下一次开始匹配时第一个字符串的索引位置。
>
> 其次是文本内容添加到数组 `tokens` 内时需要搭配 `JSON.stringify()` 方法转为字符串的形式，否则后续会把该文本识别为变量

返回 `compileToFunction` 函数，此时已经能获取到虚拟 DOM 了，返回一个 `with` 函数。代码如下：

```js
export const compileToFunction = (template) => {
  // 1.将template转为ast语法树
  const ast = parseHTML(template);

  // 2.生成render方法（render方法执行后返回的结果就是虚拟 DOM）
  // render() {
  //   return _c('div', {id: 'app'}, _c('div', {style: {color: 'red'}}, _v(_s(name)+'hello'))), _c('span', undefined, _v(_s(age)))
  // }
  let code = codegen(ast);
  code = `with(this){return ${code}}`;
  let render = new Function(code);

  return render;
};
```

## 虚拟DOM生成真实DOM

### 准备执行 render 函数

此时原型上是没有这些 `_c` 、`_v` 的方法的，因此运行刷新后会报错。现在给 Vue 原型绑定这些方法。

前面已经介绍过每个方法的功能与作用，这里不做过多赘述，新建一个 `lifecycle.js` 文件，主要做以下流程：

1. 创造响应式数据
2. 模板转换成ast语法树
3. 将ast语法树转换了render函数
4. 后续每次数据更新可以只执行render函数（无需再执行ast转化过程

render会产生虚拟节点（响应式数据）。根据生成的虚拟节点创造真实dom

代码如下：

```js
import { createElementVNode, createTextVNode } from "./vdom/index";

export const initLifeCycle = (Vue) => {
  Vue.prototype._update = function (vnode) {};

  Vue.prototype._c = function () {
    return createElementVNode(this, ...arguments);
  };
  Vue.prototype._v = function () {
    return createTextVNode(this, ...arguments);
  };

  Vue.prototype._s = function (value) {
    if (typeof value === "object") return;
    return JSON.stringify(value);
  };

  Vue.prototype._render = function () {
    const vm = this;

    // 让with中的this指向vm
    return vm.$options.render.call(vm); // 通过ast语法转义后的render方法
  };
};

export const mountComponent = (vm, el) => {
  // 1.调用render方法产生虚拟节点 虚拟dom
  vm._update(vm._render());

  // 2.根据虚拟DOM产生真实dom

  // 3.插入到el元素中
};
```

返回 `src/index.js` 文件扩展方法，代码如下：

```js
import { initMixin } from "./init";
import { initLifeCycle } from "./lifecycle";

// ...
initLifeCycle(Vue);

export default Vue;
```

新建 `ndom/index.js` 文件，用于创建虚拟DOM 节点，代码如下：

```js
// h() _c()
export function createElementVNode(vm, tag, data, ...children) {
  // 避免data为null报错
  if (data == null) data = {};

  let key = data.key;
  if (key) {
    delete data.key;
  }

  return vnode(vm, tag, key, data, children);
}

// _v()
export function createTextVNode(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text);
}

// ast做的是语法层面的转换，描述的是语法本身（可以描述js、css、html）
// vnode虚拟dom描述的是dom元素，可以增加一些自定义属性
function vnode(vm, tag, key, data, children, text) {
  return {
    vm,
    tag,
    key,
    data,
    children,
    text,
  };
}
```

最后返回 `src/init.js` 文件，挂载 `mountComponent ` 方法。

```js
import { mountComponent } from "./lifecycle.js";
// ...

// 给Vue增加init方法
export function initMixin(Vue) {
  // ...

  // 由于把$mount方法挂载到原型上，因此除了传el外，可直接new Vue().$mount也可以
  Vue.prototype.$mount = function (el) {
    // ...

    mountComponent(vm, el); // 组件挂载到实例上

    // 获取到render方法
  };
}
```

> 题外话
>
> AST 树与 vnode 虚拟 DOM 节点是不同的含义，AST 树做的是语法层面的转换，描述的是语法本身（可以描述js、css、html）。而 vnode  虚拟dom描述的是dom元素，可以增加一些自定义属性

### 实现转换

接下来修改原型上的 `_update()` 方法实现转换。首先获取到旧 DOM 节点和新的虚拟 DOM，代码如下：

```js
Vue.prototype._update = function (vnode) {
  // 将vnode转换为真实dom
  const vm = this;
  const el = vm.$el;

  // patch既有初始化功能，又有更新的功能
  vm.$el = patch(el, vnode);
};
```

`patch` 方法主要用于判断是真实 DOM 还是虚拟 DOM，真实 DOM 则创建新的 DOM，替换掉旧的 DOM。

```js
function patch(oldVnode, vnode) {
  // 写的是初渲染流程
  const isRealElement = oldVnode.nodeType;

  if (isRealElement) {
    // 是真实dom节点
    const elm = oldVnode; // 获取真实元素
    const parentElm = elm.parentNode; // 拿到父元素

    let newElm = createElm(vnode);
    console.log(newElm);

    // 先把新的放到老旧节点下面，然后再删除老旧节点
    parentElm.insertBefore(newElm, elm.nextSibling);
    parentElm.removeChild(elm);
    
    // 返回新的dom节点
    return newElm;
  } else {
    // 是虚拟dom元素
  }
}
```

`createElm` 方法通过当前的类型判断是标签还是文本，而样式则单独处理。

```js
function createElm(vnode) {
  let { tag, data, children, text } = vnode;

  if (typeof tag === "string") {
    // 是字符串，创建的是标签。将真实节点和虚拟节点对应起来，后续如果修改属性了，可通过虚拟节点找到真实节点
    vnode.el = document.createElement(tag);

    // 处理元素的属性
    patchProps(vnode.el, data);

    // 处理儿子，通过递归的方式；递归创建完后要把它塞到该元素内部
    children.forEach((element) => {
      vnode.el.appendChild(createElm(element));
    });
  } else {
    // 不是字符串，创建的是文本
    vnode.el = document.createTextNode(text);
  }

  return vnode.el;
}

function patchProps(el, props) {
  for (const key in props) {
    if (key === "style") {
      for (const styleName in props.style) {
        el.style[styleName] = props.style[styleName];
      }
    } else {
      el.setAttribute(key, props[key]);
    }
  }
}
```

### 测试

设置一个定时器，一段时间后修改变量内容，代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="app" style="color: red; font-size: 14px">
      <div>{{name}} hello {{age}}</div>
      <span>world</span>
    </div>
    <script src="./vue.js"></script>
    <script>
      const vm = new Vue({
        el: "#app", // 将数据解析到el元素上
        data: {
          name: "daodao",
          age: 23,
          list: ["eat", { a: 1 }],
        },
      });

      vm.$mount("#app");
      setTimeout(() => {
        vm.name = "刀刀";
        vm.age = 24;
        vm._update(vm._render());
        // console.log(vm);
      }, 1500);
    </script>
  </body>
</html>
```

页面效果能够实现，说明已经成功。

总结一下：

1. 将数据先处理成响应式 `initState()` （针对对象来说主要是增加 `defineProperty` ，针对数组就是重写方法）
2. 模板编译：将模板先转换为 AST 树，将 AST 语法树生成 `render` 方法
3. 调用 `render` 方法函数，进行取值操作，产生对应的虚拟 DOM `render() {_c('div', null, _v(name))}` ，触发 `get` 方法
4. 将虚拟 DOM 渲染成真实 DOM

## 实时更新

### 依赖收集

依赖收集主要是以下操作：

1. 给模板的属性增加一个 Dep
2. 页面渲染的时候，将渲染逻辑封装到 Watcher 中
3. 让 Dep 记住这个 Watcher，属性变化后可以找到对应 Dep 中存放的 Watcher 进行重新渲染
4. 观察者模式

首先我们要梳理 `Dep` 和 `Watcher` 的关系，给每个属性添加一个dep，目的就是收集watcher。

一个视图有多个属性，也就是n个dep对应1个watcher。同样的，一个属性在多个视图都有，因此1个dep对应多个watcher

在 `observe` 文件夹下新建一个 `watcher.js` 文件，该文件用于设置侦听器

