import path from 'path'

import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'

import { customIcon, iconifyOfflinePlugin } from './vite/index'
import { iconCssVars } from './icons/index'

import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'

export default {
  publicDir: '../public',
  server: {
    port: 8080,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },

  css: {
    preprocessorOptions: {
      less: {
        additionalData(source: string, filename: string) {
          if (!filename.replace(/\\/g, '/').endsWith('css/index.less')) {
            return source
          }
          return `${source}\n${iconCssVars}`
        },
      },
    },
  },

  plugins: [
    groupIconVitePlugin({
      customIcon,
    }),
    iconifyOfflinePlugin(),
    GitChangelog({
      // 填写在此处填写您的仓库链接
      repoURL: () => 'https://github.com/duyidao/duyidao.github.io',
    }),
    GitChangelogMarkdownSection(),
  ],
}
