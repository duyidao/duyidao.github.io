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
<link
  rel="preload"
  as="image"
  href="https://https://picsum.photos/200/100?random=1"
/>
<link
  rel="preload"
  as="image"
  href="https://https://picsum.photos/200/100?random=2"
/>
<link
  rel="preload"
  as="image"
  href="https://https://picsum.photos/200/100?random=3"
/>
<link
  rel="preload"
  as="image"
  href="https://https://picsum.photos/200/100?random=4"
/>
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
]

export function preloadImages(images) {
  return new Promise((resolve, reject) => {
    images.forEach((image) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = image
      document.head.appendChild(link)
      link.onload = resolve
      link.onerror = reject
    })
  })
}

preloadImages(images)
```

这样我们就可以动态添加 `link` 标签了，基础的功能也有。

F12 查看控制台，发现每次它都会先请求 6 张图片，剩余的都是挂起状态，直到前面的图片请求完毕后，再去请求剩余的图片。

这是因为浏览器有并发请求的限制，例如 Edge 浏览器，最大并发请求为 6 个。而项目进入首页时，也会有自己的接口需要请求，不能让预加载的图片把请求队列都占满了。

解决方法为每次只预加载 1 张图片，该图片加载完毕后（无论是成功还是失败）都再去加载下一张图片，直到所有图片都加载完毕。

```js
export function preloadImages(images) {
  const _images = JSON.parse(JSON.stringify(images))

  function load() {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = _images.shift()
      document.head.appendChild(link)
      link.onload = resolve
      link.onerror = reject
    })
  }

  function _load() {
    load().finally(() => {
      if (_images.length) {
        _load()
      }
    })
  }
}

preloadImages(images)
```

### 写插件

#### 基础实现

现在实现了图片预加载，但是每次使用都需要手动调用 `preloadImages(images)`，能不能封装成一个插件，方便使用呢？

在<word text="Vite" />项目中，注册插件需要在 `vite.config.ts` 中进行，引入插件在 `plugins` 中使用，每一个插件是一个函数，用来传参。代码如下：

```ts [vite.config.ts]
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { preloadImages } from './src/utils/preload';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    preloadImages(),
  ],
}
```

在对应的文件路径中新建一个 `preloadImages` 函数，用来写插件。

插件函数需要返回一个对象，对象中包含 `name` 和 `transformIndexHtml` 两个属性。`name` 是插件的名称，必填；`transformIndexHtml` 是一个函数，接收一个参数，该参数是 `index.html`。

```ts [/src/utils/preload.ts]
export function preloadImages() {
  return {
    name: 'preload-images',
    transformIndexHtml(html) {
      console.log(html)
    },
  }
}
```

![html打印结果](https://pic1.imgdb.cn/item/694b4ac4c3594c4bdf9ccc4c.png)

`transformIndexHtml` 函数中，我们可以对 `index.html` 进行修改，比如添加 `link` 标签；或者 `return` 返回一个数组，数组的每一项都是一个 `link` 标签，设置好相对应的属性即可。

::: code-group

```ts [replace 修改 html.ts]
export function preloadImages() {
  return {
    name: 'preload-images',
    transformIndexHtml(html) {
      const images = [
        'https://picsum.photos/200/100?random=1',
        'https://picsum.photos/200/100?random=2',
        'https://picsum.photos/200/100?random=3',
        'https://picsum.photos/200/100?random=4',
      ]

      images.forEach((image) => {
        const link = `<link rel="preload" as="image" href="${image}" />`
        html = html.replace('</head>', `${link}</head>`)
      })

      return html
    },
  }
}
```

```ts [return 数组.ts]
export function preloadImages() {
  return {
    name: 'preload-images',
    transformIndexHtml(html) {
      return [
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            href: 'https://picsum.photos/200/100?random=1',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            href: 'https://picsum.photos/200/100?random=2',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            href: 'https://picsum.photos/200/100?random=3',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            href: 'https://picsum.photos/200/100?random=4',
          },
        },
      ]
    },
  }
}
```

:::

这样就可以在 `index.html` 中添加 `link` 标签了，但是这是写死的，一有修改每次都需要手动更新 `images`，能不能直接读取 `public` 文件夹下指定的文件夹中的图片呢？

#### 读取指定路径的图片

还记得前面说过在 `vite.config.ts` 中使用插件函数时可以传参么？我们可以通过传参的方式，将图片的文件夹路径传进去。

```ts [vite.config.ts]
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { preloadImages } from './src/utils/preload';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // [!code focus]
    preloadImages({
      dir: 'public/images/*.{jpg, png}' // [!code focus]
    }), // [!code focus]
  ],
}
```

回到 `/src/utils/preload.ts`，在 `transformIndexHtml` 函数中接收要预加载的图片的路径，可以通过 `import.meta.glob` 获取指定路径的图片，也通过 `fast-glob` 获取指定路径的图片。

```ts [/src/utils/preload.ts]
import fastGlob from 'fast-glob'
interface PreloadImagesOptions {
  dir: string
}

