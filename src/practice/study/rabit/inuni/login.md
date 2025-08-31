---
title: 小兔鲜小程序登录
titleTemplate: 小兔鲜小程序登录
description: UniApp 小兔鲜 登录
head:
  - - meta
    - name: description
      content: 小兔鲜小程序登录
  - - meta
    - name: keywords
      content: UniApp 小兔鲜 登录
pageClass: myself-rabit-login
---

# 登录

## 手机快捷登录

在真实的业务场景中，微信手机号快捷登录的步骤为：

1. 通过 `uni.login` 获取到用户的 `code`
2. 修改按钮类型，通过 `getphonenumber` 方法获取用户的 `iv` 与 `encryptedData` 等信息，根据后端接口文档给出的信息实现
3. 调接口传参，实现登录

::: details 代码如下

```vue
<script setup lang="ts">
import { loginApi } from '@/services/login'
import { onLoad } from '@dcloudio/uni-app'

// 获取 code 登录凭证
let code = ''
onLoad(() => {
  uni.login().then((res) => {
    code = res.code
  })
})

// 获取用户手机号码
const onGetPhoneNumber: UniHelper.ButtonOnGetphonenumber = (ev) => {
  const encryptedData = ev.detail!.encryptedData!
  const iv = ev.detail!.iv!
  loginApi({
    code,
    encryptedData,
    iv,
  }).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <view class="viewport">
    <view class="login">
      <button
        open-type="getPhoneNumber"
        @getphonenumber="onGetPhoneNumber"
        class="button phone"
      >
        <text class="icon icon-phone"></text>
        手机号快捷登录
      </button>
    </view>
  </view>
</template>
```

:::

## open-type 有效值

`uniapp` 中按钮组件通过 `open-type` 属性可以设置当前按钮的作用，可用属性如下：

| 值                     |                                                         说明                                                          | 平台差异说明                                                                                                                                                                                                          |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feedback`             |                                   打开“意见反馈”页面，用户可提交反馈内容并上传日志                                    | App、微信小程序、QQ 小程序                                                                                                                                                                                            |
| `share`                |                                                     触发用户转发                                                      | 微信小程序、百度小程序、支付宝小程序、抖音小程序、飞书小程序、QQ 小程序、快手小程序、京东小程序、360 小程序                                                                                                           |
| `getUserInfo`          |                                 获取用户信息，可以从@getuserinfo 回调中获取到用户信息                                 | 微信小程序、百度小程序、QQ 小程序、快手小程序、京东小程序、360 小程序                                                                                                                                                 |
| `contact`              |               打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 @contact 回调中获得具体信息                | 微信小程序、百度小程序、快手小程序、抖音小程序                                                                                                                                                                        |
| `getPhoneNumber`       |                              获取用户手机号，可以从@getphonenumber 回调中获取到用户信息                               | 微信小程序、百度小程序、抖音小程序、支付宝小程序、快手小程序、京东小程序。App 平台另见[一键登陆](https://uniapp.dcloud.net.cn/univerify)                                                                              |
| `launchApp`            |                           小程序中打开 APP，可以通过 app-parameter 属性设定向 APP 传的参数                            | [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/launchApp.html)、[QQ 小程序](https://q.qq.com/wiki/develop/miniprogram/frame/open_ability/open_app.html)、快手小程序、京东小程序 |
| `openSetting`          |                                                    打开授权设置页                                                     | 微信小程序、QQ 小程序、百度小程序、快手小程序、京东小程序、360 小程序                                                                                                                                                 |
| `chooseAvatar`         |                                获取用户头像，可以从@chooseavatar 回调中获取到头像信息                                 | 微信小程序 2.21.2 版本+                                                                                                                                                                                               |
| `uploadDouyinVideo`    |                                                     发布抖音视频                                                      | 抖音小程序 2.65.0 版本+                                                                                                                                                                                               |
| `im`                   |                                                  跳转到抖音 IM 客服                                                   | 抖音小程序 2.80.0 版本+                                                                                                                                                                                               |
| `getAuthorize`         |                                                    支持小程序授权                                                     | 支付宝小程序                                                                                                                                                                                                          |
| `lifestyle`            |                                                      关注生活号                                                       | 支付宝小程序                                                                                                                                                                                                          |
| `contactShare`         |                                                   分享到通讯录好友                                                    | 支付宝小程序基础库 1.11.0 版本+                                                                                                                                                                                       |
| `openGroupProfile`     |  呼起 QQ 群资料卡页面，可以通过 group-id 属性设定需要打开的群资料卡的群号，同时 manifest.json 中必须配置 groupIdList  | QQ 小程序基础库 1.4.7 版本+                                                                                                                                                                                           |
| `openGuildProfile`     |                               呼起频道页面，可以通过 guild-id 属性设定需要打开的频道 ID                               | QQ 小程序基础库 1.46.8 版本+                                                                                                                                                                                          |
| `openPublicProfile`    | 打开公众号资料卡，可以通过 public-id 属性设定需要打开的公众号资料卡的号码，同时 manifest.json 中必须配置 publicIdList | QQ 小程序基础库 1.12.0 版本+                                                                                                                                                                                          |
| `shareMessageToFriend` |                                     在自定义开放数据域组件中,向指定好友发起分享据                                     | QQ 小程序基础库 1.17.0 版本+                                                                                                                                                                                          |
| `addFriend`            |                      添加好友， 对方需要通过该小程序进行授权，允许被加好友后才能调用成功用户授权                      | QQ 小程序                                                                                                                                                                                                             |
| `addColorSign`         |                                      添加彩签，点击后添加状态有用户提示，无回调                                       | QQ 小程序基础库 1.10.0 版本+                                                                                                                                                                                          |
| `addGroupApp`          |               添加群应用（只有管理员或群主有权操作），添加后给 button 绑定@addgroupapp 事件接收回调数据               | QQ 小程序基础库 1.16.0 版本+                                                                                                                                                                                          |
| `addToFavorites`       |                               收藏当前页面，点击按钮后会触发 Page.onAddToFavorites 方法                               | QQ 小程序基础库 1.19.0 版本+                                                                                                                                                                                          |
| `chooseAddress`        |                         选择用户收货地址，可以从@chooseaddress 回调中获取到用户选择的地址信息                         | 百度小程序 3.160.3 版本+                                                                                                                                                                                              |
| `chooseInvoiceTitle`   |                     选择用户发票抬头，可以从@chooseinvoicetitle 回调中获取到用户选择发票抬头信息                      | 百度小程序 3.160.3 版本+                                                                                                                                                                                              |
| `login`                |                                       登录，可以从@login 回调中确认是否登录成功                                       | 百度小程序 3.230.1 版本+                                                                                                                                                                                              |
| `subscribe`            |                                         订阅类模板消息，需要用户授权才可发送                                          | 百度小程序                                                                                                                                                                                                            |
| `favorite`             |                                                     触发用户收藏                                                      | 快手小程序                                                                                                                                                                                                            |
| `watchLater`           |                                                   触发用户稍后再看                                                    | 快手小程序                                                                                                                                                                                                            |
| `openProfile`          |                                                   触发打开用户主页                                                    | 快手小程序                                                                                                                                                                                                            |

设置了 `getPhoneNumber` 后可以通过 `@getphonenumber` 方法获取用户手机号等信息。
