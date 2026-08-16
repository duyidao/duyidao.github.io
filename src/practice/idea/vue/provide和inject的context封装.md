# provide 和 inject 的 context 封装

## provide 和 inject

`provide` 和 `inject` 是<word text="Vue" />提供的依赖注入 API，允许祖先组件向所有子孙组件注入依赖，无论组件层次多深，在上下游关系成立期间始终生效。

`provide` 用于指定要提供给后代组件的数据或方法。

`inject` 用于接收祖先组件提供的依赖。

::: code-group

```js [父组件App.vue]
provide('theme', reactive({ color: 'blue' }))
```

```js [子组件Child.vue]
const theme = inject('theme')
// 修改 theme.color 会同步影响所有注入了它的组件
theme.color = 'red'
```

```js [孙组件GrandChild.vue]
const theme = inject('theme')
console.log(theme.color) // 'red'
```

:::

## 为什么需要封装 context

直接使用 `provide` 和 `inject` 有两个问题：

1. `key` 容易写错，导致数据无法正确注入。
2. 每次使用都需要引入 `provide` 和 `inject`。

封装后可解决上述问题。

## 封装 context

### 学习 reka-ui

[reka-ui](https://github.com/unovue/reka-ui/blob/v2/packages/core/src/shared/createContext.ts) 的 `createContext` 实现：

```ts
import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export function createContext<ContextValue>(
  providerComponentName: string | string[],
  contextName?: string,
) {
  const symbolDescription =
    typeof providerComponentName === 'string' && !contextName
      ? `${providerComponentName}Context`
      : contextName

  const injectionKey: InjectionKey<ContextValue | null> =
    Symbol(symbolDescription)

  /**
   * @param fallback The context value to return if the injection fails.
   *
   * @throws When context injection failed and no fallback is specified.
   * This happens when the component injecting the context is not a child of the root component providing the context.
   */
  const injectContext = <
    T extends ContextValue | null | undefined = ContextValue,
  >(
    fallback?: T,
  ): T extends null ? ContextValue | null : ContextValue => {
    const context = inject(injectionKey, fallback)
    if (context) return context

    if (context === null) return context as any

    throw new Error(
      `Injection \`${injectionKey.toString()}\` not found. Component must be used within ${
        Array.isArray(providerComponentName)
          ? `one of the following components: ${providerComponentName.join(
              ', ',
            )}`
          : `\`${providerComponentName}\``
      }`,
    )
  }

  const provideContext = (contextValue: ContextValue) => {
    provide(injectionKey, contextValue)
    return contextValue
  }

  return [injectContext, provideContext] as const
}
```

去除<word text="TypeScript" />类型定义后，分析实现逻辑：

`createContext` 接受两个参数：`providerComponentName`（提供上下文的组件名称，字符串或数组）和 `contextName`（上下文名称）。

- 若 `providerComponentName` 是字符串且 `contextName` 不存在，用 `${providerComponentName}Context` 作为描述
- 否则使用 `contextName` 作为描述

```ts
const symbolDescription =
  typeof providerComponentName === 'string' && !contextName
    ? `${providerComponentName}Context`
    : contextName
```

用 `Symbol` 函数生成唯一的 `InjectionKey`，供 `provide` 和 `inject` 使用。

```ts
const injectionKey = Symbol(symbolDescription)
```

封装两个函数：`provideContext` 和 `injectContext`。

`provideContext` 接收 `contextValue`，调用 `provide` 将值注入子孙组件，`key` 使用前面生成的 `InjectionKey`。

`injectContext` 接收 `fallback` 作为默认值，调用 `inject` 获取上下文。结果存在则返回；结果为 `null` 则原样返回；否则抛出错误提示。

```ts
const injectContext = (fallback) => {
  const context = inject(injectionKey, fallback)
  if (context) return context
  if (context === null) return context as any
  throw new Error(
    `Injection \`${injectionKey.toString()}\` not found. Component must be used within ${
      Array.isArray(providerComponentName)
        ? `one of the following components: ${providerComponentName.join(', ')}`
        : `\`${providerComponentName}\``
    }`,
  )
}
const provideContext = (contextValue) => {
  provide(injectionKey, contextValue)
  return contextValue
}
```

返回一个元组 `[injectContext, provideContext]`。

### 学习 ant-design-vue

