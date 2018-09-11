<template>
  <div class="increase-main">
    <el-container>
      <el-aside style="width: 260px"><v-menu @routerPush="toPages"></v-menu></el-aside>
      <el-container>
        <el-header style="height: auto; padding: 20px">
          <div class="head-button">
            <el-row>
              <span class="head-username">{{ username }}</span>
              <span class="head-username" @click="changePassword">修改密码</span>
              <span style="cursor: pointer" @click="clickLogout">退出</span>
            </el-row>
          </div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in routeList" :key="index">{{ item.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main class="main-background" v-if="routeList.length === 1" :style="{'height': windowHeight}">
          <h2>二维码征订后台欢迎您,</h2>
          <h1>{{ username }}</h1>
        </el-main>
        <el-main  v-if="routeList.length > 1" :style="{height: windowHeight}">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
        <el-footer></el-footer>
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
      username: JSON.parse(localStorage.getItem('user')).realname ? JSON.parse(localStorage.getItem('user')).realname : ''
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
    },
    changePassword () {
      this.$router.push({
        path: '/changePassword'
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
  .main-background {
    background-image: url("../../assets/index-backgroud.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    color: #ffffff;
  }
  .main-background h1 {
    width: 650px;
    margin: 0 auto;
    font-size: 100px;
  }
  .main-background h2 {
    width: 650px;
    margin: 0 auto;
    font-size: 32px;
    margin-top: 280px;
  }
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
