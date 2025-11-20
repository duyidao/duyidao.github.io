## blur模糊滤镜使用技巧及搭配contrast元素边缘处理

### 模糊滤镜 blur()

`blur()` 应该是<word text="CSS" />中使用频率最高的滤镜了，它能将高斯模糊应用于元素上。语法也很简单：

::: code-group
```html
<div></div>
<div class="blur"></div>
```
```css
div {
  width: 200px;
  height: 200px;
  background: #000;
}
.blur {
  filter: blur(5px);
}
```
:::

二者效果如下：

![二者效果](https://pic1.imgdb.cn/item/691d36193203f7be0015873b.png)

基于此，还有哪些应用场景和使用技巧呢？

#### 利用模糊滤镜实现毛玻璃效果

在前面的章节中，关于 `filter` 和 `backdrop-filter` 的区别对比，讲到了[作用对象的差异](/read/css/CSS%20技术揭秘与实战通关/9#作用对象的差异)，其中就有毛玻璃效果，也讨论了 `filter: blur()` 和 `backdrop-filter: blur()` 的差别，也查看了通过 `backdrop-filter: blur()` 实现的毛玻璃效果。

在之前，`backdrop-filter` 滤镜很多浏览器都不支持，因此之前很少使用到。现在浏览很多都支持该语法了，这也是它能大规模使用的原因。

#### 利用模糊实现彩色阴影 / 渐变阴影

在前面阴影的章节中，讨论了如何使用模糊效果实现[彩色阴影和渐变阴影](/read/css/CSS%20技术揭秘与实战通关/7#彩色阴影-渐变阴影)，以及高级技巧[利用阴影复制自身图形](/read/css/CSS%20技术揭秘与实战通关/8#技巧一-利用阴影复制自身图形)。

下面来回顾一下知识点，如何给下方这张图片添加一个彩色阴影。

![要添加彩色阴影的图片](https://pic1.imgdb.cn/item/691d3bab3203f7be0015b663.png)

核心思路很简单，为这个图片元素的伪类 `::after` 添加 `background: inherit;` ，创建一个同样图片内容的副本；然后设置 `filter: blur()` 让它模糊，就能模拟阴影效果实现彩色阴影了。

```CSS
.avator {
  position: relative;
  background: url($img) no-repeat center center;
  background-size: 100% 100%;
  
  &::after {
    content: "";
    position: absolute;
    top: 10%;
    width: 100%;
    height: 100%;
    background: inherit; /* [!code focus] */
    background-size: 100% 100%;
    filter: blur(10px); /* [!code focus] */
    z-index: -1;
  }
}
```

![阴影效果](https://pic1.imgdb.cn/item/691d593e3203f7be0016626d.png)

#### 利用模糊滤镜实现层次感 / 3D 效果

模糊还经常被用于实现视差效果。合理使用模糊滤镜，能很好地实现一些视觉上的层次感。

在通常的视觉效果中，距离肉眼更近的对象往往看起来更清晰，而距离较远的对象则相对不太清晰。

因此，可以利用这种清晰与模糊的差异来创建视差效果。

将清晰与模糊两种状态运用在文字上。
首先实现一个简单文字的 3D 变换动画，主要是借助 `transform-style: preserve-3d` 和 `perspective`，并且让文字绕 Y 轴进行旋转。

::: code-group
```html
<p>
    <span>C</span>
    <span>S</span>
    <span>S</span>
    <span>3</span>
    <span>D</span>
    <span>E</span>
    <span>F</span>
    <span>F</span>
    <span>E</span>
    <span>C</span>
    <span>T</span>
</p>
```
```css
body {
  perspective: 160vmin;
}
p {
  font-size: 24vmin;
  transform-style: preserve-3d;
  animation: rotate 10s infinite ease-in-out;
}
@keyframes rotate {
  0% {
    transform: rotateY(-45deg);
  }
  50% {
    transform: rotateY(45deg);
  }
  100% {
    transform: rotateY(-45deg);
  }
}
```
:::

可以得到如下所示的一个 3D 文字运动效果：

![3d文本旋转动画](https://pic1.imgdb.cn/item/691d59243203f7be001661b2.gif)

尽管已经初步实现了 3D 效果，但是这似乎还不够完美。为了让视觉效果更加真实，还需要添加一定量的模糊效果，以便近距离的文字保持清晰，而较远的文字则变得模糊。

```scss
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

$count: 12;

body, html {
  font-family: 'Lobster', cursive;
  perspective: 160vmin;
  overflow: hidden;
}

p {
  margin: auto;
  font-size: 24vmin;
  transform-style: preserve-3d;
  animation: rotate 10s infinite ease-in-out;
    
  span {
    text-shadow: 
      1px 1px 0 rgba(0, 0, 0, .9),2px 2px 0 rgba(0, 0, 0, .7),3px 3px 0 rgba(0, 0, 0, .5),4px 4px 0 rgba(0, 0, 0, .3),5px 5px 0 rgba(0, 0, 0, .1);
      
    &:nth-child(-n+5) { 
      animation-delay: -5s; 
    }
  }
}

@for $i from 1 to 7 {
  span:nth-child(#{$i}), 
  span:nth-last-child(#{$i}) {
    animation: filterBlur-#{$i} 10s infinite ease-in-out;
  }

  @keyframes filterBlur-#{$i} {
    0% {
      filter: blur(0px) contrast(5);
    }
    50% {
      filter: blur(#{7 - $i}px) contrast(1);
    }
    100% {
      filter: blur(0px) contrast(5);
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotateY(-45deg);
  }
  50% {
    transform: rotateY(45deg);
  }
  100% {
    transform: rotateY(-45deg);
  }
}
```

这里主要采用了一些小技巧：

1. 首先需要注意到，在最左和最右的效果下，第一个字符和最后一个字符的效果其实是一致的，第二个字符和倒数第二个字符也应该有相同的效果。因此，它们可以放到一起进行处理，简化代码。借助预处理器 SASS、选择器 `:nth-child` 和 `:nth-last-child` 来编写高效的 CSS 代码。
2. 其次，为了让文字看起来更加立体，可以配合使用 `text-shadow`。
3. 最后，需要将每个字符分成清晰和模糊两部分，利用 `animation-delay` 来使得其中一半动画延迟一定时间进行。

#### 利用模糊滤镜提取图片主题色

模糊滤镜还有一种比较偏门的用法，就是**获取图片的主色。**。

这个主色调的使用场景就非常之多了，可以利用它们来填充背景，等等，像是下面这样：

![主色调的使用场景](https://pic1.imgdb.cn/item/691d5b803203f7be001677ea.png)

在之前要实现类似的需求，肯定还是需要 Canvas 的能力进行取色、一系列计算、再平均色值得出最终结果。

而现在可以巧妙通过模糊滤镜以及方法效果，近似地拿到图片的主题色。

例如，有这么一张图片：

![图片](https://pic1.imgdb.cn/item/691d5c093203f7be00167c78.png)

首先放到一个 `div` 内，设置为背景图片，然后添加 `filter: blur()` 模糊滤镜。

![图片模糊后](https://pic1.imgdb.cn/item/691d6ba33203f7be0017161f.png)

模糊之后的图片确实有点主色调的感觉了，不过边缘明显还是有很大的问题，需要进一步的裁剪。

裁剪的方式可以借助 `overflow: hidden` 裁剪多余的边缘部分，再可以借助 `transform: scale()` 将整个模糊效果放大，使颜色更为聚焦。

::: code-group
```html
<div></div>
<div class="box"></div>
```
```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 50px;
}

div {
  position: relative;
  width: 300px;
  height: 120px;
  overflow: hidden;
}

div::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(https://picsum.photos/300/120) no-repeat center center;
}

.box::before {
  filter: blur(50px); /* [!code focus] */
  transform: scale(3); /* [!code focus] */
}
```
:::

最终效果：

![最终效果](https://pic1.imgdb.cn/item/691d6c593203f7be00171b0b.png)

如此一来，就巧妙地通过模糊滤镜取到了图片的主色调值，并且整体效果不错。

当然，该方案也是存在一定的小问题的：

1. 只能是大致拿到图片的主色调，无法非常精确，并且 `filter: blur(50px)` 这个 `50px` 需要进行一定的调试；
2. 模糊滤镜本身是比较消耗性能的，如果一个页面存在多个这种方法获取到的背景，可能对性能会造成一定的影响，实际使用的时候需要进行一定的取舍。

> 具体代码可以查看 [模糊滤镜提取图片主题色](https://codepen.io/duyidao/pen/myPwaNK)

### 对比度滤镜 contrast()

聊完了模糊滤镜，下面登场的是对比度滤镜 `contrast()`。

对比度滤镜相对而言，单独使用的话，技巧就没那么多了。

在<word text="CSS" />中，对比度滤镜 `contrast()`用于改变元素的**对比度**。

> [!INFO] 拓展
> 图像对比度指的是一幅图像中明暗区域最亮的白和最暗的黑之间不同亮度层级的测量，即一幅图像灰度反差的大小。

#### 图片及按钮元素的 Hover 过渡效果

在组件库或者一些网站中，鼠标 `hover` 悬停在按钮组件或者一些图片上，会有一些颜色的对比度变化。在之前可能还有人会以为是换了颜色，现在就知道变化的是 `contrast()` 对比度。

::: code-group
```html
<div class="btn">Btn</div>
<img class="img" src="https://picsum.photos/100/50" alt="">
```
```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 50px;
}

div, img {
  width: 100px;
  height: 50px;
}

div {
  text-align: center;
  line-height: 50px;
  background: orange;
}

div:hover, img:hover {
  filter: contrast(90%);
}
```
:::

如果想要高亮，`contrast` 的值设置超过 100% 即可。

> 具体代码可以查看 [图片及按钮元素的 Hover 过渡效果](https://codepen.io/duyidao/pen/MYyoLZm)

#### 可访问性提升，提升文字对比度

还有一个比较少人关注的用法。`filter: contrast()` 滤镜是非常好的提升背景与背景上文字对比度的方法。

那么，**提升背景与背景上文字对比度**有什么意义呢？

这个就涉及了可访问性 A11Y 相关的内容了，我们在这一章节只简单描述。

> A11Y 是 Accessibility 的一种缩写方式，其中数字 11 代表了 Accessibility 中的 11 个字母。Accessibility（可访问性）指的是在 Web 开发中，使尽可能多的人能够使用网站，即使这些人的能力在某些方面受到限制。通过增加 Accessibility 的支持，可以使残障人士和其他有特殊需求的用户更方便地访问和使用网站。

颜色是我们日常中需要经常接触的一种属性。对于多数视觉正常的用户而言，可能并没有太过敏感于网站的颜色设计。然而，对于一小部分色弱或色盲的用户而言，他们对于网站的颜色设计会非常敏感，差劲的设计可能会给他们带来极大的不便。

因此，这里引出一个非常重要的概念：**色彩对比度**。简单来说，色彩对比度描述了两种颜色之间在亮度方面的差异。在网站设计方面，这通常指的是背景颜色（background-color）与内容颜色（color）之间的对比差异。

最权威的互联网无障碍规范 —— [WCAG AA](https://www.w3.org/Translations/WCAG21-zh/) 规范规定，所有重要内容的色彩对比度需要达到 4.5:1 或以上（字号大于 18 号时达到 3:1 或以上），才算拥有较好的可读性。

![文字与背景的对比度举例](https://pic1.imgdb.cn/item/691d77cf3203f7be00177ef9.png)

很明显，上述图片前两个例子，文字与背景的对比度非常低，正常用户都已经很难看得清了。

因此，一些场景下可以利用 `filter: contrast()` 快速提升有文本及背景组合的元素的对比度，有效提升可访问性。

### 模糊滤镜叠加对比度滤镜的融合效果

单独将两个滤镜拿出来，它们的作用分别是：

1. `filter: blur()`： 给图像设置高斯模糊效果。
2. `filter: contrast()`： 调整图像的对比度。

但是，当它们 “合体” 的时候，产生了奇妙的融合现象。

例如下面这个例子：

::: code-group
```html
<div class="g-container">
  <div class="g-ball-a"></div>
  <div class="g-ball-b"></div>
</div>
```
```css
html, body {
  width: 100%;
  height: 100%;
  display: flex;
}
.g-container {
  margin: auto;
  position: relative;
  width: 300px;
  height: 200px;
}

.g-ball-a {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #333;
  top: 40px;
  left: 40px;
  box-sizing: border-box;
  animation: filterBallMove 4s ease-out infinite;
}

.g-ball-b {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #3F51B5;
  top: 60px;
  right: 40px;
  animation: filterBallMove2 4s ease-out infinite;
}

@keyframes filterBallMove {
  50% {
    left: 140px;
  }
}

@keyframes filterBallMove2 {
  50% {
    right: 140px;
  }
}
```
:::

效果如下：

![效果](https://pic1.imgdb.cn/item/691d7f653203f7be0017bd10.gif)

两球交汇的时候很生硬，这时需要给父元素，添加 `filter: blur()` 和 `filter: contrast()` 的组合，以及一个白色的背景色。

```css
.g-container {
  margin: auto;
  position: relative;
  width: 300px;
  height: 200px;
  filter: blur(6px) contrast(20); /* [!code focus] */
  background: #fff; /* [!code focus] */
}
```

这样就得到这么个融合效果：

![融合效果](https://pic1.imgdb.cn/item/691d857f3203f7be0017d110.gif)

上述效果的实现基于两点：

1. 融合动画的两个元素是在被设置了 `filter: blur(6px) contrast(20)` 的画布背景上进行动画的；
2. 设置了 `filter: blur(6px) contrast(20)` 的画布必须设置一个背景色，在上述的 Demo 中，这个背景色是白色，但不局限于白色。

而 `blur()` 和 `constrast()` 的作用为：

1. `blur()` 的作用

    - 在两个球体重叠区域产生柔化边缘效果
    - 使球体的边界变得模糊，形成平滑的过渡
    - 这种模糊效果让两个球体的重叠部分不是简单的颜色叠加，而是产生了渐变融合

2. `contrast()` 的作用

    - 增强颜色对比度，使球体明暗层次更清晰
    - 让重叠区域的明暗变化更加明显

当然，`blur()` 不仅能设置在父元素上，同时也能设置在子元素上，效果是一样的。

```css
.g-container {
  margin: auto;
  position: relative;
  width: 300px;
  height: 200px;
  filter: blur(6px) contrast(20); /* [!code --] */
  filter: contrast(20); /* [!code ++] */
  background: #fff;
}

.g-ball-a {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #333;
  top: 40px;
  left: 40px;
  box-sizing: border-box;
  filter: blur(6px); /* [!code ++] */
  animation: filterBallMove 4s ease-out infinite;
}

.g-ball-b {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #3F51B5;
  top: 60px;
  right: 40px;
  filter: blur(6px); /* [!code ++] */
  animation: filterBallMove2 4s ease-out infinite;
}
```

> 具体代码可以查看 [模糊滤镜叠加对比度滤镜的融合效果](https://codepen.io/duyidao/pen/VYaWOzB)

这个融合交汇效果是最有趣、最神奇的效果了。掌握了这个技巧后，可以实现非常多意想不到、妙趣横生的动画效果！

#### 使用融合效果实现燃烧的火焰

下面来绘制一个火焰形状的 `div` ：

```css
.fire {
  width: 0;
  height: 0;
  border-radius: 45%;
  box-sizing: border-box;
  border: 100px solid #000;
  border-bottom: 100px solid transparent;
  background-color: #b5932f;
  transform: scaleX(.4);
  filter: blur(20px) contrast(30);
}
```

它的绘制过程如下所示：

![绘制过程](https://pic1.imgdb.cn/item/691d92593203f7be0018034a.png)

接下来，在 `.fire` 元素内部，实现一个大量的黑色圆形由下至上的无规律动画即可，让这些黑色圆形不断地穿过火焰。由于滤镜的融合效果，就能产生神奇的火焰效果！

在这里，为了能更好地理解、更好的可视化，可以先把背景色切换成白色，整个动画的原理一看即懂：

![动画的原理](https://pic1.imgdb.cn/item/691d92a03203f7be0018035f.gif)

> 具体代码可以查看 [使用融合效果实现燃烧的火焰](https://codepen.io/duyidao/pen/EaKXqBg)


#### 实现粘性气泡墙效果

来看一个网页的页脚：

![网页的页脚](https://pic1.imgdb.cn/item/691d95cd3203f7be00180488.gif)

核心的融合效果，使用的就是`filter: contrast()` 与 `filter: blur()` 的组合实现的。

要实现上述的没有融合效果的效果，使用 CSS 是不难的，核心要做的，就是让 N 个圆形元素，从底部无规律地进行向上升起的动画。

再在上述动画的基础之上，给父容器，添加上`filter: contrast()` 与 `filter: blur()` 的组合， 就能够完美地得到这样一个复刻效果。

当然，还能模拟华为的充电特效。

::: code-group
```html
<div class="g-container">
    <div class="g-number">98.7%</div>
    <div class="g-contrast">
        <div class="g-circle"></div>
        <ul class="g-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</div>
```
```css
html,
body {
  width: 100%;
  height: 100%;
  display: flex;
  background: #000;
  overflow: hidden;
}

.g-number {
  position: absolute;
  width: 300px;
  top: 27%;
  text-align: center;
  font-size: 32px;
  z-index: 10;
  color: #fff;
}

.g-container {
  position: relative;
  width: 300px;
  height: 400px;
  margin: auto;
}

.g-contrast {
  filter: contrast(10) hue-rotate(0);
  width: 300px;
  height: 400px;
  background-color: #000;
  overflow: hidden;
  animation: hueRotate 10s infinite linear;
}

.g-circle {
  position: relative;
  width: 300px;
  height: 300px;
  box-sizing: border-box;
  filter: blur(8px);
    
  &::after {
    content: "";
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0);
    width: 200px;
    height: 200px;
    background-color: #00ff6f;
    border-radius: 42% 38% 62% 49% / 45%;
    animation: rotate 10s infinite linear;
  }
    
  &::before {
    content: "";
    position: absolute;
    width: 176px;
    height: 176px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #000;
    z-index: 10;
  }
}

.g-bubbles {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 100px;
  height: 40px;
  transform: translate(-50%, 0);
  border-radius: 100px 100px 0 0;
  background-color: #00ff6f;
  filter: blur(5px);
}

li {
  position: absolute;
  border-radius: 50%;
  background: #00ff6f;
}

@for $i from 0 through 15 { 
  li:nth-child(#{$i}) {
    $width: 15 + random(15) + px;
    left: 15 + random(70) + px;
    top: 50%;
    transform: translate(-50%, -50%);
    width: $width;
    height: $width;
    animation: moveToTop #{random(6) + 3}s ease-in-out -#{random(5000)/1000}s infinite;
  }
}

@keyframes rotate {
  50% {
    border-radius: 45% / 42% 38% 58% 49%;
  }
  100% {
    transform: translate(-50%, -50%) rotate(720deg);
  }
}

@keyframes moveToTop {
  90% {
    opacity: 1;
  }
  100% {
    opacity: .1;
    transform: translate(-50%, -180px);
  }
}

@keyframes hueRotate {
  100% {
    filter: contrast(15) hue-rotate(360deg);
  }
}
```
:::

> 具体代码可以查看 [融合模拟华为充电特效](https://codepen.io/duyidao/pen/gbrxBqy)

#### 使用融合效果实现文字融合特效

同样的，还能使用 `filter: blur()` 与 `filter: contrast()` 的组合，实现文字融合特效。

::: code-group
```html
<h1>刀刀小站，每天都要比昨天更有进步</h1>
```
```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  filter: contrast(20);
  background: #000;
}

h1 {
  color: #fff;
  animation: letterspacing 5s infinite alternate ease-in-out;
}

@keyframes letterspacing {
  0% {
    letter-spacing: -2.2rem;
    filter: blur(5px);
  }

  50% {
    filter: blur(10px);
  }

  100% {
    letter-spacing: 0.5rem;
    filter: blur(0);
  }
}
```
:::

> 具体代码可以查看 [融合效果实现文字融合特效](https://codepen.io/duyidao/pen/qEZXQBy)

#### 使用融合效果构建圆角

看到圆角大家第一反应都是这有啥难的，直接使用 `border-radius` 就可以了。

但是这是基于直线设置的，如果是一个曲线呢？ `border-radius` 就没法用了。虽然可以使用 `::::before` 和 `::after` 伪元素，通过叠加的方式实现，模拟圆角。不过还能一种特殊的技巧，也就是本文的模糊滤镜与对比度滤镜的叠加。

**`blur` 与 `contrast` 滤镜的组合不仅能用于实现粘性融合效果特效，其特殊的性质使得它们的组合可以将直角变成圆角！**

```css
div {
  position: relative;
  margin: auto;
  width: 250px;
  height: 250px;
  filter: contrast(20); /* [!code focus] */
  background-color: #fff; /* [!code focus] */
  overflow: hidden;
}

div::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  filter: blur(7px); /* [!code focus] */
  border: 25px solid transparent; /* [!code focus] */
  border-bottom: 25px solid #000; /* [!code focus] */
  border-radius: 50%; /* [!code focus] */
}
```

> 具体代码可以查看 [融合效果构建圆角](https://codepen.io/duyidao/pen/NPNvJMd)

### 总结

对于模糊滤镜，它们的一些常见技巧有：

1. 利用模糊滤镜配合 backdrop-filter 实现毛玻璃效果
2. 利用模糊实现彩色阴影 / 渐变阴影
3. 利用模糊滤镜实现层次感 / 3D 效果
4. 利用模糊滤镜提取图片主题色

对于对比度滤镜，其最常见的技巧是：

1. 利用对比度滤镜实现元素的过渡高亮的效果
2. 可访问性提升，提升文字对比度

而最后介绍了 CSS 中最神奇的一组组合，模糊滤镜叠加对比度滤镜的实现融合效果，掌握它们，可以实现：

1. 各种融合动画效果
2. 文字的融合动画效果
3. 构建圆角效果，实现波浪效果

当然，模糊滤镜叠加对比度滤镜可以鼓捣的花活还有很多，可以多观察日常工作业务中的各式交互动画，尝试自己利用它们实现一些巧妙的动画效果！