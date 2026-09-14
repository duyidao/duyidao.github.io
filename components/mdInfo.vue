<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { ref, onMounted, computed, watch } from 'vue'
import icon from './icon.vue'
import learn_light from './md-info/learn_light.vue'
// 导入文档元数据 - 使用正确的相对路径
import docMetadata from '@/文档元数据.json'

interface AuthorInfo {
  author: string
  link: string
  title: string
}

interface DocMeta {
  description?: string
  tags?: string[]
  authors?: AuthorInfo[]
}

const { frontmatter, page } = useData()
const route = useRoute()

const typedDocMetadata: Record<string, DocMeta> =
  docMetadata as unknown as Record<string, DocMeta>

const dict: Record<string, string> = {
  video: '视频',
  blog: '博客',
  article: '文章',
}

// 调试日志：检查数据是否加载成功
console.log(
  '📄 文档元数据加载状态:',
  Object.keys(typedDocMetadata).length,
  '条记录',
)
console.log('📍 当前路由路径:', route.path)

// 获取当前页面路径并匹配元数据（解决中文URL编码问题）
const currentPath = computed(() => {
  // 移除开头和结尾的斜杠
  let path = route.path.replace(/^\//, '').replace(/\/$/, '')
  // 关键：URL解码，将 %E5%AF%8C... 还原为中文"富文本编辑器"
  try {
    path = decodeURIComponent(path)
  } catch (e) {
    console.warn('⚠️ URL解码失败:', e)
  }
  console.log('🔍 匹配路径:', path)
  return path
})

const currentDocMeta = computed(() => {
  // 直接匹配
  let meta = typedDocMetadata[currentPath.value]

  // 如果没找到，尝试去掉或添加 practice/ 前缀
  if (!meta) {
    const pathWithoutPractice = currentPath.value.replace(/^practice\//, '')
    const pathWithPractice = currentPath.value.startsWith('practice/')
      ? currentPath.value
      : `practice/${currentPath.value}`

    meta =
      typedDocMetadata[pathWithoutPractice] ||
      typedDocMetadata[pathWithPractice]

    if (meta) {
      console.log('🔄 使用备用路径匹配成功')
    }
  }

  console.log(
    '📋 找到的元数据:',
    meta ? '✅ 找到' : '❌ 未找到',
    currentPath.value,
  )
  return meta || null
})

// 获取文档描述
const docDescription = computed(() => {
  return currentDocMeta.value?.description || ''
})

// 获取文档tags
const docTags = computed(() => {
  return currentDocMeta.value?.tags || []
})

// 根据链接判断类型
function getAuthorType(link: string): string {
  if (link.includes('bilibili.com') || link.includes('douyin.com')) {
    return '视频'
  } else if (
    link.includes('blog') ||
    link.includes('zhihu') ||
    link.includes('juejin')
  ) {
    return '博客'
  } else {
    return '文章'
  }
}

// 从文档元数据获取authors（唯一数据源）
const authorList = computed(() => {
  // 优先从文档元数据获取
  if (
    currentDocMeta.value?.authors &&
    Array.isArray(currentDocMeta.value.authors) &&
    currentDocMeta.value.authors.length > 0
  ) {
    console.log(
      '✅ 从JSON获取authors:',
      currentDocMeta.value.authors.length,
      '条',
    )
    return currentDocMeta.value.authors.map((author: any) => ({
      name: author.author,
      type: getAuthorType(author.link),
      link: author.link,
      title: author.title,
    }))
  }

  // 备用：从frontmatter获取（兼容旧数据）
  if (frontmatter.value.author && Array.isArray(frontmatter.value.author)) {
    console.log(
      '⚠️ 从frontmatter获取authors:',
      frontmatter.value.author.length,
      '条',
    )
    return frontmatter.value.author.map((value: string) => {
      const authorInfo = value.split(' ')[0]
      const articleInfo = value.split(' ')[1]
      return {
        name: authorInfo.split('&')[0],
        type: dict[authorInfo.split('&')[1] || 'video'],
        link: articleInfo?.split('&')[1] || '',
        title: articleInfo?.split('&')[0] || '',
      }
    })
  }

  console.log('❌ 无authors数据')
  return []
})

// 监听路由变化，重新计算数据
watch(
  () => route.path,
  (newPath) => {
    console.log('🔄 路由变化:', newPath)
    console.log(
      '📊 当前文档元数据:',
      currentDocMeta.value ? '有数据' : '无数据',
    )
    if (currentDocMeta.value) {
      console.log(
        '📝 描述:',
        currentDocMeta.value.description?.substring(0, 50),
      )
      console.log('🏷️ Tags:', currentDocMeta.value.tags)
      console.log(
        '👥 Authors:',
        currentDocMeta.value.authors?.length || 0,
        '条',
      )
    }
  },
  { immediate: true },
)

// 获取文章字数
const wordCount = ref(0)
const imageCount = ref(0)
// 获取 Markdown 内容的函数
const fetchContent = async () => {
  document.querySelectorAll('.meta-des').forEach((v) => v.remove())
  const docDomContainer = window.document.querySelector('#VPContent')
  const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
    '.content-container .main img',
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
        page.value?.lastUpdated || Date.now(),
      ).toLocaleDateString(),
    },
  ]
})
</script>

