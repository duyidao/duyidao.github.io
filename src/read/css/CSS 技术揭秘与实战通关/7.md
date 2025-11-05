## CSS 阴影

本章节开了新篇，开始学习<word text="CSS" />的阴影。阴影看起来简单，实际上千变万化，能实现很多奇妙的效果。

### 阴影基础

在开始之前，先来回顾一下阴影的基础语法，想要恶补的可以访问 [MDN 阴影](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/box-shadow) 查看官方文档。

阴影主要分为以下三种：

- 盒阴影 `box-shadow` ：
  
  ```css [语法]
  box-shadow: h-shadow v-shadow blur spread color inset;
  ```

  - `h-shadow` ：水平阴影的位置。允许负值。
  - `v-shadow` ：垂直阴影的位置。允许负值。
  - `blur` ：模糊距离。
  - `spread` ：阴影的尺寸。
  - `color` ：阴影的颜色。

- 文字阴影 `text-shadow` ：
  
  ```css [语法]
  text-shadow: h-shadow v-shadow blur color;
  ```

  - `h-shadow` ：水平阴影的位置。允许负值。
  - `v-shadow` ：垂直阴影的位置。允许负值。
  - `blur` ：模糊距离。
  - `color` ：阴影的颜色。

- 滤镜阴影 `filter: drop-shadow()` ：

  ```css [语法]
  filter: drop-shadow(h-shadow v-shadow blur color );
  ```

  - `h-shadow` ：水平阴影的位置。允许负值。
  - `v-shadow` ：垂直阴影的位置。允许负值。
  - `blur` ：模糊距离。
  - `color` ：阴影的颜色。

看语法可以看出，它们三个基本大同小异，只不过需要注意 `box-shadow` 的两个特殊性：

1. `box-shadow` 还能设置内阴影，使用关键字 `inset` 进行描述
2. `box-shadow` 多了一个阴影扩散半径的参数

### 常见阴影

下面先来看看阴影最常见的效果，也就是我们最常用的阴影效果。

