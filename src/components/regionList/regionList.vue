<template>
  <div class="account-region-list">
    <el-select v-model="province" placeholder="请选择省">
      <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select v-model="cities" multiple placeholder="请选择市" :disabled="cityList.length === 0" @remove-tag="onCloseCity">
      <el-option label="全选" value="all"></el-option>
      <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select v-model="regions" multiple placeholder="请选择区" :disabled="regionList.length === 0">
      <el-option label="全选" value="all"></el-option>
      <el-option v-for="(item, index) in regionList" :key="index" :label="item.name" :value="item.id"></el-option>
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
  props: {
    form: {
      type: Object
    }
  },
  mounted () {
    if (JSON.stringify(this.form) !== '{}') {
      this.province = this.form.provinceId.toString()
      this.form.cityIds.forEach(item => {
        this.$nextTick(() => {
          this.cities.push(item.id.toString())
        })
      })
      this.form.regionIds.forEach(item => {
        this.$nextTick(() => {
          this.regions.push(item.id.toString())
        })
      })
      this.loadCities(this.form.provinceId)
    }
    this.loadProvince()
  },
  methods: {
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
    loadCities (id) {
      this.$axios.cities({id: id}).then(res => {
        if (res.data.code === '0') {
          this.cityList = res.data.data
        } else {
          this.$message.error(res.data.msg)
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
          this.$message.error(res.data.msg)
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
        if (item === 'all') {
          this.cities = []
          this.cityList.forEach(item => {
            this.cities.push(item.id)
            this.loadRegions(item.id)
          })
        } else {
          this.loadRegions(item)
        }
      })
      this.$emit('cities', val)
    },
    regions (val) {
      val.forEach(item => {
        if (item === 'all') {
          this.regions = []
          this.regionList.forEach(item => {
            this.regions.push(item.id)
          })
        }
      })
      this.$emit('regions', val)
    }
  }
}
</script>

<style>
  .account-region-list .el-select {
    width: 150px;
    vertical-align: top;
  }
</style>
