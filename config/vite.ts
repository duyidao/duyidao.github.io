import { groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import { customIcon } from './vite/index';
import { 
  GitChangelog, 
  GitChangelogMarkdownSection, 
} from '@nolebase/vitepress-plugin-git-changelog/vite'

export default {
  publicDir: '../public',
  plugins: [
    groupIconVitePlugin({
      customIcon,
    }),
    GitChangelog({ 
      // 填写在此处填写您的仓库链接
      repoURL: () => 'https://github.com/duyidao/duyidao.github.io', 
    }), 
    GitChangelogMarkdownSection(),
  ],
}