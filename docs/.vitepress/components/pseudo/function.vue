<script setup
  lang="ts">
</script>

<template>
  <div class="ifrname-box">
    <p id="title">效果展示：</p>
    <div class="where">
      <p class="title-2">where：所有p标签和div标签下的span添加颜色</p>
      <div class="box-where">
        <p><span>p标签内的span内容</span></p>
        <div><span>div标签内的span内容</span></div>
        <div><i>div标签内的i内容</i></div>
      </div>
    </div>
    <div class="is">
      <p class="title-2">is：标签变为绿色，span标签单独添加黄色</p>
      <div class="box-is">
        <div><i>p标签内的i内容</i></div>
        <div><span>div标签内的span内容</span></div>
        <div><em>div标签内的em内容</em></div>
      </div>
    </div>
    <div class="has">
      <p class="title-2">has：p标签下有span标签添加颜色</p>
      <div class="box-has">
        <p><span>p标签内的span内容</span></p>
        <p><b>p标签内的b内容</b></p>
        <div><b>div标签内的span内容</b></div>
      </div>
    </div>
    <div class="not">
      <p class="title-2">not：非p标签、且p标签下非span标签的文本颜色不添加颜色</p>
      <div class="box-not">
        <p><span>p标签内的span内容</span></p>
        <p><i>p标签内的i内容</i></p>
        <div><span>div标签内的span内容</span></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  p {
    margin: 0 !important;
  }

  .title-2 {
    font-size: 16px !important;
    font-weight: bold !important;
  }

  .box-where,
  .box-has,
  .box-is,
  .box-not {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .box-where {
    :where(div, p) span {
      color: yellow;
    }
  }

  .box-has {
    &:has(> p) span {
      color: yellow;
    }
  }

  .box-is {
    div {
      color: green !important;
    }
    :is(div, p) span {
      color: yellow;
    }
  }

  .box-not {
    :not(div) :not(i){
      color: yellow !important;
    }
  }
</style>