const images = [
  '/svg/代码运行.svg',
  '/svg/语法.svg',
  '/svg/article.svg',
  '/svg/bilibili.svg',
  '/svg/dir_close.svg',
  '/svg/dir.svg',
  '/svg/douyin.svg',
  '/svg/file.svg',
  '/svg/github.svg',
  '/svg/juejin.svg',
  '/svg/link.svg',
  '/svg/section.svg',
  '/svg/wechat.svg',
  '/svg/youtube.svg',
  '/svg/zhihu.svg',
]

const preloadImages = (max = 3) => {
  const _images = [...images]
  function loadImage() {
    const src = _images.shift()
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
      link.onload = resolve
      link.onerror = reject
    })
  }

  function _loadImages() {
    return loadImage()
      .catch((err) => {
        console.warn('加载失败：' + err)
      })
      .finally(() => {
        if (_images.length) _loadImages()
      })
  }

  if (typeof window !== 'undefined') {
    for (let i = 0; i < max; i++) {
      _loadImages()
    }
  }
}

export default preloadImages
