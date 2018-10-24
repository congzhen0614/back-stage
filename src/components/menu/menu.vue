<template>
  <div class="increase-menu">
    <el-menu :default-active="nowRouter" class="el-menu-vertical-demo" @select="selectMenu">
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
        <!--<el-menu-item index="/magaOrder">-->
          <!--<span slot="title">杂志订单</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="/bookOrder">-->
          <!--<span slot="title">图书订单</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="/spypOrder">-->
          <!--<span slot="title">电子包订单</span>-->
        <!--</el-menu-item>-->
        <el-menu-item index="/orderList" v-if="havePermission('trade:list')">
          <span slot="title">用户订单</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">报表管理</span>
        </template>
        <!--<el-menu-item index="/onLineReport">-->
          <!--<span slot="title">线上刊物征订汇总</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="/offlineReport">-->
          <!--<span slot="title">线下刊物征订汇总</span>-->
        <!--</el-menu-item>-->
        <el-menu-item index="/schoolReport">
          <span slot="title">按学校汇总杂志订单</span>
        </el-menu-item>
        <el-menu-item index="/magaReport">
          <span slot="title">杂志销售统计</span>
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
        <el-menu-item index="/userManage">
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/childManage">
          <span slot="title">孩子管理</span>
        </el-menu-item>
        <el-menu-item index="/schoolList" v-if="havePermission('school:list')">
          <span slot="title">学校管理</span>
        </el-menu-item>
      </el-submenu>
      <!--<el-submenu index="6">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-setting"></i>-->
          <!--<span slot="title">库存及物流</span>-->
        <!--</template>-->
        <!--<el-menu-item @click="noRouter" index="/">-->
          <!--<span slot="title">库存管理</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item @click="noRouter" index="/">-->
          <!--<span slot="title">物流管理</span>-->
        <!--</el-menu-item>-->
      <!--</el-submenu>-->
      <!--<el-submenu index="7">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-setting"></i>-->
          <!--<span slot="title">财务管理</span>-->
        <!--</template>-->
        <!--<el-menu-item @click="noRouter" index="/">-->
          <!--<span slot="title">线上征订结算</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item @click="noRouter" index="/">-->
          <!--<span slot="title">订单退款统计</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item @click="noRouter" index="/">-->
          <!--<span slot="title">发票申领统计</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item @click="noRouter" index="/">-->
          <!--<span slot="title">第三方支付对账</span>-->
        <!--</el-menu-item>-->
      <!--</el-submenu>-->
      <!--<el-submenu index="8">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-setting"></i>-->
          <!--<span slot="title">微校学院</span>-->
        <!--</template>-->
        <!--<el-menu-item @click="noRouter" index="/">-->
          <!--<span slot="title">帮助中心</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item @click="noRouter" index="/">-->
          <!--<span slot="title">操作问答</span>-->
        <!--</el-menu-item>-->
      <!--</el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      nowRouter: ''
    }
  },
  mounted () {
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
    },
    noRouter () {
      this.$message.error('功能待开发!')
    }
  }
}
</script>

<style>
</style>
