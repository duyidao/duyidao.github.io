# Vue2 VS Vue3

## Vue2

### 响应式缺陷

#### 无法监听到对象属性的动态添加和删除

在 `data` 中声明一个对象：

```js
data() {
  return {
    obj: {
      a: 1
    }
  }
}
```

页面上通过 `for...in...` 循环该对象，能看到数据 `a`。为对象 `obj` 添加属性 `b`：

```js
mounted() {
  this.obj.b = 2
  console.log(b)
}
```

控制台能输出 `b`，但页面只有 `a` 没有 `b`，属性 `b` 没有响应式。

#### 无法监听到数组下标和 length 长度的变化

<word text="Vue2" />内部重写了部分数组 API 使其保持响应式：

- `array.pop()`
- `array.push()`
- `array.shift()`
- `array.unshift()`
- `array.sort()`
- `arry.reverse()`
- `array.splice()`

通过数组索引修改数据不会响应式修改：

```js
fn() {
  this.arr[0] = 1
}
```

直接修改数组长度也不会生效：

```js
fn() {
  this.arr.length = 0
}
```

#### 原因

利用 `defineReactive` 方法，通过 `Object.defineProperty` 对属性进行劫持，数组则通过重写方法进行劫持。每个属性值拥有自己的 `dep` 属性，用来存取所依赖的 `watch`，数据改变时触发相应的 `watch` 更新数据。

**<word text="Vue2" />的响应式存在两个缺陷**：1. 对象新增属性、删除属性界面不会更新；2. 通过数组下标修改数组内容界面不会更新。

> 原因：
>
> 1. <word text="Vue" />无法检测 `property` 的添加或移除。由于<word text="Vue" />在初始化实例时对 `property` 执行 `getter/setter` 转化，所以 `property` 必须在 `data` 对象上存在才能让<word text="Vue" />将其转换为响应式。
> 2. 通过数组下标修改数组不会触发响应式。尤雨溪在 GitHub 上说明过，由于数组长度可能很大，通过索引修改数据的方式会造成很大的性能消耗，因此不对索引方法作额外处理。

### 数组响应式

对象中增加或删除属性时，数据响应式不生效，因为<word text="Vue2" />使用 `Object.defineProperty` 方法进行数据劫持。
添加元素时应用 `$set` 添加属性，用 `$remove` 删除属性。

数组也是对象，但使用数组 API 操作数组（添加或删除元素）时视图有更新。原因：

`push`、`pop` 等方法不会触发 `getter/setter`，因为它们是 Array 原型上的方法，不在 Array 本身上面。

<word text="Vue" />重写了这些方法，使 `push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse` 操作数组时能响应式。

实现思路：使用拦截器覆盖 `Array.prototype` 上的方法，在执行原型方法之外做数据响应式。

- 将数组的原型存到对象 `arrayMethods` 中
- 找到 Array 上能改变数组自身的 7 个方法：`push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`
- 将这 7 个方法进行响应式处理
- 处理完成后，用它们覆盖 `arrayMethods` 中对应的方法
- 将需要响应式处理的数组 arr 的 `__proto__` 指向 `arrayMethods`，如果浏览器不支持访问 `__proto__`，则直接将响应式处理后的 7 个方法添加到数组 arr 上
- 如果要将数组完全实现响应式，需要遍历该数组，将数组中的数组使用该方法进行响应式处理，将对象使用 walk 方法进行响应式处理

#### 定义拦截器

```js
// 获取Array的原型
const arrayProto = Array.prototype;
// 创建一个新对象，该新对象的原型指向Array的原型。
export const arrayMethods = Object.create(arrayProto);
[
	'push',
	'pop',
	'shift',
	'unshift',
	'splice',
	'sort',
	'reverse'
]
.forEach(mentod => {
	 // 缓存原始方法
	const original = arrayProto[method];
	// 对新原型对象上的方法，做数据绑定
	Object.defineProperty(arrayMethods， method， {
		value: function mutator(...args) {
			// 返回原始方法
			return original.apply(this, args);
		},
		enumerable: false,
		writable: true,
		configurable: true
	})
})
```