<template>
  <div class="md-info">
    <!-- 调试信息（生产环境可删除） -->
    <div
      v-if="false"
      style="
        background: #fff3cd;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        font-size: 12px;
      "
    >
      <p><strong>调试信息：</strong></p>
      <p>当前路径：{{ currentPath }}</p>
      <p>元数据存在：{{ !!currentDocMeta }}</p>
      <p>描述长度：{{ docDescription.length }}</p>
      <p>Tags数量：{{ docTags.length }}</p>
      <p>Authors数量：{{ authorList.length }}</p>
      <p v-if="authorList.length">
        第一条作者：{{ JSON.stringify(authorList[0]) }}
      </p>
    </div>

    <!-- 文档基本信息（作者、字数、阅读时间、日期） -->
    <div class="md-info__read">
      <div v-for="read in readList" :key="read.name" :title="read.title">
        <icon :name="read.name" />
        <span>{{ read.value }}</span>
      </div>
    </div>

    <!-- 文档Tags - 移到基本信息下方 -->
    <div v-if="docTags && docTags.length > 0" class="md-info__tags">
      <span v-for="tag in docTags" :key="tag" class="tag-item">{{ tag }}</span>
    </div>

    <!-- 文档描述 -->
    <div v-if="docDescription" class="md-info__description">
      {{ docDescription }}
    </div>

    <!-- 外部引用地址（视频/博客/文章） - 数据来源：文档元数据.json -->
    <learn_light
      v-if="authorList && authorList.length > 0"
      :authorList="authorList"
    />
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
    padding-bottom: 12px;

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

  &__description {
    margin-top: 16px;
    padding: 16px 20px;
    background: var(--vp-c-bg-soft);
    border-left: 4px solid var(--vp-c-brand-1);
    border-radius: 6px;
    font-size: 15px;
    line-height: 1.7;
    color: var(--vp-c-text-1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  &__tags {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    padding-bottom: 12px;

    .tag-item {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      background: linear-gradient(
        135deg,
        var(--vp-c-brand-soft) 0%,
        var(--vp-c-bg-soft) 100%
      );
      color: var(--vp-c-brand-1);
      border: 1px solid var(--vp-c-brand-3);
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.5;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.15),
          transparent
        );
        transition: left 0.5s ease;
      }

      &:hover {
        color: #fff;
        border-color: var(--vp-c-brand-1);
        background: linear-gradient(
          135deg,
          var(--vp-c-brand-1) 0%,
          var(--vp-c-brand-2) 100%
        );
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

        &::before {
          left: 100%;
        }
      }

      :root.dark &,
      [data-theme='dark'] & {
        color: var(--vp-c-brand-2);
        border-color: rgba(64, 158, 255, 0.3);
        background: linear-gradient(
          135deg,
          rgba(64, 158, 255, 0.12) 0%,
          rgba(255, 255, 255, 0.03) 100%
        );

        &:hover {
          color: #fff;
          border-color: var(--vp-c-brand-1);
          background: linear-gradient(
            135deg,
            var(--vp-c-brand-1) 0%,
            var(--vp-c-brand-2) 100%
          );
        }
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
      padding-bottom: 0.75rem;

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

    &__description {
      margin-top: 1rem;
      padding: 0.875rem 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
    }

    &__tags {
      margin-top: 0.75rem;
      gap: 0.375rem;
      padding-bottom: 0.75rem;

      .tag-item {
        padding: 0.2rem 0.625rem;
        font-size: 0.6875rem;
        border-radius: 10px;
      }
    }
  }
}
</style>
