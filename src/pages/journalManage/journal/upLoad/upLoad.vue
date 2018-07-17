<template>
  <div class="journal-manage-upLoad">
    <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
    <el-tree :data="data" show-checkbox @check-change="getSelectedNodes"></el-tree>
  </div>
</template>

<script>
import area from '../../../../../static/js/area.json'
export default {
  name: 'journal-manage-upLoad',
  components: {},
  data () {
    return {
      // 多级联动数组
      options: [],
      // ['省', '市', '区']
      selectedOptions: [],
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
    getSelectedNodes (val) {
      console.log(val)
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
