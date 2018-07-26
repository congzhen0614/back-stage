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
          <el-button type="primary" @click="clickAddnew">添加</el-button>
          <el-button type="primary" @click="clickDelete">复制</el-button>
          <el-button type="primary" @click="clickDelete">提交审核</el-button>
          <el-button type="primary" @click="clickDelete">批量绑定</el-button>
          <el-button type="primary" @click="clickGenerateQR">批量生成二维码</el-button>
          <el-button type="primary" @click="clickGenerateQR">批量开启征订</el-button>
          <el-button type="primary" @click="clickGenerateQR">批量停止征订</el-button>
        </div>
      </el-form>
    </el-header>
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="" label="姓名"></el-table-column>
      <el-table-column prop="" label="商品数"></el-table-column>
      <el-table-column prop="" label="创建时间"></el-table-column>
      <el-table-column prop="" label="修改时间"></el-table-column>
      <el-table-column prop="" label="创建人"></el-table-column>
      <el-table-column prop="" label="是否生成条码"></el-table-column>
      <el-table-column prop="" label="审核状态"></el-table-column>
      <el-table-column prop="" label="征订状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="clickUpdate(scope.row)">查看</el-button>
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
  name: 'journal-Manage-catalogue',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 320 + 'px',
      search: {},
      options: [],
      tableList: [],
      pages: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    handleSelectionChange () {},
    handleCurrentChange () {},
    handleSizeChange () {},
    clickAddnew () {
      this.$router.push({
        path: '/addCatalogue'
      })
    },
    clickDelete () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    clickUpdate () {
      this.$router.push(
        this.$router.push({
          path: '/updateCatalogue'
        })
      )
    },
    clickGenerateQR () {
      this.$router.push({
        path: '/QRenerat'
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
