import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const q=JSON.parse('{"title":"分包","description":"","frontmatter":{},"headers":[],"relativePath":"project/myself/小兔鲜/inuni/pagesmember.md","filePath":"project/myself/小兔鲜/inuni/pagesmember.md","lastUpdated":null}'),o={name:"project/myself/小兔鲜/inuni/pagesmember.md"},p=l(`<h1 id="分包" tabindex="-1">分包 <a class="header-anchor" href="#分包" aria-label="Permalink to &quot;分包&quot;">​</a></h1><p>小程序有大小限制，最大体积只能在4MB。在真实项目中，小程序的大小往往会超出这个范围，因此，通过分包可以有效减少小程序主包的体积。</p><p>分包还有另外一个好处，减少了主包的体积后加载速度能有效提高，这也是一种优化手段。</p><p>实现分包的步骤如下：</p><ol><li><p>新建一个文件夹，该文件夹下是某模块的所有分包。本项目文件夹名称为 <code>pagesmenber</code></p></li><li><p>新建一个分包页面，如设置页 <code>settings/index</code></p></li><li><p>在 <code>pages.json</code> 文件中设置分包，需要设置两个属性：</p><ul><li><p><code>subPackages</code></p><p>分包规则，数组格式，其中有两个属性。</p><ol><li><code>root</code> ：子包目录，即子包的文件夹名称</li><li><code>pages</code> ：页面的路径，设置方式和内容同 <code>pages</code></li></ol><p>代码如下所示：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 分包规则</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;subPackages&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 子包目录</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;root&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;pagesMember&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 页面路径</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;pages&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;setting/index&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;style&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">&quot;navigationBarTitleText&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;设置&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;profile/index&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;style&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">&quot;navigationStyle&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;custom&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">&quot;navigationBarTextStyle&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;white&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">&quot;navigationBarTitleText&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;个人信息&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">],</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 分包规则</span></span>
<span class="line"><span style="color:#032F62;">&quot;subPackages&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 子包目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;root&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;pagesMember&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 页面路径</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;pages&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;setting/index&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;style&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">&quot;navigationBarTitleText&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;设置&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;profile/index&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;style&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">&quot;navigationStyle&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;custom&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">&quot;navigationBarTextStyle&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;white&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">&quot;navigationBarTitleText&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;个人信息&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">],</span></span></code></pre></div><p>如果有多个分包模块，则在 <code>subPackages</code> 数组内设置多几个对象即可。</p></li><li><p><code>preloadRule</code></p><p>子包获取资源规则，用于设置某个子包在什么路由下获取资源，在什么网络下获取资源，<code>key</code> 是页面路径，<code>value</code> 是进入此页面的预下载配置，每个配置有以下几项：</p><table><thead><tr><th style="text-align:left;">字段</th><th style="text-align:left;">类型</th><th style="text-align:left;">必填</th><th style="text-align:left;">默认值</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;">packages</td><td style="text-align:left;">StringArray</td><td style="text-align:left;">是</td><td style="text-align:left;">无</td><td style="text-align:left;">进入页面后预下载分包的 <code>root</code> 或 <code>name</code>。<code>__APP__</code> 表示主包。</td></tr><tr><td style="text-align:left;">network</td><td style="text-align:left;">String</td><td style="text-align:left;">否</td><td style="text-align:left;">wifi</td><td style="text-align:left;">在指定网络下预下载，可选值为： <code>all</code>: 不限网络 <code>wifi</code>: 仅wifi下预下载</td></tr></tbody></table><p>代码如下所示：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;preloadRule&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;pages/my/index&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;network&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;all&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;packages&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;pagesMember&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;preloadRule&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;pages/my/index&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;network&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;all&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;packages&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;pagesMember&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这段代码表示进入我的页面之后就获取 <code>pagesMember</code> 文件夹下的分包资源，在任何网络下都获取。</p></li></ul></li></ol>`,5),t=[p];function e(c,r,E,y,i,u){return n(),a("div",null,t)}const g=s(o,[["render",e]]);export{q as __pageData,g as default};
