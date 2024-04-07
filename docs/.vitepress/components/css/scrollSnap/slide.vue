<script setup lang="ts">
</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：</p>
    <div class="box">
        <div v-for="item in 3" :key=item class="item">{{ item }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
    width: 100%;
    height: 20rem;
    overflow-y: scroll;
    scroll-snap-type: y proximity;
    scroll-behavior: smooth;

    // 隐藏滚动条
    &::-webkit-scrollbar {
        width: 0;
    }

    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 20rem;
        background-color: yellowgreen;
        color: #fff;
        font-size: 40px;
        scroll-snap-align: start;

        &:first-child {
            background-color: skyblue;
        }

        &:last-child {
            background-color: orange;
        }
    }
}
</style>