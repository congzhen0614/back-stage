<template>
  <div class="system-organiza">
    <header class="header" style="height: auto">
      <el-button size="mini" type="primary" @click="clickAddnew" v-if="havePermission('adminGroup:add')">添加</el-button>
  </header>
    <el-main>
      <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border>
        <el-table-column type="index"        label="序号"               width="55"></el-table-column>
        <el-table-column prop="name"         label="组织名称" sortable  min-width="200"          ></el-table-column>
        <el-table-column prop="typeName"     label="组织形式"           width="200"></el-table-column>
        <el-table-column prop="linkman"      label="联系人"             width="200"></el-table-column>
        <el-table-column prop="phone"        label="联系电话"           width="200"></el-table-column>
        <el-table-column prop="contractTime" label="创建时间" sortable  width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.contractTime | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right"       label="操作"               width="150">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="clickChecke(scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="clickUpdate(scope.row)" v-if="havePermission('adminGroup:update')">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
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
import pages from '@/store/pages/organizaPages.js'
export default {
  name: 'system-organiza',
  data () {
    return {
      windowHeight: window.innerHeight - 128 + 'px',
      tableList: [],
      pages: {
        total: 0,
        pageNum: pages.pageNum,
        pageSize: pages.pageSize
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
        pageNum: this.pages.pageNum,
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
          this.pages.pageNum = pages.pageNum
          this.pages.pageSize = pages.pageSize
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
        path: '/addOrganiza'
      })
    },
    clickChecke (item) {
      item.update = false
      this.$router.push({
        path: '/updateOrganiza',
        query: item
      })
    },
    clickUpdate (item) {
      item.update = true
      this.$router.push({
        path: '/updateOrganiza',
        query: item
      })
    },
    clickAstatus (item) {
      let param = {
        id: item.id,
        adminAccountStatus: item.adminAccountStatus === '正常' ? 2 : 1
      }
      this.$axios.admingroupUpdateastatus(param).then(res => {
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
    }
  },
  watch: {}
}
</script>

<style>
  .system-organiza header {
    padding: 10px;
    background-color: #F2F6FC;
  }
  .system-organiza .el-main {
    padding: 0;
  }
</style>
