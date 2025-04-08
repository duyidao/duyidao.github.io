# 构建工具和脚手架

前面讲到的都是代码层面的转换，还有工程级别的转换，例如一个工程项目通过打包后，最终 `dist` 文件夹内是转换好后的代码文件。

为什么需要工程转换？因为开发和维护的代码需要简单的，易开发的；而运行时需要的代码需要简洁的，易维护的。开发的工程结构和运行时的工程结构往往不同，因此需要一个构建工具来完成这个转换。

使用构建工具需要思考三个前提：

1. 哪种工程更适合开发和维护
2. 哪种工程更适合运行时
3. 如何转换（打包）

因为这三个问题不一样，着力点不一样，因此造成很多构建工具都有各自的区别，如 <SpecialWords text="Webpack" />、<SpecialWords text="Rollup" />、<SpecialWords text="Esbuild" />、<SpecialWords text="Vite" /> 等等。本质的差别也就是上面三点的不同。

学习上重点放在 <SpecialWords text="Webpack" />、<SpecialWords text="Rollup" />、<SpecialWords text="Esbuild" /> 上。

## Webpack

对于 <SpecialWords text="Webpack" /> 来说，对于三方三个问题，它是这么认为的：

1. 哪种工程更适合开发和维护

   一切皆为模块，哪怕是一个音频、一个图片都是一个模块。

2. 哪种工程更适合运行时

   传统工程。

3. 如何转换（打包）

   通过入口文件找依赖关系，导入谁依赖谁，然后深度遍历，最终找到全部的依赖关系。最终合并，所有 <SpecialWords text="CSS" /> 文件合并在一起，所有<SpecialWords text="JavaScript" /> 文件合并在一起，资源文件如图片音频放在一起，该转换的文件转换，最终生成一个 `dist` 文件夹。

### 入口依赖分析

以 <SpecialWords text="Vue" /> 项目为例，<SpecialWords text="Webpack" /> 会从 `main.js` 着手，然后把整个文件的代码转为 `AST` 抽象语法树，通过这个抽象语法树找到导入语句，这个语句同时支持 `ESM` 和 `CommonJS` 两种导入方式，因此既支持 `import`，也支持 `require`。通过导入语句就找到对应的依赖关系。

通过模块查找规则找到对应的依赖文件，如 `import` 导入的是一个文件夹 `./core` ，那么默认查找该文件夹下的 `index.js` 文件；再如 `import` 导入的是一个文件夹 `jquery` 但是不以 `./` 和 `../` 开头，那么用 <SpecialWords text="Node" /> 的规则查找，在当前文件目录有没有 `node_modules` ，如果没有再返回上一级查找，直到找到 `node_modules` ，再找到对应的模块。

如果使用了别名如 `@/assets` ，那么会根据配置的别名查找。

### 开发服务器