export function preloadImages(options: PreloadImagesOptions) {
  return {
    name: 'preload-images',
    transformIndexHtml(html) {
      const { dir } = options
      const fs = fastGlob.sync(dir)
      console.log('files', fs)

      return fs.map((href) => {
        return {
          tag: 'link',
          attrs: {
            rel: 'prefetch',
            href,
            as: 'image',
          },
        }
      })
    },
  }
}
```

![files内容打印](https://pic1.imgdb.cn/item/694b4cc5c3594c4bdf9cdbfd.png)

查看效果，`head` 标签中已经有这些预加载的 `link` 标签了。但是这还是有问题，需要考虑以下两个问题：

1. 本地环境的 `public` 文件夹，打包后就放在了 `dist` 文件夹中，不再有 `public` 文件夹，`dist` 就是 `public` 的根路径
2. 有些项目设置了 `publicDir`，修改了该项目的 `public` 文件夹路径
3. 有些项目设置了 `base`，修改了项目的基础路径，比如 `base: '/my-app/'`，那么预加载的图片路径也需要修改

因此，直接这么写是有问题的，需要将路径进行修改。

#### 修改路径

`transformIndexHtml` 函数中，第二个参数 `ctx` 是一个上下文对象，打印一下看看结果。

![ctx打印](https://pic1.imgdb.cn/item/694b50c7b65a54c49ff4fcfd.png)

可以看到，`ctx.server.config.publicDir` 就是 `public` 文件夹的路径，因此，外部不再需要传 `public`，内部做处理即可。

::: code-group

```ts [vite.config.ts]
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { preloadImages } from './src/utils/preload';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    preloadImages({
      dir: 'images/*.{jpg, png}' // [!code focus]
    }),
  ],
}
```

```ts [/src/utils/preload.ts]
import fastGlob from 'fast-glob'
interface PreloadImagesOptions {
  dir: string
}

export function preloadImages(options: PreloadImagesOptions) {
  return {
    name: 'preload-images',
    // [!code focus]
    transformIndexHtml(html, ctx) {
      const { dir } = options
      // [!code focus]
      const fs = fastGlob.sync(dir, {
        cwd: ctx.server.config.publicDir, // [!code focus]
      }) // [!code focus]
      console.log('files', fs)

      return fs.map((href) => {
        return {
          tag: 'link',
          attrs: {
            rel: 'prefetch',
            href,
            as: 'image',
          },
        }
      })
    },
  }
}
```

:::

![修改后的files打印](https://pic1.imgdb.cn/item/694b5237b65a54c49ff50419.png)

现在打印查看，结果是正常的。接下来，`base` 的问题，`ctx` 中还有一个 `base` 属性，因此，只需要将 `base` 拼接到 `href` 上即可。

```ts [/src/utils/preload.ts]
import fastGlob from 'fast-glob'
interface PreloadImagesOptions {
  dir: string
}

export function preloadImages(options: PreloadImagesOptions) {
  return {
    name: 'preload-images',
    transformIndexHtml(html, ctx) {
      const { dir } = options
      const fs = fastGlob.sync(dir, {
        cwd: ctx.server.config.publicDir,
      })

      return fs.map((href) => {
        return {
          tag: 'link',
          attrs: {
            rel: 'prefetch',
            href: ctx.server.config.base + href, // [!code focus]
            as: 'image',
          },
        }
      })
    },
  }
}
```

#### 添加 rel 属性

默认的 `rel` 属性是 `prefecth`，但是也要支持用户自定义，是否使用 `preload`。

在 `vite.config.ts` 中用户可以在 `attrs` 对象添加一个 `rel` 属性，`/src/utils/preloadImage.ts` 内通过扩展运算符覆盖默认值。

::: code-group

```ts [vite.config.ts]
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { preloadImages } from './src/utils/preload';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    preloadImages({
      dir: 'images/*.{jpg, png}',
       // [!code focus]
      attrs: {
        rel: 'preload' // [!code focus]
      } // [!code focus]
    }),
  ],
}
```

```ts [/src/utils/preload.ts]
import fastGlob from 'fast-glob'
interface PreloadImagesOptions {
  dir: string
  // [!code focus]
  attrs: {
    rel: 'preload' | 'prefetch' // [!code focus]
  } // [!code focus]
}

export function preloadImages(options: PreloadImagesOptions) {
  return {
    name: 'preload-images',
    transformIndexHtml(html, ctx) {
      const { dir, attrs = {} } = options // [!code focus]

      const fs = fastGlob.sync(dir, {
        cwd: ctx.server.config.publicDir,
      })

      return fs.map((href) => {
        return {
          tag: 'link',
          attrs: {
            rel: 'prefetch',
            href: ctx.server.config.base + href,
            as: 'image',
            ...attrs, // [!code focus]
          },
        }
      })
    },
  }
}
```

:::
