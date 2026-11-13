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

const meta = JSON.parse(
  fs.readFileSync(path.join(root, '文档元数据.json'), 'utf8'),
)

const out = []
out.push('=== A. WORD TAGS NOT IN GLOSSARY ===')
const missing = new Map()
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/)
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/<word\s+text="([^"]+)"\s*\/>/g)) {
      const k = m[1]
      if (keys.has(k)) continue
      if (!missing.has(k))
        missing.set(k, { count: 0, hits: [], ci: lower.get(k.toLowerCase()) })
      const rec = missing.get(k)
      rec.count++
      if (rec.hits.length < 6)
        rec.hits.push(
          `${path.relative(root, f)}:${i + 1}| ${line.trim().slice(0, 160)}`,
        )
    }
  })
}
for (const [k, rec] of [...missing].sort()) {
  out.push(`\n--- ${k}  count=${rec.count}  ciMatch=${rec.ci || 'none'}`)
  for (const h of rec.hits) out.push('    ' + h)
}

out.push('\n\n=== B. DOCS WITHOUT METADATA ===')
const docKeys = files.map((f) =>
  path.relative(root, f).replace(/\\/g, '/').replace(/\.md$/, ''),
)
for (const k of docKeys) {
  if (!meta[k]) out.push('  MISSING: ' + k)
}

out.push('\n=== C. ORPHAN METADATA KEYS ===')
for (const k of Object.keys(meta)) {
  if (!docKeys.includes(k)) out.push('  ORPHAN: ' + k)
}

out.push('\n=== D. METADATA TITLE MISMATCH ===')
for (const f of files) {
  const key = path.relative(root, f).replace(/\\/g, '/').replace(/\.md$/, '')
  const entry = meta[key]
  if (!entry) continue
  const content = fs.readFileSync(f, 'utf8')
  const h1 = content.match(/^#\s+(.+)$/m)
  const title = h1 ? h1[1].trim() : '(NO H1)'
  if (!entry.title || entry.title.trim() !== title)
    out.push(`  ${key}\n      meta: ${entry.title}\n      doc : ${title}`)
  if (!entry.description) out.push(`  ${key}  -> EMPTY description`)
  if (!Array.isArray(entry.tags)) out.push(`  ${key}  -> tags not array`)
}

out.push('\n=== E. SPACES AROUND WORD TAGS (count) ===')
let before = 0,
  after = 0
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8')
  before += (content.match(/[ \u3000]<word\s+text=/g) || []).length
  after += (content.match(/\/>[ \u3000]/g) || []).length
}
out.push(`  before-tag spaces: ${before}`)
out.push(`  after-tag spaces: ${after}`)

fs.writeFileSync(path.join(__dirname, 'report.txt'), out.join('\n'), 'utf8')
console.log('written')
