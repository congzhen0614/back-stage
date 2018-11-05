<template>
  <div class="child-manage">
    <header class="child-manage-header">
      <el-form ref="form" :model="search">
        <el-row>
          <el-col :span="4">
            <el-form-item label="学生姓名:" label-width="60px">
              <el-input v-model="search.name" placeholder="请输入账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="手机号:" label-width="50px">
              <el-input v-model="search.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="添加时间:" label-width="60px">
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
          <el-button size="mini" type="primary" plain @click="loadData" style="margin-top: 7px">检索</el-button>
        </el-row>
      </el-form>
    </header>
    <el-table :data="tableData" border :height="windowHeight">
      <el-table-column prop="parentAccount" label="账号"    align="center"></el-table-column>
      <el-table-column prop="name"         label="孩子姓名" align="center" width="100"></el-table-column>
      <el-table-column prop="sex"          label="性别"     align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.sex === 0 ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="provinceName" label="省份"     align="center" width="100"></el-table-column>
      <el-table-column prop="cityName"     label="城市"     align="center" width="100"></el-table-column>
      <el-table-column prop="regionName"   label="地区"     align="center" width="100"></el-table-column>
      <el-table-column prop="schoolName"   label="学校"     align="center"            ></el-table-column>
      <el-table-column prop="gradeName"    label="年级"     align="center" width="100"></el-table-column>
      <el-table-column prop="className"    label="班级"     align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.className || scope.row.defaultClassName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="enrollment"   label="入学年份" align="center" width="100"></el-table-column>
      <el-table-column prop="haveTrade"    label="是否消费" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.haveTrade === 0 ? '无订单' : '有订单' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime"  label="添加日期" align="center" width="150"></el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="clickUpdate(scope.row)" v-if="havePermission('child:update')">修改</el-button>
          <el-button type="text" size="mini" @click="clickDelete(scope.row)" v-if="havePermission('child:delete')">删除</el-button>
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
      windowHeight: window.innerHeight - 149 + 'px',
      provinceList: [],
      citiesList: [],
      regionList: [],
      tableData: [],
      search: {
        name: '',
        mobile: '',
        beginTime: '',
        endTime: '',
        provinceId: '',
        cityId: '',
        regionId: ''
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
        mobile: this.search.mobile,
        beginTime: dateFormat(this.search.beginTime, 0),
        endTime: dateFormat(this.search.endTime, 1),
        provinceId: this.search.provinceId,
        cityId: this.search.cityId,
        regionId: this.search.regionId
      }
      return param
    }
  },
  methods: {
    loadData () {
      this.$axios.childList(this.params).then(res => {
        if (res.data.code === '0') {
          this.pages.total = res.data.data.total
          this.tableData = res.data.data.list
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
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.loadData()
    },
    handleCurrentChange (val) {
      this.pages.pageNum = val
      this.loadData()
    },
    clickUpdate (item) {
      this.$router.push({
        path: '/updateChildManage',
        query: {
          id: item.id,
          uid: item.uid
        }
      })
    },
    clickDelete (item) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.childDelete({id: item.id}).then(res => {
          if (res.data.code === '0') {
            this.$message.success('删除成功!')
            this.loadData()
          } else {
            this.$message.error(res.data.msg)
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
  padding: 10px;
  padding-bottom: 0px;
  background-color: #F2F6FC;
}
</style>
