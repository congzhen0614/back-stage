<template>
  <div class="images-list">
    <el-header class="journal-Manage-header" style="height: auto">
      <p style="font-size: 16px; margin-bottom: 20px">杂志名称: {{ info.name }}</p>
      <div class="header-button">
        <el-button size="small" type="primary" @click="addImages(1)">添加封面图</el-button>
        <el-button size="small" type="primary" @click="addImages(1)">添加礼品图</el-button>
        <el-button size="small" type="primary" @click="addImages(1)">添加内页图</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="缩略图" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <img :src="scope.row.url" width="100%">
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="上传时间">
          <template slot-scope="scope"><span>{{ scope.row.updatedAt | dateFormat }}</span></template>
        </el-table-column>
        <el-table-column prop="type" label="类别"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="onDelete(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="onUpdate(scope.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'images-list',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 250 + 'px',
      tableData: [],
      info: this.$route.query
    }
  },
  created () {
  },
  mounted () {
    this.loadDate()
  },
  computed: {},
  methods: {
    loadDate () {
      this.$axios.magazineItemImgst({itemId: this.info.id}).then(res => {
        if (res.data.code === '0') {
          if (res.data.data.logo && res.data.data.giftLogo && res.data.data.pageInfo.list.length > 0) {}
          this.tableData.push({
            updatedAt: res.data.data.updatedAt,
            url: res.data.data.logo,
            itemId: this.info.id,
            type: '封面图'
          })
          this.tableData.push({
            updatedAt: res.data.data.updatedAt,
            url: res.data.data.giftLogo,
            itemId: this.info.id,
            type: '礼品图'
          })
          res.data.data.pageInfo.list.forEach(item => {
            this.tableData.push({
              updatedAt: item.updatedAt,
              url: item.url,
              itemId: item.itemId,
              type: '内页图'
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
    handleSelectionChange (item) {
      console.log(item)
    },
    addImages (type) {
      this.$router.push({
        path: '/upLoadJournal',
        query: {
          type: type
        }
      })
    }
  },
  watch: {}
}
</script>

<style>
  .images-list .el-main {
    padding: 0;
  }
  .images-list .journal-Manage-header {
    background-color: #F2F6FC;
    padding: 20px;
  }
</style>
