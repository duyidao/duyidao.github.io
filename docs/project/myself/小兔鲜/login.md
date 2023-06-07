# 登录

## 持久化

插件官网指路：[pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/why.html)

首先下载插件：

```js
yarn add pinia-plugin-persistedstate
```

然后在入口文件中导入并注册持久化插件

```js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

pinia.use(piniaPluginPersistedstate)
```

然后返回 `store` 中使用，使用方式为在 `defineStore` 方法中传入第三个参数，如下：

```js
export const useUserStore = defineStore('user', () => {
  // ...
}, {
  persist: true
})
```

原理：

插件会在开启本地存储需求后帮我们把`state` 数据保存到本地中。