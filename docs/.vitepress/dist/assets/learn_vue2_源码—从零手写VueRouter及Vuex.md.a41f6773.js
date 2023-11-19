import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.2ee92742.js";const F=JSON.parse('{"title":"从零手写VueRouter及Vuex","description":"","frontmatter":{},"headers":[],"relativePath":"learn/vue2/源码—从零手写VueRouter及Vuex.md","filePath":"learn/vue2/源码—从零手写VueRouter及Vuex.md","lastUpdated":null}'),l={name:"learn/vue2/源码—从零手写VueRouter及Vuex.md"},o=p(`<h1 id="从零手写vuerouter及vuex" tabindex="-1">从零手写VueRouter及Vuex <a class="header-anchor" href="#从零手写vuerouter及vuex" aria-label="Permalink to &quot;从零手写VueRouter及Vuex&quot;">​</a></h1><h2 id="vuerouter" tabindex="-1">VueRouter <a class="header-anchor" href="#vuerouter" aria-label="Permalink to &quot;VueRouter&quot;">​</a></h2><p>在一个 Vue 的项目中，入口文件 <code>main.js</code> 中负责渲染组件和引入路由，代码如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 这里用的vue是runtime，不包含compiler</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./App.vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> router </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./router&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 前端路由</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    router,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">h</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">h</span><span style="color:#E1E4E8;">(App) </span><span style="color:#6A737D;">// 渲染组件，内部_c 发现是对象的话会调用组件的render方法进行渲染。如果在这里写template会报错，因为不包含compiler</span></span>
<span class="line"><span style="color:#E1E4E8;">}).</span><span style="color:#B392F0;">$mount</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#app&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 这里用的vue是runtime，不包含compiler</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./App.vue&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> router </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./router&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 前端路由</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vue</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    router,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">: </span><span style="color:#E36209;">h</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">h</span><span style="color:#24292E;">(App) </span><span style="color:#6A737D;">// 渲染组件，内部_c 发现是对象的话会调用组件的render方法进行渲染。如果在这里写template会报错，因为不包含compiler</span></span>
<span class="line"><span style="color:#24292E;">}).</span><span style="color:#6F42C1;">$mount</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#app&#39;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>在 <code>router/index.js</code> 文件中会有这么一段代码：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> VueRouter </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue-router&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Vue.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(VueRouter)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> VueRouter </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue-router&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Vue.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(VueRouter)</span></span></code></pre></div><p>VueRouter 会调用插件的 <code>install</code> 方法。最后导出一个路由实例，在入口文件中传到 <code>new Vue</code> 对象内。</p><p>路由既有前端路由，也有后端路由。后端路由在提交一个表单元素时，服务端会根据提交内容，校验提交结果，最终在服务端发生跳转。此时前端会有很多 <code>html</code> ，后端判断结果跳转不同的 <code>html</code> 。主要针对前后端不分离的项目。</p><p>前端路由指跳转不由后端控制，而是由前端控制，如 <code>router.push</code> 跳转。根据路径不同，渲染不同组件，不经过服务端，也不会刷新页面。前端路由分两种形式：</p><ol><li><p><code>hash</code> 模式，根据哈希值的不同，渲染不同的组件内容。通过 <code>window.addEventListener(&#39;popstate / hashchange&#39;)</code> 可以监控到 <code>hash</code> 值的变化。</p><p>哈希模式的路由缺点其一是丑，所有路径都有 <code>#</code> 锚点；其二是服务端无法获取锚点，无法根据对应的路径来解析内容，因此无法做 SEO 优化。</p></li><li><p><code>history</code> 模式，是 H5 提供的 API ，路径上没有 <code>#</code> 锚点。可以改变路径，同时强制刷新的时候，会带上路径，服务端可以解析此路径。历史模式第一次加载页面会做 SEO 优化，需要配合 SSR，后续页面基于 <code>historyAPI</code> 跳转即可。</p></li></ol><blockquote><p>题外话</p><p>Node 中没有前端 <code>url</code> 地址，因此内部采用的是 <code>memeryHistory</code> 。通过 <code>node</code> + <code>vue</code> 实现路由跳转。（服务端渲染能用到）</p></blockquote><h3 id="install-方法" tabindex="-1">install 方法 <a class="header-anchor" href="#install-方法" aria-label="Permalink to &quot;install 方法&quot;">​</a></h3><p>现在尝试写一个 VueRouter ，新建一个 <code>js</code> 文件，创建一个类，并全部导出。代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueRouter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> VueRouter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueRouter</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> VueRouter</span></span></code></pre></div><p>注释掉原来引入的 <code>vue-router</code> 路由，引入手写的文件，刷新后页面报错，报错信息如下所示；</p><p><img src="https://pic.imgdb.cn/item/65464884c458853aefaf56ff.jpg" alt="报错"></p><p><code>Vue.use()</code> 方法内如果放一个函数，默认会执行，因此如果把一个类放进去则会报错。解决方法为在类中设置一个 <code>install</code> 方法，代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueRouter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 如果用户导出一个类，在类上写一个install方法，会调用该方法</span></span>
<span class="line"><span style="color:#E1E4E8;">VueRouter.</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">Vue</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;install&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> VueRouter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueRouter</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 如果用户导出一个类，在类上写一个install方法，会调用该方法</span></span>
<span class="line"><span style="color:#24292E;">VueRouter.</span><span style="color:#6F42C1;">install</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">Vue</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;install&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> VueRouter</span></span></code></pre></div><p>因为 VueRouter 会调用插件的 <code>install</code> 方法。在源码中，它会去判断是否有 <code>nstall</code> 方法，如果有则调用，没有才执行函数。</p><p>方法 <code>install</code> 会拿到 Vue 构造函数，为了能够每个文件都可使用，在 <code>install</code> 方法中保存到全局属性上。代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> Vue</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueRouter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> routes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options.routes</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 如果用户导出一个类，在类上写一个install方法，会调用该方法</span></span>
<span class="line"><span style="color:#E1E4E8;">VueRouter.</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">_Vue</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Vue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> _Vue </span><span style="color:#6A737D;">// 将传入的Vue的构造函数变为全局的</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;install&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> VueRouter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> Vue</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueRouter</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">options</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> routes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options.routes</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 如果用户导出一个类，在类上写一个install方法，会调用该方法</span></span>
<span class="line"><span style="color:#24292E;">VueRouter.</span><span style="color:#6F42C1;">install</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">_Vue</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    Vue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> _Vue </span><span style="color:#6A737D;">// 将传入的Vue的构造函数变为全局的</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;install&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> VueRouter</span></span></code></pre></div><p>在创建路由表时，前端代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">routes</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        path: </span><span style="color:#9ECBFF;">&#39;/&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        component: </span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./home.vue&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        children: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        	{</span></span>
<span class="line"><span style="color:#E1E4E8;">        		path: </span><span style="color:#9ECBFF;">&#39;a&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        		component: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        			</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">h</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">h</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;&lt;div&gt;a&lt;/div&gt;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    			}</span></span>
<span class="line"><span style="color:#E1E4E8;">    		}</span></span>
<span class="line"><span style="color:#E1E4E8;">        ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        path: </span><span style="color:#9ECBFF;">&#39;/about&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        component: </span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./about.vue&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        children: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        	{</span></span>
<span class="line"><span style="color:#E1E4E8;">        		path: </span><span style="color:#9ECBFF;">&#39;a&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        		component: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        			</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">h</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">h</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;&lt;div&gt;about a&lt;/div&gt;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    			}</span></span>
<span class="line"><span style="color:#E1E4E8;">    		}</span></span>
<span class="line"><span style="color:#E1E4E8;">        ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">routes</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        path: </span><span style="color:#032F62;">&#39;/&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        component: </span><span style="color:#6F42C1;">import</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./home.vue&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        children: [</span></span>
<span class="line"><span style="color:#24292E;">        	{</span></span>
<span class="line"><span style="color:#24292E;">        		path: </span><span style="color:#032F62;">&#39;a&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        		component: {</span></span>
<span class="line"><span style="color:#24292E;">        			</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">h</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">h</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;&lt;div&gt;a&lt;/div&gt;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    			}</span></span>
<span class="line"><span style="color:#24292E;">    		}</span></span>
<span class="line"><span style="color:#24292E;">        ]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        path: </span><span style="color:#032F62;">&#39;/about&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        component: </span><span style="color:#6F42C1;">import</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./about.vue&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        children: [</span></span>
<span class="line"><span style="color:#24292E;">        	{</span></span>
<span class="line"><span style="color:#24292E;">        		path: </span><span style="color:#032F62;">&#39;a&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        		component: {</span></span>
<span class="line"><span style="color:#24292E;">        			</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">h</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">h</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;&lt;div&gt;about a&lt;/div&gt;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    			}</span></span>
<span class="line"><span style="color:#24292E;">    		}</span></span>
<span class="line"><span style="color:#24292E;">        ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>在源码中，需要把这个路由表格式化为一个一一对应的映射表，如：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">&#39;/&#39;</span><span style="color:#E1E4E8;">:Home, </span><span style="color:#9ECBFF;">&#39;/a&#39;</span><span style="color:#E1E4E8;">:HomeA, </span><span style="color:#9ECBFF;">&#39;/about&#39;</span><span style="color:#E1E4E8;">: About, </span><span style="color:#9ECBFF;">&#39;/about/a&#39;</span><span style="color:#E1E4E8;">: AboutA}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span><span style="color:#032F62;">&#39;/&#39;</span><span style="color:#24292E;">:Home, </span><span style="color:#032F62;">&#39;/a&#39;</span><span style="color:#24292E;">:HomeA, </span><span style="color:#032F62;">&#39;/about&#39;</span><span style="color:#24292E;">: About, </span><span style="color:#032F62;">&#39;/about/a&#39;</span><span style="color:#24292E;">: AboutA}</span></span></code></pre></div><p>还需要把根实例注入的 <code>router</code> 属性共享给每一个组件，让每一个组件都能通过 <code>this.$router</code> 获取到路由对象。</p><p>可能会有人第一时间想到原型，把 <code>$router</code> 方法挂载到原型上。但是需要考虑以下的情况：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    router,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">h</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">h</span><span style="color:#E1E4E8;">(App)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">h</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">h</span><span style="color:#E1E4E8;">(App)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vue</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    router,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">: </span><span style="color:#E36209;">h</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">h</span><span style="color:#24292E;">(App)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vue</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">: </span><span style="color:#E36209;">h</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">h</span><span style="color:#24292E;">(App)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>只有通过 <code>new Vue</code> 中传入了 <code>router</code> 才能被共享，因此原型的方法不可取。</p><p>利用 <code>mixin</code> 方法，在生命周期 <code>beforeCreate</code> 中传递 <code>router</code> ，所有组件初始化都会采用该方法，会先渲染该 <code>mixin</code> 方法，后渲染组件的方法。说明组件渲染是从父到子的。</p><p>然后通过劫持，在实例上取值的时候，会拿到 <code>_router</code> 属性。代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">VueRouter.</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">_Vue</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Vue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> _Vue</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    Vue.</span><span style="color:#B392F0;">mixin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">beforeCreate</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 组件渲染从父 _router 到子</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$options.router) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 如果有router，说明是根实例且传递了router。此时 this 指向根实例</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._routerRoot </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._router </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$options.router</span></span>
<span class="line"><span style="color:#E1E4E8;">            } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 没有说明是子组件，从父组件拿router，所有组件上增加一个 _routerRoot 指向根实例</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._routerRoot </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$parent </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$parent._routerRoot</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 在组件中都可以通过 this 属性获取到 _router 属性</span></span>
<span class="line"><span style="color:#E1E4E8;">            Object.</span><span style="color:#B392F0;">defineProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">Vue</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;$router&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 为了取值方便，做一层代理。后面无需通过 this.$options._router 获取</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._routerRoot </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._routerRoot._router</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            })</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">VueRouter.</span><span style="color:#6F42C1;">install</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">_Vue</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    Vue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> _Vue</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    Vue.</span><span style="color:#6F42C1;">mixin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">beforeCreate</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 组件渲染从父 _router 到子</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$options.router) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 如果有router，说明是根实例且传递了router。此时 this 指向根实例</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._routerRoot </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._router </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$options.router</span></span>
<span class="line"><span style="color:#24292E;">            } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 没有说明是子组件，从父组件拿router，所有组件上增加一个 _routerRoot 指向根实例</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._routerRoot </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$parent </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$parent._routerRoot</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 在组件中都可以通过 this 属性获取到 _router 属性</span></span>
<span class="line"><span style="color:#24292E;">            Object.</span><span style="color:#6F42C1;">defineProperty</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">Vue</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;$router&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 为了取值方便，做一层代理。后面无需通过 this.$options._router 获取</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._routerRoot </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._routerRoot._router</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            })</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>答疑解惑</p><ol><li><p>可不可以不用这么麻烦，直接在 <code>beforeCreate</code> 钩子上写 <code>this.$router = this.$options?.router</code> ？</p><p>不可以，如果这么写意思就变为 “当前 <code>this</code> 指向的如果有 <code>router</code> 才加，没有就不加。后果是只有根实例 <code>new Vue</code> 有 <code>router</code> 。</p></li><li><p>可不可以不代理，直接 <code>this.$router = this.$options?.router</code> ？</p><p>可以，但是这样每次都会给 <code>this.$router</code> 重新赋值。不如代理。</p></li></ol></blockquote><p>此时查看控制台，报错，提示没有 <code>router-link</code> 和 <code>router-view</code> 方法，需要一一设置，底层原理是通过 <code>Vue.component</code> 配置为组件，其中：</p><ol><li><code>router-link</code> 先通过插槽最终把标签的内容渲染到 <code>a</code> 标签上。</li><li><code>router-view</code> 先渲染一个空的 <code>div</code> 。</li></ol><p>代码如下所示：</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">VueRouter.</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">_Vue</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// react 中叫children；vue中所有的插槽会被变道 vm.$slots 对象上</span></span>
<span class="line"><span style="color:#E1E4E8;">    Vue.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;router-link&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;{</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$slots.default}&lt;/</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    Vue.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;router-view&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">VueRouter.</span><span style="color:#6F42C1;">install</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">_Vue</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// react 中叫children；vue中所有的插槽会被变道 vm.$slots 对象上</span></span>
<span class="line"><span style="color:#24292E;">    Vue.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;router-link&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;{</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$slots.default}&lt;/</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    Vue.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;router-view&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="跳转逻辑" tabindex="-1">跳转逻辑 <a class="header-anchor" href="#跳转逻辑" aria-label="Permalink to &quot;跳转逻辑&quot;">​</a></h3><h4 id="路由表扁平化" tabindex="-1">路由表扁平化 <a class="header-anchor" href="#路由表扁平化" aria-label="Permalink to &quot;路由表扁平化&quot;">​</a></h4><p>现在该把路由表扁平化存储了，变成映射表，方便后续的匹配操作，可以匹配也可以添加新的路由。在 VueRouter 类的 <code>constructor</code> 构造器中书写相应的逻辑，步骤如下：</p><ol><li>定一个方法 <code>createMatcher()</code> ，用于调用扁平化路由表的函数，返回路由相关的方法，把获取到的路由表数组传参进去</li><li>方法 <code>createMatcher()</code> 需要返回一个对象，包含 <code>addRoutes</code> 、<code>addRoute</code> 和 <code>match</code> 三个方法，因此需要定义这三个函数方法并 <code>return</code> 返回。它们分别用于： <ul><li><code>addRoutes</code> 添加路由（多个路由）</li><li><code>addRoute</code> 添加路由（单个路由）</li><li><code>match</code> 给一个路径，返回对应的路由</li></ul></li><li>定义一个方法 <code>createRouteMap()</code> ，用于扁平化路由表，并最终返回一个映射表对象。其中： <ol><li>创建一个空对象 <code>pathMap</code> ，后续存放路由与组件映射关系。循环遍历路由表数组</li><li>由于要递归子数组，因此封装一个方法复用更方便，定义一个 <code>addRouteRecord()</code> 方法，把当前路由对象和 <code>pathMap</code> 作为参数传过去</li><li>获取当前路由的 <code>path</code> 对象，如果没有，则说明还没存过，则往其内部存放路径对应属性；有则说明已经存了</li><li>判断其是否有子数组，如果有则遍历其子路由数组，调用 <code>addRouteRecord()</code> 方法</li></ol></li></ol><p>做完上述这些操作还不够，打印出来发现它有两个问题：</p><ol><li>子组件没有关联父组件</li><li>子组件名字相同会被忽略（主要还是第一个问题的原因）</li></ol><p>因此需要修改上述的 BUG，在 <code>addRouteRecord()</code> 方法中修改获取 <code>path</code> 的逻辑，不再是之间获取路径，而是判断是否有父路由组件，如果有则拼接，没有才直接获取。</p><h4 id="路由添加方法" tabindex="-1">路由添加方法 <a class="header-anchor" href="#路由添加方法" aria-label="Permalink to &quot;路由添加方法&quot;">​</a></h4><p>接下来实现添加路由的方法，用户调用 <code>addRoutes</code> 或 <code>addRoute</code> 方法时会传入相对应的路由表数组，因此分别调用 <code>createRouteMap</code> 方法即可。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 扁平化路由信息</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createRouteMap</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">routes</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">pathMap</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 最终返回的映射表对象，如果用户传入则使用用户传的，用户没传说明第一次创建，赋值空对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    pathMap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pathMap </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 遍历数组</span></span>
<span class="line"><span style="color:#E1E4E8;">    routes.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">route</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">addRouteRecord</span><span style="color:#E1E4E8;">(route, pathMap)</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> pathMap</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addRouteRecord</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">route</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">pathMap</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">parentRecord</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 判断是否有父组件路由，如果有判断是否是 / ，如果是则只使用一个 / 进行拼接，避免 //a 的情况</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> parentRecord </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">parentRecord</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">path</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">===</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">&#39;/&#39;</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">?</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">&#39;/&#39;</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">:</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">parentRecord</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">path</span><span style="color:#9ECBFF;">}/\`}\`</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> route.path</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> record </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        path,</span></span>
<span class="line"><span style="color:#E1E4E8;">        component: route.component,</span></span>
<span class="line"><span style="color:#E1E4E8;">        props: route.props,</span></span>
<span class="line"><span style="color:#E1E4E8;">        meta: route.meta</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 看看它有没有被存过</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">pathMap[path]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 维护路径对应信息，如组件、元信息等</span></span>
<span class="line"><span style="color:#E1E4E8;">        pathMap[path] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> record</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果有子路由数组，则遍历递归调用 addRouteRecord 方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    route.children </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> route.children.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">childRoute</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 把当前的父组件路由信息record传过去</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">addRouteRecord</span><span style="color:#E1E4E8;">(childRoute, pathMap, record)</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createMatcher</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">routes</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 映射关系处理</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> { pathMap } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createRouteMap</span><span style="color:#E1E4E8;">(routes)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 路由匹配与路由添加的方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addRoutes</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">routes</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">createRouteMap</span><span style="color:#E1E4E8;">(routes, pathMap)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addRoute</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">route</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">createRouteMap</span><span style="color:#E1E4E8;">([route], pathMap)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        addRoutes, </span><span style="color:#6A737D;">// 添加路由（多个路由）</span></span>
<span class="line"><span style="color:#E1E4E8;">        addRoute, </span><span style="color:#6A737D;">// 添加路由（单个路由）</span></span>
<span class="line"><span style="color:#E1E4E8;">        match </span><span style="color:#6A737D;">// 给一个路径，返回对应的路由</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueRouter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 用户传递的路由表数组，需要进行映射表处理</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> routes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options.routes </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 封装并调用方法做映射表扁平化处理，并实现可以匹配也可以添加新路由</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.matcher </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createMatcher</span><span style="color:#E1E4E8;">(routes)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 扁平化路由信息</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createRouteMap</span><span style="color:#24292E;">(</span><span style="color:#E36209;">routes</span><span style="color:#24292E;">, </span><span style="color:#E36209;">pathMap</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 最终返回的映射表对象，如果用户传入则使用用户传的，用户没传说明第一次创建，赋值空对象</span></span>
<span class="line"><span style="color:#24292E;">    pathMap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pathMap </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 遍历数组</span></span>
<span class="line"><span style="color:#24292E;">    routes.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">route</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">addRouteRecord</span><span style="color:#24292E;">(route, pathMap)</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> pathMap</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addRouteRecord</span><span style="color:#24292E;">(</span><span style="color:#E36209;">route</span><span style="color:#24292E;">, </span><span style="color:#E36209;">pathMap</span><span style="color:#24292E;">, </span><span style="color:#E36209;">parentRecord</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 判断是否有父组件路由，如果有判断是否是 / ，如果是则只使用一个 / 进行拼接，避免 //a 的情况</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> parentRecord </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">parentRecord</span><span style="color:#032F62;">.</span><span style="color:#24292E;">path</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">===</span><span style="color:#032F62;"> </span><span style="color:#032F62;">&#39;/&#39;</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">?</span><span style="color:#032F62;"> </span><span style="color:#032F62;">&#39;/&#39;</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">:</span><span style="color:#032F62;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">parentRecord</span><span style="color:#032F62;">.</span><span style="color:#24292E;">path</span><span style="color:#032F62;">}/\`}\`</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> route.path</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> record </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        path,</span></span>
<span class="line"><span style="color:#24292E;">        component: route.component,</span></span>
<span class="line"><span style="color:#24292E;">        props: route.props,</span></span>
<span class="line"><span style="color:#24292E;">        meta: route.meta</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 看看它有没有被存过</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">pathMap[path]) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 维护路径对应信息，如组件、元信息等</span></span>
<span class="line"><span style="color:#24292E;">        pathMap[path] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> record</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果有子路由数组，则遍历递归调用 addRouteRecord 方法</span></span>
<span class="line"><span style="color:#24292E;">    route.children </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> route.children.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">childRoute</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 把当前的父组件路由信息record传过去</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">addRouteRecord</span><span style="color:#24292E;">(childRoute, pathMap, record)</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createMatcher</span><span style="color:#24292E;">(</span><span style="color:#E36209;">routes</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 映射关系处理</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> { pathMap } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createRouteMap</span><span style="color:#24292E;">(routes)</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 路由匹配与路由添加的方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addRoutes</span><span style="color:#24292E;">(</span><span style="color:#E36209;">routes</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">createRouteMap</span><span style="color:#24292E;">(routes, pathMap)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addRoute</span><span style="color:#24292E;">(</span><span style="color:#E36209;">route</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">createRouteMap</span><span style="color:#24292E;">([route], pathMap)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        addRoutes, </span><span style="color:#6A737D;">// 添加路由（多个路由）</span></span>
<span class="line"><span style="color:#24292E;">        addRoute, </span><span style="color:#6A737D;">// 添加路由（单个路由）</span></span>
<span class="line"><span style="color:#24292E;">        match </span><span style="color:#6A737D;">// 给一个路径，返回对应的路由</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueRouter</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">options</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 用户传递的路由表数组，需要进行映射表处理</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> routes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options.routes </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 封装并调用方法做映射表扁平化处理，并实现可以匹配也可以添加新路由</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.matcher </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createMatcher</span><span style="color:#24292E;">(routes)</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>注意</p><p>此时 <code>createRouteMap</code> 方法有两个用处：</p><ol><li>刚开始时路由表为空，用于扁平化路由表</li><li>调用添加路由方法，往路由表内添加路由</li></ol></blockquote><h4 id="不同路由模式创建对应路由系统" tabindex="-1">不同路由模式创建对应路由系统 <a class="header-anchor" href="#不同路由模式创建对应路由系统" aria-label="Permalink to &quot;不同路由模式创建对应路由系统&quot;">​</a></h4><p>获取到用户用的路由模式，分别调用不同的路由系统，并设置路由初始化和调用路由的 <code>match</code> 方法获取路径对应的组件映射。代码如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueRouter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 用户传递的路由表数组，需要进行映射表处理</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> routes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options.routes </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 封装并调用方法做映射表扁平化处理，并实现可以匹配也可以添加新路由</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.matcher </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createMatcher</span><span style="color:#E1E4E8;">(routes)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 判断用户使用哪种路由模式，默认hash模式</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> mode </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options.mode </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hash&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(mode </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hash&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.history </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HashHistory</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.history </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BrowserHistory</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">app</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> history </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.history</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 监听路由变化，并匹配对应的组件来进行渲染，更新视图</span></span>
<span class="line"><span style="color:#E1E4E8;">        history.</span><span style="color:#B392F0;">transitionTo</span><span style="color:#E1E4E8;">(history.</span><span style="color:#B392F0;">getCurrentLocation</span><span style="color:#E1E4E8;">(), () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 跳转后再监听路由变化</span></span>
<span class="line"><span style="color:#E1E4E8;">            history.</span><span style="color:#B392F0;">setupListener</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 调用路由的match方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">location</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.router.</span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">(location)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueRouter</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">options</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 用户传递的路由表数组，需要进行映射表处理</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> routes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options.routes </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 封装并调用方法做映射表扁平化处理，并实现可以匹配也可以添加新路由</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.matcher </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createMatcher</span><span style="color:#24292E;">(routes)</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 判断用户使用哪种路由模式，默认hash模式</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> mode </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options.mode </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hash&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(mode </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hash&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.history </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HashHistory</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.history </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BrowserHistory</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">(</span><span style="color:#E36209;">app</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> history </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.history</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 监听路由变化，并匹配对应的组件来进行渲染，更新视图</span></span>
<span class="line"><span style="color:#24292E;">        history.</span><span style="color:#6F42C1;">transitionTo</span><span style="color:#24292E;">(history.</span><span style="color:#6F42C1;">getCurrentLocation</span><span style="color:#24292E;">(), () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 跳转后再监听路由变化</span></span>
<span class="line"><span style="color:#24292E;">            history.</span><span style="color:#6F42C1;">setupListener</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 调用路由的match方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">(</span><span style="color:#E36209;">location</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.router.</span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">(location)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>现在都是在做映射关系，没有做初始化。而初始化的方法只需要调用一次，放到最开始 <code>install</code> 中，判断是否为跟路由处调用，这样就能实现初始化。代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">VueRouter.</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">_Vue</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Vue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> _Vue</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    Vue.</span><span style="color:#B392F0;">mixin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">beforeCreate</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$options.router) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._routerRoot </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._router </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$options.router</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._router.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// this指的是整个应用</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">VueRouter.</span><span style="color:#6F42C1;">install</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">_Vue</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    Vue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> _Vue</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    Vue.</span><span style="color:#6F42C1;">mixin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">beforeCreate</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$options.router) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._routerRoot </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._router </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$options.router</span></span>
<span class="line"><span style="color:#24292E;">                </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._router.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// this指的是整个应用</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>下面依次书写两个路由模式类对应的代码：</p><ul><li><p>基础代码</p><p>两个路由模式的部分逻辑是一样的，如来自哪个路由路径、路由跳转、路由对应的组件等，因此把它们都抽离出来，然后让两个路由模式类继承。代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Base</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">router</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.router </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> router</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 路由跳转。参数一为要跳转的路径，参数二为监听的回调</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">transitionTo</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">location</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">listener</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 获取映射表上对应的路由与其组件</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> record </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.router.</span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">(location)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 路由切换时也调用该方法，再次拿到新记录</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        listener </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">listener</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> Base</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Base</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">router</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.router </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> router</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 路由跳转。参数一为要跳转的路径，参数二为监听的回调</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">transitionTo</span><span style="color:#24292E;">(</span><span style="color:#E36209;">location</span><span style="color:#24292E;">, </span><span style="color:#E36209;">listener</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 获取映射表上对应的路由与其组件</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> record </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.router.</span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">(location)</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 路由切换时也调用该方法，再次拿到新记录</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        listener </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">listener</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> Base</span></span></code></pre></div><p>把路由放到 <code>this</code> 上，这样历史模式和哈希模式都可以拿到。</p></li><li><p>哈希模式</p><p>首先需要判断它有没有哈希路径，如果有则不用做处理，没有则需要加上哈希路径。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Base </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./base&#39;</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HashHistory</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Base</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">router</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(router)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 初始化hash路由时候，要给定一个默认哈希路径</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">ensureSlash</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 稍后调用此方法，监控hash路径的变化</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setupListener</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hashchange&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// hash值发生变化则获取新的hash值</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">getHash</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取要跳转的路径</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">getCurrentLocation</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getHash</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ensureSlash</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(window.location.hash) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    window.location.hash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getHash</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> window.location.hash.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Base </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./base&#39;</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HashHistory</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Base</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">router</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(router)</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 初始化hash路由时候，要给定一个默认哈希路径</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">ensureSlash</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 稍后调用此方法，监控hash路径的变化</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setupListener</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        window.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hashchange&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// hash值发生变化则获取新的hash值</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">getHash</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取要跳转的路径</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">getCurrentLocation</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getHash</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ensureSlash</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(window.location.hash) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    window.location.hash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getHash</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> window.location.hash.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li><li><p>历史模式</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Base </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./base&#39;</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BrowerHistory</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Base</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">router</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(router)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 稍后调用此方法，监控history路径的变化</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setupListener</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;popstate&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// history值发生变化则获取新的history值</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">getHash</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取要跳转的路径</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">getCurrentLocation</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> window.location.pathname</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Base </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./base&#39;</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BrowerHistory</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Base</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">router</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(router)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 稍后调用此方法，监控history路径的变化</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setupListener</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        window.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;popstate&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// history值发生变化则获取新的history值</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">getHash</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取要跳转的路径</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">getCurrentLocation</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> window.location.pathname</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li></ul><h4 id="跳转逻辑-1" tabindex="-1">跳转逻辑 <a class="header-anchor" href="#跳转逻辑-1" aria-label="Permalink to &quot;跳转逻辑&quot;">​</a></h4><p>回到 <code>router-link</code> 的组件注册模块，实现路由跳转逻辑。</p><p>在原来的代码基础上为它添加一个 <code>to</code> 方法，用于跳转；添加一个 <code>tag</code> ，用于设置其标签，默认是 <code>a</code> 。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Vue.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;router-link&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    props: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// to必传</span></span>
<span class="line"><span style="color:#E1E4E8;">        to: {type: String, required: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">        tag: {type: String,default: </span><span style="color:#9ECBFF;">&#39;a&#39;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">handler</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 去哪里调用push方法把路径传过去即可</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$router.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.to)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> tag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.tag</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">tag</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.handler}&gt;{</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$slots.default}&lt;/</span><span style="color:#85E89D;">tag</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Vue.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;router-link&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    props: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// to必传</span></span>
<span class="line"><span style="color:#24292E;">        to: {type: String, required: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">        tag: {type: String,default: </span><span style="color:#032F62;">&#39;a&#39;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    methods: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">handler</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 去哪里调用push方法把路径传过去即可</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$router.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.to)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> tag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.tag</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">tag</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.handler}&gt;{</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$slots.default}&lt;/</span><span style="color:#22863A;">tag</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>VueRouter 类中注册一个 <code>push</code> 方法，用于跳转路由。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueRouter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">location</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.history.</span><span style="color:#B392F0;">transitionTo</span><span style="color:#E1E4E8;">(location)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueRouter</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#E36209;">location</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.history.</span><span style="color:#6F42C1;">transitionTo</span><span style="color:#24292E;">(location)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>此时跳转逻辑已经初步写完了，后续所有逻辑都需要写在方法 <code>transitionTo</code> 内。然后跳转后页面的渲染逻辑放到 <code>router-view</code> 内。</p><p>注意一点，路由 <code>/about/a</code> 实际上是路由 <code>/about</code> 加上 <code>/a</code> ，一级路由渲染 <code>/about</code> 的内容，二级路由渲染 <code>/a</code> 的内容。</p><h3 id="响应式原理" tabindex="-1">响应式原理 <a class="header-anchor" href="#响应式原理" aria-label="Permalink to &quot;响应式原理&quot;">​</a></h3><h4 id="路径响应式变化" tabindex="-1">路径响应式变化 <a class="header-anchor" href="#路径响应式变化" aria-label="Permalink to &quot;路径响应式变化&quot;">​</a></h4><p>做到这里点击路由可以在 <code>transitionTo()</code> 方法内监听到路由的变化，并且能够获取到当前跳转到哪个路由。但是浏览器的路径并没有响应式变化。因此需要在 VueRouter 类的 <code>push</code> 方法做处理。代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueRouter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">location</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.history.</span><span style="color:#B392F0;">transitionTo</span><span style="color:#E1E4E8;">(location, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            window.location.hash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> location</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueRouter</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#E36209;">location</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.history.</span><span style="color:#6F42C1;">transitionTo</span><span style="color:#24292E;">(location, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            window.location.hash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> location</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>注意</p><p>这里不能直接写死，因为还要考虑历史模式的路由，因此后续还需要修改。先暂时这么写实现功能。</p></blockquote><p>添加该监听事件后点击路由可以响应式修改路径，但这里还有一个 BUG：它无法监听到路径的前进和后退，如下图所示：</p><p><img src="https://pic.imgdb.cn/item/6559b97dc458853aef4b9c45.gif" alt="无法监听"></p><p>因此还需要去到 <code>hash</code> 路由对应的类，在其 <code>setupListener()</code> 方法上也添加一个 Hash 值变化的事件，触发事件后跳转路由。代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Base </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./base&#39;</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HashHistory</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Base</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 稍后调用此方法，监控hash路径的变化</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setupListener</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hashchange&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// hash值发生变化则获取新的hash值</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">transitionTo</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">getHash</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Base </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./base&#39;</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HashHistory</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Base</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 稍后调用此方法，监控hash路径的变化</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setupListener</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        window.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hashchange&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// hash值发生变化则获取新的hash值</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">transitionTo</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">getHash</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//...</span></span></code></pre></div><p>不过现在会有一个小 BUG：由于两个地方都添加了 Hash 值变化监听事件，导致触发改变后 <code>transitionTo()</code> 方法会调用两次。处理方法也很简单，做个判断即可。</p><h4 id="组件查找" tabindex="-1">组件查找 <a class="header-anchor" href="#组件查找" aria-label="Permalink to &quot;组件查找&quot;">​</a></h4><p>如果访问的是 <code>/about/a</code> ，实际上是访问两个组件，先访问 <code>/about</code> ，把组件渲染到一级 <code>router-view</code> ；然后再访问 <code>/a</code> ，把组件放到二级 <code>router-view</code> 。</p><p>在父类 <code>Base</code> 中创建一个对象 <code>current</code> ，用于保存当前的路由 <code>path</code> 和对象的组件数组 <code>match</code> 。通过给方法 <code>createRoute()</code> 传参，接收其返回值。代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createRoute</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">record</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">location</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> matched </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(record) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 不停去父级找</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;">(record) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 父级要放在最前面</span></span>
<span class="line"><span style="color:#E1E4E8;">            matched.</span><span style="color:#B392F0;">unshift</span><span style="color:#E1E4E8;">(record)</span></span>
<span class="line"><span style="color:#E1E4E8;">            record </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> record.parent</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">location,</span></span>
<span class="line"><span style="color:#E1E4E8;">        matched</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Base</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">constructure</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">router</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.router </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> router</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.current </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createRoute</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">            path: </span><span style="color:#9ECBFF;">&#39;/&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">transitionTo</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">location</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">listener</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> record </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.router.</span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">(location)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> route </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createRoute</span><span style="color:#E1E4E8;">(record, {</span></span>
<span class="line"><span style="color:#E1E4E8;">            path: location</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果路由路径相同，且新旧的组件数组matched长度也相等，表示同一个路径跳转，返回</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(location </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.current.path </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> route.match.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.current.matched.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 每次更新的都是current，稍后current变化了，就切换页面显示</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.current </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> route</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createRoute</span><span style="color:#24292E;">(</span><span style="color:#E36209;">record</span><span style="color:#24292E;">, </span><span style="color:#E36209;">location</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> matched </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(record) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 不停去父级找</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;">(record) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 父级要放在最前面</span></span>
<span class="line"><span style="color:#24292E;">            matched.</span><span style="color:#6F42C1;">unshift</span><span style="color:#24292E;">(record)</span></span>
<span class="line"><span style="color:#24292E;">            record </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> record.parent</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">location,</span></span>
<span class="line"><span style="color:#24292E;">        matched</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Base</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">constructure</span><span style="color:#24292E;">(</span><span style="color:#E36209;">router</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.router </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> router</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.current </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createRoute</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">            path: </span><span style="color:#032F62;">&#39;/&#39;</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">transitionTo</span><span style="color:#24292E;">(</span><span style="color:#E36209;">location</span><span style="color:#24292E;">, </span><span style="color:#E36209;">listener</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> record </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.router.</span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">(location)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> route </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createRoute</span><span style="color:#24292E;">(record, {</span></span>
<span class="line"><span style="color:#24292E;">            path: location</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果路由路径相同，且新旧的组件数组matched长度也相等，表示同一个路径跳转，返回</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(location </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.current.path </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> route.match.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.current.matched.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 每次更新的都是current，稍后current变化了，就切换页面显示</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.current </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> route</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>默认 <code>path</code> 传基准路径 <code>/</code> ，路由切换触发 <code>transitionTo</code> 方法后再调用 <code>createRoute</code> 方法把当前的路由传过去获取对应组件数组。</p><p>做一个优化，避免跳转同一个路径重复匹配。判断条件为新旧的路径 <code>path</code> 相等，且新旧组件匹配的数组 <code>matched</code> 长度相等，都相等说明新旧是同一个路由。此时不做操作。</p><h4 id="组件路由实例响应式" tabindex="-1">组件路由实例响应式 <a class="header-anchor" href="#组件路由实例响应式" aria-label="Permalink to &quot;组件路由实例响应式&quot;">​</a></h4><p>给根实例添加一个属性 <code>_route</code> ，即当前的 <code>current</code> 。在组件中可以获取到当前组件的路由属性。在 <code>install</code> 方法的 <code>beforeCreate()</code> 钩子上挂载，代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Vue.</span><span style="color:#B392F0;">mixin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">beforeCreate</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$options.router) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">                Vue.util.</span><span style="color:#B392F0;">defineReactive</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;_route&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._router._route)</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    Object.</span><span style="color:#B392F0;">defineProperty</span><span style="color:#E1E4E8;">(Vue,prototype, </span><span style="color:#9ECBFF;">&#39;$route&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._routerRoot </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__routerRoot.history.current</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    Vue.</span><span style="color:#6F42C1;">mixin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">beforeCreate</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$options.router) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">                Vue.util.</span><span style="color:#6F42C1;">defineReactive</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;_route&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._router._route)</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    Object.</span><span style="color:#6F42C1;">defineProperty</span><span style="color:#24292E;">(Vue,prototype, </span><span style="color:#032F62;">&#39;$route&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._routerRoot </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__routerRoot.history.current</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>但是在页面中打印 <code>$route</code> 时，切换路由页面的内容也没有变化。明明前面已经变为响应式了。这是为什么呢？</p><p>在代码里，<code>route</code> 代理了 <code>current</code> ，此时他们指向同一个对象地址；路由切换后改变的是 <code>current</code> 对象，此时 <code>current</code> 指向新的对象地址，而 <code>route</code> 没变。因此需要改变 <code>route</code> 。</p><p>在两个路由模式的父类 <code>Base</code> 定义一个 <code>listen</code> 方法：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Base</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">cb</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.cb </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cb</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">transitionTo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.cb </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">cb</span><span style="color:#E1E4E8;">(route)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Base</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(</span><span style="color:#E36209;">cb</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.cb </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cb</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">transitionTo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.cb </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">cb</span><span style="color:#24292E;">(route)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在 VueRouter 类中的 <code>init</code> 方法调用，每次路由切换后把新的 <code>current</code> 数据传过去，实现更新，代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueRouter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">app</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> history </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.history</span></span>
<span class="line"><span style="color:#E1E4E8;">        history.</span><span style="color:#B392F0;">transitionTo</span><span style="color:#E1E4E8;">(history.</span><span style="color:#B392F0;">getCurrentLocation</span><span style="color:#E1E4E8;">(), () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            history.</span><span style="color:#B392F0;">setupListener</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 监听路由的变化</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 每次路由切换都需要调用listen方法中的回调函数，更新_route的值，使它能自动渲染视图</span></span>
<span class="line"><span style="color:#E1E4E8;">        history.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">newRoute</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            app._route </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newRoute</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueRouter</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">(</span><span style="color:#E36209;">app</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> history </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.history</span></span>
<span class="line"><span style="color:#24292E;">        history.</span><span style="color:#6F42C1;">transitionTo</span><span style="color:#24292E;">(history.</span><span style="color:#6F42C1;">getCurrentLocation</span><span style="color:#24292E;">(), () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            history.</span><span style="color:#6F42C1;">setupListener</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 监听路由的变化</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 每次路由切换都需要调用listen方法中的回调函数，更新_route的值，使它能自动渲染视图</span></span>
<span class="line"><span style="color:#24292E;">        history.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(</span><span style="color:#E36209;">newRoute</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            app._route </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newRoute</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="router-view组件" tabindex="-1">router-view组件 <a class="header-anchor" href="#router-view组件" aria-label="Permalink to &quot;router-view组件&quot;">​</a></h4><p>新建一个 <code>js</code> 文件，导出一个对象，用于配置 <code>router-view</code> 组件的配置项。</p><p>组件渲染流程为：</p><ul><li>默认先渲染根组件 <code>App.vue</code> 中的一级路由 <code>router-view</code></li><li>再渲染对应组件中的二级路由 <code>router-view</code></li></ul><p>接收两个参数，获取到 <code>$route</code> ，定义一个变量用于控制层级（即 <code>matched</code> 数组的索引，默认为0）。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    functional: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">h</span><span style="color:#E1E4E8;">, {</span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> route </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> parent.$route</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> depth </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;">(parent) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// _vnode对应的是组件的渲染函数中虚拟节点，$vnode代表的是home组件本身。$vnode是_vnode本身</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(parent.$vnode </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> parent.$vnode.data.routerView) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                depth</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span></span>
<span class="line"><span style="color:#E1E4E8;">                parent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> parent.$parent</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> record </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> route.matched[depth]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">record) {</span></span>
<span class="line"><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">h</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">h</span><span style="color:#E1E4E8;">(record.component, data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    functional: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(</span><span style="color:#E36209;">h</span><span style="color:#24292E;">, {</span><span style="color:#E36209;">parent</span><span style="color:#24292E;">, </span><span style="color:#E36209;">data</span><span style="color:#24292E;">}) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> route </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> parent.$route</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> depth </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;">(parent) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// _vnode对应的是组件的渲染函数中虚拟节点，$vnode代表的是home组件本身。$vnode是_vnode本身</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(parent.$vnode </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> parent.$vnode.data.routerView) {</span></span>
<span class="line"><span style="color:#24292E;">                depth</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">                </span></span>
<span class="line"><span style="color:#24292E;">                parent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> parent.$parent</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> record </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> route.matched[depth]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">record) {</span></span>
<span class="line"><span style="color:#24292E;">           </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">h</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">h</span><span style="color:#24292E;">(record.component, data)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="路由钩子" tabindex="-1">路由钩子 <a class="header-anchor" href="#路由钩子" aria-label="Permalink to &quot;路由钩子&quot;">​</a></h3><p>路由守卫使用如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">router.</span><span style="color:#B392F0;">beforeEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">from</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">to</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">next</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">router.</span><span style="color:#6F42C1;">beforeEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">from</span><span style="color:#24292E;">, </span><span style="color:#E36209;">to</span><span style="color:#24292E;">, </span><span style="color:#E36209;">next</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>在类 VueRouter 中定义一个方法 <code>beforeEach()</code> ，调用该方法则往一个数组内追加，后续依次执行。代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueRouter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">constructure</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.beforeEachHooks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">beforeEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">cb</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.beforeEachHooks.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(cb)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueRouter</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">constructure</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.beforeEachHooks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">beforeEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">cb</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.beforeEachHooks.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(cb)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>去到 <code>Base</code> 类中，定义一个变量 <code>queue</code> ，代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">runQueue</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">queue</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">cb</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(queue.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> index) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cb</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> hook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> queue[index]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">hook</span><span style="color:#E1E4E8;">(from, to, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">(index</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Base</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">transitionTo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> queue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [].</span><span style="color:#B392F0;">cancat</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.router.beforeEachHooks)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">runQueue</span><span style="color:#E1E4E8;">(queue, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            listener </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">listener</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.cb </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">cb</span><span style="color:#E1E4E8;">(route)</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">runQueue</span><span style="color:#24292E;">(</span><span style="color:#E36209;">queue</span><span style="color:#24292E;">, </span><span style="color:#E36209;">cb</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">(</span><span style="color:#E36209;">index</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(queue.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> index) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cb</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> hook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> queue[index]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">hook</span><span style="color:#24292E;">(from, to, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">(index</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Base</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">transitionTo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> queue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [].</span><span style="color:#6F42C1;">cancat</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.router.beforeEachHooks)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">runQueue</span><span style="color:#24292E;">(queue, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            listener </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">listener</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.cb </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">cb</span><span style="color:#24292E;">(route)</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><ol><li><p>路由的 <code>install</code> 方法就做了一件事情，把 <code>beforeCreate</code> 通过 <code>mixin</code> 混入，在根实例上保存根组件，其子路由不断找其父亲，获取根组件。</p><p>这样子组件可以通过点 <code>_routerRoot</code> 获取到根组件。然后通过 <code>Object.defineProperty</code> 代理，放到原型上。后续可直接 <code>this.$router</code> 获取。</p><p>也就是把 <code>router</code> 共享出去。</p></li><li><p>组件 <code>router-link</code> 负责跳转路由。创建该组件的原因是路由切换有两种模式，通过封装，无需考虑如何跳转，</p><p>只需要传两个参数：跳转到哪个路由，和该 HTML 的标签（默认 <code>a</code> 链接）即可。</p></li><li><p>组件 <code>router-view</code> 用于渲染路由组件。原理是在切换路由时把当前路由从父组件到子组件一一匹配放到数组 <code>matched</code> 中，于其路径 <code>path</code> 一一对应。在 <code>router-view</code> 中通过循环与下标索引一一获取，调用 <code>h()</code> 方法渲染。</p></li></ol>`,103),e=[o];function c(t,r,E,y,i,d){return n(),a("div",null,e)}const h=s(l,[["render",c]]);export{F as __pageData,h as default};
