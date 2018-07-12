/**
 * Created by abc on 2018/7/9.
 * by congzhen
 */
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
let obj = new Vue()
axios.defaults.baseURL = location.protocol + '//192.168.0.230:8081/qrzd'

// 设置headers
axios.interceptors.request.use(config => {
  if (JSON.parse(localStorage.getItem('user'))) {
    config.headers.Authorization = JSON.parse(localStorage.getItem('user')).authorization
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 设置重定向
axios.interceptors.response.use(response => {
  if (response.data.code === '-6') {
    localStorage.clear()
    window.location.reload()
  } else if (response.data.code < '0') {
    obj.$message.error(response.data.msg)
  }
  return response
}, err => {
  return Promise.reject(err)
})

// 接口列表
export default {
  login (params) { // 登录
    return axios.post('/agent/login', params)
  },
  logout (params) { // 退出登录
    return axios.post('/agent/logout', params)
  },
  province () { // 省
    return axios.get('/sys/area/list/province')
  },
  cities (params) { // 市
    return axios.post('/sys/area/list/citybyid', params)
  },
  regions (params) { // 区
    return axios.post('/sys/area/list/regionbyid', params)
  },
  accountList (params) { // 用户列表
    let param = qs.stringify(params)
    return axios.get(`/agent/account/list?${param}`)
  },
  admingroupList (params) {
    let param = qs.stringify(params)
    return axios.get(`/sys/admingroup/list?${param}`)
  },
  admingroupDelete (params) {
    return axios.post('/sys/admingroup/delete', params)
  }
}
