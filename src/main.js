// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/api.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as custom from './common/filters.js'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

// 过滤器
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

Vue.use(ElementUI)
Vue.prototype.$axios = api
Vue.prototype.Trim = custom.Trim
Vue.config.productionTip = false

// 获取router-list
var routeList = [{name: '首页', path: '/'}]
router.beforeEach((to, from, next) => {
  var index = -1
  for (var i = 0; i < routeList.length; i++) {
    if (routeList[i].name === to.name) {
      index = i
      break
    }
  }
  if (index !== -1) {
    routeList.splice(index + 1, routeList.length - index - 1)
  } else if (to.name !== '登录') {
    routeList.push({name: to.name, path: to.fullPath})
  }
  to.meta.routeList = routeList
  next()
})

Vue.prototype.havePermission = value => {
  let flag = false
  let permission = JSON.parse(localStorage.getItem('permission'))
  for (let i = 0; i < permission.length; i++) {
    if (permission[i].button === value) {
      flag = true
      break
    }
  }
  return flag
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
