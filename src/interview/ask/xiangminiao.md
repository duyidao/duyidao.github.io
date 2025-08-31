# 向蜜鸟

## 一面

### Q：Vue2 data 有一个 list 数组变量，在 mounted 生命周期调用接口拿到数据后 this.list = res.data 赋值，此时 list 里面的对象的属性是否具有响应式？

> 我的回答：
>
> 会，因为 数组 整个被重新赋值，会递归遍历新数组，将每个对象的属性都转换为响应式。

::: details Deepseek 的回答

在<word text="Vue" />2 中，当你执行 this.list = res.data 时，数组和其中的对象都会变成响应式的，但需要注意以下关键点：

1. 数组本身的响应式

   直接赋值整个数组（this.list = 新数组）会触发响应式更新，视图会自动渲染。这是因为<word text="Vue" />2 对数组进行了特殊处理，覆盖了 7 变更方法（push/pop/shift/unshift/splice/sort/reverse）

2. 数组内对象的响应式

   - ✅ 对象已有的属性：自动获得响应式

     ```javascript
     this.list = res.data // 假设 res.data = [{ id: 1, name: "Alice" }]
     this.list[0].name = 'Bob' // 视图会更新 ✅
     ```

   - ❌ 新增的对象属性：不是响应式（需用 Vue.set）

     ```javascript
     this.list[0].age = 25 // 错误！视图不会更新 ❌
     this.$set(this.list[0], 'age', 25) // 正确 ✅
     ```

3. 注意事项
   |场景 |是否响应式 |解决方案|
   |:-: |:-: |:-:|
   |修改已有属性| ✅ 是 |直接赋值|
   |添加新属性| ❌ 否| Vue.set 或 Object.assign 创建新对象|
   |通过索引改数组 |❌ 否| Vue.set 或 splice|
   |修改数组长度 |❌ 否| 使用变更方法（如 splice）|
4. 推荐实践

   ```javascript
   // 添加新属性
   this.$set(this.list, index, { ...item, newProp: value })

   // 或者创建全新对象（推荐）
   this.list = this.list.map((item) => {
     return { ...item, newProp: value } // 新对象自动响应式
   })
   ```

5. 底层原理
   <word text="Vue" />2 通过 Object.defineProperty 实现响应式：

   - 赋值新数组时，Vue 会递归遍历数组内所有对象

   - 为每个对象的已有属性添加 getter/setter

   - 无法检测新增属性（需用 Vue.set）

✅ 结论

- this.list = res.data 后，数组中对象的已有属性是响应式的

- 新增属性不是响应式，必须使用 this.$set 或创建新对象

- 直接通过索引修改数组元素需要特殊处理
  :::

### Q：你说具有响应式，那 Vue2 的 $set 是做什么的呢？

> 我的回答：
>
> Vue2 的 `$set` 是为了解决对象新增属性无法触发视图更新的问题，因为 Vue2 的响应式原理是使用 Object.defineProperty，所以新增属性无法触发视图更新。假设有一个对象 `obj: {a: 1}`，如果想要新增一个属性 `b` ，需要用到 `$set`。

### Q：list 原本是一个空数组，他是怎么监听到你新赋值后的对象的属性呢？

> 我的回答：
>
> 每一次赋值之后，都会去做一次递归遍历，将新数组中的每个对象的属性都转换为响应式。

::: details Deepseek 的回答
具体步骤解析：

1. 初始响应式处理（组件初始化时）：

   ```javascript
   data() {
     return { list: [] }  // 空数组已被转为响应式
   }
   ```

   - <word text="Vue" />在组件初始化时，通过 Object.defineProperty 将 list 转为响应式

   - 此时 list 的 getter/setter 已被重写

2. 赋值新数组时（this.list = res.data）：

   触发 list 的 setter 函数，Vue 在 setter 中执行关键操作：

   ```javascript
   set: function reactiveSetter(newVal) {
     // 1. 更新值
     const value = getter ? getter.call(obj) : val
     if (newVal === value) return

     // 2. 对新值进行响应式转换 👇 核心操作
     observe(newVal) // 递归处理新数组

     // 3. 通知依赖更新
     dep.notify()
   }
   ```

3. 递归响应式转换（observe() 函数）：

   ```javascript
   function observe(value) {
     // 如果是数组
     if (Array.isArray(value)) {
       // 重写数组的7个变更方法（push/pop等）
       value.__proto__ = arrayMethods

       // 遍历数组元素
       for (let i = 0; i < value.length; i++) {
         observe(value[i]) // 递归处理每个元素
       }
     }
     // 如果是对象
     else if (typeof value === 'object') {
       // 为每个属性定义 getter/setter
       Object.keys(value).forEach((key) => {
         defineReactive(value, key, value[key])
       })
     }
   }
   ```

