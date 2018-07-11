import Vue from 'vue'
import Router from 'vue-router'

import main from '@/pages/main/main.vue' // 首页
import login from '@/pages/login/login.vue' // 登录
import journalManage from '@/pages/journalManage/journalManage.vue' // 杂志列表页
import addNewJournal from '@/pages/journalManage/addNew/addNew.vue' // 杂志添加页
import updataJournal from '@/pages/journalManage/updata/updata.vue' // 杂志修改页
import upLoadJournal from '@/pages/journalManage/upLoad/upLoad.vue' // 杂志传图片
import account from '@/pages/system/account/account.vue' // 账号列表页
import addAccount from '@/pages/system/account/addAccount/addAccount.vue' // 添加账号页面
import updateAccount from '@/pages/system/account/updateAccount/updateAccount.vue' // 修改账号页面
import organiza from '@/pages/system/organiza/organiza.vue' // 商家组织列表
import addOrganiza from '@/pages/system/organiza/addOrganiza/addOrganiza.vue' // 添加商家组织

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
      path: '/bookJournal',
      name: '杂志目录管理'
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
    }]
  }]
})
