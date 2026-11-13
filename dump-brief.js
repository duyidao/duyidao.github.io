const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, 'src')
const files = []
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.md')) files.push(p)
  }
}
walk(root)

const generic =
  /^(变量|匹配|原子|方法|模式修饰|基础知识|拓展|组件|类|类型声明|插槽|装饰器|模块化|fs|http|path|Node|React|Vue|watch|patchProp|Monorepo|打包配置|项目搭建|项目初始化|前言|提示词工程|搭建|关于此模块|Diff 算法|React 路由|Enums 枚举|泛型 Generics|Vue3指令|ts|Function Tool|前端界面|大模型接口|搭建服务器|流式传输|点云3D可视化与标注模块)$/i

const out = []
for (const f of files) {
  const key = path
    .relative(root, f)
    .split(path.sep)
    .join('/')
    .replace(/\.md$/, '')
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/)
  const idx = lines.findIndex((l) => /^#\s+/.test(l))
  if (idx < 0) continue
  const h1 = lines[idx].replace(/^#\s+/, '').trim()
  const plain = h1.replace(/<word\s+text="([^"]+)"\s*\/>/g, '$1').trim()
  if (!(plain.length <= 14 || generic.test(plain))) continue
  out.push(`### ${key}`)
  out.push(`H1: ${h1}`)
  let taken = 0
  let inFence = false
  for (let i = idx + 1; i < lines.length && taken < 12; i++) {
    const l = lines[i]
    if (/^\s*```/.test(l)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const t = l.trim()
    if (!t) continue
    if (/^#{2,6}\s/.test(l)) {
      out.push('H2~ ' + t.slice(0, 80))
      taken++
      continue
    }
    out.push('TXT ' + t.slice(0, 110))
    taken++
  }
  out.push('')
}
fs.writeFileSync(path.join(__dirname, 'h1-brief.txt'), out.join('\n'), 'utf8')
console.log('docs', out.filter((l) => l.startsWith('### ')).length)
