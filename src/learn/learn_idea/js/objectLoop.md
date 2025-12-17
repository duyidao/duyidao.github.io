---
title: 对象是否存在循环引用
author:
  - 远方os 如何判断对象是否存在循环引用&https://www.bilibili.com/video/BV18E7Nz4E9E
---

# 如何判断对象是否存在循环引用

## 前言

首先来看看什么是循环引用。循环引用是对象内一个属性的值是这个对象本身，这就是对象的循环引用。

```js
const obj = {
  a: 1,
  b: 2
}

obj.c = obj
```

上方示例代码中，`obj` 对象的 `c` 属性的值是 `obj` 本身，这就是循环引用。

## 实现

### 集合存储判断

下面来实现一下这个功能。

1. 首先判断传入的参数是否是对象，如果不是对象直接返回 `false`。
2. 循环遍历对象的每一条属性，递归调用方法
3. 把当前对象保存到 `new Set()` 集合中，如果当前对象在集合中存在，则表示存在循环引用；没有则继续递归调用

```js
const obj = {
  a: 1,
  b: 2
}

obj.c = obj

function hasCircleRef(obj, seen = new Set()) {
  if (!(typeof obj === 'object' && obj !== null)) {
    return false
  }
  
  // 如果当前对象有存储到集合内，说明有循环引用
  if (seen.has(obj)) return true
  seen.add(obj)
  
  // 循环遍历对象的每一个属性
  for (let key in obj) {
    // 如果属性值在集合中能找到，说明有循环引用
    if (hasCircleRef(obj[key], seen)) {
      return true
    }
  }

  return false
}

console.log('是否有循环引用 =>', hasCircleRef(obj))
```

### 去除同级影响

上方的代码有一个 Bug，它会把同级相同的也视为循环引用。

```js
const obj = {
  a: {
    b: 2
  },
}

obj.c = obj.a
```

这只能算是同级属性的属性值相同，并不能算是循环引用。但是上面的代码把 `obj.a` 的值 `{ b: 2 }` 存储到了 `seen` 集合中，当 `obj.c` 的值也是 `{ b: 2 }` 时，就会判断为循环引用。

如何解决呢？

每一次判断时，都只判断当前层级的 `new Set()` 集合，每次递归时，都用一个新的 `new Set()` 集合包裹传参。

```js
function hasCircleRef(obj, seen = new Set()) {
  if (!(typeof obj === 'object' && obj !== null)) {
    return false
  }
  
  // 如果当前对象有存储到集合内，说明有循环引用
  if (seen.has(obj)) return true
  seen.add(obj)
  
  // 循环遍历对象的每一个属性
  for (let key in obj) {
    // 如果属性值在集合中能找到，说明有循环引用
    // [!code focus]
    if (hasCircleRef(obj[key], new Set(seen))) {
      return true
    }
  }

  return false
}
```

还是以上方的代码为例子：

- 一开始执行时，`seen` 集合为空，`seen.has(obj)` 判断为假，继续往下执行，并把 `obj` 存储到 `seen` 中 ，此时 `seen` 的值为 `Set(1) { obj }`。
- 循环遍历对象，递归调用 `hasCircleRef` 函数，把 `obj.a` 的值 `{ b: 2 }` 传进去，并用 `new Set()` 包裹了 `seen` ，此时 `seen` 的值为 `Set(2) { obj.a, Set(1) { obj } }`。
- 循环遍历对象，递归调用 `hasCircleRef` 函数，把 `obj.c` 的值 `{ b: 2 }` 传进去，此时 `seen` 只有最开始的  `Set(1) { obj }`，没有相同的值，因此不存在循环引用，最后返回 `false`。

```js
const obj = {
  // Set => { obj }
  a: {
    // Set => { obj, Set(1) { obj.a } }
    b: 2
  },
  // 这里直接写，显得更直观一点
  c: {
    // Set => { obj }
    b: 2
  }
}
```

总结为一句话，同级相同不能算作循环引用；只有上下级相同才算是循环引用。假设在 `obj.a` 中再加一个属性值等于 `obj`，如 `obj.a.d = obj`，那么 `obj.a.d` 和 `obj` 就是循环引用。

### 代码优化

上方的代码已经能够实现效果了，但是代码还能优化一下。

```js
function hasCircleRef(obj, seen = new Set()) {
  if (!(typeof obj === 'object' && obj !== null)) {
    return false
  }
  
  // 如果当前对象有存储到集合内，说明有循环引用
  if (seen.has(obj)) return true
  seen.add(obj)
  
  // 循环遍历对象的每一个属性
  return Object.values(obj).some(item => hasCircleRef(item, new Set(seen))) // [!code focus]
}
```