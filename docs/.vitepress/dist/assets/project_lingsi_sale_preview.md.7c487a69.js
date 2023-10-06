import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const u=JSON.parse('{"title":"附件下载","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"附","7":"件","8":"下","9":"载"},"headers":[],"relativePath":"project/lingsi/sale/preview.md","filePath":"project/lingsi/sale/preview.md","lastUpdated":null}'),t={name:"project/lingsi/sale/preview.md"},p=l(`<h1 id="附件下载" tabindex="-1">附件下载 <a class="header-anchor" href="#附件下载" aria-label="Permalink to &quot;附件下载&quot;">​</a></h1><p>用户需要下载附件的功能，此时通过 <code>uni.downloadFile</code> 方法下载文件保存到临时地址，在其成功回调中调用 <code>openDocument</code> 方法下载附件。</p><p><code>openDocument</code> 方法参数如下所示</p><table><thead><tr><th style="text-align:left;">属性</th><th style="text-align:left;">类型</th><th style="text-align:left;">默认值</th><th style="text-align:left;">必填</th><th style="text-align:left;">说明</th><th style="text-align:left;">最低版本</th></tr></thead><tbody><tr><td style="text-align:left;">filePath</td><td style="text-align:left;">string</td><td style="text-align:left;"></td><td style="text-align:left;">是</td><td style="text-align:left;">文件路径 (本地路径) ，可通过 downloadFile 获得</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">showMenu</td><td style="text-align:left;">boolean</td><td style="text-align:left;">false</td><td style="text-align:left;">否</td><td style="text-align:left;">是否显示右上角菜单</td><td style="text-align:left;"><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html" target="_blank" rel="noreferrer">2.11.0</a></td></tr><tr><td style="text-align:left;">fileType</td><td style="text-align:left;">string</td><td style="text-align:left;"></td><td style="text-align:left;">否</td><td style="text-align:left;">文件类型，指定文件类型打开文件</td><td style="text-align:left;"><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html" target="_blank" rel="noreferrer">1.4.0</a></td></tr></tbody></table><p>微信小程序中文件保存到手机的方式比较特殊，我们需要把 <code>showMenu</code> 设为 <code>true</code> ，预览的时候显示右上角的菜单，通过另存为的方式保存文件。</p><p>示例代码：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">handleDownFn</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fileType</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> 获取文件的类型</span></span>
<span class="line"><span style="color:#E1E4E8;">	uni.</span><span style="color:#B392F0;">downloadFile</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">		url: 文件路径（后端返回）,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">success</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (data.statusCode </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				uni.</span><span style="color:#B392F0;">showToast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">					icon: </span><span style="color:#9ECBFF;">&#39;none&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">					mask: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">					title: </span><span style="color:#9ECBFF;">&#39;打开成功，请在预览处点击右上方的菜单另存为保存&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//保存路径</span></span>
<span class="line"><span style="color:#E1E4E8;">					duration: </span><span style="color:#79B8FF;">3000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				});</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// 通过内置文档对象打开文档，便于另存为</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">					wx.</span><span style="color:#B392F0;">openDocument</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">						filePath: data.tempFilePath,</span></span>
<span class="line"><span style="color:#E1E4E8;">						fileType,</span></span>
<span class="line"><span style="color:#E1E4E8;">						showMenu: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 关键，这里开启预览页面的右上角菜单，才能另存为</span></span>
<span class="line"><span style="color:#E1E4E8;">					})</span></span>
<span class="line"><span style="color:#E1E4E8;">				}, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		},</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">fail</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(err);</span></span>
<span class="line"><span style="color:#E1E4E8;">			uni.</span><span style="color:#B392F0;">showToast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">				icon: </span><span style="color:#9ECBFF;">&#39;none&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				mask: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				title: </span><span style="color:#9ECBFF;">&#39;失败请重新下载&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			});</span></span>
<span class="line"><span style="color:#E1E4E8;">		},</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">handleDownFn</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fileType</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> 获取文件的类型</span></span>
<span class="line"><span style="color:#24292E;">	uni.</span><span style="color:#6F42C1;">downloadFile</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">		url: 文件路径（后端返回）,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">success</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">data</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (data.statusCode </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				uni.</span><span style="color:#6F42C1;">showToast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">					icon: </span><span style="color:#032F62;">&#39;none&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">					mask: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">					title: </span><span style="color:#032F62;">&#39;打开成功，请在预览处点击右上方的菜单另存为保存&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//保存路径</span></span>
<span class="line"><span style="color:#24292E;">					duration: </span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">				});</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// 通过内置文档对象打开文档，便于另存为</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">					wx.</span><span style="color:#6F42C1;">openDocument</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">						filePath: data.tempFilePath,</span></span>
<span class="line"><span style="color:#24292E;">						fileType,</span></span>
<span class="line"><span style="color:#24292E;">						showMenu: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 关键，这里开启预览页面的右上角菜单，才能另存为</span></span>
<span class="line"><span style="color:#24292E;">					})</span></span>
<span class="line"><span style="color:#24292E;">				}, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		},</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">fail</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">err</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(err);</span></span>
<span class="line"><span style="color:#24292E;">			uni.</span><span style="color:#6F42C1;">showToast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">				icon: </span><span style="color:#032F62;">&#39;none&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">				mask: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">				title: </span><span style="color:#032F62;">&#39;失败请重新下载&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			});</span></span>
<span class="line"><span style="color:#24292E;">		},</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"><span style="color:#24292E;">},</span></span></code></pre></div><h2 id="遇到的问题" tabindex="-1">遇到的问题 <a class="header-anchor" href="#遇到的问题" aria-label="Permalink to &quot;遇到的问题&quot;">​</a></h2><p>运行之后效果实现了，本来以为松了口气，但是测试说她的 IOS 系统手机无法打开预览，测试一下后发现报错，报错信息为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">openDocument:fail filetype not supported</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">openDocument:fail filetype not supported</span></span></code></pre></div><p>解决方法：<code>openDocument</code> 方法设置 <code>fileType</code> 参数，传递其要显示的文件的类型（由于代码量不大，因此上方代码已包含该功能）。</p><p>添加之后，苹果系统的手机也可预览了。</p><blockquote><p>拓展</p><p>最新版代码去掉了 <code>wx.saveFile</code> 方法。直接 <code>wx.downloadFile</code> 后 <code>wx.openDocument</code> 即可预览，忽略了保存文件方法。</p></blockquote><p>但是还没结束，后台附件上传了格式为图片的附件时， IOS 系统的手机又打不开了。搜索了一下找到解决方法：</p><p>判断当前的文件的格式，如果是图片格式则通过 <code>previewImage</code> 方法打开图片预览，用户通过长按的方式保存图片；如果是其他文件格式，则继续使用<code>openDocument</code> 方法打开。</p><h2 id="最终代码" tabindex="-1">最终代码 <a class="header-anchor" href="#最终代码" aria-label="Permalink to &quot;最终代码&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 下载文件</span></span>
<span class="line"><span style="color:#B392F0;">handleDownFn</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">imgType</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;jpg&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;png&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;jpeg&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;webp&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;bmp&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fileType</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> 文件格式</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">	uni.</span><span style="color:#B392F0;">downloadFile</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">		url: 文件路径,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">success</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (data.statusCode </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				uni.</span><span style="color:#B392F0;">showToast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">					icon: </span><span style="color:#9ECBFF;">&#39;none&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">					mask: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">					title: </span><span style="color:#9ECBFF;">&#39;打开成功，请在预览处点击右上方的菜单另存为保存&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//保存路径</span></span>
<span class="line"><span style="color:#E1E4E8;">					duration: </span><span style="color:#79B8FF;">3000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				});</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">//文件保存到本地</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// 通过内置文档对象打开文档，便于另存为</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                      </span><span style="color:#6A737D;">// 判断是否为图片</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (imgType.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(fileType)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">						uni.</span><span style="color:#B392F0;">previewImage</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">							showmenu: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">							current: data.tempFilePath, </span><span style="color:#6A737D;">// 当前显示图片的http链接</span></span>
<span class="line"><span style="color:#E1E4E8;">							urls: [data.tempFilePath]</span></span>
<span class="line"><span style="color:#E1E4E8;">						})</span></span>
<span class="line"><span style="color:#E1E4E8;">					} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">						wx.</span><span style="color:#B392F0;">openDocument</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">							filePath: data.tempFilePath,</span></span>
<span class="line"><span style="color:#E1E4E8;">							fileType,</span></span>
<span class="line"><span style="color:#E1E4E8;">							showMenu: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 关键，这里开启预览页面的右上角菜单，才能另存为</span></span>
<span class="line"><span style="color:#E1E4E8;">						})</span></span>
<span class="line"><span style="color:#E1E4E8;">					}</span></span>
<span class="line"><span style="color:#E1E4E8;">				}, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		},</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">fail</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(err);</span></span>
<span class="line"><span style="color:#E1E4E8;">			uni.</span><span style="color:#B392F0;">showToast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">				icon: </span><span style="color:#9ECBFF;">&#39;none&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				mask: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				title: </span><span style="color:#9ECBFF;">&#39;失败请重新下载&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			});</span></span>
<span class="line"><span style="color:#E1E4E8;">		},</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 下载文件</span></span>
<span class="line"><span style="color:#6F42C1;">handleDownFn</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">imgType</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;jpg&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;png&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;jpeg&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;webp&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;bmp&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fileType</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> 文件格式</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">	uni.</span><span style="color:#6F42C1;">downloadFile</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">		url: 文件路径,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">success</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">data</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (data.statusCode </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				uni.</span><span style="color:#6F42C1;">showToast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">					icon: </span><span style="color:#032F62;">&#39;none&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">					mask: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">					title: </span><span style="color:#032F62;">&#39;打开成功，请在预览处点击右上方的菜单另存为保存&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//保存路径</span></span>
<span class="line"><span style="color:#24292E;">					duration: </span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">				});</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">//文件保存到本地</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// 通过内置文档对象打开文档，便于另存为</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                      </span><span style="color:#6A737D;">// 判断是否为图片</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (imgType.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(fileType)) {</span></span>
<span class="line"><span style="color:#24292E;">						uni.</span><span style="color:#6F42C1;">previewImage</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">							showmenu: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">							current: data.tempFilePath, </span><span style="color:#6A737D;">// 当前显示图片的http链接</span></span>
<span class="line"><span style="color:#24292E;">							urls: [data.tempFilePath]</span></span>
<span class="line"><span style="color:#24292E;">						})</span></span>
<span class="line"><span style="color:#24292E;">					} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">						wx.</span><span style="color:#6F42C1;">openDocument</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">							filePath: data.tempFilePath,</span></span>
<span class="line"><span style="color:#24292E;">							fileType,</span></span>
<span class="line"><span style="color:#24292E;">							showMenu: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 关键，这里开启预览页面的右上角菜单，才能另存为</span></span>
<span class="line"><span style="color:#24292E;">						})</span></span>
<span class="line"><span style="color:#24292E;">					}</span></span>
<span class="line"><span style="color:#24292E;">				}, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		},</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">fail</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">err</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(err);</span></span>
<span class="line"><span style="color:#24292E;">			uni.</span><span style="color:#6F42C1;">showToast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">				icon: </span><span style="color:#032F62;">&#39;none&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">				mask: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">				title: </span><span style="color:#032F62;">&#39;失败请重新下载&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			});</span></span>
<span class="line"><span style="color:#24292E;">		},</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,17),o=[p];function e(c,E,r,y,i,d){return n(),a("div",null,o)}const h=s(t,[["render",e]]);export{u as __pageData,h as default};
