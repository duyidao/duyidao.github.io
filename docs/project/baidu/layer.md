# 图层

本模块主要从规范、地图 API 的使用、样式、封装等角度入手，记录大厂多人开发的学习与感悟。

## 项目结构

项目结构主要如下：

```js
|-examples // 图层的根组件
	|--App.vue // 整个图层的根组件
	|--views // 每个图层的根组件
|-publib // 存放公共资源
	|--assets
  	|--images // 图片
    |--css // 样式
		|--modules // 模型数据
|-src
	|--assets // 图片资源
	|--conpoments // 组件（公共部分与各自图层）
	|--router // 路由
	|--store // 多组件使用的方法与变量
	|--utils // 公共方法封装
|-script // 打包设置与简写设置
|-.env.development // 开发环境的配置
|-.env.release // 生产环境打包的配置
|-index.html // 主页面
|-vite.config.js // 文件夹路径简写和跨域代理
```

本项目是一个项目包含多个图层，每个图层使用到的方法会有相同的地方，但也会有各自不同的方法。因此需要做封装处理，封装时也需要考虑到易用性、复用性和可拓展性。

## 样式

项目中样式文件总共分为几类：

- 初始化基准样式
- 公共组件样式
- 第三方组件库调整样式
- ......

下面分别对他们的封装做粗略的谈论。

### 基准样式

顾名思义，就是在项目最开始初始化时处理的样式，一般都是把 HTML 标签的默认样式（如内外边距、边框等）清除；媒体查询设置元素的响应式宽高；字体样式的引入；或者定义一些公共类名样式等。例如：

- 清除样式

  ```css
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
      margin: 0;
      padding: 0;
      border: 0;
      font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial,
          sans-serif, 'FZLTZHJW--GB1-0';
      vertical-align: baseline;
      box-sizing: border-box;
  }
  ```

- 媒体查询样式

  ```css
  @media screen and (max-width: 1441px) {
      html {
          font-size: 66px;
      }
  }
  
  @media screen and (min-width: 1440px) and (max-width: 1921px) {
      html {
          font-size: 75px;
      }
  }
  ```

- 公共类名样式

  ```css
  .scroll {
      ::-webkit-scrollbar {
          /* 滚动条整体样式 */
          width: 4px;
          /* 高宽分别对应横竖滚动条的尺寸 */
          height: 1px;
      }
  
      ::-webkit-scrollbar-thumb {
          /* 滚动条里面小方块 */
          border-radius: 4px;
          background: #214495c7;
          background-clip: content-box;
          border: 0px solid transparent;
      }
  
      ::-webkit-scrollbar-track {
          /* 滚动条里面轨道 */
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          background: rgba(181, 183, 189, 0.831);
      }
  }
  
  /* 除了设置show-scroll的盒子，其他盒子都不显示滚动条 */
  *:not(.show-scroll, .show-scroll > *)::-webkit-scrollbar {
      //chrome 和Safari，电脑端微信浏览器
      width: 0 !important;
      height: 0 !important;
  }
  ```

- 字体样式设置

  ```css
  @font-face {
      font-family: 'black';
      src: url('../fonts/black.ttf');
  }
  ```

  后续在项目中都可以通过 `font-family` 设置字体样式。

  > 注意
  >
  > 为了避免中文问题，字体设置尽可能使用英文，在项目中最开始使用了中文，导致本地环境没问题，打包部署后字体失效，出现问题。

- 引入其他样式文件

  最后引入其他设置的样式文件，如下文中的第三方组件库样式和公共组件样式等。

### 第三方组件库样式

本项目采用的是第三方组件库 `element-ui` ，为了适配 UI 设计规范，因此需要对组件的边框、背景色等做一系列的处理，如下所示：

```less
@fontColor: #EFFFFF;
@borderRadius: 2px;
@background: linear-gradient(-66.16deg, rgba(34, 120, 105, 0.58) 8.087%,rgba(15, 103, 74, 0.62) 93.804%);

.bordered {
    border-right: 1.5px solid;
    border-image: linear-gradient(180deg, #379084 0%, #5cf4c3 99%) 1.5 1.5 1.5 1.5;
}

.el-input__inner {
    background: @background;
    border-radius: @borderRadius;
    font-size: 14px;
    color: @fontColor;

    &::placeholder {
        font-size: 12px;
    }

    .bordered();
}
```

设置了样式变量后在需要调整的类名上引用即可。

### 公共组件样式

公共组件样式根据每个组件的不同设置对应的样式，不做过多赘述。

## 规范

多人合作开发的项目，如果不设置规范，会出现每个人的风格不一样，一改动则把其他人的风格给改了，提交代码时不明确本地改动改到了啥。设置规范也是为了确保多人合作开发的顺利。

规范设置范围很广泛，从文件夹规范到代码风格规范等，都需要有一个统一。

### 文件夹规范

前面已经介绍过了项目大体文件夹的位置与作用，由于该项目是一个项目结构包含多个图层，因此在开发时，保持文件夹结构一致也方便他人的排查和项目后续的维护。

项目文件夹规范如下：

1. 在 `examples` 文件夹中设置当前图层的一级路由组件，该组件用于引入地图组件和本图层的组件。

2. 在 `src/components/Common` 文件夹中设置公共组件，如地图组件；在 `src/components/Layer` 文件夹中设置各个图层的组件。

