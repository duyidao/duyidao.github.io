---
title: 需求架构设计并优雅实现
author:
  - 三十的前端课 前端架构设计？一个需求学会&https://www.bilibili.com/video/BV15m42157CN/
---

# 需求架构设计并优雅实现

## 需求分析

假设有一个工作台首页，目前面临以下情况：

1. 需要请求一个接口，弹出对应的提示（如续费、添加常用应用等），随着后续的更新迭代，可能会有各种类型的提示
2. 在别的页面进行了某些操作后，首页要感知到，并显示对应的内容
3. 其他情况，如 `websocket` 推送处理等

## 什么是架构

保障拓展性、维护性、复用性，以及低耦合的原则下设计出哪些模块，以及模块之间怎么交流。

因此看到需求第一步，先想怎么拆分模块，保证以下两点：

- 职责单一
- 模块消息传递沟通，不直接调用

## 架构设计

还是以上述的需求为例子，可以把这个首页需求中各种弹窗组件抽离出来统一在 `src/components/modelCommponent` 文件夹内，在该文件夹的根目录下创建一个配置文件 `index.js` 和一个动态组件 `model.vue`，导出相关的组件配置。根据配置文件找到对应的组件。

拿到对应的组件后，渲染到动态组件 `model.vue` 中，首页直接使用动态组件，通过父子传参要显示的弹窗 `code` 即可。

::: code-group

```vue [App.vue]
<script setup>
import { ref } from "vue";
import model from "./components/model.vue";
const modelCode = ref("qianfei");
</script>

<template>
  <div>
    <model :modelCode="modelCode" />
  </div>
</template>
```

```js [components/modelCommponent/index.js]
import compA from "./components/compA.vue";
import compB from "./components/compB.vue";

export default [
  {
    code: "qianfei",
    component: compA,
  },
  {
    code: "changyong",
    component: compB,
  },
];
```

```vue [components/modelCommponent/model.vue]
<script setup>
import config from './index.js'
const { modelCode } = defineProps(['modelCode'])

fucntion findComponent(code) {
  const list = config.filter(comp => comp.code === code)
  return list[0].component
}
</script>

<template>
  <component :is="findComponent(modelCode)" />
</template>
```

```vue [components/modelCommponent/components/compA.vue]
<template>
  <div>你已欠费</div>
</template>
```

```vue [components/modelCommponent/components/compB.vue]
<template>
  <div>添加常用</div>
</template>
```

:::

目前的架构已经实现低耦合和易拓展，但是只能首页和动态弹窗组件实现沟通，其他页面的操作首页无法感知到。因此还需要实现沟通效果。

## 沟通

想要实现沟通，但是又要注重解耦，让组件集合模块独立于首页，显示来源自由。目前的写法并不是自由的，是依靠首页传入的。

解耦的万能手段——第三方观察者。因此最终架构设计如下：

![最终架构设计](https://pic1.imgdb.cn/item/67ebe5690ba3d5a1d7e957f9.png)

首先事件观察者模块，提供注册和触发事件的方法，触发事件后，从注册的监听数组中找到对应方法，提取动态组件显示。也就是不再从首页父子传参来渲染动态组件，而是交给第三方观察者。

`src` 文件夹下新建一个 `eventObj` 文件夹，新建一个 `index.js` 作为事件观察者模块，声明一个对象 `subMap` 用于记录以及监听。导出 `on` 和 `emit` 方法，`on` 方法用于注册事件，`emit` 方法用于触发事件。

在弹窗动态组件调用 `on` 方法，循环保存的弹窗组件集合，给每一个组件对应的 `code` 添加事件绑定并保存到 `pinia` 中；在首页接口获取到数据后调用 `emit` 方法，把数据作为参数传入，触发事件，事件观察者模块会从 `subMap` 中找到对应的事件，并执行。

最后循环 `pinia` 保存到的需要展示的弹窗数组，父子传参，子组件根据参数各自渲染需要渲染的数据即可。

::: code-group

```js [eventObj/index.js]
const subMap = {};

export default {
  on(eventType, fn) {
    subMap[eventType] = fn;
  },
  emit(eventType, ...args) {
    subMap[eventType] && subMap[eventType].apply(undefined, ...args);
  },
};
```

```js [store/index.js]
import { reactive } from "vue";
import { defineStore } from "pinia";

export const useIndexEvents = defineStore("indexEvents", () => {
  const hasEmitList = reactive([]);
  const addInHasEmitList = (eventData) => {
    hasEmitList.push(eventData);
  };
  return {
    hasEmitList,
    addInHasEmitList,
  };
});
```

```vue [components/modelCommponent/model.vue]
<script setup>
import config from './index.js'
import eventObj from '@/eventObj/index.js' // [!code ++]
import { useIndexEvents } from '@/store' // [!code ++]

const store = useIndexEvents() // [!code ++]

config.forEach(comp => { // [!code ++]
  eventObj.on(comp.code, (eventData) => { // [!code ++]
    store.addInHasEmitList(eventData) // [!code ++]
  }) // [!code ++]
}) // [!code ++]

const { modelCode } = defineProps(['modelCode'])

fucntion findComponent(code) {
  const list = config.filter(comp => comp.code === code)
  return list[0].component
}
</script>

<template>
  <component :is="findComponent(modelCode)" />
</template>
<template>
  <div v-for="item in store?.hasEmitList" :key="item.code">
    <!-- [!code ++] -->
    <component :is="findComponent(item.code)" :data="item.data" />
    <!-- [!code ++] -->
    <!-- [!code ++] -->
  </div>
  <!-- [!code ++] -->
  <component :is="findComponent(modelCode)" />
  <!-- [!code --] -->
</template>
```

```vue [App.vue]
<script setup>
import { ref } from "vue";
import model from "./components/model.vue";
import eventObj from "@/eventObj/index.js"; // [!code ++]

const modelCode = ref("qianfei"); // [!code --]
// 模拟接口调用 // [!code ++]
setTimeout(() => {
  // [!code ++]
  const res = {
    // [!code ++]
    code: "qianfei", // [!code ++]
  }; // [!code ++]
  eventObj.emit(res.code, {
    // [!code ++]
    code: res.code, // [!code ++]
    data: {
      // [!code ++]
      time: 20, // [!code ++]
      // 传其他的参数 // [!code ++]
    }, // [!code ++]
  }); // [!code ++]
}, 1000); // [!code ++]
</script>

<template>
  <div>
    <model />
    <!-- [!code ++] -->
    <model :modelCode="modelCode" />
    <!-- [!code --] -->
  </div>
</template>
```

```vue [components/modelCommponent/components/compA.vue]
<script setup>
// [!code ++]
const { data } = defineProps(["data"]); // [!code ++]
</script>
<!-- [!code ++] -->

<template>
  <div>你已欠费 + {{ data.time }} + 天</div>
  <!-- [!code ++] -->
</template>
```

:::

> [!INFO] 补充
> 这里使用 `apply` 是因为 `emit` 方法触发事件时，需要传递多个参数，而 `fn` 方法需要接受多个参数，因此使用 `apply` 方法来传递参数。
