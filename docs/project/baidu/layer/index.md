---
title 图层

---

# 图层

## 概括

该项目从以下几方面进行梳理和总结：

- [样式](/project/baidu/layer/样式.md)
- [规范](/project/baidu/layer/规范.md)
- [封装](/project/baidu/layer/封装.md)
- [MapVThree](/project/baidu/layer/MapVThree.md)
- [优化](/project/baidu/layer/优化.md)
- [功能](/project/baidu/layer/功能.md)

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

## Poc迁移

Poc迁移实质上就是把这个广东省数据的项目迁移一份给北京总部那边。由于项目是 Vue2.7 版本的项目，因此会遇到一些 Vue2.7 的写法。此模块用于记录使用 Vue2.7 `setup` 语法的写法。

### v-model语法糖

在 Vue2 中，`v-model` 语法糖实际上是通过 `:value="value"` 和 `@input="value = $event.target.value"` ；在 Vue3 中，`v-model` 语法糖实际上是通过 `:moduleValue` 和 `@update:modelValue="message = $event"` 。

在 Vue2.7 中，想要实现 `v-model` 语法糖功能，需要以下几步：

1. 子组件 `export default` 中设置 `model` 对象，其中有两个参数：`prop: value` 为需要绑定的值，`event: update:value` 为方法名称
2. 子组件在修改值时调用 `update:value` 方法
3. 父组件 `v-model` 绑定数据

父组件代码如下：

```vue
<son v-model="value" />
```

子组件代码如下：

```vue
<template>
	<div>
    {{ value }}
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  model: {
      prop: 'value',
      event: 'update:value',
  },
  setup() {
    function update(value) {
      emit('update:value', value);
    }
  }
}
</script>
```

### 侦听器

在项目中，我在外部声明了一个变量 `const type = ref(false)` ，在使用 Vue2 写法的组件中 `import` 导入，在 `watch` 中侦听，代码如下：

```vue
<script>
import {type} from '@/store/index.js'
export default {
  watch: {
    type: function(newVal) {
      console.log(newVal)
      this.fn()
    }
  },
  methods: {
    fn() {
      // ...
    }
  }
}
</script>
```

结果无法触发侦听，如果写在 `setup` 中则无法通过 `this` 调用 `fn` 函数。

Vue2.7 中，`this` 可以调用 `$watch` 方法侦听，效果与 `watch` 是一样的。不仅能够侦听到 `ref` 声明的变量，同时也能通过 `this` 调用 `data` 或 `method` 内的变量方法。

代码如下所示：

```js
import {type} from '@/store/index'
export default {
  created() {
    this.$watch(() => type.value, (newVaal) => {
      console.log(newVal)
    })
  }
}
```

### 父组件使用子组件变量方法

在 Vue2 中，父组件使用子组件方法可以通过 `this.$refs.xxx` 方式获取；在 Vue3 中，需要子组件 `defineExporse` 中暴露出去才可使用。

在 Vue2.7 中，如果使用 `setup` 的方式，需要在 `return` 中暴露出去；如果使用选项式 API，无需其他操作。

父组件代码如下：

```vue
<son ref="sonRef" />

<script>
import {ref, nextTick} from 'vue'
export default {
  setup() {
    const sonRef = ref(null)
    
    nextTick(() => {
      console.log(sonRef.value.xxx)
    })
    
    return {
      sonRef
    }
  }
}
</script>
```

