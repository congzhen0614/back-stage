<template>
  <div class="system-organiza-add">
    <div class="system-account-add">
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules" size="mini">
        <el-form-item label="组织名称:" prop="name">
          <el-input v-model="form.name" prop="name"></el-input>
        </el-form-item>
        <el-form-item label="组织形式:" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="0">个人</el-radio>
            <el-radio :label="1">组织</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合同时间:">
          <el-date-picker v-model="form.beginTime" type="date" placeholder="合同开始日期" style="width: 49%"></el-date-picker>
          <el-date-picker v-model="form.endTime" type="date" placeholder="合同结束日期" style="width: 49%"></el-date-picker>
        </el-form-item>
        <el-form-item label="合同签署:" prop="signer">
          <el-input v-model="form.signer"></el-input>
        </el-form-item>
        <el-form-item label="联系人:" prop="linkman">
          <el-input v-model="form.linkman"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <footer class="footer-button">
      <el-button size="mini" type="primary" @click="onSubmit" v-if="update">保存提交</el-button>
      <el-button size="mini" @click="goBack" v-if="update">取消</el-button>
      <el-button size="mini" @click="goBack" v-if="!update">返回</el-button>
    </footer>
  </div>
</template>

<script>
import rules from '@/common/rules.js'
export default {
  name: 'system-organiza-add',
  components: {},
  data () {
    return {
      rules: rules.organizeRules,
      update: this.$route.query.update,
      form: this.$route.query,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        }
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
      if (new Date(this.form.beginTime).getTime() > new Date(this.form.endTime).getTime()) {
        this.$message.error('结束时间必须小于开始时间!')
      } else {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$axios.admingroupUpdate(this.form).then(res => {
              if (res.data.code === '0') {
                this.$message.success('修改成功')
                this.$router.push({
                  path: '/organiza'
                })
              } else {
                this.$message.error(res.data.msg)
              }
            }, err => {
              this.$message.error(err)
            }).catch(err => {
              this.$message.error(err)
            })
          }
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {}
}
</script>

<style>
  .system-organiza-add .el-select {
    width: 100%;
  }
  .system-organiza-add .el-form {
    width: 500px;
  }
</style>
