<script setup lang="ts">
import { ref, computed } from 'vue'
import glossaryData from '../src/术语词汇表.json'

const props = defineProps<{
  text: string
}>()

const showTooltip = ref(false)
const tooltipPosition = ref({ x: 0, y: 0 })

const glossaryInfo = computed(() => {
  return glossaryData[props.text as keyof typeof glossaryData] || null
})

function handleMouseEnter(event: MouseEvent) {
  if (!glossaryInfo.value) return
  showTooltip.value = true
  tooltipPosition.value = {
    x: event.clientX,
    y: event.clientY,
  }
}

function handleMouseMove(event: MouseEvent) {
  if (!showTooltip.value) return
  tooltipPosition.value = {
    x: event.clientX,
    y: event.clientY,
  }
}

function handleMouseLeave() {
  showTooltip.value = false
}
</script>

<template>
  <span
    class="special_words"
    :class="{ 'has-glossary': glossaryInfo }"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    {{ text }}
    <Teleport to="body">
      <Transition name="tooltip-fade">
        <div
          v-if="showTooltip && glossaryInfo"
          class="glossary-tooltip"
          :style="{
            left: `${tooltipPosition.x + 15}px`,
            top: `${tooltipPosition.y - 10}px`,
          }"
        >
          <div class="tooltip-header">
            <span class="tooltip-title">{{ glossaryInfo.cn }}</span>
            <span class="tooltip-en" v-if="glossaryInfo.en !== glossaryInfo.cn"
              >({{ glossaryInfo.en }})</span
            >
          </div>
          <div class="tooltip-desc">{{ glossaryInfo.descript }}</div>
          <div
            class="tooltip-tags"
            v-if="glossaryInfo.tags && glossaryInfo.tags.length"
          >
            <span
              v-for="tag in glossaryInfo.tags"
              :key="tag"
              class="tooltip-tag"
              >{{ tag }}</span
            >
          </div>
        </div>
      </Transition>
    </Teleport>
  </span>
</template>

<style lang="less" scoped>
.special_words {
  display: inline-block;
  padding: 0.05em 0.45em;
  margin: 0 0.15em;
  color: var(
    --custom-word-color,
    color-mix(in srgb, var(--theme-base) 79%, #000)
  );
  font-style: normal;
  font-weight: 500;
  line-height: 1.45;
  background-color: var(
    --custom-word-highlight,
    color-mix(in srgb, var(--theme-base) 20%, transparent)
  );
  border-radius: 6px;
  border-bottom: 1px dashed
    var(
      --custom-word-underline,
      color-mix(in srgb, var(--theme-base) 60%, transparent)
    );
  position: relative;
  cursor: default;
  transition:
    color 0.22s ease,
    background-color 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    transform 0.22s ease;

  &.has-glossary {
    cursor: help;

    &:hover {
      color: var(--custom-word-color-hover, var(--theme-base));
      background-color: var(
        --custom-word-bg-hover,
        color-mix(in srgb, var(--theme-base) 16%, transparent)
      );
      border-bottom-style: solid;
      border-bottom-color: var(--custom-word-color-hover, var(--theme-base));
      transform: translateY(-1px);
      box-shadow: 0 2px 8px -2px
        var(
          --custom-word-shadow,
          color-mix(in srgb, var(--theme-base) 30%, transparent)
        );
    }

    &:active {
      transform: translateY(0);
    }
  }
}

.glossary-tooltip {
  position: fixed;
  z-index: 10000;
  max-width: 360px;
  padding: 14px 18px;
  background: var(--custom-tooltip-bg, rgba(255, 255, 255, 0.92));
  border: 1px solid
    var(
      --custom-tooltip-border,
      color-mix(in srgb, var(--theme-base) 22%, var(--vp-c-divider))
    );
  border-radius: 10px;
  box-shadow: 0 8px 28px -8px var(--custom-tooltip-shadow, rgba(0, 0, 0, 0.16));
  pointer-events: none;
  backdrop-filter: blur(10px) saturate(140%);
  -webkit-backdrop-filter: blur(10px) saturate(140%);

  .tooltip-header {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px dashed
      var(
        --custom-tooltip-border,
        color-mix(in srgb, var(--theme-base) 22%, var(--vp-c-divider))
      );
    font-weight: 600;
    font-size: 14px;
    line-height: 1.4;
    color: var(--vp-c-text-1, #333);

    .tooltip-en {
      font-weight: 400;
      font-size: 12px;
      font-style: italic;
      color: var(--vp-c-text-2, #666);
    }
  }

  .tooltip-desc {
    font-size: 13px;
    line-height: 1.7;
    color: var(--vp-c-text-2, #555);
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .tooltip-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    .tooltip-tag {
      padding: 2px 9px;
      font-size: 11px;
      line-height: 1.6;
      background: var(
        --custom-tooltip-tag-bg,
        color-mix(in srgb, var(--theme-base) 14%, transparent)
      );
      color: var(--vp-c-brand-1, var(--theme-base));
      border: 1px solid
        var(
          --custom-tooltip-tag-border,
          color-mix(in srgb, var(--theme-base) 30%, transparent)
        );
      border-radius: 999px;
    }
  }
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

@media screen and (max-width: 768px) {
  .special_words {
    padding: 0.0625rem 0.3125rem;
    margin: 0 0.0938rem;
    border-radius: 0.25rem;
  }

  .glossary-tooltip {
    max-width: 280px;
    padding: 12px 14px;

    .tooltip-header {
      font-size: 13px;
    }

    .tooltip-desc {
      font-size: 12px;
    }
  }
}
</style>
