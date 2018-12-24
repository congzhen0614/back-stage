<template>
  <div class="increase-main">
    <el-container>
      <v-menu @routerPush="toPages"></v-menu>
      <el-container>
        <el-header style="min-height: 28px; height: auto; padding: 0; background-color: #f2f6fc;margin-bottom: 3px">
          <div class="head-button">
            <el-row>
              <span class="head-username">{{ username }}</span>
              <span class="head-username" style="cursor: pointer" @click="changePassword">修改密码</span>
              <span style="cursor: pointer" @click="clickLogout">退出</span>
            </el-row>
          </div>
          <ul class="el-tab-nav">
            <li :class="{navAct: item.path === thisPathStr}" v-for="(item, index) in routeList" :key="index" @click="toPages(item.path)">
              <span>{{ item.name }}</span>
              <i class="el-icon-close" @click.stop="clickClose(item.path)" v-if="index > 0"></i>
            </li>
            <li @click="onClickOther" v-if="routeList.length > 1">关闭其他</li>
            <li @click="onClickAll" v-if="routeList.length > 1">关闭全部</li>
          </ul>
        </el-header>
        <el-main class="main-background" v-if="thisPathStr === '/'" :style="style">
          <h2>微校网商家服务平台欢迎您,</h2>
          <h1>{{ username }}</h1>
        </el-main>
        <el-main  v-if="routeList.length > 1" :style="{height: windowHeight}">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { clearRouter } from '@/common/clearRouter.js'
import menu from '@/components/menu/menu.vue'
export default {
  name: 'App',
  components: {
    'v-menu': menu
  },
  data () {
    return {
      username: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).realname : '',
      windowHeight: window.innerHeight - 40 + 'px',
      style: {
        backgroundImage: 'url(' + require('../../assets/index-backgroud.jpg') + ')',
        height: window.innerHeight - 40 + 'px'
      },
      routeList: [],
      thisPathStr: ''
    }
  },
  created () {
    this.routeList = this.$route.meta.routeList
    let href = window.location.href
    let index = href.lastIndexOf('/')
    this.thisPathStr = '/' + href.substring(index + 1, href.length)
    if (!localStorage.getItem('user')) {
      this.$router.push({
        path: '/login'
      })
    }
  },
  methods: {
    onClickOther () {
      let router = {}
      this.$route.meta.routeList.forEach(item => {
        if (item.path === this.thisPathStr) {
          router = item
        }
      })
      this.$route.meta.routeList.length = 1
      this.$route.meta.routeList.push(router)
    },
    onClickAll () {
      this.$route.meta.routeList.length = 1
      this.$router.push({path: '/'})
    },
    toPages (path) {
      this.$router.push({
        path: path
      })
    },
    clickClose (path) {
      clearRouter(path)
      this.routeList.forEach((item, index) => {
        if (item.path === path) {
          this.routeList.splice(index, 1)
          this.$router.push({
            path: this.routeList[index - 1].path
          })
        }
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
    '$route' (val) {
      let href = window.location.href
      let index = href.lastIndexOf('/')
      this.thisPathStr = '/' + href.substring(index + 1, href.length)
      this.routeList = this.$route.meta.routeList
    }
  }
}
</script>

<style>
  .main-background {
    /*background-image: url("../../assets/index-backgroud.jpg");*/
    background-position-y: bottom;
    background-repeat: no-repeat;
    background-color: #81a5d5;
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
    margin-top: 15%;
  }
  .el-footer {
    background-color: #F2F6FC;
    text-align: center;
    height: 60px;
  }
  .increase-menu, .el-menu {
    height: 100%;
  }
  .el-main {
    padding: 0 20px;
  }
  .head-button {
    float: right;
    height: 28px;
    line-height: 22px;
    margin-right: 10px;
  }
  .head-username {
    margin-right: 20px;
  }
  .el-tab-nav {
    height: 28px;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
  }
  .el-tab-nav li {
    height: 28px;
    line-height: 27px;
    cursor: pointer;
    color: #909399;
    padding: 0 10px;
    border-radius: 5px 5px 0 0;
  }
  .el-tab-nav li i {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
  }
  .el-tab-nav li span {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
  }
  .el-tab-nav .navAct {
    background-color: #FFFFFF;
    color: #409eff;
  }
  .el-tab-nav li:hover {
    color: #409eff;
  }
</style>
