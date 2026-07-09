---
title: provide和inject的context封装
---

# provide 和 inject 的 context 封装

## provide 和 inject

`provide` 和 `inject` 是 Vue 提供的依赖注入 API，允许一个祖先组件向其所有子孙组件注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

`provide` 选项允许你指定你想要提供给后代组件的数据/方法。

`inject` 选项允许你开始使用一个可以被提供的依赖。

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

在传统的实现方式中，开发者通常需要在上级组件中使用 `provide` 提供数据，在它的子孙组件中使用 `inject` 来获取数据。但是这种方式存在一些问题：

1. `key` 容易写错，导致数据无法正确注入。
2. 每次用都需要引入 `provide` 和 `inject`。

为了解决以上的问题，可以通过封装 `provide` 和 `inject` 来简化开发者的使用。

## 封装 context

### 学习 reka-ui

学习 [rake-ui](https://github.com/unovue/reka-ui/blob/v2/packages/core/src/shared/createContext.ts) 对 `createContext` 的封装实现，首先来看看它的代码：

```ts
import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export function createContext<ContextValue>(
  providerComponentName: string | string[],
  contextName?: string,
) {
  const symbolDescription
    = typeof providerComponentName === 'string' && !contextName
      ? `${providerComponentName}Context`
      : contextName

  const injectionKey: InjectionKey<ContextValue | null> = Symbol(symbolDescription)

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
    if (context)
      return context

    if (context === null)
      return context as any

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

去除 TypeScript 类型定义后，来具体分析这段代码的实现逻辑：

这段代码主要导出了一个 `createContext` 函数，它接受两个参数：`providerComponentName` 和 `contextName`。

`providerComponentName` 是一个字符串或字符串数组，表示提供上下文的组件名称；`contextName` 是上下文的名称。接着做判断：

- 如果 `providerComponentName` 是字符串且 `contextName` 不存在，则使用 `${providerComponentName}Context` 作为描述
- 否则使用 `contextName` 作为描述

```ts
const symbolDescription
  = typeof providerComponentName === 'string' && !contextName
    ? `${providerComponentName}Context`
    : contextName
```

得到的 `symbolDescription` 在内部用 `Symbol` 函数生成一个唯一的 `InjectionKey`，这个 `InjectionKey` 会被用来在 `provide` 和 `inject` 中使用。

```ts
const injectionKey = Symbol(symbolDescription)
```

然后封装两个函数：`provideContext` 和 `injectContext`。

`provideContext` 接受一个 `contextValue` 参数，调用 `provide` 函数将 `contextValue` 提供给子孙组件，`key` 直接使用前面生成的 `InjectionKey`。

`injectContext` 接受一个 `fallback` 参数，调用 `inject` 函数获取上下文，`fallback` 作为如果获取不到上下文时的默认值，得到结果 `context`。如果结果 `context` 存在，则返回结果；如果结果为空，则直接原样返回；否则抛出错误提示。

```ts
const injectContext = (fallback) => {
  const context = inject(injectionKey, fallback)
  if (context)
    return context
  if (context === null)
    return context as any
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
const provideContext = (contextValue) => {
  provide(injectionKey, contextValue)
  return contextValue
}
```

最后返回一个元组，包含 `injectContext` 和 `provideContext`。

### 学习 ant-design-vue

再来学习一下组件库 [ant-design-vue](https://github.com/vueComponent/ant-design-vue/blob/main/components/form/context.ts) 在实现 `Form` 组件时，如何灵活封装运用 `provide` 和 `inject`。

```ts
import type { InjectionKey, ComputedRef } from 'vue';
import { inject, provide, computed } from 'vue';
import type { ColProps } from '../grid';
import type { RequiredMark } from './Form';
import type { ValidateStatus, FieldExpose } from './FormItem';
import type { FormLabelAlign, Rule, ValidateMessages } from './interface';
import { defaultValidateMessages } from './utils/messages';

export interface FormContextProps {
  model?: ComputedRef<any>;
  vertical: ComputedRef<boolean>;
  name?: ComputedRef<string>;
  colon?: ComputedRef<boolean>;
  labelAlign?: ComputedRef<FormLabelAlign>;
  labelWrap?: ComputedRef<boolean>;
  labelCol?: ComputedRef<ColProps>;
  wrapperCol?: ComputedRef<ColProps>;
  requiredMark?: ComputedRef<RequiredMark>;
  //itemRef: (name: (string | number)[]) => (node: React.ReactElement) => void;
  addField: (eventKey: string, field: FieldExpose) => void;
  removeField: (eventKey: string) => void;
  validateTrigger?: ComputedRef<string | string[]>;
  rules?: ComputedRef<{ [k: string]: Rule[] | Rule }>;
  onValidate: (
    name: string | number | Array<string | number>,
    status: boolean,
    errors: string[] | null,
  ) => void;
  validateMessages: ComputedRef<ValidateMessages>;
}

export const FormContextKey: InjectionKey<FormContextProps> = Symbol('formContextKey');

export const useProvideForm = (state: FormContextProps) => {
  provide(FormContextKey, state);
};

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
  } as FormContextProps);
};

