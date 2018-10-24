<template>
  <div class="child-manage">
    <header class="child-manage-header">
      <el-form ref="form" :model="search">
        <el-row>
          <el-col :span="4">
            <el-form-item label="账号:" label-width="40px">
              <el-input v-model="search.name" placeholder="请输入账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="昵称:" label-width="40px">
              <el-input v-model="search.name" placeholder="请输入昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单时间:" label-width="60px">
              <el-date-picker type="date" placeholder="开始日期" v-model="search.startDate" style="width: 49%;"></el-date-picker>
              <el-date-picker type="date" placeholder="结束日期" v-model="search.endDate" style="width: 49%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="省/市/区:" label-width="60px">
              <el-select style="width: 32%" v-model="search.provinceId" placeholder="请选择省">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in provinceList" :key="item.id"></el-option>
              </el-select>
              <el-select style="width: 32%" v-model="search.cityId" placeholder="请选择市">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
              </el-select>
              <el-select style="width: 32%" v-model="search.regionId" placeholder="请选择区">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in regionList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-button size="mini" type="primary" plain @click="loadData" style="margin-top: 7px">检索</el-button>
        </el-row>
      </el-form>
    </header>
    <el-table :data="tableData" border :height="windowHeight">
      <el-table-column prop="date" label="账号" header-align="center"></el-table-column>
      <el-table-column prop="date" label="孩子姓名" header-align="center"></el-table-column>
      <el-table-column prop="date" label="性别" header-align="center"></el-table-column>
      <el-table-column prop="date" label="省份" header-align="center"></el-table-column>
      <el-table-column prop="date" label="城市" header-align="center"></el-table-column>
      <el-table-column prop="date" label="地区" header-align="center"></el-table-column>
      <el-table-column prop="date" label="学校" header-align="center"></el-table-column>
      <el-table-column prop="date" label="年级" header-align="center"></el-table-column>
      <el-table-column prop="date" label="班级" header-align="center"></el-table-column>
      <el-table-column prop="date" label="入学年份" header-align="center"></el-table-column>
      <el-table-column prop="date" label="是否消费" header-align="center"></el-table-column>
      <el-table-column prop="date" label="添加日期" header-align="center"></el-table-column>
      <el-table-column label="操作" header-align="center" width="200">
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
  name: 'user-manage',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 253 + 'px',
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
.child-manage-header {
  width: 100%;
  padding: 20px;
  background-color: #F2F6FC;
}
</style>
