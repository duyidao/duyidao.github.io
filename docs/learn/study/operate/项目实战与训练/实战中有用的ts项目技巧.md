# 实战中有用的 TypeScript 项目技巧

## 第三方库处理技巧

ts 非常核心的作用就是帮助我们在开发的时候减少拼写，缺少必填项这样的错误。所以在使用一些第三方库时也希望能规定好类型。

### **引入一个第三方库的方法、组件或对象，怎么取出这个方法、组件、对象的 ts 类型呢？**

以 `vue-router` 和 `vscode` 编辑器为例，在路由文件中鼠标悬停在 `createRouter` 方法上，按住 `ctrl` 键，鼠标单击左键，可以跳转到 `createRouter` 方法的类型注释上。

```js
export declare function createRouter(options: RouterOptions): Router;
```

可以看出这个方法接收一个类型为 `RouterOptions` 的参数，返回一个类型为 `Router` 的对象。想要进一步看 `RouterOptions` 有啥东西，鼠标悬停在 `RouterOptions` 上，按住 `ctrl` 键，鼠标单击左键，可以跳转到 `RouterOptions` 的类型注释上。

```js
export declare interface RouterOptions extends PathParserOptions {
  history: RouterHistory;
  routes: Readonly<RouterRecordRaw[]>;
  parseQuery?: typeof parseQuery;
  // ...
}
```

这些有什么用呢？`vue-router` 有一个方法 `addRoute` 可以添加路由规则，这个路由规则类型必须要正确才能生效，想要获取正确的路由规则类型，可以用上面的方法查看 `RouterOptions` 中的 `routes` 属性，这个属性的类型是 `Readonly<RouterRecordRaw[]>`，一路点击跳转到对应的方法、属性上，就能看到需要的类型了。也能引入这些规则，为自己的方法函数参数绑定类型说明。

```js
import type { RouteRecordRaw, Router } from "vue-router";

function addRouterFn(routerConfig: RouteRecordRaw[], router: Router) {
  routerConfig.forEach((route) => {
    router.addRoute(route);
  });
}
```

### **使用 `pinia` 时，避免自己写错**

在例如 `pinia` 仓库，多人开发想要定义批量仓库编写时第二个函数参数返回的类型，可以用 ts 定义好。后续团队成员引入就能使用了，如果他们不按要求返回需要的变量方法，或者方法变量类型不正确，都会报错。

::: code-group

```js [storeType.ts]
import { ref, type Ref } from "vue";

export interface UserInfoType {
  name: string;
  age: number;
}

export type useUserInfoStoreType = () => {
  userInfo: Ref<UserInfoType>,
  setUserInfo: (info: UserInfoType) => void,
};
```

```js [userInfo.ts]
import { defineStore } from "pinia";
import type { UserInfoType, useUserInfoStoreType } from "./storeType";

let storeFn: useUserInfoStoreType = () => {
  const userInfo =
    ref <
    UserInfoType >
    {
      name: "张三",
      age: 18,
    };

  const setUserInfo = (info: UserInfoType) => {
    userInfo.value = info;
  };

  return {
    userInfo,
    setUserInfo,
  };
};

export default defineStore("userInfo", storeFn);
```

:::

## 基于已有类型快速处理新类型

通常对接口的返回需要编写 ts，但是后续在接口返回数据使用中，往往需要根据需要生成一些次级类型。

### 接口返回一个粉丝列表，一个用户信息，用两个 ref 变量分别存储

类型一般需要两个，接口的返回 ts 类型，请求接口的参数 ts 类型。组件中引入需要的类型，此时就遇到问题了，组件中分别申请两个变量存储粉丝列表和个人信息对象，但是接口定义类型时它是一个对象中，此时直接赋值会报错，如何给它们单独从接口返回类型中取出对应类型呢？

解决方案为：使用中括号 `[]` 取出对象中的属性即可。

::: code-group