#### 将拦截器挂载到数组上面

```js
import { arrayMethods } from "./array"; // 处理好的Array原型对象
// __proto__是否可用
const hasProto = "__proto__" in {};
// 所有属性名，不论是否可枚举（与Object.keys的区别）
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

export class Observe {
  // 将value转为响应式
  constructor(value) {
    this.value = value;

    if (Array.isArray(value)) {
      const augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
    } else {
      this.walk(value); // Object的响应式处理，在其他文章中
    }
  }
}

/**
 * __proto__可用的处理方式
 * 将target对象的原型对象替换为src
 */
function protoAugment(target, src, keys) {
  target.__proto__ = src;
}

/**
 * __proto__不可用的处理方式
 * 将src上面的所有属性都copy到target
 */
function copyAugment(target, src, keys) {
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}

// Object.defineProperty()的封装
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}
```

#### 收集依赖

收集依赖：

```js
function defineReactive(data, key, val) {
  let childOb = observe(val);
  let dep = new Dep(); // 存储依赖
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.depend();

      if (childOb) childOb.dep.depend(); // 收集
      return val;
    },
    set: function (newVal) {
      if (val === newVal) return;
      dep.notify();
      val = newVal;
    },
  });
}

// 返回val的响应式对象
function observe(val, asRootData) {
  if (!isObject(value)) return;
  let ob;
  // 避免重复侦测
  if (hasOwn(value, "__ob__") && value.__ob__ instanceof observer) {
    ob = value.__ob__;
  } else {
    ob = new Observe(value);
  }
  return ob;
}
```

## Vue3

### 响应式原理

<word text="Vue3" />响应式原理主要通过 `Proxy` 和 `Reflect` 实现。

`Proxy` 是 ES6 的新语法，直接代理对象，无需像 `Object.defineProperty` 那样重新代理，性能更佳。

`Reflect` 可以对源对象的属性进行操作。

```js
let person = {
  name: "张三",
  age: 18,
};
const p = new Proxy(person, {
  //有人读取p的某个属性时调用
  get(target, prop, receiver) {
    console.log(target, prop);
    //return target[p]
    return Reflect.get(target, prop);
  },
  //有人修改、增加p的某个属性时调用
  set(target, p, value, receiver) {
    console.log(`有人修改了p身上的${p}，我要去更新界面了`);
    //target[p] = value
    Reflect.set(target, p, value);
  },
  //有人删除p的某个属性时调用
  deleteProperty(target, p) {
    console.log(`有人删除了p身上的${p}，我要去更新界面了`);
    //return delete target[p]
    return Reflect.deleteProperty(target, p);
  },
});

console.log((p.age = 23));
console.log(person);
```

### hook

<word text="Vue" />中的 `hook` 通常称为 `Composition API`，是<a class="self_icon" href="https://cn.vuejs.org/" data-title="Vue" target="_blank">Vue</a>框架的重要特性。本质是**组件内部使用的函数**，能在不影响组件逻辑的情况下增强和扩展组件功能。

`Hook` 的主要作用是**允许在组件之间重用状态逻辑**。例如，处理异步请求和管理请求状态的功能，可能在多个组件中都需要。在<word text="Vue2.x" />中，需要使用 `mixins` 或 `HOC`（高阶组件）来抽象和重用这些逻辑，但容易导致命名冲突和逻辑混乱。

使用<word text="Vue3" />的 `Composition API`，可以避免上述问题。通过调用 `useFetch` 这样的自定义 `hook`，在任何组件中重用异步请求逻辑：

```javascript
import { reactive, onMounted } from "vue";

function useFetch(url) {
  const state = reactive({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      state.data = data;
      state.loading = false;
    } catch (error) {
      state.error = error;
      state.loading = false;
    }
  };

  onMounted(fetchData);

  return state;
}

export default useFetch;
```

