# 从零手写VueRouter及Vuex

## VueRouter

在一个 Vue 的项目中，入口文件 `main.js` 中负责渲染组件和引入路由，代码如下所示：

```js
import Vue from 'vue' // 这里用的vue是runtime，不包含compiler
import App from './App.vue'
import router from './router' // 前端路由

new Vue({
    router,
    render: h => h(App) // 渲染组件，内部_c 发现是对象的话会调用组件的render方法进行渲染。如果在这里写template会报错，因为不包含compiler
}).$mount('#app')
```

在 `router/index.js` 文件中会有这么一段代码：

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

VueRouter 会调用插件的 `install` 方法。最后导出一个路由实例，在入口文件中传到 `new Vue` 对象内。

路由既有前端路由，也有后端路由。后端路由在提交一个表单元素时，服务端会根据提交内容，校验提交结果，最终在服务端发生跳转。此时前端会有很多 `html` ，后端判断结果跳转不同的 `html` 。主要针对前后端不分离的项目。

前端路由指跳转不由后端控制，而是由前端控制，如 `router.push` 跳转。根据路径不同，渲染不同组件，不经过服务端，也不会刷新页面。前端路由分两种形式：

1. `hash` 模式，根据哈希值的不同，渲染不同的组件内容。通过 `window.addEventListener('popstate / hashchange')` 可以监控到 `hash` 值的变化。

   哈希模式的路由缺点其一是丑，所有路径都有 `#` 锚点；其二是服务端无法获取锚点，无法根据对应的路径来解析内容，因此无法做 SEO 优化。

2. `history` 模式，是 H5 提供的 API ，路径上没有 `#` 锚点。可以改变路径，同时强制刷新的时候，会带上路径，服务端可以解析此路径。历史模式第一次加载页面会做 SEO 优化，需要配合 SSR，后续页面基于 `historyAPI` 跳转即可。

> 题外话
>
> Node 中没有前端 `url` 地址，因此内部采用的是 `memeryHistory` 。通过 `node` + `vue` 实现路由跳转。（服务端渲染能用到）

### install 方法

现在尝试写一个 VueRouter ，新建一个 `js` 文件，创建一个类，并全部导出。代码如下：

```js
class VueRouter {
    
}

export default VueRouter
```

注释掉原来引入的 `vue-router` 路由，引入手写的文件，刷新后页面报错，报错信息如下所示；

![报错](https://pic.imgdb.cn/item/65464884c458853aefaf56ff.jpg)

`Vue.use()` 方法内如果放一个函数，默认会执行，因此如果把一个类放进去则会报错。解决方法为在类中设置一个 `install` 方法，代码如下：

```js
class VueRouter {
    
}

// 如果用户导出一个类，在类上写一个install方法，会调用该方法
VueRouter.install = function(Vue) {
    console.log('install')
}

export default VueRouter
```

因为 VueRouter 会调用插件的 `install` 方法。在源码中，它会去判断是否有 `nstall` 方法，如果有则调用，没有才执行函数。

方法 `install` 会拿到 Vue 构造函数，为了能够每个文件都可使用，在 `install` 方法中保存到全局属性上。代码如下：

```js
export let Vue
class VueRouter {
    constructor(options) {
        let routes = options.routes
    }
}

// 如果用户导出一个类，在类上写一个install方法，会调用该方法
VueRouter.install = function(_Vue) {
    Vue = _Vue // 将传入的Vue的构造函数变为全局的
    console.log('install')
}

export default VueRouter
```

在创建路由表时，前端代码如下：

```js
const routes = [
    {
        path: '/',
        component: import() => './home.vue',
        children: [
        	{
        		path: 'a',
        		component: {
        			render: (h) => h('<div>a</div>')
    			}
    		}
        ]
    },
    {
        path: '/about',
        component: import() => './about.vue',
        children: [
        	{
        		path: 'a',
        		component: {
        			render: (h) => h('<div>about a</div>')
    			}
    		}
        ]
    }
]
```

在源码中，需要把这个路由表格式化为一个一一对应的映射表，如：

```js
{'/':Home, '/a':HomeA, '/about': About, '/about/a': AboutA}
```

还需要把根实例注入的 `router` 属性共享给每一个组件，让每一个组件都能通过 `this.$router` 获取到路由对象。

可能会有人第一时间想到原型，把 `$router` 方法挂载到原型上。但是需要考虑以下的情况：

```js
new Vue({
    router,
    render: h => h(App)
})
new Vue({
    render: h => h(App)
})
```

只有通过 `new Vue` 中传入了 `router` 才能被共享，因此原型的方法不可取。

利用 `mixin` 方法，在生命周期 `beforeCreate` 中传递 `router` ，所有组件初始化都会采用该方法，会先渲染该 `mixin` 方法，后渲染组件的方法。说明组件渲染是从父到子的。

然后通过劫持，在实例上取值的时候，会拿到 `_router` 属性。代码如下：

```js
VueRouter.install = function(_Vue) {
    Vue = _Vue
    
    Vue.mixin({
        beforeCreate() {
            // 组件渲染从父 _router 到子
            if(this.$options.router) {
                // 如果有router，说明是根实例且传递了router。此时 this 指向根实例
                this._routerRoot = this
                this._router = this.$options.router
            } else {
                // 没有说明是子组件，从父组件拿router，所有组件上增加一个 _routerRoot 指向根实例
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
            
            // 在组件中都可以通过 this 属性获取到 _router 属性
            Object.defineProperty(Vue.prototype, '$router', {
                // 为了取值方便，做一层代理。后面无需通过 this.$options._router 获取
                get() {
                    return this._routerRoot && this._routerRoot._router
                }
            })
        }
    })
}
```

> 答疑解惑
>
> 1. 可不可以不用这么麻烦，直接在 `beforeCreate` 钩子上写 `this.$router = this.$options?.router` ？
>
>    不可以，如果这么写意思就变为 “当前 `this` 指向的如果有 `router` 才加，没有就不加。后果是只有根实例 `new Vue` 有 `router` 。
>
> 2. 可不可以不代理，直接 `this.$router = this.$options?.router` ？
>
>    可以，但是这样每次都会给 `this.$router` 重新赋值。不如代理。

此时查看控制台，报错，提示没有 `router-link` 和 `router-view` 方法，需要一一设置，底层原理是通过 `Vue.component` 配置为组件，其中：

1. `router-link` 先通过插槽最终把标签的内容渲染到 `a` 标签上。
2. `router-view` 先渲染一个空的 `div` 。

代码如下所示：

```jsx
VueRouter.install = function(_Vue) {
    // ...
    
    // react 中叫children；vue中所有的插槽会被变道 vm.$slots 对象上
    Vue.component('router-link', {
        render() {
            return <a>{this.$slots.default}</a>
        }
    })
    Vue.component('router-view', {
        render() {
            return <div></div>
        }
    })
}
```

