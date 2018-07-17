<template>
  <div class="system-organiza">
    <header class="header" style="height: auto">
      <el-button type="primary" @click="clickAddnew">添加</el-button>
      <el-button type="primary" @click="clickDelete">删除</el-button>
  </header>
    <el-main>
      <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="组织名称"></el-table-column>
        <el-table-column prop="linkman" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.contractTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="clickChecke(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="clickUpdate(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="clickAllowu(scope.row)">启用</el-button>
            <el-button type="text" size="small" @click="clickForbid(scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.currentPage"
      :page-size="pages.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'system-organiza',
  data () {
    return {
      windowHeight: window.innerHeight - 265 + 'px',
      tableList: [],
      pages: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      deleParams: {
        code: '',
        createUser: '',
        createdAt: '',
        id: '',
        name: '',
        status: '',
        updateUser: '',
        updatedAt: ''
      }
    }
  },
  created () {
  },
  mounted () {
    this.loadData()
  },
  computed: {
    listParams () {
      let param = {
        pageNum: this.pages.currentPage,
        pageSize: this.pages.pageSize
      }
      return param
    }
  },
  methods: {
    loadData () {
      this.$axios.admingroupList(this.listParams).then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data.list
          this.pages.total = res.data.data.total
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleSelectionChange () {},
    handleCurrentChange (size) {
      this.pages.currentPage = size
      this.loadData()
    },
    handleSizeChange (size) {
      this.pages.pageSize = size
      this.loadData()
    },
    clickAddnew () {
      this.$router.push({
        path: '/addOrganiza'
      })
    },
    clickDelete () {
      this.$confirm('此操作将删除该文件, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.admingroupDelete(this.deleParams).then(res => {
          if (res.data.data.code === '0') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    clickChecke (item) {
      console.log('查看')
    },
    clickUpdate (item) {
      this.$router.push({
        path: '/updateOrganiza',
        query: item
      })
    },
    clickAllowu (item) {
      console.log('启用')
    },
    clickForbid (item) {
      console.log('禁用')
    }
  },
  watch: {}
}
</script>

<style>
  .system-organiza header {
    padding: 20px;
    background-color: #F2F6FC;
  }
  .system-organiza .el-main {
    padding: 0;
  }
</style>
