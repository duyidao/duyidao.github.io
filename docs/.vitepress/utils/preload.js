const imagesPNG = import.meta.glob('/public/images/*.png', { eager: true })
const imagesSVG = import.meta.glob('/public/svg/*.svg', { eager: true })

const preloadImages = (max = 3) => {
  const _images = [
    ...Object.keys(imagesPNG).map(path => path.replace('/public', '')),
    ...Object.keys(imagesSVG).map(path => path.replace('/public', '')),
  ];
  console.log('_images', _images);
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