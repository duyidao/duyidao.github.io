---
title: BFF层架构
isReship: true
author:
  - 远方os https://www.douyin.com/user/MS4wLjABAAAAGUvGqSgUb8n2mLUU9SOa5wmdZy-Sj5_FUt-DK5Iu6PpxO1QgrJ1_vXy6ikzz_Q4h?from_tab_name=main&is_search=0&list_name=follow&modal_id=7423390112593071397&nt=0
---

# BFF层架构

## 是什么

BFF（Backend for Frontend）是面向前端的后端，它是一种架构模式，用于将后端服务与前端应用进行解耦，提高前端应用的性能和可维护性。

BFF层通常位于前端应用和后端服务之间，它负责处理前端应用的所有请求，并将请求转发给后端服务。

下面来看两个实际场景：
1. 后端服务于多端时，如何处理不同客户端之间不同的业务（如：PC端和移动端的业务逻辑不同）
2. 大屏中有多个图表接口，因为浏览器并发原因，如何合并请求，减少请求次数

## 实际场景

### 场景一

假设有几个微服务接口，每个端都需要调用。而有一次更新微服务3的接口，以便兼容移动端的业务。如果后续还有 IOS 端、安卓端等，后端那边代码就比较难以维护了。

![无BFF](https://pic1.imgdb.cn/item/685ba42e58cb8da5c86fb2f6.png)

于是前端提出了一个概念，加了一个中间层 BFF，在 PC 端发请求时，先发给 PC 端的 BFF 层，BFF 层再根据业务逻辑，调用不同的微服务接口。此时移动端需要兼容的代码只需要在移动端的 BFF 层添加修改即可，不需要改后端服务的代码。

![有BFF](https://pic1.imgdb.cn/item/685ba53858cb8da5c86fbe32.png)

### 场景二

浏览器有接口并发限制，如果请求多个接口，浏览器会等待前面的接口返回后才会发送下一个接口，导致请求次数增多，耗时变长。

![无BFF](https://pic1.imgdb.cn/item/685ba56458cb8da5c86fbf54.png)

可以通过 BFF 层来解决，解决方案为把多个接口的参数合并发给 BFF 层，BFF 层再拆开分别调用接口请求数据，由于服务端与服务端之间是没有并发限制的，所以可以并发请求多个接口，最后再合并返回给前端。

![有BFF](https://pic1.imgdb.cn/item/685ba5cb58cb8da5c86fbf72.png)

## 总结

BFF 层架构可以解决前端应用与后端服务之间的解耦，提高前端应用的性能和可维护性。同时，BFF 层还可以解决浏览器接口并发限制的问题，提高请求效率。

一般情况下，BFF 层是由前端来写的，通过 <SPW text="NodeJS" /> 来实现。