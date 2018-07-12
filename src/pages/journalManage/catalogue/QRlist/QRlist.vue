<template>
  <div class="journal-Manage-catalogue-QRlist">
    <header class="header" style="height: auto">
      <el-row :gutter="40">
        <el-col :span="4"><el-input v-model="search.name" placeholder="请输入名称"></el-input></el-col>
        <el-col :span="4">
          <el-button type="primary" plain>检索</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-button type="primary" @click="clickDelete">批量删除</el-button>
        <el-button type="primary" @click="clickUpload">批量下载</el-button>
      </el-row>
    </header>
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="120" label="排序"></el-table-column>
      <el-table-column prop="groupName" label="姓名" width="120"></el-table-column>
      <el-table-column prop="roleName" label="类型" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
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
  name: 'journal-Manage-catalogue-QRlist',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 320 + 'px',
      search: {},
      pages: {},
      tableList: []
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    clickDelete () {},
    clickUpload () {}
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
