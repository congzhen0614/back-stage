<template>
  <div class="area-report">
    <header class="maga-report-header">
      <el-form ref="form" :model="search" size="mini">
        <el-row>
          <el-col :span="4">
            <el-form-item label="支付方式:" label-width="70px">
              <el-select v-model="search.payType" placeholder="请选择销售员">
                <el-option label="全部" value=""></el-option>
                <el-option label="微信" value="1"></el-option>
                <el-option label="支付宝" value="2"></el-option>
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
              <!--<el-date-picker type="date" placeholder="开始日期" v-model="search.startDate" style="width: 45%;"></el-date-picker>-->
              <!--<el-date-picker type="date" placeholder="结束日期" v-model="search.endDate" style="width: 45%;"></el-date-picker>-->
              <el-date-picker style="width: 100%" v-model="search.selectDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button size="mini" type="primary" plain @click="loadData" style="float: right">检索</el-button>
          <el-button size="mini" type="primary" @click="areaReportExport" v-if="havePermission('report:areaexport')">导出电子读物地区对账EXCEL</el-button>
          <el-button size="mini" type="primary" @click="areaReportExportByAdmin" v-if="havePermission('report:byadminexport')">导出电子读物业务员明细EXCEL</el-button>
        </el-row>
      </el-form>
    </header>

    <el-table size="mini" :data="tableData" border :height="windowHeight">
      <el-table-column prop="name"         label="电子读物名称"  ></el-table-column>
      <el-table-column prop="no"           label="订单号"    width="200"></el-table-column>
      <el-table-column prop="adminName"    label="业务员"    width="100"></el-table-column>
      <el-table-column prop="quantity"     label="数量"      width="100"></el-table-column>
      <el-table-column prop="fee"          label="价格"      width="100"></el-table-column>
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
      windowHeight: window.innerHeight - 180 + 'px',
      user: JSON.parse(localStorage.getItem('user')),
      accountList: [],
      tableData: [],
      search: {
        payType: '',
        adminId: '',
        selectDate: ['', '']
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
        payType: this.search.payType,
        adminId: this.search.adminId,
        startDate: dateFormat(this.search.selectDate[0], 0),
        endDate: dateFormat(this.search.selectDate[1], 1),
        cls: 54
      }
      return param
    }
  },
  created () {
    this.loadAccount()
  },
  methods: {
    loadData () {
      this.$axios.areaReportList(this.params).then(res => {
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
      let param = qs.stringify(this.params)
      let _url = '/qrzd/trade/report/area/export'
      window.location.href = window.location.protocol + '//' + window.location.host + _url + '?' + param
    },
    areaReportExportByAdmin () {
      let param = qs.stringify(this.params)
      let _url = '/qrzd/trade/report/area/export/byadmin'
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
    'search.selectDate' (val) {
      if (val === null) {
        this.search.selectDate = ['', '']
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
