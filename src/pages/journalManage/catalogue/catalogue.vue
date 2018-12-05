<template>
  <div class="journal-Manage-catalogue">
    <el-header class="journal-Manage-header" style="height: auto">
      <el-form ref="form" :model="search" label-width="70px" size="mini">
        <el-row>
          <el-col :span="6">
            <el-form-item label="名称:" label-width="40px">
              <el-input v-model="search.title" placeholder="请输入" @keyup.enter.native="clickSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="征订状态:">
              <el-select v-model="search.sub">
                <el-option label="全部" :value="''"></el-option>
                <el-option label="开启" value="1"></el-option>
                <el-option label="关闭" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生成条码:">
              <el-select v-model="search.has">
                <el-option label="全部" :value="''"></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建人:" label-width="60px">
              <el-select v-model="search.createUser">
                <el-option label="全部" :value="''"></el-option>
                <el-option :label="item.username" :value="item.id" v-for="item in accountList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="float: right">
          <el-button size="mini" type="primary" plain @click="clickSearch">检索</el-button>
        </div>
        <div class="header-button">
          <el-button size="mini" type="primary" @click="onAdd" v-if="havePermission('itempack:save')">添加</el-button>
          <el-button size="mini" type="primary" @click="onSubmit" v-if="havePermission('itempack:submit')">提交审核</el-button>
          <el-button size="mini" type="primary" @click="onCheck(2)" v-if="havePermission('itempack:check')">审核通过</el-button>
          <el-button size="mini" type="primary" @click="onCheck(3)" v-if="havePermission('itempack:check')">审核不通过</el-button>
          <el-button size="mini" type="primary" @click="onCreate" v-if="havePermission('itempack:qrcode')" :class="{haveQr: haveQr}">批量生成</el-button>
          <el-button size="mini" type="primary" @click="onStar" v-if="havePermission('itempack:updatesub')">批量开启</el-button>
          <el-button size="mini" type="primary" @click="onStop(false)" v-if="havePermission('itempack:updatesub')">批量关闭</el-button>
        </div>
      </el-form>
    </el-header>
    <el-table
      border
      size="mini"
      ref="multipleTable"
      :data="tableList"
      style="width: 100%"
      :height="windowHeight"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" ></el-table-column>
      <el-table-column prop="title" label="名称" min-width="150"></el-table-column>
      <el-table-column prop="itemQuantity" label="商品数" width="80" ></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="170" >
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="修改时间" width="200" >
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createUserName" label="创建人" width="150" ></el-table-column>
      <el-table-column prop="qrimg" label="是否生成条码" width="150" >
        <template slot-scope="scope">
          <span>{{ scope.row.has === 0 ? '否' : '是' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkStatus" label="审核状态" width="150" >
        <template slot-scope="scope">
          <span>{{ scope.row.checkStatus | checkType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sub" label="征订状态" width="150" >
        <template slot-scope="scope">
          <span>{{ scope.row.sub | subType }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" >
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="onChecke(scope.row)">查看</el-button>
          <el-button type="text" size="mini" @click="onUpdate(scope.row)" v-if="havePermission('itempack:update')">修改</el-button>
          <el-button type="text" size="mini" @click="onDelete(scope.row)" v-if="havePermission('itempack:del')">删除</el-button>
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
import pages from '@/store/pages/cataloguePages.js'
export default {
  name: 'journal-Manage-catalogue',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 170 + 'px',
      haveQr: false,
      options: [],
      seleteIds: [],
      seleteItems: [],
      accountList: [],
      tableList: [],
      search: {
        sub: pages.pages.sub || '',
        has: pages.pages.has || '',
        title: pages.pages.title || '',
        createUser: pages.pages.createUser || ''
      },
      pages: {
        total: 0,
        pageNum: pages.pages.pageNum || 1,
        pageSize: pages.pages.pageSize || 20
      }
    }
  },
  mounted () {
    this.loadAdmingroupList()
    this.loadDate()
  },
  computed: {
    listParams () {
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
        sub: this.search.sub,
        has: this.search.has,
        title: Trim(this.search.title),
        createUser: this.search.createUser
      }
      return param
    }
  },
  methods: {
    clickSearch () {
      pages.pages.sub = this.search.sub
      pages.pages.has = this.search.has
      pages.pages.title = this.search.title
      pages.pages.createUser = this.search.createUser
      this.loadDate()
    },
    loadAdmingroupList () {
      this.$axios.accountListCandidate({groupId: '', level: '', type: ''}).then(res => {
        if (res.data.code === '0') {
          this.accountList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleSelectionChange (val) { // 选中返回数据
      let ids = []
      let items = []
      this.haveQr = false
      val.forEach(item => {
        ids.push(item.id)
      })
      val.forEach(item => {
        if (item.has === 1) this.haveQr = true
        items.push({
          id: item.id,
          name: item.title
        })
      })
      this.seleteIds = ids
      this.seleteItems = items
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
    loadDate () {
      this.$axios.itempackList(this.listParams).then(res => {
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
    onAdd () {
      this.$router.push({
        path: '/addCatalogue'
      })
    },
    onSubmit () {
      this.$axios.itempackSubmit({ids: this.seleteIds}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.loadDate()
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onCheck (checkStatus) {
      this.$axios.itempackCheck({checkStatus: checkStatus, ids: this.seleteIds}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.loadDate()
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onCreate () {
      if (this.seleteIds.length === 0) {
        this.$message.warning('请选择书单!')
      } else {
        if (!this.haveQr) {
          this.$axios.itempackUpdateQrcode({ids: this.seleteIds}).then(res => {
            if (res.data.code === '0') {
              this.$message.success('操作成功')
              this.$router.push({
                path: '/QRlist'
              })
              this.loadDate()
            } else {
              this.$message.error(res.data.msg)
            }
          }, err => {
            this.$message.error(err)
          }).catch(err => {
            this.$message.error(err)
          })
        }
      }
      // this.$router.push({
      //   path: '/QRenerat',
      //   query: {
      //     items: JSON.stringify(this.seleteItems)
      //   }
      // })
    },
    onStar () {
      if (this.seleteIds.length === 0) {
        this.$message.warning('请选择书单')
      } else {
        let param = {
          sub: 1,
          ids: this.seleteIds
        }
        this.$axios.itempackUpdatesub(param).then(res => {
          if (res.data.code === '0') {
            this.$message.success('操作成功!')
            this.loadDate()
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
    onStop (isUpdate) {
      if (this.seleteIds.length === 0) {
        this.$message.warning('请选择书单')
      } else {
        let param = {
          sub: 0,
          ids: this.seleteIds
        }
        this.$axios.itempackUpdatesub(param).then(res => {
          if (res.data.code === '0') {
            if (!isUpdate) {
              this.$message.success('操作成功!')
              this.loadDate()
            }
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
    onChecke (item) {
      this.$router.push({
        path: '/checkCatalogue',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    onUpdate (item) {
      if (item.sub === 1) {
        this.$confirm('修改表单需要关闭征订状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.seleteIds = [item.id]
          this.onStop(true)
          this.$router.push({
            path: '/updateCatalogue',
            query: {
              item: JSON.stringify(item),
              update: true
            }
          })
        })
      } else {
        this.$router.push({
          path: '/updateCatalogue',
          query: {
            item: JSON.stringify(item),
            update: true
          }
        })
      }
    },
    onDelete (item) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.itempackDel({ids: [item.id]}).then(res => {
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
    }
  },
  watch: {}
}
</script>

<style>
  .journal-Manage-catalogue header {
    padding: 10px;
    background-color: #F2F6FC;
  }
  .journal-Manage-catalogue .haveQr {
    color: #ffffff;
    border-color: #dedede;
    background-color: #dedede;
  }
  .journal-Manage-catalogue .el-select {
    width: 100%;
  }
</style>
