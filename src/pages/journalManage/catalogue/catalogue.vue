<template>
  <div class="journal-Manage-catalogue">
    <el-header class="journal-Manage-header" style="height: auto">
      <el-form ref="form" :model="search" label-width="90px">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="名称:">
              <el-input v-model="search.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="征订状态:">
              <el-select v-model="search.isSale" placeholder="请选择订单状态">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="创建人:">
              <el-input v-model="search.name" placeholder="请选择征订状态"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain @click="loadDate">检索</el-button>
          </el-col>
        </el-row>
        <div class="header-button">
          <el-button type="primary" @click="onAdd">添加</el-button>
          <el-button type="primary" @click="onSubmit">提交审核</el-button>
          <el-button type="primary" @click="onSubmit">审核通过</el-button>
          <el-button type="primary" @click="onSubmit">审核不通过</el-button>
          <el-button type="primary" @click="onCreate">批量生成</el-button>
          <el-button type="primary" @click="onStar">批量开启</el-button>
          <el-button type="primary" @click="onStop">批量关闭</el-button>
        </div>
      </el-form>
    </el-header>
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="名称" width="300"></el-table-column>
      <el-table-column prop="itemQuantity" label="商品数"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createUser" label="创建人"></el-table-column>
      <el-table-column prop="qrimg" label="是否生成条码">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt === '' ? '否' : '是' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkStatus" label="审核状态">
        <template slot-scope="scope">
          <span>{{ scope.row.checkStatus | checkType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sub" label="征订状态">
        <template slot-scope="scope">
          <span>{{ scope.row.sub | subType }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onChecke(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="onUpdate(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="onDelete(scope.row)">删除</el-button>
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
  name: 'journal-Manage-catalogue',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 320 + 'px',
      search: {},
      options: [],
      seleteIds: [],
      tableList: [],
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
    this.loadDate()
  },
  computed: {
    listParams () {
      let param = {
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        sub: this.search.sub,
        title: this.search.title,
        sendType: this.search.sendType,
        schoolLevel: this.search.schoolLevel
      }
      return param
    }
  },
  methods: {
    handleSelectionChange (val) { // 选中返回数据
      let ids = []
      val.forEach(item => {
        ids.push(item.id)
      })
      this.seleteIds = ids
    },
    handleCurrentChange (val) {
      this.pages.pageNum = val
      this.loadDate()
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.loadDate()
    },
    loadDate () {
      this.$axios.itempackList(this.listParams).then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data.list
          this.pages.res.total = res.data.data.total
        } else {
          this.$message.error(res.data.data.msg)
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
      this.$axios.itempackSubmit({id: this.seleteIds}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onCreate () {
      if (this.seleteIds.length === 0) {
        this.$message.warning('请选择最少一个目录!')
        return false
      }
      this.$router.push({
        path: '/QRenerat',
        query: {
          ids: this.seleteIds
        }
      })
    },
    onStar () {
      let param = {
        sub: 0,
        ids: this.seleteIds
      }
      this.$axios.itempackUpdatesub(param).then(res => {
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
    },
    onStop () {
      let param = {
        sub: 1,
        ids: this.seleteIds
      }
      this.$axios.itempackUpdatesub(param).then(res => {
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
    },
    onChecke () {
      console.log('onChecke')
    },
    onUpdate () {
      console.log('onUpdate')
    },
    onDelete (item) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.itempackDel({id: item.id}).then(res => {
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
    }
  },
  watch: {}
}
</script>

<style>
  .journal-Manage-catalogue header {
    padding: 20px;
    background-color: #F2F6FC;
  }
</style>
