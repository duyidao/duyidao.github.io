<script setup>
import { onMounted } from "vue";

onMounted(() => {
    const box = document.querySelector('.box')
    console.log(box)
    const w = box.clientWidth
    box.style.setProperty('--w', w + 'px')
});
</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：</p>
    <div class="box">
        <div class="item"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
    width: 15.625rem;
    height: 6.25rem;
    border: 1px solid #000;
    background-color: #fff;

    .item {
        width: 1.875rem;
        height: 1.875rem;
        border-radius: 50%;
        background-color: red;
        animation: move 3s linear infinite;
    }
}

@keyframes move {
    50% {
        transform: translateX(calc(var(--w) - 100%))
    }
}
</style>