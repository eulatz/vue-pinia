import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'

import 'ant-design-vue/dist/reset.css' // 👈 estilos modernos

createApp(App).use(router).use(createPinia()).mount('#app')


