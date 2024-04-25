# Vue3组件使用v-model

`v-model` 不是一个 Vue 指令，而是一个语法糖，一个让我们传递值，并且监听修改的简便语法糖。

在 Vue2 中，代码如下：

```vue
<son v-model="a" />

<!-- 实际上可以转变为以下形式 -->

<son :value="a" @input="(e) => {a=e.target.value}" />
```

在 Vue3 中，代码如下：

```vue
<son v-model="a" />

<!-- 实际上可以转变为以下形式 -->

<son :modelValue="a" @update:modelValue="(e) => {a=e.target.value}" />
```

下面来实际业务中使用一下：

- 父组件

  ```vue
  <script setup>
  const show = ref(false)
  </script>
  
  <div>
      <son v-model="show" />
  </div>
  ```

- 子组件

  ```vue
  <script setup>
  let { modelValue } = defineProps({
      modelValue: {
          type: Boolean,
          default: false
      }
  })
  const emit = defineEmits([update:modelValue])
  
  const closeFn = () => {
      emit('update:modelValue', false)
  }
  </script>
  
  <div>
      <button @click="closeFn">
          click me to close
      </button>
  </div>
  ```

这样直接把操作结果绑定到父组件的 `data` ，不需要父组件传值和监听。

同时，不一定需要使用 `modelValue` 这个属性，可以自定义属性键名，代码如下：

- 父组件

  ```vue
  <script setup>
  const show = ref(false)
  </script>
  
  <div>
      <son v-model:sonShow="show" />
  </div>
  ```

- 子组件

  ```vue
  <script setup>
  let { sonShow } = defineProps({
      sonShow: {
          type: Boolean,
          default: false
      }
  })
  const emit = defineEmits([update:sonShow])
  
  const closeFn = () => {
      emit('update:sonShow', false)
  }
  </script>
  
  <div>
      <button @click="closeFn">
          click me to close
      </button>
  </div>
  ```

  此时子组件内所有 `modelValue` 的地方都改成父组件定义的属性键名。

也可以多设置几个 `v-model` ，不过名称不能重复，否则报错。