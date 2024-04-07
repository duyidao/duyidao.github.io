import DefaultTheme from 'vitepress/theme'
import Link from '../components/pseudo/link.vue';
import Element from '../components/pseudo/element.vue';
import Input from '../components/pseudo/input.vue';
import Fucntion from '../components/pseudo/function.vue';
import Width from '../components/width/index.vue';
import Fit from '../components/fit/index.vue';
import Variable from '../components/variable/index.vue';
import LightEffect from '../components/lightEffect/index.vue';
import DropShadow from '../components/filter/drop-shadow.vue';
import Blur from '../components/filter/blur.vue';
import HueRotate from '../components/filter/hue-rotate.vue';
import Contrast from '../components/filter/contrast.vue';
import Grayscale from '../components/filter/grayscale.vue';
import Polygon from '../components/clipPath/polygon.vue';
import Polygons from '../components/clipPath/polygons.vue';
import Ellipse from '../components/clipPath/ellipse.vue';
import Inset from '../components/clipPath/inset.vue';
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
    {
        name: 'DropShadow',
        compoment: DropShadow
    },
    {
        name: 'Blur',
        compoment: Blur
    },
    {
        name: 'HueRotate',
        compoment: HueRotate
    },
    {
        name: 'Grayscale',
        compoment: Grayscale
    },
    {
        name: 'Contrast',
        compoment: Contrast
    },
    {
        name: 'Polygon',
        compoment: Polygon
    },
    {
        name: 'Polygons',
        compoment: Polygons
    },
    {
        name: 'Ellipse',
        compoment: Ellipse
    },
    {
        name: 'Inset',
        compoment: Inset
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