<template>
  <div class="system-classify">
    <header>
      <el-row :gutter="40">
        <el-col :span="4">
          <el-input v-model="search.name" placeholder="请输入名称筛选"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button size="mini" type="primary" plain @click="clickSearch">检索</el-button>
          <el-button size="mini" type="primary" @click="clickAdd" v-if="havePermission('itemType:add')">添加</el-button>
        </el-col>
      </el-row>
    </header>
    <el-table :data="tableList" style="width: 100%" :height="windowHeight" border>
      <el-table-column prop="ord" width="80" align="center" label="排序"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="clickUpdate(scope.row)" v-if="havePermission('itemType:update')">修改</el-button>
          <el-button type="text" size="mini" @click="clickDelete(scope.row)" v-if="havePermission('itemType:delete')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pages.currentPage"
      :page-size="pages.pageSize"
      :page-sizes="[20, 50, 75, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
  </div>
</template>

<script>
import pages from '@/store/pages/classifyPages.js'
export default {
  name: 'system-setage',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 139 + 'px',
      tableList: [],
      options: [],
      search: {
        name: pages.name
      },
      pages: {
        total: 0,
        pageNum: pages.pageNum,
        pageSize: pages.pageSize
      }
    }
  },
  created () {
  },
  mounted () {
    this.loadDate()
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
      let param = {
        name: Trim(this.search.name),
        cls: this.search.cls,
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize
      }
      return param
    }
  },
  methods: {
    clickSearch () {
      pages.name = this.search.name
      this.loadDate()
    },
    loadDate () {
      this.$axios.itemtypeList(this.params).then(res => {
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
    handleCurrentChange (val) {
      this.pages.pageNum = val
      pages.pageNum = val
      this.loadDate()
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      pages.pageSize = val
      this.loadDate()
    },
    clickUpdate (item) {
      this.$router.push({
        path: '/upDateClassify',
        query: item
      })
    },
    clickDelete (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.itemtypeDel({id: item.id}).then(res => {
          if (res.data.code === '0') {
            this.$message.success('删除成功!')
            this.loadDate()
          } else {
            this.$message.error(res.data.msg)
          }
        }, err => {
          this.$message.error(err)
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
    clickAdd () {
      this.$router.push({
        path: '/addClassify'
      })
    }
  },
  watch: {}
}
</script>

<style>
  .system-classify header {
    padding: 10px;
    background-color: #F2F6FC;
  }
</style>
