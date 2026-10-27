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
  color: var(--color);
  font-style: italic;
  padding: 1px 10px;
  background-color: var(--bg-color);
  border-radius: 8px 8px 0 0;
  border-bottom: 1.5px solid var(--bd-color);
  margin: 0 2.5px;
  position: relative;
  cursor: default;
  transition: all 0.2s ease;

  &.has-glossary {
    cursor: help;
    border-bottom-style: dashed;

    &:hover {
      background-color: var(--bg-color-hover, rgba(100, 150, 255, 0.1));
    }
  }
}

.glossary-tooltip {
  position: fixed;
  z-index: 10000;
  max-width: 350px;
  padding: 12px 16px;
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-border, #e0e0e0);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  backdrop-filter: blur(8px);

  .tooltip-header {
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 14px;
    color: var(--vp-c-text-1, #333);

    .tooltip-en {
      font-weight: 400;
      font-size: 12px;
      color: var(--vp-c-text-2, #666);
      margin-left: 4px;
    }
  }

  .tooltip-desc {
    font-size: 13px;
    line-height: 1.6;
    color: var(--vp-c-text-2, #555);
    margin-bottom: 8px;
  }

  .tooltip-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    .tooltip-tag {
      padding: 2px 8px;
      font-size: 11px;
      background: var(--vp-c-brand-soft, rgba(100, 150, 255, 0.1));
      color: var(--vp-c-brand, #5b8def);
      border-radius: 4px;
    }
  }
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .special_words {
    padding: 0.0625rem 0.625rem;
    border-radius: 0.5rem 0.5rem 0 0;
    border-bottom-width: 0.0938rem;
    margin: 0 0.1563rem;
  }

  .glossary-tooltip {
    max-width: 280px;
    padding: 10px 12px;

    .tooltip-header {
      font-size: 13px;
    }

    .tooltip-desc {
      font-size: 12px;
    }
  }
}
</style>
