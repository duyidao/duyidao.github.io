import { defineConfig } from 'vitepress'
import themeConfig from '../config/themeConfig'
import markdown from '../config/markdown'
import vite from '../config/vite'
import config from '../config/index'
import rewrites from '../config/rewrites'
import head from '../config/head'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...config,
  head,
  themeConfig,
  markdown,
  vite,
  rewrites,
})
