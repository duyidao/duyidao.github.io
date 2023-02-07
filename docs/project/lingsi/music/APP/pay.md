---
title 支付页
---
# 支付
根据后端的接口文档，支付模块需要调用两个接口：

1. 创建订单

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29781801/1675152065701-6b9d7e64-5951-4174-9684-abd913ee051b.png#averageHue=%23fcfcfc&clientId=u5adcdb7a-f3c9-4&from=paste&height=404&id=uaf0671a2&name=image.png&originHeight=404&originWidth=1232&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35350&status=done&style=stroke&taskId=uffa56053-98f6-47a0-8681-b5497f31420&title=&width=1232)

创建成功后会返回相应的订单编号

2. 支付

拿到订单编号后调用支付接口

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29781801/1675152334364-5a97d59c-12ab-4d44-9b06-a120bf5136cc.png#averageHue=%23fbfbfb&clientId=u5adcdb7a-f3c9-4&from=paste&height=394&id=u766ac62e&name=image.png&originHeight=394&originWidth=1221&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33814&status=done&style=stroke&taskId=udc3eef2c-d26b-4358-89e9-eb6dd950fd2&title=&width=1221)
```javascript
// 点击支付按钮
const toPayFn = async () => {
  if (!checked.value) {
    uni.showToast({
      title: '请选择支付方式',
      icon: 'error'
    })
    return
  }
  const promotionGoods = uni.getStorageSync('couponGood') ? JSON.parse(uni.getStorageSync('couponGood')) : {}
  //发起创建订单接口请求
  shopStore.payFn({
    goodsId: info.value.id,
    type: info.value.belongs,
    promotionGoodsId: promotionGoods.id === info.value.id || isPromote.value === 'true' ? info.value.id : '',
    code: promotionGoods.code ? promotionGoods.code : '',
    couponId: couponObj.value.id ? couponObj.value.id : ''
  }).then(res => {
    switch (checked.value) {
      case 'wxpay':
        uni.showToast({
          title: '暂未支持微信支付',
          icon: 'none'
        })
        break;
      case 'alipay':
        realPay(res)
        break;
      default:
        break;
    }
  })
};
```

## 微信支付
由于项目客户未申请到微信开发者账号，因此暂时无法实现此业务。

## 支付宝支付

- 调用支付接口获取回调参数 `alipay sdk`
- 通过 `uni.requestPayment` 调用支付宝支付

**参数说明**

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `provider` | `String` | 是 | 服务提供商，通过 [uni.getProvider](https://uniapp.dcloud.net.cn/api/plugins/provider)<br /> 获取。 |
| `orderInfo` | `String/Object` | 是 | 订单数据，[注意事项](https://uniapp.dcloud.net.cn/api/plugins/payment#orderinfo) |
| `timeStamp` | `String` | 微信小程序必填 | 时间戳从1970年1月1日至今的秒数，即当前的时间。 |
| `nonceStr` | `String` | 微信小程序必填 | 随机字符串，长度为32个字符以下。 |
| `package` | `String` | 微信小程序必填 | 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。 |
| `signType` | `String` | 微信小程序必填 | 签名算法，应与后台下单时的值一致 |
| `paySign` | `String` | 微信小程序必填 | 签名，具体签名方案参见 [微信小程序支付文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3) |
| `bannedChannels` | `Array<String>` | 否 | 需要隐藏的支付方式，详见 [百度小程序支付文档](https://smartprogram.baidu.com/docs/develop/api/open_payment/#requestPolymerPayment/) |

```javascript
const realPay = (res) => {
  shopStore.orderPayFn({
    orderNo: res,
    provider: provider.value
  }).then(resu => {
    //调用uniapp API uni.requestPayment 支付接口
    uni.requestPayment({
      provider: 'alipay',
      //后台返回的订单数据
      orderInfo: resu.result.body,
      //调用成功的回调
      success(success) {
        uni.showToast({
          title: '支付成功',
          icon: 'success'
        })
      },
      //调用失败的回调
      fail(err) {
        uni.showToast({
          title: err.errMsg.split(']')[1],
          icon: 'none'
        })
      }
    })
  })
}

```

## 注意事项

### manifest.json配置相关参数

1. 在manifest.json - App模块权限选择 中勾选 payment(支付)
2. 在 manifest.json - App SDK配置 中，勾选需要的支付平台，目前有微信支付、支付宝支付、苹果应用内支付(IAP)，其中微信支付需要填写从微信开放平台获取的AppID
   
	![image.png](https://cdn.nlark.com/yuque/0/2023/png/29781801/1675153459411-cbfb222d-a554-4761-bbe6-01e3554e34b7.png#averageHue=%23fbf4e3&clientId=ube96eebc-a010-4&from=paste&id=u283c3e12&name=image.png&originHeight=510&originWidth=823&originalType=url&ratio=1&rotation=0&showTitle=false&size=29552&status=done&style=stroke&taskId=u03c7e62d-253f-47c2-be89-503f84719d1&title=)
3. 这些配置需要打包生效，真机运行仍然是HBuilder基座的设置，可使用自定义基座调试。离线打包请参考离线打包文档在原生工程中配置。
4. 配置并打包后，通过 `uni.getProvider` 可以得到配置的结果列表，注意这里返回的是manifest配置的，与手机端是否安装微信、支付宝无关。


### orderInfo参数
