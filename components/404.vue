<template>
  <div class="not-found-page">
    <div class="noise"></div>
    <div class="overlay"></div>
    <div class="terminal">
      <h1>错误 <span class="errorcode">404</span></h1>
      <p class="output">您正在查找的页面可能已被删除、名称更改或暂时不可用。</p>
      <p class="output">
        可以尝试 <a href="javascript:;" @click="goBack">返回上一页</a> 或者
        <a href="/">回到首页</a>.
      </p>
      <p class="output">感谢阅览，祝你好运。</p>
    </div>
  </div>
</template>

<script setup>
const goBack = () => {
  window.history.back()
}
</script>

<style>
:root {
  --overlay: repeating-linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  --a: #555;
}

:root.dark {
  --overlay: repeating-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  --a: #fff;
}
</style>

<style lang="less" scoped>
@import 'https://fonts.googleapis.com/css?family=Inconsolata';

.not-found-page {
  box-sizing: border-box;
  height: calc(100% - 64px);
  background-color: #000000;
  background-image: radial-gradient(#11581e, #041607),
    url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif');
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata', Helvetica, sans-serif;
  font-size: 1.5rem;
  color: rgba(255, 165, 0, 0.8); /* 橙色主题 */
  text-shadow: 0 0 1ex rgba(255, 165, 0, 1), 0 0 2px rgba(255, 255, 255, 0.8);

  .terminal {
    box-sizing: inherit;
    position: absolute;
    height: calc(100% - 64px);
    width: 1000px;
    max-width: 100%;
    padding: 4rem;
    text-transform: uppercase;

    h1 {
      font-size: 48px;
      margin: 32px 0;
      line-height: 48px;
    }

    .output {
      color: rgba(255, 165, 0, 0.8); /* 橙色主题 */
      margin-bottom: 24px;
      text-shadow: 0 0 1px rgba(255, 165, 0, 0.4),
        0 0 2px rgba(255, 255, 255, 0.8);
    }

    .output::before {
      content: '> ';
    }

    a {
      color: var(--a);
      text-decoration: none;
    }

    a::before {
      content: '[';
    }

    a::after {
      content: ']';
    }

    .errorcode {
      color: #ffa500; /* 橙色 */
    }
  }
  .noise {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: calc(100% - 64px);
    background-image: url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif');
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    opacity: 0.01;
  }

  .overlay {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: calc(100% - 64px);
    background: var(--overlay);
    background-size: auto 4px;
    z-index: 1;
    &::before {
      content: '';
      pointer-events: none;
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: calc(100% - 64px);
      background-image: linear-gradient(
        0deg,
        transparent 0%,
        rgba(255, 165, 0, 0.2) 2%,
        rgba(255, 165, 0, 0.8) 3%,
        rgba(255, 165, 0, 0.2) 3%,
        transparent 100%
      );
      background-repeat: no-repeat;
      animation: scan 7.5s linear 0s infinite;
    }
  }
}

@keyframes scan {
  0% {
    background-position: 0 -100vh;
  }
  35%,
  100% {
    background-position: 0 100vh;
  }
}
</style>
