import DefaultTheme from 'vitepress/theme'
import './custom.less'
import CssList from '../components/index'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        CssList.forEach(value => {
            app.component(value.name, value.compoment);
        });
    }
}