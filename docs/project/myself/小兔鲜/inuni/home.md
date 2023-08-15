# 首页

## 头部自定义导航栏

首页头部想使用自定义的导航栏而非官方提供的导航栏，思路分析如下：

1. 去除官方提供的导航栏
2. 使用自定义的头部导航栏
3. 设置安全区域（重点）

安全区域是指部分机型上下部分会有一定的区域被遮挡，这部分区域需要做处理让内容有足够的内外边距不被挡住。这就是安全区域。

在 `uniapp` 中，官方推出了一个方法 `uni.getSystemInfoSync()` ，其中有一个属性 `safeAreaInsets` ，是一个对象，分别是 `top` 、`left` 、`bottom` 、`right` 四个属性，表示各自的安全区域距离。

获取到安全区域距离后再通过 `style` 动态设置样式即可，代码如下：

```vue
<script setup lang="ts">
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets.top + 'px' }">
    <!-- ... -->
  </view>
</template>
```

## 自定义组件导入

`uni-ui` 的组件在 `pages.json` 文件中通过 `easycom` 对象设置配置规则，因此使用时可直接使用而无需导入。在 `components` 中配置的自定义组件也可以设置自动导入。

首先需要规定这些自定义组件的统一开头，本项目以 `Xtx + 组件名` 的格式。在 `pages.json` 文件中配置规则，代码如下：

```json
{
  // 组件自动引入规则
  "easycom": {
    // ...
    "custom": {
      // ...
      // 自己封装的组件规则配置，以Xtx开头，在components文件查找引入
      "^Xtx(.*)": "@/components/Xtx$1.vue"
    }
  },
}
```

配置完需要先重启项目，然后才能生效。配置完后发现这个自定义组件 `ts` 类型为 `unknown` ，因此要做额外的配置。

在 `src/components` 文件夹下新建一个 `components.d.ts` 文件，用于配置组件类型。代码如下：

```tsx
import XtxSwiper from './XtxSwiper.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
  }
}
```

现在组件拥有 `ts` 类型了。