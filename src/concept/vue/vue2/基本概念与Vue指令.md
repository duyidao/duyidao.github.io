# Vue

## Vue 的基本概念

### 什么是 Vue

概念：<word text="Vue" />是一个 **_渐进式_** 的<word text="JavaScript"/>框架，拥有一套属于自己规则的语法。

官网地址：[Vue 官网](https://cn.vuejs.org/) 。

> [!INFO] 补充知识点：
>
> 1. 什么是渐进式
>
>    渐进式：逐步进步，想用什么就用什么，不必全部使用。
>
> 2. 什么是库和框架
>
>    - 库：封装的属性或方法 (例 `JQuery.js` )
>    - 框架：拥有自己的规则和元素, 比库强大的多 (例 `Vue.js` )拥有自己的规则和元素, 比库强大的多 (例 vue.js)

### 开发方式

1. 传统开发方式：基于 `html`/`css`/`js` 文件开发<word text="Vue" />
2. 工程化开发方式：在<word text="Webpack"/>环境中开发<word text="Vue" />（推荐这种方式）

## 脚手架 `@vue/cli`

### 脚手架介绍

自己配置<word text="Webpack"/>的环境十分麻烦，<word text="Vue" />官方提供了一个全局模块包，这个包用于创建脚手架项目。

脚手架的好处是无需我们配置<word text="Webpack"/>环境，下载即可使用，支持 `css` 、 `less` 、 `babel` 、开发服务器等。

### 脚手架安装

> 需要把脚手架 `@vue-cli` 模块包安装到全局，让电脑拥有<word text="Vue" />命令，才能创建脚手架工程。

- 全局安装命令

  ```sh
  pnpm i -g @vue/cli
  ```

  > [!WARNING] 注意
  >
  > 如果下载失败查看一下 `npm` 的镜像源，命令 `nrm ls`。 切换成淘宝镜像源可减少连接超时的错误。

- 查看版本

  ```sh
  vue -V
  ```

### 创建项目启动服务

> 通过<word text="Vue" />命令创建一个脚手架的项目。注意：项目名不能带大写字母、中文和特殊符号。

1. 创建项目

   ```sh
   vue create 文件夹名称
   ```

2. 选择模板

   可以选择默认模板，也可选择自己手动配置一个新的模板。

开启成功后会出现两条代码指示，第一条让我们进入目标文件内，第二条是开启命令。进入文件内并成功开启命令后就有相关路径。

### 目录和代码分析

```txt
 vuecil-demo        # 项目目录
    ├── node_modules # 项目依赖的第三方包
    ├── public       # 静态文件目录
      ├── favicon.ico# 浏览器小图标
      └── index.html # 单页面的html文件(网页浏览的是它)
    ├── src          # 业务文件夹
      ├── assets     # 静态资源
        └── logo.png # vue的logo图片
      ├── components # 组件目录
        └── HelloWorld.vue # 欢迎页面vue代码文件
      ├── App.vue    # 整个应用的根组件
      └── main.js    # 入口js文件
    ├── .gitignore   # git提交忽略配置
    ├── babel.config.js  # babel配置
    ├── package.json  # 依赖包列表
    ├── README.md    # 项目说明
	└── yarn.lock    # 项目包版本锁定和缓存地址
```

主要文件及含义

```txt
node_modules 下都是下载的第三方包
public/index.html – 浏览器运行的网页
src/main.js – webpack打包的入口文件
src/App.vue – vue项目入口页面，根主键
package.json – 依赖包列表文件
```

### 项目架构了解

首先去 `main.js` 入口文件，去到 `App.vue` 根组件模块，获取到样式、标签、逻辑，返回 `main.js` 文件。 `new` 实例化一个<word text="Vue" />对象，把属性插入到 `index.html` 页面中。

### 自定义配置

> 在<word text="Webpack" />中我们通过 `webpack.config.js` 文件进行自定义配置，如端口号、出入口文件等，<word text="Vue" />则是 `vue.config.js` 文件进行自定义配置。

在 `src` 文件夹的同级目录下新建一个 `vue.config.js` 文件。自定义端口号命令和 `webpack` 的一样。

```js [vue.config.js]
module.exports = {
  devServer: {
    port: 3000,
  },
}
```

修改完毕后重新启动即可。

### `eslint` 的作用

> `eslint` 是一个代码检查工具，检测代码的严谨程度

模拟情景：声明一个变量，但不使用，保存运行，结果报错。

解决方法：

1. 手动解决掉错误, 以后会讲如何自动解决

2. 暂时关闭 eslint 检查(因为现在主要精力在学习<word text="Vue" />语法上), 在 `vue.config.js` 中配置后重启服务。

   ```js [vue.config.js]
   module.exports = {
     // 暂时关闭eslint配置
     lintOnSave: false,
   }
   ```

### 单文件 Vue 讲解

> 单文件最大的好处，就是独立作用域，互不影响。<word text="Vue" />中更推荐采用 `.vue` 组件来开发项目。

- template 里只能有一个根标签

  ```html
  <template>
    <div id="app"></div>
    <div id="box"></div>
  </template>
  ```

  结果会报错。

- <word text="Vue" />文件 -> 独立模块 -> 作用域互不影响。

- `style` 配合 `scoped` 属性, 保证样式只针对当前 `template` 内标签生效。

  ```html
  <style scoped></style>
  ```

- <word text="Vue" />文件配合 `webpack` ， 把他们打包起来插入到 `index.html` 。

## Vue 指令

### 插值表达式

> 可以直接在<word text="DOM"/>元素中插入内容。

语法：

```vue
{{ 表达式 }}
```

在插值表达式中，可以添加文本内容，可以用三元表达式进行判断处理，可以进行简单的运算，还可以字符串内置 `api` 进行处理。但是不能写语句，如 `if` 判断和 `for` 循环。

```vue [插值.vue]
<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{ obj.name }}</h2>
    <h3>{{ obj.age > 18 ? '成年' : '未成年' }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    // 格式固定, 定义vue数据之处
    return {
      // key相当于变量名
      msg: 'hello, vue',
      obj: {
        name: '小vue',
        age: 5,
      },
    }
  },
}
</script>
```

> [!IMPORTANT] 总结
>
> <word text="DOM" />中插值表达式赋值, <word text="Vue" />的变量必须在 `data` 里声明。

### `MVVM` 设计模式

> 转变思维，用数据驱动视图改变，操作<word text="DOM" />的事，<word text="Vue" />源码内干了。

设计模式: 是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结。

- `M`： `model` 数据模型 (`data` 里定义)
- `V`： `view` 视图 （`html` 页面）
- `VM`： `ViewModel` 视图模型 (`vue.js` 源码)
- MVVM 通过**数据双向绑定**让数据自动地双向同步 **不再需要操作 DOM**
  - V（修改视图） -> M（数据自动同步）
  - M（修改数据） -> V（视图自动同步）

### 指令 v-bind

> 作用：给标签属性设置<word text="Vue" />变量的值。

前面的插值表达式只能用在元素内容上，不能用在元素属性上。如： `src=""` 、`value=""` 等。这个时候就用到了 `v-bind` 指令。

- 语法：`v-bind:属性名="vue变量"`
- 简写：`:属性名="vue变量"`

在使用 `v-bind` 属性绑定期间，如果绑定内容需要进行动态拼接，字符串的外面需要包裹一层单引号。如果不包裹单引号，则默认为是一个变量，会去 `data` 内寻找获取。

```vue
<a v-bind:href="url">百度</a>
<a :href="url">百度</a>
<script>
export default {
  data() {
    return {
      url: 'http://www.baidu.com',
    }
  },
}
</script>
```

> [!IMPORTANT] 总结
>
> <word text="Vue" />指令, 实质上就是特殊的 `html` 标签属性, 特点: `v-` 开头。`v-bind` 把<word text="Vue" />变量的值, 赋予给<word text="DOM" />属性上, 影响标签显示效果。

#### 指令 v-bind 动态参数

```html
<!-- 注意，参数表达式的写法存在一些约束，如之后的“对动态参数表达式的约束”章节所述。 -->
<a v-bind:[attributeName]="url"> ... </a>
```

这里的 `attributeName` 会被作为一个<word text="JavaScript" />表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的<word text="Vue" />实例有一个 `data property attributeName`，其值为 `"href"`，那么这个绑定将等价于 `v-bind:href`。

#### 对动态参数表达式的约束

动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 `HTML attribute` 名里是无效的。例如：

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。

在<word text="DOM" />中使用模板时 (直接在一个<word text="HTML" />文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 `attribute` 名全部强制转为小写：

```html
<!-- 在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。-->
<a v-bind:[someAttr]="value"> ... </a>
```

### 指令 v-on

> 作用：给标签绑定事件。

- 语法

  - `v-on:事件名="要执行的少量代码"`

    ```vue
    <template>
      <div id="app">
        <h1>{{ count }}</h1>
        <button v-on:click="count = count + 1">增加1</button>
      </div>
    </template>

    <script>
    export default {
      data() {
        return {
          count: 1,
        }
      },
    }
    </script>
    ```

  - `v-on:事件名="methods中的函数"`

    `v-on` 等号内是函数的名字，函数写在 `methods` 对象内。

    事件函数想要用到 `data` 内的数据，就要通过 `this.` 的形式获取。因为数据都是放在<word text="Vue" />对象内，对象调用了这些方法， `this` 指向这个<word text="Vue" />实例对象。

    ```vue
    <template>
      <div id="app">
        <h1>{{ count }}</h1>
        <button @click="add">增加1</button>
      </div>
    </template>

    <script>
    export default {
      data() {
        return {
          count: 1,
        }
      },
      methods: {
        add() {
          this.count += 1
        },
      },
    }
    </script>
    ```

  - `v-on:事件名="methods中的函数(实参)"`

    这里加括号不是立即执行函数，而是为函数传递一个参数。必须要有括号才能传参！

    ```vue [v-on指令.vue]
    <template>
      <div id="app">
        <h1>{{ count }}</h1>
        <button @click="addFn(5)">增加多个</button>
      </div>
    </template>

    <script>
    export default {
      data() {
        return {
          count: 1,
        }
      },
      methods: {
        addFn(num) {
          this.count += num
        },
      },
    }
    </script>
    ```

#### 指令 v-on 动态参数

使用动态参数为一个动态的事件名绑定处理函数：

```vue
<a v-on:[eventName]="doSomething"> ... </a>
```

在这个示例中，当 `eventName` 的值为 `"focus"` 时，`v-on:[eventName]` 将等价于 `v-on:focus`。

##### 对动态参数的值的约束

动态参数预期会求出一个字符串，异常情况下值为 `null`。这个特殊的 `null` 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。

#### 指令 v-on 简写

- 普通简写

  ```vue
  <a @click="doSomething">...</a>
  ```

- 动态简写

  ```vue
  <a @[event]="doSomething"> ... </a>
  ```

#### 指令 v-on 修饰符

> 作用：在事件后面加上 `.修饰符名` 给事件带来更大的功能。

- `@事件名.修饰符="methods里函数"`
  - `.stop` ： 阻止事件冒泡
  - `.prevent` ： 阻止默认行为
  - `.once` ： 程序运行期间, 只触发一次事件处理函数

```vue [v-on修饰符.vue]
<template>
  <div id="app" @click="father">
    <button @click.stop="son">阻止冒泡</button>
    <a :href="url" @click.prevent>阻止默认行为</a>
    <button @click.once="one">只出发一次</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'http://www.baidu.com',
    }
  },
  methods: {
    father() {
      console.log('父元素触发了')
    },
    son() {
      console.log('我不冒泡！')
    },
    one() {
      console.log('我只出发一次！')
    },
  },
}
</script>

<style scoped></style>
```

#### 指令 v-on 按键修饰符

> 作用：给键盘事件, 添加修饰符, 增强能力。

语法:

- `@keyup.enter` - 监测回车按键
- `@keyup.esc` - 监测返回按键

```vue [v-on按键修饰符.vue]
<template>
  <div>
    <input type="text" @keydown.enter="enterFn" />
    <hr />
    <input type="text" @keydown.esc="escFn" />
  </div>
</template>

<script>
export default {
  methods: {
    enterFn() {
      console.log('enter回车按键了')
    },
    escFn() {
      console.log('esc按键了')
    },
  },
}
</script>
```

### 指令 v-model

> 作用：把 `value` 属性和<word text="Vue" />数据变量, 双向绑定到一起。 双向数据绑定的含义：

- 数据变化 -> 视图自动同步
- 视图变化 -> 数据自动同步

语法： `v-model="vue数据变量"`

指令 `v-model` 不能用于 `div` 这个无法获取内容的标签，一般用于 `input` 、`select` 、`textarea` 等。

- `select` : 下拉菜单的 `v-model` 指令写在第一行的 `select` 中，获取到的是每条 `option` 的 `value` 值。

- `checkbox` : 复选框表单中的<word text="Vue" />变量是一个字符串时，关联的是 `checked` 属性；是一个数组时，关联的是 `value` 的值。

  即绑定单个复选框，获取到的是该复选框的选中状态（`true` 或 `false` ）；绑定多个复选框，获取到的是一个数组，包含所有已选中的值

- `radio` ：获取到的是被选中的单选框的值

```vue [v-model指令.vue]
<template>
  <div>
    <!-- v-model:是实现vuejs变量和表单标签value属性, 双向绑定的指令 -->
    <div>
      <span>用户名:</span>
      <input type="text" v-model="username" />
    </div>
    <div>
      <span>密码:</span>
      <input type="password" v-model="pass" />
    </div>
    <div>
      <span>来自于: </span>
      <!-- 下拉菜单要绑定在select上 -->
      <select v-model="from">
        <option value="北京市">北京</option>
        <option value="南京市">南京</option>
        <option value="天津市">天津</option>
      </select>
    </div>
    <div>
      <!-- (重要)
      遇到复选框, v-model的变量值
      非数组 - 关联的是复选框的checked属性
      数组   - 关联的是复选框的value属性
       -->
      <span>爱好: </span>
      <input type="checkbox" v-model="hobby" value="抽烟" />抽烟
      <input type="checkbox" v-model="hobby" value="喝酒" />喝酒
      <input type="checkbox" v-model="hobby" value="写代码" />写代码
    </div>
    <div>
      <span>性别: </span>
      <input type="radio" value="男" name="sex" v-model="gender" />男
      <input type="radio" value="女" name="sex" v-model="gender" />女
    </div>
    <div>
      <span>自我介绍</span>
      <textarea v-model="intro"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      pass: '',
      from: '',
      hobby: [],
      sex: '',
      intro: '',
    }
    // 总结:
    // 特别注意: v-model, 在input[checkbox]的多选框状态
    // 变量为非数组, 则绑定的是checked的属性(true/false) - 常用于: 单个绑定使用
    // 变量为数组, 则绑定的是他们的value属性里的值 - 常用于: 收集勾选了哪些值
  },
}
</script>
```

#### 指令 v-model 修饰符

> 作用：让 `v-model` 拥有更强大的功能。

语法:

```vue
v-model.修饰符="vue数据变量"
```

- `.number` 以 `parseFloat` 转成数字类型。
- `.trim` 去除首尾空白字符。
- `.lazy` 在 `change` 时触发而非 `inupt` 时，有利于减少请求优化性能。

```vue [v-model修饰符.vue]
<template>
  <div>
    <div>
      <span>年龄:</span>
      <input type="text" v-model.number="age" />
    </div>
    <div>
      <span>人生格言:</span>
      <input type="text" v-model.trim="motto" />
    </div>
    <div>
      <span>自我介绍:</span>
      <textarea v-model.lazy="intro"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      age: '',
      motto: '',
      intro: '',
    }
  },
}
</script>
```

### 指令 v-text 和 v-html

> 作用：更新<word text="DOM" />对象的 `innerText` / `innerHTML` 。

语法:

- `v-text="vue数据变量"`
- `v-html="vue数据变量"`

> [!WARNING] 注意
> 会覆盖插值表达式

```vue [v-text&v-html.vue]
<template>
  <div>
    <p v-text="str"></p>
    <p v-html="str"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      str: '<span>我是一个span标签</span>',
    }
  },
}
</script>
```

`v-model` 也可以为子组件绑定，只要子组件遵循以下规则：

1. 子组件只有一个 `input` 标签且该标签为根标签
2. 子组件的 `value` 值动态绑定 `prop` 变量 `value`
3. 其 `input` 事件触发后 `$emit` 抛出新值

::: code-group

```vue [父组件.vue]
<custom-input v-model="searchText"></custom-input>
```

```jsx [子组件.jsx]
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `,
})
```

:::

### 指令 v-show 和 v-if

> 作用：控制标签的隐藏或出现

- 语法:

  - `v-show="vue变量"`
  - `v-if="vue变量"`

- 原理

  - `v-show` 动态为元素添加或移除 `display:none` 样式 (频繁切换使用 `v-show` 性能更好)。

  - `v-if` 动态从<word text="DOM"/>树上创建或移除元素（对于刚初始化就不需要被展示的时候使用 `v-if` 性能更好，不需要额外创建这个元素）。

  ```vue [v-show&v-if.vue]
  <template>
    <div id="app">
      <div v-show="isok">我是v-show</div>
      <div v-if="isok">我是v-if</div>
      <button @click="change">点我改变</button>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        isok: false,
      }
    },
  }
  </script>
  ```

- 高级

  `v-else` 使用，需要结合 `v-if` 才能生效。

  ```vue [v-else.vue]
  <script>
  export default {
    data() {
      return {
        age: 1,
        able: false,
      }
    },
    methods: {
      change() {
        this.isok = !this.isok
        // this.age = 20;
        this.able = true
      },
    },
  }
  </script>
  ```

> [!IMPORTANT] 补充拓展
>
> 在<word text="HTML" />页面中，代码是从上往下执行的，因此会出现先创建 `v-for` 控制的元素节点，再判断是否删除。
>
> 但是在 `.vue` 组件中，会把整体当作 `js` 代码编译，因此会去判断是否要加载再去加载。

### 指令 v-for

> 作用：列表渲染, 所在标签结构, 按照数据数量, 循环生成。

1. 遍历数组

   语法

   - `v-for="值 in 目标数组"`

   - `v-for="(值, 索引) in 目标数组"`

     索引必须要写在第二位上，可以自己命名，不一定是要 `index` 。

2. 遍历对象

   语法

   - `v-for="值 of 目标对象"`
   - `v-for="(值, 键) of 目标对象"`
   - `v-for="(值, 键, 索引) of 目标对象"`

> [!WARNING] 注意
>
> `v-for` 的临时变量名不能用到 `v-for` 范围外

#### 指令 v-for 的更新监测

> 作用：当 `v-for` 遍历的目标结构改变，<word text="Vue" />触发 `v-for` 的更新。

- 情景一：数组翻转 数组翻转用到了数组的内置 `API` 方法： `reserve()` 。这个方法会修改原数组。

  ```vue [v-for更新监测.vue]
  <template>
    <div>
      <ul>
        <li v-for="(val, index) in arr" :key="index">
          {{ val }}
        </li>
      </ul>
      <button @click="revBtn">数组翻转</button>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        arr: [5, 3, 9, 2, 1],
      }
    },
    methods: {
      revBtn() {
        // 1. 数组翻转可以让v-for更新
        this.arr.reverse()
      },
    },
  }
  </script>
  ```

- 情景二：数组截取 数组截取用到了数组内置方法 `slice` ，需要传递两个参数，第一个参数为起始值（从哪里开始），第二个参数为终止值（在哪里结束）。

  但是这个方法不会改变原数组，会产生返回值给新的数组接收，所以我们要用原数组来接收这个返回值。

  ```vue [slice原数组更新.vue]
  <template>
    <div>
      <ul>
        <li v-for="(val, index) in arr" :key="index">
          {{ val }}
        </li>
      </ul>
      <button @click="sliceBtn">截取前3个</button>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        arr: [5, 3, 9, 2, 1],
      }
    },
    methods: {
      sliceBtn() {
        // 2. 数组slice方法不会造成v-for更新
        // slice不会改变原始数组
        // this.arr.slice(0, 3)

        // 解决v-for更新 - 覆盖原始数组
        this.arr = this.arr.slice(0, 3)
      },
    },
  }
  </script>
  ```

- 情景三：更新值 更新值可以用到<word text="Vue" />的内置属性方法： `$set()` ，需要传递三个参数：

  1. 第一个参数：需要被更新值的数组或对象
  2. 第二个参数：更新的位置（必须是字符串的形式）
  3. 第三个参数：更新后的值

  ```vue [$set更新.vue]
  <template>
    <div>
      <ul>
        <li v-for="(val, index) in arr" :key="index">
          {{ val }}
        </li>
      </ul>
      <button @click="updateBtn">更新第一个元素值</button>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        arr: [5, 3, 9, 2, 1],
      }
    },
    methods: {
      updateBtn() {
        // 3. 更新某个值的时候, v-for是监测不到的
        // this.arr[0] = 1000;

        // 解决-this.$set()
        // 参数1: 更新目标结构
        // 参数2: 更新位置
        // 参数3: 更新值
        this.$set(this.arr, 0, 1000)
      },
    },
  }
  </script>
  ```

这些方法会触发数组改变，`v-for` 会监测到并更新页面

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

这些方法不会触发 `v-for` 更新

- `slice()`
- `filter()`
- `concat()`

> [!WARNING] 注意
>
> <word text="Vue" />不能监测到数组里赋值的动作而更新, 如果需要请使用 `Vue.set()` 或者 `this.$set()` ，或者覆盖整个数组。即直接采用**数组[索引]**的方式修改值是不会被 `v-for` 监测到的。关于这点下图为<word text="Vue" />创始人和发现这个问题并在 `issue` 上提问的程序员的对话截图。知道即可。

#### 指令 v-for 的就地更新与虚拟 DOM

`.vue` 文件中的 `template` 里写的标签，都是模板，都要被<word text="Vue"/>处理成虚拟<word text="DOM"/>对象，才会渲染显示到真实<word text="DOM"/>页面上

1. 内存中生成一样的虚拟<word text="DOM"/>结构(_本质是个<word text="JavaScript"/>对象_)

   因为真实的<word text="DOM"/>属性好几百个，没办法快速的知道哪个属性改变了。

   比如 `template` 里标签结构

   ```vue
   <template>
     <div id="box">
       <p class="my_p">123</p>
     </div>
   </template>
   ```

   对应的虚拟<word text="DOM"/>结构

   ```js
   const dom = {
     type: 'div',
     attributes: [{ id: 'box' }],
     children: {
       type: 'p',
       attributes: [{ class: 'my_p' }],
       text: '123',
     },
   }
   ```

2. 以后<word text="Vue"/>数据更新

   - 生成新的虚拟<word text="DOM"/>结构
   - 和旧的虚拟<word text="DOM"/>结构对比
   - 找不不同, 只更新变化的部分(重绘/回流)到页面 —— 也叫打补丁

_好处 1: 提高了更新<word text="DOM"/>的性能(不用把页面全删除重新渲染)_

_好处 2: 虚拟<word text="DOM"/>只包含必要的属性(没有真实<word text="DOM"/>上百个属性)_

在内存中比较差异, 然后给真实 DOM 打补丁更新上，`v-for` 的默认行为会尝试原地修改元素而不是移动它们。

> [!TIP] 总结
> 虚拟<word text="DOM"/>保存在内存中, 只记录<word text="DOM"/>关键信息, 提高<word text="DOM"/>更新的性能

#### 指令 v-for 的 key 的作用

官方建议：只要使用到了 `v-for` ，那么一定要绑定一个 `:key` 属性，而且，尽量把 `id` 具有唯一性的数值作为 `key` 的值。

而且，官方对 `key` 的值类型是有要求的，只能是字符串或者数值。

`key` 的值不允许重复，否则终端会报错。

##### 无 key - 就地更新

`v-for` 不会移动 `DOM` , 而是尝试复用, 就地更新，如果需要 `v-for` 移动 `DOM` , 你需要用特殊 attribute `key` 来提供一个排序提示。

```vue [无 key.vue]
<ul id="myUL">
  <li v-for="str in arr">
    {{ str }} 
    <input type="text">
  </li>
