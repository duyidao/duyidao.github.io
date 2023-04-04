## 项目创建

### 软件安装

**NODE**

请先访问 https://nodejs.org/zh-cn/ 安装 `NODE`（安装LTS版本即可）

**淘宝镜像**

使用 [淘宝镜像](https://developer.aliyun.com/mirror/NPM?from=tnpm) 可以快速安装 `NPM` 依赖包

```js
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

**yarn**

`Yarn` 是与 `npm` 类似的包管理工具，Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。

安装 yarn

```js
npm install -g yarn
```

### 创建项目

**vite**

下面是使用 vite 构建基于 `vue-ts` 模板的项目 `houdunren`

```js
yarn create vite houdunren --template vue-ts
```

## 跨域请求

跨越请求的主要问题是携带 `cookie`，下面我们来解决 `vue` 的跨越请求问题。

以下示例环境为：后台 `daodao.test`，前台为 `localhost:3000` 。

### 代理方式

如果后台要使用`cookie` 进行权限验证。这时就需要前台可以传递`cookie`，我们使用前台代理完成这个功能，使用这种方式后台不需要什么配置。

### axios

请求一般使用 `axios` 发送，下面是对 `url` 的基本配置

> 不需要设置 `axios` 的 `withCredentials` 属性为 `true` 。

```js
//请求拦截
instance.interceptors.request.use(
  function (config) {
  	//如果请求不是以 / 开始时添加 /api 前缀
    config.baseURL = config.url[0] == '/' ? '' : '/api'
...    
```

### vite

下面是重点即在 **vite.config.js** 中配置代理，最终将实现通过 `http://daodao.test/api`访问后台，解决跨越的问题。

```js
export default defineConfig({
  ...
  //开发环境设置
  server: {
      proxy: {
      	//laravel 中获取 csrf-token 的接口
        '/sanctum': {
            //将/api访问转换为target
            target: 'http://houdunren.test/sanctum',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/sanctum/, ''),
          },
         '/api': {
              //将/api访问转换为target
              target: 'http://houdunren.test/api',
              //跨域请求携带cookie
              changeOrigin: true,
              //url 重写删除`/api`
              rewrite: path => path.replace(/^\/api/, ''),
          },
      },
  },
})
```

### laravel

因为上面是使用代理解决跨域问题，所以如果后台使用 `laravel` 不需要进行配置。下面对几个文件进行说明

**.env**

修改 `.env` 来对域名等进行配置

```js
APP_URL=http://houdunren.test
```

**config/cors.php**

因为上面使用代理操作，所以需要把 `supports_credentials` 设置为 `false`

```js
'paths' => ['api/*', 'sanctum/csrf-cookie'],

'allowed_methods' => ['*'],

'allowed_origins' => ['*'],

'allowed_origins_patterns' => [],

'allowed_headers' => ['*'],

'exposed_headers' => [],

'max_age' => 0,

'supports_credentials' => false,
```

**config/sanctum.php**

因为前台使用 `localhost:3000` 所以要保证该域名存在

```js
...
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
    '%s%s',
    'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
    env('APP_URL') ? ',' . parse_url(env('APP_URL'), PHP_URL_HOST) : ''
))),
...
```

### csrf-token

因为是使用 `cookie` 请求 `laravel` 所以后台会进行 `csrf` 验证，需要先获取 `csrf-token` 的 `cookie`。`axios` 等框架会自动携带这个 `cookie` 完成后台的 `csrf` 验证。

下面是登录操作的代码

```js
...
const login = async () => {
    axios.get('/sanctum/csrf-cookie').then(async response => {
        await axios.login(form)
        ...
    })
}
...
```

下面是 `loginController` 控制器文件，我们以 `api/login` 路由访问。需要使用 **web** 的 **guard** 完成 `session` 登录。

```js
...
Auth::guard('web')->login($user);
...
```