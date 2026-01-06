---
title: vue动态表单实现原理
author:
  - 远方os vue动态表单实现原理&https://www.bilibili.com/video/BV1Vy3tzjEZZ
---

# vue动态表单实现原理

## 基础封装

首先实现一个基础封装，根据父组件传入的配置项 `formItem` 生成对应的表单项，再和父组件传入的 `formData` 进行双向绑定。

`formItem` 配置项：

- `label`：表单项的标签
- `type`：表单项的类型，如 `input`、`select`、`radio` 等
- `key`：表单项的 key，用于和 `formData` 进行绑定
- `rules`：表单项的校验规则
- `props`：表单项的属性，如 `options`、`placeholder` 等

在子组件中，通过 `v-for` 循环遍历 `formItem`，根据 `type` 使用 `component` 动态组件动态渲染对应的表单组件，并使用 `v-model` 进行双向绑定。用计算属性来提取出全部的校验规则。

最后如果有需要，可以将 `el-form` 组件的方法暴露出去给父组件使用。例如，可以提供一个 `validate` 方法，用于手动触发表单校验；或者提供一个 `resetFields` 方法，用于重置表单。

::: code-group

```vue [index.vue]
<script setup lang="ts">
import FormBuilder from './formBuilder.vue'
import { ref, useTemplateRef } from 'vue'

const formItems = [
  {
    label: '姓名',
    key: 'name',
    type: 'input',
    rules: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    props: {
      placeholder: '请输入姓名',
    }
  },
  {
    label: '年龄',
    key: 'age',
    type: 'number',
    rules: [
      { required: true, message: '请输入年龄', trigger: ['blur', 'change'] },
    ],
    props: {
      placeholder: '请输入年龄',
    }
  },
]

const formData = ref({
  name: '',
  age: null,
})

const formBuilderRef = useTemplateRef('formBuilderRef')

setTimeout(() => {
  formBuilderRef.value?.validate((e) => {
    console.log('验证结果', e)
  })
}, 3000)
</script>

<template>
  <div>
    <FormBuilder ref="formBuilderRef" :formItems="formItems" v-model="formData" />
  </div>
</template>

<style scoped>

</style>
```

```vue [formBuilder.vue]
<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElInputNumber } from 'element-plus'
import { computed, getCurrentInstance } from 'vue'

const props = defineProps<{
  formItems: {
    label: string
    type: string
    key: string
    props?: any
    rules?: any[]
  }
}>()

const formData = defineModel()

const formRules = computed(() => {
  let rules = {}
  props.formItems.forEach(item => rules[item.key] = item.rules)
  return rules
})

const formItemDict = {
  input: ElInput,
  number: ElInputNumber
}

const vm = getCurrentInstance(); 
function changeRef(inputInstance) {
  vm.exposed = vm.exposeProxy = inputInstance || {}; 
} 
</script>

<template>
  <el-form :ref="changeRef" :model="formData" :rules="formRules">
    <el-form-item v-for="item in formItems" :key="item.key" :label="item.label" :prop="item.key">
      <component :is="formItemDict[item.type]" v-model="formData[item.key]" v-bind="item.props"></component>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
```

:::

