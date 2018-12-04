<template>
  <div class="update-child">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 500px" size="mini">
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="省/市/区:" prop="regionId">
        <el-select v-model="form.provinceId" placeholder="请选择省" style="width: 32%" :disabled="user.roleLevel !== 1">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="item.id" v-for="item in provinceList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="form.cityId" placeholder="请选择市" style="width: 32%" :disabled="citiesList.length === 1 && user.roleLevel !== 1">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="form.regionId" placeholder="请选择区" style="width: 32%" :disabled="regionList.length === 1 && user.roleLevel !== 1">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="item.id" v-for="item in regionList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入学年份:" prop="enrollment">
        <el-select v-model="form.enrollment" placeholder="请选择入学年份" style="width: 100%">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item" :value="item" v-for="item in enrollmentList" :key="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校:" prop="schoolId">
        <el-select v-model="form.schoolId" placeholder="请选择学校" style="width: 100%">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.schoolName" :value="item.schoolId" v-for="item in schoolList" :key="item.schoolId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级/班级:" prop="gradeId">
        <el-select v-model="form.gradeId" placeholder="请选择年级" style="width: 49%">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="parseInt(item.id)" v-for="item in gradeList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="form.classId" placeholder="请选择班级" style="width: 49%">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="parseInt(item.id)" v-for="item in classList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="自定义班级:">
        <el-input v-model="form.className" placeholder="请输入自定义班级"></el-input>
      </el-form-item>
    </el-form>
    <footer class="footer-button">
      <el-button size="mini" type="primary" @click="onSubmit">保存提交</el-button>
      <el-button size="mini" @click="onCancel">取消</el-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'update-child',
  components: {},
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      rules: {
        name: [
          {required: true, message: '请输入孩子姓名'},
          {validator: (rule, value, callback) => {
            let isNull = /^[ ]+$/
            if (isNull.test(value)) {
              callback(new Error('必填项不能全部为空格'))
            } else {
              callback()
            }
          },
          trigger: 'blur'}
        ],
        provinceId: {required: true, message: '请输入省', trigger: 'blur'},
        cityId: {required: true, message: '请输入市', trigger: 'blur'},
        regionId: {required: true, message: '请输入省市区', trigger: 'blur'},
        enrollment: {required: true, message: '请选择入学年份', trigger: 'blur'},
        schoolId: {required: true, message: '请选择学校', trigger: 'blur'},
        gradeId: {required: true, message: '请选择年级', trigger: 'blur'}
      },
      provinceList: [],
      citiesList: [],
      regionList: [],
      schoolList: [],
      gradeList: [],
      classList: [],
      form: {
        name: JSON.parse(this.$route.query.item).name, // 姓名
        provinceId: '', // 省
        cityId: '', // 市
        regionId: '', // 区
        schoolId: JSON.parse(this.$route.query.item).schoolId, // 学校id
        gradeId: JSON.parse(this.$route.query.item).gradeId, // 年级id
        classId: JSON.parse(this.$route.query.item).classId, // 班级id
        className: JSON.parse(this.$route.query.item).className, // 自定义班级名称
        enrollment: JSON.parse(this.$route.query.item).enrollment, // 入学年月
        mobile: JSON.parse(this.$route.query.item).mobile, // 手机号
        parent: JSON.parse(this.$route.query.item).parent, // 家长姓名
        relation: JSON.parse(this.$route.query.item).relation // 关系
      }
    }
  },
  created () {
    console.log(JSON.parse(this.$route.query.item))
    this.loadProvince()
    this.loadGradeList()
    this.loadClassList()
    if (this.user.roleLevel !== 1) {
      this.loadAccountArea()
    }
  },
  mounted () {
    this.form.provinceId = JSON.parse(this.$route.query.item).provinceId.toString()
    if (this.user.roleLevel === 1) {
      this.form.cityId = JSON.parse(this.$route.query.item).cityId.toString()
      this.form.regionId = JSON.parse(this.$route.query.item).regionId.toString()
    }
  },
  computed: {
    params () {
      let param = {
        name: this.form.name, // 姓名
        provinceId: this.form.provinceId, // 省
        cityId: this.form.cityId, // 市
        regionId: this.form.regionId, // 区
        schoolId: this.form.schoolId, // 学校id
        gradeId: this.form.gradeId, // 年级id
        classId: this.form.classId, // 班级id
        className: this.form.className, // 自定义班级名称
        enrollment: this.form.enrollment, // 入学年月
        mobile: this.form.mobile, // 手机号
        parent: this.form.parent, // 家长姓名
        relation: this.form.relation, // 关系
        id: JSON.parse(this.$route.query.item).id, // 孩子id
        uid: JSON.parse(this.$route.query.item).uid // 所属用户
      }
      return param
    },
    enrollmentList () {
      let enrollment = []
      let thisYear = new Date().getFullYear()
      for (let i = 2000; i <= thisYear; i++) {
        enrollment.unshift(i)
      }
      return enrollment
    }
  },
  methods: {
    loadAccountArea () {
      this.$axios.accountArea({id: this.user.id}).then(res => {
        if (res.data.code === '0') {
          res.data.data.area.cities.forEach(city => {
            this.citiesList.push({
              region: city.regions,
              name: city.cityName,
              id: city.cityId
            })
          })
          this.form.cityId = JSON.parse(this.$route.query.item).cityId
          this.form.regionId = JSON.parse(this.$route.query.item).regionId
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
      this.$axios.cities({id: this.form.provinceId}).then(res => {
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
      this.$axios.regions({id: this.form.cityId}).then(res => {
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
    loadSchoolList () {
      this.$axios.seekSchoolList({regionId: this.form.regionId}).then(res => {
        if (res.data.code === '0') {
          this.schoolList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadGradeList () {
      this.$axios.schGradeList().then(res => {
        if (res.data.code === '0') {
          this.gradeList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadClassList () {
      this.$axios.schClassList().then(res => {
        if (res.data.code === '0') {
          this.classList = res.data.data
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onSubmit () {
      this.$axios.childUpdate(this.params).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.$router.push({
            path: '/childManage'
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
    onCancel () {
      this.$router.push({
        path: '/childManage'
      })
    }
  },
  watch: {
    'form.provinceId' (val) {
      if (val === '') {
        this.form.cityId = ''
        this.citiesList = []
      } else {
        if (this.user.roleLevel === 1) {
          this.loadCities()
        }
      }
    },
    'form.cityId' (val) {
      if (val === '') {
        this.form.regionId = ''
        this.regionList = []
      } else {
        if (this.user.roleLevel === 1) {
          this.loadRegions()
        } else {
          this.regionList = []
          this.citiesList.forEach(item => {
            if (item.id === val) {
              item.region.forEach(region => {
                this.regionList.push({
                  name: region.regionName,
                  id: region.regionId
                })
              })
            }
          })
        }
      }
    },
    'form.regionId' () {
      this.loadSchoolList()
    }
  }
}
</script>

<style>
</style>
