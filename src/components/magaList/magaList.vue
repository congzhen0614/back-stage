<template>
  <div class="magaList">
    <el-form ref="form" :model="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="书名:" label-width="40px">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="是否上架:" label-width="60px">
            <el-select v-model="search.isSale">
              <el-option label="全部" :value="''"></el-option>
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
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
      <el-row :gutter="20" class="maga">
        <el-col :span="4">
          <el-form-item label="商品金额未满:" prop="postageSum" label-width="95px">
            <el-input v-model="form.postageSum">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="将收取运费:" prop="postage" label-width="80px">
            <el-input v-model="form.postage">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="配送方式:" style="margin-bottom: 0; height: 40px" prop="sendType" label-width="80px">
            <el-select v-model="form.sendType">
              <el-option label="直送" :value="0"></el-option>
              <el-option label="寄送" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      border
      ref="multipleTable"
      tooltip-effect="dark"
      :data="tableList"
      :height="windowHeight"
      @selection-change="handleSelection">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column prop="ord" label="排序" width="100" sortable align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.ord" @change="ordChange(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" header-align="center"></el-table-column>
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
  name: 'magaList',
  data () {
    return {
      rules: {
        sendType: {required: true, message: '请选择配送方式', trigger: 'blur'},
        postageSum: {required: true, message: '请输入未满金额', trigger: 'blur'},
        postage: {required: true, message: '请输入运费', trigger: 'blur'}
      },
      windowHeight: window.innerHeight - 420 + 'px',
      preselected: [],
      pageNum: 1,
      search: {
        typeId: '',
        isSale: 1,
        pageNum: 1,
        pageSize: 20
      },
      form: {
        sendType: this.sendType ? this.sendType : 0,
        postage: this.postage,
        postageSum: this.postageSum
      },
      total: 0,
      ageList: [],
      typeList: [],
      tableList: [],
      selectIds: []
    }
  },
  props: ['sendType', 'postage', 'postageSum', 'magazineIds'],
  mounted () {
    this.loadDate()
    this.loadItemtypeList()
  },
  methods: {
    loadDate () {
      this.$axios.magazineList(this.search).then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data.list
          this.total = res.data.data.total
          this.tableList.forEach(item => { item.ord = 9999 })
          this.setSelect()
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
      this.$axios.itemtypeListCandidate().then(res => {
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
    setSelect () {
      if (typeof this.magazineIds !== 'undefined') {
        this.$nextTick(() => {
          this.tableList.forEach(item => {
            this.magazineIds.forEach(select => {
              if (item.id === select.id) {
                item.ord = select.ord
                this.$refs.multipleTable.toggleRowSelection(item, true)
              }
            })
          })
        })
      }
    },
    handleSelection (val) {
      this.selectIds = []
      val.forEach(item => {
        this.selectIds.push({
          cls: 1,
          itemId: item.id,
          ord: parseInt(item.ord)
        })
      })
      this.handleSelectionChange()
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
    'form.postageSum' (val) {
      this.$emit('mageDate', {
        postage: this.form.postage,
        postageSum: val,
        schoolLevel: this.form.schoolLevel,
        sendType: this.form.sendType,
        items: this.selectIds
      })
    },
    'form.postage' (val) {
      this.$emit('mageDate', {
        postage: val,
        postageSum: this.form.postageSum,
        schoolLevel: this.form.schoolLevel,
        sendType: this.form.sendType,
        items: this.selectIds
      })
    },
    'form.sendType' (val) {
      this.$emit('mageDate', {
        postage: this.form.postage,
        postageSum: this.form.postageSum,
        schoolLevel: this.form.schoolLevel,
        sendType: val,
        items: this.selectIds
      })
    },
    selectIds (val) {
      this.$emit('mageDate', {
        postage: this.form.postage,
        postageSum: this.form.postageSum,
        schoolLevel: this.form.schoolLevel,
        sendType: this.form.sendType,
        items: val
      })
    }
  }
}
</script>

<style>
  .magaList .el-table {
    margin-top: 10px;
  }
  .maga .el-form-item {
    margin-bottom: 0;
  }
  .magaList .el-select {
    width: 100%;
  }
</style>
