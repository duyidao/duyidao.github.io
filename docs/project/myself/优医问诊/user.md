---
title 用户模块


---

# 用户模块

## 路由守卫

在路由跳转时，需要考虑到两个事情：

- 当前页面是否需要登录后才能进入（ `token` 判断）
- 跳转进度条（客户体验优化）
- 浏览器标题修改

综上考虑，路由守卫分为：

- 全局前置守卫

  开启进度条效果。

  全局前置守卫中获取状态管理仓库中 `token` 数据，判断要跳转的路由是否是登录后可进，创建一个白名单数组。

  如果跳转的地方在白名单内，则允许其跳转，反之则判断当前是否登录，未登录则跳转到登录页。

- 全局后置守卫

  修改浏览器标题，并关闭进度条。

代码如下所示：

```js
NProgress.configure({
  showSpinner: false
})

// 访问权限控制
router.beforeEach((to) => {
  NProgress.start()
  // 用户仓库
  const store = useUserStore()
  // 不需要登录的页面，白名单
  const whiteList = ['/login', '/404']
  // 如果没有登录且不在白名单内，去登录
  if (!whiteList.includes(to.path) && !store.user?.token) return '/login'
  // 否则不做任何处理
})

// 标题修改
router.afterEach((to) => {
  document.title = to.meta.title || '刀刀问诊'
  NProgress.done()
})
```

> 在 Vue3 中，不返回，或者 `return true` 就是放行，可以不是 `next` 函数了

## TS类型合并与取出、排出

在 typescript 中，会遇到前面声明好了一个类型，和现在需要声明的类型有一部分相同，此时会遇到两种情况：

- 有一部分是需要的。此时需要用到 `Pick` 关键字取出这些属性。代码示例如下：

  ```js
  type Person = {
    name: string
    age: number
  }
  type PickPerson = Pick<Person, 'age'>
  // PickPerson === { age: string }
  ```

- 有一部分是不需要的。此时需要用到 `Omit` 关键字取出这些属性。代码示例如下：

  ```js
  type Person = {
    name: string
    age: number
  }
  type OmitPerson = Omit<Person, 'age'>
  // OmitPerson === { name: string }
  ```

## 身份证脱敏处理

身份证脱敏处理：`/^(.{6}).+(.{4})$/`

- 匹配第一个$1 `^(.{6})`
- `.+` 匹配中间字符
- 匹配第二个$2 `(.{4})$`