在其他组件中使用：

```javascript
import useFetch from "./useFetch";

export default {
  setup() {
    const posts = useFetch("/api/posts");

    return {
      posts,
    };
  },
};
```

`useFetch` 就是一个自定义 `hook`（`Composition API`），可在各组件间重用。

#### Vue3 中的 hook 和 mixin 的对比

<word text="Vue3" />的 `hook`（复用性函数）和 `mixin`（混入）都是<word text="Vue" />中实现逻辑复用和代码组织的机制。以下是区别：

1. **复用性**：`mixin` 允许多个<word text="Vue" />组件共享<word text="JavaScript" />功能，但 `mixin` 内的生命周期函数不易理解，容易导致命名冲突。<word text="Vue3" />的 `hook` 以函数形式提取可复用内容，可解决命名冲突。

2. **逻辑相关性**：`mixin` 混入的方法、生命周期函数中的逻辑可能散落在整块代码中，不便管理与维护；<word text="Vue3" />的 `hook` 更容易形成独立、按功能集中管理的代码。

3. **类型支持**：通过 `mixin` 混入的属性或方法，在类型系统中很难得到良好支持。<word text="Vue3" />通过 `Composition API` 的 `hook`，因其通过函数返回值主动暴露，在<word text="TypeScript" />环境下有更好的类型推导支持。

4. **逻辑组织**：`mixin` 无法将大组件拆分为更小的函数单元，<word text="Vue3" />的 `hook` 可以轻松实现。

|                | Hooks                                                                        | Mixins                                                                                                   |
| -------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 定义           | hook 是通过 Composition API 引入的新特性，类似于 React 的 hook。             | mixin 是一种对 Vue 组件进行扩展的方式。                                                                  |
| 功能           | 组织和重用逻辑。在组件中创建和重用复杂的逻辑代码，使组件逻辑更清晰和可维护。 | 将组件的代码封装到可复用的模块。常用于抽离公用代码片段，实现复用，使组件逻辑更清晰和可维护。             |
| 使用           | 使用 setup 方法组织和复用各类逻辑。                                          | 使用 mixin 属性加载公用代码片段。                                                                        |
| 组织代码效果   | 使用 Hooks 可以让组件的逻辑函数按功能组织，使组件的逻辑结构更清晰。          | 使用 Mixins 可以将组件的各个生命周期的相关函数统一放在一起，但可能使组件的逻辑函数分散在各个生命周期中。 |
| 冲突问题       | Hooks 允许命名冲突的功能，从而避免各种命名冲突。                             | Mixins 可能导致函数名冲突。如果两个 mixin 包含相同函数，后一个 mixin 的函数会覆盖先前的函数。            |
| 难以追踪的来源 | Hooks 使用的是函数，如果不加注释，可能不太容易找到其来源。                   | 在 Mixin 中，可以在每个使用了公用代码片段的地方用注释表明代码来源，有助于更好地追踪和维护代码。          |
| Debug 困难度   | Hooks 有更好的 Stack Trace，可以提供更优秀的 debug 体验。                    | 对 mixins 的支持可能在运行时错误的情况下无法找到出错的代码，导致调试困难。                               |

示例对比：

使用 mixin：

```javascript
//定义一个mixin
let myMixin = {
  created: function () {
    this.hello();
  },
  methods: {
    hello: function () {
      console.log("hello from mixin!");
    },
  },
};

//在组件中使用mixin
var Component = Vue.extend({
  mixins: [myMixin],
});
```

这里 "hello" 方法被添加到组件的 `methods` 属性中，组件的 `created` 生命周期钩子被调用后，也调用了 `mixin` 中的 `created`。

使用 `hook`：

```javascript
//定义一个hook
function useHello() {
  const hello = () => {
    console.log("hello from hook!");
  };

  onMounted(hello);

  return {
    hello,
  };
}

//在组件中使用hook
const Component = {
  setup() {
    const { hello } = useHello();
    return {
      hello,
    };
  },
};
```

