<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted, computed } from 'vue'
import icon from './icon.vue'
import learn_light from './md-info/learn_light.vue'

const { frontmatter, page } = useData()

const dict = {
  video: '视频',
  blog: '博客',
  article: '文章',
}
// 获取元信息中的作者信息
const authorList =
  frontmatter.value.author?.map((value) => {
    const authorInfo = value.split(' ')[0]
    const articleInfo = value.split(' ')[1]
    return {
      name: authorInfo.split('&')[0],
      type: dict[authorInfo.split('&')[1] || 'video'],
      link: articleInfo.split('&')[1],
      title: articleInfo.split('&')[0],
    }
  }) || []

// 获取文章字数
const wordCount = ref(0)
const imageCount = ref(0)
// 获取 Markdown 内容的函数
const fetchContent = async () => {
  document.querySelectorAll('.meta-des').forEach((v) => v.remove())
  const docDomContainer = window.document.querySelector('#VPContent')
  const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
    '.content-container .main img'
  )
  imageCount.value = imgs?.length || 0
  const words =
    docDomContainer?.querySelector('.content-container .main')?.textContent ||
    ''
  wordCount.value = countWord(words)
}
const wordTime = computed(() => {
  return (wordCount.value / 275) * 60
})

const imageTime = computed(() => {
  const n = imageCount.value
  if (imageCount.value <= 10) {
    // 等差数列求和
    return n * 13 + (n * (n - 1)) / 2
  }
  return 175 + (n - 10) * 3
})

// 阅读时间
const readTime = computed(() => {
  return Math.ceil((wordTime.value + imageTime.value) / 60)
})
const pattern =
  /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g

function countWord(data: string) {
  const m = data.match(pattern)
  let count = 0
  if (!m) {
    return 0
  }
  for (let i = 0; i < m.length; i += 1) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length
    } else {
      count += 1
    }
  }
  return count
}

onMounted(() => {
  fetchContent()
})

const readList = computed(() => {
  return [
    { name: 'icon-park-solid:people', title: '文档创作者', value: '刀刀' },
    {
      name: 'icon-park-solid:file-code',
      title: '文档总字数',
      value: wordCount.value + '字',
    },
    {
      name: 'icon-park-solid:time',
      title: '预计阅读时长',
      value: readTime.value + '分钟',
    },
    {
      name: 'icon-park-solid:update-rotation',
      title: '最后一次更新',
      value: new Date(
        page.value?.lastUpdated || Date.now()
      ).toLocaleDateString(),
    },
  ]
})
</script>

<template>
  <div class="md-info">
    <div class="md-info__read">
      <div v-for="read in readList" :key="read.name" :title="read.title">
        <icon :name="read.name" />
        <span>{{ read.value }}</span>
      </div>
    </div>
    <learn_light v-if="authorList.length" :authorList="authorList" />
  </div>
</template>

<style lang="less" scoped>
.md-info {
  width: 100%;
  margin-top: 35px;

  &__read {
    display: flex;
    align-items: center;
    gap: 25px;
    font-size: 14px;
    color: var(--vp-c-text-2);
    margin-bottom: 8px;

    > div {
      display: flex;
      align-items: center;
      gap: 6px;

      span {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .md-info {
    margin-top: 1.875rem;

    &__read {
      flex-wrap: wrap;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      gap: 0;

      > div {
        width: 50%;
        display: flex;
        align-items: center;
        gap: 0.375rem;
        margin-bottom: 0.75rem;

        &:nth-child(3),
        &:nth-child(4) {
          margin-bottom: 0;
        }

        span {
          font-weight: 600;
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
