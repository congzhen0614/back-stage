<template>
  <div class="journal-Manage-catalogue-QRlist">
    <header class="header" style="height: auto">
      <el-row :gutter="40">
        <el-col :span="4"><el-input v-model="search.title" placeholder="请输入名称"></el-input></el-col>
        <el-col :span="4">
          <el-button type="primary" plain @click="loadDate">检索</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-button type="primary" @click="clickDelete">批量删除</el-button>
        <el-button type="primary" @click="clickUpload">批量下载</el-button>
      </el-row>
    </header>
    <el-table
      border
      style="width: 100%"
      :height="windowHeight"
      ref="multipleTable"
      tooltip-effect="dark"
      :data="tableList"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="55" label="序号"></el-table-column>
      <el-table-column prop="title" label="名称"></el-table-column>
      <el-table-column prop="qrimg" label="二维码" width="100px">
        <template slot-scope="scope">
          <img :src="scope.row.qrimg" width="100%"/>
        </template>
      </el-table-column>
      <el-table-column prop="qrurl" label="URL地址"></el-table-column>
      <el-table-column prop="roleName" label="审核状态">
        <template slot-scope="scope">
          <span>{{ scope.row.checkStatus | checkType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="征订状态">
        <template slot-scope="scope">
          <span>{{ scope.row.sub | subType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="uploadLogo(scope.row)" v-if="scope.row.qrlogo === ''">上传logo</el-button>
          <el-button type="text" size="small" @click="uploadLogo(scope.row)" v-if="scope.row.qrlogo !== ''">修改logo</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.pageNum"
      :page-size="pages.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'journal-Manage-catalogue-QRlist',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 320 + 'px',
      search: {},
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      tableList: [],
      selectIds: []
    }
  },
  created () {
  },
  mounted () {
    this.loadDate()
  },
  computed: {
    loadParams () {
      let param = {
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        title: this.search.title,
        has: 1
      }
      return param
    }
  },
  methods: {
    handleSelectionChange (val) {
      let ids = []
      val.forEach(item => {
        ids.push(item.id)
      })
      this.selectIds = ids
    },
    loadDate () {
      this.$axios.itempackList(this.loadParams).then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data.list
          this.pages.total = res.data.data.total
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
      this.loadDate()
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.loadDate()
    },
    clickUpload () {
      window.location.href = location.protocol + `//192.168.0.230:8081/qrzd/itempack/qrcode/download/zip/open?ids=${this.selectIds.join(',')}`
    },
    clickDelete () {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.itempackDel({ids: this.selectIds}).then(res => {
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
    uploadLogo (item) {
      console.log(item)
      this.$router.push({
        path: '/QRenerat',
        query: {
          items: JSON.stringify([{id: item.id, name: item.title}])
        }
      })
    }
  },
  watch: {}
}
</script>

<style>
  .journal-Manage-catalogue-QRlist header {
    padding: 20px;
    background-color: #F2F6FC;
  }
</style>
