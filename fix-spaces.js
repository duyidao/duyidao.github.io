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

const CJK = '\\u4e00-\\u9fa5\\u3000-\\u303f\\uff00-\\uffef'
const stats = { before: 0, after: 0, skipped: [] }

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8')
  const lines = content.split('\n')
  let inFence = false
  let dirty = false

  const out = lines.map((line) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      return line
    }
    if (inFence) return line
    let l = line

    l = l.replace(
      new RegExp('([' + CJK + '])[ \\u3000]<word\\s+text=', 'g'),
      (m, p1) => {
        stats.before++
        return p1 + '<word text='
      },
    )

    l = l.replace(new RegExp('/>[ \\u3000]([' + CJK + '])', 'g'), (m, p1) => {
      stats.after++
      return '/>' + p1
    })

    if (l !== line) dirty = true
    return l
  })

  if (dirty) fs.writeFileSync(f, out.join('\n'), 'utf8')
}
console.log('before fixed', stats.before, 'after fixed', stats.after)
