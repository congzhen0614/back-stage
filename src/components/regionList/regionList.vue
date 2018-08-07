<template>
  <div class="account-region-list">
    <el-select v-model="province" placeholder="请选择省">
      <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select v-model="cities" multiple placeholder="请选择市" :disabled="cityList.length === 0" @remove-tag="onCloseCity">
      <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select v-model="regions" multiple placeholder="请选择区" :disabled="regionList.length === 0">
      <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'account-region-list',
  data () {
    return {
      provinceList: [],
      cityList: [],
      regionList: [],
      province: '',
      cities: [],
      regions: []
    }
  },
  mounted () {
    this.loadProvince()
  },
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
    loadCities (id) {
      this.$axios.cities({id: id}).then(res => {
        if (res.data.code === '0') {
          this.cityList = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadRegions (id) {
      this.$axios.regions({id: id}).then(res => {
        if (res.data.code === '0') {
          res.data.data.forEach(item => {
            this.regionList.push(item)
          })
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onCloseCity () {
      this.regionList = []
      this.cities.forEach(item => {
        this.loadRegions(item)
      })
    }
  },
  watch: {
    province (val) {
      this.cityList = []
      this.regionList = []
      this.cities = []
      this.regions = []
      this.loadCities(val)
      this.$emit('province', val)
    },
    cities (val) {
      if (val.length === 0) {
        this.regions = []
      }
      this.regionList = []
      val.forEach(item => {
        this.loadRegions(item)
      })
      this.$emit('cities', val)
    },
    regions (val) {
      this.$emit('regions', val)
    }
  }
}
</script>

<style>
</style>