/** Used for ErrorList only */
export interface FormItemPrefixContextProps {
  prefixCls: ComputedRef<string>;
  status?: ComputedRef<ValidateStatus>;
}

export const FormItemPrefixContextKey: InjectionKey<FormItemPrefixContextProps> = Symbol(
  'formItemPrefixContextKey',
);

export const useProvideFormItemPrefix = (state: FormItemPrefixContextProps) => {
  provide(FormItemPrefixContextKey, state);
};

export const useInjectFormItemPrefix = () => {
  return inject(FormItemPrefixContextKey, {
    prefixCls: computed(() => ''),
  });
};
```

去除 TypeScript 类型定义后，来具体分析这段代码的实现逻辑：

首先定义一个 `formContext` 的 `InjectionKey`，用于 `Form` 组件的上下文注入和获取。依旧是使用了 `Symbol` 来生成唯一的 `key`。

```ts
export const FormContextKey = Symbol('formContextKey');
```

接着导出封装好的 `provide` 和 `inject` 函数，凭借 `FormContextKey` ，用于 `Form` 组件的上下文注入和获取。同 `reka-ui` 一样，`inject` 会传入第二个参数，作为默认值。

::: code-group
```ts [provide]
export const useProvideForm = (state) => {
  provide(FormContextKey, state);
};
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
  });
};
```
:::

然后定义一个 `FormItemPrefixContextKey`，用于 `FormItem` 组件的上下文注入和获取。

```ts
export const FormItemPrefixContextKey = Symbol('formItemPrefixContextKey');
```

接着导出封装好的 `provide` 和 `inject` 函数，凭借 `FormItemPrefixContextKey` ，用于 `FormItem` 组件的上下文注入和获取。

::: code-group
```ts [provide]
export const useProvideFormItemPrefix = (state) => {
  provide(FormItemPrefixContextKey, state);
};
```
```ts [inject]
export const useInjectFormItemPrefix = () => {
  return inject(FormItemPrefixContextKey, {
    prefixCls: computed(() => ''),
  });
};
```
:::

## 总结

总结一下，学习了两个组件库的上下文注入和获取，发现它们在实现上有一些共通点：

1. 使用 `Symbol` 生成唯一的 `key`，用于 `provide` 和 `inject`，避免重复，保证唯一性。
2. 用户不再需要考虑使用什么 `key` ，只需要调用封装好的 `provide` 和 `inject` 函数即可。`key` 值在内部就已经定义好，用户只需要关注上下文状态即可。
3. 封装 `provide` 和 `inject` 函数，便于使用。还做了 `inject` 的默认值处理，防止 `inject` 失败。

当然二者也有不同的地方，比如 `reka-ui` 更偏向于通用性，而 `ant-design-vue` 更偏向于 `Form` 组件内部使用。