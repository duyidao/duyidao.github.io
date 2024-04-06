<script setup lang="ts">
</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：</p>
    <div class="box">
        <div class="title-1">标题一： fit-content。添加更多的内容查看当内容超出父盒子时的效果。斤斤计较急急急急急急急</div>
        <div class="title-2">标题二： max-content。添加更多的内容查看当内容超出父盒子时的效果。斤斤计较急急急急急急急</div>
        <div class="title-3">标题三： min-content。添加更多的内容查看当内容超出父盒子时的效果</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
    width: 100%;
    padding: 15px;
    background-color: rgb(237, 228, 221);

    div {
        margin-bottom: 10px;
        background-color: rgb(143, 163, 252);

        &.title-1 {
            width: fit-content;
        }

        &.title-2 {
            width: max-content;
        }

        &.title-3 {
            width: min-content;
        }
    }
}
</style>