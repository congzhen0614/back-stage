<template>
  <div class="system-account">
    <header class="header" style="height: auto">
      <el-row :gutter="40">
        <el-col :span="4"><el-input v-model="search.name" placeholder="请输入名称筛选"></el-input></el-col>
        <el-col :span="4">
          <el-select v-model="search.type" placeholder="请选择类别">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary">检索</el-button>
          <el-button type="primary" @click="clickAddnew" v-if="havePermission(6)">添加</el-button>
        </el-col>
      </el-row>
    </header>
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="120" label="排序"></el-table-column>
      <el-table-column prop="groupName" label="所属组织"></el-table-column>
      <el-table-column prop="username" label="用户名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="realname" label="真实姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="roleName" label="角色" show-overflow-tooltip></el-table-column>
      <el-table-column prop="adminAccountStatus" label="账号状态" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <!--<el-button type="text" size="small" @click="clickUpdate(scope.row)">查看绑定学校</el-button>-->
          <el-button type="text" size="small" @click="clickUpdate(scope.row)" v-if="havePermission(7)">修改</el-button>
          <el-button type="text" size="small" @click="clickReset(scope.row)">重置密码</el-button>
          <el-button type="text" size="small" @click="clickAstatus(scope.row)">{{ scope.row.adminAccountStatusDesc | accountStatus }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.currentPage"
      :page-size="pages.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="password" label-width="80px">
        <el-form-item label="新密码:">
          <el-input v-model="password.newPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickCancel">取 消</el-button>
      <el-button type="primary" @click="clickConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'system-account',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 265 + 'px',
      dialogVisible: false,
      password: {
        newPassword: ''
      },
      search: {},
      options: [],
      tableList: [],
      pages: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  created () {
  },
  mounted () {
    this.loadData()
  },
  computed: {
    params () {
      let data = {
        pageNum: this.pages.currentPage,
        pageSize: this.pages.pageSize
      }
      return data
    }
  },
  methods: {
    loadData () {
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
    handleSelectionChange () {},
    handleCurrentChange (size) {
      this.pages.total = size
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
    clickUpdate (item) {
      this.$router.push({
        path: '/updateAccount',
        query: {
          param: JSON.stringify(item)
        }
      })
    },
    clickReset (item) {
      this.dialogVisible = true
      this.password.changePassId = item.id
    },
    clickCancel () {
      this.dialogVisible = false
      this.password.newPassword = ''
    },
    clickConfirm () {
      this.dialogVisible = false
      this.resetPassword()
    },
    resetPassword () {
      let param = {
        id: this.password.changePassId,
        now: this.password.newPassword
      }
      this.$axios.accountUpdatepsw(param).then(res => {
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
    }
  },
  watch: {}
}
</script>

<style>
  .system-account .header {
    background-color: #F2F6FC;
    padding: 20px;
  }
  .system-account .el-select {
    width: 100%;
  }
</style>
