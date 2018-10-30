<template>
  <div class="user-manage">
    <header class="user-manage-header">
      <el-form ref="form" :model="search">
        <el-row>
          <el-col :span="4">
            <el-form-item label="账号:" label-width="40px">
              <el-input v-model="search.name" placeholder="请输入账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="昵称:" label-width="40px">
              <el-input v-model="search.nickName" placeholder="请输入昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="注册时间:" label-width="60px">
              <el-date-picker type="date" placeholder="开始日期" v-model="search.beginTime" style="width: 49%;"></el-date-picker>
              <el-date-picker type="date" placeholder="结束日期" v-model="search.endTime" style="width: 49%;"></el-date-picker>
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
          <el-col :span="3">
            <el-form-item label="用户状态:" label-width="60px">
              <el-select v-model="search.status" placeholder="请选择用户状态:" style="width: 100%">
                <el-option label="全部"   value=""></el-option>
                <el-option label="正常"   :value="0"></el-option>
                <el-option label="已注销" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-button size="mini" type="primary" plain @click="loadData" style="float: right">检索</el-button>
        </el-row>
      </el-form>
    </header>
    <el-table :data="tableData" border :height="windowHeight">
      <el-table-column prop="name"         label="账号"     header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name || scope.row.otherAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickName"     label="昵称"     align="center" width="150"></el-table-column>
      <el-table-column prop="platform"     label="平台"     align="center" width="100"></el-table-column>
      <el-table-column prop="provinceName" label="省份"     align="center" width="150"></el-table-column>
      <el-table-column prop="cityName"     label="城市"     align="center" width="150"></el-table-column>
      <el-table-column prop="regionName"   label="地区"     align="center" width="150"></el-table-column>
      <el-table-column prop="os"           label="操作平台" align="center" width="100"></el-table-column>
      <el-table-column prop="version"      label="版本号"   align="center" width="100"></el-table-column>
      <el-table-column prop="createdTime"  label="注册时间" align="center" width="200"></el-table-column>
      <el-table-column prop="statusName"   label="用户状态" align="center" width="100"></el-table-column>
      <el-table-column                     label="操作"     align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="cheakChild(scope.row)" v-if="havePermission('child:findbyuid')">查看孩子</el-button>
          <el-button type="text" size="mini" @click="clickDelete(scope.row)" v-if="havePermission('user:delete')">注销</el-button>
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
      windowHeight: window.innerHeight - 185 + 'px',
      provinceList: [],
      citiesList: [],
      regionList: [],
      tableData: [],
      search: {
        name: '',
        nickName: '',
        beginTime: '',
        endTime: '',
        provinceId: '',
        cityId: '',
        regionId: '',
        status: ''
      },
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  created () {
    this.loadData()
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
        name: Trim(this.search.name),
        nickName: Trim(this.search.nickName),
        beginTime: dateFormat(this.search.beginTime, 0),
        endTime: dateFormat(this.search.endTime, 1),
        provinceId: this.search.provinceId,
        cityId: this.search.cityId,
        regionId: this.search.regionId,
        status: this.search.status
      }
      return param
    }
  },
  methods: {
    loadData () {
      this.$axios.userList(this.params).then(res => {
        if (res.data.code === '0') {
          this.pages.total = res.data.data.total
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
    clickDelete (item) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.userDelete({id: item.id}).then(res => {
          if (res.data.code === '0') {
            this.$message.success('操作成功')
            this.loadData()
          } else {
            this.$message.error(res.data.data.msg)
          }
        }, err => {
          this.$message.error(err)
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.loadData()
    },
    handleCurrentChange (val) {
      this.pages.pageNum = val
      this.loadData()
    },
    cheakChild (item) {
      this.$router.push({
        path: '/checkChild',
        query: {
          id: item.id
        }
      })
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
  padding: 10px;
  background-color: #F2F6FC;
}
</style>
