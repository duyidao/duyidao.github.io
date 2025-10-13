## 第一章 CSS 最强大属性 background 的 8 种核心技巧

第一章主要介绍了 CSS 中 background 的 8 种核心技巧，众所周知，<word text="CSS" />的 `backgroud` 除了设置背景色和背景图，还能设置渐变。渐变包含了以下四种：

- 线性渐变：`linear-gradient`
- 径向渐变：`radial-gradient`
- 锥形渐变（也称角向渐变）：`conic-gradient`
- 重复渐变：重复线性渐变 `repeating-linear-gradient` 、重复径向渐变 `repeating-radial-gradient` 、 重复锥形渐变 `repeating-conic-gradient`

对于 `background` ，有几点需要注意：

1. `background` 支持多个渐变效果叠加，多个渐变效果之间用逗号隔开，组合使用
2. 复杂场景下，灵活使用重复渐变，它能减少很多代码量
3. `background` 可以使用透明色 `transparent`，灵活使用透明色可以实现各种效果

下面，从线性渐变开始，慢慢深入背景的核心技巧。

### 线性渐变 linear-gradient

线性渐变 `linear-gradient` 是 CSS3 中新增的渐变方式，它允许我们指定两个或多个颜色，并沿着一条直线逐渐过渡。语法如下：

```css
background: linear-gradient(direction, color-stop1, color-stop2, ...);
```

- `direction`：指定渐变的方向，可以是角度或者方向关键字，默认为 `to bottom`，即从上到下
- `color-stop1, color-stop2, ...`：指定渐变的颜色和位置，颜色和位置之间用空格隔开，颜色可以是任意有效的 CSS 颜色值
- `color-stop` 可以指定位置，也可以不指定位置，不指定位置的话，颜色会均匀分布

#### 技巧一：渐变颜色可以设置透明色

在一些样式设计中，灵活使用透明色，可以让效果看起来更高级，更有层次感。

核心在于，透明色或者带透明度的颜色有助于展示出元素下方的内容，当看到一些渐变消失、递进消失的 UI 时，就可以考虑是否能够利用到带透明的渐变效果来实现。

::: code-group

```html
<div>
  <ul>
    <li>推荐</li>
    <li>热门</li>
    <li>免费</li>
    <li>会员</li>
    <li>最新</li>
    <li>热搜</li>
  </ul>
</div>
```

```less
div {
  // ...
  &::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    width: 200px;
    background: linear-gradient(90deg, transparent, #fff);
  }
}
```

:::

