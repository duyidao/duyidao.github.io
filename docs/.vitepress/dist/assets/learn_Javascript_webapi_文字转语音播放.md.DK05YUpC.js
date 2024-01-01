import{_ as a,c as e,o,U as t}from"./chunks/framework.pP-Hyzfo.js";const b=JSON.parse('{"title":"文字转语音播放","description":"","frontmatter":{},"headers":[],"relativePath":"learn/Javascript/webapi/文字转语音播放.md","filePath":"learn/Javascript/webapi/文字转语音播放.md","lastUpdated":1704114739000}'),i={name:"learn/Javascript/webapi/文字转语音播放.md"},l=t('<h1 id="文字转语音播放" tabindex="-1">文字转语音播放 <a class="header-anchor" href="#文字转语音播放" aria-label="Permalink to &quot;文字转语音播放&quot;">​</a></h1><p>文字语音播放功能最主要的是转为音频数据给 <code>aduio</code> 标签播放。</p><h2 id="文字转音频数据" tabindex="-1">文字转音频数据 <a class="header-anchor" href="#文字转音频数据" aria-label="Permalink to &quot;文字转音频数据&quot;">​</a></h2><p>主要有两个方法：</p><ul><li>web api 兼容性问题</li><li>第三方库，以讯飞为例</li></ul><p>主要实现步骤为：</p><ol><li>浏览器把文本传给服务器，服务器通过 <code>web socket</code> 调用讯飞相应API</li><li>讯飞返回 <code>bytes</code> 给服务器，服务器转 <code>base64</code> 给浏览器，浏览器赋值给 <code>aduio</code> 的 <code>src</code></li></ol><p>注意：这里不可以直接让浏览器把文本传给讯飞第三方调用，原因有两个：</p><ol><li>会造成跨域问题</li><li>调用第三方接口都需要 APPID、APP_Select、Ouath2，这些放到客户端会有安全隐患</li></ol><h2 id="优化" tabindex="-1">优化 <a class="header-anchor" href="#优化" aria-label="Permalink to &quot;优化&quot;">​</a></h2><p>一段文本内容可能会很长，一次性传过去等待音频转换完毕可能会需要一段时间，如何优化也是重中之重。可以从以下几个方面入手。</p><h3 id="断句" tabindex="-1">断句 <a class="header-anchor" href="#断句" aria-label="Permalink to &quot;断句&quot;">​</a></h3><p>把一个长文本通过标点符号分割，使用栈来接收，如果遇到双引号或者双括号这种还需要去通过上下文去分割句子。</p><h3 id="并发" tabindex="-1">并发 <a class="header-anchor" href="#并发" aria-label="Permalink to &quot;并发&quot;">​</a></h3><p>从栈中三个三个的传过去，等待执行完毕后再传后续三个。而并发的数量也可以自行控制或通过网络速度来控制。</p><h3 id="缓存" tabindex="-1">缓存 <a class="header-anchor" href="#缓存" aria-label="Permalink to &quot;缓存&quot;">​</a></h3><p>有一些相同的文字可以设置缓存减少接口请求消耗，而 <code>localstorage</code> 需要键和值。值为 <code>base64</code> ，键为相应的文字，通过转 md5 来控制文字长度相等。</p>',17),r=[l];function c(d,s,n,h,p,_){return o(),e("div",null,r)}const m=a(i,[["render",c]]);export{b as __pageData,m as default};
