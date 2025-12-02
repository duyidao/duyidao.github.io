---
title: 数说移动端Bug本地存储拿不到
titleTemplate: 数说移动端Bug本地存储拿不到
description: 数说 移动端 bug iframe
head:
  - - meta
    - name: description
      content: 数说移动端Bug本地存储拿不到
  - - meta
    - name: keywords
      content: 数说 移动端 bug localstorage iframe
pageClass: shushuo-nourse-mobilebug
tags: mobile,bug,localstorage,iframe
---

# 路由有id，请求头传过去的是空

## 项目背景

该项目是一个移动端项目，会从多个页面跳转进来，如后台复制的链接直接打开、小程序点击按钮后跳转、后台点击移动端按钮后打开一个弹窗。这些跳转方式都会携带一个 `id` ，移动端默认 `url` 地址必定有这个 `id` ，以这个 `id` 作为请求头的参数。

## 问题复现

但是测试采用第三种方式访问项目（即后台点击移动端按钮后打开一个弹窗）时，发现 `url` 有 `id` ，请求头传过去的是空，导致请求失败。

## 排查原因

开始排查原因，个人尝试复现没有出现该 `bug` ，先看代码，由于项目中允许用户切换自己的空间来修改 `id` 的值，因此为了实现修改 `id` 后重新调接口获取对应的最新数据，组件都绑定了 `:key` 重新加载组件，值为 `id` 的值。

请求头一开始通过路由 `router` 获取参数，后面发现数据会有延迟，用户已经切换了空间，但是获取到的 `id` 还是旧的，后面换成使用本地存储获取。询问测试从哪里进入的项目，尝试复现，发现对方是点击了后台的移动端按钮，打开了弹窗，内嵌了一个 `iframe` 。

`iframe` 和 `localStorage` 有一个潜在的跨域问题，`iframe` 和父页面不在同一个域下，`iframe` 无法直接操作父页面的 `localStorage` ，推断测试可能遇到的是这个问题。因此需要修改代码，不能直接使用 `localStorage` 。

## 解决方法

最后解决方法是通过一个状态存储来 `get` 和 `set` 值，请求头直接通过这个状态存储来获取 `id` 的值，这样就能实时获取到最新的 `id` 值。

## 知识拓展

1. 浏览器的同源策略要求：

    - 协议相同（http/https）
    - 域名相同
    - 端口相同
  
    当 iframe 和父页面不在同一个域名下时，它们被视为不同源，无法直接访问彼此的 localStorage。

2. 隐私保护机制
  
    现代浏览器出于隐私保护考虑，对跨域存储有严格限制：

    ```js
    // 父页面 (example.com)
    const iframe = document.createElement('iframe');
    iframe.src = 'https://other-domain.com/page.html';
    document.body.appendChild(iframe);
    
    // 在 iframe 中尝试访问 localStorage
    // 这可能会失败，特别是在某些浏览器中
    window.localStorage.getItem('key'); // 可能报错或返回 null
    ```
