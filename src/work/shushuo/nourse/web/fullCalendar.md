---
title: 数说Web端日程表
titleTemplate: 数说Web端日程表
description: 数说 web端 fullCalendar
head:
  - - meta
    - name: description
      content: 数说Web端日程表
  - - meta
    - name: keywords
      content: 数说 web端 fullCalendar
pageClass: shushuo-nourse-fullCalendar
tags: web,fullCalendar
---

# 日历

## 效果展示

![效果展示](https://pic1.imgdb.cn/item/692d657311af9ce9c3e8a9bc.png)

需求效果是需要实现一个日程表的功能，可以查看当月每一天的日程。

## 实现思路

1. 引入第三方组件库 `@fullcalendar/vue` ，实现日程表功能
2. 配置 `calendarOptions` 参数，定制化日程表样式
3. 通过插槽 `moreLinkContent` 和 `eventContent` ，定制化日程表内容
4. 添加 `a-date-picker` 组件，实现日期选择功能

## 代码步骤

### 导入组件

组件库的组件并不能满足需求，百度了一下，有一个 [fullCalendar](https://fullcalendar.io/) 的第三方库组件，可以满足需求。该第三方库拥有多种版本，这里需要使用的是 `@fullcalendar/vue` 版本。

想要使用 `@fullCalendar/vue` ，需要先安装所需要的包。

```bash
pnpm i @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/vue3
```

### 插槽文本

引入组件并使用。

```vue
<FullCalendar
  ref="calendar"
  class="demo-app-calendar flex-1 h-0"
  :options="calendarOptions"
>
  <template #moreLinkContent="arg">
    <span class="text-major text-12px font-400">还有{{ arg.num }}个日程</span>
  </template>
  <template #eventContent="arg">
    <div class="event-title" flex items-center p-x-6px truncate hover:opacity-70 :style="getEventTitleStyle(arg)">
      <span class="border-dot hidden shrink-0 mr-4px" :style="{ backgroundColor: arg.event.textColor }" /> <span class="event-label">{{ arg.event.title }}</span>
    </div>
  </template>
</FullCalendar>

<script lang="ts" setup>
import FullCalendar from '@fullcalendar/vue3'
</script>
```

组件可以通过插槽 `moreLinkContent` ，定制化每个月下方多余数据的内容；通过插槽 `eventContent` ，定制化日程的显示内容。

参数 `arg` 包含以下属性：

- `arg.event`: 当前事件对象（包含 `title`, `startStr`, `extendedProps` 等）
- `arg.popoverVisible`: 控制弹窗显示状态的布尔值（你在代码中使用了它）
- `arg.event.title`: 事件标题
- `arg.event.startStr`: 事件开始时间字符串
- `arg.event.extendedProps`: 扩展属性（如创建人、类型等）

### 参数配置

配置 `calendarOptions` 参数，主要的参数如下：

| 参数名          | 类型             | 说明                                                  |
| --------------- | ---------------- | ----------------------------------------------------- |
| `plugins`       | Array            | 需要使用的插件列表                                    |
| `initialView`   | String           | 初始显示的视图，如 `'dayGridMonth'`, `'timeGridWeek'` |
| `headerToolbar` | Object           | 顶部工具栏配置（如标题、导航按钮）                    |
| `locale`        | String           | 语言设置（如 `'zh-cn'`）                              |
| `dayMaxEvents`  | Boolean / Number | 控制一天最多显示多少个事件                            |
| `editable`      | Boolean          | 是否允许拖拽或调整事件时间                            |
| `selectable`    | Boolean          | 是否允许选择时间段                                    |
| `select`        | Function         | 选择时间段时触发的回调                                |
| `eventOrder`    | Function         | 排序方式                                              |
| `datesSet`      | Function         | 数据获取                                              |

`datesSet` 参数的回调函数，根据需求，需要获取当月每一天的日程数据，所以需要获取当前月份的开始和结束时间，然后调用接口获取数据。

根据项目的需求，这块的参数配置如下：

```js
import zhCnLocale from '@fullcalendar/core/locales/zh-cn'

const eventColors = ['#158cf5', '#746bec', '#f27e57', '#38c5b4', '#ef4c6c']

const calendarOptions = {
  plugins: [
    dayGridPlugin, // 支持 dayGridMonth, dayGridWeek 等网格视图。
    interactionPlugin, // 支持拖拽、选择等交互功能。
  ],
  // 不展示头部的工具栏
  headerToolbar: {
    right: '',
    left: '',
    center: '',
  },
  locale: zhCnLocale, // 中文
  initialView: 'dayGridMonth', // 初始视图为月份
  eventOrder(eventA: any, eventB: any) {
    // 返回负数表示a在b前，正数表示b在a前
    return dayjs(eventB.time).isAfter(dayjs(eventA.time)) ? 1 : -1 // 从新到旧
  },
  editable: false, // 不允许拖拽或调整事件时间
  selectable: false, // 不允许选择时间段
  selectMirror: false, // 不允许选择时间段
  dayMaxEvents: true, // 一天最多显示多少个事件
  weekends: true, // 显示周末
  // 选择时间段时触发的回调
  async datesSet(e) {
    const res = await fetchTaskCalendar({
      startTime: dayjs(e.startStr).format('YYYY-MM-DD'),
      endTime: dayjs(e.endStr).format('YYYY-MM-DD'),
    })
    const source = res.rows.map((item, index) => {
      // 从eventColors中循环取色
      const eventColor = eventColors[(index) % eventColors.length]
      return {
        ...item,
        textColor: eventColor,
        backgroundColor: `${eventColor}33`,
        borderColor: `${eventColor}33`,
      }
    })
    e.view.calendar.getEventSources().forEach((eventSource) => {
      eventSource.remove()
    })
    e.view.calendar?.addEventSource(source)
  },
}
```

### 日期选择

添加 `a-date-picker` 组件，实现日期选择功能。添加两个上下箭头，实现月份切换功能。

`fullCalendar` 组件的 `ref` 可以获取到组件实例，通过 `组件ref.value.getApi()` 方法可以获取到日程表组件的相关方法。如 `prev()` 和 `next()` 方法，实现月份切换功能；`gotoDate()` 方法，实现日期选择功能。

::: code-group
```vue
<div class="flex items-center absolute top-50% left-50% translate-x--50% translate-y--50% text-heading">
  <span class=" font-600 text-18px mr-12px">{{ titleDate }}</span>
  <i class="ds-iconf-down3-line mr-8px cursor-pointer" @click="calendarApi.prev()" />
  <i class="ds-iconf-up3-line cursor-pointer" @click="calendarApi.next()" />
</div>
<div flex-1 text-right>
  <a-date-picker :value="curDate" format="YYYY年MM月" picker="month" @change="handleDatePickerChange" />
</div>
```
```js
const calendar = ref()

const calendarApi = computed(() => {
  return calendar.value?.getApi()
})

// a-date-picker 组件的 change 事件，调用 calendarApi.value.gotoDate(e.toDate()) 方法，实现日期选择功能。
function handleDatePickerChange(e: Dayjs) {
  calendarApi.value.gotoDate(e.toDate())
}

const curDate = ref()

const titleDate = computed(() => {
  return dayjs(curDate.value).format('YYYY年MM月')
})

// 日程表组件切换时间后触发该回调，此时修改a-date-picker的数据
function setCurDate() {
  curDate.value = dayjs(calendarApi.value.getDate())
}

const calendarOptions = {
  async datesSet(e) {
    setCurDate()
    // ...
  },
}
```
:::

### 其他优化

还可以添加其他的优化，例如在 `#eventContent` 插槽中，添加 `a-popover` 组件，实现点击组件时，展示详细信息。

## 参考文档

- [FullCalendar 官方文档](https://fullcalendar.io/docs)
- [FullCalendar Vue3 官方文档](https://fullcalendar.io/docs/vue)
- [FullCalendar 民间翻译中文文档](https://www.helloweba.net/javascript/445.html)