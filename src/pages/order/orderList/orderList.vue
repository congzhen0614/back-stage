<template>
  <div class="order-list">
    <el-header class="order-maga-header" style="height: auto">
      <el-form ref="form" :model="search">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单号:" label-width="60px">
              <el-input v-model="search.no" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货人电话:" label-width="90px">
              <el-input v-model="search.mobile" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单时间(开始):" label-width="110px">
              <el-date-picker style="width: 100%" v-model="search.startTime" type="date" placeholder="开始日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单时间(结束):" label-width="110px">
              <el-date-picker style="width: 100%" v-model="search.endTime" type="date" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省/市/区" label-width="60px">
              <el-select v-model="search.provinceId" placeholder="请选择省" @change="selectProvince" style="width: 32%">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in provinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="search.cityId" placeholder="请选择市" @change="selectCity" style="width: 32%">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in cities" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="search.regionId" placeholder="请选择区" style="width: 32%">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in regions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="学校:" label-width="55px">
              <el-select v-model="search.schoolId" placeholder="请选择" filterable style="width: 100%">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in schoolList" :key="item.schoolId" :label="item.schoolName" :value="item.schoolId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="年级:" label-width="55px">
              <el-select v-model="search.gradeId" placeholder="请选择" style="width: 100%">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in gradeList" :key="item.value" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="班级:" label-width="55px">
              <el-select v-model="search.classId" placeholder="请选择" style="width: 100%">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in classList" :key="item.value" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="业务员:" label-width="60px">
              <el-select v-model="search.adminId" placeholder="请选择" style="width: 100%">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.realname" :value="item.id" v-for="item in accountList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名:" label-width="50px">
              <el-input v-model="search.childName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态:" label-width="80px">
              <el-select v-model="search.tradeStatus" placeholder="请选择" style="width: 100%">
                <el-option label="全部" value=""></el-option>
                <el-option label="待付款" value="1"></el-option>
                <el-option label="已付款" value="2"></el-option>
                <el-option label="退款中" value="5"></el-option>
                <el-option label="已退款" value="7"></el-option>
                <el-option label="已完成" value="14"></el-option>
                <el-option label="订单已失效" value="-2"></el-option>
                <el-option label="订单已取消" value="-1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配送方式:" label-width="80px">
              <el-select v-model="search.sendType" placeholder="请选择" style="width: 100%">
                <el-option label="直送" value="0"></el-option>
                <el-option label="寄送" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品类型:" label-width="80px">
              <el-select v-model="search.cls" placeholder="请选择" style="width: 100%">
                <el-option label="全部" value=""></el-option>
                <el-option label="杂志" value="1"></el-option>
                <el-option label="图书" value="2"></el-option>
                <el-option label="电子读物" value="54"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button size="mini" type="primary" plain @click="clickSearch" style="float: right; margin-top: 7px">检索</el-button>
        </el-row>
      </el-form>
    </el-header>
    <el-table border :data="tableData" style="width: 100%" :height="windowHeight">
      <el-table-column type="selection" width="45" ></el-table-column>
      <el-table-column prop="no"         label="订单号"  width="200" ></el-table-column>
      <el-table-column prop="tradeDetailViewList" label="订单明细" >
        <template slot-scope="scope">
          <p class="detail-list" v-for="item in scope.row.tradeDetailViewList" :key="item.id">{{item.name}} (杂志类型:{{item.clsName}},数量:{{item.quantity}})</p>
        </template>
      </el-table-column>
      <el-table-column prop="receivables"   label="订单总额" width="100" ></el-table-column>
      <el-table-column prop="user"       label="下单人"   width="170" ></el-table-column>
      <el-table-column prop="username"   label="联系电话" width="150" ></el-table-column>
      <el-table-column prop="createdAt"  label="下单时间" width="200" >
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tradeStatusName" label="订单状态" width="120" ></el-table-column>
      <el-table-column prop="adminName"  label="业务员"   width="120" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="200px" >
        <template slot-scope="scope">
          <el-button @click="onChecke(scope.row)" type="text" size="mini" v-if="havePermission('trade:list')">查看</el-button>
          <el-button @click="onUpdate(scope.row)" type="text" size="mini" v-if="havePermission('trade:update')">修改</el-button>
          <el-button @click="onFlowed(scope.row)" type="text" size="mini">流程</el-button>
          <el-button @click="onDelive(scope.row)" type="text" size="mini" v-if="havePermission('trade:delive')">发货物流</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="pages.total"
      :page-size.sync="pages.pageSize"
      :current-page.sync="pages.pageNum"
      :page-sizes="[20, 50, 75, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import pages from '@/store/pages/orderPages.js'
