import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const m=JSON.parse('{"title":"图表菜单项自定义","description":"","frontmatter":{},"headers":[],"relativePath":"learn/杂技拾谈/Echart/图表菜单项自定义.md","filePath":"learn/杂技拾谈/Echart/图表菜单项自定义.md","lastUpdated":null}'),p={name:"learn/杂技拾谈/Echart/图表菜单项自定义.md"},o=l(`<h1 id="图表菜单项自定义" tabindex="-1">图表菜单项自定义 <a class="header-anchor" href="#图表菜单项自定义" aria-label="Permalink to &quot;图表菜单项自定义&quot;">​</a></h1><h2 id="效果" tabindex="-1">效果 <a class="header-anchor" href="#效果" aria-label="Permalink to &quot;效果&quot;">​</a></h2><p>效果如下所示：</p><p><img src="https://pic.imgdb.cn/item/6563042ec458853aef795b41.jpg" alt="效果"></p><ol><li>图例设置为圆圈形状</li><li>文字内容自定义</li></ol><h2 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h2><p>对于图表菜单的修改，需要在 <code>legend</code> 对象修改。</p><p>实现图例圆圈效果，只需要在 <code>legend</code> 对象内设置 <code>icon</code> 属性为 <code>circle</code> 即可。</p><p>实现文字内容自定义的效果，需要在 <code>legend</code> 对象内设置 <code>formatter</code> ，该属性有两种方式：可以直接返回一个携带变量的字符串；可以是一个返回内容的函数。</p><p>代码如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">option </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  tooltip: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    trigger: </span><span style="color:#9ECBFF;">&#39;item&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  legend: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    orient: </span><span style="color:#9ECBFF;">&#39;vertical&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    left: </span><span style="color:#9ECBFF;">&#39;right&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    top: </span><span style="color:#9ECBFF;">&#39;center&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    align: </span><span style="color:#9ECBFF;">&#39;left&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    icon: </span><span style="color:#9ECBFF;">&#39;circle&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">formatter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`name\${</span><span style="color:#E1E4E8;">name</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">option </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  tooltip: {</span></span>
<span class="line"><span style="color:#24292E;">    trigger: </span><span style="color:#032F62;">&#39;item&#39;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  legend: {</span></span>
<span class="line"><span style="color:#24292E;">    orient: </span><span style="color:#032F62;">&#39;vertical&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    left: </span><span style="color:#032F62;">&#39;right&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    top: </span><span style="color:#032F62;">&#39;center&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    align: </span><span style="color:#032F62;">&#39;left&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    icon: </span><span style="color:#032F62;">&#39;circle&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">formatter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">name</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`name\${</span><span style="color:#24292E;">name</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>如果想要对内容自定义设置样式，也需要使用到 <code>rich</code> 富文属性，在 <code>formatter</code> 函数的返回值中设置 <code>{变量名|变量}</code> 的格式，然后在 <code>legend</code> 对象内设置 <code>textStyle</code> 对象用于设置图例文字样式，再设置 <code>rich</code> 属性对每一个变量的文字设置样式。</p><p>代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">option </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  tooltip: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    trigger: </span><span style="color:#9ECBFF;">&#39;item&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  legend: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    orient: </span><span style="color:#9ECBFF;">&#39;vertical&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    left: </span><span style="color:#9ECBFF;">&#39;right&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    top: </span><span style="color:#9ECBFF;">&#39;center&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    align: </span><span style="color:#9ECBFF;">&#39;left&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    icon: </span><span style="color:#9ECBFF;">&#39;circle&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        textStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      color: </span><span style="color:#9ECBFF;">&#39;#fff&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      rich: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontSize: </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontFamily: </span><span style="color:#9ECBFF;">&#39;PingFang SC&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          color: </span><span style="color:#9ECBFF;">&#39;#ccc&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          letterSpace: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontWeight: </span><span style="color:#79B8FF;">700</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        num: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontSize: </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontFamily: </span><span style="color:#9ECBFF;">&#39;PingFang SC&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          color: </span><span style="color:#9ECBFF;">&#39;#ccc&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          letterSpace: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontWeight: </span><span style="color:#79B8FF;">700</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        point: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontSize: </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontFamily: </span><span style="color:#9ECBFF;">&#39;PingFang SC&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          color: </span><span style="color:#9ECBFF;">&#39;#ccc&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          letterSpace: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontWeight: </span><span style="color:#79B8FF;">700</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">formatter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">item</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> data.value.</span><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> item.name </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> name);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`{name|\${</span><span style="color:#E1E4E8;">name</span><span style="color:#9ECBFF;">}}{num|\${</span><span style="color:#E1E4E8;">item</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">value</span><span style="color:#9ECBFF;">}次}    {point|占比\${</span><span style="color:#E1E4E8;">item</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">point</span><span style="color:#9ECBFF;">}%}\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">option </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  tooltip: {</span></span>
<span class="line"><span style="color:#24292E;">    trigger: </span><span style="color:#032F62;">&#39;item&#39;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  legend: {</span></span>
<span class="line"><span style="color:#24292E;">    orient: </span><span style="color:#032F62;">&#39;vertical&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    left: </span><span style="color:#032F62;">&#39;right&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    top: </span><span style="color:#032F62;">&#39;center&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    align: </span><span style="color:#032F62;">&#39;left&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    icon: </span><span style="color:#032F62;">&#39;circle&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        textStyle: {</span></span>
<span class="line"><span style="color:#24292E;">      color: </span><span style="color:#032F62;">&#39;#fff&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      rich: {</span></span>
<span class="line"><span style="color:#24292E;">        name: {</span></span>
<span class="line"><span style="color:#24292E;">          fontSize: </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          fontFamily: </span><span style="color:#032F62;">&#39;PingFang SC&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          color: </span><span style="color:#032F62;">&#39;#ccc&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          letterSpace: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          fontWeight: </span><span style="color:#005CC5;">700</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        num: {</span></span>
<span class="line"><span style="color:#24292E;">          fontSize: </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          fontFamily: </span><span style="color:#032F62;">&#39;PingFang SC&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          color: </span><span style="color:#032F62;">&#39;#ccc&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          letterSpace: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          fontWeight: </span><span style="color:#005CC5;">700</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        point: {</span></span>
<span class="line"><span style="color:#24292E;">          fontSize: </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          fontFamily: </span><span style="color:#032F62;">&#39;PingFang SC&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          color: </span><span style="color:#032F62;">&#39;#ccc&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          letterSpace: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          fontWeight: </span><span style="color:#005CC5;">700</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">formatter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">name</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">item</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> data.value.</span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">(</span><span style="color:#E36209;">item</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> item.name </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> name);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`{name|\${</span><span style="color:#24292E;">name</span><span style="color:#032F62;">}}{num|\${</span><span style="color:#24292E;">item</span><span style="color:#032F62;">.</span><span style="color:#24292E;">value</span><span style="color:#032F62;">}次}    {point|占比\${</span><span style="color:#24292E;">item</span><span style="color:#032F62;">.</span><span style="color:#24292E;">point</span><span style="color:#032F62;">}%}\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>在 <code>legend</code> 中设置 <code>formatter</code> 和 <code>rich</code> 实现内容自定义。</p>`,16),e=[o];function c(t,E,r,y,i,F){return n(),a("div",null,e)}const g=s(p,[["render",c]]);export{m as __pageData,g as default};
