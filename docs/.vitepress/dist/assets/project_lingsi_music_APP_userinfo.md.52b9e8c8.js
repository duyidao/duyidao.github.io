import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.2ee92742.js";const g=JSON.parse('{"title":"证件照裁剪","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"个","7":"人","8":"资","9":"料","10":"页"},"headers":[],"relativePath":"project/lingsi/music/APP/userinfo.md","filePath":"project/lingsi/music/APP/userinfo.md","lastUpdated":null}'),t={name:"project/lingsi/music/APP/userinfo.md"},p=l(`<h1 id="证件照裁剪" tabindex="-1">证件照裁剪 <a class="header-anchor" href="#证件照裁剪" aria-label="Permalink to &quot;证件照裁剪&quot;">​</a></h1><p>音果项目客户那边需要生成证书，证书生成个人证件照有宽高要求。因此 <code>APP</code> 这边需要对用户上传的图片做裁剪操作，上传成功后点击可预览，如下所示：</p><p><a href="https://imgse.com/i/p9gyE26" target="_blank" rel="noreferrer"><img src="https://s1.ax1x.com/2023/05/15/p9gyE26.png" alt="p9gyE26.png"></a></p><h2 id="chooseimage" tabindex="-1">chooseImage <a class="header-anchor" href="#chooseimage" aria-label="Permalink to &quot;chooseImage&quot;">​</a></h2><p><code>uniapp</code> 提供了图片选择的方法 <code>uni.chooseImage()</code> ，其中可设置选择的图片、压缩类型、拍摄或相册获取等等，官方文档指路：<a href="https://uniapp.dcloud.net.cn/api/media/image.html#chooseimage" target="_blank" rel="noreferrer">chooseImage</a>。</p><p>选择图片成功后触发成功回调函数，参数中可获取临时地址，用于调用接口上传图片。</p><p>根据官方文档描述，我们可以设置 <code>crop</code> 属性，做图像裁剪参数，设置后 <code>sizeType</code> 失效。</p><h3 id="crop" tabindex="-1">crop <a class="header-anchor" href="#crop" aria-label="Permalink to &quot;crop&quot;">​</a></h3><p><strong>参数说明</strong></p><table><thead><tr><th style="text-align:left;">参数名</th><th style="text-align:left;">类型</th><th style="text-align:left;">必填</th><th style="text-align:left;">说明</th><th style="text-align:left;">平台差异说明</th></tr></thead><tbody><tr><td style="text-align:left;">quality</td><td style="text-align:left;">Number</td><td style="text-align:left;">否</td><td style="text-align:left;">取值范围为1-100，数值越小，质量越低（仅对jpg格式有效）。默认值为80。</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">width</td><td style="text-align:left;">Number</td><td style="text-align:left;">是</td><td style="text-align:left;">裁剪的宽度，单位为px，用于计算裁剪宽高比。</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">height</td><td style="text-align:left;">Number</td><td style="text-align:left;">是</td><td style="text-align:left;">裁剪的高度，单位为px，用于计算裁剪宽高比。</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">resize</td><td style="text-align:left;">Boolean</td><td style="text-align:left;">否</td><td style="text-align:left;">是否将width和height作为裁剪保存图片真实的像素值。默认值为true。注：设置为false时在裁剪编辑界面显示图片的像素值，设置为true时不显示</td><td style="text-align:left;"></td></tr></tbody></table><p>本项目运用场景中证书图片的宽高固定为 123 * 169，因此设置相应的宽高后，<code>resize</code> 采用其默认值 <code>true</code> ，作为真实的像素值。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 上传图片</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">uploadImgFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	uni.</span><span style="color:#B392F0;">chooseImage</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">		count: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//最大可选择数量，默认9</span></span>
<span class="line"><span style="color:#E1E4E8;">		sizeType: [</span><span style="color:#9ECBFF;">&#39;original&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;compressed&#39;</span><span style="color:#E1E4E8;">], </span><span style="color:#6A737D;">//可以指定是原图还是压缩图，默认二者都有</span></span>
<span class="line"><span style="color:#E1E4E8;">		sourceType: [</span><span style="color:#9ECBFF;">&#39;album&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;camera&#39;</span><span style="color:#E1E4E8;">], </span><span style="color:#6A737D;">//可以指定从相册选择还是手机拍照，默认二者都有</span></span>
<span class="line"><span style="color:#E1E4E8;">		crop: {</span></span>
<span class="line"><span style="color:#E1E4E8;">			quality: </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			width: </span><span style="color:#79B8FF;">123</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			height: </span><span style="color:#79B8FF;">169</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		},</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">success</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">tempFilePaths</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> res.tempFilePaths;</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// 上传文件</span></span>
<span class="line"><span style="color:#E1E4E8;">			uni.</span><span style="color:#B392F0;">uploadFile</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">				url: 上传图片接口路径,</span></span>
<span class="line"><span style="color:#E1E4E8;">				filePath: tempFilePaths[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">				name: </span><span style="color:#9ECBFF;">&#39;file&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				header: {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#9ECBFF;">&#39;X-Access-Token&#39;</span><span style="color:#E1E4E8;">: uni.</span><span style="color:#B392F0;">getStorageSync</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;token&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">				},</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">success</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">uploadFileRes</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			});</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	});</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 上传图片</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">uploadImgFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	uni.</span><span style="color:#6F42C1;">chooseImage</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">		count: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//最大可选择数量，默认9</span></span>
<span class="line"><span style="color:#24292E;">		sizeType: [</span><span style="color:#032F62;">&#39;original&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;compressed&#39;</span><span style="color:#24292E;">], </span><span style="color:#6A737D;">//可以指定是原图还是压缩图，默认二者都有</span></span>
<span class="line"><span style="color:#24292E;">		sourceType: [</span><span style="color:#032F62;">&#39;album&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;camera&#39;</span><span style="color:#24292E;">], </span><span style="color:#6A737D;">//可以指定从相册选择还是手机拍照，默认二者都有</span></span>
<span class="line"><span style="color:#24292E;">		crop: {</span></span>
<span class="line"><span style="color:#24292E;">			quality: </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			width: </span><span style="color:#005CC5;">123</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			height: </span><span style="color:#005CC5;">169</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		},</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">success</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">tempFilePaths</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> res.tempFilePaths;</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// 上传文件</span></span>
<span class="line"><span style="color:#24292E;">			uni.</span><span style="color:#6F42C1;">uploadFile</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">				url: 上传图片接口路径,</span></span>
<span class="line"><span style="color:#24292E;">				filePath: tempFilePaths[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">				name: </span><span style="color:#032F62;">&#39;file&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">				header: {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#032F62;">&#39;X-Access-Token&#39;</span><span style="color:#24292E;">: uni.</span><span style="color:#6F42C1;">getStorageSync</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;token&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">				},</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">success</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">uploadFileRes</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			});</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	});</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="实际效果" tabindex="-1">实际效果 <a class="header-anchor" href="#实际效果" aria-label="Permalink to &quot;实际效果&quot;">​</a></h3><p>打包后在手机运行，最终效果如下所示：</p><p><a href="https://imgse.com/i/p9g6WX8" target="_blank" rel="noreferrer"><img src="https://s1.ax1x.com/2023/05/15/p9g6WX8.jpg" alt="p9g6WX8.jpg"></a></p><h2 id="预览" tabindex="-1">预览 <a class="header-anchor" href="#预览" aria-label="Permalink to &quot;预览&quot;">​</a></h2><p>预览模块实现起来就相对简单了，只需要根据官方文档调用其 <code>uni.previewImage()</code> 方法，以数组的方式传入相对应的图片路径和其索引（由于只有这一张图片所以是0）。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 预览图片</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">previewImgFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	uni.</span><span style="color:#B392F0;">previewImage</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">		current: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		urls: [src.value]</span></span>
<span class="line"><span style="color:#E1E4E8;">	});</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 预览图片</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">previewImgFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	uni.</span><span style="color:#6F42C1;">previewImage</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">		current: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		urls: [src.value]</span></span>
<span class="line"><span style="color:#24292E;">	});</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,18),e=[p];function o(c,r,E,y,i,d){return a(),n("div",null,e)}const u=s(t,[["render",o]]);export{g as __pageData,u as default};
