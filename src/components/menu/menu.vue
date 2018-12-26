<template>
  <div class="increase-menu">
    <el-radio-group v-model="isCollapse" size="mini">
      <el-radio-button :label="false" v-if="isCollapse">展开</el-radio-button>
      <el-radio-button :label="true" v-if="!isCollapse">收起</el-radio-button>
    </el-radio-group>
    <el-menu class="el-menu-vertical-demo" :default-active="nowRouter" :unique-opened="true" :collapse="isCollapse" @select="selectMenu">
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item index="/journalManage" v-if="havePermission('magazine:list')">
          <span slot="title">杂志管理</span>
        </el-menu-item>
        <el-menu-item index="/setAge" v-if="havePermission('age:list')">
          <span slot="title">年龄设置</span>
        </el-menu-item>
        <el-menu-item index="/classify" v-if="havePermission('itemType:list')">
          <span slot="title">分类设置</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">目录管理</span>
        </template>
        <el-menu-item index="/catalogue" v-if="havePermission('itempack:list')">
          <span slot="title">目录表单</span>
        </el-menu-item>
        <el-menu-item index="/QRlist" v-if="havePermission('itempack:list')">
          <span slot="title">条码管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item index="/orderList" v-if="havePermission('trade:list')">
          <span slot="title">用户订单</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">报表管理</span>
        </template>
        <el-menu-item index="/schoolReport">
          <span slot="title">按学校汇总杂志订单</span>
        </el-menu-item>
        <el-menu-item index="/magaAreaReport">
          <span slot="title">杂志地区对账</span>
        </el-menu-item>
        <el-menu-item index="/bookAreaReport">
          <span slot="title">图书地区对账</span>
        </el-menu-item>
        <el-menu-item index="/spypAreaReport">
          <span slot="title">电子读物地区对账</span>
        </el-menu-item>
        <el-menu-item index="/magaReport">
          <span slot="title">杂志销售统计</span>
        </el-menu-item>
        <el-menu-item index="/freeBookReport" v-if="roleLevel === 1 || roleLevel === 2">
          <span slot="title">图书赠送统计报表导出</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </template>
        <el-menu-item index="/organiza" v-if="havePermission('adminGroup:list')">
          <span slot="title">商家组织</span>
        </el-menu-item>
        <el-menu-item index="/account" v-if="havePermission('account:list')">
          <span slot="title">账号设置</span>
        </el-menu-item>
        <el-menu-item index="/permission" v-if="havePermission('rolePermission:add')">
          <span slot="title">角色权限</span>
        </el-menu-item>
        <el-menu-item index="/userManage" v-if="havePermission('user:list')">
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/childManage" v-if="havePermission('child:list')">
          <span slot="title">孩子管理</span>
        </el-menu-item>
        <el-menu-item index="/schoolList" v-if="havePermission('school:list')">
          <span slot="title">学校管理</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'increase-menu',
  data () {
    return {
      roleLevel: JSON.parse(localStorage.getItem('user')).roleLevel,
      isCollapse: false,
      nowRouter: ''
    }
  },
  mounted () {
    console.log()
    this.getRouter()
  },
  methods: {
    getRouter () {
      let href = window.location.href
      let index = href.lastIndexOf('/')
      this.nowRouter = href.substring(index, href.length)
    },
    selectMenu (val) {
      this.$emit('routerPush', val)
    }
  }
}
</script>

<style>
  .increase-menu .el-menu {
    border-right: none;
  }
  .increase-menu .el-radio-button--mini {
    margin: 6px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
