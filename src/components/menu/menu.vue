<template>
  <div class="increase-menu">
    <el-menu :default-active="nowRouter" class="el-menu-vertical-demo" @select="selectMenu">
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">应用管理</span>
        </template>
        <el-menu-item index="/journalManage">
          <span slot="title">杂志管理</span>
        </el-menu-item>
        <el-menu-item index="/bookJournal">
          <span slot="title">杂志目录管理</span>
        </el-menu-item>
        <el-menu-item index="1-3">
          <span slot="title">杂志目录查看</span>
        </el-menu-item>
        <el-menu-item index="1-4">
          <span slot="title">年龄段设置</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </template>
        <el-menu-item index="account">
          <span slot="title">账号设置</span>
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
