import Vue from 'vue'
import Router from 'vue-router'

import main from '@/pages/main/main.vue' // 首页
import login from '@/pages/login/login.vue' // 登录
import changePassword from '@/pages/login/changePassword/changePassword.vue' // 修改密码
import journalManage from '@/pages/journalManage/journal/journalManage.vue' // 杂志列表页
import addNewJournal from '@/pages/journalManage/journal/addNew/addNew.vue' // 杂志添加页
import updataJournal from '@/pages/journalManage/journal/updata/updata.vue' // 杂志修改页
import upLoadJournal from '@/pages/journalManage/journal/upLoad/upLoad.vue' // 杂志传图片
import imagesList from '@/pages/journalManage/journal/upLoad/imagesList.vue' // 杂志图片列表
import upLoadImages from '@/pages/journalManage/journal/upLoad/upLoadImages.vue' // 杂志图片列表
import catalogue from '@/pages/journalManage/catalogue/catalogue.vue' // 杂志目录
import updateCatalogue from '@/pages/journalManage/catalogue/updateCatalogue/updateCatalogue.vue' // 修改杂志目录
import addCatalogue from '@/pages/journalManage/catalogue/addCatalogue/addCatalogue.vue' // 新增杂志目录
import QRenerat from '@/pages/journalManage/catalogue/QRenerat/QRenerat.vue' // 批量生成二维码
import QRlist from '@/pages/journalManage/catalogue/QRlist/QRlist.vue' // 二维码列表
import account from '@/pages/system/account/account.vue' // 账号列表页
import addAccount from '@/pages/system/account/addAccount/addAccount.vue' // 添加账号页面
import updateAccount from '@/pages/system/account/updateAccount/updateAccount.vue' // 修改账号页面
import bindSchool from '@/pages/system/account/bindSchool/bindSchool.vue' // 绑定学校
import bindSchoolList from '@/pages/system/account/bindSchool/bindSchoolList.vue' // 绑定学校
import permission from '@/pages/system/permission/permission.vue' // 角色权限
import permissionList from '@/pages/system/permission/permissionList/permissionList.vue' // 角色权限
import organiza from '@/pages/system/organiza/organiza.vue' // 商家组织列表
import addOrganiza from '@/pages/system/organiza/addOrganiza/addOrganiza.vue' // 添加商家组织
import updateOrganiza from '@/pages/system/organiza/updateOrganiza/updateOrganiza.vue' // 修改商家组织
import setAge from '@/pages/journalManage/setAge/setAge.vue' // 设置年龄段
import addAge from '@/pages/journalManage/setAge/addAge/addAge.vue' // 添加年龄
import upDateAge from '@/pages/journalManage/setAge/upDateAge/upDateAge.vue' // 添加年龄
import classify from '@/pages/journalManage/classify/classify.vue' // 分类设置
import addClassify from '@/pages/journalManage/classify/addClassify/addClassify.vue' // 添加分类
import updateClassify from '@/pages/journalManage/classify/updateClassify/updateClassify.vue' // 添加分类
import orderList from '@/pages/order/orderList/orderList.vue' // 订单列表
import orderInfo from '@/pages/order/orderList/orderInfo/orderInfo.vue' // 修改订单
import delive from '@/pages/order/orderList/delive/delive.vue' // 发货
import flowed from '@/pages/order/orderList/flowed/flowed.vue' // 流程
import updateOrder from '@/pages/order/orderList/updateOrder/updateOrder.vue' // 流程
import updateAddress from '@/pages/order/orderList/updateAddress/updateAddress.vue' // 修改地址
import updateChild from '@/pages/order/orderList/updateChild/updateChild.vue' // 修改孩子
import schoolList from '@/pages/system/school/schoolList.vue' // 学校列表
import addSchool from '@/pages/system/school/addSchool/addSchool.vue' // 添加学校
import updateSchool from '@/pages/system/school/updateSchool/updateSchool.vue' // 添加学校
import checkAccount from '@/pages/system/school/checkAccount/checkAccount.vue' // 查看绑定学校商家
import checkCatalogue from '@/pages/journalManage/catalogue/checkCatalogue/checkCatalogue.vue' // 查看目录
import magaReport from '@/pages/report/magaReport/magaReport.vue' // 杂志销售统计
import offlineReport from '@/pages/report/offlineReport/offlineReport.vue' // 线下刊物征订汇总
import onLineReport from '@/pages/report/onLineReport/onLineReport.vue' // 线上刊物征订汇总
import magaAreaReport from '@/pages/report/areaReport/magaAreaReport.vue' // 按学校汇总杂志订单
import bookAreaReport from '@/pages/report/areaReport/bookAreaReport.vue' // 按学校汇总杂志订单
import spypAreaReport from '@/pages/report/areaReport/spypAreaReport.vue' // 按学校汇总杂志订单
import schoolReport from '@/pages/report/schoolReport/schoolReport.vue' // 按学校汇总杂志订单
import userManage from '@/pages/system/userManage/userManage.vue' // 用户管理
import checkChild from '@/pages/system/userManage/checkChild/checkChild.vue' // 用户管理
import childManage from '@/pages/system/childManage/childManage.vue' // 孩子管理
import updateChildManage from '@/pages/system/childManage/updateChild/updateChild.vue' // 修改孩子
import freeBookReport from '@/pages/report/freeBookReport/freeBookReport.vue' // 赠书报表

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: '登录',
    component: login
  }, {
    path: '/',
    name: '首页',
    component: main,
    children: [{
      path: '/journalManage',
      name: '杂志管理',
      component: journalManage,
      meta: {
        keepAlive: false
      }
    }, {
      path: '/addNewJournal',
      name: '添加杂志',
      component: addNewJournal
    }, {
      path: '/updataJournal',
      name: '修改杂志',
      component: updataJournal
    }, {
      path: '/upLoadJournal',
      name: '上传图片',
      component: upLoadJournal
    }, {
      path: '/upLoadImages',
      name: '批量上传封面图',
      component: upLoadImages
    }, {
      path: '/imagesList',
      name: '图片列表',
      component: imagesList
    }, {
      path: '/catalogue',
      name: '目录表单',
      component: catalogue
    }, {
      path: '/updateCatalogue',
      name: '修改目录',
      component: updateCatalogue
    }, {
      path: '/addCatalogue',
      name: '新增目录',
      component: addCatalogue
    }, {
      path: '/QRenerat',
      name: '批量生成二维码',
      component: QRenerat
    }, {
      path: '/QRlist',
      name: '条码管理',
      component: QRlist
    }, {
      path: '/account',
      name: '账号设置',
      component: account
    }, {
      path: '/addAccount',
      name: '创建账号',
      component: addAccount
    }, {
      path: '/updateAccount',
      name: '修改账号',
      component: updateAccount
    }, {
      path: '/bindSchool',
      name: '绑定学校',
      component: bindSchool
    }, {
      path: '/bindSchoolList',
      name: '查看绑定学校',
      component: bindSchoolList
    }, {
      path: '/organiza',
      name: '商家组织',
      component: organiza
    }, {
      path: '/addOrganiza',
      name: '添加商家组织',
      component: addOrganiza
    }, {
      path: '/updateOrganiza',
      name: '修改商家组织',
      component: updateOrganiza
    }, {
      path: '/setAge',
      name: '年龄设置',
      component: setAge
    }, {
      path: '/addAge',
      name: '添加年龄',
      component: addAge
    }, {
      path: '/upDateAge',
      name: '修改年龄',
      component: upDateAge
    }, {
      path: '/classify',
      name: '分类设置',
      component: classify
    }, {
      path: '/addClassify',
      name: '添加分类',
      component: addClassify
    }, {
      path: '/updateClassify',
      name: '修改分类',
      component: updateClassify
    }, {
      path: '/permission',
      name: '角色权限',
      component: permission
    }, {
      path: '/permissionList',
      name: '绑定角色权限',
      component: permissionList
    }, {
      path: '/orderList',
      name: '用户订单',
      component: orderList
    }, {
      path: '/orderInfoUpdate',
      name: '用户订单修改',
      component: orderInfo
    }, {
      path: '/orderInfo',
      name: '用户订单查看',
      component: orderInfo
    }, {
      path: '/delive',
      name: '发货',
      component: delive
    }, {
      path: '/flowed',
      name: '流程',
      component: flowed
    }, {
      path: '/updateOrder',
      name: '修改商品',
      component: updateOrder
    }, {
      path: '/updateAddress',
      name: '修改地址',
      component: updateAddress
    }, {
      path: '/updateChild',
      name: '修改孩子',
      component: updateChild
    }, {
      path: '/schoolList',
      name: '学校管理',
      component: schoolList
    }, {
      path: '/addSchool',
      name: '添加学校',
      component: addSchool
    }, {
      path: '/updateSchool',
      name: '修改学校',
      component: updateSchool
    }, {
      path: '/changePassword',
      name: '修改密码',
      component: changePassword
    }, {
      path: '/checkAccount',
      name: '查看绑定学校商家',
      component: checkAccount
    }, {
      path: '/checkCatalogue',
      name: '查看目录',
      component: checkCatalogue
    }, {
      path: '/magaReport',
      name: '杂志销售统计',
      component: magaReport
    }, {
      path: '/offlineReport',
      name: '线下刊物征订汇总',
      component: offlineReport
    }, {
      path: '/onLineReport',
      name: '线上刊物征订汇总',
      component: onLineReport
    }, {
      path: '/schoolReport',
      name: '按学校汇总杂志订单',
      component: schoolReport
    }, {
      path: '/magaAreaReport',
      name: '杂志地区对账',
      component: magaAreaReport
    }, {
      path: '/bookAreaReport',
      name: '图书地区对账',
      component: bookAreaReport
    }, {
      path: '/spypAreaReport',
      name: '电子读物地区对账',
      component: spypAreaReport
    }, {
      path: '/userManage',
      name: '用户管理',
      component: userManage
    }, {
      path: '/checkChild',
      name: '查看孩子',
      component: checkChild
    }, {
      path: '/childManage',
      name: '孩子管理',
      component: childManage
    }, {
      path: '/updateChildManage',
      name: '修改孩子信息',
      component: updateChildManage
    }, {
      path: '/freeBookReport',
      name: '图书赠送统计报表导出',
      component: freeBookReport
    }]
  }]
})
