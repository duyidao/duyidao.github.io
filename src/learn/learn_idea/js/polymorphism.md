---
title: 类的多态
author:
  - 远方os 什么？面相对象多态可以这样用？&https://www.douyin.com/video/7451645225144962367
---

# 类的多态

## 含义

多态是在父类中定义的属性和方法被子类继承后，可以有不同的实现。

## 使用场景

一个 H5 项目，允许钉钉登录，也允许微信登录，二者的登录业务逻辑不同，这里就需要使用到多态，做不同的逻辑处理。

## 实现

### 父类

先写一个父类，实现登录功能，调用一个 `getUserInfo()` 方法获取用户信息，然后调用 `login` 方法实现登录逻辑。`getUserInfo()` 方法在父类中不实现，由子类去实现。简要代码如下所示：

```ts [父类.ts]
function login(phone) {
  return `${phone} 登录成功`;
}

class BaseLogin {
  abstract getUserInfo(): Promise<{ phone: string }>;
  async login() {
    const { phone } = await this.getUserInfo();
    login(phone);
    console.log("登录成功");
  }
}
```

### 子类

接下来实现两个子类，各自实现各自的 `getUSerInfo` 功能，分别实现钉钉登录和微信登录。钉钉登录需要调用钉钉的 API，微信登录需要调用微信的 API，这里只是简单模拟一下，实际项目中需要调用对应的 API。简要代码如下所示：

```ts [子类.ts]
function login(phone) {
  return `${phone} 登录成功`;
}

class BaseLogin {
  abstract getUserInfo(): Promise<{ phone: string }>;
  async login() {
    const { phone } = await this.getUserInfo();
    login(phone);
    console.log("登录成功");
  }
}

class DingTalkLogin extends BaseLogin {
  // [!code ++]
  async getUserInfo() {
    // [!code ++]
    console.log("获取丁丁信息"); // [!code ++]
    await new Promise((resolve) => setTimeout(resolve, 1000)); // [!code ++]
    return { phone: "dingding" }; // [!code ++]
  } // [!code ++]
} // [!code ++]

class WeChatLogin extends BaseLogin {
  // [!code ++]
  async getUserInfo() {
    // [!code ++]
    console.log("获取微信信息"); // [!code ++]
    await new Promise((resolve) => setTimeout(resolve, 1000)); // [!code ++]
    return { phone: "wechat" }; // [!code ++]
  } // [!code ++]
} // [!code ++]
// [!code ++]
const loginMap = {
  // [!code ++]
  dingTalk: DingTalkLogin, // [!code ++]
  wechat: WeChatLogin, // [!code ++]
}; // [!code ++]
// [!code ++]
function loginFactory(type: "dingTalk" | "wechat") {
  // [!code ++]
  return new loginMap[type](); // [!code ++]
} // [!code ++]
// [!code ++]
loginFactory("dingTalk").login(); // [!code ++]
loginFactory("wechat").login(); // [!code ++]
```
