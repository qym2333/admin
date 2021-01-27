import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/login',
  component: Login
}, {
  path: '/index',
  component: Index,
  redirect: '/welcome',
  children: [{
    path: '/welcome',
    component: Welcome
  }]
}]

const router = new VueRouter({
  routes
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('token')) {
    next()
  } else {
    to.path === '/login' ? next() : next('/login')
  }
})

export default router
