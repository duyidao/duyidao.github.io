## filter中比阴影更强大的drop-shadow阴影技巧

根据 [MDN - drop-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function/drop-shadow) 文档，`drop-shadow()`：投影实际上是输入图像的 alpha 蒙版的一个模糊的、偏移的版本，用特定的颜色绘制并合成在图像下面。

### drop-shadow 与 box-shadow 的异同

先来看看 `box-shadow` 和 `drop-shadow` 的不同之处。

#### 作用范围的差异

`drop-shadow()`这个函数有点类似于 `box-shadow` 属性，但是其最本质的区别在于阴影的作用范围：

1. `box-shadow` 属性在元素的整个框后面创建一个矩形阴影
2. `drop-shadow()` 滤镜用于创建一个符合元素（图像）本身形状（alpha 通道）的阴影

![效果比较](https://pic1.imgdb.cn/item/692698be3203f7be0033d83c.png)

上图是 `box-shadow` 和 `drop-shadow` 的效果对比，可以看到 `box-shadow` 的阴影是矩形，而 `drop-shadow` 的阴影是符合元素形状的。

#### 语法层面的差异：扩散半径与内阴影

2 种阴影大同小异，需要注意的就是：

- `box-shadow` 有内阴影，内阴影使用关键字 `inset` 进行描述，而 `drop-shadow` 是没有内阴影的；
- `box-shadow` 多一个阴影扩散半径参数，`drop-shadow` 是没有阴影扩散半径参数的。

#### 都支持多重阴影

还有一点需要特别注意，`box-shadow` 和 `drop-shadow` 都是支持多重阴影的。这一点在前面滤镜的第一个章节中也提过的。