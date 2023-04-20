---
title 登录页
---

# 登录页

## 业务分析

1. 获取验证码
   1. 调用接口
   2. 获取参数并传参
2. 验证码登录/账号密码登录
3. 游客登录
4. 服务条款、隐私协议
5. 忘记密码

## 业务实现

### 获取验证码
点击获取验证码按钮

- 判断用户有无输入手机号
   - 无：弹出手机号为空提示，不调用接口
   - 有：把手机号作为参数传给后端
- 接口调用成功后
   - 修改按钮文本
   - 开启定时器
      1. 设置一个变量，初始值为60
      2. 每隔一秒自减1
      3. 变量为0时恢复内容，关闭定时器
   - 禁止按钮点击事件

当按钮被点击调用接口成功后禁用按钮，倒计时结束后恢复按钮点击
> **可实现的优化**
> 可以为点击事件添加一个节流操作，防止用户短时间内点击多次调用多次接口。

### 登录
获取用户输入的手机号与验证码（或者账号和密码），正则校验是否符合条件。校验通过调用接口，与机器码一同传递给后端（机器码在游客登录中详谈），失败则给用户提示。<br />根据接口返回的数据，利用 `uni.setStorageSync` 本地存储用户的 `cookie` 和 用户信息 `userInfo` 。<br />由于这个方法经常使用，且字段较多容易写错，更推荐把本地存储的方法抽取出来封装为几个函数使用：
```vue
const setItem = (key, data) => {
	return uni.setStorageSync(key, data)
}
const getItem = (key) => {
	return uni.getStorageSync(key)
}
const removeItem = (key) => {
	return uni.removeStorageSync(key)
}
const clearItem = () => {
	return uni.clearStorageSync()
}
export {
	setItem,
	getItem,
	removeItem,
	clearItem
}
```

### 游客登录
本项目是一个上传项目，用户希望能够得知使用者对软件的使用情况以及记录他们的使用时间，因此需要获取到机器码（也就是使用者设备的唯一标识）。<br />对于这个需求，最开始开发时想到的是 `uni-app` 提供的 `uni.getDeviceInfo()` 方法，返回了 `deviceId` 设备id 。但是根据 [官方文档](https://uniapp.dcloud.net.cn/api/system/getDeviceInfo.html#getdeviceinfo) 描述在清除缓存后会改变，不符合要求，因此排除。<br />经过查询，发现原生 `plus` 有一个获取设备 uuid 的方法，返回的结果是一个16进制的字符串，符合要求。
```vue
export const getDeviceId = () => {
	return new Promise((resolve, reject) => {
		let uuid = plus.device.getDeviceId();
		resolve(uuid)
	})
}
```

### 忘记密码
忘记密码与重置密码业务相近，原型相近，因此可以复用同一个页面，通过路径传参判断当前需要实现的是什么业务，通过 `uni.setNavigationBarTitle` 自定义初始化标题。
```vue
onLoad((val) => {
  // 传递type，做修改密码业务，修改标题
	if (val.type) {
		type.value = val.type
		uni.setNavigationBarTitle({
			title: '修改密码'
		})
	}
})
```
