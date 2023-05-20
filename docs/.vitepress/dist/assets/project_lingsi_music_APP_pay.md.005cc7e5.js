import{_ as s,c as n,o as a,d as l}from"./app.bddef87a.js";const A=JSON.parse('{"title":"\u652F\u4ED8","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"\u652F","7":"\u4ED8","8":"\u9875"},"headers":[{"level":2,"title":"\u5FAE\u4FE1\u652F\u4ED8","slug":"\u5FAE\u4FE1\u652F\u4ED8","link":"#\u5FAE\u4FE1\u652F\u4ED8","children":[]},{"level":2,"title":"\u652F\u4ED8\u5B9D\u652F\u4ED8","slug":"\u652F\u4ED8\u5B9D\u652F\u4ED8","link":"#\u652F\u4ED8\u5B9D\u652F\u4ED8","children":[]},{"level":2,"title":"\u6CE8\u610F\u4E8B\u9879","slug":"\u6CE8\u610F\u4E8B\u9879","link":"#\u6CE8\u610F\u4E8B\u9879","children":[{"level":3,"title":"manifest.json\u914D\u7F6E\u76F8\u5173\u53C2\u6570","slug":"manifest-json\u914D\u7F6E\u76F8\u5173\u53C2\u6570","link":"#manifest-json\u914D\u7F6E\u76F8\u5173\u53C2\u6570","children":[]}]}],"relativePath":"project/lingsi/music/APP/pay.md"}'),p={name:"project/lingsi/music/APP/pay.md"},o=l(`<h1 id="\u652F\u4ED8" tabindex="-1">\u652F\u4ED8 <a class="header-anchor" href="#\u652F\u4ED8" aria-hidden="true">#</a></h1><p>\u6839\u636E\u540E\u7AEF\u7684\u63A5\u53E3\u6587\u6863\uFF0C\u652F\u4ED8\u6A21\u5757\u9700\u8981\u8C03\u7528\u4E24\u4E2A\u63A5\u53E3\uFF1A</p><ol><li><p>\u521B\u5EFA\u8BA2\u5355</p><p>\u521B\u5EFA\u6210\u529F\u540E\u4F1A\u8FD4\u56DE\u76F8\u5E94\u7684\u8BA2\u5355\u7F16\u53F7</p></li><li><p>\u652F\u4ED8</p><p>\u62FF\u5230\u8BA2\u5355\u7F16\u53F7\u540E\u8C03\u7528\u652F\u4ED8\u63A5\u53E3</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u70B9\u51FB\u652F\u4ED8\u6309\u94AE</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> toPayFn </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">checked</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">showToast</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      title</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u8BF7\u9009\u62E9\u652F\u4ED8\u65B9\u5F0F</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      icon</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">error</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">//\u53D1\u8D77\u521B\u5EFA\u8BA2\u5355\u63A5\u53E3\u8BF7\u6C42</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">shopStore</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">payFn</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">\u4F20\u53C2</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">switch</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">checked</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">case</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">wxpay</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">showToast</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">          title</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u6682\u672A\u652F\u6301\u5FAE\u4FE1\u652F\u4ED8</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">          icon</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">none</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">break</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">case</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">alipay</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">realPay</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">break</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">default</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">break</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div></li></ol><h2 id="\u5FAE\u4FE1\u652F\u4ED8" tabindex="-1">\u5FAE\u4FE1\u652F\u4ED8 <a class="header-anchor" href="#\u5FAE\u4FE1\u652F\u4ED8" aria-hidden="true">#</a></h2><p>\u7531\u4E8E\u9879\u76EE\u5BA2\u6237\u672A\u7533\u8BF7\u5230\u5FAE\u4FE1\u5F00\u53D1\u8005\u8D26\u53F7\uFF0C\u56E0\u6B64\u6682\u65F6\u65E0\u6CD5\u5B9E\u73B0\u6B64\u4E1A\u52A1\u3002</p><h2 id="\u652F\u4ED8\u5B9D\u652F\u4ED8" tabindex="-1">\u652F\u4ED8\u5B9D\u652F\u4ED8 <a class="header-anchor" href="#\u652F\u4ED8\u5B9D\u652F\u4ED8" aria-hidden="true">#</a></h2><ul><li>\u8C03\u7528\u652F\u4ED8\u63A5\u53E3\u83B7\u53D6\u56DE\u8C03\u53C2\u6570 <code>alipay sdk</code></li><li>\u901A\u8FC7 <code>uni.requestPayment</code> \u8C03\u7528\u652F\u4ED8\u5B9D\u652F\u4ED8</li></ul><p><strong>\u53C2\u6570\u8BF4\u660E</strong></p><table><thead><tr><th>\u53C2\u6570\u540D</th><th>\u7C7B\u578B</th><th>\u5FC5\u586B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td><code>provider</code></td><td><code>String</code></td><td>\u662F</td><td>\u670D\u52A1\u63D0\u4F9B\u5546\uFF0C\u901A\u8FC7 <a href="https://uniapp.dcloud.net.cn/api/plugins/provider" target="_blank" rel="noreferrer">uni.getProvider</a> \u83B7\u53D6\u3002</td></tr><tr><td><code>orderInfo</code></td><td><code>String/Object</code></td><td>\u662F</td><td>\u8BA2\u5355\u6570\u636E\uFF0C<a href="https://uniapp.dcloud.net.cn/api/plugins/payment#orderinfo" target="_blank" rel="noreferrer">\u6CE8\u610F\u4E8B\u9879</a></td></tr><tr><td><code>timeStamp</code></td><td><code>String</code></td><td>\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u5FC5\u586B</td><td>\u65F6\u95F4\u6233\u4ECE1970\u5E741\u67081\u65E5\u81F3\u4ECA\u7684\u79D2\u6570\uFF0C\u5373\u5F53\u524D\u7684\u65F6\u95F4\u3002</td></tr><tr><td><code>nonceStr</code></td><td><code>String</code></td><td>\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u5FC5\u586B</td><td>\u968F\u673A\u5B57\u7B26\u4E32\uFF0C\u957F\u5EA6\u4E3A32\u4E2A\u5B57\u7B26\u4EE5\u4E0B\u3002</td></tr><tr><td><code>package</code></td><td><code>String</code></td><td>\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u5FC5\u586B</td><td>\u7EDF\u4E00\u4E0B\u5355\u63A5\u53E3\u8FD4\u56DE\u7684 prepay_id \u53C2\u6570\u503C\uFF0C\u63D0\u4EA4\u683C\u5F0F\u5982\uFF1Aprepay_id=xx\u3002</td></tr><tr><td><code>signType</code></td><td><code>String</code></td><td>\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u5FC5\u586B</td><td>\u7B7E\u540D\u7B97\u6CD5\uFF0C\u5E94\u4E0E\u540E\u53F0\u4E0B\u5355\u65F6\u7684\u503C\u4E00\u81F4</td></tr><tr><td><code>paySign</code></td><td><code>String</code></td><td>\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u5FC5\u586B</td><td>\u7B7E\u540D\uFF0C\u5177\u4F53\u7B7E\u540D\u65B9\u6848\u53C2\u89C1 <a href="https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&amp;index=3" target="_blank" rel="noreferrer">\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u652F\u4ED8\u6587\u6863</a></td></tr><tr><td><code>bannedChannels</code></td><td><code>Array&lt;String&gt;</code></td><td>\u5426</td><td>\u9700\u8981\u9690\u85CF\u7684\u652F\u4ED8\u65B9\u5F0F\uFF0C\u8BE6\u89C1 <a href="https://smartprogram.baidu.com/docs/develop/api/open_payment/#requestPolymerPayment/" target="_blank" rel="noreferrer">\u767E\u5EA6\u5C0F\u7A0B\u5E8F\u652F\u4ED8\u6587\u6863</a></td></tr></tbody></table><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> realPay </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">shopStore</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">orderPayFn</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    orderNo</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">\u540E\u7AEF\u8FD4\u56DE\u7684\u8BA2\u5355\u7F16\u53F7</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    provider</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">provider</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">resu</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">//\u8C03\u7528uniapp API uni.requestPayment \u652F\u4ED8\u63A5\u53E3</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">requestPayment</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      provider</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">alipay</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">//\u540E\u53F0\u8FD4\u56DE\u7684\u8BA2\u5355\u6570\u636E</span></span>
<span class="line"><span style="color:#F07178;">      orderInfo</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">xxx</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// \u540E\u7AEF\u8FD4\u56DE\u7684\u652F\u4ED8\u5B9Dsdk</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">//\u8C03\u7528\u6210\u529F\u7684\u56DE\u8C03</span></span>
<span class="line"><span style="color:#F07178;">      success</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">success</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">showToast</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">          title</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u652F\u4ED8\u6210\u529F</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">          icon</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">success</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">//\u8C03\u7528\u5931\u8D25\u7684\u56DE\u8C03</span></span>
<span class="line"><span style="color:#F07178;">      fail</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">uni</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">showToast</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">          title</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">errMsg</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">split</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">]</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)[</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">          icon</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">none</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="\u6CE8\u610F\u4E8B\u9879" tabindex="-1">\u6CE8\u610F\u4E8B\u9879 <a class="header-anchor" href="#\u6CE8\u610F\u4E8B\u9879" aria-hidden="true">#</a></h2><h3 id="manifest-json\u914D\u7F6E\u76F8\u5173\u53C2\u6570" tabindex="-1">manifest.json\u914D\u7F6E\u76F8\u5173\u53C2\u6570 <a class="header-anchor" href="#manifest-json\u914D\u7F6E\u76F8\u5173\u53C2\u6570" aria-hidden="true">#</a></h3><ol><li>\u5728manifest.json - App\u6A21\u5757\u6743\u9650\u9009\u62E9 \u4E2D\u52FE\u9009 payment(\u652F\u4ED8)</li><li>\u5728 manifest.json - App SDK\u914D\u7F6E \u4E2D\uFF0C\u52FE\u9009\u9700\u8981\u7684\u652F\u4ED8\u5E73\u53F0\uFF0C\u76EE\u524D\u6709\u5FAE\u4FE1\u652F\u4ED8\u3001\u652F\u4ED8\u5B9D\u652F\u4ED8\u3001\u82F9\u679C\u5E94\u7528\u5185\u652F\u4ED8(IAP)\uFF0C\u5176\u4E2D\u5FAE\u4FE1\u652F\u4ED8\u9700\u8981\u586B\u5199\u4ECE\u5FAE\u4FE1\u5F00\u653E\u5E73\u53F0\u83B7\u53D6\u7684AppID</li><li>\u8FD9\u4E9B\u914D\u7F6E\u9700\u8981\u6253\u5305\u751F\u6548\uFF0C\u771F\u673A\u8FD0\u884C\u4ECD\u7136\u662FHBuilder\u57FA\u5EA7\u7684\u8BBE\u7F6E\uFF0C\u53EF\u4F7F\u7528\u81EA\u5B9A\u4E49\u57FA\u5EA7\u8C03\u8BD5\u3002\u79BB\u7EBF\u6253\u5305\u8BF7\u53C2\u8003\u79BB\u7EBF\u6253\u5305\u6587\u6863\u5728\u539F\u751F\u5DE5\u7A0B\u4E2D\u914D\u7F6E\u3002</li><li>\u914D\u7F6E\u5E76\u6253\u5305\u540E\uFF0C\u901A\u8FC7 <code>uni.getProvider</code> \u53EF\u4EE5\u5F97\u5230\u914D\u7F6E\u7684\u7ED3\u679C\u5217\u8868\uFF0C\u6CE8\u610F\u8FD9\u91CC\u8FD4\u56DE\u7684\u662Fmanifest\u914D\u7F6E\u7684\uFF0C\u4E0E\u624B\u673A\u7AEF\u662F\u5426\u5B89\u88C5\u5FAE\u4FE1\u3001\u652F\u4ED8\u5B9D\u65E0\u5173\u3002</li></ol>`,13),e=[o];function t(c,r,F,y,D,i){return a(),n("div",null,e)}const C=s(p,[["render",t]]);export{A as __pageData,C as default};