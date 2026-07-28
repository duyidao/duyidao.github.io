# MapVThree 地图组件

## MapVThree 简介

<word text="MapVThree" /> 是百度地图官方的三维可视化库，用于在百度地图上实现三维数据可视化。

官方文档：[Mapvthree 开发文档](https://lbsyun.baidu.com/docs/jsapi?title=jsapithree/index)

由于地图方法在每个图层都要使用，因此需要统一封装成公共方法，通过传值的形式设置不同的属性。

### 技术架构图

![技术架构图](../../../images/work/百度/MapVThree-技术架构图.png)

### 地图方法封装

#### 点的封装

**实现原理**

根据官方文档，渲染点需要完成以下步骤：

![点的封装](../../../images/work/百度/MapVThree-点的封装.png)

**核心步骤**

1. 引入必要方法

    - `Icon`：用于创建点标记
    - `GeoJSONDataSource`：将数据转换为渲染所需的数据源

2. 添加点到地图

    - 调用地图实例的 `add()` 方法
    - 传参：宽度、高度、偏移量等

3. 获取数据源

    - 调用 `GeoJSONDataSource` 方法
    - 入参可通过 F12 打开网络控制台查看

4. 删除点

    - 调用地图实例的 `remove()` 方法

**数据结构示例**

```javascript
// GeoJSON 数据结构
const geoData = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lng, lat, altitude], // 坐标
    },
    properties: {
      icon: url,        // 图标图片路径
      size: 40,         // 尺寸大小
    },
  },
]
```

**代码实现**

```javascript
/**
 * 添加图标点
 * @param {Array} coordinates - 坐标数组 [lng, lat, altitude]
 * @param {String} url - 图标图片路径
 * @param {Object} info - 配置信息
 * @returns {Object} { icon, _engine }
 */
export const addIcon = (coordinates, url, info) => {
  // 确保坐标数组完整性
  coordinates = [coordinates?.[0], coordinates?.[1], coordinates?.[2] || 0]
  
  const {
    width = 92,
    height = 118,
    offset = [0, -50],
    geoData = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coordinates,
        },
        properties: {
          icon: url,
          size: 40,
        },
      },
    ],
    _engine = engine.value,
  } = info || {}
  
  // 创建 Icon 实例
  const icon = _engine.add(
    new Icon({
      width,
      height,
      vertexSizes: true,
      vertexIcons: true,
      transparent: true,
      offset,
      depthTest: false, // 深度检测
    })
  )
  
  // 加载数据源
  GeoJSONDataSource.fromGeoJSON(geoData).then((data) => {
    data.setAttribute('size').setAttribute('icon')
    icon.dataSource = data
  })
  
  return {
    icon,
    _engine,
  }
}

/**
 * 删除图标点
 * @param {Object} icon - 图标实例
 * @param {Object} _engine - 地图引擎实例
 */
export const removeIcon = (icon, _engine = engine.value) => {
  icon && _engine.remove(icon)
}
```

**参数说明表**

| 参数名        | 类型    | 默认值   | 说明             |
| ------------- | ------- | -------- | ---------------- |
| `width`       | Number  | 92       | 图标宽度（像素） |
| `height`      | Number  | 118      | 图标高度（像素） |
| `offset`      | Array   | [0, -50] | 偏移量           |
| `vertexSizes` | Boolean | true     | 顶点大小         |
| `vertexIcons` | Boolean | true     | 顶点图标         |
| `transparent` | Boolean | true     | 是否透明         |
| `depthTest`   | Boolean | false    | 深度检测         |

#### 线的封装

**实现原理**

渲染线的流程与点类似，但使用的是 `FatLine` 方法。

![线的封装](../../../images/work/百度/MapVThree-线的封装.png)

**核心步骤**

1. 引入必要方法

    - `FatLine`：用于创建线
    - `GeoJSONDataSource`：转换数据源

2. 添加线到地图

    - 调用地图实例的 `add()` 方法
    - 传参：线宽、线的颜色、线的坐标等

3. 获取数据源

    - 调用 `GeoJSONDataSource` 方法

4. 删除线

    - 调用地图实例的 `remove()` 方法

**代码实现**

```javascript
/**
 * 添加线
 * @param {Array} coordinates - 坐标二维数组
 * @param {Object} info - 配置信息
 * @param {Object} _engine - 地图引擎实例
 * @param {Function} callback - 回调函数
 * @returns {Object} { line, _engine }
 */
export const addLine = (coordinates, info, _engine, callback) => {
  if (!_engine) _engine = engine.value
  
  const { lineWidth, color, opacity } = info || {}
  
  // 创建 FatLine 实例
  const line = _engine.add(
    new FatLine({
      vertexColors: true,
      lineWidth,
      opacity,
      keepSize: true,
      lineJoin: 'round',
    })
  )
  
  // 构建 GeoJSON 数据
  const geojson = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates,
    },
    properties: {
      color: color,
    },
  }
  
  // 加载数据源
  GeoJSONDataSource.fromGeoJSON(geojson).then((geoData) => {
    geoData.setAttribute('color')
    line.dataSource = geoData
    callback && callback(geojson)
  })
  
  return { line, _engine }
}

/**
 * 删除线
 * @param {Object} line - 线实例
 * @param {Object} _engine - 地图引擎实例
 */
export const removeLine = (line, _engine = engine.value) => {
  line && _engine.remove(line)
}
```

**配置参数**

```javascript
// 线的配置示例
const lineConfig = {
  lineWidth: 15,          // 线宽
  color: '#d0a63c',       // 线的颜色
  opacity: 1,             // 透明度
  vertexColors: true,     // 顶点颜色
  keepSize: true,         // 保持大小
  lineJoin: 'round',      // 线条连接方式
}
```

#### 模型的封装

**实现原理**

使用 `GLTFLoader` 加载三维模型，并通过地图实例添加到场景中。

![模型的封装](../../../images/work/百度/MapVThree-模型的封装.png)

**核心步骤**
加载模型
使用 GLTFLoader 进行模型加载
添加到场景
通过地图实例的 add() 方法添加到场景
设置位置
使用 map.projectPointArr(center) 获取屏幕中心点坐标
设置模型的 position
load 回调
获取模型数据
设置坐标和大小
删除模型
使用地图实例的 remove() 方法移除
代码实现
javascript
12345678910111213141516171819202122232425262728293031323334353637383940414243444546
模型变换说明
变换类型
方法
说明
位置
model.position.set(x, y, z)
设置模型在场景中的位置
缩放
model.scale.setScalar(value)
统一缩放模型
旋转
model.rotation.x = Math.PI / 2
绕X轴旋转90度（GLTF模型通常需要）
视野漫游动画封装
实现原理
使用 PathTracker 实现相机沿路径移动的动画效果。
mermaid





代码
预览
核心步骤
引入方法
PathTracker：实现视野漫游动画
添加到地图
调用地图实例的 add() 方法
配置参数
设置方向插值的距离点阈值
赋值跟踪的路线和模型
设置视野漫游类型
开启动画
删除动画
调用地图实例的 remove() 方法
代码实现
javascript
1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253
参数详解
参数名
类型
默认值
说明
viewMode
String
'unlock'
视野模式（unlock/follow）
positions
Array
-
路径坐标数组
model
Object
-
跟踪的模型对象
duration
Number
10000
动画时长（毫秒）
distance
Number
50
相机与模型的距离
pitch
Number
70
相机俯仰角
heading
Number
10
相机航向角
interpolateDirectThreshold
Number
50
方向插值距离阈值
地图方法使用
封装策略
直接使用函数调用虽然可行，但存在以下问题：
无法直观知道当前渲染的地图数据来源和名称
❌ 无法轻松删除对应位置的地图数据
❌ 缺乏统一的管理机制
解决方案：封装管理类
mermaid





代码
预览
管理类封装步骤
mermaid





代码
预览
扎点组件
需求分析
根据 UI 图，扎点效果包含三个部分：
mermaid





代码
预览
扎点类型说明
扎点具有多种维度的区别：
维度
类型
说明
扎点类型
桥梁、边坡、隧道、路面等
不同的结构物类型
扎点状态
正常（绿色）、告警病害（红色）等
不同的业务状态
扎点尺寸
小尺寸、中尺寸、大尺寸
不同的显示大小
图片资源管理
命名规范：扎点类型_扎点大小_扎点状态
javascript
1234
类型映射表：
javascript
12345678
偏移量计算
javascript
123456789101112131415161718192021222324252627
图片路径生成
javascript
12345678910111213141516171819202122232425262728293031
事件绑定
javascript
1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556
LayerManager 完整实现
javascript
112113114115
使用示例
javascript
1234567891011121314151617181920212223242526
视野漫游动画组件
组件构成
视野漫游动画由三部分组成：
mermaid





代码
预览
PathTrackerManager 实现
javascript
88899091
使用示例
javascript
12345678910111213141516171819202122
执行流程图
mermaid





代码
预览
总结