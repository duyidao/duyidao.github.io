export function fenceLang(info: string): string {
  return (
    info
      .replace(/\[.*?\]/g, ' ')
      .replace(/\bactive\b/g, ' ')
      .trim()
      .split(/\s+/)[0] || ''
  )
}

export function isMermaidFence(info: string): boolean {
  const lang = fenceLang(info)
  return lang === 'mermaid' || lang === 'mmd'
}

export function isInsideCodeGroup(
  tokens: { type: string }[],
  idx: number,
): boolean {
  let depth = 0
  for (let i = idx - 1; i >= 0; i--) {
    const type = tokens[i].type
    if (type === 'container_code-group_close') depth++
    else if (type === 'container_code-group_open') {
      if (depth === 0) return true
      depth--
    }
  }
  return false
}

export function mermaidDomId(
  env: { relativePath?: string; path?: string },
  idx: number,
): string {
  const path = String(env?.relativePath || env?.path || 'md')
  let hash = 0
  for (let i = 0; i < path.length; i++) {
    hash = (Math.imul(31, hash) + path.charCodeAt(i)) | 0
  }
  return `cg-mermaid-${(hash >>> 0).toString(36)}-${idx}`
}
