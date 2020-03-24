import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home'
import IndexPage from 'pages/Index'
import ListPage from 'pages/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/index',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/list',
      name: 'ListPage',
      component: ListPage
    }
  ]
})
