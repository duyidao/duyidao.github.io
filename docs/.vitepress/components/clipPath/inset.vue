<script setup>

</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：</p>
    <div class="box">
        <p class="word">A cut cat</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
    .box {
        position: relative;
        width: 300px;
        height: 300px;
        line-height: 300px;
        background: url(./cat.png) no-repeat center 100%/100%;

        p.word {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            color: #fff !important;
            font-size: 30px;
            animation: fall 3s infinite;
            line-height: 300px;
        }
    }

    @keyframes fall {
        0% {
            clip-path: inset(100% 0% 0% 0%);
            transform: translateY(-100%);
        }
        100% {
            clip-path: inset(0% 0% 0% 0%);
        }
    }
</style>