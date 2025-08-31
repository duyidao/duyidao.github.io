import fs from 'fs';
import path from 'path';
import { localIconLoader } from 'vitepress-plugin-group-icons';

// 读取 SVG 文件并返回一个对象，其中键是 SVG 文件的名称，值是 SVG 文件的路径
function getSvgs() {
  try {
    const svgDir = path.join(__dirname, '../../public/svg');
    const files = fs.readdirSync(svgDir);
    
    return files
      .filter(file => file.endsWith('.svg'))
      .reduce((acc, file) => {
        const name = path.basename(file, '.svg');
        // 使用 GitHub Pages 兼容的绝对路径
        acc[name] = `/svg/${file}`;
        return acc;
      }, {});
  } catch (error) {
    console.error('读取 SVG 目录失败:', error);
    return {};
  }
}
const svgs = getSvgs();

// 根据 SVG 文件的路径，返回一个对象，其中键是 SVG 文件的名称，值是一个函数，该函数返回 SVG 文件的内容
export const customIcon = Object.keys(svgs).reduce((acc, key) => {
  acc[key] = localIconLoader(import.meta.url, '../../public' + svgs[key]);
  return acc;
}, {});