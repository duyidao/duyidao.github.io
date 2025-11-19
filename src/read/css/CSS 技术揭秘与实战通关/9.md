## filter在CSS中的三种滤镜模式及其特殊性介绍

在<word text="CSS" />中，不同的滤镜有着不同的使用方式和作用，使用方式分为以下三种：

1. 通过 `filter` 使用滤镜
2. 通过 `backdrop-filter` 使用滤镜
3. 通过 `filter` 属性的 `url()` 值，引入 SVG 滤镜

### filter 滤镜基础扫盲

首先来了解一下 `filter` 滤镜，看看它的每一个属性值的作用：

:::code-group
```html
<div class="normal">
  <img src="https://picsum.photos/200/80" />
  <p>normal</p>
</div>
<div class="blur">
  <img src="https://picsum.photos/200/80" />
  <p>模糊滤镜blur</p>
</div>
<div class="brightness">
  <img src="https://picsum.photos/200/80" />
  <p>明亮度滤镜brightness</p>
</div>
<div class="contrast">
  <img src="https://picsum.photos/200/80" />
  <p>对比度滤镜contrast</p>
</div>
<div class="drop-shadow">
  <img src="https://picsum.photos/200/80" />
  <p>阴影滤镜drop-shadow</p>
</div>
<div class="grayscale">
  <img src="https://picsum.photos/200/80" />
  <p>灰度滤镜grayscale</p>
</div>
<div class="hue-rotate">
  <img src="https://picsum.photos/200/80" />
  <p>色相旋转滤镜hue-rotate</p>
</div>
<div class="invert">
  <img src="https://picsum.photos/200/80" />
  <p>反转滤镜invert</p>
</div>
<div class="opacity">
  <img src="https://picsum.photos/200/80" />
  <p>不透明度滤镜opacity</p>
</div>
<div class="saturate">
  <img src="https://picsum.photos/200/80" />
  <p>饱和度滤镜saturate</p>
</div>
<div class="sepia">
  <img src="https://picsum.photos/200/80" />
  <p>褐色滤镜sepia</p>
</div>
```
```css
body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

div p {
  margin: 0;
  font-size: 14px;
  font-family: '宋体';
  font-weight: 600;
}

.blur img {
  filter: blur(5px);
}

.brightness img {
  filter: brightness(0.5);
}

.contrast img {
  filter: contrast(500%);
}

.drop-shadow img {
  filter: drop-shadow(0 0 50px orange);
}

.grayscale img {
  filter: grayscale(50%);
}

.hue-rotate img {
  filter: hue-rotate(50deg);
}

.invert img {
  filter: invert(50%);
}

.opacity img {
  filter: opacity(50%);
}

.saturate img {
  filter: saturate(50%);
}

.sepia img {
  filter: sepia(50%);
}
```
:::

它们的具体效果如下图所示：

