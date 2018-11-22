<template>
  <div class="system-organiza-add">
    <div class="system-account-add">
      <el-form ref="form" :model="form" label-width="150px" :rules="rules" size="mini">
        <el-form-item label="组织名称:" prop="name">
          <el-input v-model="form.name"></el-input>
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
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">保存提交</el-button>
          <el-button size="mini" @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import rules from '@/common/rules.js'
export default {
  name: 'system-organiza-add',
  data () {
    return {
      rules: rules.organizeRules,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      form: {
        beginTime: '',
        endTime: '',
        linkman: '',
        name: '',
        phone: '',
        signer: '',
        type: 0
      }
    }
  },
  methods: {
    onSubmit () {
      if (new Date(this.form.beginTime).getTime() > new Date(this.form.endTime).getTime()) {
        this.$message.error('结束时间必须小于开始时间!')
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$axios.admingroupSave(this.form).then(res => {
              if (res.data.code === '0') {
                this.$message.success('添加成功')
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
