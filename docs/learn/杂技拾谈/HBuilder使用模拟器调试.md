# HBuilder使用模拟器调试

#### 下载安装手机模拟器

常见的安卓手机模拟器：

| 手机模拟器名称 | 对应端口号 |
| -------------- | ---------- |
| 夜神模拟器     | 62001      |
| 天天模拟器     | 6555       |
| 海马玩模拟器   | 26944      |
| 逍遥模拟器     | 21503      |
| 网易mumu模拟器 | 7555       |

以网易mumu 为例 ，下载地址：http://mumu.163.com/

下载后直接安装即可。

#### 开启电脑VT

VT(Virtualization Technology)是Intel为了在硬件层面上辅助[虚拟化](https://so.csdn.net/so/search?q=虚拟化&spm=1001.2101.3001.7020)技术实现，而在其用户平台上开发的虚拟化支持系统。

#### 配置环境变量

1）复制adb.exe所在文件夹目录

找到[HBuilder](https://so.csdn.net/so/search?q=HBuilder&spm=1001.2101.3001.7020) X 的安装目录，查找adb.exe文件，复制adb.exe所在文件目录的路径，配置到环境变量的Path中。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509170044374.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDY3MjYwMQ==,size_16,color_FFFFFF,t_70)
2）打开控制面板—系统和安全—系统—高级系统设置—环境变量，界面如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509170149610.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDY3MjYwMQ==,size_16,color_FFFFFF,t_70)
3）点击系统变量的Path 点击编辑后 ，把之前复制的adb.exe路径拷贝进来，点击保存。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020050917024653.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDY3MjYwMQ==,size_16,color_FFFFFF,t_70)

#### 4、安卓模拟器端口配置

点击Hbuilder的“运行”— 运行到手机或模拟器—Android模拟器端口设置。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509170355775.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDY3MjYwMQ==,size_16,color_FFFFFF,t_70)

#### 5、使用adb命令连接手机模拟器并测试

首先，打开mumu手机模拟器，在HBuilder x 中查看能否检测到设备。
如果 HBuilder x 未检测到 模拟器，需要使用adb命令进行连接。

运行cmd，执行以下命令行查看 adb 的版本（测试是否能使用）

```powershell
adb version
```

查看连接的设备

```powershell
adb devices
```

使用adb命令 让模拟器连接上电脑

```powershell
adb connect 127.0.0.1:7555
```

最后测试Hbuilder能否连接手机模拟器
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509171147890.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDY3MjYwMQ==,size_16,color_FFFFFF,t_70)