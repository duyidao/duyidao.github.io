# Axios二次封装

## 基本封装部分

### 基本全局配置

如 `baseURL` ，超市时间等

### 密钥

`Token` ，密钥等出于权限和安全性考虑的密钥请求头设置

### 响应

针对不同的状态码做处理，主要针对错误请求做全局统一处理

### 请求封装

把对接口的请求封装为一个方法

### 代码示例

```js
// 全局基础配置
import axios from 'axios'

// 后面的请求都是用该变量来发
let request = axios.create({
    baseURL: 'http://192.168.0.18', // 基准路径
    timeout: 9000,
    responseType: 'json',
    headers: {
        'Content-Type': 'xxx'
    }
})

// 请求拦截器
const whileList = ['/a'] // 白名单
const secretId = 'daodao' // 密钥假设
request.intercepetors.request.use((config) => {
    // token请求头设置。可设置一个白名单，如果不需要token可放到白名单内
    const token = localStorage.getItem('token')
    const url = config.url
    if(!whileList.includes(url) && token) {
        config.headers.token = token
    }
    
    // 密钥，secretId + 特殊算法，防止仿造请求和攻击。如当前时间戳加secretId，再通过md5加密，就能得出最终密钥。后端再解密判断请求即可。
    let secretKey = secretId + new Date().toString()
    config.headers.secretKey = secretKey
}, error => {
    // 失败请求，返回即可
    return Promise.reject(new Error(error))
})

// 响应拦截器
request.intercepetors.response.use(() => {
    // 响应统一处理
    const status = res.data.code || 200 // 状态码
    const message = res.data.message || '未知错误' // 错误信息
    
    switch(status) {
        case 401:
        case 403:
            alert('暂无权限')
            router.push('/login')
            break;
        default:
            break;
    }
}, error => {
    // 响应失败，真实项目中往往使用的是组件库的消息提示弹出提示。这里用alert代替
    alert(error)
    return Promise.reject(new Error(error))
})
```

## 扩展

1. 防止请求频繁提交
2. 缓存数据

### 防止请求频繁提交

#### 实现思路

1. 通过闭包的特性声明一个数组，发送请求后往该数据内塞该请求的值
2. 下次发请求时判断数组内是否有该值，有值则不发请求
3. 请求发送成功后把该值删掉

```js
let myRequest = (function() {
    let hasRequest = []
    return function(config) {
        if(hasRequest.inculdes(config.url)) {
            return Promise.reject('请求已提交')
        }
        
        hasRequest.push(config.url)
        
        return request({
            ...config
        }).then(() => {
            hasRequest = hasRequest.filter(item => {
                if(item !== config.url) {
                    return item
                }
            })
            return res.data
        })
    }
})()
```

