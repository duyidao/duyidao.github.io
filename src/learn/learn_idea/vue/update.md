---
title: Vue的更新机制和优化
author:
  - 三十的前端课 vue项目不更新问题总结和背后源码&https://www.bilibili.com/video/BV1qS411c7oW
---

# Vue 的更新机制和优化

## 原理思考

### Vue2

#### 常见不更新原因

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
      },
    };
  },
  mounted() {
    this.obj.a = 2; // 页面正常更新
    setTimeout(() => {
      this.obj.b = 234;
      console.log(this.obj); // 控制台打印数据有更新，页面没更新
    }, 1000);
  },
};
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
      arr: [1, 2, 3],
    };
  },
  mounted() {
    this.arr.push(4); // 页面正常更新
    setTimeout(() => {
      this.arr[0] = 234;
      console.log(this.arr); // 控制台打印数据有更新，页面没更新
    }, 1000);
  },
};
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
      arr: [1, 2, 3],
    };
  },
  mounted() {
    document.getElementById("mydom").innerHTML = 999;
    setTimeout(() => {
      this.arr.push(4); // DOM不更新，内容还是999，因为DOM被操作了导致失去了对arr的依赖
    }, 1000);
  },
};
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
      path: "",
    };
  },
  mounted() {
    // mounted函数只执行一次，如果一开始进入登录页，header能够隐藏；如果一开始进入的是首页，后面才跳转到登录页，此时mounted不再执行，头部也不会隐藏
    this.path = this.$router.path;
  },
};
</script>
```

```vue [vuex变量保存到data导致后续vuex数据更新内容没更新.vue]
<template>
  <div>{{ data }}</div>
</template>

<script>
import { params } from "@/store";
export default {
  data() {
    return {
      data: params,
    };
  },
};
</script>
```

:::

上方代码示例四中，Vue 路由切换实际上只是切换 `router-view` 组件的内容，整个组件的 `mounted` 生命周期函数只执行一次，如果一开始进入登录页，`header` 能够隐藏；如果一开始进入的是首页，后面才跳转到登录页，此时 `mounted` 不再执行，头部也不会隐藏.

上方代码示例五中，`mounted` 里对 `data` 赋值，来源数据变更没更新，原因在于 `data` 保存了 `params` 的值，而 Vue 的更新机制是引用才更新，而该组件没有 `params` 变量的依赖，因此 `params` 数据更新组件也不会更新。

#### 解决方案

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
      arr: [1, 2, 3],
    };
  },
  mounted() {
    this.$set(this.obj, "b", 234);
    this.$set(this.arr, 0, 234);
  },
};
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
      arr: [1, 2, 3],
    };
  },
  mounted() {
    this.obj = { a: 1, b: 234 };
    let _arr = this.arr;
    _arr[0] = 234;
    this.arr = _arr;
  },
};
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

### Vue3

#### 常见不更新原因

1. 使用了 `shallowRef`
2. 用错了 `ref` 和 `reactive`

::: code-group

```vue [shallowRef.vue]
<script setup>
const data = shallowRef({
  a: 1,
  b: {
    c: 2,
  },
});

data.value.a = 3; // 页面不更新
</script>
```

```vue [ref与reactive.vue]
<script setup>
const obj = reactive({
  a: 123,
});
</script>
```

:::

`shallowRef` 只会代理第一层，其内部的数据不会有响应式，所以修改 `data.value.a` 不会触发更新。

`reactive` 会把整个对象变为 `Proxy` 对象，修改其中的属性可以触发更新；但是如果直接替换整个对象，会让它失去 `Proxy` 代理，从而失去响应式。

#### 解决方案

1. 只有明确内部属性不需要单独修改才使用 `shallowRef`，如果想要修改 `shallowRef` 则需要整个对象替换
2. `reactive` 不要整个对象替换，如果需要，则改用 `ref` 或者替换赋值时用 `reactive` 包裹让它重新具有响应式

## 背后原理

### Vue2

#### 对象

![对象背后原理](https://pic1.imgdb.cn/item/689d9bfe58cb8da5c8246a24.png)

先来看看<word text="Vue2"/>是怎么处理对象的。可以看到，在 `new Vue` 后，内部会把 `data` 内全部的数据循环遍历，给每一个属性都添加 `getter` 和 `setter`，当数据被访问时，会触发 `getter`，当数据被修改时，会触发 `setter`，从而实现响应式。

而后面新增的变量没有被绑定 `getter` 和 `setter`，所以没有响应式，不会触发更新。

#### 代码实现

```html
<script>
  function Vue(options) {
    this.$data = options.data;
    this.init();
  }

  Vue.prototype.init = function () {
    function defineReactive(obj) {
      for (let key in obj) {
        const value = obj[key];
        Object.defineProperty(obj, key, {
          get() {
            // 依赖收集，并返回现在值
            return value;
          },
          set(newVal) {
            // 修改数据并页面更新
            value = newVal;
          },
        });
        if (typeof value === "object" && !(value instanceof Array)) {
          // 递归对象，内部属性也要绑定响应式
          defineReactive(value);
        }
      }
    }
    defineReactive(this.$data);
  };

  new Vue({
    data: {
      a: 123,
      b: {
        c: 456,
      },
    },
  });
