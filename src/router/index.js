import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/home'
import Login from 'pages/login'

import Welcome from '@/components/Welcome/welcome.vue'
import MenuManage from '@/components/MenuManage/menuManage.vue'
import Users from '@/components/Users/users.vue'
import Authority from '@/components/Authority/authority.vue'
import dataDictionaryManage from '@/components/DataDictionary/dataDictionaryManage.vue'
import dataDictionaryInput from '@/components/DataDictionary/dataDictionaryInput'
import parameterSet from '@/components/ParameterSet/parameterSet'
import Role from '@/components/Roles/roles'

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
        }, {
          name: 'MenuManage',
          path: '/menus-list',
          component: MenuManage
        },
        {
          name: 'Users',
          path: '/users-list',
          component: Users
        }, {
          name: 'Roles',
          path: '/roles-list',
          component: Role
        },
        {
          name: 'Authority',
          path: '/authority-list',
          component: Authority
        },
        {
          name: 'dataDictionaryManage',
          path: '/data-dict-manage',
          component: dataDictionaryManage
        },
        {
          name: 'dataDictionaryInput',
          path: '/data-dict-input',
          component: dataDictionaryInput
        },
        {
          name: 'parameterSet',
          path: '/parameterSet',
          component: parameterSet
        }
      ]
    },
    {
      path: '/404',
      component: () => import('pages/error-page/404'),
      hidden: true
    },
    {
      path: '/403',
      component: () => import('pages/error-page/403'),
      hidden: true
    },
    {
      path: '/500',
      component: () => import('pages/error-page/500'),
      hidden: true
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
