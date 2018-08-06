<template>
  <div class="system-classify">
    <header>
      <el-row :gutter="40">
        <el-col :span="4">
          <el-input v-model="search.name" placeholder="请输入名称筛选"></el-input>
        </el-col>
        <!--<el-col :span="4">-->
          <!--<el-select v-model="search.type" placeholder="请选择类别">-->
            <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
          <!--</el-select>-->
        <!--</el-col>-->
        <el-col :span="8">
          <el-button type="primary" plain @click="loadDate">检索</el-button>
          <el-button type="primary" @click="clickAdd">添加</el-button>
        </el-col>
      </el-row>
    </header>
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="120" label="排序"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="cls" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.cls | clsType }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="clickUpdate(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="clickDelete(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
export default {
  name: 'system-setage',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 265 + 'px',
      tableList: [],
      options: [],
      search: {
        name: ''
      },
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 10
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
      let param = {
        name: this.search.name,
        total: this.pages.total,
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize
      }
      return param
    }
  },
  methods: {
    loadDate () {
      this.$axios.itemtypeList(this.params).then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data.list
          this.pages.total = res.data.data.total
          this.pages.pageNum = res.data.data.pageNum
          this.pages.pageSize = res.data.data.pageSize
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleSelectionChange () {},
    handleCurrentChange (val) {
      this.pages.pageNum = val
      this.loadDate()
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
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
        path: '/addClassify'
      })
    }
  },
  watch: {}
}
</script>

<style>
  .system-classify header {
    padding: 20px;
    background-color: #F2F6FC;
  }
</style>
