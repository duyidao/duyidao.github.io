import{_ as s,c as i,o as a,V as n}from"./chunks/framework.C7aBxagv.js";const o=JSON.parse('{"title":"图层","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"图","7":"层"},"headers":[],"relativePath":"project/baidu/layer/index.md","filePath":"project/baidu/layer/index.md","lastUpdated":1708417889000}'),l={name:"project/baidu/layer/index.md"},p=n(`<h1 id="图层" tabindex="-1">图层 <a class="header-anchor" href="#图层" aria-label="Permalink to &quot;图层&quot;">​</a></h1><h2 id="概括" tabindex="-1">概括 <a class="header-anchor" href="#概括" aria-label="Permalink to &quot;概括&quot;">​</a></h2><p>该项目从以下几方面进行梳理和总结：</p><ul><li><a href="/blog/project/baidu/layer/样式.html">样式</a></li><li><a href="/blog/project/baidu/layer/规范.html">规范</a></li><li><a href="/blog/project/baidu/layer/封装.html">封装</a></li><li><a href="/blog/project/baidu/layer/MapVThree.html">MapVThree</a></li><li><a href="/blog/project/baidu/layer/优化.html">优化</a></li><li><a href="/blog/project/baidu/layer/功能.html">功能</a></li></ul><h2 id="项目结构" tabindex="-1">项目结构 <a class="header-anchor" href="#项目结构" aria-label="Permalink to &quot;项目结构&quot;">​</a></h2><p>项目结构主要如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">examples </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 图层的根组件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	|--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">App.vue </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 整个图层的根组件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	|--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">views </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 每个图层的根组件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">publib </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 存放公共资源</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	|--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">assets</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  	|--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">images </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 图片</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    |--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">css </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 样式</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		|--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">modules </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 模型数据</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">src</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	|--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">assets </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 图片资源</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	|--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">conpoments </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 组件（公共部分与各自图层）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	|--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">router </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 路由</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	|--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">store </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 多组件使用的方法与变量</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	|--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">utils </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 公共方法封装</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">script </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 打包设置与简写设置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.env.development </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 开发环境的配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.env.test </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 测试环境打包的配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">index.html </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 主页面</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">vite.config.js </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 文件夹路径简写和跨域代理</span></span></code></pre></div><p>本项目是一个项目包含多个图层，每个图层使用到的方法会有相同的地方，但也会有各自不同的方法。因此需要做封装处理，封装时也需要考虑到易用性、复用性和可拓展性。</p><h2 id="poc迁移" tabindex="-1">Poc迁移 <a class="header-anchor" href="#poc迁移" aria-label="Permalink to &quot;Poc迁移&quot;">​</a></h2><p>Poc迁移实质上就是把这个广东省数据的项目迁移一份给北京总部那边。由于项目是 Vue2.7 版本的项目，因此会遇到一些 Vue2.7 的写法。此模块用于记录使用 Vue2.7 <code>setup</code> 语法的写法。</p><h3 id="v-model语法糖" tabindex="-1">v-model语法糖 <a class="header-anchor" href="#v-model语法糖" aria-label="Permalink to &quot;v-model语法糖&quot;">​</a></h3><p>在 Vue2 中，<code>v-model</code> 语法糖实际上是通过 <code>:value=&quot;value&quot;</code> 和 <code>@input=&quot;value = $event.target.value&quot;</code> ；在 Vue3 中，<code>v-model</code> 语法糖实际上是通过 <code>:moduleValue</code> 和 <code>@update:modelValue=&quot;message = $event&quot;</code> 。</p><p>在 Vue2.7 中，想要实现 <code>v-model</code> 语法糖功能，需要以下几步：</p><ol><li>子组件 <code>export default</code> 中设置 <code>model</code> 对象，其中有两个参数：<code>prop: value</code> 为需要绑定的值，<code>event: update:value</code> 为方法名称</li><li>子组件在修改值时调用 <code>update:value</code> 方法</li><li>父组件 <code>v-model</code> 绑定数据</li></ol><p>父组件代码如下：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">son</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span></code></pre></div><p>子组件代码如下：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {{ value }}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  props: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    value: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      type: String,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      default: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  model: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;value&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      event: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;update:value&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> update</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      emit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;update:value&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="侦听器" tabindex="-1">侦听器 <a class="header-anchor" href="#侦听器" aria-label="Permalink to &quot;侦听器&quot;">​</a></h3><p>在项目中，我在外部声明了一个变量 <code>const type = ref(false)</code> ，在使用 Vue2 写法的组件中 <code>import</code> 导入，在 <code>watch</code> 中侦听，代码如下：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {type} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/store/index.js&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  watch: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">newVal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(newVal)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    fn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>结果无法触发侦听，如果写在 <code>setup</code> 中则无法通过 <code>this</code> 调用 <code>fn</code> 函数。</p><p>Vue2.7 中，<code>this</code> 可以调用 <code>$watch</code> 方法侦听，效果与 <code>watch</code> 是一样的。不仅能够侦听到 <code>ref</code> 声明的变量，同时也能通过 <code>this</code> 调用 <code>data</code> 或 <code>method</code> 内的变量方法。</p><p>代码如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {type} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/store/index&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  created</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$watch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> type.value, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">newVaal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(newVal)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="父组件使用子组件变量方法" tabindex="-1">父组件使用子组件变量方法 <a class="header-anchor" href="#父组件使用子组件变量方法" aria-label="Permalink to &quot;父组件使用子组件变量方法&quot;">​</a></h3><p>在 Vue2 中，父组件使用子组件方法可以通过 <code>this.$refs.xxx</code> 方式获取；在 Vue3 中，需要子组件 <code>defineExporse</code> 中暴露出去才可使用。</p><p>在 Vue2.7 中，如果使用 <code>setup</code> 的方式，需要在 <code>return</code> 中暴露出去；如果使用选项式 API，无需其他操作。</p><p>父组件代码如下：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">son</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sonRef&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {ref, nextTick} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sonRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    nextTick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sonRef.value.xxx)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      sonRef</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div>`,30),h=[p];function t(e,k,E,d,r,g){return a(),i("div",null,h)}const y=s(l,[["render",t]]);export{o as __pageData,y as default};