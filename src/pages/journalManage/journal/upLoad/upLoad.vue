<template>
  <div class="journal-manage-upLoad">
    <!--<el-cascader :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>-->
    <el-tree
      ref="tree"
      show-checkbox
      node-key="id"
      :data="data"
      :default-checked-keys="[5]"
      :default-expanded-keys="[2, 3]"
      @check-change="getSelectedNodes">
    </el-tree>
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
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
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
    console.log(this.$refs.tree.getCheckedNodes())
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
    getSelectedNodes (val1, val2, val3) {
      console.log(val1)
      console.log(val2)
      console.log(val3)
    }
  },
  watch: {}
}
</script>

<style>
</style>
