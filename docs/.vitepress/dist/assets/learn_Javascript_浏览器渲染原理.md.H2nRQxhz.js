import{_ as a,c as t,o as e,U as r}from"./chunks/framework.pP-Hyzfo.js";const T=JSON.parse('{"title":"浏览器渲染原理","description":"","frontmatter":{},"headers":[],"relativePath":"learn/Javascript/浏览器渲染原理.md","filePath":"learn/Javascript/浏览器渲染原理.md","lastUpdated":1704114739000}'),_={name:"learn/Javascript/浏览器渲染原理.md"},o=r('<h1 id="浏览器渲染原理" tabindex="-1">浏览器渲染原理 <a class="header-anchor" href="#浏览器渲染原理" aria-label="Permalink to &quot;浏览器渲染原理&quot;">​</a></h1><p>浏览器渲染实际上是把 HTML 字符串经过非常复杂、环环相扣的逻辑后，完成每一个像素点的信息，如坐标、颜色等。</p><p>这个渲染发生的时机需要牵扯到事件循环的知识点了，有一个面试题是 “地址栏输入网站，按下回车键后发生什么事？”</p><p>主要分为两块：网络和渲染。</p><p>网络线程拿 HTML 代码，其中 link 获取 CSS 样式， script 获取 JS 代码，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。</p><p>在事件循环机制的作用下，渲染主线程取出消息队列中的渲染任务，开启渲染流程。</p><p>整个渲染流程分为多个阶段，分别是：解析HTML → 计算样式 → 布局 → 分层 → 绘制 → 分块 → 光栅化 → 画 → 生成最终像素信息。</p><h2 id="解析html" tabindex="-1">解析HTML <a class="header-anchor" href="#解析html" aria-label="Permalink to &quot;解析HTML&quot;">​</a></h2><p>首先把 HTML 变成一个对象结构的 DOM 树</p>',9),p=[o];function s(n,c,i,l,d,h){return e(),t("div",null,p)}const f=a(_,[["render",s]]);export{T as __pageData,f as default};