3. 公共资源、方法都放到 `src` 文件夹下的对应位置，图层各自用到的则放到每个图层文件夹内，其中分工如下：

   - `assets` 存放静态资源（如图片、字体等）
   - `components` 存放当前图层的组件
   - `store` 存放多组件使用的变量和事件函数
   - `utils` 存放当前图层公共方法
   - `config` 存放当前图层的枚举和字典

4. 定义图层的路由，在 `router` 文件夹下

5. 定义图层路由的简写形式，分为两个步骤：

   - 在 `script` 文件夹下新建一个 `common.js` 文件，创建一个对象，键名为简写形式，键值为全全路径

     ```js
     export const aliasMap = {
         '@TestLayer': './src/xxx/TestLayer',
     };
     ```

   - 在 `vite.cinfig.js` 文件中配置简写路径

     ```js
     import {aliasMap} from './scripts/common.js';
     
     export default defineConfig(({mode}) => {
         return {
             resolve: {
                 alias: {
                     '@Test': fileURLToPath(new URL(aliasMap('@TestLayer'), import.meta.url)),
             },
         };
     });
     ```

### 代码风格规范

代码风格主要表现在是否使用逗号、分号；每行代码长度；箭头函数只有一个参数时是否需要加括号等。

代码风格设置方法为安装依赖和插件 `Eslint` 和 `Stylelint` 。然后在 VScode 的设置 `setting.json` 中配置保存格式化，如下所示：

```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"eslint.validate": [  
    "javascript",
    "javascriptreact",
    "html",
    "vue"
],
```

后续保存代码后他会自动格式化。

> 注意
>
> 如果安装了 `prettier` 等扩展，需要禁用。

## 封装

多人合作开发中，往往会出现同一个组件、方法或样式多人需要使用，因此为了方便统一管理，也方便后续维护，封装是重要的步骤。

封装不能盲目的封装，要考虑使用的组件方法频率是否高，或者该封装的组件方法是否需要统一的维护。且封装的时候需要考虑到易用性、复用性和可拓展性。

下面从组件和方法两个层面来描述一下封装。

### 组件

组件封装中我封装了图层顶部组件封装，并对视频流组件的源码做了二次封装。

#### 图层顶部组件

图层顶部组件最终效果如下图所示：

