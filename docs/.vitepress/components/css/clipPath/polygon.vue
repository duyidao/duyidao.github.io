<script setup>

</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：鼠标移入移出切换</p>
    <div class="box">
        <img src="./cat.png" alt="">
    </div>
  </div>
</template>

<style lang="less" scoped>
    .box {
        width: 30%;
        height: 30%;

        img {
            width: 100%;
            height: 100%;
            display: block;
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            transition: .5s;
        }

        &:hover img {
            clip-path: polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%);
        }
    }
</style>