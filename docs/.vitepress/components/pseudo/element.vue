<script setup lang="ts">
</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：</p>
    <div class="box">
      <p>第一个元素</p>
      <div>第二个元素：div</div>
      <p>第二个元素：p</p>
      <p>第三个元素：p</p>
      <p>第四个元素：p</p>
      <p>倒数第二个元素：p</p>
      <div>倒数第二个元素：div</div>
      <p>最后一个元素：p</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
  p, div {
    font-size: 14px;
    margin-bottom: 5px;
  }
  :first-child {
    font-size: 12px;
  }

  :last-child {
    font-size: 20px;
  }

  :nth-child(2) {
    color: red;
  }

  p:nth-of-type(2) {
    color: blue;
  }

  :nth-last-child(2) {
    color: orange;
  }

  p:nth-last-of-type(2) {
    color: green;
  }
}
</style>