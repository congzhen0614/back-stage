<template>
  <div class="account-bind-school">
    <header class="header">
      <el-form ref="form" :model="search" label-width="75px">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="商家用户:">
              <el-input v-model="search.username" disabled placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="学校名称:">
              <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="年级阶段:">
              <el-select v-model="search.schoolLevel">
                <el-option label="全部" value=""></el-option>
                <el-option label="幼儿园" value="2"></el-option>
                <el-option label="小学" value="0"></el-option>
                <el-option label="初中" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省/市/区:" class="region">
              <el-select v-model="search.provinceId" disabled>
                <el-option :label="item.name" :value="item.id" v-for="item in provinceList" :key="item.id"></el-option>
              </el-select>
              <el-select v-model="search.cityIds">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
              </el-select>
              <el-select v-model="search.regionIds">
                <el-option :label="item.name" :value="item.id" v-for="item in regionsList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain @click="loadSchoolList">检索</el-button>
            <el-button type="primary" @click="changeOrder" v-if="havePermission('school:ord')">排序</el-button>
            <el-button type="primary" @click="clickIfShown(1)" v-if="havePermission('school:show')">显示</el-button>
            <el-button type="primary" @click="clickIfShown(0)" v-if="havePermission('school:show')">隐藏</el-button>
          </el-col>
        </el-row>
      </el-form>
    </header>
    <el-table :data="schoolList" border :height="windowHeight" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="ord" label="排序" width="100" align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.ord" style="text-align: right" @change="ordChange(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="300px" show-overflow-tooltip header-align="center"></el-table-column>
      <el-table-column prop="provinceName" label="省份" align="center"></el-table-column>
      <el-table-column prop="cityName" label="城市" align="center"></el-table-column>
      <el-table-column prop="regionName" label="地区" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip width="500px" header-align="center"></el-table-column>
      <el-table-column prop="isHighGrade" label="年级阶段" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isHighGrade === 2">幼儿园</span>
          <span v-if="scope.row.isHighGrade === 0">小学</span>
          <span v-if="scope.row.isHighGrade === 1">初中</span>
        </template>
      </el-table-column>
      <el-table-column prop="disName" label="是否显示" align="center"></el-table-column>
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
  name: 'account-bind-school',
  data () {
    return {
      windowHeight: window.innerHeight - 190 + 'px',
      provinceList: [],
      citiesList: [],
      regionsList: [],
      schoolList: [],
      selectIds: [],
      cityIds: [],
      regionIds: [],
      search: {
        cityIds: '',
        regionIds: '',
        provinceId: this.$route.query.provinceId.toString(),
        username: this.$route.query.username
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
      let param = {
        name: this.search.name,
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        provinceId: this.search.provinceId,
        cityIds: this.search.cityIds !== '' ? this.search.cityIds : this.cityIds,
        regionIds: this.search.regionIds !== '' ? this.search.regionIds : this.regionIds,
        adminId: this.$route.query.adminId,
        schoolLevel: this.search.schoolLevel
      }
      return param
    }
  },
  mounted () {
    JSON.parse(this.$route.query.citys).forEach(item => {
      this.cityIds.push(item.id)
    })
    JSON.parse(this.$route.query.regions).forEach(item => {
      this.regionIds.push(item.id)
    })
    this.loadProvince()
    this.loadSchoolList()
  },
  methods: {
    loadSchoolList () {
      this.$axios.schoolFindByAdmin(this.params).then(res => {
        if (res.data.code === '0') {
          this.schoolList = res.data.data.list
          this.pages.total = res.data.data.total
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
          res.data.data.forEach(item => {
            if (item.id === this.$route.query.provinceId.toString()) {
              this.provinceList = [item]
            }
          })
          this.citiesList = JSON.parse(this.$route.query.citys)
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadRegions () {
      this.$axios.regions({id: this.search.cityIds}).then(res => {
        if (res.data.code === '0') {
          let regionsList = []
          res.data.data.forEach(item => {
            JSON.parse(this.$route.query.regions).forEach(obj => {
              if (obj.id === item.id) {
                regionsList.push(item)
              }
            })
          })
          this.regionsList = regionsList
          console.log(this.regionsList)
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    changeOrder () {
      this.$axios.schoolOrd({idAndOrdViews: this.selectIds}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.loadSchoolList()
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    clickIfShown (flag) {
      let ids = []
      this.selectIds.forEach(item => {
        ids.push(item.id)
      })
      this.$axios.schoolShow({adminId: this.$route.query.adminId, dis: flag, ids: ids}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.loadSchoolList()
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleSelectionChange (value) {
      this.selectIds = []
      value.forEach(item => {
        this.selectIds.push({
          id: item.id,
          ord: item.ord
        })
      })
    },
    ordChange (value) {
      if (this.selectIds.length > 0) {
        this.selectIds.forEach(item => {
          if (item.id === value.id) {
            item.ord = value.ord
          }
        })
        console.log(this.selectIds)
      }
    },
    handleCurrentChange (val) {
      this.pages.pageNum = val
      this.loadSchoolList()
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.loadSchoolList()
    }
  },
  watch: {
    'search.cityIds' (val) {
      this.search.regionIds = ''
      if (val !== '') {
        this.loadRegions()
      } else {
        this.regionsList = []
      }
    }
  }
}
</script>

<style>
  .account-bind-school .region .el-select {
    width: 32%;
  }
  .account-bind-school .el-form-item {
    margin-bottom: 0px;
  }
  .account-bind-school .el-pagination {
    padding: 0 5px;
    margin: 10px;
  }
  .account-bind-school .header {
    background-color: #F2F6FC;
    padding: 20px;
  }
</style>
