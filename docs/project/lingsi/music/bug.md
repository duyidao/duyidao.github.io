---
title bug
---
# 记录
这里记录着项目开发到打包中所遇到的问题。

## 打包失败
今天打包项目的时候一直打包失败，打开app页面一片空白。但是真机调试结果一切正常，为此搞了一整天。
![error](https://s1.ax1x.com/2023/02/08/pS2vHqH.jpg)
![error1](https://s1.ax1x.com/2023/02/08/pS2xpQS.jpg)

经过百度和询问项目经理，发现是 HBuildX 更新的原因，他的版本是 3.6.14 ，而我更新到 3.7.0 ，更新带来的bug导致打包失败。

最后，卸载重新安装 3.6.14 版本的 hbuildx 后打包成功了。