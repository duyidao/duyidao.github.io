# <word text="Vue" /> 动态表单实现原理

## 基础封装

首先实现基础封装，根据父组件传入的配置项 `formItem` 生成对应表单项，再与父组件传入的 `formData` 进行双向绑定。

`formItem` 配置项：

- `label`：表单项标签
- `type`：表单项类型，如 `input`、`select`、`radio` 等
- `key`：表单项 key，用于与 `formData` 绑定
- `rules`：表单项校验规则
- `props`：表单项属性，如 `options`、`placeholder` 等

子组件中通过 `v-for` 循环遍历 `formItem`，根据 `type` 使用 `component` 动态组件渲染对应表单组件，并使用 `v-model` 进行双向绑定。用计算属性提取全部校验规则。

最后若有需要，可将 `el-form` 组件的方法暴露给父组件使用。例如提供 `validate` 方法用于手动触发表单校验；或提供 `resetFields` 方法用于重置表单。

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

此处子组件暴露方法可逐个暴露，也可通过 `getCurrentInstance` 获取 `expose`，然后通过 `expose` 将方法暴露出去。具体用法可参考 [二次封装组件库组件](/handle/element/二次封装组件库组件#proxy-代理暴露)。

后续还可在父组件中添加提交按钮和重置按钮，分别调用表单子组件的 `validate` 和 `resetFields` 方法。

## 参数精简

上述代码中使用 `v-bind` 将 `props` 属性传递给表单组件，有时表单只有一个 `placeholder` 属性需要绑定，写一个 `props` 对象显得多余。能否直接写在外部，子组件通过判断哪些是 `props` 属性再 `v-bind` 传递？

查看所有属性可发现规律：`label` 是 `form-item` 用于显示的属性；`key` 是用于与 `form-data` 绑定的属性；`rules` 是用于校验的属性；`type` 表示渲染哪个组件。其余均为 `props` 属性。

因此可写一个属性白名单，将 `label`、`key`、`rules`、`type` 放入白名单，剔除后剩余即为 `props` 属性。

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
> 1. 关于 `index.vue` 中的 `useResetRefByObj` 方法，用来重置数据，具体可查看文档 [Vue 组件状态重置](/idea/vue/组件状态重置)
> 2. 关于 `index.vue` 中的 `MyButton` 组件，是基于 `el-button` 二次封装 `loading` 方法，具体可查看文档 [二次封装 el-button 优雅实现 loading 效果](/handle/element/二次封装el-button实现优雅loading效果)

## 事件绑定

额外提一下如何给每个表单绑定事件，如 `blur`、`change` 等。<word text="Vue" /> 底层源码中，事件会被转换为 `on` 开头 + 事件名首字母大写的形式，如 `blur` 事件在 <word text="Vue" /> 中会被转为 `onBlur`。

因此，在属性中添加对应事件，子组件会通过 `v-bind` 将这些事件绑定到对应组件上。

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

目前都是通过 `type` 决定子组件渲染什么。若某些组件仅一个页面使用，直接在子组件字典对象中添加显得冗余。

父组件可将自定义组件通过 `type` 属性传递给子组件，子组件判断 `type` 类型：若为字符串，从字典对象获取对应组件；否则为自定义组件，直接渲染即可。

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

还有另一种情况：`input` 组件比较常用，能否不传让它默认展示 `input`？

修改 `formBuilder.vue` 中的 `getComponent` 方法，若 `type` 为空则默认返回 `input` 组件。

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

## 动手实操

<myIframe url="https://example.duyidao.cn/reDevelop/el-form" />