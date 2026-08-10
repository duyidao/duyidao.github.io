---
name: scss-nesting
description: 规范组件开发中 SCSS 的书写方式，要求必须使用嵌套语法，且顶层类名尽量只保留一个。在编写或修改组件样式（SCSS / style 块）时自动应用。
---

# SCSS 嵌套规范

## 核心规则

1. **必须使用嵌套语法** —— 禁止在同一作用域内平铺多个选择器，所有子元素样式必须嵌套在父级选择器内部。
2. **顶层类名最少化** —— 一个组件的样式块只允许出现 **一个** 顶层类名（即组件根类名），所有其他样式均嵌套其中。

## 正确示例

```scss
.user-card {
  padding: 16px;

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .info {
    margin-left: 12px;

    .name {
      font-size: 16px;
      font-weight: 600;
    }

    .bio {
      font-size: 14px;
      color: var(--text-secondary);
    }
  }

  .actions {
    display: flex;
    gap: 8px;

    .btn {
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      &--primary {
        background: var(--color-fg);
        color: var(--color-bg);
      }
    }
  }
}
```

## 错误示例

```scss
/* ❌ 平铺写法，没有嵌套 */
.user-card {
  padding: 16px;
}
.user-card .avatar {
  width: 48px;
}
.user-card .info .name {
  font-size: 16px;
}

/* ❌ 多个顶层类名 */
.user-card {
  padding: 16px;
}
.avatar {
  width: 48px;
}
.actions {
  display: flex;
}
```

## 补充说明

- 使用 `&` 引用父选择器来处理伪类（`&:hover`）、伪元素（`&::before`）及修饰符类（`&--active`、`&.is-open`）。
- 嵌套层级建议不超过 **4 层**，过深时考虑调整 HTML 结构或拆分子组件。
