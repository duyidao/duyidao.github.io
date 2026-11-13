const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, 'src')
const metaPath = path.join(root, '文档元数据.json')
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'))

const files = []
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.md')) files.push(p)
  }
}
walk(root)

const docKeys = files.map((f) =>
  path.relative(root, f).split(path.sep).join('/').replace(/\.md$/, ''),
)

const missing = []
const mismatch = []
const h1Map = {}
for (const f of files) {
  const key = path
    .relative(root, f)
    .split(path.sep)
    .join('/')
    .replace(/\.md$/, '')
  const txt = fs.readFileSync(f, 'utf8')
  const m = txt.match(/^#\s+(.+)$/m)
  const h1 = m ? m[1].trim() : '(NONE)'
  h1Map[key] = h1
  if (!meta[key]) missing.push(`${key}\t${h1}`)
  else if (meta[key].title !== h1)
    mismatch.push(`${key}\t${meta[key].title}\t${h1}`)
}

const orphans = Object.keys(meta).filter((k) => !docKeys.includes(k))

const lines = []
lines.push(`docs=${files.length} metaKeys=${Object.keys(meta).length}`)
lines.push(
  `missing=${missing.length} mismatch=${mismatch.length} orphan=${orphans.length}`,
)
lines.push('')
lines.push('=== MISSING ===')
lines.push(...missing)
lines.push('')
lines.push('=== MISMATCH ===')
lines.push(...mismatch)
lines.push('')
lines.push('=== ORPHAN ===')
lines.push(...orphans)

fs.writeFileSync(
  path.join(__dirname, 'sync-list.txt'),
  lines.join('\n'),
  'utf8',
)
console.log(lines.slice(0, 3).join('\n'))
