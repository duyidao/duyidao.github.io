# 垃圾回收与console.log内存泄漏

## 垃圾回收

## console.log导致内存泄漏

`console.log` 在调试的时候非常方便，但是在 `eslint` 中会有报错或警告，这是因为 `console.log` 一般用于调试信息，而这些信息不建议在客户端打印。

但是很多人都忽视了，`console.log` 也会造成内存泄漏问题。一个程序在运行完毕后是会把其中的变量内存销毁，但是当你添加了打印，它需要**保持控制台的对象引用**，因此就会造成内存泄漏。

下面分别看两个例子，首先是无 `console.log` 的情况：

![无console.log](https://pic.imgdb.cn/item/65f85a679f345e8d033e6128.png)

下面是添加了 `console.log` 后的内存：

![](https://pic.imgdb.cn/item/65f85b5d9f345e8d0344da8a.png)

可以看到，有很多数据内存没被回收，因此造成内存泄漏。

在生产环境推荐把所有 `console.log` 干掉，手动一个个删除固然可以，但是麻烦。可以借助 `terser` 第三方库帮我们减少手动操作部分。

如果是 `vue-cli` 配置的项目，它内部已经支持该工具的使用，无需再 `npm i` 引入。在 `vue.config.js` 文件中做相应的配置处理。

```js
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    terser: {
        terserOptions: {
            // 压缩的方式
            compress: {
                drop_console: true,
                drop_debugger: true,
            }
        }
    }
})
```

如果项目用的是 Vue3 的 `vite` ，也是可以做到的。在 `vite.config.js` 文件做相应的配置即可。

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugin: [vue()],
    build: {
        minify: 'terser',
        terserOptions: {
            // 压缩的方式
            compress: {
                drop_console: true,
                drop_debugger: true,
            }
        }
    }
})
```

注意的是，`vite` 没有内置该库，因此需要先引入。

```bash
npm i terser
```