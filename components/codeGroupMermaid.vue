<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Mermaid from 'vitepress-plugin-mermaid/Mermaid.vue'

defineProps({
  id: {
    type: String,
    required: true,
  },
  graph: {
    type: String,
    required: true,
  },
})

const root = ref(null)
const visible = ref(false)
let observer

const sync = () => {
  const block = root.value?.closest('.mermaid-block')
  if (!block || block.classList.contains('active')) visible.value = true
}

onMounted(() => {
  const block = root.value?.closest('.mermaid-block')
  sync()
  if (!block || visible.value) return
  observer = new MutationObserver(sync)
  observer.observe(block, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div ref="root" class="code-group-mermaid">
    <Mermaid v-if="visible" :id="id" class="mermaid" :graph="graph" />
  </div>
</template>
