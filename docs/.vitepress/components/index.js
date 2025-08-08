import Iframe from './iframe.vue';
import BlogLis from './lis.vue';
import SpecialWords from './specialWords.vue';
import ArticleMetadata from './meta.vue';

const list = [
  {
    name: 'Iframe',
    compoment: Iframe,
  },
  {
    name: 'BlogLis',
    compoment: BlogLis,
  },
  {
    name: 'SPW',
    compoment: SpecialWords,
  },
  {
    name: 'ArticleMetadata',
    compoment: ArticleMetadata,
  },
]

const install = (app) => {
  list.forEach(item => {
    app.component(item.name, item.compoment)
  })
}

export default install