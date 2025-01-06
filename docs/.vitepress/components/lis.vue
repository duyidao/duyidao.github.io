<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="custom-list blog">
    <li v-for="item in items"
      :key="item.title"
      class="custom-item">
      <div class="custom-item-title">
        <img src="/images/blog.png"
          alt="">
        <a v-if="item.link"
          class="no-icon"
          :href="item.link"
          :target="item.link.startsWith('http') ? '_blank' : '_self'"
          rel="noopener noreferrer">
          {{ item.title }}
        </a>
      </div>
      <div class="custom-item-content">
        <p v-if="item.description" v-html="item.description "></p>
        <ul v-if="item.subItems">
          <li v-for="subItem in item.subItems"
            :key="subItem.title">
            <img src="/images/link.png"
              alt="">
            <div>
              <span>{{ subItem.pref || '链接：' }}</span>
              <a v-if="subItem.link" :href="subItem.link"
                target="_blank"
                rel="noopener noreferrer">
                {{ subItem.title }}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style lang="less"
  scoped>
  .custom-list {
    list-style-type: none;
    list-style: none;
    padding-left: 0;

    >li {
      margin-bottom: 18px;
      position: relative;

      .custom-item-title {
        display: flex;
        align-items: center;
        height: 22px;

        a {
          height: 100%;
          line-height: 1.25;
          height: 100%;
        }
      }

      .custom-item-content {
        margin: 15px 0 0 28px;

        ul {
          list-style-type: none;
          list-style: none;
          padding-left: 0;

          li {
            display: flex;
            align-items: center;
            height: 20px;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            font-size: 15px;

            > div {
              display: flex;
              align-items: center;
              height: 100%;
            }
          }
        }

        p {
          margin: 5px 0;
        }
      }

      img {
        width: auto;
        height: 100%;
        margin-right: 10px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .custom-list {

      >li {
        margin-bottom: 1.125rem;
        position: relative;

        .custom-item-title {
          height: 1.375rem;
        }

        .custom-item-content {
          margin: .9375rem 0 0 1.75rem;

          p {
            margin: .3125rem 0;
          }
        }

        img {
          margin-right: .625rem;
        }
      }
    }
  }
</style>