/**
 * Created by abc on 2018/7/9.
 * by congzhen
 */
import axios from 'axios'

const _url = 'http://192.168.0.200:8081'

let token = JSON.parse(localStorage.getItem('user')).authorization

// 请求头设置Authorization
axios.interceptors.request.use(config => {
  if (token) {
    config.headers.Authorization = JSON.parse(token).authorization
    console.log(config.headers)
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 设置重定向
axios.interceptors.response.use(response => {
  
  if (response.data.code === 4) {
    localStorage.clear()
    this.$router.push({
      path: '/login'
    })
  }
  return response
}, err => {
  return Promise.reject(err)
})

export function fetch (url, param, type) {
  return new Promise((resolve, reject) => {
    axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: type,
      data: param,
      url: url
    }).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

// 接口列表
export default {
  login (param) { // 登录
    // return axios.post(_url + '/agent/login', param)
    return fetch(_url + '/agent/login', param, 'post')
  },
  logout (param) { // 退出登录
    // return axios.post(_url + '/agent/logout', param)
    return fetch(_url + '/agent/logout', param, 'post')
  }
}
