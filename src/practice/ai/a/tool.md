# Function tool

## 是什么

### 问题思考

我们问 AI 问题，AI 可以用文字给我们答案，但是我们去让 AI 做一些事情呢？比如让他帮你订个票。那么 AI 大概率只会说怎么订票。不能直接帮你定了。

### 上下文方案解决

#### 代码

可以用上下文解决，告诉 AI，如果用户要订票，就返回一个 `json` 数据给我，我在代码里读取到 AI 返回了这个数据。我就调用提前写好的订票方法，去订票。

::: code-group

````md [context2.md]
# 角色

你是一个个人助手

# 逻辑

1. 用户如果要订票，则返回如下json，json中的target属性，就是用户本次订票的目的地。当你返回json数据时，不要代码md格式，直接返回json数据。

```json
{
  "type": "ticket",
  "arguments": {
    "target": "目的地"
  }
}
```
````

```js [server.js]
app.get('/simple', async (req, res) => {
  const { keyword } = req.query
  const system = fs.readFileSync('./context2.md')
  const systemString = systemString.toString()
  const llmres = await openai.chat.completions.create({
    model: 'qwen-plus',
    messages: [
      {
        role: 'system',
        content: systemString,
      },
      {
        role: 'user',
        content: keyword,
      },
    ],
  })
  const message = llmres.choices[0].message
  const content = JSON.parse(message.content)
  if (content.type === 'ticket') {
    // 调用订票方法。真正做订票这个事情，是通过提前写好的代码来实现的。
    const ticket = await ticket(content.arguments.target)
    res.json(ticket)
  }
  res.json(message)
})
```

:::

#### 缺陷

好像能实现一句话让 AI 帮我们订票的功能了。但是这个时候有几个问题：

1. 我们 `json` 是在 `content` 里返回的，但是如果用户不是要订票，只是普通的和大模型聊天，那么 `content` 就是会是普通文本，而不是 `json` 字符串。你去 `JSON.parse` 就会报错。而且很明显，这样的 `json` 我们不能给用户返回。其实核心就在于，我们不好区分这一次返回的 `content` 到底是要调用我们内置方法的 `json`，还是单纯的文本回答。
2. 不一定所有的大模型都能标准理解你的上下文，标准的返回 `json`。有的大模型可能给 `json` 的同时给你几个文字，有的
   可能带 `md` 语法给你

区分开大模型要调用我们的方法做事情，还是单纯给回答。

希望所有的大模型都能统一理解，统一返回。

### function tool 解决

意义：AI 只能做语言回答，逻辑思维。他做不了具体的工作，我们可以告诉ai我们有哪些工具。你需要做这件事的时候就掉这个工具。

规范：所有的大模型接口都遵循同样的 function tool 定义规范，以及输出规范。也就是我们告诉大模型我们有哪些工具，是同一种格式输入，大模型说明要调用哪个工具也是一种格式输出。

区分：大模型要调用 function tool 会专门有一个字段，不会和 `content` 混着，并且我们把结果告诉大模型，也有一个专门的 role-tool。

#### 定义 function tool

```js
const response = await openai.chat.completions.create({
  ...message, // model 等属性
  tools: [
    {
      type: 'function', // 固定值
      function: {
        name: 'ticket', // 工具名称
        description: '订票工具', // 工具描述
        // 工具参数，用 JSON Schema 定义
        parameters: {
          type: 'object', // 参数类型
          properties: {
            city: {
              type: 'string', // 参数类型
              description: '出发城市', // 参数描述
            },
          },
          required: ['city'], // 必填参数
        },
      },
    },
  ],
})
```

#### 代码

::: code-group

```js [tools.js]
// [!code ++]
const tools = [
  // [!code ++]
  {
    type: 'function', // [!code ++]
    // [!code ++]
    function: {
      name: 'ticket', // [!code ++]
      description: '当用户需要订票的时候调用此订票工具', // [!code ++]
      // [!code ++]
      parameters: {
        type: 'object', // [!code ++]
        // [!code ++]
        properties: {
          // [!code ++]
          target: {
            type: 'string', // [!code ++]
            description: '用户要去的城市目的地', // [!code ++]
          }, // [!code ++]
        }, // [!code ++]
        required: ['target'], // [!code ++]
      }, // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
]

const toolMap = {
  ticket() {},
}

module.exports = {
  tools,
  toolMap,
}
```

