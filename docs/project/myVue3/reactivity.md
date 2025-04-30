# 响应式 Reactivity

## 初步实现

下面先来初步实现响应式原理。<SpecialWords text="Vue3" /> 的响应式原理主要是通过变量的 `get` 、 `set` 和副作用函数 `effect` 来实现的。每当访问变量时，就会触发 `get` ，每当修改变量时，就会触发 `set` ，而 `effect` 则是用于收集依赖和触发副作用函数的，触发变量变更后，会重新执行副作用函数，达到了响应式的效果。

在 `reactivity/src` 文件夹下新建 `reactivity.ts` 和 `effect.ts` 两个文件，分别用于实现响应式原理和副作用函数。

在 `reactivity.ts` 文件中，定义一个 `RefImpl` 的类，用于实现响应式原理。它包含以下几个属性：

1. `_value` ：用于存储变量的值。
2. `__v_isRef` ：用于标识该变量是否是响应式变量。
3. `sub`：用于存储该变量的依赖函数。
4. `get`：用于获取变量的值，并在获取时收集依赖函数。
5. `set`：用于设置变量的值，并在设置时触发依赖函数。

导出一个 `ref` 函数，函数返回一个 `new RefImpl` 的实例。再导出一个 `isRef` 函数，用于判断一个变量是否是响应式变量。

在 `effect.ts` 文件中，定义并导出一个变量 `activeSub` 和一个 `effect` 函数， `activeSub` 是一个依赖收集变量，每当触发 `effect` 副作用函数时，就会为 `activeSub` 赋值，`reactivity.ts` 会导入这个变量为响应数据收集函数依赖；`effect` 函数用于收集依赖函数和触发副作用函数，它接收一个形参 `fn` ，触发 `effect` 函数后，首先将 `activeSub` 设置为 `fn` ，然后执行 `activeSub` ，执行完毕后，将 `activeSub` 设置为 `null` 。

最后在 `index.ts` 文件中统一导入导出。

::: code-group
```ts [reactivity.ts]
import { activeSub } from './effect'

enum ReactiveFlags {
  IS_REF = '__v_isRef',
}

/**
 * ref 响应式类
 * @params {_value}: 响应式值
 * @params {ReactiveFlags.IS_REF}: 标识是否是ref
 * @params {sub}: 订阅者
 * @methods {get}: 获取响应式值
 * @mehtods {set}: 设置响应式值
 */
class RefImpl {
  _value;
  sub;
  [ReactiveFlags.IS_REF] = true;

  constructor(value) {
    this._value = value
  }

  get value() {
    if (activeSub) {
      this.sub = activeSub
    }
    return this._value
  }

  set value(newValue) {
    this._value = newValue
    this.sub?.()
  }
}

/**
 * 创建响应式对象
 * @params {value}: 响应式对象
 * @returns {RefImpl}: 响应式对象
 */
export function ref(value) {
  return new RefImpl(value)
}

/**
 * 判断是否是ref
 * @params {value}: 响应式对象
 * @returns {boolean}: 是否是ref
 */
export function isRef(value) {
  return (!!value && value?.[ReactiveFlags.IS_REF])
}
```
```ts [effect.ts]
export let activeSub;

/**
 * 依赖收集
 * @param {fn}: Function
 */
export const effect = (fn) => {
  activeSub = fn
  activeSub()
  activeSub = null
}
```
```ts [index.ts]
export * from './effect'
export * from './reactivity'
```
:::

回到 `packages/reactivity` 文件夹下，新建一个 `example` 文件夹，后续用于测试。新建一个 `01_ref.html` 文件，内容如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0">
  <title>ref初步设置</title>
</head>

<body>
  <script type="module">
    import {ref, effect} from '../dist/reactivity.esm.js'

    const count = ref(0)

    effect(() => {
      console.log('count', count.value);
    })

    setTimeout(() => {
      count.value += 1
    }, 1000);
  </script>
</body>

</html>
```

现在试运行，可以发现 `count` 变量发生变更后，能够触发 `effect` 函数，打印出 `count` 的值。

> [!IMPORTANT] 备注
> 1. 一般的，如果想要给类设置一个内部私有属性，不会直接使用 `this.xxx`，而是外部设置一个枚举，然后在类内部使用 `枚举[xxx]` 的方式。以上方代码示例为例，`ReactiveFlags` 是一个枚举，`ReactiveFlags.IS_REF` 是枚举中的一个属性，用于标记当前对象是否是 `ref` 对象，返回一个布尔值。
> 2. `set` 函数中，需要先执行赋值操作，再执行副作用函数，先后顺序不能搞错，不然会导致先触发副作用函数，再赋值，这样副作用函数中拿到的值是旧的值。