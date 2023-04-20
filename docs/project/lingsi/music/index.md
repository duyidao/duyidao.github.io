---
title 音果云音
---

# 项目
该项目名称为音果云音。

## 技术栈

- `uni-app` 框架
- `vue3` + `pinia`
- `uview` 组件库

## 重点目录

1. 登录页
2. `tabBar`页（首页、商城、合作、我的）
3. 详情页（音频详情、课程详情、活动详情、合作详情）
4. 我要测试页
5. 分享页
6. 个人中心页
7. 推广中心页
8. 终端操作页
9. 售后页面
10. 其余功能页面······

## 遇到的问题
1. 苹果上架
   该项目有佣金推广模块与虚拟商品购买模块，导致苹果商城上架不成功，经过讨论决定苹果手机上把这些模块隐藏。判断用户使用的设备是否为苹果代码如下：

   ```js
   export const is_iOS = () => {
	   if (uni.getSystemInfoSync().platform == 'ios') {
		   return true
	   } else {
		   return false
	   }
   }
   ```
2. 富文本图片不显示
   在移动端调试的时候图片能够显示，在手机端运行时发现图片无法显示，但是点击后能够预览，也有宽高占位。百度一阵有人给出了解答：因为图片宽度大于手机屏幕的宽度，导致其宽度为 `null` 。

   解决方案：
   通过正则表达式匹配图片标签，为其加上 `max-width: 100%` （注意不要破坏原来的样式）
   ```js
   changeImgWidth(html) {
      if (!html) return
      let newContent = html
      if (/<img style="/.test(html)) {
        newContent = html.replace(/<img style="/g, '<img style="max-width: 100%; height: auto;');
      } else if(/<img/.test(html)) {
        newContent = html.replace(/<img/gi, '<img style="max-width:100%; height: auto;"');
      }
      return newContent
   }
   ```

## 项目亮点

- 使用 `uni.createInnerAudioContext()` 音频组件控制播放音频。
   1. 通过 `src` 字段添加链接；设置 `startTime` 开始使用
   2. 通过循环的方式动态次数循环播放音频
   3. 通过 `play()` 事件播放音频，`pause()` 事件暂停音频，`stop()` 事件停止音频， `seek()` 事件切换音频当前播放位置， `onEnded()` 监听音频停止时间， `onTimeUpdate()` 动态获取音频当前播放位置。
   4. 根据使用者是否听音频来动态增加减少当前音频在听人数，通过暂定、停止、结束事件调用后端接口传递记录当前使用者听该音频的时长。
- 使用 `canvas` 画布绘制海报并生成图片保存到手机相册。
   1. 通过 `canvas` 标签以及 `uni.createCanvasContext` 方法生成海报。
   2. 通过 `uni.canvasToTempFilePath` 方法把画布转为图片。
   3. 通过 `uni.saveImageToPhotosAlbum` 方法把图片保存到手机相册中。
- 使用 `uniapp` 内置 `API` 实现蓝牙搜索与低功耗蓝牙连接读写功能；使用 `uniapp` 内置 `API` 实现扫一扫功能。详细信息请见《操作页》内容。
- 通过 `uni.requestPayment` 方法实现支付功能
   1. 调用后端接口创建订单获取订单编号
   2. 调用后端支付接口获取对应sdk
   3. 使用 `uni.requestPayment` 方法调起支付，其中，属性 `provider` 为支付服务提供商。如支付宝支付参数为 `alipay`，微信支付为 `wxpay`
- 动态设置用户剪切板内容，实现商品链接的保存分享
   1. 通过 `uni.setClipboardData` 设置系统剪贴板的内容，其中，`data` 属性的参数为要设置的内容。
   2. 通过 `uni.getClipboardData`获取系统剪贴板的内容。
