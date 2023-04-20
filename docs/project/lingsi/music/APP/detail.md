---
title 详情页
---

# 音频详情

音频详情页需要一个播放音频的控件，在最开始的时候使用的是 `uniapp` 提供的 `audio` 组件，在app上运行无误，但是在h5上运行时报错，发现其组件停止维护。根据项目经理的要求，为了不给后续埋雷，改成使用 API 的形式。

音频 API 详情查看 [音频组件控制](https://uniapp.dcloud.net.cn/api/media/audio-context.html#createinneraudiocontext) 官方文档。

## 创建音频上下文
创建并返回内部 audio 上下文 innerAudioContext 对象。监听父传子的元素，把音频链接赋值给 src 属性。
```js
const context = ref(uni.createInnerAudioContext())

watch(() => props.audioContent, (newVal, oldVal) => {
	context.value.src = props.audioContent.playUrl;
	currentTime.value = context.value.currentTime;
}, {
	immediate: true,
	deep: true
})
```

## 监听音频加载完毕事件
回调函数 `onCanplay` 代表音频进入可以播放状态，但不保证后面可以流畅播放。触发事件后取消音频组件 `loading` 效果，并获取音频的总时长。
```js
context.value.onCanplay(() => {
	console.log("音频播放控件准备好了", context.value.buffered);
	duration.value = context.value.duration;
	loading.value = false
})
```

## 点击播放控件
点击播放控件按钮执行音频的播放、暂停、停止操作。

- 判断使用者是否购买
- 判断当前状态是否为播放状态
```js
const onPlay = () => {
	if (props.audioContent.allowAudition === 'Y' || props.audioContent.isFree === '1' || props.audioContent.buy === '1') {
		if (context.value.paused) {
			//播放
			onPlayAudio();
		} else if (!context.value.paused && context.value.duration > 0) {
			//暂停
			onPauseAudio();
		} else {
			//停止
			onStopAudio();
		}
	} else {
		uni.showToast({
			title: '你还未购买该音频哦',
			icon: 'none'
		})
	}
}
```

### 播放
调用 `play()` 方法播放音频，由于用户需要监听使用者的使用时长，按时间计费，因此调用开始音频接口。
```js
const onPlayAudio = async () => {
	context.value.play();
	playStatus.value = false;
	if (loopType.value) {
		uni.$emit('listen')
		const res = await startRecord({
			audioId: props.audioContent.id
		})
	}
}
```

### 暂停
调用 `pause()` 方法暂停音频，并调用结束音频接口。
```js
const onPauseAudio = async () => {
	context.value.pause();
	playStatus.value = true;
	const res = await stopRecord({
		audioId: props.audioContent.id
	})
  // 记录使用者听了多久的接口
	const result = await saveRecord({
		audioId: props.audioContent.id,
		duration: currentTime.value
	})
}
```

### 停止
调用 `stop()` 方法停止音频，并调用结束音频接口。
```js
const onStopAudio = async () => {
	if (!playStatus.value) {
		if (context.value) context.value.stop();
		playStatus.value = true;
		const res = await stopRecord({
			audioId: props.audioContent.id
		})
		if (currentTime.value !== 0) {
			const result = await saveRecord({
				audioId: props.audioContent.id,
				duration: currentTime.value
			})
		}
	}
}
```

## 音频播放过程
在播放时音频进度条会发生改变，需要利用 `onTimeUpdate()` 监听音频播放进度更新事件。

- 调用 `onTimeUpdate()` 事件
- 动态保存并显示当前播放的时间
- 修改进度条状态
```js
context.value.onTimeUpdate(() => {
	// 音频进度改变时，此回调有原生BUG，音频停止后会继续执行。加条件限制，音频停止时不执行该逻辑
	if (context.value.currentTime && !isSeeking.value && !context.value.paused) {
		if (context.value.currentTime >= duration.value) {
			Toast.value.show({
				title: '试听部分结束，请购买后听完整版',
				// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
				type: 'warning',
				icon: false
			})
			ended()
			return
		}
		currentTime.value = context.value.currentTime;
	}
})
```
进度条是通过 `uniapp` 提供的进度组件 `slider` 实现，参数如下：

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| min | Number | 0 | 最小值 |
| max | Number | 100 | 最大值 |
| step | Number | 1 | 步长，取值必须大于 0，并且可被(max - min)整除 |
| disabled | Boolean | false | 是否禁用 |
| value | Number | 0 | 当前取值 |
| activeColor | Color | 各个平台不同，详见下 | 滑块左侧已选择部分的线条颜色 |
| backgroundColor | Color | #e9e9e9 | 滑块右侧背景条的颜色 |
| block-size | Number | 28 | 滑块的大小，取值范围为 12 - 28 |
| block-color | Color | #ffffff | 滑块的颜色 |
| show-value | Boolean | false | 是否显示当前 value |
| @change | EventHandle |  | 完成一次拖动后触发的事件，event.detail = {value: value} |
| @changing | EventHandle |  | 拖动过程中触发的事件，event.detail = {value: value} |

获取到播放时间后赋值给 `slider` 组件的 `value` 属性，从而达到音频播放进度条上涨的效果。
```vue
<!-- 进度条 -->
<view class="audio-progress">
	<slider :min="0" :max="props.audioContent.totalDuration ? props.audioContent.totalDuration.toFixed(1) : duration.toFixed(1)" activeColor="#818181" backgroundColor="#C5C5C5"
		block-color="#818181" block-size="12" :value="currentTime.toFixed(1)" :step="0.1"
		@change="changeAudioProgress" @changing="changingAudioProgress" :disabled='loading' />
</view>
```

## 音频结束

- 恢复进度条为空
- 恢复播放时间为0
- 停止播放
```js
const ended = async () => {
	if (loopNum.value < loopNumAll.value) {
  	// 循环播放逻辑
		loopType.value = false
		loopNum.value += 1
		onPlayAudio()
	} else {
		loopNum.value = 0
		isSeeking.value = false;
		context.value.pause();
		context.value.startTime = 0;
		playStatus.value = true;
		currentTime.value = 0; // 进度条清空
		uni.$emit('listen', '') // 在听人数修改逻辑
		loopType.value = true // 在听人数修改逻辑
	}
	const res = await stopRecord({
		audioId: props.audioContent.id
	})
	const result = await saveRecord({
		audioId: props.audioContent.id,
		duration: currentTime.value
	})
}
context.value.onEnded(() => {
	ended()
})
```

## 拖动进度条

- 进度条拖拽时

动态修改当前进度条的长度
```js
const changingAudioProgress = (e) => {
	prevStatus.value = context.value.paused;
	currentTime.value = e.detail.value;
}
```

- 进度条拖拽结束
   1. 修改当前播放的时间
   2. 音频跳转到指定位置 `seek()`
```js
//进度条拖动结束
const changeAudioProgress = (e) => {
	isSeeking.value = true
	// 若拖动前音频呈播放状态，则防抖处理
	// 2022.11.8目前防抖未能彻底解决多次拖动后页面卡死问题
	if (!prevStatus.value) {
		// 防抖
		debounce(() => {
			context.value.startTime = e.detail.value;
			context.value.seek(e.detail.value);
		}, 500)
	} else {
		context.value.startTime = e.detail.value;
		context.value.seek(e.detail.value);
	}
}
```

## 音频下载
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
		url: props.detail.playUrl,
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

# 课程详情
效果如下图所示，需要实现视频播放功能。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29781801/1675128593536-76f63781-1c2c-4af0-a47a-68cad3c68308.png#averageHue=%23c9d4c8&clientId=u4be0b9f7-2df9-4&from=paste&height=710&id=u5d2b547a&name=image.png&originHeight=710&originWidth=337&originalType=binary&ratio=1&rotation=0&showTitle=false&size=157961&status=done&style=none&taskId=ueb8bcdc8-1b7e-4deb-b5c2-3aad519f911&title=&width=337)

## 阿里云播放器SDK
课程视频用户统一上传到阿里云服务器上，播放视频考虑使用阿里云sdk。详情可前往官方文档 [阿里云播放器sdk](https://help.aliyun.com/document_detail/125570.html) 查看。

### 引入资源
```html
<link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.12.1/skins/default/aliplayer-min.css" />  //（可选）如果您的使用场景需要用到H5模式的播放器，则需引用此css文件。
<script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.12.1/aliplayer-min.js"></script>  //（必须）引入js文件。
```

### 提供挂载元素
在结构中创建一个 `dom` 元素供点播器挂载，注意复制时看 `id` 是否对应。
```html
<div id="aliplayerVedio"></div>
```

### 播放设置
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

### 改造

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

### 总结
利用 `webview` 书写原生，根据官方文档实现阿里云点播器播放视频功能。
> 题外话：
> 最后使用的时候项目经理觉得体验感极差，让后端修改接口，直接返回视频的 `url` ，前端修改为使用 `uniapp` 自带的视频组件 `video` 。

# 活动详情
效果如下图所示。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29781801/1675129545381-370b1a74-daf5-4b3c-a7af-2d07f3fd7cee.png#averageHue=%23bec2a9&clientId=u4be0b9f7-2df9-4&from=paste&height=474&id=u276d4dc6&name=image.png&originHeight=474&originWidth=247&originalType=binary&ratio=1&rotation=0&showTitle=false&size=121890&status=done&style=none&taskId=u79a1e18c-f581-4835-8d60-44d49b560b4&title=&width=247)

下方是一个富文本内容，第一时间联想起使用富文本的几种方式。

## 富文本的使用方式

### rich-text
`rich-text` 是 `uni-app` 的内置组件，提供了高性能的富文本渲染模式。API参考 [rich-text](https://uniapp.dcloud.io/component/rich-text) 。

`rich-text` 的优势是全端支持、高性能。但是 `rich-text` 不支持内嵌视频，可以通过拆分多个 `rich-text`，中间插入 `video` 来实现。
> 注：
> 小程序端有个缺陷是只能整体设点击事情，无法对富文本中的图片、超链接单独设点击事件。

如果是图片，可以把内容拆成多个 `rich-text` 解决。


### v-html
`v-html` 指令，是 `web` 开发中很常用的。小程序不支持。

### uParse
`uView` 组件库有一个富文本解析器，详情可见官方文档 [富文本解析器](https://vkuviewdoc.fsq.pub/components/parse.html) 。

## uParse图片丢失
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
