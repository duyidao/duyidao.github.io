# customRef 实现全局 loading 封装

## 问题

全局 `loading` 通常通过 `v-loading` 指令实现：请求时设为 `true`，完成后设为 `false`。

```js
export async function request(url: string, params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  loading.value = true;
  return await fetch(`${url}?${query}`).finally(() => {
    loading.value = false;
  });
}
```

并发请求时会有问题：第一个请求返回后 `loading` 变为 `false`，但第二个请求尚未返回，全局 loading 状态提前消失。

## 解决方案

不直接设置 `loading` 的布尔值，改用 `loadingCount` 计数器。每发起一个请求 +1，每完成一个请求 -1，计数为 0 时 `loading` 为 `false`，否则为 `true`。

借助 `customRef` 实现：`customRef` 接收一个回调函数，参数为 `track`（追踪依赖）和 `trigger`（触发更新），返回一个包含 `get` 和 `set` 的对象。`get` 在读取时调用，`set` 在修改时调用。

```js
export const loading = customRef((track, trigger) => {
  let loadingCount = 0;

  return {
    get() {
      track();
      return loadingCount > 0;
    },
    set(value) {
      loadingCount += value ? 1 : -1;
      loadingCount = Math.max(loadingCount, 0);
      trigger();
    },
  };
});
```

## 动手实操

<myIframe url="https://example.duyidao.cn/hook/customRefLoading" />