4. 对象属性监听（defineReactive() 函数）：

   ```javascript
   function defineReactive(obj, key, val) {
     // 递归处理嵌套对象
     observe(val)

     Object.defineProperty(obj, key, {
       get() {
         // 依赖收集（将当前Watcher加入Dep）
         dep.depend()
         return val
       },
       set(newVal) {
         observe(newVal) // 对新值做响应式处理
         val = newVal
         // 触发更新
         dep.notify()
       },
     })
   }
   ```

关键设计要点：

1. 递归劫持：

   - 当赋值新数组时，Vue 会深度遍历整个数组结构
   - 对数组中每个对象执行 observe()
   - 对每个对象的每个属性执行 defineReactive()

2. 嵌套对象处理：

   ```javascript
   // 假设 res.data 的结构：
   [
     { id: 1, profile: { name: "Alice" } } // 嵌套对象也会被递归监听
   ]
   defineReactive 中的 observe(val) 会确保嵌套对象也被响应式化
   ```

3. 避免重复处理：

   <word text="Vue" />通过 `__ob__` 属性标记已处理过的对象

   ```javascript
   if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
     return // 跳过已处理对象
   }
   响应式能力边界：
   操作类型	响应式支持	原因
   this.list[0].name = "Bob"	✅ 支持	已有属性的 setter 被重写
   this.list[0].newProp = 1	❌ 不支持	未经过 defineReactive 处理
   this.list.push({...})	✅ 支持	重写的数组方法触发更新
   this.list[0] = {...}	❌ 不支持	数组索引未被监听
   ```

总结
Vue 2 通过以下机制实现对新赋值对象属性的监听：

1. 赋值触发：this.list = 触发 setter
2. 递归观测：observe() 深度遍历新值
3. 属性劫持：defineReactive() 为每个属性创建 getter/setter
4. 依赖管理：通过 Dep 类实现属性与 Watcher 的关联
   :::

### Q：那你的意思是，每次赋新值，都要重新调用 definePropoty 重新响应式绑定么？

> 我的回答：
>
> Vue2 好像有一个算法会做新旧值对比

::: details Deepseek 的回答

是的，完全正确。在<word text="Vue" />2 的响应式系统中，每次给响应式属性赋新值时，Vue 都会递归遍历新值，对其所有层级的对象属性重新执行 fineProperty 进行响应式绑定。这是<word text="Vue" />2 响应式系统的核心设计机制。

详细过程解析：

