---
title: 前端不同屏幕尺寸自适应与大屏移动端开发
author:
  - 三十的前端课 吃透前端不同屏幕尺寸自适应，大屏移动端开发必会&https://www.bilibili.com/video/BV1PC411372R/
---

# 前端不同屏幕尺寸自适应与大屏移动端开发

## 核心思想

1. 基本原则：布局更多使用 `flex` ，尺寸使用 `rem` 、`vw` 、`vh` 等单位，字体使用 `em` 、`rem` 等单位
2. 如果根据不同屏幕做不同的布局，一般通过 `media` 媒体查询 或检测屏幕尺寸换不同的站点

## 功能实现

### 检测屏幕尺寸换不同的站点

以百度为例，PC 端和移动端的布局完全不一样，使用 `rem` 肯定是无法实现，所以需要检测屏幕尺寸，然后跳转到不同的站点。可以使用 `window.innerWidth` 来检测屏幕宽度，然后根据宽度跳转到不同的站点。也可以对 `link` 标签使用 `media` 媒体查询，根据不同的屏幕宽度加载不同的样式。

::: code-group

```js [index.js]
if (window.innerWidth <= 799) {
  window.location.href = "https://m.baidu.com";
}
```

```html [index.html]
<link
  rel="stylesheet"
  href="css/pc.css"
  media="screen and (min-width: 800px)"
/>
<link
  rel="stylesheet"
  href="css/mobile.css"
  media="screen and (max-width: 799px)"
/>
```

:::

一般样式变化太大，就会使用这种方法，切换不同站点实现不同端的样式。

### rem

以 `html` 字体大小为 `1rem` 的大小，`html` 为 16px，那么 `1rem = 16px` ，`0.5rem = 8px` 。`rem` 之所以能自适应就是根据屏幕大小用 `js` 重新设置 `html` 字体大小。

算法为：`html` 字体大小 = （`js` 获取到的当前设备宽度 / 设计图宽度） \* 设计图宽度下 1rem 大小

该方法主要难点在于需要自己手动计算，可以使用第三方插件和依赖简化：

1. vscode 下载插件 `px to rem` ，可以自动将 `px` 转换为 `rem`
2. 使用 `postcss-pxtorem` 插件，自动将 `px` 转换为 `rem`。如果不想要某些 `px` 转换为 `rem` ，可以采用 `style` 行内式

::: code-group

```html [index.html]
<body>
  <script>
    // window.screen.scrollWidth: 获取设备的物理宽度，包括滚动条在内; document.body.clientWidth: 获取设备可用的宽度，不包括滚动条在内
    let width = Math.min(document.body.clientWidth, 750); // 在屏幕大小和750px之间去最小值
    let fontSize = (width / 750) * 16; // 设计图宽度为750px，设计图下1rem为16px
    document.documentElement.style.fontSize = fontSize + "px";
  </script>
</body>
```

```js [vite.config.js]
import postcsspxtorem from "postcss-pxtorem";

export default {
  css: {
    postcss: {
      plugins: [
        postcsspxtorem({
          rootValue: 16, // UI设计稿的宽度除以16
          propList: ["*"], // 需要转换的属性，*代表所有属性
          selectorBlackList: [".ignore", ".hairlines"], // 忽略的css选择器，不会转换为rem
          exclude: /node_modules/i, // 排除的文件
          minPixelValue: 2, // 最小的像素值，小于这个值的将不会被转换
          mediaQuery: false, // 允许在媒体查询中转换px
          replace: true, // 替换包含rem的规则，是否直接更换属性值而不添加备用属性
          unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
        }),
      ],
    },
  },
};
```

:::

### vw、vh

1vw = 1% 的屏幕宽度，1vh = 1% 的屏幕高度。使用 `vw` 和 `vh` 可以实现自适应，`vw` 无需计算，会自动根据屏幕宽度变化；`vh` 一般用于做全屏设计。

可以使用对应的库 `postcss-px-to-viewport` 自动转换。

::: code-group

