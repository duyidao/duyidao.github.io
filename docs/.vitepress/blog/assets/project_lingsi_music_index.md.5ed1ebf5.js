import{_ as e,c as l,o as s,d as a}from"./app.67d6aa47.js";const u=JSON.parse('{"title":"\u9879\u76EE","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"\u97F3","7":"\u679C","8":"\u4E91","9":"\u97F3"},"headers":[{"level":2,"title":"\u6280\u672F\u6808","slug":"\u6280\u672F\u6808","link":"#\u6280\u672F\u6808","children":[]},{"level":2,"title":"\u91CD\u70B9\u76EE\u5F55","slug":"\u91CD\u70B9\u76EE\u5F55","link":"#\u91CD\u70B9\u76EE\u5F55","children":[]},{"level":2,"title":"\u9047\u5230\u7684\u95EE\u9898","slug":"\u9047\u5230\u7684\u95EE\u9898","link":"#\u9047\u5230\u7684\u95EE\u9898","children":[]},{"level":2,"title":"\u9879\u76EE\u4EAE\u70B9","slug":"\u9879\u76EE\u4EAE\u70B9","link":"#\u9879\u76EE\u4EAE\u70B9","children":[]}],"relativePath":"project/lingsi/music/index.md"}'),o={name:"project/lingsi/music/index.md"},n=a(`<h1 id="\u9879\u76EE" tabindex="-1">\u9879\u76EE <a class="header-anchor" href="#\u9879\u76EE" aria-hidden="true">#</a></h1><p>\u8BE5\u9879\u76EE\u540D\u79F0\u4E3A\u97F3\u679C\u4E91\u97F3\u3002</p><h2 id="\u6280\u672F\u6808" tabindex="-1">\u6280\u672F\u6808 <a class="header-anchor" href="#\u6280\u672F\u6808" aria-hidden="true">#</a></h2><ul><li><code>uni-app</code> \u6846\u67B6</li><li><code>vue3</code> + <code>pinia</code></li><li><code>uview</code> \u7EC4\u4EF6\u5E93</li></ul><h2 id="\u91CD\u70B9\u76EE\u5F55" tabindex="-1">\u91CD\u70B9\u76EE\u5F55 <a class="header-anchor" href="#\u91CD\u70B9\u76EE\u5F55" aria-hidden="true">#</a></h2><ol><li>\u767B\u5F55\u9875</li><li><code>tabBar</code>\u9875\uFF08\u9996\u9875\u3001\u5546\u57CE\u3001\u5408\u4F5C\u3001\u6211\u7684\uFF09</li><li>\u8BE6\u60C5\u9875\uFF08\u97F3\u9891\u8BE6\u60C5\u3001\u8BFE\u7A0B\u8BE6\u60C5\u3001\u6D3B\u52A8\u8BE6\u60C5\u3001\u5408\u4F5C\u8BE6\u60C5\uFF09</li><li>\u6211\u8981\u6D4B\u8BD5\u9875</li><li>\u5206\u4EAB\u9875</li><li>\u4E2A\u4EBA\u4E2D\u5FC3\u9875</li><li>\u63A8\u5E7F\u4E2D\u5FC3\u9875</li><li>\u7EC8\u7AEF\u64CD\u4F5C\u9875</li><li>\u552E\u540E\u9875\u9762</li><li>\u5176\u4F59\u529F\u80FD\u9875\u9762\xB7\xB7\xB7\xB7\xB7\xB7</li></ol><h2 id="\u9047\u5230\u7684\u95EE\u9898" tabindex="-1">\u9047\u5230\u7684\u95EE\u9898 <a class="header-anchor" href="#\u9047\u5230\u7684\u95EE\u9898" aria-hidden="true">#</a></h2><ol><li><p>\u82F9\u679C\u4E0A\u67B6 \u8BE5\u9879\u76EE\u6709\u4F63\u91D1\u63A8\u5E7F\u6A21\u5757\u4E0E\u865A\u62DF\u5546\u54C1\u8D2D\u4E70\u6A21\u5757\uFF0C\u5BFC\u81F4\u82F9\u679C\u5546\u57CE\u4E0A\u67B6\u4E0D\u6210\u529F\uFF0C\u7ECF\u8FC7\u8BA8\u8BBA\u51B3\u5B9A\u82F9\u679C\u624B\u673A\u4E0A\u628A\u8FD9\u4E9B\u6A21\u5757\u9690\u85CF\u3002\u5224\u65AD\u7528\u6237\u4F7F\u7528\u7684\u8BBE\u5907\u662F\u5426\u4E3A\u82F9\u679C\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> is_iOS </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getSystemInfoSync</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">platform</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ios</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;"> 	   </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;"> 	   </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></li><li></li></ol><h2 id="\u9879\u76EE\u4EAE\u70B9" tabindex="-1">\u9879\u76EE\u4EAE\u70B9 <a class="header-anchor" href="#\u9879\u76EE\u4EAE\u70B9" aria-hidden="true">#</a></h2><ul><li>\u4F7F\u7528 <code>uni.createInnerAudioContext()</code> \u97F3\u9891\u7EC4\u4EF6\u63A7\u5236\u64AD\u653E\u97F3\u9891\u3002 <ol><li>\u901A\u8FC7 <code>src</code> \u5B57\u6BB5\u6DFB\u52A0\u94FE\u63A5\uFF1B\u8BBE\u7F6E <code>startTime</code> \u5F00\u59CB\u4F7F\u7528</li><li>\u901A\u8FC7\u5FAA\u73AF\u7684\u65B9\u5F0F\u52A8\u6001\u6B21\u6570\u5FAA\u73AF\u64AD\u653E\u97F3\u9891</li><li>\u901A\u8FC7 <code>play()</code> \u4E8B\u4EF6\u64AD\u653E\u97F3\u9891\uFF0C<code>pause()</code> \u4E8B\u4EF6\u6682\u505C\u97F3\u9891\uFF0C<code>stop()</code> \u4E8B\u4EF6\u505C\u6B62\u97F3\u9891\uFF0C <code>seek()</code> \u4E8B\u4EF6\u5207\u6362\u97F3\u9891\u5F53\u524D\u64AD\u653E\u4F4D\u7F6E\uFF0C <code>onEnded()</code> \u76D1\u542C\u97F3\u9891\u505C\u6B62\u65F6\u95F4\uFF0C <code>onTimeUpdate()</code> \u52A8\u6001\u83B7\u53D6\u97F3\u9891\u5F53\u524D\u64AD\u653E\u4F4D\u7F6E\u3002</li><li>\u6839\u636E\u4F7F\u7528\u8005\u662F\u5426\u542C\u97F3\u9891\u6765\u52A8\u6001\u589E\u52A0\u51CF\u5C11\u5F53\u524D\u97F3\u9891\u5728\u542C\u4EBA\u6570\uFF0C\u901A\u8FC7\u6682\u5B9A\u3001\u505C\u6B62\u3001\u7ED3\u675F\u4E8B\u4EF6\u8C03\u7528\u540E\u7AEF\u63A5\u53E3\u4F20\u9012\u8BB0\u5F55\u5F53\u524D\u4F7F\u7528\u8005\u542C\u8BE5\u97F3\u9891\u7684\u65F6\u957F\u3002</li></ol></li><li>\u4F7F\u7528 <code>canvas</code> \u753B\u5E03\u7ED8\u5236\u6D77\u62A5\u5E76\u751F\u6210\u56FE\u7247\u4FDD\u5B58\u5230\u624B\u673A\u76F8\u518C\u3002 <ol><li>\u901A\u8FC7 <code>canvas</code> \u6807\u7B7E\u4EE5\u53CA <code>uni.createCanvasContext</code> \u65B9\u6CD5\u751F\u6210\u6D77\u62A5\u3002</li><li>\u901A\u8FC7 <code>uni.canvasToTempFilePath</code> \u65B9\u6CD5\u628A\u753B\u5E03\u8F6C\u4E3A\u56FE\u7247\u3002</li><li>\u901A\u8FC7 <code>uni.saveImageToPhotosAlbum</code> \u65B9\u6CD5\u628A\u56FE\u7247\u4FDD\u5B58\u5230\u624B\u673A\u76F8\u518C\u4E2D\u3002</li></ol></li><li>\u4F7F\u7528 <code>uniapp</code> \u5185\u7F6E <code>API</code> \u5B9E\u73B0\u84DD\u7259\u641C\u7D22\u4E0E\u4F4E\u529F\u8017\u84DD\u7259\u8FDE\u63A5\u8BFB\u5199\u529F\u80FD\uFF1B\u4F7F\u7528 <code>uniapp</code> \u5185\u7F6E <code>API</code> \u5B9E\u73B0\u626B\u4E00\u626B\u529F\u80FD\u3002\u8BE6\u7EC6\u4FE1\u606F\u8BF7\u89C1\u300A\u64CD\u4F5C\u9875\u300B\u5185\u5BB9\u3002</li><li>\u901A\u8FC7 <code>uni.requestPayment</code> \u65B9\u6CD5\u5B9E\u73B0\u652F\u4ED8\u529F\u80FD <ol><li>\u8C03\u7528\u540E\u7AEF\u63A5\u53E3\u521B\u5EFA\u8BA2\u5355\u83B7\u53D6\u8BA2\u5355\u7F16\u53F7</li><li>\u8C03\u7528\u540E\u7AEF\u652F\u4ED8\u63A5\u53E3\u83B7\u53D6\u5BF9\u5E94sdk</li><li>\u4F7F\u7528 <code>uni.requestPayment</code> \u65B9\u6CD5\u8C03\u8D77\u652F\u4ED8\uFF0C\u5176\u4E2D\uFF0C\u5C5E\u6027 <code>provider</code> \u4E3A\u652F\u4ED8\u670D\u52A1\u63D0\u4F9B\u5546\u3002\u5982\u652F\u4ED8\u5B9D\u652F\u4ED8\u53C2\u6570\u4E3A <code>alipay</code>\uFF0C\u5FAE\u4FE1\u652F\u4ED8\u4E3A <code>wxpay</code></li></ol></li><li>\u52A8\u6001\u8BBE\u7F6E\u7528\u6237\u526A\u5207\u677F\u5185\u5BB9\uFF0C\u5B9E\u73B0\u5546\u54C1\u94FE\u63A5\u7684\u4FDD\u5B58\u5206\u4EAB <ol><li>\u901A\u8FC7 <code>uni.setClipboardData</code> \u8BBE\u7F6E\u7CFB\u7EDF\u526A\u8D34\u677F\u7684\u5185\u5BB9\uFF0C\u5176\u4E2D\uFF0C<code>data</code> \u5C5E\u6027\u7684\u53C2\u6570\u4E3A\u8981\u8BBE\u7F6E\u7684\u5185\u5BB9\u3002</li><li>\u901A\u8FC7 <code>uni.getClipboardData</code>\u83B7\u53D6\u7CFB\u7EDF\u526A\u8D34\u677F\u7684\u5185\u5BB9\u3002</li></ol></li></ul>`,10),c=[n];function i(p,t,d,r,F,y){return s(),l("div",null,c)}const h=e(o,[["render",i]]);export{u as __pageData,h as default};
