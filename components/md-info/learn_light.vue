<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  authorList: any[]
}>()

const show = ref(true)

interface PlatformInfo {
  name: string
  icon: string
  color: string
}

function getPlatformInfo(link: string): PlatformInfo | null {
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

  a[href^='https://'].resource-title::before {
    margin-top: -2px;
    margin-right: 8px;
    vertical-align: middle;
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
          border-color: var(--vp-c-brand-3);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        > .resource-content {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;

          > .resource-title {
            display: flex;
            margin-bottom: 0;
            flex: 1;
            min-width: 0;
            transform: translateY(0);
          }

          > .resource-meta {
            margin-top: 0;
            padding-top: 0;
            border-top: none;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            gap: 12px;
          }
        }
      }

      .resource-title {
        font-size: 14px;
        font-weight: 500;
        align-items: center;
        color: var(--vp-c-text-1);
        cursor: pointer;
        line-height: 24px;
        height: 24px;
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
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-weight: 500;
          font-size: 10px;
          padding: 1px 6px;
          border-radius: 8px;
          border: 1px solid;
          background: transparent;
          transition: all 0.25s ease;
          line-height: 1.4;

          .type-icon {
            width: 9px;
            height: 9px;
            display: flex;
            align-items: center;
          }
        }

        .type-video {
          color: #e74c3c;
          border-color: rgba(231, 76, 60, 0.25);
          background: rgba(231, 76, 60, 0.04);

          &:hover {
            background: rgba(231, 76, 60, 0.1);
            border-color: rgba(231, 76, 60, 0.4);
            transform: translateY(-1px);
          }
        }

        .type-blog {
          color: #3498db;
          border-color: rgba(52, 152, 219, 0.25);
          background: rgba(52, 152, 219, 0.04);

          &:hover {
            background: rgba(52, 152, 219, 0.1);
            border-color: rgba(52, 152, 219, 0.4);
            transform: translateY(-1px);
          }
        }

        .type-article {
          color: #27ae60;
          border-color: rgba(39, 174, 96, 0.25);
          background: rgba(39, 174, 96, 0.04);

          &:hover {
            background: rgba(39, 174, 96, 0.1);
            border-color: rgba(39, 174, 96, 0.4);
            transform: translateY(-1px);
          }
        }
      }

      // 外链按钮 - 美化风格
      .resource-link {
        flex-shrink: 0;
        margin-left: 8px;
        align-self: center;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 24px;

        a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          color: var(--vp-c-text-2);
          border: 1px solid var(--vp-c-divider);
          background: linear-gradient(
            135deg,
            var(--vp-c-bg-soft) 0%,
            var(--vp-c-bg) 100%
          );
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;

          svg {
            width: 13px;
            height: 13px;
            transition: all 0.25s ease;
          }

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(
              circle,
              var(--vp-c-brand-1) 0%,
              transparent 70%
            );
            opacity: 0;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
            border-radius: 50%;
          }

          &:hover {
            color: var(--vp-c-brand-1);
            border-color: var(--vp-c-brand-3);
            background: linear-gradient(
              135deg,
              var(--vp-c-brand-soft) 0%,
              var(--vp-c-bg) 100%
            );
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

            svg {
              transform: scale(1.1);
            }

            &::before {
              width: 40px;
              height: 40px;
              opacity: 0.1;
            }
          }

          &:active {
            transform: translateY(0) scale(0.95);
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

          .resource-link {
            height: 22px;

            a {
              width: 22px;
              height: 22px;

              svg {
                width: 12px;
                height: 12px;
              }
            }
          }
        }

        .resource-title {
          font-size: 13px;
          line-height: 22px;
          height: 22px;
          gap: 5px;

          .platform-icon-inline {
            svg {
              width: 13px;
              height: 13px;
            }

            .platform-text-inline {
              font-size: 10px;
            }
          }
        }

        .resource-meta {
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
            font-size: 9px;
            padding: 1px 5px;

            .type-icon {
              width: 8px;
              height: 8px;
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
