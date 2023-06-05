# React

## 本质

是一个由数据渲染视图的 JavaScript 库。

React 是一个用于构建用户界面的 JAVASCRIPT 库。

**特点：**

1. 采用组件化模式、声明式编码，提高开发效率及组件复用率
2. 在 React Native 中可以使用 React 语法进行移动端开放
3. 使用虚拟 DOM + 优秀的 Diffing 算法，尽量减少与真实 DOM 的交互

## 无脚手架项目初实现

1. 引入对应的 react 核心库、dom 操作库与 babel `jsx` 转 `js` 的资源
2. 准备容器（如 vue 中挂载元素的 `#app` ）
3. script 标签设置类型为 babel，进行翻译
4. 创建虚拟 DOM
5. 通过 `ReactDOM.render` 渲染到界面中

```html
<body>
  <!-- 准备一个 “容器” -->
  <div id="test"></div>

  <!-- 引入react核心库，引入后会有全局的React -->
  <script src="../js/react.development.js"></script>
  <!-- 引入react dom操作，引入后会有全局的ReactDOM -->
  <script src="../js/react-dom.development.js"></script>
  <script src="../js/babel.min.js"></script>

  <!-- 告诉浏览器，此处不是js而是jsx，且靠babel编译为js -->
  <script type="text/babel">
    // 1.创建虚拟DOM
    const vDOM = <h1>Hello, React</h1> // jsx可以使用标签和文本混着写。不需要加引号
    // 2.渲染虚拟DOM到界面
    console.log(React);
    ReactDOM.render(vDOM, document.querySelector('#test'))
  </script>
</body>
```

> 注意
>
> 1. 如果在创建虚拟 DOM 时给标签加上单引号，则不是在创建标签，而是把 `<h1>Hello, React</h1> ` 这个字符串作为内容赋值过去，页面也是显示这个内容。
>
> 2. 如果想要追加，不能多写一个 `ReactDOM.render` ，代码如下：
>
>    ```js
>    ReactDOM.render(vDOM, document.querySelector('#test'))
>    ReactDOM.render(vDOM2, document.querySelector('#test'))
>    ```
>
>    这个操作是在覆盖，而不是追加，后面的内容会覆盖原来的内容。后续讲到组件后再实现追加功能。

## 虚拟DOM的创建方式

### js

除了使用 jsx 创建虚拟 DOM 外，还能使用 js 的方式创建，此时不再需要引入 `babel` ，方法如下：

```html
<body>
  <!-- 准备一个 “容器” -->
  <div id="test"></div>

  <!-- 引入react核心库，引入后会有全局的React -->
  <script src="../js/react.development.js"></script>
  <!-- 引入react dom操作，引入后会有全局的ReactDOM -->
  <script src="../js/react-dom.development.js"></script>

  <script type="text/javascript">
    // 参数1：标签名；参数2：标签属性；参数3：标签内容
    const vDOM = React.createElement('h1', {id: 'title'}, 'hello, react by js')
    ReactDOM.render(vDOM, document.querySelector('#test'))
  </script>
</body>
```

在创建虚拟 DOM 时，由于没有 jsx 语法，因此不能直接写标签。React 提供 `React.createElement` 方法，该方法与 `document.createElement` 相比的区别在于前者用于创建虚拟 DOM，后者创建真实 DOM。

但是这个方法并不是一劳永逸替代 jsx 的，jsx 创建之初就是用来做创建虚拟 DOM 的语法糖，自然会有其特点。我们来看下面这个需求：我要那段文本放到一个 `span` 标签内，如果用 js 的方式，写成如下形式：

```js
const vDOM = React.createElement('h1', {id: 'title'}, '<span>hello, react by js</span>')
```

结果可想而知，打印到页面上的内容是包含标签的内容。

### jsx

jsx 是语法糖，如果想要实现上面那个需求，代码只需写为如下形式：

```jsx
const vDOM = (
    <h1 id="title">
        <span>Hello, React</span>
    </h1>
)
```

他的实质是通过 `babel` 转换为如下代码：

```js
const vDOM = React.createElement('h1', {id: 'title'}, React.createElement('span', {}, 'hello, react by js'))
```

## 虚拟DOM与真实DOM

关于虚拟 DOM ，其本质是 Object 类型的一般对象，而真实 DOM 利用控制台输出则是输出一个标签。通过 `debugger` 断点后可以发现他有很多属性与方法。

### 总结

1. 虚拟 DOM 比较“轻量”，真实 DOM 比较“重”。因为虚拟 DOM 是 React 内部使用，无需真实 DOM 那么多变量方法
2. 虚拟 DOM 最终会被 React 转换成真实 DOM，呈现在页面上
3. 虚拟 DOM 本质是 Object 对象

## jsx语法规则

jsx 全称:  `JavaScript XML`，是 react 定义的一种类似于 XML 的 JS 扩展语法。JS + XML 本质是`React.createElement(component,props, ...children)` 方法的语法糖。

用来简化创建虚拟 DOM，写法如下：

```jsx
var ele = <h1> Hello JSX!</h1>
```

> 注意
>
> 1. 它不是字符串, 也不是 `HTML/XML` 标签
> 2. 它最终产生的就是一个 JS 对象

基本语法规则：

1. 遇到 `<` 开头的代码，jsx 会以标签的语法解析

   - 如果标签首字母是小写字母开头，该标签会转为 `html` 同名元素，若无该标签对应的同名元素，则报错。
   - 若大写字母开头，`react` 就去渲染对应的组件。若组件没定义，则报错。

   ```jsx
   const vDOM = (
     <h1>
       <span>123</span>
       <Good></Good>
     </h1>
   )
   ```

