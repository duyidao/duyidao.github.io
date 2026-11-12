import * as mdi from '@iconify-json/mdi'

const mdiSet = mdi.icons as unknown as IconifyCollection

interface IconifyCollection {
  prefix?: string
  width?: number
  height?: number
  icons: Record<string, { body: string; width?: number; height?: number }>
  aliases?: Record<string, { parent: string }>
}

function resolveIcon(collection: IconifyCollection, name: string) {
  const data = collection.icons[name]
  if (data) return data

  const alias = collection.aliases?.[name]
  if (alias) return collection.icons[alias.parent]

  console.warn(`[iconify] 未找到图标: ${collection.prefix}:${name}`)
  return null
}

function encodeSvg(svg: string): string {
  return svg
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\s+/g, ' ')
}

export function iconSvg(
  collection: IconifyCollection,
  name: string,
  size = '1em',
  style?: string,
): string {
  const data = resolveIcon(collection, name)
  if (!data) return ''

  const width = data.width ?? collection.width ?? 24
  const height = data.height ?? collection.height ?? 24
  const styleAttr = style ? ` style="${style}"` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${size}" height="${size}"${styleAttr}>${data.body}</svg>`
}

// mdi 中没有精确对应的图标，沿用原始路径，避免视觉差异
export function rawIconSvg(path: string, size: string, style?: string): string {
  const styleAttr = style ? ` style="${style}"` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}"${styleAttr}><path fill="currentColor" d="${path}"/></svg>`
}

export function iconCssUrl(
  collection: IconifyCollection,
  name: string,
  options: { size?: number | null; fill?: string } = {},
): string {
  const { size = 24, fill = '#000' } = options
  const data = resolveIcon(collection, name)
  if (!data) return 'none'

  const width = data.width ?? collection.width ?? 24
  const height = data.height ?? collection.height ?? 24
  const dimension = size === null ? '' : ` width="${size}" height="${size}"`
  const body = data.body.replace(/currentColor/g, fill)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"${dimension} viewBox="0 0 ${width} ${height}">${body}</svg>`

  return `url("data:image/svg+xml,${encodeSvg(svg)}")`
}

export const navIcons = {
  sword: iconCssUrl(mdiSet, 'sword-cross'),
  arrowUp: iconCssUrl(mdiSet, 'arrow-up'),
  book: iconCssUrl(mdiSet, 'book-open-variant'),
  briefcase: iconCssUrl(mdiSet, 'briefcase'),
  outline: iconCssUrl(mdiSet, 'format-list-bulleted'),
}

export const blockIcons = {
  info: iconCssUrl(mdiSet, 'information-outline'),
  note: iconCssUrl(mdiSet, 'note-text-outline'),
  tip: iconCssUrl(mdiSet, 'lightbulb-on-outline'),
  warning: iconCssUrl(mdiSet, 'alert-outline'),
  danger: iconCssUrl(mdiSet, 'alert-octagon-outline'),
  important: iconCssUrl(mdiSet, 'star-four-points-outline'),
  caution: iconCssUrl(mdiSet, 'alert-circle-outline'),
}

export const quoteIcon = iconCssUrl(mdiSet, 'format-quote-open', {
  size: null,
  fill: 'currentColor',
})

const NAV_ICON_STYLE =
  'display:inline-block;vertical-align:-0.15em;margin-right:6px'

export const navMenuIcons = {
  laptop: iconSvg(mdiSet, 'laptop', '1em', NAV_ICON_STYLE),
  harddisk: iconSvg(mdiSet, 'harddisk', '1em', NAV_ICON_STYLE),
  footPrint: iconSvg(mdiSet, 'foot-print', '1em', NAV_ICON_STYLE),
  star: iconSvg(mdiSet, 'star', '1em', NAV_ICON_STYLE),
  cube: iconSvg(mdiSet, 'cube-outline', '1em', NAV_ICON_STYLE),
  bookOpen: iconSvg(mdiSet, 'book-open-outline', '1em', NAV_ICON_STYLE),
}

const HOME_ICON_STYLE = 'vertical-align:-0.22em;margin-right:6px'

export const homeIcons = {
  tagline: iconSvg(mdiSet, 'dumbbell', '20', HOME_ICON_STYLE),
  lightning: iconSvg(mdiSet, 'lightning-bolt', '26'),
  timer: iconSvg(mdiSet, 'timer-sand', '26'),
  bookPage: iconSvg(mdiSet, 'book-open-page-variant', '26'),
  bookOpen: iconSvg(mdiSet, 'book-open-outline', '26'),
  starFour: iconSvg(mdiSet, 'star-four-points', '26'),
}

// 首页“学习之旅”图标：mdi 无精确对应项，保留原始裁剪路径
export const homeBookPageRaw = rawIconSvg(
  'M6.5 5C4.55 5 2.45 5.4 1 6.5v14.66c0 .25.25.5.5.5c.1 0 .15-.07.25-.07c1.35-.65 3.3-1.09 4.75-1.09c1.95 0 4.05.4 5.5 1.5c1.35-.85 3.8-1.5 5.5-1.5c1.65 0 3.35.31 4.75 1.06c.1.05.15.03.25.03c.25 0 .5-.25.5-.5V6.5c-.6-.45-1.25-.75-2-1V19c-1.1-.35-2.3-.5-3.5-.5c-1.7 0-4.15.65-5.5 1.5V6.5C10.55 5.4 8.45 5 6.5 5',
  '26',
)

export const iconCssVars = `
:root {
  --nav-icon-sword: ${navIcons.sword};
  --nav-icon-arrow-up: ${navIcons.arrowUp};
  --nav-icon-book: ${navIcons.book};
  --nav-icon-briefcase: ${navIcons.briefcase};
  --nav-icon-outline: ${navIcons.outline};
  --icon-info: ${blockIcons.info};
  --icon-note: ${blockIcons.note};
  --icon-tip: ${blockIcons.tip};
  --icon-warning: ${blockIcons.warning};
  --icon-danger: ${blockIcons.danger};
  --icon-important: ${blockIcons.important};
  --icon-caution: ${blockIcons.caution};
  --custom-quote-icon: ${quoteIcon};
}
`
