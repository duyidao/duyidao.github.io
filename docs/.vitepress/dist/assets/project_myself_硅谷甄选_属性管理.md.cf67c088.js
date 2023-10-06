import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.2ee92742.js";const F=JSON.parse('{"title":"属性管理","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"甄","7":"选","8":"属","9":"性","10":"管","11":"理"},"headers":[],"relativePath":"project/myself/硅谷甄选/属性管理.md","filePath":"project/myself/硅谷甄选/属性管理.md","lastUpdated":null}'),p={name:"project/myself/硅谷甄选/属性管理.md"},o=l(`<h1 id="属性管理" tabindex="-1">属性管理 <a class="header-anchor" href="#属性管理" aria-label="Permalink to &quot;属性管理&quot;">​</a></h1><p>属性管理模块主要实现功能如下：</p><ol><li>顶部三级分类联级选择</li><li>选择完三级分类后获取表格数据</li><li>表格数据的增删改</li></ol><p>效果如下所示：</p><p><img src="https://i.imgloc.com/2023/07/02/VRNA4H.png" alt="VRNA4H.png"></p><p>下面具体分析每个步骤。</p><h2 id="三级分类联级选择" tabindex="-1">三级分类联级选择 <a class="header-anchor" href="#三级分类联级选择" aria-label="Permalink to &quot;三级分类联级选择&quot;">​</a></h2><p>三级分类主要实现功能如下：</p><ol><li>选择完一级分类后，调用接口获取二级分类的选项数据</li><li>选择完二级分类后，调用接口获取三级分类的选择数据</li><li>选择完三级分类后，调用接口获取表格数据</li></ol><p>其中需要注意的点在于，用户未选择一级分类时，无法使用二、三级分类的选择器，应当处于禁用状态或提示用户。</p><p>如果用户选择完所有分类后重新选择一级分类，则已经保存的下级分类 id 与表格数据应该清除，而不是继续保留之前的数据。</p><p>而属性新增按钮需要在用户选择三级分类后才可使用，当三级分类 id 数据为空时，禁用该按钮的使用。</p><h2 id="属性值的增改" tabindex="-1">属性值的增改 <a class="header-anchor" href="#属性值的增改" aria-label="Permalink to &quot;属性值的增改&quot;">​</a></h2><p>点击新增按钮或者编辑按钮，可对该属性的属性值做增加或修改的操作，其效果如下所示：</p><p><img src="https://i.imgloc.com/2023/07/02/VRNDIQ.png" alt="VRNDIQ.png"></p><p>由上图可看出，属性值的增改可以在预览模式和修改模式之间来回切换，当鼠标点击处于预览模式的属性值时，则显示输入框；当用户按下回车键或者输入框失焦时，隐藏输入框显示文本内容。</p><p>通过 <code>v-if</code> 与 <code>v-else</code> 判断动态显示隐藏输入框与 DIV 盒子，为 DIV 盒子绑定点击事件，点击时修改状态显示输入框；为输入框绑定失焦与回车按键事件，触发后显示 DIV 盒子。</p><p>而判断的状态如果直接设置（如下所示）</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">flag</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">flag</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">)</span></span></code></pre></div><p>则会造成所有表格的属性值模式都是一样的，也就意味着点击一个 DIV ，所有表格的输入框都会显示；一个输入框失焦，所有输入框都会隐藏，这显然不符合场景需求。因此其状态需要绑定在各自表格对象内，如下所示：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">el-table-column</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">label</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;属性值名称&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;template #default=&quot;{ row, $index }&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;el-input</span></span>
<span class="line"><span style="color:#E1E4E8;">      v-model=&quot;row.valueName&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      v-if=&quot;!row.flag&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      v-focus</span></span>
<span class="line"><span style="color:#E1E4E8;">      placeholder=&quot;请输入属性值&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      @blur=&quot;blurInputFn(row, $index)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &gt;&lt;/el-input&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;div v-else @click=&quot;row.flag = false&quot;&gt;{{ row.valueName }}&lt;/div&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">el-table-column</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">el-table-column</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">label</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;属性值名称&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;template #default=&quot;{ row, $index }&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;el-input</span></span>
<span class="line"><span style="color:#24292E;">      v-model=&quot;row.valueName&quot;</span></span>
<span class="line"><span style="color:#24292E;">      v-if=&quot;!row.flag&quot;</span></span>
<span class="line"><span style="color:#24292E;">      v-focus</span></span>
<span class="line"><span style="color:#24292E;">      placeholder=&quot;请输入属性值&quot;</span></span>
<span class="line"><span style="color:#24292E;">      @blur=&quot;blurInputFn(row, $index)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    &gt;&lt;/el-input&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;div v-else @click=&quot;row.flag = false&quot;&gt;{{ row.valueName }}&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/template&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">el-table-column</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>在输入框失焦时需要对用户输入的内容做出校验与判断：</p><ul><li><p>当用户未输入内容时，禁止其失焦并提示用户输入内容</p></li><li><p>当用户输入内容与其他内容相同时，禁止其失焦并提示用户</p><p>实现这个判断需要获取到用户当前失焦的数据索引项，判断其索引是否相等，不等才判断内容。否则会把该索引的内容也判断在内，必然会相等。</p></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">blurInputFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">row</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">attrValueType</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">index</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">row.valueName) </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 当有相同内容且索引不一样时，禁止其失焦</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">flag</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> attrParams.value.attrValueList.</span><span style="color:#B392F0;">some</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">i</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> item.valueName </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> row.valueName)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(flag) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ElMessage.</span><span style="color:#B392F0;">warning</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;不可添加重复数据&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  row.flag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">blurInputFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">row</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">attrValueType</span><span style="color:#24292E;">, </span><span style="color:#E36209;">index</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">row.valueName) </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 当有相同内容且索引不一样时，禁止其失焦</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">flag</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> attrParams.value.attrValueList.</span><span style="color:#6F42C1;">some</span><span style="color:#24292E;">((</span><span style="color:#E36209;">item</span><span style="color:#24292E;">, </span><span style="color:#E36209;">i</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> item.valueName </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> row.valueName)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(flag) {</span></span>
<span class="line"><span style="color:#24292E;">    ElMessage.</span><span style="color:#6F42C1;">warning</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;不可添加重复数据&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  row.flag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>最后保存按钮通过判断所有的 <code>flag</code> 状态来决定是否禁用即可。</p><h2 id="自动聚焦" tabindex="-1">自动聚焦 <a class="header-anchor" href="#自动聚焦" aria-label="Permalink to &quot;自动聚焦&quot;">​</a></h2><p>为了方便用户体验，在用户显示输入框时让输入框默认处于聚焦状态，此处使用到了自定义事件。</p><p>在 Vue3 中，自定义事件的定义方法如下：</p><ol><li>定义一个 <code>vXxxx</code> 的对象，注意要 v 开头且是驼峰命名</li><li>在组件挂载 <code>mounted</code> 事件函数的形参中获取该组件</li><li>找到需要的输入框组件为其设置 <code>focus()</code> 方法</li><li>在组件中通过 <code>v-xxxx</code> 使用</li></ol><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">// 自定义指令</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">vFocus</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">mounted</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">nextTick</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      el.children[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">].children[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">focus</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">// 自定义指令</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">vFocus</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">mounted</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">el</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">nextTick</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      el.children[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">].children[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">].</span><span style="color:#6F42C1;">focus</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,30),e=[o];function t(c,r,E,y,i,u){return a(),n("div",null,e)}const g=s(p,[["render",t]]);export{F as __pageData,g as default};
