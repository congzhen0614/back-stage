<template>
  <div class="change-pssword">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="原始密码:">
        <el-input v-model="form.old"></el-input>
      </el-form-item>
      <el-form-item label="新密码:">
        <el-input v-model="form.now"></el-input>
      </el-form-item>
      <el-form-item label="新密码:">
        <el-input v-model="form.repeat"></el-input>
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
  name: 'change-pssword',
  components: {},
  data () {
    return {
      form: {}
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    onSubmit () {
      if (this.form.repeat !== this.form.now) {
        this.$message.error('两次密码不一致')
        return
      }
      this.$axios.accountUpdatepsw(this.form).then(res => {
        if (res.data.code === '0') {
          this.Toast.success('操作成功')
          this.$router.go(-1)
        }
      }, err => {
        console.log(err)
      }).catch(err => {
        console.log(err)
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {}
}
</script>

<style>
.change-pssword {
  width: 800px;
}
</style>
