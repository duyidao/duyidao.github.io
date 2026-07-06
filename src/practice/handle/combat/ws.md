---
title: websocket实时进度
author:
  - 三十的前端课 websocket实战中的最佳实践&https://www.bilibili.com/video/BV1YzNCzVEmd
---

# websocket 实时进度

## 场景复现

现在有一个场景，在请求 `ws` 接口时，会分段展示当前的进度，比如执行中、执行完毕，并且展示最终的耗时。具体效果如下图所示：

![场景复现](https://pic1.imgdb.cn/item/68786ea058cb8da5c8bcb0f9.png)

具体流程图如下所示：

![流程图](https://pic1.imgdb.cn/item/6878ac6c58cb8da5c8be54b4.png)

## websocket 基本使用

1. `new` 浏览器自带的 `WebSocket` 对象，并传入 `ws` 接口地址，就可以发起对 `ws` 接口的请求。
2. `WebSocket` 对象有多个事件，比如 `open` 连接、`message` 来消息、`error` 连接出错、`close` 连接中断等。

就像前端请求接口，会把 `token` 放到请求头上，后端做验证，防止非法请求，`websocket` 也有类似的机制和做法，比如 `token`，`uid` 等。实现思路是通过 `ws` 接口地址，把 `token` 和 `uid` 一起传给后端，后端做验证。例如：

```js
const ws = new WebSocket(`ws://localhost:3000?token=${token}&uid=${uuid}`);
```

## 页面结构

页面代码如下所示：

```vue
<template>
  <div>
    <el-button @click="() => ws.send(JSON.stringify({ id: 1 }))"
      >查询流程1</el-button
    >
    <el-button @click="() => ws.send(JSON.stringify({ id: 2 }))"
      >查询流程2</el-button
    >
    <el-timeline style="max-width: 600px">
      <el-timeline-item
        v-for="(task, index) in taskLine"
        :key="index"
        :timestamp="handleSecond(task.duration || 0) + '秒'"
      >
        {{ task.name + (task.status === "finish" ? ":完成" : ":执行中") }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
```

## ws 传输

前后端交互主要靠 `ws` ，所以需要定义一个 `ws` 对象，用于传输数据。具体代码如下所示：

::: code-group

```js [app.js]
let retry = 0; // 重试次数
const taskLine = ref([]); // 任务列表
let timeInter = null; // 定时器
let ws = new WebSocket(`ws://localhost:3000?token=${token}&uid=${uuid}`);

ws.onopen = () => {
  console.log("连接成功");
  retry = 0; // 重置重试次数
};
ws.onmessage = (res) => {
  let socketMessage = JSON.parse(res.data);
  clearInterval(timeInter);
  // 如果不是connect，则处理数据；connect表示连接成功，第一次会发送
  if (socketMessage.type !== "connect") {
    // 如果是未完成，则开启定时器，每秒更新一次
    if (socketMessage.type === "undone") {
      let unfinishIndex = 0; // 当前等待完成的任务序号
      // 找到第一个当前正在执行的任务
      unfinishIndex = socketMessage.list.findIndex((item, index) => {
        return item.status === "unfinish";
      });

      // 开启定时器，每秒更新一次
      timeInter = setInterval(() => {
        socketMessage.list[unfinishIndex].duration
          ? (socketMessage.list[unfinishIndex].duration += 1000)
          : (socketMessage.list[unfinishIndex].duration = 1000);
        // 数组需要展开为新数组赋值，不然会被认定为旧数组，vue无法监听到数组的变化
        taskLine.value = [...socketMessage.list];
      }, 1000);
    }
    taskLine.value = socketMessage.list;
  }
};
ws.onclose = () => {
  retryFn();
};
ws.onerror = () => {
  retryFn();
};

// 时间取整
function handleSecond(time) {
  return (time / 1000).toFixed(2);
}
```

```js [server.js]
// 创建http服务
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running on port 3000");
});

// 创建ws服务器 - 使用 noServer 避免自动处理 upgrade
const wss = new WebSocket.Server({ port: 3000, noServer: true });

server.on("upgrade", (req, socket, head) => {
  const url = req.url; // 获取请求地址
  const token = new URL("http://localhost:3000" + url).searchParams.get(
    "token"
  ); // 获取token

  // token 验证不通过，401禁止访问
  if (!authenticateUser(token)) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }
  // 验证通过，升级为 ws 协议
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", (ws, req) => {
  now = 0;
  // 依次执行每一个任务
  function taskFinish(project, ws) {
    let time = Math.floor(Math.random() * 6 * 2 * 1000); // 随机一个持续时间
    setTimeout(() => {
      project.list[now].duration = time;
      project.list[now].status = "finish";
      if (now === project.list.length - 1) {
        project.projectStatus = "done";
        ws.send(JSON.stringify(project));
        return;
      }
      now += 1;
      ws.send(JSON.stringify(project));
      taskFinish(project, ws); // 递归调用
    }, time);
  }
  // 发送连接成功消息
  ws.send(JSON.stringify({ type: "connect", message: "连接成功" }));
  // 监听消息
  ws.on("message", (message) => {
    // 假设ID为1的已完成，为2的未完成
    const id = JSON.parse(message.toString()).id;
    if (id === 1) {
      ws.send(
        JSON.stringify({ type: "finish", message: "已完成", list: taskList1 })
      );
    } else {
      ws.send(
        JSON.stringify({ type: "undone", message: "未完成", list: taskList2 })
      );
      taskFinish(taskList2, ws);
    }
  });
  ws.on("close", () => {
    console.log("连接已关闭");
  });
});
```

:::

> [!IMPORTANT] 题外话
> `ws` 服务是基于 `http` 服务的升级，因此需要先创建一个 `http` 服务，再创建一个 `ws` 服务，并且需要把 `ws` 服务绑定到 `http` 服务上，这样 `ws` 服务才能处理 `http` 请求。

## 出错处理

在 `ws` 传输过程中，可能会出现连接中断的情况，比如网络断开，此时需要重新连接。具体代码如下所示：

```js
function retryFn() {
  if (retry > 4) {
    console.log("超出最大重试次数");
    return;
  }
  console.log("尝试重连");
  ws = new WebSocket(`ws://localhost:3000?token=${token}&uid=${uuid}`);
  // 基于新ws再去监听关闭和出错
  ws.onclose = () => {
    retryFn();
  };
  ws.onerror = () => {
    retryFn();
  };
  retry++;
}
```

## 定时探测

如果 `websocket` 很长时间没有给你消息，前端需要主动发一个消息。如果后端没有回应就主动断开。

::: code-group

```js [app.js]
let testTimeout = null; // 定时器 // [!code ++]
let testStatus = "ok"; // 探测状态 // [!code ++]
// 探测 // [!code ++]
function toTest() {
  // [!code ++]
  clearTimeout(testTimeout); // [!code ++]
  testStatus = "ok"; // [!code ++]
  console.log("开始探测"); // [!code ++]
  testTimeout = setTimeout(() => {
    // [!code ++]
    testStatus = "testing"; // [!code ++]
    console.log("10s无消息，探测一下"); // [!code ++]
    setTimeout(() => {
      // [!code ++]
      if (testStatus !== "ok") {
        // [!code ++]
        console.log("超时未响应，断开连接"); // [!code ++]
        ws.close(); // [!code ++]
      } // [!code ++]
    }, 2000); // [!code ++]
    ws.send(JSON.stringify({ test: "1" })); // 发送测试消息 // [!code ++]
  }, 10000); // [!code ++]
} // [!code ++]

