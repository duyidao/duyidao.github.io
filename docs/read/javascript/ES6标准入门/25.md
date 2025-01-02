## 读懂ECMAScript规格

### 概述

规格是计算机语言的官方标准，详细描述了语法、类型、语句、关键字、保留字、操作符、全局对象、内置对象、编码、运行时环境等各方面细节。

### 相等运算符

相等运算符语法行为多变，下面看看规格是怎么规定它的行为。

```js
0 == null
```

下面是算法细节：
1. 如果 `x` 不是正常值，中断执行
2. 如果 `y` 不是正常值，中断执行
3. 如果 `Type(x)` 与 `Type(y)` 相同，执行严格相等运算 `x === y`
4. 如果 `Type(x)` 是 `Undefined`，`Type(y)` 是 `Null`，返回 `true`
5. 如果 `Type(x)` 是 `Null` ，`Type(y)` 是 `Undefined` ，返回 `true`
6. 如果 `Type(x)` 是数值， `Type(y)` 是字符串，返回 `x == ToNumber(y)` 的结果
7. 如果 `Type(x)` 是字符串， `Type(y)` 是数值，返回 `ToNumber(x) == y` 的结果
8. 如果 `Type(x)` 是布尔值，返回 `ToNumber(x) == y` 的结果
9. 如果 `Type(y)` 是布尔值，返回 `x == ToNumber(y)` 的结果
10. 如果 `Type(x)` 是字符串或数值或 `Symbol` 值， `Type(y)` 是对象，返回 `x == ToPrimitive(y)` 的结果
11. 如果 `Type(x)` 是对象， `Type(y)` 是字符串或数值或 `Symbol` 值，返回 `ToPrimitive(x) == y` 的结果
12. 返回 `false`

### 数组的空位

数组的空位会反映在 `length` 属性，但是不会反映在索引上。也就是说空位有自己的位置，但是这个位置未定义，该值不存在，非要读取只能读取出 `undefined`。

```js
const arr1 = [undefined, undefined, undefined];
const arr2 = [, ,]

arr1.length // 3
arr2.length // 2
arr1[0] // undefined
arr2[0] // undefined

arr1[0] === arr2[0] // true

0 in arr1 // true
0 in arr2 // false

arr1.hasOwnProperty(0) // true
arr2.hasOwnProperty(0) // false

Object.keys(arr1) // [ "0", "1", "2" ]
Object.keys(arr2) // [  ]

arr1.map(n => 1) // [1, 1, 1]
arr2.map(n => 1) // [, ,]
```

### 数组的map方法

1. 得到当前数组的 `this` 对象
2. 如果报错就返回。
3. 求出当前数组的 `length` 属性
4. 如果报错就返回。
5. 如果 `map` 方法的参数 `callbackfn` 不可执行 就报错。
6. 如果 `map` 方法的参数之中 指定了 `this` ，就让 `T` 等于该参数，否则 `T` 为 `undefined`
7. 生成一个新的数组 A，跟当前数组的 `length` 属性保持一致。
8. 如果报错就返回。
9. 设定 `k` 等于 0
10. 只要 小于当前数组的 `length` 属性，就重复下面步骤
    1. 设定 `Pk` 等于 `ToString(k)` 即将 `K` 转为字符串
    2. 设定 `kPresent` 等于 `HasProperty(O Pk)`，即求当前数组有没有指定属性
    3. 如果报错就返回
    4. 如果 `kPresent` 等于 `true` 则进行下面步骤
       1. 设定 `kValue` 等于 `Get(0, Pk)`，取出当前数组的指定属性
       2. 如果报错就返回
       3. 设定 `mappedValue` 等于 `Call(callbackfn T, < kValue , k , O>>)`，即执行回调函数。
       4. 如果报错就返回
       5. 设定 `status` 等于 `CreateDataPropertyOrThrow(A, Pk, mappedValue)`，即将回调函数的值放入 `A` 数组的指定位置。
       6. 如果报错就返回
    5. `k` 增加 1
11.  返回 `A`

### 总结

ECMAScript 规格详细定义了 JavaScript 语言的各个方面，包括语法、类型、语句等。理解规格对于深入掌握语言特性至关重要。

相等运算符：规格详细描述了 `===` 相等运算符的行为，它涉及类型转换和一系列比较步骤。例如，`null == undefined` 返回 `true`，而不同类型的值之间会进行类型转换后再比较。

数组空位：数组的空位（sparse）影响 `length` 属性，但不显示在索引上。空位处的值是 `undefined`，但不作为对象的属性存在，因此 `hasOwnProperty` 返回 `false`。

数组的 `map` 方法：`map` 方法的规格描述了其执行过程，包括获取数组长度、遍历数组、应用回调函数，并将结果放入新数组。如果数组有空位，`map` 会跳过这些位置，结果数组中对应的位置也是空位。
