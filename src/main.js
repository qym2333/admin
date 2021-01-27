import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/global.css'
// 引入axios
import axios from 'axios'

Vue.prototype.$axios = axios
// axios配置
axios.defaults.baseURL = '/api/admin/api/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer' + sessionStorage.getItem('token')
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
