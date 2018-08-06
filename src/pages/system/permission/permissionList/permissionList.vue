<template>
  <div class="system-permission-list">
    <el-row :style="{height: windowHeight, overflow: 'auto'}">
      <el-tree :data="treeList" show-checkbox node-key="id" @check="checkChange" :default-checked-keys="checkedList" :props="defaultProps"></el-tree>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-button type="primary" @click="onSubmit">保存提交</el-button>
      <el-button @click="goBack">取消</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'system-permission-list',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 200 + 'px',
      treeList: [],
      checkedList: [],
      defaultProps: {
        children: 'list',
        label: 'name',
        value: 'id'
      }
    }
  },
  created () {
  },
  mounted () {
    this.loadPermissionList()
    this.loadRolepermissionList()
  },
  methods: {
    loadPermissionList () {
      this.$axios.permissionList({roleId: this.$route.query.id}).then(res => {
        if (res.data.code === '0') {
          this.treeList = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadRolepermissionList () {
      this.$axios.rolepermissionList({roleId: this.$route.query.id}).then(res => {
        if (res.data.code === '0') {
          res.data.data.forEach(item => {
            this.checkedList.push(item.id)
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
    checkChange (val1, val2) {
      this.checkedList = val2.checkedKeys
      val2.checkedKeys.forEach((item, index) => {
        if (item === null) {
          this.checkedList.splice(index, 1)
        }
      })
    },
    onSubmit () {
      this.$axios.rolepermissionSave({roleId: this.$route.query.id, list: this.checkedList}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.$router.go(-1)
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
  }
}
</script>

<style>
</style>
