<template>
  <div class="system-classify-add">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="姓名:">
        <el-input v-model="form.name" prop="name"></el-input>
      </el-form-item>
      <el-form-item label="排序:">
        <el-input v-model="form.ord" prop="type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import rules from '@/libs/rules.js'
export default {
  name: 'system-serAge-add',
  components: {},
  data () {
    return {
      form: {
        cls: 1,
        ord: 9999
      },
      rules: rules
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    onSubmit () {
      this.$axios.itemtypeSave(this.form).then(res => {
        if (res.data.code === '0') {
          this.$message.success('添加成功!')
          this.$router.push({
            path: '/classify'
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
      this.$router.push({
        path: '/classify'
      })
    }
  },
  watch: {}
}
</script>

<style>
  .system-serAge-add .el-form {
    width: 800px;
  }
</style>
