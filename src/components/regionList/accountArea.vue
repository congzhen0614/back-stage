<template>
  <div class="account-area">
    <el-input class="input" type="text" v-model="provinceName" disabled></el-input>
    <el-select class="select" v-model="cities" multiple placeholder="请选择市" :disabled="isSelf">
      <el-option label="全选" value="all"></el-option>
      <el-option v-for="item in cityList" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
    </el-select>
    <el-select class="select" v-model="regions" multiple placeholder="请选择区" :disabled="isSelf">
      <el-option label="全选" value="all"></el-option>
      <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'account-area',
  data () {
    return {
      area: {},
      provinceName: '',
      cities: [],
      regions: [],
      cityList: [],
      regionList: []
    }
  },
  props: {
    userId: {
      type: Number
    },
    isSelf: {
      type: Boolean
    },
    cityIds: {
      type: Array
    },
    regionIds: {
      type: Array
    }
  },
  created () {
    if (this.userId) {
      this.loadAccountArea({id: this.userId})
    } else {
      this.loadAccountArea({id: JSON.parse(localStorage.getItem('user')).id})
    }
  },
  methods: {
    loadAccountArea (id) {
      this.$axios.accountArea(id).then(res => {
        if (res.data.code === '0') {
          this.area = res.data.data.area
          this.provinceName = res.data.data.area.provinceName
          this.$emit('province', res.data.data.area.provinceId)
          this.cityList = res.data.data.area.cities
          this.cityIds.forEach(item => {
            this.cities.push(parseInt(item.id))
          })
          this.regionIds.forEach(item => {
            this.regions.push(parseInt(item.id))
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    }
  },
  watch: {
    cities (val) {
      if (val.length === 0) {
        this.regions = []
        this.regionList = []
      } else {
        val.forEach(id => {
          if (id === 'all') {
            this.cities = []
            this.cityList.forEach(item => {
              this.cities.push(item.cityId)
              this.regionList = this.regionList.concat(item.regions)
            })
          } else {
            this.cityList.forEach(item => {
              if (item.cityId === id) {
                this.regionList = item.regions
              }
            })
          }
        })
      }
      this.$emit('cities', val)
    },
    regions (val) {
      if (val.length > 0) {
        this.$emit('regions', val)
        val.forEach(item => {
          if (item === 'all') {
            this.regions = []
            this.regionList.forEach(items => {
              this.regions.push(items.regionId)
            })
          }
        })
      }
    }
  }
}
</script>

<style>
.account-area .el-input,
.account-area .el-select {
  vertical-align: top;
}
.account-area .input {
  width: 20%;
}
.account-area .select {
  width: 35%;
}
</style>
