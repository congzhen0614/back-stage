<template>
  <div class="account-bind-school">
    <header class="header" style="height: auto">
      <el-form ref="form" :model="search" label-width="100px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="学校名称:">
              <el-input :model="search.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="商家用户:">
              <el-input :model="search.adminId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="年级阶段:">
              <el-select v-model="search.schoolLevel">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="省/市/区:" class="region">
              <el-select v-model="search.provinceId">
                <el-option :label="item.name" :value="item.id" v-for="item in provinceList" :key="item.id"></el-option>
              </el-select>
              <el-select v-model="search.cityIds">
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
      <el-table-column prop="isHighGrade" label="年级阶段"></el-table-column>
      <el-table-column prop="bindStatus" label="绑定状态"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.pageNum"
      :page-size="pages.pageSize"
      :page-sizes="[10, 20, 50, 100]"
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
      search: {
        provinceId: JSON.parse(this.$route.query.item).provinceId.toString(),
        cityIds: JSON.parse(this.$route.query.item).citys[0].id,
        regionIds: JSON.parse(this.$route.query.item).regions[0].id
      },
      schoolList: [],
      provinceList: [],
      citiesList: [],
      regionsList: [],
      selectIds: [],
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 10
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
        adminId: JSON.parse(this.$route.query.item).id,
        schoolLevel: this.search.schoolLevel
      }
      if (this.search.cityIds !== '') {
        param.cityIds = this.search.cityIds
      }
      if (this.search.regionIds !== '') {
        param.regionIds = this.search.regionIds
      }
      return param
    }
  },
  mounted () {
    this.loadSchoolList()
    this.loadProvince()
  },
  methods: {
    loadSchoolList () {
      this.$axios.schoolList(this.params).then(res => {
        if (res.data.code === '0') {
          this.schoolList = res.data.data.list
          this.pages.total = res.data.data.total
          this.loadSchoolFindByAdmin()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadSchoolFindByAdmin () {
      this.$axios.schoolFindByAdmin({adminId: JSON.parse(this.$route.query.item).id}).then(res => {
        if (res.data.code === '0') {
          console.log(this.schoolList)
          console.log(res.data.data.list)
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
          this.regionsList = JSON.parse(this.$route.query.item).regions
        } else {
          this.$message.error(res.data.data.msg)
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
          this.$router.go(-1)
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
  watch: {}
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
