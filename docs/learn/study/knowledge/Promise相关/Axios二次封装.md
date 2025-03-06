# Axios二次封装

## 基本封装部分

### 基本全局配置

如 `baseURL` ，超时时间等。

```js
let request = axios.create({
  baseURL: 'http://192.168.0.18', // 基准路径
  timeout: 9000, // 超时时间
  responseType: 'json', // 响应类型
  headers: { // 请求头
    'Content-Type': 'xxx' // 请求头设置
  },
  widthCredentials: true // 允许跨域
})
```

### 密钥

`Token` ，密钥等出于权限和安全性考虑的密钥请求头设置。一般设置在请求拦截器上，做额外的处理。

```js
let whileList = ['/a'] // 不需要验证token的白名单接口

request.intercepetors.request.use((config) => {
  
})
```

### 响应

针对不同的状态码做处理，主要针对错误请求做全局统一处理。在响应拦截器上获取到响应数据，根据状态码做处理。

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
  
  // 密钥，secretId + 特殊算法，防止仿造请求和攻击。如当前时间戳加secretId，再通md5加密，就能得出最终密钥。后端再解密判断请求即可。
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

思维导图如下所示：

![思路图](https://pic1.imgdb.cn/item/67bc313cd0e0a243d4035de8.png)

### 防止请求频繁提交

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

### 缓存

把数据保存在一个对象中（ `Map` 对象更合适），判断该对象有没有对应值，有对应值则说明有缓存，直接返回缓存即可。没有再调接口。

```js
let myRequest = (function() {
  let men = {} // [!code focus]
  let hasRequest = []
  return function(config) {
    if(men[url]) { // [!code focus]
    	return Promise.resolve(men[url]) // [!code focus]
    } // [!code focus]
    else {
      if(hasRequest.inculdes(config.url)) {
    	  return Promise.reject('请求已提交')
    	}
    	
    	hasRequest.push(config.url)
    	
    	return request({
    	  ...config
    	}).then(() => {
        // 把url地址从hasRequest数组中去掉，因为请求已经响应
    	  hasRequest = hasRequest.filter(item => {
    	    if(item !== config.url) {
    	      return item
    	    }
    	  })
        men[url] = res.data // [!code focus]
        return res.data
    	})
    }
  }
})()
```

### 优化代码

如果后面再加功能，就要再加 `if...else if` ，代码冗余且低效，因此需要优化。

优化思路：使用职责链模式，组织成一个个独立函数模块，然后循环按照顺序执行这些模块。执行一个去掉一个，直到全部执行完毕。

根据上方思路，先走缓存模块，接着走到防止重复提交模块，然后走到请求模块，接着走到接口调用次数模块，最后走到请求处理模块。代码框架调整如下所示：

但是请求一般都是异步，因此无法保证执行的顺序，需要使用 `Promise` 的 `resolve` 状态返回最后的成功处理结果，执行完毕后会返回一个新的 `Promise` ，保存这个新的 `Promise` 后再往下执行，这样就能保证执行顺序。

```js
let myRequest = (function() {
  let men = {}
  let hasRequest = []
  return function (config) {
    // 缓存模块
    function cache () {
      // ...
    }

    // 防止重复提交模块
    function noRequest () {
      // ...
    }

    // 最终请求
    function finalRequest () {
      // ...
    }

    // 最终处理模块
    function finalHandle () {
      // ...
    }

    let _handleArr = [cache, noRequest, finalRequest, finalHandle]
    while (_handleArr.length) {
      promise = promise.then(_handleArr.shift())
    }
  }
})()
```

每执行完一个步骤，返回一个对象，对象中包含：

- `go` ：是否继续执行
- `data` ：下一步要执行的数据
- `then` ：当前执行的步骤是成功还是失败

每一步（每一个函数）一开始都先判断一下，如果 `go` 为 `true` ，说明要继续执行，则执行该函数的代码；反之不需要继续执行，则 `resolve` 跳过执行该步骤函数直接返回结果。

```js
let myRequest = (function() {
  let men = {}
  let hasRequest = []
  return function (config) {
    let promise = Promise.resolve() // 每次新请求都要有一个自己的promise // [!code ++]
    // 缓存模块
    function cache (result = {go: true}) { // [!code ++]
      if (!result.go) { // [!code ++]
        return Promise.resolve(result) // [!code ++]
      } // [!code ++]
      const { url } = config // [!code ++]
      if (men[url]) { // [!code ++]
        return Promise.resolve({ go: false, type: 'then', data: men[url] }) // [!code ++]
      } else { // [!code ++]
        return Promise.resolve({ go: true, type: 'then' }) // [!code ++]
      } // [!code ++]
    }

    // 防止重复提交模块
    function noRequest (result = {go: true}) { // [!code ++]
      if (!result.go) { // [!code ++]
        return Promise.resolve(result) // [!code ++]
      } // [!code ++]
      if (hasRequest.inculdes(config.url)) { // [!code ++]
        return Promise.reject({go: false, data: '请求已提交', type: 'catch'}) // [!code ++]
      } else { // [!code ++]
        hasRequest.push(url) // [!code ++]
        return Promise.resolve({ go: true, type: 'then' }) // [!code ++]
      }
    }

    // 最终请求
    async function finalRequest (result = {go: true}) { // [!code ++]
      if (!result.go) { // [!code ++]
        return Promise.resolve(result) // [!code ++]
      } // [!code ++]
      let resData = await request({...config}) // [!code ++]
      return Promise.resolve({go: true, type: 'then', data: resData}) // [!code ++]
    }

    // 最终处理模块
    function finalHandle (result = {go: true}) { // [!code ++]
      if (!result.go) { // [!code ++]
        return Promise.resolve(result) // [!code ++]
      } // [!code ++]
      if(result.type==='catch') { // [!code ++]
        return Promise.reject(result.data) // [!code ++]
      } // [!code ++]
      men[config.url] === result.data // [!code ++]
    }

    let _handleArr = [cache, noRequest, finalRequest, finalHandle]
    while (_handleArr.length) {
      promise = promise.then(_handleArr.shift())
    }
  }
})()
```

通过这个方法，一环扣一环的形式，不仅代码可阅读性强，可拓展性强，还能够快速定位到对应的方法中。

查看代码，发现每一个函数内都有一个 `result.go` 的 `if` 判断，这种重复性的代码可以考虑提取出来优化一下。代码如下：

```js
let myRequest = (function() {
  let men = {}
  let hasRequest = []
  return function (config) {
    let promise = Promise.resolve() // 每次新请求都要有一个自己的promise
    // 缓存模块
    function cache (result = {go: true}) {
      if (!result.go) { // [!code --]
        return Promise.resolve(result) // [!code --]
      } // [!code --]
      const { url } = config
      if (men[url]) {
        return Promise.resolve({ go: false, type: 'then', data: men[url] })
      } else {
        return Promise.resolve({ go: true, type: 'then' })
      }
    }

    // 防止重复提交模块
    function noRequest (result = {go: true}) {
      if (!result.go) { // [!code --]
        return Promise.resolve(result) // [!code --]
      } // [!code --]
      if (hasRequest.inculdes(config.url)) {
        return Promise.reject({go: false, data: '请求已提交', type: 'catch'})
      } else {
        hasRequest.push(url)
        return Promise.resolve({ go: true, type: 'then' })
      }
    }

    // 最终请求
    async function finalRequest (result = {go: true}) {
      if (!result.go) { // [!code --]
        return Promise.resolve(result) // [!code --]
      } // [!code --]
      let resData = await request({...config})
      return Promise.resolve({go: true, type: 'then', data: resData})
    }

    // 最终处理模块
    function finalHandle (result = {go: true}) {
      if (!result.go) { // [!code --]
        return Promise.resolve(result) // [!code --]
      } // [!code --]
      if(result.type==='catch') {
        return Promise.reject(result.data)
      }
      men[config.url] === result.data
    }

    let _handleArr = [cache, noRequest, finalRequest, finalHandle]
    while (_handleArr.length) {
      let _fn = _handleArr.shift() // [!code ++]
      function _final (result = {go: true}) { // [!code ++]
        if (!result.go) { // [!code ++]
          return Promise.resolve(result) // [!code ++]
        } // [!code ++]
        return _fn.call(this, result) // [!code ++]
      } // [!code ++]
      promise = promise.then(_handleArr.shift())
    }
  }
})()
```
