import{_ as e,c as a,o,a2 as d}from"./chunks/framework.BdMTL_bU.js";const b=JSON.parse('{"title":"性能优化","description":"","frontmatter":{},"headers":[],"relativePath":"learn/study/knowledge/优化相关/性能优化.md","filePath":"learn/study/knowledge/优化相关/性能优化.md","lastUpdated":null}'),c={name:"learn/study/knowledge/优化相关/性能优化.md"},l=d('<h1 id="性能优化" tabindex="-1">性能优化 <a class="header-anchor" href="#性能优化" aria-label="Permalink to &quot;性能优化&quot;">​</a></h1><p>性能方面着重考虑两点：首屏速度和操作速度。首屏速度顾名思义，就是刚进页面获取资源渲染页面的速度；操作速度是用户在点击、输入等操作后需要等待的时间。</p><p>下面依次细说。</p><h2 id="首屏速度-白屏时间等" tabindex="-1">首屏速度，白屏时间等 <a class="header-anchor" href="#首屏速度-白屏时间等" aria-label="Permalink to &quot;首屏速度，白屏时间等&quot;">​</a></h2><p>先来分析一下首屏速度的组成：</p><p><img src="https://pic.imgdb.cn/item/66271db80ea9cb14030c2af7.png" alt="首屏速度组成"></p><p>从图不难看出，在浏览器打开页面，需要先从服务器获取资源，获取完资源后才能执行 <code>js</code> 文件，这部分时间就是白屏时间；执行完 <code>js</code> 文件后请求数据，渲染 DOM 元素，这部分是渲染时间。</p><p>在白屏时间中执行 <code>js</code> 文件的速度一般情况下是很快的，除非项目用到了大的算法。因此大多数项目白屏时间主要在从服务器请求资源的这段时间。如果是 Vue 或 React 项目，它们的 <code>index.html</code> 内是没有东西的，请求到资源后还需要执行，这又消耗了一定的时间。</p><p>执行完 <code>js</code> 文件后浏览器开始渲染页面，发 <code>axios</code> 请求获取数据渲染真实 DOM，最后页面呈现数据。</p><p>针对上述描述，关于首屏速度优化可以做的操作从收益划分可以划分两类：</p><ul><li><p>收益较大的操作：</p><p>减少首屏资源提及（打包工具压缩、异步加载、减少体积、去除大的 <code>base64</code> 标识）</p></li><li><p>收益较小或特殊情况特殊分析的操作：</p><ol><li>首屏数据尽量并行，小数据量的接口合并到其他接口</li><li>页面包含大量 DOM 可以分批随滚动渲染</li><li>骨架屏、loading等效果优化用户体验</li></ol></li></ul><h3 id="打包工具压缩" tabindex="-1">打包工具压缩 <a class="header-anchor" href="#打包工具压缩" aria-label="Permalink to &quot;打包工具压缩&quot;">​</a></h3><p>这方面一般不需要去写什么代码逻辑，因为脚手架已经在打包时有压缩处理，如 <code>vite</code> 打包项目后会使用 <code>gzip</code> 压缩项目。</p><h3 id="异步加载" tabindex="-1">异步加载 <a class="header-anchor" href="#异步加载" aria-label="Permalink to &quot;异步加载&quot;">​</a></h3><p>异步加载不是简单的设置异步，而是需要考虑哪些资源需要异步加载，哪些资源不需要，继续保持同步。用一句话来概括就是，体积大且不是马上需要的资源，就采用异步加载。</p><p>举一个例子，项目中引入了第三方库实现 <code>excel</code> 和 <code>word</code> 资源转换与在线预览，但这两个库很大，在用户没有进入项目页面点击按钮执行操作时是用不到的，和首屏渲染没有关系，这部分的代码可以做异步加载。</p><h3 id="更新" tabindex="-1">更新 <a class="header-anchor" href="#更新" aria-label="Permalink to &quot;更新&quot;">​</a></h3><p>现在的打包工具有一个利器 <code>tree-shaking</code> ，它能够实现项目打包时只打包项目需要使用的第三方库，不会全部打包，但是这需要第三方库支持 <code>tree-shaking</code> 。有一些老版本的库不支持，更新到最新版后或许会支持，也能减少体积。</p><p>在实际项目中，可以通过排查项目使用的第三方依赖，卸载老版本的第三方库，引入新版本的第三方库，把全部导入修改为按需导入，利用 <code>tree-shaking</code> 的机制，能够大大减少打包后的体积，加快项目首屏渲染速度。</p><h3 id="减少库的使用" tabindex="-1">减少库的使用 <a class="header-anchor" href="#减少库的使用" aria-label="Permalink to &quot;减少库的使用&quot;">​</a></h3><p>有些时候，能不用第三方库自己写代码就不要用第三方库。例如时间格式化，自己写一个相关函数可能只需要 3kb ，引入第三方库可能还需要更大。</p><h3 id="减小体积" tabindex="-1">减小体积 <a class="header-anchor" href="#减小体积" aria-label="Permalink to &quot;减小体积&quot;">​</a></h3><p>修改代码，保持精简，积少成多，打包后能更精简。大的图片不要转 <code>base64</code> ，图片的渲染不会影响首屏加载的速度，大图不转 <code>base64</code> 还能减小代码体积。</p><h2 id="操作速度以及渲染速度" tabindex="-1">操作速度以及渲染速度 <a class="header-anchor" href="#操作速度以及渲染速度" aria-label="Permalink to &quot;操作速度以及渲染速度&quot;">​</a></h2><p>以下几种情况会造成操作卡顿和渲染慢：</p><ol><li>一次性操作大量的 DOM</li><li>进行复杂度很高的运算（如循环、递归）</li><li>Vue 和 React 项目中，不必要的渲染太多</li></ol><p>这里主要展开第三点，在 Vue 项目中有依赖收集，配合 Vue3 静态节点标记，基本上避免了因数据改变引起的无意义渲染。只需考虑以下情况：</p><ol><li>频繁切换显隐内容使用 <code>v-show</code> 来控制，打开决定显隐内容使用 <code>v-if</code> 控制</li><li>循环、动态切换的内容添加 <code>key</code> 值</li><li><code>keep-alive</code> 缓存</li><li>区分请求粒度，减少请求范围，减少更新</li></ol><p>其中谨慎缓存接口数据。只有不变数据，定期时效可以缓存在 <code>cookies</code> 或者 <code>localstorage</code> 中，比如 <code>token</code> ，用户名等。</p><p>可以考虑做一个缓存队列存于内存中（全局对象，vuex）。这样能保证刷新就更新数据，也能一定程度上缓存数据。</p>',30),i=[l];function t(r,p,n,s,h,u){return o(),a("div",null,i)}const k=e(c,[["render",t]]);export{b as __pageData,k as default};
