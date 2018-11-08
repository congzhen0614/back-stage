<template>
  <div class="bookList">
    <el-form ref="form" :model="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="书名:" label-width="40px">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="3">-->
          <!--<el-form-item label="是否上架:" label-width="60px">-->
            <!--<el-select v-model="search.isSale">-->
              <!--<el-option label="全部" :value="''"></el-option>-->
              <!--<el-option label="是" :value="1"></el-option>-->
              <!--<el-option label="否" :value="0"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :span="3">
          <el-form-item label="类别:" label-width="40px">
            <el-select v-model="search.typeId">
              <el-option label="全部" :value="''"></el-option>
              <el-option :label="item.name" :value="item.id" v-for="item in typeList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="margin-top: 7px">
          <el-button size="mini" type="primary" plain @click="loadDate">检索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="form" :model="form" :rules="rules">
      <el-row :gutter="20" class="book">
        <el-col :span="4">
          <el-form-item label="商品金额未满:" prop="postageSumBook" label-width="95px">
            <el-input v-model="form.postageSumBook">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="将收取运费:" prop="postageBook" label-width="80px">
            <el-input v-model="form.postageBook">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table border ref="multipleTable" tooltip-effect="dark" :data="tableList" :height="windowHeight" @select="handleSelection" @select-all="handleSelection">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column prop="ord" label="排序" width="100" sortable align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.ord" @change="ordChange(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="typeName" label="类别" align="center" width="200"></el-table-column>
      <el-table-column prop="ageName" label="适读年龄" align="center" width="200"></el-table-column>
      <el-table-column prop="fee" label="价格" align="center" width="100"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="search.pageNum"
      :page-size="search.pageSize"
      :page-sizes="[20, 50, 75, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'bookList',
  data () {
    return {
      rules: {
        postageSumBook: {required: true, message: '请输入未满金额', trigger: 'blur'},
        postageBook: {required: true, message: '请输入运费', trigger: 'blur'}
      },
      windowHeight: window.innerHeight - 410 + 'px',
      search: {
        id: this.id,
        cls: 2,
        typeId: '',
        isSale: 1,
        pageNum: 1,
        pageSize: 20
      },
      form: {
        postageBook: this.postageBook,
        postageSumBook: this.postageSumBook
      },
      total: 0,
      ageList: [],
      typeList: [],
      tableList: [],
      selectIds: [],
      historyData: []
    }
  },
  props: ['postageBook', 'postageSumBook', 'id'],
  mounted () {
    this.loadDate()
    this.loadItemtypeList()
  },
  methods: {
    loadDate () {
      this.$axios.itempackUpdatelist(this.search).then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data.list
          this.total = res.data.data.total
          this.selectList()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    selectList () {
      this.$nextTick(() => {
        let historyData = []
        this.tableList.forEach(item => {
          if (item.selected === 1) {
            this.$refs.multipleTable.toggleRowSelection(item, true)
            historyData.push(item)
          } else {
            item.ord = 9999
          }
        })
        this.handleSelection(historyData)
        if (this.historyData[this.search.pageNum] !== undefined) {
          this.tableList.forEach(list => {
            this.historyData[this.search.pageNum].forEach(select => {
              if (list.id === select.id) {
                this.$refs.multipleTable.toggleRowSelection(list, true)
              }
            })
          })
        }
      })
    },
    loadItemageList () {
      this.$axios.itemageList().then(res => {
        if (res.data.code === '0') {
          this.ageList = res.data.data.list
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadItemtypeList () {
      this.$axios.bookType().then(res => {
        if (res.data.code === '0') {
          this.typeList = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleSelection (val) {
      this.historyData[this.search.pageNum] = val
      this.selectIds = []
      this.historyData.forEach(list => {
        list.forEach(select => {
          this.selectIds.push({
            cls: 2,
            itemId: select.id,
            ord: parseInt(select.ord)
          })
        })
      })
    },
    ordChange (obj) {
      if (this.selectIds.length > 0) {
        this.selectIds.forEach(item => {
          if (item.itemId === obj.id) {
            item.ord = parseInt(obj.ord)
          }
        })
      }
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.loadDate()
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
      this.loadDate()
    }
  },
  watch: {
    'form.postageSumBook' (val) {
      this.$emit('bookDate', {
        postageBook: this.form.postageBook,
        postageSumBook: val,
        items: this.selectIds
      })
    },
    'form.postageBook' (val) {
      this.$emit('bookDate', {
        postageBook: val,
        postageSumBook: this.form.postageSumBook,
        items: this.selectIds
      })
    },
    selectIds (val) {
      this.$emit('bookDate', {
        postageBook: this.form.postageBook,
        postageSumBook: this.form.postageSumBook,
        items: val
      })
    }
  }
}
</script>

<style>
  .bookList .el-table {
    margin-top: 10px;
  }
  .book .el-form-item {
    margin-bottom: 0;
  }
</style>
