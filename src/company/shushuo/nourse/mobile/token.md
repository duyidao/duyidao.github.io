---
title: 数说故事移动端Bug记录token丢失
titleTemplate: 数说故事移动端Bug记录token丢失
description: 数说故事 移动端 bug token
head:
  - - meta
    - name: description
      content: 数说故事移动端Bug记录token丢失
  - - meta
    - name: keywords
      content: 数说故事 移动端 bug token
pageClass: shushuo-nourse-mobilebug
tags: mobile,bug,token
---

# 勾选15天内免登录，切换空间时会丢失 Token 要求登录

## 问题复现

登录的时候用户可以勾选 15 天免登录，测试提出 BUG ，切换空间后，需要重新登录。

## 排查原因

一开始切换空间的做法是直接 `router.go(0)` 强制页面的刷新，重新调用接口，`token` 是保存在<word text="Pinia" />中，开发无法复现，而测试偶尔能触发，且无法找到规律。查看接口请求头没有传 `token` 。

## 解决方法

初步猜测是强制页面刷新导致 `token` 丢失，于是修改代码，在切换空间的时候，不再强制整个页面刷新，而是给对应的子组件绑定动态 `:key` ，值为当前的 `id` 值，这样切换空间后 `id` 值会发生改变，子组件会重新加载，从而重新调用接口，获取最新的数据。

后续让测试留意一下，发现没有出现这个报错了。