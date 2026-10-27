import fs from 'fs'
import path from 'path'
import { localIconLoader } from 'vitepress-plugin-group-icons'
import { iconToSVG } from '@iconify/utils'
import * as hugeicons from '@iconify-json/hugeicons'
import * as cib from '@iconify-json/cib'

// 读取 SVG 文件并返回一个对象，其中键是 SVG 文件的名称，值是 SVG 文件的路径
function getSvgs() {
  try {
    const svgDir = path.join(__dirname, '../../public/svg')
    const files = fs.readdirSync(svgDir)

    return files
      .filter((file) => file.endsWith('.svg'))
      .reduce((acc, file) => {
        const name = path.basename(file, '.svg')
        // 使用 GitHub Pages 兼容的绝对路径
        acc[name] = `/svg/${file}`
        return acc
      }, {})
  } catch (error) {
    console.error('读取 SVG 目录失败:', error)
    return {}
  }
}
const svgs = getSvgs()

// 插件只认以 <svg 开头的原始内容；iconfont 导出常带 <?xml / DOCTYPE，需裁掉
function toPluginSvg(raw: string) {
  const start = raw.indexOf('<svg')
  return start === -1 ? raw : raw.slice(start)
}

// 将 Iconify 图标转换为 SVG 字符串
function iconifyToSvg(collection: any, iconName: string): string {
  const iconSet = collection.icons
  const iconData = iconSet.icons[iconName]
  if (!iconData) {
    console.warn(`Icon ${iconName} not found in collection`)
    return ''
  }

  const fullData = {
    ...iconData,
    width: iconData.width ?? iconSet.width ?? 24,
    height: iconData.height ?? iconSet.height ?? 24,
  }

  const result = iconToSVG(fullData, {
    height: '1em',
    width: '1em',
  })

  const attrs = Object.entries(result.attributes)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ')

  return `<svg ${attrs} xmlns="http://www.w3.org/2000/svg">${result.body}</svg>`
}

// 定义需要使用的 Iconify 图标
const iconifyIcons = {
  泳道图: iconifyToSvg(hugeicons, 'workflow-square-06'),
  代码运行: iconifyToSvg(hugeicons, 'code-square'),
  时序图: iconifyToSvg(hugeicons, 'align-vertical-center'),
  less: iconifyToSvg(cib, 'less'),
}

export const customIcon = {
  ...Object.keys(svgs).reduce(
    (acc, key) => {
      acc[key] = toPluginSvg(
        localIconLoader(import.meta.url, '../../public' + svgs[key]),
      )
      return acc
    },
    {} as Record<string, string>,
  ),
  ...iconifyIcons,
}
