# 搜索

## 本地搜索

查看[官方文档](https://vitepress.dev/zh/reference/default-theme-search)，只需在 `.vitepress/config.js` 文件中将 `themeConfig.search.provider` 选项设置为 `'local'` 即可：

```js
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
```

该方法优点是简单快捷，缺点是搜索速度较慢，且无法实时更新。

## Algolia

Algolia 是一个提供搜索服务的云平台，它可以帮助你快速地构建强大的搜索功能。比起本地搜索它最大的优点就是速度更快。

实现 Algolia 搜索需要以下步骤：

1. 为 VitePress 项目申请 Algolia 内容抓取申请

    [地址](https://docsearch.algolia.com/apply/)。打开链接，填写自己的 VitePress 项目URL地址、电子邮箱、VitePress 项目Github地址（选填），然后点击提交申请。

2. 等待一段时间，Algolia 会给你发送一封邮件，邮件中包含一个链接，如下图所示
   
    ![链接](https://pic1.imgdb.cn/item/67cede61066befcec6e27836.png)

3. 登录 Algolia 账号，会有一个红色提示关注应用，关注后复制 `APPID`、`APIKEY`、`INDEXNAME`，如下图所示
   
    ![复制](https://pic1.imgdb.cn/item/67cee04d066befcec6e27866.png)

4. 在 VitePress 项目的 `.vitepress/config.js` 中添加配置对象即可
   
    ```js
    search: {
      provider: 'local', // [!code --]
      provider: 'algolia', // [!code ++]
      options: { // [!code ++]
        appId: 'your appId', // [!code ++]
        apiKey: 'your apiKey', // [!code ++]
        indexName: 'your indexName' // [!code ++]
      } // [!code ++]
    }
    ```

重新启动项目，现在就可以使用 Algolia 搜索了。