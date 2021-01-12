import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/public.css'
import BaiduMap from 'vue-baidu-map'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'

Vue.use(BaiduMap, {
  ak: 'OZYyQnxcgfouNuBl2ZFP0Nx6HGT46OAo'
})
Vue.use(ElementUi)
Vue.prototype.$http = axios
// 在request拦截器中，展示进度条 nprogress.start()
axios.interceptors.request.use(config => {
  nprogress.start()
  return config
})
// response拦截器中隐藏进度条 nprogress.done()
axios.interceptors.response.use(config => {
  nprogress.done()
  return config
})
axios.defaults.baseURL = 'http://h5.cshtm.com/project2020/202005/vbcluntan/ci/index.php/api/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.config.productionTip = false

new Vue({
  router,
  store，
  render: h => h(App)
}).$mount('#app')
