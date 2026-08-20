# LangChain框架

## 含义

LangChain 是一个做大模型应用的开发框架

![LangChain框架](../../../../images/practice/ai/AI%20Agent+智能大屏设计器/LangChain.png)

## 流程

整体流程就是，当应用接收到用户的请求时（比如用户发了一个提示词），会调用 LangChain， LangChain会把这些提示词、模型、工具这些能力都准备好。

当需要复杂流程时则由 LangGraph 来控制执行步骤。过程可能会判断要不要调用工具、要不要人工干预，调完工具会把结果返回给模型。
