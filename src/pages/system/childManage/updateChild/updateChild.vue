<template>
  <div class="update-child">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 500px">
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="省/市/区:" prop="regionId">
        <el-select v-model="form.provinceId" placeholder="请选择省" style="width: 32%">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="item.id" v-for="item in provinceList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="form.cityId" placeholder="请选择市" style="width: 32%">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="form.regionId" placeholder="请选择区" style="width: 32%">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="item.id" v-for="item in regionList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入学年份:" prop="enrollment">
        <el-select v-model="form.enrollment" placeholder="请选择入学年份">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item" :value="item" v-for="item in enrollmentList" :key="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校:" prop="schoolId">
        <el-select v-model="form.schoolId" placeholder="请选择学校">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.schoolName" :value="item.schoolId" v-for="item in schoolList" :key="item.schoolId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级/班级:" prop="gradeId">
        <el-select v-model="form.gradeId" placeholder="请选择年级" style="width: 49%">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="item.id" v-for="item in gradeList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="form.classId" placeholder="请选择班级" style="width: 49%">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="item.id" v-for="item in classList" :key="item.id"></el-option>
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
      rules: {
        name: {required: true, message: '请输入孩子姓名'},
        provinceId: {required: true, message: '请输入省'},
        cityId: {required: true, message: '请输入市'},
        regionId: {required: true, message: '请输入省市区'},
        enrollment: {required: true, message: '请选择入学年份'},
        schoolId: {required: true, message: '请选择学校'},
        gradeId: {required: true, message: '请选择年级'}
      },
      provinceList: [],
      citiesList: [],
      regionList: [],
      schoolList: [],
      gradeList: [],
      classList: [],
      form: {
        name: '', // 姓名
        provinceId: '', // 省
        cityId: '', // 市
        regionId: '', // 区
        schoolId: '', // 学校id
        gradeId: '', // 年级id
        classId: '', // 班级id
        className: '', // 自定义班级名称
        enrollment: '', // 入学年月
        mobile: '', // 手机号
        parent: '', // 家长姓名
        relation: '' // 关系
      }
    }
  },
  created () {
    this.loadChild()
    this.loadProvince()
    this.loadGradeList()
    this.loadClassList()
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
        id: this.$route.query.id, // 孩子id
        uid: this.$route.query.uid // 所属用户
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
    loadChild () {
      this.$axios.findChildByUid({uid: this.$route.query.uid}).then(res => {
        if (res.data.code === '0') {
          this.form.name = res.data.data[0].name
          this.form.provinceId = res.data.data[0].provinceId.toString()
          this.form.cityId = res.data.data[0].cityId.toString()
          this.form.regionId = res.data.data[0].regionId.toString()
          this.form.schoolId = res.data.data[0].schoolId
          this.form.gradeId = res.data.data[0].gradeId.toString()
          this.form.classId = res.data.data[0].classId.toString()
          this.form.className = res.data.data[0].className
          this.form.enrollment = res.data.data[0].enrollment
          this.form.mobile = res.data.data[0].mobile
          this.form.parent = res.data.data[0].parent
          this.form.relation = res.data.data[0].relation
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
        this.loadCities()
      }
    },
    'form.cityId' (val) {
      if (val === '') {
        this.form.regionId = ''
        this.regionList = []
      } else {
        this.loadRegions()
      }
    },
    'form.regionId' (val) {
      if (val === '') {
        this.schoolList = []
      } else {
        this.loadSchoolList()
      }
    }
  }
}
</script>

<style>
</style>
