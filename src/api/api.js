/**
 * Created by abc on 2018/7/9.
 * by congzhen
 */
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import downloadHandler from '@/common/upload.js'
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
  if (typeof response.data === 'string') {
    downloadHandler(response.data, 'zip')
  } else if (response.data.code === '-6') {
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
  accountUpdatepsw (params) { // 修改账号
    return axios.post('/agent/account/updatepsw', params)
  },
  admingroupList (params) { // 获取商家组织列表
    let param = qs.stringify(params)
    return axios.get(`/sys/admingroup/list?${param}`)
  },
  admingroupDelete (params) { // 删除商家组织
    return axios.post('/sys/admingroup/delete', params)
  },
  admingroupSave (params) { // 新建商家组织
    return axios.post('/sys/admingroup/save', params)
  },
  admingroupUpdate (params) { // 修改商家组织
    return axios.post('/sys/admingroup/update', params)
  },
  admingroupUpdateastatus (params) { // 启用或禁用商家组织
    return axios.post('/sys/admingroup/updateastatus', params)
  },
  roleList (params) { // 获取角色列表
    let param = qs.stringify(params)
    return axios.get(`/sys/role/list?${param}`)
  },
  testClear () { // 清除权限信息
    return axios.get('/sys/test/clear')
  },
  rolepermissionList (params) { // 当前角色拥有的权限
    return axios.post('/sys/rolepermission/list/open', params)
  },
  permissionList () { // 权限列表
    return axios.get('/sys/permission/list')
  },
  roleCandidate () { // 所有权限列表
    return axios.get('/sys/role/candidate')
  },
  rolepermissionSave (params) {
    return axios.post('/sys/rolepermission/save', params)
  },
  itemageList (params) { // 年龄设置列表
    let param = qs.stringify(params)
    return axios.get(`/sys/itemage/list?${param}`)
  },
  itemageUpdate (params) { // 年龄设置修改
    return axios.post('/sys/itemage/update', params)
  },
  itemageDel (params) { // 年龄设置删除
    return axios.post('/sys/itemage/del', params)
  },
  itemtypeList (params) { // 分类设置列表
    let param = qs.stringify(params)
    return axios.get(`/sys/itemtype/list?${param}`)
  },
  itemtypeSave (params) { // 分类设置新增加
    return axios.post('/sys/itemtype/save', params)
  },
  itemtypeUpdate (params) { // 分类设置删除
    return axios.post('/sys/itemtype/update', params)
  },
  itemtypeDel (params) { // 分类设置删除
    return axios.post('/sys/itemtype/delete', params)
  },
  magazineList (params) { // 杂志列表
    let param = qs.stringify(params)
    return axios.get(`/magazine/qrzditem/list?${param}`)
  },
  magazineSave (params) { // 新建杂志
    return axios.post('/magazine/qrzditem/save', params)
  },
  magazineDel (params) { // 删除杂志
    return axios.post('/magazine/qrzditem/del', params)
  },
  magazineUpdate (params) { // 修改杂志
    return axios.post('/magazine/qrzditem/update', params)
  },
  magazineCopy (params) { // 批量复制给渠道商
    return axios.post('/magazine/qrzditem/copy', params)
  },
  magazinePublish (params) { // 批量上架或者批量下架
    return axios.post('/magazine/qrzditem/publish', params)
  },
  magazineBatch () { // 导入杂志地址
    return location.protocol + '//192.168.0.230:8081/qrzd/magazine/qrzditem/batch/open'
  },
  magazineItemImgst (params) { // 杂志列表
    let param = qs.stringify(params)
    return axios.get(`/magazine/itemImg/list?${param}`)
  },
  magazineCover (params) { // 修改封面图
    return axios.post('/magazine/qrzditem/cover', params)
  },
  magazineGiftlogo (params) { // 修改礼品图
    return axios.post('/magazine/qrzditem/giftlogo', params)
  },
  magazineDoverDel (params) { // 删除封面图或者礼品图
    return axios.post('/magazine/qrzditem/cover/del', params)
  },
  magazineItemImgSave (params) { // 内页图列表
    return axios.post('/magazine/itemImg/save', params)
  },
  magazineItemImgUpdate (params) { // 修改内页图
    return axios.post('/magazine/itemImg/update', params)
  },
  magazineItemImgDel (params) { // 删除内页图
    return axios.post('/magazine/itemImg/del', params)
  },
  itempackList (params) { // 目录管理列表
    let param = qs.stringify(params)
    return axios.get(`/itempack/list?${param}`)
  },
  itempackSave (params) { // 新增目录
    return axios.post('/itempack/save', params)
  },
  itempackUpdate (params) { // 修改目录
    return axios.post('/itempack/update', params)
  },
  itempackDel (params) { // 删除目录
    return axios.post('/itempack/del', params)
  },
  itempackSubmit (params) { // 提交审核
    return axios.post('/itempack/submit', params)
  },
  itempackCheck (params) { // 审核
    return axios.post('/itempack/check', params)
  },
  itempackUpdateLogo (params) { // 上传二维码logo
    return axios.post('/itempack/update/qrcode/logo', params)
  },
  itempackUpdateQrcode (params) { // 批量生成二维码
    return axios.post('/itempack/update/qrcode', params)
  },
  itempackUpdatesub (params) { // 修改征订状态
    return axios.post('/itempack/updatesub', params)
  },
  bookList (params) { // 图书列表
    let param = qs.stringify(params)
    return axios.get(`/book/list?${param}`)
  },
  spyppacketList (params) { // 视听列表
    let param = qs.stringify(params)
    return axios.get(`/spyp/spyppacket/list?${param}`)
  },
  itempackDownload (params) {
    let param = qs.stringify(params)
    return axios.get(`/itempack/qrcode/download/zip?${param}`)
  }
}
