import CssList from './css/index.js';
import JsList from './js/index.js';
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
    ...list,
]

export default allList