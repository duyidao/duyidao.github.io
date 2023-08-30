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

在页面上通过 `for...in...` 循环该对象，能够看到数据 `a` 。现在为对象 `obj` 添加一个属性 `b` ：

```js
mounted() {
  this.obj.b = 2
  console.log(b)
}
```

可以看到控制台能够输出 `b` ，但是页面还是只有 `a` 没有 `b` ，也就意味着属性 `b` 没有响应式。

#### 无法监听到数组下标和length长度的变化

Vue2 内部重写部分数组 API，让他们能够保持响应式：

- `array.pop()`
- `array.push()`
- `array.shift()`
- `array.unshift()`
- `array.sort()`
- `arry.reverse()`
- `array.splice()`

而通过数组索引的方式修改数据不会响应式修改：

```js
fn() {
  this.arr[0] = 1
}
```

直接修改数组的长度也不会生效：

```js
fn() {
  this.arr.length = 0
}
```

#### 原因

利用 `defineReactive` 方法，通过 `defineProperty` 对属性进行劫持，数组则是通过重写其方法来进行劫持，每个属性值都拥有自己的 `dep` 属性，用来存取所依赖的 `watch` ，当数据发生改变时，触发相应的 `watch` 去更新数据。

但是呢，**Vue2的响应式还存在一些缺陷**：1.对象新增属性，删除属性界面不会更新 2.通过数组下标修改数组内容界面不会更新

> 原因：
>
> 1. Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的
> 2. 通过数组下标修改数组不会触发响应，尤雨溪也在 `github` 上说过，由于数组的长度可能会很大，通过索引修改数据的方式会造成很大的性能消耗，因此不对索引方法作额外处理

### 数组响应式

在对象中增加或者删除属性的时候，数据的响应式原理是不奏效的，因为 Vue2 是用的 `Object.definedProperty` 方法进行数据劫持。
因此在进行添加元素的时候，应该用 `$set` 来进行添加属性。使用 `$remove` 进行删除属性。

对于数组，因为数组也是一对象，但我们在使用数组的 API 进行操作数组(添加元素或者是删除元素)的时候，视图是有更新的。这个的原因是为什么呢？

原本上，数组的一些方法比如 `push`，`pop` 是不会触发`getter/setter` 的。不会触发的原因是因为这是 Array 原型上的方法，并没有在 Array 本身上面。

Vue 可以使用这些方法的原因是因为 Vue 重写了这些方法。就可以使用 `push.pop.shift,unshift,splice,sort,reserve`操作数组，并且进行响应式。

实现的思路：大体上就是说，是使用了拦截器覆盖了`Array.prototype` 上的方法，在执行原型上的方法之外去做数据的响应式。

- 将数组的原型存到对象arrayMethods中
- 找到Array上能够改变数组自身的7个方法 push, pop, shift,unshift, splice, sort, reverse
- 将这7个方法进行响应式处理
- 处理完成后，用它们把arrayMethods中对应的方法覆盖掉
- 将需要进行响应式处理的数组arr的__proto__指向arrayMethods，如果浏览器不支持访问__proto__，则直接将响应式处理后的7个方法添加到数组arr上
- 如果要将一个数组完全实现响应式，需要遍历该数组，将数组中的数组使用该方法进行响应式处理，将对象使用walk方法进行响应式处理

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
import { arrayMethods } from './array' // 处理好的Array原型对象
// __proto__是否可用
const hasProto = '__proto__' in {};
// 所有属性名，不论是否可枚举（与Object.keys的区别）
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

export class Observe {
	// 将value转为响应式
	constructor (value) {
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
function copyAugment (target, src, keys) {
	for (let i = 0, len = keys.length; i < len; i ++) {
		const key = keys[i];
		def(target, key, src[key]);
	}
}

// Object.defineProperty()的封装
function def (obj, key, val, enumerable) {
	Object.defineProperty(obj, key, {
		value: val,
		enumerable: !!enumerable,
		writable: true,
		configurable: true
	})
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
        }
    })
}

