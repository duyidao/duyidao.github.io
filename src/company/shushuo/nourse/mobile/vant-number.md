---
title: 数说移动端数字键盘PC点击与键盘输入
titleTemplate: 数说移动端数字键盘PC点击与键盘输入
description: 数说 移动端 vant pc
head:
  - - meta
    - name: description
      content: 数说移动端数字键盘PC点击与键盘输入
  - - meta
    - name: keywords
      content: 数说 移动端 vant pc
pageClass: shushuo-nourse-mobilevant
tags: mobile,bug,pc
---

# Vant 数字键盘实现 PC 点击与键盘输入

## 问题复现

该项目使用的是<word text="Vant" />数字键盘组件，在移动端上使用正常，但测试在 PC 端使用，出现了两个问题：

1. 点击电脑自带的键盘按钮，无法触发输入事件
2. 点击验证码输入框唤起键盘，直接点击键盘，没有触发点击事件

## 排查原因

一开始自测了一下，电脑键盘输入确实没反应，因为验证码输入框并没有监听键盘事件，所以需要监听键盘事件，然后触发输入事件。

而第二个问题并没有复现出来，询问测试后，测试甩了一张截图过来。

![测试截图](https://pic1.imgdb.cn/item/6900823e3203f7be00ab82bb.png)

观看截图发现，测试打开 F12 却没有选择设备仿真，因此点击后触发的是 `click` 事件，而不是 `touch` 事件。<word text="Vant" />数字键盘组件并没有监听 `click` 事件，所以没有触发输入事件。

## 解决方法

找到问题后，就知道怎么解决了。

问题1的解决方法是为输入框绑定 `keyup` 事件，当键盘输入时触发。只不过需要判断一下用户输入的是否是数字，只有数字才触发输入事件。而数字的 `keyCode` 是 48-57。

问题2的解决方案是为数字键盘按钮绑定点击事件，判断当前点击的是哪个按钮，数字按钮验证码字符串新增数据；删除按钮验证码字符串删减数据。

## 知识拓展

PC 端事件
- 主要事件：`click`、`mousedown`、`mouseup`、`mousemove`
- 触发方式：鼠标点击、鼠标移动
- 事件特性：基于鼠标指针位置和状态

移动端事件
- 主要事件：`touchstart`、`touchmove`、`touchend`、`touchcancel`
- 触发方式：手指触摸屏幕
- 事件特性：基于触摸点位置、手势识别

现代浏览器在某些情况下会进行事件映射：

- 移动端浏览器：通常会将 `touch` 事件转换为 `click` 事件（延迟约 300ms）
- PC 浏览器：不会自动将 `click` 转换为 `touch` 事件
