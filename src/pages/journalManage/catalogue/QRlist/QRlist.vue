<template>
  <div class="journal-Manage-catalogue-QRlist">
    <header class="header" style="height: auto">
      <el-row>
        <el-col :span="4">
          <el-input v-model="search.title" placeholder="请输入名称" size="mini" @keyup.enter.native="clickSearch"></el-input>
        </el-col>
        <el-col :span="20">
          <el-button type="primary" size="mini" plain @click="clickSearch" style="margin-left: 10px">检索</el-button>
          <el-button type="primary" size="mini" @click="clickDelete" v-if="havePermission('itempack:delqrcode')">批量删除</el-button>
          <el-button type="primary" size="mini" @click="clickUpload" v-if="havePermission('itempack:download') ">批量下载</el-button>
        </el-col>
      </el-row>
    </header>
    <el-table border size="mini" :data="tableList" :height="windowHeight" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" ></el-table-column>
      <el-table-column type="index" label="序号"  width="55" ></el-table-column>
      <el-table-column prop="title" label="名称" min-width="150"></el-table-column>
      <el-table-column prop="qrurl" label="URL地址" min-width="250"></el-table-column>
      <el-table-column prop="remark" label="备注"  width="250"></el-table-column>
      <el-table-column prop="qrimg" label="二维码"  width="80">
        <template slot-scope="scope">
          <!--<img :src="scope.row.qrimg" width="100%"/>-->
          <el-popover trigger="hover" placement="top">
            <img :src="scope.row.qrimg" width="100%"/>
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.qrimg" width="100%"/>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createUserName" label="创建者账号"  width="100"></el-table-column>
      <el-table-column prop="roleName" label="审核状态"  width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.checkStatus | checkType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="征订状态"  width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.sub | subType }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作"  width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="uploadLogo(scope.row)" v-if="scope.row.qrlogo === '' || havePermission('itempack:qrcodelogo')">上传/修改logo</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pages.pageNum"
      :page-size="pages.pageSize"
      :page-sizes="[20, 50, 75, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
  </div>
</template>

<script>
import pages from '@/store/pages/qrPages.js'
export default {
  name: 'journal-Manage-catalogue-QRlist',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 122 + 'px',
      tableList: [],
      selectIds: [],
      search: {
        title: pages.pages.title || ''
      },
      pages: {
        total: 0,
        pageNum: pages.pages.pageNum || 1,
        pageSize: pages.pages.pageSize || 20
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
        } else {
          return ''
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
    clickSearch () {
      pages.pages.title = this.search.title
      this.loadDate()
    },
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
          this.pages.pageNum = res.data.data.pageNum
          this.pages.pageSize = res.data.data.pageSize
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
      pages.pages.pageNum = val
      this.loadDate()
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      pages.pages.pageSize = val
      this.loadDate()
    },
    clickUpload () {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择条码')
      } else {
        window.location.href = location.protocol + `//qrapi.51weixiao.com/qrzd/itempack/qrcode/download/zip/open?ids=${this.selectIds.join(',')}`
      }
    },
    clickDelete () {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择条码')
      } else {
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
              this.$message.error(res.data.msg)
            }
          }, err => {
            this.$message.error(err)
          }).catch(err => {
            this.$message.error(err)
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'})
        })
      }
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
  .journal-Manage-catalogue-QRlist .el-table__body-wrapper {
    overflow: auto;
  }
</style>