![顶部组件效果](https://pic.imgdb.cn/item/65893e34c458853aefb7bd3a.jpg)

该组件分为两个组件：标题部分和二级机构与高速路下拉选择部分。

先看标题部分，主要在于右方的时间模块。获取年月日时分秒可以通过 `new Date()` 获取，利用定时器每秒获取一次实时时间。但是由于定时器是宏任务，需要等待同步任务和微任务都执行完毕才能执行，会出现时机上的不对，因此在实现该功能时目光放到了 `@vueuse/core` 。

其中 `useIntervalFn` 是Vue 3生态系统工具集 `@vueuse/core` 提供的一个自定义 `hook` ，用于在一定时间间隔内执行指定的函数。

该 `hook` 的语法为：

```js
useIntervalFn(fn: () => void, interval: number | Ref<number>, { immediate = true } = {}): { start: Fn, stop: Fn, isActive: Ref<boolean> }
```

其中，fn是需要执行的函数，interval是时间间隔，可以是一个数字或者一个ref对象，immediate为可选项，默认为true，表示是否在初始化时立即执行函数。

`useIntervalFn` 返回一个对象，包含了 `start` 、`stop` 和 `isActive` 三个属性。`start` 是一个函数，用于启动计时器并开始执行函数；`stop` 是一个函数，用于停止计时器和函数执行；`isActive` 是一个 `ref` 对象，表示当前计时器是否处于活动状态。

使用 `useIntervalFn` 非常简单，只需要传入需要执行的函数和时间间隔即可。以本案例为例，代码如下：

```js
import { useIntervalFn } from '@vueuse/core'

export default {
  setup() {
     let dateNow = ref('');
     let dateFormat = ref('');
     let dateTime = ref('');

     const updateTime = (date = new Date()) => {
         dateNow.value = date.toISOString().split('T')[0];
         dateFormat.value = date.toLocaleString('zh-CN', {weekday: 'long'});
         dateTime.value
             = date.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
     };

     const {pause} = useIntervalFn(
         () => updateTime(),
         1000,
         {
             immediateCallback: true,
             immediate: true,
         }
     );

     onUnmounted(() => {
         pause?.();
     });
  }
}
```

其下方的组织机构下拉选择卡片可抽离出来单独封装为一个组件，在父组件通过插槽引用到需要的地方。组件效果如下所示：

![效果](https://pic.imgdb.cn/item/658bc569c458853aefb8b994.jpg)

在封装的时候需要考虑到易用性、复用性和可拓展性，逻辑点梳理如下：

- 左右两侧的数据通过接口获取，接口通过父子组件传参的形式，可以自定义想要调用的接口获取到自己想要的数据，并给定一个默认接口。且考虑到接口参数字段未必会统一，可以也通过父组件传参的方式指定获取哪个字段的值
- 点击左侧二级机构切换右侧高速路的数组数据，上方的名称也要切换。此时赋值二级机构选中项，置空高速路选择项数据。默认渲染第一个二级机构下的高速路
- 点击右侧高速路则进入微观二维视角，对应高速路高亮显示，其中：
  - 如果用户没点二级机构而是直接点了高速路，则说明点的是第一个二级机构下的，手动赋值第一个二级机构为激活项
  - 高速路的选择允许单选和多选，通过父组件传参来规定。为了统一，让高速路选择项类型为数组，如果是单选，直接空数组 `push` 即可；如果是多选，则判断是添加 `push` 还是取消 `filter` 
- 搜索出来的结果根据其是二级机构还是高速路动态调用不同的函数

代码如下所示：

```js
// 点击刷新按钮
handleRefreshFn() {
    this.mesoActive = '';
    this.mesoData = {};
    this.microActive = [];
    this.microDataList = [];
    this.setRelationRoadById({orgId: this.relationOption[0].orgId});
    this.$emit('handleRefresh');
},
// 点击左侧桥路切换右侧高速
mesoChoseFn(e) {
    // 保存二级机构数据
    this.mesoActive = e.orgId;
    this.mesoData = e;
    // 清空高速路数据
    this.microActive = [];
    this.microDataList = [];
    this.setRelationRoadById({orgId: e.orgId});
    this.$emit('mesoChoseFn', e, [this.mesoActive], [this.mesoData]);
},
// 点击右侧具体的高速、桥获取微观二维结构物数据和告警结构物数据
microChoseFn(e, searchType = false) {
    // 如果直接点击高速路，则把第一个二级机构数据保存
    if (!searchType) {
        if (!this.mesoActive) {
            this.mesoActive = this.relationOption[0].orgId;
            this.mesoData = this.relationOption[0];
        }
    }
    else {
        this.mesoActive = e.orgId;
        this.mesoData = e;
    }

    // 是否允许其多选
    if (this.microCheck) {
        // 点击重复数据
        if (this.microActive.includes(e.sectionId)) {
            this.microActive = this.microActive.filter(item => item !== e.sectionId);
            this.microDataList = this.microDataList.filter(item => item.sectionId !== e.sectionId);
        }
        // 点击新数据
        else {
            this.microActive.push(e.sectionId);
            this.microDataList.push(e);
        }
    }
    else {
        // 后续优化
        this.microActive = [];
        this.microDataList = [];
        this.microActive.push(e.sectionId);
        this.microDataList.push(e);
    }

    this.$emit(
        'microChoseFn',
        e,
        [this.mesoActive, this.microCheck ? this.microActive : this.microActive.join('')],
        [this.mesoData, this.microCheck ? this.microDataList : this.microDataList[0]]
    );
},
// 点击搜索的选项
choseSearchBackFn(e) {
    if (e.orgSectionTpye === 0) {
        // orgSectionTpye为0，表示搜索到的是二级机构，直接调用二级机构点击事件
        this.mesoChoseFn(e);
        this.showSelectBack = false;
    }
    else {
        // orgSectionTpye为1，表示搜索到的是高速路，渲染右侧高速列表；二级机构和高速激活项保存
        this.microChoseFn(e);
        this.setRelationRoadById({orgId: e.orgId});
    }
    this.$emit('choseSearchBackFn', e);
},
```

在代码实现过程，需要考虑父组件点击扎点子组件也能激活对应的激活项和更换城市名称。因此城市名称变量写在点击事件内切换是不够满足需求的，我的解决方法为：

1. 父子传参相关 `key` 值
2. 在侦听器 `watch` 中侦听传进来的 `key` 值，如果为 `null` 或 `undefined` ，则把相关数据清空；反之则通过 `find` 或 `filter` 过滤出需要的数据
3. 城市名称则在计算属性中统一获取，如果有高速路数据，说明此时是微观二维，遍历数组获取每一项的高速名称；否则判断二级机构对象是否是空对象，不是空对象说明当前是中观层级，显示二级机构名称；都不是最后才显示默认值

```js
watch: {
    mesoKey(newVal) {
        // 如果为null，则把数据都滞空
        if (!newVal) {
            this.mesoActive = '';
            this.mesoData = {};
        }
        else {
            this.mesoActive = newVal;
            this.mesoData = this.relationOption.find(item => item.orgId === newVal);
            this.setRelationRoadById({orgId: newVal});
        }
    },
    microKey(newVal) {
        // 如果为null，则把数组都滞空
        if (!newVal) {
            this.microActive = [];
            this.microDataList = [];
        }
        else if (typeof newVal === 'string') {
            this.microActive = [];
            this.microActive.push(newVal);
            this.microDataList = this.relationRoad.filter(item => item.sectionId === newVal);
        }
        else {
            this.microActive = [...newVal];
            this.microDataList = this.relationRoad.filter(item => newVal.includes(item.sectionId));
        }
    },
},
computed: {
    // 被选中的二级机构或高速路名称
    cityName() {
        // 如果为空名称恢复为二级机构；不为空则显示高速路
        if (this.microDataList.length > 0) return this.microDataList.map(e => e.sectionName).join('、');
        else if (this.mesoData?.orgName) return this.mesoData.orgName;
        return '广东省交通集团';
    },
},
```

#### 视频流组件

由于客户侧的视频都是 `wss` 和 `flv` 流，因此视频流组件是使用了客户侧提供的视频流组件。但是在使用时因各种原因导致依赖报错，因此基于他们的源码做了二次封装和开发。

在阅读他们的源码时，发现他们的代码主要是引用了阿里云播放器 SDK 实现播放，主要逻辑为：

1. 保存他们的视频流组件相关样式、组件、事件等配置文件到项目中，在 `index.html` 中通过 `script` 和 `link` 引入
2. 注册阿里云播放器 SDK 组件
3. 从父组件接收数据，调用接口获取视频的流地址
4. 调用播放器的播放功能

一开始封装的时候能够实现效果，到后面本部同事打包后失败，和我说了一下需要改为动态引入的形式，后续所有静态文件都不能在 `index.html` 中引入，改为动态引入。

现在需要考虑的问题是，客户提供的播放器组件放到了 `playercomponents.min.js` 文件中，只有引入了该文件，才能使用对应的组件。因此在执行时机和顺序需要注意先引入文件后调用组件。

动态引入方式为：

1. 创建标签 `script` 和 `link` 
2. 判断曾经是否有缓存的记录或者当前缓存状态是否成功，如果曾经已经缓存过或者当前缓存中、缓存成功，则返回不继续执行
3. 获取到当前环境的路径，调用接口的形式获取文件资源并立即执行
4. 保存缓存记录，且如果接口调用成功，则把缓存状态改为 `fulfilled` ；接口调用失败，缓存状态改为 `rejected` ；接口调用中，缓存状态改为 `padding` 
5. 样式文件则动态保存到 `head` 标签上

代码示例如下所示：

```js
// 动态判断获取文件路径的前缀
const publicPath = () => {
    return FileHost.value || window.location.origin;
};
// 获取资源文件服务器的路径
const f = () => Promise.all(
    [
        request.get(`${publicPath()}/xxx1/yyy/zzz.js`),
        request.get(`${publicPath()}/xxx2/yyy/playercomponents.min.js`),
    ]
);
let UnloadState = '';

const getStaticUrl = () => {
    // 动态引入静态js资源
    const staticCache = window.ApaasMaplayerVideoPlayerStatic;
    const loadJs = async () => {
        // 如果有缓存记录，则不再下载
        if (staticCache && staticCache?.js) return;
        // 如果当前正在下载或下载成功，也不下载
        if (globalState && globalState !== 'rejected') return;
        f().then(res => {
            // 动态地执行从请求返回的脚本
            res.forEach(item => {
                new Function(item)();
            });
          
            // 缓存了，做个记录
            window.ApaasMaplayerVideoPlayerStatic = {
                ...(window.ApaasMaplayerVideoPlayerStatic || {}),
                js: true,
            };
            this.staticLoaded.js = true;
            // 状态变为成功状态
            UnloadState = 'fulfilled';
        }).catch(e => {
            // 状态变为失败状态
            UnloadState = 'rejected';
        });
        // 状态变为正在缓存状态
        UnloadState = 'pending';
    };
    loadJs();

    // 动态引入css样式资源
    const loadStyles = url => {
        if (staticCache && staticCache?.css) {
            return;
        }
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(link);
        window.ApaasMaplayerVideoPlayerStatic = {
            ...(window.ApaasMaplayerVideoPlayerStatic || {}),
            css: true,
        };
        this.staticLoaded.css = true;
    };
    loadStyles('maplayer/assets/css/video-player.css');
}
getStaticUrl();
```

下面关于 `res.forEach(item => { new Function(item)(); });` 这段代码做详细解读。

> 在这段代码中，`res.forEach(item => { new Function(item)(); });` 的作用是动态地执行从请求返回的脚本。其中：
>
> 1. `res.forEach(item => { new Function(item)(); })`：这一行代码使用了 `forEach` 方法遍历 `res` 数组中的每个元素，并对每个元素执行一个新创建的函数。在这里，`new Function(item)` 创建了一个新的函数对象，然后立即执行这个函数，相当于动态地执行了从请求返回的脚本内容。
> 2. `new Function(item)`：这里使用了 JavaScript 中的 `Function` 构造函数，它允许你在运行时动态创建并编译函数。传入的参数 `item` 应该是一个包含有效 JavaScript 代码的字符串，`new Function(item)` 将会将这段代码编译成一个可执行的函数对象。
>
> 所以，整体来说，这段代码的目的是从请求返回的脚本字符串中动态地创建函数并立即执行，这样就可以动态地加载并执行从服务器端获取的脚本内容。

### 方法

项目中方法的封装首当其冲都是 `axios` 二次封装。关于二次封装，主要封装其基准路径、超时时间、拦截器等。请求拦截器主要是请求头设置；响应拦截器主要是判断接口响应状态并做对应的处理。

在请求时添加一个 `loading` 效果，请求成功后再取消掉。响应失败时还需要弹出相应的提示。拦截器除了直接写，也可以通过对象的形式添加，这样也能对应功能单独设置。

```js
// 响应拦截 - 处理异常
export const commonErrorHandler = {
    // 拦截业务异常响应
    onFulfilled: (response) => {
        const { data, config } = response;
        if (+data.code !== 200) {
            const errorCode = +data.code;
            const errorInfo = data.message || data.msg;
            // 除非传入 noErrorHint 参数，否则都会进行错误提示
            const noErrorHint = config.extraInfo && config.extraInfo.noErrorHint;
            console.log(errorInfo, noErrorHint)
            if (!noErrorHint && errorInfo !== 'ok') {
                console.log('tip1');
                hintNetError(errorCode, errorInfo);
            }
            // 登录状态异常
            if (LOGOUT_CODE.includes(errorCode)) {
                exceptionLogout(errorCode, response);
            }
        }
        return Promise.resolve(response);
    },
    // 拦截网络异常响应，进行提示
    onRejected(err) {
        const noErrorHint = err.config && err.config.extraInfo && err.config.extraInfo.noErrorHint;
        const response = err && err.response ? err.response : {};
        const message = err && err.message ? err.message : '';
        // 超时提示
        if (!noErrorHint) {
            if (message && message.includes('timeout')) {
                hintNetError(1001);
            } else {
                hintNetError(+response.status);
            }
        }
        // 登录状态异常
        if (LOGOUT_CODE.includes(+response.status)) {
            exceptionLogout(+response.status, response);
        }
        return Promise.reject(response);
    }
};

axiosInstance.interceptors.response.use(commonErrorHandler.onFulfilled, commonErrorHandler.onRejected);
```

## MapVThree

百度地图官方文档指路：[Mapvthree开发文档 (baidu.com)](https://lbsyun.baidu.com/solutions/mapvthreedoc) 。地图方法每个图层都要使用，因此统一封装成公共方法，通过传值的形式设置不同的属性。下面从方法封装、使用入手。

### 地图方法封装

地图方法挑基础的点、线、模型和我负责封装的视野漫游动画详细聊聊。

#### 点

根据官方文档，渲染点需要做到以下几步：

1. 引入 `Icon` 方法和 `GeoJSONDataSource` 方法，前者用于创建点，后者用于把传入的数据转换为渲染点需要的数据源

2. 在渲染好的地图上通过调用地图实例的 `add()` 方法添加点，并传参宽度、高度、偏移量等参数

3. 调用 `GeoJSONDataSource` 方法获取数据源，入参可通过 f12 打开网络控制台查看，如下图：

   ![参数示例](https://pic.imgdb.cn/item/658a4fe0c458853aef328e82.jpg)

   只有坐标 `coordinates` 、图标图片路径 `icon` 和尺寸大小 `size` 是自定义的，其余复制粘贴即可。

4. 返回创建好的点和该地图实例

5. 创建一个删除点的方法，调用地图实例的 `remove()` 方法实现删除

代码如下所示：

```js
// 添加icon
export const addIcon = (coordinates, url, info) => {
    coordinates = [coordinates?.[0], coordinates?.[1], coordinates?.[2] || 0];
    const {
      	width = 92,
        height = 118,
        offset = [0, -50],
        geoData = [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': coordinates,
                },
                'properties': {
                    'icon': url,
                    'size': 40,
                },
            },
        ],
        _engine = engine.value,
    } = info || {};

    const icon = _engine.add(new Icon({
        width,
        height,
        vertexSizes: true,
        vertexIcons: true,
        transparent: true,
        offset,
        depthTest: false, // 深度检测
    }));
    GeoJSONDataSource.fromGeoJSON(geoData).then(data => {
        data.setAttribute('size').setAttribute('icon');
        icon.dataSource = data;
    });

    return {
        icon,
        _engine,
    };
};

// 删除icon
export const removeIcon = (icon, _engine = engine.value) => {
    icon && _engine.remove(icon);
};
```

#### 线

根据官方文档，渲染线需要做到以下几步：

1. 引入 `FatLine` 方法和 `GeoJSONDataSource` 方法，前者用于创建线，后者用于把传入的数据转换为渲染线需要的数据源

2. 在渲染好的地图上通过调用地图实例的 `add()` 方法添加点，并传参线宽、线的颜色、线的坐标等参数

3. 调用 `GeoJSONDataSource` 方法获取数据源，入参可通过 f12 打开网络控制台查看，如下图：

   ![参数示例](https://pic.imgdb.cn/item/658a8c44c458853aef1cd007.jpg)

   只有坐标二维数组 `coordinates` 、线的颜色 `color` 是自定义的，其余复制粘贴即可。

4. 返回创建好的线和该地图实例

5. 创建一个删除线的方法，调用地图实例的 `remove()` 方法实现删除

代码如下所示：

```js
// 添加线
export const addLine = (coordinates, info, _engine, callback) => {
    if (!_engine) _engine = engine.value;
    const {lineWidth, color, opacity} = info || {};
    const line = _engine.add(new FatLine({
        vertexColors: true,
        lineWidth,
        opacity,
        keepSize: true,
        lineJoin: 'round',
    }));
    const geojson = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates,
        },
        properties: {
            color: color,
        },
    };
    GeoJSONDataSource.fromGeoJSON(geojson).then(geoData => {
        geoData.setAttribute('color');
        line.dataSource = geoData;
        callback && callback(geojson);
    });

    return {line, _engine};
};

// 删除线
export const removeLine = (line, _engine = engine.value) => {
    line && _engine.remove(line);
};
```

#### 模型

根据官方文档，渲染模型需要做到以下几步：

1. 使用 `GLTFLoader` 进行模型加载，加载的模型通过地图实例的 `add()` 方法添加到场景中
2. 将单体模型添加到场景的特定位置，可以通过地图实例的 `map.projectPointArr(center)` 方法，根据场景中心点经纬度获取屏幕中心点坐标，然后设置模型的 `position`
3. 在模型方法的 `load` 回调函数中获取到模型数据，并给模型设置坐标和大小
4. 删除同理使用地图实例的 `remove()` 方法移除

代码如下所示：

```js
// 添加模型
export const addModel = (url = 'maplayer/assets/models/car-impact.glb', position, scale = 7, callback) => {
    const loader = new GLTFLoader();
    const point = engine.value.map.projectPointArr(position);
    let model = null;
    loader.load(url, gltf => {
        model = gltf.scene;
        model.position.set(point[0], point[1], 0);
        model.scale.setScalar(scale);
        model.rotation.x = Math.PI / 2;
        engine.value.add(model);
        callback && callback(model);
    });
};

// 删除模型
export const removeModel = model => {
    model && engine.value.remove(model);
};
```

#### 视野漫游动画

根据官方文档，实现视野漫游动画需要做到以下几步：

1. 引入 `PathTracker` 方法，用于实现视野漫游动画创建
2. 在渲染好的地图上通过调用地图实例的 `add()` 方法添加视野漫游动画
3. 使用创建好的视野漫游动画变化实例进行方向插值的距离点的阈值、赋值跟踪的路线和模型和视野漫游类型、开启动画
4. 返回创建好的视野漫游动画和该地图实例
5. 创建一个删除点的方法，调用地图实例的 `remove()` 方法实现删除

代码如下所示：

```js
// 添加视野漫游动画
export const addPathTracker = options => {
    const {
        viewMode = 'unlock',
        positions,
        model,
        duration = 10000,
        distance = 50,
        pitch = 70,
        _engine = engine.value,
    } = options;

    const pathTracker = _engine.add(new PathTracker());
    pathTracker.interpolateDirectThreshold = 50; // 进行方向插值的距离点的阈值
    pathTracker.track = positions; // 跟踪的路线,为坐标数组或LineString类型的geojson数据
    pathTracker.start({
        duration,
        distance,
        pitch,
        heading: 10,
    });
    pathTracker.object = model;
    pathTracker.viewMode = viewMode;

    return {
        pathTracker,
        _engine,
    };
};

// 删除视野漫游动画
export const removePathTracker = (name, _engine = engine.value) => {
    name && _engine.remove(name);
};
```

### 地图方法使用

方法有了，现在就是使用方法实现需求了。

使用可以直接调用函数来使用，创建好后添加到地图实例上。但是这种方法会有一个问题：我们无法直观知道当前渲染的地图数据各自的来源和他们的名称，也无法轻松的删除对应位置的地图数据。还需要封装对应的类方法，其步骤如下：

1. 创建一个类，每个类对应一个地图方法渲染，在各自的构造器 `constructure` 中定义映射表 `new Map()` 。
2. 定义一个 `addXxxx()` 方法，方法接收地图函数方法需要的参数，调用前面写好的地图函数方法创建需要的地图数据，并在映射表中保存对应的映射
3. 定义一个 `removeXxxx()` 方法，方法接收一个名称的参数，通过该名称获取映射表对应的映射，从映射表中删除对应的映射，并从地图上删除对应的数据
4. 定义一个 `clear()` 方法，方法循环遍历映射表的 `key` 值，依次调用 `removeXxxx()` 方法删除地图

下面从地图的扎点和视野漫游动画方法入手。

#### 扎点

根据 UI 图，先来看看扎点的效果，如下图所示：

![ui效果](https://pic.imgdb.cn/item/658aa954c458853aef6db8d0.jpg)

可以看到，他主要分为三部分：左侧的扎点和其下方的气泡点；右侧的 `label` 。下面依次分析。

扎点类型多种多样，主要有以下的区别：

- 扎点类型，有桥梁、边坡、隧道、路面等
- 扎点状态，有正常（绿色）、告警病害等（红色）；以及其他排名类（UI 图有对应的其他颜色）
- 扎点尺寸，有小尺寸、中尺寸和大尺寸

因此需要根据类型获取需要的图片路径。图片资源放到 `public/assets/image` 文件夹里面。因此可以这么处理：

> 每一个图片都规范命名，命名格式为 `扎点类型_扎点大小_扎点状态` 。由于考虑到扎点数量与种类过多，因此扎点类型取该扎点到中文，如 `qiaoliang` 等；尺寸大小仿照开源组件库的取法， `normal` 、`small` 等；状态则取对应的颜色英文单词，这样也能有一定的语义化。
>
> 由于图片都是放在 `public` 中，因此图片路径最终为 `public/assets/image/${扎点类型}_${扎点尺寸}_${扎点颜色}` 。

右侧采用地图的自定义 `label` ，调用方法传入其需要的真实 `dom` 、坐标和偏移值即可。前两者在调用时参数传入，偏移值通过计算。

底部的气泡图同理，调用方法传入其需要的尺寸大小、颜色、类型即可。

总体示例代码如下所示：

```js
import {addBubble, removeBubble, addIcon, removeIcon, addDOMOverlay, removeDOMOverlay} from '../xxx.js';

// 对象映射表，传入扎点类型中文获取对应扎点类型拼音
const nameMap = {
    '桥梁': 'qiaoliang',
    '边坡': 'bianpo',
    '隧道': 'suidao',
};
// 计算icon的宽高，获取到label的偏移量
const getLabelOffset = (labelDom, size) => {
    if (!labelDom) {
        return [0, 0];
    }
    const {width, height} = labelDom.getBoundingClientRect();
    const iconWidth = size === 'normal' ? 48 : 32;
    const iconHeight = size === 'normal' ? 83 : 55;
    const gapLeft = size === 'normal' ? 10 : 5;
    const gapTop = size === 'nomal' ? 42 : 28;
    const offsetLeft = width / 2 + iconWidth / 2 + gapLeft;
    const offsetTop = -(height / 2 - (iconWidth + gapTop) / 2) - iconHeight;
    return [offsetLeft, offsetTop];
};

// 获取icon图片路径 'maplayer/assets/image/device_facilitie/设备类型(中文拼音)_size_status.png
const getIconUrl = (type, size = 'normal', status = 'normal', iconUrl) => {
    if (iconUrl) {
        return iconUrl;
    }
    const getIconStatus = status => {
        return `_${status}`;
    };
    size = size === 'normal' ? '_normal' : '_small';
    status = getIconStatus(status);
    type = nameMap[type] || type;
    return `maplayer/assets/image/device_facilitie/${type}${size}${status}.png`;
};

// 定义气泡图颜色
const getBubbleColor = (status, bubbleColor) => {
    if (bubbleColor) {
        return bubbleColor;
    }
    return status === 'normal' ? '#5DE47E' : '#763643';
};

// 告警管理器 构造物等告警展示 label 为自定义dom
class LayerManager {
    constructor(engine) {
        this.layerDomMap = new Map();
        this.engine = engine;
    }
    addLayerDomPoint(name, point, options) {
        if (this.warningeMap.has(name)) {
            this.removeLaddLayerDomPointByName(name);
        }
        const {
            labelDom,
            type = '桥梁',
            iconUrl,
            customData,
            bubbleColor,
            text = '',
            circleColor = '#fff',
            circleBorderColor,
            clickCallback,
            size = 'normal',
            status = 'normal',
        } = options || {};

        // 气泡点
        let {bubble} = addBubble(point, {
            size: size === 'normal' ? 60 : 40,
            color: getBubbleColor(status, bubbleColor),
            type: 'Wave',
            _engine: this.engine,
        });

        // 右侧label dom
        let {domOverlay} = addDOMOverlay(point, labelDom, {
            _engine: this.engine,
            offset: getLabelOffset(labelDom, size),
        });

        // icon small: 32 * 55 normal: 48 * 83(默认)
        let {icon, _engine} = addIcon(point, getIconUrl(type, size, status, iconUrl), {
            width: size === 'normal' ? 48 : 32,
            height: size === 'normal' ? 83 : 55,
            offset: size === 'normal' ? [0, -42] : [0, -28],
            customData,
            _engine: this.engine,
        });

        if (clickCallback && typeof clickCallback === 'function') {
            icon.receiveRaycast = true;
            domOverlay.receiveRaycast = true;
            _engine.event.bind(icon, 'click', clickCallback);
            _engine.event.bind(domOverlay, 'click', clickCallback);
        }

        this.layerDomMap.set(name, {
            'Bubble': bubble, // 气泡点
            'Label': domOverlay, // 文字 label
            'Icon': icon, // icon
        });
    }
    removeLayerDomPointByName(name) {
        const warning = this.warningeMap.get(name);
        warning && removeBubble(warning.Bubble, this.engine);
        warning && removeDOMOverlay(warning.Label, this.engine);
        warning && removeIcon(warning.Icon, this.engine);
        this.layerDomMap.delete(name);
    }

    clear() {
        [...this.layerDomMap.keys()].forEach(macro => {
            this.removeLayerDomPointByName(macro);
        });
        this.layerDomMap.clear();
    }
}

export {
    LayerManager,
};
```

#### 视野漫游动画

视野漫游动画也拆分一下，官网演示的效果如下图所示：

![效果](https://pic.imgdb.cn/item/658b9b91c458853aef2c5aed.jpg)

可以看到，视野漫游动画主要还是需要线（路径）、卡车等模型和动画效果三者。线、模型、动画方法前面都有封装到，因此直接获取使用即可。下面也来定义一个类方法：

1. 创建一个类，每个类对应一个地图方法渲染，在各自的构造器 `constructure` 中定义映射表 `new Map()` 。
2. 定义一个 `addPathTracker()` 方法，方法接收地图函数方法需要的参数（如模型路径、线路径二维数组等），调用前面封装好的相关方法创建地图数据并在映射表中保存对应的映射
3. 定义一个 `removePathTrackerByName()` 方法，方法接收一个名称的参数，通过该名称获取映射表对应的映射，从映射表中删除对应的映射，并从地图上删除对应的数据
4. 定义一个 `clear()` 方法，方法循环遍历映射表的 `key` 值，依次调用 `removeXxxx()` 方法删除地图

```js
import {addPathTracker, addLine, addModel, removePathTracker, removeModel, removeLine} from '../xxx.js';
// 是野蛮懂管理器
class PathTrackerManager {
    constructor(engine) {
        this.pathTrackerMap = new Map();
        this.engine = engine;
    }
    addPathTracker(name, options) {
        if (this.pathTrackerMap.has(name)) {
            this.removePathTrackerByName(name);
        }
        const {position, positions} = options || {};
        let {line} = addLine(positions, {
            lineWidth: 15, color: '#d0a63c', opacity: 1,
        }, null, geoData => {
            addModel('maplayer/assets/models/kache.glb', position, 150, model => {
                addPathTracker({
                    positions: geoData,
                    position,
                    model,
                });

                this.pathTrackerMap.set(name, {
                    'line': line,
                    'model': model,
                });
            });
        });
    }
    removePathTrackerByName(name) {
        const pathTracker = this.pathTrackerMap.get(name);
        pathTracker && removeModel(pathTracker.model, this.engine);
        pathTracker && removeLine(pathTracker.line, this.engine);
        this.pathTrackerMap.delete(name);
    }

    clear() {
        [...this.pathTrackerMap.keys()].forEach(pathTracker => {
            this.removePathTrackerByName(pathTracker);
        });
        this.pathTrackerMap.clear();
    }
}

export {
    PathTrackerManager,
};
```

## 优化

在项目中，优化也是一个不可或缺的环节，在业务中，我涉及到的优化有以下几点：

- 代码优化：通过引入第三方库或方法实现同样的功能，代码量更少，易读性更好
- 性能优化：通过引入第三方库等方法实现地图渲染加载速度优化

关于优化，在项目中我涉及到的分别有以下几点。

### 数据抽稀

有一个图层需求是渲染地图面，UI效果如下所示：

![效果](https://pic.imgdb.cn/item/65a77030871b83018ac8379b.jpg)

根据地图官网可以使用 `Polygon` 方法渲染面。不过由于后端返回的数据量过于庞大，因此在渲染的时候耗时很长，长达半分钟左右才能加载完毕。

这显然是不合理的，因此需要做点优化。在搜索时，发现有一个集成库 `Turf.js` 用于处理地图数据，其中它有一个 `simplify` 方法可以简化数据。官网指路：[简化多边形 | Turf.js中文网 (fenxianglu.cn)](https://turfjs.fenxianglu.cn/category/transformation/simplify.html) 。

根据官方文档指示，需要先使用库的 `polygon` 方法获取需要的数据。该方法传入一个首尾相同数据的三维数组。然后设置抽稀程度、是否允许修改等参数。最后调用 `simplify` 方法获取到抽稀后的简化版本。

抽稀函数封装如下所示：

```js
// 抽稀
export const lessDataFn = arr => {
    // 首尾相同
    arr.forEach(item => item.push(item[0]));
    const option = {tolerance: 0.009, highQuality: false, mutate: true};
    const newArr = arr.map(p => {
        // 如果当前数据长度大于4，则抽稀
        if (p.length >= 4) {
            const arrHandle = simplify(polygon([p]), option);
            return arrHandle.geometry.coordinates[0];
        }
        return p;
    });
    return newArr;
};
```

### 接口请求次数

由于数据量过于庞大，后端接口请求速度也会有所变慢，如果网络环境稍差，还会请求失败。此处也可以做一个缓存优化。

一般情况下提到缓存，都会想到浏览器缓存 `localStorage` ，不过数据量庞大浏览器缓存也未必能够存的下，因此这里可以通过 `new Map` 缓存到内存中。

如果 `new Map().has()` 能够拿到数据，说明之前已经调用过接口获取数据并保存，此时直接获取数据即可，不再需要调接口；反之才需要调用接口获取数据并保存。

代码如下所示：

```js
const polygonDataMap = new Map();

export const setArea = async payload => {
    if (polygonDataMap.has(payload.areaName + '-search')) {
        xxx.value = polygonDataMap.get(payload.areaName + '-search');
        return;
    }
    const {data} = await yyy(payload);
    districtPolygonList.value = data;
    polygonDataMap.set(payload.areaName + '-search', districtPolygonList.value);
};
```

保存后运行，可以发现后续页面渲染速度变快很多。

### 细粒度追踪响应式数据变化

地图产生的相关元素变量，在保存成响应式时，不使用 `ref` 保存，而是用 `shallowRef` 。

在 Vue 3 中，shallowRef 替换掉 ref 的优化是对响应式数据进行更加细粒度的追踪，从而提高性能的优化。

在 Vue 2 中，ref 的实现方式是双向绑定，即当数据变化时，会触发更新视图的操作。然而，这种实现方式有一个缺点：它会追踪整个对象或数组的变化，即使只有其中一个属性发生了变化，也会重新渲染整个对象或数组。这样就会导致性能问题，特别是在处理大型对象或数组时。

Vue 3 中引入了 shallowRef，它通过使用 Proxy 对象来实现，可以进行比较精细的响应式追踪。与 ref 不同的是，shallowRef 只会追踪对象或数组的第一层属性，当第一层属性发生变化时，才会触发更新视图的操作。这样就可以避免不必要的重新渲染，提高性能。

适用场景：

- 当需要追踪一个简单对象或数组的变化时，可以使用 shallowRef。
- 当需要追踪一个复杂对象或数组的变化时，可以使用 reactive 或 ref 来实现深层次的响应式追踪。
