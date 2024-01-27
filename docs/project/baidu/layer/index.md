# 图层

# 概括

该项目从以下几方面进行梳理和总结：

- [样式](/project/baidu/layer/样式.md)
- [规范](/project/baidu/layer/规范.md)
- [封装](/project/baidu/layer/封装.md)
- [MapVThree](/project/baidu/layer/MapVThree.md)
- [优化](/project/baidu/layer/优化.md)

## 项目结构

项目结构主要如下：

```js
|-examples // 图层的根组件
	|--App.vue // 整个图层的根组件
	|--views // 每个图层的根组件
|-publib // 存放公共资源
	|--assets
  	|--images // 图片
    |--css // 样式
		|--modules // 模型数据
|-src
	|--assets // 图片资源
	|--conpoments // 组件（公共部分与各自图层）
	|--router // 路由
	|--store // 多组件使用的方法与变量
	|--utils // 公共方法封装
|-script // 打包设置与简写设置
|-.env.development // 开发环境的配置
|-.env.test // 测试环境打包的配置
|-index.html // 主页面
|-vite.config.js // 文件夹路径简写和跨域代理
```

本项目是一个项目包含多个图层，每个图层使用到的方法会有相同的地方，但也会有各自不同的方法。因此需要做封装处理，封装时也需要考虑到易用性、复用性和可拓展性。
