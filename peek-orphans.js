const fs = require('fs')
const path = require('path')
const meta = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'src', '文档元数据.json'), 'utf8'),
)
const keys = [
  'practice/ai/企业级AI应用开发实战(js版)/markdown 语法及渲染',
  'read/vite/深入浅出Vite/代码规范-如何利用 Lint 工具链来保证代码风格和质量？',
  'concept/sharp/node/NPM',
  'work/百度/图业融合/BUG修改与记录',
  'work/数说/需求洞察/Tooltip无法显示',
  'work/南网/无人机/公共视频播放组件的封装与拓展',
  'read/vite/深入浅出Vite/开篇',
]
for (const k of keys) {
  const e = meta[k]
  console.log('=== ' + k)
  if (!e) {
    console.log('  (none)')
    continue
  }
  console.log('  title: ' + e.title)
  console.log('  desc : ' + e.description)
  console.log('  tags : ' + (e.tags || []).join(', '))
}
console.log('\ntotal keys: ' + Object.keys(meta).length)
