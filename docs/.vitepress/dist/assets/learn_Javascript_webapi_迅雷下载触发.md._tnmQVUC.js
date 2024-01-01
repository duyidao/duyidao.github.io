import{_ as s,c as i,o as a,U as t}from"./chunks/framework.pP-Hyzfo.js";const c=JSON.parse('{"title":"迅雷下载触发","description":"","frontmatter":{},"headers":[],"relativePath":"learn/Javascript/webapi/迅雷下载触发.md","filePath":"learn/Javascript/webapi/迅雷下载触发.md","lastUpdated":1704114739000}'),n={name:"learn/Javascript/webapi/迅雷下载触发.md"},h=t(`<h1 id="迅雷下载触发" tabindex="-1">迅雷下载触发 <a class="header-anchor" href="#迅雷下载触发" aria-label="Permalink to &quot;迅雷下载触发&quot;">​</a></h1><h2 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h2><p>现在有一份超链接代码如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://xxxxxxxxxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;点我下载&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>点击即可下载。前端想要实现迅雷下载，可按照以下思路实现：</p><ol><li>为超链接 <code>a</code> 标签添加自定义标识 <code>data-thunder</code> ，表示该超链接需要迅雷下载</li><li>获取所有需要迅雷下载的超链接，<code>for...of...</code> 循环</li><li>通过 <code>btoa</code> 把链接转 <code>base64</code></li><li>转迅雷下载的 <code>thunder</code> 协议</li></ol><p>代码如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://xxxxxxxxxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;点我下载&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  	const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> links</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelectorAll</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;a[data-thunder]&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> link</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> of</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> links) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> newHref</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> btoa</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`AA\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">link</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">href</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}ZZ\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 转迅雷下载的 \`thunder\` 协议</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      link.href </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`thunder://\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">newHref</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="btoa" tabindex="-1">btoa() <a class="header-anchor" href="#btoa" aria-label="Permalink to &quot;btoa()&quot;">​</a></h2><p><strong><code>btoa()</code></strong> 方法可以将一个<em>二进制字符串</em>（例如，将字符串中的每一个字节都视为一个二进制数据字节）编码为 <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Base64" target="_blank" rel="noreferrer">Base64</a> 编码的 ASCII 字符串。</p><p>你可以使用这个方法来对可能遇到通信问题的数据进行编码，然后使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/atob" target="_blank" rel="noreferrer"><code>atob()</code></a> 方法来对数据进行解码。例如，你可以对 ASCII 中的控制字符（值为 0 到 31 的字符）进行编码。</p><p>语法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>btoa(stringToEncode)</span></span></code></pre></div><p>参数：</p><ul><li><p><code>stringToEncode</code></p><p>一个需要编码的<em>二进制字符串</em>。</p></li></ul><p>返回值：</p><p>一个包含 <code>stringToEncode</code> 的 Base64 表示的 ASCII 字符串。</p>`,17),l=[h];function e(p,k,r,E,d,o){return a(),i("div",null,l)}const y=s(n,[["render",e]]);export{c as __pageData,y as default};
