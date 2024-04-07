<script setup lang="ts">
</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：</p>
    <div class="box">
        <img src="./firefox-logo.svg" alt="">
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
    width: 100%;
    height: 100%;

    img {
        height: 30%;
        width: 30%;
        background: transparent;
        filter: drop-shadow(15px 15px 15px orange);
    }
}
</style>