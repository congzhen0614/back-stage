<template>
  <div class="system-permission">
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border>
      <el-table-column type="index" width="120" label="序号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column prop="intro" label="角色描述" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="bindPermission(scope.row)">绑定权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogTableVisible">
      <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkList">
        <el-checkbox :label="item.id" v-for="item in permission" :key="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <el-row style="margin-left: 30px; margin-top: 20px">
        <el-button type="primary" @click="clickSave">保存</el-button>
        <el-button @click="clickCancel">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'system-permission',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 140 + 'px',
      dialogTableVisible: false,
      isIndeterminate: true,
      checkAll: false,
      checkIdList: [],
      permissionIds: [],
      permission: [],
      tableList: [],
      checkList: [],
      roleId: 0
    }
  },
  created () {
  },
  mounted () {
    this.$axios.testClear()
    this.roleCandidate()
    this.loadPermissionList()
  },
  computed: {
    params () {
      let param = {
        roleId: this.roleId,
        list: this.checkIdList
      }
      return param
    }
  },
  methods: {
    roleCandidate () {
      this.$axios.roleCandidate().then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadPermissionList () {
      this.$axios.permissionList().then(res => {
        if (res.data.code === '0') {
          this.permission = res.data.data
          this.permission.forEach(item => {
            this.permissionIds.push(item.id)
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
    rolepermissionList (roleId) {
      let param = {
        roleId: roleId
      }
      this.$axios.rolepermissionList(param).then(res => {
        if (res.data.code === '0') {
          res.data.data.forEach(item => {
            this.checkList.push(item.permissionId)
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
    handleCheckAllChange (val) {
      this.checkList = val ? this.permissionIds : []
      this.isIndeterminate = false
    },
    bindPermission (item) {
      this.dialogTableVisible = true
      this.roleId = item.id
      this.checkList = []
      this.rolepermissionList(item.id)
    },
    clickSave () {
      this.$axios.rolepermissionSave(this.params).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.dialogTableVisible = false
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    clickCancel () {
      this.dialogTableVisible = false
    }
  },
  watch: {
    checkList (value) {
      if (value.length === this.permission.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
      this.checkIdList = []
      value.forEach(item => {
        this.checkIdList.push({
          id: item
        })
      })
    }
  }
}
</script>

<style>
  .system-permission .el-checkbox.el-checkbox {
    width: 200px;
    margin-left: 30px;
  }
</style>
