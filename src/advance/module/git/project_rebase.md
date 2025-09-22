---
title: 多人合作项目变基处理
---

# 多人合作项目变基处理

公司项目组规定，每次新开发都要新建一个分支，开发完成之后，`merge` 合并到主分支。合并后该分支会自动被删除，下一次若想要开发，则再新建一个分支。这样做能有效防止代码混乱，保证代码的干净整洁。

但是如果多人合作开发，容易出现他人先提交 `merge` ，这样自己的分支就会落后几个提交。此时需要 `git rebase origin/main` 来变基，使自己的分支与主分支保持一致。

## 变基

Git Rebase 的主要作用为：

1. 整理提交历史：将一个分支的提交重新应用到另一个分支上
2. 保持线性历史：让提交历史更加清晰、线性
3. 解决冲突：在合并前解决潜在的冲突
4. 更新分支：将分支更新到最新状态

主要命令为：

```bash
# 将当前分支的提交重新应用到目标分支上
git rebase <target-branch>

# 例如：
git rebase main
git rebase origin/main
```

## 开发与提交

假设在自己的分支上完成了开发，在 `merge` 合并前需要 `rebase` 变基，使自己的分支与主分支保持一致，此时执行 `git rebase` 会报错，提示有改动，需要先提交。

此时需要先 `git add` 添加改动，然后 `git commit` 提交，再执行 `git rebase`。

但是这样很容易造成冲突，有一个邪修技巧，可以避免冲突：

1. 先在之前的分支继续开发
2. 等到需要提交的时候，再去基于 `main` 分支新建一个分支
3. 先 `git stash` 保存当前分支的改动，然后 `git checkout` 切换到刚刚新建的分支
4. `git stash pop` 恢复改动，如果提示有冲突，解决冲突后，再 `git add` 添加改动，`git commit` 提交
5. 最后直接在 `gitlab` 申请合并分支即可

这样做不需要变基，也能保证代码的干净整洁。

## 注意事项

- 不要对已经推送到远程的分支使用 `rebase`
- 只在本地分支上使用 `rebase`

`rebase` 是为了更好的本地体验，不是为了改变远程仓库的历史。

```bash
# 1. 本地整理提交历史（安全）
git checkout feature/user-auth
git rebase -i HEAD~2  # 只在本地操作

# 2. 如果需要分享，可以使用 merge
git checkout main
git merge feature/user-auth  # 创建新的合并提交

# 3. 或者使用 rebase 但只在本地
git checkout main
git pull origin main  # 获取最新
git checkout feature/user-auth
git rebase main       # 在本地更新
git checkout main
git merge feature/user-auth  # 安全合并
```
