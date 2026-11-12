import type { UserConfig } from 'vitepress'
import { homeIcons, homeBookPageRaw } from './icons'

const HOME_ICON_KEYS = [
  'dumbbell',
  'lightning',
  'timer',
  'bookPage',
  'bookOpen',
  'starFour',
] as const

export function homeIconsPlugin(): UserConfig {
  return {
    transformPageData(pageData) {
      if (pageData.relativePath !== 'index.md') return

      const hero = pageData.frontmatter.hero as any
      if (hero?.tagline === '__ICON_TAGLINE__') {
        hero.tagline = `${homeIcons.tagline}每天都要比昨天更有进步`
      }

      const features = pageData.frontmatter.features as any[]
      if (Array.isArray(features)) {
        for (const feature of features) {
          if (typeof feature.icon !== 'string') continue
          const key = feature.icon.replace(/^__ICON_/, '').replace(/__$/, '')
          if (key === 'bookPageRaw') {
            feature.icon = homeBookPageRaw
            continue
          }
          if ((HOME_ICON_KEYS as readonly string[]).includes(key)) {
            feature.icon = homeIcons[key as keyof typeof homeIcons]
          }
        }
      }
    },
  }
}
