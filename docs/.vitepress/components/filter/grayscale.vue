<script setup>
import { ref } from 'vue'

let grayscale = ref(0)

const loseDeg = () => {
    grayscale.value -= 10
}

const addDeg = () => {
    grayscale.value += 10
}

const reset = () => {
    grayscale.value = 0
}
</script>

<template>
    <div class="ifrname-box">
        <p id="title">效果展示：</p>
        <div class="box">
            <div class="btns">
                <button @click="loseDeg">- 10灰度</button>
                <button @click="addDeg">+ 10灰度</button>
                <button @click="reset">恢复</button>
            </div>
            <img src="./firefox-logo.svg"
                :style="{'--grayscale': grayscale + '%'}"
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
            filter: grayscale(var(--grayscale));
        }
    }
</style>