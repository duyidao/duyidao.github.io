---
title: 如何提交 PR
titleTemplate: 如何给element-plus和ant-design-vue提交PR
head:
  - - meta
    - name: description
      content: 如何给element-plus和ant-design-vue提交PR
  - - meta
    - name: keywords
      content: element-plus ant-design-vue pr fork
---

# 如何提交 PR

## 我的 PR

### element-plus

- [style(theme-chalk): fix el-step padding-right in vertical layout](https://github.com/element-plus/element-plus/pull/22141)
- [style(theme-chalk): [form-item] reset top position label padding-right](https://github.com/element-plus/element-plus/pull/22965)
- [style(theme-chalk): el-form-item set label-position=left has pb](https://github.com/element-plus/element-plus/pull/22955)

已通过 2 个 PR。

### ant-design-vue

[style(steps): reset top direction title padding-right](https://github.com/vueComponent/ant-design-vue/pull/8427)。

这个 PR 还在审核中。

### vitest-dev

- [docs(runner): translate /config/runner.md](https://github.com/vitest-dev/docs-cn/pull/853)
- [docs(execargy): translate /config/execargv.md](https://github.com/vitest-dev/docs-cn/pull/861)
- [docs(hookTimeout): translate /config/hookTimeout.md](https://github.com/vitest-dev/docs-cn/pull/866)

已通过 2 个 PR。

## 步骤

### Fork

首先最重要的，是先 `fork` 仓库，创建一个属于自己的分支。创建成功后，就能看到有一个独属于自己的分支。

![fork一个分支](https://pic1.imgdb.cn/item/692fee944c455cbabc960b79.png)

点击后可以切换到自己的那个分支。

![切换到自己的那个分支](https://pic1.imgdb.cn/item/692fef724c455cbabc96117a.png)

### 拉取代码

基于自己的分支，`git clone` 拉取代码，然后 `git checkout` 切换到新的分支。这一步可选，但是切换分支能显得更规范。

然后 `pnpm i` 安装依赖，安装完毕后就可以开始运行项目修改代码了。

有一些项目的 PR 是需要先提交到一个临时用于合并的分支，统一时间后再一起合并到 `dev` 分支或主分支，此时即使在 Github 点击 `Sync fork` 按钮更新分支也没用，需要输入以下命令行：

```bash
git checkout -b docs/xxx upstream/merge
```

这个命令行的意思是，基于 `upstream` 仓库的 `merge` 分支，创建一个 `docs/xxx` 分支，并切换到 `docs/xxx` 分支。`upstream` 仓库可以通过 `git remote -v` 查看，如果想设置，可以执行命令 `git remote add upstream https://github.com/vitest-dev/docs-cn.git` 。

> [!WARNING] 注意
> 如果执行 `git checkout -b docs/xxx upstream/merge` 无效，报错 `fatal: 'upstream/merge' is not a commit and a branch 'docs/locators' cannot be created from it`，这说明当前项目没有关联上游的项目仓库。
>
> 解决方法为先执行 `git fetch upstream`，成功后会关联到上游仓库，终端会打印上游仓库的各个分支。
>
> ![终端打印](https://pic1.imgdb.cn/item/693fab3f4a4e4213d00583ad.png)
>
> 后续就能执行 `git checkout -b docs/xxx upstream/merge` 命令，基于 `merge` 分支新建分支了。

### 修改代码

#### element-plus

我的修改都是基于修改样式，所以在 `packages/theme-chalk/src` 目录找到对应的组件样式文件，然后修改样式。

如果想要修改的是组件代码，则需要去到 `packages/components/src` 目录找到对应的组件文件。

#### ant-design-vue

我的修改也是基于样式修改，所以在 `components/组件名称/style` 下找到对应的文件，然后修改样式。

#### vitest-cn

这个项目的 PR 主要围绕文档翻译，所以在 `docs-cn/config/` 目录下找到对应的文件，然后修改文档。

### 提交代码

修改完毕后，就该提交了，不同的代码仓库提交的流程也不一样，但是规范最终也是大相径庭。

#### element-plus

首先 `git add` 添加修改的文件，然后执行 `pnpm cz` ，根据提示填写提交信息。他会出现以下信息：

- type：修改类型，比如修复 bug，添加功能等
  
  ```bash
  feat     # 一个新功能（feature）
  fix      # 一个 bug fix
  docs     # 文档更新
  style    # 组件样式
  refactor # 代码重构（即不是新增功能，也不是修改bug的代码变动）
  test     # 添加缺失的测试或纠正现有的测试
  ```

  由于我修改的是样式，因此选择 `style` ，点击键盘的上下箭头，选中 `style` 后，回车。

- scope：修改范围。
  
  ```bash
  theme-chalk # 主题样式
  components  # 组件
  ```

  由于我修改的是主题样式，因此选择 `theme-chalk` ，点击键盘的上下箭头，选中 `theme-chalk` 后，回车。

- subject：修改内容。

  ```bash
  padding-right in vertical layout
  ```

  这里填写简短的改动标题，注意有字数限制，因此需要尽可能简短精干。

- body：修改内容详细描述。
  
  详细的描述，描述自己修改了啥，这里尽可能地详细描述，但不要太长，要易于阅读。

- breaking changes：是否破坏性修改。
  
- footer：关闭的 issue 编号。
  
  如果没有要关闭的 `issue` ，这里直接回车忽略

完毕后，`git push` 提交代码。

#### ant-design-vue

`ant-design-vue` 的提交流程没这么复杂，直接 `git add` 添加修改的文件，然后 `git commit` 提交代码，然后 `git push` 提交代码。

#### vitest-cn

前面提到的 `merge` 分支就是这个项目的，因此普通的 `git push` 不满足，它会默认提交到 `dev` 分支，从而报错。因此，需要使用 `git push origin <branch-name>` 提交代码，其中 `<branch-name>` 是分支名称。

### 创建 PR

提交完代码后，查看 Github 仓库，上方有一个 `Compare & pull request` 按钮，点击后，填写标题和描述，然后点击 `Create pull request` 按钮，提交 PR。

不同的是 `ant-design-vue` 在创建 PR 后，需要在 `markdown` 中，按照规范详细描述自己改动了啥。具体的规范可以参考：[feat[cssvar]: switch support cssvar](https://github.com/vueComponent/ant-design-vue/pull/7940)。参考这个 PR 的模板作为提交

### 等待

最后只需要等待管理员审核即可，审核通过后，就可以合并代码了。