<script setup lang="ts">
import { ref, watch } from "vue";

defineProps<{
  authorList: any[],
}>();

const authorTitle = ref<any>(null);

const show = ref(false)

watch(() => authorTitle.value,(newVal) => {
  if(!newVal) return;
  for (let i = 0; i < newVal.length; i++) {
    const fullText = newVal[i].textContent;
    if (
      i % 2 === 0 &&
      newVal[i + 1] &&
      newVal[i].textContent.length > 10
    ) {
      newVal[i].textContent =
        fullText.substring(0, 5) +
        "..." +
        fullText.substring(fullText.length - 5);
    }
    if (
      i % 2 !== 0 &&
      newVal[i - 1] &&
      newVal[i].textContent.length > 10
    ) {
      newVal[i].textContent =
        fullText.substring(0, 5) +
        "..." +
        fullText.substring(fullText.length - 5);
    }
  }
}, {deep: true});

// 确保在DOM加载完成后执行
const waveCanvas = ref<any>(null);
watch(() => waveCanvas.value, (newVal: any) => {
  if (!newVal) return;
  const ctx: CanvasRenderingContext2D | null = newVal.getContext('2d');

  // 设置Canvas尺寸
  function setCanvasSize() {
    const rect = newVal.getBoundingClientRect();
    newVal.width = rect.width;
    newVal.height = rect.height;
  }

  // 初始化尺寸
  setCanvasSize();

  // 监听窗口大小变化
  window.addEventListener('resize', setCanvasSize);

  let time = 0;

  function animate() {
    // 清除画布
    ctx!.clearRect(0, 0, newVal.width, newVal.height);

    // 绘制多层波浪
    drawWave(ctx as CanvasRenderingContext2D, newVal.width, newVal.height, time, 20, 0.02, 'rgba(255, 255, 255, 0.3)');
    drawWave(ctx as CanvasRenderingContext2D, newVal.width, newVal.height, time, 15, 0.03, 'rgba(255, 255, 255, 0.2)');
    drawWave(ctx as CanvasRenderingContext2D, newVal.width, newVal.height, time, 10, 0.04, 'rgba(255, 255, 255, 0.1)');

    time += 0.02;
    requestAnimationFrame(animate);
  }

  function drawWave(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, amplitude: number, frequency: number, color: string) {
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (let x = 0; x < width; x += 5) {
      const y = height / 2 + Math.sin(x * frequency + time) * amplitude;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();
  }

  // 立即执行一次，确保初始化
  setTimeout(() => {
    animate();
  }, 100);
}, {deep: true});
</script>

<template>
  <div class="md-info__author">
    <div class="header" @click="show = !show">
      <h3>学习明灯</h3>
    </div>

    <template class="nav" v-if="show">
      <div class="content">
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
      <div class="waves">
        <canvas ref="waveCanvas" id="waveCanvas" class="canvas-wave"></canvas>
      </div>
    </template>
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
    overflow: hidden;

    h3 {
      position: relative;
      width: 45%;
      height: 50px;
      margin-top: 0;
      text-align: center;
      line-height: 50px;
      background: var(--header-bg);
      border-bottom-right-radius: 20px;
      color: var(--header-text);

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: -35px;
        width: 35px;
        height: 35px;
        background: radial-gradient(circle at 100% 100%, transparent 35px, var(--header-after-bg) 35px);
      }
    }
  }

  .content {
    padding: 15px 20px 15px;

    .resources-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 16px;

      .resource-item {
        flex: 1;
        min-width: 48%;
        background: var(--card-bg);
        border-radius: 15px;
        padding: 14px 16px;
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

      .resource-id {
        background: var(--learn-primary-extra-light);
        color: #ef6c00;
        padding: 0 6px;
        font-size: 12px;
      }

      .resource-type {
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 14px;
      }
    }

    .type-video {
      color: #e64a19;
    }

    .type-blog {
      color: #388e3c;
    }
  }

  .waves {
    .canvas-wave {
      display: block;
      width: 100%;
      height: 50px;
      background: linear-gradient(to bottom, #ff6b35, #f7931e);
    }
  }
}

@media screen and (max-width: 768px) {
  .md-info__author {
    max-width: 56.25rem;
    border-radius: 1.25rem;
    box-shadow: 0 0.5rem 1.875rem var(--shadow-color);
    margin-top: 1.875rem;

    a[href^="https://"]::before {
      margin-right: 0.5rem;
    }

    .header {

      h3 {
        height: 2.5rem;
        line-height: 2.5rem;
        border-bottom-right-radius: 0.9375rem;

        &::after {
          right: -1.25rem;
          width: 1.25rem;
          height: 1.25rem;
          background: radial-gradient(circle at 100% 100%, transparent 1.25rem, var(--header-after-bg) 1.25rem);
        }
      }
    }

    .content {
      padding: 0.9375rem;

      .resources-list {
        gap: 1rem;

        .resource-item {
          border-radius: 0.9375rem;
          padding: 0.875rem 1rem;
          box-shadow: 0 0.3125rem 0.9375rem var(--shadow-color);
          border-width: 0.0625rem;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 0.3125rem 0.75rem rgba(255, 152, 0, 0.3);
          }
        }

        .resource-title {
          font-size: 1.125rem;
        }
      }

      .resource-meta {
        margin-top: 0.75rem;
        padding-top: 0.75rem;
        border-top-width: 0.0625rem;

        .resource-id {
          padding: 0 0.375rem;
          font-size: 0.75rem;
        }

        .resource-type {
          letter-spacing: 0.0625rem;
          font-size: 0.875rem;
        }
      }
    }

    .waves {
      .canvas-wave {
        height: 3.125rem;
      }
    }
  }
}
</style>