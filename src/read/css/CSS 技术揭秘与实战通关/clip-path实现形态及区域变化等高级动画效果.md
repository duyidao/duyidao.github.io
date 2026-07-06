## clip-path：实现形态及区域变化等高级动画效果

上一个章节讲了 `clip-path` 的基本功能和用法，并且围绕它的静态效果进行描述。本章节将围绕它的动画效果进行讲解，探索它能实现什么样的动画。

### 基于 clip-path 的形变动画

`clip-path` 可以搭配 `transition` 和 `animation` 实现各种动画变化，因此借助过渡和动画效果可以实现一些形变的动画效果。比如，下面这个例子：

::: code-group

```html
<div class="box"></div>
```

```css
.box {
  width: 100px;
  height: 100px;
  background: #f00;
  animation: polygon-change 3s linear infinite;
}

@keyframes polygon-change {
  5% {
    clip-path: polygon(50% 0%, 0% 100%, 0% 100%, 100% 100%, 100% 100%);
  }
  35% {
    clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%, 100% 50%);
  }
  65% {
    clip-path: polygon(50% 0%, 0% 38%, 18% 100%, 82% 100%, 100% 38%);
  }
  100% {
    clip-path: polygon(50% 0%, 0% 100%, 0% 100%, 100% 100%, 100% 100%);
  }
}
```

:::

细心看代码可以看出，上面的代码 `polygon()` 无论是三边形还是四边形，都用了五个顶点，这是为什么呢？如果用对应个数的顶点，会发生什么事情呢？修改一下代码查看效果。

::: code-group

```html
<div class="box-nomore"></div>
```

```css
.box-nomre {
  width: 100px;
  height: 100px;
  background: pink;
  animation: polygon-change-nomore 3s linear infinite;
}

@keyframes polygon-change {
  5% {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  35% {
    clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
  }
  65% {
    clip-path: polygon(50% 0%, 0% 38%, 18% 100%, 82% 100%, 100% 38%);
  }
  100% {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
}
```

:::

