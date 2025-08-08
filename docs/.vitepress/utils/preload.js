const images = ['/images/blog.png', '/images/link.png', '/svg/bilibili.svg', '/svg/douyin.svg', '/svg/gis.svg', '/svg/giscus.svg', '/svg/github.svg', '/svg/juejin.svg', '/svg/link.svg', '/svg/mdn.svg', '/svg/npm.svg', '/svg/reship.svg', '/svg/uniapp.svg', '/svg/vue.svg', '/svg/youtube.svg'];

const preloadImages = (max = 3) => {
  const _images = [...images];
  function loadImage() {
    const src = _images.shift();
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      link.onload = resolve;
      link.onerror = reject;
    });
  }

  function _loadImages() {
    return loadImage()
      .catch((err) => {
        console.warn('加载失败：' + err)
      })
      .finally(() => {
        if (_images.length) _loadImages();
      });
  }
  
  for (let i = 0; i < max; i++) {
    _loadImages();
  }
}

export default preloadImages;