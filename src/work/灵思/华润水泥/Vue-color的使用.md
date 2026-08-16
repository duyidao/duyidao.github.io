# Vue-color 的使用

水泥项目有一个需求：提供颜色选择器给用户选择颜色，旁边能还让用户看到预览颜色及其 `rgb` 内容。根据搜寻最后找到插件 <word text="vue-color" /> 。Github 官方文档地址为： [vue-color](https://hub.nuaa.cf/xiaokaike/vue-color) 。

## 引入插件

::: code-group

```sh [npm]
npm i vue-color
```

```sh [yarn]
yarn add vue-color
```

```sh [pnpm]
pnpm i vue-color
```

:::

## 使用

1. 导入下载好的插件

   在项目中新建一个测试页面 `test.vue` ，导入相对应的模块

   ```js
   import {
     Photoshop,
     Chrome,
     Sketch,
     Slider,
     Swatches,
     Compact,
     Material,
   } from 'vue-color'
   ```

2. 注册组件并使用
   - 设置默认显示的颜色
   - 引入组件并注册
   - 使用

   ```vue
   <template>
     <div class="vueColor">
       <material-picker v-model="colors" />
       <compact-picker v-model="colors" />
       <swatches-picker v-model="colors" />
       <slider-picker v-model="colors" />
       <sketch-picker v-model="colors" />
       <chrome-picker v-model="colors" />
       <photoshop-picker v-model="colors" />
     </div>
   </template>

   <script>
   import {
     Photoshop,
     Chrome,
     Sketch,
     Slider,
     Swatches,
     Compact,
     Material,
   } from 'vue-color'

   var colors = { r: 25, g: 77, b: 51 }
   export default {
     name: 'Home',
     components: {
       'material-picker': Material,
       'compact-picker': Compact,
       'swatches-picker': Swatches,
       'slider-picker': Slider,
       'sketch-picker': Sketch,
       'chrome-picker': Chrome,
       'photoshop-picker': Photoshop,
     },
     data() {
       return {
         colors,
       }
     },
   }
   </script>
   ```

## 项目

本次项目中，需要实现的效果如下图所示：

![示例图片](https://s1.ax1x.com/2023/02/06/pScTPAg.png)

### 分析

分析项目，顶部是 `vue-color` 插件的 `Slider` 模块，切换颜色后根据接口获取相近颜色，右侧显示数组第一条或者用户点击选择的颜色的 rgb 值与十六进制值。

### 思路

- 组成

  整体模块分为上下模块，上方模块为插件引入。下方模块又分为左右结构，左侧模块

- 逻辑
  1. 颜色筛选

     根据官方文档可知，该颜色筛选器有一个内置方法 `input` ，切换颜色后就触发，返回值如下所示：

     ```js
     {
      a: 1,
      hex: "#1A4C24",
      hex8: "#1A4C24FF",
      hsl: {
             a: 1,
             h: 132.06585845347314,
             l: 0.2009,
             s: 0.49250000000000005
         },
      hsv: {
             a: 1,
             h: 132.06585845347314,
       s: 0.6599664991624791,
       v: 0.29984325
         },
      oldHue: 132.06585845347314,
      rgba: {
             a: 1,
             b: 36,
       g: 76,
       r: 26
         },
      source: "hsl"
     }
     ```

  2. 获取相似颜色。相似颜色判断是后端负责处理，前端负责获取数据渲染，故不做过多的长篇大论。

     根据后端的接口，需要传递 `hue` 参数，第一步返回值中 `oldHue` 正是需要的参数，传递给后端返回一个数组，每一项是一个对象，如下所示：

     ```js
     {
       actStatus: null
       blue: 79
       bpmStatus: null
       code: null
       colorFill: null
       colorIdName: null
       createBy: null
       createTime: null
       description: null
       green: 183
       hasAuth: false
       html: '#00B74F'
       hue: 145.9
       id: '1622422742548848646'
       isDelete: null
       isHistory: null
       name: '7481C'
       procDefId: null
       procInstId: null
       publishTime: null
       ratio: null
       reason: null
       red: 0
       revisedBy: null
       startProcess: false
       sysOrgCode: null
       type: null
       updateBy: null
       updateTime: null
       version: null
       weight: null
     }
     ```

     拿到数组对象后遍历渲染即可。

  3. 点击显示预览

     给每一项循环项添加一个点击事件，点击后拿到第二步获取到的 `html` 值，修改右侧的背景颜色属性即可。

### 总体代码

```vue
<template>
  <div>
    <div class="vue-color-picker">
      <slider-picker @input="updateValue" :value="colors"></slider-picker>
      <!-- <photoshop-picker v-model="colors" /> -->
    </div>
    <h2>颜色列表</h2>
    <div style="display: flex; margin: 0px auto; height: 360px;"></div>
  </div>
</template>
```
