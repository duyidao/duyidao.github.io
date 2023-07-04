# 拓展

## setState

更新状态的两种写法

1. `setState(stateChange, [callback])` —— 对象式的 `setState`
   - `statechange` 为状态改变对象（该对象可以体现出状态的更改）
   - `callback` 是可选的回调函数，它在状态更新完毕、界面更新（`render` 调用）后触发
     
     这也说明，`react` 状态的更新是异步的。直接获取无法获取到最新的值，需要通过回调函数获取，代码如下所示：
     ```jsx
     add = () => {
       const {count} = this.state
       this.setState({count: count + 1}, () => {
         console.log('new', this.state.count) // new, 2
       })
       console.log('old', this.state.count) // old, 1
     }
     ```
2. `setState(updater, [callback])` ——函数式的 `setState` 
   - `updater` 为返回的 `stateChange` 对象的函数
   - `updater` 可以接收到 `state` 和 `props` 
     ```jsx
     add = () => {
       this.setState(state => ({count: state.count + 1}))
     }
     ```
   - `callback` 是可选的回调函数，它在状态更新完毕、界面更新（`render` 调用）后触发

总结：

对象式的 `setState` 是函数式的 `setState` 的简写方式（语法糖）

使用原则如下：

1. 如果新状态不依赖于原状态 => 使用对象方式更简便
2. 如果新状态依赖原状态 => 使用函数方式更简便
3. 如果需要再 `setState()` 执行后获取最新的状态数据，要在第二个 `callback` 函数中读取

## lazyLoad

路由组件懒加载，让路由组件实现需要显示时才加载，提高首屏加载速度。使用方式如下：

1. 在 `react` 中引入 `lazy` 
   ```javascript
   import React, { Component, lazy } from 'react'
   ```
2. 把引入的组件变为懒加载组件
   ```javascript
   const Home = lazy(() => import('./Home.vue'))
   ```
3. 使用
   ```jsx
   <Suspense fallback={<h1>loading...</h1>}>
     <Route path='/home' component={Home}></Route>
   </Suspense>
   ```
   
   通过 `Suspense` 标签包裹，`fallback` 表示在等待组件加载时显示的内容，可以是 DOM 标签，也可以是一个引入的组件。
   > 注意：
   > 
   > 如果使用组件展示 `loading` 该组件不可使用懒加载！

## stateHook

`State Hook` 让函数组件也可以有 `state` 状态, 并进行状态数据的读写操作

语法如下所示：

```javascript
const [xxx, setXxx] = React.useState(initValue) 
```

其中：

- 第一次初始化指定的值在内部作缓存
- 返回包含2个元素的数组，第1个为内部当前状态值, 第2个为更新状态值的函数，可通过解构获取

`setXxx()` 拥有2种写法：

1. `setXxx(newValue)` ：参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
2. `setXxx(value => newValue)` ：参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值

## EffectHook

## RefHook

## Fragment

## Context

## PureComponent

## renderProps

## ErrorBoundary

## 组件通信总结
