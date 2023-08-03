# 仓库配置

使用仓库的前置条件需要先下载好 `react-redux` 和 `redux` 两个第三方库。浏览器使用 `react-redux-devtool` 扩展插件可查看 `redux` 的值的变化。

## 仓库创建

新建一个 `store` 文件夹，创建一个 `reducer` 文件作为数据 `state` 值存储，其中：

- 创建一个初始值数据对象
- 声明一个函数，参数一为 `state` 参数值，默认值为初始化的数据对象
- 深拷贝赋值给一个变量并导出

代码如下所示：

```jsx
// 初始数据
const defaultState = {
  num: 20,
  age: 30,
};

// 准备数据，返回state的形式
let reducer = (state = defaultState,) => {
  let newState = JSON.parse(JSON.stringify(state));

  return newState;
};

export default reducer;
```

创建一个 `index` 文件，通过 `redux` 提供的 `legacy_createStore` 方法创建数据仓库，再全部导出。其中：

- 引入刚刚创建好的 `reducer` 给 `legacy_createStore` 方法第一个参数
- 设置`legacy_createStore` 方法的第二个参数使其能正常使用 `react-redux-devtool` 扩展插件

代码如下所示：

```js
import { legacy_createStore } from "redux";
import reducer from "./reducer";

// 创建数据仓库，创建配置项使其能让浏览器正常使用react-redux-devtools扩展插件调试
const store = legacy_createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
```

## 仓库注册

在入口文件 `main.jsx` 文件中引入刚刚导出的数据仓库注册，步骤如下：

- 使用 `react-redux` 中的 `Provider` 方法包裹在组件最外层
- `Provider` 中的 `store` 方法用于注册仓库

代码如下所示：

```jsx
// ...
// 状态管理
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
```

## 数据使用

通过 `react-redux` 中的 `useSelector` hook 获取仓库内的数据，方法传入一个函数，函数形参为仓库内的数据对象。通过解构获取数据，代码如下所示：

```jsx
import React from "react";
import { useSelector } from "react-redux";

export default function Vue() {
  // 获取仓库数据
  const { num, age } = useSelector((state) => ({
    num: state.num,
    age: state.age,
  }));

  return (
    <div>
      <p>{num}</p>
      <p>{age}</p>
    </div>
  );
}
```

## 数据修改

修改数据则通过 `react-redux` 中的 `useDispatch` hook 修改，其方法需要传入一个对象，其中 `type` 为固定的，表示要做什么操作，后面的属性字段是自定义的。

这里以增加数字为例，`type` 设置为 `add` 。代码如下所示：

```jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Vue() {
  // 获取仓库数据
  const { num, age } = useSelector((state) => ({
    num: state.num,
    age: state.age,
  }));

  const dispatch = useDispatch();

  const handleChangeFn = () => {
    // dispatch({type: '字符串（认为是一个记号）'，val：3}) type是固定的，val是自定义的
    dispatch({ type: "add", val: 3 });
  };
  return (
    <div>
      <p>{num}</p>
      <p>{age}</p>
      <button onClick={handleChangeFn}>click me</button>
    </div>
  );
}
```

再去 `reducer.js` 文件中接收 `dispatch` 传过来的对象，当触发 `dispatch` 时 `reducer` 函数也会触发，而他的第二个参数可以获取 `dispatch` 传过来的对象。通过 `type` 来判断要执行什么操作，再修改值即可。代码如下所示：

```js
// 初始数据
const defaultState = {
  num: 20,
  age: 30,
};

// 准备数据，返回state的形式
let reducer = (state = defaultState, action) => {
  // dispatch调用这里的代码也会执行
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "add":
      newState.num += action.val;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
```

p47