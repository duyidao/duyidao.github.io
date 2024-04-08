import CssList from './css/index.js';
import JsList from './js/index.js';
import LearnList from './learn/index.js';
import Iframe from './Iframe.vue'

const list = [
    {
        name: 'Iframe',
        compoment: Iframe,
    }
]

const allList = [
    ...CssList,
    ...JsList,
    ...LearnList,
    ...list,
]

export default allList