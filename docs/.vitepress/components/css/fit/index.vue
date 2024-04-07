<script setup lang="ts">
</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：</p>
    <div class="banner">
        <div class="title">前端搬砖人 每天都努力</div>
    </div>
  </div>
</template>

<style scoped>
  .banner {
    width: 500px;
    height: 250px;
    text-align: center;
    line-height: 250px;
    background-image: linear-gradient(
      45deg,
      #fff 0%,
      #fff 50%,
      #000 50%,
      #000 100%
    );
  }

  .title {
    color: #fff;
    mix-blend-mode: difference;
  }
</style>