<template>
  <div class="system-classify">
    <header>
      <el-row :gutter="40">
        <el-col :span="4">
          <el-input v-model="search.name" placeholder="请输入名称筛选"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="search.type" placeholder="请选择类别">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" plain>检索</el-button>
          <el-button type="primary" @click="clickAdd">添加</el-button>
        </el-col>
      </el-row>
    </header>
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="120" label="排序"></el-table-column>
      <el-table-column prop="groupName" label="姓名"></el-table-column>
      <el-table-column prop="roleName" label="类型"></el-table-column>
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
      search: {},
      pages: {}
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
    clickUpdate () {},
    clickDelete () {},
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
  .system-classify header {
    padding: 20px;
    background-color: #F2F6FC;
  }
</style>