![设置透明色](https://pic1.imgdb.cn/item/68ec7288c5157e1a886b430b.png)

> 具体效果可查看 [codepen](https://codepen.io/duyidao/pen/Byjdmxe)

#### 技巧二：渐变颜色可以实色过渡

一般情况下，渐变的过渡效果是颜色逐渐变化，但有时候，我们希望渐变颜色能够直接变成实色，这时候，我们可以添加范围来实现。

::: code-group

```html
<div></div>
```

```css
div {
  width: 100px;
  height: 100px;
  margin: 10px auto;
  background: linear-gradient(45deg, transparent 50%, red 50%);
}
```

:::

上方例子种，透明色和红色都设置为 50%，所以渐变颜色会直接变成实色。使用这个技巧，可以很轻松实现三角形效果。

![三角形效果](https://pic1.imgdb.cn/item/68ec725fc5157e1a886b42b6.png)

> 具体效果可查看 [codepen](https://codepen.io/duyidao/pen/EaPvbOv)

#### 技巧三：渐变可以叠加多层

以上方三角形例子作为延展，一个矩形的 `div` ，通过叠加四个渐变，可以实现四个角都被内切的图形效果：

![内切的图形效果](https://pic1.imgdb.cn/item/68ec7540c5157e1a886b4b3b.png)

实现的思路是，通过四个方向的渐变，将四个角变成透明色，过渡采取实色，从而实现内切的效果。

::: code-group

```html
<div></div>
```

```css
div {
  width: 200px;
  height: 100px;
  margin: 10px auto;
  background: linear-gradient(45deg, transparent 20px, skyblue 0) bottom left / 50%
      50%, linear-gradient(-45deg, transparent 20px, skyblue 0) bottom right / 50%
      50%,
    linear-gradient(-135deg, transparent 20px, skyblue 0) top right / 50% 50%, linear-gradient(
        135deg,
        transparent 20px,
        skyblue 0
      ) top left / 50% 50%;
  background-repeat: no-repeat;
}
```

:::

> 具体效果可查看 [codepen](https://codepen.io/duyidao/pen/OPMjOqe)

#### 技巧四：利用重复渐变减少代码量

在一些重复的场景下，使用重复渐变可以减少很多代码量。

::: code-group

```html
<div></div>
```

```css
div {
  width: 200px;
  height: 100px;
  margin: 0 auto;
  background: repeating-linear-gradient(
    45deg,
    skyblue,
    skyblue 10px,
    transparent 10px,
    transparent 18px
  );
}
```

:::

![条纹](https://pic1.imgdb.cn/item/68ec9246c5157e1a886b70c6.png)

这样就能实现条纹效果了。这段代码的意思是，从 45 度开始，每隔 10px 的位置，安排一段天蓝色；每隔 8px 的位置，安排一段透明色。如果不使用重复渐变，那么需要写很多重复的代码。

```css
div {
  width: 200px;
  height: 100px;
  margin: 0 auto;
  background: linear-gradient(
    45deg,
    skyblue 0,
    skyblue 10px,
    transparent 10px,
    transparent 18px,
    skyblue 18px,
    skyblue 28px,
    transparent 28px,
    transparent 36px,
    skyblue 36px,
    skyblue 46px,
    transparent 46px,
    transparent 54px,
    skyblue 54px,
    skyblue 64px,
    transparent 64px,
    transparent 72px
  );
}
```

由此可以看出，重复渐变的实质就是根据长度规律，不断重复片段。

> 具体效果可查看 [codepen](https://codepen.io/duyidao/pen/ByjdYBR)

### 径向渐变 radial-gradient

线性渐变的四个技巧径向渐变也适用，因此跳过，从后面不同的地方讲起。

#### 技巧五：衔接消除锯齿

前面技巧二可以通过设置一样的范围参数实现实色过渡，但是径向渐变直接这么设置，会有锯齿现象。

::: code-group

```html
<div></div>
```

```css
div {
  width: 200px;
  height: 200px;
  margin: 10px auto;
  background: radial-gradient(skyblue 50%, orange 50%);
}
```

:::

![有锯齿](https://pic1.imgdb.cn/item/68ec9623c5157e1a886b7e5d.png)

可以看出边缘有很明显的锯齿状，解决方法是，在衔接处，预留一些渐变空间用于过渡。

```css
div {
  width: 200px;
  height: 200px;
  margin: 10px auto;
  background: radial-gradient(skyblue 49.7%, orange 50%);
}
```

![无锯齿](https://pic1.imgdb.cn/item/68ec9712c5157e1a886b8795.png)

这个范围值可根据自己的需求和实际效果微调，既看不出模糊过渡效果，又不会有锯齿状。

> 具体效果可查看 [codepen](https://codepen.io/duyidao/pen/dPGzdMY)

#### 技巧六：利用多层渐变组合图形实现波浪等效果

![波浪效果](https://pic1.imgdb.cn/item/68ec9d21c5157e1a886ba455.png)

上图为波浪效果，咋一看好像无从下手，实际上是由 `after` 和 `before` 两个伪元素设置径向渐变，设置定位来堆叠在一起的。把两个伪类拆开效果更直观，如下图所示。

![波浪效果拆开](https://pic1.imgdb.cn/item/68ec9e68c5157e1a886bad33.png)

::: code-group

```html
<div></div>
```

```css
div {
  position: relative;
  width: 100vw;
  height: 100vh;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    background-repeat: repeat-x;
    height: 20px;
    background-size: 20px 15px;
    background-image: radial-gradient(
      circle at 10px -10px,
      transparent 15px,
      #ccc 15.5px
    );
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: -5px;
    right: 0;
    background-repeat: repeat-x;
    height: 20px;
    background-size: 40px 15px;
    background-image: radial-gradient(
      circle at 10px 15px,
      #ccc 13px,
      transparent 13.5px
    );
  }
}
```

:::

`before` 伪类把径向渐变的中心点设置在中上，从透明色过渡到灰色，实现沟效果；`after` 伪类把径向渐变的中心点设置在中下，从灰色过渡到透明色，实现峰效果。两个伪类通过堆叠，实现波浪效果。

> 具体效果可查看 [codepen](https://codepen.io/duyidao/pen/bNErLWL)

### 锥形渐变 conic-gradient

#### 快速回顾

先来快速回顾一下锥形渐变的用法，锥形渐变语法为：

```css
background: conic-gradient(from deg at place, color2, color3);
```

`from` 表示渐变起始角度，默认为 0deg 向上方；`at place` 表示渐变中心点位置，默认为 `center` 中心位置；`color2` 和 `color3` 表示渐变颜色。

下面实现瓷砖贴图效果。

![瓷砖贴图效果](https://pic1.imgdb.cn/item/68eca656c5157e1a886bf18e.png)

```css
div {
  width: 250px;
  height: 250px;
  margin: 10px auto;
  background: conic-gradient(
    #000 12.5%,
    #ccc 12.5%,
    #ccc 37.5%,
    #000 37.5%,
    #000 62.5%,
    #ccc 62.5%,
    #ccc 87.5%,
    #000 87.5%
  );
  background-size: 50px 50px;
}
```

主要实现思路是先实现单个瓷砖，通过计算四个角对应的百分比，然后通过 `background-size` 设置为 50px 50px，实现 5x5 的瓷砖效果。

> 具体效果可查看 [codepen](https://codepen.io/duyidao/pen/emJEVwY)

#### 技巧七：repeat 配合 position 完成特殊图案

如果把锥形渐变的中心点设置在左上方 15px 的位置，起始方向向右，然后设置渐变，前 90deg 为粉色，后 270deg 为透明色，这样就能实现一个小正方形的效果。

```css
div {
  width: 200px;
  height: 100px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background: conic-gradient(
    from 270deg at 25px 25px,
    deeppink 0%,
    deeppink 90deg,
    transparent 90deg
  );
}
```

![小正方形效果](https://pic1.imgdb.cn/item/68eca9f5c5157e1a886c145e.png)

再给它加上 `background-position: -12px -12px`，就能在 `div` 四个角都实现小正方形效果，从而实现下方的效果。

```css
div {
  width: 200px;
  height: 100px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background: conic-gradient(
    from 270deg at 25px 25px,
    deeppink 0%,
    deeppink 90deg,
    transparent 90deg
  );
  background-position: -12px -12px; /* [!code ++] */
}
```

![效果](https://pic1.imgdb.cn/item/68ecaae9c5157e1a886c1a58.png)

之所以能实现这个效果，是因为 `background-position` 默认值为 `0 0`，即左上角，所以 `background-position: -12px -12px` 实际上向右偏移 12px，向下偏移了 12px。

> 具体效果可查看 [锥形渐变实现四个角](https://codepen.io/duyidao/pen/NPxvYGo)

#### 技巧八：利用小单位实现造型迥异的图案

前面都是设置正常大小的单位实现的效果，如果利用小单位，比如 0.1 ，0.01 等等，可以实现造型迥异的图案。

```css
div {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-image: repeating-radial-gradient(
    circle at center center,
    rgb(81, 9, 72),
    rgb(148, 213, 118) 0.1px
  );
}
```

![造型迥异的图案](https://pic1.imgdb.cn/item/68ecbecfc5157e1a886c5a9d.png)

### 总结

1. 渐变的颜色可以是透明色
2. 渐变可以是从一种颜色直接到另外一种颜色，不需要有过渡状态
3. 渐变是可以叠加多层的
4. 利用 `repeat` 节省代码，实现片段的重复
5. 预留衔接空间消除渐变产生的锯齿
6. 利用多层渐变的组合，重叠在一起拼出想要的图形
7. 利用角向渐变 `Repeat` 配合 `position` 完成特殊图案
8. 利用小单位实现造型迥异的图案
