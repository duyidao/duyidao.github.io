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

const meta = JSON.parse(
  fs.readFileSync(path.join(root, '文档元数据.json'), 'utf8'),
)

const out = []
for (const f of files) {
  const key = path.relative(root, f).replace(/\\/g, '/').replace(/\.md$/, '')
  const entry = meta[key]
  if (!entry) continue
  const content = fs.readFileSync(f, 'utf8')
  const lines = content.split(/\r?\n/)
  const h1 = content.match(/^#\s+(.+)$/m)
  const title = h1 ? h1[1].trim() : '(NO H1)'
  if (!entry.title || entry.title.trim() === title) continue
  const h2 = []
  let para = ''
  let inFence = false
  let pastH1 = false
  for (const l of lines) {
    if (/^\s*```/.test(l)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    if (/^#\s+/.test(l)) {
      pastH1 = true
      continue
    }
    if (pastH1) {
      if (/^##\s+/.test(l) && h2.length < 5)
        h2.push(l.replace(/^##\s+/, '').trim())
      else if (!para && l.trim() && !/^[#|>!-]/.test(l.trim()))
        para = l.trim().slice(0, 90)
    }
  }
  out.push(
    [
      'KEY: ' + key,
      '  meta: ' + entry.title,
      '  doc : ' + title,
      '  h2  : ' + h2.join(' / '),
      '  para: ' + para,
    ].join('\n'),
  )
}
fs.writeFileSync(
  path.join(__dirname, 'mismatch-full.txt'),
  out.join('\n\n'),
  'utf8',
)
console.log('count=' + out.length)