![具体效果图](https://pic1.imgdb.cn/item/691a90a43203f7be000c6cf4.png)

> 具体代码可以查看 [filter滤镜基础扫盲](https://codepen.io/duyidao/pen/XJdpYoG)

### filter 滤镜是可以叠加使用的

- **可以给同个元素同时定义多个不同的滤镜**

    每个滤镜都有自己的色值处理算法，同个元素同时定义多个不同的滤镜情况下，不同的先后顺序最终产生的效果也不一样。

    ```css
    .box1 {
      filter: contrast(150%) brightness(1.5)
    }

    .box2 {
      filter: brightness(1.5) contrast(150%)
    }
    ```

    ![效果图](https://pic1.imgdb.cn/item/691a94793203f7be000c9127.png)

- **可以给同个元素同时定义多个相同的滤镜**
  
    通常而言，在 `filter: drop-shadow()` 的使用过程中，可以给同个元素，同时定义多个相同的滤镜。

    例如，先画一个三角形：

    ```css
    div {
      margin: auto;
      border: 50px solid transparent;
      border-top: 50px solid #000;
    }
    ```

    ![画一个三角形](https://pic1.imgdb.cn/item/691abfd13203f7be000dee68.png)

    多次使用 `drop-shadow()` 关键字来生成多重阴影。

    ```css
    div {
      margin: auto;
      border: 50px solid transparent;
      border-top: 50px solid #000;
      /* [!code ++] */
      filter:
        /* [!code ++] */
        drop-shadow(5px 10px 2px #f00)
        /* [!code ++] */
        drop-shadow(-5px -10px 2px #0f0);
    }
    ```

    这样，就能基于元素生成了两个阴影：

    ![基于元素生成了两个阴影](https://pic1.imgdb.cn/item/691ac0a53203f7be000df5bf.png)

    总之，**可以给同个元素定义多个滤镜，并且滤镜是可以重复的**

### filter 与 backdrop-filter 的异同

1. 作用对象不同
   
   - `filter` 作用对象：应用于元素本身及其所有子元素。

       它影响的是元素内容区域（包括元素的背景、边框、文字、子元素等）。
       
       可以把它理解为：给这个元素“戴上”一个滤镜眼镜，所有看到的东西都经过这副眼镜。

   - `backdrop-filter` 作用对象：应用于元素背后的内容区域。
   
      它影响的是元素后面的一切，包括背景、其他元素、甚至是视口背景。
      
      可以把它理解为：在元素后面加了一层滤镜玻璃，透过这层玻璃看后面的景物。

2. 关键要求
   
    - `filter`：不需要元素透明，任何元素都可以应用 `filter`。

        例如：一个纯色背景的 div 也可以加 blur。

    - `backdrop-filter`：必须要有透明或半透明的背景，否则看不到效果。

        因为 `backdrop-filter` 是对“背后”的内容进行模糊，如果没有透明度，就看不到后面的内容，自然也就看不到模糊效果。

        如果你给一个元素设置了 `backdrop-filter`，但没有设置背景色或背景图片，它可能看起来是“空的”，所以需要设置 `background: rgba(255, 255, 255, 0.1)` 这样的半透明背景。

3. 实际应用场景

    - `filter`：用于美化元素本身，比如给图片添加模糊效果、调整亮度/饱和度等。

        适用于需要改变元素自身外观的场景。

    - `backdrop-filter`：主要用于创建“毛玻璃”（frosted glass）效果。

        常用于模态框、导航栏、通知栏等 UI 元素，让用户感觉元素是“穿透”了背景的，背景是模糊的。

        比如：移动端 App 的弹窗、网页顶部的导航栏模糊背景。

4. 性能表现

    - 两者都可能带来一定的性能开销，尤其是在动画中。

    - `backdrop-filter` 通常比 `filter` 更消耗资源，因为它需要渲染“背后”的内容并进行滤镜处理。

5. 浏览器兼容性

    - `filter` 是广泛支持的标准属性。

    - `backdrop-filter` 虽然在现代浏览器中支持良好，但在一些旧版本浏览器中可能不支持，需要考虑降级方案。

下面挑几点来深入交流一下。

#### 作用对象的差异

`backdrop-filter` 滤镜最为常见的使用场景，就是实现毛玻璃效果。

> [!INFO] 拓展
> 毛玻璃效果是一种视觉效果，通常用于美化设计或增加隐私保护。它通过模糊化图像的某些区域来达到这种效果，使图像看起来有一层轻微的模糊，同时仍然清晰可见。毛玻璃效果可以应用于图像、文本、按钮等各种 UI 元素上，为用户提供更加优雅和良好的视觉体验。

下面用正常无效果、使用 `filter` 和使用 `backdrop-filter` 三种方式来对比一下：

::: code-group
```html
<div class="box1">正常无效果</div>
<div class="box2">使用 filter</div>
<div class="box3">使用 backdrop-filter</div>
```
```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(https://picsum.photos/1000/300) center center no-repeat;
  background-size: cover;
  gap: 50px;
}

.box1,
.box2,
.box3 {
  display: flex;
  justify-content: center;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.7);
  color: red;
}

.box2 {
  filter: blur(6px);
}

.box3 {
  backdrop-filter: blur(6px);
}
```
:::

![效果差异](https://pic1.imgdb.cn/item/691acc433203f7be000e4e16.png)

两个模糊滤镜最明显的差异点是：

- `filter` 滤镜作用于当前元素，仔细理解这里的当前元素，并且它的后代元素也会继承模糊滤镜的效果
- `backdrop-filter` 滤镜作用于元素背后区域的所有元素

> 具体代码可以查看 [filter与backdrop-filter作用对象的差异](https://codepen.io/duyidao/pen/XJdpvGz)

#### 效果上的差异

同样设置 `grayscale(100%)` 实现灰度效果，`filter` 是作用于自身，而 `backdrop-filter` 是作用于背后的元素。

因此在效果上，`backdrop-filter` 滤镜能实现 `transform` 移动的效果；而 `filter` 不能实现这种效果，只能通过改变 `grayscale` 的值，实现颜色渐变的效果。

::: code-group
```html
<div class="filter"></div>
<div class="backdrop-filter"></div>
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

.filter, .backdrop-filter {
  position: relative;
  width: 300px;
  height: 300px;
  background: url(https://picsum.photos/300/300) center center no-repeat;
  background-size: cover;
  overflow: hidden;
}

.backdrop-filter::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: all 1.5s;
}

.filter {
  filter: grayscale(100%); /* [!code focus] */
  transition: all 1.5s;
}

.backdrop-filter::before { /* [!code focus] */
  backdrop-filter: grayscale(100%); /* [!code focus] */
} /* [!code focus] */

.filter:hover { /* [!code focus] */
  filter: grayscale(0%); /* [!code focus] */
} /* [!code focus] */

.backdrop-filter:hover::before { /* [!code focus] */
  transform: translateX(-100%); /* [!code focus] */
} /* [!code focus] */
```
:::

`backdrop-filter` 效果图如下：

![backdrop-filter效果图](https://pic1.imgdb.cn/item/691ad1e03203f7be000e7f9f.gif)

`filter` 效果图如下：

![filter效果图](https://pic1.imgdb.cn/item/691ad20b3203f7be000e80f0.gif)

> 具体代码可以查看 [filter与backdrop-filter效果上的差异](https://codepen.io/duyidao/pen/azNJowQ)

### 作用了 filter 和 backdrop-filter 的元素会导致 3D 效果失效

作用了 `filter` 和 `backdrop-filter` 的元素（值不为 `none`），都会生成 Backdrop Root。

什么是 Backdrop Root 呢？简单来说，他就是堆叠上下文，根据 [W3C文档](https://drafts.fxtf.org/filter-effects-2/#BackdropRoot) 的描述，它是 `backdrop-filter` 属性的背景参考边界，决定了哪个区域会被模糊处理。理解它有助于更好地控制毛玻璃效果的实现范围。

而生成了 Backdrop Root 的元素会使 CSS 3D 失效！

下面来看一个没设置 `backdrop-filter` 的 3d 旋转动画：

![3d旋转动画](https://pic1.imgdb.cn/item/691ae7333203f7be000f2d89.gif)

但是，如果给这个元素添加 `filter` 或者 `backdrop-filter` 滤镜效果，就会变成 2d 旋转动画：

![2d旋转动画](https://pic1.imgdb.cn/item/691d28713203f7be0014d527.gif)

这个是浏览器内核的老问题了，15 年就有一个 `issuse` [BUG -CSS mix-blend-mode turns off CSS perspective.](https://bugs.chromium.org/p/chromium/issues/detail?id=543445)。下面有一个回答：

> When we have mix-blend-mode, the closest ancestor that creates stacking context will isolate blending. We create a render surface at the root of this isolated group and because render surfaces don't support preserve-3d(because they render into separate FBO), we see a flattened result.
>
> ajuma@ suggested that this bug maybe much easier to fix after Slimming paint v2 if we can somehow disentangle transforms from layers.

翻译一下，意思大概是：如果对一个元素应用了**滤镜或者混合模式**，那么堆叠上下文会在该元素的根节点处重新创建一个独立的渲染平面。但是，这个独立的渲染平面是不支持 `preserve-3d` 的，而 CSS 中 `preserve-3d` 是用于创建三维空间的。它们最终被渲染到单独的帧缓冲对象中，所以我们只能得到一个 2D 平面效果。

截至目前，以下四种方法都会让 3d 动画失效：

- `mix-blend-mode`
- `background-blend-mode`
- `filter`
- `backdrop-filter`

### 作用了 `filter` 和 `backdrop-filter` 的元素会使内部的 fixed 定位失效

下面这个特性并不能被视为 Bug，它是 CSS 中的一个独特表现。

通常，CSS 中的 `position: fixed` 是相对于屏幕视口进行定位的。但是，对于应用了 `filter`和 `backdrop-filter` 的元素，其内部的 `position: fixed` 元素将不再相对于屏幕视口进行定位，而是相对于 Backdrop Root 元素进行定位。

这意味着，`position: fixed` 定位的元素会退化变成 `position: absolute`的表现形式。

下面来看一个例子：

::: code-group
```html
<div class="container"> 
  <div class="fixed"> </div>
</div>
```
```css
.container {
  width:10vw;
  height: 10vw;
  background: rgba(255, 100, 100, .8);
}

.fixed {
  position: fixed;
  top: 1vw;
  left: 1vw;
  right: 1vw;
  bottom: 1vw;
  background: rgba(100, 100, 255, .8);
}
```
:::

![例子](https://pic1.imgdb.cn/item/691d29d43203f7be0014e6ca.png)

上述图形中：

1. 红色色块，是 `.container` 父级元素，没有设置一些特殊属性
2. 蓝色色卡，是 `.fixed` 子元素，设置了 `position: fixed` 定位
 
然而给父元素 `.container` 新增一个 `filter: blur(1px)`，子元素的 `fixed` 定位就会退化成 `position: absolute` 定位！

```CSS
.container {
  width:10vw;
  height: 10vw;
  background: rgba(255, 100, 100, .8);
  filter: blur(1px); /* [!code ++] */
}
```

![效果](https://pic1.imgdb.cn/item/691d2ddf3203f7be001519bc.gif)

那么，为什么会发生这种情况呢？说好的相对视口（Viewport）定位呢？

这个问题，就牵涉到了 Stacking Context，也就是堆叠上下文的概念了。解释上面的问题分为两步：

1.  任何非 none 的 transform 值都会导致一个堆叠上下文（Stacking Context）和包含块（Containing Block）的创建。
1.  由于堆叠上下文的创建，该元素会影响其子元素的固定定位。设置了 `position:fixed` 的子元素将不会基于 viewport 定位，而是基于这个父元素。

**堆叠上下文（Stacking Context）和包含块（Containing Block）的理解会比较困难。** 堆叠上下文是 HTML 元素的三维概念，这些 HTML 元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的 z 轴上延伸，HTML 元素依据其自身属性按照优先级顺序占用层叠上下文的空间。

概念比较抽象，简单理解，记住**生成了 Stacking Context 的元素会影响该元素的层叠关系与定位关系**。

CSS 中，能够生成堆叠上下文的方法有非常多，方法如下（参考自 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)）：

-   根元素 (HTML)；
-   z-index 值不为 "auto" 的绝对/相对定位；
-   一个 z-index 值不为 "auto" 的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex；
-   opacity 属性值小于 1 的元素（参考 the specification for opacity）；
-   transform 属性值不为 "none" 的元素；
-   mix-blend-mode 属性值不为 "normal" 的元素；
-   filter 值不为 “none” 的元素；
-   perspective 值不为 “none” 的元素；
-   isolation 属性被设置为 "isolate" 的元素；
-   position: fixed；
-   在 will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值；
-   -webkit-overflow-scrolling 属性被设置 "touch" 的元素；
-   backdrop-filter 值不为 “none” 的元素。

但是，除了 `filter` 和 `backdrop-filter` 之外，并非所有能够生成**堆叠上下文或者包含块**的属性，都会导`position: fixed` 失效。

在 CSS 中，目前一共有 7 种方式可以让元素内部的 `position: fixed` 基于该元素定位：

1.  `transform` 属性值不为 none 的元素；
1.  设置了 `transform-style`: preserve-3d 的元素；
1.  `perspective` 值不为 none 的元素；
1.  在 `will-change` 中指定了任意 CSS 属性；
1.  设置了 `contain: paint`；
1.  filter 值不为 `none` 的元素；
1.  backdrop-filter 值不为 `none`的元素。

### 总结

本章节详细介绍了 CSS 中 `filter` 滤镜的三种使用方式及其特殊性。

#### 三种滤镜使用方式
1. 通过 `filter` 属性使用滤镜：作用于元素本身及其所有子元素，影响元素内容区域。
2. 通过 `backdrop-filter` 属性使用滤镜：作用于元素背后的内容区域，需要透明背景才能看到效果。
3. 通过 `filter` 属性的 `url()` 值引入 SVG 滤镜：使用 SVG 定义的自定义滤镜效果。

#### 核心特性对比
1. 作用对象差异
    
    - `filter`：影响元素自身及后代元素
    - `backdrop-filter`：影响元素背后的所有内容

2. 关键要求

    - `filter`：无需透明背景，任何元素都可应用
    - `backdrop-filter`：必须有透明或半透明背景

3. 应用场景

    - `filter`：美化元素本身，如模糊、调整亮度等
    - `backdrop-filter`：创建毛玻璃效果，用于模态框、导航栏等

#### 两种特殊问题

1. 3D 效果失效

    当元素应用了 `filter` 或 `backdrop-filter` 时，会生成 Backdrop Root（堆叠上下文），导致 CSS 3D 变换失效，只能表现为 2D 变换。

2. fixed 定位失效

    应用了 `filter` 或 `backdrop-filter` 的元素，其内部的 `position: fixed` 元素会失去相对于视口定位的特性，退化为 `position: absolute`。

#### 原理说明
这两种问题都源于滤镜属性会创建堆叠上下文（Stacking Context）：

`filter` 和 `backdrop-filter` 值不为 `"none"` 时会创建堆叠上下文，堆叠上下文会影响元素的层叠关系和定位关系
这是浏览器渲染机制的一部分，而非 Bug