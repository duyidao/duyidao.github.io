import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.2ee92742.js";const F=JSON.parse('{"title":"富文本编辑器","description":"","frontmatter":{},"headers":[],"relativePath":"learn/学而时习之/前端功能操作模块/富文本编辑器.md","filePath":"learn/学而时习之/前端功能操作模块/富文本编辑器.md","lastUpdated":null}'),p={name:"learn/学而时习之/前端功能操作模块/富文本编辑器.md"},o=l(`<h1 id="富文本编辑器" tabindex="-1">富文本编辑器 <a class="header-anchor" href="#富文本编辑器" aria-label="Permalink to &quot;富文本编辑器&quot;">​</a></h1><h2 id="tinymce" tabindex="-1">tinymce <a class="header-anchor" href="#tinymce" aria-label="Permalink to &quot;tinymce&quot;">​</a></h2><h3 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h3><ol><li>可以安装对应的 <code>vue/react</code> 组件，直接作为组件使用。或者直接下载做原生操作</li><li>报找不到文件的错误，需要把 <code>tinymce</code> 复制到 <code>public</code> 文件夹内</li></ol><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><ul><li><p>安装 vue 模块的组件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yarn add @tinymce/tinymce-vue</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yarn add @tinymce/tinymce-vue</span></span></code></pre></div><p>如果是 <code>react</code> 项目则改为 <code>@tinymce/tinymce-react</code> 。</p></li><li><p>安装 <code>tinymce</code> 包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yarn add tinymce</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yarn add tinymce</span></span></code></pre></div></li></ul><h3 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h3><ul><li><p>首先引入富文本编辑器</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> tinymce </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;tinymce&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> tinymce </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;tinymce&#39;</span></span></code></pre></div></li><li><p>挂载到元素上</p><p>通过 <code>tinymce.init()</code> 方法的 <code>selector</code> 属性传入一个 <code>id</code> 选择器或类选择器，表示把富文本编辑器挂载到该元素上。</p><blockquote><p>注意：</p><p>由于要获取到元素，因此需要等待元素加载完毕才能获取，<code>vue2</code> 项目中要把方法写在 <code>mounted</code> 生命周期上，<code>vue3</code> 项目要把方法写在 <code>onMounted</code> 钩子上</p></blockquote><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { onMounted } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    tinymce.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        selector: </span><span style="color:#9ECBFF;">&#39;#mytinymce&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;mytinymce&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { onMounted } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">onMounted</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    tinymce.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        selector: </span><span style="color:#032F62;">&#39;#mytinymce&#39;</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;mytinymce&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li><li><p>复制文件到 <code>public</code> 文件</p><p>此时它加载完后会试图加载它的 <code>js</code> 文件和 <code>css</code> 文件，因此要把 <code>node_modules</code> 内它的整个内容复制到 <code>public</code> 文件内。否则会报错。</p><p>后续如果项目打包上线了，也需要把这些资源放到服务器的静态资源目录中。</p></li></ul><h3 id="常见界面需求" tabindex="-1">常见界面需求 <a class="header-anchor" href="#常见界面需求" aria-label="Permalink to &quot;常见界面需求&quot;">​</a></h3><h4 id="隐藏不需要的部分" tabindex="-1">隐藏不需要的部分 <a class="header-anchor" href="#隐藏不需要的部分" aria-label="Permalink to &quot;隐藏不需要的部分&quot;">​</a></h4><ul><li><p>组件的方式</p><p>引入组件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Editor } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@tinymce/tinymce-vue&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Editor } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@tinymce/tinymce-vue&#39;</span></span></code></pre></div><p>页面中使用</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">initObj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    selector: </span><span style="color:#9ECBFF;">&#39;#mytinymce&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    Menubar: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    toolbar: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    statusbar: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">Editor</span><span style="color:#E1E4E8;"> :</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">initObj</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">Editor</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">initObj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    selector: </span><span style="color:#032F62;">&#39;#mytinymce&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    Menubar: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    toolbar: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    statusbar: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">Editor</span><span style="color:#24292E;"> :</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">initObj</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">Editor</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li><li><p>直接使用<code>tinymce</code> 的方式</p><p><code>Menubar</code> 控制菜单，<code>toolbar</code> 控制工具栏，<code>statusbar</code> 控制状态栏。想要隐藏只需要在配置中把其设为 <code>false</code> 即可。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    tinymce.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        selector: </span><span style="color:#9ECBFF;">&#39;#mytinymce&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        Menubar: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        toolbar: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        statusbar: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">onMounted</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    tinymce.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        selector: </span><span style="color:#032F62;">&#39;#mytinymce&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        Menubar: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        toolbar: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        statusbar: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div></li></ul><h4 id="自定义样式" tabindex="-1">自定义样式 <a class="header-anchor" href="#自定义样式" aria-label="Permalink to &quot;自定义样式&quot;">​</a></h4><p><code>Skin</code> 控制皮肤，或者通过 <code>skin_url</code> 导入自定义皮肤。也可以通过 <code>content_css</code> 定义内容区域样式。<code>Icons_url</code> 导入图标。</p><p>皮肤在复制到 <code>public</code> 文件中的 <code>skin</code> 文件夹下 <code>ui</code> 文件夹内寻找，复制其文件夹名称即可。其本质是寻找其对应皮肤文件夹下的 <code>skin.css</code> 文件。</p><p>自定义皮肤则是在 <code>public</code> 下找到自定义的文件夹名称（如下方示例代码的 <code>myskin</code> ）下寻找 <code>content.min.css</code> 和 <code>skin.min.css</code> 文件。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    tinymce.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        selector: </span><span style="color:#9ECBFF;">&#39;#mytinymce&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        Menubar: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        toolbar: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        statusbar: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        skin: </span><span style="color:#9ECBFF;">&#39;oxide&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        skin_url: </span><span style="color:#9ECBFF;">&#39;myskin&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">onMounted</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    tinymce.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        selector: </span><span style="color:#032F62;">&#39;#mytinymce&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        Menubar: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        toolbar: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        statusbar: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        skin: </span><span style="color:#032F62;">&#39;oxide&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        skin_url: </span><span style="color:#032F62;">&#39;myskin&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h4 id="中文化" tabindex="-1">中文化 <a class="header-anchor" href="#中文化" aria-label="Permalink to &quot;中文化&quot;">​</a></h4><p>把文件转为二进制形式获取为 <code>blob</code> 形象。</p><p>下载中文包，解压 <code>langs</code> 文件夹到 <code>public</code> 文件夹内，在配置项中通过 <code>language</code> 属性赋值刚解压的js文件名。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    tinymce.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        selector: </span><span style="color:#9ECBFF;">&#39;#mytinymce&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        Menubar: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        toolbar: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        statusbar: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        skin: </span><span style="color:#9ECBFF;">&#39;oxide&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        skin_url: </span><span style="color:#9ECBFF;">&#39;myskin&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        language: </span><span style="color:#9ECBFF;">&#39;zh-Hans&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">onMounted</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    tinymce.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        selector: </span><span style="color:#032F62;">&#39;#mytinymce&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        Menubar: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        toolbar: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        statusbar: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        skin: </span><span style="color:#032F62;">&#39;oxide&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        skin_url: </span><span style="color:#032F62;">&#39;myskin&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        language: </span><span style="color:#032F62;">&#39;zh-Hans&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h4 id="自己选择工具栏内容和排序" tabindex="-1">自己选择工具栏内容和排序 <a class="header-anchor" href="#自己选择工具栏内容和排序" aria-label="Permalink to &quot;自己选择工具栏内容和排序&quot;">​</a></h4><p>把文件转为二进制形式获取为 <code>blob</code> 形象。</p><p>通过 <code>toolbar</code> 设置排序，用 <code>|</code> 作为组分隔开每组，每个单词对应不同的功能，从左到右对应排序。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    tinymce.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        selector: </span><span style="color:#9ECBFF;">&#39;#mytinymce&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        Menubar: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        toolbar: </span><span style="color:#9ECBFF;">&#39;undo redo | styles | blob italic | fontfamily fontsize fontcolor&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        statusbar: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        skin: </span><span style="color:#9ECBFF;">&#39;oxide&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        skin_url: </span><span style="color:#9ECBFF;">&#39;myskin&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        language: </span><span style="color:#9ECBFF;">&#39;zh-Hans&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">onMounted</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    tinymce.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        selector: </span><span style="color:#032F62;">&#39;#mytinymce&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        Menubar: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        toolbar: </span><span style="color:#032F62;">&#39;undo redo | styles | blob italic | fontfamily fontsize fontcolor&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        statusbar: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        skin: </span><span style="color:#032F62;">&#39;oxide&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        skin_url: </span><span style="color:#032F62;">&#39;myskin&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        language: </span><span style="color:#032F62;">&#39;zh-Hans&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="进阶需求" tabindex="-1">进阶需求 <a class="header-anchor" href="#进阶需求" aria-label="Permalink to &quot;进阶需求&quot;">​</a></h3><h4 id="获取内容" tabindex="-1">获取内容 <a class="header-anchor" href="#获取内容" aria-label="Permalink to &quot;获取内容&quot;">​</a></h4><p>通过 <code>tinymce.activeEditor.getContent()</code> 获取内容。这么获取的内容是 <code>html</code> 富文本内容，如果想要获取纯文本内容，则需要在括号内设置 <code>{format: &#39;text&#39;}</code> 。</p><h4 id="设置内容" tabindex="-1">设置内容 <a class="header-anchor" href="#设置内容" aria-label="Permalink to &quot;设置内容&quot;">​</a></h4><p>通过 <code>tinymce.activeEditor.setContent()</code> 设置内容。括号内输入内容，如 <code>&#39;&lt;p&gt;daodao&lt;/p&gt;&#39;</code> 。也可以选中内容设置内容，方法为选中内容后通过 <code>tinymce.activeEditor.selection.setContent(&#39;hello&#39;)</code> 替换为 <code>hello</code> 。</p><h3 id="二次开发" tabindex="-1">二次开发 <a class="header-anchor" href="#二次开发" aria-label="Permalink to &quot;二次开发&quot;">​</a></h3><h4 id="自带插件" tabindex="-1">自带插件 <a class="header-anchor" href="#自带插件" aria-label="Permalink to &quot;自带插件&quot;">​</a></h4><p>在安装的时候有一个 <code>plugins</code> 文件夹，里面有它自带的插件，如image、link、code、table等。</p><p>使用方法为在 <code>plugins</code> 属性中配置插件，在 <code>toolbar</code> 中设置即可。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    tinymce.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        selector: </span><span style="color:#9ECBFF;">&#39;#mytinymce&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        Menubar: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        plugins: </span><span style="color:#9ECBFF;">&#39;code image&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        toolbar: </span><span style="color:#9ECBFF;">&#39;undo redo | styles | blob italic | fontfamily fontsize fontcolor | code image&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        statusbar: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        skin: </span><span style="color:#9ECBFF;">&#39;oxide&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        skin_url: </span><span style="color:#9ECBFF;">&#39;myskin&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        language: </span><span style="color:#9ECBFF;">&#39;zh-Hans&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">onMounted</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    tinymce.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        selector: </span><span style="color:#032F62;">&#39;#mytinymce&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        Menubar: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        plugins: </span><span style="color:#032F62;">&#39;code image&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        toolbar: </span><span style="color:#032F62;">&#39;undo redo | styles | blob italic | fontfamily fontsize fontcolor | code image&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        statusbar: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        skin: </span><span style="color:#032F62;">&#39;oxide&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        skin_url: </span><span style="color:#032F62;">&#39;myskin&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        language: </span><span style="color:#032F62;">&#39;zh-Hans&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>如果引用他人的插件，把他复制到 <code>plugins</code> 文件夹下，再把文件名配置到 <code>plugins</code> 属性和 <code>toolbar</code> 属性中，就算完成。</p><h4 id="开发自己的工具栏按钮" tabindex="-1">开发自己的工具栏按钮 <a class="header-anchor" href="#开发自己的工具栏按钮" aria-label="Permalink to &quot;开发自己的工具栏按钮&quot;">​</a></h4><p>首先通过 <code>setup</code> 函数中注册，该函数的形参可获取 <code>Editor</code> 对象，通过 <code>ui.registry.addButon</code> 方法创建按钮和功能。</p><p>该方法接收两个参数，参数1是字符串，为该按钮的名称；参数2是一个对象，icon为该按钮的图标，tooltip为提示功能，onAction是一个函数，用于设置功能。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">onMounted</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    tinymce.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        selector: </span><span style="color:#9ECBFF;">&#39;#mytinymce&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        Menubar: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        plugins: </span><span style="color:#9ECBFF;">&#39;code image&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        toolbar: </span><span style="color:#9ECBFF;">&#39;undo redo | styles | blob italic | fontfamily fontsize fontcolor | code image&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        statusbar: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        skin: </span><span style="color:#9ECBFF;">&#39;oxide&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        skin_url: </span><span style="color:#9ECBFF;">&#39;myskin&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        language: </span><span style="color:#9ECBFF;">&#39;zh-Hans&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">editor</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 对选中的内容做某些操作</span></span>
<span class="line"><span style="color:#E1E4E8;">            editor.ui.registry.</span><span style="color:#B392F0;">addButton</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;red&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">                icon: </span><span style="color:#9ECBFF;">&#39;help&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                toolTip: </span><span style="color:#9ECBFF;">&#39;字体标红&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">onAction</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> text </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> editor.selection.</span><span style="color:#B392F0;">getContent</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">                    editor.selection.</span><span style="color:#B392F0;">sgetContent</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`&lt;span class=&quot;red-text&quot;&gt;\${</span><span style="color:#E1E4E8;">text</span><span style="color:#9ECBFF;">}&lt;/span&gt;\`</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            });</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 把内容展示在页面中</span></span>
<span class="line"><span style="color:#E1E4E8;">            editor.ui.registry.</span><span style="color:#B392F0;">addButton</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;show&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">            	icon: </span><span style="color:#9ECBFF;">&#39;emjio&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            	toolTip: </span><span style="color:#9ECBFF;">&#39;展示选中内容&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            	</span><span style="color:#B392F0;">onAction</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                	</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> text </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> editor.selection.</span><span style="color:#B392F0;">getContent</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">                	popShow.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">            		popValue.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> text</span></span>
<span class="line"><span style="color:#E1E4E8;">            });</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        content_css: </span><span style="color:#9ECBFF;">&#39;/mycontent.css&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 大段的css样式可在 public 文件夹中创建一个css文件设置类名样式</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">onMounted</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    tinymce.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        selector: </span><span style="color:#032F62;">&#39;#mytinymce&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        Menubar: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        plugins: </span><span style="color:#032F62;">&#39;code image&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        toolbar: </span><span style="color:#032F62;">&#39;undo redo | styles | blob italic | fontfamily fontsize fontcolor | code image&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        statusbar: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        skin: </span><span style="color:#032F62;">&#39;oxide&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        skin_url: </span><span style="color:#032F62;">&#39;myskin&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        language: </span><span style="color:#032F62;">&#39;zh-Hans&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">(</span><span style="color:#E36209;">editor</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 对选中的内容做某些操作</span></span>
<span class="line"><span style="color:#24292E;">            editor.ui.registry.</span><span style="color:#6F42C1;">addButton</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;red&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">                icon: </span><span style="color:#032F62;">&#39;help&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                toolTip: </span><span style="color:#032F62;">&#39;字体标红&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">onAction</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> text </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> editor.selection.</span><span style="color:#6F42C1;">getContent</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">                    editor.selection.</span><span style="color:#6F42C1;">sgetContent</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`&lt;span class=&quot;red-text&quot;&gt;\${</span><span style="color:#24292E;">text</span><span style="color:#032F62;">}&lt;/span&gt;\`</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            });</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 把内容展示在页面中</span></span>
<span class="line"><span style="color:#24292E;">            editor.ui.registry.</span><span style="color:#6F42C1;">addButton</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;show&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">            	icon: </span><span style="color:#032F62;">&#39;emjio&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            	toolTip: </span><span style="color:#032F62;">&#39;展示选中内容&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            	</span><span style="color:#6F42C1;">onAction</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                	</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> text </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> editor.selection.</span><span style="color:#6F42C1;">getContent</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">                	popShow.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">            		popValue.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> text</span></span>
<span class="line"><span style="color:#24292E;">            });</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        content_css: </span><span style="color:#032F62;">&#39;/mycontent.css&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 大段的css样式可在 public 文件夹中创建一个css文件设置类名样式</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="vue-quill-editor" tabindex="-1">vue-quill-editor <a class="header-anchor" href="#vue-quill-editor" aria-label="Permalink to &quot;vue-quill-editor&quot;">​</a></h2><p>详细可见官网：<a href="https://www.kancloud.cn/liuwave/quill/1434140" target="_blank" rel="noreferrer">vue-quill-editor</a> .</p><h3 id="安装-1" tabindex="-1">安装 <a class="header-anchor" href="#安装-1" aria-label="Permalink to &quot;安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># use npm</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vue-quill-editor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># use yarn</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vue-quill-editor</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># use npm</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vue-quill-editor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># use yarn</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vue-quill-editor</span></span></code></pre></div><p>注：该插件是基于 <code>Quill</code> 的，无需下载 <code>Quill</code>，因为在安装 <code>vue-quill-editor</code> 时，会把所需的依赖进行统一安装。</p><h3 id="引入" tabindex="-1">引入 <a class="header-anchor" href="#引入" aria-label="Permalink to &quot;引入&quot;">​</a></h3><h4 id="全局引用" tabindex="-1">全局引用 <a class="header-anchor" href="#全局引用" aria-label="Permalink to &quot;全局引用&quot;">​</a></h4><p>在 <code>main.js</code> 中引入插件</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 全局挂载 VueQuillEditor</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> VueQuillEditor </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue-quill-editor&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;quill/dist/quill.core.css&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;quill/dist/quill.snow.css&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;quill/dist/quill.bubble.css&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Vue.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(VueQuillEditor)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 全局挂载 VueQuillEditor</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> VueQuillEditor </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue-quill-editor&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;quill/dist/quill.core.css&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;quill/dist/quill.snow.css&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;quill/dist/quill.bubble.css&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Vue.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(VueQuillEditor)</span></span></code></pre></div><h4 id="局部-组件-引用" tabindex="-1">局部(组件)引用 <a class="header-anchor" href="#局部-组件-引用" aria-label="Permalink to &quot;局部(组件)引用&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 引入样式和quillEditor</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;quill/dist/quill.core.css&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;quill/dist/quill.snow.css&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;quill/dist/quill.bubble.css&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { quillEditor } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue-quill-editor&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 注册 quillEditor</span></span>
<span class="line"><span style="color:#B392F0;">components</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  quillEditor</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 引入样式和quillEditor</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;quill/dist/quill.core.css&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;quill/dist/quill.snow.css&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;quill/dist/quill.bubble.css&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { quillEditor } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue-quill-editor&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 注册 quillEditor</span></span>
<span class="line"><span style="color:#6F42C1;">components</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  quillEditor</span></span>
<span class="line"><span style="color:#24292E;">},</span></span></code></pre></div><blockquote><p>由以上代码可以看到全局应用和在组件中引入的方式是不一样的，全局引用采用的是 <code>import</code> 直接引入，局部引用时导出一个对象在对象中得到 <code>quillEditor </code>，这里我们可以看一下源码，发现源码中不仅默认导出了 <code>VueQuillEditor</code>，还道出了一个包含 <code>quillEditor</code> 的对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">全局引用\`： \`import VueQuillEditor from &#39;vue-quill-editor&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">局部引用\`： \`import { quillEditor } from &#39;vue-quill-editor&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">全局引用\`： \`import VueQuillEditor from &#39;vue-quill-editor&#39;</span></span>
<span class="line"><span style="color:#24292e;">局部引用\`： \`import { quillEditor } from &#39;vue-quill-editor&#39;</span></span></code></pre></div></blockquote><h3 id="使用-1" tabindex="-1">使用 <a class="header-anchor" href="#使用-1" aria-label="Permalink to &quot;使用&quot;">​</a></h3><ul><li><code>options</code> ：富文本上方的功能</li></ul><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;local-quill-editor&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">quill-editor</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;myLQuillEditor&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;content&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">:options</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;editorOption&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;editor&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">@blur</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;onEditorBlur&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">@focus</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;onEditorFocus&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">@change</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;onEditorChange&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">quill-editor</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 工具栏配置项</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">toolbarOptions</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 加粗 斜体 下划线 删除线 -----[&#39;bold&#39;, &#39;italic&#39;, &#39;underline&#39;, &#39;strike&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [</span><span style="color:#9ECBFF;">&#39;bold&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;italic&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;underline&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;strike&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 引用  代码块-----[&#39;blockquote&#39;, &#39;code-block&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [</span><span style="color:#9ECBFF;">&#39;blockquote&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;code-block&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 1、2 级标题-----[{ header: 1 }, { header: 2 }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [{ header: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> }, { header: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 有序、无序列表-----[{ list: &#39;ordered&#39; }, { list: &#39;bullet&#39; }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [{ list: </span><span style="color:#9ECBFF;">&#39;ordered&#39;</span><span style="color:#E1E4E8;"> }, { list: </span><span style="color:#9ECBFF;">&#39;bullet&#39;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 上标/下标-----[{ script: &#39;sub&#39; }, { script: &#39;super&#39; }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [{ script: </span><span style="color:#9ECBFF;">&#39;sub&#39;</span><span style="color:#E1E4E8;"> }, { script: </span><span style="color:#9ECBFF;">&#39;super&#39;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 缩进-----[{ indent: &#39;-1&#39; }, { indent: &#39;+1&#39; }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [{ indent: </span><span style="color:#9ECBFF;">&#39;-1&#39;</span><span style="color:#E1E4E8;"> }, { indent: </span><span style="color:#9ECBFF;">&#39;+1&#39;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 文本方向-----[{&#39;direction&#39;: &#39;rtl&#39;}]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [{ direction: </span><span style="color:#9ECBFF;">&#39;rtl&#39;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 字体大小-----[{ size: [&#39;small&#39;, false, &#39;large&#39;, &#39;huge&#39;] }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [{ size: [</span><span style="color:#9ECBFF;">&#39;small&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;large&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;huge&#39;</span><span style="color:#E1E4E8;">] }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [{ header: [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">] }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [{ color: [] }, { background: [] }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 字体种类-----[{ font: [] }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [{ font: [] }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 对齐方式-----[{ align: [] }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [{ align: [] }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 清除文本格式-----[&#39;clean&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [</span><span style="color:#9ECBFF;">&#39;clean&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 链接、图片、视频-----[&#39;link&#39;, &#39;image&#39;, &#39;video&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [</span><span style="color:#9ECBFF;">&#39;image&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;video&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&#39;LocalQuillEditor&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      content: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      editorOption: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        modules: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          toolbar: toolbarOptions</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        theme: </span><span style="color:#9ECBFF;">&#39;snow&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        placeholder: </span><span style="color:#9ECBFF;">&#39;请输入正文&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 失去焦点事件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">onEditorBlur</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;onEditorBlur: &#39;</span><span style="color:#E1E4E8;">, e)</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获得焦点事件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">onEditorFocus</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;onEditorFocus: &#39;</span><span style="color:#E1E4E8;">, e)</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 内容改变事件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">onEditorChange</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;onEditorChange: &#39;</span><span style="color:#E1E4E8;">, e)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">scoped</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;scss&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">.editor</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">500</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;local-quill-editor&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">quill-editor</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;myLQuillEditor&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">v-model</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;content&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">:options</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;editorOption&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;editor&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">@blur</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;onEditorBlur&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">@focus</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;onEditorFocus&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">@change</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;onEditorChange&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">quill-editor</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 工具栏配置项</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">toolbarOptions</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 加粗 斜体 下划线 删除线 -----[&#39;bold&#39;, &#39;italic&#39;, &#39;underline&#39;, &#39;strike&#39;]</span></span>
<span class="line"><span style="color:#24292E;">  [</span><span style="color:#032F62;">&#39;bold&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;italic&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;underline&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;strike&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 引用  代码块-----[&#39;blockquote&#39;, &#39;code-block&#39;]</span></span>
<span class="line"><span style="color:#24292E;">  [</span><span style="color:#032F62;">&#39;blockquote&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;code-block&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 1、2 级标题-----[{ header: 1 }, { header: 2 }]</span></span>
<span class="line"><span style="color:#24292E;">  [{ header: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> }, { header: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 有序、无序列表-----[{ list: &#39;ordered&#39; }, { list: &#39;bullet&#39; }]</span></span>
<span class="line"><span style="color:#24292E;">  [{ list: </span><span style="color:#032F62;">&#39;ordered&#39;</span><span style="color:#24292E;"> }, { list: </span><span style="color:#032F62;">&#39;bullet&#39;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 上标/下标-----[{ script: &#39;sub&#39; }, { script: &#39;super&#39; }]</span></span>
<span class="line"><span style="color:#24292E;">  [{ script: </span><span style="color:#032F62;">&#39;sub&#39;</span><span style="color:#24292E;"> }, { script: </span><span style="color:#032F62;">&#39;super&#39;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 缩进-----[{ indent: &#39;-1&#39; }, { indent: &#39;+1&#39; }]</span></span>
<span class="line"><span style="color:#24292E;">  [{ indent: </span><span style="color:#032F62;">&#39;-1&#39;</span><span style="color:#24292E;"> }, { indent: </span><span style="color:#032F62;">&#39;+1&#39;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 文本方向-----[{&#39;direction&#39;: &#39;rtl&#39;}]</span></span>
<span class="line"><span style="color:#24292E;">  [{ direction: </span><span style="color:#032F62;">&#39;rtl&#39;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 字体大小-----[{ size: [&#39;small&#39;, false, &#39;large&#39;, &#39;huge&#39;] }]</span></span>
<span class="line"><span style="color:#24292E;">  [{ size: [</span><span style="color:#032F62;">&#39;small&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;large&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;huge&#39;</span><span style="color:#24292E;">] }],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]</span></span>
<span class="line"><span style="color:#24292E;">  [{ header: [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">6</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">] }],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]</span></span>
<span class="line"><span style="color:#24292E;">  [{ color: [] }, { background: [] }],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 字体种类-----[{ font: [] }]</span></span>
<span class="line"><span style="color:#24292E;">  [{ font: [] }],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 对齐方式-----[{ align: [] }]</span></span>
<span class="line"><span style="color:#24292E;">  [{ align: [] }],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 清除文本格式-----[&#39;clean&#39;]</span></span>
<span class="line"><span style="color:#24292E;">  [</span><span style="color:#032F62;">&#39;clean&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 链接、图片、视频-----[&#39;link&#39;, &#39;image&#39;, &#39;video&#39;]</span></span>
<span class="line"><span style="color:#24292E;">  [</span><span style="color:#032F62;">&#39;image&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;video&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&#39;LocalQuillEditor&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      content: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      editorOption: {</span></span>
<span class="line"><span style="color:#24292E;">        modules: {</span></span>
<span class="line"><span style="color:#24292E;">          toolbar: toolbarOptions</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        theme: </span><span style="color:#032F62;">&#39;snow&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        placeholder: </span><span style="color:#032F62;">&#39;请输入正文&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 失去焦点事件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">onEditorBlur</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;onEditorBlur: &#39;</span><span style="color:#24292E;">, e)</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获得焦点事件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">onEditorFocus</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;onEditorFocus: &#39;</span><span style="color:#24292E;">, e)</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 内容改变事件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">onEditorChange</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;onEditorChange: &#39;</span><span style="color:#24292E;">, e)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">scoped</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;scss&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">.editor</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">500</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h3 id="图片上传到服务器" tabindex="-1">图片上传到服务器 <a class="header-anchor" href="#图片上传到服务器" aria-label="Permalink to &quot;图片上传到服务器&quot;">​</a></h3><p>一般情况下，富文本的图片上传是把图片转为 <code>base64</code> 的形式，而这么转换会导致这条数据太大，单纯一张图片转成<code>base64</code> 后已经 234kb 左右了，用户在输入几个字就要超出数据库该字段存储的空间。因此需要把图片上传改为上传到服务器中，用返回的路径作为渲染的路径。</p><p>第一步永远是阅读文档，官方文档指路：<a href="https://www.kancloud.cn/liuwave/quill/1434141" target="_blank" rel="noreferrer">quill-image-extend-module</a> 。官方文档的描述中这个插件的功能包含提供图片上传到服务器的功能，刚好符合我们的需求，可以继续往下看。</p><h4 id="安装-2" tabindex="-1">安装 <a class="header-anchor" href="#安装-2" aria-label="Permalink to &quot;安装&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">quill-image-extend-module</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--save-dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">quill-image-extend-module</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--save-dev</span></span></code></pre></div><h4 id="导入" tabindex="-1">导入 <a class="header-anchor" href="#导入" aria-label="Permalink to &quot;导入&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {quillEditor, Quill} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue-quill-editor&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {container, ImageExtend, QuillWatch} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;quill-image-extend-module&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Quill.</span><span style="color:#B392F0;">register</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;modules/ImageExtend&#39;</span><span style="color:#E1E4E8;">, ImageExtend)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {quillEditor, Quill} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue-quill-editor&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {container, ImageExtend, QuillWatch} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;quill-image-extend-module&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Quill.</span><span style="color:#6F42C1;">register</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;modules/ImageExtend&#39;</span><span style="color:#24292E;">, ImageExtend)</span></span></code></pre></div><h4 id="使用-2" tabindex="-1">使用 <a class="header-anchor" href="#使用-2" aria-label="Permalink to &quot;使用&quot;">​</a></h4><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;quill-wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">quill-editor</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;content&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;myQuillEditor&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">:options</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;editorOption&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">quill-editor</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {quillEditor, Quill} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue-quill-editor&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {container, ImageExtend, QuillWatch} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;quill-image-extend-module&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  Quill.</span><span style="color:#B392F0;">register</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;modules/ImageExtend&#39;</span><span style="color:#E1E4E8;">, ImageExtend)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    components: {quillEditor},</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">       content: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 富文本框参数设置</span></span>
<span class="line"><span style="color:#E1E4E8;">        editorOption: {  </span></span>
<span class="line"><span style="color:#E1E4E8;">          modules: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            ImageExtend: {</span></span>
<span class="line"><span style="color:#E1E4E8;">              loading: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              name: </span><span style="color:#9ECBFF;">&#39;img&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              action: updateUrl,</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">response</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res.info</span></span>
<span class="line"><span style="color:#E1E4E8;">              }</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            toolbar: {</span></span>
<span class="line"><span style="color:#E1E4E8;">              container: container,</span></span>
<span class="line"><span style="color:#E1E4E8;">              handlers: {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&#39;image&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">                  QuillWatch.</span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.quill.id)</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">              }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;quill-wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">quill-editor</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">v-model</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;content&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;myQuillEditor&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">:options</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;editorOption&quot;</span></span>
<span class="line"><span style="color:#24292E;">    &gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">quill-editor</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {quillEditor, Quill} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue-quill-editor&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {container, ImageExtend, QuillWatch} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;quill-image-extend-module&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  Quill.</span><span style="color:#6F42C1;">register</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;modules/ImageExtend&#39;</span><span style="color:#24292E;">, ImageExtend)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    components: {quillEditor},</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">       content: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 富文本框参数设置</span></span>
<span class="line"><span style="color:#24292E;">        editorOption: {  </span></span>
<span class="line"><span style="color:#24292E;">          modules: {</span></span>
<span class="line"><span style="color:#24292E;">            ImageExtend: {</span></span>
<span class="line"><span style="color:#24292E;">              loading: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              name: </span><span style="color:#032F62;">&#39;img&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              action: updateUrl,</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">response</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res.info</span></span>
<span class="line"><span style="color:#24292E;">              }</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            toolbar: {</span></span>
<span class="line"><span style="color:#24292E;">              container: container,</span></span>
<span class="line"><span style="color:#24292E;">              handlers: {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&#39;image&#39;</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">                  QuillWatch.</span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.quill.id)</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">              }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h4 id="所有可配置项" tabindex="-1">所有可配置项 <a class="header-anchor" href="#所有可配置项" aria-label="Permalink to &quot;所有可配置项&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">editorOption</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">modules</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">ImageExtend</span><span style="color:#E1E4E8;">: {  </span><span style="color:#6A737D;">// 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入 </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;img&#39;</span><span style="color:#E1E4E8;">,  </span><span style="color:#6A737D;">// 图片参数名</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,  </span><span style="color:#6A737D;">// 可选参数 图片大小，单位为M，1M = 1024kb</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">action</span><span style="color:#E1E4E8;">: updateUrl,  </span><span style="color:#6A737D;">// 服务器地址, 如果action为空，则采用base64插入图片</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">/* response 为一个函数用来获取服务器返回的具体图片地址</span></span>
<span class="line"><span style="color:#6A737D;">            * 例如服务器返回{code: 200; data:{ url: &#39;baidu.com&#39;}}，则 return res.data.url */</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">response</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res.info</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">headers</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">xhr</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// xhr.setRequestHeader(&#39;myHeader&#39;,&#39;myValue&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">            },  </span><span style="color:#6A737D;">// 可选参数 设置请求头部</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">sizeError</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {},  </span><span style="color:#6A737D;">// 图片超过大小的回调</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {},  </span><span style="color:#6A737D;">// 可选参数 自定义开始上传触发事件</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">end</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {},  </span><span style="color:#6A737D;">// 可选参数 自定义上传结束触发的事件，无论成功或者失败</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {},  </span><span style="color:#6A737D;">// 可选参数 上传失败触发的事件</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">success</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {},  </span><span style="color:#6A737D;">// 可选参数  上传成功触发的事件</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">change</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">xhr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">formData</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// xhr.setRequestHeader(&#39;myHeader&#39;,&#39;myValue&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// formData.append(&#39;token&#39;, &#39;myToken&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">            } </span><span style="color:#6A737D;">// 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">toolbar</span><span style="color:#E1E4E8;">: {  </span><span style="color:#6A737D;">// 如果不上传图片到服务器，此处不必配置</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">container</span><span style="color:#E1E4E8;">: container,  </span><span style="color:#6A737D;">// container为工具栏，此次引入了全部工具栏，也可自行配置</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">handlers</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&#39;image&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {  </span><span style="color:#6A737D;">// 劫持原来的图片点击按钮事件</span></span>
<span class="line"><span style="color:#E1E4E8;">                    QuillWatch.</span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.quill.id)</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">editorOption</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">modules</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">ImageExtend</span><span style="color:#24292E;">: {  </span><span style="color:#6A737D;">// 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入 </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;img&#39;</span><span style="color:#24292E;">,  </span><span style="color:#6A737D;">// 图片参数名</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,  </span><span style="color:#6A737D;">// 可选参数 图片大小，单位为M，1M = 1024kb</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">action</span><span style="color:#24292E;">: updateUrl,  </span><span style="color:#6A737D;">// 服务器地址, 如果action为空，则采用base64插入图片</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">/* response 为一个函数用来获取服务器返回的具体图片地址</span></span>
<span class="line"><span style="color:#6A737D;">            * 例如服务器返回{code: 200; data:{ url: &#39;baidu.com&#39;}}，则 return res.data.url */</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">response</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res.info</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">headers</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">xhr</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// xhr.setRequestHeader(&#39;myHeader&#39;,&#39;myValue&#39;)</span></span>
<span class="line"><span style="color:#24292E;">            },  </span><span style="color:#6A737D;">// 可选参数 设置请求头部</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">sizeError</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {},  </span><span style="color:#6A737D;">// 图片超过大小的回调</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {},  </span><span style="color:#6A737D;">// 可选参数 自定义开始上传触发事件</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">end</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {},  </span><span style="color:#6A737D;">// 可选参数 自定义上传结束触发的事件，无论成功或者失败</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {},  </span><span style="color:#6A737D;">// 可选参数 上传失败触发的事件</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">success</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {},  </span><span style="color:#6A737D;">// 可选参数  上传成功触发的事件</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">change</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">xhr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">formData</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// xhr.setRequestHeader(&#39;myHeader&#39;,&#39;myValue&#39;)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// formData.append(&#39;token&#39;, &#39;myToken&#39;)</span></span>
<span class="line"><span style="color:#24292E;">            } </span><span style="color:#6A737D;">// 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">toolbar</span><span style="color:#24292E;">: {  </span><span style="color:#6A737D;">// 如果不上传图片到服务器，此处不必配置</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">container</span><span style="color:#24292E;">: container,  </span><span style="color:#6A737D;">// container为工具栏，此次引入了全部工具栏，也可自行配置</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">handlers</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&#39;image&#39;</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {  </span><span style="color:#6A737D;">// 劫持原来的图片点击按钮事件</span></span>
<span class="line"><span style="color:#24292E;">                    QuillWatch.</span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.quill.id)</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="注意事项-1" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项-1" aria-label="Permalink to &quot;注意事项&quot;">​</a></h4><p>由于不同的用户的服务器返回的数据格式不尽相同，因此在配置中，必须做如下操作</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 你必须把返回的数据中所包含的图片地址 return 回去</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">respnse</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res.info  </span><span style="color:#6A737D;">// 这里切记要return回你的图片地址</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 你必须把返回的数据中所包含的图片地址 return 回去</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">respnse</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res.info  </span><span style="color:#6A737D;">// 这里切记要return回你的图片地址</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre></div><p>比如服务器返回的成功数据为</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">code</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">starus</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">result</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    	</span><span style="color:#B392F0;">img</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;http://placehold.it/xx.jpg&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 服务器返回的数据中的图片的地址</span></span>
<span class="line"><span style="color:#E1E4E8;"> 	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">code</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">starus</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">result</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    	</span><span style="color:#6F42C1;">img</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;http://placehold.it/xx.jpg&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 服务器返回的数据中的图片的地址</span></span>
<span class="line"><span style="color:#24292E;"> 	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>那么应该在参数中写为：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 你必须把返回的数据中所包含的图片地址 return 回去</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">respnse</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res.result.img  </span><span style="color:#6A737D;">// 这里切记要return回你的图片地址</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 你必须把返回的数据中所包含的图片地址 return 回去</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">respnse</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res.result.img  </span><span style="color:#6A737D;">// 这里切记要return回你的图片地址</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre></div><h4 id="与其他模块一起使用-以resize-module为例子" tabindex="-1">与其他模块一起使用（以resize-module为例子） <a class="header-anchor" href="#与其他模块一起使用-以resize-module为例子" aria-label="Permalink to &quot;与其他模块一起使用（以resize-module为例子）&quot;">​</a></h4><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;quill-wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">quill-editor</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;content&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;myQuillEditor&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">:options</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;editorOption&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">quill-editor</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {quillEditor, Quill} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue-quill-editor&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {container, ImageExtend, QuillWatch} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;quill-image-extend-module&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ImageResize </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;quill-image-resize-module&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  Quill.</span><span style="color:#B392F0;">register</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;modules/ImageExtend&#39;</span><span style="color:#E1E4E8;">, ImageExtend)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// use resize module</span></span>
<span class="line"><span style="color:#E1E4E8;">  Quill.</span><span style="color:#B392F0;">register</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;modules/ImageResize&#39;</span><span style="color:#E1E4E8;">, ImageResize)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    components: {quillEditor},</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        content: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 富文本框参数设置</span></span>
<span class="line"><span style="color:#E1E4E8;">        editorOption: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          modules: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            ImageResize: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">            ImageExtend: {</span></span>
<span class="line"><span style="color:#E1E4E8;">              name: </span><span style="color:#9ECBFF;">&#39;img&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              size: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,  </span><span style="color:#6A737D;">// 单位为M, 1M = 1024KB</span></span>
<span class="line"><span style="color:#E1E4E8;">              action: updateUrl,</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">headers</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">xhr</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">              },</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">response</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res.info</span></span>
<span class="line"><span style="color:#E1E4E8;">              }</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            toolbar: {</span></span>
<span class="line"><span style="color:#E1E4E8;">              container: container,</span></span>
<span class="line"><span style="color:#E1E4E8;">              handlers: {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&#39;image&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">                  QuillWatch.</span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.quill.id)</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">              }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;quill-wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">quill-editor</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">v-model</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;content&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;myQuillEditor&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">:options</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;editorOption&quot;</span></span>
<span class="line"><span style="color:#24292E;">    &gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">quill-editor</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {quillEditor, Quill} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue-quill-editor&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {container, ImageExtend, QuillWatch} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;quill-image-extend-module&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ImageResize </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;quill-image-resize-module&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  Quill.</span><span style="color:#6F42C1;">register</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;modules/ImageExtend&#39;</span><span style="color:#24292E;">, ImageExtend)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// use resize module</span></span>
<span class="line"><span style="color:#24292E;">  Quill.</span><span style="color:#6F42C1;">register</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;modules/ImageResize&#39;</span><span style="color:#24292E;">, ImageResize)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    components: {quillEditor},</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        content: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 富文本框参数设置</span></span>
<span class="line"><span style="color:#24292E;">        editorOption: {</span></span>
<span class="line"><span style="color:#24292E;">          modules: {</span></span>
<span class="line"><span style="color:#24292E;">            ImageResize: {},</span></span>
<span class="line"><span style="color:#24292E;">            ImageExtend: {</span></span>
<span class="line"><span style="color:#24292E;">              name: </span><span style="color:#032F62;">&#39;img&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              size: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,  </span><span style="color:#6A737D;">// 单位为M, 1M = 1024KB</span></span>
<span class="line"><span style="color:#24292E;">              action: updateUrl,</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">headers</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">xhr</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">              },</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">response</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res.info</span></span>
<span class="line"><span style="color:#24292E;">              }</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            toolbar: {</span></span>
<span class="line"><span style="color:#24292E;">              container: container,</span></span>
<span class="line"><span style="color:#24292E;">              handlers: {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&#39;image&#39;</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">                  QuillWatch.</span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.quill.id)</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">              }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,74),e=[o];function t(c,r,E,y,i,d){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{F as __pageData,g as default};
