<script setup>

</script>

<template>
    <div class="ifrname-box">
        <p id="title">效果展示：鼠标移入移出切换</p>
        <div class="box">
            <img src="./cat.png"
                alt="">
            <img src="./dog.png"
                alt="">
        </div>
    </div>
</template>

<style lang="less" scoped>
    .box {
        position: relative;
        width: 150px;
        height: 150px;

        img {
            position: absolute;
            width: 100%;
            height: 100%;
            display: block;
            transition: all 0.5s;
        }

        img:nth-child(2) {
            clip-path: polygon(-30% 0, -30% 0, 0% 50%, -30% 100%, -30% 100%);
        }

        &:hover img:nth-child(2) {
            clip-path: polygon(-30% 0, 100% 0, 110% 50%, 100% 100%, -30% 100%);
        }
    }
</style>