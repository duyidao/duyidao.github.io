<script setup>
import { ref } from 'vue'

let deg = ref(90)

const loseDeg = () => {
    if (deg.value <= -360) deg.value = 0
    deg.value -= 30
}

const addDeg = () => {
    if (deg.value >= 360) deg.value = 0
    deg.value += 30
}

const reset = () => {
    deg.value = 0
}
</script>

<template>
    <div class="ifrname-box">
        <p id="title">效果展示：当前度数：{{ deg }}deg</p>
        <div class="box">
            <div class="btns">
                <button @click="loseDeg">- 30度</button>
                <button @click="addDeg">+ 30度</button>
                <button @click="reset">恢复</button>
            </div>
            <img src="./firefox-logo.svg"
                :style="{'--deg': deg + 'deg'}"
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
            filter: hue-rotate(var(--deg));
        }
    }
</style>