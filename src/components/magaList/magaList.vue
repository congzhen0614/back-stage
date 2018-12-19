<template>
  <div class="magaList">
    <el-form ref="form" :model="search" size="mini">
      <el-row>
        <el-col :span="4">
          <el-form-item label="书名:" label-width="50px">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="类别:" label-width="50px">
            <el-select v-model="search.typeId">
              <el-option label="全部" :value="''"></el-option>
              <el-option :label="item.name" :value="item.id" v-for="item in typeList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间:" label-width="70px">
            <el-date-picker v-model="search.startTime" type="date" placeholder="开始日期" style="width: 46%"></el-date-picker>
            <el-date-picker v-model="search.endTime" type="date" placeholder="结束日期" style="width: 46%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button size="mini" type="primary" plain @click="loadDate">检索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="form" :model="form" :rules="rules" size="mini">
      <el-row class="maga">
        <el-col :span="3">
          <el-form-item label="配送方式:" prop="sendType" label-width="80px">
            <el-select v-model="form.sendType">
              <el-option label="直送" :value="0"></el-option>
              <el-option label="寄送" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="form.sendType === 1">
          <el-form-item label="商品金额未满:" prop="postageSum" label-width="105px">
            <el-input v-model="form.postageSum" type="number" min="0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="form.sendType === 1">
          <el-form-item label="将收取运费:" prop="postage" label-width="90px">
            <el-input v-model="form.postage" type="number" min="0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      border
      size="mini"
      ref="multipleTable"
      tooltip-effect="dark"
      :data="tableList"
      :height="windowHeight"
      @select="handleSelection"
      @select-all="handleSelection">
      <el-table-column type="selection" width="40" ></el-table-column>
      <el-table-column prop="ord" label="排序" width="100" sortable >
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.ord" @change="ordChange(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" ></el-table-column>
      <el-table-column prop="typeName" label="类别"  width="200"></el-table-column>
      <el-table-column prop="ageName" label="适读年龄"  width="300"></el-table-column>
      <el-table-column prop="fee" label="价格"  width="100"></el-table-column>
      <el-table-column label="价格单位" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.feeUnitTypeName }}{{ scope.row.feeUnitNum }}{{ scope.row.feeUnitName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="giftName" label="礼品" ></el-table-column>
      <el-table-column prop="createdAt" label="添加日期" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | timeFormat }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      size="mini"
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
      windowHeight: window.innerHeight - 410 + 'px',
      preselected: [],
      pageNum: 1,
      search: {
        name: '',
        typeId: '',
        isSale: 1,
        endTime: '',
        startTime: '',
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
      selectIds: [],
      historyData: []
    }
  },
  mounted () {
    this.loadDate()
    this.loadItemtypeList()
  },
  computed: {
    listParams () {
      let dateFormat = (value, type) => {
        let date = new Date(value)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        if (value === '') {
          return ''
        } else {
          if (type === 0) {
            return year + '-' + month + '-' + day + ' 00:00:00'
          } else {
            return year + '-' + month + '-' + day + ' 23:59:59'
          }
        }
      }
      let param = {
        name: this.search.name,
        typeId: this.search.typeId,
        isSale: this.search.isSale,
        endTime: dateFormat(this.search.endTime, 0),
        startTime: dateFormat(this.search.startTime, 0),
        pageNum: this.search.pageNum,
        pageSize: this.search.pageSize
      }
      return param
    }
  },
  methods: {
    loadDate () {
      if (new Date(this.search.startTime).getTime() > new Date(this.search.endTime).getTime()) {
        this.$message.error('开始时间不能大于结束时间')
      } else {
        this.$axios.magazineList(this.listParams).then(res => {
          if (res.data.code === '0') {
            this.tableList = res.data.data.list
            this.total = res.data.data.total
            this.tableList.forEach(item => { item.ord = 9999 })
            this.$nextTick(() => {
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
    loadItemtypeList () {
      this.$axios.itemtypeListCandidate().then(res => {
        if (res.data.code === '0') {
          this.typeList = res.data.data
        } else {
          this.$message.error(res.data.msg)
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
            cls: 1,
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
    'form.postageSum' (val) {
      if (val < 0) this.form.postageSum = 0
      this.$emit('mageDate', {
        postage: this.form.postage,
        postageSum: val,
        schoolLevel: this.form.schoolLevel,
        sendType: this.form.sendType,
        items: this.selectIds
      })
    },
    'form.postage' (val) {
      if (val < 0) this.form.postage = 0
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
