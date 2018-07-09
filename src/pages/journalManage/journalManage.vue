<template>
  <div class="journal-Manage">
    <el-header class="journal-Manage-header" style="height: auto">
      <el-row :gutter="20">
        <el-col :span="4"><el-input v-model="input" placeholder="请输入名称筛选"></el-input></el-col>
        <el-col :span="4"><el-input v-model="input" placeholder="请输入编号筛选"></el-input></el-col>
        <el-col :span="3">
          <el-select v-model="value" placeholder="请选择类别">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="value" placeholder="请选择年级">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="value" placeholder="是否上架">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="value" placeholder="是否宝贝积分商品">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value" placeholder="请选择批量复制给经销商">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div class="header-button-right">
        <el-row>
          <el-button type="primary" plain>检索</el-button>
          <el-button type="primary" plain>批量复制</el-button>
          <el-button type="primary" plain>批量上架</el-button>
          <el-button type="primary" plain>批量下架</el-button>
        </el-row>
      </div>
      <div class="header-button">
        <el-button type="primary" icon="el-icon-plus" @click="clickAddNew">添加</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="clickUpdata">修改</el-button>
        <el-button type="primary" @click="clickUpLoad">上传图片<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>
    </el-header>
    <el-main>
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="日期" width="120" sortable></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="allQuantity" label="总数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="quantity" label="数量" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="1"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="500">
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
let table = [{
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1510 弄',
  quantity: 10,
  allQuantity: 20
}, {
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1511 弄',
  quantity: 10,
  allQuantity: 20
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1512 弄',
  quantity: 20,
  allQuantity: 20
}, {
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1513 弄',
  quantity: 10,
  allQuantity: 20
}, {
  date: '2016-05-08',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1514 弄',
  quantity: 20,
  allQuantity: 20
}, {
  date: '2016-05-06',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1515 弄',
  quantity: 10,
  allQuantity: 20
}, {
  date: '2016-05-07',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄',
  quantity: 10,
  allQuantity: 20
}, {
  date: '2016-05-07',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄',
  quantity: 20,
  allQuantity: 20
}, {
  date: '2016-05-07',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  quantity: 10,
  allQuantity: 20
}, {
  date: '2016-05-07',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄',
  quantity: 10,
  allQuantity: 20
}]
export default {
  name: 'journal-Manage',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 320 + 'px',
      formInline: {},
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      tableData3: [],
      input: '',
      selectVal: '',
      value: '',
      currentPage4: 100
    }
  },
  mounted () {
    this.getTable()
  },
  computed: {},
  methods: {
    getTable () {
      this.tableData3 = []
      table.forEach(item => {
        if (item.quantity < item.allQuantity) {
          this.tableData3.push(item)
        }
      })
    },
    // 选择第几十页
    handleSizeChange (val) {
      console.log(val)
    },
    // 点击第几页
    handleCurrentChange (val) {
      console.log(val)
    },
    // 选择的项目
    handleSelectionChange (val) {
      console.log(val)
    },
    // 添加
    clickAddNew () {
      this.$router.push({
        path: '/addNewJournal'
      })
    },
    // 修改
    clickUpdata () {
      this.$router.push({
        path: '/updataJournal'
      })
    },
    // 上传图片
    clickUpLoad () {
      this.$router.push({
        path: '/upLoadJournal'
      })
    },
    // 点击查询
    onSubmit () {
      console.log('点击查询')
    }
  },
  watch: {}
}
</script>

<style>
  .journal-Manage .el-main {
    padding: 0;
  }
  .journal-Manage .el-pagination {
    text-align: center;
  }
  .journal-Manage .el-select {
    width: 100%;
  }
  .journal-Manage .journal-Manage-header {
    background-color: #F2F6FC;
    padding: 20px;
  }
  .journal-Manage .header-button {
    margin-top: 20px;
  }
  .journal-Manage .header-button-right {
    margin-top: 20px;
    float: right;
  }
  .journal-Manage .el-footer {
    background-color: #fff;
    height: 30px;
  }
</style>
