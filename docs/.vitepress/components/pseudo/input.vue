<script setup lang="ts">
</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：</p>
    <p class="info">点击聚焦后，通过focus-within给label添加背景色</p>
    <p class="info">鼠标选择文本，会有对应样式</p>
    <ul>
      <li>
        单选框组：
        <label class="" for="">单选框1
          <input type="radio" name="radio" id="">
        </label>
        <label class="" for="">单选框2
          <input type="radio" checked name="radio" id="">
        </label>
        <label class="" for="">单选框3
          <input type="radio" name="radio" id="">
        </label>
        <label class="" for="">单选框禁用
          <input type="radio" disabled name="radio" id="">
        </label>
        <label class="" for="">单选框只读
          <input type="radio" readonly name="radio" id="">
        </label>
      </li>
      <li>
        多选框组：
        <label class="" for="">多选框1
          <input type="checkbox" name="checkbox" id="">
        </label>
        <label class="" for="">多选框2
          <input type="checkbox" checked name="checkbox" id="">
        </label>
        <label class="" for="">多选框3
          <input type="checkbox" checked name="checkbox" id="">
        </label>
        <label class="" for="">多选框禁用
          <input type="checkbox" disabled name="checkbox" id="">
        </label>
        <label class="" for="">多选框只读
          <input type="checkbox" readonly name="checkbox" id="">
        </label>
      </li>
      <li>
        <input type="text" placeholder="默认样式生效">
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
label:focus-within {
  border-color: #fff;
  border-style: dashed;
  background: lightcoral;
  color: #fff;
}

input:placeholder-shown {
  background-color: skyblue;
  border: 2px solid darkorange;
  border-radius: 5px;
}

::selection {
  background: red;
  color: #fff;
}

li{
  margin-bottom: 30px;

  &:first-letter {
    font-weight: bold;
    font-size: 4em;
    text-transform: uppercase;
    float: left;
    line-height: 1;
    margin-right: 10px;
  }
}

input {
  margin-right: 10px !important;

  &:checked {
    color: red !important;
  }

  &:disabled {
    color: blue !important;
  }

  &:read-only {
    color: yellow !important;
  }
}
</style>