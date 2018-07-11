<template>
  <div class="system-account-add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="所属组织:">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色:">
        <el-radio-group v-model="form.role">
          <el-radio-button v-for="role in roles" :label="role" :key="role"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'system-account-add',
  components: {},
  data () {
    return {
      form: {
        role: '普通用户'
      },
      roles: ['高级管理员', '管理员', '高级用户', '普通用户']
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    onSubmit () {
      console.log('立即创建')
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {}
}
</script>

<style>
  .system-account-add .el-select {
    width: 100%;
  }
  .system-account-add .el-form {
    width: 500px;
  }
</style>
