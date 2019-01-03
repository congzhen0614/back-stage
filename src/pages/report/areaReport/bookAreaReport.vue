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
            </el-form-item>
          </el-col>
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
    <el-table size="mini" :data="tableData" border :height="windowHeight" :span-method="arraySpanMethod">
      <el-table-column prop="adminName"       label="业务员"      ></el-table-column>
      <el-table-column prop="no"              label="订单号"      ></el-table-column>
      <el-table-column prop="name"            label="书名"        ></el-table-column>
      <el-table-column prop="quantity"        label="数量"        ></el-table-column>
      <el-table-column prop="fee"             label="售价"        ></el-table-column>
      <el-table-column prop="deliveryFeeBook" label="运费"        ></el-table-column>
      <el-table-column prop="mayang"          label="订单金额"    ></el-table-column>
      <el-table-column prop="jifen"           label="积分优惠"    ></el-table-column>
      <el-table-column prop="zhekou"          label="折扣优惠"    ></el-table-column>
      <el-table-column prop="kaquan"          label="卡券优惠"    ></el-table-column>
      <el-table-column prop="manjian"         label="满减优惠"    ></el-table-column>
      <el-table-column prop="shifu"           label="实付金额"    ></el-table-column>
      <el-table-column prop="provinceName"    label="省份"        ></el-table-column>
      <el-table-column prop="cityName"        label="城市"        ></el-table-column>
      <el-table-column prop="regionName"      label="地区"        ></el-table-column>
      <el-table-column prop="address"         label="地址"        ></el-table-column>
      <el-table-column prop="consigneeMobile" label="收件人姓名"  ></el-table-column>
      <el-table-column prop="consigneeName"   label="收件人手机号"></el-table-column>
      <el-table-column prop="createdAt"       label="创建时间"    ></el-table-column>
      <el-table-column prop="tradeStatus"     label="订单状态"    ></el-table-column>
      <el-table-column prop="payWay"          label="支付方式"    v-if="user.roleLevel === 1 || user.roleLevel === 2"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'area-report',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 140 + 'px',
      user: JSON.parse(localStorage.getItem('user')),
      provinceList: [],
      citiesList: [],
      regionList: [],
      schoolList: [],
      accountList: [],
      tableData: [],
      spanArr: [],
      pos: 0,
      search: {
        provinceId: '',
        cityId: '',
        regionId: '',
        adminId: '',
        payType: '',
        startDate: '',
        endDate: ''
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
        endDate: dateFormat(this.search.endDate, 1)
      }
      return param
    }
  },
  created () {
    this.loadAccount()
    this.loadProvince()
  },
  methods: {
    arraySpanMethod ({row, column, rowIndex, columnIndex}) {
      if (columnIndex < 2 || columnIndex > 4) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
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
      this.spanArr = []
      this.tableData = []
      this.$axios.areaBookReportList(this.params).then(res => {
        if (res.data.code === '0') {
          res.data.data.list.forEach(item => {
            let length = item.list.length
            item.list.forEach(list => {
              this.tableData.push({
                address: item.address,
                adminName: item.adminName,
                cityName: item.cityName,
                consigneeMobile: item.consigneeMobile,
                consigneeName: item.consigneeName,
                createdAt: item.createdAt,
                deliveryFeeBook: item.deliveryFeeBook,
                no: item.no,
                provinceName: item.provinceName,
                regionName: item.regionName,
                tfee: item.tfee,
                fee: list.fee,
                issn: list.issn,
                mayang: list.mayang,
                name: list.name,
                originalFee: list.originalFee,
                quantity: list.quantity,
                tradeStatus: list.tradeStatus,
                typeId: list.typeId,
                length: length
              })
            })
          })
          this.tableData.push({
            deliveryFeeBook: res.data.data.totalDeliveryFee,
            mayang: res.data.data.totalmayang,
            // fee: res.data.data.totaltFee,
            no: res.data.data.totalNo,
            adminName: '合计'
          })
          console.log(this.tableData)
          this.getSpanArr(this.tableData)
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    getSpanArr (data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].no === data[i - 1].no) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
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
      let _url = '/qrzd/trade/report/area/export/book'
      window.location.href = window.location.protocol + '//' + window.location.host + _url + '?' + param
    },
    areaReportExportByAdmin () {
      if (new Date(this.params.startDate).getTime() > new Date(this.params.endDate).getTime()) {
        this.$message.error('开始时间不能在结束时间之后!')
        return false
      }
      let param = qs.stringify(this.params)
      let _url = '/qrzd/trade/report/area/export/byadmin/book'
      window.location.href = window.location.protocol + '//' + window.location.host + _url + '?' + param
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
    'search.provinceId' () {
      this.search.cityId = ''
      this.citiesList = []
      this.loadCities()
    },
    'search.cityId' () {
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
