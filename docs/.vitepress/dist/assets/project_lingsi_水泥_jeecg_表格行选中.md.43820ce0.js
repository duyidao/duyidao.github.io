import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const u=JSON.parse('{"title":"表格行选中","description":"","frontmatter":{},"headers":[],"relativePath":"project/lingsi/水泥/jeecg/表格行选中.md","filePath":"project/lingsi/水泥/jeecg/表格行选中.md","lastUpdated":null}'),p={name:"project/lingsi/水泥/jeecg/表格行选中.md"},o=l(`<h1 id="表格行选中" tabindex="-1">表格行选中 <a class="header-anchor" href="#表格行选中" aria-label="Permalink to &quot;表格行选中&quot;">​</a></h1><p><code>ant design vue</code> 组件库中有一个表格组件 <code>a-table</code> ，可实现单选表格或多选表格的效果，但是只有点击单选框或多选框才有效。用户想要点击当前行也能选中该行的数据。</p><h2 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-label="Permalink to &quot;思路&quot;">​</a></h2><p>首先第一步，先去看官方文档有没有实现该需求的 <code>api</code> 。官网文档指路：<a href="https://1x.antdv.com/components/table-cn/#API" target="_blank" rel="noreferrer">Table 表格</a> 。</p><p>官方文档有这么一段 <code>customRow</code> 用法，示例方法为：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">Table</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">customRow</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">{(record)</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    return {</span></span>
<span class="line"><span style="color:#E1E4E8;">      props: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        xxx... //属性</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      on: { // 事件</span></span>
<span class="line"><span style="color:#E1E4E8;">        click: (event) =&gt; {},       // 点击行</span></span>
<span class="line"><span style="color:#E1E4E8;">        dblclick: (event) =&gt; {},</span></span>
<span class="line"><span style="color:#E1E4E8;">        contextmenu: (event) =&gt; {},</span></span>
<span class="line"><span style="color:#E1E4E8;">        mouseenter: (event) =&gt; {},  // 鼠标移入行</span></span>
<span class="line"><span style="color:#E1E4E8;">        mouseleave: (event) =&gt; {}</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  )}</span></span>
<span class="line"><span style="color:#E1E4E8;">  customHeaderRow={(column) =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    return {</span></span>
<span class="line"><span style="color:#E1E4E8;">      on: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        click: () =&gt; {},        // 点击表头行</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  )}</span></span>
<span class="line"><span style="color:#E1E4E8;">/&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">Table</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">customRow</span><span style="color:#24292E;">=</span><span style="color:#032F62;">{(record)</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    return {</span></span>
<span class="line"><span style="color:#24292E;">      props: {</span></span>
<span class="line"><span style="color:#24292E;">        xxx... //属性</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      on: { // 事件</span></span>
<span class="line"><span style="color:#24292E;">        click: (event) =&gt; {},       // 点击行</span></span>
<span class="line"><span style="color:#24292E;">        dblclick: (event) =&gt; {},</span></span>
<span class="line"><span style="color:#24292E;">        contextmenu: (event) =&gt; {},</span></span>
<span class="line"><span style="color:#24292E;">        mouseenter: (event) =&gt; {},  // 鼠标移入行</span></span>
<span class="line"><span style="color:#24292E;">        mouseleave: (event) =&gt; {}</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  )}</span></span>
<span class="line"><span style="color:#24292E;">  customHeaderRow={(column) =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    return {</span></span>
<span class="line"><span style="color:#24292E;">      on: {</span></span>
<span class="line"><span style="color:#24292E;">        click: () =&gt; {},        // 点击表头行</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  )}</span></span>
<span class="line"><span style="color:#24292E;">/&gt;</span></span></code></pre></div><p>可以看到，在 <code>on</code> 对象内绑定了 <code>click</code> 事件可以获取到当前行点击的事件，触发点击事件后，如果当前行未选中，就把当前行的 <code>id</code> 追加到表格行选中的数组内，反之把当前行的 <code>id</code> 从数组中去除。</p><h2 id="代码" tabindex="-1">代码 <a class="header-anchor" href="#代码" aria-label="Permalink to &quot;代码&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">a-table</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">size</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;small&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">:scroll=&quot;{</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">x:</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">true,</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">y:</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">500</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">bordered</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">rowKey</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;id&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">:columns=&quot;columns&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">:dataSource=&quot;dataSource&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">:pagination=&quot;false&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">:customRow=&quot;setRow&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">/&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">setRow</span><span style="color:#E1E4E8;">(record, index){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      on: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">click</span><span style="color:#E1E4E8;">: ()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 如果当前行已被选中，去除</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.keys.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(record.id)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.keys </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.keys.</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> item </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> record.id)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.rows </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.rows.</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> item.id </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> record.id)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">          } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 当前行没被选中，判断他是单选表格还是多选表格</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.rightType </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;checkbox&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#6A737D;">// 单选表格就把原数组清空，多选表格什么操作都不用做</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.keys </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.rows </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 把数据push进表格内</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.keys.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(record.id)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.rows.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(record)</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// selectedRowKeys为表格已选中的id数组，selectedRows为表格已选中的数据对象，赋值给他们</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.selectedRowKeys </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.keys</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.selectedRows </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.rows</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">a-table</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">size</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;small&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">:scroll=&quot;{</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">x:</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">true,</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">y:</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">500</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">}&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">bordered</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">rowKey</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;id&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">:columns=&quot;columns&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">:dataSource=&quot;dataSource&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">:pagination=&quot;false&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">:customRow=&quot;setRow&quot;</span></span>
<span class="line"><span style="color:#24292E;">/&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">setRow</span><span style="color:#24292E;">(record, index){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      on: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">click</span><span style="color:#24292E;">: ()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 如果当前行已被选中，去除</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.keys.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(record.id)) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.keys </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.keys.</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">item</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> item </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> record.id)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.rows </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.rows.</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">item</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> item.id </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> record.id)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">          } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 当前行没被选中，判断他是单选表格还是多选表格</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.rightType </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;checkbox&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6A737D;">// 单选表格就把原数组清空，多选表格什么操作都不用做</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.keys </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.rows </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 把数据push进表格内</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.keys.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(record.id)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.rows.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(record)</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">          </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// selectedRowKeys为表格已选中的id数组，selectedRows为表格已选中的数据对象，赋值给他们</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.selectedRowKeys </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.keys</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.selectedRows </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.rows</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">},</span></span></code></pre></div>`,9),e=[o];function t(c,r,E,y,i,d){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{u as __pageData,h as default};
