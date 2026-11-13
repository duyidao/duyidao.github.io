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

const glossary = JSON.parse(
  fs.readFileSync(path.join(root, '术语词汇表.json'), 'utf8'),
)
const keys = new Set(Object.keys(glossary))
const lower = new Map()
for (const k of keys) lower.set(k.toLowerCase(), k)

const missing = new Map()
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/)
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/<word\s+text="([^"]+)"\s*\/>/g)) {
      const k = m[1]
      if (keys.has(k)) continue
      if (!missing.has(k)) missing.set(k, [])
      missing.get(k).push(`${path.relative(root, f)}:${i + 1}| ${line.trim()}`)
    }
  })
}

for (const k of [...missing.keys()].sort()) {
  console.log(`\n===== ${k} (${missing.get(k).length}) =====`)
  for (const s of missing.get(k)) console.log('  ' + s)
}
