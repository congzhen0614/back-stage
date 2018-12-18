<template>
  <div class="update-child" style="width: 600px">
    <el-form ref="ruleForm" :model="form" :rules="rules" size="mini" label-width="95px">
      <el-form-item label="收件人:" prop="childName">
        <el-input v-model="form.childName" placeholder="请输入收件人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="childMobile">
        <el-input v-model="form.childMobile" placeholder="请收入联系电话" type="tel"></el-input>
      </el-form-item>
      <el-form-item label="省/市/区:" prop="regionId">
        <el-input type="text" v-model="provinceName" disabled style="width: 32.5%"></el-input>
        <el-select v-model="form.cityId" placeholder="请选择市" style="width: 32.5%" @change="cityChange">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.cityName" :value="item.cityId" v-for="item in citiesList" :key="item.cityId"></el-option>
        </el-select>
        <el-select v-model="form.regionId" placeholder="请选择区" style="width: 32.5%">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.regionName" :value="item.regionId" v-for="item in regionsList" :key="item.regionId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校:" prop="schoolId">
        <el-select v-model="form.schoolId" placeholder="请选择学校" filterable style="width: 100%">
          <el-option :label="item.schoolName" :value="item.schoolId" v-for="item in schoolList" :key="item.schoolId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级:" prop="gradeId">
        <el-select v-model="form.gradeId" placeholder="请选择年级" style="width: 100%">
          <el-option :label="item.name" :value="parseInt(item.id)" v-for="item in gradeList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级:">
        <el-select v-model="form.classId" placeholder="请选择班级" style="width: 50%" :disabled="radio === '2'">
          <el-option :label="item.name" :value="parseInt(item.id)" v-for="item in classList" :key="item.id"></el-option>
        </el-select>
        <el-radio v-model="radio" label="1">选填</el-radio>
      </el-form-item>
      <el-form-item label="自定义班级:">
        <el-input v-model="form.classNameDef" placeholder="请输入自定义班级名称" style="width: 50%" :disabled="radio === '1'"></el-input>
        <el-radio v-model="radio" label="2">自定义</el-radio>
      </el-form-item>
      <el-button size="mini" @click="onSubmit" type="primary">保存提交</el-button>
      <el-button size="mini" @click="onCancel">取消</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      provincesList: [],
      provinceName: '',
      citiesList: [],
      regionsList: [],
      schoolList: [],
      gradeList: [],
      classList: [],
      radio: '1',
      rules: {
        childName: [
          {required: true, message: '请输入收件人', trigger: 'blur'},
          {validator: (rule, value, callback) => {
            let isNull = /^[ ]+$/
            if (isNull.test(value)) {
              callback(new Error('必填项不能全部为空格'))
            } else {
              callback()
            }
          }
          }
        ],
        childMobile: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {validator: (rule, value, callback) => {
            let phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
            if (!phone.test(value)) {
              callback(new Error('请输入正确手机号'))
            } else {
              callback()
            }
          }
          }
        ],
        regionId: {required: true, message: '请选择省/市/区', trigger: 'blur'},
        schoolId: {required: true, message: '请选择学校', trigger: 'blur'},
        gradeId: {required: true, message: '请选择年级', trigger: 'blur'}
      },
      form: {
        tradeId: this.$route.query.tradeId,
        childMobile: JSON.parse(this.$route.query.item).mobile,
        childName: JSON.parse(this.$route.query.item).name,
        provinceId: JSON.parse(this.$route.query.item).provinceId,
        cityId: '',
        regionId: JSON.parse(this.$route.query.item).regionId,
        schoolId: JSON.parse(this.$route.query.item).schoolId,
        gradeId: JSON.parse(this.$route.query.item).gradeId,
        classId: JSON.parse(this.$route.query.item).classId,
        classNameDef: JSON.parse(this.$route.query.item).classNameDef
      }
    }
  },
  created () {
    // this.loadProvince()
    // this.loadCities()
    // this.loadRegions()
    this.loadAccountArea()
    this.loadSchoolList()
    this.loadGradeList()
    this.loadClassList()
  },
  methods: {
    loadProvince () {
      this.$axios.province().then(res => {
        if (res.data.code === '0') {
          this.provincesList = res.data.data
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
    loadAccountArea () {
      this.$axios.accountArea({id: this.$route.query.adminId}).then(res => {
        if (res.data.code === '0') {
          this.citiesList = res.data.data.area.cities
          this.provinceName = res.data.data.area.provinceName
          this.form.cityId = JSON.parse(this.$route.query.item).cityId
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
    onCancel () {
      this.$router.go(-1)
    },
    cityChange () {
      this.form.regionId = ''
    },
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.form.classNameDef !== '' && this.form.classNameDef !== null) {
            this.form.classId = ''
          }
          this.$axios.magazineSchoolUpdate(this.form).then(res => {
            if (res.data.code === '0') {
              this.$message.success('操作成功')
              this.$router.go(-1)
            } else {
              this.$message.error(res.data.msg)
            }
          }, err => {
            this.$message.error(err)
          }).catch(err => {
            this.$message.error(err)
          })
        }
      })
    }
  },
  watch: {
    'form.cityId' (val) {
      this.citiesList.forEach(item => {
        if (item.cityId === val) {
          this.regionsList = item.regions
        }
      })
    },
    'form.regionId' (val) {
      if (val !== '') {
        this.loadSchoolList()
      }
    },
    radio () {
      this.form.classId = ''
      this.form.classNameDef = ''
    }
  }
}
</script>

<style>
.update-child {
  padding: 20px;
}
</style>