</ul>
<button @click="addFn">下标为1的位置新增一个</button>
<script>
export default {
  data() {
    return {
      arr: ['老大', '新来的', '老二', '老三'],
    }
  },
  methods: {
    addFn() {
      this.arr.splice(1, 0, '新来的')
    },
  },
}
</script>
```

_性能不高，从第二个 `li` 往后都更新了，打开控制台，可以发现第二个 `li` 的文本和第三个 `li` 的文本被修改了；创建了新的第四个 `li` 。_

##### 有 key - 值为索引

> 还是就地更新

因为新旧虚拟<word text="DOM"/>对比，`key` 存在就复用此标签更新内容，如果不存在就直接建立一个新的

```vue [有 key.vue]
<ul id="myUL">
  <li v-for="(str, index) in arr" :key="index">
    {{ str }} 
    <input type="text">
  </li>
</ul>
<button @click="addFn">下标为1的位置新增一个</button>
<script>
export default {
  data() {
    return {
      arr: ['老大', '新来的', '老二', '老三'],
    }
  },
  methods: {
    addFn() {
      this.arr.splice(1, 0, '新来的')
    },
  },
}
</script>
```

1. `v-for` 先循环产生新的<word text="DOM"/>结构，`key` 是连续的，和数据对应
2. 然后比较新旧<word text="DOM"/>结构，找到区别，打补丁到页面上

最后补一个 `li`，然后从第二个往后，都要更新内容，效果实现和无 `key` 是一样的。

##### 有 key - 值为 id

`v-for` 不会移动<word text="DOM"/>，而是尝试复用，就地更新，如果需要 `v-for` 移动<word text="DOM"/>，你需要用特殊 attribute `key` 来提供一个排序提示

新<word text="DOM"/>里数据的 `key` 存在，去旧的虚拟<word text="DOM"/>结构里找到 key 标记的标签，复用标签。 新<word text="DOM"/>里数据的 `key` 存在，去旧的虚拟<word text="DOM"/>结构里没有找到 `key` 标签的标签，创建。

旧<word text="DOM"/>结构的 `key`，在新的<word text="DOM"/>结构里没有了，则*移除 `key` 所在的标签*

```vue [key为id.vue]
<template>
  <div>
    <ul>
      <li v-for="obj in arr" :key="obj.id">
        {{ obj.name }}
        <input type="text" />
      </li>
    </ul>
    <button @click="btn">下标1位置插入新来的</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        {
          name: '老大',
          id: 50,
        },
        {
          name: '老二',
          id: 31,
        },
        {
          name: '老三',
          id: 10,
        },
      ],
    }
  },
  methods: {
    btn() {
      this.arr.splice(1, 0, {
        id: 19,
        name: '新来的',
      })
    },
  },
}
</script>

