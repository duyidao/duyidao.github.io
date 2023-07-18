# 项目创建

## 前置工作

### SVG转换

把图片转为 SVG 格式，在线转换网址推荐：[svg转换]([在线转换图像文件 (aconvert.com)](https://www.aconvert.com/cn/image/)) 。

### 默认样式清除文件

前往 NPM 官网搜索 [reset.scss]([reset.scss - npm (npmjs.com)](https://www.npmjs.com/package/reset.scss)) 清除默认样式文件，复制代码保存在 `style` 文件夹下。

## 项目配置

### 浏览器自动打开

找到 package.json 配置文件：

```json
"scripts": {
  "dev": "vite --open",
  //...
 },
```

### src 别名的配置

找到 vite.config.ts 配置文件。

**如果红色语法提示请安装@types/node 是 TypeScript 的一个声明文件包，用于描述 Node.js 核心模块和常用的第三方库的类型信息**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
 plugins: [vue()],
 resolve: {
  alias: {
   "@": path.resolve(__dirname, 'src')
  }
 }
})
```

找到 `tsconfig.json` 配置文件,找到配置项 compilerOptions 添加配置,这一步的作用是让 IDE 可以对路径进行智能提示：

```js
"baseUrl": ".",
"paths": {
   "@/*": ["src/*"]
}
```

### 清除默认样式

1. 下载 `scss` 样式预处理器

   ```
   yarn add scss
   ```

2. 入口文件引入清除默认样式文件

   ```js
   import './style/reset.scss'
   ```

