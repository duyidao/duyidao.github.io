<script setup>
import { ref } from 'vue'
import Dialog from './dialog.vue'

const show = ref(false)
</script>

<template>
    <div class="ifrname-box">
        <p id="title">效果展示：</p>
        <div>
            <button @click.stop="show = true">click me</button>
        </div>
        <Dialog v-model:show="show" width="600" marginTop="200">
            <template #title>
                <div>
                    信息标题
                </div>
            </template>
            <template #content>
                <div>
                    知识应该共享
                </div>
            </template>
        </Dialog>
    </div>
</template>

<style scoped></style>