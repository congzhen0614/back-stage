// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/api.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.prototype.$axios = api

Vue.config.productionTip = false

// 获取router-list
let routeList = [{name: '首页', path: '/'}]
router.beforeEach((to, from, next) => {
  let list = []
  routeList.forEach(item => {
    list.push(item.name)
  })
  let index = list.indexOf(to.name)
  if (index !== -1) {
    routeList.splice(index + 1, routeList.length - index - 1)
  } else {
    routeList.push({name: to.name, path: to.path})
  }
  to.meta.routeList = routeList
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
