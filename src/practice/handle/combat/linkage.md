---
title: Vue 复杂联动表单
author:
  - 三十的前端课 能让你学到很多的，vue复杂联动表单需求&https://www.bilibili.com/video/BV14QkeYsESm
---

# Vue 复杂联动表单

## 效果展示

![效果](https://pic1.imgdb.cn/item/67c6a327d0e0a243d40b6667.png)

具体效果如上图所示，进入该页面，筛选「投放区域」下拉框选择数据后，「投放详细」表格联动其数据，自动添加对应的数据到表格中，用户手动输入每个区域对应的委托人。输入完毕后在「目标人群」模块，新增数据添加目标人群，最后点击 “提交” 按钮，将数据提交到后端。

数据格式如下图所示：

![参数格式](https://pic1.imgdb.cn/item/67c69958d0e0a243d40b4de5.png)

## 数据流向梳理

拿到需求先不要急着做，先梳理一下数据流向。在这个案例中，不推荐每一个模块的下拉框、表格等各自使用一个变量，因为这样不方便联动数据，到时需要写很多额外的代码来处理。

因此，根据上图的数据格式，声明一个变量 `formData` 用来做数据存储，最后作为接口参数给到后端。

「投放区域」的下拉框不能使用 `v-model` 语法糖了，而是使用 `@change` 事件，手动处理数据并赋值到 `formData` 中。`:modul-value` 绑定 `computed` 计算属性计算出来的数据，当 `formData` 中的数据发生变化时，自动更新。

「投放详细」表格则直接使用 `formData` 变量作为数据源，用户修改委托人时直接修改 `formData` 中的数据。

最后「目标人群」直接修改 `formData` 中的数据很不方便，因此作为一个子组件，它自己使用自己的数据，父组件点击 “提交” 按钮后，获取到子组件的数据，循环 `formData` 变量，把从子组件拿到的数据添加到每个对象的 `crowd` 数组中。

## 页面架构

先给出页面的相关静态组件架构。

::: code-group

```vue [App.vue]
<script setup>
const options = [
  {
    value: "1",
    label: "区域1",
  },
  {
    value: "2",
    label: "区域2",
  },
  {
    value: "3",
    label: "区域3",
  },
  {
    value: "4",
    label: "区域4",
  },
];

const crowdTableRef = ref();

const formData = ref([]);

const computedValue = computed(() => {
  return "";
});

const handleChange = (value) => {};

const handleSubmit = () => {};
</script>

<template>
  <div>
    <el-select
      :model-value="computedValue"
      @change="handleChange"
      placeholder="请选择"
      multiple
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>

    <DetailTable :data="formData" />

    <CrowdTable ref="crowdTableRef" />

    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>
```

```vue [投放详细.vue]
<script setup>
const { data } = defineProps(["data"]);
</script>

<template>
  <el-table :data="data">
    <el-table-column label="区域名称" />
    <el-table-column label="投放责任人" />
  </el-table>
</template>
```

```vue [目标人群.vue]
<script setup></script>

<template>
  <el-table :data="data">
    <el-table-column label="人群名称" />
    <el-table-column label="目标量级" />
  </el-table>
  <div>
    <el-button type="primary">新增</el-button>
  </div>
</template>
```

:::

## 逻辑实现

<word text="Vue"/>/<word text="React"/>核心思想：

1. 数据驱动
2. 理清数据流向

前面分析了，整个功能都只使用 `formData` 一个响应式变量保存数据，后续传给后端。

### 投放区域

「投放区域」下拉框无法使用 `v-model` 语法糖简单双向绑定，这样无法把值保存到 `formData` 数组对象中并自定义格式，因此需要使用 `@change` 事件，触发事件后按照前面的数据格式，手动保存一个对象。

```vue [App.vue]
<script setup>
// 计算属性，获取当前选中的值用于下拉框回显 // [!code ++]
const computedValue = computed(() => {
  return '' // [!code --]
  return formData.value.map(item => item.name) // [!code ++]
})

const handleChange = (value) => {
  // 保存数据到 formData 每一个对象的 name 属性中 // [!code ++]
  formData.value = value.map(item => { // [!code ++]
    return { // [!code ++]
      name: item, // [!code ++]
      details: { // [!code ++]
        duty: '', // [!code ++]
      } // [!code ++]
      crowd: [] // [!code ++]
    } // [!code ++]
  }) // [!code ++]
}
</script>
```

### 投放详细

「投放详细」表格直接使用 `formData` 作为数据源，用户修改委托人时直接修改 `formData` 中的 `duty` 数据。在回显区域名称时，直接使用 `name` 属性显示的是 `code` 值，需要匹配对应的 `label` 值做回显。数组查找每次都需要循环，会造成一定的性能浪费，可以使用 `Map` 数据结构优化。

::: code-group

```vue [App.vue]
<script setup>
const options = [
  {
    value: "1",
    label: "区域1",
  },
  {
    value: "2",
    label: "区域2",
  },
  {
    value: "3",
    label: "区域3",
  },
  {
    value: "4",
    label: "区域4",
  },
];

const optionMap = {}; // [!code ++]
options.forEach((item) => { // [!code ++]
  // [!code ++]
  optionMap[item.value] = item.label; // [!code ++]
}); // [!code ++]
</script>

<template>
  <div>
    <el-select
      :model-value="computedValue"
      @change="handleChange"
      placeholder="请选择"
      multiple
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>

    <DetailTable :data="formData" :optionMap="optionMap" /> <!-- [!code ++] -->

    <CrowdTable ref="crowdTableRef" />

    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>
```

```vue [投放详细.vue]
<script setup>
const { data, optionMap } = defineProps(["data"]); // [!code ++]
</script>

<template>
  <el-table :data="data">
    <el-table-column label="区域名称" /> <!-- [!code --] -->
    <el-table-column label="投放责任人" /> <!-- [!code --] -->
    <el-table-column label="区域名称"> <!-- [!code ++] -->
      <template #default="{ row }"> <!-- [!code ++] -->
        {{ optionMap[row.name] }} <!-- [!code ++] -->
      </template> <!-- [!code ++] -->
    </el-table-column> <!-- [!code ++] -->
    <el-table-column label="投放责任人"> <!-- [!code ++] -->
      <template #default="{ row }"> <!-- [!code ++] -->
        <el-input v-model="row.details.duty" /> <!-- [!code ++] -->
      </template> <!-- [!code ++] -->
    </el-table-column> <!-- [!code ++] -->
  </el-table>
</template>
```

:::

> [!WARNING] 注意
> 这里子组件是直接修改了父组件 `props` 传递过来的参数，在 React 中不能这么做，需要 `@change` 子传父在伏组件修改变量；在 Vue 中只是其中的属性是允许的，如果整个对象全部替换则是不允许的。

### 目标人群

「目标人群」表格无法直接使用 `formData` 作为数据源，因为这里添加的数据要保存到全部对象的 `crowd` 数组内，如果直接使用 `formData` 作为数据源，`v-model` 只能绑定修改第一个对象内的数据。

解决方法是子组件自己声明一个变量保存数据，自己管自己。

最终父组件点击提交按钮时，获取到子组件的变量 `crowdArr`，循环 `formData` 数组，把子组件的变量 `crowdArr` 赋值给每一条对象的 `crowd` 数组内。

::: code-group

```vue [App.vue]
<script setup>
const crowdTableRef = ref();

const handleSubmit = () => {
  formData.value.forEach((item) => { // [!code ++]
    item.crowd = crowdTableRef.value.crowdArr; // [!code ++]
  }); // [!code ++]

  axios.get("/xxx", { params: formData.value }).then((res) => {}); // 模拟调用接口 // [!code ++]
};
</script>
```

```vue [目标人群.vue]
<script setup>
const crowdArr = ref([]); // [!code ++]
const handleAdd = () => { // [!code ++]
  crowdArr.value.push({ crowdName: "", crowdSize: "" }); // [!code ++]
}; // [!code ++]

defineExpose({ crowdArr }); // [!code ++]
</script>

<template>
  <el-table :data="data">
    <el-table-column label="人群名称" /> <!-- [!code --] -->
    <el-table-column label="目标量级" /> <!-- [!code --] -->
    <el-table-column label="人群名称"> <!-- [!code ++] -->
      <template #default="{ row }"> <!-- [!code ++] -->
        <el-input v-model="row.crowdName" /> <!-- [!code ++] -->
      </template> <!-- [!code ++] -->
    </el-table-column> <!-- [!code ++] -->
    <el-table-column label="目标量级"> <!-- [!code ++] -->
      <template #default="{ row }"> <!-- [!code ++] -->
        <el-input v-model="row.crowdSize" /> <!-- [!code ++] -->
      </template> <!-- [!code ++] -->
    </el-table-column> <!-- [!code ++] -->
  </el-table>
  <div>
    <el-button type="primary">新增</el-button> <!-- [!code --] -->
    <el-button type="primary" @click="handleAdd">新增</el-button> <!-- [!code ++] -->
  </div>
</template>
```

:::

### 优化修改

目前还是有两个需要优化修改调整的地方：

1. 一开始「投放区域」选择两条数据，「投放详细」填写好「投放责任人」，再删除一条「投放区域」数据，可以发现填写好的「投放责任人」被清掉了
2. 获取到数据时（比如查看详情操作等）「目标人群」表格数据无法回显

第一条 `Bug` 是因为最开始「投放区域」下拉框的 `@change` 事件添加数据时，是直接简单粗暴的添加了空的数据，没有对是否有数据进行判断，导致在删除数据时，删除了之前添加的数据。

第二个问题的解决方案是在子组件再暴露一个方法，父组件在获取到数据时，调用子组件的方法，把数据回显赋值到子组件的变量 `crowdArr` 中。由于每个对象的 `crowd` 数组数据都是一样的，因此随便获取任意一个数据的数据即可。

::: code-group

```vue [App.vue]
<script setup>
const handleChange = (value) => {
  // 保存数据到 formData 每一个对象的 name 属性中
  formData.value = value.map((item) => {
    let details = formData.value.find((i) => i.name === item)?.details || {}; // [!code ++]
    return {
      name: item,
      details: { // [!code --]
        duty: "", // [!code --]
      }, // [!code --]
      details, // [!code ++]
      crowd: [],
    };
  });
};

// 回显功能测试 // [!code ++]
const handleEcho = () => { // [!code ++]
  formData.value = [ // [!code ++]
    { // [!code ++]
      name: "北京", // [!code ++]
      details: { // [!code ++]
        duty: "张三", // [!code ++]
      }, // [!code ++]
      crowd: [ // [!code ++]
        { // [!code ++]
          crowdName: "人群1", // [!code ++]
          crowdSize: 100, // [!code ++]
        }, // [!code ++]
        { // [!code ++]
          crowdName: "人群2", // [!code ++]
          crowdSize: 200, // [!code ++]
        }, // [!code ++]
      ], // [!code ++]
    }, // [!code ++]
    { // [!code ++]
      name: "上海", // [!code ++]
      details: { // [!code ++]
        duty: "李四", // [!code ++]
      }, // [!code ++]
      crowd: [ // [!code ++]
        { // [!code ++]
          crowdName: "人群1", // [!code ++]
          crowdSize: 100, // [!code ++]
        }, // [!code ++]
        { // [!code ++]
          crowdName: "人群2", // [!code ++]
          crowdSize: 200, // [!code ++]
        }, // [!code ++]
      ], // [!code ++]
    }, // [!code ++]
  ]; // [!code ++]
  crowdTableRef.value.setCrowd(formData.value[0].crowd); // [!code ++]
}; // [!code ++]
</script>
```

```vue [目标人群.vue]
<script setup>
const crowdArr = ref([]);
const handleAdd = () => {
  crowdArr.value.push({ crowdName: "", crowdSize: "" });
};
const setCrowd = (value) => { // [!code ++]
  crowdArr.value = value; // [!code ++]
}; // [!code ++]

defineExpose({
  crowdArr,
  setCrowd, // [!code ++]
});
</script>
```

:::

## 完整代码

::: code-group

```vue [App.vue]
<script setup>
const options = [
  {
    value: "1",
    label: "区域1",
  },
  {
    value: "2",
    label: "区域2",
  },
  {
    value: "3",
    label: "区域3",
  },
  {
    value: "4",
    label: "区域4",
  },
];

const crowdTableRef = ref();

const formData = ref([]);

const handleChange = (value) => {
  // 保存数据到 formData 每一个对象的 name 属性中
  formData.value = value.map((item) => {
    let details = formData.value.find((i) => i.name === item)?.details || {};

    return {
      name: item,
      details,
      crowd: [],
    };
  });
};

// 计算属性，获取当前选中的值用于下拉框回显
const computedValue = computed(() => {
  return formData.value.map((item) => item.name);
});

const optionMap = {};

options.forEach((item) => {
  optionMap[item.value] = item.label;
});

const handleSubmit = () => {
  formData.value.forEach((item) => {
    item.crowd = crowdTableRef.value.crowdArr;
  });

  axios.get("/xxx", { params: formData.value }).then((res) => {}); // 模拟调用接口
};

// 回显功能测试
const handleEcho = () => {
  formData.value = [
    {
      name: "北京",
      details: {
        duty: "张三",
      },
      crowd: [
        {
          crowdName: "人群1",
          crowdSize: 100,
        },
        {
          crowdName: "人群2",
          crowdSize: 200,
        },
      ],
    },
    {
      name: "上海",
      details: {
        duty: "李四",
      },
      crowd: [
        {
          crowdName: "人群1",
          crowdSize: 100,
        },
        {
          crowdName: "人群2",
          crowdSize: 200,
        },
      ],
    },
  ];
  crowdTableRef.value.setCrowd(formData.value[0].crowd);
};
</script>

<template>
  <div>
    <el-select
      :model-value="computedValue"
      @change="handleChange"
      placeholder="请选择"
      multiple
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>

    <DetailTable :data="formData" :optionMap="optionMap" />

    <CrowdTable ref="crowdTableRef" />

    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>
```

```vue [投放详细.vue]
<script setup>
const { data, optionMap } = defineProps(["data"]);
</script>

<template>
  <el-table :data="data">
    <el-table-column label="区域名称">
      <template #default="{ row }">
        {{ optionMap[row.name] }}
      </template>
    </el-table-column>
    <el-table-column label="投放责任人">
      <template #default="{ row }">
        <el-input v-model="row.details.duty" />
      </template>
    </el-table-column>
  </el-table>
</template>
```

```vue [目标人群.vue]
<script setup>
const crowdArr = ref([]);
const handleAdd = () => {
  crowdArr.value.push({ crowdName: "", crowdSize: "" });
};
const setCrowd = (value) => {
  crowdArr.value = value;
};

defineExpose({ crowdArr, setCrowd });
</script>

<template>
  <el-table :data="data">
    <el-table-column label="人群名称">
      <template #default="{ row }">
        <el-input v-model="row.crowdName" />
      </template>
    </el-table-column>
    <el-table-column label="目标量级">
      <template #default="{ row }">
        <el-input v-model="row.crowdSize" />
      </template>
    </el-table-column>
  </el-table>
  <div>
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
</template>
```

:::
