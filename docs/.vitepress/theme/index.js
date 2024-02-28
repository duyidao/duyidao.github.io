import DefaultTheme from 'vitepress/theme'
import MyComponent from '../components/MyComponent.vue';
import './custom.styl'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('MyComponent', MyComponent)
    }
}