import rewrites from "./config/rewrites";
import head from "./config/head";
import themeConfig from "./config/themeConfig";


module.exports = {
  lang: "zh-CN",
  // 网站标题
  title: "🔪 刀刀博客",
  titleTemplate: ":title - 刀刀博客", // 网站描述
  // 网站描述
  description: "刀刀博客",
  // 打包目录
  dest: "./dist",
  head,
  cleanUrls: true, // 删除 .html 后缀

  //markdown配置
  markdown: {
    // 开启图片懒加载
    image: {
      lazyLoading: true,
    },
    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      };
    },
  },
  // 主题配置
  themeConfig,
  rewrites,
};