</script>
```

`$set` 的实现原理也是利用 `Object.defineProperty`，给新增的属性绑定 `getter` 和 `setter`。

#### 数组

![数组背后原理](https://pic1.imgdb.cn/item/689d9db258cb8da5c8246d7a.png)

接下来看看<word text="Vue2"/>对数组的处理，可以看到<word text="Vue2"/>对数组做了特殊处理，只对 `push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse` 几个方法做了重写，先取出数组原型链，拷贝复制一份数组的原方法，调用上述几个方法时会先调用原型链的原方法，然后再调用<word text="Vue2"/>自己写的方法。

#### 代码实现

```html
<script>
  function Vue(options) {
    this.$data = options.data;
    this.init();
  }

  Vue.prototype.init = function () {
    function decorateArr(arr) {
      // [!code ++]
      const originProto = Array.prototype; // [!code ++]
      const copyProto = Object.create(originProto); // [!code ++]
      copyProto.push = function (...args) {
        // [!code ++]
        originProto.push.apply(this, args); // [!code ++]
      }; // [!code ++]
      arr.__proto__ = copyProto; // [!code ++]
    } // [!code ++]
    function defineReactive(obj) {
      for (let key in obj) {
        const value = obj[key];
        Object.defineProperty(obj, key, {
          get() {
            // 依赖收集，并返回现在值
            return value;
          },
          set(newVal) {
            // 修改数据并页面更新
            value = newVal;
          },
        });
        if (typeof value === "object" && !(value instanceof Array)) {
          // 递归对象，内部属性也要绑定响应式
          defineReactive(value);
        }
      }
    }
    defineReactive(this.$data);
  };

  const obj = new Vue({
    data: {
      a: 123,
      b: {
        c: 456,
      },
      arr: [1, 2, 3], // [!code ++]
    },
  });

  obj.$data.arr.push(100); // [!code ++]
</script>
```

上述示例代码中以数组的 `push` 方法为例，先拿到原型链，再拷贝一份，然后重写 `push` 方法，在重写的方法中调用原型链的 `push` 方法，再调用<word text="Vue2"/>自己写的方法。最后把改造后的原型链赋值给数组的原型，实现数组方法改写。

### Vue3

```js
const newProxy = new Proxy(obj, {
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
  },
});

newProxy.a = 123;
```

## 场景复现

### 场景

先看一个倒计时场景，代码如下：

```vue
<script setup>
let word = "hello";
let time = ref(1000);

setInterval(() => {
  time.value--;
}, 1000);

setTimeout(() => {
  word = "world";
}, 3000);

onUpdate(() => {
  console.log("update");
});
</script>

<template>
  <div>{{ word }}</div>
  <div>{{ time }}</div>
