<template>
  <div class="check-child">
    <el-table :data="tableData" border :height="windowHeight">
      <el-table-column prop="date" label="孩子姓名" header-align="center"></el-table-column>
      <el-table-column prop="date" label="省份" header-align="center"></el-table-column>
      <el-table-column prop="date" label="城市" header-align="center"></el-table-column>
      <el-table-column prop="date" label="地区" header-align="center"></el-table-column>
      <el-table-column prop="date" label="学校" header-align="center"></el-table-column>
      <el-table-column prop="date" label="年级" header-align="center"></el-table-column>
      <el-table-column prop="date" label="班级" header-align="center"></el-table-column>
      <el-table-column prop="date" label="业务员" header-align="center"></el-table-column>
      <el-table-column prop="date" label="添加日期" header-align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'check-child',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 120 + 'px',
      tableData: []
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
    }
  },
  watch: {}
}
</script>

<style>
</style>
