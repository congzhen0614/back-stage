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
  accountSave (params) { // 新建用户
    return axios.post('/agent/account/save', params)
  },
  accountUpdateastatus (params) { // 修改用户
    return axios.post('/agent/account/updateastatus', params)
  },
  accountUpdatepsw (params) {
    return axios.post('/agent/account/updatepsw', params)
  },
  admingroupList (params) {
    let param = qs.stringify(params)
    return axios.get(`/sys/admingroup/list?${param}`)
  },
  admingroupDelete (params) {
    return axios.post('/sys/admingroup/delete', params)
  },
  admingroupSave (params) {
    return axios.post('/sys/admingroup/save', params)
  },
  admingroupUpdate (params) {
    return axios.post('/sys/admingroup/update', params)
  },
  roleList (params) {
    let param = qs.stringify(params)
    return axios.get(`/sys/role/list?${param}`)
  },
  testClear () { // 清除权限信息
    return axios.get('/sys/test/clear')
  },
  rolepermissionList (params) { // 当前角色拥有的权限
    return axios.post('/sys/rolepermission/list', params)
  },
  permissionList () { // 权限列表
    return axios.get('/sys/permission/list')
  },
  roleCandidate () { // 所有权限列表
    return axios.get('/sys/role/candidate')
  },
  rolepermissionSave (params) {
    return axios.post('/sys/rolepermission/save', params)
  }
}
