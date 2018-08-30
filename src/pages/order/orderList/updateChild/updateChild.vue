<template>
  <div class="update-child">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="收件人:">
            <el-input v-model="form.childName" placeholder="请输入收件人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话:">
            <el-input v-model="form.childMobile" placeholder="请收入联系电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-select v-model="form.provinceId" placeholder="请选择省">
            <el-option :label="item.name" :value="item.id" v-for="item in provincesList" :key="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="form.cityId" placeholder="请选择市">
            <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="form.regionId" placeholder="请选择区">
            <el-option :label="item.name" :value="item.id" v-for="item in regionsList" :key="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="form.schoolId" placeholder="请选择学校">
            <el-option :label="item.name" :value="item.id" v-for="item in schoolList" :key="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="form.gradeId" placeholder="请选择年级">
            <el-option :label="item.name" :value="item.id" v-for="item in gradeList" :key="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="form.classId" placeholder="请选择班级">
            <el-option :label="item.name" :value="item.id" v-for="item in classList" :key="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input v-model="form.classNameDef" placeholder="请收入自定义班级名称"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-button @click="onCancel">取消</el-button>
        <el-button @click="onSubmit" type="primary">保存提交</el-button>
      </el-row>
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
      citiesList: [],
      regionsList: [],
      schoolList: [],
      gradeList: [],
      classList: [],
      form: {
        tradeId: this.$route.query.tradeId,
        childMobile: JSON.parse(this.$route.query.item).mobile,
        childName: JSON.parse(this.$route.query.item).name,
        provinceId: JSON.parse(this.$route.query.item).provinceId.toString(),
        cityId: JSON.parse(this.$route.query.item).cityId.toString(),
        regionId: JSON.parse(this.$route.query.item).regionId.toString(),
        schoolId: JSON.parse(this.$route.query.item).schoolId.toString(),
        gradeId: JSON.parse(this.$route.query.item).gradeId.toString(),
        classId: JSON.parse(this.$route.query.item).classId.toString(),
        classNameDef: JSON.parse(this.$route.query.item).classNameDef
      }
    }
  },
  created () {
  },
  mounted () {
    console.log(this.form)
    this.loadProvince()
    this.loadCities()
    this.loadRegions()
    this.loadSchoolList()
    this.loadGradeList()
    this.loadClassList()
  },
  computed: {},
  methods: {
    loadProvince () {
      this.$axios.province().then(res => {
        if (res.data.code === '0') {
          this.provincesList = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
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
          this.$message.error(res.data.data.msg)
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
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadSchoolList () {
      this.$axios.schoolList().then(res => {
        if (res.data.code === '0') {
          this.schoolList = res.data.data.list
        } else {
          this.$message.error(res.data.data.msg)
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
          this.$message.error(res.data.data.msg)
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
    onSubmit () {
      this.$axios.magazineSchoolUpdate(this.form).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.$router.go(-1)
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    }
  },
  watch: {}
}
</script>

<style>
.update-child {
  padding: 20px;
}
</style>
