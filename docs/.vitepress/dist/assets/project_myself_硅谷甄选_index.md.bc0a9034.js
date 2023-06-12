import{_ as s,c as n,o as a,d as l}from"./app.08a03e14.js";const u=JSON.parse('{"title":"\u9879\u76EE\u521D\u59CB\u5316","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u9879\u76EE\u521B\u5EFA","slug":"\u9879\u76EE\u521B\u5EFA","link":"#\u9879\u76EE\u521B\u5EFA","children":[]},{"level":2,"title":"\u68C0\u6D4B\u5DE5\u5177","slug":"\u68C0\u6D4B\u5DE5\u5177","link":"#\u68C0\u6D4B\u5DE5\u5177","children":[{"level":3,"title":"eslint\u914D\u7F6E","slug":"eslint\u914D\u7F6E","link":"#eslint\u914D\u7F6E","children":[]},{"level":3,"title":"\u914D\u7F6Eprettier","slug":"\u914D\u7F6Eprettier","link":"#\u914D\u7F6Eprettier","children":[]},{"level":3,"title":"\u914D\u7F6Estylelint","slug":"\u914D\u7F6Estylelint","link":"#\u914D\u7F6Estylelint","children":[]},{"level":3,"title":"\u914D\u7F6Ehusky","slug":"\u914D\u7F6Ehusky","link":"#\u914D\u7F6Ehusky","children":[]},{"level":3,"title":"\u914D\u7F6Ecommitlint","slug":"\u914D\u7F6Ecommitlint","link":"#\u914D\u7F6Ecommitlint","children":[]}]},{"level":2,"title":"\u9879\u76EE\u96C6\u6210","slug":"\u9879\u76EE\u96C6\u6210","link":"#\u9879\u76EE\u96C6\u6210","children":[{"level":3,"title":"\u96C6\u6210element-plus","slug":"\u96C6\u6210element-plus","link":"#\u96C6\u6210element-plus","children":[]},{"level":3,"title":"src\u522B\u540D\u7684\u914D\u7F6E","slug":"src\u522B\u540D\u7684\u914D\u7F6E","link":"#src\u522B\u540D\u7684\u914D\u7F6E","children":[]},{"level":3,"title":"\u73AF\u5883\u53D8\u91CF\u7684\u914D\u7F6E","slug":"\u73AF\u5883\u53D8\u91CF\u7684\u914D\u7F6E","link":"#\u73AF\u5883\u53D8\u91CF\u7684\u914D\u7F6E","children":[]}]}],"relativePath":"project/myself/\u7845\u8C37\u7504\u9009/index.md"}'),p={name:"project/myself/\u7845\u8C37\u7504\u9009/index.md"},e=l(`<h1 id="\u9879\u76EE\u521D\u59CB\u5316" tabindex="-1">\u9879\u76EE\u521D\u59CB\u5316 <a class="header-anchor" href="#\u9879\u76EE\u521D\u59CB\u5316" aria-hidden="true">#</a></h1><h2 id="\u9879\u76EE\u521B\u5EFA" tabindex="-1">\u9879\u76EE\u521B\u5EFA <a class="header-anchor" href="#\u9879\u76EE\u521B\u5EFA" aria-hidden="true">#</a></h2><p>\u672C\u9879\u76EE\u901A\u8FC7 <code>pnpm</code> \u521B\u5EFA\u9879\u76EE\uFF0C\u5982\u679C\u7535\u8111\u6CA1\u6709 <code>pnpm</code> \uFF0C\u9700\u8981\u5148\u5168\u5C40\u4E0B\u8F7D\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npm i -g pnpm</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u9879\u76EE\u521D\u59CB\u5316\u547D\u4EE4:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm create vite</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u521B\u5EFA\u5B8C\u6BD5\u540E\u4F1A\u9700\u8981\u8F93\u5165\u9879\u76EE\u540D\u79F0\u3001\u9879\u76EE\u6846\u67B6\u3001\u9879\u76EE\u8BED\u8A00 <code>typescript</code> \uFF0C\u5B8C\u6BD5\u540E\u5B89\u88C5\u4F9D\u8D56\u5373\u53EF\u8FD0\u884C\u3002</p><h2 id="\u68C0\u6D4B\u5DE5\u5177" tabindex="-1">\u68C0\u6D4B\u5DE5\u5177 <a class="header-anchor" href="#\u68C0\u6D4B\u5DE5\u5177" aria-hidden="true">#</a></h2><h3 id="eslint\u914D\u7F6E" tabindex="-1">eslint\u914D\u7F6E <a class="header-anchor" href="#eslint\u914D\u7F6E" aria-hidden="true">#</a></h3><p><strong>eslint\u4E2D\u6587\u5B98\u7F51:<a href="http://eslint.cn/" target="_blank" rel="noreferrer">http://eslint.cn/</a></strong></p><p>ESLint\u6700\u521D\u662F\u7531<a href="http://nczonline.net/" target="_blank" rel="noreferrer">Nicholas C. Zakas</a> \u4E8E2013\u5E746\u6708\u521B\u5EFA\u7684\u5F00\u6E90\u9879\u76EE\u3002\u5B83\u7684\u76EE\u6807\u662F\u63D0\u4F9B\u4E00\u4E2A\u63D2\u4EF6\u5316\u7684<strong>javascript\u4EE3\u7801\u68C0\u6D4B\u5DE5\u5177</strong></p><p>\u9996\u5148\u5B89\u88C5eslint</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm i eslint -D</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u751F\u6210\u914D\u7F6E\u6587\u4EF6:.eslint.cjs</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npx eslint --init</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>.eslint.cjs\u914D\u7F6E\u6587\u4EF6</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">module.exports = {</span></span>
<span class="line"><span style="color:#A6ACCD;">   //\u8FD0\u884C\u73AF\u5883</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;env&quot;: { </span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;browser&quot;: true,//\u6D4F\u89C8\u5668\u7AEF</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;es2021&quot;: true,//es2021</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    //\u89C4\u5219\u7EE7\u627F</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;extends&quot;: [ </span></span>
<span class="line"><span style="color:#A6ACCD;">       //\u5168\u90E8\u89C4\u5219\u9ED8\u8BA4\u662F\u5173\u95ED\u7684,\u8FD9\u4E2A\u914D\u7F6E\u9879\u5F00\u542F\u63A8\u8350\u89C4\u5219,\u63A8\u8350\u89C4\u5219\u53C2\u7167\u6587\u6863</span></span>
<span class="line"><span style="color:#A6ACCD;">       //\u6BD4\u5982:\u51FD\u6570\u4E0D\u80FD\u91CD\u540D\u3001\u5BF9\u8C61\u4E0D\u80FD\u51FA\u73B0\u91CD\u590Dkey</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;eslint:recommended&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        //vue3\u8BED\u6CD5\u89C4\u5219</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;plugin:vue/vue3-essential&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        //ts\u8BED\u6CD5\u89C4\u5219</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;plugin:@typescript-eslint/recommended&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">    //\u8981\u4E3A\u7279\u5B9A\u7C7B\u578B\u7684\u6587\u4EF6\u6307\u5B9A\u5904\u7406\u5668</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;overrides&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">    //\u6307\u5B9A\u89E3\u6790\u5668:\u89E3\u6790\u5668</span></span>
<span class="line"><span style="color:#A6ACCD;">    //Esprima \u9ED8\u8BA4\u89E3\u6790\u5668</span></span>
<span class="line"><span style="color:#A6ACCD;">    //Babel-ESLint babel\u89E3\u6790\u5668</span></span>
<span class="line"><span style="color:#A6ACCD;">    //@typescript-eslint/parser ts\u89E3\u6790\u5668</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;parser&quot;: &quot;@typescript-eslint/parser&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    //\u6307\u5B9A\u89E3\u6790\u5668\u9009\u9879</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;parserOptions&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;ecmaVersion&quot;: &quot;latest&quot;,//\u6821\u9A8CECMA\u6700\u65B0\u7248\u672C</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;sourceType&quot;: &quot;module&quot;//\u8BBE\u7F6E\u4E3A&quot;script&quot;\uFF08\u9ED8\u8BA4\uFF09\uFF0C\u6216\u8005&quot;module&quot;\u4EE3\u7801\u5728ECMAScript\u6A21\u5757\u4E2D</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    //ESLint\u652F\u6301\u4F7F\u7528\u7B2C\u4E09\u65B9\u63D2\u4EF6\u3002\u5728\u4F7F\u7528\u63D2\u4EF6\u4E4B\u524D\uFF0C\u60A8\u5FC5\u987B\u4F7F\u7528npm\u5B89\u88C5\u5B83</span></span>
<span class="line"><span style="color:#A6ACCD;">    //\u8BE5eslint-plugin-\u524D\u7F00\u53EF\u4EE5\u4ECE\u63D2\u4EF6\u540D\u79F0\u88AB\u7701\u7565</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;plugins&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;vue&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;@typescript-eslint&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">    //eslint\u89C4\u5219</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;rules&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="vue3\u73AF\u5883\u4EE3\u7801\u6821\u9A8C\u63D2\u4EF6" tabindex="-1">vue3\u73AF\u5883\u4EE3\u7801\u6821\u9A8C\u63D2\u4EF6 <a class="header-anchor" href="#vue3\u73AF\u5883\u4EE3\u7801\u6821\u9A8C\u63D2\u4EF6" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"># \u8BA9\u6240\u6709\u4E0Eprettier\u89C4\u5219\u5B58\u5728\u51B2\u7A81\u7684Eslint rules\u5931\u6548\uFF0C\u5E76\u4F7F\u7528prettier\u8FDB\u884C\u4EE3\u7801\u68C0\u67E5</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;eslint-config-prettier&quot;: &quot;^8.6.0&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;eslint-plugin-import&quot;: &quot;^2.27.5&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;eslint-plugin-node&quot;: &quot;^11.1.0&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;"># \u8FD0\u884C\u66F4\u6F02\u4EAE\u7684Eslint\uFF0C\u4F7Fprettier\u89C4\u5219\u4F18\u5148\u7EA7\u66F4\u9AD8\uFF0CEslint\u4F18\u5148\u7EA7\u4F4E</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;eslint-plugin-prettier&quot;: &quot;^4.2.1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;"># vue.js\u7684Eslint\u63D2\u4EF6\uFF08\u67E5\u627Evue\u8BED\u6CD5\u9519\u8BEF\uFF0C\u53D1\u73B0\u9519\u8BEF\u6307\u4EE4\uFF0C\u67E5\u627E\u8FDD\u89C4\u98CE\u683C\u6307\u5357</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;eslint-plugin-vue&quot;: &quot;^9.9.0&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;"># \u8BE5\u89E3\u6790\u5668\u5141\u8BB8\u4F7F\u7528Eslint\u6821\u9A8C\u6240\u6709babel code</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;@babel/eslint-parser&quot;: &quot;^7.19.1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5B89\u88C5\u6307\u4EE4</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="\u4FEE\u6539-eslintrc-cjs\u914D\u7F6E\u6587\u4EF6" tabindex="-1">\u4FEE\u6539.eslintrc.cjs\u914D\u7F6E\u6587\u4EF6 <a class="header-anchor" href="#\u4FEE\u6539-eslintrc-cjs\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">// @see https://eslint.bootcss.com/docs/rules/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">module.exports = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  env: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    browser: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    es2021: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    node: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    jest: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  /* \u6307\u5B9A\u5982\u4F55\u89E3\u6790\u8BED\u6CD5 */</span></span>
<span class="line"><span style="color:#A6ACCD;">  parser: &#39;vue-eslint-parser&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  /** \u4F18\u5148\u7EA7\u4F4E\u4E8E parse \u7684\u8BED\u6CD5\u89E3\u6790\u914D\u7F6E */</span></span>
<span class="line"><span style="color:#A6ACCD;">  parserOptions: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    ecmaVersion: &#39;latest&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    sourceType: &#39;module&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    parser: &#39;@typescript-eslint/parser&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    jsxPragma: &#39;React&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    ecmaFeatures: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      jsx: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  /* \u7EE7\u627F\u5DF2\u6709\u7684\u89C4\u5219 */</span></span>
<span class="line"><span style="color:#A6ACCD;">  extends: [</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;eslint:recommended&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;plugin:vue/vue3-essential&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;plugin:@typescript-eslint/recommended&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;plugin:prettier/recommended&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  ],</span></span>
<span class="line"><span style="color:#A6ACCD;">  plugins: [&#39;vue&#39;, &#39;@typescript-eslint&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">  /*</span></span>
<span class="line"><span style="color:#A6ACCD;">   * &quot;off&quot; \u6216 0    ==&gt;  \u5173\u95ED\u89C4\u5219</span></span>
<span class="line"><span style="color:#A6ACCD;">   * &quot;warn&quot; \u6216 1   ==&gt;  \u6253\u5F00\u7684\u89C4\u5219\u4F5C\u4E3A\u8B66\u544A\uFF08\u4E0D\u5F71\u54CD\u4EE3\u7801\u6267\u884C\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">   * &quot;error&quot; \u6216 2  ==&gt;  \u89C4\u5219\u4F5C\u4E3A\u4E00\u4E2A\u9519\u8BEF\uFF08\u4EE3\u7801\u4E0D\u80FD\u6267\u884C\uFF0C\u754C\u9762\u62A5\u9519\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  rules: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // eslint\uFF08https://eslint.bootcss.com/docs/rules/\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;no-var&#39;: &#39;error&#39;, // \u8981\u6C42\u4F7F\u7528 let \u6216 const \u800C\u4E0D\u662F var</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;no-multiple-empty-lines&#39;: [&#39;warn&#39;, { max: 1 }], // \u4E0D\u5141\u8BB8\u591A\u4E2A\u7A7A\u884C</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;no-console&#39;: p<wbr>rocess.env.NODE_ENV === &#39;production&#39; ? &#39;error&#39; : &#39;off&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;no-debugger&#39;: p<wbr>rocess.env.NODE_ENV === &#39;production&#39; ? &#39;error&#39; : &#39;off&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;no-unexpected-multiline&#39;: &#39;error&#39;, // \u7981\u6B62\u7A7A\u4F59\u7684\u591A\u884C</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;no-useless-escape&#39;: &#39;off&#39;, // \u7981\u6B62\u4E0D\u5FC5\u8981\u7684\u8F6C\u4E49\u5B57\u7B26</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // typeScript (https://typescript-eslint.io/rules)</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;@typescript-eslint/no-unused-vars&#39;: &#39;error&#39;, // \u7981\u6B62\u5B9A\u4E49\u672A\u4F7F\u7528\u7684\u53D8\u91CF</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;@typescript-eslint/prefer-ts-expect-error&#39;: &#39;error&#39;, // \u7981\u6B62\u4F7F\u7528 @ts-ignore</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;@typescript-eslint/no-explicit-any&#39;: &#39;off&#39;, // \u7981\u6B62\u4F7F\u7528 any \u7C7B\u578B</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;@typescript-eslint/no-non-null-assertion&#39;: &#39;off&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;@typescript-eslint/no-namespace&#39;: &#39;off&#39;, // \u7981\u6B62\u4F7F\u7528\u81EA\u5B9A\u4E49 TypeScript \u6A21\u5757\u548C\u547D\u540D\u7A7A\u95F4\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;@typescript-eslint/semi&#39;: &#39;off&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;vue/multi-word-component-names&#39;: &#39;off&#39;, // \u8981\u6C42\u7EC4\u4EF6\u540D\u79F0\u59CB\u7EC8\u4E3A \u201C-\u201D \u94FE\u63A5\u7684\u5355\u8BCD</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;vue/script-setup-uses-vars&#39;: &#39;error&#39;, // \u9632\u6B62&lt;script setup&gt;\u4F7F\u7528\u7684\u53D8\u91CF&lt;template&gt;\u88AB\u6807\u8BB0\u4E3A\u672A\u4F7F\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;vue/no-mutating-props&#39;: &#39;off&#39;, // \u4E0D\u5141\u8BB8\u7EC4\u4EF6 prop\u7684\u6539\u53D8</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;vue/attribute-hyphenation&#39;: &#39;off&#39;, // \u5BF9\u6A21\u677F\u4E2D\u7684\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u5F3A\u5236\u6267\u884C\u5C5E\u6027\u547D\u540D\u6837\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="eslintignore\u5FFD\u7565\u6587\u4EF6" tabindex="-1">.eslintignore\u5FFD\u7565\u6587\u4EF6 <a class="header-anchor" href="#eslintignore\u5FFD\u7565\u6587\u4EF6" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">dist</span></span>
<span class="line"><span style="color:#A6ACCD;">node_modules</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="\u8FD0\u884C\u811A\u672C" tabindex="-1">\u8FD0\u884C\u811A\u672C <a class="header-anchor" href="#\u8FD0\u884C\u811A\u672C" aria-hidden="true">#</a></h4><p>package.json\u65B0\u589E\u4E24\u4E2A\u8FD0\u884C\u811A\u672C</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;lint&quot;: &quot;eslint src&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;fix&quot;: &quot;eslint src --fix&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="\u914D\u7F6Eprettier" tabindex="-1">\u914D\u7F6E<strong>prettier</strong> <a class="header-anchor" href="#\u914D\u7F6Eprettier" aria-hidden="true">#</a></h3><p>\u6709\u4E86eslint\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u8981\u6709prettier\uFF1Feslint\u9488\u5BF9\u7684\u662Fjavascript\uFF0C\u4ED6\u662F\u4E00\u4E2A\u68C0\u6D4B\u5DE5\u5177\uFF0C\u5305\u542Bjs\u8BED\u6CD5\u4EE5\u53CA\u5C11\u90E8\u5206\u683C\u5F0F\u95EE\u9898\uFF0C\u5728eslint\u770B\u6765\uFF0C\u8BED\u6CD5\u5BF9\u4E86\u5C31\u80FD\u4FDD\u8BC1\u4EE3\u7801\u6B63\u5E38\u8FD0\u884C\uFF0C\u683C\u5F0F\u95EE\u9898\u5C5E\u4E8E\u5176\u6B21\uFF1B</p><p>\u800Cprettier\u5C5E\u4E8E\u683C\u5F0F\u5316\u5DE5\u5177\uFF0C\u5B83\u770B\u4E0D\u60EF\u683C\u5F0F\u4E0D\u7EDF\u4E00\uFF0C\u6240\u4EE5\u5B83\u5C31\u628Aeslint\u6CA1\u5E72\u597D\u7684\u4E8B\u63A5\u7740\u5E72\uFF0C\u53E6\u5916\uFF0Cprettier\u652F\u6301</p><p>\u5305\u542Bjs\u5728\u5185\u7684\u591A\u79CD\u8BED\u8A00\u3002</p><p>\u603B\u7ED3\u8D77\u6765\uFF0C<strong>eslint\u548Cprettier\u8FD9\u4FE9\u5144\u5F1F\u4E00\u4E2A\u4FDD\u8BC1js\u4EE3\u7801\u8D28\u91CF\uFF0C\u4E00\u4E2A\u4FDD\u8BC1\u4EE3\u7801\u7F8E\u89C2\u3002</strong></p><h4 id="\u5B89\u88C5\u4F9D\u8D56\u5305" tabindex="-1">\u5B89\u88C5\u4F9D\u8D56\u5305 <a class="header-anchor" href="#\u5B89\u88C5\u4F9D\u8D56\u5305" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="prettierrc-json\u6DFB\u52A0\u89C4\u5219" tabindex="-1">.prettierrc.json\u6DFB\u52A0\u89C4\u5219 <a class="header-anchor" href="#prettierrc-json\u6DFB\u52A0\u89C4\u5219" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;singleQuote&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;semi&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;bracketSpacing&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;htmlWhitespaceSensitivity&quot;: &quot;ignore&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;endOfLine&quot;: &quot;auto&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;trailingComma&quot;: &quot;all&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;tabWidth&quot;: 2</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="prettierignore\u5FFD\u7565\u6587\u4EF6" tabindex="-1">.prettierignore\u5FFD\u7565\u6587\u4EF6 <a class="header-anchor" href="#prettierignore\u5FFD\u7565\u6587\u4EF6" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">/dist/*</span></span>
<span class="line"><span style="color:#A6ACCD;">/html/*</span></span>
<span class="line"><span style="color:#A6ACCD;">.local</span></span>
<span class="line"><span style="color:#A6ACCD;">/node_modules/**</span></span>
<span class="line"><span style="color:#A6ACCD;">**/*.svg</span></span>
<span class="line"><span style="color:#A6ACCD;">**/*.sh</span></span>
<span class="line"><span style="color:#A6ACCD;">/public/*</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u901A\u8FC7pnpm run lint\u53BB\u68C0\u6D4B\u8BED\u6CD5\uFF0C\u5982\u679C\u51FA\u73B0\u4E0D\u89C4\u8303\u683C\u5F0F,\u901A\u8FC7pnpm run fix \u4FEE\u6539</strong></p><h3 id="\u914D\u7F6Estylelint" tabindex="-1">\u914D\u7F6Estylelint <a class="header-anchor" href="#\u914D\u7F6Estylelint" aria-hidden="true">#</a></h3><p><a href="https://stylelint.io/" target="_blank" rel="noreferrer">stylelint</a>\u4E3Acss\u7684lint\u5DE5\u5177\u3002\u53EF\u683C\u5F0F\u5316css\u4EE3\u7801\uFF0C\u68C0\u67E5css\u8BED\u6CD5\u9519\u8BEF\u4E0E\u4E0D\u5408\u7406\u7684\u5199\u6CD5\uFF0C\u6307\u5B9Acss\u4E66\u5199\u987A\u5E8F\u7B49\u3002</p><p>\u6211\u4EEC\u7684\u9879\u76EE\u4E2D\u4F7F\u7528scss\u4F5C\u4E3A\u9884\u5904\u7406\u5668\uFF0C\u5B89\u88C5\u4EE5\u4E0B\u4F9D\u8D56\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="stylelintrc-cjs\u914D\u7F6E\u6587\u4EF6" tabindex="-1">.stylelintrc.cjs\u914D\u7F6E\u6587\u4EF6 <a class="header-anchor" href="#stylelintrc-cjs\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a></h4><p><strong>\u5B98\u7F51:<a href="https://stylelint.bootcss.com/" target="_blank" rel="noreferrer">https://stylelint.bootcss.com/</a></strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">// @see https://stylelint.bootcss.com/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">module.exports = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  extends: [</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;stylelint-config-standard&#39;, // \u914D\u7F6Estylelint\u62D3\u5C55\u63D2\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;stylelint-config-html/vue&#39;, // \u914D\u7F6E vue \u4E2D template \u6837\u5F0F\u683C\u5F0F\u5316</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;stylelint-config-standard-scss&#39;, // \u914D\u7F6Estylelint scss\u63D2\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;stylelint-config-recommended-vue/scss&#39;, // \u914D\u7F6E vue \u4E2D scss \u6837\u5F0F\u683C\u5F0F\u5316</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;stylelint-config-recess-order&#39;, // \u914D\u7F6Estylelint css\u5C5E\u6027\u4E66\u5199\u987A\u5E8F\u63D2\u4EF6,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;stylelint-config-prettier&#39;, // \u914D\u7F6Estylelint\u548Cprettier\u517C\u5BB9</span></span>
<span class="line"><span style="color:#A6ACCD;">  ],</span></span>
<span class="line"><span style="color:#A6ACCD;">  overrides: [</span></span>
<span class="line"><span style="color:#A6ACCD;">    {</span></span>
<span class="line"><span style="color:#A6ACCD;">      files: [&#39;**/*.(scss|css|vue|html)&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">      customSyntax: &#39;postcss-scss&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    {</span></span>
<span class="line"><span style="color:#A6ACCD;">      files: [&#39;**/*.(html|vue)&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">      customSyntax: &#39;postcss-html&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">  ],</span></span>
<span class="line"><span style="color:#A6ACCD;">  ignoreFiles: [</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;**/*.js&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;**/*.jsx&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;**/*.tsx&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;**/*.ts&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;**/*.json&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;**/*.md&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;**/*.yaml&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  ],</span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * null  =&gt; \u5173\u95ED\u8BE5\u89C4\u5219</span></span>
<span class="line"><span style="color:#A6ACCD;">   * always =&gt; \u5FC5\u987B</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  rules: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;value-keyword-case&#39;: null, // \u5728 css \u4E2D\u4F7F\u7528 v-bind\uFF0C\u4E0D\u62A5\u9519</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;no-descending-specificity&#39;: null, // \u7981\u6B62\u5728\u5177\u6709\u8F83\u9AD8\u4F18\u5148\u7EA7\u7684\u9009\u62E9\u5668\u540E\u51FA\u73B0\u88AB\u5176\u8986\u76D6\u7684\u8F83\u4F4E\u4F18\u5148\u7EA7\u7684\u9009\u62E9\u5668</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;function-url-quotes&#39;: &#39;always&#39;, // \u8981\u6C42\u6216\u7981\u6B62 URL \u7684\u5F15\u53F7 &quot;always(\u5FC5\u987B\u52A0\u4E0A\u5F15\u53F7)&quot;|&quot;never(\u6CA1\u6709\u5F15\u53F7)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;no-empty-source&#39;: null, // \u5173\u95ED\u7981\u6B62\u7A7A\u6E90\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;selector-class-pattern&#39;: null, // \u5173\u95ED\u5F3A\u5236\u9009\u62E9\u5668\u7C7B\u540D\u7684\u683C\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;property-no-unknown&#39;: null, // \u7981\u6B62\u672A\u77E5\u7684\u5C5E\u6027(true \u4E3A\u4E0D\u5141\u8BB8)</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;block-opening-brace-space-before&#39;: &#39;always&#39;, //\u5927\u62EC\u53F7\u4E4B\u524D\u5FC5\u987B\u6709\u4E00\u4E2A\u7A7A\u683C\u6216\u4E0D\u80FD\u6709\u7A7A\u767D\u7B26</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;value-no-vendor-prefix&#39;: null, // \u5173\u95ED \u5C5E\u6027\u503C\u524D\u7F00 --webkit-box</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;property-no-vendor-prefix&#39;: null, // \u5173\u95ED \u5C5E\u6027\u524D\u7F00 -webkit-mask</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;selector-pseudo-class-no-unknown&#39;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">      // \u4E0D\u5141\u8BB8\u672A\u77E5\u7684\u9009\u62E9\u5668</span></span>
<span class="line"><span style="color:#A6ACCD;">      true,</span></span>
<span class="line"><span style="color:#A6ACCD;">      {</span></span>
<span class="line"><span style="color:#A6ACCD;">        ignorePseudoClasses: [&#39;global&#39;, &#39;v-deep&#39;, &#39;deep&#39;], // \u5FFD\u7565\u5C5E\u6027\uFF0C\u4FEE\u6539element\u9ED8\u8BA4\u6837\u5F0F\u7684\u65F6\u5019\u80FD\u4F7F\u7528\u5230</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="stylelintignore\u5FFD\u7565\u6587\u4EF6" tabindex="-1">.stylelintignore\u5FFD\u7565\u6587\u4EF6 <a class="header-anchor" href="#stylelintignore\u5FFD\u7565\u6587\u4EF6" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">/node_modules/*</span></span>
<span class="line"><span style="color:#A6ACCD;">/dist/*</span></span>
<span class="line"><span style="color:#A6ACCD;">/html/*</span></span>
<span class="line"><span style="color:#A6ACCD;">/public/*</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="\u8FD0\u884C\u811A\u672C-1" tabindex="-1">\u8FD0\u884C\u811A\u672C <a class="header-anchor" href="#\u8FD0\u884C\u811A\u672C-1" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">	&quot;lint:style&quot;: &quot;stylelint src/**/*.{css,scss,vue} --cache --fix&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u6700\u540E\u914D\u7F6E\u7EDF\u4E00\u7684prettier\u6765\u683C\u5F0F\u5316\u6211\u4EEC\u7684js\u548Ccss\uFF0Chtml\u4EE3\u7801</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"> &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;dev&quot;: &quot;vite --open&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;build&quot;: &quot;vue-tsc &amp;&amp; vite build&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;preview&quot;: &quot;vite preview&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;lint&quot;: &quot;eslint src&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;fix&quot;: &quot;eslint src --fix&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;format&quot;: &quot;prettier --write \\&quot;./**/*.{html,vue,ts,js,json,md}\\&quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;lint:eslint&quot;: &quot;eslint src/**/*.{ts,vue} --cache --fix&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;lint:style&quot;: &quot;stylelint src/**/*.{css,scss,vue} --cache --fix&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u5F53\u6211\u4EEC\u8FD0\u884C<code>pnpm run format</code>\u7684\u65F6\u5019\uFF0C\u4F1A\u628A\u4EE3\u7801\u76F4\u63A5\u683C\u5F0F\u5316</strong></p><h3 id="\u914D\u7F6Ehusky" tabindex="-1">\u914D\u7F6Ehusky <a class="header-anchor" href="#\u914D\u7F6Ehusky" aria-hidden="true">#</a></h3><p>\u5728\u4E0A\u9762\u6211\u4EEC\u5DF2\u7ECF\u96C6\u6210\u597D\u4E86\u6211\u4EEC\u4EE3\u7801\u6821\u9A8C\u5DE5\u5177\uFF0C\u4F46\u662F\u9700\u8981\u6BCF\u6B21\u624B\u52A8\u7684\u53BB\u6267\u884C\u547D\u4EE4\u624D\u4F1A\u683C\u5F0F\u5316\u6211\u4EEC\u7684\u4EE3\u7801\u3002\u5982\u679C\u6709\u4EBA\u6CA1\u6709\u683C\u5F0F\u5316\u5C31\u63D0\u4EA4\u4E86\u8FDC\u7A0B\u4ED3\u5E93\u4E2D\uFF0C\u90A3\u8FD9\u4E2A\u89C4\u8303\u5C31\u6CA1\u4EC0\u4E48\u7528\u3002\u6240\u4EE5\u6211\u4EEC\u9700\u8981\u5F3A\u5236\u8BA9\u5F00\u53D1\u4EBA\u5458\u6309\u7167\u4EE3\u7801\u89C4\u8303\u6765\u63D0\u4EA4\u3002</p><p>\u8981\u505A\u5230\u8FD9\u4EF6\u4E8B\u60C5\uFF0C\u5C31\u9700\u8981\u5229\u7528husky\u5728\u4EE3\u7801\u63D0\u4EA4\u4E4B\u524D\u89E6\u53D1git hook(git\u5728\u5BA2\u6237\u7AEF\u7684\u94A9\u5B50)\uFF0C\u7136\u540E\u6267\u884C<code>pnpm run format</code>\u6765\u81EA\u52A8\u7684\u683C\u5F0F\u5316\u6211\u4EEC\u7684\u4EE3\u7801\u3002</p><p>\u5B89\u88C5<code>husky</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm install -D husky</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u6267\u884C</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npx husky-init</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u4F1A\u5728\u6839\u76EE\u5F55\u4E0B\u751F\u6210\u4E2A\u4E00\u4E2A.husky\u76EE\u5F55\uFF0C\u5728\u8FD9\u4E2A\u76EE\u5F55\u4E0B\u9762\u4F1A\u6709\u4E00\u4E2Apre-commit\u6587\u4EF6\uFF0C\u8FD9\u4E2A\u6587\u4EF6\u91CC\u9762\u7684\u547D\u4EE4\u5728\u6211\u4EEC\u6267\u884Ccommit\u7684\u65F6\u5019\u5C31\u4F1A\u6267\u884C</p><p>\u5728<code>.husky/pre-commit</code>\u6587\u4EF6\u6DFB\u52A0\u5982\u4E0B\u547D\u4EE4\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#A6ACCD;">. &quot;$(dirname -- &quot;$0&quot;)/_/husky.sh&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">pnpm run format</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5F53\u6211\u4EEC\u5BF9\u4EE3\u7801\u8FDB\u884Ccommit\u64CD\u4F5C\u7684\u65F6\u5019\uFF0C\u5C31\u4F1A\u6267\u884C\u547D\u4EE4\uFF0C\u5BF9\u4EE3\u7801\u8FDB\u884C\u683C\u5F0F\u5316\uFF0C\u7136\u540E\u518D\u63D0\u4EA4\u3002</p><h3 id="\u914D\u7F6Ecommitlint" tabindex="-1">\u914D\u7F6Ecommitlint <a class="header-anchor" href="#\u914D\u7F6Ecommitlint" aria-hidden="true">#</a></h3><p>\u5BF9\u4E8E\u6211\u4EEC\u7684commit\u4FE1\u606F\uFF0C\u4E5F\u662F\u6709\u7EDF\u4E00\u89C4\u8303\u7684\uFF0C\u4E0D\u80FD\u968F\u4FBF\u5199,\u8981\u8BA9\u6BCF\u4E2A\u4EBA\u90FD\u6309\u7167\u7EDF\u4E00\u7684\u6807\u51C6\u6765\u6267\u884C\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5229\u7528<strong>commitlint</strong>\u6765\u5B9E\u73B0\u3002</p><p>\u5B89\u88C5\u5305</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm add @commitlint/config-conventional @commitlint/cli -D</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u6DFB\u52A0\u914D\u7F6E\u6587\u4EF6\uFF0C\u65B0\u5EFA<code>commitlint.config.cjs</code>(\u6CE8\u610F\u662Fcjs)\uFF0C\u7136\u540E\u6DFB\u52A0\u4E0B\u9762\u7684\u4EE3\u7801\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">module.exports = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  extends: [&#39;@commitlint/config-conventional&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u6821\u9A8C\u89C4\u5219</span></span>
<span class="line"><span style="color:#A6ACCD;">  rules: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;type-enum&#39;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">      2,</span></span>
<span class="line"><span style="color:#A6ACCD;">      &#39;always&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      [</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;feat&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;fix&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;docs&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;style&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;refactor&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;perf&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;test&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;chore&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;revert&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;build&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      ],</span></span>
<span class="line"><span style="color:#A6ACCD;">    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;type-case&#39;: [0],</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;type-empty&#39;: [0],</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;scope-empty&#39;: [0],</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;scope-case&#39;: [0],</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;subject-full-stop&#39;: [0, &#39;never&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;subject-case&#39;: [0, &#39;never&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">    &#39;header-max-length&#39;: [0, &#39;always&#39;, 72],</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5728<code>package.json</code>\u4E2D\u914D\u7F6Escripts\u547D\u4EE4</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"># \u5728scrips\u4E2D\u6DFB\u52A0\u4E0B\u9762\u7684\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;commitlint&quot;: &quot;commitlint --config commitlint.config.cjs -e -V&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u914D\u7F6E\u7ED3\u675F\uFF0C\u73B0\u5728\u5F53\u6211\u4EEC\u586B\u5199<code>commit</code>\u4FE1\u606F\u7684\u65F6\u5019\uFF0C\u524D\u9762\u5C31\u9700\u8981\u5E26\u7740\u4E0B\u9762\u7684<code>subject</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&#39;feat&#39;,//\u65B0\u7279\u6027\u3001\u65B0\u529F\u80FD</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;fix&#39;,//\u4FEE\u6539bug</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;docs&#39;,//\u6587\u6863\u4FEE\u6539</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;style&#39;,//\u4EE3\u7801\u683C\u5F0F\u4FEE\u6539, \u6CE8\u610F\u4E0D\u662F css \u4FEE\u6539</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;refactor&#39;,//\u4EE3\u7801\u91CD\u6784</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;perf&#39;,//\u4F18\u5316\u76F8\u5173\uFF0C\u6BD4\u5982\u63D0\u5347\u6027\u80FD\u3001\u4F53\u9A8C</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;test&#39;,//\u6D4B\u8BD5\u7528\u4F8B\u4FEE\u6539</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;chore&#39;,//\u5176\u4ED6\u4FEE\u6539, \u6BD4\u5982\u6539\u53D8\u6784\u5EFA\u6D41\u7A0B\u3001\u6216\u8005\u589E\u52A0\u4F9D\u8D56\u5E93\u3001\u5DE5\u5177\u7B49</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;revert&#39;,//\u56DE\u6EDA\u5230\u4E0A\u4E00\u4E2A\u7248\u672C</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;build&#39;,//\u7F16\u8BD1\u76F8\u5173\u7684\u4FEE\u6539\uFF0C\u4F8B\u5982\u53D1\u5E03\u7248\u672C\u3001\u5BF9\u9879\u76EE\u6784\u5EFA\u6216\u8005\u4F9D\u8D56\u7684\u6539\u52A8</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u914D\u7F6Ehusky</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npx husky add .husky/commit-msg </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5728\u751F\u6210\u7684commit-msg\u6587\u4EF6\u4E2D\u6DFB\u52A0\u4E0B\u9762\u7684\u547D\u4EE4</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#A6ACCD;">. &quot;$(dirname -- &quot;$0&quot;)/_/husky.sh&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">pnpm commitlint</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5F53\u6211\u4EEC commit \u63D0\u4EA4\u4FE1\u606F\u65F6\uFF0C\u5C31\u4E0D\u80FD\u518D\u968F\u610F\u5199\u4E86\uFF0C\u5FC5\u987B\u662F git commit -m &#39;fix: xxx&#39; \u7B26\u5408\u7C7B\u578B\u7684\u624D\u53EF\u4EE5\uFF0C<strong>\u9700\u8981\u6CE8\u610F\u7684\u662F\u7C7B\u578B\u7684\u540E\u9762\u9700\u8981\u7528\u82F1\u6587\u7684 :\uFF0C\u5E76\u4E14\u5192\u53F7\u540E\u9762\u662F\u9700\u8981\u7A7A\u4E00\u683C\u7684\uFF0C\u8FD9\u4E2A\u662F\u4E0D\u80FD\u7701\u7565\u7684</strong></p><h2 id="\u9879\u76EE\u96C6\u6210" tabindex="-1">\u9879\u76EE\u96C6\u6210 <a class="header-anchor" href="#\u9879\u76EE\u96C6\u6210" aria-hidden="true">#</a></h2><h3 id="\u96C6\u6210element-plus" tabindex="-1">\u96C6\u6210element-plus <a class="header-anchor" href="#\u96C6\u6210element-plus" aria-hidden="true">#</a></h3><p>\u5B98\u7F51\u5730\u5740:<a href="https://element-plus.gitee.io/zh-CN/" target="_blank" rel="noreferrer">https://element-plus.gitee.io/zh-CN/</a></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm install element-plus @element-plus/icons-vue</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u5165\u53E3\u6587\u4EF6main.ts\u5168\u5C40\u5B89\u88C5element-plus,element-plus\u9ED8\u8BA4\u652F\u6301\u8BED\u8A00\u82F1\u8BED\u8BBE\u7F6E\u4E3A\u4E2D\u6587</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> ElementPlus </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">element-plus</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">element-plus/dist/index.css</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#676E95;">//@ts-ignore \u5FFD\u7565\u5F53\u524D\u6587\u4EF6ts\u7C7B\u578B\u7684\u68C0\u6D4B\u5426\u5219\u6709\u7EA2\u8272\u63D0\u793A(\u6253\u5305\u4F1A\u5931\u8D25)</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> zhCn </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">element-plus/dist/locale/zh-cn.mjs</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(ElementPlus</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">locale</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> zhCn</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p><strong>\u56FE\u6807\u5F15\u5165</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm install @element-plus/icons-vue</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5168\u5C40\u6CE8\u518C\u7EC4\u4EF6\u540E\uFF0C\u73B0\u5728\u80FD\u591F\u76F4\u63A5\u5728\u9879\u76EE\u91CC\u4F7F\u7528\u3002</p><p><strong>Element Plus\u5168\u5C40\u7EC4\u4EF6\u7C7B\u578B\u58F0\u660E</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">// tsconfig.json</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;types&quot;: [&quot;element-plus/global&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u914D\u7F6E\u5B8C\u6BD5\u53EF\u4EE5\u6D4B\u8BD5element-plus\u7EC4\u4EF6\u4E0E\u56FE\u6807\u7684\u4F7F\u7528.</p><h3 id="src\u522B\u540D\u7684\u914D\u7F6E" tabindex="-1">src\u522B\u540D\u7684\u914D\u7F6E <a class="header-anchor" href="#src\u522B\u540D\u7684\u914D\u7F6E" aria-hidden="true">#</a></h3><p>\u5728\u5F00\u53D1\u9879\u76EE\u7684\u65F6\u5019\u6587\u4EF6\u4E0E\u6587\u4EF6\u5173\u7CFB\u53EF\u80FD\u5F88\u590D\u6742\uFF0C\u56E0\u6B64\u6211\u4EEC\u9700\u8981\u7ED9src\u6587\u4EF6\u5939\u914D\u7F6E\u4E00\u4E2A\u522B\u540D\uFF01\uFF01\uFF01</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// vite.config.ts</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">defineConfig</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vite</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> vue </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@vitejs/plugin-vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> path </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">path</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#82AAFF;">vue</span><span style="color:#A6ACCD;">()]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">resolve</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">alias</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">@</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./src</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u76F8\u5BF9\u8DEF\u5F84\u522B\u540D\u914D\u7F6E\uFF0C\u4F7F\u7528 @ \u4EE3\u66FF src</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">@api</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./src/api</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">@comp</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./src/components</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">@v</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./src/views</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p><strong>TypeScript \u7F16\u8BD1\u914D\u7F6E</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// tsconfig.json</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">compilerOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">baseUrl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// \u89E3\u6790\u975E\u76F8\u5BF9\u6A21\u5757\u7684\u57FA\u5730\u5740\uFF0C\u9ED8\u8BA4\u662F\u5F53\u524D\u76EE\u5F55</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">paths</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#676E95;">//\u8DEF\u5F84\u6620\u5C04\uFF0C\u76F8\u5BF9\u4E8EbaseUrl</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">@/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">@/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">@api/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src/api/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">@comp/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src/components/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">@v/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src/views/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="\u73AF\u5883\u53D8\u91CF\u7684\u914D\u7F6E" tabindex="-1">\u73AF\u5883\u53D8\u91CF\u7684\u914D\u7F6E <a class="header-anchor" href="#\u73AF\u5883\u53D8\u91CF\u7684\u914D\u7F6E" aria-hidden="true">#</a></h3>`,98),o=[e];function t(c,r,i,C,A,y){return a(),n("div",null,o)}const d=s(p,[["render",t]]);export{u as __pageData,d as default};
