export default [
  // 添加图标
  ["link", { rel: "icon", href: "./favicon.ico" }],
  ["meta", { property: "og:title", content: "刀刀博客" }],
  ["meta", { property: "og:site_name", content: "刀刀博客" }],
  ["meta", { property: "og:type", content: "website" }],
  [
    "meta",
    {
      property: "og:description",
      content: "杜一刀技术博客刀刀博客，记录着所学所思所想",
    },
  ],
  [
    "meta",
    {
      property: "og:keyword",
      content:
        "刀刀,杜一刀,技术博客,博客,前端,js,css,html,react,vue,webpack,vite,git,github,码农,程序员,刀刀博客",
    },
  ],
  ["meta", { property: "og:image", content: "./favicon.ico" }],
  ["meta", { property: "og:url", content: "https://duyidao.github.io/" }],
  [
    "meta",
    {
      property: "keyword",
      content:
        "刀刀,杜一刀,技术博客,博客,前端,js,css,html,react,vue,webpack,vite,git,github,码农,程序员,刀刀博客",
    },
  ],
  [
    "meta",
    {
      httpEquiv: "Cache-Control",
      content: "no-cache, no-store, must-revalidate",
    },
  ],
  ["meta", { httpEquiv: "Pragma", content: "no-cache" }],
  ["meta", { httpEquiv: "Expires", content: "0" }],
  // [
  //   'script',
  //   { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=TAG_ID' }
  // ],
  // [
  //   'script',
  //   {},
  //   `window.dataLayer = window.dataLayer || [];
  //   function gtag(){dataLayer.push(arguments);}
  //   gtag('js', new Date());
  //   gtag('config', 'TAG_ID');`
  // ]
];
