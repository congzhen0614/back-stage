<template>
  <div class="login-content">
    <img class="cloud-right" src="../../assets/login/cloud-right.png"/>
    <img class="cloud-left" src="../../assets/login/cloud-left.png"/>
    <img class="sunshine" src="../../assets/login/sunshine.png"/>
    <div class="login">
      <el-card class="box-card" shadow="always">
        <span class="box-card-header">二维码征订后台</span>
        <div class="login-box">
          <span>账号</span>
          <input type="text" placeholder="请输入账号" v-model="login.username"/>
        </div>
        <div class="login-box">
          <span>密码</span>
          <input type="password" placeholder="请输入密码" v-model="login.password"/>
        </div>
        <span class="login-button" @click="clickLogin">登录</span>
      </el-card>
    </div>
    <img class="footer" src="../../assets/login/footer.png"/>
  </div>
</template>

<script>
import rules from '@/common/rules.js'
export default {
  name: 'login',
  data () {
    return {
      rules: rules,
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    clickLogin () {
      this.$axios.login(this.login).then(res => {
        if (res.data.code === '0') {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$axios.testClear()
          this.loadPermission(res.data.data.roleId)
          localStorage.setItem('user', JSON.stringify(res.data.data))
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      })
    },
    loadPermission (roleId) {
      this.$axios.rolepermissionList({roleId: roleId}).then(res => {
        if (res.data.code === '0') {
          localStorage.setItem('permission', JSON.stringify(res.data.data))
          this.$router.push({
            path: '/'
          })
        } else {
          this.$message.error(res.data.data.res)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style>
  .login-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #AEE6FF;
  }
  .cloud-right {
    float: right;
    width: 310px;
    margin-top: 20px;
    margin-right: 20px;
  }
  .cloud-left {
    width: 154px;
  }
  .sunshine {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
  }
  .footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .box-card {
    position: absolute;
    width: 420px;
    left: 50%;
    top: 50%;
    margin-left: -210px;
    margin-top: -300px;
    padding: 20px 15px;
    z-index: 9999;
  }
  .box-card-header {
    font-weight: 600;
    font-size: 24px;
    color: #333333;
  }
  .login-box {
    width: 100%;
    height: 60px;
    padding: 0 20px;
    margin-top: 20px;
    line-height: 60px;
    border-radius:10px;
    background-color: #F2F3F3;
    font-size: 14px;
    color: #333333;
  }
  .login-box input {
    background-color: #F2F3F3;
    text-align: right;
    font-size: 14px;
    color: #9A9A9A;
    width: 80%;
    outline: 0;
  }
  .login-box input::-webkit-input-placeholder {
    color: #9A9A9A;
  }
  .login-box span {
    display: block;
    float: left;
    width: 20%;
  }
  .login-button {
    display: block;
    width: 100%;
    height: 60px;
    margin-top: 20px;
    line-height: 60px;
    text-align: center;
    border-radius:10px;
    background-color: #74AFF3;
    font-size: 16px;
    color: #ffffff;
  }
  .login-content .el-card.is-always-shadow {
    box-shadow: 8px 8px 0 0 rgba(0, 0, 0, 0.2);
    border: 1px solid #9dcbe0;
  }
</style>