```js [vite.config.js]
import postcsspxtorem from "postcss-pxtorem";
import postcsspxtoviewport from "postcss-px-to-viewport"; // [!code focus]

export default {
  css: {
    postcss: {
      plugins: [
        postcsspxtorem({
          rootValue: 16, // UI设计稿的宽度除以16
          propList: ["*"], // 需要转换的属性，*代表所有属性
          selectorBlackList: [".ignore", ".hairlines"], // 忽略的css选择器，不会转换为rem
          exclude: /node_modules/i, // 排除的文件
          minPixelValue: 2, // 最小的像素值，小于这个值的将不会被转换
          mediaQuery: false, // 允许在媒体查询中转换px
          replace: true, // 替换包含rem的规则，是否直接更换属性值而不添加备用属性
          unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
        }),
        postcsspxtoviewport({
          // [!code focus]
          unitToConvert: "apx", // 需要转换的单位 // [!code focus]
          viewportWidth: 750, // [!code focus]
          unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除） // [!code focus]
          viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw // [!code focus]
          propList: ["*"], // 需要转换的属性，*代表所有属性 // [!code focus]
          selectorBlackList: ["ignore-"], // 忽略的css选择器，不会转换为vw // [!code focus]
          fontViewportUnit: "vw", // 字体使用的视窗单位 // [!code focus]
          minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换 // [!code focus]
          mediaQuery: false, // 允许在媒体查询中转换px // [!code focus]
          replace: true, // 是否直接更换属性值，而不添加备用属性 // [!code focus]
        }), // [!code focus]
      ],
    },
  },
};
```

```vue [index.vue]
<style>
div {
  width: 100px; /* 不会被转化 */
  height: 100apx; /* 会转化为vw */
}
</style>
```

:::

### 百分比

百分比是相对于父元素的百分比，所以一般除非是最外层的容器，否则不具备响应式调整的功能。

### 方案对比

|  方案  |                         优点                         |                          缺点                          |
| :----: | :--------------------------------------------------: | :----------------------------------------------------: |
| `rem`  | 相比 vw 更灵活，对于移动端与 PC 端都需要的项目更灵活 | 移动端不监听 `resize` 重新修改 `htmlFontSize` 无法实现 |
|  `vw`  |          不需要监听页面 `resize` 事件更好用          |      需要移动端和 PC 端都适配样式时没 `rem` 灵活       |
| 百分比 |                 根据父组件来计算样式                 |                  响应式调整依赖父组件                  |

### rem VS vw

两个方案都可以用于控制某个盒子的大小，都会根据屏幕宽度灵活变化。`rem` 相对于 `vw` 灵活度更高，如果你的移动端项目还需要 `web` 端浏览，那么 `rem` 可以做到 `vw` 做不到事情。如果页面单纯是在移动端看（比如 `app` 内 `web`）。

`rem` 不去监听 `resize` 事件，去修改 `fontSize` 是做不到在动态改变屏幕宽度时变化大小的。如果不想监听 `resize` 事件，或者变化触发不了 `resize` ，使用 `vw`。

### 百分比

百分比并不是一无是处，`rem` 和 `vw` 都是根据屏慕去算的，如果我们需要根据父组件去缩放我们可以就必须用百分比了，比如父元素是一个用 `js` 计算出来的尺寸的盒子，我们现在希望里面的两个内容一个占百分之 30，一个占百分之 70。

### 其他注意事项

1. 关于边距处理：靠左靠右用 `flex` ，顶开部分小距离 `rem` 、`vw`
2. 图片一般定宽不定高，防止图片变形。如果屏幕跨度过大，可能会导致图片大得夸张，此时可以考虑图片设置最大宽度然后居中
3. 一些大屏可视化项目中，界面必须是刚刚好满屏幕不能溢出不能短，用 `f11` 切换全屏会引起高度变化，这种需求有些高度可以用 `vh`

## 总体效果

总体效果可前往刀刀博客查看，地址 [刀刀博客](https://duyidao.github.io/blogweb/) 。

<myIframe url="https://duyidao.github.io/blogweb/#/" />
