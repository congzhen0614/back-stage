<template>
  <div class="system-account">
    <header class="header" style="height: auto">
      <el-row :gutter="40">
        <el-col :span="4"><el-input v-model="search.name" placeholder="请输入名称筛选"></el-input></el-col>
        <el-col :span="8">
          <el-button size="mini" type="primary" @click="loadData">检索</el-button>
          <el-button size="mini" type="primary" @click="clickAddnew" v-if="havePermission('account:add')">添加</el-button>
        </el-col>
      </el-row>
    </header>
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border>
      <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
      <el-table-column prop="groupName" label="所属组织" header-align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center" width="150"></el-table-column>
      <el-table-column prop="realname" label="真实姓名" align="center" width="150"></el-table-column>
      <el-table-column prop="roleName" label="角色" align="center" width="150"></el-table-column>
      <el-table-column prop="adminAccountStatusDesc" label="账号状态" align="center" width="120"></el-table-column>
      <el-table-column label="创建时间" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="checkBind(scope.row)" v-if="havePermission('school:findByAdmin')">查看绑定学校</el-button>
          <el-button type="text" size="mini" @click="clickBind(scope.row)" v-if="havePermission('school:bind')">绑定学校</el-button>
          <el-button type="text" size="mini" @click="clickUpdate(scope.row)" v-if="havePermission('account:update')">修改</el-button>
          <el-button type="text" size="mini" @click="resetPassword(scope.row)" v-if="havePermission('account:reset')">重置密码</el-button>
          <el-button type="text" size="mini" @click="clickAstatus(scope.row)" v-if="havePermission('account:disable')">{{ scope.row.adminAccountStatusDesc | accountStatus }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.pageNum"
      :page-size="pages.pageSize"
      :page-sizes="[20, 50, 75, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'system-account',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 149 + 'px',
      search: {
        name: ''
      },
      options: [],
      tableList: [],
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  mounted () {
    this.loadData()
  },
  computed: {
    params () {
      let data = {
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        key: this.search.name
      }
      return data
    }
  },
  methods: {
    Trim (str) {
      if (str !== '') {
        return str.replace(/(^\s*)|(\s*$)/g, '')
      }
    },
    loadData () {
      this.params.key = this.Trim(this.params.key)
      this.$axios.accountList(this.params).then(res => {
        this.tableList = res.data.data.list
        this.pages.total = res.data.data.total
        this.pages.currentPage = res.data.data.pageNum
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleCurrentChange (size) {
      this.pages.pageNum = size
      this.loadData()
    },
    handleSizeChange (size) {
      this.pages.pageSize = size
      this.loadData()
    },
    clickAddnew () {
      this.$router.push({
        path: '/addAccount'
      })
    },
    clickBind (item) {
      this.$router.push({
        path: '/bindSchool',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    clickUpdate (item) {
      this.$router.push({
        path: '/updateAccount',
        query: {
          param: JSON.stringify(item)
        }
      })
    },
    clickCancel () {
      this.dialogVisible = false
      this.password.newPassword = ''
    },
    resetPassword (item) {
      this.$axios.accountUpdatepswReset({id: item.id}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.password.newPassword = ''
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    clickAstatus (item) {
      console.log(item)
      let param = {
        id: item.id,
        adminAccountStatus: item.adminAccountStatusDesc === '正常' ? 2 : 1
      }
      this.$axios.accountUpdateastatus(param).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.loadData()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    checkBind (item) {
      this.$router.push({
        path: '/bindSchoolList',
        query: {
          adminId: item.id,
          username: item.username,
          provinceId: item.provinceId,
          citys: JSON.stringify(item.citys),
          regions: JSON.stringify(item.regions)
        }
      })
    }
  },
  watch: {}
}
</script>

<style>
  .system-account .header {
    background-color: #F2F6FC;
    padding: 10px;
  }
  .system-account .el-select {
    width: 100%;
  }
</style>
