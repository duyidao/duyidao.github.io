---
title 登录模块

---

# 登录模块

## 路由回退

登录页面顶部导航了允许点击左侧的箭头返回上一页，此时需要判断当前路由栈是否有历史路由。如果有，返回上一个路由即可；如果没有，则直接返回到首页。

代码如下所示：

```js
// 判断历史记录中是否有回退
if (history.state?.back) {
  router.back()
} else {
  router.push('/')
}
```

## 组件类型

想要实现组件也有 typescript 类型，在使用时能够给予事件、属性提示，可以给组件添加类型。

添加类型方法分为如下几步：

1. 写一个组件类型声明文件（以 `.d.ts` 为后缀），`declare module 'vue'` 声明一个 vue 类型模块
2. 然后 `interface GlobalComponents` 书写全局组件的类型
3. key组件名称支持大驼峰，value是组件类型,通过 typeof 组件实例得到

代码如下所示：

```js
import MyNavBar from '@/components/MyNavBar.vue'

declare module 'vue' {
  interface GlobalComponents {
    MyNavBar: typeof MyNavBar
  }
}
```

