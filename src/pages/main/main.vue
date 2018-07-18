<template>
  <div class="increase-main">
    <el-container>
      <el-aside><v-menu @routerPush="toPages"></v-menu></el-aside>
      <el-container>
        <el-header style="height: auto; padding: 20px">
          <div class="head-button">
            <el-row>
              <span class="head-username" v-if="havePermission(6)">{{ username }}</span>
              <span class="head-username">修改密码</span>
              <span style="cursor: pointer" @click="clickLogout">退出</span>
            </el-row>
          </div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in routeList" :key="index">{{ item.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <img v-if="routeList.length === 1" :style="{'height': windowHeight}" src="../../assets/index-backgroud.jpg"/>
        <el-main  v-if="routeList.length > 1" :style="{height: windowHeight}">
          <router-view></router-view>
        </el-main>
        <el-footer>©2013－2014 浙ICP备15001306号-1, All Rights Reserved.</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menu from '@/components/menu/menu.vue'
export default {
  name: 'App',
  components: {
    'v-menu': menu
  },
  data () {
    return {
      windowHeight: window.innerHeight - 120 + 'px',
      routeList: [],
      username: JSON.parse(localStorage.getItem('user')).realname
    }
  },
  created () {
    if (!localStorage.getItem('user')) {
      this.$router.push({
        path: '/login'
      })
    }
  },
  mounted () {
    this.routeList = this.$route.meta.routeList
  },
  methods: {
    toPages (path) {
      this.$router.push({
        path: path
      })
    },
    clickLogout () {
      this.$axios.logout().then(res => {
        localStorage.clear()
        this.$router.push({
          path: '/login'
        })
      }, err => {
        this.$message.error(err)
      })
    }
  },
  watch: {
    '$route' () {
      this.routeList = this.$route.meta.routeList
    }
  }
}
</script>

<style>
  .el-footer {
    background-color: #F2F6FC;
    text-align: center;
    line-height: 60px;
  }
  .increase-menu, .el-menu {
    height: 100%;
  }
  .el-main {
    padding: 0 20px;
  }
  .head-button {
    float: right;
  }
  .head-username {
    margin-right: 20px;
  }
</style>
