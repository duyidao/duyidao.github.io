# proxy

`vue3` 的双向绑定底层逻辑使用了 `proxy` 代理，下面简单梳理一下实现过程。

## 基本概念

首先说说 `proxy` 的基本概念，`Proxy`  这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

```js
let d=new Proxy(target,handle);
```

`Proxy` 对象的所有用法，都是上面这种形式，不同的只是 `handler` 参数的写法。`Proxy` 可以理解成，在目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

其中，`new Proxy()` 表示生成一个 `Proxy` 实例。作为构造函数，Proxy接受两个参数:

- 第一个参数是所要代理的目标对象（上例是一个空对象），即如果没有 `Proxy` 的介入，操作原来要访问的就是这个对象；
- 第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。

如果 `handler` 没有设置任何拦截，那就等同于直接通向原对象。

## 实现原理

1. 获取到所有 `v-model` 的输入框，绑定键盘弹起事件
2. 触发事件后调用代理，为 `v-model` 的属性字段添加值
3. 添加值后触发代理的 `set` 属性，通过 `set` 属性为包含该属性的节点元素赋值内容

首先准备几个不同的 `dom` 节点，通过 `v-model` 和 `v-bind` 绑定不同的对象，模拟情况如下所示：

```html
<input type="text" v-model="title">
<input type="text" v-model="title">
<div v-bind="title"></div>
<hr>
<input type="text" v-model="content">
<div v-bind="content"></div>
```

设置一个函数，绑定代理，绑定对象为一个空对象即可

```js
function model() {
  let proxy = new Proxy({}, {
    get(obj, prop) {
      console.log(obj, prop);
    },
    set(obj, prop, value) {
      console.log(obj, prop, value);
    }
  })
}
```

设置一个初始函数 `init` ，该函数获取全部 `v-model` 绑定的输入框并记录其键盘弹起事件。触发事件时调用代理，为目标对象的对应属性赋值。

- `getAttribute` 可以获得 `dom` 元素的自定义属性
- 括号内填入对应的自定义名称可获取其等号引号内的值（如本次示例代码的 `title` ）
- 通过 `this.value` 获取其值并赋值给代理目标对象

```js
this.init = () => {
  document.querySelectorAll('[v-model]').forEach(item => {
    item.addEventListener('keyup', function() {
      console.log(this.getAttribute);
      console.log(this.getAttribute('v-model'));
      proxy[this.getAttribute('v-model')] = this.value
    })
  })
}
```

触发代理后获取所有 `v-model` 和 `v-bind` 绑定的 `dom` 元素，为其赋值即可。

```js
let proxy = new Proxy({}, {
  get(obj, prop) {
    console.log(obj, prop);
  },
  set(obj, prop, value) {
    console.log(obj, prop, value);
    obj[prop] = value
    document.querySelectorAll(`[v-model='${prop}'],[v-bind='${prop}']`).forEach(item => {
      item.value = value
      item.innerHTML = value
    })
  }
})
```

## 总体代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>使用代理仿vue实现数据绑定</title>
</head>
<body>
  <input type="text" v-model="title">
  <input type="text" v-model="title">
  <div v-bind="title"></div>
  <hr>
  <input type="text" v-model="content">
  <div v-bind="content"></div>

  <script>
    function model() {
      let proxy = new Proxy({}, {
        get(obj, prop) {
          console.log(obj, prop);
        },
        set(obj, prop, value) {
          console.log(obj, prop, value);
          obj[prop] = value
          document.querySelectorAll(`[v-model='${prop}'],[v-bind='${prop}']`).forEach(item => {
            item.value = value
            item.innerHTML = value
          })
        }
      })
      this.init = () => {
        document.querySelectorAll('[v-model]').forEach(item => {
          item.addEventListener('keyup', function() {
            console.log(this.getAttribute);
            console.log(this.getAttribute('v-model'));
            proxy[this.getAttribute('v-model')] = this.value
          })
        })
      }
    }

    new model().init()
  </script>
</body>
</html>
```



