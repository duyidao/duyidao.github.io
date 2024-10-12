# 子组件的导入

## 前置

根据效果图可以看出，左右两侧的卡片组件都是一个个子组件。在之前，写法可能是写完子组件后单独一个个 `import` 导入，`components` 挂载使用。但是这样写的话，如果组件很多，那么每次都要一个个 `import`，显得有些麻烦。

后面学习了 `import.meta.glob` 后，发现了一个更方便的写法，`import.meta.glob` 可以批量导入文件，并且可以动态生成 `key`，这样就可以不用一个个 `import` 了。因此先整理一下思路步骤。

## 子组件

### 统一导出思路
1. 把所有的公共组件都写在统一的文件夹内，比如 `components` 文件夹下，并且规范命名规则，以 `model` 开头为例。这样方便管理。可以再创建 `left` 和 `right` 之类的文件夹，用于区分是哪侧的组件。
2. 在 `components` 文件夹下创建 `index.js`，`import.meta.glob` 导入所有的 `.vue` 文件。
   ```js
    const routeFiles = import.meta.glob(['./*/*.vue', './*.vue']);
   ```
   此时就能获取到所有的子组件，并且生成一个对象 `routeFiles`。`routeFiles` 的 `key` 是文件路径，`value` 是 `import` 函数。
3. 循环遍历对象，过滤出所有需要的组件，即 `model` 开头的组件。然后把组件的名称改为小写，获取文件的类型，如果是 `model` 的，则默认给 `default` 。
   ```js
    import {defineAsyncComponent} from 'vue'; // [!code ++]

    const routeFiles = import.meta.glob(['./*/*.vue', './*.vue']);
    const asyncComponents = {}; // [!code ++]
    const toLowerCase = s => s[0].toLowerCase() + s.slice(1); // [!code ++]

    Object.entries(routeFiles) // [!code ++]
        .filter(([path]) => path.startsWith('./model')) // [!code ++]
        .forEach(([path, component]) => { // [!code ++]
            const name = getCardNameByPath(path); // [!code ++] // 获取组件名
            const type = getCardTypeByPath(path); // [!code ++] // 获取组件样式类型
        }); // [!code ++]

    export default asyncComponents; // [!code ++]

    function getCardNameByPath(path) { // [!code ++]
        const upperName = path.replaceAll(/^\.\/model([^\/]*)(\/.*|\.vue)$/g, '$1'); // [!code ++]
        return toLowerCase(upperName); // [!code ++]
    } // [!code ++]

    function getCardTypeByPath(path) { // [!code ++]
        const fileName = path.split('/').at(-1); // [!code ++]
        if (fileName.includes('model')) { // [!code ++]
            return 'default'; // [!code ++]
        } // [!code ++]
        return fileName.replaceAll('.vue', ''); // [!code ++]
    } // [!code ++]
   ```
4. 检查 `asyncComponents` 对象是否有以组件名为键的属性，如果有，就获取这个属性的值；如果没有，就创建一个新的空对象。使用 `defineAsyncComponent` 方法将组件定义为异步组件，并将其赋值给 `components` 对象的对应类型的属性。`defineAsyncComponent` 是 Vue3 中的一个函数，用于定义异步组件。最后，将 `components` 对象赋值回 `asyncComponents` 对象的对应组件名的属性。这样，`asyncComponents` 对象就包含了所有以 ./model 开头的路径的组件，每个组件都按其类型组织。

### 总体代码
```js

import {defineAsyncComponent} from 'vue';
const routeFiles = import.meta.glob(['./*/*.vue', './*.vue']);

const asyncComponents = {};
const toLowerCase = s => s[0].toLowerCase() + s.slice(1);

Object.entries(routeFiles)
    .filter(([path]) => path.startsWith('./model'))
    .forEach(([path, component]) => {
        const name = getCardNameByPath(path); // 获取组件名
        const type = getCardTypeByPath(path); // 获取组件样式类型

        const components = asyncComponents[name] || {};

        components[type] = defineAsyncComponent(component);

        asyncComponents[name] = components;
    });

export default asyncComponents;


function getCardNameByPath(path) {
    const upperName = path.replaceAll(/^\.\/model([^\/]*)(\/.*|\.vue)$/g, '$1');
    return toLowerCase(upperName);
}

function getCardTypeByPath(path) {
    const fileName = path.split('/').at(-1);
    if (fileName.includes('model')) {
        return 'default';
    }
    return fileName.replaceAll('.vue', '');
}
```

## 父组件引用
