const fs = require('fs')
const lines = fs.readFileSync('spaces.txt', 'utf8').split('\n').filter(Boolean)
const keep = []
for (const l of lines) {
  const [side, ch, loc] = l.split('\t')
  if (side === 'B') {
    if (
      ch === '"|"' ||
      ch === '"-"' ||
      ch === '"."' ||
      ch === '"#"' ||
      ch === '">"' ||
      ch === '"+"'
    )
      continue
  } else {
    if (ch === '"|"' || ch === '" "') continue
  }
  keep.push(l)
}
console.log('non-structural count', keep.length)
console.log(keep.join('\n'))
