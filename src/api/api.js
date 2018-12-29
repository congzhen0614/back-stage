/**
 * Created by abc on 2018/7/9.
 * by congzhen
 */
import axios from 'axios'
import qs from 'qs'

// 测试: http://192.168.0.230:8081
// 正式正式: https://qrapi.51weixiao.com/qrzd

// axios.defaults.baseURL = 'http://192.168.0.230:8081'

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
  }
  return response
}, err => {
  return Promise.reject(err)
})

// 接口列表
export default {
  login (params) { // 登录
    return axios.post('/qrzd/agent/login', params)
  },
  logout (params) { // 退出登录
    return axios.post('/qrzd/agent/logout', params)
  },
  province () { // 省
    return axios.get('/qrzd/sys/area/list/province')
  },
  cities (params) { // 市
    return axios.post('/qrzd/sys/area/list/citybyid', params)
  },
  regions (params) { // 区
    return axios.post('/qrzd/sys/area/list/regionbyid', params)
  },
  accountList (params) { // 用户列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/agent/account/list?${param}`)
  },
  accountListCandidate (params) { // 用户列表
    return axios.post('/qrzd/agent/account/list/candidate', params)
  },
  accountSave (params) { // 新建用户
    return axios.post('/qrzd/agent/account/save', params)
  },
  accountUpdate (params) { // 修改用户
    return axios.post('/qrzd/agent/account/update', params)
  },
  accountUpdatepsw (params) { // 修改账号
    return axios.post('/qrzd/agent/account/updatepsw', params)
  },
  accountUpdatepswReset (params) {
    return axios.post('/qrzd/agent/account/updatepsw/reset', params)
  },
  accountUpdateastatus (params) {
    return axios.post('/qrzd/agent/account/updateastatus', params)
  },
  admingroupList (params) { // 获取商家组织列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/sys/admingroup/list?${param}`)
  },
  admingroupListCandidate (params) { // 获取商家组织列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/sys/admingroup/list/candidate?${param}`)
  },
  admingroupDelete (params) { // 删除商家组织
    return axios.post('/qrzd/sys/admingroup/delete', params)
  },
  admingroupSave (params) { // 新建商家组织
    return axios.post('/qrzd/sys/admingroup/save', params)
  },
  admingroupUpdate (params) { // 修改商家组织
    return axios.post('/qrzd/sys/admingroup/update', params)
  },
  admingroupUpdateastatus (params) { // 启用或禁用商家组织
    return axios.post('/qrzd/sys/admingroup/updateastatus', params)
  },
  roleList (params) { // 获取角色列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/sys/role/list?${param}`)
  },
  testClear () { // 清除权限信息
    return axios.get('/qrzd/sys/test/clear')
  },
  rolepermissionList (params) { // 当前角色拥有的权限
    return axios.post('/qrzd/sys/rolepermission/list', params)
  },
  permissionList () { // 权限列表
    return axios.get('/qrzd/sys/permission/list')
  },
  roleCandidate () { // 所有权限列表
    return axios.get('/qrzd/sys/role/candidate')
  },
  rolepermissionSave (params) { // 保存权限
    return axios.post('/qrzd/sys/rolepermission/save', params)
  },
  itemageList (params) { // 年龄设置列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/sys/itemage/list?${param}`)
  },
  itemageListCandidate (params) { // 年龄设置列表
    return axios.get('/qrzd/sys/itemage/list/open')
  },
  itemageUpdate (params) { // 年龄设置修改
    return axios.post('/qrzd/sys/itemage/update', params)
  },
  itemageDel (params) { // 年龄设置删除
    return axios.post('/qrzd/sys/itemage/del', params)
  },
  itemtypeList (params) { // 分类设置列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/sys/itemtype/list?${param}`)
  },
  itemtypeListCandidate (params) { // 分类设置列表
    return axios.get('/qrzd/sys/itemtype/list/open')
  },
  bookType () {
    return axios.get('/qrzd/book/type/open')
  },
  itemtypeSave (params) { // 分类设置新增加
    return axios.post('/qrzd/sys/itemtype/save', params)
  },
  itemtypeUpdate (params) { // 分类设置删除
    return axios.post('/qrzd/sys/itemtype/update', params)
  },
  itemtypeDel (params) { // 分类设置删除
    return axios.post('/qrzd/sys/itemtype/delete', params)
  },
  magazineList (params) { // 杂志列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/magazine/qrzditem/list?${param}`)
  },
  magazineSave (params) { // 新建杂志
    return axios.post('/qrzd/magazine/qrzditem/save', params)
  },
  magazineDel (params) { // 删除杂志
    return axios.post('/qrzd/magazine/qrzditem/del', params)
  },
  magazineUpdate (params) { // 修改杂志
    return axios.post('/qrzd/magazine/qrzditem/update', params)
  },
  magazineCopy (params) { // 批量复制给渠道商
    return axios.post('/qrzd/magazine/qrzditem/copy', params)
  },
  magazinePublish (params) { // 批量上架或者批量下架
    return axios.post('/qrzd/magazine/qrzditem/publish', params)
  },
  magazineBatch () { // 导入杂志地址 正式 //qrapi.51weixiao.com/qrzd 测试 //192.168.0.230:8081/qrzd
    // return location.protocol + '//192.168.0.230:8081/qrzd/magazine/qrzditem/batch'
    return location.protocol + '//' + window.location.host + '/qrzd/magazine/qrzditem/batch'
  },
  schoolBatch () {
    return location.protocol + '//' + window.location.host + '/qrzd/sys/school/batch'
  },
  magazineItemImgst (params) { // 杂志列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/magazine/itemimg/list?${param}`)
  },
  magazineCover (params) { // 修改封面图
    return axios.post('/qrzd/magazine/qrzditem/cover', params)
  },
  magazineGiftlogo (params) { // 修改礼品图
    return axios.post('/qrzd/magazine/qrzditem/giftlogo', params)
  },
  magazineDoverDel (params) { // 删除封面图或者礼品图
    return axios.post('/qrzd/magazine/qrzditem/cover/del', params)
  },
  magazineItemImgSave (params) { // 内页图列表
    return axios.post('/qrzd/magazine/itemimg/save', params)
  },
  magazineItemImgUpdate (params) { // 修改内页图
    return axios.post('/qrzd/magazine/itemimg/update', params)
  },
  magazineItemImgDel (params) { // 删除内页图
    return axios.post('/qrzd/magazine/itemimg/del', params)
  },
  itempackList (params) { // 目录管理列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/itempack/list?${param}`)
  },
  itempackSave (params) { // 新增目录
    return axios.post('/qrzd/itempack/save', params)
  },
  itempackUpdate (params) { // 修改目录
    return axios.post('/qrzd/itempack/update', params)
  },
  itempackDel (params) { // 删除目录
    return axios.post('/qrzd/itempack/del', params)
  },
  itempackSubmit (params) { // 提交审核
    return axios.post('/qrzd/itempack/submit', params)
  },
  itempackCheck (params) { // 审核
    return axios.post('/qrzd/itempack/check', params)
  },
  itempackUpdateLogo (params) { // 上传二维码logo
    return axios.post('/qrzd/itempack/update/qrcode/logo', params)
  },
  itempackUpdateQrcode (params) { // 批量生成二维码
    return axios.post('/qrzd/itempack/update/qrcode', params)
  },
  itempackUpdatesub (params) { // 修改征订状态
    return axios.post('/qrzd/itempack/updatesub', params)
  },
  bookList (params) { // 图书列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/book/list?${param}`)
  },
  spyppacketList (params) { // 视听列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/spyp/spyppacket/list?${param}`)
  },
  itempackDownload (params) { // 批量下载二维码
    let param = qs.stringify(params)
    return axios.get(`/qrzd/itempack/qrcode/download/zip?${param}`)
  },
  tradeList (params) { // 订单列表
    let param = qs.stringify(params)
    return axios.get(`/qrzd/trade/list?${param}`)
  },
  schoolList (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/sys/school/bindlist?${param}`)
  },
  sysSchoolList (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/sys/school/list?${param}`)
  },
  schGradeList () {
    return axios.get('/qrzd/sys/grade/list/open')
  },
  schClassList () {
    return axios.get('/qrzd/sys/schclass/list/open')
  },
  tradeUpdate (params) {
    return axios.post('/qrzd/trade/update', params)
  },
  schoolBind (params) {
    return axios.post('/qrzd/sys/school/bind', params)
  },
  schoolFindByAdmin (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/sys/school/findByAdmin?${param}`)
  },
  seekSchoolList (params) {
    return axios.post('/qrzd/sys/school/list/candidate', params)
  },
  delive (params) {
    return axios.post('/qrzd/trade/delive', params)
  },
  tradeDelive (tradeId) {
    return axios.get(`/qrzd/trade/delive/${tradeId}`)
  },
  tradeHis (params) {
    return axios.get(`/qrzd/trade/tradehis/${params}`)
  },
  trade (params) {
    return axios.get(`/qrzd/trade/${params}`)
  },
  tradeDetail (params) {
    return axios.get(`/qrzd/trade/detail/${params}`)
  },
  refundApply (params) {
    return axios.post('/qrzd/trade/refundapply', params)
  },
  refundCancel (params) {
    return axios.post('/qrzd/trade/refund/cancel', params)
  },
  tradeRefund (params) {
    return axios.post('/qrzd/trade/refund', params)
  },
  detailUpdate (params) {
    return axios.post('/qrzd/trade/detail/update', params)
  },
  tradeItemPackList (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/trade/itempack/list?${param}`)
  },
  addressHomeUpdate (params) {
    return axios.post('/qrzd/trade/address/home/update', params)
  },
  magazineSchoolUpdate (params) {
    return axios.post('/qrzd/trade/address/magazineschool/update', params)
  },
  schoolOrd (params) {
    return axios.post('/qrzd/sys/school/ord', params)
  },
  schoolSave (params) {
    return axios.post('/qrzd/sys/school/save', params)
  },
  schoolUpdate (params) {
    return axios.post('/qrzd/sys/school/update', params)
  },
  schoolDel (params) {
    return axios.post('/qrzd/sys/school/del', params)
  },
  updateQrcode (params) {
    return axios.post('/qrzd/itempack/update/qrcode/status', params)
  },
  schoolAdmin (schoolId) {
    return axios.get(`/qrzd/sys/school/${schoolId}/admin`)
  },
  schoolShow (params) {
    return axios.post('/qrzd/sys/school/show', params)
  },
  accountArea (params) {
    return axios.post('/qrzd/agent/account/listarea/open', params)
  },
  // 报表
  magaReportList (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/trade/report/magazine/total/list?${param}`)
  },
  areaReportList (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/trade/report/area/list?${param}`)
  },
  areaBookReportList (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/trade/report/area/list/book?${param}`)
  },
  // 用户管理
  userList (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/sys/user/list?${param}`)
  },
  findChildByUid (params) {
    return axios.post('/qrzd/sys/child/findbyuid', params)
  },
  userDelete (params) {
    return axios.post('/qrzd/sys/user/delete', params)
  },
  // 孩子管理
  childList (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/sys/child/list?${param}`)
  },
  childDelete (params) {
    return axios.post('/qrzd/sys/child/delete', params)
  },
  childUpdate (params) {
    return axios.post('/qrzd/sys/child/update', params)
  },
  itempackUpdatelist (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/itempack/updatelist?${param}`)
  },
  pictureDelete (params) {
    return axios.post('/qrzd/magazine/qrzditem/picture/delete', params)
  },
  schoolExportCheck (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/trade/report/school/export/check?${param}`)
  },
  itempackQrList (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/itempack/qr/list?${param}`)
  },
  itempackDetail (id) {
    return axios.get(`/qrzd/itempack/detail/${id}`)
  }
}