![详细过程](https://pic1.imgdb.cn/item/6859012b58cb8da5c865418a.png)

关键设计要点：

1.  每次赋值的递归处理：

    ```javascript
    // 伪代码：Vue 响应式 setter 核心逻辑
    function reactiveSetter(newVal) {
      // 1. 对新值进行深度响应式转换
      observe(newVal) // 递归入口

      // 2. 触发更新
      dep.notify()
    }
    ```

2.  observe() 函数的递归本质：

    ```javascript
    function observe(value) {
      // 如果是数组
      if (Array.isArray(value)) {
        // 重写数组方法
        value.__proto__ = arrayMethods

        // 遍历数组元素递归处理
        for (let i = 0; i < value.length; i++) {
          observe(value[i]) // 递归调用！
        }
      }
      // 如果是普通对象
      else if (isPlainObject(value)) {
        // 遍历对象属性
        Object.keys(value).forEach((key) => {
          defineReactive(value, key, value[key]) // 定义响应式
        })
      }
    }
    ```

3.  defineReactive() 中的递归：

    ```javascript
    function defineReactive(obj, key, val) {
      // 关键递归点：对当前属性值再做一次 observe
      observe(val) // 处理嵌套对象

      Object.defineProperty(obj, key, {
        get() {
          /* 依赖收集 */
        },
        set(newVal) {
          // 对新设置的值再次进行响应式处理
          observe(newVal) // 这就是递归绑定点！
          dep.notify()
        },
      })
    }
    ```

4.  性能优化机制：

        虽然每次赋值都会递归绑定，但<word text="Vue" />做了优化避免重复处理：

        - `__ob__` 标记：

            ```javascript
            function observe(value) {
              // 已经处理过的对象直接返回
              if (value.__ob__ && value.__ob__ instanceof Observer) {
                return value.__ob__;
              }
              // 新对象才创建 Observer 实例
              return new Observer(value);
            }
            ```
        - `Observer` 类的实现：

            ```javascript
            class Observer {
              constructor(value) {
                // 标记已响应式化的对象
                def(value, '__ob__', this); // 添加 __ob__ 标记

                if (Array.isArray(value)) {
                  // 处理数组
                } else {
                  // 处理对象
                }
              }
            }
            ```

    :::

### Q：如何通过插槽，让父组件获取子组件的局部变量？

> 我的回答：
>
> 作用域插槽，可以通过 `v-slot` 指令获取子组件的局部变量。组件库也是这么做的

::: details Deepseek 的回答

在<word text="Vue" />2 中，可以通过作用域插槽（Scoped Slots）让父组件获取子组件的局部变量。这是<word text="Vue" />组件通信的高级技巧，特别适合需要向父件暴露子组件内部状态的场景。

完整实现步骤：

1.  子组件：定义作用域插槽

    ```vue
    <!-- ChildComponent.vue -->
    <template>
      <div>
        <!-- 通过 v-bind 暴露子组件的局部变量 -->
        <slot
          :childData="childData"
          :childMethod="childMethod"
          :counter="counter"
        ></slot>
      </div>
    </template>

    <script>
    export default {
      data() {
        return {
          childData: '来自子组件的秘密数据',
          counter: 0,
        }
      },
      methods: {
        childMethod() {
          this.counter++
          return `子组件方法被调用 ${this.counter} 次`
        },
      },
    }
    </script>
    ```

2.  父组件：接收作用域插槽数据

    ````vue
    <!-- ParentComponent.vue -->
    <template>
      <div>
        <child-component>
          <!-- 使用 slot-scope 接收子组件暴露的数据 -->
          <template slot-scope="slotProps">
            <p>获取到子组件数据: {{ slotProps.childData }}</p>
            <p>计数器: {{ slotProps.counter }}</p>
            <button @click="handleClick(slotProps.childMethod)">
              调用子组件方法
            </button>
          </template>
        </child-component>
      </div>
    </template>
    <script>
    import ChildComponent from './ChildComponent.vue'

    export default {
      components: { ChildComponent },
      methods: {
        handleClick(childMethod) {
          const result = childMethod()
          console.log('调用结果:', result)
        },
      },
    }
    </script>
    ``` 关键点解析：
    ````

3.  作用域插槽原理：

    - 子组件通过 `<slot>` 的 `v-bind` 暴露数据
    - 父组件通过 `slot-scope` 接收数据对象
    - 本质上：子组件将数据作为参数传递给插槽内容

4.  暴露数据类型：

    ```vue
    <!-- 子组件中 -->
    <slot :data="value" <!-- 响应式数据 -->
      :method="functionName"     <!-- 方法 -->
      :computed="computedValue"  <!-- 计算属性 -->
      v-bind="object"            <!-- 整个对象 -->
    ></slot>
    ```

5.  多种接收语法：

        ```vue
        <!-- Vue 2.5+ 语法 (推荐) -->
        <template slot-scope="{ childData, childMethod }">
          {{ childData }}
        </template>

        <!-- Vue 2.6+ 的 v-slot 语法 -->
        <template v-slot:default="slotProps">
          {{ slotProps.childData }}
        </template>

        解构语法
        <template v-slot:default="{ childData, counter }">
          {{ childData }} - {{ counter }}
        </template>
        ```

    高级用法：

6.  具名作用域插槽

    ```vue
    <!-- 子组件 -->
    <template>
      <div>
        <slot name="header" :title="pageTitle"></slot>
        <slot :content="pageContent"></slot>
      </div>
    </template>

    <!-- 父组件 -->
    <child-component>
      <template v-slot:header="{ title }">
        <h1>{{ title }}</h1>
      </template>
      
      <template v-slot:default="{ content }">
        <p>{{ content }}</p>
      </template>
    </child-component>
    ```

7.  动态更新响应式数据

    ```vue
    <!-- 子组件 -->
    <template>
      <div>
        <slot :value="dynamicValue"></slot>
        <button @click="dynamicValue = Math.random()">更新值</button>
      </div>
    </template>

    <script>
    export default {
      data() {
        return { dynamicValue: 0 }
      },
    }
    </script>

    <!-- 父组件 -->
    <child-component>
      <template slot-scope="{ value }">
        <!-- 子组件更新时会自动刷新 -->
        <p>动态值: {{ value.toFixed(2) }}</p>
      </template>
    </child-component>
    ```

8.  暴露多个方法

    ````vue
    <!-- 子组件 -->
    <template>
      <slot :increment="increment" :decrement="decrement" :reset="reset"></slot>
    </template>
    <script>
    export default {
      data() {
        return { count: 0 }
      },
      methods: {
        increment() {
          this.count++
        },
        decrement() {
          this.count--
        },
        reset() {
          this.count = 0
        },
      },
    }
    </script>

    <!-- 父组件 -->
    <child-component>
          <template slot-scope="{ increment, decrement, reset }">
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
            <button @click="reset">重置</button>
          </template>
        </child-component>
    ``` 注意事项：
    ````

9.  响应式数据流：

    - 暴露的数据保持响应式
    - 父组件中可以直接使用，变化会自动更新

10. 避免直接修改：

    ```vue
    <!-- 不推荐 -->
    <button @click="slotProps.counter++">修改</button>

    <!-- 推荐 -->
    <button @click="slotProps.increment()">通过方法修改</button>
    ```

11. 性能优化：

    - 避免暴露大型对象（特别是嵌套深的）
    - 对于复杂数据，暴露具体需要的属性而非整个对象

12. 与普通插槽区别：

        |普通插槽	|作用域插槽|
        |:-:	|:-:|
        |父→子传递内容|	子→父传递数据|
        |单向通信	|双向数据流|
        |静态内容|	动态内容|

    :::

### Q：子组件有一个插槽，子组件需要做默认占位的内容，如果父组件使用这个插槽，就展示父组件传递的内容；如果父组件不使用，就展示其默认的内容。如何实现？

> 我的回答：
>
> 默认内容，可以通过 `v-if` 判断 `$slot.default` 是否存在，如果存在就展示默认内容，否则展示插槽内容。Vue 如果父组件不传插槽内容，就会默认渲染插槽的默认内容，传了才渲染父组件传递的插槽内容。

::: details Deepseek 的回答

在<word text="Vue" />中实现这种"有默认内容的插槽"非常简单，Vue 的插槽机制本身就支持这个功能。下面是完整的实现方法：

```vue
<!-- 子组件 ChildComponent.vue -->
<template>
  <div class="child-component">
    <!-- 在 slot 标签内部放置默认内容 -->
    <slot>
      <!-- 这里是默认内容，当父组件不提供插槽内容时显示 -->
      <div class="default-content">
        <h3>默认标题</h3>
        <p>这是子组件提供的默认内容</p>
        <button @click="handleClick">默认按钮</button>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('默认按钮被点击')
      // 这里可以添加默认的点击处理逻辑
    },
  },
}
</script>

<style scoped>
.default-content {
  padding: 16px;
  border: 1px dashed #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}
</style>
```

父组件使用示例：

- 情况 1：父组件不使用插槽（显示默认内容）

  ```vue
  <!-- 父组件 ParentComponent.vue -->
  <template>
    <div>
      <child-component />
      <!-- 不提供任何插槽内容，将显示子组件中的默认内容 -->
    </div>
  </template>

  <script>
  import ChildComponent from './ChildComponent.vue'

  export default {
    components: { ChildComponent },
  }
  </script>
  ```

- 情况 2：父组件使用插槽（覆盖默认内容）

  ````vue
  <!-- 父组件 ParentComponent.vue -->
  <template>
    <div>
      <child-component>
        <!-- 自定义内容将完全替换默认内容 -->
        <div class="custom-content">
          <h3 style="color: blue;">自定义标题</h3>
          <p>这是父组件提供的内容</p>
          <button @click="customAction" style="background: blue; color: white;">
            自定义按钮
          </button>
        </div>
      </child-component>
    </div>
  </template>

  <script>
  import ChildComponent from './ChildComponent.vue'

  export default {
    components: { ChildComponent },
    methods: {
      customAction() {
        console.log('父组件的自定义按钮被点击')
      },
    },
  }
  </script>
  ``` 高级用法：部分覆盖默认内容
  如果需要保留部分默认内容，只覆盖其中一部分，可以使用具名插槽： ::: code-group
  ````

```vue [子组件 ChildComponent.vue]
<template>
  <div class="child-component">
    <div class="header">
      <!-- 具名插槽，有默认内容 -->
      <slot name="header">
        <h3>默认标题</h3>
      </slot>
    </div>

    <div class="content">
      <!-- 主插槽，有默认内容 -->
      <slot>
        <p>这是默认内容区域</p>
      </slot>
    </div>

    <div class="footer">
      <!-- 另一个具名插槽 -->
      <slot name="footer">
        <button @click="handleClick">默认按钮</button>
      </slot>
    </div>
  </div>
</template>
```

```vue [父组件 ParentComponent.vue]
<template>
  <child-component>
    <!-- 只覆盖标题部分 -->
    <template v-slot:header>
      <h3 style="color: red;">自定义标题</h3>
    </template>

    <!-- 其他部分保持默认 -->
  </child-component>
</template>
```

:::
关键点说明

1.  默认内容实现原理：

    - 在 `<slot>` 标签内部放置的内容就是默认内容
    - 当父组件没有提供插槽内容时，这些内容会被渲染
    - 当父组件提供内容时，默认内容会被完全替换

2.  作用域规则：

    - 默认内容中的逻辑和样式都在子组件作用域内
    - 默认内容中的方法调用的是子组件的方法
    - 默认内容中的样式使用子组件的 `scoped` 样式

3.  最佳实践：

        ```vue
        <!-- 推荐：将默认内容包裹在容器中 -->
        <slot>
          <div class="default-container">
            <!-- 默认内容 -->
          </div>
        </slot>

        <!-- 不推荐：直接放置多个元素 -->
        <slot>
          <h3>标题</h3>
          <p>内容</p>
        </slot>
        ```

    注意事项

4.  默认内容中的响应性：

    - 默认内容中的数据和逻辑完全属于子组件
    - 如果需要在默认内容中使用父组件的数据，应该使用作用域插槽

5.  样式处理：

    - 默认内容的样式应该写在子组件的样式中
    - 使用 `scoped` 属性可以避免样式污染
    - 父组件可以通过深度选择器覆盖默认样式 (`.child-component >>> .default-content`)

6.  性能考虑：

        - 默认内容在子组件初始化时就会创建
        - 如果默认内容很复杂，可以使用 `v-if` 优化：

        ```vue
        <slot v-if="$slots.default"></slot>
        <div v-else class="default-content">默认内容</div>
        ```

    :::

### Q：Vuex 和 Pinia 全局状态使用上除了使用范围不同、变量赋值方式不同（它们不能直接赋值，而是通过 multation 等方法修改），还有啥区别？

> 我的回答：
>
> 这块不清楚。

::: details Deepseek 的回答

1. 状态生命周期

   |   特性   | 全局状态 (Vuex/Pinia) | 组件局部状态 (data/composition) |
   | :------: | :-------------------: | :-----------------------------: |
   | 创建时机 |    应用启动时创建     |        组件实例化时创建         |
   | 销毁时机 |    应用关闭时销毁     |       组件销毁时自动回收        |
   |  持久性  |  跨组件/路由持久存在  |        随组件销毁而消失         |

2. 状态变更的影响范围
   |特性| 全局状态 |局部状态|
   |:-: |:-: | :-: |
   |响应范围| 所有使用该状态的组件 |仅当前组件及其子组件|
   |更新传播| 立即通知所有订阅组件 |通过 props/emit 逐层传递|
   |跨组件更新| 直接触发所有依赖更新 |需要手动事件传递|
3. 调试与追踪能力
   |特性| 全局状态 |局部状态|
   |:-: |:-: | :-: |
   |DevTools| 完整时间旅行/状态快照| 只能追踪组件内状态变化|
   |变更日志 |记录完整 action/mutation| 无自动记录|
   |状态溯源 |可回溯到具体修改点 |难以追踪跨组件修改来源|
4. 响应式依赖管理
   |特性 |全局状态| 局部状态|
   |:-: |:-: | :-: |
   |依赖收集 |全局依赖图 |组件级依赖图|
   |更新优化| 需手动优化 (Vuex)| 自动优化 (组件级追踪)|
   |内存占用| 长期持有可能内存泄漏 |随组件卸载自动释放|
   ```js
   // 全局状态的内存泄漏风险
   // 组件内：
   created() {
     this.unwatch = store.watch(/*...*/) // 需手动卸载
   },
   beforeDestroy() {
     this.unwatch() // 必须手动清理
   }
   ```
5. 测试复杂度
   |特性 |全局状态| 局部状态|
   |:-: |:-: | :-: |
   |单元测试 |需 mock 整个 store |可直接测试组件内部状态|
   |集成测试 |更接近真实场景| 需模拟父子组件交互|
   |测试成本| 较高 |较低|
6. 设计模式差异
   |模式 |全局状态| 局部状态|
   |:-: |:-: | :-: |
   |状态组织 |领域驱动设计 (DDD) |组件驱动设计|
   |状态共享 |中心化存储 |组件树传递 (props/event)|
   |关注点分离 |状态逻辑与 UI 解耦| 状态与 UI 强耦合|
7. 性能特征对比
   |场景 |全局状态 |局部状态|
   |:-: |:-: | :-: |
   |高频更新 |可能触发大面积重渲染 |影响范围小|
   |大型数据| 适合 (单次加载多组件使用) |不适合 (需重复传递)|
   |轻量级状态 |过度设计 |更高效|
8. 状态同步复杂度
   |操作| 全局状态 |局部状态|
   |:-: |:-: | :-: |
   |跨组件同步 |自动同步| 需手动同步 (watch/event)|
   |异步更新 |内置支持 (actions)| 需自行处理异步|
   |竞态处理 |提供解决方案 |需自行实现|
9. 代码组织方式

   ```js
   // 全局状态 (Pinia 示例)
   export const useAuthStore = defineStore('auth', {
     state: () => ({ user: null }),
     actions: {
       async login(credentials) {
         this.user = await api.login(credentials)
       },
     },
   })

   // 组件局部状态
   export default {
     data: () => ({
       localUser: null,
     }),
     methods: {
       async localLogin() {
         this.localUser = await api.login()
       },
     },
   }
   ```

10. 适用场景对比
    |场景| 推荐方案 |原因|
    |:-: |:-: | :-: |
    |用户认证状态 |全局状态 |全应用共享|
    |主题/语言偏好 |全局状态| 跨组件访问|
    |购物车数据 |全局状态 |多页面共享|
    |表单输入状态| 局部状态 |仅当前组件使用|
    |组件展开/折叠状态 |局部状态 |无需共享|
    |页面级数据 (如博客详情) |局部状态 + props| 通过路由参数传递|
    :::

### Q：uniapp 做微信小程序开发，可以使用 vuex 或 pinia，这种全局状态管理器实际上是挂载到一个变量上保存，vue 是单页面应用，页面不会刷新，变量一直存在；而小程序是多页面应用，它是通过什么方式实现这种全局状态管理的呢？

> 我的回答：
>
> 这块不清楚。

::: details Deepseek 的回答

在 uni-app 开发微信小程序时，全局状态管理（如 Vuex/Pinia）的实现原理与纯 Web 环境有显著差异，核心在于小程序的多页面架构与 Web 单页面应用(SPA) 的本质区别。下面是详细实现理和关键机制：

一、小程序环境下的全局状态实现原理

1.  全局状态存储位置
    >     ![全局状态存储位置](https://pic1.imgdb.cn/item/6859112758cb8da5c86593ba.png)
    >     - 存储位置：全局状态实例被挂载在应用级 App.vue 组件上
    >     - 生命周期：App.vue 在小程序启动时创建，不会随页面切换而销毁
    >     - 共享机制：所有页面通过 App.vue 访问同一个状态实例
2.  状态同步机制

    ````javascript
    // 全局状态实现伪代码
    class MiniStore {
    constructor() {
    this.state = {}
    this.subscribers = new Set()
    }
          // 状态变更通知
          setState(newState) {
            this.state = {...this.state, ...newState}
            this.notifyAll()
          }

          // 订阅状态更新
          subscribe(callback) {
            this.subscribers.add(callback)
            return () => this.subscribers.delete(callback)
          }

          // 通知所有订阅者
          notifyAll() {
            this.subscribers.forEach(cb => cb(this.state))
          }
        }

        // 在 App.vue 中初始化
        const store = new MiniStore()
        ```
    二、具体实现方式对比
    |实现方式| Vuex (uni-app 版)| Pinia (uni-app 版)|
    > |:-: |:-:| :-:|
    > |挂载点 |app.$store|	app.$pinia|
    > |页面注入 |通过 mixin 自动注入| 通过 useStore() hook|
    > |响应式原理 |Vue 响应式系统 |Vue 响应式系统|
    > |跨页面通信| 基于事件订阅发布| 基于事件订阅发布|
    > |持久化| 需手动同步 storage| 需手动同步 storage|
    ````

三、关键实现技术

![关键实现技术](https://pic1.imgdb.cn/item/6859133758cb8da5c8659bcd.png)

四、与 Web SPA 的差异对比
|特性| Web 单页面应用 (Vue SPA) |微信小程序 (uni-app)|
|:-:|:-:| :-:|
|JS 环境| 单 VM 共享内存| 多 WebView 独立环境|
|状态存储位置 |内存持久化| App.vue 共享实例|
|页面切换成本 |组件切换（无销毁）| WebView 重建（类似刷新）|
|通信方式 |直接内存引用 |事件订阅发布机制|
|状态同步延迟 |即时更新 |毫秒级延迟（跨进程通信）|
|内存管理| 自动回收| 需手动取消订阅|

总结
在 uni-app 开发微信小程序时，全局状态管理的本质是：

- 状态中心化存储：在 App.vue 维护全局状态实例
- 跨页面通信：通过小程序框架提供的事件机制同步状态
- 响应式映射：利用<word text="Vue" />响应式系统驱动视图更新
- 生命周期管理：需手动处理订阅/取消订阅
  :::

### Q：说一下 rem 和 em 和 vh 分别是什么单位？

> 我的回答：
>
> rem 是相对根元素 HTML 的字体大小的单位，如 html.style.fontStyle = 100px，那么 1rem = 100px。vh 是当前可视页面的高度，1vh 就是当前可视页面的 1/100。em 是以浏览器默认字体大小为基准的相对单位，如果浏览器默认字体大小是 16px，那么 1em = 16px。

::: details Deepseek 的回答
|单位| 定义| 特点| 适用场景|
|:-:| :-:| :-:| :-:|
|rem| 相对于根元素（html）的字体大小| 1rem = 根元素字体大小<br/>不受父元素影响<br/>全局一致| 整体布局缩放<br/>响应式设计<br/>间距和尺寸控制|
|em| 相对于当前元素的字体大小 |1em = 当前元素字体大小<br/>受父元素影响<br/>具有继承性 |组件内部尺寸控制<br/>按钮、图标等微调<br/>文本相关间距|
|vh| 相对于视口高度的百分比 |1vh = 视口高度的 1%<br/>不受文档流影响<br/>响应视口变化 |全屏元素<br/>高度相关的布局<br/>视口高度相关计算|
:::

### Q：瀑布流怎么实现？

> 我的回答：
>
> 这块不清楚。

### Q：接口错误分两种，一种是网络请求错误如 500、502，一种是业务请求错误，前后端沟通定义。axios 如何判断当前网络请求的状态？

> 我的回答：
>
> 网络请求错误说明请求都还没成功，可以在请求拦截器那里拦截获取请求状态。如果是业务错误，则说明是请求成功了，响应失败，可以在响应拦截器那里做处理。

::: details Deepseek 的回答
在 Axios 中，可以通过错误处理机制区分两种不同类型的接口错误。以下是具体实现方法和判断逻辑：

一、错误类型判断逻辑

```javascript
axios
  .get('/api/data')
  .then((response) => {
    // 请求成功处理（HTTP 状态码 2xx）
    if (response.data.code !== 0) {
      // 业务错误判断
      handleBusinessError(response.data)
    } else {
      // 业务成功处理
    }
  })
  .catch((error) => {
    if (error.response) {
      // 1. 网络请求错误（服务器响应了非2xx状态码）
      handleHttpError(error.response)
    } else if (error.request) {
      // 2. 网络连接错误（请求已发送但无响应）
      handleNetworkError(error)
    } else {
      // 3. 其他错误（如配置错误）
      handleOtherError(error)
    }
  })
```

二、错误对象关键属性详解

|    错误属性    |                       说明                       |                错误类型                |
| :------------: | :----------------------------------------------: | :------------------------------------: | ------------ |
| error.response | 服务器返回的响应对象（存在表示请求已到达服务器） |         HTTP 错误 (500/502 等)         |
| error.request  |              浏览器 XMLHttpRequest               | 对象（存在表示请求已发送但未收到响应） | 网络连接错误 |
| error.message  |                   错误描述信息                   |              所有错误类型              |
|  error.config  |               发起请求时的配置信息               |              所有错误类型              |

三、具体错误类型处理方案

1.  HTTP 网络请求错误（500/502 等）

    ```javascript
    function handleHttpError(response) {
      console.error('HTTP错误:', {
        status: response.status, // HTTP 状态码
        statusText: response.statusText, // 状态文本
        headers: response.headers, // 响应头
        data: response.data, // 响应数据
      })

      // 根据状态码处理
      switch (response.status) {
        case 401:
          // 认证错误处理
          break
        case 403:
          // 权限错误处理
          break
        case 500:
          // 服务器内部错误
          break
        case 502:
          // 网关错误
          break
        default:
        // 其他HTTP错误
      }
    }
    ```

2.  网络连接错误（未收到响应）

    ```javascript
    function handleNetworkError(error) {
      console.error('网络连接错误:', {
        message: error.message,
        request: error.request,
      })

      // 具体错误类型判断
      if (error.message.includes('Network Error')) {
        // 网络不可用
      } else if (error.message.includes('timeout')) {
        // 请求超时
      } else if (error.message.includes('aborted')) {
        // 请求被取消
      }
    }
    ```

3.  业务逻辑错误（HTTP 200 但业务失败）
    ````javascript
    function handleBusinessError(data) {
    console.error('业务错误:', {
    code: data.code, // 业务错误码
    message: data.message, // 错误描述
    detail: data.detail // 错误详情
    })
          // 根据业务错误码处理
          switch (data.code) {
            case 1001:
              // 参数错误处理
              break
            case 1002:
              // 资源不存在
              break
            case 1003:
              // 权限不足
              break
            default:
              // 其他业务错误
          }
        }
        ```
    四、最佳实践建议
    ````
4.  创建统一错误处理拦截器

    ```javascript
    // 响应拦截器
    axios.interceptors.response.use(
      (response) => {
        // 业务错误处理（HTTP 200但业务失败）
        if (response.data && response.data.code !== 0) {
          return Promise.reject({
            type: 'business',
            data: response.data,
          })
        }
        return response
      },
      (error) => {
        // HTTP错误处理
        if (error.response) {
          return Promise.reject({
            type: 'http',
            response: error.response,
          })
        }
        // 网络错误处理
        return Promise.reject({
          type: 'network',
          error: error,
        })
      }
    )

    // 使用统一错误处理
    axios.get('/api/data').catch((error) => {
      switch (error.type) {
        case 'business':
          handleBusinessError(error.data)
          break
        case 'http':
          handleHttpError(error.response)
          break
        case 'network':
          handleNetworkError(error.error)
          break
      }
    })
    ```

5.  错误类型判断工具函数

    ````javascript
    function classifyAxiosError(error) {
    if (error.response) {
    return {
    type: 'http',
    status: error.response.status,
    data: error.response.data
    }
    }
          if (error.request) {
            return {
              type: 'network',
              message: error.message || 'Network issue'
            }
          }

          return {
            type: 'other',
            message: error.message
          }
        }

        // 使用示例
        axios.get('/api/data').catch(err => {
          const errorObj = classifyAxiosError(err)
          console.log(`错误类型: ${errorObj.type}`)
        })
        ```
    五、关键注意事项
    ````

6.  业务错误设计规范：

    ```javascript
    // 推荐业务响应格式
    {
      code: 0,          // 0=成功，非0=失败
      message: "成功",   // 用户可读消息
      data: {...},       // 业务数据
      errorCode: "AUTH_001", // 可选：详细错误码
      traceId: "xxx"     // 请求追踪ID
    }
    ```

7.  超时处理：

    ```javascript
    // 请求配置
    axios.get('/api/data', {
      timeout: 5000, // 5秒超时
      timeoutErrorMessage: '请求超时',
    })
    ```

8.  取消请求处理：

    ```javascript
    const source = axios.CancelToken.source()

    axios.get('/api/data', {
      cancelToken: source.token,
    })

    // 需要时取消请求
    source.cancel('用户取消操作')
    ```

9.  重试机制：

        ```javascript
        axios.interceptors.response.use(null, error => {
          const config = error.config
          if (!config || !config.retry) return Promise.reject(error)

          config.retryCount = config.retryCount || 0
          if (config.retryCount >= config.retry) {
            return Promise.reject(error)
          }

          config.retryCount += 1
          return new Promise(resolve =>
            setTimeout(() => resolve(axios(config)), config.retryDelay || 1000)
          )
        })
        ```

    :::

### Q：axios 如何取消请求？

::: details Deepseek 的回答

1.  使用 CancelToken（传统方式，适用于所有版本）

    ```javascript
    import axios from 'axios';

    // 1. 创建取消令牌源
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // 2. 发起请求时附加 cancelToken
    axios.get('/api/data', {
      cancelToken: source.token
    }).catch(thrown ={
      if (axios.isCancel(thrown)) {
        console.log('请求被取消', thrown.message);
      }
    });

    // 3. 取消请求
    source.cancel('用户主动取消操作');
    ```

2.  使用 AbortController（现代浏览器标准，Axios >= 0.22.0 推荐）

    ```javascript
    // 1. 创建 AbortController 实例
    const controller = new AbortController()

    // 2. 发起请求时附加 signal
    axios
      .get('/api/data', {
        signal: controller.signal,
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('请求取消原因:', error.message)
        }
      })

    // 3. 取消请求
    controller.abort('用户终止了请求')
    ```

3.  常见问题解决

        Q：取消请求后控制台出现 Cancel 错误怎么办？

        A：这是预期行为，应在 catch 中过滤：

        ```javascript
        .catch(error => {
          if (axios.isCancel(error)) return; // 忽略取消错误
          // 处理其他错误
        });
        ```
        Q：如何判断请求是否可取消？

        A：所有 Axios 请求都支持取消，但需注意：

        ```javascript
        // POST 请求同样可取消
        axios.post('/api', data, { signal: controller.signal })
        ```
        Q：文件上传如何取消？

        A：上传进度和取消结合：

        ```javascript
        const controller = new AbortController();

        axios.post('/upload', formData, {
          signal: controller.signal,
          onUploadProgress: e => {
            const percent = Math.round((e.loaded * 100) / e.total);
            console.log(percent + '%');
          }
        });

        // 取消上传
        document.getElementById('cancel-btn').addEventListener('click', () ={
          controller.abort();
        });
        ```

    :::
