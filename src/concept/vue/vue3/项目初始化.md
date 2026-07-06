# 项目初始化

## CDN 项目创建

复制 `cdn` 相关 `script` 标签，，创建 `js` 文件，通过 `Vue.createApp({})` 创建节点。

```js
const app = Vue.createApp({
  data() {
    return {
      name: "vue创建",
    };
  },
  template: `<div>{{name}}</div>`,
});

app.component("child", {
  data() {
    return {
      name: "子组件",
    };
  },
  template: `<p>{{name}}</p>`,
});

const vm = app.mount("#app");
```

## 脚手架项目创建

### 软件安装

**NODE**

请先访问 [Node官网](https://nodejs.org/zh-cn/) 安装<word text="NodeJS"/>。

**淘宝镜像**

使用 [淘宝镜像](https://developer.aliyun.com/mirror/NPM?from=tnpm) 可以快速安装 `NPM` 依赖包

```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

**yarn**

`yarn` 是与 `npm` 类似的包管理工具，`yarn` 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。

安装 `yarn`

```sh
npm install -g yarn
```

### 创建项目

**vite**

下面是使用 `vite` 构建基于 `vue-ts` 模板的项目 `daodao`

```sh
yarn create vite daodao --template vue-ts
```

或者使用 `@vue/latest` 创建，他会执行 `create vite` 命令

```sh
npm init vue@latest
```

![p9I9xyD.png](https://s1.ax1x.com/2023/05/21/p9I9xyD.md.png)

## 入口文件详解

```js
import { createApp } from "vue"; // 类似于vue2的new Vue()
import App from "./App.vue"; // 引入根组件
createApp(App).mount("#app"); // 把项目挂载到id为app的标签上
```

## 使用 ES 模块创建 vue3 项目

### 创建 html

创建一个<word text="HTML"/>页面，引入 cdn 的 `script` 标签。

```html
<scrtip src="..."></scrtip>

<div id="app"></div>
```

### 创建 js 根文件

::: code-group
```js [App.js]
const app = Vue.createApp({
  data() {
    return {
      list: [
        {
          name: "daodao",
          age: 20,
        },
        {
          name: "xiaodao",
          age: 21,
        },
      ],
    };
  },
  template: `<div>刀刀</div>`,
});

app.mount("#app");

export default app;
```

```html [index.html]
<scrtip src="..."></scrtip>
<scrtip type="module" src="./App.js"></scrtip>

<div id="app"></div>
```
:::

### 创建data数据文件

在 `data/db.js` 文件中专门负责数据的创建

```js [data/db.js]
export default [
  {
    name: "daodao",
    age: 20,
  },
  {
    name: "xiaodao",
    age: 21,
  },
];
```

App.js 文件引入

```js [App.js]
import data from "data/db";

const app = Vue.createApp({
  data() {
    return {
      data,
    };
  },
  template: `<div>刀刀</div>`,
});

app.mount("#app");

export default app;
```

### 创建 components 子组件

在 `components/child.js` 文件中专门设置可复用的子组件

```js [components/child.js]
export default {
  data() {
    return {};
  },
  template: `<div style="color: skyblue">123</div>`,
};
```

App.js 文件中引入子组件

```js [App.js]
import data from "data/db";
import child from "components/child.js";

const app = Vue.createApp({
  data() {
    return {
      data,
    };
  },
  components: { child },
  template: `<div>刀刀</div>`,
});

app.mount("#app");

export default app;
```

<word text="HTML"/>文件中使用

```html
<scrtip src="..."></scrtip>
<scrtip type="module" src="./App.js"></scrtip>

<div id="app">
  <div v-for="item in list">
    <child />
  </div>
</div>
```

### 通过 props 父子组件传参

<word text="HTML"/>文件中父组件通过 `:变量名` 赋值给子组件

```html
<scrtip src="..."></scrtip>
<scrtip type="module" src="./App.js"></scrtip>

<div id="app">
  <div v-for="item in list">
    <child :data="item" />
  </div>
</div>
```

`child.js` 文件接受传参并使用

```js
export default {
  props: [item],
  template: <div style="color: skyblue">{{item.name}}-{{item.age}}</div>
}
```

### 入口文件模拟

设置一个入口文件 `main.js`

```js
import App from "./App.js";

export default Vue.createApp().mount("#app");
```

App.js 文件中只需要引入模块并导出即可

```js
import data from "data/db";
import child from "components/child.js";

export default {
  data() {
    return {
      data,
    };
  },
  components: { child },
};
```

页面效果没变，结构与打包工具构建的项目相似，原理亦是如此。

## 跨域请求

跨越请求的主要问题是携带 `cookie`，下面我们来解决<word text="Vue"/>的跨越请求问题。

以下示例环境为：后台 `daodao.test`，前台为 `localhost:3000` 。

### 代理方式

如果后台要使用 `cookie` 进行权限验证。这时就需要前台可以传递 `cookie`，我们使用前台代理完成这个功能，使用这种方式后台不需要什么配置。

### axios

请求一般使用 `axios` 发送，下面是对 `url` 的基本配置

> 不需要设置 `axios` 的 `withCredentials` 属性为 `true` 。

```js
//请求拦截
instance.interceptors.request.use(
  function (config) {
  	//如果请求不是以 / 开始时添加 /api 前缀
    config.baseURL = config.url[0] == '/' ? '' : '/api'
  }
);
```

### vite

下面是重点即在 **vite.config.js** 中配置代理，最终将实现通过 `http://daodao.test/api` 访问后台，解决跨越的问题。

```js
export default defineConfig({
  ...
  //开发环境设置
  server: {
    proxy: {
    	//laravel 中获取 csrf-token 的接口
      '/sanctum': {
        //将/api访问转换为target
        target: 'http://daodao.test/sanctum',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/sanctum/, ''),
      },
      '/api': {
        //将/api访问转换为target
        target: 'http://daodao.test/api',
        //跨域请求携带cookie
        changeOrigin: true,
        //url 重写删除`/api`
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

## 样式

### 样式设置

- 在各自 `.vue` 文件中的 `style` 内写样式

  1. 如果使用 `less` 或 `scss` 编译器，需要添加 `lang=""` 。
  2. 样式隔离可以使用关键字 `scoped` ，原理是为该 `.vue` 文件的标签添加一个 `data-` 自定义标签。

- 单独创建一个 `css` 、`.less` 、`.scss` 文件

  1. 组件内使用：`@import "~文件路径"`。
  2. 入口文件使用：`import "文件路径"`。

- 通过 `$attr` 引入父组件的样式

    ::: code-group
    ```vue [父组件.vue]
    <Child class="classname"></Child>
    ```
    ```vue [子组件.vue]
    <section :class="$attr.class"></section>
    ```
    :::

### 多种设置

动态类名设置法

- 对象形式：`{类名: 布尔值}` 的格式

  ```vue
  <div :class="{ active: true }"></div>
  ```

- 数组形式：`[数组变量]`（多个样式）

  ```vue
  <div :class="[classList]"></div>

  <script setup>
  const classList = {
    active: true,
    hide: false,
  };
  </script>
  ```

动态样式设置法

- 对象形式：`{样式}` 的格式

  ```vue
  <div :style="{ color: 'red' }"></div>
  ```

- 数组形式：`[数组变量]`（多个样式）

  ```vue
  <div :class="[styleList]"></div>

  <script setup>
  const classList = {
    color: "red",
    width: "100vw",
  };
  </script>
  ```

## v-if 与 v-show 的区别

- `v-show` 原理是为盒子设置样式 `display: none` 来显示隐藏，`v-if` 原理是动态创建销毁盒子来实现显示隐藏。
- `v-if` 与 `v-else` 配合使用，`v-show` 单独使用。
- `template` 标签能使用 `v-if` 与 `v-else` ，不能使用 `v-show` ，会报错。

## 修饰符

### 事件修饰符

- `.stop` ：阻止事件冒泡，点击子组件不会触发父组件的事件。
- `.prvent` ：阻止默认行为，如点击超链接不跳转。
- `.passive` ：不做任何行为判断，因此即使加上阻止默认行为也会失效。

### 表单修饰符

- `.number` ：设置用户只能输入数字。
- `.lazy` ：输入框绑定该事件会产生事件防抖，等到用户不输入一定时间后才触发。
- `.trim` ：删除输入内容前后的空格。
