import { useData, useRoute } from 'vitepress';
import giscusTalk from 'vitepress-plugin-comment-with-giscus'; // 引入giscus评论插件

export default () => {
  // Get frontmatter and route
  const { frontmatter } = useData();
  const route = useRoute();

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
    },
    {
      frontmatter, route
    },
    true
  );
}