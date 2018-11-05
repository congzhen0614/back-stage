<template>
  <div class="check-child">
    <el-table :data="tableData" border>
      <el-table-column prop="name"         label="孩子姓名" align="center"></el-table-column>
      <el-table-column prop="provinceName" label="省份"     align="center"></el-table-column>
      <el-table-column prop="cityName"     label="城市"     align="center"></el-table-column>
      <el-table-column prop="regionName"   label="地区"     align="center"></el-table-column>
      <el-table-column prop="schoolName"   label="学校"     align="center"></el-table-column>
      <el-table-column prop="gradeName"    label="年级"     align="center"></el-table-column>
      <el-table-column label="班级"                         align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.className || scope.row.defaultClassName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="saleName" label="业务员" header-align="center"></el-table-column>
      <el-table-column prop="createdTime" label="添加日期" header-align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'check-child',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadChildById()
  },
  methods: {
    loadChildById () {
      this.$axios.findChildByUid({uid: this.$route.query.id}).then(res => {
        if (res.data.code === '0') {
          this.tableData = res.data.data
          console.log(this.tableData)
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
