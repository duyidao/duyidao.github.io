---
title: 浏览器渲染原理
author:
  - 渡一教育 浏览器渲染原理&https://www.bilibili.com/video/BV1Eh4y1c7CJ
---

# 浏览器渲染原理

## 浏览器如何渲染页面

浏览器把<word text="HTML" />字符串解析成页面信息，比如像素点颜色等，这个过程就叫渲染。

```js
function render(html) {
  // 第一行。。。。。
  // 第二行。。。。。
  return pixels
}
```

当浏览器的网络线程收到<word text="HTML" />文档后，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。在事件循环机制的作用下，渲染主线程取出消息队列中的渲染任务，开启渲染流程。

![渲染流程一图流](https://pic1.imgdb.cn/item/67ecf4570ba3d5a1d7ea154c.png)

整个渲染流程分为多个阶段，分别是：<word text="HTML" />解析、样式计算、布局、分层、绘制、分块、光栅化、画。每个阶段都有明确的输入输出，上一个阶段的输出会成为下一个阶段的输入。这样，整个渲染流程就形成了一套组织严密的生产流水线。

![整体流程](https://pic1.imgdb.cn/item/67ecf69e0ba3d5a1d7ea67e3.png)

### 第一步，解析 HTML

渲染的第一步是 **解析 HTML**。

<word text="HTML" />解析的时候里面有的<word text="DOM" />都会解析为一个<word text="DOM" />树（这个<word text="DOM" />生成的时候是用 C++ 生成的，然后在外层给他包装了一层<word text="JavaScript" />方便前端操作）。

解析过程中遇到<word text="CSS" />解析<word text="CSS" />，遇到<word text="JavaScript" />执行<word text="JavaScript" />。为了提高解析效率，浏览器在开始解析前，会启动一个预解析的线程，率先下载<word text="HTML" />中的外部<word text="CSS" />文件和 外部的<word text="JavaScript" />文件。

- 如果主线程解析到 `link` 位置，此时外部的<word text="CSS" />文件还没有下载解析好，主线程不会等待，继续解析后续的<word text="HTML" />。这是因为下载和解析<word text="CSS" />的工作是在预解析线程中进行的。这就是<word text="CSS" />不会阻塞<word text="HTML" />解析的根本原因。

  ![CSS解析流程](https://pic1.imgdb.cn/item/67ed09ff0ba3d5a1d7eaff9e.png)

- 如果主线程解析到 `script` 位置，会停止解析<word text="HTML" />，转而等待<word text="JavaScript" />文件下载好，并将全局代码解析执行完成后，才能继续解析<word text="HTML" />。这是因为<word text="JavaScript" />代码的执行过程可能会修改当前的<word text="DOM" />树，所以<word text="DOM" />树的生成必须暂停，这就是为什么<word text="JavaScript" />会阻塞<word text="HTML" />解析的根本原因。

  ![JS解析流程](https://pic1.imgdb.cn/item/67ed0ae10ba3d5a1d7eb0045.png)

第一步完成后，会得到<word text="DOM" />树和<word text="CSSOM" />树，方便后续操作这个树对象。浏览器的默认样式、内部样式、外部样式、行内样式均会包含在<word text="CSSOM" />树中。除了浏览器的默认样式，其他的样式<word text="JavaScript" />都能操作。

![CSSOM&DOM](https://pic1.imgdb.cn/item/67e7de2c0ba3d5a1d7e676e7.png)

想要查看<word text="CSSOM" />树，可以通过 `document.styleSheets` 属性查看。具体树结构如下图所示：

![document.styleSheets](https://pic1.imgdb.cn/item/67e7e2ad0ba3d5a1d7e67970.png)

最终可以看到所有内部样式和外部样式规则，每一个规则包含选择器和样式 `style` 。如果想要手动修改样式，可以通过 `addRoute` 方法修改。具体代码如下：

```js
console.log(document.styleSheets) // 查看所有的样式表，如下图所示
document.styleSheets[0].addRule('p', 'color: red') // 给第一个样式表添加一条规则，p 标签的颜色为 red
```

> [!INFO] 思考
> 为什么<word text="HTML" />和<word text="CSS" />都有生成树，而<word text="JavaScript" />没有生成树？
>
> - <word text="HTML" />生成树是因为<word text="HTML" />是用来描述页面结构的，后续浏览器渲染需要使用，可能还有修改，所以需要生成树。
>
> - <word text="CSS" />生成树是因为<word text="CSS" />是用来描述页面样式的，后续浏览器渲染需要使用，可能还要修改，所以需要生成树。
>
> - <word text="JavaScript" />没有生成树是因为<word text="JavaScript" />是用来描述页面行为的，只需要解析一遍，后续步骤用不到，所以不需要生成树。

### 第二步，样式计算

渲染的下一步是**样式计算**。这一步需要浏览器知道每一个<word text="DOM" />节点的样式是什么，因此需要计算。主线程会遍历得到的<word text="DOM" />树:依次为树中的每个节点计算出它最终的样式，称之为 `Computed Style`。

<word text="CSS" />属性值的计算过程包含了层叠、样式继承等，很多预设值会变成绝对值，比如 `red` 会变成 `rgb(255,0,0);` ；相对单位会变成绝对单位，比如 `em` 会变成 `px` 。计算属性 `calc()` 也会在这一步被计算出来。计算出来后是最终的结果，即一个元素所有的元素的样式必须都有最终值。

开发者可能只对 `p` 标签设置了一个 `color: red` ，但是浏览器计算时会计算它的颜色、边框、宽高、边距等，该继承的继承，该转换的转换，中途可能还会发生样式变化。

这一步完成后，会得到一棵带有样式的<word text="DOM" />树。计算好的样式可通过 `window.getComputedStyle()` 方法获取。

### 第三步，布局

接下来是布局，这一阶段会根据<word text="DOM" />节点的尺寸（宽高）和位置（包含块）做布局，布局完成后会得到布局树。

布局阶段会依次遍历<word text="DOM" />树的每一个节点，计算每个节点的几何信息。例如节点的宽高（比如百分比宽高，前面样式计算步骤就算不出来）、相对包含块（比如定位）的位置。

大部分时候，<word text="DOM" />树和布局树并非一一对应。布局树是要找到所有节点的几何信息，而一些隐藏的比如 `display:none` 的节点没有几何信息，因此不会生成到布局树「如 `head` 、`link` 、`script` 、`meta` 等，因为隐藏了没有几何信息，所以不会生成到 布局树 内」；又比如伪元素选择器 `::before` ，虽然<word text="DOM" />树中不存在这些伪元素节点，但它们拥有几何信息，所以会生成到布局树中；还有匿名行盒、匿名块盒（W3C 官网规定，内容必须在行盒中，行盒和块盒不能相邻）等等都会导致<word text="DOM" />树和布局树无法一一对应。

```html
<div>
  <p>
    <span>a</span>
  </p>
  b
  <p>
    <span>c</span>
  </p>
</div>
```

![布局](https://pic1.imgdb.cn/item/67e7d9e40ba3d5a1d7e672d4.png)

### 第四步，分层

主线程会使用一套复杂的策略对整个布局树中进行分层。浏览器打开 f12，选择 `layers`（中文为图层），左侧展开后可以看到所有的分层。和堆叠上下文有关的属性「如 `transform`、`opacity` 等样式」会影响浏览器分层决策。

分层的好处在于，将来某一个层改变后，仅会对该层进行后续处理，从而提升效率。滚动条、堆叠上下文都会或多或少的影响分层结果，也可以通过 `will-change` 属性更大程度的影响分层结果。

但是注意不要滥用，因为分层也是需要消耗资源的，如果过多分层，内存空间会卡爆。

### 第五步，绘制

再下一步是绘制。

主线程会为每个层单独产生绘制指令集「如先画什么，后画什么」，用于描述这一层的内容该如何画出来。完成绘制后，主线程将每个图层的绘制信息提交给合成线程，剩余工作将由合成线程完成。

例如：

- 把笔移动到 10,30 的位置
- 画一个 100\*30 的矩形
- 用红色填充矩形
  上方的指令集最终页面上就能画出一个红色矩形。

![绘制](https://pic1.imgdb.cn/item/67e7cad20ba3d5a1d7e66be6.png)

绘制主线程的工作到此为止，剩下的工作将由其他线程完成。

### 第六步，分块

分块的工作是交给多个线程同时进行的。合成线程首先对每个图层进行分块，将其划分为更多的小区域。它会从线程池中拿取多个线程来完成分块工作。

![分块](https://pic1.imgdb.cn/item/67e7cca30ba3d5a1d7e66c40.png)

### 第七步，光栅化

分块完成后，进入光栅化阶段。光栅化是将每个块变成位图「位图就是每个像素点的像素信息」，优先处理靠近视口的块。

![光栅化](https://pic1.imgdb.cn/item/67e7ce230ba3d5a1d7e66cb5.png)

合成线程会将块信息交给<word text="GPU" /> 进程，以极高的速度完成光栅化。GPU 进程会开启多个线程来完成光栅化，并且优先处理靠近视口区域的块。光栅化的结果，就是一块一块的位图。

> GPU 能干的事，CPU 都能干，只不过会慢；CPU 能干的事 GPU 不一定能干。

### 第八步，画

最后一个阶段就是画了。合成线程拿到每个层、每个块的位图后，生成一个个「指引(quad)」信息，指引会标识出每个位图应该画到屏幕的哪个位置，以及会考虑到旋转、缩放等变形。

> 与布局不同，布局计算的是在整个页面的坐标系中如何布局，而绘制是计算视口屏幕的坐标系中绘制。

变形发生在合成线程，与渲染主线程无关，这就是 `transform` 效率高的本质原因。合成线程会把 quad 提交给 GPU 进程，由 GPU 进程产生系统调用，提交给 GPU 硬件，完成最终的屏幕成像。

![画](https://pic1.imgdb.cn/item/67e7d3780ba3d5a1d7e66e1f.png)

## 总结

渲染主线程最开始会解析<word text="HTML" />，生成<word text="DOM" />树和<word text="CSSOM" />树；然后计算样式，让每个<word text="DOM" />有最终的计算样式；然后布局，计算每个<word text="DOM" />节点的几何信息「布局树和<word text="DOM" />树不一样，不能一一对应」；为了渲染效率，浏览器根据一套策略把布局树分成几个图层，每个图层可以单独绘制；后续生成绘制指令，先画什么后画什么，指令会交给合成线程。

合成线程会对每个图层进行分块，并把分块信息交给光栅化线程池。光栅化线程池会把块信息转换成位图。合成线程拿到每个图层的位图后，会生成一个个「指引(quad)」信息，优先光栅话靠近视口区域。最后交给 GPU 画。

## 拓展

### 什么是重排 reflow?

`reflow` 的本质就是修改<word text="DOM" />和<word text="CSSOM" />树，重新计算 `layout` 布局树。

当进行了会影响布局树的操作后「如修改 `width`、`height`、`left`、`top` 等」，需要重新计算布局树，会引发 `layout`。为了避免连续的多次操作导致布局树反复计算，浏览器会合并这些操作，当<word text="JavaScript" />代码全部完成后再进行统一计算。所以，改动属性造成的 `reflow` 是异步完成的。

也同样因为如此，当<word text="JavaScript" />获取布局属性时，就可能造成无法获取到最新的布局信息。浏览器在反复权衡下，最终决定在这种情况下立即 `reflow`。

```js
div.style.width = '100px'
div.style.height = '100px'
div.style.margin = '100px'
div.style.padding = '100px'

div.clientWidth // 此时会触发 reflow
```

### 什么是重绘 repaint?

`repaint` 的本质就是重新根据分层信息计算了绘制指令。

当改动了可见样式后，就需要重新计算，会引发 `repaint`。

由于元素的布局信息也属于可见样式，所以 `reflow` 一定会引起 `repaint`。

> 重排一定重绘，重绘不一定重排。

### 为什么 transform 的效率高?

因为 `transform` 既不会影响布局也不会影响绘制指令，它影响的只是渲染流程的最后一个「`draw`」阶段由于 `draw` 阶段在合成线程中，所以 `transform` 的变化几乎不会影响渲染主线程。反之，渲染主线程无论如何忙碌，也不会影响 `transform` 的变化。
