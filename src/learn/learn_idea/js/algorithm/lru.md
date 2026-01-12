---
title: LRU 缓存算法
author:
  - 渡一教育 LRU缓存算法&https://www.bilibili.com/video/BV1y3vbB3Ev3
---

# LRU 缓存算法

## 前言

LRU（Least Recently Used）是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。

该算法赋予每个属性一个访问字段，用来记录一个属性自上次被访问以来所经历的时间 `t`，当须淘汰一个属性时，选择现有属性中其 `t` 值最大的，即最近最久未使用的属性予以淘汰。

## 逻辑

可能还是觉得很抽象，下面来看看它的运行逻辑：

1. 有一个数组，最大长度为 4（即最多只能缓存 4 个数据），数组中存储的是对象的键值对
2. 第一次访问 `a`，第二次访问 `b`，第三次访问 `c`，第四次访问 `d`

    此时数组已经满员了，没法再承装更多的内容了。此时的数组存储如下：

    | 位置 | 值  |
    | ---- | --- |
    | 0    | a   |
    | 1    | b   |
    | 2    | c   |
    | 3    | d   |

3. 第五次访问 `e`，此时数组中已经满了，需要删除最久未使用的属性，即 `a`，然后插入 `e`
   
   此时的数组存储如下：

    | 位置 | 值  |
    | ---- | --- |
    | 0    | b   |
    | 1    | c   |
    | 2    | d   |
    | 3    | e   |

4. 第六次访问 `b`，此时 `b` 已经在数组中了，所以需要删除 `b`，然后插入 `b`，此时 `b` 已经被移动到了数组的末尾
   
    | 位置 | 值  |
    | ---- | --- |
    | 0    | c   |
    | 1    | d   |
    | 2    | e   |
    | 3    | b   |

## 实现

理清逻辑后，接下来就知道怎么实现了。

首先新建一个类，类中包含一个 `#cache`，类型为 `Map`，用来存储缓存的数据，然后定三个方法，分别是 `get` 获取数据、`set` 保存数据和 `has` 判断数据是否存在。

```js
class LRUCache {
  #cache;
  max;
  constructor(max = 4) {
    this.max = max;
    this.#cache = new Map();
  }

  get(key) {
    // TODO
  }

  set(key, value) {
    // TODO
  }

  has(key) {
    // TODO
  }
}
```

### has 方法

`has` 方法很简单，就是判断 `#cache` 中是否存在该数据即可。

```js
has(key) {
  return this.#cache.has(key);
}
```

### get 方法

`get` 方法稍微复杂一些，首先判断 `#cache` 中是否存在该数据，如果存在，则将数据移动到 `#cache` 的末尾，并返回数据；如果不存在，则返回 `undefined`。

```js
get(key) {
  if (this.#cache.has(key)) {
    const value = this.#cache.get(key);
    this.#cache.delete(key); // 删除原来的数据
    this.#cache.set(key, value); // 重新插入数据
    return value;
  }
  return undefined;
}
```

### set 方法

`set` 方法稍微复杂一些，首先判断 `#cache` 中是否存在该数据，如果存在，则将数据移动到 `#cache` 的末尾；如果不存在，则判断 `#cache` 是否已满，如果已满，则删除最久未使用的属性，然后插入新的数据。

```js
set(key, value) {
  if (this.#cache.has(key)) {
    this.#cache.delete(key); // 删除原来的数据
  } else if (this.#cache.size >= this.max) {
    this.#cache.delete(this.#cache.keys().next().value) // 删除最久未使用的属性
  }
  this.#cache.set(key, value); // 插入新的数据
}
```

## 动手实操

<myIframe url="https://example.duyidao.cn/js/lru" />