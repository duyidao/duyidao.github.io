import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const u=JSON.parse('{"title":"Vue项目对render和jsx的妙用","description":"","frontmatter":{},"headers":[],"relativePath":"learn/学而时习之/更上一层楼/Vue项目对render和jsx的妙用.md","filePath":"learn/学而时习之/更上一层楼/Vue项目对render和jsx的妙用.md","lastUpdated":null}'),p={name:"learn/学而时习之/更上一层楼/Vue项目对render和jsx的妙用.md"},t=l(`<h1 id="vue项目对render和jsx的妙用" tabindex="-1">Vue项目对render和jsx的妙用 <a class="header-anchor" href="#vue项目对render和jsx的妙用" aria-label="Permalink to &quot;Vue项目对render和jsx的妙用&quot;">​</a></h1><h2 id="vue组件的本质" tabindex="-1">Vue组件的本质 <a class="header-anchor" href="#vue组件的本质" aria-label="Permalink to &quot;Vue组件的本质&quot;">​</a></h2><p>先看一个例子：</p><p>我们有一个数组，需要把这个数组渲染成多个表格列的形式。如果直接在 <code>template</code> 中写代码，则需写成如下形式：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;tbody&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  	&lt;tr v-for=&quot;item in list&quot; :key=&quot;item.id&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;td&gt;{{ item.name }}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;td v-if=&quot;item.status === 0&quot;&gt;状态1&lt;/td&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;td v-if=&quot;item.status === 1&quot;&gt;状态2&lt;/td&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;td v-if=&quot;item.status === 2&quot;&gt;状态3&lt;/td&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;td v-if=&quot;item.status === 3&quot;&gt;状态4&lt;/td&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;td v-if=&quot;item.status === 4&quot;&gt;状态5&lt;/td&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/tr&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">table</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;tbody&gt;</span></span>
<span class="line"><span style="color:#24292E;">  	&lt;tr v-for=&quot;item in list&quot; :key=&quot;item.id&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;td&gt;{{ item.name }}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;td v-if=&quot;item.status === 0&quot;&gt;状态1&lt;/td&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;td v-if=&quot;item.status === 1&quot;&gt;状态2&lt;/td&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;td v-if=&quot;item.status === 2&quot;&gt;状态3&lt;/td&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;td v-if=&quot;item.status === 3&quot;&gt;状态4&lt;/td&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;td v-if=&quot;item.status === 4&quot;&gt;状态5&lt;/td&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/tr&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">table</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>可以看出代码十分冗余，如果状态多的话还要写很多类似代码。</p><p><strong>如果模板内容需要复杂的比较逻辑实现时，可以利用 <code>render</code> 函数来决定模板的内容，这样会比 <code>vue</code> 指令更加简洁和高效。</strong></p><p>编写 <code>.vue</code> 文件其实最后都会变成一个对象:</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   {{ msg }}</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      msg: </span><span style="color:#9ECBFF;">&#39;hello&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   {{ msg }}</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      msg: </span><span style="color:#032F62;">&#39;hello&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>编译后变成如下形式的对象：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> component </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">&#39;&lt;div&gt;{{msg}}&lt;/div&gt;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      msg: </span><span style="color:#9ECBFF;">&#39;hello&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> component </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">&#39;&lt;div&gt;{{msg}}&lt;/div&gt;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      msg: </span><span style="color:#032F62;">&#39;hello&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>因此我们可以通过对象设置 <code>render()</code> 方法属性，配合 <code>Vue</code> 提供的 <code>createElementVNode()</code> 方法与 <code>jsx</code> 语法创建复杂的 DOM 元素，比如表格。</p><p><code>createElementNode()</code> 方法需要传入三个参数，分别为：</p><ol><li>所要创建的标签，如 <code>div</code> 、<code>span</code> 等</li><li>该标签的属性对象，如样式 <code>style</code> 、类名 <code>class</code> 、<code>id</code> 等</li><li>内容</li></ol><p>上方示例代码使用 <code>render</code> 函数后改成以下形式：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> statuTable </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&#39;tag&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  props: [</span><span style="color:#9ECBFF;">&#39;status&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    let statusMap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        text: </span><span style="color:#9ECBFF;">&#39;状态1&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        text: </span><span style="color:#9ECBFF;">&#39;状态2&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        text: </span><span style="color:#9ECBFF;">&#39;状态3&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        text: </span><span style="color:#9ECBFF;">&#39;状态4&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        text: </span><span style="color:#9ECBFF;">&#39;状态5&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    return </span><span style="color:#B392F0;">createElementVNode</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;span&#39;</span><span style="color:#E1E4E8;">, { </span><span style="color:#FFAB70;">style</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;color:&#39;</span><span style="color:#E1E4E8;">+</span><span style="color:#9ECBFF;">&#39;green&#39;</span><span style="color:#E1E4E8;">}, </span><span style="color:#FFAB70;">statusMap</span><span style="color:#E1E4E8;">[</span><span style="color:#FFAB70;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#FFAB70;">status</span><span style="color:#E1E4E8;">].text)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> statuTable </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&#39;tag&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  props: [</span><span style="color:#032F62;">&#39;status&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    let statusMap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        text: </span><span style="color:#032F62;">&#39;状态1&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        text: </span><span style="color:#032F62;">&#39;状态2&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        text: </span><span style="color:#032F62;">&#39;状态3&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        text: </span><span style="color:#032F62;">&#39;状态4&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        text: </span><span style="color:#032F62;">&#39;状态5&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    return </span><span style="color:#6F42C1;">createElementVNode</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;span&#39;</span><span style="color:#24292E;">, { </span><span style="color:#E36209;">style</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;color:&#39;</span><span style="color:#24292E;">+</span><span style="color:#032F62;">&#39;green&#39;</span><span style="color:#24292E;">}, </span><span style="color:#E36209;">statusMap</span><span style="color:#24292E;">[</span><span style="color:#E36209;">this</span><span style="color:#24292E;">.</span><span style="color:#E36209;">status</span><span style="color:#24292E;">].text)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>使用时以该对象的名称作为标签的名称，通过传参的形式 <code>jsx</code> 可以通过 <code>props</code> 属性获取到传参的值。代码如下：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	&lt;tbody&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  	&lt;tr v-for=&quot;item in list&quot; :key=&quot;item.id&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;td&gt;{{ item.name }}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    	&lt;td&gt;&lt;statuTable :status=&quot;item.status&quot;&gt;&lt;/statuTable&gt;&lt;/td&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/tr&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">table</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	&lt;tbody&gt;</span></span>
<span class="line"><span style="color:#24292E;">  	&lt;tr v-for=&quot;item in list&quot; :key=&quot;item.id&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;td&gt;{{ item.name }}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#24292E;">    	&lt;td&gt;&lt;statuTable :status=&quot;item.status&quot;&gt;&lt;/statuTable&gt;&lt;/td&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/tr&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">table</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="jsx和render的特殊场景使用" tabindex="-1">JSX和render的特殊场景使用 <a class="header-anchor" href="#jsx和render的特殊场景使用" aria-label="Permalink to &quot;JSX和render的特殊场景使用&quot;">​</a></h2><p>首先需要注意一点：</p><p>JSX 并不是和 React 绑定的，我们可以在任何地方使用 JSX 。比如 Vue，JSX虽然让我们失去使用 Vue 模板指令的能力，但也对一些复杂模板表达更灵活。</p><p>上方案例添加一个条件：表格需要筛选数据，名称为王五或赵六的数据不渲染。如果传统写法 <code>template</code> ，需要 <code>v-if</code> 来判断，代码如下：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;tbody&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  	&lt;tr v-for=&quot;item in list&quot; :key=&quot;item.id&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;template v-if=&quot;item.name !== &#39;王五&#39; || item.name！== ‘赵六&#39;&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      	&lt;td&gt;{{ item.name }}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      	&lt;!-- ...... --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/tr&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">table</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;tbody&gt;</span></span>
<span class="line"><span style="color:#24292E;">  	&lt;tr v-for=&quot;item in list&quot; :key=&quot;item.id&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;template v-if=&quot;item.name !== &#39;王五&#39; || item.name！== ‘赵六&#39;&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">      	&lt;td&gt;{{ item.name }}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#24292E;">      	&lt;!-- ...... --&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/template&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/tr&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">table</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>JSX 使用方式如下：</p><ol><li><p>先把 <code>script</code> 改为 JSX ：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;jsx&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;jsx&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li><li><p>创建一个函数书写 JSX 语法</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TrList</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">    	list.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(item.name </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;王五&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> item.name </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;赵六&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">tr</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">td</span><span style="color:#E1E4E8;">&gt;{item.name}&lt;/</span><span style="color:#85E89D;">td</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">td</span><span style="color:#E1E4E8;">&gt;&lt;</span><span style="color:#79B8FF;">statusTable</span><span style="color:#E1E4E8;">&gt;{item.status}&lt;/</span><span style="color:#79B8FF;">statusTable</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">td</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;/</span><span style="color:#85E89D;">tr</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#E1E4E8;">  	}</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TrList</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;&gt;</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">    	list.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">((</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(item.name </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;王五&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> item.name </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;赵六&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">tr</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">td</span><span style="color:#24292E;">&gt;{item.name}&lt;/</span><span style="color:#22863A;">td</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">td</span><span style="color:#24292E;">&gt;&lt;</span><span style="color:#005CC5;">statusTable</span><span style="color:#24292E;">&gt;{item.status}&lt;/</span><span style="color:#005CC5;">statusTable</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">td</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;/</span><span style="color:#22863A;">tr</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      })</span></span>
<span class="line"><span style="color:#24292E;">  	}</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/&gt;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li><li><p>使用</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;tbody&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  	&lt;TrList&gt;&lt;/TrList&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">table</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;tbody&gt;</span></span>
<span class="line"><span style="color:#24292E;">  	&lt;TrList&gt;&lt;/TrList&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">table</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h3 id="render" tabindex="-1">Render <a class="header-anchor" href="#render" aria-label="Permalink to &quot;Render&quot;">​</a></h3><p><strong>Render 函数是 Vue2.x 新增的一个函数、主要用来提升节点的性能，它是基于 JavaScript 计算。使用 Render 函数将 Template 里面的节点解析成虚拟的 Dom 。</strong></p><blockquote><p>Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用渲染函数，它比模板更接近编译器。</p></blockquote><p>简单的说，在 Vue 中我们使用模板 HTML 语法组建页面的，使用 Render 函数我们可以用 Js 语言来构建 DOM。 因为 Vue 是虚拟 DOM，所以在拿到 Template 模板时也要转译成 VNode 的函数，而用 Render 函数构建 DOM，Vue 就免去了转译的过程。</p><p>通过 <code>createElementVNode</code> 方法可以实现 <code>render</code> 函数编译 DOM 元素。</p><h3 id="jsx" tabindex="-1">JSX <a class="header-anchor" href="#jsx" aria-label="Permalink to &quot;JSX&quot;">​</a></h3><p>React 使用一种名为 JavaScript XML (JSX) 的特殊语法。 借助 JSX，你可将 HTML（或可能会创建的自定义组件）和 JavaScript 集成到一个文件中，甚至可以集成到单个代码行中。 通过使用 JSX，你可以依赖 JavaScript 语法来实现逻辑。</p><blockquote><p>注意</p><p>JSX 依赖于可扩展标记语言 (XML)。 XML 的语法类似于 HTML。 许多情况下，你可能都不会注意到二者之间的差异。 但是，XML 对语法有几点重要的限制：</p></blockquote><ul><li>所有元素都必须放置在一个父元素内。</li><li>必须结束所有元素。</li></ul><p>生成过程：</p><p>浏览器本身不支持 JSX。 因此，必须从 JSX 文件生成 JavaScript 和 HTML，才能由浏览器呈现它们。 有几种捆绑程序和其他工具可以执行所需完成的任务。 这些工具包括 <a href="https://webpack.js.org/" target="_blank" rel="noreferrer">Webpack</a>、<a href="https://parceljs.org/" target="_blank" rel="noreferrer">Parcel</a> 和 <a href="https://www.snowpack.dev/" target="_blank" rel="noreferrer">Snowpack</a>。 我们将使用 Snowpack，因为它不需要代码，也不需要额外编写脚本。</p><p>组件：</p><p>React 开发基于组件完成。 组件是自包含显示和工作单元。 它们可在应用程序中重复使用。 你可使用它们将应用程序按逻辑分解为更小的区块（或组件）。</p>`,39),o=[t];function e(c,r,E,y,i,d){return n(),a("div",null,o)}const m=s(p,[["render",e]]);export{u as __pageData,m as default};
