<script setup>
import { ref } from 'vue'

const props = defineProps({
    // 压缩质量
    quality: {
        type: Number,
        default: 90,
    },
})
const emit = defineEmits(['update:quality'])

// 获取文件选择器ref组件
const imgFile = ref(null)
// 图片上传的数据对象
let imgFileObj = ref({})
// 图片格式字段枚举
const IMG_TYPE = {
    "image/jpeg": "image/jpeg",
    "image/jpg": "image/jpg",
}

// 选择文件
const changeFn = (e) => {
    imgFileObj.value = e.target.files[0]

    // 文件格式不正确
    if (!imgFileObj.value || !IMG_TYPE[imgFileObj.value.type]) {
        setImgFileEmptyFn()
        return alert('请选择正确格式的图片')
    }
    else if (imgFileObj.value.type === 'image/png') {
        setImgFileEmptyFn()
        return alert('png格式的图片暂不适用')
    }
    else {
        // 文件格式正确
        setImgPreview(imgFileObj.value)
    }

}

const originImgSrc = ref('')
const compressedImgSrc = ref('')
const reader = new FileReader() // 文件读取器
const setImgPreview = (imgFile) => {
    if (imgFile instanceof File) {
        reader.onload = async () => {
            originImgSrc.value = reader.result // 原来的图片base64
            await createCompressedImg({
                imgSrc: originImgSrc.value,
                type: imgFile.type,
            }) // 转换后的图片base64
            console.log('originImgSrc.value', originImgSrc.value.length, 'compressedImgSrc.value', compressedImgSrc.value.length);
        }
        reader.readAsDataURL(imgFile)
    }
}

/*
1.需要一个画布
2.需要一个图片并转为base64
3.把图片画到canvas中
4.把canvas质量缩小
*/
const createCompressedImg = ({
    imgSrc,
    type,
}) => {
    const oCan = document.createElement('canvas')
    const oImg = document.createElement('img')
    const ctx = oCan.getContext('2d')

    oImg.src = imgSrc

    return new Promise((resolve) => {
        oImg.onload = () => {
            const imgWidth = oImg.width
            const imgHeight = oImg.height

            oCan.width = imgWidth
            oCan.height = imgHeight

            ctx.drawImage(oImg, 0, 0, imgWidth, imgHeight)

            doCompress(oCan, imgSrc, type)
            resolve(true);
        }
    })
}

const doCompress = (canvas, imgSrc, type) => {
    compressedImgSrc.value = canvas.toDataURL(type, props.quality / 100)
    if (compressedImgSrc.value.length >= imgSrc.length && props.quality >= 10) {
        emit('update:quality', props.quality - 10)
        doCompress(canvas, imgSrc, type)
    }
}

// 文件不符合要求时，隐藏图片组件，清空默认保存的文件数据
const setImgFileEmptyFn = () => {
    imgFile.value.value = ''
    imgFileObj.value = null
    compressedImgSrc.value = ''
    originImgSrc.value = ''
}
</script>

<template>
    <div>
        <input type="file"
            name="file"
            id="imgFile"
            placeholder="请选择图片"
            ref="imgFile"
            @change="changeFn" />
        <div class="box">
            <img v-if="originImgSrc"
                :src="originImgSrc"
                alt="未压缩" />
            <img v-if="compressedImgSrc"
                :src="compressedImgSrc"
                alt="压缩后" />
        </div>
    </div>
</template>

<style lang="less" scoped>
    .box {
        display: flex;
        justify-content: space-between;
        margin-top: .9375rem;

        img {
            display: inline-block;
            width: 300px;
        }
    }
</style>