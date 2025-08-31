import { groupIconMdPlugin } from 'vitepress-plugin-group-icons';

export default {
  image: {
    lazyLoading: true, // 开启图片懒加载
  },
  lineNumbers: true, // 默认禁用；设置为 true 可为所有代码块启用行号。
  config(md) {
    md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
      let htmlResult = slf.renderToken(tokens, idx, options);
      if (tokens[idx].tag === "h1") htmlResult += `<mdInfo />`;
      return htmlResult;
    };
    md.use(groupIconMdPlugin);
  }
}