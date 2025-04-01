# Vue常见优化手段

## 使用key

对于通过循环生成的列表，应给每个列表项一个**稳定且唯一**的 `key`，这有利于在列表变动时，尽量少的删除、新增、改动元素。

## 使用冻结的对象

冻结对象 `Object.freeze()` 不会被响应化，对于不需要保持响应式的变量，可以使用 `Object.freeze()` 冻结数据。减少 Vue 的观察开销。

::: code-group
```js [未冻结.js]
export default {
  data() {
    normalData: []
  },
  methods: {
    getData() {
      const result = []
      for (let i = 0; i < 100000; i++) {
        result.push({
          id: i,
          name: `name${i}`
        })
      }
      this.normalData = result // 7600ms
    }
  }
}
```
```js [冻结.js]
export default {
  data() {
    normalData: []
  },
  methods: {
    getData() {
      const result = []
      for (let i = 0; i < 100000; i++) {
        result.push({
          id: i,
          name: `name${i}`
        })
      }
      this.normalData = Object.freeze(result) // 150ms
    }
  }
}
```
:::

## 使用函数式组件

参考 Vue 官方文档 [函数式组件](https://cn.vuejs.org/guide/scaling-up/functional.html)，函数式组件在渲染过程中没有状态，也没有实例 `data` ，所以它们更轻量，只需要配置 `functional: true` 即可。函数式组件用于纯渲染组件。

::: code-groupo
```vue [app.vue]
<template>
  <div>
    <FunctionalComponent v-for="item in count" :key="item" :count="item" />
    <NormalComponent v-for="item in count" :key="item" :count="item" />
  </div>
</template>

<script>
import FunctionalComponent from './FunctionalComponent.vue'
import NormalComponent from './NormalComponent.vue'
export default {
  components: {
    FunctionalComponent,
    NormalComponent
  },
  data() {
    return {
      count: 10000
    }
  }
}
</script>
```
```vue [FunctionalComponent.vue]
<template>
  <h1>{{ count }}</h1>
</template>

<script>
export default {
  functional: true,
  props: {
    count: Number
  }
}
</script>
```
```vue [NormalComponent.vue]
<template>
  <h1>{{ count }}</h1>
</template>

<script>
export default {
  props: {
    count: Number
  }
}
</script>
```
:::

经过 `Performance` 插件分析，函数式组件在 `js` 和渲染、内存占用上，比普通组件渲染性能更高、更快、更少。

这个原理是，Vue 在创建组件实例时，会 `new VueComponent` 创建一个组件实例，进行一系列初始化操作，包括初始化状态、事件监听、生命周期钩子等。而函数式组件是纯渲染的，没有创建组件实例，在 Vue 组件数中也没有这些函数式组件，因此不需要进行这些初始化操作，从而减少了开销。

## 使用计算属性

如果模板中某个数据会使用多次，并且该数据是通过计算得到的，使用计算属性以缓存它们

## 非实时绑定的表单项

当使用 `v-model` 绑定一个表单项时，当用户改变表单项的状态时，也会随之改变数据，从而导致 Vue 发生重渲染(`rerender`)，这会带来一些性能的开销。

我们可以通过使用 `lazy` 或不使用 `v-model` 的方式解决该问题，但要注意，这样可能会导致在某一个时间段内数据和表单项的值是不一致的。

## 保持对象引用稳定

在绝大部分情况下，Vue 触发 `rerender` 的时机是其依赖的数据发生变化若数据没有发生变化，哪怕给数据重新赋值了，Vue 也是不会做出任何处理的。下面是 Vue 判断数据没有变化的源码：

```js
function hasChange(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y // 0 === -0 为true
  } else {
    return x === x || y === y // NaN === NaN 为false
  }
}
```

因此，如果需要，只要能保证组件的依赖数据不发生变化，组件就不会重新染。对于原始数据类型，保持其值不变即可;对于对象类型，保持其引用不变即可。

::: code-group
```vue [app.vue]
<template>
  <div>
    <Comment v-for="item in data1" :key="item.id" :comment="item" />
    <Comment v-for="item in data2" :key="item.id" :comment="item" />
  </div>
</template>

<script>
export default {
  component: {
    Comment
  },
  data() {
    return {
      data1: [
        {
          id: 1,
          name: 'name1'
        },
        {
          id: 2,
          name: 'name2'
        }
      ],
      data2: [
        {
          id: 1,
          name: 'name1'
        },
        {
          id: 2,
          name: 'name2'
        }
      ]
    }
  },
  methods: {
    async getData1() {
      const res = await getComment()
      this.data1 = res
    },
    async getData2() {
      await getComment()
      this.data2.unshift(data)
    },
  }
}
</script>
```
```vue [comment.vue]
<template>
  <div>
    <span v-if="rerender">{{ rerender }}</span>
    {{ comment }}
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  },
  data() {
    return {
      rerender: 0
    }
  },
  beforeUpdate() {
    this.rerender++
  }
}
</script>
```
:::

上方例子中，`data1` 的数据是添加后实时调用接口获取最新数据，此时对象引用地址不同，因此子组件会重新渲染。而 `data2` 是通过 `unshift` 添加数据，此时对象引用地址没有变化，因此旧的子组件不会重新渲染。

从另一方面来说，由于可以通过保持属性引用稳定来避免子组件的重渲染，那么我们应该细分组件来尽量避免多余的渲染。

## 使用v-show替代v-if

对于频繁切换显示状态的元素，使用 `v-show` 可以保证虚拟 `dom` 树的稳定，避免频繁的新增和删除元素，特别是对于那些内部包含大量 `dom` 元素的节点，这一点极其重要。

关键字：频繁切换显示状态、内部包含大量 `dom` 元素。

## 使用延迟装载(defer)

JS传输完成后，浏览器开始执行JS构造页面。但可能一开始要渲染的组件太多，不仅JS执行的时间很长，而且执行完后浏览器要渲染的元素过多，从而导致页面白屏。

一个可行的办法就是延迟装载组件，让组件按照指定的先后顺序依次一个一个渲染出来

> 延迟装载是一个思路，本质上就是利用 `requestAnimationFrame` 事件分批渲染内容，它的具体实现多种多样

::: code-group
```vue [app.vue]
<template>
  <div>
    <heavy v-for="item in 21" />
  </div>
</template>

<script>
export default {
  components: {
    heavy
  },
  mixin: [defer(20)]
}
</script>
```
```vue [heavy.vue]
<template>
  <div>
    <div v-for="iten in 2000"></div>
  </div>
</template>
```
:::

上方案例中，`heavy` 组件内部包含 2000 个 `div`，当 `heavy` 组件被渲染 21 次时，页面会包含 42000 个 `div`，浏览器在渲染时 DOM 树和 CSSOM 树很庞大，因此渲染耗时很高。

解决方法是分批次渲染画面，使用 `requestAnimationFrame` 事件分批渲染内容。

```js
export default function (maxFrameCount) {
  return {
    data() {
      return {
        frameCount: 0,
      }
    },
    mounted() {
      const refreshFrameCount = () => {
        requestAnimationFrame(() => {
          this.frameCount++
          if (this.frameCount < maxFrameCount) refreshFrameCount()
        })
      }
      refreshFrameCount()
    },
    methods: {
      defer(showInFrameCount) {
        return this.frameCount >= showInFrameCount
      }
    }
  }
}
```

上方案例，通过 `defer` 方法，可以控制组件的渲染时机。浏览器每一帧是 16ms，每过 16ms 渲染一次，因此 `defer` 方法可以控制组件在某一帧后渲染，拆分渲染能让用户感官时间变短了。

## 使用keep-alive

## 长列表优化

## 打包体积优化