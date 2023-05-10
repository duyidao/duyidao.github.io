---
title 项目简介
---
# 项目
该项目为视频分销小程序，主要功能为首页、我的、分类、任务、活动五大模块。后台新增商品，通过商品发布任务，小程序端用户可领取任务和样品去推广。在任务模块上传链接地址提交任务来换取佣金提现。

## 技术栈

1. vue2 + vuex3
2. uniapp
3. uview2.x + uni.$u.http 接口调用

## 遇到的问题
### 视频轮播

在最开始该项目是想做一个 `app` （后来因为涉及佣金，不给上架，最后改为小程序）。在 `app` 端想要把视频嵌套到 `uview` 组件内，最后因为视频层级问题无法实现，采用了其他方案（见[视频轮播](/project/lingsi/sale/video.md)）。换成小程序端后问题解决。

> 注意：
>
> `APP` 端视频层级过高，导致普通的 `view` 标签无法覆盖在视频标签之上，即使设置定位，`z-index:9999` 也不行。如果需要在视频标签上显示内容，则需要在 `video` 标签内使用 `cover-view` 或 `cover-image` 标签。

### 微信授权获取手机号登录

出现 `getPhoneNumber:fail:access denied` 。

因为该账号未认证，官方文档明确表明小程序要完成认证才可使用。具体实现可见 [微信授权](/project/lingsi/sale/获取手机号.md) 。

### 视频在 `ios` 无法播放

视频轮播修改完后发布到体验版，安卓机播放没问题，苹果手机无法播放，于是开始寻查之旅。

百度“微信小程序ios无法播放视频”，微信开发平台有人专门询问了这个问题，下方回复为：
- 播放视频的路径 不能是中文的 不能有空格。后端对返回的文件名称做了处理，因此不是这个原因。
- MP4压缩级别不够。根据 [该博客](https://www.cnblogs.com/aleafo/p/7644553.html) 的解释，h264编码（通过某种特定的压缩技术，将某个视频格式的文件转换为另一种视频格式的文件的技术称为视频编码。h264是视频流中其中一种编码标准）的压缩级别问题导致。 因此需要做转码处理。在线文件转换地址：[在线文件转换](https://convertio.co/zh/)
   ![idtZ5v.png](https://i.328888.xyz/2023/04/21/idtZ5v.png)

   苹果手机上运行，依旧无法查看。
- 看到官方提出“是否能在ios浏览器上观看该视频”，去ios浏览器查看，发现浏览器无法查看，证明是视频文件的问题。经过搜索，找到一条疑似有用的解答，原地址为：[java处理苹果浏览器safari无法播放视频流（Accept-Ranges）](https://blog.csdn.net/u010120886/article/details/79007001)

   让后端对返回的视频格式做一定的处理（没参与不知道是否为这个问题，不清楚后端做了什么操作），最后效果实现。

### 过审

小程序审核需要遵循规范，否则无法过审。目前为止分销小程序已经被驳回3次，分别为：

- 获取用户信息：要求用户绑定微信号、手机号，让用户输入姓名
- 强制登录：小程序的 `tabbar` 页面需要登录才能使用，强制要求用户登录

### 长按触发点击事件

在投票界面用户需要长按对应作品复制其链接，轻车熟路从 `uniapp` 文档中找到 `longtap` 方法，运行测试一下有效果了，但是微信开发工具爆了一个警告：

```
[Deprecation] 'longtap' event is deprecated. Please use 'longpress' instead.
```

大意是`longtap` 方法会触发点击事件，可以使用`longpress` ，这样就不会触发点击事件。

## 项目亮点

### 防抖的实现

部分功能模块（如 `tab` 栏切换）用户频繁操作时会多次调用接口，增加服务器压力，且请求返回时间不一致导致数据错乱。因此封装一个防抖函数，等待用户切换完毕后再调接口。

- 函数封装

  ```js
  // 防抖
  export function debounce(fn, delay = 500) {
  	let timer = null;
  	return function() {
  		if (timer) {
  			clearTimeout(timer);
  		}
  		timer = setTimeout(() => {
  			fn.apply(this, arguments);
  		}, delay)
  	}
  }
  ```

- 函数导入

  ```js
  import {debounce} from '@/utils/utils.js'
  ```

- 函数使用

  ```js
  click: debounce(function(e) {
      // 执行操作
  }, 1000),
  ```


### 附件下载

用户需要下载附件的功能，此时通过 `uni.downloadFile` 方法下载文件保存到临时地址，在其成功回调中调用 `openDocument` 方法下载附件。

`openDocument` 方法参数如下所示

| 属性     | 类型    | 默认值 | 必填 | 说明                                           | 最低版本                                                     |
| :------- | :------ | :----- | :--- | :--------------------------------------------- | :----------------------------------------------------------- |
| filePath | string  |        | 是   | 文件路径 (本地路径) ，可通过 downloadFile 获得 |                                                              |
| showMenu | boolean | false  | 否   | 是否显示右上角菜单                             | [2.11.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| fileType | string  |        | 否   | 文件类型，指定文件类型打开文件                 | [1.4.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |

微信小程序中文件保存到手机的方式比较特殊，我们需要把 `showMenu` 设为 `true` ，预览的时候显示右上角的菜单，通过另存为的方式保存文件。

示例代码：

```js
handleDownFn() {
	const fileType = 获取文件的类型
	uni.downloadFile({
		url: 文件路径（后端返回）,
		success: (data) => {
			if (data.statusCode === 200) {
				uni.showToast({
					icon: 'none',
					mask: true,
					title: '打开成功，请在预览处点击右上方的菜单另存为保存', //保存路径
					duration: 3000,
				});
				// 通过内置文档对象打开文档，便于另存为
				setTimeout(() => {
					wx.openDocument({
						filePath: data.tempFilePath,
						fileType,
						showMenu: true // 关键，这里开启预览页面的右上角菜单，才能另存为
					})
				}, 1000)
			}
		},
		fail: (err) => {
			console.log(err);
			uni.showToast({
				icon: 'none',
				mask: true,
				title: '失败请重新下载',
			});
		},
	})
},
```

运行之后效果实现了，本来以为松了口气，但是测试说她的 IOS 系统手机无法打开预览，测试一下后发现报错，报错信息为：

```
openDocument:fail filetype not supported
```

解决方法：`openDocument` 方法设置 `fileType` 参数，传递其要显示的文件的类型（由于代码量不大，因此上方代码已包含该功能）。

添加之后，苹果系统的手机也可预览了。

> 拓展
>
> 最新版代码去掉了 `wx.saveFile` 方法。直接 `wx.downloadFile` 后 `wx.openDocument` 即可预览，忽略了保存文件方法。

