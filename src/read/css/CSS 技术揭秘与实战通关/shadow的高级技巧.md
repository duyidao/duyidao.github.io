## shadow的高级技巧

上一章节讲了 `box-shadow` 怎么使用，以及如何不使用 `box-shadow` ，而是用别的方法，来模拟实现阴影的效果。

本章节，则是从如何使用 `box-shadow` ，来实现不是阴影的效果。

### 技巧一：利用阴影复制自身图形

#### 复制自身图形

关于阴影 `box-shadow` 第一个核心技巧就是能复制自身，最重要的点是它**能设置多个（多重阴影）**。

当阴影的模糊半径和扩散半径都为0时，能得到一个和元素本身一样大小的阴影，当然如果仅仅这样是看不到效果的，因为被压在元素下方。这时再调整它的水平偏移和垂直偏移，就能得到如下效果：

```css
.box {
  width: 100px;
  height: 100px;
  background-color: #f06;
  box-shadow: 100px 100px 0 0 #000;
}
```

![效果](https://pic1.imgdb.cn/item/690c052c3203f7be00da1eac.png)

利用这个技巧，在需要重复自身图形的场景，可以运用这个技巧减少<word text="DOM" />的节点数量。

例如下方两个场景：

- 标题左右两侧的圆点效果，只需要一个 `div` 即可，左右两侧的点只需要通过伪类 `::before` 和 `::after` 来实现第一个元素，剩下两个点则通过阴影来实现。
  
  ![标题左右两侧的圆点效果](https://pic1.imgdb.cn/item/690c08603203f7be00da54f5.png)

- 云朵效果，只需要一个 `div` 即可，画一个圆，然后通过阴影复制多个大小不同的圆，堆叠在一起，就能实现云朵效果。
  
  ![云朵效果](https://pic1.imgdb.cn/item/690c0ab53203f7be00da7890.png)

- 多层边框效果，在一些多层边框效果场景下，`border` 属性无法满足需求，这时可以通过 `box-shadow` 复制多个自身图形，设置为内阴影或外阴影，来实现多层边框效果。
  
  ![多层边框效果](https://pic1.imgdb.cn/item/691144b83203f7be00ec12af.png)

::: code-group
```css [圆点.css]
.box {
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 20px;
  line-height: 1;
  &::before, &::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: #000;
    border-radius: 50%;
  }
  
  &::before {
    box-shadow: 15px 0 0 0 #000, 30px 0 0 0 #000;
  }
  &::after {
    box-shadow: -15px 0 0 0 #000, -30px 0 0 0 #000;
  }
}
```
```css [云朵.css]
.cloud {
  width: 50px;
  height: 50px;
  background: #ccc;
  border-radius: 50%;
  margin: auto;
  box-shadow:
    25px 10px 0 5px #ccc,
    60px 15px 0 0 #ccc,
    25px -20px 0 0 #ccc,
    65px -10px 0 0 #ccc,
    50px -10px 0 0 #ccc;
}
```
```css [多层边框.css]
.border {
  width: 150px;
  height: 75px;
  margin: 50px auto;
  border: 5px solid skyblue;
  box-shadow:
    inset 0 0 0 4px pink,
    0 0 0 8px orange,
    0 0 0 12px purple,
    0 0 0 16px yellow;
}
```
:::

> 具体代码可以查看 [利用阴影绘制自身图形](https://codepen.io/duyidao/pen/azdrwZq)


#### 从内部复制自身

![阴影内部复制自身效果](https://pic1.imgdb.cn/item/691148123203f7be00ec15d1.png)

这个效果图初看能想到很多实现的方法，但是最快的实现方式，还是通过 `box-shadow` 内阴影来实现。

```css
div {
  width: 150px;
  height: 75px;
  border: 6px solid #000;
  margin: 50px auto;
  font-size: 2em;
  text-align: center;
  line-height: 70px;
  letter-spacing: 4px;
  /* [!code focus] */
  border-radius: 20px;
  /* [!code focus] */
  background: yellow;
  /* [!code focus] */
  box-shadow:
  /* [!code focus] */
    inset 0 -4px 0 0 gray,
  /* [!code focus] */
    inset 0 -9px 0 0 #000;
}
```

通过一行内阴影，就能轻松实现这个效果，拆解一下，它的实际过程是这样的：

![实际过程](https://pic1.imgdb.cn/item/6911494d3203f7be00ec17cd.png)

> 具体代码可以查看 [利用阴影内部复制自身](https://codepen.io/duyidao/pen/xbVKVKB)

#### 绘制曲线等复杂图形

到如今，`box-shadow` 已经可以基于<word text="CSS" />绘制一些通常而言无法绘制的图形，如曲线。

在之前，想要绘制一条曲线，可能性的方法是借助 `clip-path`；或者其他奇淫技巧，使用 `text-decoration` 的波浪下划线 `wavy`；更甚至，使用渐变叠加来实现。

现在，原生<word text="CSS" />已经支持数学函数的 `cos()` 、 `sin()` 和 `tan()` 等三角函数方法，可以轻松绘制出曲线图形。

回顾一下 `sin()` 和 `cos()` 函数：

![数学函数](https://pic1.imgdb.cn/item/69114e783203f7be00ec2226.png)

基于上述利用 `box-shadow` 实现任意图片转换的思路，我们实现一个初始的圆形，并且利用它的多重阴影的能力，使阴影的方向按照三角函数中正弦/余弦函数的图像一样排列分布，连起来就可以得到一条曲线。

```css
@function shadowSet($vx, $vy, $color) {
  $shadow : 0 0 0 0 $color;
  
  @for $i from 0 through 50 { 
    $x: calc(2 * sin(#{$i * 15 * 1deg}) * #{$vy});
    $y: $i * $vy;
      
    $shadow: $shadow, #{$x} #{$y} 0 0 $color;
  }
  
  @return $shadow;
}

div {
  margin:auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: move 3s infinite linear;
  background: #f00;
  box-shadow: shadowSet(3px, 3px, #f00);
}
div:nth-child(2) {
  width: 6px;
  height: 6px;
  background: #fc0;
  box-shadow: shadowSet(3px, 3px, #fc0);
}
div:nth-child(3) {
  width: 4px;
  height: 4px;
  background: #000;
  box-shadow: shadowSet(2px, 2px, #000);
}
```

这里封装一个 `SCSS` 的函数，实际上它转换为 `CSS` 代码就是多个阴影叠加组成：

![转换为css](https://pic1.imgdb.cn/item/691151963203f7be00ec24ae.png)

### 技巧二：遮罩模拟，利用阴影模拟半透明遮罩层

下面来看掘金登录的遮罩层效果：

![掘金登录的遮罩层效果](https://pic1.imgdb.cn/item/6911548c3203f7be00ec2b24.png)

在一些设计中，为了突出某些 UI 组件（一般是弹窗），都会使用一个遮罩层来调暗背景部分，提升用户的体验。

在之前，大家一般想到的思路，是新增一个遮罩层 `div` ，覆盖背部，然后弹窗组件通过定位布局，放到对应的位置；又或者使用伪元素 `::before` 等。

但是这种布局，使用 `box-shadow` 也能模拟出这种效果，代码量更少更方便。

```css
.shadow {
  width: 200px;
  height: 200px;
  background: #fff;
  margin: auto;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, .5);
}
```

![最终效果](https://pic1.imgdb.cn/item/691156d13203f7be00ec2f94.png)

主要的实现思路是为 `box-shadow` 的扩散半径设置一个非常大的值，然后设置一个半透明的颜色，这样就可以覆盖住整个屏幕。

基于此，还能修改一下遮罩层的交互逻辑，比如一开始不显示遮罩，鼠标 `hover` 到弹窗组件上时，再显示遮罩层。

> 具体代码可以查看 [利用阴影模拟遮罩层](https://codepen.io/duyidao/pen/gbrYMOv)

当然，这个实现方法也有一些注意事项：

- 为了确保 `box-shadow` 生成的阴影在所有浏览器视口大小下都能覆盖整个页面，可能需要将阴影的尺寸，也就是阴影的扩散半径（第四个数字参数值）设置得很大
- 使用 `box-shadow` 生成的阴影，它是无法阻止它背后元素的交互事件的，譬如阴影后面的元素还是可以被 `hover` 和 `click`，使用这种方式时，需要配合 `pointer-event` 一起，禁止掉元素的点击相关事件
- 从性能角度而言，`box-shadow` 属于耗性能样式，不同样式在消耗性能方面也有所不同，`box-shadow` 在渲染方面更加耗费性能，因为它的绘制代码执行时间较长，因此在实际使用时仍需要仔细考虑此方案的优缺点

### 技巧三：光效动画，使用阴影实现霓虹氖灯效果

氖灯效果，英文名 Neon，是一种常见的样式和动画效果，常用于营造一种未来感。

它的原理很简单，本质上是大范围的 `box-shadow` 多个阴影与文字颜色的叠加，在设置样式时只需要添加 3~n 个阴影，每一层的模糊半径差距调大，使用同一个颜色，就能实现效果。

还能添加鼠标 `hover` 后再展示氖灯效果，让样式更生动。

::: code-group
```html
<div class="box">Daodao</div>
<div class="hover">Hover</div>
```
```css
body {
  background-color: black;
}

.box,
.hover {
  color: #fff;
  font-size: 120px;
  text-align: center;
}

.box {
  text-shadow: 0 0 10px #0ebeff, 0 0 20px #0ebeff, 0 0 50px #0ebeff,
    0 0 100px #0ebeff, 0 0 200px #0ebeff;
}

.hover {
  width: fit-content;
  margin: 50px auto;
  &:hover {
    text-shadow: 0 0 10px #0ebeff, 0 0 20px #0ebeff, 0 0 50px #0ebeff,
      0 0 100px #0ebeff, 0 0 200px #0ebeff;
  }
}
```
:::

> 一般情况下，氖灯效果会搭配背景色黑色，让氛围更有效果。

还能基于这个效果添加动画，通过 `animation-delay` 让每一个文字的阴影错开时间出现，还能模拟固定闪烁效果。

```css
.delay {
  width: fit-content;
  margin: 50px auto;
  span {
    animation: light 1s linear forwards;

    &:nth-of-type(2) {
      animation-delay: 1.5s;
    }

    &:nth-of-type(4) {
      animation-delay: 2.2s;
    }

    &:nth-of-type(3),
    &:nth-of-type(5) {
      animation-delay: 3s;
    }
  }
}

@keyframes light {
  0% {
    color: #333;
  }
  5%,
  15%,
  25%,
  30%,
  100% {
    color: #fff;
    text-shadow: 0px 0px 5px #0ebeff, 0px 0px 10px #0ebeff, 0px 0px 20px #0ebeff,
      0px 0px 50px #0ebeff;
  }
  10%,
  20% {
    color: #333;
    text-shadow: none;
  }
}
```

> 具体代码可以查看 [阴影实现霓虹氖灯效果](https://codepen.io/duyidao/pen/XJdbNBq)

### 技巧四：阴影动画优化技巧

在切换背景阴影 `box-shadow` 时，有时候会发现效果卡卡的，这是因为浏览器在不断重排盒子阴影，因此这一块性能消耗会相对大。如果切换的频繁了，性能问题就会更加明显。

这里介绍一个特殊的优化技巧：**把重排的阴影变化，变为重绘的透明度变化**。

步骤如下：

1. 给元素添加一个伪类，大小与父元素一致，设置好变化后的阴影，初始透明度设置为0，不让它显示
2. 再添加一个伪类，大小与父元素一致，设置好变化前的初始阴影，初始透明度设置为1，让这个伪类显示
3. 鼠标 `hover` 后，切换这两个伪类的透明度即可

下面来看一张图，揭示这两个方法在重绘和重排的区别：

![重绘和重排的区别](https://pic1.imgdb.cn/item/691a7e943203f7be000b87d7.png)

也可以看看这篇文章的描述 [very few CSS properties](https://csstriggers.com/)。

```css
div {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 50px auto;
  transition: all .3s;
}

div:hover {
  transform: scale(1.5);
}

.box {
  box-shadow: 0 0 10px 5px #ccc;
}

.box:hover {
  box-shadow: 0 0 10px 5px #555;
}

.foo::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 10px 5px #ccc;
  opacity: 1;
}

.foo::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 10px 5px #555;
  opacity: 0;
}

.foo:hover::before {
  opacity: 0;
}

.foo:hover::after {
  opacity: 1;
}
```

对比一下两者的效果：

![对比一下两者的效果](https://pic1.imgdb.cn/item/6913fd493203f7be00f6ea00.gif)

> 具体代码可以查看 [阴影动画优化技巧](https://codepen.io/duyidao/pen/YPqNLVO)

### 总结

这篇文章展示了如何巧妙地利用 box-shadow 的特性，突破其“制造阴影”的常规用途，实现更多富有创意和实用性的视觉效果与交互。

1. 利用阴影复制自身图形

    - 核心原理：box-shadow 支持多重阴影（多个阴影值），通过精确控制每个阴影的偏移量、模糊半径和扩散半径，可以将元素的形状复制并放置在不同位置。
    
    - 应用场景：
       
      1. 简化<word text="DOM" />>结构：例如，实现标题两侧的圆点或多个圆点，只需一个元素和伪元素配合阴影即可。
      2. 创造复杂图形：例如，通过多个大小不同的圆的阴影堆叠，可以轻松绘制出云朵效果。
      3. 实现多层边框：利用内阴影（`inset`）和外阴影的组合，可以创建比 border 更复杂的边框效果。
      4. 内部复制自身：通过 `inset` 内阴影，可以实现特定的内部图案效果（如文本区域的分层阴影）。
      5. 绘制曲线等复杂图形：结合<word text="CSS" />数学函数（如 `sin`, `cos`）和多重阴影，理论上可以近似绘制出各种曲线。

2. 遮罩模拟，利用阴影模拟半透明遮罩层

      - 核心原理：通过给 `box-shadow` 设置一个非常大的扩散半径（9999px）并使用半透明颜色，可以模拟一个覆盖整个视口的半透明遮罩层。
      
      - 优势：相比添加额外的<word text="DOM" />元素（如 `<div>` 或伪元素），这种方法代码更简洁。可以结合 `:hover` 等交互实现动态遮罩。

      - 注意事项：
      
          1. 需要足够大的扩散半径才能覆盖整个视口。
          2. 阴影不会阻止背后的元素交互，需配合 `pointer-events: none` 等属性。
          3. `box-shadow` 本身是性能消耗较大的样式，应谨慎使用。

3. 光效动画，使用阴影实现霓虹氖灯效果

      - 核心原理：通过叠加多个具有不同模糊半径和相同颜色的 `box-shadow`，并配合 `text-shadow` 或 `box-shadow` 的动画，可以创造出类似霓虹灯的发光效果。
      - 应用场景：常用于标题、按钮或 UI 元素，营造未来感或强调效果。可以结合 `hover` 或动画，实现动态闪烁效果。

4. 阴影动画优化技巧

      - 核心原理：直接改变 `box-shadow` 属性会导致浏览器进行重排（`reflow`），性能消耗较大。优化方法是将阴影变化转化为透明度变化。
      - 具体做法：利用伪元素（`::before` 和 `::after`）分别定义不同状态下的阴影，初始状态下一个伪元素透明度为 1（可见），另一个为 0（隐藏）。当需要切换时，通过改变这两个伪元素的 `opacity` 来实现过渡，从而避免了 `box-shadow` 的重排，提升动画流畅度。
      - 优势：提升动画性能，尤其适用于频繁切换阴影效果的场景。