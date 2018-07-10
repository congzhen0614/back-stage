<template>
  <div class="system-account">
    <header class="header" style="height: auto">
      <el-row :gutter="40">
        <el-col :span="4"><el-input v-model="search.name" placeholder="请输入名称筛选"></el-input></el-col>
        <el-col :span="4">
          <el-select v-model="search.type" placeholder="请选择类别">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary">检索</el-button>
          <el-button type="primary" @click="clickAddnew">添加</el-button>
          <el-button type="primary" @click="clickDelete">删除</el-button>
        </el-col>
      </el-row>
    </header>
    <el-main>
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="排序" width="120" sortable></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="type" label="类型" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="clickUpdate(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="clickDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="1"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="500">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'system-account',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 265 + 'px',
      search: {},
      options: [],
      tableData3: [{
        id: 1,
        name: '王小虎',
        type: '刊物'
      }]
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
        path: '/addAccount'
      })
    },
    clickDelete () {},
    clickUpdate (item) {
      console.log(item)
    }
  },
  watch: {}
}
</script>

<style>
  .system-account .header {
    background-color: #F2F6FC;
    padding: 20px;
  }
  .system-account .el-main {
    padding: 0;
  }
  .system-account .el-select {
    width: 100%;
  }
</style>
