import DefaultTheme from 'vitepress/theme'
import MyComponent from '../components/MyComponent.vue';
import Link from '../components/pseudo/link.vue';
import './custom.less'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('MyComponent', MyComponent);
        app.component('Link', Link);
    }
}