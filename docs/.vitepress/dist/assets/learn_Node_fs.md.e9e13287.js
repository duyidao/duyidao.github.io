import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const h=JSON.parse('{"title":"fs","description":"","frontmatter":{},"headers":[],"relativePath":"learn/Node/fs.md","filePath":"learn/Node/fs.md","lastUpdated":null}'),e={name:"learn/Node/fs.md"},p=l(`<h1 id="fs" tabindex="-1">fs <a class="header-anchor" href="#fs" aria-label="Permalink to &quot;fs&quot;">​</a></h1><p>fs 模块是 Node.js 官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求。下面来一一介绍。</p><h2 id="异步操作" tabindex="-1">异步操作 <a class="header-anchor" href="#异步操作" aria-label="Permalink to &quot;异步操作&quot;">​</a></h2><p>我们使用 <code>readFile</code> 与 <code>writeFile</code> 对文件进行异步读写操作</p><p>同步文件操作会阻塞进程，所以使用异步文件操作拥有更好的性能，也是推荐的做法。</p><h3 id="读取文件" tabindex="-1">读取文件 <a class="header-anchor" href="#读取文件" aria-label="Permalink to &quot;读取文件&quot;">​</a></h3><p>使用 <code>fs.readFile()</code> 方法，可以读取指定文件中的内容，语法格式如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">fs.</span><span style="color:#B392F0;">readFile</span><span style="color:#E1E4E8;">(path[, options], callback)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">fs.</span><span style="color:#6F42C1;">readFile</span><span style="color:#24292E;">(path[, options], callback)</span></span></code></pre></div><ul><li>参数 1：必选参数，字符串，表示文件的路径。</li><li>参数 2：可选参数，表示以什么编码格式来读取文件。</li><li>参数 3：必选参数，文件读取完成后，通过回调函数拿到读取的结果</li></ul><h4 id="示例代码" tabindex="-1">示例代码 <a class="header-anchor" href="#示例代码" aria-label="Permalink to &quot;示例代码&quot;">​</a></h4><p><code>1.txt</code> 文件内容：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">hello</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">hello</span></span></code></pre></div><p><code>index.js</code> 文件内容：</p><ul><li><p>成功情况</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fs</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;fs&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">fs.</span><span style="color:#B392F0;">readFile</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./1.txt&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;utf8&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">dataStr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(err); </span><span style="color:#6A737D;">// null</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(dataStr); </span><span style="color:#6A737D;">// hello</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fs</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;fs&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">fs.</span><span style="color:#6F42C1;">readFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./1.txt&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;utf8&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">err</span><span style="color:#24292E;">, </span><span style="color:#E36209;">dataStr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(err); </span><span style="color:#6A737D;">// null</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(dataStr); </span><span style="color:#6A737D;">// hello</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div></li><li><p>失败情况</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fs</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;fs&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">fs.</span><span style="color:#B392F0;">readFile</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./11.txt&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;utf8&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">dataStr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(err);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//	errno: -4058,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//	code: &#39;ENOENT&#39;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//	syscall: &#39;open&#39;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//	path: &#39;C:\\\\Users\\\\Administrator\\\\Desktop\\\\blog\\\\node\\\\11.txt&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// }</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(dataStr); </span><span style="color:#6A737D;">// undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fs</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;fs&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">fs.</span><span style="color:#6F42C1;">readFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./11.txt&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;utf8&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">err</span><span style="color:#24292E;">, </span><span style="color:#E36209;">dataStr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(err);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//	errno: -4058,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//	code: &#39;ENOENT&#39;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//	syscall: &#39;open&#39;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//	path: &#39;C:\\\\Users\\\\Administrator\\\\Desktop\\\\blog\\\\node\\\\11.txt&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// }</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(dataStr); </span><span style="color:#6A737D;">// undefined</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div></li></ul><h3 id="写入文件" tabindex="-1">写入文件 <a class="header-anchor" href="#写入文件" aria-label="Permalink to &quot;写入文件&quot;">​</a></h3><p>使用 <code>fs.writeFile()</code> 方法，可以向指定的文件中写入内容，语法格式如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">fs.</span><span style="color:#B392F0;">writeFile</span><span style="color:#E1E4E8;">(file, data[, options], callback)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">fs.</span><span style="color:#6F42C1;">writeFile</span><span style="color:#24292E;">(file, data[, options], callback)</span></span></code></pre></div><ul><li>参数 1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。</li><li>参数 2：必选参数，表示要写入的内容。</li><li>参数 3：可选参数，表示以什么格式写入文件内容，默认值是 utf8。</li><li>参数 4：必选参数，文件写入完成后的回调函数</li></ul><h4 id="示例代码-1" tabindex="-1">示例代码 <a class="header-anchor" href="#示例代码-1" aria-label="Permalink to &quot;示例代码&quot;">​</a></h4><ul><li><p>成功状态</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fs</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;fs&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">fs.</span><span style="color:#B392F0;">writeFile</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./1.txt&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;add&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;utf8&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(err); </span><span style="color:#6A737D;">// null</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fs</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;fs&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">fs.</span><span style="color:#6F42C1;">writeFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./1.txt&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;add&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;utf8&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">err</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(err); </span><span style="color:#6A737D;">// null</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div></li><li><p>失败状态</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fs</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;fs&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">fs.</span><span style="color:#B392F0;">writeFile</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./11.txt&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;add&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;utf8&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(err);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//  errno: -4058,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//  code: &#39;ENOENT&#39;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//  syscall: &#39;open&#39;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//  path: &#39;C:\\\\Users\\\\Administrator\\\\Desktop\\\\blog\\\\abc\\\\1.txt&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fs</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;fs&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">fs.</span><span style="color:#6F42C1;">writeFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./11.txt&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;add&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;utf8&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">err</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(err);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//  errno: -4058,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//  code: &#39;ENOENT&#39;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//  syscall: &#39;open&#39;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//  path: &#39;C:\\\\Users\\\\Administrator\\\\Desktop\\\\blog\\\\abc\\\\1.txt&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div></li></ul><h3 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h3><p>使用 <code>fs</code> 文件系统模块，将素材目录下成绩 <code>.txt</code> 文件中的考试数据，整理到成绩 <code>ok.txt</code> 文件中。</p><p>整理前的格式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">小红=99 小白=100 小刀=150 小李=50</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">小红=99 小白=100 小刀=150 小李=50</span></span></code></pre></div><p>整理后的格式：</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">小红：99</span></span>
<span class="line"><span style="color:#e1e4e8;">小白：100</span></span>
<span class="line"><span style="color:#e1e4e8;">小刀：150</span></span>
<span class="line"><span style="color:#e1e4e8;">小李：50</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">小红：99</span></span>
<span class="line"><span style="color:#24292e;">小白：100</span></span>
<span class="line"><span style="color:#24292e;">小刀：150</span></span>
<span class="line"><span style="color:#24292e;">小李：50</span></span></code></pre></div><p>代码：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fs</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;fs&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">fs.</span><span style="color:#B392F0;">readFile</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./1.txt&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;utf8&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">dataStr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 判断读取是否成功</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (err) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;读取文件失败，&quot;</span><span style="color:#E1E4E8;">, err);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 把获取到的字符串中的 = 正则替换为：，空格替换为换行</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">arr</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> dataStr.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\=</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">g</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;：&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">g</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\r\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  fs.</span><span style="color:#B392F0;">writeFile</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./2.txt&quot;</span><span style="color:#E1E4E8;">, arr, </span><span style="color:#9ECBFF;">&quot;utf8&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 判断写入是否成功</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (err) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;成绩写入失败&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;成绩写入成功&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fs</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;fs&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">fs.</span><span style="color:#6F42C1;">readFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./1.txt&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;utf8&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">err</span><span style="color:#24292E;">, </span><span style="color:#E36209;">dataStr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 判断读取是否成功</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (err) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;读取文件失败，&quot;</span><span style="color:#24292E;">, err);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 把获取到的字符串中的 = 正则替换为：，空格替换为换行</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">arr</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> dataStr.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/</span><span style="color:#22863A;font-weight:bold;">\\=</span><span style="color:#032F62;">/</span><span style="color:#D73A49;">g</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;：&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/ /</span><span style="color:#D73A49;">g</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\r\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  fs.</span><span style="color:#6F42C1;">writeFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./2.txt&quot;</span><span style="color:#24292E;">, arr, </span><span style="color:#032F62;">&quot;utf8&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">err</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 判断写入是否成功</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (err) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;成绩写入失败&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;成绩写入成功&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h2 id="同步操作" tabindex="-1">同步操作 <a class="header-anchor" href="#同步操作" aria-label="Permalink to &quot;同步操作&quot;">​</a></h2><ul><li>同步操作会阻塞进程</li><li>如果是写入文件，可以不设置编码</li></ul><h3 id="回调函数" tabindex="-1">回调函数 <a class="header-anchor" href="#回调函数" aria-label="Permalink to &quot;回调函数&quot;">​</a></h3><p>使用 <strong>readFile</strong> 与 <strong>writeFile</strong> 可以对文件进行异步操作，不阻塞进程拥有更好的性能。</p><ul><li>Node.js 以错误优先为思想，所以回调函数第一个参数为错误信息，没有错误时值为 null</li></ul><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { readFile, writeFile } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">readFile(&#39;hd.txt&#39;, &#39;utf8&#39;, (error, content) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (error) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(error)</span></span>
<span class="line"><span style="color:#e1e4e8;">  } else {</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(content)</span></span>
<span class="line"><span style="color:#e1e4e8;">    //异步写入文件</span></span>
<span class="line"><span style="color:#e1e4e8;">    writeFile(&#39;xj.txt&#39;, content, (error) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">      if (error) console.log(error)</span></span>
<span class="line"><span style="color:#e1e4e8;">      else console.log(&#39;文件写入成功&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    })</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span>
<span class="line"><span style="color:#e1e4e8;">console.log(&#39;后盾人提示，因为是异步，所以这行较readFile的回调函数先执行&#39;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { readFile, writeFile } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">readFile(&#39;hd.txt&#39;, &#39;utf8&#39;, (error, content) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  if (error) {</span></span>
<span class="line"><span style="color:#24292e;">    console.log(error)</span></span>
<span class="line"><span style="color:#24292e;">  } else {</span></span>
<span class="line"><span style="color:#24292e;">    console.log(content)</span></span>
<span class="line"><span style="color:#24292e;">    //异步写入文件</span></span>
<span class="line"><span style="color:#24292e;">    writeFile(&#39;xj.txt&#39;, content, (error) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">      if (error) console.log(error)</span></span>
<span class="line"><span style="color:#24292e;">      else console.log(&#39;文件写入成功&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    })</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">})</span></span>
<span class="line"><span style="color:#24292e;">console.log(&#39;后盾人提示，因为是异步，所以这行较readFile的回调函数先执行&#39;)</span></span></code></pre></div><h3 id="promise" tabindex="-1">Promise <a class="header-anchor" href="#promise" aria-label="Permalink to &quot;Promise&quot;">​</a></h3><p>下面使用 Promise 对文件的操作方法进行封装</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { readFile, writeFile } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//获取文件</span></span>
<span class="line"><span style="color:#e1e4e8;">function fileGetContent(file: string): Promise&lt;string&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return new Promise((resolve) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    readFile(file, &#39;utf8&#39;, (error, content) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">      resolve(content)</span></span>
<span class="line"><span style="color:#e1e4e8;">    })</span></span>
<span class="line"><span style="color:#e1e4e8;">  })</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//写入文件</span></span>
<span class="line"><span style="color:#e1e4e8;">function filePutContent(file: string, content: string) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return new Promise((resolve) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    writeFile(file, content, (error) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">      if (error) throw error</span></span>
<span class="line"><span style="color:#e1e4e8;">      resolve(true)</span></span>
<span class="line"><span style="color:#e1e4e8;">    })</span></span>
<span class="line"><span style="color:#e1e4e8;">  })</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 使用 async/await 使用代码更清晰</span></span>
<span class="line"><span style="color:#e1e4e8;">async function hd() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const content = await fileGetContent(&#39;hd.txt&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  await filePutContent(&#39;xj.txt&#39;, content)</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(&#39;xj.txt 写入成功&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">hd()</span></span>
<span class="line"><span style="color:#e1e4e8;">console.log(&#39;先输出...&#39;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { readFile, writeFile } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//获取文件</span></span>
<span class="line"><span style="color:#24292e;">function fileGetContent(file: string): Promise&lt;string&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  return new Promise((resolve) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    readFile(file, &#39;utf8&#39;, (error, content) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">      resolve(content)</span></span>
<span class="line"><span style="color:#24292e;">    })</span></span>
<span class="line"><span style="color:#24292e;">  })</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//写入文件</span></span>
<span class="line"><span style="color:#24292e;">function filePutContent(file: string, content: string) {</span></span>
<span class="line"><span style="color:#24292e;">  return new Promise((resolve) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    writeFile(file, content, (error) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">      if (error) throw error</span></span>
<span class="line"><span style="color:#24292e;">      resolve(true)</span></span>
<span class="line"><span style="color:#24292e;">    })</span></span>
<span class="line"><span style="color:#24292e;">  })</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 使用 async/await 使用代码更清晰</span></span>
<span class="line"><span style="color:#24292e;">async function hd() {</span></span>
<span class="line"><span style="color:#24292e;">  const content = await fileGetContent(&#39;hd.txt&#39;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  await filePutContent(&#39;xj.txt&#39;, content)</span></span>
<span class="line"><span style="color:#24292e;">  console.log(&#39;xj.txt 写入成功&#39;)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">hd()</span></span>
<span class="line"><span style="color:#24292e;">console.log(&#39;先输出...&#39;)</span></span></code></pre></div><h4 id="fs-promises" tabindex="-1">fs/promises <a class="header-anchor" href="#fs-promises" aria-label="Permalink to &quot;fs/promises&quot;">​</a></h4><p>其实我们不需要自己封装，因为 Node 提供了 Promise 操作机制</p><p><strong>fs/promises</strong> 提供了 Promise 操作机制</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { readFile } from &#39;fs/promises&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">readFile(&#39;hd.txt&#39;, &#39;utf-8&#39;).then((content) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(content)</span></span>
<span class="line"><span style="color:#e1e4e8;">}).catch(error=&gt;console.log(error))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { readFile } from &#39;fs/promises&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">readFile(&#39;hd.txt&#39;, &#39;utf-8&#39;).then((content) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(content)</span></span>
<span class="line"><span style="color:#24292e;">}).catch(error=&gt;console.log(error))</span></span></code></pre></div><h2 id="路径拼接" tabindex="-1">路径拼接 <a class="header-anchor" href="#路径拼接" aria-label="Permalink to &quot;路径拼接&quot;">​</a></h2><p>在使用 <code>fs</code> 模块操作文件时，如果提供的操作路径是以 <code>./</code> 或 <code>../</code> 开头的相对路径时，很容易出现路径动态拼接错误的问题。</p><p>原因：代码在运行的时候，会以执行 <code>node</code> 命令时所处的目录，动态拼接出被操作文件的完整路径。</p><p>解决方案：在使用 <code>fs</code> 模块操作文件时，直接提供完整的路径，或者通过 <code>__dirname</code> 字段拼接获取路径，不要提供 <code>./</code> 或 <code>../</code> 开头的相对路径，从而防止路径动态拼接的问题。</p><h2 id="文件信息" tabindex="-1">文件信息 <a class="header-anchor" href="#文件信息" aria-label="Permalink to &quot;文件信息&quot;">​</a></h2><h3 id="existssync" tabindex="-1">existsSync <a class="header-anchor" href="#existssync" aria-label="Permalink to &quot;existsSync&quot;">​</a></h3><p>使用 <strong>existsSync</strong> 判断文件或目录是否存在，返回值是 <strong>boolean</strong></p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { existsSync } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if (existsSync(&#39;hd.txt&#39;)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(&#39;文件存在&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { existsSync } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if (existsSync(&#39;hd.txt&#39;)) {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(&#39;文件存在&#39;)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="https-doc-houdunren-com-系统课程-node-8-fs-模块-html-stat-stat" tabindex="-1">[#](<a href="https://doc.houdunren.com/%E7%B3%BB%E7%BB%9F%E8%AF%BE%E7%A8%8B/node/8" target="_blank" rel="noreferrer">https://doc.houdunren.com/系统课程/node/8</a> FS 模块.html#stat)stat <a class="header-anchor" href="#https-doc-houdunren-com-系统课程-node-8-fs-模块-html-stat-stat" aria-label="Permalink to &quot;[#](https://doc.houdunren.com/系统课程/node/8 FS 模块.html#stat)stat&quot;">​</a></h3><p>使用 <strong>stat</strong> 可以获取文件或目录详细信息，比如可用来判断是否是文件或目录。</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { stat } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">stat(&#39;hda&#39;, (error, stats) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (error) throw new Error(&#39;文件不存在或没有操作权限&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (stats.isFile()) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;这是文件&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (stats.isDirectory()) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;这是目录&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { stat } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">stat(&#39;hda&#39;, (error, stats) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  if (error) throw new Error(&#39;文件不存在或没有操作权限&#39;)</span></span>
<span class="line"><span style="color:#24292e;">  if (stats.isFile()) {</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;这是文件&#39;)</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  if (stats.isDirectory()) {</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;这是目录&#39;)</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">})</span></span></code></pre></div><p><strong>fs/promises</strong> 提供了 Promise 的操作方法</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { stat } from &#39;fs/promises&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//是否是目录</span></span>
<span class="line"><span style="color:#e1e4e8;">async function fileType(file: string) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  try {</span></span>
<span class="line"><span style="color:#e1e4e8;">    const stats = await stat(file)</span></span>
<span class="line"><span style="color:#e1e4e8;">    return stats.isDirectory() ? &#39;dir&#39; : &#39;file&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  } catch (error) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (error) throw new Error(&#39;文件不存在或没有操作权限&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">fileType(&#39;hd&#39;).then((type) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(type === &#39;dir&#39; ? &#39;目录&#39; : &#39;文件&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { stat } from &#39;fs/promises&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//是否是目录</span></span>
<span class="line"><span style="color:#24292e;">async function fileType(file: string) {</span></span>
<span class="line"><span style="color:#24292e;">  try {</span></span>
<span class="line"><span style="color:#24292e;">    const stats = await stat(file)</span></span>
<span class="line"><span style="color:#24292e;">    return stats.isDirectory() ? &#39;dir&#39; : &#39;file&#39;</span></span>
<span class="line"><span style="color:#24292e;">  } catch (error) {</span></span>
<span class="line"><span style="color:#24292e;">    if (error) throw new Error(&#39;文件不存在或没有操作权限&#39;)</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">fileType(&#39;hd&#39;).then((type) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(type === &#39;dir&#39; ? &#39;目录&#39; : &#39;文件&#39;)</span></span>
<span class="line"><span style="color:#24292e;">})</span></span></code></pre></div><h3 id="https-doc-houdunren-com-系统课程-node-8-fs-模块-html-unlink-unlink" tabindex="-1">[#](<a href="https://doc.houdunren.com/%E7%B3%BB%E7%BB%9F%E8%AF%BE%E7%A8%8B/node/8" target="_blank" rel="noreferrer">https://doc.houdunren.com/系统课程/node/8</a> FS 模块.html#unlink)unlink <a class="header-anchor" href="#https-doc-houdunren-com-系统课程-node-8-fs-模块-html-unlink-unlink" aria-label="Permalink to &quot;[#](https://doc.houdunren.com/系统课程/node/8 FS 模块.html#unlink)unlink&quot;">​</a></h3><p>使用 <strong>unlink</strong> 执行异步删除文件</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { unlink, writeFileSync } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">writeFileSync(&#39;hd.txt&#39;, &#39;houdunren&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">	//三秒后删除文件</span></span>
<span class="line"><span style="color:#e1e4e8;">  unlink(&#39;hd.txt&#39;, (error) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (error) throw error</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;文件删除成功&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  })</span></span>
<span class="line"><span style="color:#e1e4e8;">}, 3000)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { unlink, writeFileSync } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#24292e;">writeFileSync(&#39;hd.txt&#39;, &#39;houdunren&#39;)</span></span>
<span class="line"><span style="color:#24292e;">setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">	//三秒后删除文件</span></span>
<span class="line"><span style="color:#24292e;">  unlink(&#39;hd.txt&#39;, (error) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    if (error) throw error</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;文件删除成功&#39;)</span></span>
<span class="line"><span style="color:#24292e;">  })</span></span>
<span class="line"><span style="color:#24292e;">}, 3000)</span></span></code></pre></div><p><strong>fs/promises</strong> 中封装了 Promise 删除文件方法</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { writeFileSync } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">import { unlink } from &#39;fs/promises&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">async function hd() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  await unlink(&#39;hd.txt&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">writeFileSync(&#39;hd.txt&#39;, &#39;houdunren.com&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  hd()</span></span>
<span class="line"><span style="color:#e1e4e8;">}, 3000)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { writeFileSync } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#24292e;">import { unlink } from &#39;fs/promises&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">async function hd() {</span></span>
<span class="line"><span style="color:#24292e;">  await unlink(&#39;hd.txt&#39;)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">writeFileSync(&#39;hd.txt&#39;, &#39;houdunren.com&#39;)</span></span>
<span class="line"><span style="color:#24292e;">setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  hd()</span></span>
<span class="line"><span style="color:#24292e;">}, 3000)</span></span></code></pre></div><h2 id="https-doc-houdunren-com-系统课程-node-8-fs-模块-html-目录管理-目录管理" tabindex="-1">[#](<a href="https://doc.houdunren.com/%E7%B3%BB%E7%BB%9F%E8%AF%BE%E7%A8%8B/node/8" target="_blank" rel="noreferrer">https://doc.houdunren.com/系统课程/node/8</a> FS 模块.html#目录管理)目录管理 <a class="header-anchor" href="#https-doc-houdunren-com-系统课程-node-8-fs-模块-html-目录管理-目录管理" aria-label="Permalink to &quot;[#](https://doc.houdunren.com/系统课程/node/8 FS 模块.html#目录管理)目录管理&quot;">​</a></h2><p>下面向军大叔教大家使用 Node 操作目录</p><h3 id="https-doc-houdunren-com-系统课程-node-8-fs-模块-html-创建目录-创建目录" tabindex="-1">[#](<a href="https://doc.houdunren.com/%E7%B3%BB%E7%BB%9F%E8%AF%BE%E7%A8%8B/node/8" target="_blank" rel="noreferrer">https://doc.houdunren.com/系统课程/node/8</a> FS 模块.html#创建目录)创建目录 <a class="header-anchor" href="#https-doc-houdunren-com-系统课程-node-8-fs-模块-html-创建目录-创建目录" aria-label="Permalink to &quot;[#](https://doc.houdunren.com/系统课程/node/8 FS 模块.html#创建目录)创建目录&quot;">​</a></h3><p>下面是使用 <strong>mkdirSync</strong> 以同步的方式创建多级目录</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { mkdirSync } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const state = mkdirSync(&#39;a/b/c/d&#39;, { recursive: true })</span></span>
<span class="line"><span style="color:#e1e4e8;">if (state) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(&#39;目录创建成功&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { mkdirSync } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const state = mkdirSync(&#39;a/b/c/d&#39;, { recursive: true })</span></span>
<span class="line"><span style="color:#24292e;">if (state) {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(&#39;目录创建成功&#39;)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>使用 <strong>mkdir</strong> 可以创建目录，如果目录已经存在将报错</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { mkdir } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir(&#39;hd&#39;, (error) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (error) throw error</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(&#39;目录创建成功&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { mkdir } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mkdir(&#39;hd&#39;, (error) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  if (error) throw error</span></span>
<span class="line"><span style="color:#24292e;">  console.log(&#39;目录创建成功&#39;)</span></span>
<span class="line"><span style="color:#24292e;">})</span></span></code></pre></div><p><strong>fs/promises</strong> 提供了 Promise 操作方法</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { mkdir } from &#39;fs/promises&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">async function hd() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  await mkdir(&#39;hd&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">hd()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { mkdir } from &#39;fs/promises&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">async function hd() {</span></span>
<span class="line"><span style="color:#24292e;">  await mkdir(&#39;hd&#39;)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">hd()</span></span></code></pre></div><h3 id="https-doc-houdunren-com-系统课程-node-8-fs-模块-html-删除目录-删除目录" tabindex="-1">[#](<a href="https://doc.houdunren.com/%E7%B3%BB%E7%BB%9F%E8%AF%BE%E7%A8%8B/node/8" target="_blank" rel="noreferrer">https://doc.houdunren.com/系统课程/node/8</a> FS 模块.html#删除目录)删除目录 <a class="header-anchor" href="#https-doc-houdunren-com-系统课程-node-8-fs-模块-html-删除目录-删除目录" aria-label="Permalink to &quot;[#](https://doc.houdunren.com/系统课程/node/8 FS 模块.html#删除目录)删除目录&quot;">​</a></h3><p>使用 <strong>rmdirSync</strong> 以同步的方式删除多级目录，同步删除会阻塞代码，建议尽可能使用异步操作。</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { rmdirSync } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rmdirSync(&#39;a&#39;, { recursive: true })</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { rmdirSync } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rmdirSync(&#39;a&#39;, { recursive: true })</span></span></code></pre></div><p>使用 <strong>rmdir</strong> 异步删除目录，默认只能删除空目录</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { rmdir } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rmdir(&#39;hd&#39;, (error) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (error) throw error</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(&#39;目录删除成功&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { rmdir } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rmdir(&#39;hd&#39;, (error) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  if (error) throw error</span></span>
<span class="line"><span style="color:#24292e;">  console.log(&#39;目录删除成功&#39;)</span></span>
<span class="line"><span style="color:#24292e;">})</span></span></code></pre></div><p>递归删除目录，即删除目录中的所有内容，可以删除非空目录</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { rmdir } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rmdir(&#39;hd&#39;, { recursive: true }, (error) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (error) throw error</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(&#39;目录删除成功&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { rmdir } from &#39;fs&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rmdir(&#39;hd&#39;, { recursive: true }, (error) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  if (error) throw error</span></span>
<span class="line"><span style="color:#24292e;">  console.log(&#39;目录删除成功&#39;)</span></span>
<span class="line"><span style="color:#24292e;">})</span></span></code></pre></div><p><strong>fs/promises</strong> 提供了 Promise 操作方法，用于异步删除目录</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { rmdir } from &#39;fs/promises&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rmdir(&#39;hd&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  .then((e) =&gt; console.log(&#39;删除成功&#39;))</span></span>
<span class="line"><span style="color:#e1e4e8;">  .catch((error) =&gt; console.log(&#39;删除失败&#39;))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { rmdir } from &#39;fs/promises&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rmdir(&#39;hd&#39;)</span></span>
<span class="line"><span style="color:#24292e;">  .then((e) =&gt; console.log(&#39;删除成功&#39;))</span></span>
<span class="line"><span style="color:#24292e;">  .catch((error) =&gt; console.log(&#39;删除失败&#39;))</span></span></code></pre></div><p>下面是递归删除目录，非空目录也可以一次删除</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { rmdir } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;fs&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">rmdir</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hd&quot;</span><span style="color:#E1E4E8;">, { recursive: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> }, (</span><span style="color:#FFAB70;">error</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (error) </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> error;</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;目录删除成功&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { rmdir } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;fs&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">rmdir</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hd&quot;</span><span style="color:#24292E;">, { recursive: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> }, (</span><span style="color:#E36209;">error</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (error) </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> error;</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;目录删除成功&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div>`,79),o=[p];function t(c,r,i,y,E,d){return n(),a("div",null,o)}const g=s(e,[["render",t]]);export{h as __pageData,g as default};
