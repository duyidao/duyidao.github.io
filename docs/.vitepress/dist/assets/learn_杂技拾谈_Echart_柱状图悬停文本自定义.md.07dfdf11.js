import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const h=JSON.parse('{"title":"柱状图悬停文本自定义","description":"","frontmatter":{},"headers":[],"relativePath":"learn/杂技拾谈/Echart/柱状图悬停文本自定义.md","filePath":"learn/杂技拾谈/Echart/柱状图悬停文本自定义.md","lastUpdated":null}'),p={name:"learn/杂技拾谈/Echart/柱状图悬停文本自定义.md"},o=l(`<h1 id="柱状图悬停文本自定义" tabindex="-1">柱状图悬停文本自定义 <a class="header-anchor" href="#柱状图悬停文本自定义" aria-label="Permalink to &quot;柱状图悬停文本自定义&quot;">​</a></h1><h2 id="效果" tabindex="-1">效果 <a class="header-anchor" href="#效果" aria-label="Permalink to &quot;效果&quot;">​</a></h2><p>在项目中产品对直接使用的柱状图提出了批评意见，要求如下：</p><ul><li>即使没数据也要显示所有的结构，没数据的补0</li><li>纵坐标数值取整，不要出现小数</li><li>柱体宽度固定，颜色样式要与原型图统一</li><li>鼠标悬停后展示同一组的所有数据</li></ul><p>效果如下所示：</p><p><img src="https://pic.imgdb.cn/item/6563221ac458853aefcfa287.jpg" alt="效果"></p><h2 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h2><h3 id="纵轴单位规定整数" tabindex="-1">纵轴单位规定整数 <a class="header-anchor" href="#纵轴单位规定整数" aria-label="Permalink to &quot;纵轴单位规定整数&quot;">​</a></h3><p>修改纵轴的参数，只需要修改 <code>yAxis</code> 对象的值即可生效。想要实现该效果，只需把 <code>minInterval</code> 属性设为1，最低单位为1，就不会出现小数的情况。</p><h3 id="纵轴线不显示-横轴线为虚线" tabindex="-1">纵轴线不显示，横轴线为虚线 <a class="header-anchor" href="#纵轴线不显示-横轴线为虚线" aria-label="Permalink to &quot;纵轴线不显示，横轴线为虚线&quot;">​</a></h3><p>纵轴线不显示需要在 <code>yAxis</code> 对象设置 <code>axisLine</code> 属性为 <code>false</code> ；横轴线显示虚线则是在 <code>xAxis</code> 对象中设置 <code>axisLine</code> 对象的 <code>type</code> 为 <code>dashed</code> 虚线。</p><h3 id="柱体宽度与颜色设置" tabindex="-1">柱体宽度与颜色设置 <a class="header-anchor" href="#柱体宽度与颜色设置" aria-label="Permalink to &quot;柱体宽度与颜色设置&quot;">​</a></h3><p>柱体宽度与颜色均在 <code>series</code> 中设置，为每一个柱体对象设置 <code>borWidth</code> 以控制柱体宽度。</p><p>再设置 <code>itemStyle</code> 对象属性，这里可以设置柱体的样式，包括颜色，字段为 <code>color</code> 。</p><h3 id="鼠标悬停显示同组柱体的数据" tabindex="-1">鼠标悬停显示同组柱体的数据 <a class="header-anchor" href="#鼠标悬停显示同组柱体的数据" aria-label="Permalink to &quot;鼠标悬停显示同组柱体的数据&quot;">​</a></h3><p>与鼠标悬停有关的效果都在 <code>tooltip</code> 属性对象内设置，通过 <code>formatter</code> 函数返回需要显示的内容。可以返回一个包含 <code>HTML</code> 标签的字符串。</p><p>函数的形参 <code>params</code> 可以接收 <code>series</code> 与 <code>dataset</code> 内的柱体数据，包括数组数据、柱体颜色等，因此可以拿到数据渲染自己想要的文本内容，并且可以设置样式。</p><h2 id="最终代码" tabindex="-1">最终代码 <a class="header-anchor" href="#最终代码" aria-label="Permalink to &quot;最终代码&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">option </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  legend: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    left: </span><span style="color:#9ECBFF;">&#39;right&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    icon: </span><span style="color:#9ECBFF;">&#39;circle&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    textStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      color: </span><span style="color:#9ECBFF;">&#39;#fff&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  tooltip: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    trigger: </span><span style="color:#9ECBFF;">&#39;axis&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 鼠标悬停在轴线时展示信息</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">formatter</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">params</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`&lt;div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                    &lt;div&gt;在线率：10%%&lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                    &lt;div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                        &lt;div</span></span>
<span class="line"><span style="color:#9ECBFF;">                                            style=&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                display: inline-block;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                background: red;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                width: 10px;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                height: 10px;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                border-radius: 50%;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                margin: 5px 8px 0;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                            &quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                            &gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                        在线 100</span></span>
<span class="line"><span style="color:#9ECBFF;">                                        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                    &lt;div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                        &lt;div</span></span>
<span class="line"><span style="color:#9ECBFF;">                                            style=&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                display: inline-block;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                background: yellow;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                width: 10px;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                height: 10px;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                border-radius: 50%;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                                margin: 5px 8px 0;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                            &quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                            &gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                        离线 0</span></span>
<span class="line"><span style="color:#9ECBFF;">                                        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">                                    &lt;/div&gt;\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  dataset: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    source: [[</span><span style="color:#9ECBFF;">&#39;online&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;在线&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;离线&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&#39;bridge&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&#39;slope&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&#39;tunnel&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  xAxis: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&#39;category&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    axisLine: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;dashed&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 设置横轴线为虚线</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  yAxis: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    minInterval: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    axisLine: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 不显示纵轴线</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  series: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;bar&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      itemStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 这里定义了柱状的颜色</span></span>
<span class="line"><span style="color:#E1E4E8;">        color: </span><span style="color:#9ECBFF;">&#39;rgb(253, 183, 45)&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      barWidth: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;bar&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      itemStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 这里定义了柱状的颜色</span></span>
<span class="line"><span style="color:#E1E4E8;">        color: </span><span style="color:#9ECBFF;">&#39;rgb(117, 255, 206)&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      barWidth: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">option </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  legend: {</span></span>
<span class="line"><span style="color:#24292E;">    left: </span><span style="color:#032F62;">&#39;right&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    icon: </span><span style="color:#032F62;">&#39;circle&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    textStyle: {</span></span>
<span class="line"><span style="color:#24292E;">      color: </span><span style="color:#032F62;">&#39;#fff&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  tooltip: {</span></span>
<span class="line"><span style="color:#24292E;">    trigger: </span><span style="color:#032F62;">&#39;axis&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 鼠标悬停在轴线时展示信息</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">formatter</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">params</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`&lt;div&gt;</span></span>
<span class="line"><span style="color:#032F62;">                                    &lt;div&gt;在线率：10%%&lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">                                    &lt;div&gt;</span></span>
<span class="line"><span style="color:#032F62;">                                        &lt;div</span></span>
<span class="line"><span style="color:#032F62;">                                            style=&quot;</span></span>
<span class="line"><span style="color:#032F62;">                                                display: inline-block;</span></span>
<span class="line"><span style="color:#032F62;">                                                background: red;</span></span>
<span class="line"><span style="color:#032F62;">                                                width: 10px;</span></span>
<span class="line"><span style="color:#032F62;">                                                height: 10px;</span></span>
<span class="line"><span style="color:#032F62;">                                                border-radius: 50%;</span></span>
<span class="line"><span style="color:#032F62;">                                                margin: 5px 8px 0;</span></span>
<span class="line"><span style="color:#032F62;">                                            &quot;</span></span>
<span class="line"><span style="color:#032F62;">                                            &gt;</span></span>
<span class="line"><span style="color:#032F62;">                                        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">                                        在线 100</span></span>
<span class="line"><span style="color:#032F62;">                                        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">                                    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">                                    &lt;div&gt;</span></span>
<span class="line"><span style="color:#032F62;">                                        &lt;div</span></span>
<span class="line"><span style="color:#032F62;">                                            style=&quot;</span></span>
<span class="line"><span style="color:#032F62;">                                                display: inline-block;</span></span>
<span class="line"><span style="color:#032F62;">                                                background: yellow;</span></span>
<span class="line"><span style="color:#032F62;">                                                width: 10px;</span></span>
<span class="line"><span style="color:#032F62;">                                                height: 10px;</span></span>
<span class="line"><span style="color:#032F62;">                                                border-radius: 50%;</span></span>
<span class="line"><span style="color:#032F62;">                                                margin: 5px 8px 0;</span></span>
<span class="line"><span style="color:#032F62;">                                            &quot;</span></span>
<span class="line"><span style="color:#032F62;">                                            &gt;</span></span>
<span class="line"><span style="color:#032F62;">                                        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">                                        离线 0</span></span>
<span class="line"><span style="color:#032F62;">                                        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">                                    &lt;/div&gt;\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  dataset: {</span></span>
<span class="line"><span style="color:#24292E;">    source: [[</span><span style="color:#032F62;">&#39;online&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;在线&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;离线&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&#39;bridge&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&#39;slope&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&#39;tunnel&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  xAxis: {</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&#39;category&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    axisLine: {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;dashed&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 设置横轴线为虚线</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  yAxis: {</span></span>
<span class="line"><span style="color:#24292E;">    minInterval: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    axisLine: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 不显示纵轴线</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  series: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;bar&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      itemStyle: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 这里定义了柱状的颜色</span></span>
<span class="line"><span style="color:#24292E;">        color: </span><span style="color:#032F62;">&#39;rgb(253, 183, 45)&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      barWidth: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;bar&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      itemStyle: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 这里定义了柱状的颜色</span></span>
<span class="line"><span style="color:#24292E;">        color: </span><span style="color:#032F62;">&#39;rgb(117, 255, 206)&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      barWidth: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,19),e=[o];function c(t,r,E,i,y,F){return n(),a("div",null,e)}const C=s(p,[["render",c]]);export{h as __pageData,C as default};
