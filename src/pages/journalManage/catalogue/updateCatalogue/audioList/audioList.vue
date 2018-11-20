<template>
  <div class="audioList">
    <el-form ref="form" :model="search" size="mini">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="包名称:" label-width="60px">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="margin-top: 7px">
          <el-button size="mini" type="primary" plain @click="loadDate">检索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table size="mini" border ref="multipleTable" tooltip-effect="dark" :data="tableList" :height="windowHeight" @select="handleSelection" @select-all="handleSelection">
      <el-table-column type="selection" width="40" ></el-table-column>
      <el-table-column prop="ord" type="index" label="排序" width="100" sortable >
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.ord" @change="ordChange(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="视听包名称" ></el-table-column>
      <el-table-column prop="logo" label="封面图" width="80" >
        <template slot-scope="scope">
          <img :src="scope.row.logo" width="100%">
        </template>
      </el-table-column>
      <el-table-column prop="fee" label="价格" width="100" sortable ></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="search.pageNum"
      :page-size="search.pageSize"
      :page-sizes="[20, 50, 75, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'audioList',
  data () {
    return {
      windowHeight: window.innerHeight - 360 + 'px',
      search: {
        id: this.id,
        cls: 54,
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      selectIds: [],
      tableList: [],
      historyData: []
    }
  },
  props: ['id'],
  mounted () {
    this.loadDate()
  },
  methods: {
    loadDate () {
      this.$axios.itempackUpdatelist(this.search).then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data.list
          this.total = res.data.data.total
          this.selectList()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    selectList () {
      this.$nextTick(() => {
        let historyData = []
        this.tableList.forEach(item => {
          if (item.selected === 1) {
            this.$refs.multipleTable.toggleRowSelection(item, true)
            historyData.push(item)
          } else {
            item.ord = 9999
          }
        })
        this.handleSelection(historyData)
        if (this.historyData[this.search.pageNum] !== undefined) {
          this.tableList.forEach(list => {
            this.historyData[this.search.pageNum].forEach(select => {
              if (list.id === select.id) {
                this.$refs.multipleTable.toggleRowSelection(list, true)
              }
            })
          })
        }
      })
    },
    handleSelection (val) {
      this.historyData[this.search.pageNum] = val
      this.selectIds = []
      this.historyData.forEach(list => {
        list.forEach(select => {
          this.selectIds.push({
            cls: 54,
            itemId: select.id,
            ord: parseInt(select.ord)
          })
        })
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
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.loadDate()
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
      this.loadDate()
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
