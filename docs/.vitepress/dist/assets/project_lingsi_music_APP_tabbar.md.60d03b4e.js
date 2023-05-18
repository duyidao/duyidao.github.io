import{_ as s,c as a,o as n,d as l}from"./app.ffc921c1.js";const C=JSON.parse('{"title":"tabbar\u9875","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"t","7":"a","8":"b","9":"b","10":"a","11":"r","12":"\u9875"},"headers":[{"level":2,"title":"\u9996\u9875\u8F6E\u64AD\u56FE\u8DF3\u8F6C","slug":"\u9996\u9875\u8F6E\u64AD\u56FE\u8DF3\u8F6C","link":"#\u9996\u9875\u8F6E\u64AD\u56FE\u8DF3\u8F6C","children":[]},{"level":2,"title":"tabbar\u9690\u85CF","slug":"tabbar\u9690\u85CF","link":"#tabbar\u9690\u85CF","children":[]}],"relativePath":"project/lingsi/music/APP/tabbar.md"}'),p={name:"project/lingsi/music/APP/tabbar.md"},o=l(`<h1 id="tabbar\u9875" tabindex="-1">tabbar\u9875 <a class="header-anchor" href="#tabbar\u9875" aria-hidden="true">#</a></h1><p>\u4E3B\u9875\u9762 <code>tabBar</code> \u9875\u9762\u6839\u636E\u9AD8\u4FDD\u771F\u539F\u578B\u56FE\u8BBE\u8BA1\u5F00\u53D1\u5373\u53EF\u3002</p><h2 id="\u9996\u9875\u8F6E\u64AD\u56FE\u8DF3\u8F6C" tabindex="-1">\u9996\u9875\u8F6E\u64AD\u56FE\u8DF3\u8F6C <a class="header-anchor" href="#\u9996\u9875\u8F6E\u64AD\u56FE\u8DF3\u8F6C" aria-hidden="true">#</a></h2><p>\u7528\u6237\u6709\u4E00\u4E2A\u9700\u6C42\u662F\u70B9\u51FB\u8F6E\u64AD\u56FE\u7684\u56FE\u7247\u8DF3\u8F6C\u5230\u6307\u5B9A\u94FE\u63A5\u9875\u9762\uFF0Cuniapp \u6709\u4E00\u4E2A\u5185\u7F6E\u7684\u7EC4\u4EF6 <a href="https://uniapp.dcloud.net.cn/component/web-view.html#web-view" target="_blank" rel="noreferrer">webview</a> \u3002\u6839\u636E\u5B98\u65B9\u6587\u6863\uFF0C\u4E3A\u5176 <code>src</code> \u8BBE\u7F6E\u6307\u5B9A\u7684\u7F51\u9875\u94FE\u63A5\u540E\u53EF\u8DF3\u8F6C\u5230\u8BE5\u9875\u9762\u3002\u53EF\u80FD\u5E38\u7528\u5C5E\u6027\u5982\u4E0B\uFF1A</p><table><thead><tr><th>\u5C5E\u6027\u540D</th><th>\u7C7B\u578B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>src</td><td>String</td><td>webview \u6307\u5411\u7F51\u9875\u7684\u94FE\u63A5</td></tr><tr><td>webview-styles</td><td>Object</td><td>webview \u7684\u6837\u5F0F</td></tr></tbody></table><p>\u66F4\u591A\u5C5E\u6027\u524D\u5F80\u5B98\u7F51\u67E5\u770B</p><ul><li>\u70B9\u51FB\u8F6E\u64AD\u56FE\u8DEF\u7531\u8DF3\u8F6C</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> swiperToPage </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">e</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5982\u679C\u6709\u53C2\u6570\u518D\u8DF3\u8F6C</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">e</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">return</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">navigateTo</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		url</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">/pages/routerWebView/RouterWebView?src=</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">}\`</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><ul><li>\u62FF\u5230\u94FE\u63A5\u53C2\u6570\u8D4B\u7ED9 src \u5C5E\u6027</li></ul><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">ref</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> webviewStyles </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">top</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> src </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">onLoad</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">val</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">src</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">val</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">web-view</span><span style="color:#89DDFF;"> :</span><span style="color:#C792EA;">webview-styles</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">webviewStyles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> :</span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">src</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">web-view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u66F4\u591A <code>webview</code> \u4F7F\u7528\u6280\u5DE7\u53EF\u53C2\u8003\u5B98\u7F51\u6587\u6863\u3001DCloud\u4E0A\u7684\u95EE\u7B54 <a href="https://ask.dcloud.net.cn/article/35083" target="_blank" rel="noreferrer">\u5728web-view\u52A0\u8F7D\u7684\u672C\u5730\u53CA\u8FDC\u7A0BHTML\u4E2D\u8C03\u7528uni\u7684API\u53CA\u7F51\u9875\u548Cvue\u9875\u9762\u901A\u8BAF</a> \u4E0E\u8FD9\u4E24\u7BC7\u6587\u7AE0 <a href="https://www.kancloud.cn/xiaoyulive/uniapp/1849196" target="_blank" rel="noreferrer">\u5728uniapp\u4E2D\u4F18\u96C5\u5730\u4F7F\u7528WebView</a> \u3001 <a href="https://blog.csdn.net/qq_40716795/article/details/127576627" target="_blank" rel="noreferrer">webview\u4F7F\u7528</a> \u3002</p><h2 id="tabbar\u9690\u85CF" tabindex="-1">tabbar\u9690\u85CF <a class="header-anchor" href="#tabbar\u9690\u85CF" aria-hidden="true">#</a></h2><p>\u539F\u751F <code>tabbar</code> \u5C42\u7EA7\u6781\u9AD8\uFF0C\u5373\u4F7F\u901A\u8FC7 <code>css</code> \u4E3A\u5143\u7D20\u8BBE\u7F6E <code>z-index</code> \u4E3A9999\u90FD\u65E0\u6CD5\u8986\u76D6\u3002\u800C\u672C\u9879\u76EE\u4E2D\u9700\u8981\u8FDB\u5165\u9875\u9762\u5224\u65AD\u7528\u6237\u662F\u5426\u590D\u5236\u4E86\u9886\u53D6\u4F18\u60E0\u5238\u7684\u7801\uFF0C\u5982\u679C\u6709\u5219\u4E0D\u5C55\u793A\u4E0B\u65B9\u7684 <code>tabbar</code> \u3002\u4E0D\u7136\u4F1A\u6709\u4E00\u4E2A <code>bug</code> \uFF1A\u5728\u9996\u9875\u5C55\u793A\u4E86\u9886\u53D6\u4F18\u60E0\u5238\u7684\u6A21\u6001\u6846\uFF0C\u4E0D\u70B9\u51FB\u53BB\u5F80\u6211\u7684\u9875\u9762\uFF0C\u6211\u7684\u9875\u9762\u4E5F\u5C55\u793A\u3002\u8FD4\u56DE\u9996\u9875\u53D6\u6D88\u6389\u6A21\u6001\u6846\u540E\u6211\u7684\u9875\u9762\u7684\u6A21\u6001\u6846\u5E76\u6CA1\u6709\u53D6\u6D88\u6389\u3002</p><p>\u5982\u679C\u65E0\u6CD5\u4ECE\u5C42\u7EA7\u65B9\u9762\u4E0B\u624B\uFF0C\u80FD\u5426\u4ECE\u663E\u9690\u65B9\u9762\u5462\uFF1F\u67E5\u770B\u5B98\u65B9\u6587\u6863\u53D1\u73B0\u6709\u5BF9\u5E94\u7684\u663E\u793A <code>tabbar</code> \u65B9\u6CD5 <code>showTabBar()</code> \u548C\u9690\u85CF <code>tabbar</code> \u65B9\u6CD5 <code>hideTabBar()</code> \u3002</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#82AAFF;">onShow</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">\u5982\u679C\u6709\u590D\u5236\u5230\u4F18\u60E0\u5238\u7801</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hideTabBar</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getStorageSync</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">couponShow</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">			</span><span style="color:#676E95;">// \u505A\u5176\u4ED6\u5904\u7406</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">500</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> closeFn </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">	</span><span style="color:#676E95;">// \u79FB\u51FA\u672C\u5730\u5B58\u50A8\uFF0C\u6E05\u9664\u590D\u5236\u7684\u5185\u5BB9\uFF0C\u9690\u85CF\u5F39\u7A97</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">removeStorageSync</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">couponShow</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setClipboardData</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		data</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">		showToast</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#82AAFF;">success</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">show</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">showTabBar</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u73B0\u5728\u7684\u6548\u679C\u5982\u4E0B\u6240\u793A\uFF1A</p><p><a href="https://imgse.com/i/p9gWBi4" target="_blank" rel="noreferrer"><img src="https://s1.ax1x.com/2023/05/15/p9gWBi4.png" alt="p9gWBi4.png"></a></p>`,17),e=[o];function t(c,r,F,y,D,i){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{C as __pageData,d as default};