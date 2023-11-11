import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const d=JSON.parse('{"title":"JSON 编辑器的使用","description":"","frontmatter":{},"headers":[],"relativePath":"project/lingsi/elk/edit_JSON.md","filePath":"project/lingsi/elk/edit_JSON.md","lastUpdated":null}'),p={name:"project/lingsi/elk/edit_JSON.md"},o=l(`<h1 id="json-编辑器的使用" tabindex="-1">JSON 编辑器的使用 <a class="header-anchor" href="#json-编辑器的使用" aria-label="Permalink to &quot;JSON 编辑器的使用&quot;">​</a></h1><p>vue-json-editor 是一个 json 编辑器，能够格式化 json 数据，同时也支持编辑功能。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vue-json-editor</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--save</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vue-json-editor</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--save</span></span></code></pre></div><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h2><ol><li>引入模块</li><li>注册组件</li><li>使用</li></ol><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> vueJsonEditor </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue-json-editor&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> vueJsonEditor </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue-json-editor&#39;</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">components</span><span style="color:#E1E4E8;">: { vueJsonEditor }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">components</span><span style="color:#24292E;">: { vueJsonEditor }</span></span></code></pre></div><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">vue-json-editor</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">searchJSON</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  :</span><span style="color:#B392F0;">showBtns</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">false</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">mode</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;code&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;zh&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">/&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">vue-json-editor</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">v-model</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">searchJSON</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">  :</span><span style="color:#6F42C1;">showBtns</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">false</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">mode</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;code&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;zh&quot;</span></span>
<span class="line"><span style="color:#24292E;">/&gt;</span></span></code></pre></div><h2 id="可用参数" tabindex="-1">可用参数 <a class="header-anchor" href="#可用参数" aria-label="Permalink to &quot;可用参数&quot;">​</a></h2><ul><li>v-model：双向绑定的数据</li><li>show-btns：是否显示按钮</li><li>mode：模式：tree text form code等</li><li>lang：语言</li><li>expandedOnStart：初始化时，是否自动展开</li></ul><h2 id="可用事件" tabindex="-1">可用事件 <a class="header-anchor" href="#可用事件" aria-label="Permalink to &quot;可用事件&quot;">​</a></h2><ul><li>json-change：json 改变时，触发的事件</li><li>json-save：json 保存事件</li><li>has-error：出现错误时，触发的事件</li></ul><h2 id="整体测试代码" tabindex="-1">整体测试代码 <a class="header-anchor" href="#整体测试代码" aria-label="Permalink to &quot;整体测试代码&quot;">​</a></h2><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#B392F0;"> style</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;width: 70%;margin-left: 30px;margin-top: 30px;&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">vue-json-editor</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;resultInfo&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">:showBtns</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">:mode</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;&#39;code&#39;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">@json-change</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;onJsonChange&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">@json-save</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;onJsonSave&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">@has-error</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;onError&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">br</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">el-button</span><span style="color:#B392F0;"> type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;primary&quot;</span><span style="color:#B392F0;"> @click</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkJson&quot;</span><span style="color:#E1E4E8;">&gt;确定&lt;/</span><span style="color:#85E89D;">el-button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 导入模块</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> vueJsonEditor </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue-json-editor&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 注册组件</span></span>
<span class="line"><span style="color:#E1E4E8;">    components: { vueJsonEditor },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        hasJsonFlag:</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,  </span><span style="color:#6A737D;">// json是否验证通过</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// json数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        resultInfo: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&#39;employees&#39;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">            {</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;firstName&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Bill&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;lastName&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Gates&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            {</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;firstName&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;George&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;lastName&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Bush&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            {</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;firstName&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Thomas&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;lastName&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Carter&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          ]</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onJsonChange</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// console.log(&#39;更改value:&#39;, value);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 实时保存</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">onJsonSave</span><span style="color:#E1E4E8;">(value)</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onJsonSave</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// console.log(&#39;保存value:&#39;, value);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.resultInfo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.hasJsonFlag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onError</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// console.log(&quot;json错误了value:&quot;, value);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.hasJsonFlag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 检查json</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">checkJson</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.hasJsonFlag </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// console.log(&quot;json验证失败&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// this.$message.error(&quot;json验证失败&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;json验证失败&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// console.log(&quot;json验证成功&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// this.$message.success(&quot;json验证成功&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;json验证成功&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#6F42C1;"> style</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;width: 70%;margin-left: 30px;margin-top: 30px;&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">vue-json-editor</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">v-model</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;resultInfo&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">:showBtns</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">:mode</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;&#39;code&#39;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">@json-change</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;onJsonChange&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">@json-save</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;onJsonSave&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">@has-error</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;onError&quot;</span></span>
<span class="line"><span style="color:#24292E;">  /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">br</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">el-button</span><span style="color:#6F42C1;"> type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;primary&quot;</span><span style="color:#6F42C1;"> @click</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkJson&quot;</span><span style="color:#24292E;">&gt;确定&lt;/</span><span style="color:#22863A;">el-button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 导入模块</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> vueJsonEditor </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue-json-editor&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 注册组件</span></span>
<span class="line"><span style="color:#24292E;">    components: { vueJsonEditor },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        hasJsonFlag:</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,  </span><span style="color:#6A737D;">// json是否验证通过</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// json数据</span></span>
<span class="line"><span style="color:#24292E;">        resultInfo: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&#39;employees&#39;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">            {</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;firstName&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Bill&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;lastName&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Gates&#39;</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            {</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;firstName&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;George&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;lastName&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Bush&#39;</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            {</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;firstName&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Thomas&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;lastName&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Carter&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          ]</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    methods: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onJsonChange</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// console.log(&#39;更改value:&#39;, value);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 实时保存</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">onJsonSave</span><span style="color:#24292E;">(value)</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onJsonSave</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// console.log(&#39;保存value:&#39;, value);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.resultInfo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.hasJsonFlag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onError</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// console.log(&quot;json错误了value:&quot;, value);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.hasJsonFlag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 检查json</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">checkJson</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.hasJsonFlag </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// console.log(&quot;json验证失败&quot;)</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// this.$message.error(&quot;json验证失败&quot;)</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;json验证失败&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// console.log(&quot;json验证成功&quot;)</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// this.$message.success(&quot;json验证成功&quot;)</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;json验证成功&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,15),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{d as __pageData,h as default};
