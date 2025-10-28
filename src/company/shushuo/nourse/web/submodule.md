---
title: 数说故事Web端项目子模块导入
titleTemplate: 数说故事Web端项目子模块导入
description: 数说故事 web端 git submodule
head:
  - - meta
    - name: description
      content: 数说故事Web端项目子模块导入
  - - meta
    - name: keywords
      content: 数说故事 web端 git submodule
pageClass: shushuo-nourse-websubmodule
tags: web,submodule,git
---

# 项目子模块导入

Web 端项目中有一个子模块，导入其他项目，需要执行以下步骤：

1. 初始化子模块（如果还没初始化）

    ```bash
    git submodule init
    ```

2. 拉取子模块内容

    ```bash
    git submodule update
    ```

或者直接一步到位：

```bash
git submodule update --init
```