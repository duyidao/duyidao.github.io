import { useRoute } from 'vitepress';
import { onMounted, watch, nextTick } from 'vue';
import mediumZoom from 'medium-zoom'; // 引入图片放大插件

const initZoom = () => {
  const route = useRoute();

  // 实现图片点击放大
  const initZoom = () => {
    // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
    mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
  };
  onMounted(() => {
    initZoom(); 
  }); 
  watch(  
    () => route.path,
    () => nextTick(() => initZoom())
  );
}

export default initZoom;