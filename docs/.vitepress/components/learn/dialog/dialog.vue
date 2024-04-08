<script setup>
const props = defineProps({
    width: [String, Number],
    marginTop: [String, Number],
    fullDialog: Boolean,
    show: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        default: '默认内容'
    },
    title: {
        type: String,
        default: '提示'
    },
    url: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:show', 'cancel', 'comfirm'])

const cancelFn = () => {
    emit('update:show', false)
    emit('cancel')
}

const comfirmFn = () => {
    if (props.url) {
        // 模拟发请求
        window.location.href = props.url
    }
    emit('update:show', false)
    emit('comfirm')
}
</script>

<template>
    <div class="cover"
        v-if="show">
        <!--fullDialog：传递该字段后让弹窗组件全屏显示-->
        <div class="dialog"
            :class="{ 'fullDialog': fullDialog }"
            :style="{ width: width + 'px', marginTop: marginTop + 'px' }">
            <!-- 标题部分 -->
            <div class="title">
                <slot name="title">
                    <div class="default-title">
                        {{ title }}
                    </div>
                </slot>

                <!-- 关闭按钮 -->
                <span class="close-icon"
                    @click.stop="cancelFn">×</span>
            </div>

            <!-- 内容部分 -->
            <div class="content">
                <slot name="content">
                    <div class="default-content">
                        {{ content }}
                    </div>
                </slot>
            </div>

            <!-- 按钮 -->
            <div class="button">
                <div class="default-button">
                    <button @click.stop="cancelFn">取消</button>
                    <button @click.stop="comfirmFn">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.dialog {
    min-width: 200px;
    background-color: #fff;
    width: 50%;
    margin: 50px auto;
}

.dialog.fullDialog {
    width: 100vw !important;
    height: 100vh !important;
    margin: 0 !important;
}

.title {
    position: relative;
    padding: 15px;
}

/* 预制类 */
.center .title,
.center .content {
    text-align: center;
}

.close-icon {
    position: absolute;
    right: 15px;
    top: 10px;
    cursor: pointer;
}

.content {
    padding: 15px;
}

.button {
    padding: 15px;
}

button {
    margin-right: 15px;
}
</style>