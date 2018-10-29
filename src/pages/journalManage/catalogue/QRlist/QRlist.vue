<template>
  <div class="journal-Manage-catalogue-QRlist">
    <header class="header" style="height: auto">
      <el-row :gutter="40">
        <el-col :span="4">
          <el-input v-model="search.title" placeholder="请输入名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" plain @click="loadDate">检索</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-button type="primary" size="mini" @click="clickDelete" v-if="havePermission('itempack:delqrcode')">批量删除</el-button>
        <el-button type="primary" size="mini" @click="clickUpload" v-if="havePermission('itempack:download') ">批量下载</el-button>
      </el-row>
    </header>
    <el-table border :data="tableList" :height="windowHeight" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column type="index" label="序号" align="center" width="55" ></el-table-column>
      <el-table-column prop="title" label="名称" align="center"></el-table-column>
      <el-table-column prop="qrurl" label="URL地址" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center" width="250"></el-table-column>
      <el-table-column prop="qrimg" label="二维码" align="center" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.qrimg" width="100%"/>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="审核状态" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.checkStatus | checkType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="征订状态" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.sub | subType }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="uploadLogo(scope.row)" v-if="scope.row.qrlogo === '' || havePermission('itempack:qrcodelogo')">上传/修改logo</el-button>
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
  name: 'journal-Manage-catalogue-QRlist',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 184 + 'px',
      tableList: [],
      selectIds: [],
      search: {},
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  created () {
    this.loadDate()
  },
  computed: {
    loadParams () {
      let Trim = str => {
        if (str !== '') {
          return str.replace(/(^\s*)|(\s*$)/g, '')
        }
      }
      let param = {
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        title: Trim(this.search.title),
        has: 1
      }
      return param
    }
  },
  methods: {
    handleSelectionChange (val) {
      let ids = []
      val.forEach(item => { ids.push(item.id) })
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
      window.location.href = location.protocol + `//qrapi.51weixiao.com/qrzd/itempack/qrcode/download/zip/open?ids=${this.selectIds.join(',')}`
    },
    clickDelete () {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.updateQrcode({ids: this.selectIds}).then(res => {
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
        this.$message({type: 'info', message: '已取消删除'})
      })
    },
    uploadLogo (item) {
      this.$router.push({
        path: '/QRenerat',
        query: {
          items: JSON.stringify([{id: item.id, name: item.title}])
        }
      })
    }
  }
}
</script>

<style>
  .journal-Manage-catalogue-QRlist header {
    padding: 10px;
    background-color: #F2F6FC;
  }
</style>
