<script>
import { ref } from 'vue'

const STORAGE_KEY = 'vitepress-theme-base'
const DEFAULT_COLOR = '#f49b00'

const current = ref(DEFAULT_COLOR)
let inited = false

const presets = [
  { name: '琥珀橙', color: '#f49b00' },
  { name: '苍穹蓝', color: '#3b82f6' },
  { name: '青竹绿', color: '#10b981' },
  { name: '玫瑰红', color: '#f43f5e' },
  { name: '紫罗兰', color: '#8b5cf6' },
  { name: '石墨灰', color: '#64748b' },
]

const normalize = (color) => color.trim().toLowerCase()

const apply = (color) => {
  current.value = normalize(color)
  document.documentElement.style.setProperty('--theme-base', current.value)
}

const persist = (color) => {
  apply(color)
  try {
    localStorage.setItem(STORAGE_KEY, current.value)
  } catch (e) {
    /* 隐私模式下忽略写入失败 */
  }
}

const readSaved = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) apply(saved)
  } catch (e) {
    /* 忽略读取失败，沿用默认色 */
  }
}

const sharedState = { current, presets }
</script>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

const { current, presets } = sharedState

const props = defineProps({
  variant: {
    type: String,
    default: 'nav',
  },
})

const open = ref(false)
const root = ref(null)

const choose = (color) => {
  persist(color)
  if (props.variant === 'nav') open.value = false
}

const onCustomInput = (event) => apply(event.target.value)

const onCustomChange = (event) => choose(event.target.value)

const reset = () => choose(DEFAULT_COLOR)

const onClickOutside = (event) => {
  if (root.value && !root.value.contains(event.target)) open.value = false
}

const onKeydown = (event) => {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => {
  if (!inited) {
    readSaved()
    inited = true
  }
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="theme-switcher" :class="`theme-switcher--${variant}`">
    <button
      type="button"
      class="trigger"
      :title="`切换主题色（当前 ${current}）`"
      :aria-expanded="open"
      aria-haspopup="true"
      @click="open = !open"
    >
      <svg class="trigger-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3a9 9 0 0 0 0 18c1.4 0 2-.9 2-1.9 0-.6-.3-1-.6-1.4-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.9-1.8H16a5 5 0 0 0 5-5c0-3.9-4-8.6-9-8.6Z"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
        <circle cx="7.5" cy="11.5" r="1.3" fill="currentColor" />
        <circle cx="11" cy="7.5" r="1.3" fill="currentColor" />
        <circle cx="15.5" cy="8.5" r="1.3" fill="currentColor" />
      </svg>
      <span class="trigger-dot" :style="{ backgroundColor: current }" />
    </button>

    <Transition name="panel">
      <div v-if="open || variant === 'screen'" class="panel">
        <p class="panel-title">主题色</p>
        <div class="swatches">
          <button
            v-for="item in presets"
            :key="item.color"
            type="button"
            class="swatch"
            :class="{ active: current === item.color }"
            :title="item.name"
            :style="{ '--swatch-color': item.color }"
            @click="choose(item.color)"
          />
        </div>
        <div class="panel-footer">
          <label class="custom">
            <span>自定义</span>
            <input
              type="color"
              :value="current"
              @input="onCustomInput"
              @change="onCustomChange"
            />
          </label>
          <button type="button" class="reset" @click="reset">恢复默认</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.theme-switcher {
  position: relative;
  display: flex;
  align-items: center;
}

.trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  transition:
    background-color 0.25s,
    color 0.25s;
}

.trigger:hover,
.trigger[aria-expanded='true'] {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

.trigger-icon {
  width: 20px;
  height: 20px;
}

.trigger-dot {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1.5px solid var(--vp-c-bg);
  transition: background-color 0.25s;
}

.panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 40;
  width: 212px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
}

.panel-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  color: var(--vp-c-text-3);
  letter-spacing: 0.04em;
}

.swatches {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}

.swatch {
  position: relative;
  height: 26px;
  border-radius: 7px;
  background-color: var(--swatch-color);
  transition: transform 0.2s;
}

.swatch:hover {
  transform: translateY(-2px);
}

.swatch.active::after {
  content: '';
  position: absolute;
  inset: -3px;
  border: 2px solid var(--swatch-color);
  border-radius: 10px;
}

.panel-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-divider);
}

.custom {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.custom input {
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: none;
  cursor: pointer;
}

.custom input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.custom input::-webkit-color-swatch {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.reset {
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  transition:
    color 0.25s,
    background-color 0.25s;
}

.reset:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

.panel-enter-active,
.panel-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}

.theme-switcher--nav {
  margin-left: 8px;
}

@media (max-width: 767px) {
  .theme-switcher--nav {
    display: none;
  }
}

.theme-switcher--screen {
  flex-direction: column;
  align-items: stretch;
  margin-top: 24px;
  padding: 0;
}

.theme-switcher--screen .trigger {
  display: none;
}

.theme-switcher--screen .panel {
  position: static;
  width: auto;
  box-shadow: none;
}
</style>
