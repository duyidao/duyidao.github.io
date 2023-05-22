# 项目创建

首先创建一个 `vite + vue3` 项目，命令如下：

```
npm init vue@latest
```

设置项目名称，使用 `pinia` 、`router` ，其余都选择 `No` 。

[![p9I9xyD.md.png](https://s1.ax1x.com/2023/05/21/p9I9xyD.md.png)](https://imgse.com/i/p9I9xyD)

## 配置基础文件夹

文件夹配置如下如所示

[![p9Ikm3q.png](https://s1.ax1x.com/2023/05/21/p9Ikm3q.png)](https://imgse.com/i/p9Ikm3q)

## 前置配置

### @别名

1. 在项目根目录下新值 `jsconfig.json` 文件

2. 添加 `json` 格式的配置项

   ```js
   {
     "compilerOptions": {
       "baseUrl": "./",
       "paths": {
         "@/*": [
           "src/*"
         ]
       }
     }
   }
   ```

> 注意
>
> 这里仅作代码识别提示，真正转换是在 `vite.config.js` 下的 `resolve` 模块。例如我需要添加一个 `@api` 指向 `src/apis` 的文件夹，则需要在 `json` 文件中添加 `@api` 的提示。
>
> ```js
> {
>   "compilerOptions": {
>     "baseUrl": "./",
>     "paths": {
>       "@/*": [
>         "src/*"
>       ],
>       "@api/*": [
>         "src/apis/*"
>       ]
>     }
>   }
> }
> ```
>
> `vite.config.js` 下做相应的配置。
>
> ```js
> alias: {
>   '@': fileURLToPath(new URL('./src', import.meta.url)),
>   '@api': fileURLToPath(new URL('./src/apis', import.meta.url))
> }
> ```
>
> 重启项目刷新配置查看效果。

### element-plus

按需导入的方法安装组件库 `element-plus` 。

1. 安装

   ```
   yarn add element-plus
   ```

2. 安装按需导入的插件

   ```
   yarn add -D unplugin-vue-components unplugin-auto-import
   ```

3. 在 `vite.config.js` 中配置

   ```js
   // ...
   
   // element-plus按需导入
   import AutoImport from 'unplugin-auto-import/vite'
   import Components from 'unplugin-vue-components/vite'
   import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
   
   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [
       vue(),
       // ...
       AutoImport({
         resolvers: [ElementPlusResolver()],
       }),
       Components({
         resolvers: [ElementPlusResolver()],
       }),
     ],
     resolve: {
       // ...
     }
   })
   ```

复制组件运行代码，生效即为成功。