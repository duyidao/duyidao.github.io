<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="blog-lis">
    <div class="blog-li" v-for="item in items" :key="item.title">
      <h2>{{ item.title }}</h2>
      <p v-html="item.description"></p>
      <ul v-if="item.subItems">
        <li v-for="subItem in item.subItems" :key="subItem.title">
          <a :href="subItem.link" _target="blank">{{ subItem.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>