```js [server.js]
const { tools, toolMap } = require('./tools.js') // [!code ++]

app.get('/simple', async (req, res) => {
  const { keyword } = req.query
  const system = fs.readFileSync('./context2.md')
  const systemString = systemString.toString()
  const llmres = await openai.chat.completions.create({
    model: 'qwen-plus',
    messages: [
      {
        role: 'system',
        content: systemString,
      },
      {
        role: 'user',
        content: keyword,
      },
    ],
    tools: tools, // [!code ++]
  })
  const message = llmres.choices[0].message
  res.json(message)
})
```

:::

#### 加上流式

我们工作上的接口肯定都是流式传输的，所以我们我们现在加上流式传输。

如果你是流式传输，大模型调用 function tool 肯定也是分片段一点点返回，但是我们要记住大模型调用 function tool，**一定要等他全部返回了再去处理。而不是像返回文本那样，可以返回一点，处理一点**。

```js [server.js]
const { tools, toolMap } = require('./tools.js')

app.get('/simple', async (req, res) => {
  const { keyword } = req.query
  const system = fs.readFileSync('./context2.md')
  const systemString = systemString.toString()
  const llmres = await openai.chat.completions.create({
    model: 'qwen-plus',
    messages: [
      {
        role: 'system',
        content: systemString,
      },
      {
        role: 'user',
        content: keyword,
      },
    ],
    tools: tools,
    stream: true, // [!code ++]
  })
  const chunkList = [] // 单纯用来查看数据用，无实际用处 // [!code ++]
  // [!code ++]
  for await (const chunk of llmres) {
    // [!code ++]
    chunkList.push(chunk)
    // [!code ++]
  }
  fs.writeFileSync('./chunk.json', JSON.stringify(chunkList, null, 2)) // 单纯用来查看数据用，无实际用处 // [!code ++]
  const message = llmres.choices[0].message
  res.json(message)
})
```

查看数据格式，前面的内容和之前的没两样，直到 `choices` 中的 `delta` 内有变化，多了一个 `tool_calls` 字段，这个字段就是 function tool 的返回结果。它的返回逻辑如下：

1. 一开始会返回完整的数据对象，包含 `id`、`index`、`type`、`function` 对象，`function` 对象包含 `name` 和 `arguments` 两个属性，`name` 是函数名，`arguments` 是函数参数。
2. 后续的 `arguments` 会拆成片段，一点一点返回出去。但是属性可能会缺失，如 `name` 和 `id`。

```json
[
  {
    // ...
    "choices": [
      {
        // ...
        "delta": {
          "content": "",
          "role": "assistant",
          "tool_calls": [
            {
              "index": 0,
              "id": "tool_0",
              "type": "function",
              "function": {
                "name": "ticket",
                "arguments": ""
              }
            }
          ]
        }
      }
    ]
  },
  {
    // ...
    "choices": [
      {
        "delta": {
          "tool_calls": [
            {
              "function": {
                "arguments": "beijing"
              },
              "index": 0,
              "id": "",
              "type": "function"
            }
          ]
        }
      }
    ]
  }
]
```

了解了数据格式后，接下来就是实现 `tool_calls` 的处理逻辑了。

