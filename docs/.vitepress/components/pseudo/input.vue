<script setup lang="ts">
</script>

<template>
  <div class="ifrname-box">
    <h3 id="title">效果展示：</h3>
    <ul>
      <li><a href="javascript:;">无操作链接</a></li>
      <li><a href="javascript:;">鼠标悬停链接</a></li>
      <li><a href="javascript:;">长按链接</a></li>
    </ul>
  </div>
</template>

<style scoped>
a {
  display: block;
}

a:link {
  color: blue
}

a:visited {
  color: #ccc
}

a:hover {
  color: red
}

a:active {
  color: green
}
</style>