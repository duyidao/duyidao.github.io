---
title: 音果云音无感刷新
titleTemplate: 音果云音无感刷新
description: 音果云音 无感刷新 TOKEN
head:
  - - meta
    - name: description
      content: 音果云音无感刷新
  - - meta
    - name: keywords
      content: 音果云音 无感刷新 TOKEN
pageClass: lingsi-music-token
tags: token,access,refresh
---

# 无感刷新

## 核心原理与流程

通常采用 双 Token 机制：


- Access Token：短效（如 2 小时），用于请求接口。
- Refresh Token：长效（如 7 天），专门用于换取新的 Access Token。

交互流程如下：

1. 前端请求接口，携带 Access Token。
2. 后端验证失败（返回 401），告知 Token 过期。
3. 前端拦截 401 响应，暂停当前请求。
4. 前端检查是否正在刷新 Token：
  
     - 是：将当前请求加入队列，等待刷新完成。
     - 否：调用刷新接口，获取新 Access Token。

5. 刷新成功后：

     - 更新本地存储的 Token。
     - 取出队列中的请求，修改 Header 中的 Token，重试。
     - 重试当前请求。
     - 如果刷新也失败（如 Refresh Token 也过期），则强制退出登录，跳转登录页。

## 代码实现思路

```ts
// request.ts (简化版示例)
import axios from 'axios'
import { refreshTokenApi } from './api' // 刷新接口

let isRefreshing = false // 是否正在刷新中
let requestQueue: any[] = [] // 请求队列
let newToken = // ... 新 Token

// 1. 响应拦截器
service.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error
    const originalRequest = config

    // 2. 判断是否是 401 错误 且 不是刷新接口的请求
    if (response && response.status === 401 && !originalRequest._retry) {
      
      // 标记当前请求已重试过，防止死循环
      originalRequest._retry = true

      if (isRefreshing) {
        // 3. 如果正在刷新，将当前请求加入队列
        return new Promise((resolve) => {
          requestQueue.push(() => {
            // 队列中的请求拿到新 token 后重试
            originalRequest.headers['Authorization'] = 'Bearer ' + newToken
            resolve(service(originalRequest))
          })
        })
      }

      // 4. 如果没在刷新，开始刷新
      isRefreshing = true
      try {
        const { data } = await refreshTokenApi() // 调用刷新接口
        newToken = data.accessToken
        
        // 5. 更新本地 Token (Vuex/Pinia/LocalStorage)
        setToken(newToken) 
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken

        // 6. 执行队列中的请求
        requestQueue.forEach(cb => cb())
        requestQueue = [] // 清空队列
        
        return service(originalRequest) // 重试当前请求
      } catch (refreshError) {
        // 7. 刷新失败（如 Refresh Token 也过期），退出登录
        logout() 
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)
```

## 重难点

### 多个请求同时过期怎么办？（并发问题）

答：如果页面初始化时并发发了 5 个请求，同时返回 401，不能触发 5 次刷新接口。
解决方案：使用 `isRefreshing` 标志位。第一个请求发现过期触发刷新，后续请求发现 `isRefreshing === true`，则放入 `requestQueue` 队列等待。

### 队列中的请求怎么重试？

答：队列里存的不是请求本身，而是一个回调函数 (Callback)。当刷新成功后，遍历队列执行回调，回调内部会重新发起请求（此时 Header 已更新为新 Token）。

### 如何防止死循环？

答：给请求配置加一个自定义标记（如 `_retry`）。刷新后重试请求时，标记为 `true`。如果重试后依然 401，说明新 Token 也无效，直接退出，不再次触发刷新。

### 刷新接口本身 401 了怎么办？

答：说明 Refresh Token 也失效了（可能被盗或彻底过期）。此时不应再重试，应直接清除本地用户信息，强制跳转登录页。

### 安全性考虑？

答：

- Token 存储建议：优先内存，其次 HttpOnly Cookie，尽量避免 localStorage（防 XSS）。
- 刷新接口需要防重放攻击（后端处理）。
- 多标签页同步：如果开了多个标签页，一个页签刷新了 Token，其他页签需要感知（可用 storage 事件或 BroadcastChannel）。
