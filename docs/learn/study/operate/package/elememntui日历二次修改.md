# elememntui 日历二次修改

![需求效果](https://pic1.imgdb.cn/item/67dd07b288c538a9b5c2ad2c.png)

效果图如上所示，日历下方会有一个待办事项，存在待办事项的日期会显示一个圆点，绿色表示已完成，黄色表示未完成。点击有待办事项的日期会出现一个弹框，展示对应的待办事项，点击没有待办事项日期则不会展示弹框。

## 思路

第三方库按需求改造方案一般为：

- 尽量 `css` 改造
- `css` 改造不行再 `js` 操作 `dom`

## 实现

引入 `element-ui` 的 `calendar` 组件，这部分代码略过，快进到实现需求。

### 圆点与弹框

`template` 模块通过插槽 `slot` 获取组件暴露出来的参数，该参数是一个对象，包含 `date` 和 `data` 两个字段，值如下：

```js
{
  date: "wed Apr 04 2024 00:00:00 GMT+0800 (中国标准时间)",
  data: {
    day: '2024-04-04',
    isSelected: false,
    type: 'current-month',
  }
}
```

通过 `data` 字段中的 `day` 可以获取到日期，根据该字段实现页面回显。

创建一个函数，接收 `day` 字段，遍历后端返回的数组数据，判断是否与当前日期一致，一致说明当天日期有任务，再判读任务是否完成，完成则返回 `finish` ，未完成返回 `unfinish` ，作为插槽 `div` 的类名。最后通过设置类名实现圆点效果。

接下来实现点击日期弹出弹框，展示对应的待办事项。

::: code-group

```vue [app.vue]
<template>
  <el-calendar>
    <template v-slot:dateCell="obj">
      <div :class="getClassName(obj.data.day)">
        {{ obj.data.day.split("-")[2] }}
      </div>
      <div v-if="isInit(obj.data.day)" class="tooltip">
        <span v-for="item in getList(obj.data.day)" :key="item">{{
          item
        }}</span>
      </div>
    </template>
  </el-calendar>
</template>
```

```js [app.js]
const res = [
  {
    day: "2024-04-04",
    finish: true,
    list: ["任务1", "任务2"],
  },
  {
    day: "2024-04-05",
    finish: false,
    list: ["任务1", "任务2"],
  },
  {
    day: "2024-04-06",
    finish: false,
    list: ["任务1", "任务2"],
  },
  {
    day: "2024-04-07",
    finish: true,
    list: ["任务1", "任务2"],
  },
  {
    day: "2024-04-08",
    finish: true,
    list: ["任务1", "任务2"],
  },
];

const getClassName = (day) => {
  let classObj = {};
  const item = res.find((item) => item.day === day);
  if (item) {
    classObj.hasState = true; // 有任务
    item.finish ? (classObj.finish = true) : (classObj.unfinish = true); // 任务完成状态
  }
  return classObj;
};

const isInit = (day) => {
  return res.find((item) => item.day === day);
};

const getList = (day) => {
  return res.find((item) => item.day === day).list;
};
```

```css [app.css]
.hasState {
  position: relative;
}
.hasState::after {
  content: "";
  position: absolute;
  display: none;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.hasState.finish::after {
  display: block;
  background-color: green;
}
.hasState.unfinish::after {
  display: block;
  background-color: yellow;
}

/* 弹框 */

.tooltip {
  display: none;
  width: 200px;
  background-color: #fff;
  border: 1px solid #ccc;
}

.is-selected .tooltip {
  display: block;
}
```

:::

### 进阶方法

想想这块有没有更好的实现方式，现在是直接在 `template` 模块中写一个 `div` ，会有很多没必要的 `dom` 节点；如果使用 `v-if` 判断，那又会有很多性能浪费。

还有一点，插槽里面无法直接拿到日期当天的 `list` ，因此要通过循环遍历数组获取对应的 `list` 数组，那又需要再循环几次，这样又有一定的性能浪费。

此时更好的方式是通过 `JSX` 来实现，这也是为什么说 React 比 Vue 更适合写大项目。

新建一个组件，圆点和弹框都在里面实现，父组件只负责引入使用，传递需要的字段即可。

::: code-group

```vue [dateTd.vue]
<script>
export default {
  name: "DateTd",
  props: {
    day: {
      type: String,
      default: "",
    },
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  render(h) {
    let classObj = {};
    let day = this.day;
    let list = [];

    const createList = (list) => {
      const arr = list.map((item) => h("span", item));
      return arr;
    };

    const item = res.find((item) => item.day === day);
    if (item) {
      createList(item.list);
      classObj.hasState = true; // 有任务
      item.finish ? (classObj.finish = true) : (classObj.unfinish = true); // 任务完成状态
    }

    if (list.length > 0) {
      return h("div", { class: classObj }, [
        day.split("-")[2],
        h("div", { class: "tooltip" }, [...list]),
      ]);
    } else {
      return h("div", { class: classObj }, day.split("-")[2]);
    }
  },
};
</script>
```

```vue [app.vue]
<template>
  <el-calendar>
    <template v-slot:dateCell="obj">
      <date-td :day="obj.data.day" :dataList="res"></date-td>
    </template>
  </el-calendar>
</template>

<script setup>
import dateTd from "./dateTd.vue";
</script>
```

:::
