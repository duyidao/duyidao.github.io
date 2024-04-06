import DefaultTheme from 'vitepress/theme'
import Link from '../components/pseudo/link.vue';
import Element from '../components/pseudo/element.vue';
import Input from '../components/pseudo/input.vue';
import Fucntion from '../components/pseudo/function.vue';
import Width from '../components/width/index.vue';
import Fit from '../components/fit/index.vue';
import Variable from '../components/variable/index.vue';
import LightEffect from '../components/lightEffect/index.vue';
import './custom.less'

const list = [
    {
        name: 'Link',
        compoment: Link
    },
    {
        name: 'Input',
        compoment: Input
    },
    {
        name: 'Element',
        compoment: Element
    },
    {
        name: 'Fucntion',
        compoment: Fucntion
    },
    {
        name: 'Width',
        compoment: Width
    },
    {
        name: 'Fit',
        compoment: Fit
    },
    {
        name: 'Variable',
        compoment: Variable
    },
    {
        name: 'LightEffect',
        compoment: LightEffect
    },
]

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        list.forEach(value => {
            app.component(value.name, value.compoment);
        });
    }
}