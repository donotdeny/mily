import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import Toaster from '@meforma/vue-toaster';
const app = createApp({})
app.config.productionTip = false
createApp(App).use(Toaster, { position : 'top' }).use(store).use(router).use(ElementPlus).mount('#app')