// 返回val的响应式对象
function observe(val, asRootData) {
    if (!isObject(value)) return;
    let ob;
    // 避免重复侦测
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof observer) {
        ob = value.__ob__;
    } else {
        ob = new Observe(value)
    }
    return ob;
}
```

ob、dep、watch



## Vue3

### 响应式原理

### hooks



## Vue2与Vue3区别

### 根节点

- vue2 只能有一个根节点，多个根节点存在他会报错
- vue3 允许拥有多个根节点

### 生命周期

| Vue2          | Vue3            | 生命周期含义                           |
| ------------- | --------------- | -------------------------------------- |
| beforeCreate  | setup()         | 开始创建组件之前，创建的是data和method |
| created       | setup()         | 同上                                   |
| beforeMount   | onBeforeMount   | 组件挂载到节点上之前执行的函数。       |
| mounted       | onMounted       | 组件挂载完成后执行的函数               |
| beforeUpdate  | onBeforeUpdate  | 组件更新之前执行的函数。               |
| updated       | onUpdated       | 组件更新完成之后执行的函数。           |
| beforeDestroy | onBeforeUnmount | 组件挂载到节点上之前执行的函数。       |
| destroyed     | onUnmounted     | 组件卸载之前执行的函数。               |
| activated     | onActivated     | 组件卸载完成后执行的函数               |
| deactivated   | onDeactivated   | 在组件切换中老组件消失的时候执行       |

### v-if与v-for的优先级

- 在 Vue2 中，`v-for` 的优先级会高于 `v-if` ，因此会每循环一次就判断一次，造成极大的性能消耗和浪费
- 在 Vue3 中，`v-if` 优先级会高于 `v-for` ，因此当判断不生效，不渲染该 DOM 节点时，该节点的 `v-for` 会失效，不生成循环 DOM 节点

> 题外话
>
> 无论是 Vue2 还是 Vue3，都不建议同时在一个 DOM 节点中使用 `v-if` 和 `v-for` 。
>
> 如果想要实现这个效果，可以根据业务来做不同的处理，如：
>
> - 事先使用 `filter` 过滤出需要的数组数据，再通过 `v-for` 循环遍历
> - `v-for` 遍历后再在内部设置 `template` 标签包裹内容，在 `template` 上使用 `v-if` 判断即可

### API

- 在 Vue2 中，使用的是选项式 API，优点是初学者简单易懂，缺点是相关模块十分分散，不易于大型项目的维护。代码如下：

  ```vue
  <template>
  	<div>
      ......
    </div>
  </template>
  
  <script>
   export default {
    // 数据
    data(){
     return{};
    },
    mounted(){},
    // 方法
    methods:{},
    computed:{}
  }
  </script>
  ```

- 在 Vue3 中，使用的组合式 API，代码如下：

  ```vue
  <script setup>
  // 数据和方法都写这里，更简洁
  </script>
  ```

### Diff算法

Vue2:

```text
diff算法就是进行虚拟节点对比，并返回一个patch对象，用来存储两个节点不同的地方，最后用patch记录的消息去局部更新Dom。
diff算法会比较每一个vnode,而对于一些不参与更新的元素，进行比较是有点消耗性能的。
```

Vue3:

```text
diff算法在初始化的时候会给每个虚拟节点添加一个patchFlags，patchFlags就是优化的标识。
只会比较patchFlags发生变化的vnode,进行更新视图，对于没有变化的元素做静态标记，在渲染的时候直接复用。
```

### 父子组件

|      | Vue2                                                         | Vue3                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| prop | 子组件 this.$prop 接收数据                                   | 子组件 defineProps 接收数据                                  |
| emit | 子组件 this.$emit() 设置自定义事件<br />父组件在子组件设置相应的方法使用 | 子组件先需要 const emit = defineEmits() 设置方法<br />然后再通过 emit() 自定义事件通知父组件<br />父组件使用方法和 Vue2 一样 |
| ref  | 子组件使用关键字 ref = xxxx 设置组件实例名称<br />通过 this.$refs.xxxx 获取子组件实例 | 子组件使用关键字 ref = xxx 设置组件实例名称<br />声明该实例 const xxx = ref()<br />现在可以使用该组件实例内的方法<br />注意：如果想使用子组件的方法变量，需要子组件通过 defineExpose 方法事先导出 |

### 数据绑定原理

| vue2                                                         | vue3                             |
| ------------------------------------------------------------ | -------------------------------- |
| 利用ES5的一个API Object.defineProperty() 对数据进行劫持，结合发布者订阅者模式的方式来实现的。 | 使用了ES6的Proxy API对数据代理。 |

Vue3 发生了改变，使用 proxy 替换 Object.defineProperty，使用 Proxy 的优势如下：

1. 可直接监听数组类型的数据变化
2. 性能的提升
3. 监听的目标为对象本身，不需要像Object.defineProperty 一样遍历每个属性，有一定的性能提升
4. 可直接实现对象属性的新增/删除

## Vite VS Webpack