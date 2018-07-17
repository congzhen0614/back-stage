<template>
  <div class="increase-menu">
    <el-menu :default-active="nowRouter" class="el-menu-vertical-demo" @select="selectMenu">
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">应用管理</span>
        </template>
        <el-menu-item index="/journalManage">
          <span slot="title">杂志管理</span>
        </el-menu-item>
        <el-menu-item index="/setAge">
          <span slot="title">年龄设置</span>
        </el-menu-item>
        <el-menu-item index="/classify">
          <span slot="title">分类设置</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">二维码订单管理</span>
        </template>
        <el-menu-item index="/catalogue">
          <span slot="title">杂志目录管理</span>
        </el-menu-item>
        <el-menu-item index="/QRlist">
          <span slot="title">二维码列表</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </template>
        <el-menu-item index="/organiza">
          <span slot="title">商家组织</span>
        </el-menu-item>
        <el-menu-item index="/account">
          <span slot="title">账号设置</span>
        </el-menu-item>
        <el-menu-item index="/permission">
          <span slot="title">角色权限</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      nowRouter: ''
    }
  },
  mounted () {
    this.getRouter()
  },
  computed: {},
  methods: {
    getRouter () {
      let href = window.location.href
      let index = href.lastIndexOf('/')
      this.nowRouter = href.substring(index, href.length)
    },
    selectMenu (val) {
      this.$emit('routerPush', val)
    }
  },
  watch: {}
}
</script>

<style>
</style>
