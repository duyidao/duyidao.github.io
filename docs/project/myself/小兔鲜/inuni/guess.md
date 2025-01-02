---
layout: doc
title: 小兔鲜小程序猜你喜欢
titleTemplate: 小兔鲜小程序猜你喜欢
description: UniApp 小兔鲜 猜你喜欢
head:
  - - meta
    - name: description
      content: 小兔鲜小程序猜你喜欢
  - - meta
    - name: keywords
      content: UniApp 小兔鲜 猜你喜欢
pageClass: myself-rabit-guess
---

# 猜你喜欢

猜你喜欢模块在个人中心页和首页都有设置，都有触底上拉加载更多的功能。因此通过组合式函数把相同部分功能的抽出来，需要使用的使用分别引入使用即可。代码如下所示：

::: code-group
```js [useMember.js]
import type { XtxGuessInstance } from '@/types/components'
import { ref } from 'vue'

// 猜你喜欢组合式函数
export const useGuessList = () => {
  const guessRef = ref<XtxGuessInstance>()

  // 触底
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }

  return {
    guessRef,
    onScrolltolower,
  }
}
```
```vue [个人中心页]
<script setup lang="ts">
import { useGuessList } from '@/composables/index'

const { guessRef, onScrolltolower } = useGuessList()
</script>
```
:::
