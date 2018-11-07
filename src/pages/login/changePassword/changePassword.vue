<template>
  <div class="change-pssword">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="原始密码:" prop="old">
        <el-input v-model="form.old"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="now">
        <el-input v-model="form.now"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="repeat">
        <el-input v-model="form.repeat"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="onSubmit">保存提交</el-button>
        <el-button size="mini" @click="goBack">取消</el-button>
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
      rules: {
        old: [
          {required: true, message: '请输入原始密码', trigger: 'blur'}
        ],
        now: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 6, message: '密码长度最小为6', trigger: 'blur'}
        ],
        repeat: [
          {required: true, message: '请输入确认密码', trigger: 'blur'}
        ]
      },
      form: {
        repeat: ''
      }
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
          console.log(res.data.code)
          this.$message.success('操作成功')
          this.$router.push({
            path: '/login'
          })
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
