<template>
  <div class="school-report">
    <header class="school-report-header">
      <el-form ref="form" :model="search">
        <el-row>
          <el-col :span="8">
            <el-form-item label="省/市/区:" label-width="60px">
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
          <el-col :span="3">
            <el-form-item label="学校:" label-width="40px">
              <el-select v-model="search.schoolId" placeholder="请选择学校">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.schoolName" :value="item.schoolId" v-for="item in schoolList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="销售员:" label-width="50px">
              <el-select v-model="search.adminId" placeholder="请选择销售员">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.username" :value="item.id" v-for="item in accountList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否升年级:" label-width="80px">
              <el-select v-model="search.upgrade" placeholder="请选择销售员">
                <el-option label="全部" value=""></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单时间:" label-width="60px">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="search.startDate" style="width: 45%;"></el-date-picker>
              <el-date-picker type="date" placeholder="选择结束日期" v-model="search.endDate" style="width: 45%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button size="mini" type="primary" @click="loadSchoolExport" v-if="havePermission('report:schoolexport')">导出Excel</el-button>
          <el-button size="mini" type="primary" @click="loadExportDsd" v-if="havePermission('report:schoolmagazineexport')">导出订书单按杂志Excel</el-button>
          <el-button size="mini" type="primary" @click="loadExportDsdStudent" v-if="havePermission('report:schoolstudentexport')">导出订书单按学生Excel</el-button>
          <el-button size="mini" type="primary" @click="loadExportFsd" v-if="havePermission('report:schoolfsdexport')">导出发书单Excel</el-button>
        </el-row>
      </el-form>
    </header>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'school-report',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 200 + 'px',
      provinceList: [],
      citiesList: [],
      regionList: [],
      schoolList: [],
      accountList: [],
      search: {
        provinceId: '',
        cityId: '',
        regionId: '',
        schoolId: '',
        adminId: '',
        upgrade: '',
        startDate: '',
        endDate: ''
      }
    }
  },
  created () {
    this.loadAccount()
    this.loadProvince()
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
        schoolId: this.search.schoolId,
        adminId: this.search.adminId,
        upgrade: this.search.upgrade,
        startDate: dateFormat(this.search.startDate, 0),
        endDate: dateFormat(this.search.endDate, 1)
      }
      return param
    }
  },
  methods: {
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
    loadSchoolExport () {
      if (this.search.adminId === '') {
        this.$message.warning('请选择销售员')
      } else {
        let param = qs.stringify(this.params)
        let _url = '/qrzd/trade/report/school/export'
        window.location.href = window.location.protocol + '//' + window.location.host + _url + '?' + param
      }
    },
    loadExportDsd () {
      if (this.search.adminId === '') {
        this.$message.warning('请选择销售员')
      } else {
        let param = qs.stringify(this.params)
        let _url = '/qrzd/trade/report/school/export/dsd'
        window.location.href = window.location.protocol + '//' + window.location.host + _url + '?' + param
      }
    },
    loadExportDsdStudent () {
      if (this.search.adminId === '') {
        this.$message.warning('请选择销售员')
      } else {
        let param = qs.stringify(this.params)
        let _url = '/qrzd/trade/report/school/export/dsd/student'
        window.location.href = window.location.protocol + '//' + window.location.host + _url + '?' + param
      }
    },
    loadExportFsd () {
      if (this.search.adminId === '') {
        this.$message.warning('请选择销售员')
      } else {
        let param = qs.stringify(this.params)
        let _url = '/qrzd/trade/report/school/export/fsd'
        window.location.href = window.location.protocol + '//' + window.location.host + _url + '?' + param
      }
    }
  },
  watch: {
    'search.provinceId' (val) {
      if (val === '') {
        this.search.cityId = ''
        this.citiesList = []
      } else {
        this.loadCities()
      }
    },
    'search.cityId' (val) {
      if (val === '') {
        this.search.regionId = ''
        this.regionList = []
      } else {
        this.loadRegions()
      }
    },
    'search.regionId' (val) {
      if (val !== '') {
        this.loadSchool()
      } else {
        this.search.schoolId = ''
        this.schoolList = []
      }
    }
  }
}
</script>

<style>
.school-report-header {
  width: 100%;
  padding: 20px;
  background-color: #F2F6FC;
}
.region-select {
  width: 20%;
}
.region-input {
  width: 35%;
}
</style>
