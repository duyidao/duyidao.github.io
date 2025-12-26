<script setup>
defineProps({
  url: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="iframe-container">
    <div class="text-lg font-bold iframe-title">
      <span>跳转预览：</span>
      <a :href="url"
        target="_blank">点击跳转</a>
    </div>
    <iframe width="100%"
      height="auto"
      frameborder="0"
      :src="url"></iframe>
  </div>
</template>

<style scoped>
.iframe-container {
  padding: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.1);

  .iframe-title {
    display: flex;
    align-items: center;
    height: 45px;
    margin-bottom: 13px;
    background-color: rgba(0, 0, 0, 0.2);
    padding-left: 13px;
    border-radius: 8px;

    a {
      margin-top: -1%;
    }
  }

  iframe {
    min-height: 600px;
  }
}
</style>