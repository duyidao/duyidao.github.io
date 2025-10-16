## mask 实现高阶动画效果

### 用 mask 实现图片切换动画

在上一个章节 [用 mask 实现内容切换效果](/read/css/CSS%20技术揭秘与实战通关/3#技巧四-用-mask-实现内容切换效果) 中，通过放大 `mask-size` 的宽度范围、修改 `mask-position` 实现了动画堆叠效果。

再看回 [用 mask 实现融合效果](/read/css/CSS%20技术揭秘与实战通关/3#技巧三-用-mask-实现融合效果) 这个例子，两个图片斜角融合，是不是也能通过修改 `mask: linear-gradient` 的参数实现类似的动画堆叠效果呢？

可能有人看到这个效果，直接就开始用 `linear-gradient` 洋洋洒洒的开始写效果了：

```less
div {
  html,
  body {
    width: 100%;
    height: 100%;
    display: flex;
  }

  div {
    margin: auto;
    position: relative;
    width: 300px;
    height: 400px;
    background: url(https://picsum.photos/200/100) no-repeat;
    background-size: cover;

    &::before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url(https://picsum.photos/200/100) no-repeat;
      background-size: cover;
      z-index: 1;
      animation: maskRotate 4s ease-in-out infinite; // [!code ++]
    }
  }

  // [!code ++]
  @keyframes maskRotate {
    // [!code ++]
    0% {
      mask: linear-gradient(45deg, #000 0%, transparent 5%); // [!code ++]
    } // [!code ++]
    // [!code ++]
    50% {
      mask: linear-gradient(45deg, #000 50%, transparent 55%); // [!code ++]
    } // [!code ++]
    // [!code ++]
    100% {
      mask: linear-gradient(45deg, #000 100%, transparent 105%); // [!code ++]
    } // [!code ++]
  } // [!code ++]
}
```

但是保存后效果却不是想象中的有着平滑的过渡效果，而是生硬的从 0% 到 50% 再到 100% 的三个阶段。还记得在第二章 [background 属性进阶技巧讲解及实战演练](/read/css/CSS%20技术揭秘与实战通关/2) 讲到的吗？`linear-gradient` 是不支持动画效果的，因此，如果想要用上方的代码实现效果，需要从 0% 到 100% 每个阶段都设置一次 `mask`，这样虽然可以实现效果，但是代码量会非常庞大，而且维护起来也不方便。

```scss
@keyframes maskChange {
  @for $i from 0 through 100 {
    #{$i}% {
      mask: linear-gradient(
        45deg,
        #000 #{$i + '%'},
        transparent #{$i + 5 + '%'},
        transparent 1%
      );
    }
  }
}
```

借助 `scss` 的循环，可以大大简化代码，但是依然不够优雅，这仅仅是代码层面的简化，编译后的代码依然会非常庞大，而且编译后的代码也不利于维护。

### 用 CSS @property 简化代码

在第二章 [通过 css property 实现背景色渐变动画](/read/css/CSS%20技术揭秘与实战通关/2#通过-css-property-实现背景色渐变动画) 里，可以使用现代语法 `CSS @property` 来定义一个自定义属性，然后通过 `@keyframes` 定义动画，这样把不能用来做动画的渐变嫁接到其他属性上，就能实现动画效果了。

::: code-group

```html
<div class="linear"></div>

<div class="conic"></div>
```

```less
@property --per {
  syntax: '<percentage>';
  inherits: false;
  initial-value: -10%;
}

.linear {
  position: relative;
  width: 300px;
  height: 200px;
  margin: 0 auto 20px;
  background: url(https://picsum.photos/300/200?random=1) no-repeat center /
    100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(https://picsum.photos/300/200?random=2) no-repeat center /
      100%;
    mask: linear-gradient(
      45deg,
      #000 var(--per),
      transparent calc(var(--per) + 2%)
    );
    animation: maskRotate 3s ease-in forwards;
  }
}

.conic {
  position: relative;
  width: 300px;
  height: 200px;
  margin: 0 auto;
  background: url(https://picsum.photos/300/200?random=3) no-repeat center /
    100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(https://picsum.photos/300/200?random=4) no-repeat center /
      100%;
    mask: conic-gradient(#000 var(--per), transparent calc(var(--per) + 2%));
    animation: maskRotate 3s ease-in forwards;
  }
}

@keyframes maskRotate {
  0% {
    --per: -10%;
  }
  100% {
    --per: 100%;
  }
}
```

:::

> 具体效果可查看 [@property 实现渐变动画](https://codepen.io/duyidao/pen/XJXzKWL)

### 用 mask 实现转场动画

前面对于 `mask` 的使用，一直都是用 `background` 的渐变属性作为属性值，但其实 `mask` 还能用 `svg` 、 图片等作为遮罩的内容。

主要实现原理一图流如下：

![原理一图流](https://pic1.imgdb.cn/item/68f08663c5157e1a887824bd.png)

和渐变透明类似，**图片的实色部分与元素内容叠加的部分将可见，图片透明部分与元素内容的叠加部分将不可见**。

因此，可以借助这个特性，实现一些转场效果，比如：

![转场效果](https://pic1.imgdb.cn/item/68f087e6c5157e1a887834f2.gif)

咋一看这个转场动画很复杂，但是核心是下面这张雪碧图：

![核心雪碧图](https://pic1.imgdb.cn/item/68f087fec5157e1a887835aa.png)

看到这个雪碧图相信大家都能看出来它的实现原理了，就是利用透明叠加部分不可见的原理，逐帧改变其不可见的部分，最终完全展示出图片。

::: code-group

```html
<div class="box">
  <div class="img1"></div>
  <div class="img2"></div>
</div>
```

```css
div {
  width: 200px;
  height: 100px;
}
.box {
  position: relative;
}
.img1 {
  position: absolute;
  top: 0;
  left: 0;
  background: red;
}
.img2 {
  position: absolute;
  top: 0;
  left: 0;
  background: url(https://picsum.photos/200/100?random=2);
  mask: url(https://pic1.imgdb.cn/item/68f087fec5157e1a887835aa.png);
  mask-size: 3000% 100%;
  animation: maskMove 5s steps(29) infinite;
}
@keyframes maskMove {
  from {
    mask-position: 0 0;
  }
  to {
    mask-position: 100% 0;
  }
}
```

:::

### 用 mask 实现视频人物遮挡弹幕功能

大家在看电竞比赛或者一些视频，会发现有一些视频软件的弹幕出现在人物视口内不会覆盖角色人物，如：

![弹幕不覆盖人物](https://pic1.imgdb.cn/item/68f08ee7c5157e1a88787bb4.png)

这个也是运用了 `mask` 的特性，F12 打开控制台，可以看到网络请求有很多 `data:image` 的请求：

![请求](https://pic1.imgdb.cn/item/68f090e4c5157e1a88788c82.gif)

这是后台不断计算当前人物的实时位置变化，生成新的 `mask` 图片，前端拿到这个图片后再实时作用于弹幕容器上，这样人物区域的 `mask` 值为 `transparent`，弹幕就只会出现在人物区域之外了。

可以自己动手实现一个简略版的效果加深一下印象，背景图片就采用英雄联盟地图 ![英雄联盟地图](https://pic1.imgdb.cn/item/68f091c8c5157e1a88789377.jpg) 作为背景：

::: code-group

```html
div class="g-yasuo"

<div class="g-barrage-container">
  - for(var i=0; i<30; i++) .g-barrage 我是弹幕iii
</div>
```

```scss
$count: 30;

html,
body {
  width: 100%;
  height: 100%;
  display: flex;
  background: url(https://cdn.boop.pl/uploads/2020/01/inferno-rift-landscape-transformation-lol-season-10-rise-of-the-elements.jpeg)
    no-repeat center / cover;
}

.g-yasuo {
  position: absolute;
  top: 40px;
  left: 40px;
  width: 120px;
  height: 120px;
  background: url(https://picsum.photos/120/120?random=2);
  background-size: cover;
  animation: move 10s infinite alternate;
}

@keyframes move {
  100% {
    transform: translate(calc(85vw), 0);
  }
}

.g-barrage-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  mask: radial-gradient(
    circle at 100px 100px,
    transparent 60px,
    #fff 80px,
    #fff 100%
  );
  animation: mask 10s infinite alternate;
}

@keyframes mask {
  100% {
    mask-position: 85vw 0;
  }
}

.g-barrage {
  position: absolute;
  color: #fff;
  font-size: 24px;
  opacity: 0.8;
}

@for $i from 1 to $count + 1 {
  .g-barrage:nth-child(#{$i}) {
    color: rgb(255, 255, calc(#{$i} * 10));
    top: calc(#{$i % 10} * 18px);
    animation: move
      calc(#{$i * 0.2}s + 10s)
      infinite
      calc(#{$i * 2} * -1s)
      linear;
  }
}
```

:::

> 具体效果可查看 [用 mask 实现视频人物遮挡弹幕功能](https://codepen.io/duyidao/pen/ByjmQWQ)

需要明确一点的是，不是将弹幕部分遮挡住，只是利用 `mask` 的特性，让人物区域附近不显示弹幕。

### 总结

本章节主要使用 `mask` 结合图片实现一些高级动画效果，如：利用逐帧动画和雪碧图，实现场景切换效果。

渐变动画不可作为 `@keyframes` 的属性值，但可以用 `mask` 结合 `@property` 实现，实现渐变动画效果。

`mask` 的实际是图片的实色部分与元素内容叠加的部分将可见，图片透明部分与元素内容的叠加部分将不可见。
