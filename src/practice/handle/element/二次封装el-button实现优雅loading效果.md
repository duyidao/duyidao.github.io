# 二次封装 el-button 优雅实现 loading 效果

## 前言

先看一个场景：

```vue
<template>
  <div>
    <el-button @click="clickFn1" :loading="loading1">提交</el-button>
    <el-button @click="clickFn2" :loading="loading2">提交</el-button>
    <el-button @click="clickFn3" :loading="loading3">提交</el-button>
    <el-button @click="clickFn4" :loading="loading4">提交</el-button>
    <el-button @click="clickFn5" :loading="loading5">提交</el-button>
    <el-button @click="clickFn6" :loading="loading6">提交</el-button>
  </div>
</template>

<script setup>
const loading1 = ref(false)
const clickFn1 = async () => {
  loading1.value = true
  await fetchData()
  loading1.value = false
}

const loading2 = ref(false)
const clickFn2 = async () => {
  loading2.value = true
  await fetchData()
  loading2.value = false
}

const loading3 = ref(false)
const clickFn3 = async () => {
  loading3.value = true
  await fetchData()
  loading3.value = false
}

// ...省略
</script>
```

可以看到，当有多个按钮时，想要实现按钮 `loading` 效果，就需要写很多重复代码，而且如果以后需要修改 `loading` 的逻辑，就需要修改很多地方，这显然不优雅。

那么，如何二次封装一个 `el-button`？

## 实现

首先需要了解 <word text="Vue" /> 提供的 `useAttrs` 组合式 API。该 API 可获取组件上除 `props` 以外的所有属性，如 `class`、`style` 等属性，以及 `click` 等事件。

因此可利用 `useAttrs` 获取 `el-button` 上除 `props` 以外的所有属性，然后通过 `v-bind` 绑定到 `el-button` 上。

`loading` 属性则在二封组件内部处理，外部使用时只需传点击事件函数即可。

::: code-group

```vue [App.vue]
<script setup>
import MyButton from './components/MyButton.vue'
import { ref } from 'vue'

const data = ref(null)

const clickFn = async () => {
  data.value = await fetchData()
}
</script>

<template>
  <div>
    <MyButton @click="clickFn">提交</MyButton>
  </div>
</template>
```

```vue [src/components/MyButton.vue]
<script setup>
import { ref, useAttrs } from 'vue'

const attrs = useAttrs()

const loading = ref(false)

const click = async () => {
  loading.value = true
  try {
    await attrs.onClick?.()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-button v-bind="attrs" @click="click" :loading="loading">
    <slot />
  </el-button>
</template>
```

:::

## 细化

### 多次绑定

上方代码中，虽实现了效果，但给 `el-button` 绑定了两个 `click` 事件，一个是 `@click` 绑定的事件，另一个是 `v-bind="attr"` 包含的点击事件。

解决方法为，引入 `lodash-es` 的 `omit` 方法，修改 `v-bind` 的参数，剔除 `attr` 中的 `onClick` 属性。也可自己写一个方法剔除。

```vue [src/components/MyButton.vue]
<script setup>
import { ref, useAttrs } from 'vue'
import { omit } from 'lodash-es' // [!code focus]

const attrs = useAttrs()

const loading = ref(false)

const click = async () => {
  loading.value = true
  try {
    await attrs.onClick?.()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!--[!code focus]-->
  <el-button v-bind="omit(attrs, 'onClick')" @click="click" :loading="loading">
    <slot />
  </el-button>
</template>
```

### 父组件继承

在父组件的点击事件中添加一个 `console.log()`，点击一次按钮，控制台会输出两次，因为这些事件都被继承了，需要通过 `inheritAttrs` 来关闭继承。

```vue [src/components/MyButton.vue]
<script setup>
import { ref, useAttrs } from 'vue'
import { omit } from 'lodash-es'

// [!code focus]
defineOption({
  inheritAttrs: false, // [!code focus]
}) // [!code focus]

const attrs = useAttrs()

const loading = ref(false)

const click = async () => {
  loading.value = true
  try {
    await attrs.onClick?.()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-button v-bind="omit(attrs, 'onClick')" @click="click" :loading="loading">
    <slot />
  </el-button>
</template>
```

## 动手实操

<myIframe url="https://example.duyidao.cn/reDevelop/el-button" />
