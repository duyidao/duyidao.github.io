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
    height="600"
    frameborder="0"
    :src="url"></iframe>
</template>

<style scoped></style>