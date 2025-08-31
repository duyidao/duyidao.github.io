# 广州智算

## 一面

### Q：CSS盒子模型的组成。

> 我的回答
>
> - 标准盒模型：content
> - 怪异盒模型：content + padding + border = width

### Q：如何实现左右两侧固定，中间内容自适应的布局？

> 我的回答
>
> - padding
> - flex

### Q：说一下你对闭包的理解

### Q：Vue2 如何实现数据响应式？

### Q：Vue3 改成 proxy 有啥优势呢？

### Q：父子组件、兄弟组件、跨层级组件通信方式有哪些？

### Q：Vue3 生命周期和 Vue2 对比有啥变化？

### Q：v-if 和 v-show 有啥区别？在什么场景下选择使用哪个？

### Q：Vue Router 中，hash 模式和 history 模式有啥区别？

::: details Deepseek 的回答
核心区别概览：
|特性	|hash 模式|	history 模式|
|:-:|:-:|:-:|
|URL 格式|	http://example.com/#/path	|http://example.com/path|
|实现原理	|基于 URL hash (#)|	基于 HTML5 History API|
|服务器配置	|无需特殊配置|	需要后端支持|
|兼容性|	所有浏览器（包括 IE9 以下）|	IE10+ / 现代浏览器|
|SEO 友好|	❌ 差	|✅ 好|
|部署难度|	✅ 简单|	⚠️ 需要额外配置|
|刷新行为|	刷新正常	|直接访问路径会 404|

实现原理详解：
1. `hash` 模式

    核心机制：利用 URL 中的 `hash`（#）部分实现路由

    特点：

    - 改变 URL 的 `hash` 部分不会触发页面刷新

    - 浏览器不会将 `hash` 部分发送到服务器

    - 通过监听 hashchange 事件实现路由切换

    ```javascript
    // 手动实现简易 hash 路由
    window.addEventListener('hashchange', () => {
      const path = window.location.hash.slice(1) || '/';
      renderComponentBasedOnPath(path);
    });

    // 修改路由
    function navigate(path) {
      window.location.hash = path;
    }
    ```
2. `history` 模式

    核心机制：使用 HTML5 History API (pushState, replaceState)

    特点：

    - 创建"真实"的 URL 路径，无 # 符号

    - 需要服务器支持，确保所有路径返回相同 HTML

    - 通过监听 `popstate` 事件处理导航

    ```javascript
    // 手动实现简易 history 路由
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
      renderComponentBasedOnPath(path);
    });

    // 修改路由
    function navigate(path) {
      history.pushState({}, '', path);
      renderComponentBasedOnPath(path);
    }
    ```

实际应用场景对比：部署要求

- `hash` 模式：

  - 任何静态服务器均可直接部署

  - 无额外配置要求

- `history` 模式：

  - 需要服务器配置重定向规则

  - 所有路径请求应返回 `index.html`
:::

### Q：说一下 Uniapp 的生命周期？

### Q：Uniapp 开发中，ios 和安卓常见的样式差异有哪些？

### Q：Uniapp 中，uni.setStorage 和 pinia 的使用场景分别是啥？