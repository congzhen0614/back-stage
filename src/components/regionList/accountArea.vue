<template>
  <div class="account-area">
    <el-input class="input" type="text" v-model="provinceName" disabled></el-input>
    <!--<el-select class="select" v-model="cities" multiple placeholder="请选择市" :disabled="isSelf">-->
      <!--<el-option label="全选" value="all"></el-option>-->
      <!--<el-option v-for="item in cityList" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>-->
    <!--</el-select>-->
    <!--<el-select class="select" v-model="regions" multiple placeholder="请选择区" :disabled="isSelf">-->
      <!--<el-option label="全选" value="all"></el-option>-->
      <!--<el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>-->
    <!--</el-select>-->
    <el-transfer style="margin-top: 10px" v-model="cities"  :data="cityList"   :titles="['待选城市', '选中城市']"></el-transfer>
    <el-transfer style="margin-top: 10px" v-model="regions" :data="regionList" :titles="['待选地区', '选中地区']"></el-transfer>
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
          this.cityList = []
          res.data.data.area.cities.forEach(item => {
            this.cityList.push({
              label: item.cityName,
              key: item.cityId,
              regions: item.regions
            })
          })
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
          this.cityList.forEach(item => {
            if (item.key === id) {
              item.regions.forEach(region => {
                this.regionList.push({
                  label: region.regionName,
                  key: region.regionId
                })
              })
            }
          })
        })
      }
      this.$emit('cities', val)
    },
    regions (val) {
      if (val.length > 0) {
        this.$emit('regions', val)
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
