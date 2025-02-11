# 从Vue2、Vue3不更新学Vue原理

## Vue2

### 常见不更新原因

1. 对于对象新增初始化没有的属性，或者删除
2. 对于数组用了下标修改
3. 把 DOM 用 `innerHTML` 操作了内容
4. 在 `mounted` 里对数据赋值，来源数据变更没更新（`vuex`、`vuerouter`）

::: code-group
```vue [对象不更新.vue]
<template>
  <div>{{ obj }}</div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        a: 1,
      }
    }
  },
  mounted() {
    this.obj.a = 2 // 页面正常更新
    setTimeout(() => {
      this.obj.b = 234
      console.log(this.obj) // 控制台打印数据有更新，页面没更新
    }, 1000)
  }
}
</script>
```
```vue [数组不更新.vue]
<template>
  <div>{{ arr }}</div>
</template>

<script>
export default {
  data() {
    return {
      arr: [1, 2, 3]
    }
  },
  mounted() {
    this.arr.push(4) // 页面正常更新
    setTimeout(() => {
      this.arr[0] = 234
      console.log(this.arr) // 控制台打印数据有更新，页面没更新
    }, 1000)
  }
}
</script>
```
```vue [innerHTML操作DOM.vue]
<template>
  <div id="mydom">{{ arr }}</div>
</template>

<script>
export default {
  data() {
    return {
      arr: [1, 2, 3]
    }
  },
  mounted() {
    document.getElementById('mydom').innerHTML = 999
    setTimeout(() => {
      this.arr.push(4) // DOM不更新，内容还是999，因为DOM被操作了导致失去了对arr的依赖
    }, 1000)
  }
}
</script>
```
```vue [mounted数据赋值没更新.vue]
<template>
  <header v-if="path !== '/login'">头部</header>
  <!-- Vue路由切换实际上只是切换router-view组件的内容，header不变 -->
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      path: ''
    }
  },
  mounted() {
    // mounted函数只执行一次，如果一开始进入登录页，header能够隐藏；如果一开始进入的是首页，后面才跳转到登录页，此时mounted不再执行，头部也不会隐藏
    this.path = this.$router.path
  }
}
</script>
```
```vue [vuex变量保存到data导致后续vuex数据更新内容没更新.vue]
<template>
  <div>{{ data }}</div>
</template>

<script>
import { params } from '@/store'
export default {
  data() {
    return {
      data: params
    }
  },
}
</script>
```
:::

上方代码示例四中，Vue 路由切换实际上只是切换 `router-view` 组件的内容，整个组件的 `mounted` 生命周期函数只执行一次，如果一开始进入登录页，`header` 能够隐藏；如果一开始进入的是首页，后面才跳转到登录页，此时 `mounted` 不再执行，头部也不会隐藏.

上方代码示例五中，`mounted` 里对 `data` 赋值，来源数据变更没更新，原因在于 `data` 保存了 `params` 的值，而 Vue 的更新机制是引用才更新，而该组件没有 `params` 变量的依赖，因此 `params` 数据更新组件也不会更新。

### 解决方案

1. `$set`
2. 对象、数组用整个替换的方式修改
3. `forceUpdate`

::: code-group
```vue [$set.vue]
<template>
  <div>{{ obj }}</div>
  <div>{{ arr }}</div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        a: 1,
      },
      arr: [1, 2, 3]
    }
  },
  mounted() {
    this.$set(this.obj, 'b', 234)
    this.$set(this.arr, 0, 234)
  }
}
</script>
```
```vue [整个替换.vue]
<template>
  <div>{{ obj }}</div>
  <div>{{ arr }}</div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        a: 1,
      },
      arr: [1, 2, 3]
    }
  },
  mounted() {
    this.obj = { a: 1, b: 234 }
    let _arr = this.arr
    _arr[0] = 234
    this.arr = _arr
  }
}
</script>
```
```vue [forceUpdate.vue]
<template>
  <div>{{ obj }}</div>
  <div>{{ arr }}</div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        a: 1,
      },
      arr: [1, 2, 3]
    }
  },
  mounted() {
    this.obj.b = 2
    this.arr.[2] = 5
    this.$forceUpdate()
  }
}
</script>
```
:::

## Vue3

### 常见不更新原因

1. 使用了 `shallowRef`
2. 用错了 `ref` 和 `reactive`

