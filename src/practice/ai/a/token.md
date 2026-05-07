# token 消耗优化

## 钱

`token` 的消耗，可以简单理解为，你每次提问，给智能体接口传的字符越多，他回答的时候回答的越多，就会消耗越多的 `token`。

也就是每次提问，消耗的 `token` = **整个你传给大模型接口的message的字符量+大模型接口回答的字符量**。当然 `token` 不是按字符串量计算的，但是我们可以这么理解。给到大模型接口的字符串越多越多越费 `token`。

为了保障上下文，每轮回答都会把问答存入message，在推给智能体接口.用户一直问，岂不是 `token` 爆炸？

## token 优化

优化这个问题，其实最核心的就是限制对话记录的长度，去掉一些久远的，没必要再消耗 `token` 给到ai接口的对话

1. 限制最大长度，超出最大长度，按先进先出，截取掉之前老的记录

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

2. 超出最大长度，截取掉后，把截取部分让Al给我们做一个总结，不至于直接丢掉，减少对于上下文的影响

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

3. 超出最大长度，做向量回归（不推荐，难度高，专业需求高）

## 其他优化

1. 可以再输出要求中，限制一下长度。比如输入要求中说明，直接给代码，直接给结果。简单回答等。
2. 只携带基础上下文
   
   我们开发的智能体可能需要关联一些你本地个人的知识库，往往很庞大，但是并不是整个知识库的每一个知识都是和本次的提问相关的。我们可以只用必要的部分作为上下文。实际技术栈为RAG技术中的向量检索。