这里用 `onMounted` 函数代替了 `created` 生命周期钩子，"hello" 函数从 `hook` 中解构出来。<word text="Vue3" />的 `hook` 将逻辑保持在独立函数中，使组件代码保持清晰。

> [!NOTE]
> <word text="Vue3" />可继续使用 `mixin`。但推荐使用 `Composition API` 来组合和重用逻辑，使逻辑组合和重用更方便、灵活，可读性和可维护性更好。根据<word text="Vue3" />官方文档，`Mixin` 在<word text="Vue3" />中已被标记为不推荐，将来可能被 `Composition API` 完全取代。

## Vue2 与 Vue3 区别

1. 改成组合式 API 没有 `this`
2. 生命周期没有 `create`，`setup` 等同于 `create`，卸载 `destroyed` 改成 `unmounted`
3. <word text="Vue3" />中 `v-if` 优先级高于 `v-for`
4. 根实例创建从 `new app` 变为 `createApp` 方法
5. 全局注册（如 `mixin`、全局组件、`use`）改成用 `App` 实例调用，而不是 Vue 类调用
6. 新增传送门组件 `teleport`
7. `template` 模版可不包在根 `div` 里
8. <word text="Vue3" />新增了静态节点，在对比更新时，如果节点是静态的，会跳过对比，提升性能

   ::: code-group

   ```html [代码.html]
   <div>{{ a }}</div>
   <div>123</div>
   <div :class="b">cc</div>
   ```

   ```js [转换.js]
   export function render(_ctx, _cache, $props, $setup, $data, $options) {
     return (
       _openBlock(),
       _createElementBlock(_Fragment, null, [
         _createElementVNode(
           "div",
           null,
           toDisplayString(_ctx.a),
           1 /* TEXT */
         ),
         _createElementVNode("div", null, "123"),
         _createElementVNode("div", { class: _ctx.b }, "cc", 2 /* CLASS */),
       ])
     );
   }
   ```

   :::

   模板字符串这种文本动态会有标记「1」，类名这种属性动态有标记「2」，静态节点没有标记。

### mixin 与 hook

在<word text="Vue2" />中，公共方法可以使用 `mixin` 混入。

```js
app.mixin({
  data() {
    return {
      name: "mixin",
    };
  },
  methods: {
    mixinMethod() {
      console.log("mixinMethod");
    },
  },
  mounted() {},
});
```

`mixin` 是选项式 API，在<word text="Vue3" />中推荐使用 `Composition API`，`mixin` 不适用，更推荐使用 `hook`。

```js
import { ref, onMounted } from "vue";

export function useHello() {
  const name = ref("hook");

  const hello = () => {
    console.log("hello from hook!");
  };

  onMounted(hello);

  return {
    name,
    hello,
  };
}
```

### 根节点

- <word text="Vue2" />只能有一个根节点，多个根节点会报错
- <word text="Vue3" />允许拥有多个根节点

### 生命周期

| Vue2          | Vue3            | 生命周期含义                              |
| ------------- | --------------- | ----------------------------------------- |
| beforeCreate  | setup()         | 开始创建组件之前，创建的是 data 和 method |
| created       | setup()         | 同上                                      |
| beforeMount   | onBeforeMount   | 组件挂载到节点上之前执行的函数。          |
| mounted       | onMounted       | 组件挂载完成后执行的函数                  |
| beforeUpdate  | onBeforeUpdate  | 组件更新之前执行的函数。                  |
| updated       | onUpdated       | 组件更新完成之后执行的函数。              |
| beforeDestroy | onBeforeUnmount | 组件挂载到节点上之前执行的函数。          |
| destroyed     | onUnmounted     | 组件卸载之前执行的函数。                  |
| activated     | onActivated     | 组件卸载完成后执行的函数                  |
| deactivated   | onDeactivated   | 在组件切换中老组件消失的时候执行          |

### v-if 与 v-for 的优先级

