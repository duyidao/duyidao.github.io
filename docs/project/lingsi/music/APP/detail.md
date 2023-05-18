---
title 详情页
---

## 音频详情

音频详情页需要一个播放音频的控件，在最开始的时候使用的是 `uniapp` 提供的 `audio` 组件，在app上运行无误，但是在h5上运行时报错，发现其组件停止维护。根据项目经理的要求，为了不给后续埋雷，改成使用 API  ` uni.createInnerAudioContext()` 的形式。

### 音频组件

#### 初步实现

音频 API 详情查看 [音频组件控制](https://uniapp.dcloud.net.cn/api/media/audio-context.html#createinneraudiocontext) 官方文档。该方法用于创建并返回内部 audio 上下文 `innerAudioContext` 对象。

我们需要实现下方的效果：

[![p9fDRij.png](https://s1.ax1x.com/2023/05/18/p9fDRij.png)](https://imgse.com/i/p9fDRij)

我们需要音频的总时长、当前播放的时长、进度条、暂停播放的控制等。

首先查看文档的代码示例，示例代码如下：

```js
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
innerAudioContext.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
innerAudioContext.onPlay(() => {
  console.log('开始播放');
});
innerAudioContext.onError((res) => {
  console.log(res.errMsg);
  console.log(res.errCode);
});
```

从示例代码可以得知，使用 `uni.createInnerAudioContext()` 方法创建一个音频对象，通过 `src` 属性接收音频的路径，`autoplay` 为是否自动播放，`onPlay` 开始播放后触发回调函数的方法，`onError` 音频发生错误触发回调函数的方法······

**实现思路**

查看 `innerAudioContext` 对象属性列表和方法列表，找到了我们需要的几个参数：

- `currentTime` ：当前音频的播放位置（单位：s），只有在当前有合法的 `src` 时返回。在音频播放事件内也要实时获取数据并赋值。
- `paused` ：当前是是否暂停或停止状态，`true` 表示暂停或停止，`false` 表示正在播放。通过该状态判断按钮的点击事件是触发播放还是暂停。
- `duration` ：当前音频的长度（单位：s），只有在当前有合法的 `src` 时返回，需要在 `onCanplay` 中获取。该值获取到后不再变动，不需要二次赋值。
- `play` ：音频播放方法。
- `pause` ：音频暂停方法。
- `onCanplay` ：音频加载完可以开始播放后触发的回调函数，在该回调函数中获取音频的总时长。（回调函数是重点，后面要考）
- `onPlay` ：音频播放事件，传入一个回调函数，开始播放后触发该回调函数。
- `onPause` ：音频暂停事件，传入一个回调函数，暂停播放后触发该回调函数。
- `onTimeUpdate` ：音频播放进度更新事件，传入一个回调函数，播放音频时触发该回调函数，此时音频对象的 `currentTime` 属性是最新的音频时间，因此要在这里实时做赋值操作。

总结一下，在页面刚进入时获取音频路径，创建音频上下文对象，把音频路径赋值给其 `src` 属性。在其 `onCanplay` 回调中获取其总时长。由于可以开始播放后会触发 `onCanplay` 事件，因此可以先创建一个变量 `loading` ，初始值为 `true` ，等触发`onCanplay` 回调后再改为 `false` ，表示已加载完毕。

创建一个变量 `playStatus` 用于保存当前音频的播放状态。给音频上下文文件添加回调函数：开始播放、错误、停止、音频进度发生改变。其中音频进度发生改变时实时把值赋值给音频当前时长的变量。

当页面退出后销毁该音频。

**代码**

```vue
<script setup>
	import {
		onBeforeUnmount,
		ref,
	} from "vue";
	import {
		onHide,
		onLoad,
	} from '@dcloudio/uni-app';
	import Loading from "@/components/audioControl/component/Loading";
	import useMineStore from '@/stores/modules/mine';
	import {
		storeToRefs
	} from 'pinia'

	const mineStore = useMineStore()
	const {
		saveMusic
	} = storeToRefs(mineStore)

	//音频信息
	//当前音频时长
	let duration = ref(-1);
	//当前播放时间
	let currentTime = ref(0);
	//当前停止状态 true为停止 false为播放
	let playStatus = ref(false);

	//创建音频上下文
	let context = ref({});
	let loading = ref(false)

	onLoad((val) => {
		context.value = uni.createInnerAudioContext()
		loading.value = true
		context.value.src = saveMusic.value.playUrl;
		currentTime.value = saveMusic.value.auditionTime ? Math.round(context.value.currentTime) : context.value.currentTime;
		playStatus.value = context.value.paused;
		context.value.onCanplay(() => {
			duration.value = context.value.duration;
			console.log("音频播放控件准备好了", context.value.buffered, duration.value);
			loading.value = false
		});
		//音频错误时
		context.value.onError((res) => {
			uni.showToast({
				title: res.errMsg,
				icon: 'none'
			})
			loading.value = false
		});
		//音频进度改变结束
		context.value.onSeeked(() => {
			isSeeking.value = false
			if (!prevStatus.value && context.value.paused) {
				onPlayAudio();
			}
		})
		context.value.onTimeUpdate(() => {
			timeUpdateFn()
		});
		
		context.value.onEnded(() => {
			ended()
		})
	})

	/*音频控制*/
	//播放
	const onPlayAudio = async () => {
		context.value.play();
		playStatus.value = false;
	};
	//暂停
	const onPauseAudio = async () => {
		context.value.pause();
		playStatus.value = true;
	};
	//停止
	const onStopAudio = async () => {
		if (context.value) context.value.stop();
		playStatus.value = true;
		currentTime.value = 0;
		context.value.currentTime = 0
		context.value.seek(0)
	};

	//点击播放暂停
	const onPlay = () => {
		if (context.value.paused) {
			changeType.value = true
			//播放
			onPlayAudio();
		} else {
			changeType.value = false
			//暂停
			onPauseAudio();
		}
	};
    
	//拖动进度条时
	let seekChangeType = ref(false);
	const changingAudioProgress = (e) => {
		currentTime.value = e.detail.value;
		seekChangeType.value = true
	};
	//进度条拖动结束
	const changeAudioProgress = (e) => {
		// 若拖动前音频呈播放状态，则防抖处理
		seekChangeType.value = false
		context.value.startTime = e.detail.value;
		context.value.seek(e.detail.value);
	};

	// 音频播放结束后
	const ended = async () => {
		onStopAudio()
	}

	//音频进度改变时，此回调有原生BUG，音频停止后会继续执行
	const timeUpdateFn = () => {
		// 加条件限制，音频停止时不执行该逻辑
		if (context.value.currentTime && !context.value.paused && !seekChangeType.value) {
			currentTime.value = context.value.currentTime
		}
	}
    
    onBeforeUnmount(() => {
        context.value.destroy() // 退出后销毁该音频
    })
</script>

<template>
	<view>
		<!-- 标题 -->
		<view class="title">{{saveMusic.title}}</view>
		
		<view class="music">
			<view class="music-box">
				<!-- 进度条 -->
				<view class="audio-control-page">
					<slider :min="0" :max="saveMusic.totalDuration ? saveMusic.totalDuration.toFixed(1) : duration.toFixed(1)" activeColor="#e1a452" backgroundColor="#e2e2e2" block-color="#fff" block-size="12" :value="currentTime.toFixed(1)" :step="0.1" @change="changeAudioProgress" @changing="changingAudioProgress" :disabled='loading' />
				</view>
				<!--时间显示-->
				<view class="audio-time">
					<template v-if="loading">
						<text>音频加载中..</text>
					</template>
					<template v-else>
						<text class="">{{ useComputeAudioTime(currentTime) }}</text>
						<text class="">{{ useComputeAudioTime(saveMusic.totalDuration ? saveMusic.totalDuration : duration) }}</text>
					</template>
				</view>
			</view>
		
			<!-- 播放按钮区域 -->
			<view class="play-btn">
				<!--  loading  -->
				<view class="audio-play-btn" v-if="loading">
					<Loading :loading="true"></Loading>
				</view>
				<view class="audio-play-btn" v-else>
					<!--   暂停   -->
					<u-icon name="pause" size="50" v-show="!playStatus" @click="onPlay"></u-icon>
		
					<!--   开始   -->
					<u-icon name="play-right-fill" size="50" v-show="playStatus" @click="onPlay"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>
```

#### 进度条拖拽

现在基于第一版做功能升级。市面上的音频功能大多都可以通过拖拽进度条的形式改变当前音频播放的

### 音频下载
免费音频支持用户下载功能，下载功能的实现依靠 `uniapp` 提供的 [uni.downloadFile](https://uniapp.dcloud.net.cn/api/request/network-file.html#downloadfile) 方法。该方法成功后会触发 `success` 函数，返回下载好的临时路径，如下所示。
```js
{
    "tempFilePath": "_doc/uniapp_temp_1672380474492/download/WeChat_0002_1672367513721.mp4",
    "statusCode": 200,
    "errMsg": "downloadFile:ok"
}
```
关闭项目后地址不存在，因此需要搭配 [uni.saveFile](https://uniapp.dcloud.net.cn/api/file/file#savefile) 缓存到本地中。下载成功后文件会保存在 `\Android\data\com.yinguo.....\apps\doc\uniapp_save` 路径的文件夹下。

思路整理：

- `uni.downloadFile` 把文件缓存到临时地址
- `uni.saveFile` 把文件下载到手机内
```js
const downloadMusicFn = () => {
	uni.showLoading({
		title: '下载中，请稍等'
	})
	// 下载临时文件事件
	uni.downloadFile({
		url: 音频地址,
		success: (res) => {
			if (res.statusCode === 200) {
				// 临时文件下载到本地
				uni.saveFile({
					tempFilePath: res.tempFilePath,
					success: function(result) {
						uni.hideLoading()
					}
				});
			}
		}
	});
}
```

## 课程详情
效果如下图所示，需要实现视频播放功能。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29781801/1675128593536-76f63781-1c2c-4af0-a47a-68cad3c68308.png#averageHue=%23c9d4c8&clientId=u4be0b9f7-2df9-4&from=paste&height=710&id=u5d2b547a&name=image.png&originHeight=710&originWidth=337&originalType=binary&ratio=1&rotation=0&showTitle=false&size=157961&status=done&style=none&taskId=ueb8bcdc8-1b7e-4deb-b5c2-3aad519f911&title=&width=337)

### 阿里云播放器SDK
课程视频用户统一上传到阿里云服务器上，播放视频考虑使用阿里云sdk。详情可前往官方文档 [阿里云播放器sdk](https://help.aliyun.com/document_detail/125570.html) 查看。

#### 引入资源

```html
<link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.12.1/skins/default/aliplayer-min.css" />  //（可选）如果您的使用场景需要用到H5模式的播放器，则需引用此css文件。
<script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.12.1/aliplayer-min.js"></script>  //（必须）引入js文件。
```

提供挂载元素

在结构中创建一个 `dom` 元素供点播器挂载，注意复制时看 `id` 是否对应。
```html
<div id="aliplayerVedio"></div>
```

#### 播放设置
点播播放有多种方式可供选择，这里采取的是官方最为推荐的 `VID + PlayAuth` 的方式。
```js
var player = new Aliplayer({
   id: 'J_prismPlayer',
   width: '100%',
   vid : '<your video ID>',//必选参数。音视频ID。示例：1e067a2831b641db90d570b6480f****。
   playauth : '<your PlayAuth>',//必选参数。音视频播放凭证。
 },function(player){
   console.log('The player is created.')
});
```
此时运行，运行在浏览器中的 `demo` 已经成功跑起来，返回 `uniapp` 中运行，却报以下错误。
> `Aliplayer is not defined`

`uniapp` 运行机制不一样，因此拿不到 `index.html` 引入的js文件，运行之后会报错。

#### 改造

- 基于 `uniapp` 开发的在浏览器上运行的解决方案
   1. 动态创建 `script` 标签，引入资源
   2. 动态创建 `link` 标签，实现跳转
```js
function loadScriptString(src) {
  var script = document.createElement('script') //创建一个script标签
  script.type = 'text/javascript'
  script.src = src
  document.getElementsByTagName('head')[0].appendChild(script)
}

function loadLinkString(src) {
  var link = document.createElement('link') //创建一个link标签
  link.rel = 'stylesheet'
  link.href = src
  document.getElementsByTagName('head')[0].appendChild(link)
}

// 使用阿里云播放器
loadLinkString('https://g.alicdn.com/de/prismplayer/2.9.19/skins/default/aliplayer-min.css')
loadScriptString('https://g.alicdn.com/de/prismplayer/2.9.19/aliplayer-min.js')
```

- 基于手机 `app` 开发

手机 `app` 没有 `document` 标签，因此无法使用这个方案。上文 《tabBar页》 中描述了 `webview` 的功能，刚好符合这个场景。

在 `webview` 中写原生 `html` 代码，把需要的参数通过 query 的方式传递过去。
```vue
<template>
 <view class="content">
  <web-view :src="videoUrl"></web-view>1
 </view>
</template>

<script>
export default {
    data() {
        return {
         videoUrl:'static/index.html?'
        }
    },
    onLoad() {
        let vid = '808243746770483c843bef3e4f91b629';
        let playauth = "凭证";
        this.videoUrl +=`vid=${vid}&playauth=${playauth}`;
    },
    methods: {
    }
}
</script>
```
```html
<!DOCTYPE html>
<html lang="zh">
 <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <head>
   <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.12.1/skins/default/aliplayer-min.css" />
   <script charset="utf-8" type="text/javascript"
    src="https://g.alicdn.com/de/prismplayer/2.12.1/aliplayer-h5-min.js"></script>
  </head>
  <title>视频详情</title>
 </head>
 <body>
  <div id="ali_video"></div>
  
  <script>
   let vid = getValue('vid');
   let playauth = getValue('playauth');
   var player = new Aliplayer({
    id: 'ali_video',
    width: '100%',
    vid: vid,
    playauth: playauth,
   }, function(player) {
    console.log('The player is created.')
   });
   console.log(player)

   /**
    * @description 从地址栏获取参数
    * @param {Object} key 地址栏关键字key名称
    */
   function getValue(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
   }
  </script>
 </body>
</html>
```

#### 总结
利用 `webview` 书写原生，根据官方文档实现阿里云点播器播放视频功能。
> 题外话：
> 最后使用的时候项目经理觉得体验感极差，让后端修改接口，直接返回视频的 `url` ，前端修改为使用 `uniapp` 自带的视频组件 `video` 。

## 活动详情
效果如下图所示。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29781801/1675129545381-370b1a74-daf5-4b3c-a7af-2d07f3fd7cee.png#averageHue=%23bec2a9&clientId=u4be0b9f7-2df9-4&from=paste&height=474&id=u276d4dc6&name=image.png&originHeight=474&originWidth=247&originalType=binary&ratio=1&rotation=0&showTitle=false&size=121890&status=done&style=none&taskId=u79a1e18c-f581-4835-8d60-44d49b560b4&title=&width=247)

下方是一个富文本内容，第一时间联想起使用富文本的几种方式。

### 富文本的使用方式

#### rich-text
`rich-text` 是 `uni-app` 的内置组件，提供了高性能的富文本渲染模式。API参考 [rich-text](https://uniapp.dcloud.io/component/rich-text) 。

`rich-text` 的优势是全端支持、高性能。但是 `rich-text` 不支持内嵌视频，可以通过拆分多个 `rich-text`，中间插入 `video` 来实现。
> 注：
> 小程序端有个缺陷是只能整体设点击事情，无法对富文本中的图片、超链接单独设点击事件。

如果是图片，可以把内容拆成多个 `rich-text` 解决。


#### v-html
`v-html` 指令，是 `web` 开发中很常用的。小程序不支持。

#### uParse
`uView` 组件库有一个富文本解析器，详情可见官方文档 [富文本解析器](https://vkuviewdoc.fsq.pub/components/parse.html) 。

### uParse图片丢失
在本项目中，最初使用的是 `v-html` 渲染富文本，但是部分图片太大超出手机屏幕的范围，且点击图片没有预览效果，因此改成了 `u-parse` 组件。

切换组件后，h5 上运行没事，真机调试时问题来了，图片无法加载。

百度后在 `DCloud` 社区找到了答案，是这个插件判断图片宽高出了问题。当图片宽度大于 窗口宽度的时候，这个插件无法获取 `windowWidth`，导致这个值成了 0。详情可前往社区查看： [uParse 富文本解析图片无法显示](https://ask.dcloud.net.cn/question/132415) 。

得知问题原因，解决思路就有了，在获取到数据后修改一下图片的最大宽度。
```js
/**
 * 转换富文本的图片最大为100%
*/
const formatRichText = (html) => { //控制小程序中图片大小
	let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
		match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
		match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
		match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
		return match;
	});
	newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
		match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
			'max-width:100%;');
		return match;
	});
	newContent = newContent.replace(/<br[^>]*\/>/gi, '');
	newContent = newContent.replace(/\<img/gi,
		'<img style="max-width:100%;height:auto;"');
	return newContent
}
export default formatRichText
```
最终效果实现，图片大小能够全部显示在手机屏幕上。
