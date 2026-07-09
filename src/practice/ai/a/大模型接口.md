# 大模型接口

## 前言

首先明确一点，对于大多数人来说，大模型不需要自己开发，也没这个能力。通常大家说的 AI 落地，都是调用各厂提供的大模型接口。

我们需要开发的是 AI 应用的前后端，使用的是 LLM 大模型接口。

## 国内大模型接口厂商类型

国内大模型接口厂商大致可以分为以下几类：

1. **涵盖多家大模型的集成接口**：除了自家模型外，还可以选择一些其他家的模型。如字节家和阿里家，还能搭配 deepseek、kimi 等
2. **大模型厂商自己的接口**：deepseek 和 kimi 都有自己的对外接口，这些接口一般模型只能选择自家的不同版本模型

## http 请求

基本大模型接口都是 `http` 接口，所以可以直接发起 `http` 请求。但是要注意需要找到可以用 `http` 直接请求的接口，它和后面用 `sdk` 库请求的是不一样的。

```js [http.js]
axios
  .post(
    '接口地址',
    {
      model: '模型名称',
      messages: [
        {
          role: 'user',
          content: '请求内容',
        },
      ],
    },
    {
      headers: {
        Authorization: 'Bearer 接口密钥',
        'Content-Type': 'application/json',
      },
    },
  )
  .then((res) => {
    console.log(res.data)
  })
```

上方代码可以看到，大模型的请求体有两个核心属性：

- `model`：模型名称，具体调用的大模型，通过看官方文档可以找到
- `messages`：请求内容，包括角色和内容

### role

- `system`：系统提示，一般用来设置大模型的行为，帮助 AI 更准确回答问题整体情况
- `user`：用户输入，
- `assistant`：大模型输出，AI 之前的回复。大模型接口没有状态，每次提问它是不会记得上一次的问题和回答的，所以需要带上

### content

`content` 不单单是一个字符串，如果涉及到图生图、图生文等，也可以是一个数组。

```js
{
  role: 'user',
  content: [
    {
      type: 'image_url',
      image_url: { url: '图片地址' },
    },
    {
      type: 'text',
      content: '把上方图片生成汇总文本',
    },
  ],
}
```

## http 响应

```js
"choices": [
  {
    'message': {
      'role': 'assistant',
      'content': '回复内容'
    },
    'finish_reason': 'stop',
    'index': 0,
    'logprobs': null
  }
],
"object": "chat.completion.chunk",
"usage": {
  // ...
},
"created_at": 1704179169,
"model": "模型名称",
"id": "请求id"
"system_fingerprint": "系统指纹"
```

### choices

核心是 `choices`，里面包含具体的回答，是我们核心要用的东西。里面通常只有一个选项，选择第一个就好。

`choices` 对象里包含：

- `message`：本次回答内容，`role` 是 `assistant`，`content` 是回答内容（如果是流式传输，没有 `message`，而是 `delta`）
- `finish_reason`：回答结束原因，`stop` 表示回答结束，`length` 表示回答长度超过限制
- `index`：回答的索引
- `logprobs`：回答对数概率，即模型认为该回答和提问的相关度，如果有多个回答，可做参考。一般不用

### 其他可能有用属性解析

- `id`：每次调用接口提问，接口的回答都有一个独特 `id`，这个 `id` 做流式传输有用
- `usage` 本次问答消耗的 `token` 相关

### 答疑

- Q: `message` 里必须带 `system` 和之前的问答记录吗？

  A: 可以不带，但是前面也提到过，接口是无状态的，带上可以提升回答的准确性

- Q: `role` 一定要准确带上吗?

  A: 还是准确性的问题，比如把 `system` 里的消息作为 `user` 给过去，多半回答也不会有问题，乱用 `role` 发消息也不会有大问题。只是准确的 `role` 有利于大模型回答的准确，并且也方便人看懂消息

- Q: 其他厂商的接口入参和出参也是这样的格式吗?

  A：不一定，但是大多数主流厂商都会遵循这样的一个消息格式。所以你可以把它当成标准。所以你可以当成都一样。
