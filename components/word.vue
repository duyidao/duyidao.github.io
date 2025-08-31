<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <span class="special_words">{{ text }}</span>
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
}

@media screen and (max-width: 768px) {
  .special_words {
    padding: .0625rem .625rem;
    border-radius: .5rem .5rem 0 0;
    border-bottom-width: .0938rem;
    margin: 0 .1563rem;
  }
}
</style>