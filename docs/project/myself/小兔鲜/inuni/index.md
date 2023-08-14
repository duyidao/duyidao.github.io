# 项目初始化

## 项目创建

### hbuilder 创建

1. 下载 `hbuilder` ，官网指路：[hbuilder](https://www.dcloud.io/hbuilderx.html)

2. 新建项目，选择默认模板即可，版本选择 `Vue3`

3. 点击运行，选择微信小程序运行

   如果是第一次运行，他需要使用者给出微信小程序开发工具下载的路径地址，用于开启微信开发者工具。

   如果是初次运行且没打开微信开发者工具，他会报错，提示还没打开，打开即可。

   如果需要预览，需要配置 APPID ，在 `mainifets.json` 文件中的微信小程序配置添加。

4. 通过 `HBuilderX` 修改代码，通过微信开发者工具调试页面效果

### 命令行创建

使用命令行创建 `vue3 + ts` 项目步骤如下：

1. 输入命令行

   ```
   npx degit dcloudio/uni-preset-vue#vite-ts 项目名
   ```

2. 配置微信开发工具地址、配置 APPID 等操作（和上面一样）

3. 启动终端（首次使用需要先安装插件），再下载依赖

   ```
   npm i
   #or
   yarn
   # or
   pnpm i
   ```

4. 通过命令启动项目

   ```
   npm run dev:mp-weixin
   # or
   yarn dev:mp-weixin
   # or
   pnpm dev:mp-weixin
   ```

5. 启动项目成功后会在根目录下新增一个 `dist` 文件夹，打开微信开发者工具，导入 `dist/dev/mp-weixin` 文件夹，起一个项目名称，即可启动项目