export default {
  name: 'order-list',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 265 + 'px',
      search: {
        no: pages.no,
        mobile: pages.mobile,
        startTime: pages.startTime,
        endTime: pages.endTime,
        provinceId: pages.provinceId,
        cityId: pages.cityId,
        regionId: pages.regionId,
        schoolId: pages.schoolId,
        gradeId: pages.gradeId,
        classId: pages.classId,
        childName: pages.childName,
        tradeStatus: pages.tradeStatus,
        sendType: pages.sendType,
        cls: pages.cls,
        adminId: pages.adminId
      },
      options: [],
      provinces: [],
      cities: [],
      regions: [],
      schoolList: [],
      gradeList: [],
      classList: [],
      tableData: [],
      accountList: [],
      pages: {
        total: 0,
        pageNum: pages.pageNum,
        pageSize: pages.pageSize
      }
    }
  },
  mounted () {
    this.loadData()
    this.loadGradeList()
    this.loadClassList()
    this.loadProvinceList()
    this.loadAdminList()
  },
  computed: {
    listParams () {
      let startTime = ''
      let endTime = ''
      if (this.search.startTime) {
        let date = new Date(this.search.startTime)
        startTime = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate() + ' 00:00:00'
      }
      if (this.search.endTime) {
        let date = new Date(this.search.endTime)
        endTime = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate() + ' 23:59:59'
      }
      let Trim = str => {
        if (str !== '') {
          return str.replace(/(^\s*)|(\s*$)/g, '')
        } else {
          return ''
        }
      }
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
        adminId: this.search.adminId,
        childName: Trim(this.search.childName),
        tradeStatus: this.search.tradeStatus,
        startTime: startTime,
        endTime: endTime,
        cls: this.search.cls
      }
      return param
    }
  },
  methods: {
    clickSearch () {
      pages.no = this.search.no
      pages.mobile = this.search.mobile
      pages.startTime = this.search.startTime
      pages.endTime = this.search.endTime
      pages.provinceId = this.search.provinceId
      pages.cityId = this.search.cityId
      pages.regionId = this.search.regionId
      pages.schoolId = this.search.schoolId
      pages.gradeId = this.search.gradeId
      pages.classId = this.search.classId
      pages.childName = this.search.childName
      pages.tradeStatus = this.search.tradeStatus
      pages.sendType = this.search.sendType
      pages.cls = this.search.cls
      pages.adminId = this.search.adminId
      this.loadData()
    },
    loadData () {
      this.$axios.tradeList(this.listParams).then(res => {
        if (res.data.code === '0') {
          this.tableData = res.data.data.list
          this.pages.total = res.data.data.total
          this.pages.pageNum = pages.pageNum
          this.pages.pageSize = pages.pageSize
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadSchoolList () {
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
    loadGradeList () {
      this.$axios.schGradeList().then(res => {
        if (res.data.code === '0') {
          this.gradeList = res.data.data
        } else {
          this.$message.error(res.data.msg)
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
          this.$message.error(res.data.msg)
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
          this.$message.error(res.data.msg)
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
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadAdminList () {
      this.$axios.accountListCandidate({groupId: '', level: '', type: ''}).then(res => {
        this.accountList = res.data.data
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleCurrentChange (val) {
      this.pages.pageNum = val
      pages.pageNum = val
      this.loadData()
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      pages.pageSize = val
      this.loadData()
    },
    onChecke (item) {
      this.$router.push({
        path: '/orderInfo',
        query: {
          item: JSON.stringify(item),
          update: false
        }
      })
    },
    onUpdate (item) {
      this.$router.push({
        path: '/orderInfo',
        query: {
          item: JSON.stringify(item),
          update: true
        }
      })
    },
    onFlowed (item) {
      this.$router.push({
        path: '/flowed',
        query: {
          id: item.id
        }
      })
    },
    onDelive (item) {
      this.$router.push({
        path: '/delive',
        query: {
          id: item.id
        }
      })
    }
  },
  watch: {
    'search.regionId' (val) {
      if (val === '') return
      this.loadSchoolList()
    }
  }
}
</script>

<style>
  .order-list .order-maga-header {
    background-color: #F2F6FC;
    padding: 10px;
  }
  .order-list .detail-list {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .order-list .el-form-item {
    margin-bottom: 0px;
  }
</style>
