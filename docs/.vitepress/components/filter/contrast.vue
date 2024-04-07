<script setup>
import { ref } from 'vue'

let contrast = ref(100)

const loseDeg = () => {
    contrast.value -= 20
}

const addDeg = () => {
    contrast.value += 20
}

const reset = () => {
    contrast.value = 100
}
</script>

<template>
    <div class="ifrname-box">
        <p id="title">效果展示：当前对比度：{{ contrast }}%</p>
        <div class="box">
            <div class="btns">
                <button @click="loseDeg">- 20对比度</button>
                <button @click="addDeg">+ 20对比度</button>
                <button @click="reset">恢复</button>
            </div>
            <img src="./firefox-logo.svg"
                :style="{'--contrast': contrast + '%'}"
                alt="">
        </div>
    </div>
</template>

<style lang="less" scoped>
    .box {
        width: 100%;
        height: 100%;

        .btns {
            display: flex;
            align-items: center;
            margin-bottom: 15px;

            button {
                width: 100px;
                height: 40px;
                background-color: #aaa;
                color: #fff;
                margin-right: 15px;
            }
        }

        img {
            height: 30%;
            width: 30%;
            filter: contrast(var(--contrast));
        }
    }
</style>