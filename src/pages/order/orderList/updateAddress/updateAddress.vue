<template>
  <div class="update-address" style="width: 600px">
    <el-form ref="form" :model="form" label-width="80px" size="mini">
      <el-form-item label="收件人:">
        <el-input v-model="form.consigneeName" placeholder="请输入收件人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:">
        <el-input v-model="form.consigneeMobile" placeholder="请收入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="省/市/区:">
        <el-select v-model="form.addressProvinceId" placeholder="请选择省" style="width: 32.5%">
          <el-option :label="item.name" :value="item.id" v-for="item in provincesList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="form.addressCityId" placeholder="请选择市" style="width: 32.5%">
          <el-option :label="item.name" :value="item.id" v-for="item in citiesList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="form.addressRegionId" placeholder="请选择区" style="width: 32.5%">
          <el-option :label="item.name" :value="item.id" v-for="item in regionsList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址:">
        <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-button size="mini" @click="onSubmit" type="primary">保存提交</el-button>
      <el-button size="mini" @click="onCancel">取消</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'update-address',
  data () {
    return {
      provincesList: [],
      provinceName: '',
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
    this.loadProvince()
    this.loadCities()
    this.loadRegions()
    // this.loadAccountArea()
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
      this.$axios.cities({id: this.form.addressProvinceId}).then(res => {
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
      this.$axios.regions({id: this.form.addressCityId}).then(res => {
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
    onCancel () {
      this.$router.go(-1)
    },
    onSubmit () {
      if (this.form.consigneeName === '') {
        this.$message.warning('收件人不能为空')
      } else if (this.form.consigneeMobile === '') {
        this.$message.warning('联系电话不能为空')
      } else if (this.form.addressProvinceId === '' || this.form.addressCityId === '' || this.form.addressRegionId === '') {
        this.$message.warning('省、市、区不能为空')
      } else if (this.form.address === '') {
        this.$message.warning('详细地址不能为空')
      } else {
        this.$axios.addressHomeUpdate(this.form).then(res => {
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
