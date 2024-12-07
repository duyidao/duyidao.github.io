import{_ as e,c as a,o,a1 as t}from"./chunks/framework.CBYj4t9H.js";const u=JSON.parse('{"title":"部署","description":"","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":" ","6":"部","7":"署"},"headers":[],"relativePath":"vitePress/Deploy.md","filePath":"vitePress/Deploy.md","lastUpdated":1675239746000}'),i={name:"vitePress/Deploy.md"},d=t('<h1 id="部署" tabindex="-1">部署 <a class="header-anchor" href="#部署" aria-label="Permalink to &quot;部署&quot;">​</a></h1><h2 id="gitee部署" tabindex="-1">gitee部署 <a class="header-anchor" href="#gitee部署" aria-label="Permalink to &quot;gitee部署&quot;">​</a></h2><h3 id="创建仓库" tabindex="-1">创建仓库 <a class="header-anchor" href="#创建仓库" aria-label="Permalink to &quot;创建仓库&quot;">​</a></h3><p>重点：</p><ul><li>如果第二阶段打包时 <code>base</code> 参数为 <code>/</code> ，仓库名称应为 <code>gitee用户名.gitee.io</code>。（以我的账号为例，应为 <code>duyidao.gitee.io</code>）</li><li>如果参数为 <code>/一个单词/</code> ，仓库名称也要取对应的名称。（如第二阶段我的代码是 <code>base: &#39;/daodao/&#39;</code>，仓库名称如下图所示）</li></ul><p><img src="https://s1.ax1x.com/2023/02/01/pSBXbdg.png" alt="创建仓库"></p><h3 id="设置开源" tabindex="-1">设置开源 <a class="header-anchor" href="#设置开源" aria-label="Permalink to &quot;设置开源&quot;">​</a></h3><p>把仓库设为开源</p><h3 id="选择-gitee-pages-服务" tabindex="-1">选择 Gitee Pages 服务 <a class="header-anchor" href="#选择-gitee-pages-服务" aria-label="Permalink to &quot;选择 Gitee Pages 服务&quot;">​</a></h3><ol><li><p>点击服务选择 <code>Gitee Pages</code> 服务。</p><p><img src="https://s1.ax1x.com/2023/02/01/pSBvp9A.png" alt="选择服务"></p></li><li><p>选择分支 本次项目只有一个主分支，不用操作。</p></li><li><p>选择部署目录 如果上传时上传的是整个 <code>vitepress</code> 文件夹，此时要设置部署的目录：<code>docs/.vitepress/dist</code> 。如果单独上传打包好后的 <code>dist</code> 文件夹，则不需要做其他设置，默认以整个仓库为基准路径。</p></li></ol><p>最后打包成功后，会给一个链接，复制打开就能看到成品了。</p><h2 id="github部署" tabindex="-1">github部署 <a class="header-anchor" href="#github部署" aria-label="Permalink to &quot;github部署&quot;">​</a></h2><p>在创建好的仓库点击 <code>Setting</code>，找到 <code>Pages</code>，调整 <code>Branch</code> 设置：</p><ol><li>选择 <code>main</code> 分支，这里是主分支，因此默认 <code>main</code></li><li>选择部署文件，这里是直接上传打包后的内容，因此文件夹选择 <code>root</code> 根文件</li><li>点击 <code>save</code>，等待部署成功即可</li></ol><p>若没有看到选择分支的下拉框，则先切换 <code>Source</code> 下拉框再切换回来即可。 <img src="https://pic.imgdb.cn/item/675260bad0e0a243d4de6f10.png" alt="部署一图流"></p>',15),c=[d];function l(s,r,p,h,n,g){return o(),a("div",null,c)}const m=e(i,[["render",l]]);export{u as __pageData,m as default};
