// @ts-ignore Node.js typings may not be included by this project's tsconfig.
import fs from 'fs'
// @ts-ignore Node.js typings may not be included by this project's tsconfig.
import path from 'path'
// @ts-ignore Node.js typings may not be included by this project's tsconfig.
import { fileURLToPath } from 'url'
import { localIconLoader } from 'vitepress-plugin-group-icons'
import { iconToSVG, getIcons } from '@iconify/utils'
import * as hugeicons from '@iconify-json/hugeicons'
import * as cib from '@iconify-json/cib'
import * as iconParkSolid from '@iconify-json/icon-park-solid'

// 读取 SVG 文件并返回一个对象，其中键是 SVG 文件的名称，值是 SVG 文件的路径
interface SvgMap {
  [name: string]: string
}

function getSvgs(): SvgMap {
  try {
    const svgDir = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      '../../public/svg',
    )
    const files: string[] = fs.readdirSync(svgDir)

    return files
      .filter((file) => file.endsWith('.svg'))
      .reduce<SvgMap>((acc, file: string) => {
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

// 运行时 <icon> 组件实际引用的图标，仅裁剪这几个，避免全量图标集进入客户端产物
const runtimeIconNames = ['people', 'file-code', 'time', 'update-rotation']

const VIRTUAL_ICON_ID = 'virtual:iconify-offline'
const RESOLVED_VIRTUAL_ICON_ID = '\0' + VIRTUAL_ICON_ID

// 构建期裁剪 icon-park-solid，仅向客户端注入用到的图标
export function iconifyOfflinePlugin() {
  return {
    name: 'iconify-offline',
    resolveId(id: string) {
      return id === VIRTUAL_ICON_ID ? RESOLVED_VIRTUAL_ICON_ID : null
    },
    load(id: string) {
      if (id !== RESOLVED_VIRTUAL_ICON_ID) return null

      const data = getIcons(iconParkSolid.icons, runtimeIconNames)
      if (!data) {
        console.warn(
          `[iconify] 以下图标在 icon-park-solid 中不存在: ${runtimeIconNames.join(', ')}`,
        )
        return `export default ${JSON.stringify({
          prefix: 'icon-park-solid',
          icons: {},
        })}`
      }

      return `export default ${JSON.stringify(data)}`
    },
  }
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
