import{_ as s,c as i,o as a,U as t}from"./chunks/framework.pP-Hyzfo.js";const y=JSON.parse('{"title":"文字适配背景","description":"","frontmatter":{},"headers":[],"relativePath":"learn/CSS/效果提升/文字适配背景.md","filePath":"learn/CSS/效果提升/文字适配背景.md","lastUpdated":1704114739000}'),n={name:"learn/CSS/效果提升/文字适配背景.md"},l=t(`<h1 id="文字适配背景" tabindex="-1">文字适配背景 <a class="header-anchor" href="#文字适配背景" aria-label="Permalink to &quot;文字适配背景&quot;">​</a></h1><h2 id="效果" tabindex="-1">效果 <a class="header-anchor" href="#效果" aria-label="Permalink to &quot;效果&quot;">​</a></h2><p>有一个效果如下图所示：</p><p><img src="https://pic.imgdb.cn/item/65211f1cc458853aef4f9a3d.jpg" alt="xiaoguo"></p><p>其代码如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  .banner</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">250</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    text-align</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">center</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    line-height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">250</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    background-image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">linear-gradient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      45</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">deg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      #fff</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      #fff</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      #000</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      #000</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  .title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#fff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;banner&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;title&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;前端搬砖人 每天都努力&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>从代码不难看出一个父级 <code>div</code> 渐变背景色，下方包含一个文本标签，其颜色设置为白色，但是却能实现根据不同的背景色实现不同的文字颜色。</p><p>这里其实只需要给他设置一个 CSS 属性就能实现了，代码如下：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#fff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  mix-blend-mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">difference</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>下面来介绍一下这个 <code>mix-blend-mode</code> 。</p><h2 id="mix-blend-mode" tabindex="-1">mix-blend-mode <a class="header-anchor" href="#mix-blend-mode" aria-label="Permalink to &quot;mix-blend-mode&quot;">​</a></h2><p>根据 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode" target="_blank" rel="noreferrer">MDN相关文档</a> 的描述，该属性是用于定义了一个元素的颜色如何与其父元素的颜色以及兄弟元素的颜色混合。它允许您创建令人惊艳的视觉效果，可以用于创建半透明效果、添加阴影、制作图片蒙版和很多其他效果。</p><p>具体来说，mix-blend-mode 定义了两个元素之间的颜色混合模式。该属性接受许多不同的值，接下来逐个介绍。</p><table><thead><tr><th>属性</th><th>效果</th></tr></thead><tbody><tr><td>normal</td><td>默认值。使用正常的颜色混合模式</td></tr><tr><td>multiply</td><td>将两个颜色的值相乘，得到一个更暗的颜色。这通常用于创建阴影效果</td></tr><tr><td>screen</td><td>将两个颜色的值相加，然后减去相乘的值，得到一个更亮的颜色。这通常用于创建高光效果</td></tr><tr><td>overlay</td><td>根据背景颜色的亮度来选择颜色混合模式。如果背景颜色较暗，则使用 multiply 模式；如果背景颜色较亮，则使用 screen 模式</td></tr><tr><td>darken</td><td>将两个颜色的值比较，使用较暗的那个颜色</td></tr><tr><td>lighten</td><td>将两个颜色的值比较，使用较亮的那个颜色</td></tr><tr><td>color-dodge</td><td>将前景色分解为 RGB 分量，并将每个分量分别除以（1 减去背景色的对应分量）。然后将每个分量限制在 0 到 1 之间，并使用限制后的前景色作为混合色</td></tr><tr><td>color-burn</td><td>将前景色分解为 RGB 分量，并将每个分量分别除以背景色的对应分量。然后将每个分量限制在 0 到 1 之间，并使用限制后的前景色作为混合色</td></tr><tr><td>difference</td><td>将前景色减去背景色的值，并取绝对值。这会导致一个反相的效果</td></tr><tr><td>exclusion</td><td>将前景色和背景色的值相加，然后减去相乘的值的两倍。这通常用于创建反相效果</td></tr><tr><td>hue</td><td>将前景色的色相（Hue）与背景色的饱和度（Saturation）和亮度（Lightness）混合。这可以用于在不改变亮度和饱和度的情况下改变颜色</td></tr><tr><td>saturation</td><td>将前景色的饱和度与背景色的色相和亮度混合。这可以用于在不改变颜色的情况下改变饱和度</td></tr><tr><td>color</td><td>将前景色的色相、饱和度和亮度与背景色混合。这可以用于在改变所有颜色属性的情况下改变前景色的颜色。</td></tr><tr><td>luminosity</td><td>将前景色的亮度与背景色的色相和饱和度混合。这可以用于在不改变颜色的情况下改变亮度。</td></tr><tr><td>mix-blend-mode</td><td>属性可以应用于任何具有背景颜色或背景图像的元素，包括文本、图像和 SVG 图形。通常情况下，您会将 mix-blend-mode 应用于子元素，使其与父元素或其他兄弟元素混合。</td></tr></tbody></table><p>本案例取的是 <code>difference</code> 属性也就是差值，计算方式如下：</p><ul><li>如果背景颜色是白色（即255，255，255），字体颜色为白色，两者相减得出 0，0，0 也就是黑色</li><li>如果背景色为黑色，字体颜色为白色，两者相减为 255 - 0 = 255 依旧是白色</li></ul><blockquote><p>注意：</p><p>在混合模式中，元素的颜色值可以是任何一种表示颜色的方式，包括十六进制值、RGB值、RGBA值等。当进行混合计算时，CSS会将两个元素的颜色值转换成标准的RGBA表示方式，并根据混合模式算法对这两个颜色值进行计算，最终生成一个新的RGBA颜色值。</p><p>混合模式中的算法涉及到了数学计算，不同的算法使用不同的计算公式。以 multiply 算法为例，它的计算公式是将两个颜色值的每个通道（即红、绿、蓝、透明度四个通道）分别相乘，得到新的颜色值的每个通道。</p></blockquote>`,17),h=[l];function p(k,e,d,r,E,g){return a(),i("div",null,h)}const c=s(n,[["render",p]]);export{y as __pageData,c as default};