此处子组件暴露方法可以一个个暴露，也可以通过 `getCurrentInstance` 获取到 `expose`，然后通过 `expose` 将方法暴露出去。具体的使用可以查看往期文档 [二次封装组件库组件](/learn/element/twice#proxy-代理暴露)。

后续还能在父组件中添加提交按钮和重置按钮，分别调用表单子组件的 `validate` 和 `resetFields` 方法。

## 参数精简

在上面的代码中，我们使用了 `v-bind` 将 `props` 中的属性传递给表单组件，有时候一些表单只有一个 `placeholder` 属性需要绑定，但是还是写一个 `props` 对象显得有些多余。能不能直接写在外部呢？子组件里通过判断哪些是 `props` 属性，再 `v-bind` 传递呢？

查看所有的属性，不难发现规律，`label` 是 `form-item` 需要用来显示的属性；`key` 是 `form-item` 需要用来和 `form-data` 进行绑定的属性；`rules` 是 `form-item` 需要用来进行校验的属性；`type` 是用来表示要渲染的是啥组件。剩下的都是 `props` 属性。

因此，我们可以写一个属性白名单，将 `label`、`key`、`rules`、`type` 放入白名单，剔除掉这五个属性，剩下的就是 `props` 属性了。

::: code-group

```vue [index.vue]
<script setup lang="ts">
import FormBuilder from './formBuilder.vue'
import { ref, useTemplateRef } from 'vue'
import { useResetRefByObj } from '@/views/hook/stateReset/reset'
import MyButton from '@/views/reDevelop/el-button/myButton.vue'

const formItems = [
  {
    label: '姓名',
    key: 'name',
    type: 'input',
    rules: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    placeholder: '请输入姓名', // [!code focus]
  },
  {
    label: '年龄',
    key: 'age',
    type: 'number',
    rules: [
      { required: true, message: '请输入年龄', trigger: ['blur', 'change'] },
    ],
    placeholder: '请输入年龄', // [!code focus]
  },
  {
    label: '性别',
    key: 'sex',
    type: 'select',
    rules: [
      { required: true, message: '请选择年龄', trigger: ['blur', 'change'] },
    ],
    // [!code focus]
    props: {
      placeholder: '请选择年龄', // [!code focus]
      options: [ // [!code focus]
        { label: '男', value: 1 }, // [!code focus]
        { label: '女', value: 2 }, // [!code focus]
      ] // [!code focus]
    } // [!code focus]
  },
]

const { state: formData, reset } = useResetRefByObj({
  name: '',
  age: null,
  sex: null
})

const formBuilderRef = useTemplateRef('formBuilderRef')

const handleSubmit = async () => {
  await formBuilderRef.value?.validate()
  return new Promise((resolve, reject) => {
    // 模拟调用接口
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

const handleReset = () => {
  reset()
  formBuilderRef.value?.resetFields()
}
</script>

<template>
  <div>
    <FormBuilder ref="formBuilderRef" :formItems="formItems" v-model="formData" />
    <MyButton @click="handleSubmit">提交</MyButton>
    <el-button @click="handleReset">重置</el-button>
  </div>
</template>

<style scoped>

</style>
```

```vue [formBuilder.vue]
<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElInputNumber, ElSelect } from 'element-plus'
import { computed, getCurrentInstance } from 'vue'

const props = defineProps<{
  formItems: {
    label: string
    type: string
    key: string
    props?: any
    rules?: any[]
  }
}>()

const formData = defineModel()

// 表单校验规则
const formRules = computed(() => {
  let rules = {}
  props.formItems.forEach(item => rules[item.key] = item.rules)
  return rules
})

// 表单组件字典
const formItemDict = {
  input: ElInput,
  number: ElInputNumber,
  select: ElSelect,
}

// 属性白名单 // [!code focus]
const rootProps = ['type', 'key', 'label', 'rules'] // [!code focus]

// [!code focus]
const getProps = (item) => {
  if (item.props) return item.props // [!code focus]
  let props = {} // [!code focus]
  // [!code focus]
  for (let key in item) {
    if (rootProps.includes(key)) continue // [!code focus]
    props[key] = item[key] // [!code focus]
  } // [!code focus]
  return props // [!code focus]
} // [!code focus]

// el-form方法暴露给父组件
const vm = getCurrentInstance(); 
function changeRef(inputInstance) {
  vm.exposed = vm.exposeProxy = inputInstance || {}; 
} 
</script>

<template>
  <el-form :ref="changeRef" :model="formData" :rules="formRules">
    <el-form-item v-for="item in formItems" :key="item.key" :label="item.label" :prop="item.key">
      <!-- ![code focus] -->
      <component :is="formItemDict[item.type]" v-model="formData[item.key]" v-bind="getProps(item)"></component>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
```

:::

> [!INFO] 备注
>
> 1. 关于 `index.vue` 中的 `useResetRefByObj` 方法，用来重置数据，具体可查看文档 [Vue 组件状态重置](/learn/vue/reset)
> 2. 关于 `index.vue` 中的 `MyButton` 组件，是基于 `el-button` 二次封装 `loading` 方法，具体可查看文档 [二次封装 el-button 优雅实现 loading 效果](/learn/element/button)

## 事件绑定

额外提一嘴如何给每一个表单绑定事件，比如 `blur`、`change` 等。<word text="Vue" />的底层源码中，事件都会被转换为 `on` 开头 + 事件名首字母大写的形式，比如 `blur` 事件，在 `Vue` 中会被转换为 `onBlur`。

因此，在属性中添加对应的事件，子组件会通过 `v-bind` 把这些事件绑定到对应的组件上。

```ts [index.vue]
const formItems = [
  {
    label: '姓名',
    key: 'name',
    type: 'input',
    rules: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    placeholder: '请输入姓名',
    // [!code focus]
    onChange: (val: string) => {
      console.log(val) // [!code focus]
    } // [!code focus]
  },
  {
    label: '年龄',
    key: 'age',
    type: 'number',
    rules: [
      { required: true, message: '请输入年龄', trigger: ['blur', 'change'] },
    ],
    placeholder: '请输入年龄',
  },
  {
    label: '性别',
    key: 'sex',
    type: 'select',
    rules: [
      { required: true, message: '请选择年龄', trigger: ['blur', 'change'] },
    ],
    props: {
      placeholder: '请选择年龄',
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ]
    }
  },
]
```

## 组件自定义与默认

目前都是传的 `type`，在子组件中根据 `type` 来决定渲染什么组件。如果说有一些组件就一个页面需要使用，直接在子组件里的字典对象添加显得有点冗余。

父组件把自定义组件通过 `type` 属性传递给子组件，子组件判断一下 `type` 的类型，如果是字符串，就从字典对象里获取对应要渲染的组件；反之说明是自定义组件，直接渲染即可。

::: code-group

```ts [index.vue]
const formItems = [
  // ... 省略
  {
    label: '自定义组件',
    key: 'MyButton',
    type: MyButton,
    props: {
      text: '自定义按钮'
    }
  },
]
```

```vue [formBuilder.vue]
<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElInputNumber, ElSelect } from 'element-plus'
import { computed, getCurrentInstance } from 'vue'

const props = defineProps<{
  formItems: {
    label: string
    type: string
    key: string
    props?: any
    rules?: any[]
  }
}>()

const formData = defineModel()

// 表单校验规则
const formRules = computed(() => {
  let rules = {}
  props.formItems.forEach(item => rules[item.key] = item.rules)
  return rules
})

// 表单组件字典
const formItemDict = {
  input: ElInput,
  number: ElInputNumber,
  select: ElSelect,
}

// 属性白名单
const rootProps = ['type', 'key', 'label', 'rules']

/**
 * 获取表单项的props
 * @param item 表单项
 * @returns 表单项的props
 */
const getProps = (item) => {
  if (item.props) return item.props
  let props = {}
  for (let key in item) {
    if (rootProps.includes(key)) continue
    props[key] = item[key]
  }
  return props
}

// [!code focus]
/** 
 // [!code focus]
 * 获取表单项的组件 
 // [!code focus]
 * @param item 表单项 
 // [!code focus]
 * @returns 表单项的组件 
 // [!code focus]
 */ 
 // [!code focus]
const getComponent = (item) => {
  const { type } = item // [!code focus]
  if (typeof type === 'string') { // [!code focus]
    return formItemDict[type] // [!code focus]
  } // [!code focus]
  return type // [!code focus]
} // [!code focus]

// el-form方法暴露给父组件
const vm = getCurrentInstance(); 
function changeRef(inputInstance) {
  vm.exposed = vm.exposeProxy = inputInstance || {}; 
} 
</script>

<template>
  <el-form :ref="changeRef" :model="formData" :rules="formRules">
    <el-form-item v-for="item in formItems" :key="item.key" :label="item.label" :prop="item.key">
      <!-- [!code focus] -->
      <component :is="getComponent(item)" v-model="formData[item.key]" v-bind="getProps(item)"></component>
    </el-form-item>
  </el-form>
</template>
```

:::

还有一种情况，一般 `input` 组件比较常用，能不能不传让它默认展示 `input` 呢？

修改一下 `formBuilder.vue` 中的 `getComponent` 方法，如果 `type` 为空，则默认返回 `input` 组件。

```ts
const getComponent = (item) => {
  const { type } = item
  if (type && typeof type !== 'string') {
    return type
  }
  return formItemDict[type || 'input']
}
```

## 插槽

还要考虑到，有些组件不想要子组件来处理，而是在父组件中处理，在父组件中使用具名插槽来加载组件。

此时，只需要修改一下子组件的代码，在 `el-form-item` 中添加一个 `slot` 属性，用来标识插槽的名称，默认内容还是动态组件 `<component>`。这样，如果父组件传了具名插槽，就渲染具名插槽的内容，反之渲染动态组件。

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { AddLocation } from '@element-plus/icons-vue'

const formItems = [
  // ... 省略
  { // [!code focus]
    label: '地址', // [!code focus]
    key: 'address', // [!code focus]
    placeholder: '请输入地址', // [!code focus]
  }, // [!code focus]
  {
    label: '自定义组件',
    key: 'MyButton',
    type: MyButton,
    props: {
      text: '自定义按钮'
    }
  },
]

// ... 省略
</script>

<template>
  <div>
    <FormBuilder ref="formBuilderRef" :formItems="formItems" v-model="formData">
      <!-- [!code focus] -->
      <template #address>
      <!-- [!code focus] -->
        <el-input v-model="formData.address" placeholder="请输入地址" :suffix-icon="AddLocation"></el-input>
      <!-- [!code focus] -->
      </template>
    </FormBuilder>
    <!-- ... 省略 -->
  </div>
</template>
```

```vue [formBuilder.vue]
<!-- ... 省略 -->

<template>
  <el-form :ref="changeRef" :model="formData" :rules="formRules">
    <el-form-item v-for="item in formItems" :key="item.key" :label="item.label" :prop="item.key">
      <!-- [!code focus] -->
      <slot :name="item.key">
        <component :is="getComponent(item)" v-model="formData[item.key]" v-bind="getProps(item)"></component>
      <!-- [!code focus] -->
      </slot>
    </el-form-item>
  </el-form>
</template>
```

:::

## 其他功能

### 动态隐藏

有时候有一些表单项是动态的，比如地址栏，假设用户姓名输入了“张三”，则隐藏地址栏，否则显示地址栏。

综上条件，需要把父组件的 `formItems` 改为响应式属性 `computed`，在需要动态显隐的表单数据项中添加 `hidden` 属性，`true` 则隐藏，`false` 则显示。

在子组件 `formBuilder.vue` 中用 `computed` 计算属性过滤掉 `hidden` 为 `true` 的数据，剩余的都是需要展示的数据。

```vue [formBuilder.vue]
<script setup lang="ts">
const form = computed(() => props.formItems.filter(item => !item.hidden)) // [!code focus]

// ... 省略
</script>

<template>
  <el-form :ref="changeRef" :model="formData" :rules="formRules">
    <!-- [!code focus] -->
    <el-form-item v-for="item in form" :key="item.key" :label="item.label" :prop="item.key">
      <slot :name="item.key">
        <component :is="getComponent(item)" v-model="formData[item.key]" v-bind="getProps(item)"></component>
      </slot>
    </el-form-item>
  </el-form>
</template>
```

### 栅格布局

还有栅格布局的情况，使用者希望某些表单同一行展示，此时需要修改一下子组件代码，`v-for` 不再遍历 `el-form-item`，而是遍历 `el-col`，然后根据 `span` 属性来决定是否换行。如果传了 `span` 属性，使用用户传的，反之默认 24。

```vue [formBuilder.vue]
<template>
  <el-form :ref="changeRef" :model="formData" :rules="formRules">
    <!-- [!code focus] -->
    <el-row :gutter="20">
    <!-- [!code focus] -->
      <el-col v-for="item in form" :key="item.key" :span="item.span || 24">
    <!-- [!code focus] -->
        <el-form-item :label="item.label" :prop="item.key">
          <slot :name="item.key">
            <component :is="getComponent(item)" v-model="formData[item.key]" v-bind="getProps(item)"></component>
          </slot>
        </el-form-item>
    <!-- [!code focus] -->
      </el-col>
    <!-- [!code focus] -->
    </el-row>
  </el-form>
</template>
```
