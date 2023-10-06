import{_ as s,o as a,c as o,Q as l}from"./chunks/framework.2ee92742.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"learn/杂技拾谈/多接口请求.md","filePath":"learn/杂技拾谈/多接口请求.md","lastUpdated":null}'),p={name:"learn/杂技拾谈/多接口请求.md"},n=l('<h2 id="多接口请求" tabindex="-1">多接口请求 <a class="header-anchor" href="#多接口请求" aria-label="Permalink to &quot;多接口请求&quot;">​</a></h2><p>前端时常会碰到要请求多个接口的场景。一个接口设置一个函数，统一在生命周期执行的方法也可以，但是代码量大，维护麻烦。</p><p>有没有什么简便的方法呢？</p><p><code>Promise</code> 对象提供了一个 <code>all</code> 方法，可以调用多个接口，根据位置依次返回 <code>promise</code> 请求参数。返回的是一个数组，因此可以通过解构的方式获取。代码如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">res</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">all</span><span style="color:#E1E4E8;">([</span><span style="color:#9ECBFF;">&#39;接口1&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;接口2&#39;</span><span style="color:#E1E4E8;">])</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">res</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">result</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">all</span><span style="color:#24292E;">([</span><span style="color:#032F62;">&#39;接口1&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;接口2&#39;</span><span style="color:#24292E;">])</span></span></code></pre></div><p>运行后可以看到有效果了。但是还有潜在的问题。</p><p>众所周知，接口是有存在错误的情况的，如果有一个接口报错，则全部的接口都不再返回。因此需要铺货错误。</p><p>可以通过 <code>map</code> 循环，每一项都通过 <code>catch</code> 方法捕获错误，代码如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">res</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">all</span><span style="color:#E1E4E8;">([</span><span style="color:#9ECBFF;">&#39;接口1&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;接口2&#39;</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">v</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> v.</span><span style="color:#B392F0;">catch</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(e))))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">res</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">result</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">all</span><span style="color:#24292E;">([</span><span style="color:#032F62;">&#39;接口1&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;接口2&#39;</span><span style="color:#24292E;">].</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(</span><span style="color:#E36209;">v</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> v.</span><span style="color:#6F42C1;">catch</span><span style="color:#24292E;">(</span><span style="color:#E36209;">e</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(e))))</span></span></code></pre></div><p>这下报错接口能够被捕获到错误，而没问题的接口能返回信息。</p>',10),e=[n];function t(c,r,E,y,i,d){return a(),o("div",null,e)}const h=s(p,[["render",t]]);export{_ as __pageData,h as default};