ws.onmessage = (res) => {
  toTest(); // [!code ++]
  let socketMessage = JSON.parse(res.data);
  clearInterval(timeInter);
  // 如果不是connect，则处理数据；connect表示连接成功，第一次会发送
  if (socketMessage.type !== "connect") {
    // 如果是未完成，则开启定时器，每秒更新一次
    if (socketMessage.type === "undone") {
      let unfinishIndex = 0; // 当前等待完成的任务序号
      // 找到第一个当前正在执行的任务
      unfinishIndex = socketMessage.list.findIndex((item, index) => {
        return item.status === "unfinish";
      });

      // 开启定时器，每秒更新一次
      timeInter = setInterval(() => {
        socketMessage.list[unfinishIndex].duration
          ? (socketMessage.list[unfinishIndex].duration += 1000)
          : (socketMessage.list[unfinishIndex].duration = 1000);
        // 数组需要展开为新数组赋值，不然会被认定为旧数组，vue无法监听到数组的变化
        taskLine.value = [...socketMessage.list];
      }, 1000);
    }
    taskLine.value = socketMessage.list;
  }
};
```

```js [server.js]
wss.on("connection", (ws, req) => {
  // ... 省略部分代码
  // 监听消息
  ws.on("message", (message) => {
    // 处理探测 // [!code ++]
    const test = JSON.parse(message.toString()).test; // [!code ++]
    if (test) {
      // [!code ++]
      ws.send(JSON.stringify({ test: "ok" })); // [!code ++]
      return; // [!code ++]
    } // [!code ++]
    // 假设ID为1的已完成，为2的未完成
    const id = JSON.parse(message.toString()).id;
    if (id === 1) {
      ws.send(
        JSON.stringify({ type: "finish", message: "已完成", list: taskList1 })
      );
    } else {
      ws.send(
        JSON.stringify({ type: "undone", message: "未完成", list: taskList2 })
      );
      taskFinish(taskList2, ws);
    }
  });
});
```

:::
