import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const u=JSON.parse('{"title":"搭建","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"搭","7":"建"},"headers":[],"relativePath":"vitePress/Dev.md","filePath":"vitePress/Dev.md","lastUpdated":null}'),p={name:"vitePress/Dev.md"},o=l(`<h1 id="搭建" tabindex="-1">搭建 <a class="header-anchor" href="#搭建" aria-label="Permalink to &quot;搭建&quot;">​</a></h1><ul><li>vitePress官网： <a href="https://vitepress.vuejs.org/" target="_blank" rel="noreferrer">VitePress</a></li><li>vitePress中文网文档：<a href="https://vitejs.cn/vitepress/guide/getting-started.html" target="_blank" rel="noreferrer">VitePress中文网文档</a></li></ul><h2 id="项目创建" tabindex="-1">项目创建 <a class="header-anchor" href="#项目创建" aria-label="Permalink to &quot;项目创建&quot;">​</a></h2><ol><li>新建一个文件夹(文件名可以自行取，但不建议叫 <code>vitepress</code>)，进入该文件夹并初始化 <code>package.json</code> 文件。<div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span></span></code></pre></div></li><li>本地安装 <code>vitePress</code> 。<div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--dev</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vitepress</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--dev</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vitepress</span></span></code></pre></div></li><li>根目录下新建一个 <code>docs</code> 文件夹，进入文件夹新建一个 <code>index.md</code> 文档，输入内容。</li><li>修改 <code>package.json</code> 文件，添加运行脚本。<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">&quot;docs:dev&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vitepress dev docs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">&quot;docs:build&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vitepress build docs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">&quot;docs:serve&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vitepress serve docs&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#032F62;">&quot;docs:dev&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;vitepress dev docs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#032F62;">&quot;docs:build&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;vitepress build docs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#032F62;">&quot;docs:serve&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;vitepress serve docs&quot;</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre></div></li><li>配置 <code>.vitepress</code> 目录。所有 <code>VitePress</code> 相关的文件都将会被放在这里。创建配置文件 <code>.vitepress/config.js</code>，导出一个 <code>JavaScript</code> 对象。<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   title: </span><span style="color:#9ECBFF;">&#39;Hello VitePress&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">   description: </span><span style="color:#9ECBFF;">&#39;Just playing around.&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   title: </span><span style="color:#032F62;">&#39;Hello VitePress&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">   description: </span><span style="color:#032F62;">&#39;Just playing around.&#39;</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre></div><blockquote><p>这部分会在 『配置文件配置』 模块详细介绍。</p></blockquote></li><li>运行<div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docs:dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docs:dev</span></span></code></pre></div></li></ol><p>现在能够运行成功，打开页面能够看到效果了。但是这远远不够我们的预期，需要做进一步的调整。</p><h2 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h2><p>作为新手梳理一遍目录结构还是有必要的，比较心急想要尽快实现效果的话可以 『跳过』 本段，从下一段 『首页配置』 开始。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">├── docs</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── .vitepress</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── theme</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   │   ├── custom.styl</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   │   └── index.js</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── config.js</span></span>
<span class="line"><span style="color:#e1e4e8;">|   ├── public</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── index.md</span></span>
<span class="line"><span style="color:#e1e4e8;">│ </span></span>
<span class="line"><span style="color:#e1e4e8;">└── package.json</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">├── docs</span></span>
<span class="line"><span style="color:#24292e;">│   ├── .vitepress</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── theme</span></span>
<span class="line"><span style="color:#24292e;">│   │   │   ├── custom.styl</span></span>
<span class="line"><span style="color:#24292e;">│   │   │   └── index.js</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── config.js</span></span>
<span class="line"><span style="color:#24292e;">|   ├── public</span></span>
<span class="line"><span style="color:#24292e;">│   └── index.md</span></span>
<span class="line"><span style="color:#24292e;">│ </span></span>
<span class="line"><span style="color:#24292e;">└── package.json</span></span></code></pre></div><p>下面一一讲解。</p><ul><li><code>docs/.vitepress</code>: 用于存放全局的配置。</li><li><code>docs/.vitepress/theme</code>: 用于存放本地主题。</li><li><code>docs/.vitepress/theme/custom.styl</code>: 用于定义自定义css样式。</li><li><code>docs/.vitepress/theme/index.js</code>: 将自定义css样式抛出。</li><li><code>docs/.vitepress/config.js</code>: 配置文件的入口文件，用于设置博客的导航栏、侧边栏等属性，是重点文件。</li><li><code>docs/public</code>: 静态资源目录。</li><li><code>docs/index.md</code>: 博客首页文件，用户打开博客第一眼看到的是 <code>index.md</code> 的内容。</li></ul><h2 id="首页配置" tabindex="-1">首页配置 <a class="header-anchor" href="#首页配置" aria-label="Permalink to &quot;首页配置&quot;">​</a></h2><p>修改 <code>docs/index.md</code> 的内容，想要先看效果的话可直接复制以下代码。</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">---</span></span>
<span class="line"><span style="color:#85E89D;">layout</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">home</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">hero</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">刀刀博客</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">text</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">欢迎来到刀刀小站，我是杜一刀。                                     这里记录自己的学习成果，项目学习经验。不定时更新~</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">tagline</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">每天都要比昨天更有进步💪</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">actions</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">theme</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">brand</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">text</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">前端知识</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">link</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/learn/HTML/</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">theme</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alt</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">text</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">项目总结</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">link</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/project/Music/</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">theme</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alt</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">text</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">测试按钮2</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">link</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/business/index</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">features</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">icon</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">📕</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">学习之旅</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">details</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">自学成果</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">link</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/learn/HTML/</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">icon</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">⚡</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">项目之旅</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">details</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">项目总结</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">icon</span><span style="color:#E1E4E8;">:  </span><span style="color:#9ECBFF;">⌛</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">博客部署</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">details</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">从0到1部署博客</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">link</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/vitePress/</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">icon</span><span style="color:#E1E4E8;">:  </span><span style="color:#9ECBFF;">🎈️</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">未完待续</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">details</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">尽情期待</span></span>
<span class="line"><span style="color:#E1E4E8;">---</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">---</span></span>
<span class="line"><span style="color:#22863A;">layout</span><span style="color:#24292E;">: </span><span style="color:#032F62;">home</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">hero</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">刀刀博客</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">text</span><span style="color:#24292E;">: </span><span style="color:#032F62;">欢迎来到刀刀小站，我是杜一刀。                                     这里记录自己的学习成果，项目学习经验。不定时更新~</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">tagline</span><span style="color:#24292E;">: </span><span style="color:#032F62;">每天都要比昨天更有进步💪</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">actions</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">theme</span><span style="color:#24292E;">: </span><span style="color:#032F62;">brand</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">text</span><span style="color:#24292E;">: </span><span style="color:#032F62;">前端知识</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">link</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/learn/HTML/</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">theme</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alt</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">text</span><span style="color:#24292E;">: </span><span style="color:#032F62;">项目总结</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">link</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/project/Music/</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">theme</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alt</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">text</span><span style="color:#24292E;">: </span><span style="color:#032F62;">测试按钮2</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">link</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/business/index</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">features</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">icon</span><span style="color:#24292E;">: </span><span style="color:#032F62;">📕</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">title</span><span style="color:#24292E;">: </span><span style="color:#032F62;">学习之旅</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">details</span><span style="color:#24292E;">: </span><span style="color:#032F62;">自学成果</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">link</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/learn/HTML/</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">icon</span><span style="color:#24292E;">: </span><span style="color:#032F62;">⚡</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">title</span><span style="color:#24292E;">: </span><span style="color:#032F62;">项目之旅</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">details</span><span style="color:#24292E;">: </span><span style="color:#032F62;">项目总结</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">icon</span><span style="color:#24292E;">:  </span><span style="color:#032F62;">⌛</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">title</span><span style="color:#24292E;">: </span><span style="color:#032F62;">博客部署</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">details</span><span style="color:#24292E;">: </span><span style="color:#032F62;">从0到1部署博客</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">link</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/vitePress/</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">icon</span><span style="color:#24292E;">:  </span><span style="color:#032F62;">🎈️</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">title</span><span style="color:#24292E;">: </span><span style="color:#032F62;">未完待续</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">details</span><span style="color:#24292E;">: </span><span style="color:#032F62;">尽情期待</span></span>
<span class="line"><span style="color:#24292E;">---</span></span></code></pre></div><p>下面一一介绍。</p><ul><li><p>第一步最主要的，是把代码包裹在 <code>---</code> 内，如上方代码所示。</p></li><li><p><code>layout: home</code>，表明该 <code>index.md</code> 文件是首页。</p><blockquote><p>注：<code>vuePress</code> 声明首页的方式不一样，不要搞混淆了。</p></blockquote></li><li><p><code>hero</code>：重点模块之一，主要用于设置首页的大标题、介绍、小言以及按钮。</p><ol><li><code>name</code>：首页大标题。</li><li><code>text</code>：首页介绍。</li><li><code>tagline</code>：首页小言。</li><li><code>actions</code>：首页按钮组，用 <code>-</code> 隔开，一个 <code>-</code> 代表一个按钮。 <ul><li><code>theme</code>：按钮样式类名</li><li><code>text</code>：按钮文本。</li><li><code>link</code>：点击后跳转的页面。</li></ul></li></ol></li><li><p><code>features</code>：重点模块之一，用于设置底部专栏，一个 <code>-</code> 代表一个专栏。</p><ol><li><code>icon</code>: 专栏左上角图标（可选）</li><li><code>title</code>: 专栏标题</li><li><code>details</code>: 专栏简介</li><li><code>link</code>: 点击后跳转页面的路由。可选，不设置的话鼠标悬停没有特殊样式，没有点击事件。</li></ol></li></ul><p>整体如下图所示。 <img src="https://s1.ax1x.com/2023/02/01/pSBKRVe.png" alt="整体效果"></p><h2 id="配置文件配置" tabindex="-1">配置文件配置 <a class="header-anchor" href="#配置文件配置" aria-label="Permalink to &quot;配置文件配置&quot;">​</a></h2><p>修改 <code>docs/.vitepress/config.js</code> 的内容，老规矩，先放总体代码，想先看效果的可以复制粘贴。后面对每项进行详细介绍。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 网站标题</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;🔪 刀刀小站&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  base: </span><span style="color:#9ECBFF;">&#39;/daodao/&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 网站描述</span></span>
<span class="line"><span style="color:#E1E4E8;">  description: </span><span style="color:#9ECBFF;">&#39;刀刀小站&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 打包目录</span></span>
<span class="line"><span style="color:#E1E4E8;">  dest: </span><span style="color:#9ECBFF;">&#39;./dist&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  head: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 添加图标</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;link&quot;</span><span style="color:#E1E4E8;">, { rel: </span><span style="color:#9ECBFF;">&quot;icon&quot;</span><span style="color:#E1E4E8;">, href: </span><span style="color:#9ECBFF;">&quot;/favicon.ico&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;meta&quot;</span><span style="color:#E1E4E8;">, { property: </span><span style="color:#9ECBFF;">&quot;og:title&quot;</span><span style="color:#E1E4E8;">, content: </span><span style="color:#9ECBFF;">&quot;刀刀博客&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;meta&quot;</span><span style="color:#E1E4E8;">, { property: </span><span style="color:#9ECBFF;">&quot;og:site_name&quot;</span><span style="color:#E1E4E8;">, content: </span><span style="color:#9ECBFF;">&quot;刀刀博客&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;meta&quot;</span><span style="color:#E1E4E8;">, { property: </span><span style="color:#9ECBFF;">&quot;og:type&quot;</span><span style="color:#E1E4E8;">, content: </span><span style="color:#9ECBFF;">&quot;website&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;meta&quot;</span><span style="color:#E1E4E8;">, { property: </span><span style="color:#9ECBFF;">&quot;og:description&quot;</span><span style="color:#E1E4E8;">, content: </span><span style="color:#9ECBFF;">&quot;前端教程&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;meta&quot;</span><span style="color:#E1E4E8;">, { property: </span><span style="color:#9ECBFF;">&quot;og:url&quot;</span><span style="color:#E1E4E8;">, content: </span><span style="color:#9ECBFF;">&quot;https://duyidao.gitee.io/daodao/&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 使用插件</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;@vuepress/active-header-links&#39;</span><span style="color:#E1E4E8;">,   </span><span style="color:#6A737D;">// 页面滚动时自动激活侧边栏链接的插件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;@vuepress/back-to-top&#39;</span><span style="color:#E1E4E8;">,          </span><span style="color:#6A737D;">// 返回顶部插件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;@vuepress/medium-zoom&#39;</span><span style="color:#E1E4E8;">,          </span><span style="color:#6A737D;">// 图片预览插件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;@vuepress/nprogress&#39;</span><span style="color:#E1E4E8;">,        </span><span style="color:#6A737D;">//页面顶部进度条</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 主题配置</span></span>
<span class="line"><span style="color:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部</span></span>
<span class="line"><span style="color:#E1E4E8;">    lastUpdated: </span><span style="color:#9ECBFF;">&#39;Last Updated&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// string | boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 启动页面丝滑滚动</span></span>
<span class="line"><span style="color:#E1E4E8;">    smoothScroll: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 头部导航栏配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    nav: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        text: </span><span style="color:#9ECBFF;">&quot;💻 前端知识&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🟧 HTML&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/learn/HTML/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🟥 CSS&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/learn/CSS/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🟨 JavaScript&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/learn/JavaScript/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🟦 TypeScript&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/learn/TypeScript/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🟩 Vue&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/learn/Vue/&quot;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">        ],</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        text: </span><span style="color:#9ECBFF;">&quot;📖 项目总结&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🎶 音果云音&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/project/Music/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🛒 视频分销&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/project/Sale/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">          {</span></span>
<span class="line"><span style="color:#E1E4E8;">            text: </span><span style="color:#9ECBFF;">&quot;🔎 CRM&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            link: </span><span style="color:#9ECBFF;">&quot;/project/CRM/&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          },</span></span>
<span class="line"><span style="color:#E1E4E8;">        ],</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        text: </span><span style="color:#9ECBFF;">&quot;🧊 部署&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        items: [{ text: </span><span style="color:#9ECBFF;">&quot;🌩️ VitePress&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/vitePress/&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        text: </span><span style="color:#9ECBFF;">&quot;⭐ 关于&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;⭐ 关于我&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/about/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🔪 关于刀刀小站&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/about/blog&quot;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">        ],</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 左侧导航栏</span></span>
<span class="line"><span style="color:#E1E4E8;">    sidebar: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;/learn&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">getLearnSidebar</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">getProjectSidebar</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;/vitePress&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">getVitePressSidebar</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//社交链接</span></span>
<span class="line"><span style="color:#E1E4E8;">    socialLinks: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      { icon: </span><span style="color:#9ECBFF;">&quot;github&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;https://gitee.com/duyidao&quot;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//页脚</span></span>
<span class="line"><span style="color:#E1E4E8;">    footer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      copyright: </span><span style="color:#9ECBFF;">&quot;Copyright © 2023-present 杜一刀&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取前端的数组</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getLearnSidebar</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&#39;HTML&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;基础&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/HTML/&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;进阶&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/HTML/advanced&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&#39;CSS&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;基础&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/CSS/&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;进阶&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/CSS/advanced&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&#39;Javascript&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;基础&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/Javascript/&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;进阶&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/Javascript/advanced&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&#39;Vue&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;基础&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/Vue/&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;进阶&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/Vue/advanced&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取项目的数组</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getProjectSidebar</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&quot;📖 项目笔记&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&quot;🎶 音果云音&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/project/Music/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&quot;🛒 视频分销&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/project/Sale/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          text: </span><span style="color:#9ECBFF;">&quot;🔎 CRM&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          link: </span><span style="color:#9ECBFF;">&quot;/project/CRM/&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取vitePress部署的数组</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getVitePressSidebar</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&#39;🧊 部署&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&quot;🌩️ 引言&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/vitePress/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&quot;🧩 搭建&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/vitePress/Dev&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&quot;🎁 打包&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/vitePress/Build&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&quot;⏳ 部署&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/vitePress/Deploy&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 网站标题</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;🔪 刀刀小站&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  base: </span><span style="color:#032F62;">&#39;/daodao/&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 网站描述</span></span>
<span class="line"><span style="color:#24292E;">  description: </span><span style="color:#032F62;">&#39;刀刀小站&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 打包目录</span></span>
<span class="line"><span style="color:#24292E;">  dest: </span><span style="color:#032F62;">&#39;./dist&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  head: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 添加图标</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;link&quot;</span><span style="color:#24292E;">, { rel: </span><span style="color:#032F62;">&quot;icon&quot;</span><span style="color:#24292E;">, href: </span><span style="color:#032F62;">&quot;/favicon.ico&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;meta&quot;</span><span style="color:#24292E;">, { property: </span><span style="color:#032F62;">&quot;og:title&quot;</span><span style="color:#24292E;">, content: </span><span style="color:#032F62;">&quot;刀刀博客&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;meta&quot;</span><span style="color:#24292E;">, { property: </span><span style="color:#032F62;">&quot;og:site_name&quot;</span><span style="color:#24292E;">, content: </span><span style="color:#032F62;">&quot;刀刀博客&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;meta&quot;</span><span style="color:#24292E;">, { property: </span><span style="color:#032F62;">&quot;og:type&quot;</span><span style="color:#24292E;">, content: </span><span style="color:#032F62;">&quot;website&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;meta&quot;</span><span style="color:#24292E;">, { property: </span><span style="color:#032F62;">&quot;og:description&quot;</span><span style="color:#24292E;">, content: </span><span style="color:#032F62;">&quot;前端教程&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;meta&quot;</span><span style="color:#24292E;">, { property: </span><span style="color:#032F62;">&quot;og:url&quot;</span><span style="color:#24292E;">, content: </span><span style="color:#032F62;">&quot;https://duyidao.gitee.io/daodao/&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 使用插件</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;@vuepress/active-header-links&#39;</span><span style="color:#24292E;">,   </span><span style="color:#6A737D;">// 页面滚动时自动激活侧边栏链接的插件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;@vuepress/back-to-top&#39;</span><span style="color:#24292E;">,          </span><span style="color:#6A737D;">// 返回顶部插件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;@vuepress/medium-zoom&#39;</span><span style="color:#24292E;">,          </span><span style="color:#6A737D;">// 图片预览插件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;@vuepress/nprogress&#39;</span><span style="color:#24292E;">,        </span><span style="color:#6A737D;">//页面顶部进度条</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 主题配置</span></span>
<span class="line"><span style="color:#24292E;">  themeConfig: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部</span></span>
<span class="line"><span style="color:#24292E;">    lastUpdated: </span><span style="color:#032F62;">&#39;Last Updated&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// string | boolean</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 启动页面丝滑滚动</span></span>
<span class="line"><span style="color:#24292E;">    smoothScroll: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 头部导航栏配置</span></span>
<span class="line"><span style="color:#24292E;">    nav: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        text: </span><span style="color:#032F62;">&quot;💻 前端知识&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        items: [</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🟧 HTML&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/learn/HTML/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🟥 CSS&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/learn/CSS/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🟨 JavaScript&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/learn/JavaScript/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🟦 TypeScript&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/learn/TypeScript/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🟩 Vue&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/learn/Vue/&quot;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">        ],</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        text: </span><span style="color:#032F62;">&quot;📖 项目总结&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        items: [</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🎶 音果云音&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/project/Music/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🛒 视频分销&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/project/Sale/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">          {</span></span>
<span class="line"><span style="color:#24292E;">            text: </span><span style="color:#032F62;">&quot;🔎 CRM&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            link: </span><span style="color:#032F62;">&quot;/project/CRM/&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          },</span></span>
<span class="line"><span style="color:#24292E;">        ],</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        text: </span><span style="color:#032F62;">&quot;🧊 部署&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        items: [{ text: </span><span style="color:#032F62;">&quot;🌩️ VitePress&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/vitePress/&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        text: </span><span style="color:#032F62;">&quot;⭐ 关于&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        items: [</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;⭐ 关于我&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/about/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🔪 关于刀刀小站&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/about/blog&quot;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">        ],</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 左侧导航栏</span></span>
<span class="line"><span style="color:#24292E;">    sidebar: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;/learn&#39;</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">getLearnSidebar</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">getProjectSidebar</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;/vitePress&#39;</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">getVitePressSidebar</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//社交链接</span></span>
<span class="line"><span style="color:#24292E;">    socialLinks: [</span></span>
<span class="line"><span style="color:#24292E;">      { icon: </span><span style="color:#032F62;">&quot;github&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;https://gitee.com/duyidao&quot;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//页脚</span></span>
<span class="line"><span style="color:#24292E;">    footer: {</span></span>
<span class="line"><span style="color:#24292E;">      copyright: </span><span style="color:#032F62;">&quot;Copyright © 2023-present 杜一刀&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取前端的数组</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getLearnSidebar</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&#39;HTML&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;基础&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/HTML/&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;进阶&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/HTML/advanced&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&#39;CSS&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;基础&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/CSS/&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;进阶&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/CSS/advanced&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&#39;Javascript&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;基础&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/Javascript/&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;进阶&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/Javascript/advanced&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&#39;Vue&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;基础&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/Vue/&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;进阶&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/Vue/advanced&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取项目的数组</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getProjectSidebar</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&quot;📖 项目笔记&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&quot;🎶 音果云音&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/project/Music/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&quot;🛒 视频分销&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/project/Sale/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          text: </span><span style="color:#032F62;">&quot;🔎 CRM&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          link: </span><span style="color:#032F62;">&quot;/project/CRM/&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      ],</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取vitePress部署的数组</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getVitePressSidebar</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&#39;🧊 部署&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&quot;🌩️ 引言&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/vitePress/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&quot;🧩 搭建&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/vitePress/Dev&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&quot;🎁 打包&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/vitePress/Build&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&quot;⏳ 部署&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/vitePress/Deploy&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="基础建设" tabindex="-1">基础建设 <a class="header-anchor" href="#基础建设" aria-label="Permalink to &quot;基础建设&quot;">​</a></h3><p><code>config.js</code> 是博客的配置文件，需要导出一个对象。</p><p>其中：</p><ul><li><p><code>title</code>：博客网址标题。</p></li><li><p><code>base</code>：项目打包的根路径。这点会在 『部署』 章节详细介绍。</p></li><li><p><code>description</code>：博客网址描述。</p></li><li><p><code>titleTemplate</code>：标题的模板。</p></li><li><p><code>dest</code>：打包的位置，下方代码表示打包在 <code>config.js</code> 文件同级目录的 <code>dist</code> 文件夹下。</p></li><li><p><code>head</code>：网站的头部信息，包括网站ico图标和其他信息。</p><p>下图为打包后的 <code>index.html</code> 文件。 <img src="https://s1.ax1x.com/2023/02/01/pSBM7WR.png" alt="打包后"></p></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 网站标题</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;🔪 刀刀小站&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  base: </span><span style="color:#9ECBFF;">&#39;/daodao/&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 网站描述</span></span>
<span class="line"><span style="color:#E1E4E8;">  description: </span><span style="color:#9ECBFF;">&#39;刀刀小站&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 打包目录</span></span>
<span class="line"><span style="color:#E1E4E8;">  dest: </span><span style="color:#9ECBFF;">&#39;./dist&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  head: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 添加图标</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;link&quot;</span><span style="color:#E1E4E8;">, { rel: </span><span style="color:#9ECBFF;">&quot;icon&quot;</span><span style="color:#E1E4E8;">, href: </span><span style="color:#9ECBFF;">&quot;/favicon.ico&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;meta&quot;</span><span style="color:#E1E4E8;">, { property: </span><span style="color:#9ECBFF;">&quot;og:title&quot;</span><span style="color:#E1E4E8;">, content: </span><span style="color:#9ECBFF;">&quot;刀刀博客&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;meta&quot;</span><span style="color:#E1E4E8;">, { property: </span><span style="color:#9ECBFF;">&quot;og:site_name&quot;</span><span style="color:#E1E4E8;">, content: </span><span style="color:#9ECBFF;">&quot;刀刀博客&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;meta&quot;</span><span style="color:#E1E4E8;">, { property: </span><span style="color:#9ECBFF;">&quot;og:type&quot;</span><span style="color:#E1E4E8;">, content: </span><span style="color:#9ECBFF;">&quot;website&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;meta&quot;</span><span style="color:#E1E4E8;">, { property: </span><span style="color:#9ECBFF;">&quot;og:description&quot;</span><span style="color:#E1E4E8;">, content: </span><span style="color:#9ECBFF;">&quot;前端教程&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;meta&quot;</span><span style="color:#E1E4E8;">, { property: </span><span style="color:#9ECBFF;">&quot;og:url&quot;</span><span style="color:#E1E4E8;">, content: </span><span style="color:#9ECBFF;">&quot;https://duyidao.gitee.io/daodao/&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 网站标题</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;🔪 刀刀小站&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  base: </span><span style="color:#032F62;">&#39;/daodao/&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 网站描述</span></span>
<span class="line"><span style="color:#24292E;">  description: </span><span style="color:#032F62;">&#39;刀刀小站&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 打包目录</span></span>
<span class="line"><span style="color:#24292E;">  dest: </span><span style="color:#032F62;">&#39;./dist&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  head: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 添加图标</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;link&quot;</span><span style="color:#24292E;">, { rel: </span><span style="color:#032F62;">&quot;icon&quot;</span><span style="color:#24292E;">, href: </span><span style="color:#032F62;">&quot;/favicon.ico&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;meta&quot;</span><span style="color:#24292E;">, { property: </span><span style="color:#032F62;">&quot;og:title&quot;</span><span style="color:#24292E;">, content: </span><span style="color:#032F62;">&quot;刀刀博客&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;meta&quot;</span><span style="color:#24292E;">, { property: </span><span style="color:#032F62;">&quot;og:site_name&quot;</span><span style="color:#24292E;">, content: </span><span style="color:#032F62;">&quot;刀刀博客&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;meta&quot;</span><span style="color:#24292E;">, { property: </span><span style="color:#032F62;">&quot;og:type&quot;</span><span style="color:#24292E;">, content: </span><span style="color:#032F62;">&quot;website&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;meta&quot;</span><span style="color:#24292E;">, { property: </span><span style="color:#032F62;">&quot;og:description&quot;</span><span style="color:#24292E;">, content: </span><span style="color:#032F62;">&quot;前端教程&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;meta&quot;</span><span style="color:#24292E;">, { property: </span><span style="color:#032F62;">&quot;og:url&quot;</span><span style="color:#24292E;">, content: </span><span style="color:#032F62;">&quot;https://duyidao.gitee.io/daodao/&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="使用插件" tabindex="-1">使用插件 <a class="header-anchor" href="#使用插件" aria-label="Permalink to &quot;使用插件&quot;">​</a></h3><p>正如和 vue-cli 一样，生态环境中的插件，也有着很重要的地位，我们来安装下官方的插件，为 vitePress 添加更多的功能。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;@vuepress/active-header-links&#39;</span><span style="color:#E1E4E8;">,   </span><span style="color:#6A737D;">// 页面滚动时自动激活侧边栏链接的插件</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;@vuepress/back-to-top&#39;</span><span style="color:#E1E4E8;">,          </span><span style="color:#6A737D;">// 返回顶部插件</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;@vuepress/medium-zoom&#39;</span><span style="color:#E1E4E8;">,          </span><span style="color:#6A737D;">// 图片预览插件</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;@vuepress/nprogress&#39;</span><span style="color:#E1E4E8;">,        </span><span style="color:#6A737D;">//页面顶部进度条</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#24292E;">    plugins: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;@vuepress/active-header-links&#39;</span><span style="color:#24292E;">,   </span><span style="color:#6A737D;">// 页面滚动时自动激活侧边栏链接的插件</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;@vuepress/back-to-top&#39;</span><span style="color:#24292E;">,          </span><span style="color:#6A737D;">// 返回顶部插件</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;@vuepress/medium-zoom&#39;</span><span style="color:#24292E;">,          </span><span style="color:#6A737D;">// 图片预览插件</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;@vuepress/nprogress&#39;</span><span style="color:#24292E;">,        </span><span style="color:#6A737D;">//页面顶部进度条</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>更多插件可以浏览 <a href="https://vuepress.vuejs.org/zh/plugin/official/plugin-active-header-links.html" target="_blank" rel="noreferrer">此处</a> 。</p><h3 id="主题配置" tabindex="-1">主题配置 <a class="header-anchor" href="#主题配置" aria-label="Permalink to &quot;主题配置&quot;">​</a></h3><h4 id="自定义主题" tabindex="-1">自定义主题 <a class="header-anchor" href="#自定义主题" aria-label="Permalink to &quot;自定义主题&quot;">​</a></h4><ul><li><code>logo</code>：</li><li><code>siteTitle</code>：</li><li><code>outlineTitle</code>：</li><li><code>outline</code>：</li><li><code>smoothScroll</code>：启动页面丝滑滚动。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//...,</span></span>
<span class="line"><span style="color:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    logo: </span><span style="color:#9ECBFF;">&quot;/logo.svg&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    siteTitle: </span><span style="color:#9ECBFF;">&quot;『 刀刀博客 』&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    outlineTitle: </span><span style="color:#9ECBFF;">&#39;🔴🟠🟡🟢🔵🟣🟤⚫⚪&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    outline:[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 启动页面丝滑滚动</span></span>
<span class="line"><span style="color:#E1E4E8;">    smoothScroll: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//...,</span></span>
<span class="line"><span style="color:#24292E;">  themeConfig: {</span></span>
<span class="line"><span style="color:#24292E;">    logo: </span><span style="color:#032F62;">&quot;/logo.svg&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    siteTitle: </span><span style="color:#032F62;">&quot;『 刀刀博客 』&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    outlineTitle: </span><span style="color:#032F62;">&#39;🔴🟠🟡🟢🔵🟣🟤⚫⚪&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    outline:[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">6</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 启动页面丝滑滚动</span></span>
<span class="line"><span style="color:#24292E;">    smoothScroll: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="头部导航栏" tabindex="-1">头部导航栏 <a class="header-anchor" href="#头部导航栏" aria-label="Permalink to &quot;头部导航栏&quot;">​</a></h4><p><code>themeConfig</code> 对象中为 <code>nav</code> 属性赋值一个数组对象，每一个对象是一个导航栏模块。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//...,</span></span>
<span class="line"><span style="color:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//...,</span></span>
<span class="line"><span style="color:#E1E4E8;">    nav:[</span></span>
<span class="line"><span style="color:#E1E4E8;">      {text: </span><span style="color:#9ECBFF;">&#39;掘金&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;https://juejin.cn/user/1855631359481847/posts&#39;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        text: </span><span style="color:#9ECBFF;">&quot;💻 前端知识&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🟧 HTML&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/learn/HTML/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🟥 CSS&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/learn/CSS/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🟨 JavaScript&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/learn/JavaScript/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🟦 TypeScript&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/learn/TypeScript/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">          { text: </span><span style="color:#9ECBFF;">&quot;🟩 Vue&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/learn/Vue/&quot;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">        ],</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//...,</span></span>
<span class="line"><span style="color:#24292E;">  themeConfig: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//...,</span></span>
<span class="line"><span style="color:#24292E;">    nav:[</span></span>
<span class="line"><span style="color:#24292E;">      {text: </span><span style="color:#032F62;">&#39;掘金&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;https://juejin.cn/user/1855631359481847/posts&#39;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        text: </span><span style="color:#032F62;">&quot;💻 前端知识&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        items: [</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🟧 HTML&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/learn/HTML/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🟥 CSS&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/learn/CSS/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🟨 JavaScript&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/learn/JavaScript/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🟦 TypeScript&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/learn/TypeScript/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">          { text: </span><span style="color:#032F62;">&quot;🟩 Vue&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/learn/Vue/&quot;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">        ],</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li><code>text</code> 为该导航的标题</li><li><code>link</code> 为点击后跳转的路由</li><li><code>items</code> 为该导航模块的二级导航，数组的形式，每一个对象为一个二级导航。同样通过设置 <code>text</code> 和 <code>link</code> 实现效果。</li></ul><h4 id="左侧导航栏" tabindex="-1">左侧导航栏 <a class="header-anchor" href="#左侧导航栏" aria-label="Permalink to &quot;左侧导航栏&quot;">​</a></h4><p><code>themeConfig</code> 对象中为 <code>sidebar</code> 对象赋值一个数组，该数组中每一个对象是一个导航栏模块。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#E1E4E8;">    nav: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">    sidebar:{</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;/&#39;</span><span style="color:#E1E4E8;">:</span><span style="color:#B392F0;">getSidebar</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getLearnSidebar</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&#39;HTML&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;基础&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/HTML/&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;进阶&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/HTML/advanced&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&#39;CSS&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;基础&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/CSS/&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;进阶&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/CSS/advanced&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&#39;Javascript&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;基础&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/Javascript/&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;进阶&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/Javascript/advanced&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&#39;Vue&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;基础&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/Vue/&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;进阶&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/Vue/advanced&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#24292E;">  themeConfig: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#24292E;">    nav: [],</span></span>
<span class="line"><span style="color:#24292E;">    sidebar:{</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;/&#39;</span><span style="color:#24292E;">:</span><span style="color:#6F42C1;">getSidebar</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getLearnSidebar</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&#39;HTML&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;基础&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/HTML/&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;进阶&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/HTML/advanced&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&#39;CSS&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;基础&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/CSS/&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;进阶&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/CSS/advanced&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&#39;Javascript&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;基础&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/Javascript/&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;进阶&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/Javascript/advanced&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&#39;Vue&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;基础&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/Vue/&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;进阶&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/Vue/advanced&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>其中：</p><ul><li><code>sidebar</code> 对象内左侧为该导航模块的父级路由，<code>/</code> 表示同一目录下的同级文件夹。</li><li><code>text</code> 为该模块的标题</li><li><code>collapsible</code> 为 <code>true</code> 时表示该模块可以收起</li><li><code>items</code> 为该模块的子模块，以数组对象的形式赋值</li></ul><p>具体效果如下图所示。 <img src="https://s1.ax1x.com/2023/02/01/pSBWnqx.png" alt="效果"></p><p>此时点击左侧导航跳转到404页面是正常的，因为路由导航设置好了，但是页面还没写好（就像你和别人说了一个地址，但是那个地址还没开发好，别人去了也是一片荒地）。</p><p>路由配置以 <code>docs</code> 文件夹为基准路径，如：</p><ul><li><code>/learn/HTML/</code> 表示在 <code>docs</code> 文佳佳下创建一个 <code>learn</code> 文件夹，进入该文件夹创建一个 <code>HTML</code> 文件夹，再进入该文件夹创建一个 <code>index.md</code> 文件（斜杆后面不写表示省略 <code>index</code>）</li><li><code>/learn/HTML/know</code> 表示在 <code>docs</code> 文佳佳下创建一个 <code>learn</code> 文件夹，进入该文件夹创建一个 <code>HTML</code> 文件夹，再进入该文件夹创建一个 <code>know.md</code> 文件（除了 <code>index</code> 外其余文件名都不可省略）</li></ul><blockquote><p>后续有一种场景：我后续想要开一个新的模块，不与这些模块一起展示，该怎么做呢？</p><p>答案：往 <code>sidebar</code> 对象继续设置新的模块，设置新的导航模块，如 <code>&#39;/learn/&#39;</code> ，再 <code>docs</code> 文件夹下创建一个 <code>learn</code> 文件夹即可，如下方代码和截图所示。</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 主题配置</span></span>
<span class="line"><span style="color:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    nav: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 左侧导航栏</span></span>
<span class="line"><span style="color:#E1E4E8;">    sidebar: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;/learn&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">getLearnSidebar</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;/project&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">getProjectSidebar</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取前端的数组</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getLearnSidebar</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&#39;HTML&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;基础&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/HTML/&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;进阶&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/HTML/advanced&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&#39;CSS&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;基础&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/CSS/&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&#39;进阶&#39;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&#39;/learn/CSS/advanced&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取项目的数组</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getProjectSidebar</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&quot;📖 项目笔记&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      collapsible: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&quot;🎶 音果云音&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/project/Music/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&quot;🛒 视频分销&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/project/Sale/&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          text: </span><span style="color:#9ECBFF;">&quot;🔎 CRM&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          link: </span><span style="color:#9ECBFF;">&quot;/project/CRM/&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 主题配置</span></span>
<span class="line"><span style="color:#24292E;">  themeConfig: {</span></span>
<span class="line"><span style="color:#24292E;">    nav: [],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 左侧导航栏</span></span>
<span class="line"><span style="color:#24292E;">    sidebar: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;/learn&#39;</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">getLearnSidebar</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;/project&#39;</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">getProjectSidebar</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取前端的数组</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getLearnSidebar</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&#39;HTML&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;基础&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/HTML/&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;进阶&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/HTML/advanced&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&#39;CSS&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;基础&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/CSS/&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&#39;进阶&#39;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&#39;/learn/CSS/advanced&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取项目的数组</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getProjectSidebar</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&quot;📖 项目笔记&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      collapsible: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&quot;🎶 音果云音&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/project/Music/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&quot;🛒 视频分销&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/project/Sale/&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          text: </span><span style="color:#032F62;">&quot;🔎 CRM&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          link: </span><span style="color:#032F62;">&quot;/project/CRM/&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      ],</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>现在划分为 <code>learn</code> 和 <code>project</code> 两个模块了。</p><h2 id="页面编写" tabindex="-1">页面编写 <a class="header-anchor" href="#页面编写" aria-label="Permalink to &quot;页面编写&quot;">​</a></h2><p>页面编写实际上就是写 <code>markdown</code> 语法，这里不做过多赘述，想要了解更多的可去知乎、CSDN等平台寻找。</p><p>这里主要说的一点是 <code>Front Matter</code> ，它其实就是对当前 <code>.md</code> 的声明。有点类似于 <code>HTML</code> 文件中的 <code>meta</code> 标签的定位。</p><p>书写要求：写在 <code>---</code> 内。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">title HTML 进阶   // 当前页面的标题</span></span>
<span class="line"><span style="color:#e1e4e8;">lang en-US       // 当前页面的语言 可多语言，默认英语</span></span>
<span class="line"><span style="color:#e1e4e8;">description      // 当前页面的描述</span></span>
<span class="line"><span style="color:#e1e4e8;">layout           // 设置当前页面的布局组件</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">title HTML 进阶   // 当前页面的标题</span></span>
<span class="line"><span style="color:#24292e;">lang en-US       // 当前页面的语言 可多语言，默认英语</span></span>
<span class="line"><span style="color:#24292e;">description      // 当前页面的描述</span></span>
<span class="line"><span style="color:#24292e;">layout           // 设置当前页面的布局组件</span></span>
<span class="line"><span style="color:#24292e;">---</span></span></code></pre></div><h2 id="样式设置" tabindex="-1">样式设置 <a class="header-anchor" href="#样式设置" aria-label="Permalink to &quot;样式设置&quot;">​</a></h2><p>默认样式太丑陋？可在 <code>docs/.vitepress/theme</code> 文件夹下新建一个 <code>css</code> 文件（或者下载 <code>less</code> 、<code>sass</code> 、<code>stylus</code> 等预处理器也可以）设置样式。</p><p>样式设置完毕后刷新页面不生效，不要急，步骤还没结束，在同级目录下（也就是 <code>docs/.vitepress/theme</code> 文件夹下）新建一个 <code>index.js</code> 文件，引入设置好的样式并导出，如下方代码所示。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> DefaultTheme </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vitepress/theme&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./custom.styl&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 自己的css文件名</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> DefaultTheme</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> DefaultTheme </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vitepress/theme&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./custom.styl&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 自己的css文件名</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> DefaultTheme</span></span></code></pre></div><h2 id="知识点拓展" tabindex="-1">知识点拓展 <a class="header-anchor" href="#知识点拓展" aria-label="Permalink to &quot;知识点拓展&quot;">​</a></h2><h3 id="路由" tabindex="-1">路由 <a class="header-anchor" href="#路由" aria-label="Permalink to &quot;路由&quot;">​</a></h3><p>在 <code>Vue</code> 中，一个 <code>.vue</code> 文件就可以作为一张页面，或者是一个组件。</p><p>在 <code>vitePress</code> 中，一个 <code>.md</code> 文件就可以作为一张页面。</p><p>并且，根据根目录 <code>docs</code> ，可自动生成路由。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">├── docs</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── HTML </span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── index.md     /HTML/</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── └── advanced.md     /HTML/advanced/</span></span>
<span class="line"><span style="color:#e1e4e8;">└──</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">├── docs</span></span>
<span class="line"><span style="color:#24292e;">│   ├── HTML </span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── index.md     /HTML/</span></span>
<span class="line"><span style="color:#24292e;">│   └── └── advanced.md     /HTML/advanced/</span></span>
<span class="line"><span style="color:#24292e;">└──</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>到目前为止，博客初步搭建工作完成了，总结一下做了哪些内容：</p><ol><li>在 <code>docs/index.md</code> 首页文件中编写博客的首页，包括标题、简介、小言、按钮、专栏等。</li><li>在 <code>docs/.vitepress/config.js</code> 文件中配置博客的标题、介绍、顶部导航、左侧导航等。</li><li>在 <code>docs/.vitepress/theme</code> 文件夹中设置博客样式并导出使用。</li></ol>`,66),e=[o];function t(c,E,r,y,i,F){return n(),a("div",null,e)}const q=s(p,[["render",t]]);export{u as __pageData,q as default};
