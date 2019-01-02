import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import Constants from '@/utils/constants'

//  工具类
import wtUtil from '@/utils/wtUtil'
Vue.prototype.$wtUtil = wtUtil

//  验证器
import wtValidator from '@/utils/wtValidator'
Vue.prototype.$wtValidator = wtValidator

/*  注册全局过滤器 */
import * as filters from '@/utils/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI, { locale })
Vue.prototype.$wtConst = Constants
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
