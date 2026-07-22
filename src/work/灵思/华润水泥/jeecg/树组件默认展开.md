---
layout: doc
title: 华润水泥 树组件默认展开
titleTemplate: 华润水泥 树组件默认展开
description: 华润水泥 jeecg 后台管理 低代码 a-tree
head:
  - - meta
    - name: description
      content: 华润水泥 树组件默认展开
  - - meta
    - name: keywords
      content: 华润水泥 jeecg 后台管理 低代码 a-tree
pageClass: lingsi-jeecg-tree
tags: a-tree,defaultExpandAll
---

# 树组件默认展开

用户要求树组件默认展开，一般树结构都会有默认展开、指定展开的 `API` ，查阅官方文档，果不其然可以使用 `defaultExpandAll` 字段，设置为 `true` 即可。

试用一下：

```jsx
<a-tree
  checkable // 显示多选框
  @check="onCheck"
  :treeData="membersTree"
  :defaultExpandAll='true'
  @expand="onExpand"
/>
```

刷新项目后查看效果，发现并没有用。

## 解决方案

继续翻阅文档，发现个属性，换一种思路，默认展开全部树节点 === 展开指定树节点字段中设置全部的节点 `id` ，该思路成立。把上方代码修改一下：

```jsx
<a-tree
  checkable // 显示多选框
  @check="onCheck"
  :treeData="membersTree"
  :defaultExpandAll='true'
  :expandedKeys.sync='iExpandedKeys' // [!code highlight]
  @expand="onExpand"
/>

<script> // [!code highlight]
export default { // [!code highlight]
  methods: { // [!code highlight]
    initData() { // [!code highlight]
  		getAction(this.url, this.params).then(res => { // [!code highlight]
    		if (res.code == 200) { // [!code highlight]
      		this.membersTree = res.result // [!code highlight]
      		this.iExpandedKeys = this.membersTree.map(item => item.id) // 要保存节点的id // [!code highlight]
    		} // [!code highlight]
  		}) // [!code highlight]
    }, // [!code highlight]
  } // [!code highlight]
} // [!code highlight]
</script> // [!code highlight]
```

刷新页面查看效果，发现能够默认展开全部的树节点。
