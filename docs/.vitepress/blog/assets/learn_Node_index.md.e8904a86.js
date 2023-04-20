import{_ as s,c as n,o as e,d as a}from"./app.38690189.js";const A=JSON.parse('{"title":"Node","description":"","frontmatter":{},"headers":[{"level":2,"title":"Node\u7B80\u4ECB","slug":"node\u7B80\u4ECB","link":"#node\u7B80\u4ECB","children":[{"level":3,"title":"\u4EC0\u4E48\u662Fnode","slug":"\u4EC0\u4E48\u662Fnode","link":"#\u4EC0\u4E48\u662Fnode","children":[]},{"level":3,"title":"\u8FD0\u884C\u73AF\u5883","slug":"\u8FD0\u884C\u73AF\u5883","link":"#\u8FD0\u884C\u73AF\u5883","children":[]},{"level":3,"title":"\u53EF\u5B9E\u73B0\u6548\u679C","slug":"\u53EF\u5B9E\u73B0\u6548\u679C","link":"#\u53EF\u5B9E\u73B0\u6548\u679C","children":[]}]},{"level":2,"title":"\u5B89\u88C5\u8FD0\u884C","slug":"\u5B89\u88C5\u8FD0\u884C","link":"#\u5B89\u88C5\u8FD0\u884C","children":[]},{"level":2,"title":"\u7C7B\u578B\u652F\u6301","slug":"\u7C7B\u578B\u652F\u6301","link":"#\u7C7B\u578B\u652F\u6301","children":[{"level":3,"title":"\u5B89\u88C5\u8F6F\u4EF6","slug":"\u5B89\u88C5\u8F6F\u4EF6","link":"#\u5B89\u88C5\u8F6F\u4EF6","children":[]},{"level":3,"title":"\u6587\u4EF6\u7ED3\u6784","slug":"\u6587\u4EF6\u7ED3\u6784","link":"#\u6587\u4EF6\u7ED3\u6784","children":[]},{"level":3,"title":"package.json","slug":"package-json","link":"#package-json","children":[]},{"level":3,"title":"tsconfig.json","slug":"tsconfig-json","link":"#tsconfig-json","children":[]},{"level":3,"title":"\u8FD0\u884C\u6D4B\u8BD5","slug":"\u8FD0\u884C\u6D4B\u8BD5","link":"#\u8FD0\u884C\u6D4B\u8BD5","children":[]}]}],"relativePath":"learn/Node/index.md"}'),o={name:"learn/Node/index.md"},l=a(`<h1 id="node" tabindex="-1">Node <a class="header-anchor" href="#node" aria-hidden="true">#</a></h1><h2 id="node\u7B80\u4ECB" tabindex="-1">Node\u7B80\u4ECB <a class="header-anchor" href="#node\u7B80\u4ECB" aria-hidden="true">#</a></h2><h3 id="\u4EC0\u4E48\u662Fnode" tabindex="-1">\u4EC0\u4E48\u662Fnode <a class="header-anchor" href="#\u4EC0\u4E48\u662Fnode" aria-hidden="true">#</a></h3><p><code>Node.js\xAE is a JavaScript runtime built on Chrome&#39;s V8 JavaScript engine.</code></p><p><code>Node.js</code> \u662F\u4E00\u4E2A\u57FA\u4E8E <code>Chrome V8</code> \u5F15\u64CE\u7684 <code>JavaScript</code> \u8FD0\u884C\u73AF\u5883\u3002</p><p>\u5404\u4E2A\u6D4F\u89C8\u5668\u5382\u5546\u4F1A\u5F00\u53D1\u89E3\u6790 <code>Javascript</code> \u7684\u5F15\u64CE\u5982 <code>google chrome</code> \u3001<code>Apple safari</code>\u3002\u56E0\u4E3A\u4E0D\u540C\u5382\u5546\u7684\u5F15\u64CE\u5BF9 <code>ecmascript</code> \u7684\u89E3\u6790\u7A0B\u5E8F\u4E0D\u540C\uFF0C\u6240\u4EE5\u6709\u4E9B\u529F\u80FD\u53EF\u80FD\u5728\u6709\u7684\u6D4F\u89C8\u5668\u6709\u6548\uFF0C\u4F46\u5728\u5176\u4ED6\u7684\u6D4F\u89C8\u5668\u65E0\u6548\u3002</p><p>\u6BD4\u8F83\u8457\u540D\u7684\u5F15\u64CE\u662F <code>chrome</code> \u7684 <code>v8</code>\uFF0C\u5B83\u662F\u7531 <code>c++</code> \u7F16\u5199\u7684\uFF0C\u800C\u4E14\u5B83\u6709\u4E2A\u7279\u70B9\u53EF\u4EE5\u5185\u7F6E\u5230\u5176\u4ED6<code>C++</code> \u7A0B\u5E8F\u4E2D\uFF0C\u8FD9\u5C31\u4E3A <code>node.js</code> \u7684\u5B9E\u73B0\u63D0\u4F9B\u7684\u57FA\u7840\u3002\u6240\u4EE5\u53EF\u4EE5\u628A <code>nodejs</code> \u7B80\u5355\u6765\u7406\u89E3\u4E3A\u4F7F\u7528v8\u5F15\u64CE\u53EF\u4EE5\u89E3\u6790 <code>javascript</code> \u8BED\u6CD5\uFF0C\u540C\u65F6\u4E5F\u53EF\u4EE5\u8C03\u7528 <code>c++</code> \u529F\u80FD\u8FDB\u884C\u6587\u4EF6\u64CD\u4F5C\uFF0C\u7F51\u7EDC\u901A\u4FE1\u7B49\u529F\u80FD\u3002</p><p><strong>Nodejs vs Browser</strong></p><ul><li>nodejs\u662F\u5F00\u6E90\u3001\u8DE8\u5E73\u53F0\u7684javascript\u8FD0\u884C\u65F6\u73AF\u5883\uFF0C\u5B83\u662F\u8FD0\u884C\u65F6\uFF0C\u4E0D\u65F6\u8BED\u8A00\u6216\u6846\u67B6\uFF0C\u662F\u5728\u6D4F\u89C8\u5668\u4E4B\u5916\u7684Javascript\u4F7F\u7528</li><li>nodejs\u53EF\u4EE5\u4F7F\u7528javascript\u8C03\u7528c++\uFF0C\u5B9E\u73B0\u8BA1\u7B97\u5E95\u5C42\u64CD\u4F5C</li><li>nodejs\u8FD0\u884C\u65F6\u5305\u542B <a href="https://github.com/nodejs/node/tree/main/deps/v8" target="_blank" rel="noreferrer">v8\u5F15\u64CE (opens new window)</a>\uFF08\u89E3\u6790javascript\uFF09\u3001<a href="https://github.com/nodejs/node/tree/main/deps/uv" target="_blank" rel="noreferrer">libuv (opens new window)</a>(\u8FDB\u884C\u8BA1\u7B97\u673A\u6587\u4EF6\u3001\u7F51\u7EDC\u7B49\u5E95\u5C42\u64CD\u4F5C) \u7B49\u7B49\u3002\u901A\u8FC7\u67E5\u770B<a href="https://github.com/nodejs/node/tree/main/src" target="_blank" rel="noreferrer">nodejs\u6E90\u7801 (opens new window)</a>\uFF0C\u6211\u4EEC\u4F1A\u77E5\u9053nodejs\u4F7F\u7528c++\u8FDB\u884C\u6587\u4EF6\u6216\u7F51\u7EDC\u64CD\u4F5C</li><li>nodejs\u4F7F\u7528libuv\u5E93\uFF0C\u8BA9\u5F00\u53D1\u8005\u4F7F\u7528<a href="https://github.com/nodejs/node/tree/main/lib" target="_blank" rel="noreferrer">javascript (opens new window)</a>\u8C03\u7528c++\u7A0B\u5E8F</li><li>nodejs \u6CA1\u6709\u57FA\u4E8E\u6D4F\u89C8\u5668\u7684javascript\u7684DOM\u3001BOM\u7B49\u6982\u5FF5\u8FD9\u4E0E\u4F46\u662F\u62E5\u6709\u6587\u4EF6\u7CFB\u7EDF\u64CD\u4F5C\u529F\u80FD</li><li>nodejs \u6211\u4EEC\u53EF\u4EE5\u968F\u610F\u9009\u62E9\u7248\u672C\uFF0C\u4F46\u6D4F\u89C8\u5668\u7684javascript\u8FD0\u884C\u5728\u4F17\u591A\u7528\u6237\u7535\u8111\u4E2D\uFF0C\u6240\u4EE5\u7248\u672C\u4E0D\u662F\u7531\u6211\u4EEC\u51B3\u5B9A\u7684</li></ul><h3 id="\u8FD0\u884C\u73AF\u5883" tabindex="-1">\u8FD0\u884C\u73AF\u5883 <a class="header-anchor" href="#\u8FD0\u884C\u73AF\u5883" aria-hidden="true">#</a></h3><ul><li>v8\u5F15\u64CE</li><li>\u5185\u7F6EAPI\uFF1Afs\u3001path\u3001http\u3001js\u5185\u7F6E\u5BF9\u8C61\u3001querystring\u3001etc...</li></ul><blockquote><p><strong>\u6CE8\u610F\uFF1A</strong></p><ol><li>\u6D4F\u89C8\u5668\u662F JavaScript \u7684\u524D\u7AEF\u8FD0\u884C\u73AF\u5883</li><li>node.js\u662F JavaScript \u7684\u540E\u7AEF\u8FD0\u884C\u73AF\u5883</li><li>node.js \u65E0\u6CD5\u4F7F\u7528DOM\u548CBOM\u7B49\u6D4F\u89C8\u5668\u7684\u5185\u7F6EAPI</li></ol></blockquote><h3 id="\u53EF\u5B9E\u73B0\u6548\u679C" tabindex="-1">\u53EF\u5B9E\u73B0\u6548\u679C <a class="header-anchor" href="#\u53EF\u5B9E\u73B0\u6548\u679C" aria-hidden="true">#</a></h3><ol><li>\u57FA\u4E8E <a href="http://www.expressjs.com.cn/" target="_blank" rel="noreferrer">Express</a> \u6846\u67B6\uFF0C\u53EF\u4EE5\u5FEB\u901F\u6784\u5EFA Web \u5E94\u7528</li><li>\u57FA\u4E8E <a href="https://electronjs.org/" target="_blank" rel="noreferrer">Electron</a> \u6846\u67B6\uFF0C\u53EF\u4EE5\u6784\u5EFA\u8DE8\u5E73\u53F0\u7684\u684C\u9762\u5E94\u7528</li><li>\u57FA\u4E8E <a href="http://restify.com/" target="_blank" rel="noreferrer">restify</a> \u6846\u67B6\uFF0C\u53EF\u4EE5\u5FEB\u901F\u6784\u5EFA API \u63A5\u53E3\u9879\u76EE</li><li>\u8BFB\u5199\u548C\u64CD\u4F5C\u6570\u636E\u5E93\u3001\u521B\u5EFA\u5B9E\u7528\u7684\u547D\u4EE4\u884C\u5DE5\u5177\u8F85\u52A9\u524D\u7AEF\u5F00\u53D1\u3001etc...</li></ol><h2 id="\u5B89\u88C5\u8FD0\u884C" tabindex="-1">\u5B89\u88C5\u8FD0\u884C <a class="header-anchor" href="#\u5B89\u88C5\u8FD0\u884C" aria-hidden="true">#</a></h2><p>\u4E0B\u9762\u6211\u4EEC\u6765\u5B89\u88C5\u5F00\u53D1\u7528\u5230\u7684\u8F6F\u4EF6\uFF0C\u8BBF\u95EE <a href="https://nodejs.org/zh-cn/" target="_blank" rel="noreferrer">https://nodejs.org/zh-cn/ (opens new window)</a>\u7F51\u7AD9\u4E0B\u8F7DLTS\u7248\u672C\uFF0C\u56E0\u4E3Anodejs\u662F\u5F00\u6E90\u7684\u4F60\u4E5F\u53EF\u4EE5\u8BBF\u95EE <a href="https://github.com/nodejs/node" target="_blank" rel="noreferrer">github (opens new window)</a>\u4E86\u89E3\u6E90\u7801\u3002</p><p><img src="https://doc.houdunren.com/assets/img/image-20230109014001481.1acc938d.png" alt="image-20230109014001481"></p><p>\u5B89\u88C5\u540E\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u67E5\u770B\u5B89\u88C5\u7684nodejs\u7248\u672C</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">node -v</span></span>
<span class="line"></span></code></pre></div><p>\u4E0B\u9762\u7F16\u5199 <code>index.js</code> \u5185\u5BB9\u5982\u4E0B</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hello node.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>\u7136\u540E\u5728\u547D\u4EE4\u884C\u6267\u884C\u8BE5\u6587\u4EF6\uFF0C\u597D\u53EF\u4EE5\u67E5\u770B\u5230\u5F53\u524D\u76EE\u5F55\u7684node.js\u6267\u884C\u7ED3\u679C</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">node index.js</span></span>
<span class="line"></span></code></pre></div><blockquote><p><strong>\u62D3\u5C55\uFF1A\u7EC8\u7AEF\u5FEB\u6377\u952E</strong></p><ol><li>\u2191\uFF1A\u4E0A\u4E00\u6B21\u6267\u884C\u7684\u547D\u4EE4</li><li>tab\uFF1A\u8865\u5168\u8DEF\u5F84</li><li>esc\uFF1A\u6E05\u7A7A\u5F53\u524D\u5DF2\u8F93\u5165\u7684\u547D\u4EE4</li><li>cls\uFF1A\u6E05\u7A7A\u7EC8\u7AEF</li></ol></blockquote><h2 id="\u7C7B\u578B\u652F\u6301" tabindex="-1">\u7C7B\u578B\u652F\u6301 <a class="header-anchor" href="#\u7C7B\u578B\u652F\u6301" aria-hidden="true">#</a></h2><p>\u5F00\u53D1\u4E2D\u7ECF\u5E38\u9700\u8981\u4F7F\u7528 typescript \u8FDB\u884C\u5F00\u53D1\uFF0C\u6240\u4EE5\u6211\u4EEC\u6765\u914D\u7F6E Node \u7684 typescript \u5F00\u53D1\u73AF\u5883\u3002</p><h3 id="\u5B89\u88C5\u8F6F\u4EF6" tabindex="-1">\u5B89\u88C5\u8F6F\u4EF6 <a class="header-anchor" href="#\u5B89\u88C5\u8F6F\u4EF6" aria-hidden="true">#</a></h3><p>\u9996\u5148\u5B89\u88C5 Ts \u73AF\u5883\u9700\u8981\u7684\u8F6F\u4EF6</p><ul><li><a href="https://github.com/TypeStrong/ts-node#overview" target="_blank" rel="noreferrer">ts-node (opens new window)</a>\u4F7F\u60A8\u80FD\u591F\u76F4\u63A5\u5728 Node \u4E0A\u6267\u884C TypeScript.js\u800C\u65E0\u9700\u9884\u7F16\u8BD1</li><li><a href="https://github.com/remy/nodemon" target="_blank" rel="noreferrer">nodemon (opens new window)</a>nodemon \u76D1\u89C6\u6E90\u4E2D\u7684\u4EFB\u4F55\u66F4\u6539\u5E76\u81EA\u52A8\u91CD\u65B0\u542F\u52A8\u670D\u52A1\u5668\uFF0C\u975E\u5E38\u9002\u5408\u5F00\u53D1\u3002</li><li><a href="https://www.tslang.cn/index.html#download-links" target="_blank" rel="noreferrer">typescript (opens new window)</a>\u5B89\u88C5typescript</li></ul><p>\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\u8FDB\u884C\u5B89\u88C5</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm add -g add ts-node nodemon typescript @types/node</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="\u6587\u4EF6\u7ED3\u6784" tabindex="-1">\u6587\u4EF6\u7ED3\u6784 <a class="header-anchor" href="#\u6587\u4EF6\u7ED3\u6784" aria-hidden="true">#</a></h3><p>\u6700\u7EC8\u7684\u9879\u76EE\u6587\u4EF6\u7ED3\u6784\u5982\u4E0B</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 pnpm-lock.yaml</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2514\u2500\u2500 src</span></span>
<span class="line"><span style="color:#A6ACCD;">    \u251C\u2500\u2500 http.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">    \u2514\u2500\u2500 index.ts</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="package-json" tabindex="-1">package.json <a class="header-anchor" href="#package-json" aria-hidden="true">#</a></h3><p>\u521B\u5EFA package.json \u6587\u4EF6</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm init</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>package.json\u6587\u4EF6\u5185\u5BB9\u4E3A</p><ul><li>\u5C06\u4E3B\u6587\u4EF6\u4FEE\u6539\u4E3A <strong>index.ts</strong></li><li>\u56E0\u4E3A\u4F1A\u81EA\u52A8\u8C03\u7528 <strong>ts-node</strong> \u547D\u4EE4\uFF0C\u6240\u4EE5dev \u547D\u4EE4\u53EF\u4EE5\u7B80\u5199\u4E3A <strong>dev:nodemon</strong></li></ul><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
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
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="tsconfig-json" tabindex="-1">tsconfig.json <a class="header-anchor" href="#tsconfig-json" aria-hidden="true">#</a></h3><p>\u7136\u540E\u521B\u5EFA tsconfig.json \u6587\u4EF6</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">tsc --init</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u914D\u7F6E\u9879\u5185\u5BB9\u5982\u4E0B</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //ts\u7F16\u8BD1\u4E3A\u7684ES\u7684\u7248\u672C</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;target&quot;: &quot;ESNext&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    //\u4F7F\u7528\u7684\u6A21\u5757\u89C4\u8303</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;module&quot;: &quot;NodeNext&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    //\u517C\u5BB9common.js\u6A21\u5757\u5230ESM</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;esModuleInterop&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    //\u5F00\u542F\u4E25\u683C\u7C7B\u578B\u6821\u9A8C</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;strict&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    //\u5141\u8BB8\u5BFC\u5165\u6269\u5C55\u540D\u4E3A.json\u7684\u6A21\u5757</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;resolveJsonModule&quot;: true</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  //\u6211\u4EEC\u4EE3\u7801\u4F4D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;include&quot;: [&quot;./**/*&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="\u8FD0\u884C\u6D4B\u8BD5" tabindex="-1">\u8FD0\u884C\u6D4B\u8BD5 <a class="header-anchor" href="#\u8FD0\u884C\u6D4B\u8BD5" aria-hidden="true">#</a></h3><p>\u4E0B\u9762\u6211\u4EEC\u6765\u8FD0\u884C\u9879\u76EE\uFF0C\u9879\u76EE\u7684\u4E3B\u6587\u4EF6\u662F <strong>src/index.ts</strong>\uFF0C\u6587\u4EF6\u5185\u5BB9\u5982\u4E0B</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">import os from &#39;os&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(os.version())</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u63A5\u7740\u6267\u884C\u547D\u4EE4\u6765\u8FD0\u884C\u9879\u76EE</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm run dev</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,50),t=[l];function p(c,i,r,d,u,h){return e(),n("div",null,t)}const g=s(o,[["render",p]]);export{A as __pageData,g as default};
