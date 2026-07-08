# 前端工具卡片

有的时候 AI 要做一件事情，需要给用户返回一个预制的卡片，来让用户做选择。比如：

1. 我要点外卖 -> 展示一个外卖选择ui组件 -> 选择后发送消息给ai-> ai完成订购
2. 我要买衣服 -> 展示一个衣服选择ui组件......

所以我们的工具不只是在服务器上执行逻辑，也有可能是让前端展示一个预制好的ui卡片，这就是前端工具卡片。

## 卡片逻辑

目前没有专门的定义前端卡片的规范，所以我们只能另辟蹊径:

1. 定义一些前端展示 function tool,说明你要前端展示某些东西，调用这个functiontool
2. 然后代码里检测到是前端展示 function tool。则直接下发一个消息给前端，role 保持 tool，但是加了一个自定义的 cardName 属性。

```js [tools.js]
const toolList = [
  // ...
  {
    type: 'function',
    function: {
      name: 'wm_card',
      description: '用户点外卖时，调用此工具让前端展示一个外卖选择的ui结构',
      paramenters: {
        kind: {
          type: 'string',
          description: '外卖的种类'
        }
      }
    }
  }
]
```