<template>
  <div class="login">
    <el-card class="box-card" shadow="always">
      <el-form :rules="rules" ref="form" :model="login" label-width="60px">
        <el-form-item label="账号:" prop="username">
          <el-input v-model="login.username" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="login.password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import rules from '@/libs/rules.js'
export default {
  name: 'login',
  components: {},
  data () {
    return {
      rules: rules,
      login: {
        username: '',
        password: ''
      }
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    clickLogin () {
      this.$axios.login(this.login).then(res => {
        if (res.data.code === '0') {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          localStorage.setItem('user', JSON.stringify(res.data.data))
          this.$router.push({
            path: '/'
          })
        } else {
          this.$message.error('账号或密码错误')
        }
      }, err => {
        this.$message.error(err)
      })
    }
  },
  watch: {}
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    margin: 0 auto;
    margin-top: 200px;
  }
</style>
