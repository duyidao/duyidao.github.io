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

作用：创建包含指定reducer的store对象

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

作用：应用上基于redux的中间件(插件库)

### combineReducers()

作用：合并多个reducer函数
