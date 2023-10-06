import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.2ee92742.js";const d=JSON.parse('{"title":"项目初始化","description":"","frontmatter":{},"headers":[],"relativePath":"project/myself/小兔鲜/inuni/index.md","filePath":"project/myself/小兔鲜/inuni/index.md","lastUpdated":null}'),l={name:"project/myself/小兔鲜/inuni/index.md"},o=p(`<h1 id="项目初始化" tabindex="-1">项目初始化 <a class="header-anchor" href="#项目初始化" aria-label="Permalink to &quot;项目初始化&quot;">​</a></h1><h2 id="项目创建" tabindex="-1">项目创建 <a class="header-anchor" href="#项目创建" aria-label="Permalink to &quot;项目创建&quot;">​</a></h2><h3 id="hbuilder-创建" tabindex="-1">hbuilder 创建 <a class="header-anchor" href="#hbuilder-创建" aria-label="Permalink to &quot;hbuilder 创建&quot;">​</a></h3><ol><li><p>下载 <code>hbuilder</code> ，官网指路：<a href="https://www.dcloud.io/hbuilderx.html" target="_blank" rel="noreferrer">hbuilder</a></p></li><li><p>新建项目，选择默认模板即可，版本选择 <code>Vue3</code></p></li><li><p>点击运行，选择微信小程序运行</p><p>如果是第一次运行，他需要使用者给出微信小程序开发工具下载的路径地址，用于开启微信开发者工具。</p><p>如果是初次运行且没打开微信开发者工具，他会报错，提示还没打开，打开即可。</p><p>如果需要预览，需要配置 APPID ，在 <code>mainifets.json</code> 文件中的微信小程序配置添加。</p></li><li><p>通过 <code>HBuilderX</code> 修改代码，通过微信开发者工具调试页面效果</p></li></ol><h3 id="命令行创建" tabindex="-1">命令行创建 <a class="header-anchor" href="#命令行创建" aria-label="Permalink to &quot;命令行创建&quot;">​</a></h3><p>使用命令行创建 <code>vue3 + ts</code> 项目步骤如下：</p><ol><li><p>输入命令行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npx degit dcloudio/uni-preset-vue#vite-ts 项目名</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npx degit dcloudio/uni-preset-vue#vite-ts 项目名</span></span></code></pre></div></li><li><p>配置微信开发工具地址、配置 APPID 等操作（和上面一样）</p></li><li><p>启动终端（首次使用需要先安装插件），再下载依赖</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm i</span></span>
<span class="line"><span style="color:#e1e4e8;">#or</span></span>
<span class="line"><span style="color:#e1e4e8;">yarn</span></span>
<span class="line"><span style="color:#e1e4e8;"># or</span></span>
<span class="line"><span style="color:#e1e4e8;">pnpm i</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npm i</span></span>
<span class="line"><span style="color:#24292e;">#or</span></span>
<span class="line"><span style="color:#24292e;">yarn</span></span>
<span class="line"><span style="color:#24292e;"># or</span></span>
<span class="line"><span style="color:#24292e;">pnpm i</span></span></code></pre></div></li><li><p>通过命令启动项目</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm run dev:mp-weixin</span></span>
<span class="line"><span style="color:#e1e4e8;"># or</span></span>
<span class="line"><span style="color:#e1e4e8;">yarn dev:mp-weixin</span></span>
<span class="line"><span style="color:#e1e4e8;"># or</span></span>
<span class="line"><span style="color:#e1e4e8;">pnpm dev:mp-weixin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npm run dev:mp-weixin</span></span>
<span class="line"><span style="color:#24292e;"># or</span></span>
<span class="line"><span style="color:#24292e;">yarn dev:mp-weixin</span></span>
<span class="line"><span style="color:#24292e;"># or</span></span>
<span class="line"><span style="color:#24292e;">pnpm dev:mp-weixin</span></span></code></pre></div></li><li><p>启动项目成功后会在根目录下新增一个 <code>dist</code> 文件夹，打开微信开发者工具，导入 <code>dist/dev/mp-weixin</code> 文件夹，起一个项目名称，即可启动项目</p></li><li><p>安装拓展</p><p>VS code 安装对应插件帮助开发过程更舒服，插件如下：</p><ul><li>快速创建 <code>uniapp</code> 页面：<code>uni-create-view</code></li><li><code>uniapp</code> 代码提示：<code>uni-helper</code></li><li>鼠标悬停查看文档：<code>uniapp小程序扩展</code></li></ul></li><li><p>安装 TS 配置</p><ul><li><p>安装依赖</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm i -D @types/wechat-miniprogram @uni-helper/uni-app-types</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm i -D @types/wechat-miniprogram @uni-helper/uni-app-types</span></span></code></pre></div></li><li><p>在 <code>tsconfig.json</code> 文件修改添加 TS 校验</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;compilerOptions&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;types&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@dcloudio/types&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@types/wechat-miniprogram&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@uni-helper/uni-app-types&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;vueCompilerOptions&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;experimentalRuntimeMode&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;runtime-uni-app&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;compilerOptions&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;types&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@dcloudio/types&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@types/wechat-miniprogram&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@uni-helper/uni-app-types&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;vueCompilerOptions&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;experimentalRuntimeMode&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;runtime-uni-app&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li></ul><p><img src="https://pic.imgdb.cn/item/64dae7ab1ddac507cc966334.jpg" alt="zongjie"></p></li><li><p>配置 VS code 的设置让 <code>json</code> 文件允许添加注释</p><ul><li>打开设置</li><li>输入 “文件关联”</li><li>点击添加项按钮</li><li>添加 <code>mainifest.json</code> 和 <code>pages.json</code> 两个文件，值为 <code>jsonc</code></li></ul><p>效果如下图所示：</p><p><img src="https://pic.imgdb.cn/item/64dae7111ddac507cc94fb62.jpg" alt="效果"></p></li></ol><h2 id="uni-ui-安装" tabindex="-1">UNI-UI 安装 <a class="header-anchor" href="#uni-ui-安装" aria-label="Permalink to &quot;UNI-UI 安装&quot;">​</a></h2><p>官网指路：<a href="https://uniapp.dcloud.net.cn/component/uniui/quickstart.html" target="_blank" rel="noreferrer">uni-ui 官网</a> 。</p><p>由于项目是命令行创建的，因此采取 NPM 的方式引入项目，比单独引入好处在于可以获取最新版。</p><p>安装命令如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm i sass sass-loader@10.1.1 -D</span></span>
<span class="line"><span style="color:#e1e4e8;">pnpm i @dcloudio/uni-ui</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm i sass sass-loader@10.1.1 -D</span></span>
<span class="line"><span style="color:#24292e;">pnpm i @dcloudio/uni-ui</span></span></code></pre></div><p><strong>配置 easycom</strong></p><p>使用 <code>npm</code> 安装好 <code>uni-ui</code> 之后，需要配置 <code>easycom</code> 规则，让 <code>npm</code> 安装的组件支持 <code>easycom</code></p><p>打开项目根目录下的 <code>pages.json</code> 并添加 <code>easycom</code> 节点：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// pages.json</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 组件自动引入规则</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;easycom&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 是否开启自动扫描</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;autoscan&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 正则方式自定义组件匹配规则</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;custom&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// uni-ui 规则如下配置</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;^uni-(.*)&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 其他内容</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">pages</span><span style="color:#E1E4E8;">:[</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">	]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// pages.json</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 组件自动引入规则</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;easycom&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 是否开启自动扫描</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;autoscan&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 正则方式自定义组件匹配规则</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;custom&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// uni-ui 规则如下配置</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;^uni-(.*)&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue&quot;</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 其他内容</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">pages</span><span style="color:#24292E;">:[</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">	]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>配置 TS 类型</strong></p><p>官方在写 <code>uni-ui</code> 时用 js 来写，因此没有类型。不过前端生态圈很完善，有民间人士写了相关的类型第三方库，配置步骤如下：</p><ol><li><p>安装依赖</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm i @uni-helper/uni-ui-types -D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm i @uni-helper/uni-ui-types -D</span></span></code></pre></div></li><li><p>去往 <code>tsconfig.json</code> 文件配置</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;compilerOptions&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;types&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@uni-helper/uni-ui-types&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;compilerOptions&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;types&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@uni-helper/uni-ui-types&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li></ol><h2 id="状态管理" tabindex="-1">状态管理 <a class="header-anchor" href="#状态管理" aria-label="Permalink to &quot;状态管理&quot;">​</a></h2><p>状态管理使用了 <code>pinia</code> ，通过插件 <code>pinia-plugin-persistedstate</code> 实现持久化存储，用法与之前的一致。</p><p>在 <code>stores/index.ts</code> 文件中，创建 <code>pinia</code> 仓库：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createPinia } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;pinia&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> persist </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;pinia-plugin-persistedstate&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 创建 pinia 实例</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pinia</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createPinia</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 使用持久化存储插件</span></span>
<span class="line"><span style="color:#E1E4E8;">pinia.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(persist);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 默认导出，给 main.ts 使用</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> pinia;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 模块统一导出</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./modules/member&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createPinia } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;pinia&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> persist </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;pinia-plugin-persistedstate&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 创建 pinia 实例</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pinia</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createPinia</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 使用持久化存储插件</span></span>
<span class="line"><span style="color:#24292E;">pinia.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(persist);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 默认导出，给 main.ts 使用</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> pinia;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 模块统一导出</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./modules/member&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>在模块化 <code>stores/modules/member.ts</code> 中通过组合式创建模块话仓库：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineStore } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;pinia&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ref } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 定义 Store</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">useMemberStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineStore</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;member&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 会员信息</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">profile</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">&gt;()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 保存会员信息，登录时使用</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setProfile</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">val</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      profile.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> val</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 清理会员信息，退出时使用</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">clearProfile</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      profile.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 记得 return</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      profile,</span></span>
<span class="line"><span style="color:#E1E4E8;">      setProfile,</span></span>
<span class="line"><span style="color:#E1E4E8;">      clearProfile,</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// TODO: 持久化</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    persist: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineStore } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;pinia&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ref } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 定义 Store</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">useMemberStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineStore</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;member&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 会员信息</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">profile</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">&gt;()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 保存会员信息，登录时使用</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setProfile</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">val</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      profile.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> val</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 清理会员信息，退出时使用</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">clearProfile</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      profile.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 记得 return</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      profile,</span></span>
<span class="line"><span style="color:#24292E;">      setProfile,</span></span>
<span class="line"><span style="color:#24292E;">      clearProfile,</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// TODO: 持久化</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    persist: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">)</span></span></code></pre></div><p>在 <code>main.ts</code> 文件中，引入 <code>pinia</code> 并注册：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createSSRApp } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./App.vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> pinia </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@/stores/index&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">app</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createSSRApp</span><span style="color:#E1E4E8;">(App);</span></span>
<span class="line"><span style="color:#E1E4E8;">  app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(pinia);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    app,</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createSSRApp } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./App.vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> pinia </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@/stores/index&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createApp</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">app</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createSSRApp</span><span style="color:#24292E;">(App);</span></span>
<span class="line"><span style="color:#24292E;">  app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(pinia);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    app,</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>注意</p><p>通过 <code>vue3 + uniapp</code> 创建的项目在微信小程序运行时，本地村粗不再是通过 <code>localStorage</code> ，而是通过 <code>uni.getStorageSync()</code> 等 API 实现。</p><p>因此，如果使用之前的本地持久化方法 <code>{ persist: true }</code> 会无法生效，需要修改持久化的方法。代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineStore } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;pinia&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ref } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 定义 Store</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">useMemberStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineStore</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;member&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// TODO: 持久化</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    persist: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      storage: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">key</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> uni.</span><span style="color:#B392F0;">getStorageSync</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">setItem</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">key</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">value</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          uni.</span><span style="color:#B392F0;">setStorageSync</span><span style="color:#E1E4E8;">(key, value);</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineStore } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;pinia&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ref } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 定义 Store</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">useMemberStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineStore</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;member&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// TODO: 持久化</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    persist: {</span></span>
<span class="line"><span style="color:#24292E;">      storage: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#E36209;">key</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> uni.</span><span style="color:#6F42C1;">getStorageSync</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">setItem</span><span style="color:#24292E;">(</span><span style="color:#E36209;">key</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">, </span><span style="color:#E36209;">value</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          uni.</span><span style="color:#6F42C1;">setStorageSync</span><span style="color:#24292E;">(key, value);</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div></blockquote><h2 id="请求封装" tabindex="-1">请求封装 <a class="header-anchor" href="#请求封装" aria-label="Permalink to &quot;请求封装&quot;">​</a></h2><h3 id="拦截器封装" tabindex="-1">拦截器封装 <a class="header-anchor" href="#拦截器封装" aria-label="Permalink to &quot;拦截器封装&quot;">​</a></h3><p>小程序与 APP 不支持 <code>axios</code> ，可以使用 <code>uniapp</code> 提供的 <code>uni.request</code> 方法发送请求获取数据。该方法可通过 <code>uni.addInterceptor</code> 做二次封装。</p><p>二次封装的思路如下：</p><ul><li><p>拦截器</p><p><code>request</code> 请求、<code>uploadFile</code> 上传文件请求</p></li><li><p>请求函数</p><ol><li>基础地址，并判断当前路径是否是完整路径。非完整路径则拼接基准路径</li><li>超时时间。默认 60 秒，单位为毫秒</li><li>添加小程序端请求体标识</li><li>添加 <code>token</code></li></ol></li></ul><p>代码如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 添加拦截器：</span></span>
<span class="line"><span style="color:#6A737D;"> *  拦截 request 请求</span></span>
<span class="line"><span style="color:#6A737D;"> *  拦截 uploadFile 文件上传</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * 需要实现的步骤：</span></span>
<span class="line"><span style="color:#6A737D;"> *  非 http 开头需要拼接地址</span></span>
<span class="line"><span style="color:#6A737D;"> *  请求超时</span></span>
<span class="line"><span style="color:#6A737D;"> *  添加小程序端请求体标识</span></span>
<span class="line"><span style="color:#6A737D;"> *  添加 token 请求体标识</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useMemberStore } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@/stores/index&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 基准路径</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseURL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;https://pcapi-xiaotuxian-front-devtest.itheima.net&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 添加拦截器</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">httpInterceptor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 拦截前触发</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">invoke</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">options</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UniApp</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">RequestOptions</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 非 http 开通需要拼接地址</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">options.url.</span><span style="color:#B392F0;">startsWith</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;http&quot;</span><span style="color:#E1E4E8;">)) options.url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> baseURL </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> options.url;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 请求超时，默认60s，单位为ms</span></span>
<span class="line"><span style="color:#E1E4E8;">    options.timeout </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 3. 添加小程序端请求头标识</span></span>
<span class="line"><span style="color:#E1E4E8;">    options.header </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">options.header,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;source-client&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;miniapp&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 4. 添加 token 请求头</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">memberStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useMemberStore</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">token</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> memberStore.profile?.token;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (token) options.header.Authorization </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> token;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">uni.</span><span style="color:#B392F0;">addInterceptor</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;request&quot;</span><span style="color:#E1E4E8;">, httpInterceptor);</span></span>
<span class="line"><span style="color:#E1E4E8;">uni.</span><span style="color:#B392F0;">addInterceptor</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;uploadFile&quot;</span><span style="color:#E1E4E8;">, httpInterceptor);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 添加拦截器：</span></span>
<span class="line"><span style="color:#6A737D;"> *  拦截 request 请求</span></span>
<span class="line"><span style="color:#6A737D;"> *  拦截 uploadFile 文件上传</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * 需要实现的步骤：</span></span>
<span class="line"><span style="color:#6A737D;"> *  非 http 开头需要拼接地址</span></span>
<span class="line"><span style="color:#6A737D;"> *  请求超时</span></span>
<span class="line"><span style="color:#6A737D;"> *  添加小程序端请求体标识</span></span>
<span class="line"><span style="color:#6A737D;"> *  添加 token 请求体标识</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useMemberStore } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@/stores/index&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 基准路径</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseURL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;https://pcapi-xiaotuxian-front-devtest.itheima.net&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 添加拦截器</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">httpInterceptor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 拦截前触发</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">invoke</span><span style="color:#24292E;">(</span><span style="color:#E36209;">options</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UniApp</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">RequestOptions</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 非 http 开通需要拼接地址</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">options.url.</span><span style="color:#6F42C1;">startsWith</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;http&quot;</span><span style="color:#24292E;">)) options.url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> baseURL </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> options.url;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 请求超时，默认60s，单位为ms</span></span>
<span class="line"><span style="color:#24292E;">    options.timeout </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10000</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 3. 添加小程序端请求头标识</span></span>
<span class="line"><span style="color:#24292E;">    options.header </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">options.header,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;source-client&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;miniapp&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 4. 添加 token 请求头</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">memberStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useMemberStore</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">token</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> memberStore.profile?.token;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (token) options.header.Authorization </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> token;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">uni.</span><span style="color:#6F42C1;">addInterceptor</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;request&quot;</span><span style="color:#24292E;">, httpInterceptor);</span></span>
<span class="line"><span style="color:#24292E;">uni.</span><span style="color:#6F42C1;">addInterceptor</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;uploadFile&quot;</span><span style="color:#24292E;">, httpInterceptor);</span></span></code></pre></div><h3 id="请求函数封装" tabindex="-1">请求函数封装 <a class="header-anchor" href="#请求函数封装" aria-label="Permalink to &quot;请求函数封装&quot;">​</a></h3><p>封装完拦截器后，在 <code>.vue</code> 文件中导入相关文件，再通过 <code>uni.request</code> 方法即可实现接口请求。代码如下：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@/utils/http&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getBanner</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  uni.</span><span style="color:#B392F0;">request</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    method: </span><span style="color:#9ECBFF;">&quot;GET&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    url: </span><span style="color:#9ECBFF;">&quot;/home/banner&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@/utils/http&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getBanner</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  uni.</span><span style="color:#6F42C1;">request</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    method: </span><span style="color:#032F62;">&quot;GET&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    url: </span><span style="color:#032F62;">&quot;/home/banner&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>但是如果每个接口都需要这么写，重复步骤太多显得繁琐，最好的方法是封装一个请求函数，按需导出给外部使用。在 <code>utils/http.ts</code> 文件中封装一个请求函数，思路如下：</p><ol><li>返回 <code>Promise</code> 对象</li><li>判断其请求响应状态 <ul><li>成功：提取核心数据，添加类型，支持泛型</li><li>失败：判断错误类型并作出相应的处理</li></ul></li><li>设置泛型返回数据类型</li></ol><p>代码如下：</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 响应函数</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">UniApp.RequestOptions</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@returns</span><span style="color:#6A737D;"> Promise</span></span>
<span class="line"><span style="color:#6A737D;"> *  1. 返回 Promise 对象</span></span>
<span class="line"><span style="color:#6A737D;"> *  2. 请求成功</span></span>
<span class="line"><span style="color:#6A737D;"> *    2.1 提取核心数据</span></span>
<span class="line"><span style="color:#6A737D;"> *    2.2 添加类型，支持泛型</span></span>
<span class="line"><span style="color:#6A737D;"> *  3. 请求失败</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.1 网络错误 -&gt; 提示用户更换网络</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.2 401错误 -&gt; 清除用户信息，跳转登录页</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.1 其他错误 -&gt; 根据后端错误信息提示</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Data</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">code</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">msg</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">result</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 泛型支持</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">,&gt;(</span><span style="color:#FFAB70;">options</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UniApp</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">RequestOptions</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 返回 Promise 对象</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">Data</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;&gt;((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    uni.</span><span style="color:#B392F0;">request</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">options,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 请求成功</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">success</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 提取核心数据 res.data</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(res.data </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Data</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;);</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 请求失败</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">fail</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 给予轻提示</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(err);</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 响应函数</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">UniApp.RequestOptions</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@returns</span><span style="color:#6A737D;"> Promise</span></span>
<span class="line"><span style="color:#6A737D;"> *  1. 返回 Promise 对象</span></span>
<span class="line"><span style="color:#6A737D;"> *  2. 请求成功</span></span>
<span class="line"><span style="color:#6A737D;"> *    2.1 提取核心数据</span></span>
<span class="line"><span style="color:#6A737D;"> *    2.2 添加类型，支持泛型</span></span>
<span class="line"><span style="color:#6A737D;"> *  3. 请求失败</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.1 网络错误 -&gt; 提示用户更换网络</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.2 401错误 -&gt; 清除用户信息，跳转登录页</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.1 其他错误 -&gt; 根据后端错误信息提示</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Data</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">code</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">msg</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">result</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 泛型支持</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> &lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">,&gt;(</span><span style="color:#E36209;">options</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UniApp</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">RequestOptions</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 返回 Promise 对象</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">Data</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;&gt;((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">, </span><span style="color:#E36209;">reject</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    uni.</span><span style="color:#6F42C1;">request</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">options,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 请求成功</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">success</span><span style="color:#24292E;">(</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 提取核心数据 res.data</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(res.data </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Data</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;);</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 请求失败</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">fail</span><span style="color:#24292E;">(</span><span style="color:#E36209;">err</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 给予轻提示</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(err);</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>现在只需要按需导入使用即可。代码如下：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { http } </span><span style="color:#9ECBFF;">&#39;@/utils/http&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">const getBanner = () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  http&lt;string[]&gt;({</span></span>
<span class="line"><span style="color:#E1E4E8;">    method: &#39;GET&#39;,</span></span>
<span class="line"><span style="color:#E1E4E8;">    url: &#39;/home/banner&#39;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  }).then(res =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.log(res)</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { http } </span><span style="color:#032F62;">&#39;@/utils/http&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">const getBanner = () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  http&lt;string[]&gt;({</span></span>
<span class="line"><span style="color:#24292E;">    method: &#39;GET&#39;,</span></span>
<span class="line"><span style="color:#24292E;">    url: &#39;/home/banner&#39;,</span></span>
<span class="line"><span style="color:#24292E;">  }).then(res =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    console.log(res)</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/script&gt;</span></span></code></pre></div><p>但是刚才的封装并没有太严谨，因为请求响应成功后他并没有做状态码的区分，需要做状态码判断处理。</p><p>错误处理总共分为以下几部分：</p><ol><li>请求失败</li><li>登录过期</li><li>网络无响应</li></ol><p>针对不同的错误做不同的处理，代码如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 泛型支持</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#79B8FF;">T</span><span style="color:#E1E4E8;">&gt;(options: UniApp.RequestOptions) =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 返回 Promise 对象</span></span>
<span class="line"><span style="color:#E1E4E8;">  return </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">Data</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;&gt;((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    uni.</span><span style="color:#B392F0;">request</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">options,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 请求成功</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">success</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(res)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (res.statusCode </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> res.statusCode </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 提取核心数据 res.data</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(res.data </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Data</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (res.statusCode </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">401</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 登录过期，清除登录信息</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">memberStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useMemberStore</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          memberStore.</span><span style="color:#B392F0;">clearProfile</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 返回登录页</span></span>
<span class="line"><span style="color:#E1E4E8;">          uni.</span><span style="color:#B392F0;">navigateTo</span><span style="color:#E1E4E8;">({ url: </span><span style="color:#9ECBFF;">&#39;/pages/login/index&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(res)</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          uni.</span><span style="color:#B392F0;">showToast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">            icon: </span><span style="color:#9ECBFF;">&#39;none&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            title: (res.data </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Data</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;).msg </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;请求错误&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          })</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(res)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 请求失败</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">fail</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        uni.</span><span style="color:#B392F0;">showToast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">          icon: </span><span style="color:#9ECBFF;">&#39;none&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          title: </span><span style="color:#9ECBFF;">&#39;网络错误，换个网络试试&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 给予轻提示</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 泛型支持</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> &lt;</span><span style="color:#005CC5;">T</span><span style="color:#24292E;">&gt;(options: UniApp.RequestOptions) =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 返回 Promise 对象</span></span>
<span class="line"><span style="color:#24292E;">  return </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">Data</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;&gt;((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">, </span><span style="color:#E36209;">reject</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    uni.</span><span style="color:#6F42C1;">request</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">options,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 请求成功</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">success</span><span style="color:#24292E;">(</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(res)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (res.statusCode </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> res.statusCode </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 提取核心数据 res.data</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(res.data </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Data</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;)</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (res.statusCode </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">401</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 登录过期，清除登录信息</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">memberStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useMemberStore</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          memberStore.</span><span style="color:#6F42C1;">clearProfile</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 返回登录页</span></span>
<span class="line"><span style="color:#24292E;">          uni.</span><span style="color:#6F42C1;">navigateTo</span><span style="color:#24292E;">({ url: </span><span style="color:#032F62;">&#39;/pages/login/index&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(res)</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          uni.</span><span style="color:#6F42C1;">showToast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">            icon: </span><span style="color:#032F62;">&#39;none&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            title: (res.data </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Data</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;).msg </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;请求错误&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          })</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(res)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 请求失败</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">fail</span><span style="color:#24292E;">(</span><span style="color:#E36209;">err</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        uni.</span><span style="color:#6F42C1;">showToast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">          icon: </span><span style="color:#032F62;">&#39;none&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          title: </span><span style="color:#032F62;">&#39;网络错误，换个网络试试&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 给予轻提示</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="接口类型设置" tabindex="-1">接口类型设置 <a class="header-anchor" href="#接口类型设置" aria-label="Permalink to &quot;接口类型设置&quot;">​</a></h3><p>接口设置了类型之后该类型会被泛型 <code>T</code> 接收，作为 <code>result</code> 属性的数据类型。接口函数 <code>ts</code> 类型如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getHomeCategoryApi</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">CategoryItem</span><span style="color:#E1E4E8;">[]&gt;({</span></span>
<span class="line"><span style="color:#E1E4E8;">    method: </span><span style="color:#9ECBFF;">&#39;GET&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    url: </span><span style="color:#9ECBFF;">&#39;/home/category/mutli&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getHomeCategoryApi</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">CategoryItem</span><span style="color:#24292E;">[]&gt;({</span></span>
<span class="line"><span style="color:#24292E;">    method: </span><span style="color:#032F62;">&#39;GET&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    url: </span><span style="color:#032F62;">&#39;/home/category/mutli&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h3 id="请求拦截器与请求函数的封装" tabindex="-1">请求拦截器与请求函数的封装 <a class="header-anchor" href="#请求拦截器与请求函数的封装" aria-label="Permalink to &quot;请求拦截器与请求函数的封装&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 添加拦截器：</span></span>
<span class="line"><span style="color:#6A737D;"> *  拦截 request 请求</span></span>
<span class="line"><span style="color:#6A737D;"> *  拦截 uploadFile 文件上传</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * 需要实现的步骤：</span></span>
<span class="line"><span style="color:#6A737D;"> *  非 http 开头需要拼接地址</span></span>
<span class="line"><span style="color:#6A737D;"> *  请求超时</span></span>
<span class="line"><span style="color:#6A737D;"> *  添加小程序端请求体标识</span></span>
<span class="line"><span style="color:#6A737D;"> *  添加 token 请求体标识</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useMemberStore } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/stores/index&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 基准路径</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseURL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://pcapi-xiaotuxian-front-devtest.itheima.net&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 添加拦截器</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">httpInterceptor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 拦截前触发</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">invoke</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">options</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UniApp</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">RequestOptions</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 非 http 开通需要拼接地址</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">options.url.</span><span style="color:#B392F0;">startsWith</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;http&#39;</span><span style="color:#E1E4E8;">)) options.url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> baseURL </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> options.url</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 请求超时，默认60s，单位为ms</span></span>
<span class="line"><span style="color:#E1E4E8;">    options.timeout </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 3. 添加小程序端请求头标识</span></span>
<span class="line"><span style="color:#E1E4E8;">    options.header </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">options.header,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;source-client&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;miniapp&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 4. 添加 token 请求头</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">memberStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useMemberStore</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">token</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> memberStore.profile?.token</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (token) options.header.Authorization </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> token</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">uni.</span><span style="color:#B392F0;">addInterceptor</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;request&#39;</span><span style="color:#E1E4E8;">, httpInterceptor)</span></span>
<span class="line"><span style="color:#E1E4E8;">uni.</span><span style="color:#B392F0;">addInterceptor</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;uploadFile&#39;</span><span style="color:#E1E4E8;">, httpInterceptor)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 响应函数</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">UniApp.RequestOptions</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@returns</span><span style="color:#6A737D;"> Promise</span></span>
<span class="line"><span style="color:#6A737D;"> *  1. 返回 Promise 对象</span></span>
<span class="line"><span style="color:#6A737D;"> *  2. 请求成功</span></span>
<span class="line"><span style="color:#6A737D;"> *    2.1 提取核心数据</span></span>
<span class="line"><span style="color:#6A737D;"> *    2.2 添加类型，支持泛型</span></span>
<span class="line"><span style="color:#6A737D;"> *  3. 请求失败</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.1 网络错误 -&gt; 提示用户更换网络</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.2 401错误 -&gt; 清除用户信息，跳转登录页</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.1 其他错误 -&gt; 根据后端错误信息提示</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Data</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">code</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">msg</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">result</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">T</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 泛型支持</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#79B8FF;">T</span><span style="color:#E1E4E8;">&gt;(options: UniApp.RequestOptions) =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 返回 Promise 对象</span></span>
<span class="line"><span style="color:#E1E4E8;">  return </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">Data</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;&gt;((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    uni.</span><span style="color:#B392F0;">request</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">options,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 请求成功</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">success</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(res)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (res.statusCode </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> res.statusCode </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 提取核心数据 res.data</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(res.data </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Data</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (res.statusCode </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">401</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 登录过期，清除登录信息</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">memberStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useMemberStore</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          memberStore.</span><span style="color:#B392F0;">clearProfile</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 返回登录页</span></span>
<span class="line"><span style="color:#E1E4E8;">          uni.</span><span style="color:#B392F0;">navigateTo</span><span style="color:#E1E4E8;">({ url: </span><span style="color:#9ECBFF;">&#39;/pages/login/index&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(res)</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          uni.</span><span style="color:#B392F0;">showToast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">            icon: </span><span style="color:#9ECBFF;">&#39;none&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            title: (res.data </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Data</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;).msg </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;请求错误&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          })</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(res)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 请求失败</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">fail</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        uni.</span><span style="color:#B392F0;">showToast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">          icon: </span><span style="color:#9ECBFF;">&#39;none&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          title: </span><span style="color:#9ECBFF;">&#39;网络错误，换个网络试试&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 给予轻提示</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 添加拦截器：</span></span>
<span class="line"><span style="color:#6A737D;"> *  拦截 request 请求</span></span>
<span class="line"><span style="color:#6A737D;"> *  拦截 uploadFile 文件上传</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * 需要实现的步骤：</span></span>
<span class="line"><span style="color:#6A737D;"> *  非 http 开头需要拼接地址</span></span>
<span class="line"><span style="color:#6A737D;"> *  请求超时</span></span>
<span class="line"><span style="color:#6A737D;"> *  添加小程序端请求体标识</span></span>
<span class="line"><span style="color:#6A737D;"> *  添加 token 请求体标识</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useMemberStore } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/stores/index&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 基准路径</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseURL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://pcapi-xiaotuxian-front-devtest.itheima.net&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 添加拦截器</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">httpInterceptor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 拦截前触发</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">invoke</span><span style="color:#24292E;">(</span><span style="color:#E36209;">options</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UniApp</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">RequestOptions</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 非 http 开通需要拼接地址</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">options.url.</span><span style="color:#6F42C1;">startsWith</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;http&#39;</span><span style="color:#24292E;">)) options.url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> baseURL </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> options.url</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 请求超时，默认60s，单位为ms</span></span>
<span class="line"><span style="color:#24292E;">    options.timeout </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 3. 添加小程序端请求头标识</span></span>
<span class="line"><span style="color:#24292E;">    options.header </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">options.header,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;source-client&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;miniapp&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 4. 添加 token 请求头</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">memberStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useMemberStore</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">token</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> memberStore.profile?.token</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (token) options.header.Authorization </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> token</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">uni.</span><span style="color:#6F42C1;">addInterceptor</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;request&#39;</span><span style="color:#24292E;">, httpInterceptor)</span></span>
<span class="line"><span style="color:#24292E;">uni.</span><span style="color:#6F42C1;">addInterceptor</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;uploadFile&#39;</span><span style="color:#24292E;">, httpInterceptor)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 响应函数</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">UniApp.RequestOptions</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@returns</span><span style="color:#6A737D;"> Promise</span></span>
<span class="line"><span style="color:#6A737D;"> *  1. 返回 Promise 对象</span></span>
<span class="line"><span style="color:#6A737D;"> *  2. 请求成功</span></span>
<span class="line"><span style="color:#6A737D;"> *    2.1 提取核心数据</span></span>
<span class="line"><span style="color:#6A737D;"> *    2.2 添加类型，支持泛型</span></span>
<span class="line"><span style="color:#6A737D;"> *  3. 请求失败</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.1 网络错误 -&gt; 提示用户更换网络</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.2 401错误 -&gt; 清除用户信息，跳转登录页</span></span>
<span class="line"><span style="color:#6A737D;"> *    3.1 其他错误 -&gt; 根据后端错误信息提示</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Data</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">code</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">msg</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">result</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">T</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 泛型支持</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> &lt;</span><span style="color:#005CC5;">T</span><span style="color:#24292E;">&gt;(options: UniApp.RequestOptions) =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 返回 Promise 对象</span></span>
<span class="line"><span style="color:#24292E;">  return </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">Data</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;&gt;((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">, </span><span style="color:#E36209;">reject</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    uni.</span><span style="color:#6F42C1;">request</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">options,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 请求成功</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">success</span><span style="color:#24292E;">(</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(res)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (res.statusCode </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> res.statusCode </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 提取核心数据 res.data</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(res.data </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Data</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;)</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (res.statusCode </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">401</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 登录过期，清除登录信息</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">memberStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useMemberStore</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          memberStore.</span><span style="color:#6F42C1;">clearProfile</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 返回登录页</span></span>
<span class="line"><span style="color:#24292E;">          uni.</span><span style="color:#6F42C1;">navigateTo</span><span style="color:#24292E;">({ url: </span><span style="color:#032F62;">&#39;/pages/login/index&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(res)</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          uni.</span><span style="color:#6F42C1;">showToast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">            icon: </span><span style="color:#032F62;">&#39;none&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            title: (res.data </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Data</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;).msg </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;请求错误&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          })</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(res)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 请求失败</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">fail</span><span style="color:#24292E;">(</span><span style="color:#E36209;">err</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        uni.</span><span style="color:#6F42C1;">showToast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">          icon: </span><span style="color:#032F62;">&#39;none&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          title: </span><span style="color:#032F62;">&#39;网络错误，换个网络试试&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 给予轻提示</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="请求接口函数使用" tabindex="-1">请求接口函数使用 <a class="header-anchor" href="#请求接口函数使用" aria-label="Permalink to &quot;请求接口函数使用&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 首页分类导航</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getHomeCategoryApi</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">CategoryItem</span><span style="color:#E1E4E8;">[]&gt;({</span></span>
<span class="line"><span style="color:#E1E4E8;">    method: </span><span style="color:#9ECBFF;">&#39;GET&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    url: </span><span style="color:#9ECBFF;">&#39;/home/category/mutli&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 首页分类导航</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getHomeCategoryApi</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">CategoryItem</span><span style="color:#24292E;">[]&gt;({</span></span>
<span class="line"><span style="color:#24292E;">    method: </span><span style="color:#032F62;">&#39;GET&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    url: </span><span style="color:#032F62;">&#39;/home/category/mutli&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="请求接口函数数据的类型" tabindex="-1">请求接口函数数据的类型 <a class="header-anchor" href="#请求接口函数数据的类型" aria-label="Permalink to &quot;请求接口函数数据的类型&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 分类单项类型</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CategoryItem</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">icon</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">id</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 分类单项类型</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CategoryItem</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">icon</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">id</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,59),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const A=s(l,[["render",t]]);export{d as __pageData,A as default};
