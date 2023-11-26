import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const C=JSON.parse('{"title":"饼图中间内容自定义","description":"","frontmatter":{},"headers":[],"relativePath":"learn/杂技拾谈/Echart/饼图中间内容自定义.md","filePath":"learn/杂技拾谈/Echart/饼图中间内容自定义.md","lastUpdated":null}'),p={name:"learn/杂技拾谈/Echart/饼图中间内容自定义.md"},o=l(`<h1 id="饼图中间内容自定义" tabindex="-1">饼图中间内容自定义 <a class="header-anchor" href="#饼图中间内容自定义" aria-label="Permalink to &quot;饼图中间内容自定义&quot;">​</a></h1><h2 id="效果" tabindex="-1">效果 <a class="header-anchor" href="#效果" aria-label="Permalink to &quot;效果&quot;">​</a></h2><p>Echart 饼图中间内容允许自定义，具体效果如下图所示：</p><p><img src="https://pic.imgdb.cn/item/65621720c458853aef11e1d6.jpg" alt="示例"></p><h2 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h2><p>想要实现这个功能，需要在饼图的 <code>series</code> 数组对象的 <code>label</code> 属性中设置一个 <code>normal</code> 属性，其中：</p><ul><li><p><code>formatter</code> 设置要显示的文本，字符串的形式，格式如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&#39;{xxx|}&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> 变量1 </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;} {yyy|}&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> 变量2 </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;次}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&#39;{xxx|}&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> 变量1 </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;} {yyy|}&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> 变量2 </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;次}&#39;</span></span></code></pre></div><p>其中 <code>xxx</code> 与 <code>yyy</code> 与他们后面的变量分别一一对应，后续通过它们给文本设置样式。</p></li><li><p><code>rich</code> 原意是富文本，这里用于给自定义内容设置样式，格式如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">rich</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">xxx</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">fontSize</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">14</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;red&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">yyy</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">fontWeight</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">600</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">rich</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">xxx</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">fontSize</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">14</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">color</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;red&#39;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">yyy</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">fontWeight</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">600</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li></ul><p>整体代码如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">option </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  series: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&#39;结构物管理一张图&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;pie&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      radius: [</span><span style="color:#9ECBFF;">&#39;80%&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;90%&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      center: [</span><span style="color:#9ECBFF;">&#39;20%&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;50%&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      avoidLabelOverlap: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      label: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        show: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        position: </span><span style="color:#9ECBFF;">&#39;right&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        normal: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          show: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          position: </span><span style="color:#9ECBFF;">&#39;center&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          color: </span><span style="color:#9ECBFF;">&#39;red&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          formatter:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;{total|&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;次}&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;{title|告警}&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          rich: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            total: {</span></span>
<span class="line"><span style="color:#E1E4E8;">              fontSize: </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              fontFamily: </span><span style="color:#9ECBFF;">&#39;PingFang SC&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              color: </span><span style="color:#9ECBFF;">&#39;rgb(254, 201, 49)&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              fontWeight: </span><span style="color:#79B8FF;">400</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              letterSpace: </span><span style="color:#79B8FF;">1.5</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              lineHeight: </span><span style="color:#79B8FF;">20</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            title: {</span></span>
<span class="line"><span style="color:#E1E4E8;">              fontFamily: </span><span style="color:#9ECBFF;">&#39;PingFang SC&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              fontSize: </span><span style="color:#79B8FF;">14</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              color: </span><span style="color:#9ECBFF;">&#39;rgb(0, 255, 255)&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              lineHeight: </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              fontWeight: </span><span style="color:#79B8FF;">400</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              letterSpace: </span><span style="color:#79B8FF;">1.17</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      emphasis: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        label: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          show: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontSize: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fontWeight: </span><span style="color:#9ECBFF;">&#39;bold&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      labelLine: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        show: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      data: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          name: </span><span style="color:#9ECBFF;">&#39;a&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          point: </span><span style="color:#79B8FF;">41.67</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          value: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          name: </span><span style="color:#9ECBFF;">&#39;b&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          point: </span><span style="color:#79B8FF;">22.67</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          value: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          name: </span><span style="color:#9ECBFF;">&#39;c&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          point: </span><span style="color:#79B8FF;">41.67</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          value: </span><span style="color:#79B8FF;">4</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">option </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  series: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&#39;结构物管理一张图&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;pie&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      radius: [</span><span style="color:#032F62;">&#39;80%&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;90%&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      center: [</span><span style="color:#032F62;">&#39;20%&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;50%&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      avoidLabelOverlap: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      label: {</span></span>
<span class="line"><span style="color:#24292E;">        show: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        position: </span><span style="color:#032F62;">&#39;right&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        normal: {</span></span>
<span class="line"><span style="color:#24292E;">          show: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          position: </span><span style="color:#032F62;">&#39;center&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          color: </span><span style="color:#032F62;">&#39;red&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          formatter:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;{total|&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;次}&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;{title|告警}&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          rich: {</span></span>
<span class="line"><span style="color:#24292E;">            total: {</span></span>
<span class="line"><span style="color:#24292E;">              fontSize: </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              fontFamily: </span><span style="color:#032F62;">&#39;PingFang SC&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              color: </span><span style="color:#032F62;">&#39;rgb(254, 201, 49)&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              fontWeight: </span><span style="color:#005CC5;">400</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              letterSpace: </span><span style="color:#005CC5;">1.5</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              lineHeight: </span><span style="color:#005CC5;">20</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            title: {</span></span>
<span class="line"><span style="color:#24292E;">              fontFamily: </span><span style="color:#032F62;">&#39;PingFang SC&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              fontSize: </span><span style="color:#005CC5;">14</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              color: </span><span style="color:#032F62;">&#39;rgb(0, 255, 255)&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              lineHeight: </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              fontWeight: </span><span style="color:#005CC5;">400</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              letterSpace: </span><span style="color:#005CC5;">1.17</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      emphasis: {</span></span>
<span class="line"><span style="color:#24292E;">        label: {</span></span>
<span class="line"><span style="color:#24292E;">          show: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          fontSize: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          fontWeight: </span><span style="color:#032F62;">&#39;bold&#39;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      labelLine: {</span></span>
<span class="line"><span style="color:#24292E;">        show: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      data: [</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          name: </span><span style="color:#032F62;">&#39;a&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          point: </span><span style="color:#005CC5;">41.67</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          value: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          name: </span><span style="color:#032F62;">&#39;b&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          point: </span><span style="color:#005CC5;">22.67</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          value: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          name: </span><span style="color:#032F62;">&#39;c&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          point: </span><span style="color:#005CC5;">41.67</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          value: </span><span style="color:#005CC5;">4</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>在 <code>formatter</code> 里写内容，<code>rich</code> 里面写你需要的样式。</p>`,11),e=[o];function c(t,E,r,y,i,F){return n(),a("div",null,e)}const h=s(p,[["render",c]]);export{C as __pageData,h as default};
