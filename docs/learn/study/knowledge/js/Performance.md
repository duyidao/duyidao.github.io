# Performance API

## 前置知识

## 效果应用

### 实现网页加载进度条

可以通过 `window.performance` 对象来监听⻚⾯资源加载进度。该对象提供了各种⽅法来获取资
源加载的详细信息。

可以使⽤ `performance.getEntries()` ⽅法获取⻚⾯上所有的资源加载信息。可以使⽤该⽅法
来监测每个资源的加载状态，计算加载时间，并据此来实现⼀个资源加载进度条。

::: code-group
```html [页面切换进度.html]
<progress id="progressBar" value="0" max="100"></progress>

<script>
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('load', () => {
    progressBar.value = 100;
  });

  document.addEventListener('readystatechange', () => {
    Math.floor((document.readyState / 4) * 100);
    progressBar.value = progress;
  })
</script>
```
```js [资源加载进度.js]
const resources = window.performance.getEntriesByType('resource');
const totalResources = resources.length;
let loadedResources = 0;
resources.forEach((resource) => {
  if (resource.initiatorType !== 'xmlhttprequest') {// 排除 AJAX 请求
    resource.onload = () => {
      loadedResources++;
      const progress = Math.round((loadedResources / totalResources) * 100);
      updateProgress(progress);
    };
  }
});
```
:::