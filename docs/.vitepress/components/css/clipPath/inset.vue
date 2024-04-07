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
        width: 100%;
        height: 16rem;
        // height: 18.75rem;
        // line-height: 18.75rem;
        background: url(./cat.png) no-repeat center 100%/100%;

        p.word {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            color: #fff !important;
            font-size: 30px;
            line-height: 16rem;
            animation: fall 3s infinite;
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