2. 遇到以 `{` 开头的代码，以 JS 语法解析: 标签中的 `js` 表达式必须用 `{ }` 包含

   ```jsx
   const myId = 'DaodaO'
   const myContent = 'helLo,reAcT'
   // 1.创建虚拟DOM
   const vDOM = (
     <h1 id={myId.toLowerCase()}>
       <span>{myContent.toLowerCase()}</span>
     </h1>
   )
   ```

3. 类名指定不能使用 `class` ，要用 `className` 

   ```jsx
   const myId = 'DaodaO'
   const myContent = 'helLo,reAcT'
   // 1.创建虚拟DOM
   const vDOM = (
     <h1 className="title" id={myId.toLowerCase()}>
       <span>{myContent.toLowerCase()}</span>
     </h1>
   )
   ```

   如果使用了 `class` 虽然页面上会有效果，但是控制台会报错且给出提醒。

4. 内联样式设置不能写成字符串，需要使用双花括号 `{{}}` 的形式，采取驼峰命名法。

   ```jsx
   const myId = 'DaodaO'
   const myContent = 'helLo,reAcT'
   // 1.创建虚拟DOM
   const vDOM = (
     <h1 className="title" id={myId.toLowerCase()}>
       <span style={{color: '#eee', fontSize: '14px'}}>{myContent.toLowerCase()}</span>
     </h1>
   )
   ```

5. 虚拟 DOM 只能有一个根标签

   ```jsx
   const myId = 'DaodaO'
   const myContent = 'helLo,reAcT'
   // 1.创建虚拟DOM
   const vDOM = (
     <div>
     	<h1 className="title" id={myId.toLowerCase()}>
       	<span style={{color: '#eee', fontSize: '14px'}}>{myContent.toLowerCase()}</span>
     	</h1>
       <h2 className="title" id={myId.toUpperCase()}>
       	<span style={{color: '#eee', fontSize: '14px'}}>{myContent.toLowerCase()}</span>
     	</h2>
     </div>
   )
   ```

6. 标签必须闭合。双标签需要 `<></>` ，单标签则是 `< />` 

> babel.js的作用
>
> 1. 浏览器不能直接解析 JSX 代码, 需要 `babel` 转译为纯 JS 的代码才能运行
> 2. 只要用了 JSX，都要加上`type="text/babel"` , 声明需要 `babel` 来处理

## jsx练习

下面有一段代码：

```html
<body>
  <div id="test"></div>

  <!-- 引入react核心库，引入后会有全局的React -->
  <script src="../js/react.development.js"></script>
  <!-- 引入react dom操作，引入后会有全局的ReactDOM -->
  <script src="../js/react-dom.development.js"></script>
  <!-- 通过jsx创建的方式 -->
  <script src="../js/babel.min.js"></script>


  <script type="text/babel">
    // 模拟数据
    const data = ['vue', 'react', 'uniapp']
    // 创建虚拟DOM
    const vDom = (
      <div>
        <h1>刀刀学前端</h1>
        <ul>
          <li>vue</li>
          <li>react</li>
          <li>uniapp</li>
        </ul>
      </div>
    )

      // 渲染
      ReactDOM.render(vDom, document.querySelector('#test'))
  </script>
</body>
```

页面上效果实现，但是这么写数据是静态的写死的，现在需要通过 `data` 数组把里面的数据动态渲染到页面上。

前面也学到，可以通过 `{}` 把变量渲染到页面上，尝试把数组放进去渲染。代码如下：

```jsx
const vDom = (
  <div>
    <h1>刀刀学前端</h1>
    <ul>
      {data}
    </ul>
  </div>
)
```

最终效果如下：

