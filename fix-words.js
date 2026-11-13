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

const rename = {
  JQuery: 'jQuery',
  Javascript: 'JavaScript',
  Typescript: 'TypeScript',
  base64: 'Base64',
  npm: 'NPM',
  'Vue Cli': 'Vue CLI',
  'Vue-cli': 'Vue CLI',
  'Vue-router': 'Vue Router',
  DMO: 'DOM',
  'Fetch API': 'Fetch',
  NodeJS: 'Node.js',
}

const toPlain = {
  BUG: 'BUG',
  Web: 'Web',
  'Node17.5.0': 'Node 17.5.0',
  'React15.5': 'React 15.5',
  'Vue 2.4': 'Vue 2.4',
  'Vue 3.5': 'Vue 3.5',
  'Vue2.x': 'Vue2.x',
  'Vue3.3': 'Vue3.3',
  'Vue 3 (Composition API)': 'Vue 3 (Composition API)',
  'PhantomJS【老牌，不维护】': 'PhantomJS（老牌，不维护）',
  'Puppeteer【推荐】': '<word text="Puppeteer" />（推荐）',
}

const toCode = {
  'index.html': 'index.html',
  'manifest.json': 'manifest.json',
  'vue.config.js': 'vue.config.js',
  'window.open': 'window.open',
  '@typescript-eslint/parser': '@typescript-eslint/parser',
  px: 'px',
  rem: 'rem',
}

function tagRe(key) {
  return new RegExp(
    '<word\\s+text="' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"\\s*/>',
    'g',
  )
}

const stats = {}
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
    for (const [k, v] of Object.entries(rename)) {
      const re = tagRe(k)
      if (re.test(l)) {
        const n = (l.match(tagRe(k)) || []).length
        stats['rename ' + k + ' -> ' + v] =
          (stats['rename ' + k + ' -> ' + v] || 0) + n
        l = l.replace(tagRe(k), '<word text="' + v + '" />')
        dirty = true
      }
    }
    for (const [k, v] of Object.entries(toPlain)) {
      const re = tagRe(k)
      if (re.test(l)) {
        const n = (l.match(tagRe(k)) || []).length
        stats['plain ' + k] = (stats['plain ' + k] || 0) + n
        l = l.replace(re, v)
        dirty = true
      }
    }
    for (const [k, v] of Object.entries(toCode)) {
      const re = tagRe(k)
      if (re.test(l)) {
        const n = (l.match(tagRe(k)) || []).length
        stats['code ' + k] = (stats['code ' + k] || 0) + n
        l = l.replace(re, '`' + v + '`')
        dirty = true
      }
    }
    return l
  })
  if (dirty) fs.writeFileSync(f, out.join('\n'), 'utf8')
}
console.log(JSON.stringify(stats, null, 2))