<style></style>
```

> [!TIP] 总结
> 不用 `key` 也不影响功能(就地更新)，添加 `key` 可以提高更新的性能

## 总结

- <word text="Vue" />是什么

  是一个渐进式的<word text="JavaScript"/>框架。

- `Vue-cli` 作用以及简单使用

  1. 作用：无需我们配置自动帮我们搭建好<word text="Webpack"/>环境，开箱即用。
  2. 使用：`vue create 项目名` 创建项目目录，进入目录后 `npm run serve` 运行。

- 插值表达式语法。<word text="Vue"/>变量在 `script` 标签内的 `data` 函数内 `return` 返回。

- `MVVM` 设计模式

  双向数据绑定与数据驱动视图。**通过数据驱动视图，不要在想着怎么操作 DOM，而是想着如何操作数据！！**

- `v-bind` 作用

  把<word text="Vue" />变量的值，赋予给<word text="DOM"/>属性上，影响标签显示效果

- `v-on` 作用和事件对象以及修饰符使用

  1. 作用：给<word text="DOM"/>标签绑定事件，等号右侧为事件处理函数，简写形式为 `@`
  2. 事件对象
     - 无传参，通过形参直接接收
     - 传参，通过 `$event` 指代事件对象传给事件处理函数
  3. 修饰符
     - `.stop` - 阻止事件冒泡
     - `.prevent` - 阻止默认行为
     - `.once` - 程序运行期间，只触发一次事件处理函数

- `v-model` 的作用

  把 `value` 属性和<word text="Vue" />数据变量，双向绑定到一起

- `v-if` 和 `v-show` 的区别和本质

  1. `v-if` ：直接把节点从<word text="DOM"/>树上删除
  2. `v-show` ：原理是通过样式 `display:none` 隐藏节点。

- `v-for` 的作用和使用

  1. 作用：列表渲染，所在标签结构，按照数据数量，循环生成
  2. 使用语法：
     - `v-for="(值, 索引) in 目标结构"`
     - `v-for="值 in 目标结构"`

- <word text="Vue" />的特点

  - 渐进式
  - 声明式渲染
  - 数据驱动视图 (响应式)
  - 极少的去写<word text="DOM"/>操作相关代码
  - 双向绑定
  - 组件系统
  - 不兼容 IE8 及以下浏览器

- `v-for` 什么时候会更新页面呢?

  - 数组采用更新方法, 才导致 `v-for` 更新页面

- <word text="Vue" />是如何提高更新性能的?

  - 采用虚拟<word text="DOM"/>+ `key` 提高更新性能

- 虚拟<word text="DOM"/>是什么?

  - 本质是保存<word text="DOM"/>关键信息的<word text="JavaScript"/>对象

- 如何比较新旧虚拟<word text="DOM"/>?

  - 根元素改变 – 删除当前<word text="DOM"/>树重新建
  - 根元素未变, 属性改变 – 更新属性
  - 根元素未变, 子元素/内容改变
  - 无 `key` – 就地更新 / 有 `key` – 按 `key` 比较

## 思维导图

![vue基础.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/567ebc99576c420b9aad21854b190c61~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 拓展

为什么在 `script` 逻辑模块中， `data` 是函数返回的形式，而 `methods` 方法是对象的形式？

这就要从基本数据类型和复杂数据类型讲起。我们都知道，基本数据类型存储的是值，当赋值给一个新的变量时，内存会开辟一个新的空间存储值，彼此互不干扰，各自独立。

```js
let a = 10
let b = a
b = 20
console.log(a, b) // 10 20
```

复杂数据类型存储的是地址，赋给新的变量时你修改我也会受到影响。

```js
let obj = { s: 2 }
let obj1 = obj
obj1.s = 666
sonsole.log(obj) // {s:666}
```

返回<word text="Vue" />，我们希望各个组件操作的值相互独立，互不干扰，因此如果使用对象的形式来存储，会造成修改前一个组件后一个组件的值也被改变。用函数返回的形式每个组件都有自己的返回值，互不干扰。

而函数我们希望能够复用，因此对象是最好的选择。