- 盒阴影：
  
  ```css
  div {
    box-shadow: 4px 4px 10px 5px rgba(0, 0, 0, 0.5);
  }
  ```

  ![盒阴影](https://pic1.imgdb.cn/item/6908515b3203f7be00c8a3a3.png)

- 文字阴影：
  
  ```css
  div {
    letter-spacing: 4px;
    text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.5);
  }
  ```

  ![文字阴影](https://pic1.imgdb.cn/item/690851e63203f7be00c8ac4a.png)

- 滤镜阴影：
  
  ```css
  div {
    border: 2px solid orange;
    filter: drop-shadow(4px 4px 2px #999);
  }
  ```

  ![滤镜阴影](https://pic1.imgdb.cn/item/690852a93203f7be00c8b7ed.png)

除了这些常见的阴影，还有很多有趣的阴影效果。

### 单侧阴影

一般情况下大家在使用阴影都停留在两侧或者四周都有阴影，那么如果希望阴影只在一侧，该怎么做呢？

看回阴影 `box-shadow` 的语法，举一个例子： `box-shadow: 4px 4px 10px 5px #555` ，这四个值分别为：水平偏移、垂直偏移、模糊半径、阴影扩散半径、阴影颜色。

其中，**阴影扩散半径是可以设置为负数的**！什么意思呢？把阴影的模糊半径和扩散半径设置为相同的值，然后扩散半径设置为负数，这个时候就无法看到盒子的阴影了，因为阴影被盖在盒子下方。

基于此，给阴影添加水平偏移或者垂直偏移，就能看到某个方向的单侧偏移阴影了。

::: code-group
```html
<div class="left">left</div>
<div class="right">right</div>
<div class="top">top</div>
<div class="bottom">bottom</div>
```
```css
div {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: 30px auto;
  border: 1px solid #000;
}

.left {
  box-shadow: -7px 0 7px -7px red;
}

.right {
  box-shadow: 7px 0 7px -7px red;
}

.top {
  box-shadow: 0 -7px 7px -7px red;
}

.bottom {
  box-shadow: 0 7px 7px -7px red;
}
```
:::

> 具体代码可以查看 [box-shadow 单侧阴影](https://codepen.io/duyidao/pen/qEbgwWb)

### 立体阴影

立体阴影这个说法很奇怪，毕竟阴影的作用就是让容器显得更有立体感。不过立体阴影并不是使用阴影 `box-shadow` 来实现立体，而是通过其他元素或者伪类配合样式属性模拟元素的阴影，从而实现立体效果。

空口无凭，下面来看几个例子做对比吧。

![立体阴影](https://pic1.imgdb.cn/item/69099a463203f7be00ce1510.png)

可以看到，第一个例子就是用的阴影直接实现的，效果不能说美轮美奂，也只能说差强人意。而剩下几个例子，都是通过伪类调整它的布局位置，修改其背景色，最后再设置 `box-shadow` 添加阴影模糊，来逼真模拟阴影效果。

::: code-group
```html
<div class="box"></div>
<div class="foo"></div>
<div class="both"></div>
<div class="side"></div>
```
```css
.box, .foo, .both, .side {
  position: relative;
  width: 600px;
  height: 100px;
  margin: 30px auto;
  background: yellow;
  border-radius: 10px;
}

.box {
  box-shadow: 0 0 10px 2px #555;
}

.foo {
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 5%;
    right: 5%;
    bottom: 0;
    border-radius: 10px;
    background: hsl(48, 100%, 20%);
    transform: translate(0, -15%) rotate(-4deg);
    transform-origin: center center;
    box-shadow: 0 0 20px 15px hsl(48, 100%, 20%);
    z-index: -1;
  }
}

.both {
  background: skyblue;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 5%;
    right: 5%;
    bottom: 15%;
    border-radius: 10px;
    background: hsl(48, 100%, 20%);
    transform: translate(0, -20%) rotate(-4deg);
    transform-origin: center center;
    box-shadow: 0 0 20px 15px hsl(48, 100%, 20%);
    z-index: -1;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 5%;
    right: 5%;
    bottom: 15%;
    border-radius: 10px;
    background: hsl(48, 100%, 20%);
    transform: translate(0, -20%) rotate(4deg);
    transform-origin: center center;
    box-shadow: 0 0 20px 15px hsl(48, 100%, 20%);
    z-index: -1;
  }
}

.side {
  background: pink;
  
  &::before {
    content: "";
    position: absolute;
     top: 15%;
    bottom: 20%;
    left: 90%;
    right: 5%;
    border-radius: 10px;
    background: hsl(150, 62%, 20%);
    transform: translate(105%, 10%) rotate(15deg);
    transform-origin: center center;
    box-shadow: 0 0 10px 7px hsl(150, 62%, 20%);
    z-index: -1;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 15%;
    bottom: 20%;
    left: 5%;
    right: 90%;
    border-radius: 10px;
    background: hsl(150, 62%, 20%);
    transform: translate(-105%, 10%) rotate(-15deg);
    transform-origin: center center;
    box-shadow: 0 0 10px 7px hsl(150, 62%, 20%);
    z-index: -1;
  }
}
```
:::

具体原理也很简单，伪类再背后的叠加形成，如下图所示：

![具体原理](https://pic1.imgdb.cn/item/6909a2a63203f7be00ce6ac5.gif)

> 具体代码可以查看 [立体阴影](https://codepen.io/duyidao/pen/ZYQPbKj)

### 浮雕阴影

浮雕阴影的本质还是 box-shadow 和 text-shadow，只是需要控制好颜色的配合以及内外阴影的一起使用。核心有两点：

1. 背景色与内容（文本或者盒子颜色）一致
2. 使用两个相反的方向，使用两组对比明显的颜色值，来实现凹凸效果

来看看这两个效果的图：

![两个效果](https://pic1.imgdb.cn/item/6909a5a63203f7be00ce8b51.png)

可以看出来这两个是全然相反的浮雕阴影效果，一个是凹一个是凸。但其实只需要修改它的字体阴影色值就能实现相反的效果。

::: code-group
```html
<div class="out">Daodao</div>
<div class="in">Daodao</div>
```
```css
body {
  width: 100vw;
  height: 100vh;
  text-align: center;
  background: #999;
}

div {
  font-size: 105px;
  font-weight: blod;
  color: #999;
}

.out {
  text-shadow: 1px 1px 1px #000, -1px 1px 1px #fff;
}

.in {
  text-shadow: 1px 1px 1px #fff, -1px 1px 1px #000;
}
```
:::

> 具体代码可以查看 [浮雕阴影](https://codepen.io/duyidao/pen/ByjbKqN)

### 新拟态风格阴影

上一个浮雕阴影是针对文字做的，而新拟态风格阴影则是针对盒子的，这种风格一般用于扁平化设计，让元素看起来有立体感。

和浮雕阴影的原理类似，也是使用相反的方向和对比明显的色值，来实现盒子的凹凸效果。还能把他们的值在 `active` 后取反，实现点击动画效果。

```css
div {
  width: 100px;
  height: 100px;
  margin: 30px auto;
  background: #e9ecef;
  text-align: center;
  line-height: 100px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 7px 7px 12px rgba(0, 0, 0, 0.4),
    -7px -7px 12px rgba(255, 255, 255, 0.9),
    inset 0 0 0 rgba(255, 255, 255, 0.9), inset 0 0 0 rgba(0, 0, 0, 0.4);
}

div:active {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.4), 0 0 0 rgba(255, 255, 255, 0.9),
    inset -7px -7px 12px rgba(255, 255, 255, 0.9),
    inset 7px 7px 12px rgba(0, 0, 0, 0.4);
}
```

> 具体代码可以查看 [新拟态风格阴影](https://codepen.io/duyidao/pen/ByjbQYa)

### 长阴影（长投影）

顾名思义，就是用阴影搭配 `transform` 和渐变，实现模拟投影的效果。主要的实现思路是：

1. 为盒子容器添加 `::before` 和 `::after` 伪类，添加 `position` 为 `absolute` 绝对定位
2. `before` 伪类调整中心点为左中，然后整体平移到右边，基于 Y 轴倾斜角度，缩放元素调整一下大小
3. `after` 伪类调整中心点为上中，然后整体平移到底部，基于 X 轴倾斜角度，缩放元素调整一下大小

关键点就在于 `transform` 的使用，如 `transform-origin` 设置中心点、 `skew` 倾斜角度、 `scale` 缩放元素大小。

```scss
body {
  background: linear-gradient(90deg, hsl(199, 98%, 50%), hsl(199, 98%, 38%));
  overflow: hidden;
}

div {
  position: relative;
  width: 30vmin;
  height: 30vmin;
  background: #fff;
  margin: 30vmin auto;
}

div::before,
div::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

div::before {
  transform-origin: 0 50%;
  transform: translate(100%, 0) skewY(45deg) scaleX(.6);
  background: linear-gradient(90deg, rgba(0, 0, 0, .3), transparent);
  animation: shadowMoveY 5s infinite linear alternate;
}

div::after {
  transform-origin: 0 0;
  transform: translate(0%, 100%) skewX(45deg) scaleY(.6);
  background: linear-gradient(180deg, rgba(0, 0, 0, .3), transparent);
  animation: shadowMoveX 5s infinite linear alternate;
}

@keyframes shadowMoveX {
  to {
    transform: translate(0%, 100%) skewX(50deg) scaleY(.6);
  }
}

@keyframes shadowMoveY {
  to {
    transform: translate(100%, 0) skewY(40deg) scaleX(.6);
  }
}
```

![最终效果](https://pic1.imgdb.cn/item/6909bb213203f7be00cf55d3.png)

> 具体代码可以查看 [线性渐变模拟长阴影](https://codepen.io/duyidao/pen/myVoWwq)

### 彩色阴影 / 渐变阴影

`box-shadow` 一般都是实现单色阴影，如果想要实现彩色或渐变阴影，也可以使用其他的方法。

在<word text="CSS" />中，最常见的彩色阴影实现方式是通过 `filter: blur()` 模糊滤镜来把同样颜色的副本模糊化模拟阴影效果。对应的，副本则需要使用 `background: inherit` 继承父元素的背景色，这样模糊后的阴影颜色和父元素一致。

```css
div {
  position: relative;
  width: 100px;
  height: 100px;
  background: url(.....) no-repeat center center;
}

div::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  filter: blur(10px) brightness(80%) opacity(.8);
  z-index: -1;
}
```

此方法的步骤如下：

1. 利用元素的伪元素，生成了一个与原图一样的新图，并且将其叠加在原图之下
2. 利用滤镜 `filter: blur()` 配合其他的亮度、对比度、透明度等滤镜，制作出与原图类似的虚幻的影子，伪装成原图的阴影效果

同样的，还可以用这个方法实现渐变边框阴影，效果如下图所示：

![渐变边框阴影效果](https://pic1.imgdb.cn/item/690b07a93203f7be00d5d6ab.png)

实际上也是做一个锥形渐变。

```CSS
div {
  background-image: conic-gradient(#ff4d00, #ffe600, #80ff00, #00ff1a, #00ffb3, #00b3ff, #001aff, #8000ff, #ff00e6, #ff004d 20%, transparent 20.5%, transparent
  );
}
```

![锥形渐变](https://pic1.imgdb.cn/item/690b08ce3203f7be00d5dcb1.png)

然后添加模糊滤镜。

```CSS
div {
  background-image: conic-gradient(#ff4d00, #ffe600, #80ff00, #00ff1a, #00ffb3, #00b3ff, #001aff, #8000ff, #ff00e6, #ff004d 20%, transparent 20.5%, transparent
  );
  filter: blur(10px); /* [!code ++] */
}
```

![模糊](https://pic1.imgdb.cn/item/690b09243203f7be00d5dea6.png)

然后在上面覆盖一个和背景色一样的、比整体盒子小 1、2 像素的盒子，把中间部分遮挡住，这样就能实现渐变边框阴影效果。

或者设置伪类的背景色为锥形渐变，宽度通过计算属性 `calc(100% + 12px)` 多设置 12 像素，然后通过 `left: -6px` 和 `top: -6px` 调整位置模拟边框，这样也能实现渐变边框阴影效果。

![最终效果](https://pic1.imgdb.cn/item/690b09a43203f7be00d5e19c.png)

### 总结

阴影是非常实用的一个属性，通过它可以实现很多效果，如阴影、浮雕、拟态、长投影等。

1. 阴影主要类型包括 `box-shadow`（盒阴影）、`text-shadow`（文字阴影）和 `filter: drop-shadow()`（滤镜阴影），它们语法相似但各有特点，如 `box-shadow` 可设置内阴影和扩散半径。
2. 通过巧妙运用 `box-shadow` 的偏移、模糊、扩散等参数，可以实现单侧阴影、立体阴影、浮雕阴影、新拟态风格阴影、长阴影及彩色/渐变阴影等多种视觉效果。
3. 实现这些效果常用技巧包括：利用负的扩散半径创造单侧阴影；结合伪元素和 `transform` 模拟立体感；通过反向阴影色值实现浮雕凹凸；使用多层 `box-shadow` 或 `filter` 结合 `background` 继承模拟复杂阴影与渐变效果。