::: code-group
```vue [shallowRef.vue]
<script setup>
const data = shallowRef({
  a: 1,
  b: {
    c: 2
  }
})

data.value.a = 3 // 页面不更新
</script>
```
```vue [ref与reactive.vue]
<script setup>
const obj = reactive({
  a: 123
})
</script>
```
:::

`shallowRef` 只会代理第一层，其内部的数据不会有响应式，所以修改 `data.value.a` 不会触发更新。

`reactive` 会把整个对象变为 `Proxy` 对象，修改其中的属性可以触发更新；但是如果直接替换整个对象，会让它失去 `Proxy` 代理，从而失去响应式。

### 解决方案

1. 只有明确内部属性不需要单独修改才使用 `shallowRef`，如果想要修改 `shallowRef` 则需要整个对象替换
2. `reactive` 不要整个对象替换，如果需要，则改用 `ref` 或者替换赋值时用 `reactive` 包裹让它重新具有响应式

## 背后原理

### Vue2

#### 对象

![对象背后原理](https://pic1.imgdb.cn/item/67aac4fed0e0a243d4fe3f9d.png)

先来看看 Vue2 是怎么处理对象的。可以看到，在 new Vue 后，内部会把 `data` 内全部的数据循环遍历，给每一个属性都添加 `getter` 和 `setter`，当数据被访问时，会触发 `getter`，当数据被修改时，会触发 `setter`，从而实现响应式。

而后面新增的变量没有被绑定 `getter` 和 `setter`，所以没有响应式，不会触发更新。

#### 代码实现

```html
<script>
  function Vue (options) {
    this.$data = options.data
    this.init()
  }

  Vue.prototype.init = function () {
    function defineReactive (obj) {
      for (let key in obj) {
        const value = obj[key]
        Object.defineProperty(obj, key, {
          get () {
            // 依赖收集，并返回现在值
            return value
          },
          set (newVal) {
            // 修改数据并页面更新
            value = newVal
          }
        })
        if (typeof value === 'object' && !(value instanceof Array)) {
          // 递归对象，内部属性也要绑定响应式
          defineReactive(value)
        }
      }
    }
    defineReactive(this.$data)
  }

  new Vue({
    data: {
      a: 123,
      b: {
        c: 456
      }
    }
  })
</script>
```

`$set` 的实现原理也是利用 `Object.defineProperty`，给新增的属性绑定 `getter` 和 `setter`。

#### 数组

![数组背后原理](https://pic1.imgdb.cn/item/67aacb80d0e0a243d4fe4121.png)

接下来看看 Vue2 对数组的处理，可以看到，Vue2 对数组做了特殊处理，只对 `push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse` 几个方法做了重写，先取出数组原型链，拷贝复制一份数组的原方法，调用上述几个方法时会先调用原型链的原方法，然后再调用 Vue2 自己写的方法。

#### 代码实现

```html
<script>
  function Vue (options) {
    this.$data = options.data
    this.init()
  }

  Vue.prototype.init = function () {
    function decorateArr (arr) { // [!code ++]
      const originProto = Array.prototype // [!code ++]
      const copyProto = Object.create(originProto) // [!code ++]
      copyProto.push = function (...args) { // [!code ++]
        originProto.push.apply(this, args) // [!code ++]
      } // [!code ++]
      arr.__proto__ = copyProto // [!code ++]
    } // [!code ++]
    function defineReactive (obj) {
      for (let key in obj) {
        const value = obj[key]
        Object.defineProperty(obj, key, {
          get () {
            // 依赖收集，并返回现在值
            return value
          },
          set (newVal) {
            // 修改数据并页面更新
            value = newVal
          }
        })
        if (typeof value === 'object' && !(value instanceof Array)) {
          // 递归对象，内部属性也要绑定响应式
          defineReactive(value)
        }
      }
    }
    defineReactive(this.$data)
  }

  const obj = new Vue({
    data: {
      a: 123,
      b: {
        c: 456
      },
      arr: [1, 2, 3] // [!code ++]
    }
  })

  obj.$data.arr.push(100) // [!code ++]
</script>
```

上述示例代码中以数组的 `push` 方法为例，先拿到原型链，再拷贝一份，然后重写 `push` 方法，在重写的方法中调用原型链的 `push` 方法，再调用 Vue2 自己写的方法。最后把改造后的原型链赋值给数组的原型，实现数组方法改写。

### Vue3

```js
 const newProxy = new Proxy(obj, {
  get (target, key) {
    return target[key]
  },
  set (target, key, value) {
    target[key] = value
  }
})

newProxy.a = 123
```