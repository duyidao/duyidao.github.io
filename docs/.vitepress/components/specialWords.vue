<script setup>
defineProps({
  text: {
    type: String,
    default: '默认字段'
  }
})
</script>

<template>
  <span class="special_words terminology">{{ text }}</span>
</template>

<style scoped>
.special_words {
  color: #007bff;
  font-weight: bold;
}
</style>