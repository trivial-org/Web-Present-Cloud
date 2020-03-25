import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home'
import Login from 'pages/Login'

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
      component: Home
    }
  ]
})

// 挂在路由导航守卫
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
