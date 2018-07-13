<template>
  <div class="system-organiza-add">
    <div class="system-account-add">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="组织名称:">
          <el-input v-model="form.name" prop="name"></el-input>
        </el-form-item>
        <el-form-item label="组织形式:">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">个人</el-radio>
            <el-radio :label="2">组织</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合同时间:">
          <el-date-picker v-model="form.contractTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="合同签署:">
          <el-input v-model="form.signer"></el-input>
        </el-form-item>
        <el-form-item label="联系人:">
          <el-input v-model="form.linkman"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'system-organiza-add',
  components: {},
  data () {
    return {
      form: this.$route.query
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    onSubmit () {
      this.$axios.admingroupUpdate(this.form).then(res => {
        if (res.data.code === '0') {
          this.$message.success('修改成功')
          this.$router.push({
            path: '/organiza'
          })
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
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
  .system-organiza-add .el-select {
    width: 100%;
  }
  .system-organiza-add .el-form {
    width: 500px;
  }
</style>
