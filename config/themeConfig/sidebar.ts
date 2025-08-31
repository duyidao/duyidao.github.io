import { idea, handle } from './sidebar/learn'
import { vue2, vue3, react } from './sidebar/frame'
import { shushuo, lingsi, baidu } from './sidebar/project'
import { css, js } from './sidebar/base'
import { chart, sharp, module } from './sidebar/advance'
import { myself, study } from './sidebar/practice'
import { vitepress, read } from './sidebar/foot'
import { about } from './sidebar/about'

export default {
  '/about/': about,
  '/baidu/': baidu,
  '/chart/': chart,
  '/css/': css,
  '/javascript/': js,
  '/learn/js/': idea,
  '/learn/vue/': idea,
  '/learn/promise/': idea,
  '/learn/optimize/': idea,
  '/learn/business/': handle,
  '/learn/element/': handle,
  '/learn/combat/': handle,
  '/learn/test/': handle,
  '/lingsi/': lingsi,
  '/module/': module,
  '/myself/': myself,
  '/react/': react,
  '/read/': read,
  '/sharp/': sharp,
  '/shushuo/': shushuo,
  '/study/': study,
  '/vitepress/': vitepress,
  '/vue/2/': vue2,
  '/vue/3/': vue3,
}
