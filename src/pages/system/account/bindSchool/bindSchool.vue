<template>
  <div class="account-bind-school">
    <header class="header" style="height: auto">
      <el-form ref="form" :model="search" label-width="70px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="省/市/区:" class="region">
              <el-select v-model="search.provinceId" disabled>
                <el-option :label="item.name" :value="item.id" v-for="item in provinceList" :key="item.id"></el-option>
              </el-select>
              <el-select v-model="search.cityIds">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
              </el-select>
              <el-select v-model="search.regionIds">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in regionsList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="学校名称:">
              <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="年级阶段:">
              <el-select v-model="search.schoolLevel">
                <el-option label="全部" value=""></el-option>
                <el-option label="幼儿园" value="2"></el-option>
                <el-option label="小学" value="0"></el-option>
                <el-option label="初中" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="绑定状态:">
              <el-select v-model="search.bindStatusCode">
                <el-option label="全部" value=""></el-option>
                <el-option label="已绑定" value="1"></el-option>
                <el-option label="未绑定" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="商家用户:">
              <el-input v-model="search.username" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-top: 7px">
            <el-button size="mini" type="primary" plain @click="loadSchoolList">检索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-button size="mini" type="primary" @click="onBind(0)">批量绑定</el-button>
        <el-button size="mini" type="primary" @click="onBind(1)">批量取消绑定</el-button>
        <el-button size="mini" @click="$router.go(-1)" style="float: right">返回</el-button>
      </el-row>
    </header>
    <el-table :data="schoolList" border :height="windowHeight" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="45" ></el-table-column>
      <el-table-column prop="name"         label="名称" width="300px"></el-table-column>
      <el-table-column prop="provinceName" label="省份"></el-table-column>
      <el-table-column prop="cityName"     label="城市"></el-table-column>
      <el-table-column prop="regionName"   label="地区"></el-table-column>
      <el-table-column prop="address"      label="地址" width="500px"></el-table-column>
      <el-table-column prop="isHighGrade"  label="年级阶段">
        <template slot-scope="scope">
          <span v-if="scope.row.isHighGrade === 0">小学</span>
          <span v-if="scope.row.isHighGrade === 1">初中</span>
          <span v-if="scope.row.isHighGrade === 2">幼儿园</span>
        </template>
      </el-table-column>
      <el-table-column prop="bindStatus" label="绑定状态"></el-table-column>
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
      isBind: false,
      notBind: false,
      windowHeight: window.innerHeight - 208 + 'px',
      cityIds: [],
      regionIds: [],
      search: {
        name: '',
        schoolLevel: '',
        username: JSON.parse(this.$route.query.item).username,
        provinceId: JSON.parse(this.$route.query.item).provinceId.toString(),
        cityIds: [],
        regionIds: [],
        bindStatusCode: ''
      },
      schoolList: [],
      provinceList: [],
      citiesList: [],
      regionsList: [],
      selectIds: [],
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
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        name: this.search.name,
        provinceId: this.search.provinceId,
        cityIds: this.search.cityIds.length > 0 ? this.search.cityIds : this.cityIds,
        regionIds: this.search.regionIds.length > 0 ? this.search.regionIds : this.regionIds,
        adminId: JSON.parse(this.$route.query.item).id,
        schoolLevel: this.search.schoolLevel,
        bindStatusCode: this.search.bindStatusCode
      }
      return param
    }
  },
  created () {
    this.setRegions()
    this.loadProvince()
    this.loadSchoolList()
  },
  methods: {
    setRegions () {
      JSON.parse(this.$route.query.item).citys.forEach(item => {
        this.cityIds.push(item.id)
      })
      JSON.parse(this.$route.query.item).regions.forEach(item => {
        this.regionIds.push(item.id)
      })
    },
    loadSchoolList () {
      this.$axios.schoolList(this.params).then(res => {
        if (res.data.code === '0') {
          this.schoolList = res.data.data.list
          this.pages.total = res.data.data.total
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
          res.data.data.forEach(item => {
            if (item.id === JSON.parse(this.$route.query.item).provinceId.toString()) {
              this.provinceList = [item]
            }
          })
          this.citiesList = JSON.parse(this.$route.query.item).citys
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
      this.$axios.regions({id: this.search.cityIds}).then(res => {
        if (res.data.code === '0') {
          let regionsList = []
          res.data.data.forEach(item => {
            JSON.parse(this.$route.query.item).regions.forEach(obj => {
              if (obj.id === item.id) {
                regionsList.push(item)
              }
            })
          })
          this.regionsList = regionsList
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleSelectionChange (val) {
      this.isBind = false
      this.notBind = false
      this.selectIds = []
      val.forEach(item => {
        if (item.bindStatus !== '未绑定') {
          this.isBind = true
        } else {
          this.notBind = true
        }
        this.selectIds.push(item.id)
      })
    },
    handleCurrentChange (val) {
      this.pages.pageNum = val
      this.loadSchoolList()
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.loadSchoolList()
    },
    onBind (code) {
      let bindParam = {
        adminId: JSON.parse(this.$route.query.item).id,
        schoolIds: this.selectIds,
        code: code
      }
      this.$axios.schoolBind(bindParam).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.loadSchoolList()
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
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
    width: 150px;
  }
  .account-bind-school .header {
    background-color: #F2F6FC;
    padding: 20px;
  }
</style>
