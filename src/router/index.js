import Vue from 'vue'
import Router from 'vue-router'

import main from '@/pages/main/main.vue' // 首页
import login from '@/pages/login/login.vue' // 登录
import journalManage from '@/pages/journalManage/journal/journalManage.vue' // 杂志列表页
import addNewJournal from '@/pages/journalManage/journal/addNew/addNew.vue' // 杂志添加页
import updataJournal from '@/pages/journalManage/journal/updata/updata.vue' // 杂志修改页
import upLoadJournal from '@/pages/journalManage/journal/upLoad/upLoad.vue' // 杂志传图片
import imagesList from '@/pages/journalManage/journal/upLoad/imagesList.vue' // 杂志图片列表
import catalogue from '@/pages/journalManage/catalogue/catalogue.vue' // 杂志目录
import updateCatalogue from '@/pages/journalManage/catalogue/updateCatalogue/updateCatalogue.vue' // 修改杂志目录
import addCatalogue from '@/pages/journalManage/catalogue/addCatalogue/addCatalogue.vue' // 新增杂志目录
import QRenerat from '@/pages/journalManage/catalogue/QRenerat/QRenerat.vue' // 批量生成二维码
import QRlist from '@/pages/journalManage/catalogue/QRlist/QRlist.vue' // 二维码列表
import account from '@/pages/system/account/account.vue' // 账号列表页
import addAccount from '@/pages/system/account/addAccount/addAccount.vue' // 添加账号页面
import updateAccount from '@/pages/system/account/updateAccount/updateAccount.vue' // 修改账号页面
import permission from '@/pages/system/permission/permission.vue' // 角色权限
import organiza from '@/pages/system/organiza/organiza.vue' // 商家组织列表
import addOrganiza from '@/pages/system/organiza/addOrganiza/addOrganiza.vue' // 添加商家组织
import updateOrganiza from '@/pages/system/organiza/updateOrganiza/updateOrganiza.vue' // 修改商家组织
import setAge from '@/pages/journalManage/setAge/setAge.vue' // 设置年龄段
import addAge from '@/pages/journalManage/setAge/addAge/addAge.vue' // 添加年龄
import upDateAge from '@/pages/journalManage/setAge/upDateAge/upDateAge.vue' // 添加年龄
import classify from '@/pages/journalManage/classify/classify.vue' // 分类设置
import addClassify from '@/pages/journalManage/classify/addClassify/addClassify.vue' // 添加分类
import updateClassify from '@/pages/journalManage/classify/updateClassify/updateClassify.vue' // 添加分类

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/',
    name: '首页',
    component: main,
    children: [{
      path: '/journalManage',
      name: '杂志管理',
      component: journalManage
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
      path: '/imagesList',
      name: '图片列表',
      component: imagesList
    }, {
      path: '/catalogue',
      name: '杂志目录管理',
      component: catalogue
    }, {
      path: '/updateCatalogue',
      name: '修改杂志目录',
      component: updateCatalogue
    }, {
      path: '/addCatalogue',
      name: '新增杂志目录',
      component: addCatalogue
    }, {
      path: '/QRenerat',
      name: '批量生成二维码',
      component: QRenerat
    }, {
      path: '/QRlist',
      name: '二维码列表',
      component: QRlist
    }, {
      path: '/account',
      name: '账号列表',
      component: account
    }, {
      path: '/addAccount',
      name: '新增账号',
      component: addAccount
    }, {
      path: '/updateAccount',
      name: '修改账号',
      component: updateAccount
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
    }]
  }]
})
