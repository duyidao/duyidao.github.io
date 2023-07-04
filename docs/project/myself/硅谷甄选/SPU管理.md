# SPU管理

SPU 管理模块页面效果如下所示：

![VRNnuC.png](https://i.imgloc.com/2023/07/02/VRNnuC.png)

主要需要注意的是 SPU 属性的添加。属性值通过接口调用获取，下拉框选择完属性后点击按钮可以添加到表格内。下一次选择的时候就无法再选择该属性，效果如下图所示：

[![pCrzUOI.png](https://s1.ax1x.com/2023/07/03/pCrzUOI.png)](https://imgse.com/i/pCrzUOI)

## 属性添加

点击按钮把用户选择的属性添加到表格中，主要步骤如下：

1. 调用接口获取数据，循环遍历渲染到选择器中
2. 点击添加按钮后把数据添加到表格数据绑定的数组中

首先需要获取数据并保存到一个数组内，通过 `v-for` 循环遍历数据渲染给 `el-option` 组件，代码如下所示：

```vue
<script setup ts>
// 计算出当前还未拥有的销售属性
const unSelectAttrList = computed(() => {
  let unSelectArr = spuAttrList.value.filter((item) => {
    return spuHasAttrList.value.every((item1) => {
      // 当该item项都不匹配，返回true，被filter过滤除去
      return item.name !== item1.saleAttrName
    })
  })
  return unSelectArr
})
</script>

<el-select
  v-model="saleChoseAttrVal"
  :placeholder="`还有${unSelectAttrList.length}个未选择`"
  :disabled="typeIsInfo"
>
  <el-option
    v-for="item in unSelectAttrList"
    :key="item.id"
    :value="`${item.id}:${item.name}`"
    :label="item.name"
  >
    {{ item.name }}
  </el-option>
</el-select>
<el-button
  :disabled="!saleChoseAttrVal && typeIsInfo"
  type="primary"
  icon="Plus"
  style="margin-left: 15px"
  @click="addAttrFn"
>
  添加销售属性
</el-button>
```

上方代码中，需要注意两个地方：

1. 通过计算属性把用户未选择的数据过滤处理，通过 `every()` 方法判断当前项是否与已选择属性数组内所有项相等，如果为真，则说明数组内已经有该数据，已经被选择过，此时应该被 `filter` 过滤出去。

   代码可以拆分为两步：

   - 判断当前项是否已被选择

     ```js
     spuAttrList.value.forEach((item) => {
       let flag = spuHasAttrList.value.every((item1) => item.name !== item1.saleAttrName)
     })
     ```

     `flag` 为 `true` 时表示当前项并不存在于已选择的数组内，`false` 反之

   - 过滤魏村在的数据为新的数组

     ```js
     let arr = spuAttrList.value.filter((item) => {
       let flag = spuHasAttrList.value.every((item1) => item.name !== item1.saleAttrName)
       return flag
     })
     ```

2. 接口需要传递 `id` ，而表格需要其 `name` 属性渲染，以往在处理 `:value` 时我们都是为其设置 `id` ，此处可以通过模板字符串拼接 `id` 和 `name` 的方式，获取两个需要属性

## 添加数据

点击添加按钮后解析出 `id` 和 `name` ，加上属性值数组组成新的对象，添加在表格列表数组中，再把选择框内的内容清空，代码如下所示：

```js
// 销售属性选择
const saleChoseAttrVal = ref('')
const addAttrFn = () => {
  console.log(saleChoseAttrVal.value)
  // 准备初始化新的对象
  const [baseSaleAttrId, saleAttrName] = saleChoseAttrVal.value.split(':')
  let newSaleAttr: spuSaleItemType = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  console.log(newSaleAttr)
  // 追加到属性表格中
  spuHasAttrList.value.push(newSaleAttr)
  saleChoseAttrVal.value = ''
}
```

通过点击表格的加号显示输入框，隐藏按钮，输入数据后回车或失焦时把数据保存到对象内，代码如下所示：

```js
// 输入框失焦事件
const handleBlurFn = (row: spuSaleItemType) => {
  const { saleAttrValue, baseSaleAttrId } = row
  // 如果为空，返回
  if(!saleAttrValue?.trim()) {
    ElMessage.warning('属性值不能为空')
    return
  }

  // 判断属性值是否在数组中存在
  const obj = row.spuSaleAttrValueList.find(item => item.saleAttrValueName === saleAttrValue)
  if(obj) {
    ElMessage.warning('已存在相同的属性值，请更换')
    return
  }

  let newSaleAttrValue: spuSaleAttrValueListType = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue!
  }

  // 往数组内新增数据
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
  row.saleAttrValue = ''
}
```

上方代码中，判断当前输入内容是否为空，为空则返回错误提示并阻止输入框失焦。判断用户输入的内容是否在当前对象数组内有重复数据，有也弹出提示。

最终效果实现。

## 编辑数据

在编辑数据时通过为编辑按钮绑定点击事件，传递当前项的对象数据来获取被选中的数据项，代码如下所示：

```js
const handleEditFn = (row) => {
  show.value = true
  initAttrData.value = row
}
```

此时能够获取到数据，页面也能回显，修改点击保存按钮后也能成功保存。

但是有一个潜在的问题，当我们再一次点击编辑，修改数据后，不需要保存这一次的修改了，点击取消按钮，发现数据同样也被改了，但是不是调接口，因此刷新后数据恢复正常。

这个 BUG 的原因是在赋值的时候，我们实际上是把复杂数据类型的对象类型的地址传过去。因此，数组内该项的数据与点击编辑时赋值的对象的数据的地址是一致的，也就造成了改了数据后视图发生变化。

解决方法：通过深拷贝来解决问题。