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

