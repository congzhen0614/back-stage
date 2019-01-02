<template>
  <div class="order-list">
    <el-header class="order-maga-header" style="height: auto">
      <el-form ref="form" :model="search" size="mini">
        <el-row>
          <el-col :span="5">
            <el-form-item label="订单号:" label-width="60px">
              <el-input v-model="search.no" placeholder="请输入" @keyup.enter.native="clickSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="姓名:" label-width="50px">
              <el-input v-model="search.childName" placeholder="请输入" @keyup.enter.native="clickSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="收货人电话:" label-width="90px">
              <el-input v-model="search.mobile" placeholder="请输入" @keyup.enter.native="clickSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单时间:" label-width="70px">
              <el-date-picker type="date" placeholder="开始日期" v-model="search.startTime" style="width: 48%;"></el-date-picker>
              <el-date-picker type="date" placeholder="结束日期" v-model="search.endTime" style="width: 48%;"></el-date-picker>
              <!--<el-date-picker style="width: 100%" v-model="search.selectDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>-->
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button size="mini" type="primary" plain @click="showAll = !showAll" style="margin-left: 10px">{{ showAll ? '收起' : '展开' }}</el-button>
            <el-button size="mini" type="primary" plain @click="clickSearch">检索</el-button>
          </el-col>
        </el-row>
        <el-row v-if="showAll">
          <el-col :span="8">
            <el-form-item label="省/市/区" label-width="60px">
              <el-select v-model="search.provinceId" placeholder="请选择省" @change="selectProvince" style="width: 32%">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in provinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="search.cityId" placeholder="请选择市" @change="selectCity" style="width: 32%">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in cities" :key="item.id" :label="item.name" :value="parseInt(item.id)"></el-option>
              </el-select>
              <el-select v-model="search.regionId" placeholder="请选择区" style="width: 32%">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in regions" :key="item.id" :label="item.name" :value="parseInt(item.id)"></el-option>
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
        <el-row v-if="showAll">
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
                <el-option label="直送" :value="0"></el-option>
                <el-option label="寄送" :value="1"></el-option>
                <el-option label="寄送(含学校)" :value="2"></el-option>
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
      </el-form>
    </el-header>
    <el-table border size="mini" :data="tableData" style="width: 100%" :height="showAll ? showWindowHeight : hideWindowHeight">
      <el-table-column type="selection" width="35" ></el-table-column>
      <el-table-column prop="no"         label="订单号"  width="170" ></el-table-column>
      <el-table-column prop="tradeDetailViewList" label="订单明细" min-width="200" >
        <template slot-scope="scope">
          <p class="detail-list" v-for="item in scope.row.tradeDetailViewList" :key="item.id">{{item.name}} (类型:{{item.clsName}},数量:{{item.quantity}})</p>
        </template>
      </el-table-column>
      <el-table-column prop="receivables"   label="订单总额" width="80" ></el-table-column>
      <el-table-column prop="user"       label="下单人"   width="170" ></el-table-column>
      <el-table-column label="联系电话" width="150" >
        <template slot-scope="scope">
          <p v-if="scope.row.childMobile || scope.row.consigneeMobileMagazine">杂志：{{ scope.row.childMobile || scope.row.consigneeMobileMagazine }}</p>
          <p v-if="scope.row.consigneeMobile">图书：{{ scope.row.consigneeMobile }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt"  label="下单时间" width="150" >
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tradeStatusName" label="订单状态" width="80" ></el-table-column>
      <el-table-column prop="adminName"  label="业务员"   width="100" ></el-table-column>
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
      small
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
      showWindowHeight: window.innerHeight - 217 + 'px',
      hideWindowHeight: window.innerHeight - 135 + 'px',
      showAll: pages.pages.showAll || false,
      options: [],
      provinces: [],
      cities: [],
      regions: [],
      schoolList: [],
      gradeList: [],
      classList: [],
      tableData: [],
      accountList: [],
      search: {
        no: pages.pages.no || '',
        mobile: pages.pages.mobile || '',
        startTime: pages.pages.startTime || '',
        endTime: pages.pages.endTime || '',
        // selectDate: pages.selectDate,
        provinceId: '',
        cityId: '',
        regionId: '',
        schoolId: pages.pages.schoolId || '',
        gradeId: pages.pages.gradeId || '',
        classId: pages.pages.classId || '',
        childName: pages.pages.childName || '',
        tradeStatus: pages.pages.tradeStatus || '',
        sendType: pages.pages.sendType || '',
        cls: pages.pages.cls || '',
        adminId: pages.pages.adminId || ''
      },
      pages: {
        total: 0,
        pageNum: pages.pages.pageNum || 1,
        pageSize: pages.pages.pageSize || 20
      }
    }
  },
  mounted () {
    this.search.provinceId = pages.pages.provinceId || ''
    this.search.cityId = pages.pages.cityId || ''
    this.search.regionId = pages.pages.regionId || ''
    this.loadData()
    this.loadGradeList()
    this.loadClassList()
    this.loadProvinceList()
    this.loadAdminList()
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
        startTime: dateFormat(this.search.startTime, 0),
        endTime: dateFormat(this.search.endTime, 1),
        cls: this.search.cls
      }
      return param
    }
  },
  methods: {
    clickSearch () {
      if (new Date(this.search.startTime).getTime() > new Date(this.search.endTime).getTime()) {
        this.$message.error('开始时间不能在结束时间之后!')
      } else {
        pages.pages.no = this.search.no
        pages.pages.mobile = this.search.mobile
        pages.pages.startTime = this.search.startTime
        pages.pages.endTime = this.search.endTime
        // pages.selectDate = this.search.selectDate
        pages.pages.provinceId = this.search.provinceId
        pages.pages.cityId = this.search.cityId
        pages.pages.regionId = this.search.regionId
        pages.pages.schoolId = this.search.schoolId
        pages.pages.gradeId = this.search.gradeId
        pages.pages.classId = this.search.classId
        pages.pages.childName = this.search.childName
        pages.pages.tradeStatus = this.search.tradeStatus
        pages.pages.sendType = this.search.sendType
        pages.pages.cls = this.search.cls
        pages.pages.adminId = this.search.adminId
        this.loadData()
      }
    },
    loadData () {
      this.$axios.tradeList(this.listParams).then(res => {
        if (res.data.code === '0') {
          this.tableData = res.data.data.list
          this.pages.total = res.data.data.total
          this.pages.pageNum = res.data.data.pageNum
          this.pages.pageSize = res.data.data.pageSize
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
      pages.pages.pageNum = val
      this.loadData()
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      pages.pages.pageSize = val
      this.loadData()
    },
    onChecke (item) {
      this.$router.push({
        path: '/orderInfo',
        query: {
          item: JSON.stringify(item),
          update: 'false'
        }
      })
    },
    onUpdate (item) {
      this.$router.push({
        path: '/orderInfoUpdate',
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
    'search.provinceId' (val) {
      this.loadcitiesList(val)
    },
    'search.cityId' (val) {
      this.loadregionsList(val)
    },
    'search.regionId' (val) {
      if (val === '') return
      this.loadSchoolList()
    },
    'search.startTime' (val) {
      if (val === null) {
        this.search.startTime = ''
      }
    },
    'search.endTime' (val) {
      console.log(val)
      if (val === null) {
        this.search.endTime = ''
      }
    },
    showAll (val) {
      pages.pages.showAll = val
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
  .order-list .el-form-item--mini.el-form-item {
    margin-bottom: 0px;
  }
</style>
