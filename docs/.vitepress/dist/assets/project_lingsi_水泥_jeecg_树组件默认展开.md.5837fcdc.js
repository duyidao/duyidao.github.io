import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.2ee92742.js";const u=JSON.parse('{"title":"树组件默认展开","description":"","frontmatter":{},"headers":[],"relativePath":"project/lingsi/水泥/jeecg/树组件默认展开.md","filePath":"project/lingsi/水泥/jeecg/树组件默认展开.md","lastUpdated":null}'),l={name:"project/lingsi/水泥/jeecg/树组件默认展开.md"},o=p(`<h1 id="树组件默认展开" tabindex="-1">树组件默认展开 <a class="header-anchor" href="#树组件默认展开" aria-label="Permalink to &quot;树组件默认展开&quot;">​</a></h1><p>用户要求树组件默认展开，一般树结构都会有默认展开、指定展开的 <code>API</code> ，查阅官方文档，果不其然可以使用 <code>defaultExpandAll</code> 字段，设置为 <code>true</code> 即可。</p><p>试用一下：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">a-tree</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">checkable</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">//</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">显示多选框</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">check</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">onCheck</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  :</span><span style="color:#B392F0;">treeData</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">membersTree</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  :</span><span style="color:#B392F0;">defaultExpandAll</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">true</span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  :</span><span style="color:#B392F0;">expandedKeys</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">iExpandedKeys</span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">expand</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">onExpand</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">/&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">a-tree</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">checkable</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">//</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">显示多选框</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">check</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">onCheck</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">  :</span><span style="color:#6F42C1;">treeData</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">membersTree</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">  :</span><span style="color:#6F42C1;">defaultExpandAll</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">true</span><span style="color:#032F62;">&#39;</span></span>
<span class="line"><span style="color:#24292E;">  :</span><span style="color:#6F42C1;">expandedKeys</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">iExpandedKeys</span><span style="color:#032F62;">&#39;</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">expand</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">onExpand</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">/&gt;</span></span></code></pre></div><p>刷新项目后查看效果，发现并没有用。</p><h2 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h2><p>继续翻阅文档，发现下面这个属性：</p><p><img src="https://i.328888.xyz/2023/04/04/ibQCQk.png" alt="ibQCQk.png"></p><p>换一种思路，默认展开全部树节点 === 展开指定树节点字段中设置全部的节点 <code>id</code> ，该思路成立。把上方代码修改一下：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">a-tree</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">checkable</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">//</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">显示多选框</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">check</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">onCheck</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  :</span><span style="color:#B392F0;">treeData</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">membersTree</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  :</span><span style="color:#B392F0;">defaultExpandAll</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">true</span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  :</span><span style="color:#B392F0;">expandedKeys</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">sync</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">iExpandedKeys</span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">expand</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">onExpand</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">/&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">    methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        initData() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      		getAction(this.url, this.params).then(res =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">        		if (res.code == 200) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          			this.membersTree = res.result</span></span>
<span class="line"><span style="color:#E1E4E8;">          			this.iExpandedKeys = this.membersTree.map(item =&gt; item.id) // 要保存节点的id</span></span>
<span class="line"><span style="color:#E1E4E8;">        		}</span></span>
<span class="line"><span style="color:#E1E4E8;">      		})</span></span>
<span class="line"><span style="color:#E1E4E8;">    	},</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">a-tree</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">checkable</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">//</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">显示多选框</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">check</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">onCheck</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">  :</span><span style="color:#6F42C1;">treeData</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">membersTree</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">  :</span><span style="color:#6F42C1;">defaultExpandAll</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">true</span><span style="color:#032F62;">&#39;</span></span>
<span class="line"><span style="color:#24292E;">  :</span><span style="color:#6F42C1;">expandedKeys</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">sync</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">iExpandedKeys</span><span style="color:#032F62;">&#39;</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">expand</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">onExpand</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">/&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#24292E;">export default {</span></span>
<span class="line"><span style="color:#24292E;">    methods: {</span></span>
<span class="line"><span style="color:#24292E;">        initData() {</span></span>
<span class="line"><span style="color:#24292E;">      		getAction(this.url, this.params).then(res =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">        		if (res.code == 200) {</span></span>
<span class="line"><span style="color:#24292E;">          			this.membersTree = res.result</span></span>
<span class="line"><span style="color:#24292E;">          			this.iExpandedKeys = this.membersTree.map(item =&gt; item.id) // 要保存节点的id</span></span>
<span class="line"><span style="color:#24292E;">        		}</span></span>
<span class="line"><span style="color:#24292E;">      		})</span></span>
<span class="line"><span style="color:#24292E;">    	},</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/script&gt;</span></span></code></pre></div><p>刷新页面查看效果，发现能够默认展开全部的树节点。</p>`,11),e=[o];function t(c,r,E,y,i,d){return n(),a("div",null,e)}const h=s(l,[["render",t]]);export{u as __pageData,h as default};
