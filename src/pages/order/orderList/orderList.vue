<template>
  <div class="order-list">
    <el-header class="order-maga-header" style="height: auto">
      <el-form ref="form" :model="search" label-width="120px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单号:">
              <el-input v-model="search.no" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货人电话:">
              <el-input v-model="search.mobile" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单时间(开始):" label-width="120px">
              <el-date-picker v-model="search.startTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单时间(结束):">
              <el-date-picker v-model="search.endTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <el-select v-model="search.provinceId" placeholder="请选择省" @change="selectProvince">
              <el-option v-for="item in provinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-select v-model="search.cityId" placeholder="请选择市" @change="selectCity" :disabled="cities.length === 0">
              <el-option v-for="item in cities" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-select v-model="search.regionId" placeholder="请选择区" :disabled="regions.length === 0">
              <el-option v-for="item in regions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学校:">
              <el-select v-model="search.schoolId" filterable placeholder="请选择">
                <el-option v-for="item in schoolList" :key="item.value" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年级:">
              <el-select v-model="search.gradeId" placeholder="请选择">
                <el-option v-for="item in gradeList" :key="item.value" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班级:">
              <el-select v-model="search.classId" placeholder="请选择">
                <el-option v-for="item in classList" :key="item.value" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名:">
              <el-input v-model="search.childName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态:">
              <el-select v-model="search.tradeStatus" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配送方式:">
              <el-select v-model="search.sendType" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain @click="loadData">检索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-button type="primary">批量发货</el-button>
        <!--<el-button type="primary">导出Excel</el-button>-->
      </el-row>
    </el-header>
    <el-table :data="tableData" style="width: 100%" border :height="windowHeight">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="no" label="订单号"></el-table-column>
      <el-table-column prop="tradeDetailViewList" label="订单明细" width="300">
        <template slot-scope="scope">
          <p class="detail-list" v-for="item in scope.row.tradeDetailViewList" :key="item.id">{{item.name}} (杂志类型:{{item.clsName}},数量:{{item.quantity}})</p>
        </template>
      </el-table-column>
      <el-table-column prop="" label="业务员"></el-table-column>
      <el-table-column prop="totalFee" label="订单总额"></el-table-column>
      <el-table-column prop="user" label="下单人"></el-table-column>
      <el-table-column prop="username" label="联系电话"></el-table-column>
      <el-table-column prop="createdAt" label="下单时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="订单状态"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button @click="onDelive(scope.row)" type="text" size="small">发货</el-button>
          <el-button @click="onUpload(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="onChecke(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="pages.total"
      :page-size="pages.pageSize"
      :current-page="pages.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'order-list',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 450 + 'px',
      search: {
        provinceId: '',
        cityId: '',
        regionId: ''
      },
      options: [],
      provinces: [],
      cities: [],
      regions: [],
      schoolList: [],
      gradeList: [],
      classList: [],
      tableData: [],
      pages: {
        total: 10,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created () {
  },
  mounted () {
    this.loadData()
    this.loadSchoolList()
    this.loadGradeList()
    this.loadClassList()
    this.loadProvinceList()
  },
  computed: {
    listParams () {
      let param = {
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        no: this.search.no,
        mobile: this.search.mobile,
        sendType: this.search.sendType,
        provinceId: this.search.provinceId,
        cityId: this.search.cityId,
        regionId: this.search.regionId,
        schoolId: this.search.schoolId,
        gradeId: this.search.gradeId,
        classId: this.search.classId,
        childName: this.search.childName,
        tradeStatus: this.search.tradeStatus,
        startTime: this.search.startTime,
        endTime: this.search.endTime
      }
      return param
    }
  },
  methods: {
    loadData () {
      this.$axios.tradeList(this.listParams).then(res => {
        if (res.data.code === '0') {
          this.tableData = res.data.data.list
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadSchoolList () {
      this.$axios.schoolList().then(res => {
        if (res.data.code === '0') {
          this.schoolList = res.data.data.list
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadGradeList () {
      this.$axios.schGradeList().then(res => {
        if (res.data.code === '0') {
          this.gradeList = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadClassList () {
      this.$axios.schClassList().then(res => {
        if (res.data.code === '0') {
          this.classList = res.data.data
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    selectProvince (val) {
      this.cities = []
      this.regions = []
      this.search.cityId = ''
      this.search.regionId = ''
      this.loadcitiesList(val)
    },
    selectCity (val) {
      this.regions = []
      this.search.regionId = ''
      this.loadregionsList(val)
    },
    loadProvinceList () {
      this.$axios.province().then(res => {
        if (res.data.code === '0') {
          this.provinces = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadcitiesList (id) {
      this.$axios.cities({id: id}).then(res => {
        if (res.data.code === '0') {
          this.cities = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadregionsList (id) {
      this.$axios.regions({id: id}).then(res => {
        if (res.data.code === '0') {
          this.regions = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleCurrentChange (val) {
      this.pages.pageNum = val
      this.loadData()
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.loadData()
    },
    onDelive (item) {
      console.log(item)
    },
    onUpload (item) {
      this.$router.push({
        path: '/orderUpdate',
        query: {
          id: item.id
        }
      })
    },
    onChecke (item) {
      console.log(item)
    }
  }
}
</script>

<style>
  .order-list .order-maga-header {
    background-color: #F2F6FC;
    padding: 20px;
  }
  .order-list .detail-list {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
