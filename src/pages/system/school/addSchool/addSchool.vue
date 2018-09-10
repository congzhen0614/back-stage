<template>
  <div class="system-add-school">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="学校名称:" prop="name">
        <el-input v-model="form.name" placeholder="学校名称"></el-input>
      </el-form-item>
      <el-form-item label="省/市/区:" prop="regionId">
        <el-select v-model="form.provinceId" placeholder="请选择省">
          <el-option :label="item.name" :value="item.id" v-for="item in provinceList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="form.cityId" placeholder="请选择市">
          <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="form.regionId" placeholder="请选择区">
          <el-option :label="item.name" :value="item.id" v-for="item in regionsList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址:" prop="address">
        <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item label="学校类别:" prop="schoolLevel">
        <el-select v-model="form.schoolLevel" placeholder="请选择学校类别">
          <el-option label="幼儿园" :value="2"></el-option>
          <el-option label="小学" :value="0"></el-option>
          <el-option label="初中" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'system-add-school',
  components: {},
  data () {
    return {
      rules: {
        name: [{required: true, message: '请输入学校名称', trigger: 'blur'}],
        regionId: [{required: true, message: '请选择省/市/区', trigger: 'blur'}],
        address: [{required: true, message: '请输入地址', trigger: 'blur'}],
        schoolLevel: [{required: true, message: '请选择学校类型', trigger: 'blur'}]
      },
      provinceList: [],
      citiesList: [],
      regionsList: [],
      form: {
        name: '',
        provinceId: '',
        cityId: '',
        regionId: '',
        address: '',
        schoolLevel: ''
      }
    }
  },
  created () {
    this.loadProvince()
  },
  mounted () {
  },
  computed: {},
  methods: {
    loadProvince () {
      this.$axios.province().then(res => {
        if (res.data.code === '0') {
          this.provinceList = res.data.data
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
    onSubmit () {
      console.log(this.$route)
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //     this.$axios.schoolSave(this.form).then(res => {
      //       if (res.data.code === '0') {
      //         this.$message.success('操作成功')
      //         this.$router.go(-1)
      //       } else {
      //         this.$message.error(res.data.data.msg)
      //       }
      //     }, err => {
      //       this.$message.error(err)
      //     }).catch(err => {
      //       this.$message.error(err)
      //     })
      //   }
      // })
    },
    onCancel () {
      this.$router.go(-1)
    }
  },
  watch: {
    'form.provinceId' () {
      this.loadCities()
      this.form.cityId = ''
    },
    'form.cityId' () {
      this.loadRegions()
      this.form.regionId = ''
    }
  }
}
</script>

<style>
.system-add-school {
  width: 800px;
}
.system-add-school .el-select {
  width: 30%;
}
</style>
