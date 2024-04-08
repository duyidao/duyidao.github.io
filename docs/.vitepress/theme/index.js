import DefaultTheme from 'vitepress/theme'
import './custom.less'
import compList from '../components/index'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        compList.forEach(value => {
            app.component(value.name, value.compoment);
        });
    }
}