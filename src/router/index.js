import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/home'
import Login from 'pages/login'

import Welcome from '@/components/Welcome/welcome.vue'
import Users from '@/components/Users/users.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          name: 'welcome',
          path: '/welcome',
          component: Welcome
        },
        {
          name: 'Users',
          path: '/users-list',
          component: Users
        }
      ]
    }
  ]
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数 表示方放行
//   // next() 放行 next('/login') 强制跳转

//   if (to.path === '/login') { return next() }
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) { return next('/login') }
//   next()
// })

export default router
