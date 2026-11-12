declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'virtual:iconify-offline' {
  const data: import('@iconify/types').IconifyJSON
  export default data
}
