# 极速问诊

## 枚举定义

枚举的作用是表示一组明确可选的值，和字面量类型配合联合类型类似。

枚举可以定义一组常量，使用该类型后，约定只能使用这组常量中的其中一个。

```tsx
// 创建枚举类型
enum Direction { Up, Down, Left, Right }

// 使用枚举类型
const changeDirection = (direction: Direction) => {
  console.log(direction)
}

// 调用函数时，需要应该传入：枚举 Direction 成员的任意一个
// 类似于 JS 中的对象，直接通过 点（.）语法 访问枚举的成员
changeDirection(Direction.Up)
```

- 通过枚举访问其成员，成员的值是什么？
  - 默认从 0 开始自增的数值
- 可以修改其成员的值吗？
  - `Up = 10` , 后面是从 10 开始自增
- 成员的值可以使用字符串吗？
  - `Up = 'Up'` 可以，但是后面的值都需要使用字符串。
- 如果这组可选值语义很高，如 `topic | knowledge | doc | disease` ，使用字面量配合联合类型更简单些

> 注意
>
> 更推荐使用 `ts` 文件定义枚举而不是使用 `.d.ts` ，枚举的值经常需要在运行的时候使用，`d.ts` 不参与运行。

## 全部可选

用户输入信息是一步步输入的，因此需要信息全部修改为可选状态。typescript 中 `Required` 转换为全部必须；`Partial` 转换为全部可选  两个内置的泛型类型。

Vue3 hook 变量存储

Vue3 状态管理仓库比起使用 `vuex` ，更推荐使用 `pinia` 。通过 hook 的思想导出变量和方法供外部使用。示例代码如下：

```js
import { defineComponent } from 'vue';
import { useStore } from 'pinia';

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      count: store.count,
    };
  },
});
```

在项目中，问诊信息分为多个页面获取，把整体变量放到 `pinia` 中，依次导出变量属性修改的函数，需要使用的地方 导入 使用即可。代码如下：

```js
import type { ConsultType } from '@/enums'
import type { PartialConsult } from '@/types/consult'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
    'cp-consult',
    () => {
        const consult = ref<PartialConsult>({})
        // 设置问诊类型
        const setType = (type: ConsultType) => (consult.value.type = type)
        // 设置极速问诊类型
        const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
        // 设置科室
        const setDep = (id: string) => (consult.value.depId = id)
        // 设置病情描述
        const setIllness = (
            illness: Pick<PartialConsult, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>
        ) => {
            consult.value.illnessDesc = illness.illnessDesc
            consult.value.illnessTime = illness.illnessTime
            consult.value.consultFlag = illness.consultFlag
            consult.value.pictures = illness.pictures
        }
        // 设置患者
        const setPatient = (id: string) => (consult.value.patientId = id)
        // 设置优惠券
        const setCoupon = (id?: string) => (consult.value.couponId = id)
        // 清空记录
        const clear = () => (consult.value = {})
        return { consult, setType, setIllnessType, setDep, setIllness, setPatient, setCoupon, clear }
    },
    {
        persist: true
    }
)
```















