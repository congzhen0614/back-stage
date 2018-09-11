<template>
  <div class="check-account">
    <el-table :data="tableList" border>
      <el-table-column prop="adminName" label="商家名称"></el-table-column>
      <el-table-column prop="groupName" label="组织名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'check-account',
  data () {
    return {
      tableList: []
    }
  },
  created () {
    this.loadSchoolAdmin()
  },
  methods: {
    loadSchoolAdmin () {
      this.$axios.schoolAdmin(this.$route.query.schoolId).then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data.adminNameAndGroupViews
          console.log(this.tableList)
        } else {
          this.$message.error(res.data.msg)
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
</style>