</template>
```

这个组件每次修改倒计时变量时，都会触发<word text="Vue"/>的更新机制，从而触发 `onUpdate` 生命周期钩子。如果组件庞大，会频繁触发 `diff` 算法对比<word text="DOM"/>（更新的时候只需要修改发生变动的部分，性能消耗反而没那么大，主要是虚拟<word text="DOM"/>对比寻找更新部分消耗更大）

以上方代码为例试验一下，延时器 3s 后把 `word` 字段修改为 `world`，控制台没有打印，页面没有发生变化，因为 `word` 不是响应式；而定时器每隔 1s 就让 `time` 字段自减 1，可以发现 3s 后 `word` 字段变成了 `world` 。说明它是每个组件都去比对一次查看是否有变化。

### 解决

1. 把倒计时区域提取为组件，数据通过 `props` 传递给组件，这样更新和比对都只会触发组件本身，而不是整个页面。

   ::: code-group

   ```vue [timeCounter.vue]
   <script setup>
   const { time } = defineProps(["time"]);
   const containerTime = ref(time);

   setInterval(() => {
     containerTime.value--;
   }, 1000);
   </script>

   <template>
     <div>{{ containerTime }}</div>
   </template>
   ```

   ```vue [App.vue]
   <script setup>
   import timeCounter from "./timeCounter.vue";
   let word = "hello";
   let time = 1000;

   setTimeout(() => {
     word = "world";
   }, 3000);
   setInterval(() => {
     time -= 1;
     document.querySelector(".time-container").innerHTML = time;
   }, 1000);

   onUpdated(() => {
     console.log("update");
   });
   </script>

   <template>
     <div>{{ word }}</div>
     <div class="time-container">{{ time }}</div>
   </template>
   ```

   :::

   现在触发更新后只会更新 `timeCounter` 组件，而不会触发整个页面的更新，从而减少不必要的性能消耗。

   > [!WARNING] 注意
   > 传递的时候不要传递 `ref`，不然还是会触发整个页面的更新，因为 `ref` 是响应式的，会触发整个页面的更新。

2. 绕开<word text="Vue"/>体系，用原生<word text="DOM"/>操作设置 `innerHTML`，这样就不会触发<word text="Vue"/>的更新机制（简单设置文字内容可以考虑）

   ```vue [App.vue]
   <script setup>
   let word = "hello";
   let time = 1000;

   setTimeout(() => {
     word = "world";
   }, 3000);

   onUpdated(() => {
     console.log("update");
   });
   </script>

   <template>
     <div>{{ word }}</div>
   </template>
   ```

   这样页面只会触发重绘，不会触发重排。但是这个方法不是特别推荐，除非像案例那样只是简单修改文字内容。

### 原理

1. <word text="Vue"/>的更新是以组件为最小统计的单位的

   常说<word text="Vue"/>的响应式原理是 `get` 和 `set` ，`set` 部分在修改数据时会触发更新，而 `get` 会有一个依赖收集的过程。

   ![过程图](https://pic1.imgdb.cn/item/689d9e7858cb8da5c8246f89.png)

   从图可以看出，触发 `get` 后它会针对变量收集使用到它的组件并存储起来，后续该变量触发更新后，会遍历存储的组件，触发它们的更新。因此<word text="Vue"/>的更新是以组件为最小统计单位的更新。

   > [!IMPORTANT] 拓展
   > <word text="React"/>页面更新不是通过 `get` 和 `set` ，因此不会有组件依赖收集，触发更新后是整个组件树从头到尾都更新了，因此需要做很多额外的优化。

2. 更新的过程

   ![更新的过程](https://pic1.imgdb.cn/item/689da37258cb8da5c8247bd2.png)

   所以在更新上<word text="Vue"/>是根据新老虚拟<word text="DOM"/>来比对哪里发生了变化，然后用最简单的策略更新，比如修改文字内容，只需要修改 `textContent` 就可以了，而修改样式只需要修改 `style` 就可以了，不需要重新渲染整个<word text="DOM"/>。

### 更新策略的决定

![更新策略的决定](https://pic1.imgdb.cn/item/689da47558cb8da5c8247e14.png)

下面来简单看一下虚拟<word text="DOM"/>长什么样：

::: code-group

```js [script.js]
let obj = {
  type: "div",
  attr: [],
  text: "",
  children: [
    {
      type: "div",
      attr: [],
      text: _ctx.other, // _ctx表示Vue的上下文
      children: [],
    },
  ],
};
```

```html [template.vue]
<div>
  <div>{{ other }}</div>
</div>
```

:::

在比对时他会先看 `key` 和类型是否发生改变，如果改变那就必定要删除之前的，`createElement` 方法重新创建一个新<word text="DOM"/>再加入。

如果类型和 `key` 没有改变，那就看该<word text="DOM"/>是否写死（即没有使用变量），写死则跳过比对。

后面再看文字内容和属性是否发生改变，文字变化用 `innerHTML` 修改，属性发生变化用 `setAttribute` 修改。

### 总结

1. <word text="Vue"/>的更新是以组件为最小统计单位的。<word text="Vue"/>的更新过程是先比对虚拟<word text="DOM"/>，然后根据变化决定更新策略。
2. 如果有一些更新特别频繁的区域，可以把区域从页面中提取出来作为一个组件，尤其是页面比较庞大的时候。
3. 尽量复用之前的<word text="DOM"/>，避免相似的结构，用 `v-if` 切换显影
