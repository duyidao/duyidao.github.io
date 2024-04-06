import DefaultTheme from 'vitepress/theme'
import Link from '../components/pseudo/link.vue';
import Element from '../components/pseudo/element.vue';
import Input from '../components/pseudo/input.vue';
import Fucntion from '../components/pseudo/function.vue';
import './custom.less'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('Link', Link);
        app.component('Element', Element);
        app.component('Input', Input);
        app.component('Fucntion', Fucntion);
    }
}