- 在<word text="Vue2" />中，`v-for` 优先级高于 `v-if`，每循环一次就判断一次，造成性能消耗
- 在<word text="Vue3" />中，`v-if` 优先级高于 `v-for`，当判断不生效、不渲染该 DOM 节点时，该节点的 `v-for` 失效，不生成循环 DOM 节点

> [!TIP]
> 无论<word text="Vue2" />还是<word text="Vue3" />，都不建议在同一 DOM 节点中同时使用 `v-if` 和 `v-for`。
>
> 如需实现该效果，可根据业务做不同处理：
>
> - 使用 `filter` 过滤出需要的数组数据，再通过 `v-for` 循环遍历
> - `v-for` 遍历后在内部设置 `template` 标签包裹内容，在 `template` 上使用 `v-if` 判断

### API

- 在<word text="Vue2" />中，使用选项式 API，优点是初学者简单易懂，缺点是相关模块分散，不利于大型项目维护：

  ```vue
  <template>
    <div>......</div>
  </template>

  <script>
  export default {
    // 数据
    data() {
      return {};
    },
    mounted() {},
    // 方法
    methods: {},
    computed: {},
  };
  </script>
  ```

- 在<word text="Vue3" />中，使用组合式 API：

  ```vue
  <script setup>
  // 数据和方法都写这里，更简洁
  </script>
  ```

改为组合式 API 后，没有 `this`。

### Diff 算法

Vue2:

```txt
diff算法就是进行虚拟节点对比，并返回一个patch对象，用来存储两个节点不同的地方，最后用patch记录的消息去局部更新Dom。
diff算法会比较每一个vnode,而对于一些不参与更新的元素，进行比较是有点消耗性能的。
```

Vue3:

```txt
diff算法在初始化的时候会给每个虚拟节点添加一个patchFlags，patchFlags就是优化的标识。
只会比较patchFlags发生变化的vnode,进行更新视图，对于没有变化的元素做静态标记，在渲染的时候直接复用。
```

### 父子组件

|      | Vue2                                                                                  | Vue3                                                                                                                                                                                              |
| ---- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prop | 子组件 this.$prop 接收数据                                                            | 子组件 defineProps 接收数据                                                                                                                                                                       |
| emit | 子组件 this.$emit() 设置自定义事件<br />父组件在子组件设置相应的方法使用              | 子组件先需要 const emit = defineEmits() 设置方法<br />然后再通过 emit() 自定义事件通知父组件<br />父组件使用方法和 Vue2 一样                                                                      |
| ref  | 子组件使用关键字 ref = xxxx 设置组件实例名称<br />通过 this.$refs.xxxx 获取子组件实例 | 子组件使用关键字 ref = xxx 设置组件实例名称<br />声明该实例 const xxx = ref()<br />现在可以使用该组件实例内的方法<br />注意：如果想使用子组件的方法变量，需要子组件通过 defineExpose 方法事先导出 |

### 数据绑定原理

| vue2                                                                                             | vue3                                 |
| ------------------------------------------------------------------------------------------------ | ------------------------------------ |
| 利用 ES5 的一个 API Object.defineProperty() 对数据进行劫持，结合发布者订阅者模式的方式来实现的。 | 使用了 ES6 的 Proxy API 对数据代理。 |

<word text="Vue3" />使用 `Proxy` 替换 `Object.defineProperty`，优势：

1. 可直接监听数组类型的数据变化
2. 性能提升
3. 监听的目标为对象本身，不需要像 `Object.defineProperty` 一样遍历每个属性
4. 可直接实现对象属性的新增/删除

### 组件 v-model

在<word text="Vue2" />中，组件使用 `v-model` 实际是为组件动态绑定 `value`，监听 `change` 或 `input` 事件。

在<word text="Vue3" />中，组件使用 `v-model` 实际是为组件动态绑定 `modelValue`，监听 `update:modelValue` 事件。

## Vite VS Webpack

参考 [Vite VS Webpack](https://zhuanlan.zhihu.com/p/568721196)。