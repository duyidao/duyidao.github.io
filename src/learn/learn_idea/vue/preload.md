---
title: 图片预加载
author:
  - 远方os 前端实现图片预加载&https://www.douyin.com/video/7437146932683869466
---

# 图片预加载

## 前言

为什么需要图片预加载？

这其实也是一种优化的手段，比如某些页面有图片，且用户极大概率会进入，如果等待用户进入该页面再去请求图片资源，会有一定的延迟，用户体验不好。提前加载图片，等用户进入页面时，图片已经加载好了，用户体验会更好。

## 实现

### html 添加 link 标签

最简单粗暴的方式就是直接在 `index.html` 中添加对应的 `link` 标签，如下：

```html
<link rel="preload" as="image" href="https://https://picsum.photos/200/100?random=1" />
<link rel="preload" as="image" href="https://https://picsum.photos/200/100?random=2" />
<link rel="preload" as="image" href="https://https://picsum.photos/200/100?random=3" />
<link rel="preload" as="image" href="https://https://picsum.photos/200/100?random=4" />
```

`link` 标签添加 `preload` 属性，会告诉浏览器该资源需要提前加载。

这么写虽然简单，但是当图片很多的时候，`index.html` 会变得很长，且不利于维护。

### js 动态添加 link 标签

既然 `index.html` 不方便维护，我们可以使用 js 动态添加 `link` 标签，如下：

```js
const images = [
  'https://picsum.photos/200/100?random=1',
  'https://picsum.photos/200/100?random=2',
  'https://picsum.photos/200/100?random=3',
  'https://picsum.photos/200/100?random=4',
  'https://picsum.photos/200/100?random=5',
  'https://picsum.photos/200/100?random=6',
  'https://picsum.photos/200/100?random=7',
  'https://picsum.photos/200/100?random=8',
  'https://picsum.photos/200/100?random=9',
  'https://picsum.photos/200/100?random=10',
];

export function preloadImages(images) {
  return new Promise((resolve, reject) => {
    images.forEach((image) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = image;
      document.head.appendChild(link);
    });
    images.onload = resolve;
    images.onerror = reject;
  })
}

preloadImages(images);
```

这样我们就可以动态添加 `link` 标签了，但是这样写的话，每次都需要手动去添加，且当图片很多的时候，代码也会变得很长。

### 使用 webpack 插件