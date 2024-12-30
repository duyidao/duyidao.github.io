---
layout: home

hero:
  name: 刀刀博客
  text: 欢迎来到刀刀博客，我是杜一刀。<br/>这里记录自己的学习成果，项目学习经验。不定时更新~
  tagline: 每天都要比昨天更有进步💪
  actions:
    - theme: brand
      text: 前端知识
      link: /CSS/
    - theme: alt
      text: 项目总结
      link: /project/
    - theme: alt
      text: 关于
      link: /about/
    - theme: brand
      text: 刀刀小站
      link: https://duyidao.github.io/blogweb/#/
  image:
    src: /favicon.ico
    alt: VitePress

features:
  - icon: 📕
    title: 学习之旅
    details: 自学成果
    link: /CSS/属性详解/-webkit-box-reflect
  - icon: ⚡
    title: 项目之旅
    details: 项目总结
    link: /project/index
  - icon:  ⌛
    title: 博客部署
    details: 从0到1部署博客
    link: /vitePress/index
  - icon:  🎉
    title: 开发帮助
    details: 开发与学习时有用的帮助
    link: /help/index
  - icon:  📖
    title: 阅读之旅
    details: 书籍是人类进步的阶梯，读本好书吧
    link: /read/index
  - icon:  🦆
    title: 面试鸭
    details: 面经
    link: /dict/js/(a==1&&a==2&&a==3)
  - icon:  📘
    title: 刀刀小站
    details: 刀刀博客效果展示，功能实现，不容错过
    link: https://duyidao.github.io/blogweb/#/
  - icon:  🎈️
    title: 未完待续
    details: 尽情期待
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #63cdcf 45%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #63cdcf 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(50px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(60px);
  }
}
</style>