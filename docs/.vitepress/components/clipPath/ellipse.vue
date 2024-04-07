<script setup>

</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：</p>
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
            animation: wink 3s infinite;
        }
    }

    @keyframes wink {
        15% {
            clip-path: ellipse(50% 1% at 50% 50%);
        }
        30% {
            clip-path: ellipse(50% 19% at 50% 50%);
        }
        45% {
            clip-path: ellipse(50% 1% at 50% 50%);
        }
        70% {
            clip-path: ellipse(50% 40% at 50% 50%);
        }

        1000% {
            clip-path: ellipse(100% 40% at 50% 50%);
        }
    }
</style>