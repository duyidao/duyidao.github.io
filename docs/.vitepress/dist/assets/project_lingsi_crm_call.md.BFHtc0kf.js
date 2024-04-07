import{_ as t,c as s,o as a,V as i}from"./chunks/framework.C7aBxagv.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"project/lingsi/crm/call.md","filePath":"project/lingsi/crm/call.md","lastUpdated":1675776897000}'),e={name:"project/lingsi/crm/call.md"},n=i(`<p>用户点击电话或者拨打图标后，进入手机拨号页面。 微信小程序提供了 <code>wx.makePhoneCall</code>方法，参数如下所示：</p><table><thead><tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>phoneNumber</td><td>String</td><td>是</td><td>需要拨打的电话号码</td></tr><tr><td>success</td><td>Function</td><td>否</td><td>接口调用成功的回调</td></tr><tr><td>fail</td><td>Function</td><td>否</td><td>接口调用失败的回调函数</td></tr><tr><td>complete</td><td>Function</td><td>否</td><td>接口调用结束的回调函数（调用成功、失败都会执行）</td></tr></tbody></table><p>通过给属性 <code>phoneNumber</code>赋值手机号即可。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 拨打电话</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dial</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  wx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">makePhoneCall</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    phoneNumber: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;phoneNumber&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,4),d=[n];function l(p,h,r,c,o,k){return a(),s("div",null,d)}const g=t(e,[["render",l]]);export{_ as __pageData,g as default};
