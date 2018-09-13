<template>
  <div class="account-bind-school">
    <header class="header" style="height: auto">
      <el-form ref="form" :model="search" label-width="100px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="商家用户:">
              <el-input v-model="search.username" disabled></el-input>
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
          <el-col :span="10">
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
          <el-col :span="2">
            <el-button type="primary" plain @click="loadSchoolList">检索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-button type="primary" @click="onBind(0)">批量绑定</el-button>
        <el-button type="primary" @click="onBind(1)">批量取消绑定</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-row>
    </header>
    <el-table :data="schoolList" border :height="windowHeight" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="名称" show-overflow-tooltip width="300px"></el-table-column>
      <el-table-column prop="provinceName" label="省份"></el-table-column>
      <el-table-column prop="cityName" label="城市"></el-table-column>
      <el-table-column prop="regionName" label="地区"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip width="500px"></el-table-column>
      <el-table-column prop="isHighGrade" label="年级阶段">
        <template slot-scope="scope">
          <span v-if="scope.row.isHighGrade === 2">幼儿园</span>
          <span v-if="scope.row.isHighGrade === 0">小学</span>
          <span v-if="scope.row.isHighGrade === 1">初中</span>
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
      windowHeight: window.innerHeight - 320 + 'px',
      cityIds: [],
      regionIds: [],
      search: {
        name: '',
        schoolLevel: '',
        username: JSON.parse(this.$route.query.item).username,
        provinceId: JSON.parse(this.$route.query.item).provinceId.toString(),
        cityIds: [],
        regionIds: []
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
        schoolLevel: this.search.schoolLevel
      }
      return param
    }
  },
  created () {
    this.setRegions()
    this.loadProvince()
    this.loadSchoolList()
  },
  mounted () {},
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
            if (item.id === JSON.parse(this.$route.query.item).provinceId.toString()) {
              this.provinceList = [item]
            }
          })
          this.citiesList = JSON.parse(this.$route.query.item).citys
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
      this.selectIds = []
      val.forEach(item => {
        if (item.bindStatus !== '未绑定') {
          console.log('绑定')
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
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    goBack () {
      this.$router.go(-1)
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
