<script setup lang="ts">
</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：在移动端左右滑动感受效果</p>
    <div class="box">
        <div v-for="item in 3" :key=item class="item">{{ item }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
    display: flex;
    width: 100%;
    height: 12.5rem;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    // 隐藏滚动条
    &::-webkit-scrollbar {
        width: 0;
    }

    .item {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: yellowgreen;
        color: #fff;
        font-size: 40px;
        scroll-snap-align: center;
        scroll-snap-stop: always;

        &:first-child {
            background-color: skyblue;
        }

        &:last-child {
            background-color: orange;
        }
    }
}
</style>