## background 属性进阶技巧讲解及实战演练

第二章主要介绍 `background` 的进阶技巧，包括如何设置渐变色动画、如何实现文字渐变色或图片背景、在 `inline` 和 `block` 中 `background` 的差异以及 `background-attachment` 的使用。

### 渐变色动画

想要实现渐变色动画效果，不能直接在 `@keyframes` 中使用渐变属性，因为 `background` 属性只有单色背景色才支持动画效果。如果想要在 `@keyframes` 设置渐变动画，最后的效果只能是生硬的渐变色变换，没有动画效果可言。

在传统的<word text="CSS" />中，想要实现效果，需要另寻僻径。有以下几种方式可以实现效果：

1. 通过 `background-position` 移动模拟渐变动画
2. 通过 `background-size` 缩放大小模拟渐变动画
3. 通过 `transform` 移动模拟渐变动画

而在最新的<word text="CSS" />中，有其他更好用的属性方法来实现效果：

1. 通过 `hue-rotate` 滤镜实现渐变动画
2. 通过 `CSS @property` 实现背景色渐变动画

下面依次看它们的实现方式。

#### 通过 background-position 模拟渐变动画

想要通过 `background-position` 实现渐变动画，需要搭配 `background-size` 使用。将渐变背景的横轴设置为 2 倍 `background-size: 200% 100%;` ，然后通过 `background-position` 控制背景图片的移动，从而实现渐变动画效果。

```css
div {
  width: 300px;
  height: 200px;
  background: linear-gradient(
    45deg,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  background-size: 200% 100%;
  animation: gradient 5s linear infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}
```

把背景图的横轴宽度 `background-size` 设置为两倍宽，动画通过 `background-position` 控制背景图从左到右移动，从而实现渐变动画效果。

