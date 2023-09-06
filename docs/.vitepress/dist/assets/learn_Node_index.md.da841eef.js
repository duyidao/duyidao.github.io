import{_ as s,o as a,c as e,S as n}from"./chunks/framework.e036d9b7.js";const g=JSON.parse('{"title":"Node","description":"","frontmatter":{},"headers":[],"relativePath":"learn/Node/index.md","filePath":"learn/Node/index.md","lastUpdated":null}'),o={name:"learn/Node/index.md"},t=n(`<h1 id="node" tabindex="-1">Node <a class="header-anchor" href="#node" aria-label="Permalink to &quot;Node&quot;">​</a></h1><h2 id="node-简介" tabindex="-1">Node 简介 <a class="header-anchor" href="#node-简介" aria-label="Permalink to &quot;Node 简介&quot;">​</a></h2><h3 id="什么是-node" tabindex="-1">什么是 node <a class="header-anchor" href="#什么是-node" aria-label="Permalink to &quot;什么是 node&quot;">​</a></h3><p><code>Node.js® is a JavaScript runtime built on Chrome&#39;s V8 JavaScript engine.</code></p><p><code>Node.js</code> 是一个基于 <code>Chrome V8</code> 引擎的 <code>JavaScript</code> 运行环境。</p><p>各个浏览器厂商会开发解析 <code>Javascript</code> 的引擎如 <code>google chrome</code> 、<code>Apple safari</code>。因为不同厂商的引擎对 <code>ecmascript</code> 的解析程序不同，所以有些功能可能在有的浏览器有效，但在其他的浏览器无效。</p><p>比较著名的引擎是 <code>chrome</code> 的 <code>v8</code>，它是由 <code>c++</code> 编写的，而且它有个特点可以内置到其他<code>C++</code> 程序中，这就为 <code>node.js</code> 的实现提供的基础。所以可以把 <code>nodejs</code> 简单来理解为使用 v8 引擎可以解析 <code>javascript</code> 语法，同时也可以调用 <code>c++</code> 功能进行文件操作，网络通信等功能。</p><p><strong>Nodejs vs Browser</strong></p><ul><li>nodejs 是开源、跨平台的 javascript 运行时环境，它是运行时，不时语言或框架，是在浏览器之外的 Javascript 使用</li><li>nodejs 可以使用 javascript 调用 c++，实现计算底层操作</li><li>nodejs 运行时包含 <a href="https://github.com/nodejs/node/tree/main/deps/v8" target="_blank" rel="noreferrer">v8 引擎 (opens new window)</a>（解析 javascript）、<a href="https://github.com/nodejs/node/tree/main/deps/uv" target="_blank" rel="noreferrer">libuv (opens new window)</a>(进行计算机文件、网络等底层操作) 等等。通过查看<a href="https://github.com/nodejs/node/tree/main/src" target="_blank" rel="noreferrer">nodejs 源码 (opens new window)</a>，我们会知道 nodejs 使用 c++进行文件或网络操作</li><li>nodejs 使用 libuv 库，让开发者使用<a href="https://github.com/nodejs/node/tree/main/lib" target="_blank" rel="noreferrer">javascript (opens new window)</a>调用 c++程序</li><li>nodejs 没有基于浏览器的 javascript 的 DOM、BOM 等概念这与但是拥有文件系统操作功能</li><li>nodejs 我们可以随意选择版本，但浏览器的 javascript 运行在众多用户电脑中，所以版本不是由我们决定的</li></ul><h3 id="运行环境" tabindex="-1">运行环境 <a class="header-anchor" href="#运行环境" aria-label="Permalink to &quot;运行环境&quot;">​</a></h3><ul><li>v8 引擎</li><li>内置 API：fs、path、http、js 内置对象、querystring、etc...</li></ul><blockquote><p><strong>注意：</strong></p><ol><li>浏览器是 JavaScript 的前端运行环境</li><li>node.js 是 JavaScript 的后端运行环境</li><li>node.js 无法使用 DOM 和 BOM 等浏览器的内置 API</li></ol></blockquote><h3 id="可实现效果" tabindex="-1">可实现效果 <a class="header-anchor" href="#可实现效果" aria-label="Permalink to &quot;可实现效果&quot;">​</a></h3><ol><li>基于 <a href="http://www.expressjs.com.cn/" target="_blank" rel="noreferrer">Express</a> 框架，可以快速构建 Web 应用</li><li>基于 <a href="https://electronjs.org/" target="_blank" rel="noreferrer">Electron</a> 框架，可以构建跨平台的桌面应用</li><li>基于 <a href="http://restify.com/" target="_blank" rel="noreferrer">restify</a> 框架，可以快速构建 API 接口项目</li><li>读写和操作数据库、创建实用的命令行工具辅助前端开发、etc...</li></ol><h2 id="安装运行" tabindex="-1">安装运行 <a class="header-anchor" href="#安装运行" aria-label="Permalink to &quot;安装运行&quot;">​</a></h2><p>下面我们来安装开发用到的软件，访问 <a href="https://nodejs.org/zh-cn/" target="_blank" rel="noreferrer">https://nodejs.org/zh-cn/ (opens new window)</a>网站下载 LTS 版本，因为 nodejs 是开源的你也可以访问 <a href="https://github.com/nodejs/node" target="_blank" rel="noreferrer">github (opens new window)</a>了解源码。</p><p><img src="https://doc.houdunren.com/assets/img/image-20230109014001481.1acc938d.png" alt="image-20230109014001481"></p><p>安装后执行以下命令，查看安装的 nodejs 版本</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">node</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span></span></code></pre></div><p>下面编写 <code>index.js</code> 内容如下</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello node.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>然后在命令行执行该文件，好可以查看到当前目录的 node.js 执行结果</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">node</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">index.js</span></span></code></pre></div><blockquote><p><strong>拓展：终端快捷键</strong></p><ol><li>↑：上一次执行的命令</li><li>tab：补全路径</li><li>esc：清空当前已输入的命令</li><li>cls：清空终端</li></ol></blockquote><h2 id="类型支持" tabindex="-1">类型支持 <a class="header-anchor" href="#类型支持" aria-label="Permalink to &quot;类型支持&quot;">​</a></h2><p>开发中经常需要使用 typescript 进行开发，所以我们来配置 Node 的 typescript 开发环境。</p><h3 id="安装软件" tabindex="-1">安装软件 <a class="header-anchor" href="#安装软件" aria-label="Permalink to &quot;安装软件&quot;">​</a></h3><p>首先安装 Ts 环境需要的软件</p><ul><li><a href="https://github.com/TypeStrong/ts-node#overview" target="_blank" rel="noreferrer">ts-node (opens new window)</a>使您能够直接在 Node 上执行 TypeScript.js 而无需预编译</li><li><a href="https://github.com/remy/nodemon" target="_blank" rel="noreferrer">nodemon (opens new window)</a>nodemon 监视源中的任何更改并自动重新启动服务器，非常适合开发。</li><li><a href="https://www.tslang.cn/index.html#download-links" target="_blank" rel="noreferrer">typescript (opens new window)</a>安装 typescript</li></ul><p>执行以下命令进行安装</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm add -g add ts-node nodemon typescript @types/node</span></span></code></pre></div><h3 id="文件结构" tabindex="-1">文件结构 <a class="header-anchor" href="#文件结构" aria-label="Permalink to &quot;文件结构&quot;">​</a></h3><p>最终的项目文件结构如下</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">├── package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">├── pnpm-lock.yaml</span></span>
<span class="line"><span style="color:#A6ACCD;">└── src</span></span>
<span class="line"><span style="color:#A6ACCD;">    ├── http.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── index.ts</span></span></code></pre></div><h3 id="package-json" tabindex="-1">package.json <a class="header-anchor" href="#package-json" aria-label="Permalink to &quot;package.json&quot;">​</a></h3><p>创建 package.json 文件</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm init</span></span></code></pre></div><p>package.json 文件内容为</p><ul><li>将主文件修改为 <strong>index.ts</strong></li><li>因为会自动调用 <strong>ts-node</strong> 命令，所以 dev 命令可以简写为 <strong>dev:nodemon</strong></li></ul><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;name&quot;: &quot;node&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;version&quot;: &quot;1.0.0&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;description&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;main&quot;: &quot;index.ts&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;dev&quot;: &quot;nodemon&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;keywords&quot;: [],</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;author&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;license&quot;: &quot;ISC&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;dependencies&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;@types/node&quot;: &quot;^18.7.8&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;ts-node&quot;: &quot;^10.9.1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;typescript&quot;: &quot;^4.7.4&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="tsconfig-json" tabindex="-1">tsconfig.json <a class="header-anchor" href="#tsconfig-json" aria-label="Permalink to &quot;tsconfig.json&quot;">​</a></h3><p>然后创建 tsconfig.json 文件</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">tsc --init</span></span></code></pre></div><p>配置项内容如下</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //ts编译为的ES的版本</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;target&quot;: &quot;ESNext&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    //使用的模块规范</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;module&quot;: &quot;NodeNext&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    //兼容common.js模块到ESM</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;esModuleInterop&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    //开启严格类型校验</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;strict&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    //允许导入扩展名为.json的模块</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;resolveJsonModule&quot;: true</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  //我们代码位置</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;include&quot;: [&quot;./**/*&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="运行测试" tabindex="-1">运行测试 <a class="header-anchor" href="#运行测试" aria-label="Permalink to &quot;运行测试&quot;">​</a></h3><p>下面我们来运行项目，项目的主文件是 <strong>src/index.ts</strong>，文件内容如下</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import os from &#39;os&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(os.version())</span></span></code></pre></div><p>接着执行命令来运行项目</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm run dev</span></span></code></pre></div>`,50),l=[t];function p(c,r,i,d,u,h){return a(),e("div",null,l)}const A=s(o,[["render",p]]);export{g as __pageData,A as default};
