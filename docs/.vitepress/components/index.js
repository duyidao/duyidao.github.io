import LearnList from './learn/index.js';
import Iframe from './Iframe.vue'

const list = [
    {
        name: 'Iframe',
        compoment: Iframe,
    }
]

const allList = [
    ...LearnList,
    ...list,
]

export default allList