<script setup>
defineProps({
  url: {
    type: String,
    required: true
  }
})
</script>

<template>
  <iframe width="100%"
    height="auto"
    frameborder="0"
    :src="url"></iframe>
</template>

<style scoped>
iframe {
  min-height: 400px;
}
</style>