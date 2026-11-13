const fs = require('fs')
const path = require('path')
const root = path.join(__dirname, 'src')
const list = [
  'concept/javascript/knowledge/变量与严格模式',
  'concept/module/miniProgram/两个线程',
  'concept/module/reg/元子字符',
  'concept/module/reg/匹配',
  'concept/module/reg/原子',
  'concept/module/reg/方法',
  'concept/module/reg/模式修饰',
  'concept/module/reg/正则中的lastIndex',
  'concept/module/reg/正则表达式',
  'concept/module/reg/运用前瞻实现密码强度检测',
  'concept/react/Diff算法',
  'concept/react/ReactRouter5',
  'concept/react/拓展',
  'concept/react/无脚手架项目创建',
  'concept/react/脚手架项目创建',
  'concept/sharp/node/fs',
  'concept/sharp/node/http',
  'concept/sharp/node/node',
  'concept/sharp/node/path',
  'concept/sharp/node/模块化',
  'concept/sharp/typescript/断言与枚举',
  'concept/sharp/typescript/泛型',
  'concept/sharp/typescript/环境配置',
  'concept/sharp/typescript/类与接口',
  'concept/sharp/typescript/类型',
  'concept/sharp/typescript/装饰器',
  'concept/sharp/vite/TS和CSS相关问题',
  'concept/vue/vue2/动态绑定',
  'concept/vue/vue2/基本概念与Vue指令',
  'concept/vue/vue2/组件',
  'concept/vue/vue3/指令',
  'concept/vue/vue3/插槽',
  'concept/vue/vue3/源码学习-Computed优化',
  'concept/vue/vue3/源码学习-Computed实现',
  'concept/vue/vue3/源码学习-h和createVNode的实现',
  'concept/vue/vue3/源码学习-Monorepo管理',
  'concept/vue/vue3/源码学习-patchProp',
  'concept/vue/vue3/源码学习-Reactive实现',
  'concept/vue/vue3/源码学习-Watch实现',
  'concept/vue/vue3/源码学习-打包配置',
  'concept/vue/vue3/源码学习-数组响应式',
  'concept/vue/vue3/源码学习-认识渲染器',
  'concept/vue/vue3/源码学习-项目搭建',
  'concept/vue/vue3/组件',
  'concept/vue/vue3/项目初始化',
  'practice/ai/企业级AI应用开发实战(js版)/Function Tool',
  'practice/ai/企业级AI应用开发实战(js版)/前端界面',
  'practice/ai/企业级AI应用开发实战(js版)/大模型接口',
  'practice/ai/企业级AI应用开发实战(js版)/搭建服务器',
  'practice/ai/企业级AI应用开发实战(js版)/流式传输',
  'practice/handle/business/元素不定大小溢出隐藏',
  'practice/handle/element/vue动态表单实现原理',
  'practice/handle/element/组件设计技巧',
  'practice/idea/js/promise/write/手写Promise类与.then',
  'practice/idea/vue/nextTick',
  'vitepress/dev',
  'vitepress/index',
  'vitepress/know',
  'vitepress/build',
  'vitepress/css',
  'vitepress/algolia',
  'vitepress/deploy',
  'vitepress/review',
  'read/javascript/ES6标准入门/async函数',
  'read/javascript/ES6标准入门/Class的基本语法',
  'read/javascript/ES6标准入门/Class的继承',
  'read/javascript/ES6标准入门/Module的语法',
  'read/javascript/ES6标准入门/Module的加载实现',
  'read/javascript/ES6标准入门/Promise对象',
  'read/javascript/ES6标准入门/Reflect',
  'read/javascript/ES6标准入门/ArrayBuffer',
  'read/javascript/ES6标准入门/编程风格',
  'read/javascript/ES6标准入门/修饰器',
  'read/javascript/ES6标准入门/读懂ECMAScript规格',
  'read/javascript/ES6标准入门/Generator函数的语法',
  'read/javascript/ES6标准入门/Generator函数的异步应用',
  'read/javascript/ES6标准入门/Iterator和for...of循环',
  'practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/提示词工程',
  'practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/前言',
]
const out = []
for (const k of list) {
  const f = path.join(root, k + '.md')
  if (!fs.existsSync(f)) {
    out.push('NOFILE ' + k)
    continue
  }
  const c = fs.readFileSync(f, 'utf8')
  const h1 = (c.match(/^#\s+(.+)$/m) || [, '?'])[1]
  const h2 = (c.match(/^##\s+(.+)$/gm) || []).map((x) =>
    x.replace(/^##\s+/, ''),
  )
  const len = c.length
  out.push(
    k +
      '\n  H1=' +
      h1 +
      '\n  len=' +
      len +
      '\n  H2=' +
      h2.slice(0, 12).join(' / '),
  )
}
fs.writeFileSync(path.join(__dirname, 'h1-audit.txt'), out.join('\n'), 'utf8')
console.log('ok')
