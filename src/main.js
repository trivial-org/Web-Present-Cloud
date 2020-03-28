// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入字体图标
import './assets/font_aliIoT/iconfont.css'
import './assets/fonts/iconfont.css'
import './assets/element-ui-font/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 配置请求的跟路径
// import axios from 'axios'
// axios.default.baseURL = ''
// axios.interpretors.request.use(config => {
//   console.log()
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
// Vue.prototype.$http = axios
axios.defaults.baseURL = ''
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
