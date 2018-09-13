<template>
  <div class="online-report">
    <header class="online-report-header">
      <el-form ref="form" :model="search" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="省/市/区:">
              <el-select class="region-select" v-model="search.provinceId" placeholder="请选择省">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in provinceList" :key="item.id"></el-option>
              </el-select>
              <el-select class="region-select" v-model="search.cityId" placeholder="请选择市">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
              </el-select>
              <el-select class="region-select" v-model="search.regionId" placeholder="请选择区">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in regionList" :key="item.id"></el-option>
              </el-select>
              <el-input class="region-input" v-model="search.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="销售员:">
              <el-select v-model="search.salesman" placeholder="请选择销售员">
                <el-option label="全部" value=""></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单时间:">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="search.startDate" style="width: 45%;"></el-date-picker>
              <el-date-picker type="date" placeholder="选择结束日期" v-model="search.endDate" style="width: 45%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" plain @click="loadData">检索</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-button type="primary">导出</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="primary">导出</el-button>
        </el-row>
      </el-form>
    </header>
    <el-table :data="tableData" border :height="windowHeight">
      <el-table-column prop="date" label="日期" header-align="center"></el-table-column>
      <el-table-column prop="date" label="日期" header-align="center"></el-table-column>
      <el-table-column prop="date" label="日期" header-align="center"></el-table-column>
      <el-table-column prop="date" label="日期" header-align="center"></el-table-column>
      <el-table-column prop="date" label="日期" header-align="center"></el-table-column>
      <el-table-column label="操作" header-align="center" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.pageNum"
      :page-size="pages.pageSize"
      :page-sizes="[20, 50, 75, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'online-report',
  data () {
    return {
      windowHeight: window.innerHeight - 317 + 'px',
      search: {
        provinceId: '',
        cityId: '',
        regionId: ''
      },
      provinceList: [],
      citiesList: [],
      regionList: [],
      tableData: [],
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  created () {
    this.loadProvince()
  },
  methods: {
    loadData () {
      console.log(this.search)
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
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
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
    }
  }
}
</script>

<style>
.online-report-header {
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
