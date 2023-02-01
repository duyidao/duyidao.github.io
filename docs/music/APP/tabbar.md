---
title tabbar页
---
主页面 `tabBar` 页面根据高保真原型图设计开发即可。
<a name="gUc3a"></a>
## 首页轮播图跳转
用户有一个需求是点击轮播图的图片跳转到指定链接页面，uniapp 有一个内置的组件 [webview](https://uniapp.dcloud.net.cn/component/web-view.html#web-view) 。根据官方文档，为其 `src` 设置指定的网页链接后可跳转到该页面。可能常用属性如下：

| 属性名 | 类型 | 说明 |
| --- | --- | --- |
| src | String | webview 指向网页的链接 |
| webview-styles | Object | webview 的样式 |

更多属性前往官网查看

- 点击轮播图路由跳转
```vue
const swiperToPage = e => {
  // 如果有参数再跳转
	if (!e) return
	uni.navigateTo({
		url: `/pages/routerWebView/RouterWebView?src=${e}`
	})
}
```

- 拿到链接参数赋给 src 属性
```vue
<script setup>
import {onLoad} from '@dcloudio/uni-app';
import {ref} from 'vue'

const webviewStyles = ref({
	top: 0
})
const src = ref('')

onLoad((val) => {
	src.value = val.src
})
</script>

<template>
	<web-view :webview-styles="webviewStyles" :src="src"></web-view>
</template>
```
更多 `webview` 使用技巧可参考官网文档、DCloud上的问答 [在web-view加载的本地及远程HTML中调用uni的API及网页和vue页面通讯](https://ask.dcloud.net.cn/article/35083) 与这两篇文章 [在uniapp中优雅地使用WebView](https://www.kancloud.cn/xiaoyulive/uniapp/1849196) 、 [webview使用](https://blog.csdn.net/qq_40716795/article/details/127576627) 。
