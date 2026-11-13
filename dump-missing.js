const fs = require('fs')
const path = require('path')
const root = path.join(__dirname, 'src')
const keys = [
  'practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/LangChain框架',
  'practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/LLM是什么',
  'practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/前言',
  'practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/提示词工程',
  'practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/调试大模型 API',
  'practice/ai/AI Agent+智能大屏设计器/第二章 AI Agent 工程基础/项目搭建',
  'read/vite/深入浅出Vite/代码规范：如何利用 Lint 工具链来保证代码风格和质量？',
  'read/vite/深入浅出Vite/双引擎架构：Vite 是如何站在巨人的肩膀上实现的？',
  'read/vite/深入浅出Vite/开篇：让 Vite 助力你的前端工程化之路',
  'work/南网/无人机/Cesium室外实景模型渲染设计与实践',
  'work/南网/无人机/企业级定时任务Cron表达式的前端优雅封装与实战',
  'work/南网/无人机/点云2D地图模块设计与实践',
  'work/南网/无人机/点云3D可视化与标注模块',
]
const out = []
for (const k of keys) {
  const f = path.join(root, k + '.md')
  if (!fs.existsSync(f)) {
    out.push('MISSING FILE: ' + k)
    continue
  }
  const c = fs.readFileSync(f, 'utf8')
  const h1 = (c.match(/^#\s+(.+)$/m) || [, '(NO H1)'])[1].trim()
  const h2 = c.match(/^##\s+.*$/gm) || []
  let para = ''
  for (const l of c.split(/\r?\n/)) {
    const t = l.trim()
    if (
      !t ||
      t.startsWith('#') ||
      t.startsWith('```') ||
      t.startsWith('|') ||
      t.startsWith('>') ||
      t.startsWith(':::') ||
      t.startsWith('-') ||
      t.startsWith('!') ||
      t.startsWith('<')
    )
      continue
    para = t.slice(0, 120)
    break
  }
  out.push(
    [
      'KEY: ' + k,
      'H1: ' + h1,
      'H2: ' + h2.map((x) => x.replace(/^##\s+/, '')).join(' / '),
      'PARA: ' + para,
    ].join('\n'),
  )
}
fs.writeFileSync(
  path.join(__dirname, 'missing-info.txt'),
  out.join('\n\n'),
  'utf8',
)
console.log('done')
