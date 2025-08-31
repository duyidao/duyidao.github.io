<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  name: String,
  width: {
    type: [String, Number],
    default: 20
  },
  height: {
    type: [String, Number],
    default: 20
  },
  color: {
    type: String,
    default: 'currentColor'
  }
});
</script>

<template>
  <Icon
    :icon="name"
    :width="width"
    :height="height"
    :style="{ color }"
    class="inline-block"
  />
</template>