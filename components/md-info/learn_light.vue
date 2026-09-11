<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  authorList: any[]
}>()

const show = ref(true) // 默认展开

// 根据链接获取平台信息
function getPlatformInfo(link: string) {
  if (link.includes('bilibili.com')) {
    return {
      name: 'Bilibili',
      icon: 'bilibili',
      color: '#00A1D6',
    }
  } else if (link.includes('youtube.com') || link.includes('youtu.be')) {
    return {
      name: 'YouTube',
      icon: 'youtube',
      color: '#FF0000',
    }
  } else if (link.includes('douyin.com')) {
    return {
      name: '抖音',
      icon: 'douyin',
      color: '#000000',
    }
  } else if (link.includes('zhihu.com')) {
    return {
      name: '知乎',
      icon: 'zhihu',
      color: '#0084FF',
    }
  } else if (link.includes('juejin.cn')) {
    return {
      name: '掘金',
      icon: 'juejin',
      color: '#1E80FF',
    }
  } else if (link.includes('csdn.net')) {
    return {
      name: 'CSDN',
      icon: 'csdn',
      color: '#FC5531',
    }
  }
  return null
}
</script>

<template>
  <div class="md-info__author">
    <div class="header" @click="show = !show">
      <h3>外部资源引用</h3>
      <span class="toggle-icon" :class="{ expanded: show }">▸</span>
    </div>

    <div class="content" v-if="show">
      <div class="resources-list">
        <!-- 资源条目 -->
        <div
          v-for="(author, index) in authorList"
          :key="author.name + index"
          :title="author.title"
          class="resource-item"
        >
          <!-- 平台图标（如果有） -->
          <div
            v-if="getPlatformInfo(author.link)"
            class="platform-badge"
            :style="{ color: getPlatformInfo(author.link).color }"
          >
            <svg
              v-if="getPlatformInfo(author.link)?.icon === 'bilibili'"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="16"
              height="16"
            >
              <path
                d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.767v7.36c-.036 1.518-.556 2.772-1.56 3.767-1.004.996-2.263 1.52-3.773 1.574h-11.63c-1.51-.054-2.769-.578-3.773-1.574C1.819 20.126 1.299 18.872 1.263 17.354v-7.36c.036-1.518.556-2.772 1.56-3.767 1.004-.996 2.263-1.52 3.773-1.574h.854l-1.675-1.659A.96.96 0 0 1 5.28 2.2l.893-.887a.956.956 0 0 1 1.356 0l2.592 2.58h3.76l2.587-2.58a.956.956 0 0 1 1.356 0l.893.887a.96.96 0 0 1 .003 1.356l-1.67 1.659zM7.815 7.65H5.333v7.842h13.334V7.65h-2.482v1.61a.655.655 0 0 1-.653.653h-.978a.655.655 0 0 1-.653-.653V7.65H10.4v1.61a.655.655 0 0 1-.653.653h-.978a.655.655 0 0 1-.653-.653V7.65z"
              />
            </svg>
            <svg
              v-else-if="getPlatformInfo(author.link)?.icon === 'youtube'"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="16"
              height="16"
            >
              <path
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              />
            </svg>
            <span v-else class="platform-text">{{
              getPlatformInfo(author.link)?.name?.charAt(0)
            }}</span>
          </div>

          <div class="resource-content">
            <a :href="author.link" class="resource-title" target="_blank">
              {{ author.title }}
            </a>
            <div class="resource-meta">
              <span class="resource-id">
                <svg
                  class="author-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="12"
                  height="12"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {{ author.name }}
              </span>
              <span
                class="resource-type"
                :class="{
                  'type-video': author.type === '视频',
                  'type-blog': author.type === '博客',
                  'type-article': author.type === '文章',
                }"
              >
                <svg
                  v-if="author.type === '视频'"
                  class="type-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="10"
                  height="10"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <svg
                  v-else-if="author.type === '博客'"
                  class="type-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="10"
                  height="10"
                >
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  ></path>
                  <path
                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="type-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="10"
                  height="10"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  ></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                {{ author.type }}
              </span>
            </div>
          </div>

          <!-- 外链按钮 -->
          <div class="resource-link">
            <a :href="author.link" target="_blank" title="在新窗口打开">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="14"
                height="14"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                ></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.md-info__author {
  width: 100%;
  max-width: 900px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  position: relative;
  margin-top: 24px;
  background: var(--vp-c-bg-soft);

  a[href^='https://']::before {
    margin-top: 0;
    margin-right: 8px;
  }

  .header {
    padding: 10px 16px;
    border-bottom: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;

    h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--vp-c-text-1);
    }

    .toggle-icon {
      font-size: 12px;
      color: var(--vp-c-text-2);
      transition: transform 0.2s ease;

      &.expanded {
        transform: rotate(90deg);
      }
    }
  }

  .content {
    padding: 12px 16px;

    .resources-list {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .resource-item {
        display: flex;
        align-items: center;
        gap: 12px;
        background: var(--vp-c-bg);
        border-radius: 6px;
        padding: 12px 14px;
        border: 1px solid var(--vp-c-divider);
        transition: all 0.2s ease;
        position: relative;

        &:hover {
          border-color: var(--vp-c-brand-3); // 使用更柔和的品牌色
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); // 极淡阴影
        }
      }

      // 平台图标徽章
      .platform-badge {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--vp-c-bg-soft);
        border-radius: 4px;
        border: 1px solid var(--vp-c-divider);

        svg {
          width: 16px;
          height: 16px;
        }

        .platform-text {
          font-size: 11px;
          font-weight: 600;
        }
      }

      .resource-content {
        flex: 1;
        min-width: 0;
      }

      .resource-title {
        font-size: 14px;
        font-weight: 500;
        display: block;
        color: var(--vp-c-text-1);
        cursor: pointer;
        line-height: 1.5;
        margin-bottom: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        transition: color 0.2s ease;

        &:hover {
          color: var(--vp-c-brand-1);
        }
      }

      .resource-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px dashed var(--vp-c-divider);
        color: var(--vp-c-text-2);
        font-size: 12px;

        .resource-id {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--vp-c-text-2);

          .author-icon {
            width: 13px;
            height: 13px;
            opacity: 0.7;
          }
        }

        .resource-type {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 500;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 3px;
          border: 1px solid var(--vp-c-divider);
          background: transparent;
          transition: all 0.2s ease;

          .type-icon {
            width: 10px;
            height: 10px;
            display: flex;
            align-items: center;
          }
        }

        .type-video {
          color: #e74c3c;
          border-color: rgba(231, 76, 60, 0.3);

          &:hover {
            background: rgba(231, 76, 60, 0.08);
          }
        }

        .type-blog {
          color: #3498db;
          border-color: rgba(52, 152, 219, 0.3);

          &:hover {
            background: rgba(52, 152, 219, 0.08);
          }
        }

        .type-article {
          color: #27ae60;
          border-color: rgba(39, 174, 96, 0.3);

          &:hover {
            background: rgba(39, 174, 96, 0.08);
          }
        }
      }

      // 外链按钮 - 简洁风格
      .resource-link {
        flex-shrink: 0;
        margin-left: 8px;

        a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          color: var(--vp-c-text-2);
          border: 1px solid var(--vp-c-divider);
          background: var(--vp-c-bg-soft);
          transition: all 0.2s ease;

          &:hover {
            color: var(--vp-c-brand-1);
            border-color: var(--vp-c-brand-1);
            background: transparent;
          }
        }
      }
    }
  }

  .waves {
    display: none; // 完全隐藏波浪
  }
}

