---

name: file-naming
description: 规范项目中的文件命名方式，确保文件名统一使用短横线连接（kebab-case），提高代码一致性与可读性。
-----------------------------------------------------------------

# 文件命名规范 Skill

该 Skill 用于规范项目中的文件命名方式，统一使用 **短横线连接命名（kebab-case）**。
通过统一的命名规则，可以提升项目可读性、降低维护成本，并避免多人协作时出现不同命名风格混杂的问题。

kebab-case 示例：

user-profile.vue
order-list.ts
create-user-form.vue

## 何时使用

在以下场景需要使用该 Skill：

* 创建新的文件时
* 重命名现有文件时
* 生成组件文件时
* 生成模块或工具文件时
* 生成页面或业务模块文件时

该规范适用于项目中的所有文件类型，例如：

* `.vue`
* `.jsx`
* `.tsx`
* `.ts`
* `.js`
* `.scss`
* `.json`
* `.md`

## 命名规则

所有文件名必须遵循以下规则：

1. 使用 **小写字母**
2. 单词之间使用 **短横线 `-` 连接**
3. 禁止使用驼峰命名（camelCase）
4. 禁止使用帕斯卡命名（PascalCase）
5. 禁止使用下划线连接（snake_case）
6. 禁止在文件名中出现空格

正确示例：

user-info.vue
product-card.vue
login-form.vue
request-client.ts
date-utils.ts

错误示例：

UserInfo.vue
userInfo.vue
user_info.vue
User-Info.vue

## Vue 组件命名约定

对于 Vue 组件文件，需要使用 **语义化 kebab-case** 命名。

推荐结构：

功能 + 类型

示例：

user-card.vue
user-avatar.vue
product-item.vue
order-table.vue
login-dialog.vue

如果是页面组件，可以使用：

页面名称 + page

示例：

user-center-page.vue
order-detail-page.vue

## 命名转换规则

如果用户提供的名称为以下格式，需要自动转换为 kebab-case：

camelCase 示例：

userProfile → user-profile

PascalCase 示例：

UserProfile → user-profile

snake_case 示例：

user_profile → user-profile

## 最终目标

通过该 Skill 确保项目：

* 所有文件命名风格统一
* 文件名称语义清晰
* 避免不同开发者使用不同命名方式
* 提高代码可维护性与团队协作效率