```js [server.js]
const { tools, toolMap } = require('./tools.js')

app.get('/simple', async (req, res) => {
  const { keyword } = req.query
  const system = fs.readFileSync('./context2.md')
  const systemString = systemString.toString()
  const llmres = await openai.chat.completions.create({
    model: 'qwen-plus',
    messages: [
      {
        role: 'system',
        content: systemString,
      },
      {
        role: 'user',
        content: keyword,
      },
    ],
    tools: tools,
    stream: true,
  })
  // [!code ++]
  let resObj = {
    role: 'assistant', // [!code ++]
    id: '', // [!code ++]
    content: '', // [!code ++]
  } // [!code ++]
  // [!code ++]
  for await (const chunk of llmres) {
    const delta = chunk.choices[0].delta // [!code ++]
    resObj.id = chunk.id // [!code ++]
    resObj.content += delta.content // [!code ++]
    // 判断是否有方法调用 // [!code ++]
    // [!code ++]
    if (delta.tool_calls && delta.tool_calls.length > 0) {
      // 拼接 tool_calls 部分 // [!code ++]
      // [!code ++]
      if (resObj.tool_calls) {
        // 已经是第一个以后的 chunk，直接走拼接 // [!code ++]
        // [!code ++]
        delta.tool_calls.forEach((toolCall) => {
          const toolIndex = toolCall.index // [!code ++]
          // 根据index找到resObj，要拼接的对象
          const targetTool = resObj.tool_calls[toolIndex] // [!code ++]
          // [!code ++]
          if (chunkTool.function?.name) {
            targetTool.function.name += chunkTool.function.name // [!code ++]
          } // [!code ++]
          // [!code ++]
          if (chunkTool.function?.arguments) {
            targetTool.function.arguments += chunkTool.function.arguments // [!code ++]
          } // [!code ++]
        }) // [!code ++]
      } // [!code ++]
      // [!code ++]
      else {
        // 是第一个 chunk，走赋值 // [!code ++]
        resObj.tool_calls = delta.tool_calls
      } // [!code ++]
    } // [!code ++]
  } // [!code ++]
  res.end() // [!code ++]
})
```

## 执行 Function tool

### 流程图

![alt text](image-7.png)

### 代码

```js [server.js]
const { tools, toolMap } = require('./tools.js')

app.get('/simple', async (req, res) => {
  const { keyword } = req.query
  const system = fs.readFileSync('./context2.md')
  const systemString = systemString.toString()
  const llmres = await openai.chat.completions.create({
    model: 'qwen-plus',
    messages: [
      {
        role: 'system',
        content: systemString,
      },
      {
        role: 'user',
        content: keyword,
      },
    ],
    tools: tools,
    stream: true,
  })

  let resObj = {
    role: 'assistant',
    id: '',
    content: '',
  }

  for await (const chunk of llmres) {
    const delta = chunk.choices[0].delta
    resObj.id = chunk.id
    resObj.content += delta.content
    // 判断是否有方法调用

    if (delta.tool_calls && delta.tool_calls.length > 0) {
      // 拼接 tool_calls 部分

      if (resObj.tool_calls) {
        // 已经是第一个以后的 chunk，直接走拼接

        delta.tool_calls.forEach((toolCall) => {
          const toolIndex = toolCall.index
          // 根据index找到resObj，要拼接的对象
          const targetTool = resObj.tool_calls[toolIndex]

          if (chunkTool.function?.name) {
            targetTool.function.name += chunkTool.function.name
          }

          if (chunkTool.function?.arguments) {
            targetTool.function.arguments += chunkTool.function.arguments
          }
        })
      } else {
        // 是第一个 chunk，走赋值
        resObj.tool_calls = delta.tool_calls
      }
    }
  }
  // [!code ++]
  if (resObj.tool_calls && resObj.tool_calls.length > 0) {
    const toolCalls = resObj.tool_calls
    for (let toolIndex = 0; toolIndex < toolCalls.length; toolIndex++) {
      const singleToolCall = toolCalls[toolIndex] // [!code ++]
      const toolName = singleToolCall.function.name // 工具名称 // [!code ++]
      const toolArguments = JSON.parse(singleToolCall.function.arguments) // 工具参数 // [!code ++]
      const result = await toolMap[name](arguments) // 方法执行可能是异步的 // [!code ++]
      const toolQueryObj = {
        role: 'tool',
        content: result,
        id: singleToolCall.id
      }
      const llmres = await openai.chat.completions.create({
        model: 'qwen-plus',
        messages: [
          {
            role: 'system',
            content: systemString,
          },
          ...singleConvertList,
          toolQueryObj
        ],
        tools: toolList,
        stream: true
      })
    }
  }
  res.end()
})
```

### 过滤

我们前面提到过，调用 function tool 不需要让前端展示，我们希望前端不感知调用了 function tool。比如订票，我们希望用户说要订票，然后直接收到答复订票成功。大模型要调用工具以及工具的执行结果都不该展示。

1. 前端判断 `content` 为空字符串，则不展示就好
2. `role` 为 `tool` 的消息也不展示