@media screen and (max-width: 768px) {
  .md-info__author {
    max-width: 100%;
    border-radius: 6px;
    margin-top: 20px;

    a[href^='https://']::before {
      margin-right: 4px;
    }

    .header {
      padding: 8px 12px;

      h3 {
        font-size: 13px;
      }

      .toggle-icon {
        font-size: 11px;
      }
    }

    .content {
      padding: 10px 12px;

      .resources-list {
        gap: 8px;

        .resource-item {
          border-radius: 6px;
          padding: 10px 12px;
          gap: 10px;

          .platform-badge {
            width: 22px;
            height: 22px;

            svg {
              width: 14px;
              height: 14px;
            }
          }

          .resource-link {
            a {
              width: 26px;
              height: 26px;

              svg {
                width: 12px;
                height: 12px;
              }
            }
          }
        }

        .resource-title {
          font-size: 13px;
          margin-bottom: 5px;
        }

        .resource-meta {
          margin-top: 6px;
          padding-top: 6px;
          font-size: 11px;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;

          .resource-id {
            .author-icon {
              width: 12px;
              height: 12px;
            }
          }

          .resource-type {
            font-size: 10px;
            padding: 2px 6px;

            .type-icon {
              width: 9px;
              height: 9px;
            }
          }
        }
      }
    }

    .waves {
      display: none;
    }
  }
}
</style>
