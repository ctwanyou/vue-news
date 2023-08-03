import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
//pinia 数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import '@/styles/common.css'
const app = createApp(App)
const pinia = createPinia()
//注册持久化插件
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
