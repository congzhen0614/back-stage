<template>
  <div class="area-report">
    <header class="maga-report-header">
      <el-form ref="form" :model="search" size="mini">
        <el-row>
          <el-col :span="8">
            <el-form-item label="省/市/区:" label-width="70px">
              <el-select class="region-select" v-model="search.provinceId" placeholder="请选择省" style="width: 32%">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in provinceList" :key="item.id"></el-option>
              </el-select>
              <el-select class="region-select" v-model="search.cityId" placeholder="请选择市" style="width: 32%">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
              </el-select>
              <el-select class="region-select" v-model="search.regionId" placeholder="请选择区" style="width: 32%">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in regionList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="4">-->
            <!--<el-form-item label="学校:" label-width="50px">-->
              <!--<el-select v-model="search.schoolId" placeholder="请选择学校">-->
                <!--<el-option label="全部" value=""></el-option>-->
                <!--<el-option :label="item.schoolName" :value="item.schoolId" v-for="item in schoolList" :key="item.id"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="4">
            <el-form-item label="销售员:" label-width="60px">
              <el-select v-model="search.adminId" placeholder="请选择销售员">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.username" :value="item.id" v-for="item in accountList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单时间:" label-width="70px">
              <el-date-picker type="date" placeholder="开始日期" v-model="search.startDate" style="width: 45%;"></el-date-picker>
              <el-date-picker type="date" placeholder="结束日期" v-model="search.endDate" style="width: 45%;"></el-date-picker>
              <!--<el-date-picker style="width: 100%" v-model="search.selectDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>-->
            </el-form-item>
          </el-col>
          <!--<el-col :span="3">-->
            <!--<el-form-item label="配送方式:" label-width="70px">-->
              <!--<el-select v-model="search.sendType">-->
                <!--<el-option label="全部" value=""></el-option>-->
                <!--<el-option label="直送" :value="0"></el-option>-->
                <!--<el-option label="寄送" :value="1"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="4">
            <el-form-item label="支付方式:" label-width="70px">
              <el-select v-model="search.payType" placeholder="请选择销售员">
                <el-option label="全部" value=""></el-option>
                <el-option label="微信" value="1"></el-option>
                <el-option label="支付宝" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button size="mini" type="primary" plain @click="loadData" style="float: right">检索</el-button>
          <el-button size="mini" type="primary" @click="areaReportExport" v-if="havePermission('report:areaexport')">导出图书地区对账EXCEL</el-button>
          <el-button size="mini" type="primary" @click="areaReportExportByAdmin" v-if="havePermission('report:byadminexport')">导出图书业务员明细EXCEL</el-button>
        </el-row>
      </el-form>
    </header>

    <el-table size="mini" :data="tableData" border :height="windowHeight">
      <el-table-column prop="no"           label="订单号"    width="200"></el-table-column>
      <el-table-column prop="adminName"    label="业务员"    width="100"></el-table-column>
      <el-table-column prop="name"         label="图书名称"  width="200"></el-table-column>
      <el-table-column prop="quantity"     label="数量"      width="100"></el-table-column>
      <el-table-column prop="fee"          label="价格"      width="100"></el-table-column>
      <el-table-column prop="provinceName" label="省份"      ></el-table-column>
      <el-table-column prop="cityName"     label="城市"      ></el-table-column>
      <el-table-column prop="regionName"   label="地区"      ></el-table-column>
      <el-table-column prop="address"      label="地址"      width="200"></el-table-column>
      <el-table-column prop="createdAt"    label="交易时间"  width="150"></el-table-column>
      <el-table-column prop="tradeStatus"  label="订单状态"  width="100"></el-table-column>
    </el-table>
    <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="pages.pageNum"-->
      <!--:page-size="pages.pageSize"-->
      <!--:page-sizes="[20, 50, 75, 100]"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="pages.total">-->
    <!--</el-pagination>-->
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'area-report',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 230 + 'px',
      user: JSON.parse(localStorage.getItem('user')),
      provinceList: [],
      citiesList: [],
      regionList: [],
      schoolList: [],
      accountList: [],
      tableData: [],
      search: {
        provinceId: '',
        cityId: '',
        regionId: '',
        adminId: '',
        payType: '',
        startDate: '',
        endDate: ''
        // selectDate: ['', '']
      },
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  computed: {
    params () {
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
        provinceId: this.search.provinceId,
        cityId: this.search.cityId,
        regionId: this.search.regionId,
        adminId: this.search.adminId,
        payType: this.search.payType,
        startDate: dateFormat(this.search.startDate, 0),
        endDate: dateFormat(this.search.endDate, 1),
        cls: 2
      }
      return param
    }
  },
  created () {
    this.loadAccount()
    this.loadProvince()
    // if (this.user.roleLevel !== 1) {
    //   this.loadAccountArea()
    // }
  },
  methods: {
    loadAccountArea () {
      this.$axios.accountArea({id: this.user.id}).then(res => {
        if (res.data.code === '0') {
          this.search.provinceId = res.data.data.area.provinceId.toString()
          if (res.data.data.area.cities.length === 1) {
            this.search.cityId = res.data.data.area.cities[0].cityId
            if (res.data.data.area.cities[0].regions.length === 1) {
              this.search.regionId = res.data.data.area.cities[0].regions[0].regionId
            }
          }
          res.data.data.area.cities.forEach(city => {
            this.citiesList.push({
              region: city.regions,
              name: city.cityName,
              id: city.cityId
            })
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadData () {
      this.$axios.areaReportList(this.params).then(res => {
        if (res.data.code === '0') {
          this.tableData = res.data.data.list
          this.tableData.push({
            adminName: '合计',
            no: res.data.data.totalNo,
            fee: res.data.data.allTotalFee,
            quantity: res.data.data.allTotalQuantity
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadProvince () {
      this.$axios.province().then(res => {
        if (res.data.code === '0') {
          this.provinceList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadCities () {
      this.$axios.cities({id: this.search.provinceId}).then(res => {
        if (res.data.code === '0') {
          this.citiesList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadRegions () {
      this.$axios.regions({id: this.search.cityId}).then(res => {
        if (res.data.code === '0') {
          this.regionList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadSchool () {
      this.$axios.seekSchoolList({regionId: this.search.regionId}).then(res => {
        if (res.data.code === '0') {
          this.schoolList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadAccount () {
      this.$axios.accountListCandidate({groupId: '', level: '', type: ''}).then(res => {
        if (res.data.code === '0') {
          this.accountList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    areaReportExport () {
      if (new Date(this.params.startDate).getTime() > new Date(this.params.endDate).getTime()) {
        this.$message.error('开始时间不能在结束时间之后!')
        return false
      }
      let param = qs.stringify(this.params)
      let _url = '/qrzd/trade/report/area/export'
      window.location.href = window.location.protocol + '//' + window.location.host + _url + '?' + param
      // if (this.search.provinceId === '' || this.search.cityId === '' || this.search.regionId === '') {
      //   this.$message.warning('导出必选省/市/区')
      // } else {
      //   let param = qs.stringify(this.params)
      //   let _url = '/qrzd/trade/report/area/export'
      //   window.location.href = window.location.protocol + '//' + window.location.host + _url + '?' + param
      // }
    },
    areaReportExportByAdmin () {
      if (new Date(this.params.startDate).getTime() > new Date(this.params.endDate).getTime()) {
        this.$message.error('开始时间不能在结束时间之后!')
        return false
      }
      let param = qs.stringify(this.params)
      let _url = '/qrzd/trade/report/area/export/byadmin'
      window.location.href = window.location.protocol + '//' + window.location.host + _url + '?' + param
      // if (this.search.provinceId === '' || this.search.cityId === '' || this.search.regionId === '') {
      //   this.$message.warning('导出必选省/市/区')
      // } else {
      //   let param = qs.stringify(this.params)
      //   let _url = '/qrzd/trade/report/area/export/byadmin'
      //   window.location.href = window.location.protocol + '//' + window.location.host + _url + '?' + param
      // }
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.loadData()
    },
    handleCurrentChange (val) {
      this.pages.pageNum = val
      this.loadData()
    }
  },
  watch: {
    'search.provinceId' (val) {
      this.search.cityId = ''
      this.citiesList = []
      this.loadCities()
    },
    'search.cityId' (val) {
      this.search.regionId = ''
      this.regionList = []
      this.loadRegions()
    },
    'search.regionId' (val) {
      this.search.schoolId = ''
      this.schoolList = []
      if (val !== '') {
        this.loadSchool()
      }
    },
    'search.selectDate' (val) {
      if (val === null) {
        this.search.selectDate = ['', '']
      }
    },
    'search.startDate' (val) {
      if (val === null) {
        this.search.selectDate = ''
      }
    },
    'search.endDate' (val) {
      if (val === null) {
        this.search.endDate = ''
      }
    }
  }
}
</script>

<style>
.area-report header {
  padding: 10px;
  background-color: #F2F6FC;
}
</style>
