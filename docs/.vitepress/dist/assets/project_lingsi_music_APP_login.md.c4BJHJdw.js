import{_ as s,c as i,o as a,U as n}from"./chunks/framework.pP-Hyzfo.js";const o=JSON.parse('{"title":"登录页","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"登","7":"录","8":"页"},"headers":[],"relativePath":"project/lingsi/music/APP/login.md","filePath":"project/lingsi/music/APP/login.md","lastUpdated":1691659990000}'),t={name:"project/lingsi/music/APP/login.md"},l=n(`<h1 id="登录页" tabindex="-1">登录页 <a class="header-anchor" href="#登录页" aria-label="Permalink to &quot;登录页&quot;">​</a></h1><h2 id="业务分析" tabindex="-1">业务分析 <a class="header-anchor" href="#业务分析" aria-label="Permalink to &quot;业务分析&quot;">​</a></h2><ol><li>获取验证码 <ol><li>调用接口</li><li>获取参数并传参</li></ol></li><li>验证码登录/账号密码登录</li><li>游客登录</li><li>服务条款、隐私协议</li><li>忘记密码</li><li>微信授权登录</li></ol><h2 id="业务实现" tabindex="-1">业务实现 <a class="header-anchor" href="#业务实现" aria-label="Permalink to &quot;业务实现&quot;">​</a></h2><h3 id="获取验证码" tabindex="-1">获取验证码 <a class="header-anchor" href="#获取验证码" aria-label="Permalink to &quot;获取验证码&quot;">​</a></h3><p>点击获取验证码按钮</p><ul><li>判断用户有无输入手机号 <ul><li>无：弹出手机号为空提示，不调用接口</li><li>有：把手机号作为参数传给后端</li></ul></li><li>接口调用成功后 <ul><li>修改按钮文本</li><li>开启定时器 <ol><li>设置一个变量，初始值为60</li><li>每隔一秒自减1</li><li>变量为0时恢复内容，关闭定时器</li></ol></li><li>禁止按钮点击事件</li></ul></li></ul><p>当按钮被点击调用接口成功后禁用按钮，倒计时结束后恢复按钮点击</p><blockquote><p><strong>可实现的优化</strong> 可以为点击事件添加一个节流操作，防止用户短时间内点击多次调用多次接口。</p></blockquote><h3 id="登录" tabindex="-1">登录 <a class="header-anchor" href="#登录" aria-label="Permalink to &quot;登录&quot;">​</a></h3><p>获取用户输入的手机号与验证码（或者账号和密码），正则校验是否符合条件。校验通过调用接口，与机器码一同传递给后端（机器码在游客登录中详谈），失败则给用户提示。</p><p>根据接口返回的数据，利用 <code>uni.setStorageSync</code> 本地存储用户的 <code>cookie</code> 和 用户信息 <code>userInfo</code> 。</p><p>由于这个方法经常使用，且字段较多容易写错，更推荐把本地存储的方法抽取出来封装为几个函数使用：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setItem</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setStorageSync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key, data)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getItem</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getStorageSync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> removeItem</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">removeStorageSync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> clearItem</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">clearStorageSync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	setItem,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	getItem,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	removeItem,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	clearItem</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="游客登录" tabindex="-1">游客登录 <a class="header-anchor" href="#游客登录" aria-label="Permalink to &quot;游客登录&quot;">​</a></h3><p>本项目是一个上传项目，用户希望能够得知使用者对软件的使用情况以及记录他们的使用时间，因此需要获取到机器码（也就是使用者设备的唯一标识）。</p><p>对于这个需求，最开始开发时想到的是 <code>uni-app</code> 提供的 <code>uni.getDeviceInfo()</code> 方法，返回了 <code>deviceId</code> 设备id 。但是根据 <a href="https://uniapp.dcloud.net.cn/api/system/getDeviceInfo.html#getdeviceinfo" target="_blank" rel="noreferrer">官方文档</a> 描述在清除缓存后会改变，不符合要求，因此排除。</p><p>经过查询，发现原生 <code>plus</code> 有一个获取设备 uuid 的方法，返回的结果是一个16进制的字符串，符合要求。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getDeviceId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">reject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uuid </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> plus.device.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getDeviceId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(uuid)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="忘记密码" tabindex="-1">忘记密码 <a class="header-anchor" href="#忘记密码" aria-label="Permalink to &quot;忘记密码&quot;">​</a></h3><p>忘记密码与重置密码业务相近，原型相近，因此可以复用同一个页面，通过路径传参判断当前需要实现的是什么业务，通过 <code>uni.setNavigationBarTitle</code> 自定义初始化标题。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onLoad</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">val</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 传递type，做修改密码业务，修改标题</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (val.type) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		type.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> val.type</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setNavigationBarTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;修改密码&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h3 id="微信授权登录" tabindex="-1">微信授权登录 <a class="header-anchor" href="#微信授权登录" aria-label="Permalink to &quot;微信授权登录&quot;">​</a></h3><p>现在客户那边提出想要一个微信授权登录的功能，查看 <code>uniapp</code> 官方文档后发现相关方法，指路：<a href="https://uniapp.dcloud.net.cn/tutorial/app-oauth-weixin.html#%E5%BC%80%E9%80%9A" target="_blank" rel="noreferrer">App端微信授权登录</a> 。</p><p>首先需要前往 <code>manifest.json</code> 文件配置相关的 <code>appid</code> 、<code>appSecret</code> 、<code>UniversalLinks</code> 。步骤如下：</p><ul><li><code>appid</code> ：微信开放平台申请应用的 <code>AppID</code> 值</li><li><code>appSecret</code> ：微信开放平台申请应用的AppSecret值</li><li><code>UniversalLinks</code> ：iOS平台通用链接，必须与微信开放平台配置的一致</li></ul><p><img src="https://native-res.dcloud.net.cn/images/uniapp/oauth/weixin-manifest.png" alt="图片"></p><h4 id="测试版" tabindex="-1">测试版 <a class="header-anchor" href="#测试版" aria-label="Permalink to &quot;测试版&quot;">​</a></h4><p>为了方便测试和调试， <code>appSecret</code> 可以直接在源码中设置，如下：</p><p><img src="https://pic.imgdb.cn/item/64d49f9c1ddac507cc948536.jpg" alt="源码配置"></p><blockquote><p>注意：</p><p>这么配置的appsecret参数，云端打包后会保存在apk/ipa中，存在参数泄露的风险！且不经业务服务器验证完成登录。最好只在测试环境使用。</p></blockquote><p>配置完成之后通过 <code>uni.login</code> 方法，可以获取微信登录返回的 <code>openId</code> 与 <code>uniId</code> 。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">login</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    provider: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;weixin&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    success</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">loginRes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 登录成功</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(loginRes)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    fail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">err</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 登录授权失败  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // err.code是错误码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>打印的结果如下图所示：</p><p><img src="https://i.imgloc.com/2023/05/04/iPmfBQ.png" alt="iPmfBQ.png"></p><p>授权登录成功后可以获取用户信息，通过 <code>uni.getUserInfo</code> 方法。该方法可以获取用户的头像、昵称、性别等字段。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> wxLoginFn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	//其他勾选框校验</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">checkBox.value) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">showToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;请阅读服务条款与隐私协议&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			icon: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;none&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		});</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">showLoading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">login</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		provider: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;weixin&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		success</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">loginRes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">			// 登录成功</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getUserInfo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">				provider: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;weixin&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">				success</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">info</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">					uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hideLoading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">					// 获取用户信息成功, info.authResult保存用户信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(info)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">				}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		},</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		fail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">err</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">			// 登录授权失败  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">			// err.code是错误码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">showToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">				title: err,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">				icon: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;none&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			uni.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hideLoading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>获取到的返回结果如下所示：</p><p><img src="https://i.imgloc.com/2023/05/04/iPmADC.png" alt="iPmADC.png"></p><p>根据所拿到的数据对象与后端沟通，最后讨论出来的解决方案是把该 <code>openId</code> 连同手机号密码一起传递给后端接口即可。</p><p><strong>调试</strong></p><p>有两种方法可以调试：</p><ul><li>打正式包，缺点是无法修改，测试麻烦，无法看到 <code>console.log</code> 的参数</li><li>自定义基座。根据 <a href="https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground" target="_blank" rel="noreferrer">文档</a> 步骤操作，打完包后运行时运行自定义基座，即可在手机中真机运行，且能看到控制台打印。</li></ul>`,43),p=[l];function h(k,e,E,r,d,g){return a(),i("div",null,p)}const y=s(t,[["render",h]]);export{o as __pageData,y as default};
