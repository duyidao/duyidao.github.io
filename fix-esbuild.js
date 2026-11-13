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

let changed = 0
const touched = []
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8')
  if (!content.includes('<word text="Esbuild"')) continue
  const lines = content.split('\n')
  let inFence = false
  let hit = 0
  const next = lines.map((line) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      return line
    }
    if (inFence) return line
    if (line.includes('<word text="Esbuild"')) {
      hit += (line.match(/<word text="Esbuild"/g) || []).length
      return line.split('<word text="Esbuild"').join('<word text="esbuild"')
    }
    return line
  })
  if (hit) {
    fs.writeFileSync(f, next.join('\n'), 'utf8')
    changed += hit
    touched.push(`${path.relative(root, f)} ${hit}`)
  }
}
console.log('replaced', changed)
console.log(touched.join('\n'))
