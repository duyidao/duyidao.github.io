<script setup lang="ts">
import { useData } from "vitepress";
import { ref, onMounted, computed } from "vue";
import icon from "./icon.vue";
import learn_light from './md-info/learn_light.vue';

const { frontmatter, page } = useData();

const dict = {
  video: "视频",
  blog: "博客",
  article: "文章",
};
// 获取元信息中的作者信息
const authorList = frontmatter.value.author?.map((value) => {
  const authorInfo = value.split(" ")[0];
  const articleInfo = value.split(" ")[1];
  return {
    name: authorInfo.split("&")[0],
    type: dict[authorInfo.split("&")[1] || "video"],
    link: articleInfo.split("&")[1],
    title: articleInfo.split("&")[0],
  };
}) || [];

// 获取文章字数
const wordCount = ref(0);
// 获取 Markdown 内容的函数
const fetchContent = async () => {
  try {
    // 通过动态导入获取原始 Markdown 内容
    const module = await import(
      /* @vite-ignore */ `../src/${page.value.filePath}?raw`
    );
    return module.default;
  } catch (error) {
    console.error("Error loading content:", error);
    return "";
  }
};
/**
 * 计算文章字数
 * @param content 文章内容
 */
const calculateWordCount = (content) => {
  // 移除代码块、HTML标签、Markdown语法等
  const cleanText = content
    .replace(/```[\s\S]*?```/g, "") // 移除代码块
    .replace(/<[^>]+>/g, "") // 移除HTML标签
    .replace(/\!?\[.*?\]\(.*?\)/g, "") // 移除图片和链接
    .replace(/[*_#|>`-]/g, "") // 移除Markdown符号
    .replace(/\s+/g, " ") // 合并多个空格
    .trim();

  // 计算中英文字数
  const chineseChars = cleanText.match(/[\u4e00-\u9fa5]/g) || [];
  const englishWords = cleanText
    .replace(/[\u4e00-\u9fa5]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 0);

  return chineseChars.length + englishWords.length;
};

onMounted(async () => {
  const content = await fetchContent();
  if (content) {
    wordCount.value = calculateWordCount(content);
  }
});

const readList = computed(() => {
  return [
    { name: "icon-park-solid:people", title: "文档创作者", value: "刀刀" },
    {
      name: "icon-park-solid:file-code",
      title: "文档总字数",
      value: wordCount.value + "字",
    },
    {
      name: "icon-park-solid:time",
      title: "预计阅读时长",
      value: Math.max(Math.floor(wordCount.value / 300), 1) + "分钟",
    },
    {
      name: "icon-park-solid:update-rotation",
      title: "最后一次更新",
      value: new Date(
        page.value?.lastUpdated || Date.now()
      ).toLocaleDateString(),
    },
  ];
});
</script>

<template>
  <div class="md-info">
    <div class="md-info__read">
      <div v-for="read in readList"
        :key="read.name"
        :title="read.title">
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

    >div {
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
</style>
