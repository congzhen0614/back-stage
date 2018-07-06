import Vue from 'vue'
import Router from 'vue-router'

import main from '@/pages/main/main.vue' // 首页
import journalManage from '@/pages/journalManage/index.vue' // 杂志列表页
import addNewJournal from '@/pages/journalManage/addNew/addNew.vue' // 杂志添加页
import updataJournal from '@/pages/journalManage/updata/updata.vue' // 杂志修改页
import upLoadJournal from '@/pages/journalManage/upLoad/upLoad.vue' // 杂志传图片

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: main,
    children: [{
      path: '/journalManage',
      name: '杂志管理',
      component: journalManage,
      children: [{
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
      }]
    }, {
      path: '/bookJournal',
      name: '杂志目录管理'
    }]
  }]
})
