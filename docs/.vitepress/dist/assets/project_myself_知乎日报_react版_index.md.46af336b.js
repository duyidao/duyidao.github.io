import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.2ee92742.js";const F=JSON.parse('{"title":"项目初始化","description":"","frontmatter":{},"headers":[],"relativePath":"project/myself/知乎日报/react版/index.md","filePath":"project/myself/知乎日报/react版/index.md","lastUpdated":null}'),l={name:"project/myself/知乎日报/react版/index.md"},o=p(`<h1 id="项目初始化" tabindex="-1">项目初始化 <a class="header-anchor" href="#项目初始化" aria-label="Permalink to &quot;项目初始化&quot;">​</a></h1><h2 id="项目创建" tabindex="-1">项目创建 <a class="header-anchor" href="#项目创建" aria-label="Permalink to &quot;项目创建&quot;">​</a></h2><p>采用 <code>create-react-app</code> 创建 <code>react</code> 版项目。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npx create-react-app news</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npx create-react-app news</span></span></code></pre></div><h2 id="依赖引入" tabindex="-1">依赖引入 <a class="header-anchor" href="#依赖引入" aria-label="Permalink to &quot;依赖引入&quot;">​</a></h2><ol><li><p>引入初始化样式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yarn add reset.css</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yarn add reset.css</span></span></code></pre></div></li><li><p>引入 CSS 预处理器</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yarn add sass sass-loader</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yarn add sass sass-loader</span></span></code></pre></div></li><li><p>处理最大宽度</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 处理最大宽度</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleMax</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleMax</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> html </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.documentElement,</span></span>
<span class="line"><span style="color:#E1E4E8;">      root </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;root&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">      deviceW </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> html.clientWidth;</span></span>
<span class="line"><span style="color:#E1E4E8;">    root.style.maxWidth </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;750px&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (deviceW </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">750</span><span style="color:#E1E4E8;">) html.style.fontSize </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;75px&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">handleMax</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">})();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 处理最大宽度</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleMax</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleMax</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> html </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.documentElement,</span></span>
<span class="line"><span style="color:#24292E;">      root </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;root&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">      deviceW </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> html.clientWidth;</span></span>
<span class="line"><span style="color:#24292E;">    root.style.maxWidth </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;750px&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (deviceW </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">750</span><span style="color:#24292E;">) html.style.fontSize </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;75px&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">handleMax</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">})();</span></span></code></pre></div></li></ol><h2 id="单位换算" tabindex="-1">单位换算 <a class="header-anchor" href="#单位换算" aria-label="Permalink to &quot;单位换算&quot;">​</a></h2><p>引入依赖实现响应式布局：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yarn add lib-flexible</span></span>
<span class="line"><span style="color:#e1e4e8;">yarn add postcss-pxtorem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yarn add lib-flexible</span></span>
<span class="line"><span style="color:#24292e;">yarn add postcss-pxtorem</span></span></code></pre></div><p>在src目录下index.js里引入<a href="https://so.csdn.net/so/search?q=lib-flexible&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">lib-flexible</a></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;lib-flexible&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;lib-flexible&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>修改<a href="https://so.csdn.net/so/search?q=webpack&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">webpack</a>.config.js（这个文件在node_modules文件夹下的react-scripts文件夹下的config文件夹中）</p><p>先引入：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pxtorem</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;postcss-pxtorem&#39;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pxtorem</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;postcss-pxtorem&#39;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>然后找到下图位置添加如下代码（因为这里是三元运算符，所以要加两次）</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pxtorem</span><span style="color:#E1E4E8;">({ rootValue: </span><span style="color:#79B8FF;">75</span><span style="color:#E1E4E8;">, unitPrecision: </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">, propList: [</span><span style="color:#9ECBFF;">&#39;*&#39;</span><span style="color:#E1E4E8;">] })</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pxtorem</span><span style="color:#24292E;">({ rootValue: </span><span style="color:#005CC5;">75</span><span style="color:#24292E;">, unitPrecision: </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">, propList: [</span><span style="color:#032F62;">&#39;*&#39;</span><span style="color:#24292E;">] })</span></span></code></pre></div><p><img src="https://pic.imgdb.cn/item/64d1ad9b1ddac507cc11a7cb.jpg" alt="效果"></p><h2 id="路径别名" tabindex="-1">路径别名 <a class="header-anchor" href="#路径别名" aria-label="Permalink to &quot;路径别名&quot;">​</a></h2><p>用 <code>create-react-app</code> 创建的 <code>react</code> 版项目路径别名配置需要先下载两个依赖：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yarn add react-app-rewired</span></span>
<span class="line"><span style="color:#e1e4e8;">yarn add customize-cra</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yarn add react-app-rewired</span></span>
<span class="line"><span style="color:#24292e;">yarn add customize-cra</span></span></code></pre></div><p>下载完毕后在根目录下创建 <code>config-overrides</code> 用于配置别名，代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">override</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">addWebpackAlias</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;customize-cra&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;path&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">override</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">addWebpackAlias</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;@&quot;</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&quot;src/&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">override</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">addWebpackAlias</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;customize-cra&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;path&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">override</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">addWebpackAlias</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;@&quot;</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&quot;src/&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><p>紧接着修改 <code>package.json</code> 文件中的 <code>scripts</code> 对象内的启动语句，代码如下：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;start&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react-app-rewired start&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;build&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react-app-rewired build&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;test&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react-app-rewired test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;eject&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react-scripts eject&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;start&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react-app-rewired start&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;build&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react-app-rewired build&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;test&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react-app-rewired test&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;eject&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react-scripts eject&quot;</span></span>
<span class="line"><span style="color:#24292E;">},</span></span></code></pre></div><p>现在重新运行，可以使用路径别名了。</p><h2 id="组件库使用" tabindex="-1">组件库使用 <a class="header-anchor" href="#组件库使用" aria-label="Permalink to &quot;组件库使用&quot;">​</a></h2><p>本项目使用的是 <code>antd-mobile</code> 组件库。使用方法如下：</p><ol><li><p>引入组件库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yarn add antd-mobile</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yarn add antd-mobile</span></span></code></pre></div></li><li><p>国际化配置</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ReactDOM </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-dom/client&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@/App&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 国际化语法包</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ConfigProvider } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;antd-mobile&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> zhCN </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;antd-mobile/es/locales/zh-CN&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ReactDOM.</span><span style="color:#B392F0;">createRoot</span><span style="color:#E1E4E8;">(document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;root&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">root.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">React.StrictMode</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">ConfigProvider</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">locale</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{zhCN}&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">App</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">ConfigProvider</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#79B8FF;">React.StrictMode</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ReactDOM </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-dom/client&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@/App&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 国际化语法包</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ConfigProvider } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;antd-mobile&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> zhCN </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;antd-mobile/es/locales/zh-CN&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">root</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ReactDOM.</span><span style="color:#6F42C1;">createRoot</span><span style="color:#24292E;">(document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;root&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">root.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">React.StrictMode</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">ConfigProvider</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">locale</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{zhCN}&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">App</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">ConfigProvider</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#005CC5;">React.StrictMode</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div></li></ol>`,28),e=[o];function t(c,r,E,y,i,d){return a(),n("div",null,e)}const h=s(l,[["render",t]]);export{F as __pageData,h as default};
