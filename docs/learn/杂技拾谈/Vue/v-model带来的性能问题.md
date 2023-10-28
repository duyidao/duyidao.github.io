# v-model带来的性能问题

在 Vue 中，`v-model` 会带来一点潜在的问题。先看效果图，如下所示：

![效果](https://pic.imgdb.cn/item/653ca2d8c458853aeff58f58.gif)

可以看到，一开始动画速度是正常的，但是在输入框内输入值时动画速度开始减缓。

会造成这一切的原因是输入框通过 `v-model` 动态绑定数据。而这底层逻辑是 `v-model` 实际上是一个语法糖，它实际上是通过 `v-bind` 动态绑定数据，`v-on:input` 调用 `input` 事件更改变量的值。

```vue
<input :value="value" @input="value = $event.target.value"
```

而 JS 是一个单线程的语言，在输入的时候它会一直调用 `input` 方法，阻塞浏览器的其他动作，有可能导致动画缓慢。

解决方法为在 `v-model` 方法后面添加一个标识符 `.lazy` ，添加该标识符后它不再以 `input` 方法执行，而是修改为 `change` 方法。

不过该方法有利有弊，弊端是 `change` 方法是等待用户输入完失焦后才触发，因此需要考虑实际业务场景再考虑优化。

