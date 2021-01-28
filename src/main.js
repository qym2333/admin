import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/tinymce.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/global.css'
import axios from 'axios'
import moment from 'moment'

// 引入axios
Vue.prototype.$axios = axios
// 引入moment
moment.locale('zh-cn') // 设置语言 或 moment.lang('zh-cn');
Vue.prototype.$moment = moment // 赋值使用

// axios配置
axios.defaults.baseURL = '/api/admin/api/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token')
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
