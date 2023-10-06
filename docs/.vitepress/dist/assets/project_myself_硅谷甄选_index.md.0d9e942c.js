import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.2ee92742.js";const g=JSON.parse('{"title":"项目初始化","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"甄","7":"选","8":"项","9":"目","10":"初","11":"始","12":"化"},"headers":[],"relativePath":"project/myself/硅谷甄选/index.md","filePath":"project/myself/硅谷甄选/index.md","lastUpdated":null}'),l={name:"project/myself/硅谷甄选/index.md"},e=p(`<h1 id="项目初始化" tabindex="-1">项目初始化 <a class="header-anchor" href="#项目初始化" aria-label="Permalink to &quot;项目初始化&quot;">​</a></h1><p>项目在线地址：<a href="http://duyidao.gitee.io/selection/#/login?redirect=/home" target="_blank" rel="noreferrer">甄选</a> 。</p><h2 id="项目创建" tabindex="-1">项目创建 <a class="header-anchor" href="#项目创建" aria-label="Permalink to &quot;项目创建&quot;">​</a></h2><p>本项目通过 <code>pnpm</code> 创建项目，如果电脑没有 <code>pnpm</code> ，需要先全局下载：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm i -g pnpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npm i -g pnpm</span></span></code></pre></div><p>项目初始化命令:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm create vite</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm create vite</span></span></code></pre></div><p>创建完毕后会需要输入项目名称、项目框架、项目语言 <code>typescript</code> ，完毕后安装依赖即可运行。</p><p>运行项目的时候希望他能自动在浏览器开启新页面，修改一下命令：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;dev&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vite --open&quot;</span><span style="color:#E1E4E8;">,</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;dev&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;vite --open&quot;</span><span style="color:#24292E;">,</span></span></code></pre></div><h2 id="检测工具" tabindex="-1">检测工具 <a class="header-anchor" href="#检测工具" aria-label="Permalink to &quot;检测工具&quot;">​</a></h2><h3 id="eslint配置" tabindex="-1">eslint配置 <a class="header-anchor" href="#eslint配置" aria-label="Permalink to &quot;eslint配置&quot;">​</a></h3><p><strong>eslint中文官网:<a href="http://eslint.cn/" target="_blank" rel="noreferrer">http://eslint.cn/</a></strong></p><p>ESLint最初是由<a href="http://nczonline.net/" target="_blank" rel="noreferrer">Nicholas C. Zakas</a> 于2013年6月创建的开源项目。它的目标是提供一个插件化的<strong>javascript代码检测工具</strong></p><p>首先安装eslint</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm i eslint -D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm i eslint -D</span></span></code></pre></div><p>生成配置文件:.eslint.cjs</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npx eslint --init</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npx eslint --init</span></span></code></pre></div><p><strong>.eslint.cjs配置文件</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">module.exports = {</span></span>
<span class="line"><span style="color:#e1e4e8;">   //运行环境</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;env&quot;: { </span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;browser&quot;: true,//浏览器端</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;es2021&quot;: true,//es2021</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    //规则继承</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;extends&quot;: [ </span></span>
<span class="line"><span style="color:#e1e4e8;">       //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档</span></span>
<span class="line"><span style="color:#e1e4e8;">       //比如:函数不能重名、对象不能出现重复key</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;eslint:recommended&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        //vue3语法规则</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;plugin:vue/vue3-essential&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        //ts语法规则</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;plugin:@typescript-eslint/recommended&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">    //要为特定类型的文件指定处理器</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;overrides&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">    //指定解析器:解析器</span></span>
<span class="line"><span style="color:#e1e4e8;">    //Esprima 默认解析器</span></span>
<span class="line"><span style="color:#e1e4e8;">    //Babel-ESLint babel解析器</span></span>
<span class="line"><span style="color:#e1e4e8;">    //@typescript-eslint/parser ts解析器</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;parser&quot;: &quot;@typescript-eslint/parser&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    //指定解析器选项</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;parserOptions&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;ecmaVersion&quot;: &quot;latest&quot;,//校验ECMA最新版本</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;sourceType&quot;: &quot;module&quot;//设置为&quot;script&quot;（默认），或者&quot;module&quot;代码在ECMAScript模块中</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它</span></span>
<span class="line"><span style="color:#e1e4e8;">    //该eslint-plugin-前缀可以从插件名称被省略</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;plugins&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;vue&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;@typescript-eslint&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">    //eslint规则</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;rules&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">module.exports = {</span></span>
<span class="line"><span style="color:#24292e;">   //运行环境</span></span>
<span class="line"><span style="color:#24292e;">    &quot;env&quot;: { </span></span>
<span class="line"><span style="color:#24292e;">        &quot;browser&quot;: true,//浏览器端</span></span>
<span class="line"><span style="color:#24292e;">        &quot;es2021&quot;: true,//es2021</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    //规则继承</span></span>
<span class="line"><span style="color:#24292e;">    &quot;extends&quot;: [ </span></span>
<span class="line"><span style="color:#24292e;">       //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档</span></span>
<span class="line"><span style="color:#24292e;">       //比如:函数不能重名、对象不能出现重复key</span></span>
<span class="line"><span style="color:#24292e;">        &quot;eslint:recommended&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        //vue3语法规则</span></span>
<span class="line"><span style="color:#24292e;">        &quot;plugin:vue/vue3-essential&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        //ts语法规则</span></span>
<span class="line"><span style="color:#24292e;">        &quot;plugin:@typescript-eslint/recommended&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ],</span></span>
<span class="line"><span style="color:#24292e;">    //要为特定类型的文件指定处理器</span></span>
<span class="line"><span style="color:#24292e;">    &quot;overrides&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">    ],</span></span>
<span class="line"><span style="color:#24292e;">    //指定解析器:解析器</span></span>
<span class="line"><span style="color:#24292e;">    //Esprima 默认解析器</span></span>
<span class="line"><span style="color:#24292e;">    //Babel-ESLint babel解析器</span></span>
<span class="line"><span style="color:#24292e;">    //@typescript-eslint/parser ts解析器</span></span>
<span class="line"><span style="color:#24292e;">    &quot;parser&quot;: &quot;@typescript-eslint/parser&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    //指定解析器选项</span></span>
<span class="line"><span style="color:#24292e;">    &quot;parserOptions&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;ecmaVersion&quot;: &quot;latest&quot;,//校验ECMA最新版本</span></span>
<span class="line"><span style="color:#24292e;">        &quot;sourceType&quot;: &quot;module&quot;//设置为&quot;script&quot;（默认），或者&quot;module&quot;代码在ECMAScript模块中</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它</span></span>
<span class="line"><span style="color:#24292e;">    //该eslint-plugin-前缀可以从插件名称被省略</span></span>
<span class="line"><span style="color:#24292e;">    &quot;plugins&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        &quot;vue&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;@typescript-eslint&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ],</span></span>
<span class="line"><span style="color:#24292e;">    //eslint规则</span></span>
<span class="line"><span style="color:#24292e;">    &quot;rules&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="vue3环境代码校验插件" tabindex="-1">vue3环境代码校验插件 <a class="header-anchor" href="#vue3环境代码校验插件" aria-label="Permalink to &quot;vue3环境代码校验插件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 让所有与prettier规则存在冲突的Eslint rules失效，并使用prettier进行代码检查</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;eslint-config-prettier&quot;: &quot;^8.6.0&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;eslint-plugin-import&quot;: &quot;^2.27.5&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;eslint-plugin-node&quot;: &quot;^11.1.0&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;"># 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;eslint-plugin-prettier&quot;: &quot;^4.2.1&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;"># vue.js的Eslint插件（查找vue语法错误，发现错误指令，查找违规风格指南</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;eslint-plugin-vue&quot;: &quot;^9.9.0&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;"># 该解析器允许使用Eslint校验所有babel code</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;@babel/eslint-parser&quot;: &quot;^7.19.1&quot;,</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 让所有与prettier规则存在冲突的Eslint rules失效，并使用prettier进行代码检查</span></span>
<span class="line"><span style="color:#24292e;">&quot;eslint-config-prettier&quot;: &quot;^8.6.0&quot;,</span></span>
<span class="line"><span style="color:#24292e;">&quot;eslint-plugin-import&quot;: &quot;^2.27.5&quot;,</span></span>
<span class="line"><span style="color:#24292e;">&quot;eslint-plugin-node&quot;: &quot;^11.1.0&quot;,</span></span>
<span class="line"><span style="color:#24292e;"># 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低</span></span>
<span class="line"><span style="color:#24292e;">&quot;eslint-plugin-prettier&quot;: &quot;^4.2.1&quot;,</span></span>
<span class="line"><span style="color:#24292e;"># vue.js的Eslint插件（查找vue语法错误，发现错误指令，查找违规风格指南</span></span>
<span class="line"><span style="color:#24292e;">&quot;eslint-plugin-vue&quot;: &quot;^9.9.0&quot;,</span></span>
<span class="line"><span style="color:#24292e;"># 该解析器允许使用Eslint校验所有babel code</span></span>
<span class="line"><span style="color:#24292e;">&quot;@babel/eslint-parser&quot;: &quot;^7.19.1&quot;,</span></span></code></pre></div><p>安装指令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser</span></span></code></pre></div><h4 id="修改-eslintrc-cjs配置文件" tabindex="-1">修改.eslintrc.cjs配置文件 <a class="header-anchor" href="#修改-eslintrc-cjs配置文件" aria-label="Permalink to &quot;修改.eslintrc.cjs配置文件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// @see https://eslint.bootcss.com/docs/rules/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">module.exports = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  env: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    browser: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    es2021: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    node: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    jest: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  /* 指定如何解析语法 */</span></span>
<span class="line"><span style="color:#e1e4e8;">  parser: &#39;vue-eslint-parser&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  /** 优先级低于 parse 的语法解析配置 */</span></span>
<span class="line"><span style="color:#e1e4e8;">  parserOptions: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    ecmaVersion: &#39;latest&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    sourceType: &#39;module&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    parser: &#39;@typescript-eslint/parser&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    jsxPragma: &#39;React&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    ecmaFeatures: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      jsx: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  /* 继承已有的规则 */</span></span>
<span class="line"><span style="color:#e1e4e8;">  extends: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;eslint:recommended&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;plugin:vue/vue3-essential&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;plugin:@typescript-eslint/recommended&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;plugin:prettier/recommended&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  plugins: [&#39;vue&#39;, &#39;@typescript-eslint&#39;],</span></span>
<span class="line"><span style="color:#e1e4e8;">  /*</span></span>
<span class="line"><span style="color:#e1e4e8;">   * &quot;off&quot; 或 0    ==&gt;  关闭规则</span></span>
<span class="line"><span style="color:#e1e4e8;">   * &quot;warn&quot; 或 1   ==&gt;  打开的规则作为警告（不影响代码执行）</span></span>
<span class="line"><span style="color:#e1e4e8;">   * &quot;error&quot; 或 2  ==&gt;  规则作为一个错误（代码不能执行，界面报错）</span></span>
<span class="line"><span style="color:#e1e4e8;">   */</span></span>
<span class="line"><span style="color:#e1e4e8;">  rules: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // eslint（https://eslint.bootcss.com/docs/rules/）</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;no-var&#39;: &#39;error&#39;, // 要求使用 let 或 const 而不是 var</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;no-multiple-empty-lines&#39;: [&#39;warn&#39;, { max: 1 }], // 不允许多个空行</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;no-console&#39;: p<wbr>rocess.env.NODE_ENV === &#39;production&#39; ? &#39;error&#39; : &#39;off&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;no-debugger&#39;: p<wbr>rocess.env.NODE_ENV === &#39;production&#39; ? &#39;error&#39; : &#39;off&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;no-unexpected-multiline&#39;: &#39;error&#39;, // 禁止空余的多行</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;no-useless-escape&#39;: &#39;off&#39;, // 禁止不必要的转义字符</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    // typeScript (https://typescript-eslint.io/rules)</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;@typescript-eslint/no-unused-vars&#39;: &#39;error&#39;, // 禁止定义未使用的变量</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;@typescript-eslint/prefer-ts-expect-error&#39;: &#39;error&#39;, // 禁止使用 @ts-ignore</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;@typescript-eslint/no-explicit-any&#39;: &#39;off&#39;, // 禁止使用 any 类型</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;@typescript-eslint/no-non-null-assertion&#39;: &#39;off&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;@typescript-eslint/no-namespace&#39;: &#39;off&#39;, // 禁止使用自定义 TypeScript 模块和命名空间。</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;@typescript-eslint/semi&#39;: &#39;off&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;vue/multi-word-component-names&#39;: &#39;off&#39;, // 要求组件名称始终为 “-” 链接的单词</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;vue/script-setup-uses-vars&#39;: &#39;error&#39;, // 防止&lt;script setup&gt;使用的变量&lt;template&gt;被标记为未使用</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;vue/no-mutating-props&#39;: &#39;off&#39;, // 不允许组件 prop的改变</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;vue/attribute-hyphenation&#39;: &#39;off&#39;, // 对模板中的自定义组件强制执行属性命名样式</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// @see https://eslint.bootcss.com/docs/rules/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">module.exports = {</span></span>
<span class="line"><span style="color:#24292e;">  env: {</span></span>
<span class="line"><span style="color:#24292e;">    browser: true,</span></span>
<span class="line"><span style="color:#24292e;">    es2021: true,</span></span>
<span class="line"><span style="color:#24292e;">    node: true,</span></span>
<span class="line"><span style="color:#24292e;">    jest: true,</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  /* 指定如何解析语法 */</span></span>
<span class="line"><span style="color:#24292e;">  parser: &#39;vue-eslint-parser&#39;,</span></span>
<span class="line"><span style="color:#24292e;">  /** 优先级低于 parse 的语法解析配置 */</span></span>
<span class="line"><span style="color:#24292e;">  parserOptions: {</span></span>
<span class="line"><span style="color:#24292e;">    ecmaVersion: &#39;latest&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    sourceType: &#39;module&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    parser: &#39;@typescript-eslint/parser&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    jsxPragma: &#39;React&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    ecmaFeatures: {</span></span>
<span class="line"><span style="color:#24292e;">      jsx: true,</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  /* 继承已有的规则 */</span></span>
<span class="line"><span style="color:#24292e;">  extends: [</span></span>
<span class="line"><span style="color:#24292e;">    &#39;eslint:recommended&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;plugin:vue/vue3-essential&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;plugin:@typescript-eslint/recommended&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;plugin:prettier/recommended&#39;,</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  plugins: [&#39;vue&#39;, &#39;@typescript-eslint&#39;],</span></span>
<span class="line"><span style="color:#24292e;">  /*</span></span>
<span class="line"><span style="color:#24292e;">   * &quot;off&quot; 或 0    ==&gt;  关闭规则</span></span>
<span class="line"><span style="color:#24292e;">   * &quot;warn&quot; 或 1   ==&gt;  打开的规则作为警告（不影响代码执行）</span></span>
<span class="line"><span style="color:#24292e;">   * &quot;error&quot; 或 2  ==&gt;  规则作为一个错误（代码不能执行，界面报错）</span></span>
<span class="line"><span style="color:#24292e;">   */</span></span>
<span class="line"><span style="color:#24292e;">  rules: {</span></span>
<span class="line"><span style="color:#24292e;">    // eslint（https://eslint.bootcss.com/docs/rules/）</span></span>
<span class="line"><span style="color:#24292e;">    &#39;no-var&#39;: &#39;error&#39;, // 要求使用 let 或 const 而不是 var</span></span>
<span class="line"><span style="color:#24292e;">    &#39;no-multiple-empty-lines&#39;: [&#39;warn&#39;, { max: 1 }], // 不允许多个空行</span></span>
<span class="line"><span style="color:#24292e;">    &#39;no-console&#39;: p<wbr>rocess.env.NODE_ENV === &#39;production&#39; ? &#39;error&#39; : &#39;off&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;no-debugger&#39;: p<wbr>rocess.env.NODE_ENV === &#39;production&#39; ? &#39;error&#39; : &#39;off&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;no-unexpected-multiline&#39;: &#39;error&#39;, // 禁止空余的多行</span></span>
<span class="line"><span style="color:#24292e;">    &#39;no-useless-escape&#39;: &#39;off&#39;, // 禁止不必要的转义字符</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    // typeScript (https://typescript-eslint.io/rules)</span></span>
<span class="line"><span style="color:#24292e;">    &#39;@typescript-eslint/no-unused-vars&#39;: &#39;error&#39;, // 禁止定义未使用的变量</span></span>
<span class="line"><span style="color:#24292e;">    &#39;@typescript-eslint/prefer-ts-expect-error&#39;: &#39;error&#39;, // 禁止使用 @ts-ignore</span></span>
<span class="line"><span style="color:#24292e;">    &#39;@typescript-eslint/no-explicit-any&#39;: &#39;off&#39;, // 禁止使用 any 类型</span></span>
<span class="line"><span style="color:#24292e;">    &#39;@typescript-eslint/no-non-null-assertion&#39;: &#39;off&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;@typescript-eslint/no-namespace&#39;: &#39;off&#39;, // 禁止使用自定义 TypeScript 模块和命名空间。</span></span>
<span class="line"><span style="color:#24292e;">    &#39;@typescript-eslint/semi&#39;: &#39;off&#39;,</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)</span></span>
<span class="line"><span style="color:#24292e;">    &#39;vue/multi-word-component-names&#39;: &#39;off&#39;, // 要求组件名称始终为 “-” 链接的单词</span></span>
<span class="line"><span style="color:#24292e;">    &#39;vue/script-setup-uses-vars&#39;: &#39;error&#39;, // 防止&lt;script setup&gt;使用的变量&lt;template&gt;被标记为未使用</span></span>
<span class="line"><span style="color:#24292e;">    &#39;vue/no-mutating-props&#39;: &#39;off&#39;, // 不允许组件 prop的改变</span></span>
<span class="line"><span style="color:#24292e;">    &#39;vue/attribute-hyphenation&#39;: &#39;off&#39;, // 对模板中的自定义组件强制执行属性命名样式</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="eslintignore忽略文件" tabindex="-1">.eslintignore忽略文件 <a class="header-anchor" href="#eslintignore忽略文件" aria-label="Permalink to &quot;.eslintignore忽略文件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">dist</span></span>
<span class="line"><span style="color:#e1e4e8;">node_modules</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">dist</span></span>
<span class="line"><span style="color:#24292e;">node_modules</span></span></code></pre></div><h4 id="运行脚本" tabindex="-1">运行脚本 <a class="header-anchor" href="#运行脚本" aria-label="Permalink to &quot;运行脚本&quot;">​</a></h4><p>package.json新增两个运行脚本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;lint&quot;: &quot;eslint src&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;fix&quot;: &quot;eslint src --fix&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;lint&quot;: &quot;eslint src&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;fix&quot;: &quot;eslint src --fix&quot;,</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="配置prettier" tabindex="-1">配置<strong>prettier</strong> <a class="header-anchor" href="#配置prettier" aria-label="Permalink to &quot;配置**prettier**&quot;">​</a></h3><p>有了eslint，为什么还要有prettier？eslint针对的是javascript，他是一个检测工具，包含js语法以及少部分格式问题，在eslint看来，语法对了就能保证代码正常运行，格式问题属于其次；</p><p>而prettier属于格式化工具，它看不惯格式不统一，所以它就把eslint没干好的事接着干，另外，prettier支持</p><p>包含js在内的多种语言。</p><p>总结起来，<strong>eslint和prettier这俩兄弟一个保证js代码质量，一个保证代码美观。</strong></p><h4 id="安装依赖包" tabindex="-1">安装依赖包 <a class="header-anchor" href="#安装依赖包" aria-label="Permalink to &quot;安装依赖包&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier</span></span></code></pre></div><h4 id="prettierrc-json添加规则" tabindex="-1">.prettierrc.json添加规则 <a class="header-anchor" href="#prettierrc-json添加规则" aria-label="Permalink to &quot;.prettierrc.json添加规则&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;singleQuote&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;semi&quot;: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;bracketSpacing&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;htmlWhitespaceSensitivity&quot;: &quot;ignore&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;endOfLine&quot;: &quot;auto&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;trailingComma&quot;: &quot;all&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;tabWidth&quot;: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;singleQuote&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;semi&quot;: false,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;bracketSpacing&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;htmlWhitespaceSensitivity&quot;: &quot;ignore&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;endOfLine&quot;: &quot;auto&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;trailingComma&quot;: &quot;all&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;tabWidth&quot;: 2</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="prettierignore忽略文件" tabindex="-1">.prettierignore忽略文件 <a class="header-anchor" href="#prettierignore忽略文件" aria-label="Permalink to &quot;.prettierignore忽略文件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/dist/*</span></span>
<span class="line"><span style="color:#e1e4e8;">/html/*</span></span>
<span class="line"><span style="color:#e1e4e8;">.local</span></span>
<span class="line"><span style="color:#e1e4e8;">/node_modules/**</span></span>
<span class="line"><span style="color:#e1e4e8;">**/*.svg</span></span>
<span class="line"><span style="color:#e1e4e8;">**/*.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">/public/*</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/dist/*</span></span>
<span class="line"><span style="color:#24292e;">/html/*</span></span>
<span class="line"><span style="color:#24292e;">.local</span></span>
<span class="line"><span style="color:#24292e;">/node_modules/**</span></span>
<span class="line"><span style="color:#24292e;">**/*.svg</span></span>
<span class="line"><span style="color:#24292e;">**/*.sh</span></span>
<span class="line"><span style="color:#24292e;">/public/*</span></span></code></pre></div><p><strong>通过pnpm run lint去检测语法，如果出现不规范格式,通过pnpm run fix 修改</strong></p><h3 id="配置stylelint" tabindex="-1">配置stylelint <a class="header-anchor" href="#配置stylelint" aria-label="Permalink to &quot;配置stylelint&quot;">​</a></h3><p><a href="https://stylelint.io/" target="_blank" rel="noreferrer">stylelint</a>为css的lint工具。可格式化css代码，检查css语法错误与不合理的写法，指定css书写顺序等。</p><p>我们的项目中使用scss作为预处理器，安装以下依赖：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D</span></span></code></pre></div><h4 id="stylelintrc-cjs配置文件" tabindex="-1">.stylelintrc.cjs配置文件 <a class="header-anchor" href="#stylelintrc-cjs配置文件" aria-label="Permalink to &quot;.stylelintrc.cjs配置文件&quot;">​</a></h4><p><strong>官网:<a href="https://stylelint.bootcss.com/" target="_blank" rel="noreferrer">https://stylelint.bootcss.com/</a></strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// @see https://stylelint.bootcss.com/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">module.exports = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  extends: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;stylelint-config-standard&#39;, // 配置stylelint拓展插件</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;stylelint-config-html/vue&#39;, // 配置 vue 中 template 样式格式化</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;stylelint-config-standard-scss&#39;, // 配置stylelint scss插件</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;stylelint-config-recommended-vue/scss&#39;, // 配置 vue 中 scss 样式格式化</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;stylelint-config-recess-order&#39;, // 配置stylelint css属性书写顺序插件,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;stylelint-config-prettier&#39;, // 配置stylelint和prettier兼容</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  overrides: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      files: [&#39;**/*.(scss|css|vue|html)&#39;],</span></span>
<span class="line"><span style="color:#e1e4e8;">      customSyntax: &#39;postcss-scss&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      files: [&#39;**/*.(html|vue)&#39;],</span></span>
<span class="line"><span style="color:#e1e4e8;">      customSyntax: &#39;postcss-html&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  ignoreFiles: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;**/*.js&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;**/*.jsx&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;**/*.tsx&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;**/*.ts&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;**/*.json&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;**/*.md&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;**/*.yaml&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  /**</span></span>
<span class="line"><span style="color:#e1e4e8;">   * null  =&gt; 关闭该规则</span></span>
<span class="line"><span style="color:#e1e4e8;">   * always =&gt; 必须</span></span>
<span class="line"><span style="color:#e1e4e8;">   */</span></span>
<span class="line"><span style="color:#e1e4e8;">  rules: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;value-keyword-case&#39;: null, // 在 css 中使用 v-bind，不报错</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;no-descending-specificity&#39;: null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;function-url-quotes&#39;: &#39;always&#39;, // 要求或禁止 URL 的引号 &quot;always(必须加上引号)&quot;|&quot;never(没有引号)&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;no-empty-source&#39;: null, // 关闭禁止空源码</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;selector-class-pattern&#39;: null, // 关闭强制选择器类名的格式</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;property-no-unknown&#39;: null, // 禁止未知的属性(true 为不允许)</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;block-opening-brace-space-before&#39;: &#39;always&#39;, //大括号之前必须有一个空格或不能有空白符</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;value-no-vendor-prefix&#39;: null, // 关闭 属性值前缀 --webkit-box</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;property-no-vendor-prefix&#39;: null, // 关闭 属性前缀 -webkit-mask</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;selector-pseudo-class-no-unknown&#39;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">      // 不允许未知的选择器</span></span>
<span class="line"><span style="color:#e1e4e8;">      true,</span></span>
<span class="line"><span style="color:#e1e4e8;">      {</span></span>
<span class="line"><span style="color:#e1e4e8;">        ignorePseudoClasses: [&#39;global&#39;, &#39;v-deep&#39;, &#39;deep&#39;], // 忽略属性，修改element默认样式的时候能使用到</span></span>
<span class="line"><span style="color:#e1e4e8;">      },</span></span>
<span class="line"><span style="color:#e1e4e8;">    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// @see https://stylelint.bootcss.com/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">module.exports = {</span></span>
<span class="line"><span style="color:#24292e;">  extends: [</span></span>
<span class="line"><span style="color:#24292e;">    &#39;stylelint-config-standard&#39;, // 配置stylelint拓展插件</span></span>
<span class="line"><span style="color:#24292e;">    &#39;stylelint-config-html/vue&#39;, // 配置 vue 中 template 样式格式化</span></span>
<span class="line"><span style="color:#24292e;">    &#39;stylelint-config-standard-scss&#39;, // 配置stylelint scss插件</span></span>
<span class="line"><span style="color:#24292e;">    &#39;stylelint-config-recommended-vue/scss&#39;, // 配置 vue 中 scss 样式格式化</span></span>
<span class="line"><span style="color:#24292e;">    &#39;stylelint-config-recess-order&#39;, // 配置stylelint css属性书写顺序插件,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;stylelint-config-prettier&#39;, // 配置stylelint和prettier兼容</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  overrides: [</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      files: [&#39;**/*.(scss|css|vue|html)&#39;],</span></span>
<span class="line"><span style="color:#24292e;">      customSyntax: &#39;postcss-scss&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      files: [&#39;**/*.(html|vue)&#39;],</span></span>
<span class="line"><span style="color:#24292e;">      customSyntax: &#39;postcss-html&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  ignoreFiles: [</span></span>
<span class="line"><span style="color:#24292e;">    &#39;**/*.js&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;**/*.jsx&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;**/*.tsx&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;**/*.ts&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;**/*.json&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;**/*.md&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;**/*.yaml&#39;,</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  /**</span></span>
<span class="line"><span style="color:#24292e;">   * null  =&gt; 关闭该规则</span></span>
<span class="line"><span style="color:#24292e;">   * always =&gt; 必须</span></span>
<span class="line"><span style="color:#24292e;">   */</span></span>
<span class="line"><span style="color:#24292e;">  rules: {</span></span>
<span class="line"><span style="color:#24292e;">    &#39;value-keyword-case&#39;: null, // 在 css 中使用 v-bind，不报错</span></span>
<span class="line"><span style="color:#24292e;">    &#39;no-descending-specificity&#39;: null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器</span></span>
<span class="line"><span style="color:#24292e;">    &#39;function-url-quotes&#39;: &#39;always&#39;, // 要求或禁止 URL 的引号 &quot;always(必须加上引号)&quot;|&quot;never(没有引号)&quot;</span></span>
<span class="line"><span style="color:#24292e;">    &#39;no-empty-source&#39;: null, // 关闭禁止空源码</span></span>
<span class="line"><span style="color:#24292e;">    &#39;selector-class-pattern&#39;: null, // 关闭强制选择器类名的格式</span></span>
<span class="line"><span style="color:#24292e;">    &#39;property-no-unknown&#39;: null, // 禁止未知的属性(true 为不允许)</span></span>
<span class="line"><span style="color:#24292e;">    &#39;block-opening-brace-space-before&#39;: &#39;always&#39;, //大括号之前必须有一个空格或不能有空白符</span></span>
<span class="line"><span style="color:#24292e;">    &#39;value-no-vendor-prefix&#39;: null, // 关闭 属性值前缀 --webkit-box</span></span>
<span class="line"><span style="color:#24292e;">    &#39;property-no-vendor-prefix&#39;: null, // 关闭 属性前缀 -webkit-mask</span></span>
<span class="line"><span style="color:#24292e;">    &#39;selector-pseudo-class-no-unknown&#39;: [</span></span>
<span class="line"><span style="color:#24292e;">      // 不允许未知的选择器</span></span>
<span class="line"><span style="color:#24292e;">      true,</span></span>
<span class="line"><span style="color:#24292e;">      {</span></span>
<span class="line"><span style="color:#24292e;">        ignorePseudoClasses: [&#39;global&#39;, &#39;v-deep&#39;, &#39;deep&#39;], // 忽略属性，修改element默认样式的时候能使用到</span></span>
<span class="line"><span style="color:#24292e;">      },</span></span>
<span class="line"><span style="color:#24292e;">    ],</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="stylelintignore忽略文件" tabindex="-1">.stylelintignore忽略文件 <a class="header-anchor" href="#stylelintignore忽略文件" aria-label="Permalink to &quot;.stylelintignore忽略文件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/node_modules/*</span></span>
<span class="line"><span style="color:#e1e4e8;">/dist/*</span></span>
<span class="line"><span style="color:#e1e4e8;">/html/*</span></span>
<span class="line"><span style="color:#e1e4e8;">/public/*</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/node_modules/*</span></span>
<span class="line"><span style="color:#24292e;">/dist/*</span></span>
<span class="line"><span style="color:#24292e;">/html/*</span></span>
<span class="line"><span style="color:#24292e;">/public/*</span></span></code></pre></div><h4 id="运行脚本-1" tabindex="-1">运行脚本 <a class="header-anchor" href="#运行脚本-1" aria-label="Permalink to &quot;运行脚本&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;lint:style&quot;: &quot;stylelint src/**/*.{css,scss,vue} --cache --fix&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">	&quot;lint:style&quot;: &quot;stylelint src/**/*.{css,scss,vue} --cache --fix&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>最后配置统一的prettier来格式化我们的js和css，html代码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;dev&quot;: &quot;vite --open&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;build&quot;: &quot;vue-tsc &amp;&amp; vite build&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;preview&quot;: &quot;vite preview&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;lint&quot;: &quot;eslint src&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;fix&quot;: &quot;eslint src --fix&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;format&quot;: &quot;prettier --write \\&quot;./**/*.{html,vue,ts,js,json,md}\\&quot;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;lint:eslint&quot;: &quot;eslint src/**/*.{ts,vue} --cache --fix&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;lint:style&quot;: &quot;stylelint src/**/*.{css,scss,vue} --cache --fix&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;dev&quot;: &quot;vite --open&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;build&quot;: &quot;vue-tsc &amp;&amp; vite build&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;preview&quot;: &quot;vite preview&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;lint&quot;: &quot;eslint src&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;fix&quot;: &quot;eslint src --fix&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;format&quot;: &quot;prettier --write \\&quot;./**/*.{html,vue,ts,js,json,md}\\&quot;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;lint:eslint&quot;: &quot;eslint src/**/*.{ts,vue} --cache --fix&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;lint:style&quot;: &quot;stylelint src/**/*.{css,scss,vue} --cache --fix&quot;</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span></code></pre></div><p><strong>当我们运行<code>pnpm run format</code>的时候，会把代码直接格式化</strong></p><h3 id="配置husky" tabindex="-1">配置husky <a class="header-anchor" href="#配置husky" aria-label="Permalink to &quot;配置husky&quot;">​</a></h3><p>在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。</p><p>要做到这件事情，就需要利用husky在代码提交之前触发git hook(git在客户端的钩子)，然后执行<code>pnpm run format</code>来自动的格式化我们的代码。</p><p>安装<code>husky</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm install -D husky</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm install -D husky</span></span></code></pre></div><p>执行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npx husky-init</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npx husky-init</span></span></code></pre></div><p>会在根目录下生成个一个.husky目录，在这个目录下面会有一个pre-commit文件，这个文件里面的命令在我们执行commit的时候就会执行</p><p>在<code>.husky/pre-commit</code>文件添加如下命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#e1e4e8;">. &quot;$(dirname -- &quot;$0&quot;)/_/husky.sh&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">pnpm run format</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#24292e;">. &quot;$(dirname -- &quot;$0&quot;)/_/husky.sh&quot;</span></span>
<span class="line"><span style="color:#24292e;">pnpm run format</span></span></code></pre></div><p>当我们对代码进行commit操作的时候，就会执行命令，对代码进行格式化，然后再提交。</p><h3 id="配置commitlint" tabindex="-1">配置commitlint <a class="header-anchor" href="#配置commitlint" aria-label="Permalink to &quot;配置commitlint&quot;">​</a></h3><p>对于我们的commit信息，也是有统一规范的，不能随便写,要让每个人都按照统一的标准来执行，我们可以利用<strong>commitlint</strong>来实现。</p><p>安装包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm add @commitlint/config-conventional @commitlint/cli -D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm add @commitlint/config-conventional @commitlint/cli -D</span></span></code></pre></div><p>添加配置文件，新建<code>commitlint.config.cjs</code>(注意是cjs)，然后添加下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">module.exports = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  extends: [&#39;@commitlint/config-conventional&#39;],</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 校验规则</span></span>
<span class="line"><span style="color:#e1e4e8;">  rules: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;type-enum&#39;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">      2,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &#39;always&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      [</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;feat&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;fix&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;docs&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;style&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;refactor&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;perf&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;test&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;chore&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;revert&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;build&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      ],</span></span>
<span class="line"><span style="color:#e1e4e8;">    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;type-case&#39;: [0],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;type-empty&#39;: [0],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;scope-empty&#39;: [0],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;scope-case&#39;: [0],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;subject-full-stop&#39;: [0, &#39;never&#39;],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;subject-case&#39;: [0, &#39;never&#39;],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;header-max-length&#39;: [0, &#39;always&#39;, 72],</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">module.exports = {</span></span>
<span class="line"><span style="color:#24292e;">  extends: [&#39;@commitlint/config-conventional&#39;],</span></span>
<span class="line"><span style="color:#24292e;">  // 校验规则</span></span>
<span class="line"><span style="color:#24292e;">  rules: {</span></span>
<span class="line"><span style="color:#24292e;">    &#39;type-enum&#39;: [</span></span>
<span class="line"><span style="color:#24292e;">      2,</span></span>
<span class="line"><span style="color:#24292e;">      &#39;always&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      [</span></span>
<span class="line"><span style="color:#24292e;">        &#39;feat&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;fix&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;docs&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;style&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;refactor&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;perf&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;test&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;chore&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;revert&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;build&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      ],</span></span>
<span class="line"><span style="color:#24292e;">    ],</span></span>
<span class="line"><span style="color:#24292e;">    &#39;type-case&#39;: [0],</span></span>
<span class="line"><span style="color:#24292e;">    &#39;type-empty&#39;: [0],</span></span>
<span class="line"><span style="color:#24292e;">    &#39;scope-empty&#39;: [0],</span></span>
<span class="line"><span style="color:#24292e;">    &#39;scope-case&#39;: [0],</span></span>
<span class="line"><span style="color:#24292e;">    &#39;subject-full-stop&#39;: [0, &#39;never&#39;],</span></span>
<span class="line"><span style="color:#24292e;">    &#39;subject-case&#39;: [0, &#39;never&#39;],</span></span>
<span class="line"><span style="color:#24292e;">    &#39;header-max-length&#39;: [0, &#39;always&#39;, 72],</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>在<code>package.json</code>中配置scripts命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 在scrips中添加下面的代码</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;commitlint&quot;: &quot;commitlint --config commitlint.config.cjs -e -V&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 在scrips中添加下面的代码</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;commitlint&quot;: &quot;commitlint --config commitlint.config.cjs -e -V&quot;</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>配置结束，现在当我们填写<code>commit</code>信息的时候，前面就需要带着下面的<code>subject</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&#39;feat&#39;,//新特性、新功能</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;fix&#39;,//修改bug</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;docs&#39;,//文档修改</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;style&#39;,//代码格式修改, 注意不是 css 修改</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;refactor&#39;,//代码重构</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;perf&#39;,//优化相关，比如提升性能、体验</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;test&#39;,//测试用例修改</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;chore&#39;,//其他修改, 比如改变构建流程、或者增加依赖库、工具等</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;revert&#39;,//回滚到上一个版本</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;build&#39;,//编译相关的修改，例如发布版本、对项目构建或者依赖的改动</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&#39;feat&#39;,//新特性、新功能</span></span>
<span class="line"><span style="color:#24292e;">&#39;fix&#39;,//修改bug</span></span>
<span class="line"><span style="color:#24292e;">&#39;docs&#39;,//文档修改</span></span>
<span class="line"><span style="color:#24292e;">&#39;style&#39;,//代码格式修改, 注意不是 css 修改</span></span>
<span class="line"><span style="color:#24292e;">&#39;refactor&#39;,//代码重构</span></span>
<span class="line"><span style="color:#24292e;">&#39;perf&#39;,//优化相关，比如提升性能、体验</span></span>
<span class="line"><span style="color:#24292e;">&#39;test&#39;,//测试用例修改</span></span>
<span class="line"><span style="color:#24292e;">&#39;chore&#39;,//其他修改, 比如改变构建流程、或者增加依赖库、工具等</span></span>
<span class="line"><span style="color:#24292e;">&#39;revert&#39;,//回滚到上一个版本</span></span>
<span class="line"><span style="color:#24292e;">&#39;build&#39;,//编译相关的修改，例如发布版本、对项目构建或者依赖的改动</span></span></code></pre></div><p>配置husky</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npx husky add .husky/commit-msg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npx husky add .husky/commit-msg</span></span></code></pre></div><p>在生成的commit-msg文件中添加下面的命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#e1e4e8;">. &quot;$(dirname -- &quot;$0&quot;)/_/husky.sh&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">pnpm commitlint</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#24292e;">. &quot;$(dirname -- &quot;$0&quot;)/_/husky.sh&quot;</span></span>
<span class="line"><span style="color:#24292e;">pnpm commitlint</span></span></code></pre></div><p>当我们 commit 提交信息时，就不能再随意写了，必须是 git commit -m &#39;fix: xxx&#39; 符合类型的才可以，<strong>需要注意的是类型的后面需要用英文的 :，并且冒号后面是需要空一格的，这个是不能省略的</strong></p><h2 id="项目集成" tabindex="-1">项目集成 <a class="header-anchor" href="#项目集成" aria-label="Permalink to &quot;项目集成&quot;">​</a></h2><h3 id="集成element-plus" tabindex="-1">集成element-plus <a class="header-anchor" href="#集成element-plus" aria-label="Permalink to &quot;集成element-plus&quot;">​</a></h3><p>官网地址:<a href="https://element-plus.gitee.io/zh-CN/" target="_blank" rel="noreferrer">https://element-plus.gitee.io/zh-CN/</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm install element-plus @element-plus/icons-vue</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm install element-plus @element-plus/icons-vue</span></span></code></pre></div><p><strong>入口文件main.ts全局安装element-plus,element-plus默认支持语言英语设置为中文</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ElementPlus </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;element-plus&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;element-plus/dist/index.css&#39;</span></span>
<span class="line"><span style="color:#6A737D;">//@ts-ignore 忽略当前文件ts类型的检测否则有红色提示(打包会失败)</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> zhCn </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;element-plus/dist/locale/zh-cn.mjs&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(ElementPlus, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    locale: zhCn</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ElementPlus </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;element-plus&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;element-plus/dist/index.css&#39;</span></span>
<span class="line"><span style="color:#6A737D;">//@ts-ignore 忽略当前文件ts类型的检测否则有红色提示(打包会失败)</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> zhCn </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;element-plus/dist/locale/zh-cn.mjs&#39;</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(ElementPlus, {</span></span>
<span class="line"><span style="color:#24292E;">    locale: zhCn</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p><strong>图标引入</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm install @element-plus/icons-vue</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm install @element-plus/icons-vue</span></span></code></pre></div><p>全局注册组件后，现在能够直接在项目里使用。</p><p><strong>Element Plus全局组件类型声明</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// tsconfig.json</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // ...</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;types&quot;: [&quot;element-plus/global&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// tsconfig.json</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    // ...</span></span>
<span class="line"><span style="color:#24292e;">    &quot;types&quot;: [&quot;element-plus/global&quot;]</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>配置完毕可以测试element-plus组件与图标的使用.</p><h3 id="src别名的配置" tabindex="-1">src别名的配置 <a class="header-anchor" href="#src别名的配置" aria-label="Permalink to &quot;src别名的配置&quot;">​</a></h3><p>在开发项目的时候文件与文件关系可能很复杂，因此我们需要给src文件夹配置一个别名！！！</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {defineConfig} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vite&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> path </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;path&#39;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugins: [</span><span style="color:#B392F0;">vue</span><span style="color:#E1E4E8;">()],</span></span>
<span class="line"><span style="color:#E1E4E8;">    resolve: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        alias: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;@&quot;</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./src&quot;</span><span style="color:#E1E4E8;">), </span><span style="color:#6A737D;">// 相对路径别名配置，使用 @ 代替 src</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;@api&quot;</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./src/api&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">      		</span><span style="color:#9ECBFF;">&quot;@comp&quot;</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./src/components&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">      		</span><span style="color:#9ECBFF;">&quot;@v&quot;</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./src/views&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {defineConfig} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vite&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> path </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;path&#39;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    plugins: [</span><span style="color:#6F42C1;">vue</span><span style="color:#24292E;">()],</span></span>
<span class="line"><span style="color:#24292E;">    resolve: {</span></span>
<span class="line"><span style="color:#24292E;">        alias: {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;@&quot;</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./src&quot;</span><span style="color:#24292E;">), </span><span style="color:#6A737D;">// 相对路径别名配置，使用 @ 代替 src</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;@api&quot;</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./src/api&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">      		</span><span style="color:#032F62;">&quot;@comp&quot;</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./src/components&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">      		</span><span style="color:#032F62;">&quot;@v&quot;</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./src/views&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p><strong>TypeScript 编译配置</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// tsconfig.json</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;compilerOptions&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;baseUrl&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 解析非相对模块的基地址，默认是当前目录</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;paths&quot;</span><span style="color:#E1E4E8;">: { </span><span style="color:#6A737D;">//路径映射，相对于baseUrl</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@/*&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;src/*&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@/*&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;src/*&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@api/*&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;src/api/*&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@comp/*&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;src/components/*&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@v/*&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;src/views/*&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// tsconfig.json</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;compilerOptions&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;baseUrl&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 解析非相对模块的基地址，默认是当前目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;paths&quot;</span><span style="color:#24292E;">: { </span><span style="color:#6A737D;">//路径映射，相对于baseUrl</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@/*&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;src/*&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@/*&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;src/*&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@api/*&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;src/api/*&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@comp/*&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;src/components/*&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@v/*&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;src/views/*&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="环境变量的配置" tabindex="-1">环境变量的配置 <a class="header-anchor" href="#环境变量的配置" aria-label="Permalink to &quot;环境变量的配置&quot;">​</a></h3><p><strong>项目开发过程中，至少会经历开发环境、测试环境和生产环境(即正式环境)三个阶段。不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。</strong></p><ul><li>开发环境（development） 顾名思义，开发使用的环境，每位开发人员在自己的dev分支上干活，开发到一定程度，同事会合并代码，进行联调。</li><li>测试环境（testing） 测试同事干活的环境啦，一般会由测试同事自己来部署，然后在此环境进行测试</li><li>生产环境（production） 生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(正式提供给客户使用的环境。)</li></ul><blockquote><p>注意</p><p>一般情况下，一个环境对应一台服务器,也有的公司开发与测试环境是一台服务器！！！</p></blockquote><p>项目根目录分别添加 开发、生产和测试环境的文件!</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">.env.development</span></span>
<span class="line"><span style="color:#e1e4e8;">.env.production</span></span>
<span class="line"><span style="color:#e1e4e8;">.env.test</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">.env.development</span></span>
<span class="line"><span style="color:#24292e;">.env.production</span></span>
<span class="line"><span style="color:#24292e;">.env.test</span></span></code></pre></div><p>文件内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 变量必须以 VITE_ 为前缀才能暴露给外部读取</span></span>
<span class="line"><span style="color:#e1e4e8;">NODE_ENV = &#39;development&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">VITE_APP_TITLE = &#39;刀刀甄选&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">VITE_APP_BASE_API = &#39;/dev-api&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 变量必须以 VITE_ 为前缀才能暴露给外部读取</span></span>
<span class="line"><span style="color:#24292e;">NODE_ENV = &#39;development&#39;</span></span>
<span class="line"><span style="color:#24292e;">VITE_APP_TITLE = &#39;刀刀甄选&#39;</span></span>
<span class="line"><span style="color:#24292e;">VITE_APP_BASE_API = &#39;/dev-api&#39;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">NODE_ENV = &#39;production&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">VITE_APP_TITLE = &#39;刀刀甄选&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">VITE_APP_BASE_API = &#39;/prod-api&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">NODE_ENV = &#39;production&#39;</span></span>
<span class="line"><span style="color:#24292e;">VITE_APP_TITLE = &#39;刀刀甄选&#39;</span></span>
<span class="line"><span style="color:#24292e;">VITE_APP_BASE_API = &#39;/prod-api&#39;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 变量必须以 VITE_ 为前缀才能暴露给外部读取</span></span>
<span class="line"><span style="color:#e1e4e8;">NODE_ENV = &#39;test&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">VITE_APP_TITLE = &#39;刀刀甄选&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">VITE_APP_BASE_API = &#39;/test-api&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 变量必须以 VITE_ 为前缀才能暴露给外部读取</span></span>
<span class="line"><span style="color:#24292e;">NODE_ENV = &#39;test&#39;</span></span>
<span class="line"><span style="color:#24292e;">VITE_APP_TITLE = &#39;刀刀甄选&#39;</span></span>
<span class="line"><span style="color:#24292e;">VITE_APP_BASE_API = &#39;/test-api&#39;</span></span></code></pre></div><p>配置运行命令：<code>package.json</code></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;dev&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vite --open&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;build:test&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vue-tsc &amp;&amp; vite build --mode test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;build:pro&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vue-tsc &amp;&amp; vite build --mode production&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;preview&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vite preview&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;dev&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;vite --open&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;build:test&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;vue-tsc &amp;&amp; vite build --mode test&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;build:pro&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;vue-tsc &amp;&amp; vite build --mode production&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;preview&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;vite preview&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span></code></pre></div><p>通过 <code>i<wbr>mport.meta.env</code> 获取环境变量</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">meta</span><span style="color:#E1E4E8;">.env);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 打印：</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">BASE_URL</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">DEV</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">MODE</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;development&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">PROD</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">SSR</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">VITE_APP_BASE_API</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/dev-api&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">VITE_APP_TITLE</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;硅谷甄选运营平台&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">VITE_USER_NODE_ENV</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;development&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">import</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">meta</span><span style="color:#24292E;">.env);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 打印：</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">BASE_URL</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">DEV</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">MODE</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;development&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">PROD</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">SSR</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">VITE_APP_BASE_API</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/dev-api&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">VITE_APP_TITLE</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;硅谷甄选运营平台&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">VITE_USER_NODE_ENV</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;development&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="svg图标配置" tabindex="-1">SVG图标配置 <a class="header-anchor" href="#svg图标配置" aria-label="Permalink to &quot;SVG图标配置&quot;">​</a></h3><p>在开发项目的时候经常会用到 SVG 矢量图,而且我们使用 SVG 以后，页面上加载的不再是图片资源,</p><p>这对页面性能来说是个很大的提升，而且我们 SVG 文件比 img 要小的很多，放在项目中几乎不占用资源。</p><p><strong>安装SVG依赖插件</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm install vite-plugin-svg-icons -D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm install vite-plugin-svg-icons -D</span></span></code></pre></div><p><strong>在<code>vite.config.ts</code>中配置插件</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createSvgIconsPlugin } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vite-plugin-svg-icons&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> path </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;path&#39;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">createSvgIconsPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Specify the icon folder to be cached</span></span>
<span class="line"><span style="color:#E1E4E8;">        iconDirs: [path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(process.</span><span style="color:#B392F0;">cwd</span><span style="color:#E1E4E8;">(), </span><span style="color:#9ECBFF;">&#39;src/assets/icons&#39;</span><span style="color:#E1E4E8;">)],</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Specify symbolId format</span></span>
<span class="line"><span style="color:#E1E4E8;">        symbolId: </span><span style="color:#9ECBFF;">&#39;icon-[dir]-[name]&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createSvgIconsPlugin } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vite-plugin-svg-icons&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> path </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;path&#39;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    plugins: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">createSvgIconsPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Specify the icon folder to be cached</span></span>
<span class="line"><span style="color:#24292E;">        iconDirs: [path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(process.</span><span style="color:#6F42C1;">cwd</span><span style="color:#24292E;">(), </span><span style="color:#032F62;">&#39;src/assets/icons&#39;</span><span style="color:#24292E;">)],</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Specify symbolId format</span></span>
<span class="line"><span style="color:#24292E;">        symbolId: </span><span style="color:#032F62;">&#39;icon-[dir]-[name]&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      }),</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>入口文件导入</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;virtual:svg-icons-register&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;virtual:svg-icons-register&#39;</span></span></code></pre></div><h4 id="svg封装为全局组件" tabindex="-1">svg封装为全局组件 <a class="header-anchor" href="#svg封装为全局组件" aria-label="Permalink to &quot;svg封装为全局组件&quot;">​</a></h4><p>因为项目很多模块需要使用图标,因此把它封装为全局组件！！！</p><p><strong>在src/components目录下创建一个SvgIcon组件:代表如下</strong></p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">svg</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">:style</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;{ width: width, height: height }&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">use</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">:xlink:href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;prefix + name&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">:fill</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;color&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">use</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">svg</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">defineProps</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//xlink:href属性值的前缀</span></span>
<span class="line"><span style="color:#E1E4E8;">  prefix: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    default: </span><span style="color:#9ECBFF;">&#39;#icon-&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//svg矢量图的名字</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: String,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//svg图标的颜色</span></span>
<span class="line"><span style="color:#E1E4E8;">  color: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    default: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//svg宽度</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    default: </span><span style="color:#9ECBFF;">&#39;16px&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//svg高度</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    default: </span><span style="color:#9ECBFF;">&#39;16px&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">scoped</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">svg</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">:style</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;{ width: width, height: height }&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">use</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">:xlink:href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;prefix + name&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">:fill</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;color&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">use</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">svg</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">defineProps</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//xlink:href属性值的前缀</span></span>
<span class="line"><span style="color:#24292E;">  prefix: {</span></span>
<span class="line"><span style="color:#24292E;">    type: String,</span></span>
<span class="line"><span style="color:#24292E;">    default: </span><span style="color:#032F62;">&#39;#icon-&#39;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//svg矢量图的名字</span></span>
<span class="line"><span style="color:#24292E;">  name: String,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//svg图标的颜色</span></span>
<span class="line"><span style="color:#24292E;">  color: {</span></span>
<span class="line"><span style="color:#24292E;">    type: String,</span></span>
<span class="line"><span style="color:#24292E;">    default: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//svg宽度</span></span>
<span class="line"><span style="color:#24292E;">  width: {</span></span>
<span class="line"><span style="color:#24292E;">    type: String,</span></span>
<span class="line"><span style="color:#24292E;">    default: </span><span style="color:#032F62;">&#39;16px&#39;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//svg高度</span></span>
<span class="line"><span style="color:#24292E;">  height: {</span></span>
<span class="line"><span style="color:#24292E;">    type: String,</span></span>
<span class="line"><span style="color:#24292E;">    default: </span><span style="color:#032F62;">&#39;16px&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">scoped</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>在src文件夹目录下创建一个 <code>index.ts</code> 文件：用于注册 <code>components</code> 文件夹内部全部全局组件！！！</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> SvgIcon </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./SvgIcon/index.vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> { App, Component } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">components</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> { [</span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Component</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { SvgIcon };</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">app</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Object.</span><span style="color:#B392F0;">keys</span><span style="color:#E1E4E8;">(components).</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">key</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(key, components[key]);</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> SvgIcon </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./SvgIcon/index.vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> { App, Component } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">components</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> { [</span><span style="color:#E36209;">name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Component</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { SvgIcon };</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">(</span><span style="color:#E36209;">app</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Object.</span><span style="color:#6F42C1;">keys</span><span style="color:#24292E;">(components).</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">key</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(key, components[key]);</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在入口文件引入 <code>src/index.ts</code> 文件，通过 <code>app.use</code> 方法安装自定义插件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> gloablComponent </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./components/index&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(gloablComponent);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> gloablComponent </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./components/index&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(gloablComponent);</span></span></code></pre></div><h4 id="拓展" tabindex="-1">拓展 <a class="header-anchor" href="#拓展" aria-label="Permalink to &quot;拓展&quot;">​</a></h4><ol><li><p>SVG 的使用方式步骤如下：</p><ol><li>外层使用 <code>svg</code> 图标容器节点</li><li>内部需要与 <code>use</code> 标签结合使用</li><li><code>xlink:href</code> 执行用哪一个图标，属性值务必为 #icon-图标名字</li><li><code>use</code> 标签 <code>fill</code> 属性可以设置图标颜色</li><li><code>svg</code> 中的 <code>style</code> 可以设置样式</li></ol><p>代码如下所示：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- svg：图标外层容器节点；内部需要与use标签结合使用 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">svg</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">style</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">; </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;!-- xlink:href执行用哪一个图标，属性值务必为 #icon-图标名字 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;!-- use标签 fill 属性可以设置图标颜色 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;use xlink:href=&quot;#icon-wechat&quot; fill=&quot;skyblue&quot;&gt;&lt;/use&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">svg</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- svg：图标外层容器节点；内部需要与use标签结合使用 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">svg</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">style</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">; </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;!-- xlink:href执行用哪一个图标，属性值务必为 #icon-图标名字 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;!-- use标签 fill 属性可以设置图标颜色 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;use xlink:href=&quot;#icon-wechat&quot; fill=&quot;skyblue&quot;&gt;&lt;/use&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">svg</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li><li><p>全局组件自定义插件使用本质</p><p>导出一个自定义插件，代码如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>注意</p><p>自定义插件内一定要使用 <code>install</code></p></blockquote><p>其 <code>install</code> 有一个形参，打印后内容如下所示：</p><p><a href="https://imgse.com/i/pCmf5Gt" target="_blank" rel="noreferrer"><img src="https://s1.ax1x.com/2023/06/13/pCmf5Gt.png" alt="pCmf5Gt.png"></a></p><p>因此可以通过 <code>component</code> 注册组件。注册完毕后入口文件导入自定义插件，通过 <code>app.use()</code> 注册插件即可。</p></li></ol><h3 id="集成sass" tabindex="-1">集成sass <a class="header-anchor" href="#集成sass" aria-label="Permalink to &quot;集成sass&quot;">​</a></h3><p>我们目前在组件内部已经可以使用scss样式,因为在配置styleLint工具的时候，项目当中已经安装过sass sass-loader,因此我们再组件内可以使用scss语法！！！需要加上lang=&quot;scss&quot;</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">scoped</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;scss&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">scoped</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;scss&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>接下来我们为项目添加一些全局的样式</p><p>在 <code>src/styles</code> 目录下创建一个 <code>index.scss</code> 文件，当然项目中需要用到清除默认样式，因此在 <code>index.scss</code> 引入 <code>reset.scss</code> 。</p><div class="language-scss vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./reset.scss&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./reset.scss&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>在入口文件引入</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/styles/index.scss&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/styles/index.scss&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>但是你会发现在 <code>src/styles/index.scss</code> 全局样式文件中没有办法使用$变量。因此需要给项目中引入全局变量$.</p><p>在 <code>styles</code> 文件夹下创建一个 <code>variable.scss</code> 文件！</p><p>在 <code>vite.config.ts</code> 文件配置如下:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">config</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">css</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">preprocessorOptions</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">scss</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">javascriptEnabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">additionalData</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;@import &quot;./src/styles/variable.scss&quot;;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">((</span><span style="color:#E36209;">config</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">css</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">preprocessorOptions</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">scss</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">javascriptEnabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">additionalData</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;@import &quot;./src/styles/variable.scss&quot;;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong><code>@import &quot;./src/styles/variable.less&quot;;</code>后面的<code>;</code>不要忘记，不然会报错</strong>!</p><p>配置完毕你会发现 <code>scss</code> 提供这些全局变量可以在组件样式中使用了！！！</p><h3 id="mock数据" tabindex="-1">mock数据 <a class="header-anchor" href="#mock数据" aria-label="Permalink to &quot;mock数据&quot;">​</a></h3><p>安装依赖:<a href="https://www.npmjs.com/package/vite-plugin-mock" target="_blank" rel="noreferrer">https://www.npmjs.com/package/vite-plugin-mock</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm install -D vite-plugin-mock@2.9.6 mockjs</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm install -D vite-plugin-mock@2.9.6 mockjs</span></span></code></pre></div><p>在 vite.config.js 配置文件启用插件。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { UserConfigExport, ConfigEnv } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vite&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { viteMockServe } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vite-plugin-mock&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> ({ </span><span style="color:#FFAB70;">command</span><span style="color:#E1E4E8;"> })</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">vue</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">viteMockServe</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        localEnabled: command </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;serve&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { UserConfigExport, ConfigEnv } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vite&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { viteMockServe } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vite-plugin-mock&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> ({ </span><span style="color:#E36209;">command</span><span style="color:#24292E;"> })</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    plugins: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">vue</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">viteMockServe</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        localEnabled: command </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;serve&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      }),</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在根目录创建mock文件夹:去创建我们需要mock数据与接口！！！</p><p>在mock文件夹内部创建一个user.ts文件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//用户信息数据</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createUserList</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">            userId: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            avatar:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&#39;https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            username: </span><span style="color:#9ECBFF;">&#39;admin&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            password: </span><span style="color:#9ECBFF;">&#39;111111&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            desc: </span><span style="color:#9ECBFF;">&#39;平台管理员&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            roles: [</span><span style="color:#9ECBFF;">&#39;平台管理员&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            buttons: [</span><span style="color:#9ECBFF;">&#39;cuser.detail&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            routes: [</span><span style="color:#9ECBFF;">&#39;home&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            token: </span><span style="color:#9ECBFF;">&#39;Admin Token&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">            userId: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            avatar:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&#39;https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            username: </span><span style="color:#9ECBFF;">&#39;system&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            password: </span><span style="color:#9ECBFF;">&#39;111111&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            desc: </span><span style="color:#9ECBFF;">&#39;系统管理员&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            roles: [</span><span style="color:#9ECBFF;">&#39;系统管理员&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            buttons: [</span><span style="color:#9ECBFF;">&#39;cuser.detail&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;cuser.user&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            routes: [</span><span style="color:#9ECBFF;">&#39;home&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">            token: </span><span style="color:#9ECBFF;">&#39;System Token&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 用户登录接口</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        url: </span><span style="color:#9ECBFF;">&#39;/api/user/login&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#6A737D;">//请求地址</span></span>
<span class="line"><span style="color:#E1E4E8;">        method: </span><span style="color:#9ECBFF;">&#39;post&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#6A737D;">//请求方式</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">response</span><span style="color:#E1E4E8;">: ({ </span><span style="color:#FFAB70;">body</span><span style="color:#E1E4E8;"> }) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//获取请求体携带过来的用户名与密码</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">username</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">password</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> body;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//调用获取用户信息函数,用于判断是否有此用户</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">checkUser</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createUserList</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">                (</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> item.username </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> username </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> item.password </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> password,</span></span>
<span class="line"><span style="color:#E1E4E8;">            )</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//没有用户返回失败信息</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">checkUser) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { code: </span><span style="color:#79B8FF;">201</span><span style="color:#E1E4E8;">, data: { message: </span><span style="color:#9ECBFF;">&#39;账号或者密码不正确&#39;</span><span style="color:#E1E4E8;"> } }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//如果有返回成功信息</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">token</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> checkUser</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { code: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, data: { token } }</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取用户信息</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        url: </span><span style="color:#9ECBFF;">&#39;/api/user/info&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        method: </span><span style="color:#9ECBFF;">&#39;get&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">response</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">request</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//获取请求头携带token</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">token</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> request.headers.token;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//查看用户信息是否包含有次token用户</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">checkUser</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createUserList</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> item.token </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> token)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//没有返回失败的信息</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">checkUser) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { code: </span><span style="color:#79B8FF;">201</span><span style="color:#E1E4E8;">, data: { message: </span><span style="color:#9ECBFF;">&#39;获取用户信息失败&#39;</span><span style="color:#E1E4E8;"> } }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//如果有返回成功信息</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { code: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, data: {checkUser} }</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//用户信息数据</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createUserList</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">            userId: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            avatar:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&#39;https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            username: </span><span style="color:#032F62;">&#39;admin&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            password: </span><span style="color:#032F62;">&#39;111111&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            desc: </span><span style="color:#032F62;">&#39;平台管理员&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            roles: [</span><span style="color:#032F62;">&#39;平台管理员&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            buttons: [</span><span style="color:#032F62;">&#39;cuser.detail&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            routes: [</span><span style="color:#032F62;">&#39;home&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            token: </span><span style="color:#032F62;">&#39;Admin Token&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">            userId: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            avatar:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&#39;https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            username: </span><span style="color:#032F62;">&#39;system&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            password: </span><span style="color:#032F62;">&#39;111111&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            desc: </span><span style="color:#032F62;">&#39;系统管理员&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            roles: [</span><span style="color:#032F62;">&#39;系统管理员&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            buttons: [</span><span style="color:#032F62;">&#39;cuser.detail&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;cuser.user&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            routes: [</span><span style="color:#032F62;">&#39;home&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">            token: </span><span style="color:#032F62;">&#39;System Token&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 用户登录接口</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        url: </span><span style="color:#032F62;">&#39;/api/user/login&#39;</span><span style="color:#24292E;">,</span><span style="color:#6A737D;">//请求地址</span></span>
<span class="line"><span style="color:#24292E;">        method: </span><span style="color:#032F62;">&#39;post&#39;</span><span style="color:#24292E;">,</span><span style="color:#6A737D;">//请求方式</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">response</span><span style="color:#24292E;">: ({ </span><span style="color:#E36209;">body</span><span style="color:#24292E;"> }) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//获取请求体携带过来的用户名与密码</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">username</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">password</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> body;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//调用获取用户信息函数,用于判断是否有此用户</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">checkUser</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createUserList</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">                (</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> item.username </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> username </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> item.password </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> password,</span></span>
<span class="line"><span style="color:#24292E;">            )</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//没有用户返回失败信息</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">checkUser) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> { code: </span><span style="color:#005CC5;">201</span><span style="color:#24292E;">, data: { message: </span><span style="color:#032F62;">&#39;账号或者密码不正确&#39;</span><span style="color:#24292E;"> } }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//如果有返回成功信息</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">token</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> checkUser</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> { code: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, data: { token } }</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取用户信息</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        url: </span><span style="color:#032F62;">&#39;/api/user/info&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        method: </span><span style="color:#032F62;">&#39;get&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">response</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">request</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//获取请求头携带token</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">token</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> request.headers.token;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//查看用户信息是否包含有次token用户</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">checkUser</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createUserList</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">((</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> item.token </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> token)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//没有返回失败的信息</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">checkUser) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> { code: </span><span style="color:#005CC5;">201</span><span style="color:#24292E;">, data: { message: </span><span style="color:#032F62;">&#39;获取用户信息失败&#39;</span><span style="color:#24292E;"> } }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//如果有返回成功信息</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> { code: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, data: {checkUser} }</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p><strong>安装axios</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm install axios</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm install axios</span></span></code></pre></div><p>最后通过axios测试接口！！！</p><h3 id="axios二次封装" tabindex="-1">axios二次封装 <a class="header-anchor" href="#axios二次封装" aria-label="Permalink to &quot;axios二次封装&quot;">​</a></h3><p>在开发项目的时候避免不了与后端进行交互,因此我们需要使用axios插件实现发送网络请求。在开发项目的时候</p><p>我们经常会把axios进行二次封装。</p><p>目的:</p><ol><li>使用请求拦截器，可以在请求拦截器中处理一些业务(开始进度条、请求头携带公共参数)</li><li>使用响应拦截器，可以在响应拦截器中处理一些业务(进度条结束、简化服务器返回的数据、处理http网络错误)</li></ol><p>在根目录下创建 <code>utils/request.ts</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> axios </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;axios&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ElMessage } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;element-plus&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">//创建axios实例</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> axios.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    baseURL: </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">meta</span><span style="color:#E1E4E8;">.env.</span><span style="color:#79B8FF;">VITE_APP_BASE_API</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    timeout: </span><span style="color:#79B8FF;">5000</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#6A737D;">//请求拦截器</span></span>
<span class="line"><span style="color:#E1E4E8;">request.interceptors.request.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> config;</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#6A737D;">//响应拦截器</span></span>
<span class="line"><span style="color:#E1E4E8;">request.interceptors.response.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">response</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> response.data;</span></span>
<span class="line"><span style="color:#E1E4E8;">}, (</span><span style="color:#FFAB70;">error</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//处理网络错误</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> status </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> error.response.status;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> (status) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">401</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;token过期&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">403</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;无权访问&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">404</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;请求地址错误&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;服务器出现问题&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;无网络&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ElMessage</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&#39;error&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        message: msg</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(error);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> request;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> axios </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;axios&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ElMessage } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;element-plus&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">//创建axios实例</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> axios.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    baseURL: </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">meta</span><span style="color:#24292E;">.env.</span><span style="color:#005CC5;">VITE_APP_BASE_API</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    timeout: </span><span style="color:#005CC5;">5000</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#6A737D;">//请求拦截器</span></span>
<span class="line"><span style="color:#24292E;">request.interceptors.request.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#E36209;">config</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> config;</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#6A737D;">//响应拦截器</span></span>
<span class="line"><span style="color:#24292E;">request.interceptors.response.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">((</span><span style="color:#E36209;">response</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> response.data;</span></span>
<span class="line"><span style="color:#24292E;">}, (</span><span style="color:#E36209;">error</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//处理网络错误</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> status </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> error.response.status;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> (status) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">401</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;token过期&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">403</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;无权访问&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">404</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;请求地址错误&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">500</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;服务器出现问题&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">default</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;无网络&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ElMessage</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&#39;error&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        message: msg</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(error);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> request;</span></span></code></pre></div><h3 id="api接口统一管理" tabindex="-1">API接口统一管理 <a class="header-anchor" href="#api接口统一管理" aria-label="Permalink to &quot;API接口统一管理&quot;">​</a></h3><p>在开发项目的时候,接口可能很多需要统一管理。在src目录下去创建api文件夹去统一管理项目的接口；</p><p>比如:下面方式</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 统一管理用户相关接口</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> http </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/utils/request&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 引入ts类型</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> { loginForm, loginResponseData, userResponseData } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./type&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 通过枚举统一管理接口</span></span>
<span class="line"><span style="color:#F97583;">enum</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">API</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">LOGIN_URL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/user/login&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">USERINFO_URL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/user/info&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 暴露函数</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 登录</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loginAPI</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">data</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loginForm</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> http.</span><span style="color:#B392F0;">post</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">loginResponseData</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">API</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">LOGIN_URL</span><span style="color:#E1E4E8;">, data)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取用户信息</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">userinfoAPI</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">data</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> http.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">userResponseData</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">API</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">USERINFO_URL</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 统一管理用户相关接口</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> http </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/utils/request&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 引入ts类型</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> { loginForm, loginResponseData, userResponseData } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./type&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 通过枚举统一管理接口</span></span>
<span class="line"><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">API</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">LOGIN_URL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/user/login&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">USERINFO_URL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/user/info&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 暴露函数</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 登录</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loginAPI</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">data</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loginForm</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> http.</span><span style="color:#6F42C1;">post</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">loginResponseData</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">API</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">LOGIN_URL</span><span style="color:#24292E;">, data)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取用户信息</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">userinfoAPI</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">data</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> http.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">userResponseData</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">API</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">USERINFO_URL</span><span style="color:#24292E;">)</span></span></code></pre></div><p>定义一个 <code>type.ts</code> 文件定义类型，如下：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 登录接口携带ts参数类型</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loginForm</span><span style="color:#E1E4E8;"> = {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">username</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">password</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 登录接口返回的数据类型</span></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loginDataType</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">token</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loginResponseData</span><span style="color:#E1E4E8;"> = {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">code</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">data</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loginDataType</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 定义服务器返回用户信息相关的数据类型</span></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">userinfoType</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">userId</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">avatar</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">username</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">password</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">desc</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">roles</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">[],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">buttons</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">[],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">routes</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">[],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">token</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">userDataType</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">checkUser</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">userinfoType</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">userResponseData</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">code</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">data</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">userDataType</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 登录接口携带ts参数类型</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loginForm</span><span style="color:#24292E;"> = {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">username</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">password</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 登录接口返回的数据类型</span></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loginDataType</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">token</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loginResponseData</span><span style="color:#24292E;"> = {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">code</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">data</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loginDataType</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 定义服务器返回用户信息相关的数据类型</span></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">userinfoType</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">userId</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">avatar</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">username</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">password</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">desc</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">roles</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">[],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">buttons</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">[],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">routes</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">[],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">token</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">userDataType</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">checkUser</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">userinfoType</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">userResponseData</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">code</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">data</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">userDataType</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="项目的资源地址" tabindex="-1">项目的资源地址 <a class="header-anchor" href="#项目的资源地址" aria-label="Permalink to &quot;项目的资源地址&quot;">​</a></h2><p>服务器域名：<a href="http://sph-api.atguigu.cn" target="_blank" rel="noreferrer">http://sph-api.atguigu.cn</a></p><p>swagger文档:</p><ul><li><a href="http://139.198.104.58:8209/swagger-ui.html" target="_blank" rel="noreferrer">http://139.198.104.58:8209/swagger-ui.html</a></li><li><a href="http://139.198.104.58:8212/swagger-ui.html#/" target="_blank" rel="noreferrer">http://139.198.104.58:8212/swagger-ui.html#/</a></li></ul><p>echarts：国内镜像网站</p><ul><li><a href="https://www.isqqw.com/echarts-doc/zh/option.html#title" target="_blank" rel="noreferrer">https://www.isqqw.com/echarts-doc/zh/option.html#title</a></li><li><a href="http://datav.aliyun.com/portal/school/atlas/area_selector" target="_blank" rel="noreferrer">http://datav.aliyun.com/portal/school/atlas/area_selector</a></li></ul>`,177),o=[e];function t(c,r,i,y,E,u){return n(),a("div",null,o)}const F=s(l,[["render",t]]);export{g as __pageData,F as default};
