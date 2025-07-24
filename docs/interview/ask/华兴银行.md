# 华兴银行

## 一面

### Q：项目有没有做过预加载等优化？

### Q：有三个接口，需要一起请求下来后做展示，该怎么做？

> 我的回答
>
> `Promise.all` 或 `Promise.allSelected`

### Q：`Promise.all` 和 `Promise.allSelected` 的区别？

> 我的回答
>
> `Promise.all` 要求所有接口都请求成功，才会返回结果，否则返回第一个失败的接口结果
>
> `Promise.allSelected` 只要有一个接口请求成功，就会返回结果，否则返回第一个失败的接口结果

### Q：怎么和 async await 特性结合使用？

> 我的回答
>
> `await` 后面跟 `Promise.all`

::: details Deepseek 的回答
```js
async function getAllData(shouldFail = false, useTimeout = false) {
  try {
    // 并行执行多个异步操作
    const results = await Promise.all([
      fetchData('users', 800),
      fetchData('products', 600),
      fetchData('orders', 1000)
    ]);
    // 处理结果...
    return results;
  } catch (error) {
    // 统一错误处理
    console.error('请求失败:', error);
    throw error;
  }
}
```
:::

### Q：预处理器全局变量有没有用过？用来做什么？

> 我的回答
>
> 有，用来做主题色切换

### Q：有没有做过国际化？怎么实现的

> 我的回答
>
> 有，通过 `vue-i18n` 实现，思路是 每一个语言文字都有对应的 key，通过 key 获取对应的文字

### Q：有没有做过微服务？

### Q：有没有用过vite构建过项目？和webpack有啥区别？

### Q：用过哪些ES6数组新特性？

### Q：Vue3 有没有封装过 Hook？

### Q：一张图项目扎点有没有做过优化？比如说有没有出现在视口内再渲染？

### Q：地图有没有什么交互？

### Q：代码库分支怎么处理的？

### Q：有没有很多个版本分支？比如同时有7月上线版和8月上线版？

### Q：有没有遇到过冲突？冲突怎么解决？