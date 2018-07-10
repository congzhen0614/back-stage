/**
 * Created by abc on 2018/7/9.
 * by congzhen
 */
import axios from 'axios'

axios.defaults.baseURL = location.protocol + '//192.168.0.230:8081/qrzd'
axios.defaults.headers.Authorization = JSON.parse(localStorage.getItem('user')).authorization

// 接口列表
export default {
  login (param) { // 登录
    return axios.post('/agent/login', param)
  },
  logout (param) { // 退出登录
    return axios.get('/agent/logout', param)
  },
  accountList () {
    return axios.get('/agent/account/list')
  }
}
