<template>
  <div class="audioList">
    <el-form ref="form" :model="search" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="书名:">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain @click="loadDate">检索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table border ref="multipleTable" tooltip-effect="dark" :data="tableList" :height="windowHeight" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="ord" type="index" label="排序" width="100" sortable>
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.ord" @change="ordChange(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="视听包名称"></el-table-column>
      <el-table-column prop="logo" label="封面图" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.logo" width="100%">
        </template>
      </el-table-column>
      <el-table-column prop="fee" label="价格" width="100%" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'audioList',
  data () {
    return {
      windowHeight: window.innerHeight - 500 + 'px',
      search: {},
      selectIds: [],
      tableList: []
    }
  },
  props: ['videoIds'],
  mounted () {
    this.loadDate()
  },
  methods: {
    handleSelectionChange (val) {
      let ids = []
      val.forEach(item => {
        ids.push({
          cls: 54,
          itemId: item.id,
          ord: parseInt(item.ord)
        })
      })
      this.selectIds = ids
    },
    loadDate () {
      this.$axios.spyppacketList(this.search).then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data.list
          this.tableList.forEach(item => {
            item.ord = 9999
          })
          if (typeof this.videoIds === 'undefined') return false
          this.$nextTick(() => {
            this.tableList.forEach(item => {
              if (this.videoIds.join(',').indexOf(item.id) > -1) {
                this.$refs.multipleTable.toggleRowSelection(item, true)
              }
            })
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
    ordChange (obj) {
      if (this.selectIds.length > 0) {
        this.selectIds.forEach(item => {
          if (item.itemId === obj.id) {
            item.ord = parseInt(obj.ord)
          }
        })
      }
    }
  },
  watch: {
    selectIds (val) {
      this.$emit('ypspDate', {
        items: val
      })
    }
  }
}
</script>

<style>
</style>
