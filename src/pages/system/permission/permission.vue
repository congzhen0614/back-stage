<template>
  <div class="system-permission">
    <el-table size="mini" ref="multipleTable" :data="tableList" tooltip-effect="dark" border>
      <el-table-column type="index" width="50" label="序号" ></el-table-column>
      <el-table-column prop="rolename" label="角色名称" ></el-table-column>
      <el-table-column prop="intro" label="角色描述" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100" >
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="bindPermission(scope.row)" v-if="havePermission('rolePermission:add')">绑定权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'system-permission',
  components: {},
  data () {
    return {
      tableList: []
    }
  },
  mounted () {
    this.roleCandidate()
  },
  methods: {
    roleCandidate () {
      this.$axios.roleCandidate().then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    bindPermission (item) {
      this.$router.push({
        path: '/permissionList',
        query: {
          id: item.id
        }
      })
    }
  },
  watch: {}
}
</script>

<style>
  .system-permission .el-checkbox.el-checkbox {
    width: 200px;
    margin-left: 30px;
  }
</style>
