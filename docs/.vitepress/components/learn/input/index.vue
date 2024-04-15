<script setup>
import { ref } from 'vue'
import inputComp from './input.vue'

const inputValue = ref('daodao')
const inputValueNum = ref(11)
</script>

<template>
  <div class="ifrname-box">
        <p id="title">效果展示：</p>
        <div>
            <div><inputComp v-model:msg="inputValue" /></div>
            <div><inputComp type="textarea"  v-model:msg="inputValue" /></div>
            <div><inputComp type="number" v-model:msg="inputValueNum" /></div>
        </div>
    </div>
</template>

<style scoped>

</style>