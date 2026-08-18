# Token 消耗优化

## Token 消耗机制

<word text="Token" /> 的消耗可理解为：每次提问传给智能体接口的字符越多，回答越长，消耗的 <word text="Token" /> 越多。

每次提问消耗的 <word text="Token" /> = **传给大模型接口的 message 总字符量 + 大模型接口回答的字符量**。虽然 <word text="Token" /> 并非按字符串量精确计算，但可如此近似理解。给大模型接口的字符串越多，<word text="Token" /> 消耗越大。

为保障上下文，每轮问答都会存入 `message` 并推给智能体接口。用户持续提问将导致 <word text="Token" /> 消耗急剧增长。

## Token 优化策略

核心在于限制对话记录长度，移除久远且无需再消耗 <word text="Token" /> 的历史对话。

1. 限制最大长度，超出则按先进先出截取旧记录

   ```js [server.js]
   app.get('/llm', async (req, res) => {
     const keyword = req.query.keyword

     const queryObj = {
       role: 'user',
       content: keyword,
     }

     // 截取messageList长度，超过最大长度，截取掉之前老的记录 // [!code ++]
     // [!code ++]
     if (messageList.length > 10) {
       const removeNum = messageList.length - 6 // 算出要截取多少条 // [!code ++]
       messageList.splice(1, removeNum) // 第1条是系统上下文，一般情况需要保留 // [!code ++]
     } // [!code ++]

     messageList.push(queryObj) // 每次提问保存上下文
     const aiRes = await openai.chat.completions.create({
       model: '',
       messages: messageList,
     })
     messageList.push(aiRes.choices[0].message) // 每次回答保存上下文
     res.json(aiRes.choices[0].message.content)
   })
   ```

2. 超出最大长度后，将截取部分交由 AI 做总结，避免直接丢弃，减少对上下文的影响

   ::: code-group

   ```js [utils.js]
   async function getSummary(messageList) {
     const llmres = await openai.chat.completions.create({
       model: 'qwen-plus',
       messages: [
         {
           role: 'system',
           content: '帮我总结以下部分，并做一个摘要',
         },
         ...messageList,
       ],
     })

     return llmres.choices[0].message
   }
   ```

   ```js [server.js]
   import { getSummary } from './utils.js' // [!code ++]
   app.get('/llm', async (req, res) => {
     const keyword = req.query.keyword

     const queryObj = {
       role: 'user',
       content: keyword,
     }

     // 截取messageList长度，超过最大长度，截取掉之前老的记录
     if (messageList.length > 10) {
       const removeNum = messageList.length - 6
       const removeList = messageList.splice(1, removeNum) // [!code ++]
       const summaryRes = await getSummary(removeList) // [!code ++]
       messageList.splice(1, 0, summaryRes) // 把总结插入 // [!code ++]
     }

     messageList.push(queryObj) // 每次提问保存上下文
     const aiRes = await openai.chat.completions.create({
       model: '',
       messages: messageList,
     })
     messageList.push(aiRes.choices[0].message) // 每次回答保存上下文
     res.json(aiRes.choices[0].message.content)
   })
   ```

   :::

3. 超出最大长度，做向量回归（难度高，专业需求高，不推荐）

## 其他优化方式

1. 在输出要求中限制长度。如要求直接给代码、直接给结果、简短回答等。
2. 只携带基础上下文

   智能体应用可能关联本地知识库，规模往往庞大，但并非每条知识都与本次提问相关。应仅使用必要的部分作为上下文。实际技术栈为 <word text="RAG" /> 技术中的向量检索。
