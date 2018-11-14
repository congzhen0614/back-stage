<template>
  <div class="system-account">
    <header class="header">
      <el-form :model="search" label-width="60px">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="search.name" placeholder="请输入用户名筛选"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="roleLevel === 1">
            <el-form-item label="所属组织" prop="name">
              <el-select v-model="search.groupId" placeholder="请选择所属组织">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in groupList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="roleLevel !== 2 && roleLevel !== 5">
            <el-form-item label="账号角色" prop="name">
              <el-select v-model="search.roleLevel" placeholder="请选择账号角色">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in roleList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="账号状态" prop="name">
              <el-select v-model="search.adminAccountStatus" placeholder="请选择账号状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="禁用" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-top: 7px">
            <el-button size="mini" type="primary" @click="clickSearch" plain>检索</el-button>
            <el-button size="mini" type="primary" @click="clickAddnew" v-if="havePermission('account:add')">添加</el-button>
          </el-col>
        </el-row>
      </el-form>
    </header>
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border>
      <el-table-column type="index" width="55" label="序号" ></el-table-column>
      <el-table-column prop="groupName"              label="所属组织"  min-width="150"></el-table-column>
      <el-table-column prop="username"               label="用户名"    width="200"></el-table-column>
      <el-table-column prop="realname"               label="真实姓名"  width="200"></el-table-column>
      <el-table-column prop="roleName"               label="角色"      width="200"></el-table-column>
      <el-table-column prop="adminAccountStatusDesc" label="账号状态"  width="200"></el-table-column>
      <el-table-column label="创建时间"                                width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"                 label="操作"     width="300">
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
      :current-page.sync="pages.pageNum"
      :page-size.sync="pages.pageSize"
      :page-sizes="[20, 50, 75, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
  </div>
</template>

<script>
import role from '../../../../static/data/role.json'
import pages from '@/store/pages/accountPages.js'
export default {
  name: 'system-account',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 139 + 'px',
      roleLevel: JSON.parse(localStorage.getItem('user')).roleLevel,
      search: {
        name: pages.name,
        groupId: pages.groupId,
        roleLevel: pages.roleLevel,
        adminAccountStatus: pages.adminAccountStatus
      },
      options: [],
      tableList: [],
      groupList: [],
      pages: {
        total: 0,
        pageNum: pages.pageNum,
        pageSize: pages.pageSize
      }
    }
  },
  created () {
    console.log(pages.pageNum)
    this.loadData()
    this.loadAdmingroupList()
  },
  computed: {
    params () {
      let Trim = str => {
        if (str !== '') {
          return str.replace(/(^\s*)|(\s*$)/g, '')
        } else {
          return ''
        }
      }
      let data = {
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        key: Trim(this.search.name),
        groupId: this.search.groupId,
        roleLevel: this.search.roleLevel,
        adminAccountStatus: this.search.adminAccountStatus
      }
      return data
    },
    roleList () {
      if (this.roleLevel === 1) {
        return role.data
      } else if (this.roleLevel === 3) {
        return [{
          'id': 3,
          'name': '高级VIP用户'
        }, {
          'id': 4,
          'name': '高级用户'
        }, {
          'id': 5,
          'name': '普通用户'
        }]
      } else if (this.roleLevel === 4) {
        return [{
          'id': 4,
          'name': '高级用户'
        }, {
          'id': 5,
          'name': '普通用户'
        }]
      } else if (this.roleLevel === 6) {
        return [{
          'id': 6,
          'name': '个人高级用户'
        }, {
          'id': 5,
          'name': '普通用户'
        }]
      }
    }
  },
  methods: {
    clickSearch () {
      pages.name = this.search.name
      pages.groupId = this.search.groupId
      pages.roleLevel = this.search.roleLevel
      pages.adminAccountStatus = this.search.adminAccountStatus
      this.loadData()
    },
    loadData () {
      this.$axios.accountList(this.params).then(res => {
        this.tableList = res.data.data.list
        this.pages.total = res.data.data.total
        this.pages.pageNum = pages.pageNum
        this.pages.pageSize = pages.pageSize
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadAdmingroupList () {
      this.$axios.admingroupListCandidate().then(res => {
        if (res.data.code === '0') {
          this.groupList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleCurrentChange (size) {
      this.pages.pageNum = size
      pages.pageNum = size
      this.loadData()
    },
    handleSizeChange (size) {
      this.pages.pageSize = size
      pages.pageSize = size
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
          this.$message.error(res.data.msg)
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
          this.$message.error(res.data.msg)
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
  .system-account .el-form-item {
    margin-bottom: 0px;
  }
</style>
