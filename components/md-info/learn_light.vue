<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{
  authorList: any[],
}>();

const authorTitle = ref(null);

const show = ref(false);
const showCard = () => {
  show.value = !show.value;
};

onMounted(() => {
  for (let i = 0; i < authorTitle.value.length; i++) {
    const fullText = authorTitle.value[i].textContent;
    if (
      i % 2 === 0 &&
      authorTitle.value[i + 1] &&
      authorTitle.value[i].textContent.length > 10
    ) {
      authorTitle.value[i].textContent =
        fullText.substring(0, 5) +
        "..." +
        fullText.substring(fullText.length - 5);
    }
    if (
      i % 2 !== 0 &&
      authorTitle.value[i - 1] &&
      authorTitle.value[i].textContent.length > 10
    ) {
      authorTitle.value[i].textContent =
        fullText.substring(0, 5) +
        "..." +
        fullText.substring(fullText.length - 5);
    }
  }
});
</script>

<template>
  <div class="md-info__author">
    <div class="header"
      @click="showCard">
      <h3>学习明灯</h3>
    </div>
    <div class="content"
      :class="{ 'content-show': show }">
      <div class="resources-list">
        <!-- 资源条目1 -->
        <div v-for="author in authorList"
          :key="author.name"
          :title="author.title"
          class="resource-item">
          <a :href="author.link"
            class="resource-title"
            target="_blank"
            ref="authorTitle">
            {{ author.title }}
          </a>
          <div class="resource-meta">
            <span class="resource-id">{{ author.name }}</span>
            <span class="resource-type"
              :class="{
                'type-video': author.type === '视频',
                'type-blog': author.type !== '视频',
              }">{{ author.type }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 波浪效果部分 -->
    <div class="waves"
      :class="{ 'waves-show': show }">
      <!-- 第一层波浪 -->
      <div class="wave-container">
        <div class="wave wave1"></div>
        <div class="wave wave1"></div>
      </div>

      <!-- 第二层波浪 -->
      <div class="wave-container">
        <div class="wave wave2"></div>
        <div class="wave wave2"></div>
      </div>

      <!-- 第三层波浪 -->
      <div class="wave-container">
        <div class="wave wave3"></div>
        <div class="wave wave3"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.md-info__author {
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  box-shadow: 0 8px 30px var(--shadow-color);
  overflow: hidden;
  position: relative;
  margin-top: 30px;
  background: var(--bg-color);

  a[href^="https://"]::before {
    margin-top: 0;
    margin-right: 8px;
  }

  .header {
    background: var(--header-bg);
    color: var(--header-text);
    padding: 15px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    h3 {
      margin-top: 0;
    }
  }

  .content {
    padding: 20px 20px 15px;
    display: none;

    &.content-show {
      display: block;
    }

    .resources-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px;

      .resource-item {
        flex: 1;
        min-width: 48%;
        background: var(--card-bg);
        border-radius: 15px;
        padding: 18px;
        box-shadow: 0 5px 15px var(--shadow-color);
        transition: all 0.3s ease;
        border: 1px solid var(--border-color);
        position: relative;
        overflow: hidden;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 12px rgba(255, 152, 0, 0.3);
          border-color: var(--learn-primary-color);
        }
      }

      .resource-title {
        font-size: 18px;
        font-weight: 600;
        display: flex;
        align-items: center;
        color: var(--text-color);
        cursor: pointer;
      }
    }

    .resource-meta {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px dashed #ffcc80;
      color: var(--text-secondary);
      font-size: 0.9rem;

      .resource-id {
        background: var(--learn-primary-extra-light);
        color: #ef6c00;
        padding: 0 6px;
        font-size: 13px;
      }

      .resource-type {
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }

    .type-video {
      color: #e64a19;
    }

    .type-blog {
      color: #388e3c;
    }
  }

  /* 波浪效果样式 */
  /* 优化后的波浪效果 */
  .waves {
    display: none;
    position: relative;
    height: 55px;
    overflow: hidden;
    background: linear-gradient(to top, var(--learn-primary-dark), transparent);

    &.waves-show {
      display: block;
    }

    /* 波浪容器 - 使用两个相同的波浪元素实现无缝衔接 */
    .wave-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 200%;
      /* 双倍宽度 */
      height: 100%;
      display: flex;
    }

    .wave {
      width: 50%;
      /* 每个波浪占一半宽度 */
      height: 100%;
      background-repeat: repeat-x;
      background-size: 100% 100%;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    /* 第一层波浪 */
    .wave1 {
      background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" fill="%23FF980077"><path d="M0,60 C150,120 350,0 500,60 C650,120 850,0 1000,60 C1150,120 1200,0 1200,0 L1200,120 L0,120 Z"></path></svg>');
      animation: wave1 15s linear infinite;
      opacity: 0.7;
    }

    /* 第二层波浪 */
    .wave2 {
      background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" fill="%23F57C0066"><path d="M0,40 C150,90 350,10 500,40 C650,90 850,10 1000,40 C1150,90 1200,10 1200,10 L1200,120 L0,120 Z"></path></svg>');
      animation: wave2 20s linear infinite;
      opacity: 0.5;
    }

    /* 第三层波浪 */
    .wave3 {
      background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" fill="%23EF6C0044"><path d="M0,80 C150,120 350,60 500,80 C650,120 850,60 1000,80 C1150,120 1200,60 1200,60 L1200,120 L0,120 Z"></path></svg>');
      animation: wave3 25s linear infinite;
      opacity: 0.3;
    }
  }

  /* 关键帧动画 - 确保无缝连接 */
  @keyframes wave1 {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes wave2 {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes wave3 {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-100%);
    }
  }
}
</style>