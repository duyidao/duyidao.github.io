import{_ as s,c as a,o as l,d as n}from"./app.311aaacf.js";const h=JSON.parse('{"title":"Vue\u7EC4\u4EF6\u8BBE\u8BA1\u6280\u5DE7","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6837\u5F0F\u7684\u601D\u8003","slug":"\u6837\u5F0F\u7684\u601D\u8003","link":"#\u6837\u5F0F\u7684\u601D\u8003","children":[{"level":3,"title":"\u5BB9\u5668\u3001\u5185\u90E8\u5185\u5BB9\u7684\u57FA\u672C\u6837\u5F0F","slug":"\u5BB9\u5668\u3001\u5185\u90E8\u5185\u5BB9\u7684\u57FA\u672C\u6837\u5F0F","link":"#\u5BB9\u5668\u3001\u5185\u90E8\u5185\u5BB9\u7684\u57FA\u672C\u6837\u5F0F","children":[]},{"level":3,"title":"\u5C3D\u91CF\u4F7F\u7528\u4F4E\u6743\u503C","slug":"\u5C3D\u91CF\u4F7F\u7528\u4F4E\u6743\u503C","link":"#\u5C3D\u91CF\u4F7F\u7528\u4F4E\u6743\u503C","children":[]},{"level":3,"title":"\u9884\u7559\u8C03\u63A7\u7C7B","slug":"\u9884\u7559\u8C03\u63A7\u7C7B","link":"#\u9884\u7559\u8C03\u63A7\u7C7B","children":[]}]},{"level":2,"title":"\u7EC4\u4EF6\u7684\u601D\u8003","slug":"\u7EC4\u4EF6\u7684\u601D\u8003","link":"#\u7EC4\u4EF6\u7684\u601D\u8003","children":[{"level":3,"title":"\u7EC4\u4EF6\u5206\u5272","slug":"\u7EC4\u4EF6\u5206\u5272","link":"#\u7EC4\u4EF6\u5206\u5272","children":[]},{"level":3,"title":"\u6570\u636E\u64CD\u4F5C","slug":"\u6570\u636E\u64CD\u4F5C","link":"#\u6570\u636E\u64CD\u4F5C","children":[]}]},{"level":2,"title":"\u884C\u4E3A\u7684\u601D\u8003","slug":"\u884C\u4E3A\u7684\u601D\u8003","link":"#\u884C\u4E3A\u7684\u601D\u8003","children":[{"level":3,"title":"\u884C\u4E3A\u7C7B\u578B\u62C6\u5206","slug":"\u884C\u4E3A\u7C7B\u578B\u62C6\u5206","link":"#\u884C\u4E3A\u7C7B\u578B\u62C6\u5206","children":[]},{"level":3,"title":"\u884C\u4E3A\u5468\u671F\u62C6\u5206","slug":"\u884C\u4E3A\u5468\u671F\u62C6\u5206","link":"#\u884C\u4E3A\u5468\u671F\u62C6\u5206","children":[]}]},{"level":2,"title":"props\u7684\u601D\u8003","slug":"props\u7684\u601D\u8003","link":"#props\u7684\u601D\u8003","children":[{"level":3,"title":"\u6570\u636E\u5B9A\u4E49","slug":"\u6570\u636E\u5B9A\u4E49","link":"#\u6570\u636E\u5B9A\u4E49","children":[]},{"level":3,"title":"\u7EC4\u4EF6\u6269\u5C55","slug":"\u7EC4\u4EF6\u6269\u5C55","link":"#\u7EC4\u4EF6\u6269\u5C55","children":[]}]},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3","link":"#\u603B\u7ED3","children":[]}],"relativePath":"learn/\u5B66\u800C\u65F6\u4E60\u4E4B/\u524D\u7AEF\u7EC4\u4EF6\u5C01\u88C5\u5B9E\u4F8B/vue\u7EC4\u4EF6\u8BBE\u8BA1\u6280\u5DE7.md"}'),p={name:"learn/\u5B66\u800C\u65F6\u4E60\u4E4B/\u524D\u7AEF\u7EC4\u4EF6\u5C01\u88C5\u5B9E\u4F8B/vue\u7EC4\u4EF6\u8BBE\u8BA1\u6280\u5DE7.md"},e=n(`<h1 id="vue\u7EC4\u4EF6\u8BBE\u8BA1\u6280\u5DE7" tabindex="-1">Vue\u7EC4\u4EF6\u8BBE\u8BA1\u6280\u5DE7 <a class="header-anchor" href="#vue\u7EC4\u4EF6\u8BBE\u8BA1\u6280\u5DE7" aria-hidden="true">#</a></h1><p>\u8BBE\u8BA1\u4E00\u4E2A\u7EC4\u4EF6\u9700\u8981\u4ECE\u4EE5\u4E0B\u56DB\u4E2A\u65B9\u9762\u6765\u601D\u8003\uFF1A</p><ol><li><p>\u6837\u5F0F</p><p>\u6837\u5F0F\u5E94\u8BE5\u5199\u54EA\u4E9B\uFF1F\u9700\u8981\u6CE8\u610F\u4EC0\u4E48\uFF1F</p></li><li><p>template</p><p>\u901A\u8FC7\u63D2\u69FD\u4F20\u9012\u8FD8\u662F\u76F4\u63A5\u5199\u5728\u5B50\u7EC4\u4EF6\u5185\uFF1F</p></li><li><p>\u884C\u4E3A</p><p>\u67D0\u903B\u8F91\u662F\u7531\u7236\u7EC4\u4EF6\u5904\u7406\u8FD8\u662F\u5B50\u7EC4\u4EF6\u5904\u7406\uFF1F</p></li><li><p>props</p><p>\u54EA\u4E9B\u4E1C\u897F\u653E\u5728\u5B50\u7EC4\u4EF6\u5185\uFF1F\u54EA\u4E9B\u6570\u636E\u901A\u8FC7\u7236\u7EC4\u4EF6\u4F20\u53C2\uFF1F</p></li></ol><h2 id="\u6837\u5F0F\u7684\u601D\u8003" tabindex="-1">\u6837\u5F0F\u7684\u601D\u8003 <a class="header-anchor" href="#\u6837\u5F0F\u7684\u601D\u8003" aria-hidden="true">#</a></h2><h3 id="\u5BB9\u5668\u3001\u5185\u90E8\u5185\u5BB9\u7684\u57FA\u672C\u6837\u5F0F" tabindex="-1">\u5BB9\u5668\u3001\u5185\u90E8\u5185\u5BB9\u7684\u57FA\u672C\u6837\u5F0F <a class="header-anchor" href="#\u5BB9\u5668\u3001\u5185\u90E8\u5185\u5BB9\u7684\u57FA\u672C\u6837\u5F0F" aria-hidden="true">#</a></h3><p>\u4EE5\u641C\u7D22\u680F\u4E3A\u4F8B\uFF1A\u641C\u7D22\u680F\u4E00\u822C\u90FD\u662F\u6709\u4E0D\u540C\u7684\u8F93\u5165\u6846\uFF0C\u548C\u641C\u7D22\u91CD\u7F6E\u4E24\u4E2A\u6309\u94AE\u3002\u56E0\u6B64\u6309\u94AE\u662F\u56FA\u5B9A\u7684\uFF0C\u6837\u5F0F\u7531\u5B50\u7EC4\u4EF6\u8BBE\u7F6E\u3002</p><p>\u800C\u8F93\u5165\u6846\u5B50\u7EC4\u4EF6\u53EA\u63D0\u4F9B\u6700\u57FA\u7840\u7684\u6837\u5F0F\uFF0C\u5982\u5BBD\u9AD8\uFF0C\u8FB9\u6846\u7B49\u3002</p><blockquote><p>\u603B\u7ED3</p><p>\u5B50\u7EC4\u4EF6\u4E2D\u53EA\u5B9A\u4E49\u5176\u5BB9\u5668\u6837\u5F0F\uFF0C\u5373\u6574\u4F53\u76D2\u5B50\u6837\u5F0F\uFF0C\u5982\u5BBD\u5EA6\uFF0C\u9634\u5F71\uFF0C\u5185\u8FB9\u8DDD\uFF0C\u5B57\u4F53\u6837\u5F0F\u7B49\u3002</p></blockquote><h3 id="\u5C3D\u91CF\u4F7F\u7528\u4F4E\u6743\u503C" tabindex="-1">\u5C3D\u91CF\u4F7F\u7528\u4F4E\u6743\u503C <a class="header-anchor" href="#\u5C3D\u91CF\u4F7F\u7528\u4F4E\u6743\u503C" aria-hidden="true">#</a></h3><p>\u4F8B\u5982\u8BBE\u7F6E\u8F93\u5165\u6846\u7684\u6837\u5F0F\u91C7\u53D6\u6807\u7B7E\u8BBE\u7F6E\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">input</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u6837\u7684\u597D\u5904\u662F\u7236\u7EC4\u4EF6\u4F7F\u7528\u60F3\u8981\u4FEE\u6539\u8986\u76D6\u5176\u5BBD\u5EA6\u6837\u5F0F\u65F6\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7\u6DFB\u52A0\u7C7B\u540D\u7684\u65B9\u5F0F\u8986\u76D6\u6837\u5F0F\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">father_use_input</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5426\u5219\u4F7F\u7528\u8005\u4F7F\u7528\u65F6\u8FD8\u8981\u6DFB\u52A0 <code>!important</code> \uFF0C\u663E\u5F97\u4E0D\u591F\u4F18\u96C5\u3002</p><blockquote><p>\u603B\u7ED3</p><p>\u5B50\u7EC4\u4EF6\u8BBE\u7F6E\u6837\u5F0F\u65F6\u5C3D\u53EF\u80FD\u8BA9\u6743\u503C\u53D8\u4F4E\uFF0C\u7236\u7EC4\u4EF6\u5728\u4FEE\u6539\u65F6\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u8986\u76D6\u3002</p></blockquote><h3 id="\u9884\u7559\u8C03\u63A7\u7C7B" tabindex="-1">\u9884\u7559\u8C03\u63A7\u7C7B <a class="header-anchor" href="#\u9884\u7559\u8C03\u63A7\u7C7B" aria-hidden="true">#</a></h3><p>\u9884\u7559\u90E8\u5206\u53EF\u80FD\u9700\u8981\u7684\u8C03\u63A7\u7C7B\u540D\uFF0C\u5982\u8F93\u5165\u9519\u8BEF\u663E\u793A\u7EA2\u8272\uFF0C\u6B63\u786E\u663E\u793A\u7EFF\u8272\u7B49\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">input_error</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">border-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">input_success</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> green</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">border-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> green</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u6837\u4F7F\u7528\u8005\u5728\u9700\u8981\u4F7F\u7528\u65F6\u53EF\u76F4\u63A5\u6DFB\u52A0\u7C7B\u540D\uFF0C\u5B9E\u73B0\u6548\u679C\u3002\u4EE3\u7801\u5982\u4E0B\u6240\u793A\uFF1A</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MyInput</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">input_success</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">MyInput</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="\u7EC4\u4EF6\u7684\u601D\u8003" tabindex="-1">\u7EC4\u4EF6\u7684\u601D\u8003 <a class="header-anchor" href="#\u7EC4\u4EF6\u7684\u601D\u8003" aria-hidden="true">#</a></h2><h3 id="\u7EC4\u4EF6\u5206\u5272" tabindex="-1">\u7EC4\u4EF6\u5206\u5272 <a class="header-anchor" href="#\u7EC4\u4EF6\u5206\u5272" aria-hidden="true">#</a></h3><p>\u5BF9\u5B50\u7EC4\u4EF6\u8FDB\u884C\u5206\u5272\uFF0C\u5982\u679C\u662F\u56FA\u5B9A\u5185\u5BB9\u5C31\u76F4\u63A5\u5199\u6B7B\uFF0C\u4E0D\u786E\u5B9A\u7684\u90E8\u5206\u3001\u53EF\u80FD\u4F1A\u53D8\u66F4\u7684\u90E8\u5206\u7528 <code>slot</code> \u90E8\u5206\u4F20\u5165\u3002</p><ul><li>\u4F8B\u5982\uFF1A\u641C\u7D22\u680F\u3002\u641C\u7D22\u6309\u94AE\u662F\u56FA\u5B9A\u7684\uFF0C\u8F93\u5165\u6846\u53EF\u4EE5\u91C7\u53D6\u63D2\u69FD\u8BBE\u7F6E\u9ED8\u8BA4\u503C\u7684\u5F62\u5F0F\u3002</li><li>\u4F8B\u5982\uFF1A\u5F39\u7A97\u3002\u786E\u5B9A\u53D6\u6D88\u6309\u94AE\u662F\u56FA\u5B9A\u7684\uFF0C\u53C9\u53C9\u662F\u56FA\u5B9A\u7684\uFF0C\u6807\u9898\u662F\u4F20\u5165\u7684\u3002</li><li>\u4F8B\u5982\uFF1A\u8868\u683C\u3002\u8868\u5934\u662F\u56FA\u5B9A\u7684\uFF0C\u5185\u5BB9 <code>td</code> \u662F\u4F20\u5165\u7684\u3002</li></ul><p>\u53EF\u4EE5\u4F7F\u7528\u5E73\u8861\u5199\u6CD5\uFF1A</p><ol><li>\u6709 <code>slot</code> \u7528 <code>slot</code> \uFF0C\u65E0 <code>slot</code> \u4F7F\u7528\u63D2\u69FD\u9ED8\u8BA4\u5185\u5BB9\u3002</li><li>\u5177\u540D\u63D2\u69FD\u63A5\u6536\u7279\u5B9A\u60C5\u51B5\u4E0B\u7236\u7EC4\u4EF6\u4F20\u5165\u7684\u7ED3\u6784</li></ol><p>\u4EE3\u7801\u793A\u4F8B\u5982\u4E0B</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;slot #input&gt;&lt;/slot&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;slot #default&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    	&lt;input name=&quot;\u641C\u7D22&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/slot&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="\u6570\u636E\u64CD\u4F5C" tabindex="-1">\u6570\u636E\u64CD\u4F5C <a class="header-anchor" href="#\u6570\u636E\u64CD\u4F5C" aria-hidden="true">#</a></h3><p>\u5982\u679C\u6570\u636E\u5728\u5B50\u7EC4\u4EF6\u5185\uFF0C\u5B50\u7EC4\u4EF6\u64CD\u4F5C\u6570\u636E\u540E\u8FD8\u9700\u8981\u4F20\u9012\u7ED9\u7236\u7EC4\u4EF6\uFF0C\u8FC7\u7A0B\u7E41\u7410\u3002\u53EF\u4EE5\u91C7\u7528\u7236\u7EC4\u4EF6\u901A\u8FC7\u63D2\u69FD\u4F20\u9012\u7EC4\u4EF6\uFF0C\u6570\u636E\u53D8\u91CF\u4E5F\u8BBE\u7F6E\u5728\u7236\u7EC4\u4EF6\uFF0C\u8FD9\u6837\u7236\u7EC4\u4EF6\u53EF\u4EE5\u76F4\u63A5\u64CD\u4F5C\u4F7F\u7528\uFF0C\u65E0\u9700\u5B50\u7EC4\u4EF6\u4E0E\u7236\u7EC4\u4EF6\u7684\u901A\u4FE1\u3002</p><h2 id="\u884C\u4E3A\u7684\u601D\u8003" tabindex="-1">\u884C\u4E3A\u7684\u601D\u8003 <a class="header-anchor" href="#\u884C\u4E3A\u7684\u601D\u8003" aria-hidden="true">#</a></h2><h3 id="\u884C\u4E3A\u7C7B\u578B\u62C6\u5206" tabindex="-1">\u884C\u4E3A\u7C7B\u578B\u62C6\u5206 <a class="header-anchor" href="#\u884C\u4E3A\u7C7B\u578B\u62C6\u5206" aria-hidden="true">#</a></h3><p>\u628A\u67D0\u4E00\u884C\u4E3A\u5206\u4E3A\u57FA\u672C\u90E8\u5206\u548C\u4E1A\u52A1\u90E8\u5206\uFF0C\u5EFA\u8BAE\u6BCF\u4E00\u4E2A\u884C\u4E3A\u90FD\u7559\u7ED9\u7236\u7EC4\u4EF6\u76D1\u542C\u3002</p><p>\u4F8B\u5982\u5F39\u7A97\u7EC4\u4EF6\uFF0C\u5176\u62E5\u6709\u786E\u5B9A\u6309\u94AE\u548C\u5173\u95ED\u6309\u94AE\u3002\u5176\u4E2D\uFF1A</p><ul><li>\u5173\u95ED\u4E8B\u4EF6\uFF0C\u5C31\u662F\u5173\u95ED\u5F39\u7A97\uFF0C\u6B64\u884C\u4E3A\u5C5E\u4E8E\u903B\u8F91\u884C\u4E3A\uFF0C\u8FD9\u4E2A\u653E\u5728\u5B50\u7EC4\u4EF6\u5185\u5373\u53EF\u3002\u6700\u540E\u901A\u8FC7 <code>emit</code> \u63D0\u4F9B\u7236\u7EC4\u4EF6\u505A\u5176\u4ED6\u989D\u5916\u64CD\u4F5C</li><li>\u786E\u5B9A\u4E8B\u4EF6\uFF0C\u6B64\u884C\u4E3A\u5C5E\u4E8E\u4E1A\u52A1\u884C\u4E3A\uFF0C\u76F4\u63A5 <code>emit</code> \u7559\u7ED9\u7236\u7EC4\u4EF6\u5B9E\u73B0\u4E0D\u540C\u64CD\u4F5C\u3002</li></ul><h3 id="\u884C\u4E3A\u5468\u671F\u62C6\u5206" tabindex="-1">\u884C\u4E3A\u5468\u671F\u62C6\u5206 <a class="header-anchor" href="#\u884C\u4E3A\u5468\u671F\u62C6\u5206" aria-hidden="true">#</a></h3><p>\u66F4\u6709\u751A\u8005\u53EF\u4EE5\u628A\u884C\u4E3A\u7EC6\u5206\u62C6\u5206\uFF0C\u5982\u786E\u5B9A\u6309\u94AE\u70B9\u51FB\u53EF\u4EE5\u62C6\u5206\u4E3A\u70B9\u51FB\u786E\u5B9A\u524D\uFF0C\u786E\u5B9A\u70B9\u51FB\u89E6\u53D1\u540E\u7B49\u3002\u7C7B\u4F3C\u4E8E\u5212\u5206\u5468\u671F\u3002</p><p>\u4E1A\u52A1\u884C\u4E3A\u662F\u7531\u7236\u7EC4\u4EF6\u81EA\u5DF1\u5904\u7406\uFF0C\u4ECE\u5F00\u59CB\u5230\u7ED3\u675F\u90FD\u662F\u7531\u7236\u7EC4\u4EF6\u5904\u7406\uFF0C\u6B64\u65F6\u65E0\u9700\u8003\u8651\u884C\u4E3A\u5468\u671F\uFF0C\u7236\u7EC4\u4EF6\u53EF\u4EE5\u81EA\u4E3B\u64CD\u63A7\u3002</p><p>\u5982\u679C\u4EE5\u4E0A\u65B9\u6848\u4F8B\u5173\u95ED\u5F39\u7A97\u4E3A\u4F8B\uFF0C\u7236\u7EC4\u4EF6\u9700\u8981\u505A\u5230\u5173\u95ED\u524D\u505A\u7279\u5B9A\u5904\u7406\uFF0C\u5173\u95ED\u540E\u505A\u7279\u70B9\u5904\u7406\uFF0C\u6B64\u65F6\u9700\u8981\u5B50\u7EC4\u4EF6\u4F20\u9012\u81EA\u5B9A\u4E49\u4E8B\u4EF6\u65F6\u62C6\u5206\u5468\u671F\u5206\u522B\u4F20\u9012\u3002\u5982\uFF1A</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> close </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">emit</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">beforeColse</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">show</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">emit</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">afterClose</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="props\u7684\u601D\u8003" tabindex="-1">props\u7684\u601D\u8003 <a class="header-anchor" href="#props\u7684\u601D\u8003" aria-hidden="true">#</a></h2><h3 id="\u6570\u636E\u5B9A\u4E49" tabindex="-1">\u6570\u636E\u5B9A\u4E49 <a class="header-anchor" href="#\u6570\u636E\u5B9A\u4E49" aria-hidden="true">#</a></h3><p>\u7EC4\u4EF6\u76F8\u5173\u884C\u4E3A\u9700\u8981\u7684\u6570\u636E\u5185\u90E8\u5B9A\u4E49\uFF0C\u4E1A\u52A1\u76F8\u5173\u6570\u636E\u7236\u7EC4\u4EF6\u4F20\u5165\u3002</p><p>\u4F8B\u5982\uFF0C\u63A7\u5236\u7EC4\u4EF6\u663E\u9690\u72B6\u6001\u53EF\u4EE5\u5199\u5728\u5B50\u7EC4\u4EF6 <code>data</code> \u4E2D\uFF0C\u800C\u5185\u5BB9\u6570\u636E\u5219\u901A\u8FC7 <code>props</code> \u4F20\u9012\u83B7\u53D6\u3002</p><blockquote><p>React \u5B98\u65B9\u5EFA\u8BAE\uFF0C\u5B50\u7EC4\u4EF6\u5C3D\u53EF\u80FD\u4E0D\u8981\u5728 <code>data</code> \u5185\u6570\u503C\u6570\u636E\uFF0C\u5C3D\u91CF\u901A\u8FC7\u7236\u7EC4\u4EF6 <code>props</code> \u4F20\u9012\u83B7\u53D6\u3002\u8FD9\u5BF9 Vue \u4E5F\u9002\u7528\u3002</p></blockquote><h3 id="\u7EC4\u4EF6\u6269\u5C55" tabindex="-1">\u7EC4\u4EF6\u6269\u5C55 <a class="header-anchor" href="#\u7EC4\u4EF6\u6269\u5C55" aria-hidden="true">#</a></h3><p><code>props</code> \u53EF\u4EE5\u5BF9\u4F20\u53C2\u505A\u6570\u636E\u7684\u5B9A\u5236\uFF0C\u53EF\u4EE5\u4E3A\u4F7F\u7528\u8005\u53BB\u6389\u67D0\u4E9B\u529F\u80FD\u6216\u5F00\u542F\u67D0\u4E9B\u529F\u80FD\uFF0C\u6BD4\u5982\u662F\u5426\u80FD\u8BA9\u4F7F\u7528\u8005\u4F7F\u7528\u67D0\u4E9B\u7EC4\u4EF6\uFF08\u5982\u641C\u7D22\u7684\u91CD\u7F6E\u6309\u94AE\u3001\u5F39\u7A97\u7684\u53D6\u6D88\u6309\u94AE\uFF09\u7B49\u3002</p><h2 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3 <a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a></h2><p>\u8981\u8003\u8651\u5B50\u7EC4\u4EF6\u5C01\u88C5\u7684\u4FBF\u6377\u6027\u4E0E\u590D\u7528\u6027\u3002</p>`,49),o=[e];function t(c,r,i,d,D,y){return l(),a("div",null,o)}const C=s(p,[["render",t]]);export{h as __pageData,C as default};
