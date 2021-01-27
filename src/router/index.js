import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Welcome from '../views/Welcome.vue'
import Article from '../views/article/Article.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/index'
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
  }, {
    path: '/article',
    component: Article
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
