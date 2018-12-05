<template>
  <div class="system-school">
    <header class="school-header">
      <el-form ref="form" :model="search" size="mini">
        <el-row>
          <el-col :span="10" class="school-region">
            <el-form-item label="省/市/区:" label-width="70px">
              <el-select v-model="search.provinceId" placeholder="请选择省" :disabled="user.roleLevel !== 1">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in provinceList" :key="item.id"></el-option>
              </el-select>
              <el-select v-model="search.cityIds" placeholder="请选择市" :disabled="citiesList.length === 1 && user.roleLevel !== 1">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
              </el-select>
              <el-select v-model="search.regionIds" placeholder="请选择区" :disabled="regionsList.length === 1 && user.roleLevel !== 1">
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in regionsList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="学校名称:" label-width="70px">
              <el-input v-model="search.name" placeholder="请输入学校名称" @keyup.enter.native="clickSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="年级阶段:" label-width="70px">
              <el-select v-model="search.schoolLevel" placeholder="年级阶段">
                <el-option label="幼儿园" :value="2"></el-option>
                <el-option label="小学" :value="0"></el-option>
                <el-option label="初中" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="商家用户:" label-width="70px">
              <el-select v-model="search.adminId" placeholder="商家用户">
                <el-option :label="item.username" :value="item.id" v-for="item in accountList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button size="mini" type="primary" plain @click="clickSearch" style="float: right">检索</el-button>
      <el-button size="mini" type="primary" @click="addSchool" v-if="havePermission('school:add')">添加</el-button>
      <el-button size="mini" type="primary" @click="onOrder" v-if="havePermission('school:ord')">排序提交</el-button>
      <el-button size="mini" type="primary" @click="dialogVisible = true" v-if="havePermission('school:batch')">导入学校</el-button>
    </header>
    <el-table size="mini" :data="schoolList" style="width: 100%" border :height="windowHeight" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="45" ></el-table-column>
      <el-table-column prop="ord" label="排序" width="100" sortable >
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.ord" @change="ordChange(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name"         label="学校名称" ></el-table-column>
      <el-table-column prop="provinceName" label="省份"     ></el-table-column>
      <el-table-column prop="cityName"     label="城市"     ></el-table-column>
      <el-table-column prop="regionName"   label="地区"     ></el-table-column>
      <el-table-column prop="address"      label="详细地址" ></el-table-column>
      <el-table-column fixed="right" label="操作"  width="200">
        <template slot-scope="scope">
          <el-button @click="onChecke(scope.row)" type="text" size="mini" v-if="havePermission('school:admingroup')">查看商家用户</el-button>
          <el-button @click="onUpdate(scope.row)" type="text" size="mini" v-if="havePermission('school:update')">修改</el-button>
          <el-button @click="onDelete(scope.row)" type="text" size="mini" v-if="havePermission('school:delete')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pages.pageNum"
      :page-size="pages.pageSize"
      :page-sizes="[20, 50, 75, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
    <el-dialog :visible.sync="dialogVisible" width="25%">
      <el-upload
        class="upload-demo"
        drag
        multiple
        :action="upLoadUrl"
        :headers="{Authorization: authorization}"
        :show-file-list="false"
        :on-success="upLoadSuccess"
        :on-error="upLoadError"
        :before-upload="beforeAvatarUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip" style="cursor: pointer" @click="loadTemplate">点击下载模板</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import pages from '@/store/pages/schoolPages.js'
export default {
  name: 'system-school',
  data () {
    return {
      authorization: JSON.parse(localStorage.getItem('user')).authorization,
      windowHeight: window.innerHeight - 174 + 'px',
      user: JSON.parse(localStorage.getItem('user')),
      upLoadUrl: this.$axios.schoolBatch(),
      dialogVisible: false,
      provinceList: [],
      citiesList: [],
      regionsList: [],
      accountList: [],
      schoolList: [],
      selectIds: [],
      search: {
        name: pages.pages.name || '',
        provinceId: '',
        cityIds: '',
        regionIds: '',
        schoolLevel: pages.pages.schoolLevel || '',
        adminId: pages.pages.adminId || ''
      },
      pages: {
        total: 0,
        pageNum: pages.pages.pageNum || 1,
        pageSize: pages.pages.pageSize || 20
      }
    }
  },
  created () {
    this.search.provinceId = pages.pages.provinceId || ''
    this.search.cityIds = pages.pages.cityIds || ''
    this.search.regionIds = pages.pages.regionIds || ''
    this.loadProvince()
    this.loadAccountList()
    this.loadSchoolList()
    if (this.user.roleLevel !== 1) {
      this.loadAccountArea()
    }
  },
  mounted () {
  },
  computed: {
    params () {
      let Trim = str => {
        if (str !== '') {
          return str.replace(/(^\s*)|(\s*$)/g, '')
        } else {
          return ''
        }
      }
      let param = {
        name: Trim(this.search.name),
        adminId: this.search.adminId,
        provinceId: this.search.provinceId,
        cityIds: this.search.cityIds,
        regionIds: this.search.regionIds,
        schoolLevel: this.search.schoolLevel,
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize
      }
      return param
    }
  },
  methods: {
    loadAccountArea () {
      this.$axios.accountArea({id: this.user.id}).then(res => {
        if (res.data.code === '0') {
          this.search.provinceId = res.data.data.area.provinceId.toString()
          if (res.data.data.area.cities.length === 1) {
            this.search.cityIds = res.data.data.area.cities[0].cityId
            if (res.data.data.area.cities[0].regions.length === 1) {
              this.search.regionIds = res.data.data.area.cities[0].regions[0].regionId
            }
          }
          res.data.data.area.cities.forEach(city => {
            this.citiesList.push({
              region: city.regions,
              name: city.cityName,
              id: city.cityId
            })
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    clickSearch () {
      pages.pages.name = this.search.name
      pages.pages.provinceId = this.search.provinceId
      pages.pages.cityIds = this.search.cityIds
      pages.pages.regionIds = this.search.regionIds
      pages.pages.schoolLevel = this.search.schoolLevel
      pages.pages.adminId = this.search.adminId
      this.loadSchoolList()
    },
    Trim (str) {
      if (str !== '') {
        return str.replace(/(^\s*)|(\s*$)/g, '')
      } else {
        return ''
      }
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
      this.$axios.regions({id: this.search.cityIds}).then(res => {
        if (res.data.code === '0') {
          this.regionsList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadAccountList () {
      this.$axios.accountListCandidate({groupId: '', level: '', type: ''}).then(res => {
        if (res.data.code === '0') {
          let accountList = []
          res.data.data.forEach(item => {
            if (!(item.roleLevel === 1 || item.roleLevel === 2)) {
              accountList.push(item)
            }
          })
          this.accountList = accountList
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadSchoolList () {
      this.params.name = this.Trim(this.params.name)
      this.$axios.sysSchoolList(this.params).then(res => {
        if (res.data.code === '0') {
          this.schoolList = res.data.data.list
          this.pages.total = res.data.data.total
          this.pages.pageNum = res.data.data.pageNum
          this.pages.pageSize = res.data.data.pageSize
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
      pages.pages.pageSize = val
      this.loadSchoolList()
    },
    handleCurrentChange (val) {
      this.pages.pageNum = val
      pages.pages.pageNum = val
      this.loadSchoolList()
    },
    handleSelectionChange (val) {
      let ids = []
      val.forEach(item => {
        ids.push({
          id: item.id,
          ord: parseInt(item.ord)
        })
      })
      this.selectIds = ids
    },
    ordChange (obj) {
      if (this.selectIds.length > 0) {
        this.selectIds.forEach(item => {
          if (item.itemId === obj.id) {
            item.ord = parseInt(obj.ord)
          }
        })
      }
    },
    onOrder () {
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
    addSchool () {
      this.$router.push({
        path: '/addSchool'
      })
    },
    onChecke (item) {
      this.$router.push({
        path: '/checkAccount',
        query: {
          schoolId: item.id
        }
      })
    },
    onUpdate (item) {
      this.$router.push({
        path: '/updateSchool',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    onDelete (item) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.schoolDel({id: item.id}).then(res => {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    beforeAvatarUpload (file) {
      let xls = 'application/vnd.ms-excel'
      let xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isXlsx = file.type === xls || file.type === xlsx
      if (!isXlsx) {
        this.$message.error('只能上传Excel')
      }
      return isXlsx
    },
    upLoadSuccess (res) {
      if (res.code === '0') {
        this.$message.success('导入成功!')
        this.dialogVisible = false
        this.loadDate()
      } else {
        let str = ''
        if (res.data !== null) {
          res.data.forEach(item => {
            str += '第' + item.id + '行'
            item.list.forEach((list, index) => {
              if (index + 1 === item.list.length) {
                str += list.msg + '。'
              } else {
                str += list.msg + '，'
              }
            })
          })
        } else {
          str = '操作失败!'
        }
        this.$message.error(str)
      }
    },
    upLoadError (res) {
      this.$message.error(res.msg)
    },
    loadTemplate () {
      window.location.href = location.protocol + '//' + window.location.host + '/zdadmin/static/file/学校批量导入模板.xls'
    }
  },
  watch: {
    'search.provinceId' (val) {
      this.search.cityIds = ''
      this.citiesList = []
      if (this.user.roleLevel === 1) {
        this.loadCities()
      }
    },
    'search.cityIds' (val) {
      this.search.regionIds = ''
      this.regionList = []
      if (this.user.roleLevel === 1) {
        this.loadRegions()
      } else {
        this.regionList = []
        this.citiesList.forEach(item => {
          if (item.id === val) {
            item.region.forEach(region => {
              this.regionsList.push({
                name: region.regionName,
                id: region.regionId
              })
            })
          }
        })
      }
    }
  }
}
</script>

<style>
  .school-header {
    padding: 10px;
    background-color: #F2F6FC;
  }
  .school-region .el-select {
    width: 32%;
  }
  .system-school .el-upload,
  .system-school .el-upload .el-upload-dragger {
    width: 100%;
  }
</style>
