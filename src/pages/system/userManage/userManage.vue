<template>
  <div class="user-manage">
    <header class="user-manage-header">
      <el-form ref="form" :model="search" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="账号:">
              <el-input v-model="search.name" placeholder="请输入账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="昵称:">
              <el-input v-model="search.name" placeholder="请输入昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单时间:">
              <el-date-picker type="date" placeholder="开始日期" v-model="search.startDate" style="width: 45%;"></el-date-picker>
              <el-date-picker type="date" placeholder="结束日期" v-model="search.endDate" style="width: 45%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="省/市/区:">
              <el-select style="width: 20%" v-model="search.provinceId" placeholder="请选择省">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in provinceList" :key="item.id"></el-option>
              </el-select>
              <el-select style="width: 20%" v-model="search.cityId" placeholder="请选择市">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
              </el-select>
              <el-select style="width: 20%" v-model="search.regionId" placeholder="请选择区">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in regionList" :key="item.id"></el-option>
              </el-select>
              <el-input style="width: 35%" v-model="search.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="用户状态:" style="margin: 0">
              <el-select v-model="search.region" placeholder="请选择用户状态:">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" plain @click="loadData">检索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </header>
    <el-table :data="tableData" border :height="windowHeight">
      <el-table-column prop="date" label="账号" header-align="center"></el-table-column>
      <el-table-column prop="date" label="昵称" header-align="center"></el-table-column>
      <el-table-column prop="date" label="平台" header-align="center"></el-table-column>
      <el-table-column prop="date" label="省份" header-align="center"></el-table-column>
      <el-table-column prop="date" label="城市" header-align="center"></el-table-column>
      <el-table-column prop="date" label="地区" header-align="center"></el-table-column>
      <el-table-column prop="date" label="操作平台" header-align="center"></el-table-column>
      <el-table-column prop="date" label="版本号" header-align="center"></el-table-column>
      <el-table-column prop="date" label="注册时间" header-align="center"></el-table-column>
      <el-table-column prop="date" label="用户状态" header-align="center"></el-table-column>
      <el-table-column label="操作" header-align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看孩子</el-button>
          <el-button type="text" size="small">注销</el-button>
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
  name: 'user-manage',
  components: {},
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
  mounted () {
  },
  computed: {},
  methods: {
    loadData () {},
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
.user-manage-header {
  width: 100%;
  padding: 20px;
  background-color: #F2F6FC;
}
</style>
