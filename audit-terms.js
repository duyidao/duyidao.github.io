const fs = require('fs')
const path = require('path')
const g = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'src/术语词汇表.json'), 'utf8'),
)
const terms = [
  'Angular',
  'Animate.css',
  'CSSOM',
  'Cookie',
  'Design pattern',
  'ES Module',
  'GPU',
  'GitHub',
  'Internet Explorer',
  'MapVThree',
  'MarkerClusterer',
  'Microsoft Edge',
  'Microsoft',
  'Mixin',
  'Node',
  'Polygon',
  'Promise A+',
  'React Fiber',
  'React Native',
  'Render',
  'Selenium',
  'Storage',
  'Turf.js',
  'Vue CLI',
  'Vue EventBus',
  'Vue Router',
  'XMLHttpRequest',
  'file-saver',
  '单例模式',
  '同源策略',
  '微信',
]
const out = []
for (const t of terms) {
  const rel = []
  for (const [k, v] of Object.entries(g)) {
    if (
      v.en === t ||
      v.cn === t ||
      v.cn.startsWith(t + ' ') ||
      v.cn.includes(t)
    )
      rel.push(`${k}  en=${v.en} cn=${v.cn}`)
  }
  out.push(`### ${t}\n  related: ${rel.length ? rel.join(' | ') : 'none'}`)
}
out.push('\n=== total keys: ' + Object.keys(g).length)
fs.writeFileSync(path.join(__dirname, 'term-audit.txt'), out.join('\n'), 'utf8')
console.log('ok')
