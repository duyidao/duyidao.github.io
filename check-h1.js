const fs = require('fs')
const path = require('path')
const root = path.join(__dirname, 'src')
const files = []
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.md')) files.push(p)
  }
}
walk(root)
const bad = []
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/)
  let fence = false
  const h1 = []
  lines.forEach((l, i) => {
    if (/^\s*```/.test(l)) fence = !fence
    else if (!fence && /^#\s+/.test(l)) h1.push(i + 1 + ':' + l)
  })
  if (h1.length !== 1)
    bad.push(path.relative(root, f) + ' -> ' + h1.join(' || '))
}
console.log(bad.join('\n'))
console.log('TOTAL=' + bad.length)
