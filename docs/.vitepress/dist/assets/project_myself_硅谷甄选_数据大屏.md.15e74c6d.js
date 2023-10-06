import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const d=JSON.parse('{"title":"数据大屏","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"甄","7":"选","8":"数","9":"据","10":"大","11":"屏"},"headers":[],"relativePath":"project/myself/硅谷甄选/数据大屏.md","filePath":"project/myself/硅谷甄选/数据大屏.md","lastUpdated":null}'),p={name:"project/myself/硅谷甄选/数据大屏.md"},o=l(`<h1 id="数据大屏" tabindex="-1">数据大屏 <a class="header-anchor" href="#数据大屏" aria-label="Permalink to &quot;数据大屏&quot;">​</a></h1><h2 id="适配方案" tabindex="-1">适配方案 <a class="header-anchor" href="#适配方案" aria-label="Permalink to &quot;适配方案&quot;">​</a></h2><p>数据大屏需要适配用户的屏幕大小，否则会出现用户屏幕大小不同时出现样式错乱问题。适配解决方案一般分为 vw、vh 与 scalc 缩放功能。</p><h3 id="vw与vh" tabindex="-1">vw与vh <a class="header-anchor" href="#vw与vh" aria-label="Permalink to &quot;vw与vh&quot;">​</a></h3><p>IE8后推出一个新单位：vw 与 vh。当为盒子设置 100vw 和 100vh 时，会直接占满整个屏幕。因此可以通过计算把 px 换算为vw 与 vh，实现响应式自适应。</p><h4 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h4><p>现有一个盒子，需要其占满整个屏幕，里面有一个盒子，需要其宽高为 100px。</p><p>占满整个屏幕只需要让其 100vw 和 100vh即可。里面的小盒子需要计算，计算公式为屏幕宽度除以100得出 1vw对应多少像素，如我的屏幕为1920px，则 1920 / 100 = 19.2 。即 1vw 对应 19.2px，则 100px 则是 100 / 19.2 = 5vw 左右。高度计算同理。</p><h4 id="优缺点" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点" aria-label="Permalink to &quot;优缺点&quot;">​</a></h4><ul><li><p>优点</p><p>简单快捷，使用方便</p></li><li><p>缺点</p><p>需要大量计算，无法控制字体本身的大小，如果盒子过窄会使得字体覆盖旁边的盒子</p></li></ul><h3 id="scalc" tabindex="-1">scalc <a class="header-anchor" href="#scalc" aria-label="Permalink to &quot;scalc&quot;">​</a></h3><p>通过 CSS 中 <code>transform</code> 中的 <code>scalc()</code> 缩放属性实现功能。</p><p>首先为最外层的盒子设置宽高、固定定位属性，定位到页面的正中央。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">position</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">fixed</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">top</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">left</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">transform</span><span style="color:#E1E4E8;">: (</span><span style="color:#79B8FF;">-50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">-50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1920</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1080</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">transform-origin</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">left</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">top</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">position</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">fixed</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">top</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">left</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">transform</span><span style="color:#24292E;">: (</span><span style="color:#005CC5;">-50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">-50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1920</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1080</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">transform-origin</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">left</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">top</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>注意</p><p><code>scalc()</code> 属性默认以盒子正中心为单位做缩放处理，这样会导致放大时把内容顶出左侧，需要修改缩放定位点。<code>transform-origin</code> 可以修改定位点。</p></blockquote><p>然后通过 JavaScript 获取最外层盒子元素，设置一个函数获取该元素的宽高，计算出需要缩放的倍数，并比较宽高倍数，返回更小的那个。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> box </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.box&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">box.style.transform </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`scalc(\${</span><span style="color:#B392F0;">getScalc</span><span style="color:#9ECBFF;">()</span><span style="color:#9ECBFF;">})\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getScalc</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">w</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1920</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">h</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1080</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> ww </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> window.innerWidth </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> w</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> wh </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> window.innerHeight </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> h</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ww </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> wh </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> ww </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> wh</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> box </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.box&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">box.style.transform </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`scalc(\${</span><span style="color:#6F42C1;">getScalc</span><span style="color:#032F62;">()</span><span style="color:#032F62;">})\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getScalc</span><span style="color:#24292E;">(</span><span style="color:#E36209;">w</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1920</span><span style="color:#24292E;">, </span><span style="color:#E36209;">h</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1080</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> ww </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> window.innerWidth </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> w</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> wh </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> window.innerHeight </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> h</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ww </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> wh </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> ww </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> wh</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>注意</p><p>函数接收需要缩放的主屏幕宽高，默认值为 1920 与 1080，真实场景下需要动态获取并传参。</p></blockquote><p>最后为 window 绑定一个页面缩放事件，页面缩放后动态缩放。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// ....</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">window.</span><span style="color:#B392F0;">onresize</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    box.style.transform </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`scalc(\${</span><span style="color:#B392F0;">getScalc</span><span style="color:#9ECBFF;">()</span><span style="color:#9ECBFF;">})\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// ....</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">window.</span><span style="color:#6F42C1;">onresize</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    box.style.transform </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`scalc(\${</span><span style="color:#6F42C1;">getScalc</span><span style="color:#032F62;">()</span><span style="color:#032F62;">})\`</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="echarts" tabindex="-1">ECharts <a class="header-anchor" href="#echarts" aria-label="Permalink to &quot;ECharts&quot;">​</a></h2><h3 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h3><p>echarts官网指路：<a href="https://echarts.apache.org/examples/zh/index.html" target="_blank" rel="noreferrer">echarts</a> 。</p><p>根据文档的指示，想要使用 <code>echarts</code> ，需要做到以下步骤：</p><ol><li><p>下载 <code>echarts</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm i echarts</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm i echarts</span></span></code></pre></div></li><li><p>引入第三方包</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> echarts </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;echarts&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> echarts </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;echarts&#39;</span></span></code></pre></div></li><li><p>设置一个渲染的节点</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;map&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;chartsRef&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;map&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;chartsRef&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li><li><p>在组件挂载完毕的生命周期挂载 <code>echarts</code> 图表（以饼图为例）</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">echartsRef</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> myCharts </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> echarts.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">(echartsRef.value)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> option </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  tooltip: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    trigger: </span><span style="color:#9ECBFF;">&#39;item&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  legend: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    top: </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    right: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    orient: </span><span style="color:#9ECBFF;">&#39;vertical&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 图例默认方向（垂直）</span></span>
<span class="line"><span style="color:#E1E4E8;">    textStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      color: </span><span style="color:#9ECBFF;">&#39;#fff&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      fontSize: </span><span style="color:#79B8FF;">14</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  series: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&#39;Access From&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;pie&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      radius: [</span><span style="color:#9ECBFF;">&#39;40%&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;70%&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      avoidLabelOverlap: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      itemStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        borderRadius: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        borderColor: </span><span style="color:#9ECBFF;">&#39;#fff&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        borderWidth: </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      label: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        show: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        position: </span><span style="color:#9ECBFF;">&#39;inside&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        color: </span><span style="color:#9ECBFF;">&#39;#fff&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      emphasis: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        label: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          show: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontSize: </span><span style="color:#79B8FF;">40</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontWeight: </span><span style="color:#9ECBFF;">&#39;bold&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      labelLine: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        show: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      data: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { value: </span><span style="color:#79B8FF;">1048</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;50以上&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { value: </span><span style="color:#79B8FF;">735</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;40-50&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { value: </span><span style="color:#79B8FF;">580</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;30-40&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { value: </span><span style="color:#79B8FF;">484</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;20-30&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { value: </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;20以下&#39;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置实例</span></span>
<span class="line"><span style="color:#E1E4E8;">  myCharts.</span><span style="color:#B392F0;">setOption</span><span style="color:#E1E4E8;">(option)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">echartsRef</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">onMounted</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> myCharts </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> echarts.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">(echartsRef.value)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> option </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  tooltip: {</span></span>
<span class="line"><span style="color:#24292E;">    trigger: </span><span style="color:#032F62;">&#39;item&#39;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  legend: {</span></span>
<span class="line"><span style="color:#24292E;">    top: </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    right: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    orient: </span><span style="color:#032F62;">&#39;vertical&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 图例默认方向（垂直）</span></span>
<span class="line"><span style="color:#24292E;">    textStyle: {</span></span>
<span class="line"><span style="color:#24292E;">      color: </span><span style="color:#032F62;">&#39;#fff&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      fontSize: </span><span style="color:#005CC5;">14</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  series: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&#39;Access From&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;pie&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      radius: [</span><span style="color:#032F62;">&#39;40%&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;70%&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      avoidLabelOverlap: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      itemStyle: {</span></span>
<span class="line"><span style="color:#24292E;">        borderRadius: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        borderColor: </span><span style="color:#032F62;">&#39;#fff&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        borderWidth: </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      label: {</span></span>
<span class="line"><span style="color:#24292E;">        show: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        position: </span><span style="color:#032F62;">&#39;inside&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        color: </span><span style="color:#032F62;">&#39;#fff&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      emphasis: {</span></span>
<span class="line"><span style="color:#24292E;">        label: {</span></span>
<span class="line"><span style="color:#24292E;">          show: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          fontSize: </span><span style="color:#005CC5;">40</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          fontWeight: </span><span style="color:#032F62;">&#39;bold&#39;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      labelLine: {</span></span>
<span class="line"><span style="color:#24292E;">        show: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      data: [</span></span>
<span class="line"><span style="color:#24292E;">        { value: </span><span style="color:#005CC5;">1048</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;50以上&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { value: </span><span style="color:#005CC5;">735</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;40-50&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { value: </span><span style="color:#005CC5;">580</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;30-40&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { value: </span><span style="color:#005CC5;">484</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;20-30&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { value: </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;20以下&#39;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置实例</span></span>
<span class="line"><span style="color:#24292E;">  myCharts.</span><span style="color:#6F42C1;">setOption</span><span style="color:#24292E;">(option)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div></li></ol><h3 id="水球图" tabindex="-1">水球图 <a class="header-anchor" href="#水球图" aria-label="Permalink to &quot;水球图&quot;">​</a></h3><p>水球图的设计可以访问 <code>ECharts Demo</code> 集的官网 <a href="https://www.isqqw.com/" target="_blank" rel="noreferrer">ECharts Demo</a> ，里面是民间对 <code>echarts</code> 图表的修改，以至于实现更多的需求。其中也包括水球图与地图。</p><p>水球图需要下载 <code>liquidFill</code> 插件用于设置类型：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm i echarts-liquidfill</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm i echarts-liquidfill</span></span></code></pre></div><p>设置水球图参数：</p><p>和其他 ECharts 图表一样，水球图提供将系列的 <code>type</code> 指定为 <code>liquidFill</code>（注意大小写）来表明这是一个水球图类型。</p><p>一个简单的配置项可以是：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> myCharts </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> echarts.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">(echartsRef.value)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置实例</span></span>
<span class="line"><span style="color:#E1E4E8;">  myCharts.</span><span style="color:#B392F0;">setOption</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 标题</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// title: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//   text: &#39;水球图&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// x | y轴</span></span>
<span class="line"><span style="color:#E1E4E8;">    xAxis: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">    yAxis: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 系列：决定展示什么图形</span></span>
<span class="line"><span style="color:#E1E4E8;">    series: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;liquidFill&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 系列</span></span>
<span class="line"><span style="color:#E1E4E8;">      data: [</span><span style="color:#79B8FF;">0.6</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.2</span><span style="color:#E1E4E8;">], </span><span style="color:#6A737D;">// 展示数据</span></span>
<span class="line"><span style="color:#E1E4E8;">      waveAnimation: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 是否展示动画</span></span>
<span class="line"><span style="color:#E1E4E8;">      animationDuration: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      animationDurationUpdate: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      radius: </span><span style="color:#9ECBFF;">&#39;100%&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 半径</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 外边框</span></span>
<span class="line"><span style="color:#E1E4E8;">      outline: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        show: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        borderDistance: </span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        itemStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          color: </span><span style="color:#9ECBFF;">&#39;none&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          borderWidth: </span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          shadowBlur: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          shadowColor: </span><span style="color:#9ECBFF;">&#39;rgba(0,0,0,.25)&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 布局组合：</span></span>
<span class="line"><span style="color:#E1E4E8;">    grid: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      left: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      right: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      top: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bottom: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">onMounted</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> myCharts </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> echarts.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">(echartsRef.value)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置实例</span></span>
<span class="line"><span style="color:#24292E;">  myCharts.</span><span style="color:#6F42C1;">setOption</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 标题</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// title: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//   text: &#39;水球图&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// x | y轴</span></span>
<span class="line"><span style="color:#24292E;">    xAxis: {},</span></span>
<span class="line"><span style="color:#24292E;">    yAxis: {},</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 系列：决定展示什么图形</span></span>
<span class="line"><span style="color:#24292E;">    series: {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;liquidFill&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 系列</span></span>
<span class="line"><span style="color:#24292E;">      data: [</span><span style="color:#005CC5;">0.6</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.2</span><span style="color:#24292E;">], </span><span style="color:#6A737D;">// 展示数据</span></span>
<span class="line"><span style="color:#24292E;">      waveAnimation: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 是否展示动画</span></span>
<span class="line"><span style="color:#24292E;">      animationDuration: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      animationDurationUpdate: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      radius: </span><span style="color:#032F62;">&#39;100%&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 半径</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 外边框</span></span>
<span class="line"><span style="color:#24292E;">      outline: {</span></span>
<span class="line"><span style="color:#24292E;">        show: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        borderDistance: </span><span style="color:#005CC5;">8</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        itemStyle: {</span></span>
<span class="line"><span style="color:#24292E;">          color: </span><span style="color:#032F62;">&#39;none&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          borderWidth: </span><span style="color:#005CC5;">8</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          shadowBlur: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          shadowColor: </span><span style="color:#032F62;">&#39;rgba(0,0,0,.25)&#39;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 布局组合：</span></span>
<span class="line"><span style="color:#24292E;">    grid: {</span></span>
<span class="line"><span style="color:#24292E;">      left: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      right: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      top: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bottom: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>更多具体配置可以查看 <a href="https://github.com/ecomfe/echarts-liquidfill" target="_blank" rel="noreferrer">GitHub 上详细的文档</a> 。</p><h3 id="地图" tabindex="-1">地图 <a class="header-anchor" href="#地图" aria-label="Permalink to &quot;地图&quot;">​</a></h3><p>地图则是通过网上下载地图 JSON 数据，通过 <code>echarts</code> 提供的方法实现。</p><p>下载地图数据网站指路：<a href="http://datav.aliyun.com/portal/school/atlas/area_selector" target="_blank" rel="noreferrer">地图</a> 。</p><p><a href="https://imgse.com/i/pCIbQl6" target="_blank" rel="noreferrer"><img src="https://s1.ax1x.com/2023/07/17/pCIbQl6.png" alt="pCIbQl6.png"></a></p><p>点击链接复制打开新的标签页，复制 JSON 代码粘贴到本地项目内，在需要使用的 <code>.vue</code> 文件中引入使用即可。</p><p>地图数据引入后，<code>echarts</code> 使用生成地图，步骤如下：</p><ol><li><p>通过 <code>echarts</code> 的 <code>registerMap()</code> 方法注册地图，官方文档：<a href="https://www.isqqw.com/echarts-doc/zh/api.html#echarts.registerMap" target="_blank" rel="noreferrer">registerMap</a> 。其中</p><ul><li>参数一：注册地图的名称</li><li>参数二：注册地图的数据</li></ul></li><li><p>设置实例</p><p>在 <code>setOption()</code> 方法中通过 <code>geo</code> 创建地图，其中属性 <code>map</code> 为刚刚注册地图的地图名称。</p></li><li><p>设置参数</p><p>其他参数的设置可前往官网查看，例如：</p><ul><li><p><a href="https://www.isqqw.com/echarts-doc/zh/option.html#geo" target="_blank" rel="noreferrer">geo</a>：地理坐标系组件。</p><p>地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制<a href="https://www.isqqw.com/echarts-doc/zh/option.html#series-scatter" target="_blank" rel="noreferrer">散点图</a>，<a href="https://www.isqqw.com/echarts-doc/zh/option.html#series-lines" target="_blank" rel="noreferrer">线集</a>。</p><ul><li><a href="https://www.isqqw.com/echarts-doc/zh/option.html#geo.roam" target="_blank" rel="noreferrer">roam</a> ：是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 &#39;scale&#39; 或者 &#39;move&#39;。设置成 true 为都开启</li><li><a href="https://www.isqqw.com/echarts-doc/zh/option.html#geo.emphasis" target="_blank" rel="noreferrer">emphasis</a> ：地图高亮设置</li></ul></li><li><p><a href="https://www.isqqw.com/echarts-doc/zh/option.html#series-lines" target="_blank" rel="noreferrer">series-lines</a>：路径图。</p><p>用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。</p><ul><li>data：线数据集。</li><li>emphasis：高亮的线条和标签样式。</li><li>effect：航线特效</li></ul></li></ul></li></ol><p>更多详细 API 请前往官网阅读。</p><p>代码示例：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ref, onMounted } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> echarts </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;echarts&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> chinaJSON </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./china.json&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 注册地图</span></span>
<span class="line"><span style="color:#E1E4E8;">echarts.</span><span style="color:#B392F0;">registerMap</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;china&#39;</span><span style="color:#E1E4E8;">, chinaJSON </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">map</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> myCharts </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> echarts.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">(map.value)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置实例</span></span>
<span class="line"><span style="color:#E1E4E8;">  myCharts.</span><span style="color:#B392F0;">setOption</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    geo: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      map: </span><span style="color:#9ECBFF;">&#39;china&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 中国地图</span></span>
<span class="line"><span style="color:#E1E4E8;">      roam: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 开启鼠标缩放</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 地图位置</span></span>
<span class="line"><span style="color:#E1E4E8;">      left: </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      top: </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bottom: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      right: </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 地图上的文字设置</span></span>
<span class="line"><span style="color:#E1E4E8;">      label: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        show: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 文字渲染</span></span>
<span class="line"><span style="color:#E1E4E8;">        color: </span><span style="color:#9ECBFF;">&#39;#fff&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        fontSize: </span><span style="color:#79B8FF;">14</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// rotate: 20</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 每一个多边形样式</span></span>
<span class="line"><span style="color:#E1E4E8;">      itemStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        areaColor: </span><span style="color:#9ECBFF;">&#39;skyblue&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        color: </span><span style="color:#9ECBFF;">&#39;red&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        opacity: </span><span style="color:#79B8FF;">0.8</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 地图高亮</span></span>
<span class="line"><span style="color:#E1E4E8;">      emphasis: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        itemStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          color: </span><span style="color:#9ECBFF;">&#39;red&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        label: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          color: </span><span style="color:#9ECBFF;">&#39;#fff&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontSize: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 布局</span></span>
<span class="line"><span style="color:#E1E4E8;">    grid: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      left: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      right: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      top: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      bottom: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    series: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&#39;lines&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 航线</span></span>
<span class="line"><span style="color:#E1E4E8;">        data: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          {</span></span>
<span class="line"><span style="color:#E1E4E8;">            coords: [</span></span>
<span class="line"><span style="color:#E1E4E8;">              [</span><span style="color:#79B8FF;">116.405285</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">39.904989</span><span style="color:#E1E4E8;">], </span><span style="color:#6A737D;">// 起点</span></span>
<span class="line"><span style="color:#E1E4E8;">              [</span><span style="color:#79B8FF;">119.306239</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">26.075302</span><span style="color:#E1E4E8;">], </span><span style="color:#6A737D;">// 终点</span></span>
<span class="line"><span style="color:#E1E4E8;">            ],</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 统一样式设置</span></span>
<span class="line"><span style="color:#E1E4E8;">            lineStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">              color: </span><span style="color:#9ECBFF;">&#39;orange&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              width: </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">          },</span></span>
<span class="line"><span style="color:#E1E4E8;">        ],</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 特效</span></span>
<span class="line"><span style="color:#E1E4E8;">        effect: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          show: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          symbol: </span><span style="color:#9ECBFF;">&#39;pin&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          symbolSize: </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          color:</span><span style="color:#9ECBFF;">&#39;#fff&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ref, onMounted } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> echarts </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;echarts&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> chinaJSON </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./china.json&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 注册地图</span></span>
<span class="line"><span style="color:#24292E;">echarts.</span><span style="color:#6F42C1;">registerMap</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;china&#39;</span><span style="color:#24292E;">, chinaJSON </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">map</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">onMounted</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> myCharts </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> echarts.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">(map.value)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置实例</span></span>
<span class="line"><span style="color:#24292E;">  myCharts.</span><span style="color:#6F42C1;">setOption</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    geo: {</span></span>
<span class="line"><span style="color:#24292E;">      map: </span><span style="color:#032F62;">&#39;china&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 中国地图</span></span>
<span class="line"><span style="color:#24292E;">      roam: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 开启鼠标缩放</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 地图位置</span></span>
<span class="line"><span style="color:#24292E;">      left: </span><span style="color:#005CC5;">50</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      top: </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bottom: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      right: </span><span style="color:#005CC5;">50</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 地图上的文字设置</span></span>
<span class="line"><span style="color:#24292E;">      label: {</span></span>
<span class="line"><span style="color:#24292E;">        show: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 文字渲染</span></span>
<span class="line"><span style="color:#24292E;">        color: </span><span style="color:#032F62;">&#39;#fff&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        fontSize: </span><span style="color:#005CC5;">14</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// rotate: 20</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 每一个多边形样式</span></span>
<span class="line"><span style="color:#24292E;">      itemStyle: {</span></span>
<span class="line"><span style="color:#24292E;">        areaColor: </span><span style="color:#032F62;">&#39;skyblue&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        color: </span><span style="color:#032F62;">&#39;red&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        opacity: </span><span style="color:#005CC5;">0.8</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 地图高亮</span></span>
<span class="line"><span style="color:#24292E;">      emphasis: {</span></span>
<span class="line"><span style="color:#24292E;">        itemStyle: {</span></span>
<span class="line"><span style="color:#24292E;">          color: </span><span style="color:#032F62;">&#39;red&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        label: {</span></span>
<span class="line"><span style="color:#24292E;">          color: </span><span style="color:#032F62;">&#39;#fff&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          fontSize: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 布局</span></span>
<span class="line"><span style="color:#24292E;">    grid: {</span></span>
<span class="line"><span style="color:#24292E;">      left: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      right: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      top: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      bottom: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    series: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&#39;lines&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 航线</span></span>
<span class="line"><span style="color:#24292E;">        data: [</span></span>
<span class="line"><span style="color:#24292E;">          {</span></span>
<span class="line"><span style="color:#24292E;">            coords: [</span></span>
<span class="line"><span style="color:#24292E;">              [</span><span style="color:#005CC5;">116.405285</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">39.904989</span><span style="color:#24292E;">], </span><span style="color:#6A737D;">// 起点</span></span>
<span class="line"><span style="color:#24292E;">              [</span><span style="color:#005CC5;">119.306239</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">26.075302</span><span style="color:#24292E;">], </span><span style="color:#6A737D;">// 终点</span></span>
<span class="line"><span style="color:#24292E;">            ],</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 统一样式设置</span></span>
<span class="line"><span style="color:#24292E;">            lineStyle: {</span></span>
<span class="line"><span style="color:#24292E;">              color: </span><span style="color:#032F62;">&#39;orange&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              width: </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">          },</span></span>
<span class="line"><span style="color:#24292E;">        ],</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 特效</span></span>
<span class="line"><span style="color:#24292E;">        effect: {</span></span>
<span class="line"><span style="color:#24292E;">          show: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          symbol: </span><span style="color:#032F62;">&#39;pin&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          symbolSize: </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          color:</span><span style="color:#032F62;">&#39;#fff&#39;</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div>`,44),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const C=s(p,[["render",c]]);export{d as __pageData,C as default};