[![p9vhQu4.png](https://s1.ax1x.com/2023/05/31/p9vhQu4.png)](https://imgse.com/i/p9vhQu4)

发现 jsx 自动帮我们循环遍历数组获取数据渲染页面上了，如果换成对象又会有什么效果呢？尝试一下

```jsx
const data1 = {a:'vue', b:'react', c:'uniapp'}
// 创建虚拟DOM
const vDom = (
  <div>
    <h1>刀刀学前端</h1>
    <ul>
      {data1}
    </ul>
  </div>
)
```

运行后发现页面无效果，控制台有报错，报错信息如下图所示：

[![p9vhwKe.png](https://s1.ax1x.com/2023/05/31/p9vhwKe.png)](https://imgse.com/i/p9vhwKe)

翻译一下大意就是他无法自动遍历循环对象数据，如果需要请使用数组代替。并很贴心的给我们把对象的每一项 `key` 值贴出来。

既然能循环，为何不在 `{}` 内使用 `for` 循环呢？说干就干。

[![p9vhsUI.png](https://s1.ax1x.com/2023/05/31/p9vhsUI.png)](https://imgse.com/i/p9vhsUI)

不等我们编译，编译器就已经给我们报错了。在 jsx 中，`{}` 内只能写表达式，不能写语句。其中：

- 表达式：一个表达式会产生一个值，可以放在任何需要值的地方
  1. `a`
  2. `a + b`
  3. `demo(1)`
  4. `arr.map()`
  5. `function test() {}`
- 语句：控制代码的流程走向
  1. `if() {}`
  2. `for() {}`
  3. `swicth() { case '': break; }`

因此通过 `map` 加工数组，让每一项都带一个 `li` 标签即可。尝试一下：

```jsx
const vDom = (
  <div>
    <h1>刀刀学前端</h1>
    <ul>
      {
        data.map(item => {
          return <li>{item}</li>
        })
      }
    </ul>
  </div>
)
```

此时页面渲染成功，但是还不能完事大吉大利，查看控制台，发现他有如下报错：

```
Each child in a list should have a unique "key" prop.
```

他需要一个 `key` 值，作为虚拟 DOM 的每一项不同的标识，后续 `diff` 算法会以 `key` 为依据，因此 `key` 要唯一。本练习中可以使用索引来作为 `key` 值。

```jsx
const vDom = (
  <div>
    <h1>刀刀学前端</h1>
    <ul>
      {
        data.map(item => {
          return <li key={index}>{item}</li>
        })
      }
    </ul>
  </div>
)
```

现在页面有效果，且不会报错。

## 组件

### 概念

用来实现局部功能效果的代码和资源的集合(html/css/js/image等等)。

作用：复用编码, 简化项目编码, 提高运行效率。

### 函数式组件

#### 使用

创建一个函数式组件，返回一个标签内容，代码如下所示：

```jsx
// 创建函数式组件
function Demo(params) {
  return <h1>函数式组件</h1>
}
```

创建完组件后就需要渲染到页面上，可是要如何渲染组件呢？回顾之前 《jsx 语法规则》里提到的，当 jsx 遇到 `<` ，就会渲染 `html` 结构。如果首字母小写，则当做 `html` 原生标签，首字母大写则视为组件。因此代码如下：

```jsx
ReactDOM.render(<Demo/>, document.querySelector('#test'))
```

运行后页面上有效果，且控制台不会报错。

#### 踩坑日记

1. 直接写 `demo` 

   ```jsx
   ReactDOM.render(demo, document.querySelector('#test'))
   ```

   报错信息如下：

   [![p9vIiuD.png](https://s1.ax1x.com/2023/05/31/p9vIiuD.png)](https://imgse.com/i/p9vIiuD)

   不能把函数作为渲染对象，只能使用虚拟 DOM 或 组件。

2. 首字母小写

   ```jsx
   ReactDOM.render(<demo/>, document.querySelector('#test'))
   ```

   这个错误就很眼熟了，原因上方也说明了。

   [![p9vIZ4I.png](https://s1.ax1x.com/2023/05/31/p9vIZ4I.png)](https://imgse.com/i/p9vIZ4I)

#### 拓展

- 函数式组件经过 `babel` 编译后开启严格模式，因此内部的 `this` 指向为 `undefined` 。
- `ReactDOM.reder(<Demo/>)` 执行之后，会做以下的操作：
  1. `React` 解析组件标签，找到 `Demo` 标签。
  2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟 DOM 转为真实 DOM，随后呈现到页面中。

#### 总结

1. 函数式组件必须有返回
2. `ReactDOM.render()` 内必须是标签
3. 首字母必须大写

### 类式组件

#### 回顾

类的定义：创建一个 `Person` 类

```js
class Person {
    
}
// 创建一个实例对象
const p1 = new Person()
console.log(p1)
```

其中，类中的 `this` 指向 `new` 的对象，上方代码中，`this` 指向 `p1` 。

类中的方法放在了原型对象上，供实例对象使用。

```js
class Person {
    constructor(name) {
        this.name = name
    }
    speak() {
        console.log(this.name)
    }
}
// 创建一个实例对象
const p1 = new Person()
p1.speak()
```

但是方法 `speak` 内的 `this` 指向不一定是指向 `Person` 实例，在通过类调用时，指向实例对象。如果调用对象使用 `call` 或 `apply` 等改变 `this` 指向的方法，则 `speak` 的 `this` 指向也会改变。

```js
p1.speak().call({a: 1, b: 2})
```

> 总结：
>
> 1. 类中的构造器不是必须写的，要对实例进行一些初始化操作（如添加指定属性时，才写）
> 2. 如果类A 继承类 B，且类 A 写了构造器，那么类 A 构造器中的 `super` 是必须调用的
> 3. 类中所定义的方法，都是放在类的原型对象上，供实例去使用

类中可以直接写赋值语句，例如：

```js
class A {
    constructor(name) {
        this.name = name
    }
    sex = '男'
}
```

如果这么写，其含义是给 A 的实例对象添加一个属性，值为 `sex` ，值为男。这个值是固定的，如果需要外部传递的还是需要写在构造器内。

#### 使用

创建一个类式组件，查看官网，官方代码要求我们做两个步骤：

1. 继承内置的 `React.Component` 类
2. 提供 `render` 方法，且要返回数据

最终代码如下所示：

```html
<body>
  <div id="test"></div>

  <!-- 引入react核心库，引入后会有全局的React -->
  <script src="../js/react.development.js"></script>
  <!-- 引入react dom操作，引入后会有全局的ReactDOM -->
  <script src="../js/react-dom.development.js"></script>
  <!-- 通过jsx创建的方式 -->
  <script src="../js/babel.min.js"></script>


  <script type="text/babel">
    // 创建类式组件
    // react中，类式组件要继承内置的一个类
    class ClassFn extends React.Component {
   	  // render放在 ClassFn 类原型对象上，供实例对象使用
      render() {
        return (
          <div>
            daodao
          </div>
        )
      }
    }

    // 渲染类式组件
    ReactDOM.render(<ClassFn />, document.querySelector('#test'))
  </script>
</body>
```

运行查看效果，页面能够看到效果，控制台也没有报错。但是要考虑多几步，既然页面能渲染，说明 `<ClassFn />` 获取到 `render` 内 `return` 的值。而 `render` 返回值只能给实例对象使用。我们又没有 `new` 创建实例对象，那么类式组件 `ReactDOM.render` 后发生了什么呢？

1. React 解析组件标签，找到 `ClassFn` 类式组件
2. `new` 一个实例对象，通过该实例对象调用原型上的 `render` 方法
3. 将 `render` 返回的数组渲染成真实 DOM，随后呈现在页面上

打印一下 `render` 内的 `this` ，打印如下：

[![p9vxToV.png](https://s1.ax1x.com/2023/05/31/p9vxToV.png)](https://imgse.com/i/p9vxToV)

后续我们主要考虑 `props` 、`refs` 、`state` 三个属性。

> 注意
>
> 由于类式组件继承了 `React.Component` 组件方法，因此在原型上也能找到组件实例对象。

## state

### 概念

`state` 是组件对象最重要的属性, 值是对象(可以包含多个 `key-value` 的组合)。

组件被称为"状态机", 通过更新组件的 `state` 来更新对应的页面显示(重新渲染组件)。

在旧版本中，`state` 只能作用于 `this` 上获取，因此只有组件实例对象能够使用，函数式组件无法获取。新版函数式组件拥有 `hooks` ，也能使用对应的方法。

在类式组件中，借助构造器初始化 `state` 内的值，由于是继承，因此构造器需要接收实例对象传递过来的参数并调用 `super` ，否则报错。但是创建实例对象的操作并不是我们来做，而是底层代码帮我们处理，该怎么办呢？

遇事不决看文档，查看官方文档，发现其构造器接收一个 `props` （这个后续介绍），这个是一个形参，因此写成 abc 都没问题，但是要规范代码，因此不能那么写。

然后通过 `this` 初始化 `state` 的值。最终代码如下：

```html
<body>
  <div id="test"></div>

  <!-- 引入react核心库，引入后会有全局的React -->
  <script src="../js/react.development.js"></script>
  <!-- 引入react dom操作，引入后会有全局的ReactDOM -->
  <script src="../js/react-dom.development.js"></script>
  <!-- 通过jsx创建的方式 -->
  <script src="../js/babel.min.js"></script>


  <script type="text/babel">
    // 创建类式组件
    // react中，类式组件要继承内置的一个类
    class Weather extends React.Component {
      constructor(props) {
        super(props)
        this.state = {isHot: true}
      }
      render() {
        return (
          <div>
            今天天气很{this.state.isHot ? '炎热':'凉爽'}
          </div>
        )
      }
    }

    // 渲染类式组件
    ReactDOM.render(<Weather />, document.querySelector('#test'))
  </script>
</body>
```

### 事件绑定

#### 绑定事件

在原生中，绑定事件的方法为获取元素后，通过 `addEventListener` 或 `on + 事件名` 的形式绑定事件，试验一下：

```jsx
<div onclick="clickFn()">
  今天天气很{this.state.isHot ? '炎热':'凉爽'}
</div>

function clickFn(params) {
   console.log('click')
}
```

控制台提示报错，报错信息如下：

```js
Warning: Invalid event handler property `onclick`. Did you mean `onClick`?
```

提示我们要采取驼峰命名法的形式，事件要改为大写，这个是 `react` 的一个规范。修改后运行，发现控制台报了一个新的错误：

```js
Warning: Expected `onClick` listener to be a function, instead got a value of `string` type.
```

他想要一个函数，拿到的是一个字符串，联想一下 jsx 语法特性，尝试把引号去掉改为括号，再运行一次，发现有效果了，但是一运行就触发事件。推测是括号的原因让他自运行。去掉括号让他作为回调函数，刷新后发现正常运行，代码如下：

```jsx
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isHot: true}
  }
  render() {
    return (
      <div onClick={clickFn}>
        今天天气很{this.state.isHot ? '炎热':'凉爽'}
      </div>
    )
  }
}

function clickFn() {
   console.log('click')
}
```

#### this指向

接下来就是要在函数内获取 `state` 的值了，在其中输入 `console.log(this)` 查看其 `this` 指向，运行后符合预期，打印的是 `undefined` （原因在 jsx 语法与函数式组件已经说明了）

函数已经无法通过 `this` 获取到 `state` 的值了，需要另寻蹊径。可以创建一个变量存储 `constructor` 内的 `this` ，代码如下：

```jsx
let that
class Weather extends React.Component {
  constructor(props) {
    super(props)
    that = this
    this.state = {isHot: true}
  }
  render() {
    return (
      <div onClick={clickFn}>
        今天天气很{this.state.isHot ? '炎热':'凉爽'}
      </div>
    )
  }
}

function clickFn() {
   console.log(that)
}
```

这样就能够获取到类的 `this` 指向。但是代码不够优雅，还要多创建一个变量，有没有更好的方法呢？

类式组件中我们不仅能用构造器保存变量，也能创建方法，而方法内的 `this` 的指向是通过 `new` 创建出来的实例对象。因此尝试一下，代码如下：

```jsx
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isHot: true}
  }
  render() {
    return (
      <div onClick={this.clickFn}>
        今天天气很{this.state.isHot ? '炎热' : '凉爽'}
      </div>
    )
  }
  clickFn() {
    console.log(this)
  }
}
```

> 注意
>
> 函数方法 `clickFn` 是在类 `Weather` 上，因此需要通过 `this.` 来获取调用。

查看控制台的打印，发现打印出来的 `this` 是 `undefined` 。这是为什么？为什么不是类 `Weather` ？

前面在回顾类的内容时也说过了，只有通过 `new 类名` 创建出来的实例对象调用方法时，方法中 `this` 的指向才是该实例。而本案例中调用方法的是 `div` 的点击事件，因此没办法获取到实例对象。

为了论证这个这个思想，我们新开一个测试页面，声明一个类，包含构造器和一个方法，创建一个实例对象，调用该方法。代码如下：

```js
class Test {
  constructor() {}
  say() {
    console.log(this);
  }
}

const test = new Test()
test.say() // Test {}
```

通过  `new` 创建的实例对象，打印出来的 `this` 确实是类 `Test` 。如果我把 `test.say` 这个函数赋值给一个变量 `a` ，那么 `a()` 调用函数后打印的 `this` 是谁呢？尝试一下：

```js
class Test {
  constructor() {}
  say() {
    console.log(this);
  }
}

const test = new Test()
test.say() // Test {}

let a = test.say
a()
```

此时查看控制台，打印出来的是 `undefined` 。为什么会这样？虽然我们知道只有通过 `new` 创建的实例对象调用的方法 `this` 才指向类，为什么赋值后指向是 `undefined` 呢？

在前面类的回顾中，我们讲到了类中的方法实际上是挂载到类的原型上，上面示例代码 `test.say()` 实际上是在 `test` 上找不到 `say()` 方法，继续往原型上找，最终找到类 `Test` 原型上的方法。

而 `let a = test.say` 这一步操作，则是把这个 `say()` 函数的地址赋值给 `a` ，画图演示：

[![p9xHgUg.png](https://s1.ax1x.com/2023/06/01/p9xHgUg.png)](https://imgse.com/i/p9xHgUg)

因此 `a()` 实际上只是通过地址找到内存中的这个 `say()` 函数并调用，而不是通过查找原型查找。而函数这么调用函数内的 `this` 指向的是 `window` ，但是类中声明的方法做了局部严格模式，因此最终打印的是 `undefined` 。下面可以做一个例子：

```js
function demo() {
    console.log(this) // window {}
}
function demo1() {
    'use strict'
    console.log(this) // undefined
}
demo()
demo1()
```

返回前面天气的例子，我们只是通过 `this.clickFn` 把这个函数的内存地址赋给 `div` 的 `onClick` 事件，严格模式下他自然打印 `undefined` 。

#### 解决指向

分析到此，那我们只需要考虑如何解决 `this` 指向问题即可。

修改函数 `this` 指向首先联想到 `call` 、`apply` 和 `bind` ，前二者都是立即执行，`bind` 是返回一个新函数，刚好可以把返回的新函数赋值给 `div` 的点击事件。

```jsx
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isHot: true}
    this.my_clickFn = this.clickFn.bind(this) // 类本身没有clickFn函数，往原型上找，找到了，修改this指向为类自身（原函数this指向是调用者），赋值给新函数
  }
  render() {
    return (
      <div onClick={this.my_clickFn}>
        今天天气很{this.state.isHot ? '炎热' : '凉爽'}
      </div>
    )
  }
  clickFn() {
    console.log(this)
  }
}
```

现在去打印，能够获取到类的 `this` 指向。

### setState

在 `react` 中，状态不可直接更改，需要调用 `react` 提供的 API `setState` ，让 `react` 监听到值的变化。更新是修改需要的属性然后合并，而不是替换全部的属性。

写法如下所示：

```jsx
const {isHot} = this.state
this.setState({isHot: !isHot})
```

现在点击后页面数据能够切换了。

效果实现后，往深层次考虑一下，在上面那个天气案例中，每个事件方法各自调用了几次：

- `constructor` ：在 `new` 创建实例后调用一次，之后不再调用
- `render` ：在 `new` 创建实例后调用一次，之后 `setState` 修改了值后再调用，因此是 `1 + n` 次（`n` 为状态修改的次数）
- `clickFn` ：方法被点击几次就调用了几次

### state简写形式

目前的构造器十分臃肿，既通过 `this` 为 `state` 设置变量，又通过修改 `this` 指向创建新函数，要怎么简写呢？

类可以把值写在类中，不需要写在构造器内，因此 `state` 可以抽取出来。

```js
constructor(props) {
  super(props)
  this.my_clickFn = this.clickFn.bind(this)
}
state = {isHot: true}
```

而函数也可以通过等号赋值的方式在类中创建声明，让其内部 `this` 指向类，先采取下方的代码：

```js
constructor(props) {
  super(props)
}
state = {isHot: true}
my_clickFn = function() {
    console.log(this)
    // ...
}
```

打印出来的 `this` 还是 `undefined` ，这是因为 `function` 创建出来的函数 `this` 指向其调用者，而调用者是 `div` 的点击事件，因此指向了全局 `window` ，又因为局部严格模式，最终打印出来的 `undefined` 。

难道要止步于此了么？别忘了 ES6 新出一个箭头函数，其最大的特点就是没有自己的 `this` 指向，指向外部的环境。如果我们把代码成为以下形式：

```js
constructor(props) {
  super(props)
}
state = {isHot: true}
my_clickFn = () => {
    console.log(this)
    // ...
}
```

此时函数 `my_clickFn` 的 `this` 指向是其外部环境类 `Weather` ，正好可以获取到 `state` 的值。

现在再来看看构造器，此时就剩下一句 `super` ，也不再需要，可以删除了，至此 `state` 简写完成。

### 总结

1. 组件中 `render` 方法中的 `this` 为组件实例对象
2. 组件自定义的方法中 `this` 为 `undefined`，如何解决？
   - 强制绑定 `this` ：通过函数对象的 `bind()`
   - 箭头函数
3. 状态数据，不能直接修改或更新，需要通过 `setState()` 

## props

### 含义

通过标签属性从组件外向组件内传递变化的数据

```jsx
class Person extends React.Component {
  render() {
    const {name, age, sex} = this.props
    return (
      <ul>
        <li>{name}</li>
        <li>{age}</li>
        <li>{sex}</li>
      </ul>
    )
  }
}

ReactDOM.render(<Person name="刀刀" age="18" sex="男"/>, document.querySelector('#test1'))
ReactDOM.render(<Person name="小刀" age="21" sex="男"/>, document.querySelector('#test2'))
ReactDOM.render(<Person name="杜一刀" age="23" sex="男"/>, document.querySelector('#test3'))
```

现在可以在组件实例动态传参渲染数据。

> 注意
>
> 组件内部不要修改 `props` 数据，如果修改 `props` 的值并且替换原值则会报错。
>
> ```js
> class Person extends React.Component {
>   render() {
>     const {name, age, sex} = this.props
>     this.props.name = 'newName' // 报错
>     // ...
>   }
> }
> ```
>
> [![pCC4x78.png](https://s1.ax1x.com/2023/06/05/pCC4x78.png)](https://imgse.com/i/pCC4x78)

### 批量操作

在之前学习 ES6 新语法时，我们有学习过 `...` 展开运算符，可以展开数组 `...arr` ，但是不能展开对象。展开对象需要使用 `{}` 包裹，如 `{...obj}` 。

在 `react` 中，通过 `react` 和 `babel` 处理，让我们也能在组件上使用该语法批量传参，代码如下所示：

```jsx
const p = {name: 'daodao', age: 18, sex: '🚹'}
ReactDOM.render(<Person {...p}/>, document.querySelector('#test1'))
```

> 注意
>
> 1. 该 `{...p}` 中的花括号 `{}` 与 es6 中的花括号不是同一个功能，因此不要把他理解为展开解构语法
> 2. `react` 与 `babel` 的处理仅能让我们在组件中批量赋值，不可在其他地方使用。如 `console.log({...p})` ，虽然不报错，但是结果为空

### 限制

`react` 中属性限制需要通过以下的方法设置：

```js
类.propTypes = {
  // 。。。
}
```

其中，`类.propTypes` 表示给该类设置限制，且 `propTypes` 不可修改，`react` 底层会去寻找它，找到它后就说明它有做限制。

#### 类型限制

导入 `prop-types` 包，用于做属性限制。导入后全局会有一个 `PropTypes` 。

```html
<script src="../js/prop-types.js"></script>

Person.propType = {
  name: PropTypes.string
}
```

> 注意
>
> 1. 类型限制中为了不与 `React` 内置的 `String` 、`Number` 等方法冲突，这里采用小写的形式。但是函数类型限制不可使用 `function` ，因为这是声明函数的关键字，因此需要改为 `func` 
>
> 2. 旧版本中 `PropTypes` 放在 `React` 上。后续因为太臃肿才分离出来。旧版本写法为：
>
>    ```js
>    Person.propType = {
>      name: React.PropTypes.string
>    }
>    ```

#### 必传限制

必传限制可通过 `isRequired` 字段限制，可以跟在之前做的限制后面。

```js
Person.propType = {
  name: PropTypes.string.isRequired
}
```

#### 默认值

默认值可通过 `defineProps` 对象内设置对应的键值。

```js
Person.defineProps = {
  name: '默认名称'
}
```

### 简写形式

既然是类的方法，可以不要把他们放在类外部创建，而是写在类里面，写法如下：

```js
class Person extends React.Component {
  static propType = {
  	name: PropTypes.string.isRequired
  }

  static defineProps = {
  	name: 'abc'
  }
    
  render() {
    // ...
  }
}
```

### 构造器与props

构造器在继承父类时如果需要使用则必须要先在构造器中定义关键字 `super()` ，把参数传过去，如下：

```js
class A extends React.Component {
    constructor(props) {
        super(props)
    }
}
```

在 `React` 中，构造器接收的参数为 `props` 组件实例的传参。那么，有几个问题产生了：

- 问题一：`props` 传给 `super()` 和不传有什么区别
- 问题二：类中的构造器有什么作用

前往 `react` 官方文档，查询构造器，文档指路：[`constructor()`](https://zh-hans.legacy.reactjs.org/docs/react-component.html#constructor) 。

查看官网文档描述，已经针对两个问题都给出了答复：

问题一的答复：

在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前调用 `super(props)`。否则，`this.props` 在构造函数中可能会出现未定义的 bug。

问题二的答复：

- 通过给 `this.state` 赋值对象来初始化[内部 state](https://zh-hans.legacy.reactjs.org/docs/state-and-lifecycle.html)。
- 为[事件处理函数](https://zh-hans.legacy.reactjs.org/docs/handling-events.html)绑定实例

### 函数式组件使用props

函数式组件也可以接收 `props` ，接收方法为函数接收参数的方法：通过形参接收参数。代码如下：

```jsx
function Person(props) {
    return (
    	<ul>
        	<li>{props}</li>
        </ul>
    )
}
```

但是目前的函数式组件无法使用 `state` 与 `refs` 。

## 新版项目创建

下面来创建一个 REACT 项目

1. 首先登录[官网 (opens new window)](https://nodejs.org/en/)下载安装[NODEJS (opens new window)](https://nodejs.org/zh-cn/)最新版本

2. [Yarn (opens new window)](https://yarnpkg.com/)会缓存它下载的每个包所以无需重复下载，安装速度之快前所未有

   ```text
   npm install -g yarn@berry
   ```

3. 使用 [Create React App (opens new window)](https://create-react-app.dev/)安装 REACT 项目非常方便，下面来创建项目 houdunren

   ```text
   npx create-react-app houdunren
   ```

4. 进入目录并启动项目

   ```text
   cd houdunren
   npm start
   ```

### 开发工具

![“vscode logo”的图片搜索结果](data:image/png;base64,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)

建议使用 [VSCODE (opens new window)](https://code.visualstudio.com/)做为开发工具，需要安装的插件如下（点开链接后，点击 Install 按钮安装）

1. [Reactjs code snippets(opens new window)](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)
2. [React Extension Pack(opens new window)](https://marketplace.visualstudio.com/items?itemName=jawandarajbir.react-vscode-extension-pack)
3. [ES7 React/Redux/GraphQL/React-Native snippets(opens new window)](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

### 声明组件

#### 基本声明

下面在 index.js 入口文件中创建组件最简单的组件。下面的组件像 HTML 但只是像而已。它被称为 JSX 是一个 JavaScript 的语法扩展，它具有 JavaScript 的全部功能。

- 渲染后的内容将放在 public/index.html 中 ID 为 root 的标签中

```text
import React from "react";
import ReactDom from "react-dom";

ReactDom.render(<div>houdunren</div>, document.querySelector("#root"));
```

在 JSX 中可以使用 JS 的功能，要求使用花扩号包裹

```text
const name = "后盾人";
ReactDom.render(<div>{name}</div>, document.querySelector("#root"));
```

#### 函数声明

使用函数返回组件，渲染组件时可以传递参数供组件使用

```text
const App = props => {
  return <div>{props.name}</div>;
};

ReactDom.render(App({ name: "后盾人" }), document.querySelector("#root"));
```

调用组件也可以直接使用标签形式，参数以属性形式传递

- 要求首字母大写

```text
import React from "react";
import ReactDom from "react-dom";
const App = props => {
  return <div>{props.name}</div>;
};

ReactDom.render(<App name="houdunren.com" />, document.querySelector("#root"));
```

#### 类的声明

我们知道 JS 中的类也是函数，REACT 也可以使用类的方式声明组件，但要保证返回 JSX 组件标签

```text
import React, { Component } from "react";
import ReactDom from "react-dom";
class App {
  constructor(props) {
    this.props = props;
  }
  render() {
    return <div>{this.props.name}</div>;
  }
}

ReactDom.render(
  new App({ name: "后盾人" }).render(),
  document.querySelector("#root")
);
```

如果继承了 Component 基类，会自动绑定参数到 props

```text
import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

ReactDom.render(
  new App({ name: "后盾人" }).render(),
  document.querySelector("#root")
);
```

更好的是，当继承了 Component 基类

- 可以使用标签形式调用组件
- 系统会自动将标签参数绑定到属性 props
- 注意要求首字母大写

```text
import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div>
        {this.props.name}
      </div>
    );
  }
}

ReactDom.render(<App name="后盾人" />, document.querySelector("#root"));
```

基类会帮助我们绑定数据到 props，所以不写构造函数也可以正常执行

```text
import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  render() {
    return (
      <div>
        {this.props.name}
      </div>
    );
  }
}

ReactDom.render(<App name="后盾人" />, document.querySelector("#root"));
```

#### 组件嵌套

下面 App 组件内部引入了 Hd 组件

```text
import React, { Component } from "react";
import { render } from "react-dom";

class Hd extends Component {
  render() {
    return <div>Hd组件: {this.props.name} </div>;
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Hd name="houdunren.com" />
        App: {this.props.name}
      </div>
    );
  }
}
render(<App name="后盾人" />, document.getElementById("root"));
```

#### 根组件

根据件就像 HTML 标签中的 **html** 一样，所有其它标签都在它的里面。根组件也是这个特点，在里面构建不同组件产生不同界面。

组件一般都是独立的文件，下面创建 App.js 文件构建根组件

```text
import React, { Component } from "react";
export default class App extends Component {
  render() {
    return <div>后盾人</div>;
  }
}
```

在入口文件中导入组件并渲染

```text
import React, { Component } from "react";
import { render } from "react-dom";
import App from "./App";
render(<App />, document.querySelector("#root"));
```

#### 注释规范

组件中的注释使用 JS 注释规范，因为是 JS 所以要使用花扩号包裹。

```text
class App extends Component {
  render() {
    return (
      <div>
        {/* 后盾人 */}
        {this.props.name}
      </div>
    );
  }
}
```

### 样式处理

下面介绍多种样式的处理方式

#### 行级样式

REACT 中定义样式也非常简单，下面是定义 STYLE 行样式

```text
class App extends Component {
  render() {
    return <div style={{ color: "red" }}>App: {this.props.name}</div>;
  }
}
render(<App name="后盾人" />, document.getElementById("root"));
```

以对象形式声明样式

```text
class App extends Component {
  render() {
    const style = {
      backgroundColor: "red",
      color: "blue"
    };
    return <div style={style}>后盾人</div>;
  }
}
render(<App name="后盾人" />, document.getElementById("root"));
```

#### 类的声明

下面来体验类样式的定义

1. 组件同级目录定义 App.css，内容如下

   ```text
   .bg-color {
     background: red;
   }
   ```

2. 在 index.js 中使用 className 属性来声明类

   ```text
   import React, { Component } from "react";
   import { render } from "react-dom";
   import "./App.css";
   class App extends Component {
     render() {
       return <div className="bg-color">App: {this.props.name}</div>;
     }
   }
   render(<App name="后盾人" />, document.getElementById("root"));
   ```

当然也可以使用 JS 程序计算，下面是使用三元表达式的计算

```text
class App extends Component {
  render() {
    return (
      <div className={true ? "bg-color" : "hd"}>App: {this.props.name}</div>
    );
  }
}
```

#### 第三方库

**classnames**

[classnames (opens new window)](https://www.npmjs.com/package/classnames)是一个动态设置样式类的库，比如不同用户组使用不同样式。

首先来安装库

```text
npm i classnames
```

在 index.js 声明的组件中使用

```text
import className from "classnames";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className={className("bg-color", { hd: true })}>
        App: {this.props.name}
      </div>
    );
  }
}
render(<App name="后盾人" />, document.getElementById("root"));
```

**styled-components**

使用社区提供的第三方库来控制样式，下面是使用 [styled-components (opens new window)](https://www.npmjs.com/package/styled-components)组件来控制样式

安装扩展包

```text
npm i styled-components
```

下面在组件中使用

```text
...

//声明样式组件Wrapper 最终渲染成section
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <div>App: {this.props.name}</div>
      </Wrapper>
    );
  }
}
render(<App name="后盾人" />, document.getElementById("root"))
```

### 实例操作

下面来开发用户展示模块，只实现页面 UI 的展示，具体业务功能需要后面其他知识点

![image-20200203235459826](data:image/png;base64,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)

首先确定几点

- 组件会牵扯到多个文件，所以组件最好在独立目录中存放如 components/User
- 多个组件使用统一文件合并导出 components/index.js

目录结构如下

```text
src/components
├── Add
│   ├── index.js 	#搜索组件
│   └── index.css #组件样式
├── User
│   ├── User.js 	#用户记录组件
│   ├── index.js 	#用户列表组件
│   └── index.css #组件样式
├── index.js 			#组件合并导出文件
├── App.js 				#根组件
└── App.css				#根组件样式
```

#### 代码展示

下面是代码展示，有几点需要说明

- 每个组件单独一个文件夹
- 组件文件夹中存在组件需要的其他文件，如 index.css 样式文件
- User/User.js 是 User/index.js 用户列表组件分离出的私有组件

src/components/Add/index.js

```text
import React, { Component } from "react";
import "./index.css";
export default class Add extends Component {
  render() {
    return (
      <div className="add">
        <input/>
      </div>
    );
  }
}
```

src/components/Add/index.css

```text
.add {
    margin-bottom: 10px;
}

.add input {
    border: solid 2px #34495e;
    padding: 10px;
    font-size: 20px;
    width: 95%;
}
```

src/components/User/index.js

```text
import React, { Component } from "react";
import User from "./User";
import "./index.css";
export default class List extends Component {
  render() {
    return (
      <div>
        <table border="1" width="100%">
          <thead>
            <tr>
            	<th>编号</th>
              <th>姓名</th>
              <th>年龄</th>
            </tr>
            <User />
          </thead>
        </table>
      </div>
    );
  }
}
```

src/components/User/user.js

```text
import React, { Component } from "react";

export default class User extends Component {
  render() {
    return (
      <tr align="center">
      	<td>1</td>
        <td>后盾人</td>
        <td>18</td>
      </tr>
    );
  }
}
```

src/components/User/index.css

```text
.add {
    margin-bottom: 10px;
}

.add button {
    background: #34495e;
    color: white;
    font-size: 20px;
    border: none;
    cursor: pointer;
}

.add input {
    border: solid 2px #34495e;
    padding: 10px;
    font-size: 20px;
    min-width: 100px;
    font-weight: bold;
}

.add button:focus,
.add input:focus {
    outline: none
}
```

app.js

```text
import React, { Component } from "react";
import { List, Add } from "./components/index";
import "./App.css";
export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Add />
        <List />
      </div>
    );
  }
}
```

app.css

```text
.app {
  background: #f3f3f3;
  padding: 10px;
  border: solid 2px #ddd;
}
```

### 顶级标签

下面介绍顶级标签产生的问题，及解决方法

#### 基本知识

组件必须必须存在一个顶级标签，下面的是正确格式

```text
export default class App extends Component {
  render() {
    return (
      <div>
        <Add />
        <List />
      </div>
    );
  }
}
```

下面是错误的格式

```text
export default class App extends Component {
  render() {
    return (
        <Add />
        <List />
    );
  }
}
```

#### 问题说明

以前面讲解的学生模块为例，因为每个组件都有一个顶级标签，最终生成的 HTML 标签结构如下

![image-20200203142326386](https://doc.houdunren.com/assets/img/image-20200203142326386.cb10bc8c.png)

但是现在我们发现一个问题，就是文本框不能 100%对齐

![image-20200203235552719](data:image/png;base64,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)

#### 解决问题

针对上面的问题，我们希望使用 FLEX 来解决，这就要求每个组件不能有顶级标签，有以下几种解决方案

**fragment**

使用 `Fragment` 组件可以让最终生成的 HTML 没有顶级标签

```text
import React, { Component, Fragment } from "react";

export default class Add extends Component {
  render() {
    return (
      <Fragment>
        <input className="input"/>
      </Fragment>
    );
  }
}
```

**空标签**

也可以使用以下特殊标签实现 fragment 相同的效果

```text
function App() {
  return (
    <>
      houdunren.com
    </>
  )
}
```

现在将 src/components/User/index.js 与 src/components/Add/index.js 两个组件使用 fragment 或空标签来处理。最终生成的 HTML 结构如下图所示

![image-20200203143122968](https://doc.houdunren.com/assets/img/image-20200203143122968.4d848c40.png)

现在我们来修改相关样式文件

App.css

```text
.app {
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: solid 2px #ddd;
}
```

在顶级组件 App.js 中设置类

```text
import React, { Component } from "react";
import { List, Add } from "./components/index";
import "./App.css";
export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Add />
        <List />
      </div>
    );
  }
}
```

最终修正后的效果如图

![image-20200203235705443](data:image/png;base64,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)

#### 搜索按钮

下面来搜索添加按钮，需要修改两个组件文件和两个样式文件

![image-20200204001746734](https://doc.houdunren.com/assets/img/image-20200204001746734.4d868422.png)

src/components/Add/index.js 因为页面结构有变化，所以删除 fragment 改变 div 标签

```text
import React, { Component, Fragment } from "react";
import "./index.css";
export default class Add extends Component {
  render() {
    return (
      <div className="search">
        <input/>
        <button>后盾人</button>
      </div>
    );
  }
}
```

src/components/Add/index.css

```text
.add {
    display: flex;
    margin-bottom: 10px;
}

button {
    background: #34495e;
    color: white;
    font-size: 20px;
    border: none;
    cursor: pointer;
}

input {
    border: solid 2px #34495e;
    padding: 10px;
    font-size: 20px;
    flex: 1;
    min-width: 100px;
}

button:focus,
input:focus {
    outline: none
}
```