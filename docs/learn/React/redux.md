# redux

## 基础

### 概念

1. redux是一个专门用于做状态管理的JS库(不是react插件库)。
2. 它可以用在react, angular, vue等项目中, 但基本与react配合使用。
3. 作用: 集中式管理react应用中多个组件共享的状态。

### 作用

1. 某个组件的状态，需要让其他组件可以随时拿到（共享）。
2. 一个组件需要改变另一个组件的状态（通信）。
3. 总体原则：能不用就不用, 如果不用比较吃力才考虑使用。

### 工作流程

[![pCuqQwq.png](https://s1.ax1x.com/2023/06/15/pCuqQwq.png)](https://imgse.com/i/pCuqQwq)

## action

1. 动作的对象
2. 包含2个属性
   - type：标识属性, 值为字符串, 唯一, 必要属性
   - data：数据属性, 值类型任意, 可选属性
3. 示例代码
   ```jsx
   { type: 'ADD_STUDENT',data:{name: 'tom',age:18} }
   ```

## reducer

1. 用于初始化状态、加工状态。
2. 加工时，根据旧的 `state` 和 `action`， 产生新的 `state` 的纯函数。

```jsx
function reduxer(preState = 12, action) {
  console.log(preState, action)
  const { type, data } = action
  switch (type) {
    case 'add':
      return preState + data
    case 'decrement':
      return preState - data
    case 'chen':
      return preState * data
    case 'chu':
      return preState / data
    default:
      return preState
  }
}

export default reduxer
```

## store

1. 将state、action、reducer联系在一起的对象
2. 如何得到此对象?
   1. `import {createStore} from 'redux'`
   2. `import reducer from './reducers'`
   3. `const store = createStore(reducer)`
   ```jsx
   import { createStore } from "redux";
   import reduxer from './reduxer'
   
   const store = createStore(reduxer)
   
   export default store
   ```
3. 此对象的功能?
   1. getState(): 得到state
   2. dispatch(action): 分发action, 触发reducer调用, 产生新的state。注意：他只负责返回新的 state，不负责页面更新，因此此时页面还是旧数据。
   3. subscribe(listener): 注册监听, 当产生了新的state时, 自动调用
   ```jsx
   import React, { Component } from 'react'
   import store from "../redux/store";
   
   export default class Count extends Component {
     componentDidMount() {
       store.subscribe(() => {
         this.setState({})
       })
     }
     addFn = () => {
       const {value} = this.selectNum
       store.dispatch({type: 'add', data: value * 1})
     }
     addOddFn = () => {
       const {value} = this.selectNum
       const count = store.getState()
       if(count % 2 !== 0) {
         store.dispatch({type: 'add', data: value * 1})
       }
     }
     addAsyncFn = () => {
       const {value} = this.selectNum
       setTimeout(() => {
         store.dispatch({type: 'add', data: value * 1})
       }, 500);
     }
     render() {
       return (
         <div>
           <h1>当前和为：{store.getState()}</h1>
           <select ref={c => this.selectNum = c}>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
           </select>
           <button onClick={this.addFn}>+</button>
           <button onClick={this.addOddFn}>奇数加</button>
           <button onClick={this.addAsyncFn}>异步加</button>
         </div>
       )
     }
   }
   
   ```

## redux的核心API

### createstore()

作用：创建包含指定 `reducer` 的 `store` 对象

### store对象

1.作用: redux库最核心的管理对象
2.它内部维护着:
1)state
2)reducer
3.核心方法:
1)getState()
2)dispatch(action)
3)subscribe(listener)
4.具体编码:
1)store.getState()
2)store.dispatch({type:'INCREMENT', number})
3)store.subscribe(render)

### applyMiddleware()

作用：应用上基于 `redux` 的中间件(插件库)

使用：

- 引入插件
  ```
  yarn add redux-thunk
  ```
- 引入 `applyMiddleware` 方法与 `redux-thunk` 方法
  ```jsx
  import { applyMiddleware } from 'react'
  import thunk from 'redux-thunk'
  ```
- 注册方法
  ```diff
  - export default createStore(redux)
  + export default createStore(redux, applyMiddleware(thunk))
  ```
- 创建异步的方法
  ```jsx
  export const createAction = (data, time) => {
    return (dispatch) => {
      setTimeout(() => {
        dispatch({type: 'xxx', data})
      }, time)
    }
  }
  ```
  
  官方文档说了，开启了中间件后，`dispatch()` 如果发现 `action` 是一个函数，会帮你封装。上方的代码中，刚好 `return` 返回一个函数，因此无需手动调用 `store` 。
  
  异步 `action` 不是必须要用的。
- 使用
  ```jsx
  useActionFn = () => {
    store.dispatch(createAction(1, 500))
  }
  ```

### combineReducers()

作用：合并多个reducer函数

## react-redux

### 理解

1. 一个 `react` 插件库
2. 专门用来简化react应用中使用 `redux`

### 模型图

1. 所有的 UI 组件都应该被一个容器组件包裹，他们是父子关系
2. 容器组件真正和 `redux` 打交道，里面可以使用 `redux` 的 API
3. UI 组件中不能使用 `redux` 的 API
4. 容器组件会传给 UI 组件以下数据：
   - `redux` 中保存的状态
   - 用于操作的状态
5. 容器给 UI 传递状态、操作状态的方法，均通过 `props` 传递

### 分类

`react-Redux` 将所有组件分成两大类

1. UI组件
   1. 只负责 UI 的呈现，不带有任何业务逻辑
   2. 通过 `props` 接收数据(一般数据和函数)
   3. 不使用任何 Redux 的 API
   4. 一般保存在 `components` 文件夹下
2. 容器组件
   1. 负责管理数据和业务逻辑，不负责UI的呈现
   2. 使用 Redux 的 API
   3. 一般保存在 `containers` 文件夹下

### 相关API

- Provider：让所有组件都可以得到state数据
- connect：用于包装 UI 组件生成容器组件
- mapStateToprops：将外部的数据（即state对象）转换为UI组件的标签属性
- mapDispatchToProps：将分发action的函数转换为UI组件的标签属性

### 容器组件的创建

1. 安装 `react-redux` 
   ```
   yarn add react-redux
   ```
2. 引入之前的组件（现在是作为 UI 组件）
   ```jsx
   import CountUI from '../../components/Count'
   ```
3. 引入 `store` 
   ```jsx
   import store from '../../redux/store'
   ```
4. 引入 `connect` 方法，连接 UI 组件与 `redux` 
   ```jsx
   import { connect } from 'react-redux'
   ```
5. 使用
   ```jsx
   const CountContainer = connect()(CountUI)
   ```
   
   上方代码看出两个信息：
   1. `connect` 是一个函数
   2. 其返回值也是一个函数
   
   建立联系固定写法是在返回的函数中传参需要连接的 UI 组件。
6. 导出
   ```jsx
   export default CountContainer
   ```

## redux调试工具
