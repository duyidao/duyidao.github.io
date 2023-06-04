# 详情页

## 数据渲染

1. 复制基础静态页面模板
2. 封装函数
3. 调用接口获取数据渲染页面

做完这些后保存运行，发现控制台却报错了。报错信息如下：

```js
Uncaught (in promise) TypeError: Cannot read properties of undefined (reading '0')
```

这是因为在数据是异步获取的，在返回前模板先渲染一次 DOM 结构，而此时对象还是空对象，`goodData.categories[0].name` 相等于 `undefined[0].name` ，自然会报错了。

解决方法有两个：

1. 可选链 `?.`

   ```vue
   {{ goodData.categories?.[0].name }}
   ```

2. `v-if` 判断

## 放大镜

使用 `vueuse` 中的 `useMouseInElement` 方法获取鼠标的位置，使用方法为：

1. 通过 `ref` 绑定一个节点元素
2. 把该节点元素放在方法`useMouseInElement` 内，获取其 `x` ，`y` ，`isOutside` 是否在节点元素内
3. 通过 `watch` 侦听变化后判断：
   - 假设图片宽高400，小框宽高100，则小框随鼠标移动的距离为 100 ~ 300 之间
   - 如果小于100或大于300，则让其宽高固定在边缘

```js
// 获取鼠标位置
const target = ref(null);
const { x, y, isOutside } = useMouseInElement(target);

const left = ref(0)
const top = ref(0)
watch([x, y, isOutside], () => {
  if(isOutside.value) return
  // 有效范围内横向和纵向控制
  if(x.value > 100 && x.value < 300) {
    left.value = x.value - 100
  }
  if(y.value > 400 && y.value < 600) {
    top.value = y.value - 400
  }

  // 处理边界
  if(x.value > 300) left.value = 200
  if(x.value < 100) left.value = 0
  if(y.value > 600) top.value = 200
  if(y.value < 400) top.value = 0
})
```

