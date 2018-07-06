<template>
  <div class="journal-manage-upLoad">
    <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
  </div>
</template>

<script>
import area from '../../../../static/js/area.json'
export default {
  name: 'journal-manage-upLoad',
  components: {},
  data () {
    return {
      // 多级联动数组
      options: [],
      // ['省', '市', '区']
      selectedOptions: []
    }
  },
  mounted () {
    this.getArea()
  },
  computed: {},
  methods: {
    getArea () {
      area.result.forEach(province => {
        let city = []
        province.citylist.forEach(cities => {
          let regionList = []
          cities.regionlist.forEach(region => {
            regionList.push({
              value: region.regionid,
              label: region.regionname
            })
          })
          city.push({
            value: cities.cityid,
            label: cities.cityname,
            children: regionList
          })
        })
        this.options.push({
          value: province.provinceid,
          label: province.provincename,
          children: city
        })
      })
    },
    handleChange (val) {
      console.log(val)
    }
  },
  watch: {}
}
</script>

<style>
</style>
