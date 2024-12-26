import DefaultTheme from 'vitepress/theme'
import './custom.less'
import compList from '../components/index.js'; // 引入自定义Vue组件
import giscusTalk from 'vitepress-plugin-comment-with-giscus'; // 引入giscus评论插件
import { useData, useRoute } from 'vitepress';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    compList.forEach(value => {
      app.component(value.name, value.compoment);
    });
  },
  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();

    console.log('frontmatter: ', frontmatter);
    console.log('route: ', route);
    
    // Obtain configuration from: https://giscus.app/
    giscusTalk(
      {
        repo: 'duyidao/blog_review', 
        repoId: 'R_kgDONiZuEA',   
        category: 'Announcements', // default: `General` 
        categoryId: 'DIC_kwDONiZuEM4ClhjR', 
        mapping: 'pathname', // default: `pathname`
        inputPosition: 'top', // default: `top`
        lang: 'zh-CN', // default: `zh-CN`
        lightTheme: 'light', // default: `light`
        darkTheme: 'transparent_dark', // default: `transparent_dark`
        strict: '0', // default: `0`
        reactionsEnabled: '1', // default: `1`
        emitMetadata: '0', // default: `0`
        inputPosition: 'top', // default: `bottom`
        loading: 'lazy', // default: `lazy`
        crossorigin: 'anonymous', // default: `anonymous`
        // ...
      },
      {
        frontmatter, route
      },
      // Whether to activate the comment area on all pages.
      // The default is true, which means enabled, this parameter can be ignored;
      // If it is false, it means it is not enabled.
      // You can use `comment: true` preface to enable it separately on the page.
      true
    );
  }
}