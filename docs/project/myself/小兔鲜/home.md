# Home 首页

## 整体结构创建

![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1675417667651-eb841c73-5b36-48a5-a8ee-118dbeaaeb0d.png#averageHue=%23fcf8f8&clientId=u19c1ce9d-cad7-4&from=paste&height=458&id=u7e2d2595&name=image.png&originHeight=916&originWidth=1368&originalType=binary&ratio=1&rotation=0&showTitle=false&size=37531&status=done&style=none&taskId=uf8f39479-333b-4074-b888-53dc829c807&title=&width=684)

1- 按照结构新增五个组件，准备最简单的模版，分别在Home模块的入口组件中引入

- HomeCategory
- HomeBanner
- HomeNew
- HomeHot
- HomeProduct

```vue
<script setup>
</script>

<template>
  <div> HomeCategory </div>
</template>
```

2- Home模块入口组件中引入并渲染

```vue
<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import homeProduct from './components/HomeProduct.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />
</template>
```

## 分类实现

1- 准备详细模版

```vue
<script setup>

</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in 9" :key="item">
        <RouterLink to="/">居家</RouterLink>
        <RouterLink v-for="i in 2" :key="i" to="/">南北干货</RouterLink>
        <!-- 弹层layer位置 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="i in 5" :key="i">
              <RouterLink to="/">
                <img alt="" />
                <div class="info">
                  <p class="name ellipsis-2">
                    男士外套
                  </p>
                  <p class="desc ellipsis">男士外套，冬季必选</p>
                  <p class="price"><i>¥</i>200.00</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped lang='scss'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: $xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            &:nth-child(3n) {
              margin-right: 0;
            }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;

              &:hover {
                background: #e3f9f4;
              }

              img {
                width: 95px;
                height: 95px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 16px;
                  color: #666;
                }

                .desc {
                  color: #999;
                }

                .price {
                  font-size: 22px;
                  color: $priceColor;

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      // 关键样式  hover状态下的layer盒子变成block
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
```

导入 pinia 内保存的 list 数组，动态渲染数据

## 轮播图实现

设置静态结构，调用接口获取数据即可，静态结构如下：

```js
<script setup>

</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/6d202d8e-bb47-4f92-9523-f32ab65754f4.jpg" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
```

## 面板实现

可以发现，新鲜好物与人气推荐两个模块结构几乎相等，因此可以考虑把它们相同的结构抽离出来作为一个骨架，不同的部分使用各自的数据。

骨架 `HomePanel.vue` ：

```vue
<script setup>
defineProps({
  title: {
    type: String
  },
  subTitle: {
    type: String
  }
})
</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          title<small>subTitle</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <slot />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
```

> 组件参数可通过两种方式获取：
>
> - prop：内容不复杂，单纯纯文本等的标题
> - 插槽：内容为复杂的模板

使用：

```vue
<HomePanel title="新鲜好物" subTitle="新鲜好物，好多商品">
  <div>新鲜好物的插槽</div>
</HomePanel>
<HomePanel title="人气推荐" subTitle="人气推荐，猜你喜欢">
  <div>人气推荐的插槽</div>
</HomePanel>
```

## 新鲜好物与人气推荐

调用接口渲染数据即可

## 图片懒加载

- 判断图片是否进入视口区域
- 为图片添加地址

`vueuse` 中有一个方法判断当前元素是否进入视口中：`useIntersectionObserver` 。因此设置一个自定义事件，判断元素是否在视口中，如果进入可视区域，则把值给元素的 `src` 属性。其中：

- el：绑定了自定义事件的元素。因此可以 `el.src` 
- binding：等号后的值，可以把图片路径赋过来

```js
import { useIntersectionObserver } from '@vueuse/core'

// 图片懒加载自定义指令
app.directive('img-lazy', {
  mounted (el, binding) {
    // el：指令绑定的元素
    // binding：指令等号后的值
    console.log(el, binding);
    const { stop } = useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        console.log(isIntersecting)
        if (isIntersecting) {
          // 进入视口区域
          el.src = binding.value
          stop()
        }
      },
    )
  }
})
```

组件中：

```vue
<img v-img-lazy="item.picture" alt="" />
```

### 优化

- 逻辑书写位置不合理

  懒加载指令逻辑不能直接写在入口文件，入口文件通常只做一些初始化的事情，不应该包含太多的逻辑代码。应该封装为插件， `main.js` 入口文件只需要负责注册插件即可。

  `src/directives.js` ：

  ```js
  // 定义懒加载插件
  import { useIntersectionObserver } from '@vueuse/core'
  
  export const lazyPlugin = {
    install(app) {
      // 懒加载指令逻辑
      // 图片懒加载自定义指令
      app.directive('img-lazy', {
        mounted(el, binding) {
          // el：指令绑定的元素
          // binding：指令等号后的值
          console.log(el, binding);
          const { stop } = useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
              console.log(isIntersecting)
              if (isIntersecting) {
                // 进入视口区域
                el.src = binding.value
                stop()
              }
            },
          )
        }
      })
    }
  }
  ```

  `main.js` ：

  ```js
  // 引入懒加载指令插件并且注册
  import { lazyPlugin } from "@/directives"
  
  const app = createApp(App)
  
  app.use(createPinia())
  app.use(lazyPlugin)
  ```

- 重复监听问题

  `useIntersectionObserver` 对于元素的监听是不合理的，除非手动停止监听，存在内存浪费。

  解决思路：在监听的图片第一次完成加载之后就停止监听。

  ```js
  const { stop } = useIntersectionObserver(
    el,
    ([{ isIntersecting }]) => {
      console.log(isIntersecting)
      if (isIntersecting) {
        // 进入视口区域
        el.src = binding.value
        stop()
      }
    },
  )
  ```

## 产品列表实现

1. 准备静态模板

   ```vue
   <script setup>
   import HomePanel from './HomePanel.vue'
   
   </script>
   
   <template>
     <div class="home-product">
       <!-- <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
         <div class="box">
           <RouterLink class="cover" to="/">
             <img :src="cate.picture" />
             <strong class="label">
               <span>{{ cate.name }}馆</span>
               <span>{{ cate.saleInfo }}</span>
             </strong>
           </RouterLink>
           <ul class="goods-list">
             <li v-for="good in cate.goods" :key="good.id">
               <RouterLink to="/" class="goods-item">
                 <img :src="good.picture" alt="" />
                 <p class="name ellipsis">{{ good.name }}</p>
                 <p class="desc ellipsis">{{ good.desc }}</p>
                 <p class="price">&yen;{{ good.price }}</p>
               </RouterLink>
             </li>
           </ul>
         </div>
       </HomePanel> -->
     </div>
   </template>
   
   <style scoped lang='scss'>
   .home-product {
     background: #fff;
     margin-top: 20px;
     .sub {
       margin-bottom: 2px;
   
       a {
         padding: 2px 12px;
         font-size: 16px;
         border-radius: 4px;
   
         &:hover {
           background: $xtxColor;
           color: #fff;
         }
   
         &:last-child {
           margin-right: 80px;
         }
       }
     }
   
     .box {
       display: flex;
   
       .cover {
         width: 240px;
         height: 610px;
         margin-right: 10px;
         position: relative;
   
         img {
           width: 100%;
           height: 100%;
         }
   
         .label {
           width: 188px;
           height: 66px;
           display: flex;
           font-size: 18px;
           color: #fff;
           line-height: 66px;
           font-weight: normal;
           position: absolute;
           left: 0;
           top: 50%;
           transform: translate3d(0, -50%, 0);
   
           span {
             text-align: center;
   
             &:first-child {
               width: 76px;
               background: rgba(0, 0, 0, 0.9);
             }
   
             &:last-child {
               flex: 1;
               background: rgba(0, 0, 0, 0.7);
             }
           }
         }
       }
   
       .goods-list {
         width: 990px;
         display: flex;
         flex-wrap: wrap;
   
         li {
           width: 240px;
           height: 300px;
           margin-right: 10px;
           margin-bottom: 10px;
   
           &:nth-last-child(-n + 4) {
             margin-bottom: 0;
           }
   
           &:nth-child(4n) {
             margin-right: 0;
           }
         }
       }
   
       .goods-item {
         display: block;
         width: 220px;
         padding: 20px 30px;
         text-align: center;
         transition: all .5s;
   
         &:hover {
           transform: translate3d(0, -3px, 0);
           box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
         }
   
         img {
           width: 160px;
           height: 160px;
         }
   
         p {
           padding-top: 10px;
         }
   
         .name {
           font-size: 16px;
         }
   
         .desc {
           color: #999;
           height: 29px;
         }
   
         .price {
           color: $priceColor;
           font-size: 20px;
         }
       }
     }
   }
   </style>
   ```

2. 封装接口

   ```js
   // 获取产品列表的数据
   export const getGoodsAPI = () => {
     return http({
       url: '/home/goods'
     })
   }
   ```

3. 获取数据渲染

4. 图片懒加载

## GoodsItem组件封装

把重复使用的商品项结构封装为一个组件，减少重复代码量，方便复用。封装核心思想：

- 把要显示的数据对象设计为 `props` 
- 如果有复杂结构用插槽

