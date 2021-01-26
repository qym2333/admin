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
axios.defaults.baseURL = 'http://115.159.87.220:8888/api/private/v1/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
