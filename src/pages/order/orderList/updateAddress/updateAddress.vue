<template>
  <div class="update-address">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="收件人:">
            <el-input v-model="form.consigneeName" placeholder="请输入收件人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="联系电话:">
            <el-input v-model="form.consigneeMobile" placeholder="请收入联系电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-select v-model="form.addressProvinceId" placeholder="请选择省">
            <el-option :label="item.name" :value="item.id" v-for="item in provincesList" :key="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="form.addressCityId" placeholder="请选择市">
            <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="form.addressRegionId" placeholder="请选择区">
            <el-option :label="item.name" :value="item.id" v-for="item in regionsList" :key="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
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
  name: 'update-address',
  components: {},
  data () {
    return {
      provincesList: [],
      citiesList: [],
      regionsList: [],
      sendType: JSON.parse(this.$route.query.item).sendType,
      form: {
        cls: JSON.parse(this.$route.query.item).cls,
        tradeId: this.$route.query.tradeId,
        address: JSON.parse(this.$route.query.item).address,
        addressCityId: JSON.parse(this.$route.query.item).cityId.toString(),
        addressProvinceId: JSON.parse(this.$route.query.item).provinceId.toString(),
        addressRegionId: JSON.parse(this.$route.query.item).regionId.toString(),
        consigneeMobile: JSON.parse(this.$route.query.item).mobile,
        consigneeName: JSON.parse(this.$route.query.item).name
      }
    }
  },
  created () {
  },
  mounted () {
    this.loadProvince()
    this.loadCities()
    this.loadRegions()
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
      this.$axios.cities({id: this.form.addressProvinceId}).then(res => {
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
      this.$axios.regions({id: this.form.addressCityId}).then(res => {
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
    onCancel () {
      this.$router.go(-1)
    },
    onSubmit () {
      // this.form.tradeId = parseInt(this.form.tradeId)
      // this.form.addressCityId = parseInt(this.form.addressCityId)
      // this.form.addressProvinceId = parseInt(this.form.addressProvinceId)
      // this.form.addressRegionId = parseInt(this.form.addressRegionId)
      this.$axios.addressHomeUpdate(this.form).then(res => {
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
  watch: {
    'form.addressProvinceId' () {
      this.loadCities()
      this.form.addressCityId = ''
    },
    'form.addressCityId' () {
      this.loadRegions()
      this.form.addressRegionId = ''
    }
  }
}
</script>

<style>
.update-address {
  padding: 20px;
  padding-bottom: 20px;
}
</style>
