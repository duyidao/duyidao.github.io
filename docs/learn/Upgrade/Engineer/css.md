# CSS 工具链

比起 <SpecialWords text="JavaScript" /> 语言， <SpecialWords text="CSS" /> 语言来说要更严重，它有两个问题：

1. 语法缺失，比如循环、判断、字符串拼接等逻辑性语法 <SpecialWords text="CSS" /> 都是没有的
2. 功能缺失，有很多函数（比如颜色函数、数学函数、自定义函数等） <SpecialWords text="CSS" /> 都是没有的

民间解决方法是有一些团队开发一些新语言，<SpecialWords text="CSS" /> 语言有的功能它都有，还能扩展一些 <SpecialWords text="CSS" /> 语言缺失的部分，这些语言相当于 <SpecialWords text="CSS" /> 语言的一个超集，比如 <SpecialWords text="SASS" />、<SpecialWords text="LESS" />、<SpecialWords text="Stylus" /> 等。

不过浏览器并不支持这些语言，所以需要编译成 <SpecialWords text="CSS" /> 才能被浏览器识别。这些编译器被称之为 <SpecialWords text="CSS" /> 预处理器。

## Sass 转换

新建一个 `a.scss` 文件，用 `scss` 的函数变量实现样式效果，在命令行中执行 `sass a.scss a.css ` 命令，将 `a.scss` 编译成 `a.css` 文件。

::: code-group

```scss [a.scss]
$color: #f00;

.box {
  color: $color;
}
```

```css [a.css]
.box {
  color: #f00;
}
```

:::

## Sass 实现星空效果

### 星星实现

通过 <SpecialWords text="SASS" /> 提供的循环、函数等语法，可以很简单的实现一个星空效果。

```scss
/**
 * 函数通过循环创建阴影效果，实现星星
 */
@function createShadow(Sn) {
  $shadow: "#{random(100)}vw #{random(100)}vh #fff";
  @for $i from 2 through Sn {
    $shadow: "#{$shadow}, #{random(100)}vw #{random(100)}vh #fff";
  }
  @return $shadow;
}

.layer {
  $size: 4px;
  position: fixed;
  top: 0;
  left: 0;
  width: $size;
  height: $size;
  border-radius: 50%;
  box-shadow: createShadow(100);
}
```

### 星星移动

移动效果很简单，用动画来实现即可。

```scss
@function createShadow(Sn) {
  $shadow: "#{random(100)}vw #{random(100)}vh #fff";
  @for $i from 2 through Sn {
    $shadow: "#{$shadow}, #{random(100)}vw #{random(100)}vh #fff";
  }
  @return $shadow;
}

@count: 1000; // [!code ++]
@duration: 400s; // [!code ++]
@for $i from 1 through 3 {
  // [!code ++]
  @count: floor(calc($count / 2)); // [!code ++]
  @duration: floor(calc($duration / 2)); // [!code ++]
  .layer {
    // [!code --]
    .layer#{$i} {
      // [!code ++]
      $size: 4px;
      position: fixed;
      top: 0;
      left: 0;
      width: $size;
      height: $size;
      border-radius: 50%;
      box-shadow: createShadow(100);
      animation: move 5s linear infinite; // [!code ++]
      &::after {
        // [!code ++]
        content: ""; // [!code ++]
        position: fixed; // [!code ++]
        top: 100vh; // [!code ++]
        left: 0; // [!code ++]
        width: inherit; // [!code ++]
        height: inherit; // [!code ++]
        border-radius: inherit; // [!code ++]
        box-shadow: inherit; // [!code ++]
      } // [!code ++]
    }
  }
} // [!code ++]

@keyframes move {
  // [!code ++]
  100% {
    transform: translateY(-100vh);
  } // [!code ++]
} // [!code ++]
```

### 其他

- 厂商前缀：`autoprefixer`
- 代码压缩：`cssnano`
- 代码剪枝：`purgecss`
- 代码冲突：`css module`

## 后处理器

所有转换逻辑依靠 `PostCss` 插件，把一段 <SpecialWords text="CSS" /> 代码交给 `PostCss` 插件，插件会按照顺序执行，最终输出一段 <SpecialWords text="CSS" /> 代码。

它会把接收到的 <SpecialWords text="CSS" /> 代码转为抽象语法树，通过插件处理这个抽象语法树，最后把抽象语法树转为 <SpecialWords text="CSS" /> 代码。可以把它类比为 <SpecialWords text="JavaScript" /> 代码的 `babel` 。

上面提到的功能它都有对应的插件处理：

- 厂商前缀：`postcss-preset-env`
- 代码冲突：`postcss-modules`

具体插件和效果可查看官网文档：[PostCss.parts](https://www.postcss.parts)