> 具体效果可查看 [clip-path 形变动画](https://codepen.io/duyidao/pen/PwZEMEx)

可以看到，当 `polygon()` 的顶点个数不一致时，它就会变成逐帧动画，而不是带有过渡的补间动画。

> [!info] 补充
> **逐帧动画**就是每一帧都是关键帧：每一帧都是自己做出来的。**补间动画**就是知道两端的关键帧，通过计算机自己能计算出中间帧的动画。

### clip-path 的缺陷

从上面的例子可以看出，`clip-path` 在做动画时的缺陷，当进行动画或者过渡的两个 `clip-path` 的顶点个数不一致时，动画会变成逐帧动画，而不是补间动画。

因此需要一点小巧思，让多出来的顶点的坐标个其他点的坐标重合，从而达到隐藏多余的顶点，让数量保持一致。还是以上面的示例为例子，一图流展示：

![一图流展示](https://pic1.imgdb.cn/item/68f5cdb83203f7be0080e547.png)

### 基于 clip-path 的图形变换动画

`clip-path` 除了可以用于实现形变动画，还可以用于实现图形变换动画，比如下面这个效果：

![图形变换动画](https://pic1.imgdb.cn/item/68f5ce283203f7be0080e944.gif)

咋一看好像很复杂，其实拆分下来都是前面学过做过的，具体实现如下：

- 父级 `div` 从正方形过渡到矩形：

  ![父级效果](https://pic1.imgdb.cn/item/68f5d18a3203f7be0080f3fc.gif)

- 子级分为四个部分，每个部分都有自己的过渡动画，以其中一个三角形为例：

  ![子级效果](https://pic1.imgdb.cn/item/68f5d2f83203f7be0080f90b.gif)

  只需要依次实现四个三角形的过渡动画即可。

::: code-group

```html
<div class="box">
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
  <div class="box4"></div>
</div>
```

```css
.box {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 10px auto;
  animation: change 2s infinite alternate;
}

.box1,
.box2,
.box3,
.box4 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.box1 {
  animation: clip-box1 2s infinite alternate;
}

.box2 {
  animation: clip-box2 2s infinite alternate;
}

.box3 {
  animation: clip-box3 2s infinite alternate;
}

.box4 {
  animation: clip-box4 2s infinite alternate;
}

@keyframes clip-box1 {
  0% {
    background-color: #333;
    clip-path: polygon(0% 0%, 50% 50%, 0% 100%);
  }
  100% {
    background-color: skyblue;
    clip-path: polygon(0% 100%, 12.5% 0%, 25% 100%);
  }
}

@keyframes clip-box2 {
  0% {
    background-color: #333;
    clip-path: polygon(0% 0%, 50% 50%, 100% 0%);
  }
  100% {
    background-color: skyblue;
    clip-path: polygon(25% 0%, 37.5% 100%, 50% 0%);
  }
}

@keyframes clip-box3 {
  0% {
    background-color: #333;
    clip-path: polygon(100% 0%, 50% 50%, 100% 100%);
  }
  100% {
    background-color: skyblue;
    clip-path: polygon(75% 0%, 87.5% 100%, 100% 0%);
  }
}

@keyframes clip-box4 {
  0% {
    background-color: #333;
    clip-path: polygon(0% 100%, 50% 50%, 100% 100%);
  }
  100% {
    background-color: skyblue;
    clip-path: polygon(50% 100%, 62.5% 0%, 75% 100%);
  }
}

@keyframes change {
  0% {
    width: 100px;
    height: 100px;
  }
  100% {
    width: 200px;
    height: 50px;
  }
}
```

:::

> 具体效果可查看 [clip-path 图形变换动画](https://codepen.io/duyidao/pen/EaPQxKM)

### 基于 clip-path 的边框动画

上面基于 `clip-path` 实现动画效果，都是围绕着修改坐标点进行的，通过从一个形状裁剪成另外一个形状来实现。下面继续利用这个特点，实现边框动画效果。

![边框动画效果](https://pic1.imgdb.cn/item/68f5e2bb3203f7be00814a5c.gif)

咋一看好像很复杂，其实可以利用 `clip-path: inset()` 方法来实现，`inset()` 方法主要用于定义一个矩形的内凹形状，具体语法如下：

```css
clip-path: inset(10px 20px 30px 40px);
```

上面代码表示，矩形从上、右、下、左四个方向分别内凹 10px、20px、30px、40px，具体效果如下：

应用到这个例子中，只需要为 `div` 的伪类 `::before` 设置 `inset()` ，通过动画修改其参数让它在内部裁剪出靠上、靠左、靠下、靠右的矩形，添加上边框即可。

::: code-group

```html
<div class="box"></div>
<div class="bg">示意图</div>
```

```css
body,
html {
  width: 100%;
  height: 100%;
  display: flex;
}

div {
  position: relative;
  margin: auto;
  width: 160px;
  line-height: 160px;
  text-align: center;
  font-size: 24px;
  background: skyblue;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 4px solid red;
    transition: all 0.5s;
    animation: clippath 3s infinite linear;
  }
}

@keyframes clippath {
  0%,
  100% {
    clip-path: inset(0 0 50% 0);
  }

  25% {
    clip-path: inset(0 50% 0 0);
  }
  50% {
    clip-path: inset(50% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 50%);
  }
}

.bg::before {
  background: rgba(255, 215, 0, 0.5);
}
```

:::

> 具体效果可查看 [clip-path 边框动画](https://codepen.io/duyidao/pen/ZYQrGOK)

该方法还支持圆角 `border-radius` ，因此，利用圆角和另一个伪类，可以实现以下的线条环绕按钮效果。

> 具体效果可查看 [clip-path 线条环绕按钮](https://codepen.io/duyidao/pen/KwVrbWp)

### 基于 clip-path 的故障动画

首先先来看看如何通过 `clip-path` 实现文本切割效果，`clip-path` 有 `polygon()` 方法，可以把一个容器切割成其他形状，例如切成平行四边形：

![文本切割效果](https://pic1.imgdb.cn/item/690811873203f7be00c528ad.png)

具体实现如下：

::: code-group

```html
<div class="box">Hello</div>
```

```css
.box {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: 10px auto;
  background: skyblue;
  clip-path: polygon(35% 0, 85% 0, 75% 100%, 25% 100%);
}
```
:::

基于这个裁剪思路，可以把一个效果总结为如下三点：

1. 声明一个 `div` ，添加一个子元素 `span` ，`data-text` 自定义属性设置为文字内容，使用伪类制作成多个副本，利用绝对定位叠在一起
2. 分别裁剪这几个副本，让他们分别裁剪为不同的碎片形状
3. 通过 `animate` 动画效果让他们分离，实现裂开的效果

::: code-group
```html
<div data-text="Hello" class="box">
  <span>Hello</span>
</div>
```
```css
body,
html {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #000;
  overflow: hidden;
  font-family: sans-serif;
}

.box {
  position: relative;
  margin: auto;
  font-size: 50px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-shadow: 0 0 10px blue;
  user-select: none;
  white-space: nowrap;
  filter: blur(0.007em);
  animation: shake 2.5s linear forwards;
}

.box span {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  clip-path: polygon(10% 0%, 44% 0%, 70% 100%, 55% 100%);
}

.box::before,
.box::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
}

.box::before {
  animation: crack1 2.5s linear forwards;
  clip-path: polygon(0% 0%, 10% 0%, 55% 100%, 0% 100%);
}

.box::after {
  animation: crack2 2.5s linear forwards;
  clip-path: polygon(44% 0%, 100% 0%, 100% 100%, 70% 100%);
}

@keyframes shake {
  5%,
  15%,
  25%,
  35%,
  55%,
  65%,
  75%,
  95% {
    filter: blur(0.018em);
    transform: translateY(0.018em) rotate(0deg);
  }

  10%,
  30%,
  40%,
  50%,
  70%,
  80%,
  90% {
    filter: blur(0.01em);
    transform: translateY(-0.018em) rotate(0deg);
  }

  20%,
  60% {
    filter: blur(0.03em);
    transform: translate(-0.018em, 0.018em) rotate(0deg);
  }

  45%,
  85% {
    filter: blur(0.03em);
    transform: translate(0.018em, -0.018em) rotate(0deg);
  }

  100% {
    filter: blur(0.007em);
    transform: translate(0) rotate(-0.5deg);
  }
}

@keyframes crack1 {
  0%,
  95% {
    transform: translate(-50%, -50%);
  }

  100% {
    transform: translate(-51%, -48%);
  }
}

@keyframes crack2 {
  0%,
  95% {
    transform: translate(-50%, -50%);
  }

  100% {
    transform: translate(-49%, -53%);
  }
}
```
:::

> 具体效果可查看 [clip-path 文本切割](https://codepen.io/duyidao/pen/QwyJzJN)

通过 `clip-path` 的 `inset()` 方法，随机出一个矩形区域，搭配一些其他的样式方法，实现图片突出的效果。再加上多个不同 `inset()` 参数的关键帧组成的 `animate` 动画，就可以实现图片故障效果。

```css
$img: "https://mzz-files.oss-cn-shenzhen.aliyuncs.com///uploads/U1002433/0cb5e044a1f0f7fc15f61264ee97ac1f.png";

@function randomNum($max, $min: 0, $u: 1) {
  @return ($min + random($max)) * $u;
}

div {
  position: relative;
  width: 658px;
  height: 370px;
  margin: auto;
  background: url($img) no-repeat;
  animation: main-img-hide 20s infinite step-end;
}

div::before,
div::after {
  position: absolute;
  width: 658px;
  height: 370px;
  top: 0;
  left: 0;
  background: inherit;
}

div::after {
  content: "";
  animation: glitch-one 20s infinite step-end;
}

div::before {
  content: "";
  animation: glitch-two 20s infinite 1s step-end;
}

@keyframes glitch-one {
  @for $i from 20 to 30 {
      #{$i / 2}% {
          left: #{randomNum(200, -100)}px;
          clip-path: inset(#{randomNum(150, 30)}px 0 #{randomNum(150, 30)}px);
      }
  }

  15.5% {
      clip-path: inset(10px 0 320px);
      left: -20px;
  }
  16% {
      clip-path: inset(10px 0 320px);
      left: -10px;
      opacity: 0;
  }
  45% {
      opacity: 0.5;
      left: -20px;
      filter: hue-rotate(90deg) saturate(1.3);
  }
  45.5% {
      left: 0px;
      filter: invert(1);
  }

  46% {
      clip-path: inset(150px 0 160px);
      left: 15%;
  }
  46.5% {
      clip-path: inset(20px 0 200px);
      left: -10%;
      transform: scale(1.1);
  }
  47% {
      clip-path: inset(240px 0 20px);
      left: -11%;
      transform: scale(1.2);
  }
  47.5% {
      clip-path: inset(20 0 20px);
      left: 13%;
      transform: scale(1.3);
      filter: invert(0);
  }
  48% {
      clip-path: inset(120 0 120px);
      left: 15%;
      transform: scale(1.1);
  }
  48.5% {
      clip-path: inset(260px 0 10px);
      left: -11%;
      transform: scale(1.2);
      filter: none;
  }
  49% {
      clip-path: inset(5px 0 350px);
      left: 11%;
      transform: scale(1.3);
  }
  49.5% {
      clip-path: inset(105px 0 210px);
      left: 0%;
      transform: scale(1.1);
  }
  50% {
      clip-path: inset(175px 0 160px);
      left: -11%;
  }
  50.5% {
      clip-path: inset(95px 0 230px);
      left: -14%;
      transform: scale(1.2);
  }
  51% {
      clip-path: inset(235px 0 12px);
      left: -14%;
  }
  51.5% {
      clip-path: inset(350px 0 7px);
      left: -14%;
  }
  52% {
      clip-path: inset(320px 0 27px);
      left: -12%;
      transform: scale(1.1);
  }
  52.5% {
      clip-path: inset(190px 0 127px);
      left: -11%;
      transform: scale(1.3);
      filter: hue-rotate(90deg) saturate(1.3);
  }
  54% {
      clip-path: inset(20px 0 20px);
      left: 12%;
      transform: scale(1.1);
      filter: none;
  }
  54% {
      background-image: none;
  }
}

@keyframes glitch-two {
  @for $i from 40 to 50 {
      #{$i / 2}% {
          left: #{randomNum(200, -100)}px;
          clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      }
  }

  25.5% {
      clip-path: inset(10px 0 320px);
      left: -20px;
  }
  26% {
      clip-path: inset(10px 0 320px);
      left: -10px;
      opacity: 0;
  }
  45% {
      opacity: 0.3;
      left: -20px;
      filter: hue-rotate(45deg) saturate(1.1);
  }
  45.5% {
      left: 0px;
      filter: invert(1.2);
  }

  46% {
      clip-path: inset(50px 0 260px);
      left: -12%;
  }
  46.5% {
      clip-path: inset(120px 0 100px);
      left: 8%;
      transform: scale(1.2);
  }
  47% {
      clip-path: inset(40px 0 300px);
      left: 8%;
      transform: scale(1.3);
  }
  47.5% {
      clip-path: inset(220 0 70px);
      left: -9%;
      transform: scale(1.1);
      filter: invert(1.1);
  }
  48% {
      clip-path: inset(240px 0 120px);
      left: 11%;
      transform: scale(1.2);
  }
  48.5% {
      clip-path: inset(0px 0 310px);
      left: -12%;
      transform: scale(1.2);
      filter: none;
  }
  49% {
      clip-path: inset(255px 0 50px);
      left: 11%;
      transform: scale(1.3);
  }
  49.5% {
      clip-path: inset(10px 0 240px);
      left: 6%;
      transform: scale(1.1);
  }
  50% {
      clip-path: inset(275px 0 90px);
      left: -12%;
  }
  50.5% {
      clip-path: inset(195px 0 90px);
      left: 14%;
      transform: scale(1.4);
  }
  51% {
      clip-path: inset(35px 0 282px);
      left: -14%;
  }
  51.5% {
      clip-path: inset(350px 0 7px);
      left: 14%;
  }
  52% {
      clip-path: inset(20px 0 270px);
      left: -12%;
      transform: scale(1.1);
  }
  52.5% {
      clip-path: inset(90px 0 227px);
      left: -11%;
      transform: scale(1.3);
      filter: hue-rotate(150deg) saturate(1.3);
  }
  54% {
      clip-path: inset(220px 0 100px);
      left: 12%;
      transform: scale(1.1);
      filter: none;
  }
  54% {
      background-image: none;
  }
}

@keyframes main-img-hide {
  5% {
      filter: invert(1);
  }
  5.2% {
      filter: none;
  }
  10% {
      opacity: 0.5;
      filter: grayscale(1);
  }
  11% {
      filter: none;
      opacity: 1;
  }
  45% {
      opacity: 0.5;
      filter: grayscale(1);
  }
  46% {
      filter: none;
      opacity: 1;
  }
  53.5% {
      opacity: 0.5;
      filter: grayscale(1);
  }
  54% {
      filter: none;
      opacity: 1;
  }
  54.5% {
      opacity: 0.5;
      filter: hue-rotate(30deg);
  }
  55% {
      filter: none;
  }
  55.5% {
      background-image: none;
      filter: none;
      opacity: 1;
  }
  56% {
      background-image: url($img);
      opacity: 0.5;
  }
  56.5% {
      background-image: none;
  }
  57% {
      background-image: url($img);
      opacity: 0.8;
  }
  57.5% {
      opacity: 0.3;
  }
  58% {
      background-image: none;
  }
}
```

核心的属性效果：

- `left` 值：使伪元素在水平方向上偏移，产生错位感。
- `clip-path`：裁剪伪元素，只显示部分区域，制造出 “撕裂” 或 “断开” 的视觉效果。
- `transform`：可能包括缩放 (`scale`)，增加动态感。
- `filter`：如 `hue-rotate`（色相旋转）、`saturate`（饱和度）、`invert`（反色）等，改变颜色表现。
- `opacity`：控制透明度。
- `background-image`: `none` 在某些时刻完全隐藏伪元素的背景图片。

> 具体效果可查看 [clip-path 故障动画](https://codepen.io/duyidao/pen/XJXyOqy)

### 基于 clip-path 实现动态区域裁剪

最后看一个使用 `clip-path` 实现动态区域裁剪的效果。该效果用到了 `circle()` 方法，可以创建一个圆形裁剪路径。通过改变 `circle()` 的半径参数，可以动态改变裁剪区域的大小和位置，从而实现动态区域裁剪的效果。

::: code-group
```html
<div class="g-container">
    <ul>
        <li>11111</li>
        <li>22222</li>
        <li>33333</li>
        <li>44444</li>
    </ul>
</div>
```
```css
body,
html {
    width: 100%;
    height: 100%;
    display: flex;
    background: #303f9f;
}

.g-container {
    position: relative;
    width: 400px;
    height: 300px;
    margin: auto;
    overflow: hidden;
    cursor: pointer;
    transition: clip-path 0.3s linear;
    clip-path: circle(20px at 44px 44px);
    background: #fff;

    &:hover {
        clip-path: circle(460px at 44px 44px);
    }
}

ul {
    position: absolute;
    top: 100px;
    line-height: 32px;
    padding-left: 50px;
    font-size: 18px;

    li:hover {
        color: deeppink;
    }
}
```
:::

> 具体效果可查看 [clip-path 动态区域裁剪](https://codepen.io/duyidao/pen/PwZxLJQ)

### 总结

本章节着重介绍了如何使用 `clip-path` 实现动画效果，在实现效果的适合需要注意以下几点：

- `clip-path`: `polygon` 多边形是可以进行动画变换的，但是要注意，进行动画及过渡的两个状态，`polygon()` 内的坐标顶点的数量必须一致
- 使用 `clip-path` 实现的动画由于会裁剪掉裁剪区域外的内容，因此对容器有内容的情况需要特别注意，可以通过伪元素等方式将对元素本身的影响进行转移，通过一些与内容无关的元素进行动画效果的呈现
- 利用 `clip-path` 裁剪切割元素的特性，在动画的过程中，可以配合其他属性，共同完成更多奇思妙想的动画效果