> 具体效果可查看 [background-position 模拟渐变动画](https://codepen.io/duyidao/pen/qEbXYKv)

#### 通过 background-size 模拟渐变动画

想要通过 `background-size` 实现渐变动画，推荐搭配 `background-position` 使用。将渐变背景的初始位置设置为右上 `background-position: 100% 0;` ，然后通过 `background-size` 控制背景图片的缩放，从而实现渐变动画效果。

```css
div {
  width: 300px;
  height: 200px;
  background: linear-gradient(
    45deg,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  background-position: 100% 0;
  animation: gradient 5s linear infinite;
}

@keyframes gradient {
  0% {
    background-size: 300% 100%;
  }
  100% {
    background-size: 100% 100%;
  }
}
```

`background-size` 从 300% 缩放到 100%，背景图从右上角开始缩小，最后展示完全部的背景，从而实现渐变动画效果。

> 具体效果可查看 [background-size 模拟渐变动画](https://codepen.io/duyidao/pen/zxrEOVx)

#### 通过 transform 模拟渐变动画

前两个方法虽然能够实现过渡效果，但是自由度不够高。而且动画大量修改 `background-position` 或者 `background-size` 属性，导致浏览器重排，性能花销较大。

`transform` 属性的移动效果，不会引起浏览器重排，性能开销小，自由度也高。为盒子的 `::before` 伪元素设置 渐变背景，然后通过 `@keyframes` 控制伪元素的移动，从而实现渐变动画效果。

```css
div {
  width: 300px;
  height: 200px;
  position: relative;
  border: 2px solid #000;
}

div::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  bottom: -100%;
  right: -100%;
  background: linear-gradient(
    45deg,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  background-size: 100% 100%;
  z-index: -1;
  animation: gradient 5s linear infinite;
}

@keyframes gradient {
  0% {
    transform: translate(30%, 30%);
  }
  25% {
    transform: translate(30%, -30%);
  }
  50% {
    transform: translate(-30%, -30%);
  }
  75% {
    transform: translate(-30%, 30%);
  }
  100% {
    transform: translate(30%, 30%);
  }
}
```

> 具体效果可查看 [transform 模拟渐变动画](https://codepen.io/duyidao/pen/YPwrzWr)

上面只是其中一种移动方法，还有更多其他的移动方法可以自行尝试搭配。

#### 通过滤镜 hue-rotate 实现渐变动画

`hue-rotate` 为色相滤镜，通过改变色相角度，可以实现渐变动画效果，默认值为 0deg，最大值为 360deg。

滤镜实现渐变动画效果相对更自然，代码量更少。

```css
div {
  width: 300px;
  height: 200px;
  background: linear-gradient(
    45deg,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  animation: gradient 5s linear infinite;
}

@keyframes gradient {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
```

> 具体效果可查看 [滤镜 hue-rotate 实现渐变动画](https://codepen.io/duyidao/pen/MYKEWPy)

#### 通过 CSS @property 实现背景色渐变动画

`CSS @property` 是 `CSS` 自定义属性，它允许开发者显式地定义他们的 CSS 自定义属性，允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。语法如下：

```css
@property --property-name {
  syntax: '<syntax>';
  inherits: <inherit>;
  initial-value: <initial-value>;
}
```

其中：

- `--property-name`：自定义属性名，必须以 `--` 开头。
- `syntax`：语法，用来定义属性值的类型。
- `inherits`：是否可以继承，默认为 `false`。
- `initial-value`：初始值。

`@property` 可以定义 `background` 属性，然后通过 `@keyframes` 控制背景色变化，从而实现渐变动画效果。

```css
@property --colorA {
  syntax: '<color>';
  inherits: false;
  initial-value: red;
}

@property --colorB {
  syntax: '<color>';
  inherits: false;
  initial-value: blue;
}

div {
  width: 300px;
  height: 200px;
  background: linear-gradient(45deg, var(--colorA), var(--colorB));
  animation: gradient 5s linear infinite;
}

@keyframes gradient {
  0% {
    --colorA: red;
    --colorB: blue;
  }
  50% {
    --colorA: blue;
    --colorB: red;
  }
  100% {
    --colorA: red;
    --colorB: blue;
  }
}
```

上方的例子利用了 CSS Houdini 自定义属性，将原本定义在 `background` 的过渡效果嫁接到了 `color` 之上，而<word text="CSS" />是支持一个颜色变换到另外一个颜色的，巧妙地实现了渐变背景色的过渡动画。

> 具体效果可查看 [CSS @property 实现背景色渐变动画](https://codepen.io/duyidao/pen/yyezLrO)

### background-clip 与渐变文字

#### background-clip 的基础使用

`background-clip` 的作用就是设置元素的背景（背景图片或颜色）的填充规则，默认属性是 `border-box`，下面分别介绍它们的属性和区别。

- `border-box`：背景绘制在边框盒子内。
- `padding-box`：背景绘制在内容盒子内（包含内边距）。
- `content-box`：背景绘制在内容盒子内（等价于 `box-sizing` 的 `content-box` ）。

样式效果和差异可查看 [background-clip 样式差异](https://codepen.io/duyidao/pen/ByjwaEg)。

因此可以利用 `background-clip` 实现蓝绿色相间的边框效果。

```css
div {
  width: 300px;
  height: 200px;
  background: linear-gradient(#fff, #fff), blue;
  background-clip: padding-box, border-box;
  border: 20px dashed #000;
}
```

> [!warning] 注意
>
> 1. 这里不能写 `background: #fff, blue`，而是要写成渐变的形式，因为浏览器解析机制对颜色和渐变的处理方式不同，渐变支持叠层。
> 2. 边框要写为虚线 `dashed` ，因为实线 `solid` 会覆盖背景。

> 具体效果可查看 [background-clip 实现渐变边框](https://codepen.io/duyidao/pen/zxrEGZX)

#### background-clip：text 实现渐变文字

`background-clip` 的 `text` 属性值，可以让背景色填充到文字的形状中，文字的背景即是区块的背景，文字以外的背景都被裁剪掉。

::: code-group

```html
<div>刀刀小站，每天都要比昨天更有进步</div>
```

```css
div {
  font-size: 100px;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  background-clip: text;
}
```

:::

![渐变文字](https://pic1.imgdb.cn/item/68edf5f9c5157e1a886dfa45.png)

把文字颜色变为透明，背景色填充到文字的形状中，就能把背景的渐变色显示出来。

> 具体效果可查看 [background-clip：text 实现渐变文字](https://codepen.io/duyidao/pen/YPwryyx)

> [!IMPORTANT] 拓展
>
> 1. `background-clip: text` 不仅能使用渐变背景实现渐变文字，还能把图片背景实现任意风格的文字效果，可以任意搭配。
> 2. 渐变背景不仅可以是静态的，还能是动态的，加上前面的 `hue-rotate` 滤镜，就可以实现渐变文字的动态效果。
>
>    ```css
>    div {
>      font-size: 100px;
>      font-weight: bold;
>      color: transparent;
>      background: linear-gradient(
>        to right,
>        red,
>        orange,
>        yellow,
>        green,
>        blue,
>        indigo,
>        violet
>      );
>      background-clip: text;
>      animation: gradient 5s linear infinite; /* [!code ++] */
>    }
>
>    /* [!code ++] */
>    @keyframes gradient {
>      /* [!code ++] */
>      0% {
>        filter: hue-rotate(0deg); /* [!code ++] */
>      } /* [!code ++] */
>      /* [!code ++] */
>      50% {
>        filter: hue-rotate(360deg); /* [!code ++] */
>      } /* [!code ++] */
>      /* [!code ++] */
>      100% {
>        filter: hue-rotate(0deg); /* [!code ++] */
>      } /* [!code ++] */
>    } /* [!code ++] */
>    ```

### background 与 display: inline

`background` 属性在 `display: inline` 和 `display: block` 元素上有不同的表现，展示的方式不一样。下面来试验一下：

::: code-group

```html
<div>
  <p>
    对象是属性和方法的集合即封装。将复杂功能隐藏在内部，只开放给外部少量方法，更改对象内部的复杂逻辑不会对外部调用造成影响即抽象。继承是通过代码复用减少冗余代码。根据不同形态的对象产生不同结果即多态
  </p>
</div>
<div>
  <a>
    对象是属性和方法的集合即封装。将复杂功能隐藏在内部，只开放给外部少量方法，更改对象内部的复杂逻辑不会对外部调用造成影响即抽象。继承是通过代码复用减少冗余代码。根据不同形态的对象产生不同结果即多态
  </a>
</div>
```

```css
body {
  width: 100%;
  height: 100%;
  display: flex;
}

div {
  width: 500px;
  margin: auto;
}

p,
a {
  font-size: 20px;
  color: #000;
  background: linear-gradient(90deg, blue, green);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
```

:::

![不同的表现](https://pic1.imgdb.cn/item/68ee0564c5157e1a886e081c.png)

核心原因是：**`inline` 元素的背景只作用于“内容区域”（`content area`），而 `block` 元素的背景作用于“整个盒模型区域”（包括 `padding`、`border`）**。

再给它添加前面用到的 `background-size` 实现动画效果，看看他们的差异。

```css
body {
  width: 100%;
  height: 100%;
  display: flex;
}

div {
  width: 500px;
  margin: auto;
}

p,
a {
  font-size: 20px;
  color: #000;
  background: linear-gradient(90deg, blue, green);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transition: all 0.6s linear; /* [!code ++] */
}

/* [!code ++] */
p:hover,
/* [!code ++] */
a:hover {
  /* [!code ++] */
  background-size: 0 100%;
  /* [!code ++] */
}
```

可以看到，在 `inline` 元素上，背景色是一行一行变化的，而 `block` 元素上，背景色是整体变化的。

> 具体效果可查看 [background 在 inline 和 block 的差异](https://codepen.io/duyidao/pen/NPxaxqP)

得知 `inline` 这个特性，就可以利用它实现一些有趣的效果，比如多行文本的渐隐消失。

实现思路主要是把渲染的文本放到 `inline` 元素中（如超链接 `a` 标签），然后设置 `background: linear-gradient(to right, transparent, #fff)` 线性渐变。此时背景已经有渐变效果，但是无法影响到文字，因此需要把文字变为透明色，把要渲染的文本放到 `::before` 伪元素中，层级 `z-index` 要比渐变背景色低，这样文字就会显示在渐变背景的下面，行末尾的文字就能被背景色覆盖，从而实现渐隐消失的效果。

::: code-group

```html
<p>
  <a>
    对象是属性和方法的集合即封装。将复杂功能隐藏在内部，只开放给外部少量方法，更改对象内部的复杂逻辑不会对外部调用造成影响即抽象。继承是通过代码复用减少冗余代码。根据不同形态的对象产生不同结果即多态
  </a>
</p>
```

```css
p {
  position: relative;
  width: 600px;
  margin: 0 auto;
  font-size: 20px;
  color: #666;
  z-index: 1;
}

a {
  background: linear-gradient(to right, transparent, #fff);
  background-repeat: no-repeat;
  color: transparent;
}

a::before {
  content: '对象是属性和方法的集合即封装。将复杂功能隐藏在内部，只开放给外部少量方法，更改对象内部的复杂逻辑不会对外部调用造成影响即抽象。继承是通过代码复用减少冗余代码。根据不同形态的对象产生不同结果即多态';
  position: absolute;
  top: 0;
  left: 0;
  color: #000;
  z-index: -1;
}
```

:::

> 具体效果可查看 [多行文本渐隐消失](https://codepen.io/duyidao/pen/zxrErML)

还能利用 `inline` 特性结合 `background-size` 实现下划线动画效果。这里就不做过多阐述，可以查看 [下划线动画](/css/effect/downline)。

### background-attachment

`background-attachment` 属性用来设置背景图片是固定还是随着页面滚动而滚动。默认值是 `scroll`，每个属性值的具体含义如下：

- `scroll`：背景相对于元素本身固定， 而不是随着它的内容滚动。
- `fixed`：背景相对于视口固定。即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动。只有页面滚动到当前元素不可见，背景才会滚动。
- `local`：背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动，并且背景的绘制区域和定位区域是相对于可滚动的区域而不是包含它们的边框。

每个属性都有各自的使用场景，例如使用 `background-attachment: fixed` 实现视差滚动，核心代码只有几行。

::: code-group

```html
<section class="g-s">G1</section>
<section class="g-s">G2</section>
<section class="g-s">G3</section>
```

```css
section {
  height: 100vh;
}

.g-s {
  background: url(https://duyidao.gitee.io/imgs/css/parallax.jpg) no-repeat
    center center;
  background-size: cover;
  background-attachment: fixed;
}
```

:::

现在效果就能实现了。

原理其实很简单，背景图都设定了 `background-attachment: fixed`，所以背景图都是相对页面视口进行定位的。

通过滚动操作，改变的其实是不同的 `<section>` 在视口内的展示区域，通过这个区域的改变，这个区域内的背景图逐渐展现。

> 具体效果可查看 [大佬的滚动视差效果](https://codepen.io/Chokcoco/pen/oMPrGZ)

`background-attachment: scroll` 搭配 `background-attachment: local` 还能实现滚动阴影，就像组件库的表格滚动时侧边的阴影效果。例如 Antd Vue 组件库的表格：

![Antd Vue 组件库的表格滚动阴影](https://pic1.imgdb.cn/item/68ee1fd4c5157e1a886e6fdf.png)

所以这里借助 background-attachment: srcoll 和 background-attachment: local 两个属性，在滚动初始的时候，利用两层背景叠加在一起隐藏阴影背景，真正滚动的时候，将叠加的部分移走，只漏出阴影部分即可。

下面看三种情况不同的样式效果：

::: code-group

```html
<ul>
  <li>...</li>
  ...
  <li>...</li>
</ul>
```

```css
// 情形一：
.g-one {
  background: linear-gradient(#fff, #f00);
  background-size: 100% 10px;
  background-repeat: no-repeat;
  background-attachment: local;
}

// 情形二：
.g-two {
  background: radial-gradient(at 50% 0, #000, #0f0 70%);
  background-size: 100% 10px;
  background-repeat: no-repeat;
  background-attachment: scroll;
}

// 情形三：
.g-combine {
  background: linear-gradient(#fff, #f00), radial-gradient(at 50% 0%, #000, #0f0
        70%);
  background-size: 100% 10px, 100% 10px;
  background-repeat: no-repeat;
  background-attachment: local, scroll;
}
```

:::

> 具体效果可查看 [大佬的滚动阴影效果](https://codepen.io/Chokcoco/pen/QWKmjKd)

核心代码就是滚动的时候叠加的情况，根据滚动的时候展示不同的颜色（阴影）的效果，调整一下两个渐变的颜色，遮罩层（`background-attachment: local`）为白色，再把固定不动的阴影层（`background-attachment: scroll`），利用径向渐变模拟为我们想要的阴影颜色，交替显示，这样就可以实现滚动阴影的效果。

这个方法的缺点是：

1. 兼容性较差，`background-attachment: local` 在 IE 等一些浏览器中是不支持的。
2. 效果上有一些差异，最终的效果是文字盖在阴影上，而不是阴影盖在文字上。

### 总结

- 想要实现 `background` 的渐变动画动画效果，有五种方法可以解决：
  1.  `background-size` 缩放实现动画。
  2.  `background-position` 移动实现动画。
  3.  `transform` 平移实现动画。
  4.  `hue-rotate` 色相旋转实现动画。
  5.  `CSS @properties` 嫁接到 `color` 实现动画。
- `background-clip` 属性可以用来实现文字渐变效果。如果文字不是纯色背景，那么就能用到这个属性。无论是渐变色还是背景图，都可以使用该属性来实现效果
- `background` 在 `inline` 和 `block` 元素上的表现是不同的，可以利用这个特性实现一些有趣的效果，比如多行文本的渐隐消失。
- `background-attachment` 属性用来设置背景图片是固定还是随着页面滚动而滚动。可以用来做视差滚动，或者滚动阴影效果。
