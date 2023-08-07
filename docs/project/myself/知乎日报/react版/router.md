# 路由配置

本项目都是一级路由，没有二级路由，因此可以采用创建路由数组、通过循环的形式返回路由组件。

在根目录下创建 `router` 文件夹，在里面新建 `routes.js` 文件用于设置路由对象数组；`index.js` 文件用于处理数组生成路由组件。

## routes.js

通过懒加载的形式引入除首页外的其他路由页面，代码如下：

```js
import { lazy } from "react";
import Home from "@/views/Home.jsx";

const Detail = lazy(() => import("@/views/Detail.jsx"));
const Store = lazy(() => import("@/views/Store.jsx"));
const Personal = lazy(() => import("@/views/Personal.jsx"));
const Update = lazy(() => import("@/views/Update.jsx"));
const Page404 = lazy(() => import("@/views/Page404.jsx"));
const Login = lazy(() => import("@/views/Login.jsx"));

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "知乎日报-WebApp",
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: Detail,
    meta: {
      title: "新闻详情-知乎日报",
    },
  },
  {
    path: "/personal",
    name: "personal",
    component: Personal,
    meta: {
      title: "个人中心-知乎日报",
    },
  },
  {
    path: "/store",
    name: "store",
    component: Store,
    meta: {
      title: "我的收藏-知乎日报",
    },
  },
  {
    path: "/update",
    name: "update",
    component: Update,
    meta: {
      title: "个人信息修改-知乎日报",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "登录-知乎日报",
    },
  },
  {
    path: "/*",
    name: "404",
    component: Page404,
    meta: {
      title: "404-知乎日报",
    },
  },
];

export default routes;
```

## index.js

### 返回路由配置

该文件引入路由对象数组，通过 `.map()` 的方法循环数组并返回路由组件 `<Route />` ，最后全局导出路由组件给 `<App.js />` 根组件使用。

由于采用了路由懒加载的设置，需要外层包裹一层 `Suspense` 标签

代码如下所示：

```jsx
import React, { Suspense } from "react";
import routes from "./routes.js";

// 统一路由配置
const Element = (props) => {
};

const RouterView = () => {
  return (
    <Suspense
      fallback={<div>loading</div>}
    >
      <Routes>
        {routes.map((route) => {
          let { name, path } = route;
          return (
            <Route key={name} path={path} element={<Element {...route} />} />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default RouterView;
```

### 统一配置路由

通过 `Element` 函数统一配置路由，返回的是一个配置好的 JSX 组件给路由组件使用。配置信息分以下几个步骤：

1. 获取 `meta` 元信息修改页面的 `title` 标题
2. 获取路由信息并传递给组件
3. 获取组件并返回
4. 后续实现路由守卫配置

代码如下：

```js
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
// ...

// 统一路由配置
const Element = (props) => {
  let { component: Component, meta } = props;

  // 修改页面的Title
  document.title = meta ? meta.title : "知乎日报-mobile";

  // 路由守卫设置

  // 获取路由信息，基于属性传递给组件
  const navigate = useNavigate(),
    location = useLocation(),
    params = useParams(),
    [usp] = useSearchParams();

  return (
    <Component
      navigate={navigate}
      location={location}
      params={params}
      usp={usp}
    />
  );
};
```

### 懒加载配置

简单的 `Loading` 文本过于简陋，因此去查看有没有组件可以使用。通过查看官方文档，最终敲定使用 `Mask` 遮罩层与 `DotLoading` 加载图标，代码如下：

```jsx
import { Mask, DotLoading } from "antd-mobile";

// ...

const RouterView = () => {
  return (
    <Suspense
      fallback={
        <Mask visible={true}>
          <DotLoading color="white" />
        </Mask>
      }
    >
      <Routes>
        {routes.map((route) => {
          let { name, path } = route;
          return (
            <Route key={name} path={path} element={<Element {...route} />} />
          );
        })}
      </Routes>
    </Suspense>
  );
};
```

修改样式：

```scss
.adm-dot-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
}
```

## 使用

在 `App.js` 根组件中引入导出的路由配置并使用，代码如下：

```js
import RouterView from "@/router/index.js";

function App() {
  return (
    <>
      <RouterView />
    </>
  );
}

export default App;
```

此时运行会报错，提示需要使用 `router` 包裹 `routes` 。在入口文件 `index.js` 中导入路由模式并包裹 `<App />` 组件，代码如下：

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
// ...

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </HashRouter>
  </React.StrictMode>
);
```

目前为止，路由模块搭建完毕。