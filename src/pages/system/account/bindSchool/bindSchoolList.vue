<template>
  <div class="account-bind-school">
    <el-table :data="schoolList" border>
      <el-table-column prop="name" label="名称" show-overflow-tooltip width="300px"></el-table-column>
      <el-table-column prop="provinceName" label="省份"></el-table-column>
      <el-table-column prop="cityName" label="城市"></el-table-column>
      <el-table-column prop="regionName" label="地区"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip width="500px"></el-table-column>
      <el-table-column prop="isHighGrade" label="年级阶段">
        <template slot-scope="scope">
          <span v-if="scope.row.isHighGrade === 2">幼儿园</span>
          <span v-if="scope.row.isHighGrade === 0">小学</span>
          <span v-if="scope.row.isHighGrade === 1">初中</span>
        </template>
      </el-table-column>
      <el-table-column prop="disName" label="是否显示"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'account-bind-school',
  data () {
    return {
      schoolList: []
    }
  },
  mounted () {
    this.loadSchoolFindByAdmin()
  },
  methods: {
    loadSchoolFindByAdmin () {
      this.$axios.schoolFindByAdmin({adminId: this.$route.query.adminId}).then(res => {
        if (res.data.code === '0') {
          this.schoolList = res.data.data.list
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    }
  },
  watch: {}
}
</script>

<style>
  .account-bind-school .region .el-select {
    width: 150px;
  }
  .account-bind-school .header {
    background-color: #F2F6FC;
    padding: 20px;
  }
</style>