```js [api.ts]
imterface api1Res {
  fansList: {
    fansName: string,
    fansYear: string
  }[],
  myInfo: {
    name: string,
    type: string
  }
}
interface api1Req {
  id: string
}

export function getApi1(data: api1Req) {
  return axios.post<api1Res>('/api1', data);
}
```

```vue [App.vue]
<script setup>
import { getApi1, type api1Res } from "./api";

const fansList = ref < api1Res["fansList"] > [];
const myInfo = ref < api1Res["myInfo"] > {};

getApi1({ id: "123" }).then((res) => {
  fansList.value = res.data.fansList;
  myInfo.value = res.data.myInfo;
});
</script>
```

:::

### 定义枚举，有时需要说明某个类型是这些枚举中的某一个

大厂前端一般会定义一个枚举，存储属性类型字典。

```js
export const UserTypeMap = {
  sing: "sing",
  dancer: "dancer",
};
```

这么做的好处是，如果后端后续修改了属性字段，如上方例子，后端把 `sing` ，改成了 `singer` ，此时前端没有做枚举而是直接判断，会有很多地方需要修改。而使用枚举字典，只需要修改字典即可，前端代码不需要修改。

::: code-group

```vue [无字典.vue]
<template>
  <div v-if="userType === 'sing'">...</div>
  <div v-if="userType === 'sing'">...</div>
  <div v-if="userType === 'sing'">...</div>
  <div v-if="userType === 'sing'">...</div>
  <div v-if="userType === 'sing'">...</div>
  <div v-if="userType === 'sing'">...</div>
</template>
```

```vue [有字典.vue]
<template>
  <div v-if="userType === UserTypeMap.sing">...</div>
  <div v-if="userType === UserTypeMap.sing">...</div>
  <div v-if="userType === UserTypeMap.sing">...</div>
  <div v-if="userType === UserTypeMap.sing">...</div>
  <div v-if="userType === UserTypeMap.sing">...</div>
</template>
```

:::

如果想要使用枚举中每一个类型属性，可以使用 `keyof` 操作符和 `typeof` 的组合快速实现枚举类型提取。

> [!IMPORTANT] 拓展
> `typeof` 操作符可以快速把一个对象转换为一个 `ts` 类型；`keyof` 可以把这个类型所有的 `key` 值取出来

```js [api.ts]
import { UserTypeMap } from './userTypeMap'; // [!code ++]
type type1 = keyof typeof UserTypeMap; // type1 = 'sing' | 'dancer' // [!code ++]

imterface api1Res {
  fansList: {
    fansName: string,
    fansYear: string
  }[],
  myInfo: {
    name: string,
    type: string // [!code --]
    type: keyof typeof UserTypeMap // [!code ++]
  }
}
interface api1Req {
  id: string
}

export function getApi1(data: api1Req) {
  return axios.post<api1Res>('/api1', data);
}
```

### 取出接口返回的某几个属性作为一个对象，这个对象类型怎么更好的声明

假设有两个对象 `obj1` 和 `obj2` ，`obj1` 有四个属性类型，而 `obj2` 只需要 `obj1` 中的两个属性类型，直接复制太麻烦，此时如何快速声明 `obj2` 的类型呢？

可以使用 `Omit` 操作符，`Omit` 可以快速把一个对象中的某些属性剔除掉。

```js
type obj1 = {
  name: string,
  age: number,
  sex: string,
  height: number,
};

type obj2 = Omit<obj1, "age" | "sex">; // obj2 = { name: string, height: number }
```

> [!IMPORTANT] 拓展
> `Pick` 和 `Omit` 作用相反，`Pick` 是取出对象中的某些属性，`Omit` 是剔除对象中的某些属性。
>
> ```js
> type obj2 = Pick<obj1, "name" | "height">; // obj2 = { name: string, height: number }
> ```
>
> 如何选取取决于要拿到的属性多不多，如果是在一个很多属性的类型获取其中几个，`Pick` 速度更快，如果是在很多属性的类型剔除其中几个获取剩下的，`Omit` 速度更快。