[ant-design-vue](https://github.com/vueComponent/ant-design-vue/blob/main/components/form/context.ts) 在 `Form` 组件中封装 `provide` 和 `inject` 的实现：

```ts
import type { InjectionKey, ComputedRef } from 'vue'
import { inject, provide, computed } from 'vue'
import type { ColProps } from '../grid'
import type { RequiredMark } from './Form'
import type { ValidateStatus, FieldExpose } from './FormItem'
import type { FormLabelAlign, Rule, ValidateMessages } from './interface'
import { defaultValidateMessages } from './utils/messages'

export interface FormContextProps {
  model?: ComputedRef<any>
  vertical: ComputedRef<boolean>
  name?: ComputedRef<string>
  colon?: ComputedRef<boolean>
  labelAlign?: ComputedRef<FormLabelAlign>
  labelWrap?: ComputedRef<boolean>
  labelCol?: ComputedRef<ColProps>
  wrapperCol?: ComputedRef<ColProps>
  requiredMark?: ComputedRef<RequiredMark>
  //itemRef: (name: (string | number)[]) => (node: React.ReactElement) => void;
  addField: (eventKey: string, field: FieldExpose) => void
  removeField: (eventKey: string) => void
  validateTrigger?: ComputedRef<string | string[]>
  rules?: ComputedRef<{ [k: string]: Rule[] | Rule }>
  onValidate: (
    name: string | number | Array<string | number>,
    status: boolean,
    errors: string[] | null,
  ) => void
  validateMessages: ComputedRef<ValidateMessages>
}

export const FormContextKey: InjectionKey<FormContextProps> =
  Symbol('formContextKey')

export const useProvideForm = (state: FormContextProps) => {
  provide(FormContextKey, state)
}

export const useInjectForm = () => {
  return inject(FormContextKey, {
    name: computed(() => undefined),
    labelAlign: computed(() => 'right' as FormLabelAlign),
    vertical: computed(() => false),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addField: (_eventKey: string, _field: FieldExpose) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeField: (_eventKey: string) => {},
    model: computed(() => undefined),
    rules: computed(() => undefined),
    colon: computed(() => undefined),
    labelWrap: computed(() => undefined),
    labelCol: computed(() => undefined),
    requiredMark: computed(() => false),
    validateTrigger: computed(() => undefined),
    onValidate: () => {},
    validateMessages: computed(() => defaultValidateMessages),
  } as FormContextProps)
}

/** Used for ErrorList only */
export interface FormItemPrefixContextProps {
  prefixCls: ComputedRef<string>
  status?: ComputedRef<ValidateStatus>
}

export const FormItemPrefixContextKey: InjectionKey<FormItemPrefixContextProps> =
  Symbol('formItemPrefixContextKey')

export const useProvideFormItemPrefix = (state: FormItemPrefixContextProps) => {
  provide(FormItemPrefixContextKey, state)
}

export const useInjectFormItemPrefix = () => {
  return inject(FormItemPrefixContextKey, {
    prefixCls: computed(() => ''),
  })
}
```

去除<word text="TypeScript" />类型定义后，分析实现逻辑：

先定义 `FormContextKey` 作为 `Form` 组件的上下文 `InjectionKey`，用 `Symbol` 生成唯一 `key`。

```ts
export const FormContextKey = Symbol('formContextKey')
```

导出封装好的 `provide` 和 `inject` 函数，凭借 `FormContextKey` 实现 `Form` 组件的上下文注入和获取。与 `reka-ui` 一样，`inject` 传入第二个参数作为默认值。

::: code-group

```ts [provide]
export const useProvideForm = (state) => {
  provide(FormContextKey, state)
}
```

```ts [inject]
export const useInjectForm = () => {
  return inject(FormContextKey, {
    name: computed(() => undefined),
    labelAlign: computed(() => 'right'),
    vertical: computed(() => false),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addField: (_eventKey, _field) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeField: (_eventKey) => {},
    model: computed(() => undefined),
    rules: computed(() => undefined),
    colon: computed(() => undefined),
    labelWrap: computed(() => undefined),
    labelCol: computed(() => undefined),
    requiredMark: computed(() => false),
    validateTrigger: computed(() => undefined),
    onValidate: () => {},
    validateMessages: computed(() => defaultValidateMessages),
  })
}
```

:::

再定义 `FormItemPrefixContextKey`，用于 `FormItem` 组件的上下文注入和获取。

```ts
export const FormItemPrefixContextKey = Symbol('formItemPrefixContextKey')
```

导出封装好的 `provide` 和 `inject` 函数，凭借 `FormItemPrefixContextKey` 实现 `FormItem` 组件的上下文注入和获取。

::: code-group

```ts [provide]
export const useProvideFormItemPrefix = (state) => {
  provide(FormItemPrefixContextKey, state)
}
```

```ts [inject]
export const useInjectFormItemPrefix = () => {
  return inject(FormItemPrefixContextKey, {
    prefixCls: computed(() => ''),
  })
}
```

:::

## 总结

两个组件库的上下文封装有共通点：

1. 用 `Symbol` 生成唯一 `key`，避免重复，保证唯一性。
2. 用户无需关心 `key` 值，只需调用封装好的 `provide` 和 `inject` 函数。`key` 在内部定义，用户只需关注上下文状态。
3. 封装 `provide` 和 `inject` 函数，并做 `inject` 默认值处理，防止 `inject` 失败。

不同之处：`reka-ui` 偏向通用性，`ant-design-vue` 偏向 `Form` 组件内部使用。
