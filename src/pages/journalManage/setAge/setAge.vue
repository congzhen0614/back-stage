<template>
  <div class="system-setage">
    <header>
      <el-row>
        <el-col :span="4">
          <el-input v-model="search.name" placeholder="请输入名称筛选" size="mini"></el-input>
        </el-col>
        <el-button size="mini" type="primary" plain @click="clickSearch" style="margin-left: 10px">检索</el-button>
        <el-button size="mini" type="primary" @click="clickAdd" v-if="havePermission('age:saveOrUpdate')">添加</el-button>
      </el-row>
    </header>
    <el-table :data="tableList" style="width: 100%" :height="windowHeight" border size="mini">
      <el-table-column prop="ord" width="80"  label="排序"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" >
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="clickUpdate(scope.row)" v-if="havePermission('age:saveOrUpdate')">修改</el-button>
          <el-button type="text" size="mini" @click="clickDelete(scope.row)" v-if="havePermission('age:delete')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
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
import pages from '@/store/pages/agePages.js'
export default {
  name: 'system-setage',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 120 + 'px',
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
      this.$axios.itemageList(this.params).then(res => {
        if (res.data.code) {
          this.tableList = res.data.data.list
          this.pages.total = res.data.data.total
          this.pages.pageNum = pages.pageNum
          this.pages.pageSize = pages.pageSize
        } else {
          this.$message.error(res.data.data.msg)
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
        path: '/upDateAge',
        query: item
      })
    },
    clickDelete (item) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.itemageDel({id: item.id}).then(res => {
          if (res.data.code === '0') {
            this.$message.success('操作成功!')
            this.loadDate()
          } else {
            this.$message.error(res.data.data.msg)
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
        path: '/addAge'
      })
    }
  },
  watch: {}
}
</script>

<style>
  .system-setage header {
    padding: 10px;
    background-color: #F2F6FC;
  }
</style>
