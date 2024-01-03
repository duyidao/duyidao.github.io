import{_ as t,c as i,o as n,U as e}from"./chunks/framework.pP-Hyzfo.js";const h=JSON.parse('{"title":"抓虫记录","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"B","7":"U","8":"G"},"headers":[],"relativePath":"project/baidu/bug.md","filePath":"project/baidu/bug.md","lastUpdated":1704267004000}'),a={name:"project/baidu/bug.md"},o=e('<h1 id="抓虫记录" tabindex="-1">抓虫记录 <a class="header-anchor" href="#抓虫记录" aria-label="Permalink to &quot;抓虫记录&quot;">​</a></h1><h2 id="与json有关" tabindex="-1">与JSON有关 <a class="header-anchor" href="#与json有关" aria-label="Permalink to &quot;与JSON有关&quot;">​</a></h2><h3 id="uncaught-in-promise-syntaxerror-unterminated-string-in-json-at-position-204800-line-1-column-204801" tabindex="-1">Uncaught (in promise) SyntaxError: Unterminated string in JSON at position 204800 (line 1 column 204801) <a class="header-anchor" href="#uncaught-in-promise-syntaxerror-unterminated-string-in-json-at-position-204800-line-1-column-204801" aria-label="Permalink to &quot;Uncaught (in promise) SyntaxError: Unterminated string in JSON at position 204800 (line 1 column 204801)&quot;">​</a></h3><ul><li><p>报错原因：</p><p>这个错误通常表示在解析 JSON 数据时出现了语法错误。在你的情况下，JSON 字符串中存在一个未结束的字符串，在第 1 行第 204801 列（或者附近的位置）。</p><p>在解决这个问题之前，你需要确定你正在处理的是 JSON 格式的数据。如果是，请检查 JSON 字符串是否正确格式化并且所有双引号都有成对出现。</p><p>可以通过以下步骤来查看 JSON 字符串中的错误：</p><ol><li>打开浏览器的开发者工具，并切换到“控制台”选项卡。</li><li>复制出现错误的 JSON 字符串。</li><li>在控制台中输入 <code>JSON.parse(yourJsonString)</code>，其中 <code>yourJsonString</code> 是你复制的 JSON 字符串。</li><li>如果存在语法错误，你将会看到类似于 &quot;Uncaught SyntaxError: Unterminated string in JSON at position 123&quot; 的错误信息，其中 <code>123</code> 表示 JSON 字符串中的错误位置。</li></ol><p>根据错误信息所提供的位置，检查 JSON 字符串中的该位置，并确保所有字符串都被正确地结束。</p><p>注意：如果 JSON 数据太大，可能需要分段检查。</p></li><li><p>排查复现：后端返回的数据是数组转 JSON 格式</p></li><li><p>最终解决：等待后端返回正确的格式数据</p></li></ul>',4),r=[o];function s(l,c,p,d,u,S){return n(),i("div",null,r)}const m=t(a,[["render",s]]);export{h as __pageData,m as default};
