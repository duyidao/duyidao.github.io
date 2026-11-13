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

const stats = {}
const targets = process.argv.slice(2)
for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8')
  for (const m of txt.matchAll(/<word\s+text="([^"]+)"\s*\/>/g)) {
    const k = m[1]
    if (!stats[k]) stats[k] = { count: 0, files: new Set(), forms: new Set() }
    stats[k].count++
    stats[k].files.add(path.relative(root, f))
    stats[k].forms.add(m[0].replace(/text="[^"]+"/, 'text="X"'))
  }
}
for (const k of targets) {
  if (stats[k]) {
    console.log(
      `### ${k}  (${stats[k].count} occurrences, ${stats[k].files.size} files)`,
    )
    console.log('   forms: ' + [...stats[k].forms].join('  |  '))
    console.log('   files: ' + [...stats[k].files].join(', '))
  } else {
    console.log(`### ${k}  -> NOT FOUND`)
  }
}
