# Git Submodule 子模块管理指南

## 概述

在大型前端工程或微前端架构中，常需将公共组件库、工具函数或子应用作为独立仓库维护，并在主项目中引用。<word text="Git" /> 提供的 `submodule` 功能，允许将一个 <word text="Git" /> 仓库作为另一个 <word text="Git" /> 仓库的子目录，从而实现多仓库的依赖管理与版本锁定。

## 核心概念

`submodule` 并非简单的文件拷贝，而是主仓库中记录了一个指向子仓库特定 `commit` 的指针。这意味着：

1. 子仓库拥有独立的版本控制历史。
2. 主仓库仅记录子仓库的引用状态（`commit hash`）。
3. 团队成员拉取主仓库时，需显式初始化并拉取子模块代码。

## 常用命令矩阵

| 操作场景               | 命令                                   | 说明                                             |
| ---------------------- | -------------------------------------- | ------------------------------------------------ |
| 克隆包含子模块的仓库   | `git clone --recurse-submodules <url>` | 一步到位，克隆主仓库并自动初始化、拉取所有子模块 |
| 初始化已有仓库的子模块 | `git submodule init`                   | 在本地配置文件中注册子模块（不下载代码）         |
| 拉取子模块代码         | `git submodule update`                 | 根据主仓库记录的 `commit` 检出子模块代码         |
| 初始化并拉取（推荐）   | `git submodule update --init`          | 组合命令，适用于首次拉取或新增子模块后的同步     |
| 更新子模块至最新提交   | `git submodule update --remote`        | 拉取子模块远程最新代码，并更新主仓库的指针       |

## 标准工作流实践
1. 添加子模块
  
    在主项目根目录下，将远程仓库添加为子模块，并指定存放路径。

    ```bash
    git submodule add <submodule_repo_url> src/shared-components
    ```

    执行后，主项目会生成 .gitmodules 文件，记录子模块的路径与 URL。

2. 团队协同拉取
  
    其他开发者克隆主项目后，需执行以下命令同步子模块：

    ```bash
    git submodule update --init --recursive
    ```

    注意：`--recursive` 参数可确保嵌套的子模块（子模块中的子模块）也被正确初始化。

3. 更新子模块代码

    当子仓库有更新时，主项目需同步最新状态：

    ```bash
    # 进入子模块目录拉取最新代码
    cd src/shared-components
    git pull origin main

    # 返回主项目目录，提交子模块指针的变更
    cd ../..
    git add src/shared-components
    git commit -m "chore: update shared-components submodule"
    ```

## 常见问题与注意事项

1. 忘记拉取子模块：若直接 `git clone` 未加 `--recurse-submodules`，子模块目录将为空。需手动执行 `git submodule update --init`。
2. 分离头指针（Detached HEAD）：在子模块目录中直接修改代码并提交，会导致子模块处于 `Detached HEAD` 状态。正确做法是在子模块中创建分支、提交，推送到远程后，再在主项目中更新指针。
3. CI/CD 集成：在自动化构建流水线中，必须在 `git clone` 后显式执行 `git submodule update --init`，否则构建环境将缺失子模块代码导致编译失败。